'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { tours } from '@/data/tours';
import { useLang } from '@/lib/LanguageContext';

/* ── Tour slug → number, derived from data order ──────────────── */
const TOUR_NUMBER = Object.fromEntries(
  tours.map((t, i) => [t.slug, i + 1])
);
// e.g. { 'echoes-of-empires-delhi-agra': 1, 'golden-triangle-wildlife-trail': 2, … }

/* ── image map ─────────────────────────────────────────────────── */
const EXPERIENCE_IMAGES = {
  'wildlife-safari':  '/experiances/ranthambore safari.jpg',
  'ganga-aarti':      '/experiances/ganga arti.jpg',
  'leopard-safari':   '/experiances/leopard safari.jpg',
  'village-ramathra': '/experiances/ramdhara.jpg',
  'sunrise-ganges':   '/experiances/Sunrise Boat Ride .jpg',
  'heritage-food':    '/experiances/Heritage food.jpg',
  'wagah-border':     '/experiances/Wagah Border.jpg',
  'rabari-walk':      '/experiances/Rabari Community Walk.jpg',
  'ayurveda':         '/experiances/Ayurveda Healing Massage.jpg',
};

/* ── experience data ───────────────────────────────────────────── */
const experiences = [
  {
    category: { en: 'Wildlife', es: 'Naturaleza' },
    title: { en: 'Jeep Safari in Tiger Country', es: 'Safari en jeep en el país del tigre' },
    description: {
      en: 'A dawn jeep safari through the rolling hills, crags and meadows of Ranthambore — one of India\'s finest opportunities to sight the Bengal tiger in the wild.',
      es: 'Un safari al amanecer por las colinas, riscos y praderas de Ranthambore — una de las mejores oportunidades de India para avistar el tigre de Bengala en estado salvaje.',
    },
    note: { en: 'Wear warm, full-body clothing. Carry water and refreshments.', es: 'Viste ropa abrigada y que cubra el cuerpo. Lleva agua y refrigerios.' },
    image: EXPERIENCE_IMAGES['wildlife-safari'],
    tours: ['royal-forts-wilderness-heritage-trail', 'echoes-of-forts-and-forests', 'crowns-citadel-countryside'],
  },
  {
    category: { en: 'Spiritual', es: 'Espiritual' },
    title: { en: 'Ganga Aarti at Dashashwamedh Ghat', es: 'Ganga Aarti en Dashashwamedh Ghat' },
    description: {
      en: 'The most elaborate fire ceremony in Varanasi — an ancient ritual at dusk every day. Conch shells, ringing bells and sacred mantras as priests venerate the Ganga.',
      es: 'La más elaborada ceremonia del fuego en Varanasi — un ritual ancestral que se celebra al atardecer cada día. Conchas marinas, campanas y mantras sagrados mientras los sacerdotes veneran el Ganges.',
    },
    note: { en: '', es: '' },
    image: EXPERIENCE_IMAGES['ganga-aarti'],
    tours: ['temples-thrones-holy-ghats', 'north-india-unveiled'],
  },
  {
    category: { en: 'Wildlife', es: 'Naturaleza' },
    title: { en: 'Sunset Leopard Safari, Rawla Narlai', es: 'Safari del leopardo al atardecer, Rawla Narlai' },
    description: {
      en: 'The rocky Aravalli terrain around Narlai supports a rare density of leopards. This evening safari in warm, golden light is one of the most intimate wildlife encounters in Rajasthan.',
      es: 'El terreno rocoso de los Aravalli alrededor de Narlai alberga una densidad excepcional de leopardos. Este safari vespertino con luz dorada y cálida es uno de los encuentros con la fauna más íntimos de Rajasthan.',
    },
    note: { en: '', es: '' },
    image: EXPERIENCE_IMAGES['leopard-safari'],
    tours: ['echoes-of-forts-and-forests', 'north-india-unveiled'],
  },
  {
    category: { en: 'Village', es: 'Vida rural' },
    title: { en: 'Village Life at Ramathra Fort', es: 'Vida aldeana en el Fuerte de Ramathra' },
    description: {
      en: 'Leave the highways and enter rural Rajasthan. A boat ride at sunset on Kalisil lake. Local cuisine cooked in a traditional way at a farming family\'s home.',
      es: 'Abandona las carreteras y adéntrate en el Rajasthan rural. Un paseo en barca al atardecer en el lago Kalisil. Cocina local preparada a la manera tradicional en casa de una familia campesina.',
    },
    note: { en: 'One of the most memorable experiences on any journey with Om.', es: 'Una de las experiencias más memorables en cualquier viaje con Om.' },
    image: EXPERIENCE_IMAGES['village-ramathra'],
    tours: ['royal-forts-wilderness-heritage-trail', 'crowns-citadel-countryside'],
  },
  {
    category: { en: 'Spiritual', es: 'Espiritual' },
    title: { en: 'Sunrise Boat Ride on the Ganges', es: 'Paseo en barca al amanecer en el Ganges' },
    description: {
      en: 'Rise at 5 AM for the most magical hour. Pilgrims at morning prayers, priests offering incense, the ghats bathed in soft golden light.',
      es: 'Despierta a las 5 de la mañana para vivir la hora más mágica. Peregrinos en oraciones matinales, sacerdotes ofreciendo incienso, los ghats bañados en suave luz dorada.',
    },
    note: { en: '', es: '' },
    image: EXPERIENCE_IMAGES['sunrise-ganges'],
    tours: ['temples-thrones-holy-ghats', 'north-india-unveiled'],
  },
  {
    category: { en: 'Heritage', es: 'Patrimonio' },
    title: { en: 'Heritage Food Walk in Jaipur', es: 'Paseo gastronómico patrimonial en Jaipur' },
    description: {
      en: 'Explore the walled city\'s hidden culinary treasures — pyaz kachori, samosa, pani puri and Indian chai. Climb Wind View Café for the perfect Hawa Mahal photograph.',
      es: 'Descubre los tesoros culinarios ocultos de la ciudad amurallada — pyaz kachori, samosa, pani puri y chai indio. Sube al Wind View Café para la fotografía perfecta del Hawa Mahal.',
    },
    note: { en: '', es: '' },
    image: EXPERIENCE_IMAGES['heritage-food'],
    tours: ['echoes-of-empires-delhi-agra', 'golden-triangle-wildlife-trail'],
  },
  {
    category: { en: 'Cultural', es: 'Cultural' },
    title: { en: 'Wagah Border Beating Retreat', es: 'Ceremonia del Retiro en la Frontera de Wagah' },
    description: {
      en: 'The spectacular daily ceremony at the India–Pakistan border. Infantrymen exchange fierce looks, shake hands, then simultaneously lower both flags.',
      es: 'El espectacular ceremonial diario en la frontera India-Pakistán. Los soldados intercambian miradas intimidantes, se dan la mano y luego arrían ambas banderas al unísono.',
    },
    note: { en: '', es: '' },
    image: EXPERIENCE_IMAGES['wagah-border'],
    tours: ['north-india-unveiled'],
  },
  {
    category: { en: 'Village', es: 'Vida rural' },
    title: { en: 'Rabari Community Walk, Narlai', es: 'Caminata con la comunidad Rabari, Narlai' },
    description: {
      en: 'Walk with the Rabari pastoralists — semi-nomadic cattle herders who have shared the Aravalli terrain with leopards for centuries. A rare and intimate encounter.',
      es: 'Camina junto a los pastores Rabari — ganaderos seminómadas que comparten el terreno de los Aravalli con los leopardos desde hace siglos. Un encuentro raro e íntimo.',
    },
    note: { en: '', es: '' },
    image: EXPERIENCE_IMAGES['rabari-walk'],
    tours: ['echoes-of-forts-and-forests', 'north-india-unveiled'],
  },
  {
    category: { en: 'Wellness', es: 'Bienestar' },
    title: { en: 'Ayurveda Healing Massage & Spa', es: 'Masaje y spa de sanación ayurvédica' },
    description: {
      en: 'Rejuvenate mind, body and soul with a traditional Ayurveda healing session — available on arrival day or during any rest day throughout your journey.',
      es: 'Rejuvenece mente, cuerpo y alma con una sesión tradicional de sanación ayurvédica — disponible el día de llegada o en cualquier día de descanso durante tu viaje.',
    },
    note: { en: 'Available on request during any journey.', es: 'Disponible bajo petición durante cualquier viaje.' },
    image: EXPERIENCE_IMAGES['ayurveda'],
    tours: [],
  },
];

