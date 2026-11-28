'use client';
// GalleryPage - /gallery
//
// Root cause of blank holes: CSS Grid with aspect-ratio on tiles + col-span>1.
// When a wide tile (16:9) sits beside two standard tiles (4:3), the grid row
// height = tallest item (the 4:3 tiles). The wide tile is shorter, so it fills
// only part of its row, leaving a blank area below it.
//
// Fix: row-complete 12-column grid with FIXED pixel row height.
// Every tile in a row gets the same pixel height -> no gaps possible.
// Images use object-fit:cover inside fixed-height wrappers.
//
// Row pattern (repeating A->B->C->D):
//   A: [3, 3, 6]  - two small + one wide
//   B: [5, 7]     - medium + large
//   C: [4, 4, 4]  - equal thirds
//   D: [7, 5]     - large + medium
//
// Row heights: >=1280=280px, 1024-1279=240px, 768-1023=220px
// Mobile <768px: single column, aspect-ratio 4:3 per tile
// Gap: 4px

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { galleryImages, galleryPageContent as pc, GALLERY_CATEGORIES } from '@/data/gallery';

const GAP = 4;

const ROW_PATTERNS = [
  [3, 3, 6],
  [5, 7],
  [4, 4, 4],
  [7, 5],
];

function packRows(images) {
  const rows = [];
  let i = 0;
  let pi = 0;
  while (i < images.length) {
    const pattern = ROW_PATTERNS[pi % ROW_PATTERNS.length];
    const count = pattern.length;
    const slice = images.slice(i, i + count);
    if (!slice.length) break;

    if (slice.length < count) {
      const eq = Math.floor(12 / slice.length);
      const spans = slice.map((_, j) =>
        j === slice.length - 1 ? 12 - eq * (slice.length - 1) : eq
      );
      rows.push({ spans, images: slice });
    } else {
      rows.push({ spans: pattern, images: slice });
    }

    i += slice.length < count ? slice.length : count;
    pi++;
  }
  return rows;
}

function useRowHeight() {
  const [h, setH] = useState(280);
  useEffect(() => {
    const upd = () => {
      const w = window.innerWidth;
      if (w >= 1280) setH(280);
      else if (w >= 1024) setH(240);
      else if (w >= 768) setH(220);
      else setH(0);
    };
    upd();
    window.addEventListener('resize', upd, { passive: true });
    return () => window.removeEventListener('resize', upd);
  }, []);
  return h;
}

function useWidth() {
  const [w, setW] = useState(1440);
  useEffect(() => {
    const upd = () => setW(window.innerWidth);
    upd();
    window.addEventListener('resize', upd, { passive: true });
    return () => window.removeEventListener('resize', upd);
  }, []);
  return w;
}

function Lightbox({ images, startIndex, onClose, localized }) {
  const [idx, setIdx] = useState(startIndex);
  const touchStartX = useRef(null);
  const closeRef = useRef(null);
  const img = images[idx];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => { closeRef.current?.focus(); }, []);

  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose, prev, next]);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  const counter = `${localized(pc.lightbox.imageCounter)} ${idx + 1} ${localized(pc.lightbox.of)} ${images.length}`;
  const btnStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: '44px', height: '44px', borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.18)',
    background: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.75)', flexShrink: 0,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={localized(pc.lightbox.viewImage)}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(10,14,30,0.97)', display: 'flex', flexDirection: 'column', animation: 'fadeIn 180ms ease forwards' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
          {counter}
        </span>
        <button ref={closeRef} onClick={onClose} aria-label={localized(pc.lightbox.closeGallery)} style={btnStyle}>
          <X size={18} />
        </button>
      </div>

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', cursor: 'pointer' }} onClick={onClose}>
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

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', flexShrink: 0, gap: '16px' }}>
        <button onClick={prev} aria-label={localized(pc.lightbox.prevImage)} style={btnStyle}>
          <ChevronLeft size={20} />
        </button>
        <div style={{ flex: 1, textAlign: 'center', minWidth: 0 }}>
          <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)', color: 'rgba(255,255,255,0.88)', margin: '0 0 3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {localized(img.caption)}
          </p>
          <p style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(232,163,23,0.75)', margin: 0 }}>
            {img.location}
          </p>
        </div>
        <button onClick={next} aria-label={localized(pc.lightbox.nextImage)} style={btnStyle}>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

