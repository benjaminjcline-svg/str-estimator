import { siteUrl } from "./site-config";

/**
 * SEO constants and schema generators.
 * Used for JSON-LD, canonical URLs, and metadata.
 */

export const seoConfig = {
  siteName: "STR Estimator",
  defaultTitle: "STR Estimator | Is This Airbnb Worth Buying?",
  defaultDescription:
    "We stress-test your STR deal and tell you straight: Proceed, Borderline, or Walk Away. No hype. No made-up data. $49.",
  twitterHandle: "@strestimator",
  locale: "en_US",
} as const;

export function canonicalUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${clean}`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seoConfig.siteName,
    url: siteUrl,
    description: seoConfig.defaultDescription,
    logo: `${siteUrl}/og-image.png`,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoConfig.siteName,
    url: siteUrl,
    description: seoConfig.defaultDescription,
    publisher: { "@type": "Organization", name: seoConfig.siteName },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", url: `${siteUrl}/#analyze` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleSchema(params: {
  headline: string;
  description: string;
  slug: string;
  publishedTime?: string;
  modifiedTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.headline,
    description: params.description,
    url: canonicalUrl(`/learn/${params.slug}`),
    author: { "@type": "Organization", name: seoConfig.siteName },
    publisher: { "@type": "Organization", name: seoConfig.siteName },
    ...(params.publishedTime && { datePublished: params.publishedTime }),
    ...(params.modifiedTime && { dateModified: params.modifiedTime }),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
