import './globals.css';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { LanguageProvider } from '@/lib/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActionGroup from '@/components/FloatingActionGroup';
import JsonLd, { siteSchema } from '@/components/JsonLd';

// latin-ext includes Spanish diacritics: á é í ó ú ñ ¿ ¡
const displayFont = Cormorant_Garamond({
  subsets: ['latin-ext'],
  weight: ['400', '600'],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Inter({
  subsets: ['latin-ext'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://www.indianroutesandtrails.com'),

  title: {
    default: 'Indian Routes & Trails — Exclusive India Tours by Om',
    template: '%s | Indian Routes & Trails',
  },
  description:
    'Curated luxury journeys across India by Om Prakash Saini — a Government-authorised PAN-India guide with 38+ years of experience, fluent in Spanish. Timeless, unhurried, deeply authentic private travel.',

  keywords: [
    // English — travel intent
    'India luxury tours', 'private India tours', 'exclusive India travel',
    'India tour guide', 'Rajasthan tours', 'Golden Triangle India',
    'Taj Mahal tour', 'Varanasi tour', 'Kerala tour', 'South India tour',
    'India heritage tours', 'India wildlife safari', 'India spiritual tours',
    'India festival tours', 'Diwali India tour', 'Holi India tour',
    'bespoke India itinerary', 'luxury India travel', 'India travel 2025',
    // Spanish — primary target market
    'viajes a India', 'viajes exclusivos India', 'turismo India lujo',
    'guia turistico India español', 'tour India en español',
    'viaje privado India', 'India para hispanohablantes',
    'Rajasthan en español', 'viajes India latinoamerica',
    'viaje India Colombia', 'viaje India Mexico', 'viaje India Argentina',
    // Brand / guide
    'Om Prakash Saini guide', 'Indian Routes and Trails',
    'Spanish speaking India guide', 'authorised India guide',
  ],

  authors: [{ name: 'Om Prakash Saini', url: 'https://www.indianroutesandtrails.com/about' }],
  creator: 'Om Prakash Saini — Indian Routes & Trails',
  publisher: 'Indian Routes & Trails',

  /* Canonical handled per-page; root is covered by metadataBase */
  alternates: {
    canonical: '/',
    languages: {
      'en':    'https://www.indianroutesandtrails.com',
      'es':    'https://www.indianroutesandtrails.com',
      'x-default': 'https://www.indianroutesandtrails.com',
    },
  },

  openGraph: {
    type:             'website',
    url:              'https://www.indianroutesandtrails.com',
    locale:           'en_US',
    alternateLocale:  'es_ES',
    siteName:         'Indian Routes & Trails',
    title:            'Indian Routes & Trails — Exclusive India Tours by Om',
    description:      'Private luxury journeys across India, personally crafted by Om — a Spanish-fluent master guide with 38+ years of experience. A Signature of Excellence.',
    images: [{
      url:    'https://www.indianroutesandtrails.com/og-cover.jpg',
      width:  1200,
      height: 630,
      alt:    'Indian Routes & Trails — Exclusive India Tours by Om Prakash Saini',
      type:   'image/jpeg',
    }],
  },

  twitter: {
    card:        'summary_large_image',
    title:       'Indian Routes & Trails — Exclusive India Tours by Om',
    description: 'Private luxury journeys across India, personally crafted by Om — Spanish-fluent master guide.',
    images:      ['https://www.indianroutesandtrails.com/og-cover.jpg'],
    creator:     '@IndianRoutes',
  },

  robots: {
    index:               true,
    follow:              true,
    googleBot: {
      index:              true,
      follow:             true,
      'max-video-preview':  -1,
      'max-image-preview':  'large',
      'max-snippet':        -1,
    },
  },

  /* Structured icons */
  icons: {
    icon:        '/favicon.ico',
    shortcut:    '/favicon.ico',
    apple:       '/apple-touch-icon.png',
  },

  /* Verification — add codes once verified on respective platforms */
  verification: {
    google: 'GOOGLE_SEARCH_CONSOLE_CODE',   // replace with real code
    yandex: 'YANDEX_CODE',
  },

  category: 'travel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <JsonLd data={siteSchema()} />
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingActionGroup />
        </LanguageProvider>
      </body>
    </html>
  );
}
