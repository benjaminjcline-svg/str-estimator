"use client";

import Link from "next/link";
import { WaitlistForm } from "./WaitlistForm";

export type WaitlistCTAProps = {
  sourcePath?: string;
  showBadge?: boolean;
  /** "block" = inline form on homepage. "button" = link to homepage form (/#analyze). */
  variant?: "button" | "block";
  className?: string;
};

export function WaitlistCTA({
  sourcePath = "/",
  showBadge = true,
  variant = "button",
  className = "",
}: WaitlistCTAProps) {
  if (variant === "block") {
    return (
      <div className={className}>
        <h2 className="text-lg font-semibold text-label-primary tracking-tight mb-4">
          Early access to STR reports
        </h2>
        <p className="text-sm text-label-secondary mb-4 max-w-md">
          Designed for buyers evaluating a deal right now.
        </p>
        <WaitlistForm sourcePath={sourcePath} mode="inline" />
        <p className="text-xs text-label-tertiary mt-4 max-w-md">
          Payments are temporarily unavailable while we complete standard business verification. Join the list and we&apos;ll email you when reports are live.
        </p>
        {showBadge && (
          <p className="text-xs text-label-tertiary mt-2">Payments temporarily unavailable</p>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <Link
        href="/#analyze"
        className="inline-block px-6 py-3 rounded-xl bg-accent text-white font-medium transition-all duration-button ease-friction hover:bg-accent-hover active:scale-[0.94]"
      >
        Reserve early access
      </Link>
      {showBadge && (
        <p className="text-xs text-label-tertiary mt-2">Payments temporarily unavailable</p>
      )}
    </div>
  );
}
