import type { Metadata } from "next";
import { Suspense } from "react";
import { HomePage } from "@/components/HomePage";
import { homeFaqs } from "@/lib/home-faq";
import { siteUrl } from "@/lib/site-config";

// Keyword-to-page: conservative STR calculator, STR deal analysis, Airbnb investment reality check (primary).
// Supporting: why STR calculators vary, Airbnb revenue calculator inaccurate, seasonality STR occupancy (sections/FAQs).

export const metadata: Metadata = {
  title: "Conservative STR Calculator & Deal Analysis Before You Buy | STR Estimator",
  description:
    "Conservative STR calculator and Airbnb investment reality check. STR deal analysis with stress tests, fragility flags, and a clear verdict. Proceed, Borderline, or Walk Away.",
  openGraph: {
    title: "Conservative STR Calculator & Deal Analysis Before You Buy | STR Estimator",
    description:
      "Conservative STR calculator and Airbnb investment reality check. Stress-test your deal. Proceed, Borderline, or Walk Away.",
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
