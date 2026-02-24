import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sample Report",
  description:
    "See what you get. A real excerpt—verdict, income scenarios, and where most buyers go wrong on costs.",
};

export default function SampleReportPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
      <article className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        <h1 className="font-sans text-3xl sm:text-4xl font-semibold text-label-primary tracking-tight mb-4">
          What your report looks like
        </h1>
        <p className="text-label-secondary mb-12">
          Here's an excerpt. Your full report adds the fragility analysis, downside
          reality, and what would need to be true for the deal to work.
        </p>

        <div className="space-y-8 mb-12 p-6 rounded-2xl bg-surface-elevated border border-gray-100 shadow-soft">
          <section>
            <h2 className="text-lg font-semibold text-label-primary mb-3">
              Your verdict
            </h2>
            <div className="inline-flex items-center px-4 py-2 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 font-semibold mb-4">
              Borderline
            </div>
            <p className="text-label-secondary leading-relaxed">
              Cash flow's thin or slightly negative. This deal lives or dies on
              hitting your occupancy and rate assumptions. A weak year? You're
              stressed. Only proceed if you've got reserves and can tolerate 6–12
              months of break-even.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-label-primary mb-3">
              Income reality—how it actually performs
            </h2>
            <p className="text-label-secondary mb-4">
              <strong>Strong year:</strong> Peak demand, limited competition,
              70–75% occupancy. Don't bank on this. It's not typical.
            </p>
            <p className="text-label-secondary mb-4">
              <strong>Typical year:</strong> Seasonality. Vacancy gaps. Rate
              pressure. Most owners see 50–60% occupancy over the full year.
            </p>
            <p className="text-label-secondary">
              <strong>Weak year:</strong> Occupancy drops into the 40s. Rates
              get cut. Cash flow goes negative. Recovery? 12–24 months.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-label-primary mb-3">
              Where buyers go wrong on costs
            </h2>
            <p className="text-label-secondary mb-2">
              • <strong>Fixed vs variable</strong> — Mortgage and tax don't budge.
              Revenue does. A 10% occupancy drop can wipe months of thin profit.
            </p>
            <p className="text-label-secondary mb-2">
              • <strong>Turnover</strong> — Every stay: cleaning, restocking,
              coordination. Self-manage? Saves money, costs time.
            </p>
            <p className="text-label-secondary">
              • <strong>CapEx creep</strong> — Roof, HVAC, appliances age. Plan for
              ongoing replacement. Not one-time.
            </p>
          </section>
        </div>

        <p className="text-label-secondary mb-8">
          Full report adds the one assumption that could kill the deal, what a bad
          year feels like, and what would need to be true for this to work.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-accent text-white font-medium transition-all duration-200 hover:bg-accent-hover active:scale-[0.98]"
        >
          Run your deal — $49
        </Link>
      </article>
    </main>
  );
}
