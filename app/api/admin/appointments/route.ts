import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import {
  listAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "@/lib/db/queries";
import type { AppointmentStatus } from "@/lib/types";

export async function GET() {
  
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json(await listAppointments());
}

export async function PATCH(req: NextRequest) {
  
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id, status } = await req.json() as { id: string; status: AppointmentStatus };
  if (!id || !["pending", "confirmed", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const appointment = await updateAppointmentStatus(id, status);
  if (!appointment) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, appointment });
}

export async function DELETE(req: NextRequest) {
  
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await deleteAppointment(id);
  return NextResponse.json({ success: true });
}
