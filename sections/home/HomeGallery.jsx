'use client';
/**
 * HomeGallery — "Real Moments" photo slider
 * ─────────────────────────────────────────────────────────────────
 * Horizontal scroll-snap carousel of guest/client photos.
 * Placed between HomeWhyUs and HomeResponsible on the home page.
 *
 * Responsive layout:
 *   ≥1280px  → 4 cards visible
 *   1024-1279px → 3 cards visible
 *   640-1023px  → 2 cards visible
 *   <640px      → 1.15 cards (edge bleed hints swipe, no arrows)
 *
 * Cards: uniform 4:3 aspect ratio. Hover: image zoom + caption reveals.
 * Arrows: styled outlines, desktop/tablet only.
 * Dots: marigold pill for active position.
 * "View full gallery →" links to /about#gallery.
 */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSnapCarousel } from '@/hooks/useSnapCarousel';
import { useLang } from '@/lib/LanguageContext';

/* ─────────────────────────────────────────────────────────────────
   18-image curated selection — varied moods and locations
───────────────────────────────────────────────────────────────── */
const SLIDES = [
  { src: "/Owner's-Pic/group-photo-taj-mahal-agra.webp",                            caption: 'Taj Mahal, Agra'              },
  { src: "/Owner's-Pic/couple-hotel-lobby-marigold-garland-welcome.webp",           caption: 'Marigold Welcome'              },
  { src: "/Owner's-Pic/group-sand-dunes-sunset-jaisalmer.webp",                     caption: 'Jaisalmer Desert Sunset'       },
  { src: "/Owner's-Pic/group-golden-temple-amritsar-orange-headscarves.webp",        caption: 'Golden Temple, Amritsar'       },
  { src: "/Owner's-Pic/couple-ganesh-pol-amber-fort-jaipur.webp",                   caption: 'Amber Fort, Jaipur'            },
  { src: "/Owner's-Pic/group-welcome-traditional-musicians-palace-entrance.webp",   caption: 'Palace Welcome, Rajasthan'     },
  { src: "/Owner's-Pic/travelers-jungle-safari-jeep-winter-morning.webp",           caption: 'Jungle Safari'                 },
  { src: "/Owner's-Pic/group-dinner-evening-gathering-indoors.webp",                caption: 'Evening Dinner'                },
  { src: "/Owner's-Pic/group-photo-jaswant-thada-jodhpur.webp",                     caption: 'Jaswant Thada, Jodhpur'        },
  { src: "/Owner's-Pic/couple-painted-elephants-amber-fort-jaipur.webp",            caption: 'Painted Elephants, Jaipur'     },
  { src: "/Owner's-Pic/travelers-namaste-yellow-doorway-carved-wooden-door.webp",   caption: 'Traditional Namaste'           },
  { src: "/Owner's-Pic/selfie-golden-temple-amritsar-sarovar.webp",                 caption: 'Golden Temple Sarovar'         },
  { src: "/Owner's-Pic/group-photo-luxury-hotel-lobby-orange-lilies.webp",          caption: 'Luxury Hotel, Rajasthan'       },
  { src: "/Owner's-Pic/travelers-meenakshi-temple-gopuram-madurai.webp",             caption: 'Meenakshi Temple, Madurai'     },
  { src: "/Owner's-Pic/man-standing-teatro-nacional-san-jose-costa-rica.webp",      caption: 'Teatro Nacional, Costa Rica'   },
  { src: "/Owner's-Pic/travelers-flower-garlands-airport-welcome.webp",             caption: 'Airport Welcome'               },
  { src: "/Owner's-Pic/group-photo-scalloped-arch-amber-fort-jaipur.webp",          caption: 'Amber Fort Arch, Jaipur'       },
  { src: "/Owner's-Pic/three-women-palace-hotel-courtyard-pillars.webp",            caption: 'Palace Hotel Courtyard'        },
];

/* ─────────────────────────────────────────────────────────────────
   Responsive perView — SSR safe (defaults 1 → corrects after mount)
───────────────────────────────────────────────────────────────── */
function usePerView() {
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const upd = () => {
      const w = window.innerWidth;
      if      (w >= 1280) setPerView(4);
      else if (w >= 1024) setPerView(3);
      else if (w >= 640)  setPerView(2);
      else                setPerView(1);
    };
    upd();
    window.addEventListener('resize', upd, { passive: true });
    return () => window.removeEventListener('resize', upd);
  }, []);
  return perView;
}

