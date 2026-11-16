import { notFound } from 'next/navigation';
import { festivals, getFestivalBySlug } from '@/data/festivals';
import FestivalDetailClient from './FestivalDetailClient';

export async function generateStaticParams() {
  return festivals.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const festival = getFestivalBySlug(slug);
  if (!festival) return { title: 'Festival Not Found' };

  const name = typeof festival.name === 'object' ? festival.name.en : festival.name;
  const descSrc = typeof festival.description === 'object' ? festival.description.en : festival.description;
  const desc = descSrc?.slice(0, 155) ?? `Experience ${name} in India with Om — Indian Routes & Trails.`;
  const canonical = `https://www.indianroutesandtrails.com/festivals/${slug}`;

  return {
    title: `${name} in India — Dates, Traditions & Travel Guide`,
    description: desc,
    alternates: { canonical },
    keywords: [
      name, `${name} India`, `${name} tour`, `${name} travel`,
      'India festival tours', 'Indian Routes and Trails',
    ],
    openGraph: {
      title:       `${name} — Indian Routes & Trails`,
      description: desc,
      url:         canonical,
      type:        'article',
      images: festival.heroImage ? [{ url: festival.heroImage, width: 1200, height: 630, alt: name }] : [],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${name} — Indian Routes & Trails`,
      description: desc,
      images:      festival.heroImage ? [festival.heroImage] : [],
    },
  };
}

export default async function FestivalDetailPage({ params }) {
  const { slug } = await params;
  const festival = getFestivalBySlug(slug);
  if (!festival) notFound();
  return <FestivalDetailClient festival={festival} />;
}
