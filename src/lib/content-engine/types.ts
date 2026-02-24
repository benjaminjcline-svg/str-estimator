/**
 * Content engine types.
 * All content is sourced from external feeds. No original reporting.
 */

export type Geography =
  | "global"
  | "north-america"
  | "europe"
  | "asia-pacific"
  | "caribbean"
  | "other";

export type CuratedItem = {
  id: string;
  title: string;
  /** Original source URL - required for attribution. Never omit. */
  sourceUrl: string;
  /** Source publication name */
  sourceName: string;
  publishedAt: string; // ISO
  geography?: Geography;
  /** Excerpt from RSS feed (from source, not generated) */
  excerpt?: string;
  /** LLM-generated expert analysis for SEO. Original commentary only—no copying, no invented facts. */
  analysis?: string;
};

export type MarketBrief = {
  date: string; // YYYY-MM-DD
  items: CuratedItem[];
};
