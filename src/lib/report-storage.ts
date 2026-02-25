/**
 * Persistent report storage. Stores paid reports in Redis for long-lived access.
 */

import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";
import type { AnalysisReport } from "./types";

const PREFIX = "report:";
const SESSION_PREFIX = "report:by_session:";
const TTL_SECONDS = 365 * 24 * 60 * 60; // 1 year

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    return new Redis({ url, token });
  } catch {
    return null;
  }
}

export type StoredReport = {
  report: AnalysisReport;
  email: string;
  createdAt: string;
};

export async function storeReport(
  email: string,
  report: AnalysisReport,
  sessionId?: string
): Promise<string> {
  const redis = getRedis();
  if (!redis) throw new Error("Report storage not configured");

  const id = nanoid(21);
  const stored: StoredReport = {
    report,
    email,
    createdAt: new Date().toISOString(),
  };
  await redis.set(`${PREFIX}${id}`, JSON.stringify(stored), { ex: TTL_SECONDS });
  if (sessionId) {
    await redis.set(`${SESSION_PREFIX}${sessionId}`, id, { ex: TTL_SECONDS });
  }
  return id;
}

export async function getReport(id: string): Promise<StoredReport | null> {
  const redis = getRedis();
  if (!redis) return null;
  try {
    const data = await redis.get<string | StoredReport>(`${PREFIX}${id}`);
    if (!data) return null;
    const parsed = typeof data === "object" ? data : (JSON.parse(data as string) as StoredReport);
    return parsed;
  } catch {
    return null;
  }
}

export async function claimBySessionId(sessionId: string): Promise<string | null> {
  const redis = getRedis();
  if (!redis) return null;

  const existingId = await redis.get<string>(`${SESSION_PREFIX}${sessionId}`);
  if (existingId) return existingId;

  return null;
}

export function isStorageConfigured(): boolean {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}
