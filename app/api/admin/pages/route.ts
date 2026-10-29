import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { pageContent } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const rows = await db.select().from(pageContent).where(eq(pageContent.id, 1));
  return NextResponse.json(rows[0]?.data ?? {});
}

export async function PUT(req: NextRequest) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const data = await req.json();
  await db
    .insert(pageContent)
    .values({ id: 1, data })
    .onConflictDoUpdate({ target: pageContent.id, set: { data } });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/services");
  revalidatePath("/destinations");
  revalidatePath("/contact");

  return NextResponse.json({ success: true });
}
