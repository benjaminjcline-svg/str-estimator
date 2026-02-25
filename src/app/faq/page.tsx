import type { Metadata } from "next";
import Link from "next/link";

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
    a: "No. We don&apos;t invent comps, occupancy stats, or local laws. When something&apos;s unknown, we say so. We cap optimistic assumptions and tell you exactly what we assumed.",
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
    <main className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <article className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        <h1 className="font-sans text-3xl sm:text-4xl font-semibold text-label-primary tracking-tight mb-4">
          Questions? Answers.
        </h1>
        <p className="text-label-secondary mb-12">
          No corporate speak. Just what you need to know.
        </p>

        <dl className="space-y-8">
          {faqs.map((faq, i) => (
            <div key={i}>
              <dt className="text-lg font-semibold text-label-primary mb-2">
                {faq.q}
              </dt>
              <dd className="text-label-secondary leading-relaxed">{faq.a}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            href="/#analyze"
            className="inline-block px-6 py-3 rounded-xl bg-accent text-white font-medium transition-all duration-button ease-friction hover:bg-accent-hover active:scale-[0.94]"
          >
            Stress-test this deal · $49
          </Link>
        </div>
      </article>
    </main>
  );
}
