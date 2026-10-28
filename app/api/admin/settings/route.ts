import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.id, 1));
  return NextResponse.json(rows[0]?.data ?? {});
}

export async function PUT(req: NextRequest) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const data = await req.json();
  await db
    .insert(siteSettings)
    .values({ id: 1, data })
    .onConflictDoUpdate({ target: siteSettings.id, set: { data } });
  return NextResponse.json({ success: true });
}
