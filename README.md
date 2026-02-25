# STR Estimator

Conservative short-term rental underwriting for individual buyers evaluating 1–3 STR properties.

## Features

- **Simple form** — Apple-esque UX for property and financing inputs
- **Conservative analysis** — Stress-tested assumptions, no fabricated data
- **Clear verdict** — Proceed, Borderline, or Walk Away
- **Stripe payment** — $49 per report
- **Test accounts** — Bypass payment for QA (see below)

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   Copy `.env.local.example` to `.env.local` and add:

   - `STRIPE_SECRET_KEY` — From [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys)
   - `UNSPLASH_ACCESS_KEY` — From [Unsplash Developers](https://unsplash.com/developers) for dynamic background images (optional; uses default without it)
   - `NEXT_PUBLIC_SITE_URL` — Your live URL (for sitemap, Open Graph). Example: `https://yourdomain.com`
   - `TEST_BYPASS_EMAILS` — Comma-separated emails that skip payment (e.g. `test@str-estimator.com,demo@example.com`)
   - `PAYMENTS_MODE` — `waitlist` (default) or `live`. See "Payments mode and waitlist" below.
   - `ADMIN_TOKEN` — Secret for waitlist CSV export at `/api/admin/waitlist?token=...` (optional; required to export waitlist)
   - Waitlist mode requires **Upstash Redis** (same as report storage). Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.

3. **Run locally**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Test Accounts

Add emails to `TEST_BYPASS_EMAILS` in `.env.local`. When a user submits the form with one of these emails, they skip Stripe and go directly to the report.

Example:
```
TEST_BYPASS_EMAILS=test@str-estimator.com,qa@yourcompany.com
```

## Payments mode and waitlist

The app supports two modes controlled by **one** environment variable:

- **`PAYMENTS_MODE=waitlist`** (default if missing or invalid)  
  Homepage and CTAs show "Get notified when reports open". No purchase buttons. Emails are stored in Redis and can be exported via the admin route. Checkout API returns 403.

- **`PAYMENTS_MODE=live`**  
  Full purchase flow: Stripe checkout, report delivery, and all existing CTAs ("Stress-test this deal · $49").

**To switch:** Set `PAYMENTS_MODE` to `waitlist` or `live`, then deploy. No code changes.

**Local testing:**
- `PAYMENTS_MODE=waitlist` — Waitlist form and modal; no checkout.
- `PAYMENTS_MODE=live` — Full flow (requires Stripe and Redis for report storage).

**Waitlist admin export:** `GET /api/admin/waitlist?token=YOUR_ADMIN_TOKEN` or `Authorization: Bearer YOUR_ADMIN_TOKEN`. Returns CSV. Not linked publicly; use only with `ADMIN_TOKEN` set.

## Stripe Setup

1. Create a [Stripe account](https://dashboard.stripe.com) and get your API keys.
2. The app uses **Stripe Checkout** (hosted payment page) — no Stripe.js on the client.
3. For production, create a webhook for `checkout.session.completed` if you need to track payments server-side.

## Deploy

[Vercel](https://vercel.com) is recommended:

1. Push to GitHub.
2. Import project in Vercel.
3. Add environment variables.
4. Deploy.

## SEO

The site is optimized for organic growth:

- **Indexable pages**: Home, How It Works, Sample Report, FAQ, Learn (STR buying guide)
- **Evergreen content**: Articles on Airbnb income assumptions, is this Airbnb worth buying, short-term rental cash flow reality
- **Technical**: Sitemap, robots.txt, FAQ schema, Article schema
- **Keywords**: STR deal analysis, short-term rental cash flow, Airbnb income assumptions, is this Airbnb worth buying

Set `NEXT_PUBLIC_SITE_URL` to your domain when deploying (e.g. `https://strestimator.com`) for correct sitemap and Open Graph URLs.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Stripe