function GalleryTile({ img, flatIndex, priority, rowHeight, isMobile, onOpen }) {
  const { localized } = useLang();
  const [hov, setHov] = useState(false);
  const captionText = localized(img.caption);
  const altText = localized(img.alt);

  const wrapStyle = isMobile
    ? { position: 'relative', aspectRatio: '4/3', overflow: 'hidden', borderRadius: 'var(--radius-control)', cursor: 'pointer', backgroundColor: '#0e1526' }
    : { position: 'relative', height: `${rowHeight}px`, overflow: 'hidden', borderRadius: 'var(--radius-control)', cursor: 'pointer', backgroundColor: '#0e1526' };

  return (
    <div
      style={wrapStyle}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <button
        type="button"
        onClick={() => onOpen(flatIndex)}
        aria-label={`${localized(pc.lightbox.viewImage)}: ${captionText}`}
        style={{ position: 'absolute', inset: 0, display: 'block', width: '100%', height: '100%', background: 'none', border: 'none', padding: 0, cursor: 'pointer', zIndex: 1 }}
      />
      <Image
        src={img.src}
        alt={altText}
        fill
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        style={{
          objectFit: 'contain',
          transform: hov ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 500ms cubic-bezier(0.4,0,0.2,1)',
        }}
        sizes="(max-width:767px) 100vw, (max-width:1023px) 50vw, 33vw"
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: hov
            ? 'linear-gradient(to top, rgba(20,34,77,0.75) 0%, rgba(20,34,77,0.10) 50%, transparent 100%)'
            : 'linear-gradient(to top, rgba(20,34,77,0.40) 0%, transparent 50%)',
          transition: 'background 260ms ease',
        }}
      />
      <p style={{
        position: 'absolute', bottom: '10px', left: '12px', right: '12px', margin: 0, zIndex: 2,
        fontFamily: 'var(--font-body, system-ui)',
        fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: '#FBF7EF', lineHeight: 1,
        opacity: hov ? 1 : 0.5,
        transform: hov ? 'translateY(0)' : 'translateY(3px)',
        transition: 'opacity 220ms ease, transform 220ms ease',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}>
        {captionText}
      </p>
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        fontFamily: 'var(--font-body, system-ui)', fontSize: '10px', fontWeight: 500,
        letterSpacing: '0.14em', textTransform: 'uppercase', padding: '7px 16px',
        border: `1.5px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-control)',
        backgroundColor: active ? 'var(--color-primary)' : 'transparent',
        color: active ? '#fff' : 'var(--color-text-muted)',
        cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 160ms ease',
        outline: 'none', minHeight: '44px',
      }}
    >
      {label}
    </button>
  );
}

export default function GalleryPage() {
  const { localized } = useLang();
  const rowHeight = useRowHeight();
  const screenW = useWidth();
  const isMobile = screenW < 768;

  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(
    () => activeFilter === 'all' ? galleryImages : galleryImages.filter(img => img.category === activeFilter),
    [activeFilter]
  );

  const rows = useMemo(() => packRows(filtered), [filtered]);

  const openLightbox = useCallback((idx) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const heroSrc = "/Owner's-Pic/group-sand-dunes-sunset-jaisalmer.webp";
  const heroAlt = localized({
    en: 'Group of travellers on sand dunes at sunset, Jaisalmer',
    es: 'Grupo de viajeros en dunas de arena al atardecer, Jaisalmer',
  });

  return (
    <>
      {/* HERO */}
      <section
        className="hero-header-clearance"
        style={{ position: 'relative', minHeight: 'clamp(480px, 68vh, 700px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}
      >
        <div className="absolute inset-0">
          <Image src={heroSrc} alt={heroAlt} fill priority className="object-cover" style={{ objectPosition: 'center top' }} sizes="100vw" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.90) 0%, rgba(20,34,77,0.40) 55%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(20,34,77,0.55) 0%, transparent 60%)' }} />
        </div>
        <div className="relative container-luxury pb-14">
          <p className="eyebrow mb-3" style={{ color: 'var(--color-secondary)' }}>{localized(pc.hero.eyebrow)}</p>
          <h1 className="font-serif font-light leading-none mb-4" style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', color: 'var(--color-text-invert)' }}>
            {localized(pc.hero.heading1)}<br />
            <em style={{ color: 'var(--color-secondary)' }}>{localized(pc.hero.heading2)}</em>
          </h1>
          <p className="font-sans font-light mb-7 max-w-lg" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.9rem,1.5vw,1rem)' }}>
            {localized(pc.hero.subtitle)}
          </p>
          <a href="#gallery-grid" className="btn-hero-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            {localized(pc.hero.cta)} <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* GALLERY */}
      <main id="gallery-grid">
        <section style={{ backgroundColor: 'var(--color-bg)', paddingTop: 'clamp(48px,6vw,80px)', paddingBottom: 'clamp(48px,6vw,96px)' }}>
          <div className="container-luxury">

            {/* Filter bar */}
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'clamp(24px,3.5vw,40px)' }}
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
              <span style={{ marginLeft: 'auto', alignSelf: 'center', fontFamily: 'var(--font-body, system-ui)', fontSize: '11px', letterSpacing: '0.12em', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                {filtered.length} {localized(pc.counts.showing)}
              </span>
            </div>

            {/* Gallery */}
            {filtered.length === 0 ? (
              <p style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: '0.95rem', color: 'var(--color-text-muted)', textAlign: 'center', padding: '48px 0' }}>
                {localized(pc.empty.noImages)}
              </p>
            ) : isMobile ? (
              /* Mobile: single column */
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px` }} aria-label="Photo gallery">
                {filtered.map((img, idx) => (
                  <GalleryTile key={img.id} img={img} flatIndex={idx} priority={idx < 3} rowHeight={0} isMobile={true} onOpen={openLightbox} />
                ))}
              </div>
            ) : (
              /* Desktop/tablet: row-complete 12-col fixed-height grid */
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px` }} aria-label="Photo gallery">
                {rows.map((row, rowIdx) => {
                  const flatStart = rows.slice(0, rowIdx).reduce((s, r) => s + r.images.length, 0);
                  return (
                    <div
                      key={rowIdx}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, 1fr)',
                        gap: `${GAP}px`,
                      }}
                    >
                      {row.images.map((img, colIdx) => (
                        <div key={img.id} style={{ gridColumn: `span ${row.spans[colIdx]}`, minWidth: 0 }}>
                          <GalleryTile
                            img={img}
                            flatIndex={flatStart + colIdx}
                            priority={flatStart + colIdx < 6}
                            rowHeight={rowHeight}
                            isMobile={false}
                            onOpen={openLightbox}
                          />
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="section-padding-sm" style={{ backgroundColor: 'var(--color-primary-dark)' }}>
          <div className="container-narrow text-center">
            <p className="eyebrow mb-4" style={{ color: 'var(--color-secondary)' }}>{localized(pc.hero.eyebrow)}</p>
            <h2 className="font-serif font-light mb-5" style={{ color: 'var(--color-text-invert)', fontSize: 'clamp(1.6rem,3.5vw,2.5rem)' }}>
              {localized(pc.cta.planJourney)}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
              <Link href="/contact" className="btn-hero-primary">{localized(pc.cta.planJourney)}</Link>
              <Link
                href="/tours"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-body, system-ui)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '13px 22px', border: '1.5px solid rgba(255,255,255,0.35)', borderRadius: 'var(--radius-control)', color: 'rgba(255,255,255,0.80)', textDecoration: 'none', transition: 'background-color 180ms ease' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {localized(pc.cta.viewTours)} <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
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
