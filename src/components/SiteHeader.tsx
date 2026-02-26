"use client";

import Link from "next/link";
import { useState } from "react";
import { isWaitlistMode } from "@/lib/paymentsMode";
import { trackCTAClick } from "@/lib/analytics";

const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/sample-report", label: "Sample" },
  { href: "/learn", label: "Learn" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const waitlist = isWaitlistMode();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-[1.0625rem] font-semibold text-label-primary hover:text-accent transition-colors duration-200 ease-out shrink-0 tracking-tight"
          onClick={() => setMobileMenuOpen(false)}
        >
          STR Estimator
        </Link>

        <nav className="hidden sm:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2.5 text-[0.9375rem] font-medium text-label-secondary hover:text-accent hover:bg-accent/5 transition-colors duration-200 ease-out rounded-xl"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#analyze"
            className="ml-2 min-h-[44px] inline-flex items-center px-5 py-2.5 rounded-xl bg-accent text-white text-[0.9375rem] font-semibold shadow-button transition-all duration-200 ease-out hover:bg-accent-hover hover:shadow-[0_2px_8px_rgba(0,113,227,0.25)] active:scale-[0.98]"
            onClick={() => trackCTAClick("header_desktop")}
          >
            {waitlist ? "Reserve early access" : "Get started"}
          </Link>
        </nav>

        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/#analyze"
            className="min-h-[44px] inline-flex items-center px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold shadow-button transition-all duration-200 ease-out hover:bg-accent-hover active:scale-[0.98]"
            onClick={() => trackCTAClick("header_mobile")}
          >
            {waitlist ? "Reserve early access" : "Get started"}
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] p-2.5 -mr-1 rounded-xl text-label-secondary hover:text-label-primary hover:bg-gray-100/80 transition-colors duration-200 ease-out active:bg-gray-100"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          className="sm:hidden border-t border-gray-200/60 bg-white/95 backdrop-blur-xl px-6 py-5 animate-fade-in"
          style={{ animationFillMode: "forwards" }}
          aria-label="Mobile navigation"
        >
          <ul className="space-y-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3.5 text-[1rem] font-semibold text-label-primary hover:text-accent transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 mt-4 border-t border-gray-100">
              <Link
                href="/#analyze"
                className="block py-3.5 text-accent font-semibold text-[1rem]"
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackCTAClick("header_mobile_menu");
                }}
              >
                {waitlist ? "Reserve early access" : "Get started"} →
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
