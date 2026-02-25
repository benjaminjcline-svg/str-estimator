# STR Market Brief – Content Engine

## Overview

The content engine produces **one daily synthesis article** from STR news across **top 200 North American cities**. It fetches headlines from external RSS feeds, runs an LLM to write a cohesive daily roundup (400–800 words), and publishes at `/learn/brief/[date]`. Headlines link to sources; our analysis is original commentary.

## Safeguards (No Hallucination / No Plagiarism)

1. **Source required** – Every item has `sourceUrl` and `sourceName`. Links use `rel="nofollow"`.
2. **No copying** – The LLM prompt explicitly forbids copying or paraphrasing source text. Analysis must be original.
3. **No invented facts** – The prompt instructs the model to only interpret what the source reports. No fabricated statistics or claims.
4. **Expert framing** – Model is prompted as a top 0.0001% STR expert. Output focuses on STR buyer implications.
5. **RSS excerpts as context** – When available, we pass the feed’s description to the LLM so it has accurate context.

## Sources

Configured in `src/lib/content-engine/sources.ts`:

- **Skift** – Travel industry news
- **PhocusWire** – Hospitality and STR coverage
- **Airbnb Newsroom** – Official announcements

Add sources only if their terms allow headlines + links aggregation. Never republish full articles.

## Persistence (SEO)

**Upstash Redis** stores each daily article forever. Without it, articles live only in cache and are lost on deploy.

- Add [Upstash Redis](https://vercel.com/integrations/upstash) from the Vercel Marketplace
- Connect to your project → env vars `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are auto-injected
- Articles are stored at `brief:YYYY-MM-DD`. The `brief:dates` set tracks all published dates for the filter UI and sitemap.

## Daily Updates

- **Cron**: `GET /api/cron/fetch-brief?secret=YOUR_CRON_SECRET` (set `CRON_SECRET` in env). Route also accepts `Authorization: Bearer CRON_SECRET` (Vercel sends this automatically).
- **Vercel Cron**: Runs daily at 8:00 UTC (see `vercel.json`)
- **Flow**: Cron fetches feeds → LLM generates one synthesis article → stored in Redis → cache primed → paths revalidated
- **Routes**: `/learn/brief` redirects to `/learn/brief/[today]`. Past dates at `/learn/brief/YYYY-MM-DD`. All URLs are permanent for SEO.
- **If the brief didn’t run**: See **[BRIEF-RUNBOOK.md](./BRIEF-RUNBOOK.md)** for debugging and manual trigger.

## LLM Synthesis

**Setup**: Add `OPENAI_API_KEY` to `.env.local`. Article generation runs when the key is present.

**Model**: `gpt-4o-mini` (configurable in `src/lib/content-engine/daily-article.ts`).

**Focus**: Top 200 North American cities. Prompt instructs the model to call out city mentions, regulatory changes, market shifts, and STR buyer implications.

**Prompts**: Defined in `daily-article.ts`. System prompt enforces: original writing only, no invented facts, expert voice, STR buyer focus, markdown output.
