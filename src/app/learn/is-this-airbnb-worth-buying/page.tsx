import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Is This Airbnb Worth Buying? A Decision Framework",
  description:
    "A practical framework for evaluating STR deals: when to proceed, when to pause, and when to walk away from an Airbnb investment.",
};

export default function IsThisAirbnbWorthBuyingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Is This Airbnb Worth Buying? A Decision Framework",
    description:
      "A practical framework for evaluating STR deals: when to proceed, when to pause, and when to walk away.",
    author: { "@type": "Organization", name: "STR Estimator" },
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="prose prose-gray max-w-none opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        <Link
          href="/learn"
          className="text-sm text-accent hover:text-accent-hover mb-6 inline-block"
        >
          ← Back to Learn
        </Link>
        <h1 className="font-sans text-3xl font-semibold text-label-primary tracking-tight mb-6">
          Proceed, pause, or walk away?
        </h1>
        <p className="text-lg text-label-secondary leading-relaxed mb-8">
          Every deal comes down to this. Here's a framework that actually works
          when the numbers get fuzzy.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-label-primary mb-4">
            Proceed
          </h2>
          <p className="text-label-secondary mb-4">
            Numbers hold. Cash flow's positive or comfortably break-even. You've
            got room for occupancy or rate to dip without the whole thing collapsing.
          </p>
          <p className="text-label-secondary">
            Next: due diligence. Zoning, HOA rules, local demand, regulatory risk.
            The analysis says it can work—now confirm the details.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-label-primary mb-4">
            Pause (Borderline)
          </h2>
          <p className="text-label-secondary mb-4">
            Cash flow's thin or slightly negative. The deal lives or dies on hitting
            your assumptions. A weak year? Meaningful stress.
          </p>
          <p className="text-label-secondary">
            Only proceed if you've got 6–12 months of reserves and can stomach
            break-even. Otherwise—pass. Find something stronger.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-label-primary mb-4">
            Walk away
          </h2>
          <p className="text-label-secondary mb-4">
            The deal fails under conservative assumptions. Revenue vs. costs—
            gap's too big. Walking away means you're not subsidizing a property or
            hoping optimistic projections pan out.
          </p>
          <p className="text-label-secondary">
            Reasonable call. Most disciplined buyers wouldn't take on something
            that fails under stress-tested numbers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-label-primary mb-4">
            No hedging
          </h2>
          <p className="text-label-secondary">
            The framework works because it's binary. Every deal gets one verdict.
            No "it depends." No caveats. You get a clear answer you can act on.
          </p>
        </section>

        <div className="pt-8 border-t border-gray-100">
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
