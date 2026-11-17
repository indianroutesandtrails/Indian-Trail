'use client';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

/* ─────────────────────────────────────────────────────────────────
   GALLERY DATA — 48 images, 7 categories
   India place names are intentionally NOT translated.
───────────────────────────────────────────────────────────────── */
const GALLERY = [
  { src: "/Owner's-Pic/group-photo-taj-mahal-agra.webp",                            alt: 'Group at the Taj Mahal, Agra',                              cat: 'Iconic Sites'       },
  { src: "/Owner's-Pic/group-photo-taj-mahal-great-gate-agra.webp",                 alt: 'Group at the Great Gate, Taj Mahal, Agra',                  cat: 'Iconic Sites'       },
  { src: "/Owner's-Pic/group-photo-scalloped-arch-amber-fort-jaipur.webp",          alt: 'Group at Amber Fort, Jaipur',                               cat: 'Iconic Sites'       },
  { src: "/Owner's-Pic/couple-ganesh-pol-amber-fort-jaipur.webp",                   alt: 'Couple at Ganesh Pol, Amber Fort, Jaipur',                  cat: 'Iconic Sites'       },
  { src: "/Owner's-Pic/group-photo-jaswant-thada-jodhpur.webp",                     alt: 'Group at Jaswant Thada, Jodhpur',                           cat: 'Iconic Sites'       },
  { src: "/Owner's-Pic/group-photo-galta-ji-monkey-temple-jaipur.webp",             alt: 'Group at Galtaji Monkey Temple, Jaipur',                    cat: 'Iconic Sites'       },
  { src: "/Owner's-Pic/travelers-meenakshi-temple-gopuram-madurai.webp",             alt: 'Travellers at Meenakshi Temple, Madurai',                   cat: 'Iconic Sites'       },
  { src: "/Owner's-Pic/travelers-on-fort-rampart-wall-blue-sky.webp",               alt: 'Travellers on fort rampart, blue sky',                      cat: 'Iconic Sites'       },
  { src: "/Owner's-Pic/group-golden-temple-amritsar-orange-headscarves.webp",        alt: 'Group at the Golden Temple, Amritsar',                      cat: 'Golden Temple'      },
  { src: "/Owner's-Pic/group-golden-temple-amritsar-orange-headscarves-close.webp",  alt: 'Close-up at the Golden Temple, Amritsar',                   cat: 'Golden Temple'      },
  { src: "/Owner's-Pic/selfie-golden-temple-amritsar-sarovar.webp",                 alt: 'Selfie at the Golden Temple Sarovar, Amritsar',              cat: 'Golden Temple'      },
  { src: "/Owner's-Pic/couple-hotel-doorman-rajasthani-turban-welcome.webp",        alt: 'Rajasthani welcome at the hotel',                           cat: 'Luxury Welcome'     },
  { src: "/Owner's-Pic/couple-hotel-lobby-marigold-garland-welcome.webp",           alt: 'Marigold garland welcome in hotel lobby',                   cat: 'Luxury Welcome'     },
  { src: "/Owner's-Pic/couple-marigold-garlands-golden-carved-arch-hotel-wide.webp",alt: 'Marigold garlands at a golden carved arch hotel',           cat: 'Luxury Welcome'     },
  { src: "/Owner's-Pic/couple-marigold-garlands-golden-carved-arch-hotel.webp",     alt: 'Couple with marigold garlands at heritage hotel',           cat: 'Luxury Welcome'     },
  { src: "/Owner's-Pic/group-welcome-traditional-musicians-palace-entrance.webp",   alt: 'Traditional musicians at palace entrance',                  cat: 'Luxury Welcome'     },
  { src: "/Owner's-Pic/travelers-hotel-doormen-red-turbans-colorful-scarves.webp",  alt: 'Hotel doormen in red turbans',                              cat: 'Luxury Welcome'     },
  { src: "/Owner's-Pic/group-flower-garlands-airport-arrival.webp",                 alt: 'Flower garland welcome — airport arrival',                  cat: 'Luxury Welcome'     },
  { src: "/Owner's-Pic/travelers-flower-garlands-airport-welcome.webp",             alt: 'Travellers with flower garlands at airport',                cat: 'Luxury Welcome'     },
  { src: "/Owner's-Pic/travelers-flower-garlands-tempo-traveller-welcome.webp",     alt: 'Flower garlands at the Tempo Traveller',                    cat: 'Luxury Welcome'     },
  { src: "/Owner's-Pic/travelers-namaste-yellow-doorway-carved-wooden-door.webp",   alt: 'Namaste greeting at carved wooden doorway',                 cat: 'Luxury Welcome'     },
  { src: "/Owner's-Pic/couple-lunch-jaipur-pavilion-itc-rajputana-jaipur.webp",     alt: 'Lunch at the Jaipur Pavilion, ITC Rajputana',               cat: 'Dining'             },
  { src: "/Owner's-Pic/group-dinner-evening-gathering-indoors.webp",                alt: 'Group dinner — evening gathering',                          cat: 'Dining'             },
  { src: "/Owner's-Pic/group-photo-luxury-hotel-lobby-orange-lilies.webp",          alt: 'Group in luxury hotel lobby with orange lilies',            cat: 'Dining'             },
  { src: "/Owner's-Pic/group-photo-hotel-lobby-chandeliers.webp",                   alt: 'Group in hotel lobby with chandeliers',                     cat: 'Dining'             },
  { src: "/Owner's-Pic/three-people-blue-painted-interior-candlelit-table.webp",    alt: 'Dinner at a candlelit table, blue-painted interior',        cat: 'Dining'             },
  { src: "/Owner's-Pic/group-sand-dunes-sunset-jaisalmer.webp",                     alt: 'Group on sand dunes at sunset, Jaisalmer',                  cat: 'Safari & Desert'    },
  { src: "/Owner's-Pic/elephant-ride-amber-fort-jaipur.webp",                       alt: 'Elephant at Amber Fort, Jaipur',                            cat: 'Safari & Desert'    },
  { src: "/Owner's-Pic/couple-painted-elephants-amber-fort-jaipur.webp",            alt: 'Painted elephants at Amber Fort, Jaipur',                   cat: 'Safari & Desert'    },
  { src: "/Owner's-Pic/travelers-jungle-safari-jeep-winter-morning.webp",           alt: 'Jungle safari Jeep on a winter morning',                    cat: 'Safari & Desert'    },
  { src: "/Owner's-Pic/travelers-helicopter-manang-air-kathmandu-nepal.webp",       alt: 'Helicopter at Kathmandu, Nepal',                            cat: 'International'      },
  { src: "/Owner's-Pic/man-portrait-tropical-garden-red-ginger-flowers.webp",       alt: 'Om in a tropical garden with red ginger flowers',           cat: 'International'      },
  { src: "/Owner's-Pic/man-portrait-tropical-hot-springs-waterfall.webp",           alt: 'Om at tropical hot springs waterfall',                      cat: 'International'      },
  { src: "/Owner's-Pic/man-standing-teatro-nacional-san-jose-costa-rica.webp",      alt: 'Om at Teatro Nacional, San José, Costa Rica',               cat: 'International'      },
  { src: "/Owner's-Pic/group-photo-rajasthani-turbans-evening-archway-ganesh.webp", alt: 'Group in Rajasthani turbans at Ganesh archway',             cat: 'International'      },
  { src: "/Owner's-Pic/selfie-three-people-garden-red-flowers.webp",               alt: 'Selfie in a garden with red flowers',                       cat: 'With Clients'       },
  { src: "/Owner's-Pic/three-people-hotel-lobby-bookshelf-marble-floor.webp",       alt: 'Three people in hotel lobby — bookshelf & marble',          cat: 'With Clients'       },
  { src: "/Owner's-Pic/three-people-modern-hotel-lobby-marble-floor.webp",          alt: 'Three people in modern hotel lobby',                        cat: 'With Clients'       },
  { src: "/Owner's-Pic/three-women-holding-painted-camel-figurine.webp",            alt: 'Three women with a painted camel figurine',                 cat: 'With Clients'       },
  { src: "/Owner's-Pic/three-women-palace-hotel-courtyard-pillars.webp",            alt: 'Three women in palace hotel courtyard',                     cat: 'With Clients'       },
  { src: "/Owner's-Pic/two-people-hotel-lobby-patterned-dress.webp",                alt: 'Two people in hotel lobby',                                 cat: 'With Clients'       },
  { src: "/Owner's-Pic/two-people-hotel-lobby-red-flower-arrangement.webp",         alt: 'Two people — red flower arrangement, hotel lobby',          cat: 'With Clients'       },
  { src: "/Owner's-Pic/two-people-hotel-lobby-red-flower-arrangement-2.webp",       alt: 'Two people in hotel lobby with floral arrangement',         cat: 'With Clients'       },
  { src: "/Owner's-Pic/two-people-modern-hotel-lobby-marble-floor.webp",            alt: 'Two people in modern hotel lobby, marble floor',            cat: 'With Clients'       },
  { src: "/Owner's-Pic/travelers-airport-terminal-group-photo.webp",                alt: 'Group photo at airport terminal',                           cat: 'With Clients'       },
  { src: "/Owner's-Pic/travelers-airport-terminal-group-photo-close.webp",          alt: 'Close-up group photo at airport terminal',                  cat: 'With Clients'       },
  { src: "/Owner's-Pic/travelers-flower-garlands-inside-temple-rajasthan.webp",     alt: 'Travellers with flower garlands inside temple, Rajasthan',  cat: 'With Clients'       },
  { src: "/Owner's-Pic/travelers-palace-hotel-lobby-tiger-statue-colorful-scarves.webp", alt: 'Travellers in palace hotel lobby with tiger statue',   cat: 'With Clients'       },
];

