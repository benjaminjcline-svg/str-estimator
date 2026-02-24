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
