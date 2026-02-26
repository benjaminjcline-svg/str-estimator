import type { Metadata } from "next";
import Link from "next/link";
import { TrackedSampleLink } from "@/components/TrackedSampleLink";
import { canonicalUrl } from "@/lib/seo";
import { articleSchema } from "@/lib/seo";

const slug = "conservative-str-underwriting";
const title = "Conservative STR underwriting: stress-test a deal before you buy";
const description =
  "How to stress-test a short-term rental deal before you buy. Scenario ranges, downside buffers, expense realism, and decision thresholds.";

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

export default function ConservativeStrUnderwritingPage() {
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
            Conservative STR underwriting: stress-test a deal before you buy
          </h1>
          <p className="text-sm text-label-secondary leading-relaxed mb-6">
            Before you commit capital, run the deal through downside scenarios. Here is how conservative underwriting works and what to look for.
          </p>

          <div className="p-5 rounded-2xl bg-surface-elevated border border-gray-200/60 shadow-card mb-8">
            <p className="text-sm font-medium text-label-primary mb-1">If you only do one thing</p>
            <p className="text-sm text-label-secondary leading-relaxed">
              Get a clear verdict (Proceed, Borderline, Walk Away) and see strong, typical, and weak year scenarios. Use <Link href="/" className="text-accent hover:text-accent-hover underline">STR Estimator</Link> or the <TrackedSampleLink sourceArticle="conservative-str-underwriting" className="text-accent hover:text-accent-hover underline">sample report</TrackedSampleLink>.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Why scenario ranges, not a single number
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              A single point estimate does not tell you what happens in a weak year or when occupancy drops. Conservative underwriting shows you strong, typical, and weak year outcomes so you can see where the deal breaks. If it only works in the best case, it is fragile.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Downside buffers
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              We cap optimistic occupancy and rates. We do not assume peak season year-round. We stress for weak months and treat high occupancy as fragile. The goal is to see how the deal holds up when things go wrong, not to maximize a headline number.
            </p>
            <p className="text-sm text-label-secondary">
              For why calculators disagree in the first place, see <Link href="/learn/why-str-calculators-disagree" className="text-accent hover:text-accent-hover underline">why STR calculators disagree</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Expense realism
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Management, cleaning, utilities, STR insurance, maintenance, and reserves add up. Many tools understate them. Conservative underwriting includes realistic expenses and tells you what was assumed. If you are self-managing, do not assume zero cost for your time. For what breaks first when margins are thin, see the <Link href="/learn/str-fragility-checklist" className="text-accent hover:text-accent-hover underline">STR fragility checklist</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Decision thresholds: Proceed, Borderline, Walk Away
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Conservative underwriting should give you a clear verdict. Proceed means the numbers hold; do due diligence. Borderline means thin margins; only proceed if you have reserves and can stomach break-even. Walk Away means the deal fails; find something better. A no is a valid and useful outcome.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              The one assumption that could kill the deal
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              In every deal, one or two assumptions do most of the work. Often it is occupancy or rate. Good underwriting identifies that and explains what would have to go right for the deal to hold. If that assumption is fragile, the verdict should reflect it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              Do not optimize for a green light
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Enter honest assumptions. Do not tweak numbers to get a better verdict. Adjust only with verified info. Use Walk Away as a valid outcome. The goal is to know where the deal breaks before you are in too deep.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-label-primary mb-4">
              What to do next
            </h2>
            <p className="text-sm text-label-secondary mb-4">
              Run your deal through a conservative reality check. See the <TrackedSampleLink sourceArticle="conservative-str-underwriting" className="text-accent hover:text-accent-hover underline">sample report</TrackedSampleLink> for what that looks like, or <Link href="/" className="text-accent hover:text-accent-hover underline">stress-test your deal</Link>.
            </p>
          </section>

          <div className="pt-8 border-t border-gray-100">
            <p className="text-sm text-label-secondary mb-4">
              Related: <Link href="/learn/why-str-calculators-disagree" className="text-accent hover:text-accent-hover underline">Why STR calculators disagree</Link>, <Link href="/learn/str-fragility-checklist" className="text-accent hover:text-accent-hover underline">STR fragility checklist</Link>, <Link href="/sample-report" className="text-accent hover:text-accent-hover underline">Sample report</Link>.
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
