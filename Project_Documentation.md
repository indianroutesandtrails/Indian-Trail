# Indian Routes & Trails — Frontend Project Documentation

## Overview

**Indian Routes & Trails** is a Next.js (App Router) luxury travel website for Om, a master India guide fluent in Spanish. The site targets discerning international travellers — primarily Spanish-speaking audiences from Latin America and Spain — offering curated private journeys across India.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router, Turbopack) |
| Styling | Tailwind CSS + CSS custom properties (design tokens in `globals.css`) |
| Fonts | Cormorant Garamond (`--font-display`) · Inter (`--font-body`) — both `latin-ext` for Spanish diacritics |
| Language | JavaScript (JSX / `.js` / `.jsx`) |
| Deployment | Vercel (`vercel.json` at repo root) |

---

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.js           # Root layout: fonts, LanguageProvider, Navbar, Footer
│   ├── page.js             # Home page
│   ├── about/page.js
│   ├── tours/
│   │   ├── page.js
│   │   └── [slug]/page.js + TourDetailClient.jsx
│   ├── destinations/
│   │   ├── page.js
│   │   └── [slug]/page.js + DestinationDetailClient.jsx
│   ├── festivals/
│   │   ├── page.js
│   │   └── [slug]/page.js + FestivalDetailClient.jsx
│   ├── experiences/page.js
│   ├── contact/page.js
│   ├── privacy/page.js
│   ├── terms/page.js
│   ├── thank-you/page.js
│   ├── not-found.js
│   ├── robots.js
│   └── sitemap.js
├── components/             # Shared UI components
│   ├── Navbar.jsx          # Fixed top nav — EN/ES switcher, links via translations
│   ├── Footer.jsx
│   ├── LanguageSwitcher.jsx  # Standalone toggle (kept for backward compat)
│   ├── EnquiryForm.jsx
│   ├── TourCard.jsx
│   ├── DestinationCard.jsx
│   ├── ItineraryTimeline.jsx
│   ├── SectionHeading.jsx
│   ├── Logo.jsx
│   └── FloatingActionGroup.jsx
├── sections/               # Page-specific section components
│   ├── home/
│   │   ├── HomeHero.jsx      # Hero with HeroSearchBar + HeroSelect
│   │   ├── HomeFestivalStrip.jsx
│   │   ├── HomeSearchBar.jsx
│   │   └── HomeTestimonials.jsx
│   ├── about/
│   ├── contact/
│   ├── destinations/
│   ├── experiences/
│   ├── festivals/
│   ├── home/
│   ├── short-trips/
│   └── tours/
├── data/                   # Static content / data
│   ├── translations.js     # EN + ES strings (all UI copy)
│   ├── tours.js
│   ├── destinations.js
│   ├── festivals.js
│   └── siteContent.js      # Om's biography, whyChooseUs, responsibleTourism
├── lib/
│   └── LanguageContext.js  # React context — lang state + localStorage persistence
└── public/                 # Static assets (images, icons)
```

---

## Internationalisation (i18n)

### Architecture

The site uses a **client-side language context** — no i18n routing, no URL segments, no middleware. Language is React state persisted to `localStorage`.

### How it works

1. **`lib/LanguageContext.js`** — exports `LanguageProvider` and `useLang()`.
   - Server and initial client render always use `'en'` to ensure SSR/hydration consistency.
   - After mount, reads `localStorage` key `ir_lang` and switches to the stored language if valid.
   - `setLang(l)` updates state and writes to `localStorage`.
   - Provides `{ lang, setLang, t }` where `t(key)` translates a dot-notation key for the current language.

2. **`data/translations.js`** — the single source of truth for all translated strings.
   - Two top-level keys: `en` and `es`.
   - Namespaces: `nav`, `hero`, `common`, `form`, `about`, `responsible`, `contact`, `footer`, `pricing`.
   - `t(lang, key)` helper resolves dot-notation paths (e.g. `'hero.cta_primary'`) with `'en'` fallback.

3. **`components/Navbar.jsx`** — renders the EN/ES toggle.
   - Desktop: appears between nav links and the Enquire button.
   - Mobile: appears in the bottom row of the drawer, left of the Enquire button.
   - Clicking a language calls `setLang(l)`, which persists to `localStorage` and re-renders all translated strings instantly.

4. **`components/LanguageSwitcher.jsx`** — standalone version kept for use in other layouts; delegates to the same `useLang()` context.

### Supported Languages

| Code | Name | Notes |
|---|---|---|
| `en` | English | Default, used for SSR |
| `es` | Spanish / Español | Stored in `localStorage` as `ir_lang=es` |

### Translation coverage

| Area | Translated |
|---|---|
| Navigation links | ✅ |
| Hero headline, subline, description, CTAs | ✅ |
| Search bar labels and option values | ✅ |
| Enquiry form all fields and messages | ✅ |
| Footer | ✅ |
| Common UI strings | ✅ |
| About / Contact / Pricing labels | ✅ |
| `siteContent.js` (Om's biography, whyChooseUs) | ❌ English only — not yet in translations |
| Tour / Destination / Festival content data | ❌ English only — `name.en` pattern used where multilingual structure exists |

---

## SSR Hydration

### Problem (fixed)

`HeroSelect` previously used a module-level counter to generate `aria-controls` IDs:

```js
// ❌ Before — caused hydration mismatch
let _heroSelectIdCounter = 0;
const baseId = useRef(`hs-${id}-${++_heroSelectIdCounter}`);
```

The counter value at mount time differed between server and client renders, producing mismatched `aria-controls` attributes that React logged as a hydration error.

### Fix applied

Replaced with React 18's `useId()`, which produces deterministic, SSR-safe IDs:

```js
// ✅ After
import { useId } from 'react';
const uid    = useId();
const baseId = `hs-${id}-${uid.replace(/:/g, '')}`;
const listId = `${baseId}-list`;
const optId  = (i) => `${baseId}-opt-${i}`;
```

`useId()` generates the same value on server and client for a given component position in the tree, eliminating the mismatch.

---

## Key Components

### `HomeHero` (`sections/home/HomeHero.jsx`)

Full-viewport hero with:
- Mobile and desktop hero images (served via Next.js `<Image>` with responsive `sizes`)
- Headline and CTA buttons wired to `useLang()` translations
- `HeroSearchBar` — filter by Festival / Duration / Interest, routes to `/tours?...`

### `HeroSelect`

Fully accessible custom listbox (WAI-ARIA combobox + listbox pattern):
- Keyboard: `Enter`/`Space`/`ArrowDown` to open, arrows to navigate, typeahead, `Escape` to close
- Dropdown panel rendered via `createPortal(document.body)` to escape `overflow:hidden` ancestors
- Position computed by `useDropdownPosition` hook (recalculates on resize/scroll, flips upward if near viewport bottom)
- IDs generated with `useId()` (SSR-safe)

### `Navbar` (`components/Navbar.jsx`)

- Fixed top, transparent over hero pages, warm-ivory when scrolled
- EN/ES language toggle on both desktop and mobile
- Nav link labels served via `t(key)` from `useLang()`
- Mobile drawer with language switcher in bottom row

### `EnquiryForm` (`components/EnquiryForm.jsx`)

Contact/enquiry form; all labels and validation messages use `useLang()` translations.

---

## Design Tokens

Defined in `app/globals.css` as CSS custom properties. Key tokens:

| Token | Usage |
|---|---|
| `--color-primary` | Deep indigo — headings, borders, active nav |
| `--color-primary-dark` | Darker indigo — hero overlay |
| `--color-secondary` | Marigold gold — CTAs, active selections |
| `--color-secondary-hover` | Darker gold — hover state |
| `--color-bg` | Warm ivory — page background |
| `--color-text` | Near-black — body text |
| `--color-text-muted` | Muted grey — secondary text |
| `--color-text-invert` | White — text on dark backgrounds |
| `--color-text-on-gold` | Dark text — text on marigold buttons |
| `--color-border` | Subtle border |
| `--color-border-strong` | Stronger border |
| `--font-display` | Cormorant Garamond — headings |
| `--font-body` | Inter — UI text |
| `--header-height-desktop` | Navbar height offset for page sections |
| `--radius-control` | Border radius for buttons/inputs |

---

## Data Files

### `data/tours.js`
Array of tour objects. Key fields: `slug`, `name`, `duration`, `highlights`, `itinerary[]`, `bestSeason`, `interests[]`, `coverImage`.

### `data/destinations.js`
Array of destination objects. Key fields: `slug`, `name`, `region`, `description`, `highlights[]`, `coverImage`.

### `data/festivals.js`
Array of festival objects. Key fields: `slug`, `name` (may be `{ en, es }` object or string), `region` (`north` | `south` | `pan-india`), `dates[]` (ISO date ranges per year), `description`.

**Date policy:** Only confirmed dates stored. Lunar/Hindu-calendar dates change annually — never store one year's date as a fixed recurring Gregorian date. Empty `dates[]` renders "Date to be confirmed".

### `data/siteContent.js`
Static English-only content:
- `siteConfig` — site name, tagline, contact details
- `omStory` — Om's biography, stats, credentials, expertise, whereIGuide
- `responsibleTourism` — responsible tourism statement
- `whyChooseUs` — six value-proposition cards

### `data/translations.js`
See [Internationalisation](#internationalisation-i18n) above.

---

## Routing

| Path | Page |
|---|---|
| `/` | Home |
| `/about` | About Om |
| `/tours` | Tour listing (filterable) |
| `/tours/[slug]` | Tour detail |
| `/destinations` | Destination listing |
| `/destinations/[slug]` | Destination detail |
| `/festivals` | Festival calendar |
| `/festivals/[slug]` | Festival detail |
| `/experiences` | Experiences overview |
| `/short-trips` | Short trips listing |
| `/contact` | Contact / enquiry |
| `/thank-you` | Post-enquiry confirmation |
| `/privacy` | Privacy policy |
| `/terms` | Terms & conditions |

Redirects (e.g. `/festivals/dev-deepawali → /festivals`) are configured in `next.config.js`.

---

## SEO

- `app/robots.js` — generates `robots.txt`
- `app/sitemap.js` — generates `sitemap.xml`
- `app/layout.js` — `metadata` object with OG tags, `alternateLocale: 'es_ES'`, Spanish keywords
- Each page exports its own `metadata` or `generateMetadata`

---

## Deployment

Deployed on **Vercel**. Configuration in `vercel.json` at the repository root. No special build steps beyond `next build`.

---

## Development

```powershell
# Install dependencies
npm install

# Start dev server (run manually in terminal)
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

> Dev server runs on `http://localhost:3000` by default.

---

## Known Limitations / Future Work

- `siteContent.js` biography and long-form copy is English-only. Translate into `translations.js` or introduce a parallel `siteContent.es.js` to cover Om's story in Spanish.
- `data/tours.js` and `data/destinations.js` content is English-only. Use `name.en` / `name.es` pattern (already established in `festivals.js`) when adding Spanish data.
- `html lang` attribute in `layout.js` is hardcoded `"en"`. Dynamically updating it requires a client wrapper or a different approach (e.g. `useEffect` to set `document.documentElement.lang`).
- No URL-based locale routing. If SEO for Spanish is a priority, consider migrating to `next-intl` with `[locale]` segments.
