import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getCachedDailyArticle, getTodayDateString } from "@/lib/content-engine/brief-service";
import { canonicalUrl, breadcrumbSchema } from "@/lib/seo";

export const revalidate = 86400; // 24 hours

type Props = { params: Promise<{ date: string }> };

function isValidDate(dateStr: string): boolean {
  const d = new Date(dateStr);
  return !isNaN(d.getTime()) && d.toISOString().slice(0, 10) === dateStr;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  if (!isValidDate(date)) {
    return { title: "Not found" };
  }
  return {
    title: `STR Brief ${date} | North America Short-Term Rental News`,
    description: `Daily STR news roundup for ${date}. Expert analysis across top North American markets. What it means for your next deal.`,
    alternates: { canonical: canonicalUrl(`/learn/brief/${date}`) },
  };
}

export default async function DailyBriefPage({ params }: Props) {
  const { date } = await params;
  if (!isValidDate(date)) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-label-secondary">Invalid date.</p>
        <Link href="/learn/brief" className="text-accent mt-4 inline-block">
          ← Back to latest brief
        </Link>
      </main>
    );
  }

  const article = await getCachedDailyArticle(date);
  const today = getTodayDateString();

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: canonicalUrl("/") },
    { name: "Learn", url: canonicalUrl("/learn") },
    { name: "Market Brief", url: canonicalUrl("/learn/brief") },
    { name: date, url: canonicalUrl(`/learn/brief/${date}`) },
  ]);

  return (
    <main className="min-h-screen bg-surface">
      <div className="border-b border-gray-100/80 bg-surface-elevated/80 backdrop-blur-sm py-6">
        <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
          <Link
            href="/learn"
            className="text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-button ease-friction"
          >
            ← Back to Learn
          </Link>
          <span className="text-sm font-medium text-label-secondary">
            {date !== today ? (
              <Link href="/learn/brief" className="text-accent hover:text-accent-hover">
                Latest brief →
              </Link>
            ) : (
              "Market Brief"
            )}
          </span>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 py-12 sm:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: article?.headline ?? article?.title ?? `STR Brief ${date}`, datePublished: date }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
        <article className="opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
        {!article ? (
          <div className="py-12">
            <h1 className="text-2xl font-semibold text-label-primary mb-4">
              STR Brief for {date}
            </h1>
            <p className="text-sm text-label-secondary">
              No brief for this date yet. The daily brief runs at 8:00 UTC.{" "}
              {date === today && "Check back shortly."}
            </p>
            <Link
              href="/learn/brief"
              className="inline-block mt-6 px-6 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent-hover"
            >
              See latest brief
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-label-primary tracking-tight mb-2">
              {article.headline}
            </h1>
            <p className="text-sm text-label-tertiary mb-8">
              {date} · North America focus · Top 200 markets
            </p>

            <div className="brief-content [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-label-primary [&_p]:mb-4 [&_p]:text-sm [&_p]:text-label-secondary [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-1 [&_a]:text-accent [&_a]:no-underline hover:[&_a]:underline [&_strong]:font-semibold [&_strong]:text-label-primary">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>

            {article.citiesMentioned.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-medium text-label-secondary mb-2">
                  Cities in this brief
                </h3>
                <p className="text-sm text-label-tertiary">
                  {article.citiesMentioned.join(", ")}
                </p>
              </div>
            )}

            {article.sources.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-medium text-label-secondary mb-3">
                  Sources
                </h3>
                <ul className="space-y-2 text-sm">
                  {article.sources.map((s, i) => (
                    <li key={i}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-accent hover:underline"
                      >
                        {s.title}
                      </a>
                      <span className="text-label-tertiary"> · {s.sourceName}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-gray-100">
              <Link
                href="/"
                className="inline-block px-6 py-3 rounded-xl bg-accent text-white font-medium transition-all duration-button ease-friction hover:bg-accent-hover active:scale-[0.94]"
              >
                Run your deal. $49
              </Link>
            </div>
          </>
        )}
      </article>
      </div>
    </main>
  );
}
