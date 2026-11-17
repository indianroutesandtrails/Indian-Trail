'use client';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';

export default function AboutClosing() {
  const { t } = useLang();
  return (
    <section
      style={{
        backgroundColor: 'var(--color-primary)',
        paddingTop:    'clamp(48px, 7vw, 96px)',
        paddingBottom: 'clamp(48px, 7vw, 96px)',
      }}
    >
      <div className="container-narrow text-center">
        <p className="eyebrow mb-4" style={{ color: 'var(--color-secondary)' }}>
          {t('about_closing.eyebrow')}
        </p>
        <h2
          className="font-serif font-light leading-tight mb-6"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-text-invert)' }}
        >
          {t('about_closing.heading')}
        </h2>
        <div className="divider-gold mx-auto mb-8" style={{ maxWidth: '60px' }} />
        <p
          className="font-sans font-light leading-relaxed mb-10 mx-auto"
          style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)', color: 'rgba(255,255,255,0.72)', maxWidth: '640px' }}
        >
          {t('about_closing.body')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/tours" className="btn-hero-primary">{t('about_closing.primary')}</Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.18em] uppercase px-8 py-3.5"
            style={{
              border: '1.5px solid rgba(255,255,255,0.35)',
              color: 'rgba(255,255,255,0.85)',
              borderRadius: 'var(--radius-control)',
              background: 'transparent',
              transition: 'background-color 250ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            {t('about_closing.secondary')}
          </Link>
        </div>
      </div>
    </section>
  );
}
