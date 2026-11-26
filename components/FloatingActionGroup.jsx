'use client';
/**
 * FloatingActionGroup
 * ───────────────────────────────────────────────────────────────
 * Fixed UI layer rendered once globally via layout.js.
 *
 * Desktop (≥1024px):
 *   Right side: "Check Availability" tab (above centre)
 *               "Free Video Call" tab    (below centre)
 *   Left side:  EN / ES language tab     (vertically centred)
 *   Social proof ticker                  (above WhatsApp button)
 *
 * Mobile (<1024px):
 *   Bottom-right stack (bottom → top):
 *     WhatsApp → CalendarDays → Video
 *   Bottom-left: compact EN | ES language pill
 *
 * Z-index stack:
 *   WhatsApp / ticker: 50
 *   Edge tabs:         55
 *   Backdrop:          59
 *   Drawers:           60
 */

import { useState, useEffect, useRef } from 'react';
import { CalendarDays, Languages, Video } from 'lucide-react';
import { siteConfig } from '@/data/siteContent';
import AvailabilityDrawer from './AvailabilityDrawer';
import VideoConsultDrawer from './VideoConsultDrawer';
import { useLang } from '@/lib/LanguageContext';

/* ── Design tokens ───────────────────────────────────────────────── */
const SHADOW_REST = [
  '-4px 0 20px rgba(20, 20, 43, 0.28)',
  '0 0 18px rgba(232, 163, 23, 0.14)',
].join(', ');

const SHADOW_HOVER = [
  '-4px 0 24px rgba(20, 20, 43, 0.34)',
  '0 0 24px rgba(232, 163, 23, 0.26)',
  '0 0 6px  rgba(232, 163, 23, 0.18)',
].join(', ');

const SHADOW_MOBILE = '0 4px 16px rgba(27, 42, 94, 0.32), 0 0 12px rgba(232,163,23,0.12)';
const BG_REST       = 'rgba(27, 42, 94, 0.91)';
const BG_HOVER      = 'rgba(46, 68, 145, 0.94)';

/* ── Social proof messages ───────────────────────────────────────── */
const SOCIAL_MSGS = [
  { name: 'Carlos M.',   flag: '🇲🇽', msg: 'Can we do a quick video consultation?' },
  { name: 'Sophie L.',   flag: '🇫🇷', msg: 'First call was amazing — booked our tour!' },
  { name: 'Ramón V.',    flag: '🇪🇸', msg: 'Free intro call really helped us plan.' },
  { name: 'Priya K.',    flag: '🇸🇬', msg: 'Om answered all my questions on the call 🙏' },
  { name: 'James T.',    flag: '🇬🇧', msg: 'Great meeting — Rajasthan trip confirmed!' },
  { name: 'María G.',    flag: '🇦🇷', msg: 'Highly recommend the free video call!' },
  { name: 'David W.',    flag: '🇺🇸', msg: 'It was a great meeting ahead 😊' },
  { name: 'Lucía R.',    flag: '🇨🇴', msg: 'First call free — absolutely worth it!' },
  { name: 'Takashi N.',  flag: '🇯🇵', msg: 'Very personal and helpful consultation.' },
  { name: 'Isabelle D.', flag: '🇩🇪', msg: "Book the free call, you won't regret it!" },
];

