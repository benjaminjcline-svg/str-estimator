"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { isLiveMode } from "@/lib/paymentsMode";
import { STRForm } from "@/components/STRForm";
import { WaitlistCTA } from "@/components/WaitlistCTA";
import { homeFaqs } from "@/lib/home-faq";
import type { STRInput } from "@/lib/types";

const whyCalculatorsDisagree = [
  "Seasonality: many tools assume peak-season performance year-round.",
  "Listing quality: comps may be newer, better located, or better amenitized than yours.",
  "Data lag and sampling bias: scraped or self-reported data can be stale or skewed.",
  "Cleaning and turnover: per-stay costs and vacancy between guests vary; many tools use simple averages.",
  "Management variance: self-manage vs. third-party changes costs and vacancy; not all tools model both.",
  "Local regulation risk: new rules or enforcement can cut demand; not all tools factor it in.",
  "Amenity and finish differences: they change rates and occupancy more than people assume.",
];

const assumptionsList = [
  "Occupancy: we cap optimistic occupancy and treat high occupancy as fragile.",
  "Expenses: we include management, cleaning, utilities, STR insurance, maintenance, and reserves.",
  "Vacancy and seasonality: we stress for weak months and don't assume best-case year-round.",
  "We do not claim perfect market data. When something is unknown, we say so.",
];

