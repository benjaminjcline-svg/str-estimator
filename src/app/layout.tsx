import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { siteUrl } from "@/lib/site-config";
import { seoConfig, organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: `%s | ${seoConfig.siteName}`,
  },
  description: seoConfig.defaultDescription,
  keywords: [
    "STR deal analysis",
    "short-term rental cash flow",
    "Airbnb income reality",
    "Airbnb income assumptions",
    "is this Airbnb worth buying",
    "Airbnb calculator vs reality",
    "STR underwriting",
    "vacation rental analysis",
    "short-term rental underwriting",
    "Airbnb stress test",
  ],
  openGraph: {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    type: "website",
    locale: seoConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

function RootLayoutJsonLd() {
  const org = organizationSchema();
  const site = websiteSchema();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased flex flex-col bg-surface">
        <RootLayoutJsonLd />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
