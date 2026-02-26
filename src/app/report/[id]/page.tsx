import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReport } from "@/lib/report-storage";
import { ReportByIdContent } from "@/components/ReportWithDownload";

type Props = { params: Promise<{ id: string }> };

export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `STR Report | ${id}`,
    robots: "noindex",
  };
}

export default async function ReportByIdPage({ params }: Props) {
  const { id } = await params;
  const stored = await getReport(id);

  if (!stored) {
    notFound();
  }

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
            STR Estimator · Your report
          </span>
        </div>
      </div>
      <div className="py-12 sm:py-16 px-6">
        <ReportByIdContent report={stored.report} reportId={id} />
      </div>
    </main>
  );
}
