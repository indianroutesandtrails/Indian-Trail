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

  const titleEn = typeof tour.title === 'object' ? tour.title.en : tour.title;
  const overviewEn = typeof tour.overview === 'object' ? tour.overview.en : tour.overview;
  const canonical = `https://www.indianroutesandtrails.com/tours/${slug}`;
  const desc = overviewEn?.slice(0, 155) ?? `${tour.duration}-day private India journey crafted by Om — Indian Routes & Trails.`;

  return {
    title: `${titleEn} — ${tour.duration}-Day Private India Tour`,
    description: desc,
    alternates: { canonical },
    keywords: [
      titleEn, 'India private tour', 'India luxury travel',
      `${tour.duration} day India tour`, 'Indian Routes and Trails', 'Om Prakash Saini guide',
    ],
    openGraph: {
      title:       `${titleEn} — ${tour.duration}-Day Private India Tour`,
      description: desc,
      url:         canonical,
      type:        'article',
      images: tour.featuredImage ? [{ url: tour.featuredImage, width: 1200, height: 630, alt: titleEn }] : [],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${titleEn} — Indian Routes & Trails`,
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
