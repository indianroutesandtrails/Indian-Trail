'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import ItineraryTimeline from '@/components/ItineraryTimeline';
import EnquiryForm from '@/components/EnquiryForm';
import StickyEnquiryBar from '@/components/StickyEnquiryBar';
import RelatedJourneys from '@/components/RelatedJourneys';
import { tours } from '@/data/tours';
import { getFestivalsForJourney, getFestivalBySlug, getNextOccurrence, daysUntil } from '@/data/festivals';
import { Clock, Sun, MapPin, ArrowLeft, ChevronRight, Star, Calendar } from 'lucide-react';

function formatDate(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr + 'T12:00:00Z');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function TourDetailClient({ tour }) {
  const { t, lang, localized } = useLang();
  const today = new Date();

  // Format duration in locale-appropriate way
  const durationLabel = lang === 'es'
    ? `${tour.duration} días / ${tour.nights} noches`
    : `${tour.duration} Days / ${tour.nights} Nights`;

  // Festival matches for this journey
  const festivalLinks = getFestivalsForJourney(tour.slug);
  const festivalMatches = festivalLinks
    .map((link) => {
      const festival = getFestivalBySlug(link.festivalSlug);
      if (!festival) return null;
      const next = getNextOccurrence(festival, today);
      const countdown = daysUntil(festival, today);
      return { ...link, festival, next, countdown };
    })
    .filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-end overflow-hidden"
        style={{ minHeight: 'clamp(560px, 85vh, 860px)', paddingTop: 'var(--header-height-desktop)' }}>
        <div className="absolute inset-0">
          <Image
            src={tour.featuredImage}
            alt={`${localized(tour.title)} — Indian Routes & Trails`}
            fill priority className="object-cover" sizes="100vw"
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.94) 0%, rgba(20,34,77,0.42) 55%, transparent 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(20,34,77,0.55) 0%, transparent 60%)' }} />
        </div>
        <div className="relative container-luxury w-full pb-14">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 font-sans text-[11px] tracking-wider uppercase mb-7 transition-colors"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.88)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
            <ArrowLeft size={13} /> {t('tour_detail.all_journeys')}
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="flex items-center gap-1.5 px-3 py-1.5 font-sans text-[10px] tracking-wider uppercase"
              style={{ backgroundColor: 'rgba(27,42,94,0.88)', color: '#fff', borderRadius: 'var(--radius-pill)' }}>
              <Clock size={11} /> {durationLabel}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 font-sans text-[10px] tracking-wider uppercase"
              style={{
                backgroundColor: 'rgba(232,163,23,0.2)',
                color: 'var(--color-secondary)',
                border: '1px solid rgba(232,163,23,0.4)',
                borderRadius: 'var(--radius-pill)',
              }}>
              <Sun size={11} /> {tour.season}
            </span>
            {tour.interests?.map((tag) => (
              <span key={tag}
                className="px-3 py-1.5 font-sans text-[10px] tracking-wider uppercase"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.7)',
                  borderRadius: 'var(--radius-pill)',
                }}>
                {tag}
              </span>
            ))}
          </div>
          <h1
            className="display-title leading-none mb-4"
            style={{
              color: 'var(--color-text-invert)',
              maxWidth: tour.heroTitleSize === 'compact' ? '52rem' : '48rem',
              fontSize: tour.heroTitleSize === 'compact'
                ? 'clamp(2rem, 4vw, 4rem)'
                : undefined,
              lineHeight: tour.heroTitleSize === 'compact' ? 1.02 : undefined,
            }}>
            {localized(tour.title)}
          </h1>
          <p className="font-sans font-light max-w-xl"
            style={{ color: 'rgba(255,255,255,0.62)', fontSize: '1rem' }}>
            {localized(tour.subtitle)}
          </p>
        </div>
      </section>

      {/* Route chip strip */}
      <div style={{ backgroundColor: 'var(--color-primary-dark)' }} className="py-3.5">
        <div className="container-luxury flex flex-wrap items-center gap-1.5">
          <MapPin size={12} style={{ color: 'var(--color-secondary)' }} />
          {tour.route.map((city, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="font-sans text-xs"
                style={{ color: 'rgba(255,255,255,0.55)' }}>
                {city}
              </span>
              {i < tour.route.length - 1 && (
                <ChevronRight size={11} style={{ color: 'rgba(232,163,23,0.4)' }} />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-luxury py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Left — main content */}
            <div className="lg:col-span-2 space-y-16">

              {/* Overview */}
              <div>
                <p className="eyebrow mb-4">{t('tour_detail.overview_heading')}</p>
                <h2 className="font-serif text-2xl font-light mb-5"
                  style={{ color: 'var(--color-text)' }}>
                  {t('tour_detail.about_journey')}
                </h2>
                <div className="divider-gold mb-7" />
                <p className="body-large">{localized(tour.overview)}</p>
              </div>

              {/* Highlights */}
              <div>
                <p className="eyebrow mb-4">{t('tour_detail.highlights_heading')}</p>
                <h2 className="font-serif text-2xl font-light mb-5"
                  style={{ color: 'var(--color-text)' }}>
                  {t('tour_detail.highlights')}
                </h2>
                <div className="divider-gold mb-7" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {tour.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-4"
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-control)',
                      }}>
                      <Star size={12} className="mt-0.5 shrink-0"
                        style={{ color: 'var(--color-secondary)' }} />
                      <span className="font-sans text-sm font-light leading-relaxed"
                        style={{ color: 'var(--color-text-muted)' }}>
                        {localized(h)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Festival match block */}
              {festivalMatches.length > 0 && (
                <div>
                  <p className="eyebrow mb-4">{t('tour_detail.festival_timing')}</p>
                  <h2 className="font-serif text-2xl font-light mb-5"
                    style={{ color: 'var(--color-text)' }}>
                    {t('tour_detail.time_your_journey')}
                  </h2>
                  <div className="divider-gold mb-7" />
                  <div className="space-y-4">
                    {festivalMatches.map(({ festival, hook, matchStrength, next, countdown }) => (
                      <div key={festival.slug}
                        className="flex items-start gap-4 p-5"
                        style={{
                          backgroundColor: 'var(--color-surface)',
                          border: matchStrength === 'perfect'
                            ? '1px solid var(--color-border-gold)'
                            : '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-card)',
                        }}>
                        <Calendar size={18} className="shrink-0 mt-0.5"
                          style={{ color: 'var(--color-secondary)' }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Link href={`/festivals/${festival.slug}`}
                              className="font-serif text-base font-light"
                              style={{ color: 'var(--color-text)' }}>
                              {festival.name[lang]}
                            </Link>
                            <span className="font-sans text-[9px] px-1.5 py-0.5 uppercase tracking-wider"
                              style={{
                                backgroundColor: matchStrength === 'perfect'
                                  ? 'rgba(232,163,23,0.15)' : 'rgba(27,42,94,0.1)',
                                color: matchStrength === 'perfect'
                                  ? 'var(--color-secondary-hover)' : 'var(--color-primary)',
                                borderRadius: '4px',
                              }}>
                              {t(`tour_detail.${matchStrength === 'perfect' ? 'perfect_match' : 'good_match'}`)}
                            </span>
                          </div>
                          <p className="font-sans text-sm mb-2"
                            style={{ color: 'var(--color-text-muted)' }}>
                            {hook[lang]}
                          </p>
                          {next && (
                            <p className="font-sans text-xs"
                              style={{ color: 'var(--color-text-muted)' }}>
                              {t('tour_detail.next_occurrence')}: {formatDate(next.start)}
                              {countdown !== null && countdown <= 180 && (
                                <span style={{ color: 'var(--color-secondary-hover)' }}>
                                  {' '}· {countdown} {t('tour_detail.days_away')}
                                </span>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Planning Notes — important operational notices e.g. Taj Mahal Friday closure */}
              {tour.planningNotes?.length > 0 && (
                <div className="p-5 flex items-start gap-4"
                  style={{
                    backgroundColor: 'rgba(192,69,59,0.06)',
                    border: '1px solid rgba(192,69,59,0.25)',
                    borderRadius: 'var(--radius-card)',
                  }}>
                  <div className="shrink-0 mt-0.5"
                    style={{ color: 'var(--color-accent)', fontSize: '1.1rem', lineHeight: 1 }}>
                    ⚠
                  </div>
                  <div>
                    <p className="font-sans text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{ color: 'var(--color-accent)' }}>
                      {t('tour_detail.planning_heading')}
                    </p>
                    <ul className="space-y-1.5">
                      {tour.planningNotes.map((note, i) => (
                        <li key={i} className="font-sans text-sm font-light leading-relaxed"
                          style={{ color: 'var(--color-text)' }}>
                          {localized(note)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Day-by-day itinerary */}
              <div>
                <p className="eyebrow mb-4">{t('tour_detail.day_by_day')}</p>
                <h2 className="font-serif text-2xl font-light mb-5"
                  style={{ color: 'var(--color-text)' }}>
                  {t('tour_detail.detailed_itinerary')}
                </h2>
                <div className="divider-gold mb-7" />
                <ItineraryTimeline days={tour.days.map(d => ({
                  ...d,
                  title:       localized(d.title),
                  description: localized(d.description),
                  activities:  (d.activities || []).map(a => localized(a)),
                  transport:   localized(d.transport),
                  notes:       localized(d.notes),
                }))} />
              </div>

              {/* En-route options */}
              {tour.enrouteOptions?.length > 0 && (
                <div>
                  <p className="eyebrow mb-4">{t('tour_detail.flexibility')}</p>
                  <h2 className="font-serif text-2xl font-light mb-5"
                    style={{ color: 'var(--color-text)' }}>
                    {t('tour_detail.enroute')}
                  </h2>
                  <div className="divider-gold mb-7" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tour.enrouteOptions.map((opt, i) => (
                      <div key={i} className="p-5"
                        style={{
                          backgroundColor: 'rgba(27,42,94,0.05)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-card)',
                        }}>
                        <span className="font-sans text-[9px] tracking-[0.25em] uppercase block mb-2"
                          style={{ color: 'var(--color-primary)' }}>
                          {t('tour_detail.optional_stop')}
                        </span>
                        <h4 className="font-serif text-lg font-light mb-2"
                          style={{ color: 'var(--color-text)' }}>
                          {localized(opt.label)}
                        </h4>
                        <p className="font-sans text-sm font-light leading-relaxed"
                          style={{ color: 'var(--color-text-muted)' }}>
                          {localized(opt.note)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional experiences */}
              {tour.optionalExperiences?.length > 0 && (
                <div>
                  <p className="eyebrow mb-4">{t('tour_detail.optional_heading')}</p>
                  <h2 className="font-serif text-2xl font-light mb-5"
                    style={{ color: 'var(--color-text)' }}>
                    {t('tour_detail.optional_exp')}
                  </h2>
                  <div className="divider-gold mb-7" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tour.optionalExperiences.map((exp, i) => (
                      <div key={i} className="p-6"
                        style={{
                          backgroundColor: 'rgba(27,42,94,0.06)',
                          border: '1px solid rgba(27,42,94,0.15)',
                          borderRadius: 'var(--radius-card)',
                        }}>
                        <span className="font-sans text-[9px] tracking-[0.25em] uppercase block mb-2"
                          style={{ color: 'var(--color-primary)' }}>
                          {t('common.optional')}
                        </span>
                        <h4 className="font-serif text-lg font-light mb-2"
                          style={{ color: 'var(--color-text)' }}>
                          {localized(exp.title)}
                        </h4>
                        <p className="font-sans text-sm font-light leading-relaxed"
                          style={{ color: 'var(--color-text-muted)' }}>
                          {localized(exp.description)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Responsible Tourism */}
              <div className="p-7 flex items-start gap-5"
                style={{
                  backgroundColor: 'rgba(23,97,79,0.06)',
                  border: '1px solid rgba(23,97,79,0.25)',
                  borderRadius: 'var(--radius-card)',
                }}>
                <div className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: 'var(--color-success)', borderRadius: 'var(--radius-control)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <p className="eyebrow mb-2" style={{ color: 'var(--color-success)' }}>
                    {t('tour_detail.responsible_tourism')}
                  </p>
                  <p className="font-serif text-base italic leading-relaxed"
                    style={{ color: 'var(--color-success)' }}>
                    &ldquo;{t('tour_detail.responsible_note')}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">

                {/* Journey at a Glance */}
                <div style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-card)',
                  overflow: 'hidden',
                }}>
                  <div className="px-5 pt-5 pb-2">
                    <p className="font-sans text-[10px] tracking-[0.22em] uppercase"
                      style={{ color: 'var(--color-text-muted)' }}>
                      {t('tour_detail.glance')}
                    </p>
                  </div>
                  {[
                    { label: t('tour_detail.duration'),     value: durationLabel },
                    { label: t('tour_detail.best_season'),  value: tour.season },
                    { label: t('tour_detail.destinations'), value: `${tour.route.length} ${t('tour_detail.cities')}` },
                    { label: t('tour_detail.pricing'),      value: t('common.request_quote') },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between px-5 py-3"
                      style={{ borderTop: '1px solid var(--color-border)' }}>
                      <span className="font-sans text-xs uppercase tracking-wider"
                        style={{ color: 'var(--color-text-muted)' }}>
                        {label}
                      </span>
                      <span className="font-sans text-sm"
                        style={{
                          color: value === t('common.request_quote') ? 'var(--color-secondary-hover)' : 'var(--color-text)',
                          fontStyle: value === t('common.request_quote') ? 'italic' : 'normal',
                        }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Gallery thumbnails */}
                {tour.gallery?.length > 0 && (
                  <div className="grid grid-cols-3 gap-1.5">
                    {tour.gallery.map((img, i) => (
                      <div key={i} className="relative aspect-square overflow-hidden"
                        style={{ borderRadius: 'var(--radius-control)' }}>
                        <Image
                          src={img}
                          alt={`${localized(tour.title)} gallery image ${i + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-500"
                          sizes="100px"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Enquiry form */}
                <div className="p-6"
                  style={{
                    backgroundColor: 'rgba(27,42,94,0.06)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-card)',
                  }}>
                  <h3 className="font-serif text-xl font-light mb-1.5"
                    style={{ color: 'var(--color-text)' }}>
                    {t('tour_detail.plan_this_journey')}
                  </h3>
                  <p className="font-sans text-sm font-light mb-5 leading-relaxed"
                    style={{ color: 'var(--color-text-muted)' }}>
                    {t('tour_detail.share_your_vision')}
                  </p>
                  <EnquiryForm defaultTour={tour.slug} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="section-padding-sm"
        style={{ backgroundColor: 'var(--color-primary-dark)' }}>
        <div className="container-narrow text-center">
          <p className="eyebrow mb-4" style={{ color: 'var(--color-secondary)' }}>
            {lang === 'es' ? 'Comienza Este Viaje' : 'Begin This Journey'}
          </p>
          <h2 className="font-serif text-3xl font-light mb-5"
            style={{ color: 'var(--color-text-invert)' }}>
            {t('tour_detail.ready_to_experience')} {localized(tour.title).split(':')[0]}?
          </h2>
          <p className="font-sans text-sm font-light mb-8 max-w-lg mx-auto"
            style={{ color: 'var(--color-text-invert-muted)' }}>
            {lang === 'es'
              ? 'Comparte tu visión y Om diseñará tu experiencia en India.'
              : 'Share your vision and Om will craft your India experience.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/contact?tour=${tour.slug}`} className="btn-hero-primary">
              {t('tour_detail.plan_my_journey')}
            </Link>
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase px-8 py-3.5 transition-all duration-300"
              style={{
                border: '1.5px solid rgba(255,255,255,0.3)',
                color: 'rgba(255,255,255,0.65)',
                borderRadius: 'var(--radius-control)',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {t('tour_detail.all_journeys')}
            </Link>
          </div>
        </div>
      </section>

      {/* Related journeys */}
      <RelatedJourneys currentSlug={tour.slug} tours={tours} />

      {/* Sticky bottom enquiry bar — appears on scroll */}
      <StickyEnquiryBar tourSlug={tour.slug} tourTitle={localized(tour.title)} />
    </>
  );
}
