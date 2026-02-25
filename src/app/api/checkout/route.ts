import { NextRequest, NextResponse } from "next/server";
import { isTestAccount } from "@/lib/test-accounts";
import { analyzeSTR } from "@/lib/analyze";
import { storeReport, isStorageConfigured } from "@/lib/report-storage";
import { sendReportEmail } from "@/lib/send-report-email";
import type { STRInput } from "@/lib/types";

const REPORT_PRICE_CENTS = 4900; // $49.00

function encodeReportUrl(input: STRInput): string {
  const json = JSON.stringify(input);
  const base64 = Buffer.from(json, "utf-8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return `/report?data=${base64}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, input } = body as { email: string; input: STRInput };

    if (!email || !input) {
      return NextResponse.json(
        { error: "Email and input are required" },
        { status: 400 }
      );
    }

    if (isTestAccount(email)) {
      if (isStorageConfigured()) {
        try {
          const report = analyzeSTR(input);
          const reportId = await storeReport(email, report);
          await sendReportEmail(email, reportId);
          return NextResponse.json({
            testAccount: true,
            redirectUrl: `/report/${reportId}`,
          });
        } catch {
          // Fall through to legacy URL if storage fails
        }
      }
      return NextResponse.json({
        testAccount: true,
        redirectUrl: encodeReportUrl(input),
      });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey || stripeKey === "sk_test_xxxxx") {
      return NextResponse.json(
        { error: "Payment is not configured. Add your real STRIPE_SECRET_KEY to .env.local" },
        { status: 503 }
      );
    }

    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(stripeKey);
    const origin = req.headers.get("origin") ?? req.nextUrl.origin;
    const successUrl = `${origin}/report?session_id={CHECKOUT_SESSION_ID}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "STR Deal Analysis",
              description: "Conservative short-term rental underwriting report",
              images: [],
            },
            unit_amount: REPORT_PRICE_CENTS,
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: `${origin}/?canceled=1`,
      metadata: {
        input: Buffer.from(JSON.stringify(input)).toString("base64"),
      },
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to create checkout session",
        details: process.env.NODE_ENV === "development" ? message : undefined,
      },
      { status: 500 }
    );
  }
}
