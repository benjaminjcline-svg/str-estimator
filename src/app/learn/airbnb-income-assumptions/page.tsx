import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Airbnb Income Assumptions: What Buyers Get Wrong",
  description:
    "The 70% occupancy trap. Why comps lie. How to stress-test before you're in too deep.",
  alternates: { canonical: canonicalUrl("/learn/airbnb-income-assumptions") },
};

export default function AirbnbIncomeAssumptionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Airbnb Income Assumptions: What Buyers Get Wrong",
    description:
      "Most STR buyers overestimate occupancy and nightly rates. Learn how to stress-test your assumptions.",
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
          <h1 className="font-sans text-3xl font-semibold text-label-primary tracking-tight mb-6">
          The two numbers that kill most STR deals
        </h1>
        <p className="text-lg text-label-secondary leading-relaxed mb-8">
          Occupancy and nightly rate. That&apos;s where optimism meets reality. And where most buyers go wrong. Here&apos;s what gets people in trouble.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-label-primary mb-4">
            The 70% occupancy trap
          </h2>
          <p className="text-label-secondary mb-4">
            Everyone assumes 70%+ year-round. Peak season? Maybe. Full year? Most owners see 50–60%. Seasonality, competition, vacancy. It adds up.
            Assuming higher without real local data? Fragile.
          </p>
          <p className="text-label-secondary">
            If your deal only works at 75% occupancy, you're walking a tightrope.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-label-primary mb-4">
            Stale comps, stale rates
          </h2>
          <p className="text-label-secondary mb-4">
            That "similar" listing at $200/night? Could've been booked months ago.
            Or in a better spot. Supply goes up, rates compress. New regs cut
            demand. Using comps without stress-testing lower? You're exposed.
          </p>
          <p className="text-label-secondary">
            We don&apos;t invent comps. We apply conservative defaults when you can&apos;t verify. And we tell you what we assumed.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-label-primary mb-4">
            Stress-test it yourself
          </h2>
          <p className="text-label-secondary mb-4">
            Run the numbers at 55% occupancy. Drop the rate 15%. See what breaks. If the deal collapses, you&apos;re banking on best case. Smart buyers pause or walk.
          </p>
          <p className="text-label-secondary">
            We do this automatically. Conservative caps, three scenarios (strong,
            typical, weak year), and a verdict. No hand-waving.
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
