import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";

async function readCount(): Promise<number> {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT COUNT(*)::int AS count FROM appointments`;
  return rows[0]?.count ?? 0;
}

export async function GET(req: NextRequest) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return new Response("Forbidden", { status: 403 });

  let count = await readCount();

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: string) => {
        controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
      };

      send(JSON.stringify({ type: "connected", count }));

      const interval = setInterval(async () => {
        const newCount = await readCount();
        if (newCount !== count) {
          send(JSON.stringify({ type: "new_appointment", count: newCount, diff: newCount - count }));
          count = newCount;
        }
      }, 3000);

      req.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
