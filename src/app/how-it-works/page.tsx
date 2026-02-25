import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "We stress-test your numbers and tell you straight. Proceed, Borderline, or Walk Away. Here's what goes into it.",
};

export default function HowItWorksPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
      <article className="prose prose-gray max-w-none opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        <h1 className="font-sans text-3xl sm:text-4xl font-semibold text-label-primary tracking-tight mb-6">
          How it works
        </h1>
        <p className="text-lg text-label-secondary leading-relaxed mb-8">
          You enter your numbers. We run them through conservative underwriting. You get one of three verdicts: <strong>Proceed</strong>, <strong>Borderline</strong>, or <strong>Walk Away</strong>. That&apos;s it.
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-label-primary mb-4">
            What you enter
          </h2>
          <p className="text-label-secondary mb-4">
            Property and financing details. Price, down payment, rate, term, type (SFH, condo, duplex), and whether you&apos;ll self-manage. You can add your expected nightly rate and occupancy. We cap the optimistic stuff.
          </p>
          <p className="text-label-secondary">
            We don't invent comps or market data. When something's unknown, we say
            so. That uncertainty? It's in the analysis.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-label-primary mb-4">
            How we run it
          </h2>
          <p className="text-label-secondary mb-4">
            Occupancy above ~65%? We treat it as fragile. Seasonality? We assume
            it. Cleaning? Per-stay. Insurance? STR premiums. Vacancy? Non-zero,
            every market. CapEx? Ongoing, not one-time.
          </p>
          <p className="text-label-secondary">
            You get three income scenarios: strong year, typical year, weak year. Plus where buyers underestimate costs, the one assumption that could kill the deal, and what a bad year actually feels like.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-label-primary mb-4">
            Your verdict
          </h2>
          <p className="text-label-secondary mb-4">
            Every report ends with a verdict. No hedging. Something you can act on. Or forward to a partner.
          </p>
          <ul className="list-disc pl-6 text-label-secondary space-y-2">
            <li>
              <strong>Proceed.</strong> Numbers hold. Do due diligence.
            </li>
            <li>
              <strong>Borderline.</strong> Thin margins. Only proceed if you&apos;ve got reserves and can stomach break-even.
            </li>
            <li>
              <strong>Walk Away.</strong> Deal fails. Find something better.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-label-primary mb-4">
            Simple. Honest. Useful.
          </h2>
          <p className="text-label-secondary mb-8">
            We don&apos;t maximize upside. We don&apos;t talk you into a deal. We give you the truth. If the report helps you walk away from a bad one, we&apos;ve done our job.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl bg-accent text-white font-medium transition-all duration-button ease-friction hover:bg-accent-hover active:scale-[0.94]"
          >
            Run your deal. $49
          </Link>
        </section>
      </article>
    </main>
  );
}
