import type { Metadata } from "next";
import { Suspense } from "react";
import { HomePage } from "@/components/HomePage";
import { homeFaqs } from "@/lib/home-faq";
import { buildFaqJsonLd } from "@/lib/faqJsonLd";
import { siteUrl } from "@/lib/site-config";

// Keyword-to-page: conservative, reality check, before you buy, stress test (skeptical intent).

export const metadata: Metadata = {
  title: "Conservative STR Revenue Reality Check Before You Buy | STR Estimator",
  description:
    "Conservative STR reality check before you buy. Not a revenue prediction. Downside-first stress test, scenario ranges, and a clear verdict. Proceed, Borderline, or Walk Away.",
  openGraph: {
    title: "Conservative STR Revenue Reality Check Before You Buy | STR Estimator",
    description:
      "Conservative reality check. Downside-first stress test, no hype. Clear verdict before you commit.",
    url: siteUrl,
  },
  alternates: {
    canonical: siteUrl,
  },
};

function HomeFaqJsonLd() {
  const jsonLd = buildFaqJsonLd(homeFaqs);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
