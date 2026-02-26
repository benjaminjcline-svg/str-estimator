import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Short-Term Rental Cash Flow Reality",
  description:
    "The gap between projected and actual STR income. What breaks first, and how to plan for weak years in short-term rental cash flow.",
};

export default function ShortTermRentalCashFlowRealityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Short-Term Rental Cash Flow Reality",
    description:
      "The gap between projected and actual STR income. What breaks first, and how to plan for weak years.",
    author: { "@type": "Organization", name: "STR Estimator" },
  };

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
          <h1 className="text-4xl font-semibold text-label-primary tracking-tight mb-6">
          Where the gap between projected income and your bank account kills deals
        </h1>
        <p className="text-sm text-label-secondary leading-relaxed mb-8">
          Projected STR income vs. what actually hits. That's where most deals die. Here's what breaks first. And how to plan for it.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-label-primary mb-4">
            Fixed costs. Variable revenue.
          </h2>
          <p className="text-sm text-label-secondary mb-4">
            Mortgage, taxes, insurance: fixed. STR revenue? Wildly variable. A 10%
            occupancy drop can wipe months of thin profit. First thing that breaks
            in a weak year: cash flow. It goes negative fast.
          </p>
          <p className="text-sm text-label-secondary">
            Plan for vacancy in every market. Assume seasonality. Plan for the weak year. Not the strong one.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-label-primary mb-4">
            Where buyers go wrong
          </h2>
          <p className="text-sm text-label-secondary mb-4">
            Cleaning's per-stay, not monthly. Every turnover costs time and money.
            Utilities run higher than LTR. STR insurance keeps going up. CapEx?
            Roof, HVAC, appliances age. These costs pile up.
          </p>
          <p className="text-sm text-label-secondary">
            Conservative underwriting builds them in. Optimistic projections skip
            them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-label-primary mb-4">
            What a bad year feels like
          </h2>
          <p className="text-sm text-label-secondary mb-4">
            Monthly bleed. Stress for 6–18 months. The emotional load of carrying
            a negative-cash-flow property. Recovery? Slow. Markets don't bounce
            overnight.
          </p>
          <p className="text-sm text-label-secondary">
            The question isn't whether a weak year can happen. It's whether you survive it. If the deal only works in a strong year, it's not built to last.
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
