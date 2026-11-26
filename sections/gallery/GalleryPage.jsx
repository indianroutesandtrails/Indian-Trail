'use client';
/**
 * GalleryPage — /gallery
 * ─────────────────────────────────────────────────────────────────
 * Premium editorial masonry gallery.
 *
 * Layout contract (deterministic, no Math.random):
 *   assignLayout() marks every image standard / wide / feature by index.
 *   Desktop 4-column CSS Grid:
 *     standard → col-span 1, row-span 1  (aspect 4:3)
 *     wide     → col-span 2, row-span 1  (aspect 16:9 effective)
 *     feature  → col-span 2, row-span 2  (large square)
 *   Tablet 1024-1279px: 3-col; feature stays 2-col, wide stays 2-col
 *   Tablet 640-1023px : 2-col; all spans capped at 2 (= full width for feature/wide)
 *   Mobile <640px     : 1-col; all images full width, 4:3 ratio
 *
 * Lightbox: lightweight inline implementation — no external library.
 *   Opens on tile click, keyboard Arrow/Escape, touch swipe, focus trap.
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { galleryImages, galleryPageContent as pc, GALLERY_CATEGORIES } from '@/data/gallery';

/* ── Responsive columns hook ──────────────────────────────────────── */
function useCols() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const upd = () => {
      const w = window.innerWidth;
      if      (w >= 1280) setCols(4);
      else if (w >= 1024) setCols(3);
      else if (w >= 640)  setCols(2);
      else                setCols(1);
    };
    upd();
    window.addEventListener('resize', upd, { passive: true });
    return () => window.removeEventListener('resize', upd);
  }, []);
  return cols;
}

/* ── Determine actual col/row span per image at a given column count ─ */
function getSpans(layout, cols) {
  if (cols === 1) return { colSpan: 1, rowSpan: 1, ratio: '4/3' };
  if (cols === 2) {
    if (layout === 'feature') return { colSpan: 2, rowSpan: 1, ratio: '16/9' };
    if (layout === 'wide')    return { colSpan: 2, rowSpan: 1, ratio: '16/9' };
    return { colSpan: 1, rowSpan: 1, ratio: '4/3' };
  }
  if (cols === 3) {
    if (layout === 'feature') return { colSpan: 2, rowSpan: 2, ratio: '1/1' };
    if (layout === 'wide')    return { colSpan: 2, rowSpan: 1, ratio: '16/9' };
    return { colSpan: 1, rowSpan: 1, ratio: '4/3' };
  }
  // 4 cols (desktop)
  if (layout === 'feature') return { colSpan: 2, rowSpan: 2, ratio: '1/1' };
  if (layout === 'wide')    return { colSpan: 2, rowSpan: 1, ratio: '16/9' };
  return { colSpan: 1, rowSpan: 1, ratio: '4/3' };
}

/* ── Responsive sizes string per layout ─────────────────────────────── */
function getSizes(layout, cols) {
  if (cols === 1) return '100vw';
  if (cols === 2) return layout !== 'standard' ? '100vw' : '50vw';
  if (cols === 3) return layout !== 'standard' ? '70vw' : '33vw';
  // 4 col
  if (layout === 'feature') return '50vw';
  if (layout === 'wide')    return '50vw';
  return '25vw';
}

