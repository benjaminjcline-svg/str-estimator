import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { TrackedSampleLink } from "@/components/TrackedSampleLink";
import { canonicalUrl } from "@/lib/seo";
import { articleSchema } from "@/lib/seo";

const slug = "str-fragility-checklist";
const title = "STR Fragility Checklist: What Breaks First in Tight Deals";
const description =
  "What breaks first when STR margins are thin. Occupancy, rate, expenses, and how to stress-test before you buy.";

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

export default function StrFragilityChecklistPage() {
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
            STR fragility checklist: what breaks first in tight deals
          </h1>
          <p className="text-sm text-label-secondary leading-relaxed mb-8">
            When STR margins are thin, small changes in occupancy, rate, or expenses can flip the deal. Here is what tends to break first and how to stress-test before you buy.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Occupancy
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              The biggest lever. A 5–10% drop in occupancy can wipe out most or all of the cash flow on a tight deal. Seasonality, new supply, or a dip in demand will show up here first. If your deal only works at 70%+ occupancy, it is fragile. We cap optimistic occupancy and flag when high occupancy is doing too much of the work. For how we handle seasonality, see our <Link href="/learn/str-seasonality-reality-check" className="text-accent hover:text-accent-hover underline">STR seasonality reality check</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Nightly rate
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Comps can be stale or from better listings. Rate compression from new inventory or regulation can push effective rates down. Stress-test 10–15% below what you think you can get. If the deal fails at that level, the margin is too thin.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Expenses
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Management, cleaning, utilities, STR insurance, maintenance, and reserves are often understated. One big repair or a rate increase in insurance can erase months of profit. We build in realistic expenses and call out the assumptions. If you are self-managing, do not assume zero cost for your time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Financing and holding costs
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Higher rates or a longer vacancy period increase holding costs. If you are stretching on the mortgage, a weak year can force you to subsidize the property out of pocket. Model a weak year and make sure you can carry it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              The one assumption that could kill the deal
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              In every deal, one or two assumptions do most of the work. Often it is occupancy or rate. We identify that in the report and explain what would have to go right for the deal to hold. If that assumption is fragile, the verdict reflects it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              How to use this
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Before you buy, run the numbers through conservative underwriting. Get a clear verdict (Proceed, Borderline, Walk Away) and a fragility explanation. If the deal is borderline, know exactly what would have to go right and whether you can stomach the downside. For why calculators disagree, read <Link href="/learn/why-str-calculators-disagree" className="text-accent hover:text-accent-hover underline">why STR calculators disagree</Link>. For how to stress-test properly, see <Link href="/learn/conservative-str-underwriting" className="text-accent hover:text-accent-hover underline">conservative STR underwriting</Link>. See the <TrackedSampleLink sourceArticle="str-fragility-checklist" className="text-accent hover:text-accent-hover underline">sample report</TrackedSampleLink> or <Link href="/" className="text-accent hover:text-accent-hover underline">run your deal</Link>.
            </p>
          </section>

          <div className="pt-8 border-t border-gray-100">
            <p className="text-sm text-label-secondary mb-4">
              Related: <Link href="/learn/why-str-calculators-disagree" className="text-accent hover:text-accent-hover underline">Why STR calculators disagree</Link>, <Link href="/learn/conservative-str-underwriting" className="text-accent hover:text-accent-hover underline">Conservative STR underwriting</Link>, <Link href="/sample-report" className="text-accent hover:text-accent-hover underline">Sample report</Link>.
            </p>
            <PrimaryCTA sourcePath="/learn/str-fragility-checklist">
              <Link
                href="/#analyze"
                className="inline-flex items-center min-h-[48px] px-6 py-3 rounded-xl bg-accent text-white font-semibold shadow-button transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_2px_8px_rgba(0,113,227,0.25)] active:scale-[0.98]"
              >
                Stress-test this deal · $49
              </Link>
            </PrimaryCTA>
          </div>
        </article>
      </div>
    </main>
  );
}
