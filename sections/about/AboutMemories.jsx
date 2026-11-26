'use client';
/**
 * AboutMemories — "Memories Made"
 * ─────────────────────────────────────────────────────────────────
 * Section 2 of the About page gallery split.
 * Shows real guests: welcome ceremonies, iconic site visits, dining,
 * safari, group moments. Tells the story of WHAT GUESTS EXPERIENCE.
 *
 * Visual treatment:
 *   • Warm surface-alt background — welcoming, human contrast from dark section 1
 *   • Uniform 4:3 cards — clean, editorial, every image same height
 *   • Marigold decorative accent line in header
 *   • Count badge shows total images
 *
 * Responsive:
 *   ≥1280px → 4 cards
 *   1024-1279px → 3 cards
 *   640-1023px → 2 cards
 *   <640px  → 1.1 cards (bleed hint)
 */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSnapCarousel } from '@/hooks/useSnapCarousel';
import { useLang } from '@/lib/LanguageContext';

/* ── 39 client/guest images ─────────────────────────────────────── */
const SLIDES = [
  /* Iconic sites */
  { src: "/Owner's-Pic/group-photo-taj-mahal-agra.webp",                            label: 'Taj Mahal, Agra'              },
  { src: "/Owner's-Pic/group-photo-taj-mahal-great-gate-agra.webp",                 label: 'Taj Mahal Great Gate'         },
  { src: "/Owner's-Pic/group-photo-scalloped-arch-amber-fort-jaipur.webp",          label: 'Amber Fort, Jaipur'           },
  { src: "/Owner's-Pic/couple-ganesh-pol-amber-fort-jaipur.webp",                   label: 'Ganesh Pol, Jaipur'           },
  { src: "/Owner's-Pic/group-photo-jaswant-thada-jodhpur.webp",                     label: 'Jaswant Thada, Jodhpur'       },
  { src: "/Owner's-Pic/group-photo-galta-ji-monkey-temple-jaipur.webp",             label: 'Galtaji Temple, Jaipur'       },
  { src: "/Owner's-Pic/travelers-meenakshi-temple-gopuram-madurai.webp",             label: 'Meenakshi Temple, Madurai'    },
  { src: "/Owner's-Pic/travelers-on-fort-rampart-wall-blue-sky.webp",               label: 'Fort Rampart'                 },
  /* Golden Temple */
  { src: "/Owner's-Pic/group-golden-temple-amritsar-orange-headscarves.webp",        label: 'Golden Temple, Amritsar'      },
  { src: "/Owner's-Pic/group-golden-temple-amritsar-orange-headscarves-close.webp",  label: 'Golden Temple — Close'        },
  /* Luxury welcome */
  { src: "/Owner's-Pic/couple-hotel-doorman-rajasthani-turban-welcome.webp",        label: 'Rajasthani Welcome'           },
  { src: "/Owner's-Pic/couple-hotel-lobby-marigold-garland-welcome.webp",           label: 'Marigold Garland Welcome'     },
  { src: "/Owner's-Pic/couple-marigold-garlands-golden-carved-arch-hotel-wide.webp",label: 'Heritage Hotel Welcome'       },
  { src: "/Owner's-Pic/couple-marigold-garlands-golden-carved-arch-hotel.webp",     label: 'Palace Hotel, Rajasthan'      },
  { src: "/Owner's-Pic/group-welcome-traditional-musicians-palace-entrance.webp",   label: 'Traditional Musicians'        },
  { src: "/Owner's-Pic/travelers-hotel-doormen-red-turbans-colorful-scarves.webp",  label: 'Hotel Welcome, Jaipur'        },
  { src: "/Owner's-Pic/group-flower-garlands-airport-arrival.webp",                 label: 'Airport Arrival Welcome'      },
  { src: "/Owner's-Pic/travelers-flower-garlands-airport-welcome.webp",             label: 'Flower Garlands — Airport'    },
  { src: "/Owner's-Pic/travelers-flower-garlands-tempo-traveller-welcome.webp",     label: 'Traveller Welcome'            },
  { src: "/Owner's-Pic/travelers-namaste-yellow-doorway-carved-wooden-door.webp",   label: 'Traditional Namaste'          },
  /* Dining */
  { src: "/Owner's-Pic/couple-lunch-jaipur-pavilion-itc-rajputana-jaipur.webp",     label: 'ITC Rajputana, Jaipur'        },
  { src: "/Owner's-Pic/group-dinner-evening-gathering-indoors.webp",                label: 'Evening Dinner'               },
  { src: "/Owner's-Pic/group-photo-luxury-hotel-lobby-orange-lilies.webp",          label: 'Luxury Hotel Lobby'           },
  { src: "/Owner's-Pic/group-photo-hotel-lobby-chandeliers.webp",                   label: 'Hotel Lobby, Chandeliers'     },
  { src: "/Owner's-Pic/three-people-blue-painted-interior-candlelit-table.webp",    label: 'Candlelit Dinner'             },
  /* Safari */
  { src: "/Owner's-Pic/group-sand-dunes-sunset-jaisalmer.webp",                     label: 'Sand Dunes, Jaisalmer'        },
  { src: "/Owner's-Pic/elephant-ride-amber-fort-jaipur.webp",                       label: 'Amber Fort, Jaipur'           },
  { src: "/Owner's-Pic/couple-painted-elephants-amber-fort-jaipur.webp",            label: 'Painted Elephants, Jaipur'    },
  { src: "/Owner's-Pic/travelers-jungle-safari-jeep-winter-morning.webp",           label: 'Jungle Safari'                },
  /* With clients — group & duo shots */
  { src: "/Owner's-Pic/three-people-hotel-lobby-bookshelf-marble-floor.webp",       label: 'Hotel Lobby Moment'           },
  { src: "/Owner's-Pic/three-women-holding-painted-camel-figurine.webp",            label: 'Painted Camel Souvenir'       },
  { src: "/Owner's-Pic/three-women-palace-hotel-courtyard-pillars.webp",            label: 'Palace Hotel Courtyard'       },
  { src: "/Owner's-Pic/two-people-hotel-lobby-red-flower-arrangement.webp",         label: 'Hotel Lobby, Red Flowers'     },
  { src: "/Owner's-Pic/two-people-modern-hotel-lobby-marble-floor.webp",            label: 'Modern Hotel Lobby'           },
  { src: "/Owner's-Pic/travelers-airport-terminal-group-photo.webp",                label: 'Airport Terminal'             },
  { src: "/Owner's-Pic/travelers-flower-garlands-inside-temple-rajasthan.webp",     label: 'Temple, Rajasthan'            },
  { src: "/Owner's-Pic/travelers-palace-hotel-lobby-tiger-statue-colorful-scarves.webp", label: 'Palace Hotel, Tiger Statue' },
  { src: "/Owner's-Pic/travelers-hotel-doormen-red-turbans-colorful-scarves.webp",  label: 'Red Turban Welcome'           },
  { src: "/Owner's-Pic/group-photo-rajasthani-turbans-evening-archway-ganesh.webp", label: 'Rajasthani Turbans'           },
];

