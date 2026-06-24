import { NextRequest, NextResponse } from "next/server";
import { sendAppointmentEmail } from "@/lib/email";
import { updateDataFile } from "@/lib/github-cms";
import { writeFileSync, readFileSync } from "fs";
import path from "path";
import type { Appointment } from "@/lib/types";

const FILE = path.join(process.cwd(), "data", "appointments.json");

function readAppointments(): Appointment[] {
  try {
    return JSON.parse(readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, service, date, time, notes } = data;

    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Adresse email invalide" }, { status: 400 });
    }

    const appointment: Appointment = {
      id: `appt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name,
      email,
      phone,
      service,
      date,
      time,
      notes: notes ?? "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const existing = readAppointments();
    const updated = [appointment, ...existing];
    writeFileSync(FILE, JSON.stringify(updated, null, 2));
    updateDataFile("appointments.json", updated);

    await sendAppointmentEmail({ name, email, phone, service, date, time, notes });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Appointment error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
