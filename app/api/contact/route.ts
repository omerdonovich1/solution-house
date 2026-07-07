import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads-store";

/**
 * Contact form endpoint.
 *
 * Every valid lead is (1) saved to the lead store so it shows up in the
 * Lead Manager at /leads, (2) emailed to the team inbox via Resend, and
 * (3) optionally forwarded to an external webhook. Env (Vercel → Settings
 * → Environment Variables):
 *
 *   RESEND_API_KEY       – enables the email notification (resend.com)
 *   LEAD_NOTIFY_EMAIL    – recipient (defaults to info@solutionhouse.dev)
 *   LEAD_FROM_EMAIL      – verified sender (defaults to a Resend sandbox)
 *   LEADS_WEBHOOK_URL    – optional external endpoint to also receive leads
 *   LEADS_WEBHOOK_TOKEN  – optional; sent as `Authorization: Bearer <token>`
 */

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
};

const WEBHOOK_URL = process.env.LEADS_WEBHOOK_URL;
const WEBHOOK_TOKEN = process.env.LEADS_WEBHOOK_TOKEN;

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL ?? "info@solutionhouse.dev";
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL ?? "Solution House <onboarding@resend.dev>";

async function emailLead(lead: {
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
}) {
  if (!RESEND_API_KEY) return;
  const rows = [
    ["שם", lead.name],
    ["טלפון", lead.phone],
    ["אימייל", lead.email ?? "—"],
    ["הודעה", lead.message ?? "—"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#8B8B89;font-weight:600">${k}</td><td style="padding:6px 12px;color:#111">${v}</td></tr>`
    )
    .join("");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [NOTIFY_EMAIL],
        reply_to: lead.email ?? undefined,
        subject: `ליד חדש מהאתר — ${lead.name}`,
        html: `<div dir="rtl" style="font-family:Arial,sans-serif"><h2 style="color:#D9A13B">ליד חדש מ-Solution House</h2><table style="border-collapse:collapse">${rows}</table></div>`,
      }),
    });
    if (!res.ok) console.error("[contact] resend responded", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error("[contact] email failed:", err);
  }
}

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
    id: crypto.randomUUID(),
    name,
    phone,
    email: body.email?.trim() || null,
    message: body.message?.trim() || null,
    receivedAt: new Date().toISOString(),
    source: "website",
  };

  // --- 1) persist to the lead store (shows in /leads) --------------------
  await saveLead(lead);

  // --- 2) email the team inbox (info@solutionhouse.dev) ------------------
  await emailLead(lead);

  // --- 3) optional external webhook --------------------------------------
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
