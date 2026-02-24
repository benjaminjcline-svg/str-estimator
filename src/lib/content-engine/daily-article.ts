/**
 * Generates one daily synthesis article from STR news feeds.
 * Focus: top 200 North American cities. LLM writes a cohesive daily roundup.
 */

import OpenAI from "openai";
import type { CuratedItem } from "./types";
import { getCitiesContextForPrompt } from "./cities";

export type DailyArticle = {
  date: string; // YYYY-MM-DD
  title: string;
  content: string; // Markdown
  citiesMentioned: string[];
  sources: { title: string; url: string; sourceName: string }[];
};

const SYSTEM_PROMPT = `You are among the top 0.0001% of experts on short-term rentals across North America. You write one daily brief that synthesizes the day's STR news into a single, must-read article.

TONE: Direct. Punchy. Conversational. Contractions. Short sentences. Sound human—never corporate, never AI-ish.
BANNED: leverage, robust, comprehensive, delve, furthermore, moreover, "it's important to note." No hedging unless the source is uncertain.

Your task: Write ONE cohesive article (400–800 words) that:
1. Opens with what matters most for STR buyers today
2. Calls out specific cities when they appear in the news (we care about the top 200 North American markets)
3. Ties each development to deal implications—regulations, occupancy risk, new opportunities
4. Closes with a clear takeaway or action

RULES:
- ORIGINAL WRITING ONLY. Never copy or paraphrase source text. Your own analysis.
- NO INVENTED FACTS. Only interpret what the sources report. No fabricated numbers.
- STRUCTURE: Intro (hook) → 2–4 sections by theme or city → Closing takeaway
- OUTPUT: Valid markdown. Use ## for section headers, **bold** for emphasis, bullet lists when listing cities or points.`;

function buildUserPrompt(
  date: string,
  items: CuratedItem[]
): string {
  const citiesContext = getCitiesContextForPrompt();
  const headlinesBlock = items
    .slice(0, 25)
    .map(
      (i) =>
        `- **${i.title}** (${i.sourceName}) ${i.excerpt ? `\n  Excerpt: ${i.excerpt.slice(0, 200)}...` : ""}`
    )
    .join("\n");

  return `Date: ${date}

${citiesContext}

Today's headlines from our feeds:

${headlinesBlock}

Write the daily STR brief for ${date}. Synthesize these into one article. Call out North American cities when they're mentioned. Focus on what STR buyers need to know. Output only the markdown article—no preamble.`;
}

export async function generateDailyArticle(
  date: string,
  items: CuratedItem[]
): Promise<DailyArticle | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || items.length === 0) return null;

  const openai = new OpenAI({ apiKey });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(date, items) },
      ],
      max_tokens: 1200,
      temperature: 0.4,
    });

    const content = completion.choices[0]?.message?.content?.trim();
    if (!content) return null;

    // Extract cities mentioned (simple heuristic: look for city names in content)
    const { TOP_NA_CITIES } = await import("./cities");
    const citiesMentioned = TOP_NA_CITIES.filter((city) =>
      content.toLowerCase().includes(city.toLowerCase())
    );

    return {
      date,
      title: `STR Brief: ${date}`,
      content,
      citiesMentioned: Array.from(new Set(citiesMentioned)).slice(0, 15),
      sources: items.slice(0, 15).map((i) => ({
        title: i.title,
        url: i.sourceUrl,
        sourceName: i.sourceName,
      })),
    };
  } catch {
    return null;
  }
}
