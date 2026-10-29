import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import type { Testimonial } from "@/lib/db/schema";

export async function GET() {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const rows = await db.select().from(testimonials);
  return NextResponse.json(rows);
}

export async function PUT(req: NextRequest) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const data: Testimonial[] = await req.json();
  await db.delete(testimonials);
  if (data.length > 0) await db.insert(testimonials).values(data);
  return NextResponse.json({ success: true });
}
