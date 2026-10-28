import { NextRequest, NextResponse } from "next/server";
import { sendAppointmentEmail } from "@/lib/email";
import { sendPushToAll } from "@/lib/push";
import { db } from "@/lib/db";
import { appointments } from "@/lib/db/schema";

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

    const id = `appt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    await db.insert(appointments).values({
      id,
      name,
      email,
      phone,
      service,
      date,
      time,
      notes: notes ?? "",
      status: "pending",
    });

    await Promise.allSettled([
      sendAppointmentEmail({ name, email, phone, service, date, time, notes }).catch((e) =>
        console.error("Email failed:", e)
      ),
      sendPushToAll({
        title: "Nouveau rendez-vous !",
        body: `${name} — ${service} le ${date} à ${time}`,
        url: "/admin/appointments",
      }).catch((e) => console.error("Push failed:", e)),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Appointment error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
