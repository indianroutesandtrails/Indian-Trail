import ExperiencesHero from '@/sections/experiences/ExperiencesHero';
import ExperiencesList from '@/sections/experiences/ExperiencesList';

export const metadata = {
  title: 'Unique India Experiences — Camel Safaris, Aarti Ceremonies & More',
  description:
    'Enrich your India journey with hand-picked optional experiences — camel safaris in the Thar Desert, Ganga Aarti at Varanasi, village boat rides, heritage food walks and Jeep safaris in tiger country.',
  alternates: { canonical: 'https://www.indianroutesandtrails.com/experiences' },
  openGraph: {
    title:       'Unique India Experiences — Indian Routes & Trails',
    description: 'Camel safaris, Ganga Aarti, food walks, tiger Jeep safaris — exclusive add-ons for your private India tour.',
    url:         'https://www.indianroutesandtrails.com/experiences',
    type:        'website',
  },
};

export default function ExperiencesPage() {
  return (
    <>
      <ExperiencesHero />
      <ExperiencesList />
    </>
  );
}
