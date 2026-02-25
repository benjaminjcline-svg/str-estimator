import { NextRequest, NextResponse } from "next/server";
import { addWaitlistSignup, isWaitlistStorageConfigured } from "@/lib/waitlist-storage";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const real = req.headers.get("x-real-ip");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return real ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry) return false;
  if (now > entry.resetAt) {
    rateMap.delete(ip);
    return false;
  }
  return entry.count >= RATE_LIMIT_MAX;
}

function recordRequest(ip: string): void {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return;
  }
  entry.count++;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many signup attempts. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { email, property_address, source_path, company } = body as {
      email?: string;
      property_address?: string;
      source_path?: string;
      company?: string;
    };

    if (company && String(company).trim() !== "") {
      recordRequest(ip);
      return NextResponse.json({ success: true });
    }

    const rawEmail = typeof email === "string" ? email.trim() : "";
    if (!rawEmail) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }
    if (!EMAIL_REGEX.test(rawEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const sourcePath = typeof source_path === "string" ? source_path.slice(0, 500) : "/";
    const propertyAddress =
      typeof property_address === "string" ? property_address.slice(0, 500) : undefined;

    if (!isWaitlistStorageConfigured()) {
      const hasUrl = !!(
        process.env.UPSTASH_REDIS_REST_URL ||
        process.env.KV_REST_API_URL
      );
      const hasToken = !!(
        process.env.UPSTASH_REDIS_REST_TOKEN ||
        process.env.KV_REST_API_TOKEN
      );
      console.error("Waitlist storage (Redis) not configured", { hasUrl, hasToken });
      const devHint =
        process.env.NODE_ENV === "development"
          ? " Use KV_REST_API_URL + KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_*) in .env.local and restart the dev server."
          : "";
      return NextResponse.json(
        {
          error: "Signups are temporarily unavailable. Please try again later.",
          ...(process.env.NODE_ENV === "development" && {
            details: `Redis env: URL ${hasUrl ? "set" : "missing"}, Token ${hasToken ? "set" : "missing"}.${devHint}`,
          }),
        },
        { status: 503 }
      );
    }

    const result = await addWaitlistSignup(rawEmail, sourcePath, propertyAddress ?? null);

    if (result.ok === false && result.reason === "already_subscribed") {
      return NextResponse.json(
        { error: "This email is already on the list." },
        { status: 409 }
      );
    }

    recordRequest(ip);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Waitlist signup error:", err);
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json(
        { error: "Something went wrong. Please try again.", details: message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
