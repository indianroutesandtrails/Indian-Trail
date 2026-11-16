/**
 * JsonLd — injects JSON-LD structured data into <head>
 * Usage:  <JsonLd data={schemaObject} />
 *
 * Pre-built helpers exported at the bottom:
 *   siteSchema()           → TravelAgency + Person (whole-site)
 *   tourSchema(tour)       → TouristTrip
 *   festivalSchema(fest)   → Event
 *   breadcrumbSchema(list) → BreadcrumbList
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ── Helpers ─────────────────────────────────────────────────── */

export function siteSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      /* TravelAgency */
      {
        '@type':       'TravelAgency',
        '@id':         'https://www.indianroutesandtrails.com/#organization',
        name:          'Indian Routes & Trails',
        url:           'https://www.indianroutesandtrails.com',
        logo: {
          '@type': 'ImageObject',
          url:     'https://www.indianroutesandtrails.com/logo.png',
        },
        description:
          'Private luxury journeys across India, personally crafted by Om Prakash Saini — Government-authorised PAN-India guide, Spanish-language specialist.',
        address: {
          '@type':           'PostalAddress',
          streetAddress:     'Sri Sri Villa, Near Rajasthan ITI College, NH-8 Kunda, Amber',
          addressLocality:   'Jaipur',
          addressRegion:     'Rajasthan',
          postalCode:        '302028',
          addressCountry:    'IN',
        },
        contactPoint: [
          {
            '@type':       'ContactPoint',
            telephone:     '+91-98290-62440',
            contactType:   'customer service',
            availableLanguage: ['English', 'Spanish', 'Hindi'],
          },
        ],
        sameAs: [
          'https://wa.me/919829062440',
        ],
        areaServed: {
          '@type': 'Country',
          name:    'India',
        },
        priceRange:    '₹₹₹',
        currenciesAccepted: 'INR, EUR, USD',
      },

      /* Person — Om */
      {
        '@type':       'Person',
        '@id':         'https://www.indianroutesandtrails.com/about#om',
        name:          'Om Prakash Saini',
        jobTitle:      'Government-Authorised PAN-India Tourist Guide',
        description:   'Master guide with 38+ years of experience, Spanish-language specialist, founder of Indian Routes & Trails.',
        url:           'https://www.indianroutesandtrails.com/about',
        worksFor: {
          '@id': 'https://www.indianroutesandtrails.com/#organization',
        },
        knowsLanguage: ['English', 'Spanish', 'Hindi', 'Rajasthani'],
        address: {
          '@type':         'PostalAddress',
          addressLocality: 'Jaipur',
          addressRegion:   'Rajasthan',
          addressCountry:  'IN',
        },
      },

      /* WebSite */
      {
        '@type':  'WebSite',
        '@id':    'https://www.indianroutesandtrails.com/#website',
        url:      'https://www.indianroutesandtrails.com',
        name:     'Indian Routes & Trails',
        publisher: { '@id': 'https://www.indianroutesandtrails.com/#organization' },
        potentialAction: {
          '@type':       'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://www.indianroutesandtrails.com/tours?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };
}

export function tourSchema(tour) {
  return {
    '@context': 'https://schema.org',
    '@type':    'TouristTrip',
    name:       tour.title,
    description: tour.overview ?? '',
    url:        `https://www.indianroutesandtrails.com/tours/${tour.slug}`,
    image:      tour.featuredImage ?? '',
    touristType: ['Luxury', 'Cultural', 'Heritage'],
    provider: {
      '@id': 'https://www.indianroutesandtrails.com/#organization',
    },
    offers: {
      '@type':       'Offer',
      availability:  'https://schema.org/InStock',
      priceCurrency: 'INR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        description: 'Bespoke pricing — request a personalised quote.',
      },
    },
    duration: `P${tour.duration}D`,
  };
}

export function festivalSchema(festival, dates = []) {
  const name = typeof festival.name === 'object' ? festival.name.en : festival.name;
  const desc = typeof festival.description === 'object' ? festival.description.en : (festival.description ?? '');

  const events = dates.length
    ? dates.map((d) => ({
        '@type':     'Event',
        name:        name,
        description: desc.slice(0, 200),
        url:         `https://www.indianroutesandtrails.com/festivals/${festival.slug}`,
        image:       festival.heroImage ?? '',
        startDate:   d.start,
        endDate:     d.end,
        location: {
          '@type':         'Country',
          name:            'India',
          addressCountry:  'IN',
        },
        organizer: { '@id': 'https://www.indianroutesandtrails.com/#organization' },
        eventStatus:   'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      }))
    : [];

  return events.length === 1 ? events[0] : { '@context': 'https://schema.org', '@graph': events.map(e => ({ '@context': 'https://schema.org', ...e })) };
}

export function breadcrumbSchema(items) {
  /* items: [{ name, url }] */
  return {
    '@context':        'https://schema.org',
    '@type':           'BreadcrumbList',
    itemListElement:   items.map((item, idx) => ({
      '@type':    'ListItem',
      position:   idx + 1,
      name:       item.name,
      item:       item.url,
    })),
  };
}
