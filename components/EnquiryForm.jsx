'use client';
import { useState, useEffect, useMemo, useRef } from 'react';
import { tours } from '@/data/tours';
import { getShortTripSelectOptions, parseShortTripValue } from '@/data/shortTrips';
import { siteConfig, contactContent as cc } from '@/data/siteContent';
import { MessageCircle, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import FormDatePicker from '@/components/FormDatePicker';
import { useLang } from '@/lib/LanguageContext';

/* ── Control base style ─────────────────────────────────────────── */
const ctrl = {
  display:         'block',
  width:           '100%',
  minWidth:        0,
  maxWidth:        '100%',
  boxSizing:       'border-box',
  padding:         '0 0.9rem',
  height:          '52px',
  backgroundColor: 'var(--color-surface-alt)',
  border:          '1px solid var(--color-border)',
  fontFamily:      'var(--font-body, Inter, system-ui, sans-serif)',
  fontSize:        '0.875rem',
  color:           'var(--color-text)',
  outline:         'none',
  transition:      'border-color 0.2s ease, box-shadow 0.2s ease',
  borderRadius:    'var(--radius-control)',
};
const ctrlFocus = { ...ctrl, borderColor: 'var(--color-primary)', boxShadow: '0 0 0 3px rgba(27,42,94,0.1)' };
const ctrlErr   = { ...ctrl, borderColor: 'var(--color-error)',   boxShadow: '0 0 0 3px rgba(179,38,30,0.08)' };

/* ── Label style ────────────────────────────────────────────────── */
const lbl = {
  display:       'block',
  fontFamily:    'var(--font-body, Inter, system-ui, sans-serif)',
  fontSize:      '0.68rem',
  fontWeight:    500,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color:         'var(--color-text-muted)',
  marginBottom:  '7px',
  lineHeight:    1.3,
  whiteSpace:    'normal',
  wordBreak:     'break-word',
};

export default function EnquiryForm({
  defaultTour      = '',
  defaultMessage   = '',
  defaultDate      = '',
  defaultShortTrip = '',
}) {
  const { lang, localized } = useLang();

  /* ── locale-aware option lists ──────────────────────────────── */
  const journeyOptions = useMemo(() => tours.map((tour) => ({
    value: tour.slug,
    label: `${localized(tour.title)} (${tour.duration} ${lang === 'es' ? 'días' : 'Days'})`,
  })), [lang, localized]);

  const SHORT_TRIP_OPTIONS = useMemo(() => getShortTripSelectOptions(lang), [lang]);

  /* ── form state ─────────────────────────────────────────────── */
  const [form, setForm] = useState({
    name:       '',
    email:      '',
    phone:      '',
    tour:       defaultTour,
    shortTrip:  defaultShortTrip,
    date:       defaultDate,
    travellers: 1,
    prefLang:   '',
    message:    defaultMessage,
  });

  /* Sync URL-driven defaults without resetting user-typed values */
  useEffect(() => {
    if (defaultDate)      setForm(f => ({ ...f, date:      defaultDate }));
  }, [defaultDate]);                           // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (defaultShortTrip) setForm(f => ({ ...f, shortTrip: defaultShortTrip }));
  }, [defaultShortTrip]);                      // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (defaultTour)      setForm(f => ({ ...f, tour:      defaultTour }));
  }, [defaultTour]);                           // eslint-disable-line react-hooks/exhaustive-deps

  const [errors,    setErrors]    = useState({});
  const [focus,     setFocus]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);
  const firstErrRef = useRef(null);

  /* ── Translated strings ─────────────────────────────────────── */
  const L = useMemo(() => ({
    fullName:        localized(cc.form.fullName),
    email:           localized(cc.form.email),
    phone:           localized(cc.form.phone),
    preferredJourney:localized(cc.form.preferredJourney),
    preferredShortTrip: localized(cc.form.preferredShortTrip),
    selectJourney:   localized(cc.form.selectJourney),
    selectShortTrip: localized(cc.form.selectShortTrip),
    chooseHint:      localized(cc.form.chooseHint),
    travellers:      localized(cc.form.travellers),
    preferredLang:   localized(cc.form.preferredLang),
    langEn:          localized(cc.form.langEn),
    langEs:          localized(cc.form.langEs),
    message:         localized(cc.form.message),
    messagePlaceholder: localized(cc.form.messagePlaceholder),
    privacy:         localized(cc.form.privacy),
    submit:          localized(cc.form.submit),
    submitting:      localized(cc.form.submitting),
    successTitle:    localized(cc.form.successTitle),
    successBody:     localized(cc.form.successBody),
    whatsappCta:     localized(cc.form.whatsappCta),
    emailCta:        localized(cc.form.emailCta),
    orReach:         localized(cc.form.orReach),
    validName:       localized(cc.form.validName),
    validEmail:      localized(cc.form.validEmail),
  }), [lang, localized]);                      // eslint-disable-line react-hooks/exhaustive-deps

  /* ── validation ─────────────────────────────────────────────── */
  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = L.validName;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = L.validEmail;
    return e;
  };

  /* ── handlers ───────────────────────────────────────────────── */
  const handleChange = (e) => {
    setForm(f    => ({ ...f,   [e.target.name]: e.target.value }));
    setErrors(err => ({ ...err, [e.target.name]: '' }));
  };

  const ctrlStyle = (field) => {
    if (errors[field]) return ctrlErr;
    if (focus[field])  return ctrlFocus;
    return ctrl;
  };

  /* Focus first invalid field on failed submit */
  useEffect(() => {
    if (Object.keys(errors).length && firstErrRef.current) {
      firstErrRef.current.focus();
    }
  }, [errors]);

  /* ── payload builders ───────────────────────────────────────── */
  const shortTripDisplay = form.shortTrip
    ? (parseShortTripValue(form.shortTrip, lang)?.displayLabel ?? form.shortTrip)
    : null;

  const selectedJourneyLabel = form.tour
    ? (journeyOptions.find(o => o.value === form.tour)?.label ?? form.tour)
    : null;

  const buildWA = () => {
    const lines = [
      `*Enquiry — Indian Routes & Trails*`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone         ? `Phone: ${form.phone}`                    : null,
      selectedJourneyLabel ? `Journey: ${selectedJourneyLabel}`      : null,
      shortTripDisplay   ? `Short Trip: ${shortTripDisplay}`         : null,
      form.date          ? `Travel Date: ${form.date}`               : null,
      `Travellers: ${form.travellers}`,
      form.prefLang      ? `Preferred Language: ${form.prefLang}`    : null,
      form.message       ? `Message: ${form.message}`                : null,
    ].filter(Boolean);
    return encodeURIComponent(lines.join('\n'));
  };

  const buildMailto = () => {
    const sub  = encodeURIComponent(`Enquiry from ${form.name} — Indian Routes & Trails`);
    const body = encodeURIComponent([
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || '—'}`,
      `Journey: ${selectedJourneyLabel || '—'}`,
      `Short Trip: ${shortTripDisplay || '—'}`,
      `Date: ${form.date || '—'}`,
      `Travellers: ${form.travellers}`,
      `Preferred Language: ${form.prefLang || '—'}`,
      `Message: ${form.message || '—'}`,
    ].join('\n'));
    return `mailto:${siteConfig.contact.emails[0]}?subject=${sub}&body=${body}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSending(true);
    // Simulate async (replace with real API call if needed)
    setTimeout(() => { setSending(false); setSubmitted(true); }, 400);
  };

  /* ── success state ──────────────────────────────────────────── */
  if (submitted) {
    return (
      <div
        className="text-center py-10 px-4"
        role="status"
        aria-live="polite"
        aria-label={L.successTitle}
      >
        <CheckCircle size={44} className="mx-auto mb-4"
          style={{ color: 'var(--color-primary)' }} strokeWidth={1.5} />
        <h3 className="font-serif text-2xl font-light mb-3"
          style={{ color: 'var(--color-text)' }}>
          {L.successTitle}
        </h3>
        <p className="font-sans text-sm font-light mb-8 max-w-sm mx-auto"
          style={{ color: 'var(--color-text-muted)' }}>
          {L.successBody}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${buildWA()}`}
            target="_blank" rel="noopener noreferrer" className="btn-indigo">
            <MessageCircle size={15} /> {L.whatsappCta}
          </a>
          <a href={buildMailto()} className="btn-outline">
            <Mail size={15} /> {L.emailCta}
          </a>
        </div>
      </div>
    );
  }

  /* ── form ───────────────────────────────────────────────────── */
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}
      aria-label={localized(cc.form.heading)}
    >
      {/*
        .ef-grid  : 1-col mobile, 2-col ≥640px
        .ef-span2 : always full width
        min-width:0 on every child via .ef-grid > *
      */}
      <div className="ef-grid">

        {/* ── Full Name ───────────────────────────────────────── */}
        <div>
          <label htmlFor="ef-name" style={lbl}>
            {L.fullName}{' '}
            <span style={{ color: 'var(--color-secondary)' }} aria-hidden="true">*</span>
          </label>
          <input
            id="ef-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={L.fullName}
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'ef-name-err' : undefined}
            ref={errors.name ? firstErrRef : undefined}
            style={ctrlStyle('name')}
            onFocus={() => setFocus(f => ({ ...f, name: true }))}
            onBlur={()  => setFocus(f => ({ ...f, name: false }))}
          />
          {errors.name && (
            <p id="ef-name-err" role="alert"
              style={{ fontSize: '11px', color: 'var(--color-error)', marginTop: '5px' }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* ── Email ───────────────────────────────────────────── */}
        <div>
          <label htmlFor="ef-email" style={lbl}>
            {L.email}{' '}
            <span style={{ color: 'var(--color-secondary)' }} aria-hidden="true">*</span>
          </label>
          <input
            id="ef-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'ef-email-err' : undefined}
            ref={!errors.name && errors.email ? firstErrRef : undefined}
            style={ctrlStyle('email')}
            onFocus={() => setFocus(f => ({ ...f, email: true }))}
            onBlur={()  => setFocus(f => ({ ...f, email: false }))}
          />
          {errors.email && (
            <p id="ef-email-err" role="alert"
              style={{ fontSize: '11px', color: 'var(--color-error)', marginTop: '5px' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* ── Phone ───────────────────────────────────────────── */}
        <div>
          <label htmlFor="ef-phone" style={lbl}>{L.phone}</label>
          <input
            id="ef-phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 234 567 8900"
            autoComplete="tel"
            style={ctrlStyle('phone')}
            onFocus={() => setFocus(f => ({ ...f, phone: true }))}
            onBlur={()  => setFocus(f => ({ ...f, phone: false }))}
          />
        </div>

        {/* ── Preferred Journey ───────────────────────────────── */}
        <div>
          <label htmlFor="ef-tour" style={lbl}>{L.preferredJourney}</label>
          <div style={{ position: 'relative' }}>
            <select
              id="ef-tour"
              name="tour"
              value={form.tour}
              onChange={handleChange}
              style={{
                ...ctrlStyle('tour'),
                appearance: 'none', cursor: 'pointer',
                paddingRight: '2.25rem',
              }}
              onFocus={() => setFocus(f => ({ ...f, tour: true }))}
              onBlur={()  => setFocus(f => ({ ...f, tour: false }))}
            >
              <option value="">{L.selectJourney}</option>
              {journeyOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <span style={{
              position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
              pointerEvents: 'none', color: 'var(--color-text-muted)',
            }}>▾</span>
          </div>
        </div>

        {/* ── Preferred Short Trip — full width ───────────────── */}
        <div className="ef-span2">
          <label htmlFor="ef-shorttrip" style={lbl}>{L.preferredShortTrip}</label>
          <div style={{ position: 'relative' }}>
            <select
              id="ef-shorttrip"
              name="shortTrip"
              value={form.shortTrip}
              onChange={handleChange}
              style={{
                ...ctrlStyle('shortTrip'),
                appearance: 'none', cursor: 'pointer',
                paddingRight: '2.25rem',
              }}
              onFocus={() => setFocus(f => ({ ...f, shortTrip: true }))}
              onBlur={()  => setFocus(f => ({ ...f, shortTrip: false }))}
            >
              <option value="">{L.selectShortTrip}</option>
              {SHORT_TRIP_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <span style={{
              position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
              pointerEvents: 'none', color: 'var(--color-text-muted)',
            }}>▾</span>
          </div>
        </div>

        {/* ── Helper text ─────────────────────────────────────── */}
        <div className="ef-span2" style={{ marginTop: '-6px' }}>
          <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0 }}>
            {L.chooseHint}
          </p>
        </div>

        {/* ── Travel Date — full width ─────────────────────────── */}
        <div className="ef-span2">
          <FormDatePicker
            value={form.date}
            onChange={(iso) => setForm(f => ({ ...f, date: iso }))}
            labelStyle={lbl}
            initialMonth={defaultDate}
          />
        </div>

        {/* ── Travellers ──────────────────────────────────────── */}
        <div>
          <label htmlFor="ef-travellers" style={lbl}>{L.travellers}</label>
          <input
            id="ef-travellers"
            type="number"
            name="travellers"
            value={form.travellers}
            onChange={handleChange}
            min={1}
            max={50}
            style={ctrlStyle('travellers')}
            onFocus={() => setFocus(f => ({ ...f, travellers: true }))}
            onBlur={()  => setFocus(f => ({ ...f, travellers: false }))}
          />
        </div>

        {/* ── Preferred Language ──────────────────────────────── */}
        <div>
          <label htmlFor="ef-preflang" style={lbl}>{L.preferredLang}</label>
          <div style={{ position: 'relative' }}>
            <select
              id="ef-preflang"
              name="prefLang"
              value={form.prefLang}
              onChange={handleChange}
              style={{
                ...ctrlStyle('prefLang'),
                appearance: 'none', cursor: 'pointer',
                paddingRight: '2.25rem',
              }}
              onFocus={() => setFocus(f => ({ ...f, prefLang: true }))}
              onBlur={()  => setFocus(f => ({ ...f, prefLang: false }))}
            >
              <option value=""></option>
              <option value="en">{L.langEn}</option>
              <option value="es">{L.langEs}</option>
            </select>
            <span style={{
              position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
              pointerEvents: 'none', color: 'var(--color-text-muted)',
            }}>▾</span>
          </div>
        </div>
      </div>

      {/* ── Message — full width, outside grid ──────────────────── */}
      <div>
        <label htmlFor="ef-message" style={lbl}>{L.message}</label>
        <textarea
          id="ef-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder={L.messagePlaceholder}
          style={{
            ...ctrlStyle('message'),
            height: 'auto',
            minHeight: '130px',
            padding: '0.75rem 0.9rem',
            resize: 'none',
          }}
          onFocus={() => setFocus(f => ({ ...f, message: true }))}
          onBlur={()  => setFocus(f => ({ ...f, message: false }))}
        />
      </div>

      {/* ── Privacy note ────────────────────────────────────────── */}
      <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
        {L.privacy}
      </p>

      {/* ── Submit ──────────────────────────────────────────────── */}
      <button
        type="submit"
        disabled={sending}
        className="btn-primary"
        style={{ justifyContent: 'center', width: '100%', opacity: sending ? 0.7 : 1 }}
      >
        {sending ? L.submitting : L.submit}
        {!sending && <ArrowRight size={15} aria-hidden="true" />}
      </button>

      {/* ── Direct contact strip ────────────────────────────────── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px',
        paddingTop: '8px', borderTop: '1px solid var(--color-border)',
      }}>
        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
          {L.orReach}
        </span>
        <a href={`https://wa.me/${siteConfig.contact.whatsapp}`}
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '11px', color: 'var(--color-primary)' }}>
          <MessageCircle size={12} aria-hidden="true" /> WhatsApp
        </a>
        <a href={`mailto:${siteConfig.contact.emails[0]}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '11px', color: 'var(--color-primary)' }}>
          <Mail size={12} aria-hidden="true" /> Email
        </a>
      </div>
    </form>
  );
}
