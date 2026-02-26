import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Enter your property details. We stress-test the assumptions. You get a clear verdict. Conservative reality check, no hype. Fast, low effort.",
  alternates: { canonical: canonicalUrl("/how-it-works") },
};

export default function HowItWorksPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
      <article className="prose prose-gray max-w-none opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        <h1 className="text-2xl font-semibold text-label-primary tracking-tight mb-6">
          How it works
        </h1>
        <p className="text-sm text-label-secondary leading-relaxed mb-8">
          Three steps. No jargon. No long forms.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-label-primary mb-4">
            1. Enter the property details
          </h2>
          <p className="text-sm text-label-secondary mb-4">
            Price, down payment, rate, term, property type (house, condo, duplex), and whether you'll self-manage. Optional: your expected nightly rate and occupancy. We cap optimistic assumptions either way.
          </p>
          <p className="text-sm text-label-secondary">
            We don't invent comps or market data. When something's unknown, we say so. That uncertainty shows up in the analysis.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-label-primary mb-4">
            2. We stress-test the assumptions
          </h2>
          <p className="text-sm text-label-secondary mb-4">
            High occupancy? We treat it as fragile. We factor in seasonality, per-stay cleaning, STR insurance, vacancy, and ongoing CapEx. You get three income scenarios: strong year, typical year, weak year. Plus where buyers underestimate costs, the one assumption that could kill the deal, and what a bad year actually feels like.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-label-primary mb-4">
            3. You get a clear verdict
          </h2>
          <p className="text-sm text-label-secondary mb-4">
            Every report ends with one of three verdicts. No hedging. Something you can act on or share with a partner.
          </p>
          <ul className="list-disc pl-6 text-sm text-label-secondary space-y-2">
            <li>
              <strong>Proceed.</strong> Numbers hold. Do your due diligence.
            </li>
            <li>
              <strong>Borderline.</strong> Thin margins. Only proceed if you've got reserves and can stomach break-even.
            </li>
            <li>
              <strong>Walk Away.</strong> Deal fails. Find something better.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-label-primary mb-4">
            Why we do not rely on a single scraped estimate
          </h2>
          <p className="text-sm text-label-secondary mb-4">
            Address-based tools that spit out one number often depend on scraped or aggregated comps. Those can be stale, from better listings, or from markets that behave differently. We do not promise perfect market data. You enter what you know; we apply conservative haircuts and show scenario ranges. When something is unknown, we say so.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-label-primary mb-4">
            Why conservative scenarios are safer for purchase decisions
          </h2>
          <p className="text-sm text-label-secondary mb-4">
            Most STR calculators are built to make deals look good. Plug in 70% occupancy and a dream rate, and everything turns green. Reality is messier. Seasonality, competition, and one bad year can wipe out the margin. Conservative scenarios help you see how the deal holds up when things go wrong, before you commit capital.
          </p>
          <p className="text-sm text-label-secondary">
            We do not maximize upside. We do not talk you into a deal. If the report helps you walk away from a bad one, we have done our job.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-label-primary mb-4">
            How to use this tool
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-sm text-label-secondary leading-relaxed">
            <li><strong className="text-label-primary">Enter your assumptions.</strong> Be honest. We cap optimism either way, but your inputs drive the analysis.</li>
            <li><strong className="text-label-primary">Review the scenario range and fragility flags.</strong> Look at strong, typical, and weak year outcomes. See what breaks first.</li>
            <li><strong className="text-label-primary">Adjust only with verified info.</strong> Do not tweak numbers to get a better verdict. Use real data if you have it.</li>
            <li><strong className="text-label-primary">Use Walk Away as a valid outcome.</strong> A no is useful. It saves you from a bad deal.</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-label-primary mb-4">
            Why this exists
          </h2>
          <p className="text-sm text-label-secondary mb-4">
            Optimism is dangerous in short-term rentals. A single bad assumption can cost you more than an inspection. Conservative analysis is not about being negative. It is about knowing where the deal breaks before you are in too deep.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-label-primary mb-4">
            Low effort. Low risk.
          </h2>
          <p className="text-sm text-label-secondary mb-8">
            One-time payment. No subscription. No upsell. No calls. No pressure. Just a second look before you commit.
          </p>
          <PrimaryCTA sourcePath="/how-it-works">
            <Link
              href="/#analyze"
              className="inline-flex items-center min-h-[48px] px-6 py-3 rounded-xl bg-accent text-white font-semibold shadow-button transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_2px_8px_rgba(0,113,227,0.25)] active:scale-[0.98]"
            >
              Stress-test this deal · $49
            </Link>
          </PrimaryCTA>
        </section>
      </article>
    </main>
  );
}
