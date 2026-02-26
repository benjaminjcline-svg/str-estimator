import type { Metadata } from "next";
import Link from "next/link";
import { TrackedSampleLink } from "@/components/TrackedSampleLink";
import { canonicalUrl } from "@/lib/seo";
import { articleSchema } from "@/lib/seo";

const slug = "str-seasonality-reality-check";
const title = "STR Seasonality Reality Check for Underwriting";
const description =
  "Why seasonality breaks STR deals. How to stress-test occupancy and rates for slow months instead of assuming peak year-round.";

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

export default function StrSeasonalityRealityCheckPage() {
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
            STR seasonality reality check for underwriting
          </h1>
          <p className="text-sm text-label-secondary leading-relaxed mb-8">
            Underwriting a short-term rental as if peak season lasts all year is one of the fastest ways to overpay. Here is how seasonality shows up and how to stress-test for it.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Peak vs. full year
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              In most markets, STR demand and rates swing by season. Summer or ski season might be 2–3x the revenue of the slow months. If you underwrite on peak only, you are assuming that performance holds every month. It usually does not.
            </p>
            <p className="text-sm text-label-secondary">
              Use full-year assumptions. If you only have peak data, haircut it. Assume 50–65% occupancy on average across the year unless you have verified local data that says otherwise.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              What breaks in the slow months
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Fixed costs (mortgage, taxes, insurance, HOA) do not go down when occupancy drops. Revenue does. A 40% occupancy month with the same fixed costs can turn a thin deal negative. Vacancy, turnover, and lower nightly rates in the off-season compound the problem.
            </p>
            <p className="text-sm text-label-secondary">
              Plan for at least one or two slow months every year. If the deal cannot carry them, it is not resilient. For what breaks first in tight deals, see the <Link href="/learn/str-fragility-checklist" className="text-accent hover:text-accent-hover underline">STR fragility checklist</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Local patterns matter
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Beach, mountain, and city markets all have different curves. Some have a sharp peak and long trough. Others are more even. Do not assume your market behaves like another. When we do not have market-specific data, we assume seasonality and cap optimistic occupancy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              How we handle it
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              We assume seasonality in every market. We do not treat peak performance as year-round. We show you strong, typical, and weak year scenarios so you can see how the deal holds up when the slow months hit. No guarantees, but the analysis is built for reality, not best case.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Practical takeaways
            </h2>
            <ul className="list-disc pl-6 text-label-secondary space-y-2 mb-4">
              <li>Do not underwrite on peak-season numbers alone.</li>
              <li>Assume at least one or two weak months per year.</li>
              <li>If your deal only works at 70%+ occupancy year-round, treat it as fragile.</li>
              <li>Use a tool that stresses for seasonality and shows a weak-year scenario.</li>
            </ul>
            <p className="text-sm text-label-secondary mb-4">
              For why many calculators overestimate in the first place, read <Link href="/learn/why-str-calculators-overestimate" className="text-accent hover:text-accent-hover underline">why STR calculators overestimate revenue</Link>. See our <TrackedSampleLink sourceArticle="str-seasonality-reality-check" className="text-accent hover:text-accent-hover underline">sample report</TrackedSampleLink> for how we present scenarios, or <Link href="/" className="text-accent hover:text-accent-hover underline">run your deal</Link> for a conservative reality check.
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
