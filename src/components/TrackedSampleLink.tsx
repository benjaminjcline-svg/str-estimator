"use client";

import Link from "next/link";
import { trackLearnToSample } from "@/lib/analytics";

export function TrackedSampleLink({
  sourceArticle,
  className,
  children,
}: {
  sourceArticle: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href="/sample-report"
      className={className}
      onClick={() => trackLearnToSample(sourceArticle)}
    >
      {children}
    </Link>
  );
}
