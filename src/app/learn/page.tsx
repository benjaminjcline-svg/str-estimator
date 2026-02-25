import type { Metadata } from "next";
import Link from "next/link";
import { LearnCard } from "@/components/LearnCard";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { getCachedBriefList, getTodayDateString } from "@/lib/content-engine/brief-service";

export const metadata: Metadata = {
  title: "STR Buying Guide",
  description:
    "What most buyers get wrong. Occupancy traps, stale comps, and the real numbers behind STR cash flow. Learn before you buy.",
};

const evergreenArticles = [
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
  const todayBrief = briefList.find((b) => b.date === today);
  const pastBriefs = briefList.filter((b) => b.date !== today);

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
      <article className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        <h1 className="font-sans text-3xl sm:text-4xl font-semibold text-label-primary tracking-tight mb-4">
          What most buyers never learn
        </h1>
        <p className="text-lg text-label-secondary mb-12">
          Occupancy traps. Stale comps. Where the hype falls apart. Read this before you run your numbers.
        </p>

        <div className="space-y-8 overflow-visible">
          {evergreenArticles.map((article) => (
            <LearnCard
              key={article.href}
              href={article.href}
              title={article.title}
              excerpt={article.excerpt}
            />
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="overflow-hidden">
            <Link
              href={`/learn/brief/${today}`}
              className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-b-0 hover:text-accent transition-colors duration-button ease-friction group"
            >
              <span className="text-label-primary group-hover:text-accent transition-colors duration-button ease-friction">
                {formatBriefDate(today)} · {todayBrief?.headline ?? "STR news"}
              </span>
              <svg className="w-5 h-5 text-label-tertiary shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            {pastBriefs.map(({ date, headline }) => (
              <Link
                key={date}
                href={`/learn/brief/${date}`}
                className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-b-0 hover:text-accent transition-colors duration-button ease-friction group"
              >
                <span className="text-label-primary group-hover:text-accent transition-colors duration-button ease-friction">
                  {formatBriefDate(date)} · {headline}
                </span>
                <svg className="w-5 h-5 text-label-tertiary shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <PrimaryCTA sourcePath="/learn">
          <Link
            href="/#analyze"
            className="inline-block px-6 py-3 rounded-xl bg-accent text-white font-medium transition-all duration-button ease-friction hover:bg-accent-hover active:scale-[0.94]"
          >
            Check the numbers before you buy · $49
          </Link>
        </PrimaryCTA>
        </div>
      </article>
    </main>
  );
}
