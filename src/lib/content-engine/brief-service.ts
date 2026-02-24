/**
 * Fetches or generates the daily STR brief.
 * Uses persistent storage (Upstash Redis) when configured—articles live forever for SEO.
 * Falls back to cache-only when Redis is not set up.
 */

import { unstable_cache } from "next/cache";
import { fetchAllFeeds } from "./fetcher";
import { generateDailyArticle, type DailyArticle } from "./daily-article";
import {
  getStoredBrief,
  setStoredBrief,
  getStoredBriefDates,
  isStorageConfigured,
} from "./brief-storage";

async function fetchAndGenerate(date: string): Promise<DailyArticle | null> {
  const items = await fetchAllFeeds();
  return generateDailyArticle(date, items);
}

async function getDailyArticleUncached(date: string): Promise<DailyArticle | null> {
  // 1. Check persistent storage first (Redis)
  if (isStorageConfigured()) {
    const stored = await getStoredBrief(date);
    if (stored) return stored;
  }

  // 2. Only generate for today—we don't have past dates' news
  const today = getTodayDateString();
  if (date !== today) return null;

  // 3. Generate and persist
  const article = await fetchAndGenerate(date);
  if (article && isStorageConfigured()) {
    await setStoredBrief(article);
  }
  return article;
}

/**
 * Returns the daily brief for the given date.
 * Reads from Redis (permanent) or generates today's article and stores it.
 */
export function getCachedDailyArticle(
  date: string
): Promise<DailyArticle | null> {
  const today = getTodayDateString();
  const isPast = date < today;
  return unstable_cache(
    () => getDailyArticleUncached(date),
    ["daily-brief", date],
    // Past articles never change—cache for a year. Today revalidates hourly.
    { revalidate: isPast ? 86400 * 365 : 3600 }
  )();
}

/**
 * List of dates that have published briefs. For the filter UI.
 */
export function getCachedBriefDates(): Promise<string[]> {
  return unstable_cache(
    () => getStoredBriefDates(),
    ["brief-dates"],
    { revalidate: 3600 }
  )();
}

export function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}
