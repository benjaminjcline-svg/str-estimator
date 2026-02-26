"use client";

import Link from "next/link";
import { trackCTAClick } from "@/lib/analytics";
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
        <h2 className="text-base font-semibold text-label-primary tracking-tight mb-4">
          Get a conservative reality check
        </h2>
        <p className="text-sm text-label-secondary mb-4 max-w-md">
          No hype, no promises. Stress-test your deal with downside scenarios. We will email you when reports are live.
        </p>
        <WaitlistForm sourcePath={sourcePath} mode="inline" />
        <p className="text-sm text-label-tertiary mt-4 max-w-md">
          Payments are temporarily unavailable while we complete standard business verification. Join the list and we will email you when reports are live.
        </p>
        {showBadge && (
          <p className="text-sm text-label-tertiary mt-2">Payments temporarily unavailable</p>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <Link
        href="/#analyze"
        className="inline-flex items-center min-h-[48px] px-6 py-3 rounded-xl bg-accent text-white font-semibold shadow-button transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_2px_8px_rgba(0,113,227,0.25)] active:scale-[0.98]"
        onClick={() => trackCTAClick("waitlist_button")}
      >
        Get notified when reports are live
      </Link>
      {showBadge && (
        <p className="text-xs text-label-tertiary mt-2">Payments temporarily unavailable</p>
      )}
    </div>
  );
}
