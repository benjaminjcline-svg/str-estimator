"use client";

import Link from "next/link";

interface LearnCardProps {
  href: string;
  title: string;
  excerpt: string;
}

export function LearnCard({ href, title, excerpt }: LearnCardProps) {
  return (
    <Link
      href={href}
      className="block group p-6 rounded-2xl bg-surface-elevated border border-gray-200/60 shadow-card hover:shadow-card-hover hover:border-gray-200 hover:-translate-y-0.5 transition-all duration-300 ease-out active:scale-[0.99]"
    >
      <h2 className="text-base font-semibold text-label-primary group-hover:text-accent transition-colors duration-200 mb-2">
        {title}
      </h2>
      <p className="text-sm text-label-secondary leading-relaxed">{excerpt}</p>
    </Link>
  );
}
