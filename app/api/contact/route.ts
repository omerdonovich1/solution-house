import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * This is a working stub: it validates the payload and logs it server-side.
 * To make it live, plug in one of:
 *   - an email service (Resend, Postmark, SendGrid)
 *   - a database / CRM insert (Supabase, Notion, Airtable)
 *   - a webhook (Slack, Make, Zapier)
 * inside the marked section below.
 */

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
};

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
  };

  // --- INTEGRATION POINT -------------------------------------------------
  // Replace this console log with your delivery mechanism, e.g.:
  //   await resend.emails.send({ ... })
  //   await supabase.from("leads").insert(lead)
  //   await fetch(process.env.SLACK_WEBHOOK_URL!, { ... })
  console.log("[contact] new lead:", lead);
  // -----------------------------------------------------------------------

  return NextResponse.json({ ok: true }, { status: 200 });
}
