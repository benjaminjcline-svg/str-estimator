/**
 * Homepage FAQ. Shared for on-page content and FAQPage JSON-LD.
 */
export const homeFaqs = [
  {
    q: "Why do different calculators give different numbers?",
    a: "Different assumptions: occupancy, rates, expenses, seasonality. Small changes swing the outcome. We use conservative defaults and show ranges and stress tests, not a single optimistic number.",
  },
  {
    q: "Does this predict revenue?",
    a: "No. We stress-test your deal with conservative assumptions and show how it holds up in a typical or weak year. Clear verdict, not a promise.",
  },
  {
    q: "How do you handle seasonality?",
    a: "We assume seasonality in every market. We don't treat peak as year-round. Occupancy and rates are capped so the analysis holds when slow months hit.",
  },
  {
    q: "What if I have verified numbers from an existing STR?",
    a: "You can enter your own rate and occupancy. We still apply conservative checks and show downside scenarios. The report explains what we assumed.",
  },
  {
    q: "Can this help me decide not to buy?",
    a: "Yes. A Walk Away verdict is a good outcome. We tell you where the deal breaks. Useful before you commit capital.",
  },
  {
    q: "Is this financial advice?",
    a: "No. Underwriting tool and educational resource only. We don't advise buy or not buy. You decide. We show the numbers and the fragility.",
  },
] as const;
