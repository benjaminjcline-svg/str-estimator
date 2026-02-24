"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Report } from "@/components/Report";
import { analyzeSTR } from "@/lib/analyze";
import type { STRInput } from "@/lib/types";
import type { AnalysisReport } from "@/lib/types";

function ReportLoader() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          <div className="w-14 h-14 rounded-full border-2 border-gray-200" />
          <div
            className="absolute inset-0 w-14 h-14 rounded-full border-2 border-accent border-t-transparent animate-loader-spin"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-label-primary font-medium">Building your report</p>
          <p className="text-sm text-label-tertiary">Running the numbers…</p>
        </div>
      </div>
    </main>
  );
}

export function ReportPageClient() {
  const searchParams = useSearchParams();
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const dataParam = searchParams.get("data");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    async function loadReport() {
      if (dataParam) {
        try {
          const base64 = dataParam.replace(/-/g, "+").replace(/_/g, "/");
          const json = atob(base64);
          const input: STRInput = JSON.parse(json);
          setReport(analyzeSTR(input));
        } catch {
          setError("Invalid report data");
        }
        setLoading(false);
        return;
      }

      if (sessionId) {
        try {
          const res = await fetch(`/api/session?session_id=${sessionId}`);
          const json = await res.json();

          if (!res.ok) {
            throw new Error(json.error ?? "Failed to load report");
          }

          setReport(json.report);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load report");
        }
        setLoading(false);
        return;
      }

      setError("Missing report data");
      setLoading(false);
    }

    loadReport();
  }, [dataParam, sessionId]);

  if (loading) {
    return <ReportLoader />;
  }

  if (error || !report) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
          <h1 className="text-xl font-semibold text-label-primary mb-2">
            Unable to load report
          </h1>
          <p className="text-label-secondary mb-8">{error}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl bg-accent text-white font-medium transition-all duration-200 hover:bg-accent-hover active:scale-[0.98]"
          >
            Start over
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface py-16 sm:py-24 px-6">
      <Report report={report} />
      <div className="max-w-2xl mx-auto mt-14 text-center opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "560ms" }}>
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-accent font-medium transition-all duration-200 hover:text-accent-hover"
        >
          Run another deal
          <span className="transform transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </main>
  );
}
