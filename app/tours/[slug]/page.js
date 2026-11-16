import { notFound } from 'next/navigation';
import { tours, getTourBySlug } from '@/data/tours';
import TourDetailClient from './TourDetailClient';

export async function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: 'Tour Not Found' };

  const canonical = `https://www.indianroutesandtrails.com/tours/${slug}`;
  const desc = tour.overview?.slice(0, 155) ?? `${tour.duration}-day private India journey crafted by Om — Indian Routes & Trails.`;

  return {
    title: `${tour.title} — ${tour.duration}-Day Private India Tour`,
    description: desc,
    alternates: { canonical },
    keywords: [
      tour.title, 'India private tour', 'India luxury travel',
      `${tour.duration} day India tour`, 'Indian Routes and Trails', 'Om Prakash Saini guide',
    ],
    openGraph: {
      title:       `${tour.title} — ${tour.duration}-Day Private India Tour`,
      description: desc,
      url:         canonical,
      type:        'article',
      images: tour.featuredImage ? [{ url: tour.featuredImage, width: 1200, height: 630, alt: tour.title }] : [],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${tour.title} — Indian Routes & Trails`,
      description: desc,
      images:      tour.featuredImage ? [tour.featuredImage] : [],
    },
  };
}

export default async function TourDetailPage({ params }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();
  return <TourDetailClient tour={tour} />;
}
