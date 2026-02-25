/**
 * Claims a report from Stripe session or test bypass data.
 * Stores the report, sends email, returns stable report ID.
 */

import { NextRequest, NextResponse } from "next/server";
import { analyzeSTR } from "@/lib/analyze";
import type { STRInput } from "@/lib/types";
import {
  storeReport,
  claimBySessionId,
  isStorageConfigured,
} from "@/lib/report-storage";
import { sendReportEmail } from "@/lib/send-report-email";

function decodeDataParam(data: string): STRInput | null {
  try {
    const base64 = data.replace(/-/g, "+").replace(/_/g, "/");
    const json = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(json) as STRInput;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.session_id) {
      const sessionId = body.session_id as string;
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeKey || stripeKey === "sk_test_xxxxx") {
        return NextResponse.json(
          { error: "Payment not configured" },
          { status: 503 }
        );
      }

      const { default: Stripe } = await import("stripe");
      const stripe = new Stripe(stripeKey);
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
      const email = (session.customer_email ?? session.customer_details?.email) as string;
      if (!email) {
        return NextResponse.json(
          { error: "No email on session" },
          { status: 400 }
        );
      }

      if (isStorageConfigured()) {
        let reportId = await claimBySessionId(sessionId);
        if (!reportId) {
          reportId = await storeReport(email, report, sessionId);
          await sendReportEmail(email, reportId);
        }
        return NextResponse.json({ reportId });
      }

      // Fallback when Redis not configured: redirect to report via encoded data (no persistent link or email)
      const dataParam = Buffer.from(JSON.stringify(input), "utf-8")
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
      return NextResponse.json({
        reportId: null,
        fallbackRedirectUrl: `/report?data=${dataParam}`,
      });
    }

    if (body.data && body.email) {
      const input = decodeDataParam(body.data);
      if (!input) {
        return NextResponse.json(
          { error: "Invalid report data" },
          { status: 400 }
        );
      }

      const report = analyzeSTR(input);
      const email = body.email as string;

      if (!isStorageConfigured()) {
        return NextResponse.json(
          { error: "Report storage not configured", reportId: null },
          { status: 503 }
        );
      }

      const reportId = await storeReport(email, report);
      await sendReportEmail(email, reportId);

      return NextResponse.json({ reportId });
    }

    return NextResponse.json(
      { error: "Provide session_id or { data, email }" },
      { status: 400 }
    );
  } catch (err) {
    console.error("Report claim error:", err);
    return NextResponse.json(
      { error: "Failed to claim report" },
      { status: 500 }
    );
  }
}