/* ── SocialProofTicker ───────────────────────────────────────────── */
function SocialProofTicker({ waVisible, onVideoClick }) {
  const [idx,     setIdx]     = useState(0);   // always 0 on server & first client render
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Randomise index only after hydration — safe from SSR mismatch
    setIdx(Math.floor(Math.random() * SOCIAL_MSGS.length));
    setMounted(true);
    const delay = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % SOCIAL_MSGS.length);
        setVisible(true);
      }, 500);
    }, 6000);
    return () => clearInterval(timer);
  }, [mounted]);

  const msg = SOCIAL_MSGS[idx];

  return (
    <div
      className="hidden lg:block"
      style={{
        position:      'fixed',
        right:         '20px',
        bottom:        `calc(${waVisible ? '76px' : '24px'} + 56px + env(safe-area-inset-bottom, 0px))`,
        zIndex:        50,
        maxWidth:      '240px',
        opacity:       visible ? 1 : 0,
        transform:     visible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.97)',
        transition:    'opacity 400ms ease, transform 400ms ease, bottom 300ms ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <button
        onClick={onVideoClick}
        title="Book a free video consultation"
        style={{
          display:              'flex',
          flexDirection:        'column',
          alignItems:           'flex-start',
          gap:                  '6px',
          padding:              '10px 12px',
          backgroundColor:      'rgba(16, 20, 52, 0.96)',
          border:               '1px solid rgba(240, 220, 168, 0.20)',
          borderRadius:         '12px',
          backdropFilter:       'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow:            '0 8px 24px rgba(14,16,40,0.45)',
          cursor:               'pointer',
          textAlign:            'left',
          width:                '100%',
          transition:           'transform 160ms ease, box-shadow 160ms ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = '0 10px 28px rgba(14,16,40,0.55)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(14,16,40,0.45)';
        }}
      >
        {/* Badge row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span style={{
            display:         'inline-flex', alignItems: 'center', gap: '4px',
            padding:         '2px 7px',
            backgroundColor: 'rgba(232,163,23,0.18)',
            border:          '1px solid rgba(232,163,23,0.30)',
            borderRadius:    '999px',
            fontFamily:      'var(--font-body, system-ui)',
            fontSize:        '9px', fontWeight: 600,
            letterSpacing:   '0.12em', textTransform: 'uppercase',
            color:           '#E8A317',
          }}>
            <Video size={8} aria-hidden="true" />
            Free Call
          </span>
          <span style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: '9px', color: 'rgba(251,247,239,0.35)' }}>
            {msg.flag} {msg.name}
          </span>
        </div>

        {/* Message */}
        <p style={{
          fontFamily: 'var(--font-body, system-ui)',
          fontSize:   '11.5px', color: 'rgba(251,247,239,0.88)',
          margin: 0, lineHeight: 1.45, fontStyle: 'italic',
        }}>
          "{msg.msg}"
        </p>

        {/* CTA hint */}
        <span style={{
          fontFamily:    'var(--font-body, system-ui)',
          fontSize:      '9px', fontWeight: 500,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color:         'rgba(232,163,23,0.70)',
        }}>
          Book yours →
        </span>
      </button>
    </div>
  );
}

