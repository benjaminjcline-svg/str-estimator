"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/sample-report", label: "Sample" },
  { href: "/learn", label: "Learn" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-surface/50 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-lg font-semibold text-label-primary hover:text-accent transition-colors duration-200 shrink-0"
          onClick={() => setMobileMenuOpen(false)}
        >
          STR Estimator
        </Link>

        <nav className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors duration-200 rounded-lg hover:bg-gray-100/80"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#analyze"
            className="ml-3 px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-medium transition-all duration-200 hover:bg-accent-hover hover:shadow-soft active:scale-[0.98]"
          >
            Run your deal — $49
          </Link>
        </nav>

        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/"
            className="px-3 py-2 rounded-lg bg-accent text-white text-sm font-medium transition-all duration-200 hover:bg-accent-hover active:scale-[0.98]"
          >
            Run your deal — $49
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 -mr-2 rounded-xl text-label-secondary hover:text-label-primary hover:bg-gray-100 transition-all duration-200 active:scale-[0.96]"
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
          className="sm:hidden border-t border-gray-100 bg-white px-6 py-4 animate-fade-in"
          style={{ animationFillMode: "forwards" }}
          aria-label="Mobile navigation"
        >
          <ul className="space-y-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 font-semibold text-accent hover:text-accent-hover transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 mt-3 border-t border-gray-100">
              <Link
                href="/"
                className="block py-3 text-accent font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Run your deal — $49 →
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