/* ── Responsive perView ─────────────────────────────────────────── */
function usePerView() {
  const [pv, setPv] = useState(1);
  useEffect(() => {
    const upd = () => {
      const w = window.innerWidth;
      if      (w >= 1280) setPv(4);
      else if (w >= 1024) setPv(3);
      else if (w >= 640)  setPv(2);
      else                setPv(1);
    };
    upd();
    window.addEventListener('resize', upd, { passive: true });
    return () => window.removeEventListener('resize', upd);
  }, []);
  return pv;
}

/* ── Arrow button — dark outline on light bg ────────────────────── */
function Arrow({ onClick, disabled, dir }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button" onClick={onClick} disabled={disabled}
      aria-label={dir === 'left' ? 'Previous' : 'Next'}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '44px', height: '44px', borderRadius: '50%',
        border: `1.5px solid ${disabled
          ? 'var(--color-border)'
          : hov ? 'var(--color-primary)' : 'var(--color-border-strong)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        backgroundColor: hov && !disabled ? 'var(--color-primary)' : 'transparent',
        color: disabled ? 'var(--color-border-strong)'
          : hov ? '#fff' : 'var(--color-primary)',
        opacity: disabled ? 0.38 : 1,
        transition: 'all 200ms ease',
        appearance: 'none', padding: 0, outline: 'none', flexShrink: 0,
      }}
    >
      {dir === 'left' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  );
}

/* ── Dot nav ─────────────────────────────────────────────────────── */
function Dots({ count, active, onDot }) {
  /* More than 12 positions → show counter text */
  if (count > 12) {
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
    <div role="tablist" style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginTop: '28px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} type="button" role="tab"
          aria-selected={i === active} aria-label={`Slide ${i + 1}`}
          onClick={() => onDot(i)}
          style={{
            width: i === active ? '22px' : '7px', height: '7px',
            borderRadius: '999px', border: 'none', padding: 0, margin: 0,
            cursor: 'pointer',
            backgroundColor: i === active ? 'var(--color-secondary)' : 'var(--color-border-strong)',
            transition: 'width 280ms ease, background-color 280ms ease',
            appearance: 'none', outline: 'none',
          }}
        />
      ))}
    </div>
  );
}

/* ── Slide card — uniform 4:3 ───────────────────────────────────── */
function SlideCard({ slide }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      style={{
        position: 'relative', aspectRatio: '4/3',
        borderRadius: 'var(--radius-card)', overflow: 'hidden', userSelect: 'none',
        transform:  hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow:  hov ? '0 16px 40px rgba(20,34,77,0.18)' : '0 2px 10px rgba(20,34,77,0.07)',
        transition: 'transform 280ms ease, box-shadow 280ms ease',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <Image
        src={slide.src}
        alt={slide.label}
        fill
        className="object-cover"
        style={{
          transform:  hov ? 'scale(1.07)' : 'scale(1)',
          transition: 'transform 550ms cubic-bezier(0.4,0,0.2,1)',
        }}
        sizes="(max-width:639px) 90vw, (max-width:1023px) 48vw, (max-width:1279px) 32vw, 24vw"
        draggable={false}
      />

      {/* Gradient overlay */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: hov
          ? 'linear-gradient(to top, rgba(20,34,77,0.72) 0%, rgba(20,34,77,0.08) 55%, transparent 100%)'
          : 'linear-gradient(to top, rgba(20,34,77,0.38) 0%, transparent 50%)',
        transition: 'background 280ms ease',
      }} />

      {/* Label chip — bottom left */}
      <p style={{
        position: 'absolute', bottom: '12px', left: '12px', right: '12px',
        margin: 0,
        fontFamily: 'var(--font-body, system-ui)',
        fontSize: '9px', fontWeight: 600,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: '#FBF7EF', lineHeight: 1,
        opacity:   hov ? 1 : 0.55,
        transform: hov ? 'translateY(0)' : 'translateY(5px)',
        transition: 'opacity 260ms ease, transform 260ms ease',
        pointerEvents: 'none',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {slide.label}
      </p>
    </div>
  );
}

/* ── Progress bar ────────────────────────────────────────────────── */
function ProgressBar({ activeIndex, positions }) {
  const pct = positions <= 1 ? 100 : Math.round((activeIndex / (positions - 1)) * 100);
  return (
    <div style={{
      marginTop: '20px',
      height: '2px',
      backgroundColor: 'var(--color-border)',
      borderRadius: '999px',
      overflow: 'hidden',
      maxWidth: '240px',
      margin: '20px auto 0',
    }}>
      <div style={{
        height: '100%',
        width: `${pct}%`,
        backgroundColor: 'var(--color-secondary)',
        borderRadius: '999px',
        transition: 'width 300ms ease',
      }} />
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────────────── */
export default function AboutMemories() {
  const perView = usePerView();
  const { lang } = useLang();
  const GAP = 12;
  const es  = lang === 'es';

  const { trackRef, activeIndex, positions, goTo, prev, next, canPrev, canNext } =
    useSnapCarousel(SLIDES.length, perView, GAP);

  const isMobile = perView === 1;

  return (
    <section
      id="gallery"
      style={{
        backgroundColor: 'var(--color-surface-alt)',
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
            {/* Section label with accent line */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              marginBottom: '12px',
            }}>
              <div style={{ width: '28px', height: '1.5px', backgroundColor: 'var(--color-secondary)' }} />
              <p className="eyebrow" style={{ color: 'var(--color-primary)', margin: 0 }}>
                {es ? 'Recuerdos Creados' : 'Memories Made'}
              </p>
            </div>

            <h2 className="font-serif font-light leading-tight" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-text)',
              marginBottom: '10px',
            }}>
              {es ? 'Nuestros Viajeros' : 'Our Travellers'}
            </h2>
            <p className="font-sans font-light" style={{
              fontSize: '0.875rem', color: 'var(--color-text-muted)',
              maxWidth: '32rem', lineHeight: 1.7, margin: 0,
            }}>
              {es
                ? 'Viajeros reales, destinos reales — cada imagen es un testimonio del viaje que espera.'
                : 'Real travellers, real destinations — every image is a testament to the journey that awaits.'}
            </p>
          </div>

          {/* Right: count badge + arrows */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '14px', flexShrink: 0 }}>
            {/* Total count badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px',
              backgroundColor: 'rgba(27,42,94,0.07)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-pill)',
            }}>
              <span style={{
                fontFamily: 'var(--font-body, system-ui)',
                fontSize: '10px', fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--color-primary)',
              }}>
                {SLIDES.length} {es ? 'momentos' : 'moments'}
              </span>
            </div>

            {/* Arrows — desktop/tablet only */}
            {!isMobile && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <Arrow onClick={prev} disabled={!canPrev} dir="left"  />
                <Arrow onClick={next} disabled={!canNext} dir="right" />
              </div>
            )}
          </div>
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
            paddingRight: isMobile ? '10vw' : '0',
          }}
        >
          {SLIDES.map((slide) => (
            <div key={slide.src} style={{
              flexShrink: 0, scrollSnapAlign: 'start',
              width: isMobile
                ? '90vw'
                : `calc((100% - ${GAP * (perView - 1)}px) / ${perView})`,
            }}>
              <SlideCard slide={slide} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Progress bar + dots + CTA ────────────────────── */}
      <div className="container-luxury">
        <ProgressBar activeIndex={activeIndex} positions={positions} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', gap: '24px' }}>
          <Dots count={positions > 12 ? 0 : positions} active={activeIndex} onDot={goTo} />
        </div>

        {/* Mobile arrows */}
        {isMobile && (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            <Arrow onClick={prev} disabled={!canPrev} dir="left"  />
            <Arrow onClick={next} disabled={!canNext} dir="right" />
          </div>
        )}

        {/* Position counter when too many dots */}
        {positions > 12 && (
          <p style={{
            textAlign: 'center', marginTop: '8px',
            fontFamily: 'var(--font-body, system-ui)', fontSize: '11px',
            letterSpacing: '0.12em', color: 'var(--color-text-muted)',
          }}>
            {activeIndex + 1} / {positions}
          </p>
        )}
      </div>
    </section>
  );
}
