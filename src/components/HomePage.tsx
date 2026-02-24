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
          <div className="order-1 min-[1025px]:col-start-1 min-[1025px]:row-start-1 min-[1025px]:row-span-2 min-[1025px]:sticky min-[1025px]:top-24 min-[1025px]:self-start space-y-8">
            <header className="text-left opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
              <h1 className="text-display sm:text-display-lg font-semibold text-label-primary tracking-tight mb-5">
                Is this Airbnb worth buying?
              </h1>
              <p className="text-[0.9rem] sm:text-[1rem] text-label-secondary max-w-md leading-relaxed">
                We stress-test your numbers and tell you straight: Proceed,
                Borderline, or Walk Away. No hype. No made-up data.
              </p>
            </header>

            <p className="text-sm text-label-tertiary text-left opacity-0 animate-slide-up" style={{ animationFillMode: "forwards", animationDelay: "200ms" }}>
              Worth $49 even when the verdict&apos;s no. You&apos;ll learn why.
            </p>

            <section className="text-left opacity-0 animate-slide-up min-[1025px]:mt-10" style={{ animationFillMode: "forwards", animationDelay: "300ms" }}>
              <h2 className="text-xl font-semibold text-label-primary mb-4 tracking-tight">
                The gap between hype and reality
              </h2>
              <p className="text-label-secondary leading-relaxed mb-6 max-w-md">
                Most Airbnb income projections overstate what you&apos;ll earn. We run
                three scenarios—strong year, typical year, weak year—and show you
                where the deal breaks. <strong className="text-label-primary">Then we give you a verdict.</strong>
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/how-it-works"
                  className="group text-accent hover:text-accent-hover font-medium text-sm transition-colors inline-flex items-center gap-1"
                >
                  How it works
                  <span className="transform transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
                <Link
                  href="/sample-report"
                  className="group text-accent hover:text-accent-hover font-medium text-sm transition-colors inline-flex items-center gap-1"
                >
                  See a sample
                  <span className="transform transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
                <Link
                  href="/learn"
                  className="group text-accent hover:text-accent-hover font-medium text-sm transition-colors inline-flex items-center gap-1"
                >
                  Learn the traps
                  <span className="transform transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </section>
          </div>

          <div className="order-2 min-[1025px]:col-start-2 min-[1025px]:row-start-1 min-[1025px]:row-span-2 min-w-0">
            <div
              id="analyze"
              className="rounded-3xl bg-surface-elevated border border-gray-100 shadow-card p-8 sm:p-10 scroll-mt-24 transition-all duration-300 hover:shadow-cardHover opacity-0 animate-slide-up"
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
          </div>
        </div>
      </div>
    </main>
  );
}
