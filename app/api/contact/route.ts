import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string; locale?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !message || !emailRe.test(email)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Misconfiguration: surface a server error rather than silently dropping it.
    console.error("RESEND_API_KEY is not set; cannot send contact email.");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  // The "from" address must be on a domain verified in your Resend account.
  const from = process.env.CONTACT_FROM ?? "Portfolio <contact@deejitcorp.com>";
  const to = process.env.CONTACT_TO ?? site.email;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio · ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\nLangue: ${body.locale ?? "fr"}\n\n${message}`,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