/* ── categories in first-appearance order (English keys) ───────── */
const CATEGORIES = Array.from(
  new Map(experiences.map((e) => [e.category.en, e.category.en])).keys()
);

/* ── category badge colours ────────────────────────────────────── */
const catStyle = {
  Wildlife:  { bg: 'var(--color-success)',        text: '#fff' },
  Spiritual: { bg: 'var(--color-primary)',         text: '#fff' },
  Village:   { bg: 'var(--color-accent)',          text: '#fff' },
  Heritage:  { bg: 'var(--color-secondary-hover)', text: 'var(--color-text-on-gold)' },
  Cultural:  { bg: 'var(--color-primary-light)',   text: '#fff' },
  Wellness:  { bg: 'var(--color-success)',         text: '#fff' },
};

/* ── breakpoint hook ───────────────────────────────────────────── */
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);
  return mobile;
}

/* ── View Tour button with tour numbers ────────────────────────── */
function TourLinks({ slugs, mobile = false, lang = 'en' }) {
  if (!slugs?.length) return null;
  const btnBase = {
    display:         'inline-flex',
    alignItems:      'center',
    gap:             mobile ? '3px' : '4px',
    border:          '1px solid var(--color-border)',
    color:           'var(--color-primary)',
    borderRadius:    'var(--radius-control)',
    backgroundColor: 'transparent',
    cursor:          'pointer',
    transition:      'background-color 200ms ease, color 200ms ease, border-color 200ms ease',
    fontFamily:      'var(--font-body, system-ui)',
    textTransform:   'uppercase',
    letterSpacing:   '0.06em',
    textDecoration:  'none',
    /* mobile: smaller; desktop: original */
    fontSize:        mobile ? '8px' : '9px',
    padding:         mobile ? '3px 6px' : '4px 10px',
  };

  return (
    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: mobile ? '10px' : '16px' }}>
      <p style={{
        fontFamily:    'var(--font-body, system-ui)',
        fontSize:      mobile ? '8px' : '9px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color:         'var(--color-text-muted)',
        marginBottom:  mobile ? '6px' : '8px',
      }}>
        {lang === 'es' ? 'Disponible en' : 'Available in'}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: mobile ? '6px' : '8px' }}>
        {slugs.map((slug) => {
          const num = TOUR_NUMBER[slug] ?? '?';
          return (
            <Link
              key={slug}
              href={`/tours/${slug}`}
              style={btnBase}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-primary)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              <span style={{ fontWeight: 600, opacity: 0.75 }}>T{num}</span>
              <span style={{ opacity: 0.45, fontSize: mobile ? '6px' : '7px' }}>·</span>
              {lang === 'es' ? 'Ver' : 'View'}
              <ArrowRight size={mobile ? 6 : 7} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   ExperienceCard — props control mobile-vs-desktop sizing
   ────────────────────────────────────────────────────────────────*/
function ExperienceCard({ exp, sizes = '33vw', mobile = false, lang = 'en' }) {
  const cat = catStyle[exp.category.en] || { bg: 'var(--color-primary)', text: '#fff' };
  const title       = exp.title[lang]       ?? exp.title.en;
  const description = exp.description[lang] ?? exp.description.en;
  const note        = exp.note?.[lang]      ?? exp.note?.en ?? '';

  /* Mobile: compact image + tighter content */
  const imgH      = mobile ? '150px' : '220px';
  const titleSize = mobile ? '0.9rem' : '1.125rem';
  const bodySize  = mobile ? '0.78rem' : '0.875rem';
  const noteSize  = mobile ? '0.72rem' : '0.75rem';
  const padContent = mobile ? '10px 12px' : '20px';
  const titleMB   = mobile ? '6px' : '10px';
  const bodyMB    = mobile ? '8px' : '16px';

  return (
    <article
      className="group flex flex-col"
      style={{
        backgroundColor: 'var(--color-surface)',
        border:          '1px solid var(--color-border)',
        borderRadius:    'var(--radius-card)',
        overflow:        'hidden',
        height:          '100%',
        transition:      'box-shadow 300ms ease, transform 300ms ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-overlay)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'none';
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: imgH, flexShrink: 0 }}>
        <Image
          src={exp.image}
          alt={`${exp.title} — Indian Routes & Trails`}
          fill
          className="object-cover"
          style={{ transition: 'transform var(--motion-image-hover)' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          sizes={sizes}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.5) 0%, transparent 60%)' }} />
        <span
          className="absolute top-3 left-3 font-sans uppercase"
          style={{
            fontSize:        mobile ? '7px' : '9px',
            letterSpacing:   '0.2em',
            padding:         mobile ? '2px 6px' : '4px 10px',
            backgroundColor: cat.bg,
            color:           cat.text,
            borderRadius:    'var(--radius-control)',
          }}
        >
          {exp.category[lang] ?? exp.category.en}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1" style={{ padding: padContent }}>
        <h3
          className="font-serif font-light"
          style={{ color: 'var(--color-text)', fontSize: titleSize, lineHeight: 1.3, marginBottom: titleMB }}
        >
          {title}
        </h3>

        <p
          className="font-sans font-light leading-relaxed flex-1"
          style={{ color: 'var(--color-text-muted)', fontSize: bodySize, marginBottom: bodyMB }}
        >
          {description}
        </p>

        {note && (
          <p
            className="font-sans italic pl-2"
            style={{
              color:       'var(--color-secondary-hover)',
              borderLeft:  '2px solid var(--color-border-gold)',
              fontSize:    noteSize,
              marginBottom: bodyMB,
            }}
          >
            {note}
          </p>
        )}

        <TourLinks slugs={exp.tours} mobile={mobile} />
      </div>
    </article>
  );
}

/* ────────────────────────────────────────────────────────────────
   MobileCategorySlider
   • CSS scroll-snap-type: x mandatory
   • scroll-snap-align: center so active card is centered
   • IntersectionObserver (threshold 0.5) tracks active independently
   • No JS touch handlers → vertical page scroll unblocked
   • No arrow buttons
   ────────────────────────────────────────────────────────────────*/
function MobileCategorySlider({ category, cards, lang = 'en' }) {
  const scrollRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const count = cards.length;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const items = Array.from(container.children);
    if (!items.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target);
            if (idx !== -1) setActiveIdx(idx);
          }
        });
      },
      { root: container, threshold: 0.5 }
    );
    items.forEach((item) => obs.observe(item));
    return () => obs.disconnect();
  }, [cards]);

  const scrollToCard = useCallback((idx) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[idx];
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, []);

  return (
    <div>
      {/* Track */}
      <div
        ref={scrollRef}
        className="no-scrollbar"
        style={{
          display:                 'flex',
          overflowX:               'auto',
          scrollSnapType:          'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth:          'none',
          msOverflowStyle:         'none',
          /* padding left/right creates visible peek of next card
             and centers the active card */
          paddingLeft:             '16px',
          paddingRight:            '16px',
          gap:                     '12px',
          paddingBottom:           '4px',
        }}
      >
        {cards.map((exp, i) => (
          <div
            key={i}
            style={{
              /* Card width: full container minus the two 16px gutters */
              flex:            '0 0 calc(100% - 32px)',
              scrollSnapAlign: 'center',
              scrollSnapStop:  'always',
              minWidth:        0,
            }}
          >
            <ExperienceCard exp={exp} sizes="90vw" mobile lang={lang} />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div
        className="flex items-center justify-center gap-2 mt-4"
        role="tablist"
        aria-label={lang === 'es' ? `Diapositivas de ${category}` : `${category} experience slides`}
      >
        {cards.map((_, i) => {
          const isActive = i === activeIdx;
          const isSingle = count === 1;
          return (
            <button
              key={i}
              role="tab"
              aria-label={`Go to ${category} experience ${i + 1}`}
              aria-current={isActive ? 'true' : undefined}
              aria-selected={isActive}
              onClick={isSingle ? undefined : () => scrollToCard(i)}
              style={{
                width:           isActive ? '22px' : '7px',
                height:          '7px',
                borderRadius:    '999px',
                border:          'none',
                padding:         0,
                cursor:          isSingle ? 'default' : 'pointer',
                backgroundColor: isActive
                  ? 'var(--color-secondary)'
                  : 'var(--color-border-strong)',
                transition: 'width 280ms ease, background-color 280ms ease',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ── Desktop category filter pills ────────────────────────────── */
function CategoryFilter({ active, onChange, counts, lang = 'en' }) {
  const allLabel = lang === 'es' ? 'Todas las experiencias' : 'All Experiences';
  const pills = [allLabel, ...CATEGORIES];
  return (
    <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label={lang === 'es' ? 'Filtrar por categoría' : 'Filter by category'}>
      {pills.map((cat) => {
        const isActive = active === cat;
        const isAll = cat === allLabel;
        const count = isAll ? experiences.length : (counts[cat] ?? 0);
        // For non-all, find the localized label
        const exp0 = experiences.find(e => e.category.en === cat);
        const displayLabel = isAll ? allLabel : (exp0 ? (exp0.category[lang] ?? cat) : cat);
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            aria-pressed={isActive}
            className="font-sans text-[10px] tracking-[0.16em] uppercase px-4 py-2 transition-all duration-200 inline-flex items-center gap-1.5"
            style={{
              border:          `1.5px solid ${isActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
              backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
              color:           isActive ? 'var(--color-text-invert)' : 'var(--color-text-muted)',
              borderRadius:    'var(--radius-control)',
            }}
          >
            {displayLabel}
            <span style={{ fontSize: '9px', opacity: 0.7, fontVariantNumeric: 'tabular-nums' }}>
              ({count})
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Main ──────────────────────────────────────────────────────── */
export default function ExperiencesList() {
  const isMobile = useIsMobile();
  const { lang } = useLang();
  const allLabel = lang === 'es' ? 'Todas las experiencias' : 'All Experiences';
  const [activeFilter, setActiveFilter] = useState(allLabel);

  // Keep filter in sync with lang changes
  useEffect(() => {
    setActiveFilter(lang === 'es' ? 'Todas las experiencias' : 'All Experiences');
  }, [lang]);

  const counts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = experiences.filter((e) => e.category.en === cat).length;
    return acc;
  }, {});

  const desktopCards = activeFilter === allLabel
    ? experiences
    : experiences.filter((e) => e.category.en === activeFilter);

  const mobileGroups = CATEGORIES.map((cat) => ({
    category: cat,
    cards:    experiences.filter((e) => e.category.en === cat),
  })).filter((g) => g.cards.length > 0);

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-luxury">

        {/* ── DESKTOP / TABLET ────────────────────────────────── */}
        {!isMobile && (
          <>
            <CategoryFilter active={activeFilter} onChange={setActiveFilter} counts={counts} lang={lang} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {desktopCards.map((exp, i) => (
                <ExperienceCard key={`${exp.title.en}-${i}`} exp={exp} sizes="33vw" lang={lang} />
              ))}
            </div>
          </>
        )}

        {/* ── MOBILE — grouped category sliders ────────────────── */}
        {isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {mobileGroups.map(({ category, cards }) => {
              const exp0 = experiences.find(e => e.category.en === category);
              const displayCat = exp0 ? (exp0.category[lang] ?? category) : category;
              const expWord = lang === 'es'
                ? (cards.length === 1 ? 'experiencia' : 'experiencias')
                : (cards.length === 1 ? 'experience' : 'experiences');
              return (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="font-serif text-xl font-light" style={{ color: 'var(--color-text)' }}>
                      {displayCat}
                    </h2>
                    <span className="font-sans text-[10px] tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                      {cards.length} {expWord}
                    </span>
                    <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
                  </div>
                  <MobileCategorySlider category={category} cards={cards} lang={lang} />
                </div>
              );
            })}
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className="font-serif text-lg italic mb-5" style={{ color: 'var(--color-text-muted)' }}>
            {lang === 'es'
              ? '\u00abLas experiencias que eliges son tan importantes como los destinos que visitas.\u00bb'
              : '\u201cThe experiences you choose are as important as the destinations you visit.\u201d'}
          </p>
          <Link href="/contact" className="btn-primary inline-flex">
            {lang === 'es' ? 'Planear mi experiencia' : 'Plan My Experience'}
          </Link>
        </div>
      </div>
    </section>
  );
}
