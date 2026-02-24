/**
 * LLM prompts for content engine - STRICTLY for summarization only.
 *
 * RULES (never violate):
 * 1. LLM receives SOURCE TEXT only. Output must be a SHORT summary.
 * 2. Do NOT add facts, numbers, or claims not in the source.
 * 3. Do NOT generate news, analysis, or original reporting.
 * 4. If source text is missing or too short, return null (no output).
 *
 * Use only when OPENAI_API_KEY (or similar) is set and summarization is explicit.
 */

export const SUMMARIZATION_SYSTEM_PROMPT = `You are a summarization assistant. Your ONLY job is to condense the provided source text into 1-2 sentences.

STRICT RULES:
- Use ONLY information that appears in the source text. Do not add, infer, or fabricate anything.
- If the source text is empty, incomplete, or you cannot verify a fact from it, output the exact phrase: [NO_SUMMARY] and nothing else.
- Never claim something the source does not say.
- Never produce original analysis or predictions.
- Keep the summary under 50 words.
- Preserve the original meaning; do not editorialize.`;

export const SUMMARIZATION_USER_PROMPT = (sourceText: string): string =>
  `Summarize the following in 1-2 sentences. Use ONLY the provided text. Do not add any information.\n\nSource text:\n${sourceText.slice(0, 2000)}`;
