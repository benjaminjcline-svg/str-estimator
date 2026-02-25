"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { STRForm } from "@/components/STRForm";
import type { STRInput } from "@/lib/types";

export function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("canceled") === "1") {
      setError("Payment was canceled. You can try again when ready.");
    }
  }, [searchParams]);

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
      <div className="max-w-[1440px] mx-auto px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 min-[1025px]:grid-cols-[min(100%,380px)_1fr] min-[1200px]:grid-cols-[min(100%,520px)_1fr] min-[1025px]:gap-16 min-[1025px]:items-start gap-12">
          <div className="order-1 min-[1025px]:col-start-1 min-[1025px]:row-start-1 min-[1025px]:row-span-2 min-[1025px]:sticky min-[1025px]:top-24 min-[1025px]:self-start space-y-6">
            <header className="text-left opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
              <h1 className="text-display sm:text-display-lg text-[36px] font-semibold text-label-primary tracking-tight mb-5">
                Before you buy an Airbnb, stress-test the numbers. Most STR deals look good on paper. This checks reality.
              </h1>
            </header>

            <section className="text-left opacity-0 animate-slide-up mt-10 min-[1025px]:mt-14" style={{ animationFillMode: "forwards", animationDelay: "300ms" }}>
              <p className="text-label-secondary leading-relaxed mb-4 max-w-md">
                <strong>What this does:</strong> You enter the property and financing details. We run them through conservative underwriting and give you a clear verdict: Proceed, Borderline, or Walk Away.
              </p>
              <p className="text-label-secondary leading-relaxed mb-4 max-w-md">
                <strong>Who it&apos;s for:</strong> Anyone seriously considering buying a short-term rental, especially a first or second property. The kind of buyer who wants a second opinion before writing an offer.
              </p>
              <p className="text-label-secondary leading-relaxed mb-4 max-w-md">
                <strong>When to use it:</strong> Before you commit capital or get too far down the road. A sanity check, not a crystal ball.
              </p>
              <p className="text-label-secondary leading-relaxed mb-6 max-w-md">
                <strong>Why it exists:</strong> Most STR income projections are optimistic. Calculators oversimplify. It&apos;s easy to talk yourself into a deal. We don&apos;t. We show you where it breaks.
              </p>
              <div className="flex flex-col gap-2 mt-10 min-[1025px]:mt-20">
                <Link
                  href="/how-it-works"
                  className="group text-accent hover:text-accent-hover font-medium text-sm transition-colors duration-button ease-friction inline-flex items-center gap-1"
                >
                  How it works
                  <span className="transform transition-transform duration-button ease-friction group-hover:translate-x-0.5">→</span>
                </Link>
                <Link
                  href="/sample-report"
                  className="group text-accent hover:text-accent-hover font-medium text-sm transition-colors duration-button ease-friction inline-flex items-center gap-1"
                >
                  See a sample report
                  <span className="transform transition-transform duration-button ease-friction group-hover:translate-x-0.5">→</span>
                </Link>
                <Link
                  href="/learn"
                  className="group text-accent hover:text-accent-hover font-medium text-sm transition-colors duration-button ease-friction inline-flex items-center gap-1"
                >
                  Why STR calculators mislead
                  <span className="transform transition-transform duration-button ease-friction group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </section>
          </div>

          <div className="order-2 min-[1025px]:col-start-2 min-[1025px]:row-start-1 min-[1025px]:row-span-2 min-w-0 overflow-visible -mx-6 min-[1025px]:mx-0 min-[1025px]:pb-28">
            <div
              id="analyze"
              className="rounded-none min-[1025px]:rounded-3xl bg-surface-elevated border-0 min-[1025px]:border min-[1025px]:border-gray-100 p-8 sm:p-10 scroll-mt-24 opacity-0 animate-slide-up overflow-visible"
              style={{ animationFillMode: "forwards", animationDelay: "100ms" }}
            >
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
            </div>
            <p className="text-sm text-label-tertiary text-center opacity-0 animate-slide-up mt-10" style={{ animationFillMode: "forwards", animationDelay: "200ms" }}>
              A &quot;no&quot; is a good outcome. The report is valuable even when we tell you to walk away.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
