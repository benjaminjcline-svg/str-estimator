/**
 * Fetches and parses RSS feeds.
 * Output is ONLY from the source - no LLM generation here.
 * We extract: title, link, pubDate. That's it.
 */

import type { CuratedItem } from "./types";
import { FEED_SOURCES } from "./sources";

type RssItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
};

/**
 * Simple RSS/Atom parsing - extracts title, link, date.
 * No full content - we link to source only (avoids plagiarism).
 */
function parseRssXml(xml: string): RssItem[] {
  const items: RssItem[] = [];

  // RSS 2.0: <item><title>...</title><link>...</link><description>...</description>...
  const rssItemRegex =
    /<item>([\s\S]*?)<\/item>/gi;
  let m;
  while ((m = rssItemRegex.exec(xml)) !== null) {
    const block = m[1];
    const title = block.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
    const link = block.match(/<link>([\s\S]*?)<\/link>/i)?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
    const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1]?.trim();
    const desc = block.match(/<description>([\s\S]*?)<\/description>/i)?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, "").replace(/<[^>]+>/g, "").trim();
    if (title && link) items.push({ title, link, pubDate, description: desc?.slice(0, 500) });
  }

  // Atom: <entry><title>...</title><link href="..."/><summary>...</summary>...
  if (items.length === 0) {
    const atomEntryRegex = /<entry>([\s\S]*?)<\/entry>/gi;
    while ((m = atomEntryRegex.exec(xml)) !== null) {
      const block = m[1];
      const title = block.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
      const linkMatch = block.match(/<link[^>]*href=["']([^"']+)["']/i);
      const link = linkMatch?.[1]?.trim();
      const updated = block.match(/<updated>([\s\S]*?)<\/updated>/i)?.[1]?.trim();
      const published = block.match(/<published>([\s\S]*?)<\/published>/i)?.[1]?.trim();
      const summary = block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i)?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, "").replace(/<[^>]+>/g, "").trim();
      if (title && link) items.push({ title, link, pubDate: updated || published, description: summary?.slice(0, 500) });
    }
  }

  return items;
}

/** Filter for STR-relevant headlines (keywords) */
const STR_KEYWORDS = [
  "airbnb",
  "short-term rental",
  "vacation rental",
  "vrbo",
  "str ",
  "short term rental",
  "booking.com",
  "occupancy",
  "regulation",
  "listing",
];

function isStrRelevant(title: string): boolean {
  const lower = title.toLowerCase();
  return STR_KEYWORDS.some((kw) => lower.includes(kw));
}

export async function fetchFeedItems(
  source: (typeof FEED_SOURCES)[0]
): Promise<CuratedItem[]> {
  const res = await fetch(source.url, {
    headers: { "User-Agent": "STR-Estimator-Bot/1.0 (Content curation)" },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];

  const xml = await res.text();
  const raw = parseRssXml(xml);

  return raw
    .filter((item) => item.title && item.link && isStrRelevant(item.title))
    .slice(0, 15)
    .map((item, i) => ({
      id: `${source.id}-${Date.now()}-${i}`,
      title: item.title!,
      sourceUrl: item.link!,
      sourceName: source.name,
      publishedAt: item.pubDate
        ? new Date(item.pubDate).toISOString()
        : new Date().toISOString(),
      geography: source.geography,
      excerpt: item.description,
    }));
}

export async function fetchAllFeeds(): Promise<CuratedItem[]> {
  const results = await Promise.allSettled(
    FEED_SOURCES.map((s) => fetchFeedItems(s))
  );

  const items: CuratedItem[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") items.push(...r.value);
  }

  // Dedupe by sourceUrl
  const seen = new Set<string>();
  const deduped = items.filter((i) => {
    if (seen.has(i.sourceUrl)) return false;
    seen.add(i.sourceUrl);
    return true;
  });

  // Sort by date desc
  deduped.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return deduped.slice(0, 30);
}
