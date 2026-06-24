import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, country, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    await sendContactEmail({ name, email, phone, country, message });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact email error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
