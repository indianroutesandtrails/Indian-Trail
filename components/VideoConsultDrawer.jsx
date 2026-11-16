'use client';
/**
 * VideoConsultDrawer
 * ─────────────────────────────────────────────────────────────────
 * Slide-in drawer with a quick "Free Video Consultation" booking form.
 * First call is free — user picks a time slot + timezone, adds a message.
 * On submit, opens a WhatsApp pre-fill as the delivery channel (no backend needed).
 *
 * Accessibility: role="dialog", focus trap, Escape closes, body scroll lock.
 */

import { useState, useEffect, useRef } from 'react';
import { X, Video, Clock, Globe, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteContent';

/* ── Focus trap ──────────────────────────────────────────────────── */
const FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';
function trapFocus(e, ref) {
  const els = Array.from(ref.current?.querySelectorAll(FOCUSABLE) ?? []);
  if (!els.length) return;
  const first = els[0], last = els[els.length - 1];
  if (e.key !== 'Tab') return;
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* ── Shared input styles ─────────────────────────────────────────── */
const ctrl = {
  display: 'block', width: '100%', boxSizing: 'border-box',
  padding: '0.6rem 0.85rem',
  backgroundColor: 'var(--color-surface-alt)',
  border: '1px solid var(--color-border)',
  fontFamily: 'var(--font-body, system-ui)',
  fontSize: '0.875rem', color: 'var(--color-text)',
  outline: 'none', borderRadius: 'var(--radius-control)',
  transition: 'border-color 200ms ease',
};
const lbl = {
  display: 'block',
  fontFamily: 'var(--font-body, system-ui)',
  fontSize: '0.65rem', fontWeight: 500,
  letterSpacing: '0.15em', textTransform: 'uppercase',
  color: 'var(--color-text-muted)', marginBottom: '6px',
};

/* ── Time slots ──────────────────────────────────────────────────── */
const TIME_SLOTS = [
  '08:00 – 09:00',
  '09:00 – 10:00',
  '10:00 – 11:00',
  '11:00 – 12:00',
  '14:00 – 15:00',
  '15:00 – 16:00',
  '16:00 – 17:00',
  '17:00 – 18:00',
  '18:00 – 19:00',
  '19:00 – 20:00',
];

/* ── Timezones (most common for Om's audience) ───────────────────── */
const TIMEZONES = [
  { value: 'IST',  label: 'IST — India Standard Time (UTC+5:30)' },
  { value: 'CET',  label: 'CET — Central European Time (UTC+1)' },
  { value: 'CEST', label: 'CEST — Central European Summer (UTC+2)' },
  { value: 'GMT',  label: 'GMT — Greenwich Mean Time (UTC+0)' },
  { value: 'EST',  label: 'EST — Eastern Standard Time (UTC-5)' },
  { value: 'CST',  label: 'CST — Central Standard Time (UTC-6)' },
  { value: 'MST',  label: 'MST — Mountain Standard Time (UTC-7)' },
  { value: 'PST',  label: 'PST — Pacific Standard Time (UTC-8)' },
  { value: 'BRT',  label: 'BRT — Brasília Time (UTC-3)' },
  { value: 'ART',  label: 'ART — Argentina Time (UTC-3)' },
  { value: 'CLT',  label: 'CLT — Chile Standard Time (UTC-4)' },
  { value: 'COT',  label: 'COT — Colombia Time (UTC-5)' },
  { value: 'MEX',  label: 'CST — Mexico City (UTC-6)' },
  { value: 'SGT',  label: 'SGT — Singapore Time (UTC+8)' },
  { value: 'JST',  label: 'JST — Japan Standard Time (UTC+9)' },
  { value: 'AEST', label: 'AEST — Australian Eastern (UTC+10)' },
];

function buildWhatsAppMsg(form) {
  return encodeURIComponent(
    `Hi Om! I'd like to book a FREE 10-minute video consultation.\n\n` +
    `Name: ${form.name}\n` +
    `Email: ${form.email}\n` +
    `Phone: ${form.phone || '—'}\n` +
    `Preferred time: ${form.slot} (${form.timezone})\n` +
    `Message: ${form.message || '—'}\n\n` +
    `Please confirm the meeting link. Looking forward to it!`
  );
}

export default function VideoConsultDrawer({ open, onClose, triggerRef, id }) {
  const panelRef = useRef(null);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', slot: '', timezone: 'IST', message: '',
  });
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [focused,   setFocused]   = useState({});

  /* Reset on close */
  useEffect(() => {
    if (!open) {
      setTimeout(() => { setSubmitted(false); setErrors({}); }, 350);
    }
  }, [open]);

  /* Body scroll lock */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  /* Focus management */
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => panelRef.current?.querySelector(FOCUSABLE)?.focus(), 320);
      return () => clearTimeout(t);
    } else {
      triggerRef?.current?.focus();
    }
  }, [open, triggerRef]);

  /* Keyboard */
  useEffect(() => {
    if (!open) return;
    const h = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      trapFocus(e, panelRef);
    };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [open, onClose]);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const setFocus = (k, v) => setFocused(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Please enter your name';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.slot)         e.slot  = 'Please pick a time slot';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    const url = `https://wa.me/${siteConfig.contact.whatsapp}?text=${buildWhatsAppMsg(form)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const inputStyle = (k) => ({
    ...ctrl,
    borderColor: errors[k] ? 'var(--color-error)' : focused[k] ? 'var(--color-primary)' : undefined,
  });

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 59,
          backgroundColor: 'rgba(20,20,43,0.55)',
          backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
          animation: 'fadeIn 250ms ease forwards',
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby="vconsult-drawer-title"
        style={{
          position: 'fixed', zIndex: 60,
          top: 0, right: 0, bottom: 0,
          width: 'min(420px, 100vw)',
          backgroundColor: 'var(--color-surface)',
          boxShadow: '-4px 0 32px rgba(20,20,43,0.18)',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
          animation: 'slideInRight 300ms cubic-bezier(0.4,0,0.2,1) forwards',
        }}
      >
        {/* ── Header ─────────────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 20px 14px',
          borderBottom: '1px solid var(--color-border)', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Video size={18} style={{ color: 'var(--color-primary)' }} />
            <div>
              <h2
                id="vconsult-drawer-title"
                style={{
                  fontFamily: 'var(--font-display, Georgia, serif)',
                  fontSize: '1.1rem', fontWeight: 400,
                  color: 'var(--color-text)', margin: 0,
                }}
              >
                Free Video Consultation
              </h2>
              <p style={{
                fontFamily: 'var(--font-body, system-ui)',
                fontSize: '11px', color: 'var(--color-secondary)',
                margin: '2px 0 0', fontWeight: 500, letterSpacing: '0.04em',
              }}>
                ✦ First call is completely free — 10 mins
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close video consultation form"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px', borderRadius: '50%',
              border: 'none', backgroundColor: 'transparent',
              cursor: 'pointer', color: 'var(--color-text-muted)',
              transition: 'background-color 180ms ease',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-alt)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Body ───────────────────────────────────────────── */}
        {submitted ? (
          /* Success state */
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '40px 28px', textAlign: 'center', gap: '16px',
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              backgroundColor: 'rgba(37,193,104,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <CheckCircle size={32} style={{ color: '#25C168' }} />
            </div>
            <h3 style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: '1.3rem', fontWeight: 400,
              color: 'var(--color-text)', margin: 0,
            }}>
              Request Sent!
            </h3>
            <p style={{
              fontFamily: 'var(--font-body, system-ui)',
              fontSize: '0.875rem', color: 'var(--color-text-muted)',
              margin: 0, lineHeight: 1.6, maxWidth: '300px',
            }}>
              Your message has been sent to Om via WhatsApp. He will confirm
              your video call slot personally — usually within a few hours.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: '8px', padding: '10px 28px',
                backgroundColor: 'var(--color-primary)', color: '#fff',
                border: 'none', borderRadius: 'var(--radius-control)',
                fontFamily: 'var(--font-body, system-ui)',
                fontSize: '11px', letterSpacing: '0.16em',
                textTransform: 'uppercase', cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Close
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} noValidate style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

            {/* ── Info banner ───────────────────────────────── */}
            <div style={{
              margin: '16px 20px 0',
              padding: '12px 14px',
              backgroundColor: 'rgba(27,42,94,0.06)',
              border: '1px solid rgba(27,42,94,0.12)',
              borderRadius: 'var(--radius-control)',
            }}>
              <p style={{
                fontFamily: 'var(--font-body, system-ui)',
                fontSize: '12px', color: 'var(--color-text-muted)',
                margin: 0, lineHeight: 1.6,
              }}>
                Book a <strong style={{ color: 'var(--color-text)' }}>free 10-minute video call</strong> with Om
                to discuss your India journey. Available via Google Meet, Zoom, or WhatsApp Video.
              </p>
            </div>

            {/* ── Fields ────────────────────────────────────── */}
            <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>

              {/* Name */}
              <div>
                <label htmlFor="vc-name" style={lbl}>
                  <User size={9} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                  Full Name *
                </label>
                <input
                  id="vc-name" type="text" autoComplete="name"
                  placeholder="Your full name"
                  value={form.name} onChange={set('name')}
                  onFocus={() => setFocus('name', true)} onBlur={() => setFocus('name', false)}
                  style={inputStyle('name')}
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? 'vc-name-err' : undefined}
                />
                {errors.name && <p id="vc-name-err" style={{ fontSize: '11px', color: 'var(--color-error)', margin: '4px 0 0' }}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="vc-email" style={lbl}>
                  <Mail size={9} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                  Email Address *
                </label>
                <input
                  id="vc-email" type="email" autoComplete="email"
                  placeholder="your@email.com"
                  value={form.email} onChange={set('email')}
                  onFocus={() => setFocus('email', true)} onBlur={() => setFocus('email', false)}
                  style={inputStyle('email')}
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? 'vc-email-err' : undefined}
                />
                {errors.email && <p id="vc-email-err" style={{ fontSize: '11px', color: 'var(--color-error)', margin: '4px 0 0' }}>{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="vc-phone" style={lbl}>
                  <Phone size={9} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                  Phone / WhatsApp <span style={{ opacity: 0.6 }}>(optional)</span>
                </label>
                <input
                  id="vc-phone" type="tel" autoComplete="tel"
                  placeholder="+1 234 567 8900"
                  value={form.phone} onChange={set('phone')}
                  onFocus={() => setFocus('phone', true)} onBlur={() => setFocus('phone', false)}
                  style={inputStyle('phone')}
                />
              </div>

              {/* Time slot */}
              <div>
                <label htmlFor="vc-slot" style={lbl}>
                  <Clock size={9} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                  Preferred Time Slot *
                </label>
                <select
                  id="vc-slot"
                  value={form.slot} onChange={set('slot')}
                  onFocus={() => setFocus('slot', true)} onBlur={() => setFocus('slot', false)}
                  style={{ ...inputStyle('slot'), cursor: 'pointer', appearance: 'auto' }}
                  aria-invalid={!!errors.slot} aria-describedby={errors.slot ? 'vc-slot-err' : undefined}
                >
                  <option value="">Select a time...</option>
                  {TIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.slot && <p id="vc-slot-err" style={{ fontSize: '11px', color: 'var(--color-error)', margin: '4px 0 0' }}>{errors.slot}</p>}
              </div>

              {/* Timezone */}
              <div>
                <label htmlFor="vc-tz" style={lbl}>
                  <Globe size={9} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                  Your Timezone
                </label>
                <select
                  id="vc-tz"
                  value={form.timezone} onChange={set('timezone')}
                  onFocus={() => setFocus('timezone', true)} onBlur={() => setFocus('timezone', false)}
                  style={{ ...inputStyle('timezone'), cursor: 'pointer', appearance: 'auto' }}
                >
                  {TIMEZONES.map(tz => <option key={tz.value} value={tz.value}>{tz.label}</option>)}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="vc-msg" style={lbl}>
                  <MessageSquare size={9} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                  What would you like to discuss? <span style={{ opacity: 0.6 }}>(optional)</span>
                </label>
                <textarea
                  id="vc-msg" rows={3}
                  placeholder="e.g. Golden Triangle 10 days, budget, best season..."
                  value={form.message} onChange={set('message')}
                  onFocus={() => setFocus('message', true)} onBlur={() => setFocus('message', false)}
                  style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '72px' }}
                />
              </div>

            </div>

            {/* ── Footer ────────────────────────────────────── */}
            <div style={{ padding: '20px', flexShrink: 0 }}>
              <button
                type="submit"
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '13px 20px',
                  backgroundColor: 'var(--color-primary)', color: '#fff',
                  border: 'none', borderRadius: 'var(--radius-control)',
                  fontFamily: 'var(--font-body, system-ui)',
                  fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase',
                  fontWeight: 600, cursor: 'pointer',
                  transition: 'background-color 180ms ease, transform 180ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(27,42,94,0.85)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; }}
              >
                <Video size={14} aria-hidden="true" />
                Book Free Video Call via WhatsApp
              </button>
              <p style={{
                fontFamily: 'var(--font-body, system-ui)',
                fontSize: '10px', color: 'var(--color-text-muted)',
                textAlign: 'center', margin: '10px 0 0', lineHeight: 1.5,
              }}>
                This opens WhatsApp with your details pre-filled. Om replies personally.
              </p>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