/* ─────────────────────────────────────────────────────────────────
   Arrow button — outline style (matches the section's light bg)
───────────────────────────────────────────────────────────────── */
function ArrowBtn({ onClick, disabled, label, dir }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width:           '44px',
        height:          '44px',
        borderRadius:    '50%',
        border:          `1.5px solid ${disabled
          ? 'var(--color-border)'
          : hov ? 'var(--color-primary)' : 'var(--color-border-strong)'}`,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        cursor:          disabled ? 'default' : 'pointer',
        backgroundColor: hov && !disabled ? 'var(--color-primary)' : 'transparent',
        color:           disabled
          ? 'var(--color-border-strong)'
          : hov ? '#fff' : 'var(--color-primary)',
        opacity:         disabled ? 0.38 : 1,
        transition:      'all 200ms ease',
        flexShrink:      0,
        appearance:      'none',
        padding:         0,
        outline:         'none',
      }}
    >
      {dir === 'left' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Dots — marigold pill for active, muted circles for inactive
───────────────────────────────────────────────────────────────── */
function Dots({ count, active, onDot }) {
  /* More than 10 positions: show numeric counter instead */
  if (count > 10) {
    return (
      <p style={{
        fontFamily: 'var(--font-body, system-ui)', fontSize: '11px',
        letterSpacing: '0.12em', color: 'var(--color-text-muted)',
        textAlign: 'center', marginTop: '20px',
      }}>
        {active + 1} / {count}
      </p>
    );
  }
  return (
    <div
      role="tablist"
      aria-label="Slide position"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '24px' }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={`Slide ${i + 1}`}
          onClick={() => onDot(i)}
          style={{
            width:           i === active ? '22px' : '7px',
            height:          '7px',
            borderRadius:    '999px',
            border:          'none',
            padding:         0,
            margin:          0,
            cursor:          'pointer',
            backgroundColor: i === active ? 'var(--color-secondary)' : 'var(--color-border-strong)',
            transition:      'width 280ms ease, background-color 280ms ease',
            appearance:      'none',
            outline:         'none',
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Slide card — 4:3 fixed ratio, zoom + caption on hover
───────────────────────────────────────────────────────────────── */
function SlideCard({ slide }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      style={{
        position:     'relative',
        aspectRatio:  '4/3',
        borderRadius: 'var(--radius-card)',
        overflow:     'hidden',
        userSelect:   'none',
        transform:    hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow:    hov
          ? '0 16px 40px rgba(20,34,77,0.20)'
          : '0 2px 10px rgba(20,34,77,0.07)',
        transition:   'transform 280ms ease, box-shadow 280ms ease',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <Image
        src={slide.src}
        alt={slide.caption}
        fill
        className="object-cover"
        style={{
          transform:  hov ? 'scale(1.07)' : 'scale(1)',
          transition: 'transform 550ms cubic-bezier(0.4,0,0.2,1)',
        }}
        sizes="(max-width:639px) 85vw, (max-width:1023px) 48vw, (max-width:1279px) 32vw, 24vw"
        draggable={false}
      />

      {/* Gradient — faint vignette always, deepens on hover */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          background:    hov
            ? 'linear-gradient(to top, rgba(20,34,77,0.70) 0%, rgba(20,34,77,0.10) 50%, transparent 100%)'
            : 'linear-gradient(to top, rgba(20,34,77,0.35) 0%, transparent 50%)',
          transition:    'background 280ms ease',
          pointerEvents: 'none',
        }}
      />

      {/* Caption */}
      <p
        style={{
          position:      'absolute',
          bottom:        '14px',
          left:          '14px',
          right:         '14px',
          margin:        0,
          fontFamily:    'var(--font-body, system-ui)',
          fontSize:      '10px',
          fontWeight:    600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color:         '#FBF7EF',
          lineHeight:    1,
          opacity:       hov ? 1 : 0.55,
          transform:     hov ? 'translateY(0)' : 'translateY(5px)',
          transition:    'opacity 260ms ease, transform 260ms ease',
          pointerEvents: 'none',
        }}
      >
        {slide.caption}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────────── */
export default function HomeGallery() {
  const perView = usePerView();
  const { lang } = useLang();

  const GAP  = 12; // px between cards — must match track gap

  const {
    trackRef,
    activeIndex,
    positions,
    goTo,
    prev,
    next,
    canPrev,
    canNext,
  } = useSnapCarousel(SLIDES.length, perView, GAP);

  const isMobile   = perView === 1;
  const showArrows = !isMobile;
  const es         = lang === 'es';

  /* Localised copy */
  const eyebrow  = es ? 'Momentos Reales'  : 'Real Moments';
  const heading1 = es ? 'Fotografías de'   : 'Journeys in';
  const heading2 = es ? 'Nuestros Viajeros': 'Photographs';
  const sub      = es
    ? 'Clientes reales, destinos reales — cada imagen es un recuerdo de India con Om.'
    : 'Real clients, real destinations — every image is a memory of India with Om.';
  const viewAll  = es ? 'Ver galería completa →' : 'View full gallery →';

  return (
    <section
      aria-label="Guest photo gallery"
      style={{
        backgroundColor: 'var(--color-bg)',
        paddingTop:      'clamp(48px, 6vw, 88px)',
        paddingBottom:   'clamp(48px, 6vw, 88px)',
        overflow:        'hidden',
      }}
    >
      <div className="container-luxury">

        {/* ── Header row: title left, arrows right ─────────── */}
        <div
          style={{
            display:        'flex',
            alignItems:     'flex-end',
            justifyContent: 'space-between',
            gap:            '20px',
            marginBottom:   '28px',
            flexWrap:       'wrap',
          }}
        >
          {/* Text */}
          <div>
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h2 className="section-title">
              {heading1}<br />
              <em className="font-light" style={{ color: 'var(--color-primary-light)' }}>
                {heading2}
              </em>
            </h2>
            <p className="body-text mt-3" style={{ maxWidth: '34rem' }}>
              {sub}
            </p>
          </div>

          {/* Arrows — desktop/tablet only, flush right */}
          {showArrows && (
            <div style={{ display: 'flex', gap: '10px', flexShrink: 0, paddingBottom: '4px' }}>
              <ArrowBtn onClick={prev} disabled={!canPrev} label="Previous photos" dir="left"  />
              <ArrowBtn onClick={next} disabled={!canNext} label="Next photos"     dir="right" />
            </div>
          )}
        </div>

        {/* ── Scroll-snap track ────────────────────────────── */}
        {/*
          Mobile: paddingRight creates the 1.15-card bleed effect —
          the next card peeks in from the right edge hinting swipe.
          overflow:visible on the wrapper lets the peeking card
          show without clipping; overflow:hidden on <section> stops
          it from causing horizontal page scroll.
        */}
        <div
          ref={trackRef}
          className="no-scrollbar"
          style={{
            display:                 'flex',
            gap:                     `${GAP}px`,
            overflowX:               'auto',
            scrollSnapType:          'x mandatory',
            WebkitOverflowScrolling: 'touch',
            /* Mobile bleed — peeking next card */
            paddingRight:            isMobile ? '12vw' : '0',
          }}
        >
          {SLIDES.map((slide) => (
            <div
              key={slide.src}
              style={{
                flexShrink:      0,
                scrollSnapAlign: 'start',
                /* Mobile: 88vw so the next card bleeds ~12vw into view */
                width: isMobile
                  ? '88vw'
                  : `calc((100% - ${GAP * (perView - 1)}px) / ${perView})`,
              }}
            >
              <SlideCard slide={slide} />
            </div>
          ))}
        </div>

        {/* ── Dots + CTA link ──────────────────────────────── */}
        <Dots count={positions} active={activeIndex} onDot={goTo} />

        <p style={{
          textAlign:     'center',
          marginTop:     '16px',
          fontFamily:    'var(--font-body, system-ui)',
          fontSize:      '11px',
          letterSpacing: '0.13em',
          textTransform: 'uppercase',
        }}>
          <a
            href="/gallery"
            style={{
              color:               'var(--color-primary)',
              textDecoration:      'underline',
              textUnderlineOffset: '3px',
            }}
          >
            {viewAll}
          </a>
        </p>

      </div>
    </section>
  );
}
