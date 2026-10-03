import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "arunkumar800a@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const honeypot = typeof body.company === "string" ? body.company.trim() : "";

  // Silently accept bot submissions that filled the hidden honeypot field.
  if (honeypot) {
    return Response.json({ ok: true });
  }

  if (!name || !email || !message) {
    return Response.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (name.length > 120 || email.length > 200 || message.length > 4000) {
    return Response.json({ error: "One of the fields is too long." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form cannot send email.");
    return Response.json(
      { error: "The contact form isn't fully configured yet. Please email me directly instead." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Portfolio Contact Form <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Failed to send message. Please try again." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return Response.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
