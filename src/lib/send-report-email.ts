/**
 * Sends report link email via Resend.
 */

import { Resend } from "resend";
import { siteUrl } from "./site-config";

export async function sendReportEmail(to: string, reportId: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Report email] Skipped: RESEND_API_KEY not set. Add it to .env.local and Vercel env vars.");
    return false;
  }

  const resend = new Resend(apiKey);
  const reportUrl = `${siteUrl}/report/${reportId}`;
  const from = process.env.RESEND_FROM_EMAIL ?? "STR Estimator <onboarding@resend.dev>";

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject: "Your STR report is ready",
      html: `
        <p>Your STR Deal Analysis report is ready.</p>
        <p><a href="${reportUrl}" style="color:#0071e3;text-decoration:none;">View your report →</a></p>
        <p>This link works for 1 year. Bookmark it or save this email.</p>
      `,
    });
    if (error) {
      console.error("[Report email] Resend error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[Report email] Exception:", err);
    return false;
  }
}
