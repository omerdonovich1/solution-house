import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads-store";

/**
 * Contact form endpoint.
 *
 * Every valid lead is (1) saved to the lead store so it shows up in the
 * Lead Manager at /leads, and (2) optionally forwarded to an external
 * webhook. Set in Vercel → Settings → Environment Variables:
 *
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

  // --- 2) optional external webhook --------------------------------------
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
