import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import type { Service } from "@/lib/db/schema";

export async function GET() {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const rows = await db.select().from(services);
  return NextResponse.json(rows);
}

export async function PUT(req: NextRequest) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const data: Service[] = await req.json();
  await db.delete(services);
  if (data.length > 0) await db.insert(services).values(data);
  return NextResponse.json({ success: true });
}
