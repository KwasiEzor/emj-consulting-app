import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updateDataFile } from "@/lib/github-cms";
import { writeFileSync, readFileSync } from "fs";
import path from "path";
import type { Appointment, AppointmentStatus } from "@/lib/types";

const FILE = path.join(process.cwd(), "data", "appointments.json");

function read(): Appointment[] {
  try {
    return JSON.parse(readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

function persist(data: Appointment[]) {
  writeFileSync(FILE, JSON.stringify(data, null, 2));
  updateDataFile("appointments.json", data);
}

export async function GET() {
  
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json(read());
}

export async function PATCH(req: NextRequest) {
  
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id, status } = await req.json() as { id: string; status: AppointmentStatus };
  if (!id || !["pending", "confirmed", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const appointments = read();
  const idx = appointments.findIndex((a) => a.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  appointments[idx] = { ...appointments[idx], status };
  persist(appointments);
  return NextResponse.json({ success: true, appointment: appointments[idx] });
}

export async function DELETE(req: NextRequest) {
  
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const appointments = read().filter((a) => a.id !== id);
  persist(appointments);
  return NextResponse.json({ success: true });
}
