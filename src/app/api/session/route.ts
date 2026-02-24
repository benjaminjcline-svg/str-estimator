import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { analyzeSTR } from "@/lib/analyze";
import type { STRInput } from "@/lib/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

/**
 * Retrieve Stripe session and return analysis for paid sessions.
 * Used when user lands on /report?session_id=xxx after payment.
 */
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 402 }
      );
    }

    const inputBase64 = session.metadata?.input;
    if (!inputBase64) {
      return NextResponse.json(
        { error: "Session data not found" },
        { status: 404 }
      );
    }

    const input: STRInput = JSON.parse(
      Buffer.from(inputBase64, "base64").toString("utf-8")
    );
    const report = analyzeSTR(input);

    return NextResponse.json({ report });
  } catch (err) {
    console.error("Session retrieval error:", err);
    return NextResponse.json(
      { error: "Failed to retrieve session" },
      { status: 500 }
    );
  }
}
