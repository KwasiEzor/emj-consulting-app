import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { destinations } from "@/lib/db/schema";
import type { Destination } from "@/lib/db/schema";

export async function GET() {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const rows = await db.select().from(destinations);
  return NextResponse.json(rows);
}

export async function PUT(req: NextRequest) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const data: Destination[] = await req.json();
  await db.delete(destinations);
  if (data.length > 0) await db.insert(destinations).values(data);
  return NextResponse.json({ success: true });
}
