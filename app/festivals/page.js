import FestivalsHero from '@/sections/festivals/FestivalsHero';
import FestivalsList from '@/sections/festivals/FestivalsList';

export const metadata = {
  title: 'India Festival Calendar 2025–2026 — Plan Your Journey Around Celebrations',
  description:
    'Diwali, Holi, Pushkar Camel Fair, Gangaur, Onam, Mysuru Dasara, Pongal and more. Plan your India journey around its greatest festivals with Om Prakash Saini, Indian Routes & Trails.',
  alternates: { canonical: 'https://www.indianroutesandtrails.com/festivals' },
  openGraph: {
    title:       'India Festival Calendar 2025–2026 — Indian Routes & Trails',
    description: 'Time your India journey around Diwali, Holi, Pushkar, Gangaur and more. Curated by Om.',
    url:         'https://www.indianroutesandtrails.com/festivals',
    type:        'website',
  },
};

export default function FestivalsPage() {
  return (
    <>
      <FestivalsHero />
      <FestivalsList />
    </>
  );
}
