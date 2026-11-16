import { notFound } from 'next/navigation';
import { destinations, getDestinationBySlug } from '@/data/destinations';
import DestinationDetailClient from './DestinationDetailClient';

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return { title: 'Destination Not Found' };

  const canonical = `https://www.indianroutesandtrails.com/destinations/${slug}`;
  const desc = dest.description?.slice(0, 155) ?? `Discover ${dest.name} with Om — Indian Routes & Trails.`;

  return {
    title: `${dest.name} — ${dest.tagline ?? 'Private India Tours'}`,
    description: desc,
    alternates: { canonical },
    keywords: [
      dest.name, `${dest.name} tour`, `visit ${dest.name}`,
      'India private tour', 'Indian Routes and Trails',
    ],
    openGraph: {
      title:       `${dest.name} — Indian Routes & Trails`,
      description: desc,
      url:         canonical,
      type:        'article',
      images: dest.featuredImage ? [{ url: dest.featuredImage, width: 1200, height: 630, alt: dest.name }] : [],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${dest.name} — Indian Routes & Trails`,
      description: desc,
      images:      dest.featuredImage ? [dest.featuredImage] : [],
    },
  };
}

export default async function DestinationDetailPage({ params }) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) notFound();
  return <DestinationDetailClient destination={dest} />;
}
