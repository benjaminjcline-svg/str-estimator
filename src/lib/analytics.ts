/**
 * Lightweight analytics event helpers. Pushes to dataLayer for gtag when available.
 * No new provider; uses existing Google Analytics (NEXT_PUBLIC_GA_MEASUREMENT_ID).
 */

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, params?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

function safeGtag(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params ?? {});
  }
}

/** Fire when user clicks a primary CTA (e.g. Get started, Reserve early access). */
export function trackCTAClick(source: string) {
  safeGtag("cta_click", { cta_source: source });
}

/** Fire when user views a generated report (report page load). */
export function trackReportViewed(reportId: string) {
  safeGtag("report_viewed", { report_id: reportId });
}

/** Fire when user clicks from a Learn article to the sample report. */
export function trackLearnToSample(sourceArticle: string) {
  safeGtag("learn_to_sample_click", { source_article: sourceArticle });
}
