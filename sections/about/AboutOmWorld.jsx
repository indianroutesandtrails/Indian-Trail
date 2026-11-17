'use client';
/**
 * AboutOmWorld — "Behind the Journey"
 * ─────────────────────────────────────────────────────────────────
 * Section 1 of the About page gallery split.
 * Shows Om at iconic places — international trips, solo moments,
 * and landmark visits. Tells the story of WHO HE IS.
 *
 * Visual treatment:
 *   • Deep indigo background — cinematic, personal, premium
 *   • First card: portrait 3:4 — a natural focal anchor
 *   • Remaining cards: landscape 4:3 — consistent flow
 *   • White text on dark surface
 *   • Arrows: glass-white buttons on dark bg
 *
 * Responsive:
 *   ≥1024px → 3 cards  (1 portrait + 2 landscape)
 *   640-1023px → 2 cards
 *   <640px  → 1.1 cards (mobile bleed hint)
 */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSnapCarousel } from '@/hooks/useSnapCarousel';
import { useLang } from '@/lib/LanguageContext';

/* ── Images — Om's personal world ─────────────────────────────── */
const SLIDES = [
  { src: "/Owner's-Pic/Om-Prakesh.webp",                                           alt: 'Om Prakash Saini — Founder & Master Guide',          label: 'Founder & Guide'          },
  { src: "/Owner's-Pic/man-standing-teatro-nacional-san-jose-costa-rica.webp",     alt: 'Om at Teatro Nacional, San José, Costa Rica',        label: 'Teatro Nacional, Costa Rica'},
  { src: "/Owner's-Pic/man-portrait-tropical-garden-red-ginger-flowers.webp",      alt: 'Om in a tropical garden with red ginger flowers',    label: 'Tropical Garden'           },
  { src: "/Owner's-Pic/man-portrait-tropical-hot-springs-waterfall.webp",          alt: 'Om at tropical hot springs waterfall',               label: 'Hot Springs Waterfall'     },
  { src: "/Owner's-Pic/travelers-helicopter-manang-air-kathmandu-nepal.webp",      alt: 'Om with Manang Air helicopter, Kathmandu, Nepal',    label: 'Kathmandu, Nepal'          },
  { src: "/Owner's-Pic/group-photo-rajasthani-turbans-evening-archway-ganesh.webp",alt: 'Group in Rajasthani turbans at Ganesh archway',      label: 'Rajasthani Celebration'    },
  { src: "/Owner's-Pic/selfie-golden-temple-amritsar-sarovar.webp",               alt: 'Selfie at the Golden Temple Sarovar, Amritsar',      label: 'Golden Temple, Amritsar'   },
  { src: "/Owner's-Pic/group-photo-galta-ji-monkey-temple-jaipur.webp",           alt: 'Group at Galtaji Monkey Temple, Jaipur',             label: 'Galtaji Temple, Jaipur'    },
  { src: "/Owner's-Pic/selfie-three-people-garden-red-flowers.webp",              alt: 'Selfie in a garden with red flowers',                label: 'Garden Moment'             },
];

