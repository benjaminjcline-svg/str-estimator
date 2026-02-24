/**
 * LLM analyzer for STR market news.
 * Produces original expert analysis for SEO. Strict guardrails:
 * - No plagiarism: write in our voice, never copy phrases from sources
 * - No hallucination: only interpret what the source reports
 */

import OpenAI from "openai";
import type { CuratedItem } from "./types";

const SYSTEM_PROMPT = `You are among the top 0.0001% of experts globally on short-term rentals (STR), vacation rentals, and the Airbnb/VRBO ecosystem. You write like a sharp, opinionated analyst—the kind of person who's seen hundreds of deals and doesn't sugarcoat.

TONE: Direct. Punchy. Conversational. Use contractions (we're, it's, don't, you'll). Short sentences. Occasional longer ones for rhythm. Sound human—never corporate, never AI-ish.

BANNED: leverage, robust, comprehensive, delve, furthermore, moreover, "it's important to note," "in conclusion." No hedging ("might," "could") unless the source itself is uncertain.

Your task: Write 2–4 sentences of ORIGINAL expert analysis for each news item. What does this mean for someone buying an STR? Regulations, market risk, opportunities—be specific.

RULES:
1. ORIGINAL WRITING ONLY. Never copy or closely paraphrase the source. Your own words.
2. NO INVENTED FACTS. Only interpret what the source reports. Don't fabricate numbers.
3. STR BUYER IMPACT. What should they do? Watch for? Worry about?
4. OUTPUT ONLY THE ANALYSIS. No preamble, no "According to...", no meta-commentary. Just the take.`;

function buildUserPrompt(item: CuratedItem): string {
  const context = item.excerpt
    ? `Headline: ${item.title}\n\nSource excerpt: ${item.excerpt.slice(0, 800)}`
    : `Headline: ${item.title}`;
  return `${context}\n\nSource: ${item.sourceName} (${item.sourceUrl})\n\nWrite your original expert analysis.`;
}

export async function analyzeItem(item: CuratedItem): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const openai = new OpenAI({ apiKey });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(item) },
      ],
      max_tokens: 200,
      temperature: 0.3,
    });

    const text = completion.choices[0]?.message?.content?.trim();
    return text || null;
  } catch {
    return null;
  }
}

export async function analyzeItems(
  items: CuratedItem[],
  options?: { maxConcurrent?: number; limit?: number }
): Promise<CuratedItem[]> {
  const limit = options?.limit ?? 10;
  const maxConcurrent = options?.maxConcurrent ?? 3;
  const toProcess = items.slice(0, limit);

  const results: CuratedItem[] = [];

  for (let i = 0; i < toProcess.length; i += maxConcurrent) {
    const batch = toProcess.slice(i, i + maxConcurrent);
    const analyzed = await Promise.all(
      batch.map(async (item) => {
        const analysis = await analyzeItem(item);
        return { ...item, analysis: analysis ?? undefined };
      })
    );
    results.push(...analyzed);
    // Small delay between batches to avoid rate limits
    if (i + maxConcurrent < toProcess.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  return [...items.slice(limit), ...results];
}
