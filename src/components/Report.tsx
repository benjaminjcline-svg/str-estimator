"use client";

import type { AnalysisReport, Verdict } from "@/lib/types";

const verdictStyles: Record<Verdict, string> = {
  Proceed: "bg-emerald-50 text-emerald-800 border-emerald-200",
  Borderline: "bg-amber-50 text-amber-800 border-amber-200",
  "Walk Away": "bg-rose-50 text-rose-800 border-rose-200",
};

export function Report({ report }: { report: AnalysisReport }) {
  return (
    <article className="max-w-2xl mx-auto space-y-14 pb-24">
      <header className="space-y-5 opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        <h1 className="font-sans text-2xl sm:text-3xl font-semibold text-label-primary tracking-tight">
          Your verdict
        </h1>
        <div
          className={`inline-flex items-center px-4 py-2.5 rounded-xl border font-semibold transition-transform duration-200 hover:scale-[1.02] ${verdictStyles[report.verdict]}`}
        >
          {report.verdict}
        </div>
        <p className="text-label-secondary leading-relaxed text-lg">
          {report.verdictReasoning}
        </p>
      </header>

      <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "80ms" }}>
        <h2 className="font-sans text-lg font-semibold text-label-primary mb-5 tracking-tight">
          Income reality—how it actually performs
        </h2>
        <div className="space-y-5">
          {[
            report.incomeReality.strongYear,
            report.incomeReality.typicalYear,
            report.incomeReality.weakYear,
          ].map((scenario, i) => (
            <div
              key={scenario.title}
              className="p-5 rounded-2xl bg-surface-elevated border border-gray-100 shadow-soft transition-all duration-200 hover:shadow-card hover:border-gray-200"
            >
              <h3 className="font-semibold text-label-primary mb-2">
                {scenario.title}
              </h3>
              <p className="text-sm text-label-secondary mb-2">
                {scenario.conditions}
              </p>
              <p className="text-label-primary leading-relaxed">
                {scenario.description}
              </p>
              {scenario.caveat && (
                <p className="mt-2 text-sm text-amber-600 italic">
                  {scenario.caveat}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "160ms" }}>
        <h2 className="font-sans text-lg font-semibold text-label-primary mb-5 tracking-tight">
          Where buyers go wrong on costs
        </h2>
        <div className="space-y-4">
          {report.costReality.map((cost, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-surface-elevated border border-gray-100 transition-all duration-200 hover:shadow-soft hover:border-gray-200"
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
        <h2 className="font-sans text-lg font-semibold text-label-primary mb-5 tracking-tight">
          The one assumption that could kill the deal
        </h2>
        <div className="p-5 rounded-2xl bg-surface-elevated border border-gray-100 shadow-soft space-y-3 transition-all duration-200 hover:shadow-card">
          <p>
            <strong>Critical assumption:</strong> {report.fragility.criticalAssumption}
          </p>
          <p className="text-label-secondary">{report.fragility.dependency}</p>
          <p className="text-label-secondary">{report.fragility.whenItWeakens}</p>
        </div>
      </section>

      <section className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "320ms" }}>
        <h2 className="font-sans text-lg font-semibold text-label-primary mb-5 tracking-tight">
          What a bad year feels like
        </h2>
        <div className="p-5 rounded-2xl bg-surface-elevated border border-gray-100 shadow-soft space-y-3 transition-all duration-200 hover:shadow-card">
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
        <h2 className="font-sans text-lg font-semibold text-label-primary mb-5 tracking-tight">
          What would need to be true for this to work
        </h2>
        <ul className="space-y-2.5">
          {report.whatWouldNeedToBeTrue.map((item, i) => (
            <li key={i} className="flex gap-3 text-label-secondary">
              <span className="text-accent font-medium mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-8 border-t border-gray-200 opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "480ms" }}>
        <h2 className="font-sans text-lg font-semibold text-label-primary mb-4 tracking-tight">
          My take
        </h2>
        <p className="text-label-primary leading-relaxed text-lg">
          {report.finalPerspective}
        </p>
      </section>

      {report.metadata.conservativeOverrides.length > 0 && (
        <aside className="p-5 rounded-xl bg-gray-50 border border-gray-100 opacity-0 animate-fade-in" style={{ animationFillMode: "forwards", animationDelay: "560ms" }}>
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
    </article>
  );
}
