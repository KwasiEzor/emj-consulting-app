import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.hostinger.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}) {
  await transporter.sendMail({
    from: `"EMJ-Consulting Site" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    replyTo: data.email,
    subject: `Nouveau message de ${data.name} - EMJ-Consulting`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0B1F3A; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; color: #D4AF37;">EMJ-Consulting — Nouveau message</h2>
        </div>
        <div style="background: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0;">
          <p><strong>Nom:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Téléphone:</strong> ${data.phone}</p>
          <p><strong>Pays:</strong> ${data.country}</p>
          <hr/>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>
    `,
  });
}

export async function sendAppointmentEmail(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}) {
  await transporter.sendMail({
    from: `"EMJ-Consulting Site" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    replyTo: data.email,
    subject: `Nouvelle demande de rendez-vous - ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0B1F3A; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; color: #D4AF37;">EMJ-Consulting — Demande de RDV</h2>
        </div>
        <div style="background: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0;">
          <p><strong>Nom:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Téléphone:</strong> ${data.phone}</p>
          <p><strong>Service:</strong> ${data.service}</p>
          <p><strong>Date souhaitée:</strong> ${data.date}</p>
          <p><strong>Heure souhaitée:</strong> ${data.time}</p>
          ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ""}
        </div>
      </div>
    `,
  });

  await transporter.sendMail({
    from: `"EMJ-Consulting" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: "Confirmation de votre demande de rendez-vous - EMJ-Consulting",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0B1F3A; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; color: #D4AF37;">EMJ-Consulting</h2>
        </div>
        <div style="padding: 20px;">
          <p>Bonjour <strong>${data.name}</strong>,</p>
          <p>Nous avons bien reçu votre demande de rendez-vous pour le <strong>${data.date} à ${data.time}</strong>.</p>
          <p>Notre équipe vous contactera très prochainement pour confirmer votre rendez-vous.</p>
          <p>Cordialement,<br><strong>L'équipe EMJ-Consulting</strong></p>
        </div>
      </div>
    `,
  });
}
