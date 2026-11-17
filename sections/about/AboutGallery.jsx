'use client';
import Image from 'next/image';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

/*
 * Gallery images grouped by category.
 * India place names (Jaipur, Taj Mahal, etc.) are intentionally NOT translated.
 * Labels / UI strings go through t().
 */
const GALLERY = [
  /* ── Om with guests at iconic sites ── */
  {
    src:  "/Owner's-Pic/group-photo-taj-mahal-agra.webp",
    alt:  'Group at the Taj Mahal, Agra',
    cat:  'Iconic Sites',
  },
  {
    src:  "/Owner's-Pic/group-photo-taj-mahal-great-gate-agra.webp",
    alt:  'Group at the Great Gate, Taj Mahal, Agra',
    cat:  'Iconic Sites',
  },
  {
    src:  "/Owner's-Pic/group-photo-scalloped-arch-amber-fort-jaipur.webp",
    alt:  'Group at Amber Fort, Jaipur',
    cat:  'Iconic Sites',
  },
  {
    src:  "/Owner's-Pic/couple-ganesh-pol-amber-fort-jaipur.webp",
    alt:  'Couple at Ganesh Pol, Amber Fort, Jaipur',
    cat:  'Iconic Sites',
  },
  {
    src:  "/Owner's-Pic/group-photo-jaswant-thada-jodhpur.webp",
    alt:  'Group at Jaswant Thada, Jodhpur',
    cat:  'Iconic Sites',
  },
  {
    src:  "/Owner's-Pic/group-photo-galta-ji-monkey-temple-jaipur.webp",
    alt:  'Group at Galtaji Monkey Temple, Jaipur',
    cat:  'Iconic Sites',
  },
  {
    src:  "/Owner's-Pic/travelers-meenakshi-temple-gopuram-madurai.webp",
    alt:  'Travellers at Meenakshi Temple, Madurai',
    cat:  'Iconic Sites',
  },
  {
    src:  "/Owner's-Pic/travelers-on-fort-rampart-wall-blue-sky.webp",
    alt:  'Travellers on fort rampart wall',
    cat:  'Iconic Sites',
  },

  /* ── Golden Temple ── */
  {
    src:  "/Owner's-Pic/group-golden-temple-amritsar-orange-headscarves.webp",
    alt:  'Group at the Golden Temple, Amritsar',
    cat:  'Golden Temple',
  },
  {
    src:  "/Owner's-Pic/group-golden-temple-amritsar-orange-headscarves-close.webp",
    alt:  'Close-up at the Golden Temple, Amritsar',
    cat:  'Golden Temple',
  },
  {
    src:  "/Owner's-Pic/selfie-golden-temple-amritsar-sarovar.webp",
    alt:  'Selfie at the Golden Temple Sarovar, Amritsar',
    cat:  'Golden Temple',
  },

  /* ── Luxury welcome & hotels ── */
  {
    src:  "/Owner's-Pic/couple-hotel-doorman-rajasthani-turban-welcome.webp",
    alt:  'Traditional Rajasthani welcome at the hotel',
    cat:  'Luxury Welcome',
  },
  {
    src:  "/Owner's-Pic/couple-hotel-lobby-marigold-garland-welcome.webp",
    alt:  'Marigold garland welcome in hotel lobby',
    cat:  'Luxury Welcome',
  },
  {
    src:  "/Owner's-Pic/couple-marigold-garlands-golden-carved-arch-hotel-wide.webp",
    alt:  'Marigold garlands at a golden carved arch hotel',
    cat:  'Luxury Welcome',
  },
  {
    src:  "/Owner's-Pic/couple-marigold-garlands-golden-carved-arch-hotel.webp",
    alt:  'Couple with marigold garlands at heritage hotel',
    cat:  'Luxury Welcome',
  },
  {
    src:  "/Owner's-Pic/group-welcome-traditional-musicians-palace-entrance.webp",
    alt:  'Traditional musicians welcoming guests at palace entrance',
    cat:  'Luxury Welcome',
  },
  {
    src:  "/Owner's-Pic/travelers-hotel-doormen-red-turbans-colorful-scarves.webp",
    alt:  'Hotel doormen in red turbans welcoming travellers',
    cat:  'Luxury Welcome',
  },
  {
    src:  "/Owner's-Pic/group-flower-garlands-airport-arrival.webp",
    alt:  'Flower garland welcome on airport arrival',
    cat:  'Luxury Welcome',
  },
  {
    src:  "/Owner's-Pic/travelers-flower-garlands-airport-welcome.webp",
    alt:  'Travellers with flower garlands — airport welcome',
    cat:  'Luxury Welcome',
  },
  {
    src:  "/Owner's-Pic/travelers-flower-garlands-tempo-traveller-welcome.webp",
    alt:  'Flower garlands at the Tempo Traveller',
    cat:  'Luxury Welcome',
  },
  {
    src:  "/Owner's-Pic/travelers-namaste-yellow-doorway-carved-wooden-door.webp",
    alt:  'Namaste greeting at carved wooden doorway',
    cat:  'Luxury Welcome',
  },

  /* ── Dining & group experiences ── */
  {
    src:  "/Owner's-Pic/couple-lunch-jaipur-pavilion-itc-rajputana-jaipur.webp",
    alt:  'Lunch at the Jaipur Pavilion, ITC Rajputana',
    cat:  'Dining & Experiences',
  },
  {
    src:  "/Owner's-Pic/group-dinner-evening-gathering-indoors.webp",
    alt:  'Group dinner — evening gathering',
    cat:  'Dining & Experiences',
  },
  {
    src:  "/Owner's-Pic/group-photo-luxury-hotel-lobby-orange-lilies.webp",
    alt:  'Group in luxury hotel lobby with orange lilies',
    cat:  'Dining & Experiences',
  },
  {
    src:  "/Owner's-Pic/group-photo-hotel-lobby-chandeliers.webp",
    alt:  'Group in hotel lobby with chandeliers',
    cat:  'Dining & Experiences',
  },
  {
    src:  "/Owner's-Pic/three-people-blue-painted-interior-candlelit-table.webp",
    alt:  'Dinner at candlelit table in a blue-painted interior',
    cat:  'Dining & Experiences',
  },

  /* ── Safari & desert ── */
  {
    src:  "/Owner's-Pic/group-sand-dunes-sunset-jaisalmer.webp",
    alt:  'Group on sand dunes at sunset, Jaisalmer',
    cat:  'Safari & Desert',
  },
  {
    src:  "/Owner's-Pic/elephant-ride-amber-fort-jaipur.webp",
    alt:  'Elephant ride at Amber Fort, Jaipur',
    cat:  'Safari & Desert',
  },
  {
    src:  "/Owner's-Pic/couple-painted-elephants-amber-fort-jaipur.webp",
    alt:  'Painted elephants at Amber Fort, Jaipur',
    cat:  'Safari & Desert',
  },
  {
    src:  "/Owner's-Pic/travelers-jungle-safari-jeep-winter-morning.webp",
    alt:  'Jungle safari Jeep on a winter morning',
    cat:  'Safari & Desert',
  },

  /* ── International trips ── */
  {
    src:  "/Owner's-Pic/travelers-helicopter-manang-air-kathmandu-nepal.webp",
    alt:  'Travellers with Manang Air helicopter, Kathmandu, Nepal',
    cat:  'International',
  },
  {
    src:  "/Owner's-Pic/man-portrait-tropical-garden-red-ginger-flowers.webp",
    alt:  'Om in a tropical garden with red ginger flowers',
    cat:  'International',
  },
  {
    src:  "/Owner's-Pic/man-portrait-tropical-hot-springs-waterfall.webp",
    alt:  'Om at tropical hot springs waterfall',
    cat:  'International',
  },
  {
    src:  "/Owner's-Pic/man-standing-teatro-nacional-san-jose-costa-rica.webp",
    alt:  'Om at the Teatro Nacional, San José, Costa Rica',
    cat:  'International',
  },
  {
    src:  "/Owner's-Pic/group-photo-rajasthani-turbans-evening-archway-ganesh.webp",
    alt:  'Group in Rajasthani turbans at Ganesh archway',
    cat:  'International',
  },

  /* ── With clients ── */
  {
    src:  "/Owner's-Pic/selfie-three-people-garden-red-flowers.webp",
    alt:  'Selfie in a garden with red flowers',
    cat:  'With Clients',
  },
  {
    src:  "/Owner's-Pic/three-people-hotel-lobby-bookshelf-marble-floor.webp",
    alt:  'Three people in hotel lobby with bookshelf and marble floor',
    cat:  'With Clients',
  },
  {
    src:  "/Owner's-Pic/three-people-modern-hotel-lobby-marble-floor.webp",
    alt:  'Three people in modern hotel lobby',
    cat:  'With Clients',
  },
  {
    src:  "/Owner's-Pic/three-women-holding-painted-camel-figurine.webp",
    alt:  'Three women holding a painted camel figurine',
    cat:  'With Clients',
  },
  {
    src:  "/Owner's-Pic/three-women-palace-hotel-courtyard-pillars.webp",
    alt:  'Three women in palace hotel courtyard',
    cat:  'With Clients',
  },
  {
    src:  "/Owner's-Pic/two-people-hotel-lobby-patterned-dress.webp",
    alt:  'Two people in hotel lobby',
    cat:  'With Clients',
  },
  {
    src:  "/Owner's-Pic/two-people-hotel-lobby-red-flower-arrangement.webp",
    alt:  'Two people in hotel lobby with red flower arrangement',
    cat:  'With Clients',
  },
  {
    src:  "/Owner's-Pic/two-people-hotel-lobby-red-flower-arrangement-2.webp",
    alt:  'Two people in hotel lobby with floral arrangement',
    cat:  'With Clients',
  },
  {
    src:  "/Owner's-Pic/two-people-modern-hotel-lobby-marble-floor.webp",
    alt:  'Two people in modern hotel lobby with marble floor',
    cat:  'With Clients',
  },
  {
    src:  "/Owner's-Pic/travelers-airport-terminal-group-photo.webp",
    alt:  'Group photo at airport terminal',
    cat:  'With Clients',
  },
  {
    src:  "/Owner's-Pic/travelers-airport-terminal-group-photo-close.webp",
    alt:  'Close-up group photo at airport terminal',
    cat:  'With Clients',
  },
  {
    src:  "/Owner's-Pic/travelers-flower-garlands-inside-temple-rajasthan.webp",
    alt:  'Travellers with flower garlands inside temple, Rajasthan',
    cat:  'With Clients',
  },
  {
    src:  "/Owner's-Pic/travelers-palace-hotel-lobby-tiger-statue-colorful-scarves.webp",
    alt:  'Travellers in palace hotel lobby with tiger statue',
    cat:  'With Clients',
  },
];

