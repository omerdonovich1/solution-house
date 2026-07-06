import { NextResponse } from "next/server";
import { COOKIE, GATE_TOKEN } from "@/lib/gate";

// The launch PIN. Override with the SITE_PIN env var in Vercel.
const PIN = process.env.SITE_PIN ?? "8253";

export async function POST(req: Request) {
  let pin = "";
  try {
    const body = await req.json();
    pin = String(body?.pin ?? "");
  } catch {
    // ignore malformed body
  }

  if (pin !== PIN) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, GATE_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