/* ── Desktop edge tab (right side) ──────────────────────────────── */
function DesktopEdgeTab({ icon: Icon, label, onClick, interacting, setInteracting, hidden }) {
  return (
    <div
      className="avail-tab-desktop-wrapper"
      style={{
        opacity:       hidden ? 0 : 1,
        pointerEvents: hidden ? 'none' : 'auto',
        transition:    'opacity 220ms ease',
      }}
    >
      <span
        className={`avail-tab-nudge${interacting ? ' avail-tab-nudge--paused' : ''}`}
        style={{
          display:    'block',
          transform:  interacting ? 'translateX(0px)' : undefined,
          transition: interacting ? 'transform 200ms ease-out' : undefined,
        }}
      >
        <button
          type="button"
          onClick={onClick}
          onMouseEnter={() => setInteracting(true)}
          onMouseLeave={() => setInteracting(false)}
          onFocus={() => setInteracting(true)}
          onBlur={() => setInteracting(false)}
          aria-label={label}
          style={{
            appearance: 'none', padding: 0, border: 'none',
            background: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'stretch',
            outline: 'none', borderRadius: '12px 0 0 12px',
          }}
        >
          {/* Icon cell */}
          <span
            aria-hidden="true"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '54px', height: '56px', flexShrink: 0,
              backgroundColor:      interacting ? BG_HOVER : BG_REST,
              backdropFilter:       'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius:    '12px 0 0 12px',
              border:          '1px solid rgba(240, 220, 168, 0.22)',
              borderRight:     'none',
              boxShadow:       interacting ? SHADOW_HOVER : SHADOW_REST,
              transition:      'background-color 200ms ease, box-shadow 220ms ease',
            }}
          >
            <Icon
              size={22} strokeWidth={1.7} aria-hidden="true"
              style={{
                color: '#FBF7EF', display: 'block', flexShrink: 0,
                transform:  interacting ? 'scale(1.06)' : 'scale(1)',
                transition: 'transform 200ms ease',
              }}
            />
          </span>

          {/* Label panel — slides out on hover */}
          <span
            aria-hidden="true"
            style={{
              display: 'flex', alignItems: 'center',
              height: '56px', overflow: 'hidden', whiteSpace: 'nowrap',
              maxWidth:        interacting ? '148px' : '0px',
              paddingLeft:     interacting ? '10px'  : '0px',
              paddingRight:    interacting ? '16px'  : '0px',
              backgroundColor:      interacting ? BG_HOVER : BG_REST,
              backdropFilter:       'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderTop:    '1px solid rgba(240, 220, 168, 0.22)',
              borderBottom: '1px solid rgba(240, 220, 168, 0.22)',
              borderLeft:   'none',
              borderRight:  'none',
              boxShadow:    interacting ? SHADOW_HOVER : 'none',
              transition: [
                'max-width 220ms ease',
                'padding-left 220ms ease',
                'padding-right 220ms ease',
                'background-color 200ms ease',
                'box-shadow 220ms ease',
              ].join(', '),
              pointerEvents: 'none',
            }}
          >
            <span style={{
              fontFamily:    'var(--font-body, system-ui)',
              fontSize:      '10px', fontWeight: 600,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color:         '#FBF7EF', whiteSpace: 'nowrap', lineHeight: 1,
            }}>
              {label}
            </span>
          </span>
        </button>
      </span>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export default function FloatingActionGroup() {
  const [availOpen,  setAvailOpen]  = useState(false);
  const [videoOpen,  setVideoOpen]  = useState(false);
  const [waVisible,  setWaVisible]  = useState(false);
  const [availHover, setAvailHover] = useState(false);
  const [videoHover, setVideoHover] = useState(false);
  const [langHover,  setLangHover]  = useState(false);
  const { lang, setLang } = useLang();
  const availBtnRef = useRef(null);
  const videoBtnRef = useRef(null);

  const anyOpen = availOpen || videoOpen;

  /* WhatsApp: appear after 400 px scroll */
  useEffect(() => {
    const onScroll = () => setWaVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          RIGHT SIDE — desktop tabs, stacked above/below centre
          ══════════════════════════════════════════════════════ */}
      <div className="hidden lg:block" style={{ position: 'fixed', right: 0, zIndex: 55, top: 'calc(50% - 64px)' }}>
        <DesktopEdgeTab
          icon={CalendarDays}
          label="Check Availability"
          onClick={() => setAvailOpen(true)}
          interacting={availHover}
          setInteracting={setAvailHover}
          hidden={anyOpen}
        />
      </div>

      <div className="hidden lg:block" style={{ position: 'fixed', right: 0, zIndex: 55, top: 'calc(50% + 8px)' }}>
        <DesktopEdgeTab
          icon={Video}
          label="Free Video Call"
          onClick={() => setVideoOpen(true)}
          interacting={videoHover}
          setInteracting={setVideoHover}
          hidden={anyOpen}
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          LEFT SIDE — language tab, desktop only
          ══════════════════════════════════════════════════════ */}
      <div
        className="hidden lg:block"
        style={{ position: 'fixed', top: '50%', left: 0, zIndex: 55, transform: 'translateY(-50%)' }}
        onMouseEnter={() => setLangHover(true)}
        onMouseLeave={() => setLangHover(false)}
      >
        {/* lang-tab-nudge handles X animation only — translateY never on this element */}
        <div className={`lang-tab-nudge${langHover ? ' lang-tab-nudge--paused' : ''}`}>
          <div
            role="group"
            aria-label="Language selection"
            style={{
              display: 'flex', alignItems: 'stretch',
              borderRadius: '0 12px 12px 0',
            }}
          >
          {/* Icon cell */}
          <span
            aria-hidden="true"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '54px', height: '56px', flexShrink: 0,
              backgroundColor:      langHover ? BG_HOVER : BG_REST,
              backdropFilter:       'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius:    langHover ? '0' : '0 12px 12px 0',
              border:          '1px solid rgba(240, 220, 168, 0.22)',
              borderLeft:      'none',
              boxShadow:       langHover ? SHADOW_HOVER : SHADOW_REST,
              transition:      'background-color 200ms ease, box-shadow 220ms ease, border-radius 220ms ease',
            }}
          >
            <Languages
              size={22} strokeWidth={1.7} aria-hidden="true"
              style={{
                color: '#FBF7EF', display: 'block', flexShrink: 0,
                transform:  langHover ? 'scale(1.06)' : 'scale(1)',
                transition: 'transform 200ms ease',
              }}
            />
          </span>

          {/* Expandable EN / ES panel */}
          <span
            style={{
              display: 'flex', alignItems: 'center',
              height: '56px', overflow: 'hidden',
              maxWidth:    langHover ? '100px' : '0px',
              paddingLeft: langHover ? '10px'  : '0px',
              paddingRight: langHover ? '14px' : '0px',
              gap: '0',
              backgroundColor:      langHover ? BG_HOVER : BG_REST,
              backdropFilter:       'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderTop:    '1px solid rgba(240, 220, 168, 0.22)',
              borderBottom: '1px solid rgba(240, 220, 168, 0.22)',
              borderRight:  '1px solid rgba(240, 220, 168, 0.22)',
              borderLeft:   'none',
              borderRadius: '0 12px 12px 0',
              boxShadow:    langHover ? SHADOW_HOVER : 'none',
              transition: [
                'max-width 220ms ease',
                'padding-left 220ms ease',
                'padding-right 220ms ease',
                'background-color 200ms ease',
                'box-shadow 220ms ease',
              ].join(', '),
            }}
          >
            {['en', 'es'].map((l, i) => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {i > 0 && (
                  <span aria-hidden="true" style={{ fontSize: '11px', color: 'rgba(240,220,168,0.35)', lineHeight: 1, userSelect: 'none' }}>|</span>
                )}
                <button
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  aria-label={l === 'en' ? 'Switch to English' : 'Cambiar a Español'}
                  style={{
                    fontFamily:    'var(--font-body, system-ui)',
                    fontSize:      '10px',
                    fontWeight:    lang === l ? 700 : 400,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color:         lang === l ? 'var(--color-secondary)' : 'rgba(251,247,239,0.60)',
                    whiteSpace:    'nowrap', lineHeight: 1,
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '4px 2px', transition: 'color 160ms ease',
                  }}
                >
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
          </span>
        </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBILE — compact buttons, stacked above WhatsApp
          CalendarDays sits directly above WhatsApp (+56px)
          Video sits one more slot above (+112px)
          ══════════════════════════════════════════════════════ */}
      {/* CalendarDays */}
      <div
        className="avail-tab-mobile-wrapper lg:hidden"
        style={{
          position:      'fixed', right: '20px', zIndex: 55,
          bottom:        `calc(${waVisible ? '76px' : '24px'} + 56px + env(safe-area-inset-bottom, 0px))`,
          opacity:       anyOpen ? 0 : 1,
          pointerEvents: anyOpen ? 'none' : 'auto',
          transition:    'bottom 300ms ease, opacity 200ms ease',
        }}
      >
        <button
          ref={availBtnRef}
          type="button"
          aria-label="Check availability"
          title="Check availability"
          onClick={() => setAvailOpen(true)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '48px', height: '48px', borderRadius: '12px',
            border: '1px solid rgba(240,220,168,0.20)',
            backgroundColor: BG_REST,
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            boxShadow: SHADOW_MOBILE, cursor: 'pointer',
            transition: 'background-color 200ms ease, transform 200ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = BG_HOVER; e.currentTarget.style.transform = 'scale(1.07)'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = BG_REST;  e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <CalendarDays size={22} strokeWidth={1.7} aria-hidden="true" style={{ color: '#FBF7EF', display: 'block' }} />
        </button>
      </div>

      {/* Video */}
      <div
        className="lg:hidden"
        style={{
          position:      'fixed', right: '20px', zIndex: 55,
          bottom:        `calc(${waVisible ? '76px' : '24px'} + 112px + env(safe-area-inset-bottom, 0px))`,
          opacity:       anyOpen ? 0 : 1,
          pointerEvents: anyOpen ? 'none' : 'auto',
          transition:    'bottom 300ms ease, opacity 200ms ease',
        }}
      >
        <button
          ref={videoBtnRef}
          type="button"
          aria-label="Book free video consultation"
          title="Free video consultation"
          onClick={() => setVideoOpen(true)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '48px', height: '48px', borderRadius: '12px',
            border: '1px solid rgba(240,220,168,0.20)',
            backgroundColor: BG_REST,
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            boxShadow: SHADOW_MOBILE, cursor: 'pointer',
            transition: 'background-color 200ms ease, transform 200ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = BG_HOVER; e.currentTarget.style.transform = 'scale(1.07)'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = BG_REST;  e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <Video size={20} strokeWidth={1.7} aria-hidden="true" style={{ color: '#FBF7EF', display: 'block' }} />
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBILE LANGUAGE TAB — bottom-left, compact, <1024px only
          Separate from right-side controls. No page x-scroll.
          ══════════════════════════════════════════════════════ */}
      <div
        className="lg:hidden"
        style={{
          position:      'fixed',
          left:          '16px',
          bottom:        'calc(24px + env(safe-area-inset-bottom, 0px))',
          zIndex:        55,
        }}
      >
        <div
          role="group"
          aria-label="Language selection"
          style={{
            display:              'flex',
            alignItems:           'center',
            gap:                  '0',
            height:               '40px',
            borderRadius:         '999px',
            backgroundColor:      BG_REST,
            backdropFilter:       'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border:               '1px solid rgba(240,220,168,0.22)',
            boxShadow:            SHADOW_MOBILE,
            padding:              '0 10px',
            overflow:             'hidden',
          }}
        >
          {['en', 'es'].map((l, i) => (
            <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {i > 0 && (
                <span
                  aria-hidden="true"
                  style={{ fontSize: '11px', color: 'rgba(240,220,168,0.30)', lineHeight: 1, userSelect: 'none' }}
                >
                  |
                </span>
              )}
              <button
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                aria-label={l === 'en' ? 'Switch to English' : 'Cambiar a Español'}
                style={{
                  fontFamily:    'var(--font-body, system-ui)',
                  fontSize:      '10px',
                  fontWeight:    lang === l ? 700 : 400,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color:         lang === l ? 'var(--color-secondary)' : 'rgba(251,247,239,0.55)',
                  whiteSpace:    'nowrap',
                  lineHeight:    1,
                  background:    'none',
                  border:        'none',
                  cursor:        'pointer',
                  padding:       '8px 4px',
                  minWidth:      '44px',
                  minHeight:     '44px',
                  display:       'flex',
                  alignItems:    'center',
                  justifyContent:'center',
                  transition:    'color 160ms ease',
                  appearance:    'none',
                }}
              >
                {l.toUpperCase()}
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SOCIAL PROOF TICKER — desktop only, above WhatsApp
          ══════════════════════════════════════════════════════ */}
      <SocialProofTicker waVisible={waVisible} onVideoClick={() => setVideoOpen(true)} />

      {/* ══════════════════════════════════════════════════════
          WHATSAPP — scroll-triggered, all sizes
          ══════════════════════════════════════════════════════ */}
      <a
        href={`https://wa.me/${siteConfig.contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Om on WhatsApp"
        style={{
          position:        'fixed',
          right:           '20px',
          bottom:          'calc(24px + env(safe-area-inset-bottom, 0px))',
          zIndex:          50,
          display:         'flex', alignItems: 'center', gap: '8px',
          padding:         '11px 16px',
          borderRadius:    'var(--radius-pill)',
          backgroundColor: '#25D366',
          color:           '#fff',
          textDecoration:  'none',
          boxShadow:       '0 4px 16px rgba(37,211,102,0.40)',
          opacity:         waVisible ? 1 : 0,
          pointerEvents:   waVisible ? 'auto' : 'none',
          transform:       waVisible ? 'translateY(0)' : 'translateY(12px)',
          transition:      'opacity 300ms ease, transform 300ms ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.backgroundColor = '#20BA5A'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = waVisible ? 'translateY(0)' : 'translateY(12px)'; e.currentTarget.style.backgroundColor = '#25D366'; }}
      >
        {/* Official WhatsApp logo SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="20"
          height="20"
          aria-hidden="true"
          style={{ display: 'block', flexShrink: 0 }}
        >
          <path
            fill="#fff"
            d="M4.868 43.303l2.694-9.835a19.137 19.137 0 01-2.561-9.61C5.001 13.218 13.717 4.5 24.498 4.5c5.207.002 10.098 2.03 13.776 5.712a19.313 19.313 0 015.726 13.783c-.004 10.741-8.72 19.457-19.5 19.457a19.44 19.44 0 01-9.306-2.37L4.868 43.303z"
          />
          <path
            fill="#25D366"
            d="M4.868 43.303l2.694-9.835a19.137 19.137 0 01-2.561-9.61C5.001 13.218 13.717 4.5 24.498 4.5c5.207.002 10.098 2.03 13.776 5.712a19.313 19.313 0 015.726 13.783c-.004 10.741-8.72 19.457-19.5 19.457a19.44 19.44 0 01-9.306-2.37L4.868 43.303z"
          />
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M24.498 7.5c-9.374 0-17 7.626-17 17.001a16.98 16.98 0 002.372 8.705l.371.59-1.573 5.74 5.9-1.547.569.337a16.95 16.95 0 008.361 2.209h.007c9.37 0 16.993-7.625 16.996-17 .002-4.541-1.766-8.808-4.973-12.016A16.906 16.906 0 0024.498 7.5zm9.526 24.284c-.4 1.122-2.33 2.147-3.19 2.236-.764.08-1.733.113-2.797-.175-.644-.178-1.47-.416-2.526-.865-4.44-1.919-7.339-6.395-7.558-6.692-.218-.297-1.78-2.368-1.78-4.516 0-2.147 1.127-3.205 1.527-3.643.4-.437.872-.547 1.163-.547.29 0 .581.003.836.015.268.013.627-.102.981.748.37.878 1.254 3.025 1.364 3.243.11.218.182.473.036.766-.145.292-.218.473-.436.729-.218.254-.459.568-.654.763-.218.218-.445.454-.191.89.254.436 1.127 1.861 2.42 3.015 1.662 1.48 3.065 1.938 3.502 2.156.436.218.69.182.945-.11.254-.29 1.09-1.27 1.38-1.705.29-.436.581-.363.981-.218.4.145 2.544 1.2 2.98 1.418.436.218.727.327.836.509.11.182.11 1.049-.29 2.17z"
            clipRule="evenodd"
          />
        </svg>
        <span
          className="hidden sm:inline"
          style={{
            fontFamily:    'var(--font-body, system-ui)',
            fontSize:      '11px', letterSpacing: '0.12em',
            textTransform: 'uppercase', fontWeight: 600,
          }}
        >
          WhatsApp
        </span>
      </a>

      {/* ══════════════════════════════════════════════════════
          DRAWERS
          ══════════════════════════════════════════════════════ */}
      <AvailabilityDrawer
        id="availability-drawer"
        open={availOpen}
        onClose={() => setAvailOpen(false)}
        triggerRef={availBtnRef}
      />
      <VideoConsultDrawer
        id="video-consult-drawer"
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        triggerRef={videoBtnRef}
      />
    </>
  );
}
