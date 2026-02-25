"use client";

import { isLiveMode } from "@/lib/paymentsMode";
import { WaitlistCTA } from "./WaitlistCTA";

export type PrimaryCTAProps = {
  /** Rendered when PAYMENTS_MODE=live (e.g. link to /#analyze or purchase button). */
  children: React.ReactNode;
  /** Page path for waitlist source_path when mode is waitlist. */
  sourcePath?: string;
  /** Optional class for the wrapper when waitlist. */
  className?: string;
};

/**
 * Renders either the live purchase CTA (children) or the waitlist CTA based on PAYMENTS_MODE.
 * Use on pages that have a single primary CTA (how-it-works, sample-report, learn, faq).
 */
export function PrimaryCTA({ children, sourcePath = "/", className = "" }: PrimaryCTAProps) {
  if (isLiveMode()) {
    return <>{children}</>;
  }
  return (
    <WaitlistCTA
      sourcePath={sourcePath}
      showBadge={true}
      variant="button"
      className={className}
    />
  );
}
