import ShortTripsPage from '@/sections/short-trips/ShortTripsPage';

export const metadata = {
  title: 'Short Trips & Day Excursions from Delhi & Jaipur — Indian Routes & Trails',
  description:
    'Taj Mahal day trip, Ranthambore tiger safari, Pushkar camel fair, Amber Fort, Keoladeo Bird Sanctuary — remarkable short trips and day excursions thoughtfully arranged by Om from Delhi and Jaipur.',
  alternates: { canonical: 'https://www.indianroutesandtrails.com/short-trips' },
  openGraph: {
    title:       'Short Trips & Day Excursions — Indian Routes & Trails',
    description: 'Taj Mahal, Ranthambore, Amber Fort, Pushkar — day trips and overnight escapes from Delhi & Jaipur by Om.',
    url:         'https://www.indianroutesandtrails.com/short-trips',
    type:        'website',
  },
};

export default function Page() {
  return <ShortTripsPage />;
}