/* ── Responsive perView ─────────────────────────────────────────── */
function usePerView() {
  const [pv, setPv] = useState(1);
  useEffect(() => {
    const upd = () => setPv(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    upd();
    window.addEventListener('resize', upd, { passive: true });
    return () => window.removeEventListener('resize', upd);
  }, []);
  return pv;
}

/* ── Arrow button — ghost white on dark bg ──────────────────────── */
function Arrow({ onClick, disabled, dir }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'left' ? 'Previous' : 'Next'}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width:  '44px', height: '44px', borderRadius: '50%',
        border: `1.5px solid ${disabled ? 'rgba(255,255,255,0.12)' : hov ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.35)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor:          disabled ? 'default' : 'pointer',
        backgroundColor: hov && !disabled ? 'rgba(255,255,255,0.14)' : 'transparent',
        color:           disabled ? 'rgba(255,255,255,0.20)' : '#fff',
        opacity:         disabled ? 0.4 : 1,
        transition:      'all 200ms ease',
        appearance: 'none', padding: 0, outline: 'none', flexShrink: 0,
      }}
    >
      {dir === 'left' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  );
}

/* ── Dot nav ─────────────────────────────────────────────────────── */
function Dots({ count, active, onDot }) {
  return (
    <div role="tablist" style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginTop: '28px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} type="button" role="tab"
          aria-selected={i === active} aria-label={`Slide ${i + 1}`}
          onClick={() => onDot(i)}
          style={{
            width: i === active ? '22px' : '7px', height: '7px',
            borderRadius: '999px', border: 'none', padding: 0, margin: 0,
            cursor: 'pointer',
            backgroundColor: i === active ? 'var(--color-secondary)' : 'rgba(255,255,255,0.25)',
            transition: 'width 280ms ease, background-color 280ms ease',
            appearance: 'none', outline: 'none',
          }}
        />
      ))}
    </div>
  );
}

/* ── Slide card ──────────────────────────────────────────────────── */
function SlideCard({ slide, isFirst }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        position:     'relative',
        /* First card is portrait (3:4), rest are landscape (4:3) */
        aspectRatio:  isFirst ? '3/4' : '4/3',
        borderRadius: 'var(--radius-card)',
        overflow:     'hidden',
        userSelect:   'none',
        transform:    hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow:    hov
          ? '0 20px 48px rgba(0,0,0,0.55)'
          : '0 4px 20px rgba(0,0,0,0.30)',
        transition:   'transform 280ms ease, box-shadow 280ms ease',
        /* Gold border tint on hover */
        outline:      hov ? '1.5px solid rgba(232,163,23,0.45)' : '1.5px solid rgba(255,255,255,0.08)',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        className="object-cover object-top"
        style={{
          transform:  hov ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 550ms cubic-bezier(0.4,0,0.2,1)',
        }}
        sizes="(max-width:639px) 90vw, (max-width:1023px) 48vw, 32vw"
        draggable={false}
      />

      {/* Gradient — always subtle, deeper on hover */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: hov
          ? 'linear-gradient(to top, rgba(10,14,40,0.82) 0%, rgba(10,14,40,0.10) 55%, transparent 100%)'
          : 'linear-gradient(to top, rgba(10,14,40,0.55) 0%, transparent 50%)',
        transition: 'background 280ms ease',
      }} />

      {/* Label chip — bottom left */}
      <div style={{
        position: 'absolute', bottom: '14px', left: '14px',
        display: 'inline-flex', alignItems: 'center',
        padding: '4px 10px',
        backgroundColor: 'rgba(232,163,23,0.18)',
        border: '1px solid rgba(232,163,23,0.40)',
        borderRadius: '4px',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        opacity:   hov ? 1 : 0.70,
        transform: hov ? 'translateY(0)' : 'translateY(4px)',
        transition: 'opacity 260ms ease, transform 260ms ease',
      }}>
        <span style={{
          fontFamily: 'var(--font-body, system-ui)',
          fontSize: '9px', fontWeight: 600,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'var(--color-secondary)',
          whiteSpace: 'nowrap',
        }}>
          {slide.label}
        </span>
      </div>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────────────── */
export default function AboutOmWorld() {
  const perView = usePerView();
  const { lang } = useLang();
  const GAP = 14;
  const es  = lang === 'es';

  const { trackRef, activeIndex, positions, goTo, prev, next, canPrev, canNext } =
    useSnapCarousel(SLIDES.length, perView, GAP);

  const isMobile = perView === 1;

  return (
    <section
      id="om-world"
      style={{
        backgroundColor: 'var(--color-primary-dark)',
        paddingTop:      'clamp(56px, 7vw, 96px)',
        paddingBottom:   'clamp(56px, 7vw, 96px)',
        overflow:        'hidden',
      }}
    >
      <div className="container-luxury">

        {/* ── Header ───────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', gap: '20px',
          marginBottom: '36px', flexWrap: 'wrap',
        }}>
          <div>
            {/* Section label */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              marginBottom: '12px',
            }}>
              <div style={{
                width: '28px', height: '1.5px',
                backgroundColor: 'var(--color-secondary)',
              }} />
              <p className="eyebrow" style={{ color: 'var(--color-secondary)', margin: 0 }}>
                {es ? 'Detrás del Viaje' : 'Behind the Journey'}
              </p>
            </div>

            <h2 className="font-serif font-light leading-tight" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-text-invert)',
              marginBottom: '10px',
            }}>
              {es ? 'El Mundo de Om' : "Om's World"}
            </h2>
            <p className="font-sans font-light" style={{
              fontSize: '0.875rem', color: 'rgba(255,255,255,0.52)',
              maxWidth: '32rem', lineHeight: 1.7, margin: 0,
            }}>
              {es
                ? '38+ años explorando India y el mundo — cada imagen es un capítulo de una historia vivida.'
                : '38+ years exploring India and the world — every image is a chapter of a life lived.'}
            </p>
          </div>

          {/* Arrows — desktop/tablet only */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '10px', flexShrink: 0, paddingBottom: '4px' }}>
              <Arrow onClick={prev} disabled={!canPrev} dir="left"  />
              <Arrow onClick={next} disabled={!canNext} dir="right" />
            </div>
          )}
        </div>
      </div>

      {/* ── Track ────────────────────────────────────────── */}
      <div className="container-luxury" style={{ overflow: 'visible' }}>
        <div
          ref={trackRef}
          className="no-scrollbar"
          style={{
            display: 'flex', gap: `${GAP}px`,
            overflowX: 'auto', scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            /* Mobile bleed */
            paddingRight: isMobile ? '10vw' : '0',
            alignItems: 'flex-start', /* so portrait card stretches naturally */
          }}
        >
          {SLIDES.map((slide, i) => (
            <div key={slide.src} style={{
              flexShrink: 0, scrollSnapAlign: 'start',
              width: isMobile
                ? '90vw'
                : `calc((100% - ${GAP * (perView - 1)}px) / ${perView})`,
            }}>
              <SlideCard slide={slide} isFirst={i === 0} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Dots + count ─────────────────────────────────── */}
      <div className="container-luxury">
        <Dots count={positions} active={activeIndex} onDot={goTo} />
        <p style={{
          textAlign: 'center', marginTop: '12px',
          fontFamily: 'var(--font-body, system-ui)',
          fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.28)',
        }}>
          {es
            ? `${SLIDES.length} momentos`
            : `${SLIDES.length} moments`}
        </p>
      </div>
    </section>
  );
}
