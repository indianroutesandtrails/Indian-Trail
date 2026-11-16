import ContactPage from '@/sections/contact/ContactPage';

export const metadata = {
  title: 'Contact Om — Plan Your Private India Journey',
  description:
    'Reach Om Prakash Saini directly at Indian Routes & Trails. Every enquiry is answered personally. Book a free 10-minute video consultation or send your travel wishlist — your India journey starts here.',
  alternates: { canonical: 'https://www.indianroutesandtrails.com/contact' },
  openGraph: {
    title:       'Contact Om — Plan Your Private India Journey',
    description: 'Every enquiry answered personally by Om. Free 10-minute video consultation available.',
    url:         'https://www.indianroutesandtrails.com/contact',
    type:        'website',
  },
};

export default function Contact() {
  return <ContactPage />;
}
