import type { Metadata } from "next";
import Link from "next/link";
import { getCachedBriefDates } from "@/lib/content-engine/brief-service";

export const metadata: Metadata = {
  title: "STR Buying Guide",
  description:
    "What most buyers get wrong. Occupancy traps, stale comps, and the real numbers behind STR cash flow. Learn before you buy.",
};

const evergreenArticles = [
  {
    href: "/learn/brief",
    title: "STR Market Brief",
    excerpt:
      "Daily roundup across top 200 North American cities. LLM-powered synthesis of Skift, PhocusWire, Airbnb. What it means for your next deal.",
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
  const briefDates = await getCachedBriefDates();

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
      <article className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        <h1 className="font-sans text-3xl sm:text-4xl font-semibold text-label-primary tracking-tight mb-4">
          What most STR buyers never learn
        </h1>
        <p className="text-lg text-label-secondary mb-12">
          Occupancy traps. Stale comps. Where the hype falls apart. Read this
          before you run your numbers.
        </p>

        <div className="space-y-8">
          {evergreenArticles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="block p-6 rounded-2xl bg-surface-elevated border border-gray-100 shadow-soft hover:shadow-card hover:border-gray-200 transition-all duration-200 group"
            >
              <h2 className="text-xl font-semibold text-label-primary group-hover:text-accent transition-colors mb-2">
                {article.title}
              </h2>
              <p className="text-label-secondary">{article.excerpt}</p>
            </Link>
          ))}
        </div>

        {briefDates.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h2 className="text-lg font-semibold text-label-primary mb-3">
              Past briefs
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Browse daily roundups by date. Each lives at a permanent URL for SEO.
            </p>
            <div className="flex flex-wrap gap-2">
              {briefDates.map((date) => (
                <Link
                  key={date}
                  href={`/learn/brief/${date}`}
                  className="px-4 py-2 rounded-lg bg-surface-elevated border border-gray-100 text-sm font-medium text-accent hover:bg-gray-50 hover:border-gray-200 transition-colors"
                >
                  {formatBriefDate(date)}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl bg-accent text-white font-medium transition-all duration-200 hover:bg-accent-hover active:scale-[0.98]"
          >
            Run your deal — $49
          </Link>
        </div>
      </article>
    </main>
  );
}