const CATEGORIES = ['All', ...Array.from(new Set(GALLERY.map(g => g.cat)))];

const CAT_LABELS_ES = {
  'All':                 'Todo',
  'Iconic Sites':        'Sitios Icónicos',
  'Golden Temple':       'Templo Dorado',
  'Luxury Welcome':      'Bienvenida de Lujo',
  'Dining & Experiences':'Gastronomía',
  'Safari & Desert':     'Safari y Desierto',
  'International':       'Internacional',
  'With Clients':        'Con Clientes',
};

/* ── Lightbox ────────────────────────────────────────────────────── */
function Lightbox({ images, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);

  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  // Keyboard nav
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line react-hooks/rules-of-hooks — handled via useEffect below
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gallery lightbox"
      style={{
        position:             'fixed',
        inset:                0,
        zIndex:               200,
        backgroundColor:      'rgba(10,12,30,0.96)',
        display:              'flex',
        alignItems:           'center',
        justifyContent:       'center',
        backdropFilter:       'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
      onClick={onClose}
    >
      {/* image wrapper — stop propagation so clicks on image don't close */}
      <div
        style={{ position: 'relative', maxWidth: 'min(92vw, 1100px)', width: '100%', maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden' }}>
          <Image
            src={images[idx].src}
            alt={images[idx].alt}
            fill
            className="object-contain"
            sizes="92vw"
          />
        </div>

        {/* caption */}
        <p style={{
          marginTop: '12px', textAlign: 'center',
          fontFamily: 'var(--font-body, system-ui)',
          fontSize: '12px', color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.08em',
        }}>
          {images[idx].alt}
        </p>

        {/* counter */}
        <p style={{
          position: 'absolute', top: '-32px', right: 0,
          fontFamily: 'var(--font-body, system-ui)',
          fontSize: '11px', color: 'rgba(255,255,255,0.35)',
        }}>
          {idx + 1} / {images.length}
        </p>
      </div>

      {/* prev / next */}
      <button
        onClick={e => { e.stopPropagation(); prev(); }}
        aria-label="Previous image"
        style={{
          position: 'fixed', left: '16px', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%', width: '44px', height: '44px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff',
        }}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={e => { e.stopPropagation(); next(); }}
        aria-label="Next image"
        style={{
          position: 'fixed', right: '16px', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%', width: '44px', height: '44px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff',
        }}
      >
        <ChevronRight size={20} />
      </button>

      {/* close */}
      <button
        onClick={onClose}
        aria-label="Close gallery"
        style={{
          position: 'fixed', top: '20px', right: '20px',
          background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%', width: '40px', height: '40px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff',
        }}
      >
        <X size={18} />
      </button>
    </div>
  );
}

/* ── Main gallery ────────────────────────────────────────────────── */
export default function AboutGallery() {
  const { lang } = useLang();
  const [activeCat,     setActiveCat]     = useState('All');
  const [lightboxIdx,   setLightboxIdx]   = useState(null);

  const es = lang === 'es';

  const filtered = activeCat === 'All'
    ? GALLERY
    : GALLERY.filter(g => g.cat === activeCat);

  const catLabel = (c) => es ? (CAT_LABELS_ES[c] ?? c) : c;

  const heading  = es ? 'Galería de Recuerdos' : 'Gallery of Memories';
  const eyebrow  = es ? 'Nuestros Clientes'    : 'Our Clients';
  const subtext  = es
    ? 'Momentos reales con viajeros reales — cada imagen cuenta una historia de conexión, cultura y maravilla compartida.'
    : 'Real moments with real travellers — every image tells a story of connection, culture, and shared wonder.';

  return (
    <section
      id="gallery"
      style={{
        backgroundColor: 'var(--color-bg)',
        paddingTop:    'clamp(48px, 7vw, 96px)',
        paddingBottom: 'clamp(48px, 7vw, 96px)',
      }}
    >
      <div className="container-luxury">

        {/* header */}
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="section-title mb-4">{heading}</h2>
          <div className="divider-gold mx-auto mb-5" style={{ maxWidth: '60px' }} />
          <p className="font-sans font-light mx-auto"
            style={{ maxWidth: '560px', color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            {subtext}
          </p>
        </div>

        {/* category filter pills */}
        <div
          style={{
            display:        'flex',
            flexWrap:       'wrap',
            gap:            '8px',
            justifyContent: 'center',
            marginBottom:   '32px',
          }}
          role="group"
          aria-label={es ? 'Filtrar por categoría' : 'Filter by category'}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              aria-pressed={activeCat === cat}
              style={{
                fontFamily:      'var(--font-body, system-ui)',
                fontSize:        '10px',
                fontWeight:      500,
                letterSpacing:   '0.14em',
                textTransform:   'uppercase',
                padding:         '7px 16px',
                borderRadius:    'var(--radius-pill)',
                border:          `1.5px solid ${activeCat === cat ? 'var(--color-primary)' : 'var(--color-border)'}`,
                backgroundColor: activeCat === cat ? 'var(--color-primary)' : 'transparent',
                color:           activeCat === cat ? '#fff' : 'var(--color-text-muted)',
                cursor:          'pointer',
                transition:      'all 180ms ease',
              }}
            >
              {catLabel(cat)}
            </button>
          ))}
        </div>

        {/* masonry-style grid */}
        <div
          style={{
            columnCount: 'auto',
            columnWidth: 'min(260px, 100%)',
            columnGap:   '10px',
          }}
        >
          {filtered.map((img, i) => (
            <div
              key={img.src}
              onClick={() => setLightboxIdx(i)}
              style={{
                breakInside:   'avoid',
                marginBottom:  '10px',
                cursor:        'pointer',
                borderRadius:  'var(--radius-card)',
                overflow:      'hidden',
                position:      'relative',
                display:       'block',
              }}
            >
              <div
                style={{
                  position:   'relative',
                  /* vary aspect by position to give natural masonry feel */
                  aspectRatio: (i % 5 === 0) ? '3/4' : (i % 3 === 0) ? '1/1' : '4/3',
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                />
                {/* hover overlay */}
                <div
                  style={{
                    position:         'absolute',
                    inset:            0,
                    backgroundColor:  'rgba(20,34,77,0)',
                    transition:       'background-color 250ms ease',
                    display:          'flex',
                    alignItems:       'flex-end',
                    padding:          '12px',
                  }}
                  className="gallery-hover-overlay"
                >
                  <span
                    style={{
                      fontFamily:  'var(--font-body, system-ui)',
                      fontSize:    '9px',
                      color:       'rgba(255,255,255,0)',
                      letterSpacing: '0.1em',
                      transition:  'color 250ms ease',
                    }}
                    className="gallery-hover-label"
                  >
                    {catLabel(img.cat)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* count */}
        <p style={{
          textAlign:  'center',
          marginTop:  '24px',
          fontFamily: 'var(--font-body, system-ui)',
          fontSize:   '11px',
          color:      'var(--color-text-muted)',
          letterSpacing: '0.1em',
        }}>
          {es
            ? `${filtered.length} momentos de ${GALLERY.length} en total`
            : `${filtered.length} of ${GALLERY.length} moments`}
        </p>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={filtered}
          startIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}

      {/* hover CSS */}
      <style>{`
        .gallery-hover-overlay:hover {
          background-color: rgba(20,34,77,0.45) !important;
        }
        .gallery-hover-overlay:hover .gallery-hover-label {
          color: rgba(255,255,255,0.80) !important;
        }
      `}</style>
    </section>
  );
}
