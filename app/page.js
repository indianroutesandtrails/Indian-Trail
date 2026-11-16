import HomeHero from '@/sections/home/HomeHero';
import HomeBrand from '@/sections/home/HomeBrand';
import HomeFestivalStrip from '@/sections/home/HomeFestivalStrip';
import HomeTours from '@/sections/home/HomeTours';
import HomeDestinations from '@/sections/home/HomeDestinations';
import HomeTestimonials from '@/sections/home/HomeTestimonials';
import HomeAboutTeaser from '@/sections/home/HomeAboutTeaser';
import HomeWhyUs from '@/sections/home/HomeWhyUs';
import HomeResponsible from '@/sections/home/HomeResponsible';
import HomeCTA from '@/sections/home/HomeCTA';

export const metadata = {
  title: 'Indian Routes & Trails — Exclusive India Tours by Om',
  description:
    'Discover India beyond the ordinary. Private, bespoke luxury journeys personally crafted by Om Prakash Saini — Government-authorised PAN-India guide, Spanish-language specialist, 38+ years of experience.',
  alternates: {
    canonical: 'https://www.indianroutesandtrails.com',
  },
  openGraph: {
    title:       'Indian Routes & Trails — Exclusive India Tours by Om',
    description: 'Private luxury journeys across India, personally crafted by Om — Spanish-fluent master guide. First call free.',
    url:         'https://www.indianroutesandtrails.com',
    type:        'website',
  },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeBrand />
      <HomeFestivalStrip />
      <HomeTours />
      <HomeAboutTeaser />
      <HomeDestinations />
      <HomeTestimonials />
      <HomeWhyUs />
      <HomeResponsible />
      <HomeCTA />
    </>
  );
}