/* ── Lightbox ─────────────────────────────────────────────────────── */
function Lightbox({ images, startIndex, onClose, localized }) {
  const [idx, setIdx]       = useState(startIndex);
  const [touching, setTouching] = useState(false);
  const touchStartX = useRef(null);
  const closeRef    = useRef(null);
  const img         = images[idx];

  // Body lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Focus close button on mount
  useEffect(() => { closeRef.current?.focus(); }, []);

  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowLeft')   prev();
      if (e.key === 'ArrowRight')  next();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose, prev, next]);

  // Touch swipe
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  const prevLabel = localized(pc.lightbox.prevImage);
  const nextLabel = localized(pc.lightbox.nextImage);
  const closeLabel= localized(pc.lightbox.closeGallery);
  const counter   = `${localized(pc.lightbox.imageCounter)} ${idx + 1} ${localized(pc.lightbox.of)} ${images.length}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={localized(pc.lightbox.viewImage)}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(10,14,30,0.97)',
        display: 'flex', flexDirection: 'column',
        animation: 'fadeIn 180ms ease forwards',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 20px', flexShrink: 0,
      }}>
        <span style={{
          fontFamily: 'var(--font-body, system-ui)',
          fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
        }}>
          {counter}
        </span>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label={closeLabel}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '44px', height: '44px', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.75)',
            transition: 'border-color 150ms, color 150ms',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Image area */}
      <div
        style={{ flex: 1, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
        onClick={onClose}
        aria-label="Click to close"
      >
        <Image
          key={img.src}
          src={img.src}
          alt={localized(img.alt)}
          fill
          priority
          style={{ objectFit: 'contain' }}
          sizes="100vw"
          onClick={e => e.stopPropagation()}
        />
      </div>

      {/* Bottom caption + nav */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 20px', flexShrink: 0, gap: '16px',
      }}>
        <button
          onClick={prev}
          aria-label={prevLabel}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '44px', height: '44px', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.75)',
            flexShrink: 0, transition: 'border-color 150ms, color 150ms',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
        >
          <ChevronLeft size={20} />
        </button>

        <div style={{ flex: 1, textAlign: 'center', minWidth: 0 }}>
          <p style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(0.85rem, 1.8vw, 1rem)', fontWeight: 400,
            color: 'rgba(255,255,255,0.88)', margin: '0 0 3px',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {localized(img.caption)}
          </p>
          <p style={{
            fontFamily: 'var(--font-body, system-ui)',
            fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(232,163,23,0.75)', margin: 0,
          }}>
            {img.location}
          </p>
        </div>

        <button
          onClick={next}
          aria-label={nextLabel}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '44px', height: '44px', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.75)',
            flexShrink: 0, transition: 'border-color 150ms, color 150ms',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

/* ── Gallery tile ─────────────────────────────────────────────────── */
function GalleryTile({ img, index, priority, cols, onOpen }) {
  const { localized } = useLang();
  const [hov, setHov] = useState(false);
  const spans = getSpans(img.layout, cols);
  const sizes = getSizes(img.layout, cols);
  const altText = localized(img.alt);
  const captionText = localized(img.caption);

  return (
    <figure
      style={{
        gridColumn: `span ${spans.colSpan}`,
        gridRow:    `span ${spans.rowSpan}`,
        position:   'relative',
        aspectRatio: spans.ratio,
        borderRadius: 'var(--radius-card)',
        overflow:   'hidden',
        cursor:     'pointer',
        margin:     0,
        // Prevent misalignment for feature tiles
        alignSelf:  'start',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`${localized(pc.lightbox.viewImage)}: ${captionText}`}
        style={{
          position: 'absolute', inset: 0,
          display: 'block', width: '100%', height: '100%',
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
        }}
      />
      <Image
        src={img.src}
        alt={altText}
        fill
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className="object-cover"
        style={{
          transform:  hov ? 'scale(1.035)' : 'scale(1)',
          transition: 'transform 550ms cubic-bezier(0.4,0,0.2,1)',
          // prefers-reduced-motion handled via global CSS
        }}
        sizes={`(max-width:639px) 100vw, (max-width:1023px) ${spans.colSpan === 2 ? '100vw' : '50vw'}, (max-width:1279px) ${spans.colSpan === 2 ? '70vw' : '33vw'}, ${spans.colSpan === 2 ? '50vw' : '25vw'}`}
      />

      {/* Bottom gradient + caption — always present for accessibility, opacity animates */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: hov
            ? 'linear-gradient(to top, rgba(20,34,77,0.78) 0%, rgba(20,34,77,0.12) 50%, transparent 100%)'
            : 'linear-gradient(to top, rgba(20,34,77,0.42) 0%, transparent 50%)',
          transition: 'background 280ms ease',
        }}
      />
      <figcaption style={{
        position: 'absolute', bottom: '12px', left: '14px', right: '14px',
        margin: 0,
        fontFamily: 'var(--font-body, system-ui)',
        fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: '#FBF7EF', lineHeight: 1,
        opacity:   hov ? 1 : 0.5,
        transform: hov ? 'translateY(0)' : 'translateY(4px)',
        transition: 'opacity 240ms ease, transform 240ms ease',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}>
        {captionText}
      </figcaption>
    </figure>
  );
}

/* ── Filter pill ─────────────────────────────────────────────────── */
function FilterPill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        fontFamily: 'var(--font-body, system-ui)',
        fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em',
        textTransform: 'uppercase',
        padding: '7px 16px',
        border: `1.5px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-control)',
        backgroundColor: active ? 'var(--color-primary)' : 'transparent',
        color: active ? '#fff' : 'var(--color-text-muted)',
        cursor: 'pointer', whiteSpace: 'nowrap',
        transition: 'all 160ms ease',
        outline: 'none',
        minHeight: '44px',
      }}
      onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px rgba(232,163,23,0.5)'; }}
      onBlur={e =>  { e.currentTarget.style.boxShadow = 'none'; }}
    >
      {label}
    </button>
  );
}

