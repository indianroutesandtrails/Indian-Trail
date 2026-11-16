import ToursHero from '@/sections/tours/ToursHero';
import ToursList from '@/sections/tours/ToursList';

export const metadata = {
  title: 'India Tour Packages — Curated Private Journeys by Om',
  description:
    'Browse curated private India journeys — Golden Triangle, Rajasthan, South India, wildlife safaris, spiritual circuits and more. Every itinerary personally crafted by Om Prakash Saini.',
  alternates: { canonical: 'https://www.indianroutesandtrails.com/tours' },
  openGraph: {
    title:       'India Tour Packages — Curated Private Journeys by Om',
    description: 'Curated private India journeys from 6 to 17 days — Golden Triangle, Rajasthan, South India, wildlife and spiritual circuits.',
    url:         'https://www.indianroutesandtrails.com/tours',
    type:        'website',
  },
};

export default function ToursPage() {
  return (
    <>
      <ToursHero />
      <ToursList />
    </>
  );
}
