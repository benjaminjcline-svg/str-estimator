import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryCTA } from "@/components/PrimaryCTA";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Straight answers on STR Estimator: how it works, what you get, and why we don't make up numbers.",
};

const faqs = [
  {
    q: "What is this?",
    a: "We run your STR deal through stress-tested underwriting and give you one of three verdicts: Proceed, Borderline, or Walk Away. Built for buyers evaluating one to three properties. No fluff.",
  },
  {
    q: "How much?",
    a: "$49 per property. One report. No subscription. Worth it even when we tell you to walk.",
  },
  {
    q: "Do you make up market data?",
    a: "No. We don't invent comps, occupancy stats, or local laws. When something's unknown, we say so. We cap optimistic assumptions and tell you exactly what we assumed.",
  },
  {
    q: "What if I think occupancy will be higher?",
    a: "We cap it. Occupancy above ~65% is treated as fragile. Because it usually is. We factor in seasonality, per-stay cleaning, STR insurance, and vacancy. Real-world stuff.",
  },
  {
    q: "Long-term or mid-term rentals?",
    a: "Short-term only. We don't do LTR or MTR, and we don't advise switching strategies.",
  },
  {
    q: "What's in the report?",
    a: "Your verdict (with reasoning), three income scenarios (strong/typical/weak year), where most buyers underestimate costs, the one assumption that could kill the deal, and what a bad year actually looks like.",
  },
  {
    q: "How do I use the verdict?",
    a: "Proceed = numbers hold, do due diligence. Borderline = thin margins, only if you've got reserves. Walk Away = deal fails, find something better.",
  },
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <main className="max-w-2xl mx-auto px-5 sm:px-6 py-14 sm:py-20 min-[1025px]:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <article className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        <h1 className="font-sans text-3xl sm:text-4xl min-[1200px]:text-[2.25rem] font-semibold text-label-primary tracking-tight mb-5">
          Questions? Answers.
        </h1>
        <p className="text-label-secondary leading-relaxed mb-14">
          No corporate speak. Just what you need to know.
        </p>

        <dl className="space-y-10">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-100 last:border-0 pb-10 last:pb-0">
              <dt className="text-[1.0625rem] font-semibold text-label-primary mb-2">
                {faq.q}
              </dt>
              <dd className="text-label-secondary leading-relaxed text-[0.9375rem] sm:text-base">{faq.a}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 pt-10 border-t border-gray-200/60">
          <PrimaryCTA sourcePath="/faq">
            <Link
              href="/#analyze"
              className="inline-flex items-center min-h-[48px] px-6 py-3 rounded-xl bg-accent text-white font-semibold shadow-button transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_2px_8px_rgba(0,113,227,0.25)] active:scale-[0.98]"
            >
              Stress-test this deal · $49
            </Link>
          </PrimaryCTA>
        </div>
      </article>
    </main>
  );
}