export function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const liveMode = isLiveMode();

  useEffect(() => {
    if (liveMode && searchParams.get("canceled") === "1") {
      setError("Payment was canceled. You can try again when ready.");
    }
  }, [liveMode, searchParams]);

  const handleSubmit = async (email: string, input: STRInput) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, input }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data.details ? `${data.error}: ${data.details}` : (data.error ?? "Something went wrong");
        throw new Error(msg);
      }

      if (data.testAccount) {
        router.push(data.redirectUrl);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error("Invalid response");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 py-14 sm:py-20 min-[1025px]:py-24">
        <div className="max-w-2xl mx-auto flex flex-col gap-14">
          <header className="text-left opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
            <h1 className="text-display sm:text-display-lg font-semibold text-label-primary tracking-tight mb-6">
              A conservative STR reality check before you buy
            </h1>
            <p className="text-lg text-label-secondary leading-relaxed mb-5 max-w-md">
              This is not a predictive promise. It is a conservative stress test: we show how your deal holds up under downside assumptions and give you a clear verdict before you buy.
            </p>
            <p className="text-base text-label-secondary leading-relaxed max-w-md">
              STR calculators often disagree widely. Tiny changes in occupancy and rate assumptions swing outcomes a lot. This tool focuses on downside and fragility. We show you where the deal breaks, not a best-case headline number.
            </p>
          </header>

          <section className="text-left opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "300ms" }}>
            <p className="text-label-secondary leading-relaxed mb-4 max-w-md">
              <strong>What this does:</strong> You enter the property and financing details. We run them through conservative underwriting and give you a clear verdict.
            </p>
            <p className="text-label-secondary leading-relaxed mb-4 max-w-md">
              <strong>Who it's for:</strong> Anyone seriously considering buying a short-term rental who wants a second opinion before writing an offer.
            </p>
            <p className="text-label-secondary leading-relaxed mb-4 max-w-md">
              <strong>When to use it:</strong> Before you commit capital. A sanity check, not a crystal ball.
            </p>
            <div className="flex flex-col gap-3 mt-8">
              <Link
                href="/how-it-works"
                className="group text-accent hover:text-accent-hover font-medium text-sm transition-colors duration-200 ease-out inline-flex items-center gap-1.5"
              >
                How it works
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="/sample-report"
                className="group text-accent hover:text-accent-hover font-medium text-sm transition-colors duration-200 ease-out inline-flex items-center gap-1.5"
              >
                See a sample report
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="/learn"
                className="group text-accent hover:text-accent-hover font-medium text-sm transition-colors duration-200 ease-out inline-flex items-center gap-1.5"
              >
                Learn
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </section>

          <div className="min-w-0 overflow-visible">
            <div
              id="analyze"
              className="rounded-2xl bg-surface-elevated border border-gray-200/70 shadow-card p-7 sm:p-9 scroll-mt-28 opacity-0 animate-slide-up overflow-visible"
              style={{ animationFillMode: "forwards", animationDelay: "100ms" }}
            >
              {liveMode ? (
                <>
                  {error && (
                    <div
                      className="mb-6 p-4 rounded-xl bg-rose-50 text-rose-800 text-sm border border-rose-100 opacity-0 animate-fade-in"
                      style={{ animationFillMode: "forwards" }}
                      role="alert"
                    >
                      {error}
                    </div>
                  )}
                  <STRForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
                </>
              ) : (
                <WaitlistCTA sourcePath="/" showBadge={true} variant="block" />
              )}
            </div>
            {liveMode && (
              <p className="text-sm text-label-tertiary text-center opacity-0 animate-slide-up mt-8" style={{ animationFillMode: "forwards", animationDelay: "200ms" }}>
                A "no" is a good outcome. The report is valuable even when we tell you to walk away.
              </p>
            )}
          </div>
        </div>

        <div className="max-w-2xl mx-auto pt-20 sm:pt-28 pb-12 sm:pb-16 border-t border-gray-200/70 space-y-20 sm:space-y-24">
          <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "400ms" }}>
            <h2 className="text-2xl min-[1200px]:text-[1.75rem] font-semibold text-label-primary tracking-tight mb-6">
              Why most STR calculators disagree
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-label-secondary leading-relaxed">
              {whyCalculatorsDisagree.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "450ms" }}>
            <h2 className="text-2xl min-[1200px]:text-[1.75rem] font-semibold text-label-primary tracking-tight mb-8">
              How STR Estimator is different
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 items-stretch">
              <div className="flex flex-col p-6 rounded-2xl bg-surface-elevated border border-gray-200/60 shadow-card hover:shadow-card-hover hover:border-gray-200 transition-all duration-300 ease-out hover:-translate-y-0.5">
                <h3 className="text-[1.0625rem] font-semibold text-label-primary mb-2">Conservative defaults</h3>
                <p className="text-label-secondary text-sm leading-relaxed flex-1 min-h-0">
                  We cap optimistic occupancy and rates. No best-case revenue promises. You get ranges and stress tests, not a single headline number.
                </p>
                <p className="text-xs text-label-tertiary mt-3 shrink-0">Output: strong / typical / weak year scenarios.</p>
              </div>
              <div className="flex flex-col p-6 rounded-2xl bg-surface-elevated border border-gray-200/60 shadow-card hover:shadow-card-hover hover:border-gray-200 transition-all duration-300 ease-out hover:-translate-y-0.5">
                <h3 className="text-[1.0625rem] font-semibold text-label-primary mb-2">Downside scenarios</h3>
                <p className="text-label-secondary text-sm leading-relaxed flex-1 min-h-0">
                  We show weak-year and typical-year outcomes so you see how the deal holds up when things go wrong.
                </p>
                <p className="text-xs text-label-tertiary mt-3 shrink-0">Output: stress-tested income ranges.</p>
              </div>
              <div className="flex flex-col p-6 rounded-2xl bg-surface-elevated border border-gray-200/60 shadow-card hover:shadow-card-hover hover:border-gray-200 transition-all duration-300 ease-out hover:-translate-y-0.5">
                <h3 className="text-[1.0625rem] font-semibold text-label-primary mb-2">Fragility flags</h3>
                <p className="text-label-secondary text-sm leading-relaxed flex-1 min-h-0">
                  We flag what breaks first and call out the one assumption that could kill the deal. You know where the risk is.
                </p>
                <p className="text-xs text-label-tertiary mt-3 shrink-0">Output: fragility narrative and deal-breaker callout.</p>
              </div>
              <div className="flex flex-col p-6 rounded-2xl bg-surface-elevated border border-gray-200/60 shadow-card hover:shadow-card-hover hover:border-gray-200 transition-all duration-300 ease-out hover:-translate-y-0.5">
                <h3 className="text-[1.0625rem] font-semibold text-label-primary mb-2">Expense realism</h3>
                <p className="text-label-secondary text-sm leading-relaxed flex-1 min-h-0">
                  We include management, cleaning, utilities, STR insurance, maintenance, and reserves. No bare-bones expense assumptions.
                </p>
                <p className="text-xs text-label-tertiary mt-3 shrink-0">Output: full expense breakdown and what we assumed.</p>
              </div>
            </div>
          </section>

          <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "500ms" }}>
            <h2 className="text-2xl min-[1200px]:text-[1.75rem] font-semibold text-label-primary tracking-tight mb-4">
              What we assume
            </h2>
            <p className="text-label-secondary leading-relaxed mb-6">
              This analysis is intentionally conservative. If your verified numbers are materially stronger, outcomes could improve.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-label-secondary leading-relaxed">
              {assumptionsList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "550ms" }}>
            <h2 className="text-2xl min-[1200px]:text-[1.75rem] font-semibold text-label-primary tracking-tight mb-8">
              A quick comparison
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="p-6 rounded-2xl bg-surface-elevated border border-gray-200/60 shadow-card">
                <h3 className="text-[1rem] font-semibold text-label-primary mb-3">Typical calculator output</h3>
                <ul className="text-sm text-label-secondary space-y-2.5 leading-relaxed">
                  <li>Single point estimate (one number)</li>
                  <li>Optimistic defaults (high occupancy, strong rates)</li>
                  <li>No verdict; you interpret the number</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-surface-elevated border-2 border-accent/25 shadow-card ring-1 ring-accent/10">
                <h3 className="text-[1rem] font-semibold text-label-primary mb-3">STR Estimator output</h3>
                <ul className="text-sm text-label-secondary space-y-2.5 leading-relaxed">
                  <li>Ranges and stress tests (strong, typical, weak year)</li>
                  <li>Conservative defaults; we cap optimism</li>
                  <li>Clear verdict plus fragility explanation</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "600ms" }}>
            <h2 className="text-2xl min-[1200px]:text-[1.75rem] font-semibold text-label-primary tracking-tight mb-8">
              FAQ
            </h2>
            <dl className="space-y-7">
              {homeFaqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-100 last:border-0 pb-7 last:pb-0">
                  <dt className="text-[1rem] font-semibold text-label-primary mb-1.5">
                    {faq.q}
                  </dt>
                  <dd className="text-label-secondary text-sm leading-relaxed">
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-8">
              <Link
                href="/faq"
                className="inline-flex items-center gap-1 text-accent hover:text-accent-hover font-medium text-sm transition-colors duration-200 ease-out group"
              >
                Full FAQ
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            </p>
          </section>

          <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "650ms" }}>
            <h2 className="text-2xl min-[1200px]:text-[1.75rem] font-semibold text-label-primary tracking-tight mb-4">
              About this tool
            </h2>
            <p className="text-label-secondary mb-4">
              STR Estimator is built by Fjord & Field Studio LLC. We built it to avoid overpaying: a conservative lens and stress tests before you commit. Not a crystal ball.
            </p>
            <p className="text-sm font-medium text-label-primary mb-2">Limitations</p>
            <ul className="list-disc pl-6 space-y-1 text-label-secondary text-sm">
              <li>Results depend on the inputs you provide; garbage in, garbage out.</li>
              <li>Markets change; we do not guarantee future conditions.</li>
              <li>This is not financial, legal, or investment advice.</li>
            </ul>
          </section>

          <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "700ms" }}>
            <h2 className="text-2xl min-[1200px]:text-[1.75rem] font-semibold text-label-primary tracking-tight mb-4">
              Further reading
            </h2>
            <p className="text-label-secondary text-sm mb-6 leading-relaxed">
              Deep dives on why calculators vary, seasonality, and what breaks first in tight deals.
            </p>
            <ul className="space-y-3">
              <li>
                <Link href="/learn/why-str-calculators-overestimate" className="inline-flex items-center gap-1.5 text-accent hover:text-accent-hover font-medium text-sm transition-colors duration-200 ease-out group">
                  Why STR calculators overestimate revenue
                  <span className="text-label-tertiary group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                </Link>
              </li>
              <li>
                <Link href="/learn/str-seasonality-reality-check" className="inline-flex items-center gap-1.5 text-accent hover:text-accent-hover font-medium text-sm transition-colors duration-200 ease-out group">
                  STR seasonality reality check for underwriting
                  <span className="text-label-tertiary group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                </Link>
              </li>
              <li>
                <Link href="/learn/str-fragility-checklist" className="inline-flex items-center gap-1.5 text-accent hover:text-accent-hover font-medium text-sm transition-colors duration-200 ease-out group">
                  STR fragility checklist: what breaks first
                  <span className="text-label-tertiary group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
