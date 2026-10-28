import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { appointments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { AppointmentStatus } from "@/lib/types";

export async function GET() {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const rows = await db.select().from(appointments).orderBy(appointments.createdAt);
  return NextResponse.json(rows);
}

export async function PATCH(req: NextRequest) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id, status } = (await req.json()) as { id: string; status: AppointmentStatus };
  if (!id || !["pending", "confirmed", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const updated = await db
    .update(appointments)
    .set({ status })
    .where(eq(appointments.id, id))
    .returning();

  if (!updated.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, appointment: updated[0] });
}

export async function DELETE(req: NextRequest) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await db.delete(appointments).where(eq(appointments.id, id));
  return NextResponse.json({ success: true });
}
