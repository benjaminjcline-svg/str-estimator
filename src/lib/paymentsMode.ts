/**
 * Payments mode feature flag. Single source of truth for waitlist vs live payments.
 * Server: reads PAYMENTS_MODE. Client: reads NEXT_PUBLIC_PAYMENTS_MODE (set from PAYMENTS_MODE in next.config).
 * Default: "waitlist" if missing or invalid.
 */

const ALLOWED = ["waitlist", "live"] as const;
export type PaymentsMode = (typeof ALLOWED)[number];

function getRaw(): string | undefined {
  if (typeof window === "undefined") {
    return process.env.PAYMENTS_MODE;
  }
  return process.env.NEXT_PUBLIC_PAYMENTS_MODE;
}

export function getPaymentsMode(): "waitlist" | "live" {
  const raw = getRaw()?.toLowerCase().trim();
  if (raw === "live") return "live";
  return "waitlist";
}

export function isWaitlistMode(): boolean {
  return getPaymentsMode() === "waitlist";
}

export function isLiveMode(): boolean {
  return getPaymentsMode() === "live";
}
