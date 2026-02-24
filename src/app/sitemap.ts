import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-config";
import { getCachedBriefDates } from "@/lib/content-engine/brief-service";

const baseUrl = siteUrl;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const briefDates = await getCachedBriefDates();

  const briefUrls =
    briefDates.length > 0
      ? briefDates.map((date) => ({
          url: `${baseUrl}/learn/brief/${date}`,
          lastModified: new Date(date),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }))
      : [
          {
            url: `${baseUrl}/learn/brief/${new Date().toISOString().slice(0, 10)}`,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 0.8,
          },
        ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sample-report`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learn/airbnb-income-assumptions`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/learn/is-this-airbnb-worth-buying`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/learn/short-term-rental-cash-flow-reality`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/learn/brief`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    ...briefUrls,
  ];
}
