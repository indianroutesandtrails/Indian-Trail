import AboutHero from '@/sections/about/AboutHero';
import AboutStory from '@/sections/about/AboutStory';
import AboutExpertise from '@/sections/about/AboutExpertise';
import AboutPhilosophy from '@/sections/about/AboutPhilosophy';
import AboutWhereIGuide from '@/sections/about/AboutWhereIGuide';
import AboutClosing from '@/sections/about/AboutClosing';

export const metadata = {
  title: 'About Om Prakash Saini — Master Guide, Indian Routes & Trails',
  description:
    'Meet Om Prakash Saini — Government of India authorised PAN-India Tourist Guide, 38+ years guiding experience, Spanish-language specialist, and the soul of Indian Routes & Trails. Every journey is personal.',
  alternates: { canonical: 'https://www.indianroutesandtrails.com/about' },
  openGraph: {
    title:       'About Om Prakash Saini — Master Guide, Indian Routes & Trails',
    description: 'Government-authorised PAN-India guide with 38+ years of experience and deep Spanish-language expertise. Every journey is personal.',
    url:         'https://www.indianroutesandtrails.com/about',
    type:        'profile',
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutExpertise />
      <AboutPhilosophy />
      <AboutWhereIGuide />
      <AboutClosing />
    </>
  );
}
