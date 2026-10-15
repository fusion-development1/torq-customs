# TORQ Customs

Custom storefront for a FiveM vehicle store on Tebex. Next.js 14 (App Router) + Tailwind,
Tebex Headless API for the catalog and checkout.

## Run

```bash
npm install
npm run dev
```

## Connect Tebex

Copy `.env.example` to `.env.local` and fill in:

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_TEBEX_TOKEN` | Public Headless token. Loads the real categories, products, images and prices, and turns on Cfx.re login + checkout. Empty = preview mode with placeholder products. |
| `TEBEX_SECRET_KEY` | Secret key (server-side only). Feeds the bottom-left "recent purchases" popup and the hero "Top customer" card with real payments. Without it they are hidden on the live store. |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for SEO and social previews. |

How Tebex content maps to the site:

- **Categories** → sections and the Vehicles menu. A category named `Bundles` gets its own nav link.
- **Package image** → card image. **Package gallery (media)** → the image slider in the product detail.
- **Package description (HTML)** → the product detail text. First sentence = the card's one-liner.
- **Featured** → the three most expensive packages.
- Discounts show the old price and a −% badge automatically.

Product links can be shared: `/?product=<slug>` opens that product directly.

## Customise

Everything brand-related is in `lib/site.ts`:

- `marquee` — the scrolling strip at the top
- `discord`, `discordGuildId` (enable the Discord server widget to show the live online count), `socials`, `email`
- `heroImage` — drop a photo at `public/hero.jpg` and it becomes the hero background (black & white by default, `heroMonochrome`)

Colours are in `tailwind.config.ts` (`brand` = the red accent).

## Brand assets

The original logo is `brand/torq-logo-source.png` (silver on black). Cut-outs with a transparent
background live in `public/brand/`:

- `torq-logo.png` — full lock-up (TORQ + CUSTOMS): hero, footer, share image
- `torq-wordmark.png` — TORQ only: header, background watermarks
- `torq-q.png` — the Q: favicon and small watermarks

Icons: `app/favicon.ico` (16/32/48), `app/icon.png` (512), `app/apple-icon.png` (180).
Social preview: `app/opengraph-image.tsx`. If the logo changes, regenerate these from the new source.

## Checkout flow

FiveM packages need the buyer's Cfx.re account, so checkout is: create basket → Cfx.re login →
packages added to the basket → redirect to Tebex hosted checkout. Tebex is merchant of record and
handles payment and VAT. Code: `components/CartProvider.tsx`, `app/api/basket/*`.

## Before launch

- Fill in the real Discord invite, socials and support email in `lib/site.ts`
- Check the legal pages (`app/terms`, `app/refunds`, `app/privacy`) with the store owner
- Add `public/hero.jpg`
