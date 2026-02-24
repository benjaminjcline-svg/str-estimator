import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTodayDateString } from "@/lib/content-engine/brief-service";

/**
 * /learn/brief redirects to today's dated brief.
 * Daily articles live at /learn/brief/[date].
 */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "STR Market Brief | Daily North America Short-Term Rental News",
  description:
    "Daily expert analysis on STR news across top 200 North American cities. What each development means for your next deal.",
};

export default function MarketBriefRedirectPage() {
  const today = getTodayDateString();
  redirect(`/learn/brief/${today}`);
}
