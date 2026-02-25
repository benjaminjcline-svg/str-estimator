"use client";

import { forwardRef } from "react";
import type { AnalysisReport, Verdict } from "@/lib/types";

const verdictStyles: Record<Verdict, string> = {
  Proceed: "bg-emerald-50 text-emerald-800 border-emerald-200",
  Borderline: "bg-amber-50 text-amber-800 border-amber-200",
  "Walk Away": "bg-rose-50 text-rose-800 border-rose-200",
};

const verdictIcons: Record<Verdict, string> = {
  Proceed: "✓",
  Borderline: "◐",
  "Walk Away": "✕",
};

function zillowSearchUrl(address: string): string {
  const slug = address.trim().replace(/\s+/g, "-").replace(/,/g, "");
  return `https://www.zillow.com/homes/${encodeURIComponent(slug)}_rb/`;
}

function formatCurrency(n: number): string {
  const abs = Math.abs(n);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(abs);
  return n < 0 ? `−${formatted}` : formatted;
}

export const Report = forwardRef<
  HTMLElement,
  { report: AnalysisReport; headerAction?: React.ReactNode }
>(function Report({ report, headerAction }, ref) {
  const address = report.metadata.address;
  const meta = report.metadata as AnalysisReport["metadata"] & {
    grossMonthlyRevenue?: number;
    totalMonthlyCosts?: number;
    netMonthly?: number;
  };
  const hasSummaryNumbers =
    typeof meta.grossMonthlyRevenue === "number" &&
    typeof meta.totalMonthlyCosts === "number" &&
    typeof meta.netMonthly === "number";

  return (
    <article ref={ref} className="max-w-2xl mx-auto space-y-14 pb-24">
      <header className="space-y-6 opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-sans text-2xl sm:text-3xl font-semibold text-label-primary tracking-tight">
            Your verdict
          </h1>
          <div className="flex items-center gap-2">
            <div
              className={`inline-flex items-center justify-center gap-2 h-[42px] px-4 rounded-xl border-2 font-medium text-base transition-transform duration-button ease-friction hover:scale-[1.01] shrink-0 box-border ${verdictStyles[report.verdict]}`}
            >
              <span className="text-base leading-none">{verdictIcons[report.verdict]}</span>
              {report.verdict}
            </div>
            {headerAction}
          </div>
        </div>
        {address && (
          <p className="text-sm text-label-tertiary">
            {address}
          </p>
        )}

        {hasSummaryNumbers && (
          <div className="p-5 rounded-2xl bg-surface-elevated border border-gray-100">
            <h3 className="text-sm font-semibold text-label-primary mb-4">By the numbers</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              <div>
                <p className="text-label-tertiary text-sm">Monthly revenue</p>
                <p className="text-label-primary font-semibold">
                  {formatCurrency(meta.grossMonthlyRevenue!)}
                </p>
                <p className="text-2xs text-label-tertiary">@ {meta.appliedOccupancy}% occ.</p>
              </div>
              <div>
                <p className="text-label-tertiary text-sm">Monthly costs</p>
                <p className="text-label-primary font-semibold">
                  {formatCurrency(meta.totalMonthlyCosts!)}
                </p>
              </div>
              <div>
                <p className="text-label-tertiary text-sm">Net monthly</p>
                <p
                  className={`font-semibold ${
                    meta.netMonthly! >= 0 ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {formatCurrency(meta.netMonthly!)}
                </p>
              </div>
              <div>
                <p className="text-label-tertiary text-sm">Nightly rate assumed</p>
                <p className="text-label-primary font-semibold">${meta.appliedNightlyRate}/night</p>
              </div>
            </div>
          </div>
        )}

        <p className="text-label-secondary leading-relaxed text-lg">
          {report.verdictReasoning}
        </p>
        <p className="text-sm text-label-tertiary leading-relaxed mt-3">
          This conclusion reflects conservative assumptions based on typical STR performance. If your verified data materially exceeds these assumptions, outcomes could improve.
        </p>
        {address && (
          <p className="text-sm text-label-tertiary">
            <a
              href={zillowSearchUrl(address)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover transition-colors duration-button ease-friction"
            >
              Compare to Zillow Zestimate →
            </a>
          </p>
        )}
      </header>

      <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "80ms" }}>
        <h2 className="font-sans text-xl font-semibold text-label-primary mb-6 tracking-tight">
          Income reality: how it actually performs
        </h2>
        <div className="space-y-4">
          {[
            { ...report.incomeReality.strongYear, accent: "border-l-emerald-400" },
            { ...report.incomeReality.typicalYear, accent: "border-l-accent" },
            { ...report.incomeReality.weakYear, accent: "border-l-amber-400" },
          ].map(({ title, conditions, description, caveat, accent }) => (
            <div
              key={title}
              className={`p-5 pl-6 rounded-2xl bg-surface-elevated border border-gray-100 border-l-4 transition-colors duration-button ease-friction hover:border-gray-200 ${accent}`}
            >
              <h3 className="font-semibold text-label-primary mb-2">
                {title}
              </h3>
              <p className="text-sm text-label-secondary mb-2">
                {conditions}
              </p>
              <p className="text-label-primary leading-relaxed">
                {description}
              </p>
              {caveat && (
                <p className="mt-2 text-sm text-amber-600 italic">
                  {caveat}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "160ms" }}>
        <h2 className="font-sans text-xl font-semibold text-label-primary mb-6 tracking-tight">
          Where buyers go wrong on costs
        </h2>
        <div className="space-y-4">
          {report.costReality.map((cost, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-surface-elevated border border-gray-100 transition-colors duration-button ease-friction hover:border-gray-200"
            >
              <h4 className="font-medium text-label-primary mb-1.5">
                {cost.area}
              </h4>
              <p className="text-sm text-label-secondary leading-relaxed">
                {cost.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "240ms" }}>
        <h2 className="font-sans text-xl font-semibold text-label-primary mb-6 tracking-tight">
          The one assumption that could kill the deal
        </h2>
        <div className="p-6 rounded-2xl bg-amber-50/50 border-2 border-amber-200 space-y-3 transition-all duration-button ease-friction">
          <p>
            <strong>Critical assumption:</strong> {report.fragility.criticalAssumption}
          </p>
          <p className="text-label-secondary">{report.fragility.dependency}</p>
          <p className="text-label-secondary">{report.fragility.whenItWeakens}</p>
        </div>
      </section>

      <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "320ms" }}>
        <h2 className="font-sans text-xl font-semibold text-label-primary mb-6 tracking-tight">
          What a bad year feels like
        </h2>
        <div className="p-6 rounded-2xl bg-rose-50/50 border-2 border-rose-200 space-y-3 transition-all duration-button ease-friction">
          <p>
            <strong>Monthly cash bleed:</strong> {report.downsideReality.monthlyBleed}
          </p>
          <p>
            <strong>Duration:</strong> {report.downsideReality.duration}
          </p>
          <p>{report.downsideReality.emotionalImpact}</p>
          <p>{report.downsideReality.survivability}</p>
        </div>
      </section>

      <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "400ms" }}>
        <h2 className="font-sans text-xl font-semibold text-label-primary mb-6 tracking-tight">
          What would need to be true for this to work
        </h2>
        <ul className="space-y-3">
          {report.whatWouldNeedToBeTrue.map((item, i) => (
            <li key={i} className="flex gap-3 text-label-secondary">
              <span className="text-accent font-medium mt-0.5 shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-10 pb-6 border-t-2 border-gray-200 opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "480ms" }}>
        <h2 className="font-sans text-xl font-semibold text-label-primary mb-4 tracking-tight">
          My take
        </h2>
        <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20">
          <p className="text-label-primary leading-relaxed text-lg font-medium">
            {report.finalPerspective}
          </p>
        </div>
      </section>

      <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "520ms" }}>
        <h2 className="font-sans text-xl font-semibold text-label-primary mb-4 tracking-tight">
          Why this is still a good outcome
        </h2>
        <div className="p-6 rounded-2xl bg-surface-elevated border border-gray-100 space-y-3">
          {report.verdict === "Proceed" ? (
            <p className="text-label-secondary leading-relaxed">
              Clarity before you commit is valuable. You can proceed with due diligence or pause with confidence. Either way, you decided from data, not hope.
            </p>
          ) : (
            <>
              <p className="text-label-secondary leading-relaxed">
                Avoiding a weak deal is often the most profitable move. Capital not tied up in a fragile property stays flexible. So does your time and attention.
              </p>
              <p className="text-label-secondary leading-relaxed">
                Walking away with clarity beats moving forward on hope. You have a clear answer. That is a good outcome.
              </p>
            </>
          )}
        </div>
      </section>

      {report.metadata.conservativeOverrides.length > 0 && (
        <aside className="p-5 rounded-xl bg-gray-50 border border-gray-100 opacity-0 animate-fade-in" style={{ animationFillMode: "forwards", animationDelay: "600ms" }}>
          <h3 className="text-sm font-medium text-label-secondary mb-2">
            What we assumed (you didn’t provide)
          </h3>
          <ul className="text-sm text-label-tertiary space-y-1">
            {report.metadata.conservativeOverrides.map((override, i) => (
              <li key={i}>{override}</li>
            ))}
          </ul>
        </aside>
      )}

      <p className="text-xs text-label-tertiary leading-relaxed mt-6 opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        For informational purposes only. Not financial, legal, or investment advice. Always conduct your own due diligence.
      </p>
    </article>
  );
});
