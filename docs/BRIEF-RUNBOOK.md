# Daily Brief — Runbook

Use this when the daily STR brief didn’t run or you need to trigger it manually.

## Local vs live: deploy first

**Local changes do not affect the live site until you deploy.** If you fixed the cron auth, list alignment, or any brief logic locally, the live site will still show the old behavior until you:

1. **Commit and push** your changes (e.g. `git add -A && git commit -m "Brief fixes" && git push`).
2. **Let Vercel build and deploy** (if your repo is connected to Vercel, pushing to the production branch triggers a deploy; wait for it to finish).
3. Or run **`vercel --prod`** from the project root if you deploy via CLI.

After the new deployment is live, the cron route will use the updated code (e.g. Bearer auth), and the Learn page will use the updated list UI. Then follow “When the brief doesn’t run” below to fix cron/env and get briefs generating.

---

## When the brief doesn’t run

### 1. Confirm it didn’t run

- Open **today’s brief**: `https://<your-domain>/learn/brief` (redirects to `/learn/brief/YYYY-MM-DD`).
- If you see “No brief for this date yet” and it’s after 8:00 UTC, the cron either didn’t run or failed.

### 2. Check Vercel

1. Vercel dashboard → your project → **Logs** (or **Deployments** → select latest → **Functions**).
2. Filter or search for `/api/cron/fetch-brief` or `fetch-brief`.
3. Note the result:
   - **401 Unauthorized** → Cron auth issue. The route must accept `Authorization: Bearer CRON_SECRET` (see CONTENT-ENGINE and the cron route). Fix and redeploy.
   - **500** or **timeout** → Check env vars (`OPENAI_API_KEY`, Upstash Redis if used) and function logs for the actual error.
   - **No log entry** → Cron may not have fired (e.g. first deploy, or Vercel Cron not enabled). Trigger manually once (below) and check again after the next 8:00 UTC.

### 3. Trigger the brief manually (ops only)

**Product rule:** Users never trigger generation. The brief is there automatically when they visit; the Learn page list grows each day. If briefs aren’t appearing, fix the cron and env—don’t add a user-facing “generate” action.

To generate a brief once for debugging or after fixing cron/env:

1. Get your cron secret from Vercel: Project → **Settings** → **Environment Variables** → `CRON_SECRET`.
2. Call the cron endpoint (use one of these):

   **Query param (browser or curl):**
   ```bash
   curl "https://<your-domain>/api/cron/fetch-brief?secret=YOUR_CRON_SECRET"
   ```

   **Header (curl):**
   ```bash
   curl -H "Authorization: Bearer YOUR_CRON_SECRET" "https://<your-domain>/api/cron/fetch-brief"
   ```

3. Check the response:
   - **Success:** `{"ok":true,"date":"YYYY-MM-DD","articleGenerated":true,...}` → reload `/learn/brief`; the brief should appear.
   - **No brief generated:** `articleGenerated: false` and a `diagnostics` object: `hasOpenAI` and `hasRedis`. If `hasOpenAI` is false, add `OPENAI_API_KEY` in Vercel env. If `hasRedis` is false, briefs won’t persist across deploys (optional: add Upstash Redis). Then trigger again.
4. If you use Redis, the brief is stored for good once generated.

**Security:** Don’t commit `CRON_SECRET` or paste it in public channels. Use env vars or a secrets manager.

### 4. Schedule and timezone

- **Cron schedule:** 8:00 UTC daily (`vercel.json`: `0 8 * * *`).
- **EST:** 3:00 AM EST (4:00 AM EDT when daylight saving applies).
- On Vercel Hobby, execution can occur anytime within the 8:00 UTC hour.

---

## Quick reference

| Item | Value |
|------|--------|
| Cron path | `/api/cron/fetch-brief` |
| Schedule | 8:00 UTC daily |
| Auth | `CRON_SECRET` in query `?secret=` or header `Authorization: Bearer <secret>` |
| Env (required for generation) | `OPENAI_API_KEY`; optional persistence: `UPSTASH_REDIS_*` |
| Brief URLs | `/learn/brief` → today; `/learn/brief/YYYY-MM-DD` for a specific date |

For architecture and content-engine details, see **CONTENT-ENGINE.md**.
