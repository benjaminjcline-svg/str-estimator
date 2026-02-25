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
      className="block group p-6 rounded-2xl bg-surface-elevated border border-gray-100 hover:border-gray-200 transition-colors duration-button ease-friction transition-transform duration-button ease-friction active:scale-[0.97]"
    >
      <h2 className="text-xl font-semibold text-label-primary group-hover:text-accent transition-colors duration-button ease-friction mb-2">
        {title}
      </h2>
      <p className="text-label-secondary">{excerpt}</p>
    </Link>
  );
}
