import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for STR Estimator.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </span>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
      <article className="prose prose-gray max-w-none opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        <h1 className="font-sans text-3xl sm:text-4xl font-semibold text-label-primary tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-label-tertiary mb-8">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">1. Information We Collect</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            We collect information you provide when using our Service:
          </p>
          <ul className="list-disc pl-6 text-label-secondary space-y-2 mb-4">
            <li><strong>Email address.</strong> Used to deliver your report and, if you opt in, for updates.</li>
            <li><strong>Property and financing details.</strong> Purchase price, down payment, interest rate, loan term, property type, optional address, estimated nightly rate, and occupancy. Used to generate your analysis report.</li>
            <li><strong>Payment information.</strong> Processed by Stripe. We do not store full credit card numbers. We receive only the last four digits and transaction status.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">2. How We Use Your Information</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            We use your information to:
          </p>
          <ul className="list-disc pl-6 text-label-secondary space-y-2 mb-4">
            <li>Generate and deliver your STR analysis report</li>
            <li>Process payment via Stripe</li>
            <li>Store your report for retrieval (we retain report data to allow you to access it via the link we send)</li>
            <li>Respond to support requests</li>
            <li>Improve our Service and fix technical issues</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">3. Data Storage and Retention</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            Report data (including your inputs and the generated analysis) is stored in secure cloud infrastructure. We retain reports for up to one year so you can access them via the link in your email. After that, data may be deleted. You may request deletion of your data by contacting us.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">4. Sharing and Disclosure</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            We do not sell your personal information. We may share data with:
          </p>
          <ul className="list-disc pl-6 text-label-secondary space-y-2 mb-4">
            <li><strong>Stripe.</strong> For payment processing. Stripe&apos;s privacy policy applies to payment data.</li>
            <li><strong>Service providers.</strong> Hosting, email delivery, and analytics. They process data on our behalf under contractual obligations.</li>
            <li><strong>Legal requirements.</strong> When required by law, court order, or to protect our rights, safety, or property.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">5. Cookies and Tracking</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            We use essential cookies to operate the Service (e.g., session management). We may use analytics to understand usage patterns. You can control cookies through your browser settings. Disabling certain cookies may affect functionality.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">6. Your Rights</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            Depending on your location, you may have the right to access, correct, delete, or export your personal data, or to object to or restrict processing. To exercise these rights, contact us at support@strestimator.com. Residents of California, the European Economic Area, and other jurisdictions may have additional rights under local law.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">7. Security</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            We use reasonable technical and organizational measures to protect your data. No method of transmission or storage is 100% secure; we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">8. Children</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            The Service is not intended for users under 18. We do not knowingly collect data from children. If you believe we have collected data from a child, contact us.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">9. Changes</h2>
          <p className="text-label-secondary leading-relaxed mb-4">
            We may update this Privacy Policy from time to time. We will post the updated policy and change the &quot;Last updated&quot; date. Continued use of the Service after changes constitutes acceptance.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-label-primary mb-4">10. Contact</h2>
          <p className="text-label-secondary leading-relaxed">
            Questions about this Privacy Policy? Contact us at{" "}
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
