import Link from "next/link";
import { LEGAL_ATTRIBUTION, COPYRIGHT_LINE, PRODUCT_NAME } from "@/lib/legal";

const footerLinks = [
  { href: "/", label: "STR Deal Analysis" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/sample-report", label: "Sample Report" },
  { href: "/learn", label: "STR Buying Guide" },
  { href: "/learn/airbnb-income-assumptions", label: "Airbnb Income Assumptions" },
  { href: "/learn/is-this-airbnb-worth-buying", label: "Is This Airbnb Worth Buying?" },
  { href: "/faq", label: "FAQ" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200/60 bg-surface mt-auto">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 min-[1025px]:grid-cols-[min(100%,380px)_1fr] min-[1200px]:grid-cols-[min(100%,520px)_1fr] gap-10 min-[1025px]:gap-20">
          <div className="min-[1025px]:col-span-1">
            <p className="font-semibold text-label-primary mb-3 text-[1.0625rem]">{PRODUCT_NAME}</p>
            <p className="text-sm text-label-secondary leading-relaxed max-w-sm">
              A sober second look at short-term rental income. The numbers. The verdict. No hype.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-10 min-[1025px]:gap-20">
            <div>
              <p className="font-semibold text-label-primary mb-3 text-[0.8125rem] uppercase tracking-wider">Product</p>
              <ul className="space-y-2.5">
                {footerLinks.slice(0, 4).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-label-secondary hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-[1025px]:ml-[200px]">
              <p className="font-semibold text-label-primary mb-3 text-[0.8125rem] uppercase tracking-wider">Resources</p>
              <ul className="space-y-2.5">
                {footerLinks.slice(4).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-label-secondary hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-gray-200/60 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-5">
          <div className="text-sm text-label-tertiary leading-relaxed">
            <p className="text-label-primary font-medium">{LEGAL_ATTRIBUTION}</p>
            <p>{COPYRIGHT_LINE}</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <Link href="/terms" className="text-sm text-label-tertiary hover:text-label-secondary transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm text-label-tertiary hover:text-label-secondary transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/refund" className="text-sm text-label-tertiary hover:text-label-secondary transition-colors duration-200">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
