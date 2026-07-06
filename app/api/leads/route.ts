import { NextResponse } from "next/server";
import { getLeads, leadsConfigured } from "@/lib/leads-store";

// always fresh — never cache the lead list
export const dynamic = "force-dynamic";

export async function GET() {
  const leads = await getLeads();
  return NextResponse.json({ leads, configured: leadsConfigured });
}
