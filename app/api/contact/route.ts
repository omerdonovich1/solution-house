import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * Every valid lead is forwarded to your own system via a webhook. Point
 * it there with env vars (set in Vercel → Settings → Environment Variables):
 *
 *   LEADS_WEBHOOK_URL    – the endpoint your system exposes to receive leads
 *   LEADS_WEBHOOK_TOKEN  – optional; sent as `Authorization: Bearer <token>`
 *
 * The lead is POSTed as JSON: { name, phone, email, message, receivedAt,
 * source }. Until the URL is set, leads are logged server-side as a
 * fallback so nothing silently breaks.
 */

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
};

const WEBHOOK_URL = process.env.LEADS_WEBHOOK_URL;
const WEBHOOK_TOKEN = process.env.LEADS_WEBHOOK_TOKEN;

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim();
  const phone = body.phone?.trim();

  // Minimal validation — name + phone are the required fields on the form.
  if (!name || !phone) {
    return NextResponse.json(
      { error: "חסרים שדות חובה (שם וטלפון)" },
      { status: 422 }
    );
  }

  const lead = {
    name,
    phone,
    email: body.email?.trim() || null,
    message: body.message?.trim() || null,
    receivedAt: new Date().toISOString(),
    source: "solution-house-website",
  };

  // --- delivery to your system -------------------------------------------
  if (WEBHOOK_URL) {
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(WEBHOOK_TOKEN ? { Authorization: `Bearer ${WEBHOOK_TOKEN}` } : {}),
        },
        body: JSON.stringify(lead),
      });
      if (!res.ok) {
        console.error(
          "[contact] webhook responded",
          res.status,
          await res.text().catch(() => "")
        );
      }
    } catch (err) {
      // don't fail the visitor's submission if the webhook is momentarily down
      console.error("[contact] webhook delivery failed:", err, lead);
    }
  } else {
    console.log("[contact] new lead (no LEADS_WEBHOOK_URL set):", lead);
  }
  // -----------------------------------------------------------------------

  return NextResponse.json({ ok: true }, { status: 200 });
}