const CATEGORIES = ['All', ...Array.from(new Set(GALLERY.map(g => g.cat)))];

const CAT_LABELS_ES = {
  'All':              'Todo',
  'Iconic Sites':     'Sitios Icónicos',
  'Golden Temple':    'Templo Dorado',
  'Luxury Welcome':   'Bienvenida de Lujo',
  'Dining':           'Gastronomía',
  'Safari & Desert':  'Safari y Desierto',
  'International':    'Internacional',
  'With Clients':     'Con Clientes',
};

/* ─────────────────────────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────────────────────────── */
function Lightbox({ images, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);

  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, onClose]);

  /* lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gallery lightbox"
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        backgroundColor: 'rgba(8, 10, 24, 0.97)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        padding: '20px',
      }}
      onClick={onClose}
    >
      {/* centre panel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 'min(88vw, 1000px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* counter */}
        <p style={{
          fontFamily: 'var(--font-body, system-ui)',
          fontSize: '11px', letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.30)',
          alignSelf: 'flex-end',
        }}>
          {idx + 1} / {images.length}
        </p>

        {/* image — fixed 4:3 aspect ratio, never overflows */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4/3',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.70)',
          }}
        >
          <Image
            src={images[idx].src}
            alt={images[idx].alt}
            fill
            className="object-contain"
            sizes="88vw"
            priority
          />
        </div>

        {/* caption */}
        <p style={{
          fontFamily: 'var(--font-body, system-ui)',
          fontSize: '12px', color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.08em', textAlign: 'center',
          margin: 0,
        }}>
          {images[idx].alt}
        </p>
      </div>

      {/* prev */}
      <button
        onClick={e => { e.stopPropagation(); prev(); }}
        aria-label="Previous"
        style={{
          position: 'fixed', left: '16px', top: '50%', transform: 'translateY(-50%)',
          width: '44px', height: '44px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.14)',
          cursor: 'pointer', color: '#fff',
          transition: 'background 150ms ease',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
      >
        <ChevronLeft size={20} />
      </button>

      {/* next */}
      <button
        onClick={e => { e.stopPropagation(); next(); }}
        aria-label="Next"
        style={{
          position: 'fixed', right: '16px', top: '50%', transform: 'translateY(-50%)',
          width: '44px', height: '44px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.14)',
          cursor: 'pointer', color: '#fff',
          transition: 'background 150ms ease',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
      >
        <ChevronRight size={20} />
      </button>

      {/* close */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'fixed', top: '20px', right: '20px',
          width: '40px', height: '40px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.14)',
          cursor: 'pointer', color: '#fff',
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   GRID CARD — fixed 4:3 aspect, hover reveals expand icon + caption
───────────────────────────────────────────────────────────────── */
function GridCard({ img, globalIdx, onClick }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View: ${img.alt}`}
      onClick={() => onClick(globalIdx)}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick(globalIdx)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:     'relative',
        aspectRatio:  '4/3',          /* every card the same ratio — no layout surprises */
        borderRadius: 'var(--radius-card)',
        overflow:     'hidden',
        cursor:       'pointer',
        display:      'block',
        outline:      'none',
        /* lift card on hover */
        transform:    hov ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow:    hov
          ? '0 12px 32px rgba(20,34,77,0.22)'
          : '0 2px 8px rgba(20,34,77,0.08)',
        transition:   'transform 240ms ease, box-shadow 240ms ease',
      }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        className="object-cover"
        style={{
          transform:  hov ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 500ms cubic-bezier(0.4,0,0.2,1)',
        }}
        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
      />

      {/* hover overlay */}
      <div
        style={{
          position:        'absolute',
          inset:           0,
          background:      hov
            ? 'linear-gradient(to top, rgba(20,34,77,0.72) 0%, rgba(20,34,77,0.10) 60%, transparent 100%)'
            : 'transparent',
          transition:      'background 240ms ease',
          display:         'flex',
          flexDirection:   'column',
          justifyContent:  'flex-end',
          padding:         '14px',
          gap:             '4px',
        }}
      >
        {/* expand icon — top right */}
        <div
          style={{
            position:        'absolute',
            top:             '10px',
            right:           '10px',
            width:           '30px',
            height:          '30px',
            borderRadius:    '50%',
            backgroundColor: 'rgba(255,255,255,0.18)',
            backdropFilter:  'blur(4px)',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            opacity:         hov ? 1 : 0,
            transform:       hov ? 'scale(1)' : 'scale(0.75)',
            transition:      'opacity 220ms ease, transform 220ms ease',
          }}
        >
          <Expand size={13} color="#fff" />
        </div>

        {/* caption bottom */}
        <p
          style={{
            fontFamily:   'var(--font-body, system-ui)',
            fontSize:     '10px',
            fontWeight:   500,
            letterSpacing:'0.10em',
            textTransform:'uppercase',
            color:        '#FBF7EF',
            margin:       0,
            lineHeight:   1.3,
            opacity:      hov ? 1 : 0,
            transform:    hov ? 'translateY(0)' : 'translateY(6px)',
            transition:   'opacity 240ms ease, transform 240ms ease',
          }}
        >
          {img.alt}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FEATURED HERO CLUSTER
   Renders the first 5 images in an editorial layout:

   Desktop (≥768px):
   ┌────────────┬────────┬────────┐
   │            │  [1]   │  [2]   │
   │   [0]      │ (4:3)  │ (4:3)  │
   │  (tall,    ├────────┼────────┤
   │   2:3)     │  [3]   │  [4]   │
   │            │ (4:3)  │ (4:3)  │
   └────────────┴────────┴────────┘

   Mobile: simple 2-col grid, all 4:3
───────────────────────────────────────────────────────────────── */
function FeaturedCluster({ images, onOpen }) {
  const [hov0, setHov0] = useState(false);

  if (images.length < 5) {
    // fallback to simple grid if fewer than 5
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '8px' }}>
        {images.map((img, i) => (
          <GridCard key={img.src} img={img} globalIdx={i} onClick={onOpen} />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Desktop cluster */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows:    'auto auto',
          gap:                 '8px',
          marginBottom:        '8px',
        }}
      >
        {/* [0] — tall featured, spans 2 rows */}
        <div
          role="button"
          tabIndex={0}
          aria-label={`View: ${images[0].alt}`}
          onClick={() => onOpen(0)}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onOpen(0)}
          onMouseEnter={() => setHov0(true)}
          onMouseLeave={() => setHov0(false)}
          style={{
            gridColumn:   '1 / 2',
            gridRow:      '1 / 3',
            position:     'relative',
            borderRadius: 'var(--radius-card)',
            overflow:     'hidden',
            cursor:       'pointer',
            outline:      'none',
            /* 2:3 portrait — taller than the 4:3 pairs beside it */
            aspectRatio:  '2/3',
            transform:    hov0 ? 'translateY(-3px)' : 'translateY(0)',
            boxShadow:    hov0
              ? '0 12px 32px rgba(20,34,77,0.22)'
              : '0 2px 8px rgba(20,34,77,0.08)',
            transition:   'transform 240ms ease, box-shadow 240ms ease',
          }}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-cover"
            style={{
              transform:  hov0 ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 500ms cubic-bezier(0.4,0,0.2,1)',
            }}
            sizes="(max-width:1200px) 33vw, 400px"
            priority
          />
          {/* featured badge */}
          <div
            style={{
              position:        'absolute',
              top:             '14px',
              left:            '14px',
              padding:         '4px 10px',
              backgroundColor: 'var(--color-secondary)',
              borderRadius:    '4px',
              fontFamily:      'var(--font-body, system-ui)',
              fontSize:        '8px',
              fontWeight:      700,
              letterSpacing:   '0.18em',
              textTransform:   'uppercase',
              color:           'var(--color-text-on-gold)',
            }}
          >
            Featured
          </div>
          {/* hover overlay */}
          <div
            style={{
              position:   'absolute', inset: 0,
              background: hov0
                ? 'linear-gradient(to top, rgba(20,34,77,0.65) 0%, transparent 50%)'
                : 'transparent',
              transition: 'background 240ms ease',
              display:    'flex', flexDirection: 'column',
              justifyContent: 'flex-end', padding: '16px',
            }}
          >
            <div
              style={{
                width:  '30px', height: '30px', borderRadius: '50%',
                position:        'absolute', top: '14px', right: '14px',
                backgroundColor: 'rgba(255,255,255,0.18)',
                backdropFilter:  'blur(4px)',
                display:         'flex', alignItems: 'center', justifyContent: 'center',
                opacity:         hov0 ? 1 : 0,
                transition:      'opacity 220ms ease',
              }}
            >
              <Expand size={13} color="#fff" />
            </div>
            <p style={{
              fontFamily: 'var(--font-body, system-ui)', fontSize: '10px',
              fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase',
              color: '#FBF7EF', margin: 0,
              opacity: hov0 ? 1 : 0,
              transform: hov0 ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 240ms ease, transform 240ms ease',
            }}>
              {images[0].alt}
            </p>
          </div>
        </div>

        {/* [1]–[4] — 4 supporting cards at 4:3 */}
        {images.slice(1, 5).map((img, i) => (
          <GridCard key={img.src} img={img} globalIdx={i + 1} onClick={onOpen} />
        ))}
      </div>

      {/* Mobile cluster — 2-col uniform grid */}
      <div
        className="md:hidden"
        style={{
          display:               'grid',
          gridTemplateColumns:   'repeat(2, 1fr)',
          gap:                   '8px',
          marginBottom:          '8px',
        }}
      >
        {images.map((img, i) => (
          <GridCard key={img.src} img={img} globalIdx={i} onClick={onOpen} />
        ))}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function AboutGallery() {
  const { lang } = useLang();
  const [activeCat,   setActiveCat]   = useState('All');
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const es = lang === 'es';

  const filtered = activeCat === 'All'
    ? GALLERY
    : GALLERY.filter(g => g.cat === activeCat);

  const catLabel = (c) => es ? (CAT_LABELS_ES[c] ?? c) : c;

  const heading = es ? 'Galería de Recuerdos'  : 'Gallery of Memories';
  const eyebrow = es ? 'Nuestros Clientes'     : 'Our Clients';
  const subtext = es
    ? 'Momentos reales con viajeros reales — cada imagen cuenta una historia de conexión, cultura y maravilla.'
    : 'Real moments with real travellers — every image tells a story of connection, culture, and shared wonder.';

  return (
    <section
      id="gallery"
      style={{
        backgroundColor: 'var(--color-surface-alt)',
        paddingTop:      'clamp(56px, 7vw, 100px)',
        paddingBottom:   'clamp(56px, 7vw, 100px)',
      }}
    >
      <div className="container-luxury">

        {/* ── Header ───────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="section-title mb-4">{heading}</h2>
          <div className="divider-gold mx-auto mb-5" style={{ maxWidth: '56px' }} />
          <p
            className="font-sans font-light mx-auto"
            style={{
              maxWidth:  '520px',
              color:     'var(--color-text-muted)',
              fontSize:  '0.88rem',
              lineHeight: 1.75,
            }}
          >
            {subtext}
          </p>
        </div>

        {/* ── Category filter ───────────────────────────────────── */}
        <div
          role="group"
          aria-label={es ? 'Filtrar por categoría' : 'Filter by category'}
          style={{
            display:        'flex',
            flexWrap:       'wrap',
            gap:            '8px',
            justifyContent: 'center',
            marginBottom:   '40px',
          }}
        >
          {CATEGORIES.map(cat => {
            const active = activeCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                aria-pressed={active}
                style={{
                  fontFamily:      'var(--font-body, system-ui)',
                  fontSize:        '10px',
                  fontWeight:      500,
                  letterSpacing:   '0.14em',
                  textTransform:   'uppercase',
                  padding:         '7px 16px',
                  borderRadius:    'var(--radius-pill)',
                  border:          `1.5px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  backgroundColor: active ? 'var(--color-primary)' : 'var(--color-surface)',
                  color:           active ? '#fff' : 'var(--color-text-muted)',
                  cursor:          'pointer',
                  transition:      'all 180ms ease',
                  whiteSpace:      'nowrap',
                }}
              >
                {catLabel(cat)}
              </button>
            );
          })}
        </div>

        {/* ── Grid ─────────────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <>
            {/* Featured hero cluster — first 5 images */}
            <FeaturedCluster
              images={filtered.slice(0, 5)}
              onOpen={(i) => setLightboxIdx(i)}
            />

            {/* Remaining images — strict 4-col grid, uniform 4:3 */}
            {filtered.length > 5 && (
              <div
                style={{
                  display:               'grid',
                  gridTemplateColumns:   'repeat(4, 1fr)',
                  gap:                   '8px',
                }}
                className="gallery-uniform-grid"
              >
                {filtered.slice(5).map((img, i) => (
                  <GridCard
                    key={img.src}
                    img={img}
                    globalIdx={i + 5}
                    onClick={(gi) => setLightboxIdx(gi)}
                  />
                ))}
              </div>
            )}

            {/* count */}
            <p
              style={{
                textAlign:     'center',
                marginTop:     '28px',
                fontFamily:    'var(--font-body, system-ui)',
                fontSize:      '11px',
                color:         'var(--color-text-muted)',
                letterSpacing: '0.12em',
              }}
            >
              {es
                ? `${filtered.length} de ${GALLERY.length} momentos`
                : `${filtered.length} of ${GALLERY.length} moments`}
            </p>
          </>
        ) : (
          <p style={{
            textAlign: 'center', padding: '40px 0',
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-body, system-ui)',
            fontSize: '0.9rem',
          }}>
            {es ? 'Sin imágenes en esta categoría.' : 'No images in this category.'}
          </p>
        )}
      </div>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      {lightboxIdx !== null && (
        <Lightbox
          images={filtered}
          startIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}

      {/* Responsive overrides — 2-col on mobile/tablet for the uniform grid */}
      <style>{`
        @media (max-width: 1023px) {
          .gallery-uniform-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 639px) {
          .gallery-uniform-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
