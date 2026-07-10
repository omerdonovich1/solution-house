import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, GATE_TOKEN } from "@/lib/gate";

/**
 * Temporary launch gate. Every page is rewritten to /locked until the
 * visitor's cookie carries the access token (set by /api/unlock after a
 * correct PIN). Static assets, the lock page and the unlock endpoint are
 * always allowed. Remove this file to open the site.
 */

export function middleware(req: NextRequest) {
  // The launch gate is OPT-IN: the site is open by default. To put the PIN
  // wall back, set SITE_LOCKED=1 in the environment (Vercel → Settings →
  // Environment Variables) and redeploy.
  if (process.env.SITE_LOCKED !== "1") return NextResponse.next();

  const { pathname } = req.nextUrl;

  const allowed =
    pathname === "/locked" ||
    pathname.startsWith("/api/unlock") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname.includes("."); // static files (images, frames, mockups, fonts…)

  if (allowed) return NextResponse.next();

  if (req.cookies.get(COOKIE)?.value === GATE_TOKEN) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/locked";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
