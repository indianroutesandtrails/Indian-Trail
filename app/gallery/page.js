import GalleryPage from '@/sections/gallery/GalleryPage';

export const metadata = {
  title: 'Journeys in Photographs — Indian Routes & Trails',
  description:
    'Real travellers, real destinations — a visual memoir of India with Om. Browse our photo gallery of client journeys across Rajasthan, Kerala, Tamil Nadu and beyond.',
  alternates: {
    canonical: 'https://www.indianroutesandtrails.com/gallery',
  },
  openGraph: {
    title:       'Journeys in Photographs — Indian Routes & Trails',
    description: 'A visual memoir of India with Om Prakash Saini — real clients, real destinations.',
    url:         'https://www.indianroutesandtrails.com/gallery',
    type:        'website',
  },
};

export default function Gallery() {
  return <GalleryPage />;
}
