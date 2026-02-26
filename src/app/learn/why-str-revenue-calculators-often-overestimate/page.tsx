import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/seo";
import { articleSchema } from "@/lib/seo";

const slug = "why-str-revenue-calculators-often-overestimate";
const title = "Why STR Revenue Calculators Often Overestimate";
const description =
  "Why short-term rental calculators give inflated numbers. Data lag, optimistic defaults, and how to sanity-check your STR projections.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl(`/learn/${slug}`) },
};

const jsonLd = articleSchema({
  headline: title,
  description,
  slug,
});

export default function WhyStrRevenueCalculatorsOftenOverestimatePage() {
  return (
    <main className="min-h-screen bg-surface">
      <div className="border-b border-gray-100/80 bg-surface-elevated/80 backdrop-blur-sm py-6">
        <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
          <Link
            href="/learn"
            className="text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-button ease-friction"
          >
            ← Back to Learn
          </Link>
          <span className="text-sm font-medium text-label-secondary">
            STR Buying Guide
          </span>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 py-12 sm:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="prose prose-gray max-w-none opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
          <h1 className="text-2xl font-semibold text-label-primary tracking-tight mb-6">
            Why STR revenue calculators often overestimate
          </h1>
          <p className="text-sm text-label-secondary leading-relaxed mb-8">
            If you have run the same property through several STR calculators and gotten wildly different numbers, you are not imagining it. Many tools overestimate. Here is why, and how to think about it.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Optimistic defaults
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Default occupancy and nightly rates are often set at the high end. Peak-season or top-performer data gets treated as typical. Small changes in those assumptions swing the outcome a lot. A calculator that assumes 70% occupancy and $200/night will look very different from one that assumes 55% and $160.
            </p>
            <p className="text-sm text-label-secondary">
              The fix: use conservative inputs, or use a tool that caps optimism and shows you a range.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Data lag and sampling bias
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Scraped or self-reported data can be stale. Listings that are no longer active, or that were booked months ago at old rates, still show up in comps. Survivorship bias: the listings you see are often the ones that perform well. The ones that failed or sat empty are not in the sample.
            </p>
            <p className="text-sm text-label-secondary">
              We do not claim perfect market data. When something is unknown, we say so and apply conservative defaults.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Seasonality treated as year-round
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Many tools take peak-season performance and imply it holds all year. In seasonal markets, slow months can be 30–50% below peak. Underwriting on peak alone makes the deal look better than it is.
            </p>
            <p className="text-sm text-label-secondary">
              Stress-test for a weak year and for the slow months. If the deal only works in the best months, it is fragile.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Expenses understated
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Cleaning, management, utilities, STR insurance, maintenance, and reserves add up. Some calculators use bare-bones expense assumptions. Real-world costs are higher. We build in realistic expenses and tell you what we assumed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              No downside scenario
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              A single point estimate does not tell you what happens in a weak year or when occupancy drops. You need ranges and stress tests. We show strong, typical, and weak year outcomes so you can see where the deal breaks.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              What to do instead
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Use a conservative reality check before you buy. Run your numbers through underwriting that caps optimism, shows downside scenarios, and gives you a clear verdict. See the <Link href="/sample-report" className="text-accent hover:text-accent-hover underline">sample report</Link> for what that looks like, or <Link href="/" className="text-accent hover:text-accent-hover underline">run your deal</Link>.
            </p>
          </section>

          <div className="pt-8 border-t border-gray-100">
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-xl bg-accent text-white font-medium transition-all duration-button ease-friction hover:bg-accent-hover active:scale-[0.94]"
            >
              Run your deal. $49
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
