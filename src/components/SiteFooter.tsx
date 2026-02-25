import Link from "next/link";

const footerLinks = [
  { href: "/", label: "STR Deal Analysis" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/sample-report", label: "Sample Report" },
  { href: "/learn", label: "STR Buying Guide" },
  { href: "/learn/brief", label: "Market Brief" },
  { href: "/learn/airbnb-income-assumptions", label: "Airbnb Income Assumptions" },
  { href: "/learn/is-this-airbnb-worth-buying", label: "Is This Airbnb Worth Buying?" },
  { href: "/faq", label: "FAQ" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-surface mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 min-[1025px]:grid-cols-[min(100%,380px)_1fr] min-[1200px]:grid-cols-[min(100%,520px)_1fr] gap-8 min-[1025px]:gap-16">
          <div className="min-[1025px]:col-span-1">
            <p className="font-semibold text-label-primary mb-4">STR Estimator</p>
            <p className="text-sm text-label-secondary">
              The numbers. The verdict. No hype.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 min-[1025px]:gap-16">
            <div>
              <p className="font-semibold text-label-primary mb-4">Product</p>
              <ul className="space-y-2">
                {footerLinks.slice(0, 4).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-button ease-friction"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-[1025px]:ml-[240px]">
              <p className="font-semibold text-label-primary mb-4">Resources</p>
              <ul className="space-y-2">
                {footerLinks.slice(4).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-button ease-friction"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-label-tertiary">
            © {new Date().getFullYear()} STR Estimator. Know before you buy.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <Link href="/terms" className="text-sm text-label-tertiary hover:text-label-secondary transition-colors duration-button ease-friction">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm text-label-tertiary hover:text-label-secondary transition-colors duration-button ease-friction">
              Privacy Policy
            </Link>
            <Link href="/refund" className="text-sm text-label-tertiary hover:text-label-secondary transition-colors duration-button ease-friction">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
