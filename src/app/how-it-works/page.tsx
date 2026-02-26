import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryCTA } from "@/components/PrimaryCTA";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Enter your property details. We stress-test the assumptions. You get a clear verdict. Fast, low effort, no pressure.",
};

export default function HowItWorksPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
      <article className="prose prose-gray max-w-none opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        <h1 className="font-sans text-3xl sm:text-4xl font-semibold text-label-primary tracking-tight mb-6">
          How it works
        </h1>
        <p className="text-lg text-label-secondary leading-relaxed mb-8">
          Three steps. No jargon. No long forms.
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-label-primary mb-4">
            1. Enter the property details
          </h2>
          <p className="text-label-secondary mb-4">
            Price, down payment, rate, term, property type (house, condo, duplex), and whether you'll self-manage. Optional: your expected nightly rate and occupancy. We cap optimistic assumptions either way.
          </p>
          <p className="text-label-secondary">
            We don't invent comps or market data. When something's unknown, we say so. That uncertainty shows up in the analysis.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-label-primary mb-4">
            2. We stress-test the assumptions
          </h2>
          <p className="text-label-secondary mb-4">
            High occupancy? We treat it as fragile. We factor in seasonality, per-stay cleaning, STR insurance, vacancy, and ongoing CapEx. You get three income scenarios: strong year, typical year, weak year. Plus where buyers underestimate costs, the one assumption that could kill the deal, and what a bad year actually feels like.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-label-primary mb-4">
            3. You get a clear verdict
          </h2>
          <p className="text-label-secondary mb-4">
            Every report ends with one of three verdicts. No hedging. Something you can act on or share with a partner.
          </p>
          <ul className="list-disc pl-6 text-label-secondary space-y-2">
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
          <h2 className="text-xl font-semibold text-label-primary mb-4">
            Why this exists
          </h2>
          <p className="text-label-secondary mb-4">
            Most STR calculators are built to make deals look good. Plug in 70% occupancy and a dream rate, and everything turns green. Reality is messier. Seasonality, competition, and one bad year can wipe out the margin. It's easy to talk yourself into a deal when the spreadsheet says yes.
          </p>
          <p className="text-label-secondary mb-4">
            Optimism is dangerous in short-term rentals. A single bad assumption can cost you more than an inspection. Conservative analysis isn't about being negative. It's about knowing where the deal breaks before you're in too deep.
          </p>
          <p className="text-label-secondary">
            We don't maximize upside. We don't talk you into a deal. If the report helps you walk away from a bad one, we've done our job.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-label-primary mb-4">
            Low effort. Low risk.
          </h2>
          <p className="text-label-secondary mb-8">
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
