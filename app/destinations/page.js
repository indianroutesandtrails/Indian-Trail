import DestinationsHero from '@/sections/destinations/DestinationsHero';
import DestinationsList from '@/sections/destinations/DestinationsList';

export const metadata = {
  title: 'India Destinations — Royal Cities, Sacred Sites & Wild Landscapes',
  description:
    'Explore India\'s most extraordinary destinations — Jaipur, Agra, Varanasi, Udaipur, Jaisalmer, Khajuraho, Ranthambore and more. All curated by master guide Om Prakash Saini.',
  alternates: { canonical: 'https://www.indianroutesandtrails.com/destinations' },
  openGraph: {
    title:       'India Destinations — Royal Cities, Sacred Sites & Wild Landscapes',
    description: 'Jaipur, Agra, Varanasi, Udaipur, Jaisalmer — India\'s greatest destinations curated by Om.',
    url:         'https://www.indianroutesandtrails.com/destinations',
    type:        'website',
  },
};

export default function DestinationsPage() {
  return (
    <>
      <DestinationsHero />
      <DestinationsList />
    </>
  );
}
