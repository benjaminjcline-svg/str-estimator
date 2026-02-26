import type { Metadata } from "next";
import Link from "next/link";
import { TrackedSampleLink } from "@/components/TrackedSampleLink";
import { canonicalUrl } from "@/lib/seo";
import { articleSchema } from "@/lib/seo";

const slug = "why-str-calculators-disagree";
const title = "Why STR calculators disagree by tens of thousands of dollars";
const description =
  "Why short-term rental calculators give wildly different numbers. Seasonality, comp selection, data lag, amenities, management, regulations, and cost blind spots.";

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

export default function WhyStrCalculatorsDisagreePage() {
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
            Why STR calculators disagree by tens of thousands of dollars
          </h1>
          <p className="text-sm text-label-secondary leading-relaxed mb-6">
            Run the same property through a few STR tools and you will get different numbers. Sometimes tens of thousands apart. Here is why, and what to do about it.
          </p>

          <div className="p-5 rounded-2xl bg-surface-elevated border border-gray-200/60 shadow-card mb-8">
            <p className="text-sm font-medium text-label-primary mb-1">If you only do one thing</p>
            <p className="text-sm text-label-secondary leading-relaxed">
              Use a conservative reality check that shows scenario ranges and a clear verdict, not a single optimistic number. See <Link href="/" className="text-accent hover:text-accent-hover underline">STR Estimator</Link> or the <TrackedSampleLink sourceArticle="why-str-calculators-disagree" className="text-accent hover:text-accent-hover underline">sample report</TrackedSampleLink>.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Seasonality
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Many tools assume peak-season performance year-round. In seasonal markets, slow months can be 30–50% below peak. Small differences in how seasonality is modeled swing annual revenue by a lot. For more, see <Link href="/learn/str-seasonality-reality-check" className="text-accent hover:text-accent-hover underline">STR seasonality reality check</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Comp selection and quality
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Comps may be newer, better located, or better amenitized than your property. One tool may use a tight radius; another may pull from a wider or different segment. The choice of comps alone can move estimates by thousands.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Data lag and sampling bias
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Scraped or self-reported data can be stale. Listings that are no longer active still show up. Survivorship bias: you often see the ones that perform well. The ones that failed or sat empty are not in the sample. We do not claim perfect market data; when something is unknown, we say so.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Amenity and finish differences
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              They change rates and occupancy more than people assume. A pool, view, or higher-end finish can command a premium; a basic box cannot. Many tools do not adjust enough for these differences, so generalized comps over- or under-state your case.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Management and turnover
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Self-manage vs third-party changes costs and vacancy. Per-stay cleaning and turnover between guests vary; many tools use simple averages. Management variance alone can swing net income by a meaningful amount.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Local regulation risk
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              New rules or enforcement can cut demand or add cost. Not all tools factor in regulation risk. A market that looks great today may look different in a year.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Cost blind spots
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Cleaning, utilities, STR insurance, maintenance, and reserves add up. Many calculators use bare-bones expense assumptions. Real-world costs are higher. Small differences in expense modeling can move net income by thousands. For what breaks first when margins are thin, see the <Link href="/learn/str-fragility-checklist" className="text-accent hover:text-accent-hover underline">STR fragility checklist</Link>. For how to stress-test properly, read <Link href="/learn/conservative-str-underwriting" className="text-accent hover:text-accent-hover underline">conservative STR underwriting</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              What to do instead
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Use a downside-first reality check. Run your numbers through underwriting that caps optimism, shows strong/typical/weak scenarios, and gives you a clear verdict. See the <TrackedSampleLink sourceArticle="why-str-calculators-disagree" className="text-accent hover:text-accent-hover underline">sample report</TrackedSampleLink> or <Link href="/" className="text-accent hover:text-accent-hover underline">stress-test your deal</Link>.
            </p>
          </section>

          <div className="pt-8 border-t border-gray-100">
            <p className="text-sm text-label-secondary mb-4">
              Related: <Link href="/learn/conservative-str-underwriting" className="text-accent hover:text-accent-hover underline">Conservative STR underwriting</Link>, <Link href="/learn/str-fragility-checklist" className="text-accent hover:text-accent-hover underline">STR fragility checklist</Link>, <Link href="/sample-report" className="text-accent hover:text-accent-hover underline">Sample report</Link>.
            </p>
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
