import { tours }        from '@/data/tours';
import { destinations } from '@/data/destinations';
import { festivals }    from '@/data/festivals';
import { shortTrips }   from '@/data/shortTrips';

const BASE = 'https://www.indianroutesandtrails.com';
const NOW  = new Date();

/** Build hreflang alternates for a path (EN + ES — same URL, language switched client-side) */
function alts(path) {
  const url = `${BASE}${path}`;
  return {
    languages: {
      'en':        url,
      'es':        url,
      'x-default': url,
    },
  };
}

export default function sitemap() {
  /* ── Static pages ─────────────────────────────────────────── */
  const staticPages = [
    { path: '',               priority: 1.0, freq: 'weekly'  },
    { path: '/about',         priority: 0.9, freq: 'monthly' },
    { path: '/tours',         priority: 0.95, freq: 'weekly' },
    { path: '/short-trips',   priority: 0.85, freq: 'weekly' },
    { path: '/destinations',  priority: 0.85, freq: 'monthly' },
    { path: '/festivals',     priority: 0.85, freq: 'weekly'  },
    { path: '/experiences',   priority: 0.80, freq: 'monthly' },
    { path: '/gallery',       priority: 0.80, freq: 'monthly' },
    { path: '/contact',       priority: 0.90, freq: 'monthly' },
  ].map(({ path, priority, freq }) => ({
    url:             `${BASE}${path}`,
    lastModified:    NOW,
    changeFrequency: freq,
    priority,
    alternates:      alts(path),
  }));

  /* ── Tour detail pages ────────────────────────────────────── */
  const tourPages = tours.map((t) => ({
    url:             `${BASE}/tours/${t.slug}`,
    lastModified:    NOW,
    changeFrequency: 'monthly',
    priority:        0.90,
    alternates:      alts(`/tours/${t.slug}`),
  }));

  /* ── Destination detail pages ─────────────────────────────── */
  const destPages = destinations.map((d) => ({
    url:             `${BASE}/destinations/${d.slug}`,
    lastModified:    NOW,
    changeFrequency: 'monthly',
    priority:        0.75,
    alternates:      alts(`/destinations/${d.slug}`),
  }));

  /* ── Festival detail pages ────────────────────────────────── */
  const festivalPages = festivals.map((f) => ({
    url:             `${BASE}/festivals/${f.slug}`,
    lastModified:    NOW,
    changeFrequency: 'monthly',
    priority:        0.75,
    alternates:      alts(`/festivals/${f.slug}`),
  }));

  /* ── Short-trip detail pages ──────────────────────────────── */
  const shortTripPages = shortTrips.map((t) => ({
    url:             `${BASE}/short-trips/${t.slug}`,
    lastModified:    NOW,
    changeFrequency: 'monthly',
    priority:        0.80,
    alternates:      alts(`/short-trips/${t.slug}`),
  }));

  return [
    ...staticPages,
    ...tourPages,
    ...destPages,
    ...festivalPages,
    ...shortTripPages,
  ];
}
