import { NextRequest, NextResponse } from "next/server";
import { sendAppointmentEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, service, date, time, notes } = data;

    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    await sendAppointmentEmail({ name, email, phone, service, date, time, notes });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Appointment email error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
