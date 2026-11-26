'use client';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import { siteConfig, contactContent as cc } from '@/data/siteContent';
import EnquiryForm from '@/components/EnquiryForm';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { getShortTripBySlug } from '@/data/shortTrips';

function ContactContent() {
  const { localized } = useLang();
  const searchParams = useSearchParams();
  const defaultTour = searchParams.get('tour') || '';
  const defaultDate = searchParams.get('date') || '';

  // Parse shortTrip + variant from URL → "slug__variantId" composite value
  const rawShortTrip = searchParams.get('shortTrip') || '';
  const rawVariant   = searchParams.get('variant')   || '';
  const defaultShortTrip = (() => {
    if (!rawShortTrip) return '';
    const trip = getShortTripBySlug(rawShortTrip);
    if (!trip) return '';
    const vid = rawVariant && trip.variants.find((v) => v.id === rawVariant)
      ? rawVariant
      : (trip.defaultVariant ?? trip.variants[0].id);
    return `${rawShortTrip}__${vid}`;
  })();

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section
        className="hero-header-clearance"
        style={{
          position: 'relative',
          minHeight: 'clamp(360px, 50vh, 540px)',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1800&q=85"
            alt="Plan your India journey — Indian Routes & Trails"
            fill priority className="object-cover object-center" sizes="100vw"
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.92) 0%, rgba(20,34,77,0.45) 55%, transparent 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(20,34,77,0.55) 0%, transparent 60%)' }} />
        </div>
        <div className="relative container-luxury pb-12">
          <p className="eyebrow mb-3" style={{ color: 'var(--color-secondary)' }}>
            {localized(cc.hero.eyebrow)}
          </p>
          <h1 className="font-serif font-light leading-none"
            style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', color: 'var(--color-text-invert)' }}>
            {localized(cc.hero.heading1)}<br />
            <em style={{ color: 'var(--color-secondary)' }}>{localized(cc.hero.heading2)}</em>
          </h1>
          <p className="mt-4 font-sans font-light max-w-lg"
            style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>
            {localized(cc.hero.subtitle)}
          </p>
        </div>
      </section>

      {/* ── MAIN ───────────────────────────────────────────────────────── */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-luxury">
          {/*
            Desktop: info col ~40% / form col ~60%.
            Mobile: stacked, form below info.
            Gap: 48px desktop, 40px tablet, full-width mobile.
          */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr)',
            gap: 'clamp(32px,5vw,56px)',
          }}
            className="lg:grid-cols-contact"
          >
            {/* ── LEFT: contact information ─────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Heading */}
              <div>
                <p className="eyebrow mb-4">{localized(cc.info.eyebrow)}</p>
                <h2 className="font-serif text-2xl font-light mb-2"
                  style={{ color: 'var(--color-text)', lineHeight: 1.2 }}>
                  {localized(cc.info.heading1)}<br />
                  <em className="font-light" style={{ color: 'var(--color-primary-light)' }}>
                    {localized(cc.info.heading2)}
                  </em>
                </h2>
                <div className="divider-gold" style={{ margin: '16px 0 20px' }} />
                <p className="font-sans text-sm font-light leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}>
                  {localized(cc.info.body)}
                </p>
              </div>

              {/* Contact details */}
              <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Email */}
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body, system-ui)',
                    fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: 'var(--color-text-muted)', marginBottom: '8px',
                  }}>
                    {localized(cc.info.emailLabel)}
                  </p>
                  {siteConfig.contact.emails.map((email) => (
                    <a key={email} href={`mailto:${email}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '5px 0',
                        fontFamily: 'var(--font-body, system-ui)', fontSize: '0.875rem',
                        color: 'var(--color-text-muted)', textDecoration: 'none',
                        transition: 'color 180ms ease',
                        wordBreak: 'break-all',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}>
                      <Mail size={13} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                      {email}
                    </a>
                  ))}
                </div>

                {/* Phone */}
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body, system-ui)',
                    fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: 'var(--color-text-muted)', marginBottom: '8px',
                  }}>
                    {localized(cc.info.phoneLabel)}
                  </p>
                  {siteConfig.contact.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '5px 0',
                        fontFamily: 'var(--font-body, system-ui)', fontSize: '0.875rem',
                        color: 'var(--color-text-muted)', textDecoration: 'none',
                        transition: 'color 180ms ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}>
                      <Phone size={13} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                      {phone}
                    </a>
                  ))}
                </div>

                {/* WhatsApp */}
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body, system-ui)',
                    fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: 'var(--color-text-muted)', marginBottom: '8px',
                  }}>
                    {localized(cc.info.whatsappLabel)}
                  </p>
                  <a href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '10px',
                      fontFamily: 'var(--font-body, system-ui)', fontSize: '0.875rem',
                      color: 'var(--color-primary)', textDecoration: 'none',
                      transition: 'color 180ms ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary-dark)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-primary)'}>
                    <MessageCircle size={13} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                    {localized(cc.info.whatsappLink)}
                  </a>
                </div>

                {/* Office */}
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body, system-ui)',
                    fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: 'var(--color-text-muted)', marginBottom: '8px',
                  }}>
                    {localized(cc.info.officeLabel)}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <MapPin size={13} style={{ color: 'var(--color-secondary)', flexShrink: 0, marginTop: '3px' }} />
                    <span style={{
                      fontFamily: 'var(--font-body, system-ui)', fontSize: '0.875rem',
                      color: 'var(--color-text-muted)', lineHeight: 1.65,
                    }}>
                      {siteConfig.contact.address}
                    </span>
                  </div>
                </div>
              </address>

              {/* Quote */}
              <blockquote style={{
                padding: '20px 24px',
                backgroundColor: 'rgba(27,42,94,0.06)',
                borderLeft: '3px solid var(--color-primary)',
                borderRadius: '0 var(--radius-control) var(--radius-control) 0',
                margin: 0,
              }}>
                <p className="font-serif"
                  style={{ fontSize: '0.95rem', fontStyle: 'italic', lineHeight: 1.65, color: 'var(--color-primary)', margin: 0 }}>
                  {localized(cc.quote.text)}
                </p>
                <footer style={{
                  fontFamily: 'var(--font-body, system-ui)',
                  fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--color-secondary-hover)', marginTop: '12px',
                }}>
                  {localized(cc.quote.author)}
                </footer>
              </blockquote>
            </div>

            {/* ── RIGHT: form surface ───────────────────────────────── */}
            <div style={{
              padding: 'clamp(24px, 4vw, 40px)',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-card)',
              alignSelf: 'start',
            }}>
              <h2 className="font-serif text-2xl font-light mb-1.5"
                style={{ color: 'var(--color-text)' }}>
                {localized(cc.form.heading)}
              </h2>
              <p className="font-sans text-sm font-light mb-7"
                style={{ color: 'var(--color-text-muted)' }}>
                {localized(cc.form.subtitle)}
              </p>
              <EnquiryForm
                defaultTour={defaultTour}
                defaultDate={defaultDate}
                defaultShortTrip={defaultShortTrip}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }} />}>
      <ContactContent />
    </Suspense>
  );
}