/* ── Main page ───────────────────────────────────────────────────── */
export default function GalleryPage() {
  const { localized } = useLang();
  const cols = useCols();

  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null); // null = closed

  // Filtered images — same order as source, deterministic
  const filtered = useMemo(
    () => activeFilter === 'all' ? galleryImages : galleryImages.filter(img => img.category === activeFilter),
    [activeFilter]
  );

  // Lightbox handlers
  const openLightbox  = useCallback((idx) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  // Hero image = first image in canonical order
  const heroImg = galleryImages[0];

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        className="hero-header-clearance"
        style={{
          position: 'relative',
          minHeight: 'clamp(400px, 58vh, 600px)',
          display: 'flex', alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <div className="absolute inset-0">
          <Image
            src={heroImg.src}
            alt={localized(heroImg.alt)}
            fill
            priority
            className="object-cover"
            style={{ objectPosition: 'center 40%' }}
            sizes="100vw"
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.90) 0%, rgba(20,34,77,0.40) 55%, transparent 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(20,34,77,0.55) 0%, transparent 60%)' }} />
        </div>
        <div className="relative container-luxury pb-14">
          <p className="eyebrow mb-3" style={{ color: 'var(--color-secondary)' }}>
            {localized(pc.hero.eyebrow)}
          </p>
          <h1
            className="font-serif font-light leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', color: 'var(--color-text-invert)' }}
          >
            {localized(pc.hero.heading1)}<br />
            <em style={{ color: 'var(--color-secondary)' }}>{localized(pc.hero.heading2)}</em>
          </h1>
          <p className="font-sans font-light mb-7 max-w-lg"
            style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.9rem,1.5vw,1rem)' }}>
            {localized(pc.hero.subtitle)}
          </p>
          <a
            href="#gallery-grid"
            className="btn-hero-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            {localized(pc.hero.cta)} <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────────────── */}
      <main id="gallery-grid">
        <section
          style={{
            backgroundColor: 'var(--color-bg)',
            paddingTop: 'clamp(48px,6vw,80px)',
            paddingBottom: 'clamp(48px,6vw,96px)',
          }}
        >
          <div className="container-luxury">

            {/* ── Filter bar ────────────────────────────────────────── */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '8px',
              marginBottom: 'clamp(28px,4vw,44px)',
            }}
              role="group"
              aria-label="Filter gallery by category"
            >
              {GALLERY_CATEGORIES.map(cat => (
                <FilterPill
                  key={cat}
                  label={localized(pc.filters[cat])}
                  active={activeFilter === cat}
                  onClick={() => setActiveFilter(cat)}
                />
              ))}
              {/* Image count */}
              <span style={{
                marginLeft: 'auto', alignSelf: 'center',
                fontFamily: 'var(--font-body, system-ui)',
                fontSize: '11px', letterSpacing: '0.12em',
                color: 'var(--color-text-muted)',
                whiteSpace: 'nowrap',
              }}>
                {filtered.length} {localized(pc.counts.showing)}
              </span>
            </div>

            {/* ── Mosaic grid ───────────────────────────────────────── */}
            {filtered.length === 0 ? (
              <p style={{
                fontFamily: 'var(--font-body, system-ui)', fontSize: '0.95rem',
                color: 'var(--color-text-muted)', textAlign: 'center',
                padding: '48px 0',
              }}>
                {localized(pc.empty.noImages)}
              </p>
            ) : (
              <div
                aria-label="Photo gallery"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                  gap: cols === 1 ? '8px' : cols === 2 ? '10px' : '12px',
                  gridAutoRows: cols >= 3 ? 'minmax(180px, auto)' : 'auto',
                }}
              >
                {filtered.map((img, idx) => (
                  <GalleryTile
                    key={img.id}
                    img={img}
                    index={idx}
                    priority={idx < 4}
                    cols={cols}
                    onOpen={openLightbox}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Bottom CTA ────────────────────────────────────────────── */}
        <section
          className="section-padding-sm"
          style={{ backgroundColor: 'var(--color-primary-dark)' }}
        >
          <div className="container-narrow text-center">
            <p className="eyebrow mb-4" style={{ color: 'var(--color-secondary)' }}>
              {localized(pc.hero.eyebrow)}
            </p>
            <h2
              className="font-serif font-light mb-5"
              style={{ color: 'var(--color-text-invert)', fontSize: 'clamp(1.6rem,3.5vw,2.5rem)' }}
            >
              {localized(pc.cta.planJourney)}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
              <Link href="/contact" className="btn-hero-primary">
                {localized(pc.cta.planJourney)}
              </Link>
              <Link
                href="/tours"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontFamily: 'var(--font-body, system-ui)',
                  fontSize: '11px', fontWeight: 500, letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  padding: '13px 22px',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  borderRadius: 'var(--radius-control)',
                  color: 'rgba(255,255,255,0.80)',
                  textDecoration: 'none',
                  transition: 'background-color 180ms ease',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {localized(pc.cta.viewTours)} <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Lightbox ──────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          startIndex={lightboxIndex}
          onClose={closeLightbox}
          localized={localized}
        />
      )}
    </>
  );
}
