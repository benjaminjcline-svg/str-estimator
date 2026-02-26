import type { Metadata } from "next";
import { Suspense } from "react";
import { HomePage } from "@/components/HomePage";
import { homeFaqs } from "@/lib/home-faq";
import { siteUrl } from "@/lib/site-config";

// Keyword-to-page: stress-test STR deal, conservative reality check, why STR calculators disagree (skeptical intent).
// Supporting: STR deal analysis, downside-first, Proceed Borderline Walk Away.

export const metadata: Metadata = {
  title: "Stress-Test Your STR Deal Before You Buy | Conservative Reality Check | STR Estimator",
  description:
    "A conservative reality check for short-term rental deals. Not a revenue prediction. Downside-first stress test, scenario ranges, and a clear verdict. Proceed, Borderline, or Walk Away.",
  openGraph: {
    title: "Stress-Test Your STR Deal Before You Buy | Conservative Reality Check | STR Estimator",
    description:
      "Conservative STR reality check. Downside-first stress test, no hype. Clear verdict before you commit.",
    url: siteUrl,
  },
  alternates: {
    canonical: siteUrl,
  },
};

function HomeFaqJsonLd() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

export default function Page() {
  return (
    <>
      <HomeFaqJsonLd />
      <Suspense
        fallback={
          <main className="min-h-screen bg-surface flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </main>
        }
      >
        <HomePage />
      </Suspense>
    </>
  );
}
