'use client';
/**
 * FormDatePicker
 * Locale-aware calendar popover for travel date selection.
 * All first-party UI strings come from contactContent.calendar via useLang().
 * Festival proper titles are sourced from Google Calendar — kept as-is.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import { getFestivalsForDate, isDateBlocked } from '@/lib/calendarUtils';
import { useLang } from '@/lib/LanguageContext';
import { contactContent as cc } from '@/data/siteContent';

/* ── Calendar helpers ──────────────────────────────────────────── */
const WEEKDAYS_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const WEEKDAYS_ES = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

const MONTHS_EN = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const MONTHS_ES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
];

function todayIso() { return new Date().toISOString().slice(0, 10); }

function toIso(year, month1, day) {
  return `${year}-${String(month1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}

function buildGrid(year, month0) {
  const today   = todayIso();
  const first   = new Date(year, month0, 1).getDay();
  const daysInM = new Date(year, month0 + 1, 0).getDate();
  const cells   = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= daysInM; d++) {
    const iso = toIso(year, month0 + 1, d);
    cells.push({ iso, day: d, isPast: iso < today, isToday: iso === today });
  }
  while (cells.length < 42) cells.push(null);
  return cells;
}

function viewFromDate(dateStr) {
  if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const d     = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    if (d >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      return { year: d.getFullYear(), month: d.getMonth() };
    }
  }
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() };
}

function formatDisplay(iso, lang) {
  if (!iso) return '';
  return new Date(iso + 'T00:00:00').toLocaleDateString(
    lang === 'es' ? 'es-ES' : 'en-GB',
    { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' },
  );
}

/* ── Festival micro label (cell) ─────────────────────────────────── */
function FestivalMicro({ festivals, selected }) {
  if (!festivals.length) return null;
  const first = festivals[0].title;
  return (
    <span
      title={festivals.map(f => f.title).join(' · ')}
      style={{
        fontSize: '6px', fontWeight: 500, lineHeight: 1,
        color: selected ? 'rgba(255,255,255,0.85)' : 'var(--color-secondary-hover)',
        maxWidth: '100%', overflow: 'hidden',
        textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        display: 'block',
      }}
    >
      {first.length > 6 ? first.slice(0, 5) + '…' : first}
      {festivals.length > 1 && ` +${festivals.length - 1}`}
    </span>
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export default function FormDatePicker({ value, onChange, labelStyle, initialMonth }) {
  const { lang, localized } = useLang();
  const [open, setOpen] = useState(false);

  const startView = viewFromDate(value || initialMonth || '');
  const [viewYear,  setViewYear]  = useState(startView.year);
  const [viewMonth, setViewMonth] = useState(startView.month);

  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  const { events, loading, error, retry } = useCalendarEvents(open);

  const WEEKDAYS = lang === 'es' ? WEEKDAYS_ES : WEEKDAYS_EN;
  const MONTHS   = lang === 'es' ? MONTHS_ES   : MONTHS_EN;

  /* Locale-aware calendar label strings */
  const cal = cc.calendar;
  const tCal = useCallback((key) => localized(cal[key]), [lang, localized]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Sync view when external value changes (URL ?date=) */
  useEffect(() => {
    if (!value) return;
    const v = viewFromDate(value);
    setViewYear(v.year);
    setViewMonth(v.month);
  }, [value]);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  /* Escape closes */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') { setOpen(false); triggerRef.current?.focus(); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const isBusy  = useCallback((iso) => isDateBlocked(events, iso), [events]);
  const getHols = useCallback((iso) => getFestivalsForDate(events, iso), [events]);

  const today0         = new Date();
  const isPrevDisabled = viewYear === today0.getFullYear() && viewMonth <= today0.getMonth();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const handleSelect = (cell) => {
    if (!cell || cell.isPast || isBusy(cell.iso)) return;
    onChange(cell.iso);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    setOpen(false);
  };

  const toggleOpen = () => setOpen(o => !o);
  const handleTriggerKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleOpen(); }
  };

  const grid              = buildGrid(viewYear, viewMonth);
  const selectedFestivals = value ? getHols(value) : [];

  const defaultLabelStyle = {
    display: 'block',
    fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)',
    fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.16em',
    textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '6px',
  };

  const triggerLabel = value
    ? `${tCal('travelDate')} ${formatDisplay(value, lang)}`
    : tCal('placeholder');

  return (
    <div style={{ position: 'relative' }}>

      {/* Label */}
      {labelStyle !== false && (
        <label htmlFor="fdp-trigger" style={labelStyle ?? defaultLabelStyle}>
          {tCal('label')}
        </label>
      )}

      {/* ── Trigger ───────────────────────────────────────────── */}
      <div
        id="fdp-trigger"
        ref={triggerRef}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={triggerLabel}
        onClick={toggleOpen}
        onKeyDown={handleTriggerKey}
        style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          width: '100%', height: '52px', padding: '0 0.9rem',
          backgroundColor: 'var(--color-surface-alt)',
          border: `1px solid ${open ? 'var(--color-primary)' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius-control)',
          cursor: 'pointer', userSelect: 'none',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          outline: 'none', boxSizing: 'border-box',
          boxShadow: open ? '0 0 0 3px rgba(27,42,94,0.1)' : 'none',
        }}
        onFocus={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
        onBlur={e => { if (!open) e.currentTarget.style.borderColor = 'var(--color-border)'; }}
      >
        <CalendarIcon size={15} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
        <span style={{
          flex: 1,
          fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)',
          fontSize: '0.875rem',
          color: value ? 'var(--color-text)' : 'var(--color-text-muted)',
        }}>
          {value ? formatDisplay(value, lang) : tCal('placeholder')}
        </span>
        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label={tCal('clearDate')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--color-text-muted)', padding: '2px',
              borderRadius: '50%', flexShrink: 0,
              minWidth: '44px', minHeight: '44px',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Hidden ISO value for form submission */}
      <input type="hidden" name="date" value={value || ''} />

      {/* ── Popover calendar ──────────────────────────────────── */}
      {open && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-modal="false"
          aria-label={tCal('chooseDate')}
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            zIndex: 100,
            width: 'min(340px, calc(100vw - 32px))',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-card)',
            boxShadow: '0 8px 32px rgba(20,20,43,0.16)',
            overflow: 'hidden',
            animation: 'fadeIn 150ms ease forwards',
          }}
        >
          {/* Month nav */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 12px 8px',
            borderBottom: '1px solid var(--color-border)',
          }}>
            <button
              type="button"
              onClick={prevMonth}
              disabled={isPrevDisabled}
              aria-label={tCal('prevMonth')}
              style={{
                background: 'none', border: 'none',
                cursor: isPrevDisabled ? 'default' : 'pointer',
                color: isPrevDisabled ? 'var(--color-border-strong)' : 'var(--color-text)',
                padding: '4px', display: 'flex', borderRadius: '4px',
                minWidth: '32px', minHeight: '32px', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <ChevronLeft size={14} />
            </button>

            <span style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: '13px', fontWeight: 400, color: 'var(--color-text)',
            }}>
              {MONTHS[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={nextMonth}
              aria-label={tCal('nextMonth')}
              style={{
                background: 'none', border: 'none',
                cursor: 'pointer', color: 'var(--color-text)',
                padding: '4px', display: 'flex', borderRadius: '4px',
                minWidth: '32px', minHeight: '32px', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Weekday headers */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
            padding: '6px 10px 2px', gap: '2px',
          }}>
            {WEEKDAYS.map(d => (
              <div key={d} style={{
                textAlign: 'center', fontSize: '9px', fontWeight: 500,
                letterSpacing: '0.1em', color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-body, system-ui)', padding: '0 0 3px',
              }}>
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
            padding: '0 10px 10px', gap: '2px',
          }}>
            {/* Loading skeleton — overlays the grid structure */}
            {loading && (
              <>
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={`sk-${i}`} style={{
                    height: '32px', borderRadius: 'var(--radius-control)',
                    backgroundColor: 'var(--color-border)',
                    animation: 'pulse 1.4s ease-in-out infinite',
                    animationDelay: `${(i % 7) * 50}ms`,
                  }} />
                ))}
              </>
            )}
            {/* Date cells — always present once not loading */}
            {!loading && grid.map((cell, idx) => {
                  if (!cell) return <div key={idx} />;
                  const busy       = isBusy(cell.iso);
                  const hols       = getHols(cell.iso);
                  const hasHol     = hols.length > 0;
                  const disabled   = cell.isPast || busy;
                  const isSelected = value === cell.iso;

                  let bg      = 'transparent';
                  let fg      = disabled ? 'var(--color-border-strong)' : 'var(--color-text)';
                  let border  = '1px solid transparent';
                  let cursor  = disabled ? 'not-allowed' : 'pointer';
                  let textDec = 'none';

                  if (isSelected) {
                    bg = 'var(--color-primary)'; fg = '#fff';
                    border = '1px solid var(--color-primary)';
                    cursor = 'default';
                  } else if (cell.isToday && !disabled) {
                    border = '1px solid var(--color-primary)'; fg = 'var(--color-primary)';
                  } else if (busy) {
                    bg = 'rgba(192,69,59,0.08)'; fg = 'var(--color-text-muted)';
                    textDec = 'line-through';
                  } else if (hasHol) {
                    bg = 'rgba(232,163,23,0.10)';
                  }

                  const ariaLabel = cell.isPast
                    ? `${cell.iso} — ${tCal('past')}`
                    : busy
                    ? `${cell.iso} — ${tCal('unavailable')}`
                    : hasHol
                    ? `${cell.iso} — ${hols.map(f => f.title).join(', ')}`
                    : isSelected
                    ? `${cell.iso} — ${tCal('selected')}`
                    : `${tCal('selectAria')} ${cell.iso}`;

                  return (
                    <div
                      key={cell.iso}
                      role={disabled ? undefined : 'button'}
                      tabIndex={disabled ? -1 : 0}
                      aria-label={ariaLabel}
                      aria-disabled={disabled ? 'true' : undefined}
                      aria-pressed={isSelected ? 'true' : undefined}
                      title={hasHol ? hols.map(f => f.title).join(' · ') : undefined}
                      onClick={() => handleSelect(cell)}
                      onKeyDown={e => {
                        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault(); handleSelect(cell);
                        }
                      }}
                      style={{
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        height: hasHol ? '40px' : '32px', gap: '2px',
                        borderRadius: 'var(--radius-control)',
                        backgroundColor: bg, color: fg, border, cursor,
                        fontFamily: 'var(--font-body, system-ui)', fontSize: '12px',
                        fontWeight: isSelected || cell.isToday ? 500 : 400,
                        opacity: cell.isPast ? 0.35 : 1, textDecoration: textDec,
                        outline: 'none', userSelect: 'none',
                        transition: 'background-color 150ms ease, border-color 150ms ease',
                      }}
                      onMouseEnter={e => {
                        if (!disabled && !isSelected) {
                          e.currentTarget.style.backgroundColor =
                            hasHol ? 'rgba(232,163,23,0.18)' : 'var(--color-surface-alt)';
                          e.currentTarget.style.borderColor = hasHol
                            ? 'rgba(232,163,23,0.4)' : 'var(--color-border)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (!disabled && !isSelected) {
                          e.currentTarget.style.backgroundColor = bg;
                          e.currentTarget.style.borderColor = 'transparent';
                        }
                      }}
                    >
                      <span>{cell.day}</span>
                      {hasHol && !busy && (
                        <FestivalMicro festivals={hols} selected={isSelected} />
                      )}
                    </div>
                  );
                })
            }
          </div>

          {/* Legend */}
          <div style={{
            display: 'flex', gap: '10px', flexWrap: 'wrap',
            padding: '6px 12px 8px',
            borderTop: '1px solid var(--color-border)',
          }}>
            {[
              ['var(--color-primary)',    tCal('legendAvail')],
              ['rgba(232,163,23,0.30)',   tCal('legendFest')],
              ['rgba(192,69,59,0.15)',    tCal('legendBusy')],
              ['rgba(0,0,0,0.12)',        tCal('legendPast')],
            ].map(([color, label]) => (
              <span key={label} style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                fontFamily: 'var(--font-body, system-ui)', fontSize: '9px',
                color: 'var(--color-text-muted)',
              }}>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '2px',
                  backgroundColor: color, display: 'inline-block', flexShrink: 0,
                }} aria-hidden="true" />
                {label}
              </span>
            ))}

            {error && (
              <button
                type="button"
                onClick={retry}
                style={{
                  marginLeft: 'auto', background: 'none', border: 'none',
                  cursor: 'pointer', color: 'var(--color-primary)',
                  fontFamily: 'var(--font-body, system-ui)',
                  fontSize: '9px', textDecoration: 'underline', padding: 0,
                }}
              >
                {tCal('retryLoad')}
              </button>
            )}
          </div>

          {/* Festival details for selected date */}
          {value && selectedFestivals.length > 0 && (
            <div style={{
              padding: '6px 12px 10px',
              borderTop: '1px solid var(--color-border)',
              display: 'flex', flexWrap: 'wrap', gap: '5px',
            }}>
              {selectedFestivals.map(f => (
                <span key={f.id} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  padding: '2px 8px',
                  backgroundColor: 'rgba(232,163,23,0.12)',
                  border: '1px solid rgba(232,163,23,0.30)',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-body, system-ui)',
                  fontSize: '10px', fontWeight: 500,
                  color: 'var(--color-secondary-hover)',
                }}>
                  🎉 {f.title}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
