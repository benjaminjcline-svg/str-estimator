"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Report } from "@/components/Report";
import { trackReportViewed } from "@/lib/analytics";
import type { AnalysisReport } from "@/lib/types";

async function downloadReportPdf(element: HTMLElement, filename: string) {
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#fafafa",
    onclone(_, clonedElement) {
      // Report content uses opacity-0 + CSS animation; the clone doesn't run
      // animations, so force visibility so the PDF isn't blank.
      clonedElement.querySelectorAll("[class*='opacity-0']").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.animation = "none";
      });
    },
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "pt", "a4");
  const pdfPageWidth = pdf.internal.pageSize.getWidth();
  const pdfPageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const imgWidth = pdfPageWidth - margin * 2;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let position = margin;
  pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
  position -= pdfPageHeight;

  while (position + imgHeight > pdfPageHeight) {
    pdf.addPage();
    pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
    position -= pdfPageHeight;
  }

  pdf.save(filename);
}

export function ReportWithDownload({
  report,
  reportId,
  children,
}: {
  report: AnalysisReport;
  reportId?: string;
  children?: React.ReactNode;
}) {
  const reportRef = useRef<HTMLElement>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (reportId) trackReportViewed(reportId);
  }, [reportId]);

  const handleDownloadPdf = async () => {
    const el = reportRef.current;
    if (!el || downloading) return;
    setDownloading(true);
    try {
      const address = report.metadata.address;
      const slug = address
        ? address.replace(/\s+/g, "-").replace(/,/g, "").slice(0, 40)
        : "report";
      const date = new Date().toISOString().slice(0, 10);
      await downloadReportPdf(el, `STR-Report-${slug}-${date}.pdf`);
    } finally {
      setDownloading(false);
    }
  };

  const downloadButton = (
    <button
      type="button"
      onClick={handleDownloadPdf}
      disabled={downloading}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-label-primary font-medium transition-all duration-button ease-friction hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
    >
      {downloading ? (
        <>
          <svg
            className="w-4 h-4 animate-loader-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeOpacity="0.25"
            />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          Preparing PDF…
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download PDF
        </>
      )}
    </button>
  );

  return (
    <>
      <Report ref={reportRef} report={report} headerAction={downloadButton} />
      {children}
    </>
  );
}

/** For report/[id] page: report + PDF button + "Run another deal" footer */
export function ReportByIdContent({
  report,
  reportId,
}: {
  report: AnalysisReport;
  reportId?: string;
}) {
  return (
    <ReportWithDownload report={report} reportId={reportId}>
      <div className="max-w-2xl mx-auto mt-16 pt-10 border-t border-gray-100 text-center">
        <p className="text-sm text-label-tertiary mb-4">
          Run another deal or share this report.
        </p>
        <Link
          href="/#analyze"
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-medium transition-all duration-button ease-friction hover:bg-accent-hover active:scale-[0.94]"
        >
          Run another deal
          <span className="transform transition-transform duration-button ease-friction group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </ReportWithDownload>
  );
}
