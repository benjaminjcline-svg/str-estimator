/**
 * RSS and news sources for STR market content.
 * All sources must allow aggregation per their terms.
 * We display headlines + links only; no full-text republication.
 */

export type FeedSource = {
  id: string;
  name: string;
  url: string;
  geography: "global" | "north-america" | "europe" | "asia-pacific";
};

/**
 * Industry feeds covering short-term rentals, vacation rental, and travel.
 * Headlines and links only - we never republish full articles.
 */
export const FEED_SOURCES: FeedSource[] = [
  {
    id: "skift",
    name: "Skift",
    url: "https://skift.com/feed/",
    geography: "global",
  },
  {
    id: "phocuswire",
    name: "PhocusWire",
    url: "https://www.phocuswire.com/feed",
    geography: "global",
  },
  {
    id: "airbnb-news",
    name: "Airbnb Newsroom",
    url: "https://news.airbnb.com/feed/",
    geography: "global",
  },
];
