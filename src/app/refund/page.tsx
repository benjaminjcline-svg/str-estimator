import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund policy for STR Estimator.",
};

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-surface">
      <div className="border-b border-gray-100/80 bg-surface-elevated/80 backdrop-blur-sm py-6">
        <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-button ease-friction"
          >
            ← Back
          </Link>
          <span className="text-sm font-medium text-label-secondary">
            Refund Policy
          </span>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
      <article className="prose prose-gray max-w-none opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        <h1 className="font-sans text-3xl sm:text-4xl font-semibold text-label-primary tracking-tight mb-2">
          Refund Policy
        </h1>
        <p className="text-sm text-label-tertiary mb-8">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">When You Can Request a Refund</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            You may request a full refund within 7 days of purchase if:
          </p>
          <ul className="list-disc pl-6 text-label-secondary space-y-2 mb-4">
            <li>You did not receive your report (e.g., delivery failure, link broken, report inaccessible)</li>
            <li>The Service failed to function as described (e.g., report did not generate, critical error)</li>
            <li>You canceled payment before the report was delivered (e.g., closed Stripe checkout before completing payment)</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">When Refunds Are Not Offered</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            We do not offer refunds when:
          </p>
          <ul className="list-disc pl-6 text-label-secondary space-y-2 mb-4">
            <li>You received and accessed your report. The Service is a one-time deliverable. Once delivered, the transaction is complete.</li>
            <li>You disagree with the verdict or analysis. Our analysis is based on conservative assumptions and models. Differing opinions or outcomes do not qualify for a refund.</li>
            <li>You made an error in your inputs (e.g., wrong purchase price). Please verify your inputs before submitting.</li>
            <li>You change your mind after receiving the report</li>
            <li>More than 7 days have passed since purchase</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">How to Request a Refund</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            Email us at{" "}
            <a href="mailto:support@strestimator.com" className="text-accent hover:text-accent-hover">
              support@strestimator.com
            </a>
            {" "}with:
          </p>
          <ul className="list-disc pl-6 text-label-secondary space-y-2 mb-4">
            <li>The email address used for purchase</li>
            <li>The date of purchase (approximate is fine)</li>
            <li>A brief reason for the refund request</li>
          </ul>
          <p className="text-label-secondary leading-relaxed mb-4">
            We will respond within 3 business days. Approved refunds will be processed within 5–10 business days to your original payment method.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">Stripe Refunds</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            Refunds are processed through Stripe. Stripe&apos;s refund policies apply. Refunds may appear as a credit on your card statement; timing depends on your bank.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">Contact</h2>
          <p className="text-label-secondary leading-relaxed">
            Questions? Contact us at{" "}
            <a href="mailto:support@strestimator.com" className="text-accent hover:text-accent-hover">
              support@strestimator.com
            </a>
            .
          </p>
        </section>

      </article>
      </div>
    </main>
  );
}
