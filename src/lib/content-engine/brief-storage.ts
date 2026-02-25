/**
 * Persistent storage for daily briefs. Uses Upstash Redis when configured.
 * Articles live forever for SEO. Without Redis, falls back to cache-only (not persistent).
 */

import { Redis } from "@upstash/redis";
import type { DailyArticle } from "./daily-article";

const PREFIX = "brief:";
const DATES_KEY = "brief:dates";

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

export async function getStoredBrief(date: string): Promise<DailyArticle | null> {
  const redis = getRedis();
  if (!redis) return null;
  try {
    const data = await redis.get<DailyArticle | string>(`${PREFIX}${date}`);
    if (!data) return null;
    if (typeof data === "object" && data !== null) return data as DailyArticle;
    return JSON.parse(data as string) as DailyArticle;
  } catch {
    return null;
  }
}

export async function setStoredBrief(article: DailyArticle): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.set(`${PREFIX}${article.date}`, JSON.stringify(article));
    await redis.sadd(DATES_KEY, article.date);
  } catch {
    // Ignore storage errors
  }
}

export async function getStoredBriefDates(): Promise<string[]> {
  const redis = getRedis();
  if (!redis) return [];
  try {
    const dates = await redis.smembers(DATES_KEY);
    return dates.sort((a, b) => b.localeCompare(a)); // newest first
  } catch {
    return [];
  }
}

export type BriefListItem = { date: string; headline: string };

export async function getStoredBriefList(): Promise<BriefListItem[]> {
  const redis = getRedis();
  if (!redis) return [];
  try {
    const dates = await redis.smembers(DATES_KEY);
    if (dates.length === 0) return [];
    const keys = dates.map((d) => `${PREFIX}${d}`);
    const articles = (await redis.mget(...keys)) as ((DailyArticle & { headline?: string }) | string | null)[];
    return articles
      .map((a, i) => {
        const date = dates[i]!;
        if (a == null) return { date, headline: "STR news" };
        const art = typeof a === "object" ? (a as DailyArticle) : (JSON.parse(a as string) as DailyArticle);
        return { date, headline: art.headline ?? "STR news" };
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  } catch {
    return [];
  }
}

export function isStorageConfigured(): boolean {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}
