import type { Metadata } from "next";
import Link from "next/link";
import { LearnCard } from "@/components/LearnCard";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { getCachedBriefList, getTodayDateString } from "@/lib/content-engine/brief-service";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "STR Buying Guide",
  description:
    "What most buyers get wrong. Why STR calculators disagree, occupancy traps, stale comps, and the real numbers behind STR cash flow. Learn before you buy.",
  alternates: { canonical: canonicalUrl("/learn") },
};

const evergreenArticles = [
  {
    href: "/learn/why-str-calculators-disagree",
    title: "Why STR Calculators Disagree by Tens of Thousands of Dollars",
    excerpt:
      "Seasonality, comp selection, data lag, amenities, management, regulations, and cost blind spots. Why tools give wildly different numbers.",
  },
  {
    href: "/learn/conservative-str-underwriting",
    title: "Conservative STR Underwriting: How to Stress-Test a Deal Before You Buy",
    excerpt:
      "Scenario ranges, downside buffers, expense realism, and decision thresholds. How to run a conservative reality check.",
  },
  {
    href: "/learn/str-fragility-checklist",
    title: "STR Fragility Checklist: What Breaks First in Tight Deals",
    excerpt:
      "What breaks first when margins are thin. Occupancy, rate, expenses, and how to stress-test.",
  },
  {
    href: "/learn/why-str-calculators-overestimate",
    title: "Why STR Calculators Overestimate Revenue",
    excerpt:
      "Data lag, optimistic defaults, and how to sanity-check your STR projections before you buy.",
  },
  {
    href: "/learn/str-seasonality-reality-check",
    title: "STR Seasonality Reality Check for Underwriting",
    excerpt:
      "Why seasonality breaks deals. How to stress-test for slow months instead of assuming peak year-round.",
  },
  {
    href: "/learn/airbnb-income-assumptions",
    title: "Airbnb Income Assumptions: What Buyers Get Wrong",
    excerpt:
      "The 70% occupancy trap. Why comps lie. How to stress-test your numbers before you're in too deep.",
  },
  {
    href: "/learn/is-this-airbnb-worth-buying",
    title: "Is This Airbnb Worth Buying? A Decision Framework",
    excerpt:
      "Proceed, pause, or walk away. A simple framework that actually works when the numbers get fuzzy.",
  },
  {
    href: "/learn/short-term-rental-cash-flow-reality",
    title: "Short-Term Rental Cash Flow Reality",
    excerpt:
      "Where the gap between projected income and your bank account kills deals. What breaks first.",
  },
];

function formatBriefDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function LearnPage() {
  const today = getTodayDateString();
  const briefList = await getCachedBriefList();
  // Show all stored briefs, newest first. No limit—older briefs stay accessible.
  const listRows =
    briefList.length > 0
      ? briefList
      : [{ date: today, headline: "STR news" }];

  return (
    <main className="max-w-2xl mx-auto px-5 sm:px-6 py-14 sm:py-20 min-[1025px]:py-24">
      <article className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        <h1 className="text-4xl font-semibold text-label-primary tracking-tight mb-5">
          What most buyers never learn
        </h1>
        <p className="text-sm text-label-secondary leading-relaxed mb-14">
          Occupancy traps. Stale comps. Where the hype falls apart. Read this before you run your numbers.
        </p>

        <div className="space-y-6 overflow-visible">
          {evergreenArticles.map((article) => (
            <LearnCard
              key={article.href}
              href={article.href}
              title={article.title}
              excerpt={article.excerpt}
            />
          ))}
        </div>

        <div className="mt-14 pt-10 border-t border-gray-200/60">
          <h2 className="text-sm font-semibold text-label-secondary uppercase tracking-wider mb-3">Daily market briefs</h2>
          <p className="text-sm text-label-tertiary mb-4 leading-relaxed">Newest first. Older briefs stay in the list.</p>
          <div className="overflow-hidden rounded-xl border border-gray-200/60 bg-surface-elevated shadow-card">
            {listRows.map(({ date, headline }) => (
              <Link
                key={date}
                href={`/learn/brief/${date}`}
                className="flex items-center gap-2 px-4 py-3.5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/80 hover:text-accent transition-colors duration-200 group min-w-0"
              >
                <span className="shrink-0 w-[11rem] text-label-primary group-hover:text-accent transition-colors duration-button ease-friction">
                  {formatBriefDate(date)}
                </span>
                <span className="shrink-0 text-label-tertiary" aria-hidden>·</span>
                <span className="min-w-0 flex-1 truncate text-label-primary group-hover:text-accent transition-colors duration-button ease-friction">
                  {headline}
                </span>
                <svg className="w-5 h-5 text-label-tertiary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-10 border-t border-gray-200/60">
          <PrimaryCTA sourcePath="/learn">
            <Link
              href="/#analyze"
              className="inline-flex items-center min-h-[48px] px-6 py-3 rounded-xl bg-accent text-white font-semibold shadow-button transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_2px_8px_rgba(0,113,227,0.25)] active:scale-[0.98]"
            >
              Check the numbers before you buy · $49
            </Link>
          </PrimaryCTA>
        </div>
      </article>
    </main>
  );
}
