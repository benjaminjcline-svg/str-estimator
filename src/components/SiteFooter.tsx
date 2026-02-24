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
              We stress-test your STR deal and tell you straight: proceed, pause, or
              walk away. No fabricated data.
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
                      className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-label-primary mb-4">Resources</p>
              <ul className="space-y-2">
                {footerLinks.slice(4).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-12 pt-8 border-t border-gray-100 text-sm text-label-tertiary">
          © {new Date().getFullYear()} STR Estimator. Know before you buy.
        </p>
      </div>
    </footer>
  );
}
