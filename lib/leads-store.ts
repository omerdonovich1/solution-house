import { Redis } from "@upstash/redis";

/**
 * Lead persistence. Backed by Upstash Redis (a serverless KV store) when
 * configured via env — Vercel's Upstash integration injects these
 * automatically:
 *   KV_REST_API_URL / KV_REST_API_TOKEN  (or the UPSTASH_ equivalents)
 *
 * Until it's connected, a process-memory fallback keeps things working in
 * dev (it just doesn't persist across serverless invocations).
 */

export interface StoredLead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  source: string;
  receivedAt: string;
}

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = url && token ? new Redis({ url, token }) : null;
const KEY = "sh:leads";
const CAP = 200; // keep the most recent 200 leads

export const leadsConfigured = !!redis;

// dev-only fallback — a single per-process array (shared across route
// modules in one server; NOT shared across serverless instances/restarts)
const globalStore = globalThis as unknown as { __shLeads?: StoredLead[] };
globalStore.__shLeads ??= [];
const memory = globalStore.__shLeads;

export async function saveLead(lead: StoredLead): Promise<void> {
  if (redis) {
    try {
      await redis.lpush(KEY, JSON.stringify(lead));
      await redis.ltrim(KEY, 0, CAP - 1);
      return;
    } catch (err) {
      console.error("[leads] save failed:", err);
    }
  }
  memory.unshift(lead);
}

export async function getLeads(): Promise<StoredLead[]> {
  if (redis) {
    try {
      const raw = await redis.lrange<string | StoredLead>(KEY, 0, CAP - 1);
      return raw.map((r) => (typeof r === "string" ? (JSON.parse(r) as StoredLead) : r));
    } catch (err) {
      console.error("[leads] read failed:", err);
      return [];
    }
  }
  return [...memory];
}
