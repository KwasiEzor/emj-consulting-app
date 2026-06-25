import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { readFileSync } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "appointments.json");

function readCount(): number {
  try {
    return (JSON.parse(readFileSync(FILE, "utf-8")) as unknown[]).length;
  } catch {
    return 0;
  }
}

export async function GET(req: NextRequest) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return new Response("Forbidden", { status: 403 });

  let count = readCount();

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: string) => {
        controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
      };

      send(JSON.stringify({ type: "connected", count }));

      const interval = setInterval(() => {
        const newCount = readCount();
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
