/**
 * Homepage FAQ. Shared for on-page content and FAQPage JSON-LD.
 */
export const homeFaqs = [
  {
    q: "Why do STR calculators give wildly different numbers?",
    a: "Different assumptions on occupancy, rates, expenses, and seasonality. Small changes swing the outcome. We use conservative defaults and show ranges and stress tests, not a single optimistic number.",
  },
  {
    q: "Does this predict revenue?",
    a: "No. This is not a revenue prediction. We stress-test your deal with conservative assumptions and show how it holds up in a typical or weak year. Clear verdict, not a promise.",
  },
  {
    q: "How do you handle seasonality?",
    a: "We assume seasonality in every market. We do not treat peak as year-round. Occupancy and rates are capped so the analysis holds when slow months hit.",
  },
  {
    q: "What if I have actual STR history or verified numbers?",
    a: "You can enter your own rate and occupancy. We still apply conservative checks and show downside scenarios. The report explains what we assumed.",
  },
  {
    q: "Can this help me decide not to buy?",
    a: "Yes. A Walk Away verdict is a good outcome. We tell you where the deal breaks. Useful before you commit capital.",
  },
  {
    q: "Is this financial advice?",
    a: "No. Underwriting tool and educational resource only. We do not advise buy or not buy. You decide. We show the numbers and the fragility.",
  },
] as const;
