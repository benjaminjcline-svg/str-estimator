/**
 * Waitlist signup storage. Uses Upstash Redis (same as report storage).
 * Keys: waitlist:emails (set of lowercased emails), waitlist:entries (list of JSON entries).
 */

import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";

const EMAILS_SET = "waitlist:emails";
const ENTRIES_LIST = "waitlist:entries";

export type WaitlistSignup = {
  id: string;
  email: string;
  property_address: string | null;
  source_path: string;
  created_at: string;
  unsubscribed_at: string | null;
};

function getRedisConfig(): { url: string; token: string } | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

function getRedis(): Redis | null {
  const config = getRedisConfig();
  if (!config) return null;
  try {
    return new Redis({ url: config.url, token: config.token });
  } catch {
    return null;
  }
}

export async function addWaitlistSignup(
  email: string,
  sourcePath: string,
  propertyAddress?: string | null
): Promise<{ ok: true } | { ok: false; reason: "already_subscribed" }> {
  const redis = getRedis();
  if (!redis) throw new Error("Waitlist storage not configured");

  const normalized = email.toLowerCase().trim();
  const id = nanoid(21);
  const entry: WaitlistSignup = {
    id,
    email: normalized,
    property_address: propertyAddress?.trim() || null,
    source_path: sourcePath,
    created_at: new Date().toISOString(),
    unsubscribed_at: null,
  };

  const added = await redis.sadd(EMAILS_SET, normalized);
  if (added === 0) return { ok: false, reason: "already_subscribed" };

  await redis.rpush(ENTRIES_LIST, JSON.stringify(entry));
  return { ok: true };
}

export async function getAllWaitlistSignups(): Promise<WaitlistSignup[]> {
  const redis = getRedis();
  if (!redis) return [];

  const raw = await redis.lrange(ENTRIES_LIST, 0, -1);
  const out: WaitlistSignup[] = [];
  for (const item of raw) {
    try {
      out.push(typeof item === "string" ? (JSON.parse(item) as WaitlistSignup) : (item as WaitlistSignup));
    } catch {
      // skip malformed
    }
  }
  return out;
}

export function isWaitlistStorageConfigured(): boolean {
  return !!getRedisConfig();
}
