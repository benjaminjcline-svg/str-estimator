/**
 * Build FAQPage JSON-LD for schema.org.
 * Only include questions that actually appear on the page.
 */
export function buildFaqJsonLd(
  faqs: ReadonlyArray<{ q: string; a: string }>
): Record<string, unknown> {
  return {
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
}
