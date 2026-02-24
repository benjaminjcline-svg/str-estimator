import { Suspense } from "react";
import { ReportPageClient } from "@/components/ReportPageClient";

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-surface flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-label-secondary">Loading your report…</p>
          </div>
        </main>
      }
    >
      <ReportPageClient />
    </Suspense>
  );
}
