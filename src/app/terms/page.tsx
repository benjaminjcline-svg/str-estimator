import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for STR Estimator.",
};

export default function TermsPage() {
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
            Terms of Service
          </span>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
      <article className="prose prose-gray max-w-none opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        <h1 className="font-sans text-3xl sm:text-4xl font-semibold text-label-primary tracking-tight mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-label-tertiary mb-8">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">1. Agreement to Terms</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            By accessing or using STR Estimator (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not use the Service.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">2. Description of Service</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            STR Estimator provides conservative underwriting analysis for short-term rental (STR) property purchases. You input property and financing details; we run them through stress-tested assumptions and deliver a report with a verdict (Proceed, Borderline, or Walk Away) and supporting analysis.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">3. Not Financial, Legal, or Investment Advice</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            <strong>The Service is for informational purposes only.</strong> It does not constitute financial advice, investment advice, legal advice, real estate advice, or any other form of professional advice. We are not licensed financial advisors, attorneys, accountants, or real estate professionals. The reports, verdicts, and analysis we provide are based on assumptions and models; they are not a substitute for your own research, due diligence, or advice from qualified professionals. You should consult appropriate licensed professionals before making any investment or purchasing decisions. You rely on the Service at your own risk.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">4. No Guarantee of Accuracy</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            We do not verify the data you input (e.g., property addresses, purchase prices, market rates). Our analysis relies on conservative assumptions and industry averages where specific data is unavailable. Actual market performance, occupancy, rates, costs, and regulations may differ materially from our assumptions. We make no representation or warranty about the accuracy, completeness, or suitability of our analysis for any particular property or decision. Past performance and our models do not guarantee future results.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">5. Payment and Refunds</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            Payment is due in full at the time of purchase. Our refund policy is described at{" "}
            <Link href="/refund" className="text-accent hover:text-accent-hover">
              /refund
            </Link>
            . By purchasing, you agree to our refund policy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">6. Limitation of Liability</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
          </p>
          <ul className="list-disc pl-6 text-label-secondary space-y-2 mb-4">
            <li>The Service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of any kind, express or implied.</li>
            <li>We disclaim all warranties, including merchantability, fitness for a particular purpose, and non-infringement.</li>
            <li>Our total liability to you for any claim arising from or related to the Service shall not exceed the amount you paid us in the twelve (12) months preceding the claim, or fifty dollars ($50), whichever is greater.</li>
            <li>We are not liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, lost data, or business interruption, even if we have been advised of the possibility of such damages.</li>
            <li>You will not hold us liable for any decision you make (or fail to make) based on our Service, including the purchase, non-purchase, or management of any property.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">7. Indemnification</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            You agree to indemnify, defend, and hold harmless STR Estimator and its operators from any claims, damages, losses, or expenses (including reasonable attorneys&apos; fees) arising from your use of the Service, your violation of these Terms, or your violation of any third-party rights.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">8. Dispute Resolution</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            Any dispute arising from these Terms or the Service shall be resolved by binding arbitration in accordance with the rules of the American Arbitration Association, except that either party may seek relief in small claims court for disputes within that court&apos;s jurisdiction. You agree to waive any right to a jury trial and to participate in a class action. The prevailing party may recover reasonable attorneys&apos; fees.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">9. Modifications</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            We may modify these Terms at any time. We will post the updated Terms and update the &quot;Last updated&quot; date. Your continued use of the Service after changes constitutes acceptance of the modified Terms. If you do not agree, discontinue use and contact us for a refund if applicable under our refund policy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">10. Contact</h2>
          <p className="text-label-secondary leading-relaxed">
            Questions about these Terms? Contact us at{" "}
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
