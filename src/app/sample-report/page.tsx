import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sample Report",
  description:
    "See what your STR report looks like: verdict, numbers, income scenarios, and where the deal can break. Conservative reality check. $49.",
  alternates: { canonical: canonicalUrl("/sample-report") },
};

export default function SampleReportPage() {
  return (
    <main className="min-h-screen bg-surface">
      <div className="border-b border-gray-100/80 bg-surface-elevated/80 backdrop-blur-sm py-6">
        <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-button ease-friction"
          >
            ← Back
          </Link>
          <span className="text-sm font-medium text-label-secondary">
            Sample report · Preview
          </span>
        </div>
      </div>

      <article className="max-w-2xl mx-auto px-6 py-12 sm:py-16 space-y-14">
        <header className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
          <h1 className="text-2xl font-semibold text-label-primary tracking-tight mb-2">
            What your report looks like
          </h1>
          <p className="text-sm text-label-tertiary mb-2">
            Sample: 3br SFH, Austin. $385k, 20% down
          </p>
          <p className="text-sm text-label-secondary mb-6">
            Verdict, numbers, three income scenarios, and where the deal can break. One bad assumption can cost more than an inspection. This report costs $49.
          </p>
          <p className="text-sm text-label-tertiary mb-5">123 Example St, Austin, TX</p>
          <h2 className="text-2xl font-semibold text-label-primary tracking-tight mb-4">
            Your verdict
          </h2>
          <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl border-2 border-amber-200 bg-amber-50 text-amber-800 font-semibold text-base mb-6">
            <span className="text-base leading-none">◐</span>
            Borderline
          </div>

          <div className="p-5 rounded-2xl bg-surface-elevated border border-gray-100 mb-6">
            <h3 className="text-base font-semibold text-label-primary mb-4">By the numbers</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              <div>
                <p className="text-label-tertiary text-sm">Monthly revenue</p>
                <p className="text-label-primary font-semibold">$2,100</p>
                <p className="text-2xs text-label-tertiary">@ 55% occ.</p>
              </div>
              <div>
                <p className="text-label-tertiary text-sm">Monthly costs</p>
                <p className="text-label-primary font-semibold">$2,350</p>
              </div>
              <div>
                <p className="text-label-tertiary text-sm">Net monthly</p>
                <p className="font-semibold text-rose-700">−$250</p>
              </div>
              <div>
                <p className="text-label-tertiary text-sm">Nightly rate assumed</p>
                <p className="text-label-primary font-semibold">$175/night</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <p className="text-sm text-label-secondary leading-relaxed">
              Cash flow's thin or slightly negative.{" "}
              <span className="sample-report-blur inline">
                This deal lives or dies on hitting your occupancy and rate assumptions. A weak year? Meaningful stress. Only proceed if you've got reserves and can stomach 6–12 months of break-even.
              </span>
            </p>
            <p className="text-sm text-label-tertiary leading-relaxed mt-3">
              This conclusion reflects conservative assumptions based on typical STR performance. If your verified data materially exceeds these assumptions, outcomes could improve.
            </p>
            <p className="text-sm text-label-tertiary mt-4">
              <a href="#" className="text-accent hover:text-accent-hover">
                Compare to Zillow Zestimate →
              </a>
            </p>
          </div>
        </header>

        <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "80ms" }}>
          <h2 className="text-2xl font-semibold text-label-primary mb-6 tracking-tight">
            Income reality: how it actually performs
          </h2>
          <div className="space-y-4">
            {[
              { title: "Strong Year", accent: "border-l-emerald-400" },
              { title: "Typical Year", accent: "border-l-accent" },
              { title: "Weak Year", accent: "border-l-amber-400" },
            ].map(({ title, accent }) => (
              <div
                key={title}
                className={`p-5 pl-6 rounded-2xl bg-surface-elevated border border-gray-100 border-l-4 ${accent}`}
              >
                <h3 className="font-semibold text-label-primary mb-2">{title}</h3>
                <div className="sample-report-blur space-y-2">
                  <p className="text-sm text-label-secondary">
                    Peak demand, limited competition, rates at or above $175/night, 70–75% occupancy.
                  </p>
                  <p className="text-label-primary leading-relaxed">
                    Gross revenue could run 20–25% above baseline. Cash flow gets comfortable. But you can't count on this. Favorable conditions don't last forever.
                  </p>
                  <p className="text-sm text-amber-600 italic">Don't bank on this. It's not typical.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "160ms" }}>
          <h2 className="text-2xl font-semibold text-label-primary mb-6 tracking-tight">
            Where buyers go wrong on costs
          </h2>
          <div className="space-y-4">
            {["Fixed vs variable", "Turnover and cleaning", "Utilities, consumables, wear", "Insurance and tax", "CapEx creep"].map((area) => (
              <div
                key={area}
                className="p-5 rounded-2xl bg-surface-elevated border border-gray-100"
              >
                <h4 className="font-medium text-label-primary mb-1.5">{area}</h4>
                <div className="sample-report-blur">
                  <p className="text-sm text-label-secondary leading-relaxed">
                    Mortgage, tax, insurance: fixed. Revenue: variable. A 10% occupancy drop can wipe months of thin profit. Every stay adds cleaning, restocking, coordination costs.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "240ms" }}>
          <h2 className="text-2xl font-semibold text-label-primary mb-6 tracking-tight">
            The one assumption that could kill the deal
          </h2>
          <div className="relative p-6 rounded-2xl bg-amber-50/50 border-2 border-amber-200">
            <div className="sample-report-blur space-y-3">
              <p>
                <strong>Critical assumption:</strong> Occupancy at 55% or higher. Deal works only if occupancy holds and rates stay around $175. First thing that breaks: monthly cash flow.
              </p>
              <p className="text-label-secondary">
                When it weakens, occupancy drops 5–10 points or rates compress. The gap narrows fast. Negative flow can hit in 1–2 months.
              </p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-amber-50/90">
              <span className="text-sm font-medium text-amber-800 bg-amber-100 px-4 py-2 rounded-lg">
                In your full report
              </span>
            </div>
          </div>
        </section>

        <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "320ms" }}>
          <h2 className="text-2xl font-semibold text-label-primary mb-6 tracking-tight">
            What a bad year feels like
          </h2>
          <div className="relative p-6 rounded-2xl bg-rose-50/50 border-2 border-rose-200">
            <div className="sample-report-blur space-y-3">
              <p><strong>Monthly cash bleed:</strong> Roughly $400–$520/month depending on actual performance.</p>
              <p><strong>Duration:</strong> Stress lasts 6–18 months. Markets don't bounce overnight.</p>
              <p>Carrying a negative-cash-flow STR is draining. Financial and mental load. Right when you hoped for passive income.</p>
              <p>Survivable with reserves. Not comfortable. Every negative month erodes your cushion.</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-rose-50/90">
              <span className="text-sm font-medium text-rose-800 bg-rose-100 px-4 py-2 rounded-lg">
                In your full report
              </span>
            </div>
          </div>
        </section>

        <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "400ms" }}>
          <h2 className="text-2xl font-semibold text-label-primary mb-6 tracking-tight">
            What would need to be true for this to work
          </h2>
          <div className="relative">
            <ul className="space-y-3 sample-report-blur">
              {[
                "Verified occupancy data from this specific market",
                "Zoning and HOA explicitly allow STRs",
                "6–12 months of reserves for negative cash flow",
                "Nightly rates of $175+ achievable based on comps",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-label-secondary">
                  <span className="text-accent font-medium mt-0.5 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="absolute inset-0 flex items-center justify-center bg-surface/80 rounded-2xl">
              <span className="text-sm font-medium text-label-secondary bg-white px-4 py-2 rounded-lg border border-gray-100">
                In your full report
              </span>
            </div>
          </div>
        </section>

        <section className="opacity-0 animate-slide-up pt-10 border-t-2 border-gray-200" style={{ animationFillMode: "forwards", animationDelay: "480ms" }}>
          <h2 className="text-2xl font-semibold text-label-primary mb-4 tracking-tight">
            My take
          </h2>
          <div className="relative p-6 rounded-2xl bg-accent/5 border border-accent/20">
            <div className="sample-report-blur">
              <p className="text-sm text-label-primary leading-relaxed font-medium">
                My take: pause unless you've got strong reserves and conviction. Most disciplined buyers pass on borderline when better deals exist. Reasonable to walk.
              </p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-surface-elevated/95">
              <span className="text-sm font-medium text-accent bg-accent/10 px-4 py-2 rounded-lg">
                In your full report
              </span>
            </div>
          </div>
        </section>

        <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "520ms" }}>
          <h2 className="text-2xl font-semibold text-label-primary mb-4 tracking-tight">
            Why this is still a good outcome
          </h2>
          <div className="relative p-6 rounded-2xl bg-surface-elevated border border-gray-100">
            <div className="sample-report-blur space-y-3">
              <p className="text-label-secondary leading-relaxed">
                Avoiding a weak deal is often the most profitable move. Capital not tied up in a fragile property stays flexible. So does your time and attention.
              </p>
              <p className="text-label-secondary leading-relaxed">
                Walking away with clarity beats moving forward on hope. You have a clear answer. That is a good outcome.
              </p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-surface-elevated/95">
              <span className="text-sm font-medium text-label-secondary bg-white px-4 py-2 rounded-lg border border-gray-100">
                In your full report
              </span>
            </div>
          </div>
        </section>

        <div className="pt-10 border-t border-gray-100 text-center space-y-6">
          <p className="text-label-secondary">
            One bad assumption can cost more than an inspection. One bad deal can cost a lot more. $49 for a reality check before you commit.
          </p>
          <PrimaryCTA sourcePath="/sample-report">
          <Link
            href="/#analyze"
            className="inline-block px-6 py-3 rounded-xl bg-accent text-white font-medium transition-all duration-button ease-friction hover:bg-accent-hover active:scale-[0.94]"
          >
            Stress-test your deal · $49
          </Link>
        </PrimaryCTA>
        </div>
      </article>
    </main>
  );
}
