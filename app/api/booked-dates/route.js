/**
 * GET /api/booked-dates
 * ─────────────────────────────────────────────────────────────────
 * Authoritative read-only calendar route.
 * Used by: AvailabilityDrawer, FormDatePicker (via useCalendarEvents hook).
 *
 * Fetches next 12 months of events from one or two PUBLIC Google Calendars
 * using a server-only API Key. Never exposes credentials to the client.
 *
 * Required server-only env vars (never use NEXT_PUBLIC_):
 *   GOOGLE_API_KEY           — restricted to Calendar API, NO HTTP referrer restriction
 *   GOOGLE_CALENDAR_ID       — primary booking/admin calendar (must be public)
 *
 * Optional:
 *   GOOGLE_HOLIDAY_CALENDAR_ID — Holidays in India calendar
 *     Vercel: paste WITHOUT quotes: en-gb.indian#holiday@group.v.calendar.google.com
 *     The # is handled by encodeURIComponent in fetchAllEvents().
 *   GOOGLE_CALENDAR_TIME_ZONE  — default: Asia/Kolkata
 *
 * Response (always JSON, never throws to client):
 *   200: { events, timeZone, warnings }
 *   503: { error, code:"CALENDAR_NOT_CONFIGURED", events:[], timeZone, warnings:[] }
 *   502: { error, code, events:[], timeZone, warnings:[] }
 *
 * Event shape:
 *   { id, source, type, title, start, end, allDay, blocksAvailability }
 */

import { NextResponse } from 'next/server';

// Force dynamic — prevents static pre-render at build time
export const dynamic = 'force-dynamic';

/* ── config ──────────────────────────────────────────────────────── */
function getConfig() {
  // Read lazily inside GET — never at module scope / build time
  const apiKey     = (process.env.GOOGLE_API_KEY             ?? '').trim();
  const calendarId = (process.env.GOOGLE_CALENDAR_ID         ?? '').trim();
  // Strip stray surrounding quotes that Vercel users sometimes include
  const holRaw     = (process.env.GOOGLE_HOLIDAY_CALENDAR_ID ?? '').trim();
  const holidayId  = holRaw.replace(/^["']|["']$/g, '').trim();
  const timeZone   = (process.env.GOOGLE_CALENDAR_TIME_ZONE  ?? 'Asia/Kolkata').trim();

  if (!apiKey || !calendarId) return null;
  return { apiKey, calendarId, holidayId: holidayId || null, timeZone };
}

/* ── paginated Google Calendar fetch ────────────────────────────── */
async function fetchAllEvents(calendarId, apiKey, timeMin, timeMax) {
  const allItems = [];
  let pageToken  = null;

  do {
    const params = new URLSearchParams({
      key:          apiKey,
      timeMin,
      timeMax,
      singleEvents: 'true',
      orderBy:      'startTime',
      maxResults:   '2500',
      showDeleted:  'false',
      fields:       'nextPageToken,items(id,summary,status,start,end)',
    });
    if (pageToken) params.set('pageToken', pageToken);

    // encodeURIComponent is mandatory — the holiday calendar ID contains #
    const url = `https://www.googleapis.com/calendar/v3/calendars/${
      encodeURIComponent(calendarId)
    }/events?${params}`;

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      const err = new Error(`Google Calendar API: ${res.status}`);
      err.status = res.status;
      // Try to extract safe error info without leaking credentials
      try {
        const body = await res.json();
        err.googleCode = body?.error?.code;
        err.googleMsg  = body?.error?.message?.substring(0, 120);
      } catch {}
      throw err;
    }

    const data  = await res.json();
    const items = (data.items ?? []).filter(ev => ev.status !== 'cancelled');
    allItems.push(...items);
    pageToken = data.nextPageToken ?? null;
  } while (pageToken);

  return allItems;
}

/* ── normalize booking calendar event ───────────────────────────── */
function normalizeBooking(event) {
  const s        = event.start;
  const e        = event.end;
  const rawTitle = (event.summary ?? '').trim();

  // Timed event — private booking, never reveal title
  if (s.dateTime) {
    return {
      id:                 `booking:${event.id}`,
      source:             'booking',
      type:               'booking',
      title:              'Booked',
      start:              s.dateTime,
      end:                e.dateTime,
      allDay:             false,
      blocksAvailability: true,
    };
  }

  // All-day — check prefix conventions
  const upper = rawTitle.toUpperCase();

  if (
    rawTitle.startsWith('_') ||
    upper.startsWith('[BOOKED]') ||
    upper.startsWith('[BLOCKED]')
  ) {
    return {
      id:                 `booking:${event.id}`,
      source:             'booking',
      type:               'booking',
      title:              'Booked',
      start:              s.date,
      end:                e.date,
      allDay:             true,
      blocksAvailability: true,
    };
  }

  // Festival/holiday prefix — strip prefix, preserve real title
  let title = rawTitle;
  const prefixMatch = rawTitle.match(/^\[(FESTIVAL|HOLIDAY)\]\s*/i);
  if (prefixMatch) {
    title = rawTitle.slice(prefixMatch[0].length).trim() || rawTitle;
  }

  return {
    id:                 `booking:${event.id}`,
    source:             'booking',
    type:               'festival',
    title:              title || 'Event',
    start:              s.date,
    end:                e.date,
    allDay:             true,
    blocksAvailability: false,
  };
}

/* ── normalize holiday calendar event ───────────────────────────── */
function normalizeHoliday(event) {
  const s     = event.start;
  const e     = event.end;
  const title = (event.summary ?? '').trim();

  return {
    id:                 `holiday:${event.id}`,
    source:             'holiday',
    type:               'festival',
    title:              title || 'Festival / Holiday',
    start:              s.date ?? s.dateTime.slice(0, 10),
    end:                e.date ?? e.dateTime.slice(0, 10),
    allDay:             true,
    blocksAvailability: false,
  };
}

/* ── deduplicate ─────────────────────────────────────────────────── */
function dedup(events) {
  // Keep distinct events by source+start+title — multiple festivals same date = KEPT
  const seen = new Set();
  return events.filter(ev => {
    const key = `${ev.source}|${ev.start}|${ev.title.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/* ── safe error code mapper ─────────────────────────────────────── */
function googleStatusToCode(status) {
  if (status === 400) return 'CALENDAR_BAD_REQUEST';
  if (status === 401) return 'CALENDAR_ACCESS_DENIED';
  if (status === 403) return 'CALENDAR_ACCESS_DENIED';   // key restriction or not public
  if (status === 404) return 'CALENDAR_NOT_FOUND';        // wrong calendar ID
  if (status === 429) return 'CALENDAR_RATE_LIMITED';
  return 'UPSTREAM_ERROR';
}

/* ── route handler ───────────────────────────────────────────────── */
export async function GET() {
  const config = getConfig();

  if (!config) {
    // Safe 503 — calendar simply not configured yet
    console.warn('[booked-dates] GOOGLE_API_KEY or GOOGLE_CALENDAR_ID not configured');
    return NextResponse.json(
      {
        events:   [],
        timeZone: 'Asia/Kolkata',
        warnings: [],
        error:    'Calendar availability is not configured.',
        code:     'CALENDAR_NOT_CONFIGURED',
      },
      {
        status:  503,
        headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
      }
    );
  }

  const now    = new Date();
  const future = new Date(now);
  future.setMonth(future.getMonth() + 12);
  const timeMin = now.toISOString();
  const timeMax = future.toISOString();

  const warnings = [];

  try {
    // ── Primary booking calendar (required) ────────────────────
    const bookingItems  = await fetchAllEvents(config.calendarId, config.apiKey, timeMin, timeMax);
    const bookingEvents = bookingItems.map(normalizeBooking);

    // ── Holiday calendar (optional, non-fatal if fails) ────────
    let holidayEvents = [];
    if (config.holidayId) {
      try {
        const holidayItems = await fetchAllEvents(config.holidayId, config.apiKey, timeMin, timeMax);
        holidayEvents = holidayItems.map(normalizeHoliday);
      } catch (hErr) {
        const code = hErr.status ? googleStatusToCode(hErr.status) : 'NETWORK_ERROR';
        // Log safe info only — no credentials, no calendar IDs
        console.warn(`[booked-dates] Holiday calendar fetch failed (non-fatal): ${code}`);
        warnings.push(`Festival calendar unavailable (${code}) — holiday names may be incomplete`);
      }
    }

    const events = dedup([...bookingEvents, ...holidayEvents]);

    return NextResponse.json(
      { events, timeZone: config.timeZone, warnings },
      {
        status:  200,
        headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
      }
    );

  } catch (err) {
    const code = googleStatusToCode(err.status);
    // Log safe status/code only — no key, no calendar IDs
    console.error(`[booked-dates] Primary calendar error: ${err.status ?? 'NETWORK'} ${code}`);

    const clientMsg =
      err.status === 403 ? 'Calendar not accessible — check API key permissions and calendar visibility.' :
      err.status === 404 ? 'Calendar not found — check Calendar ID in environment variables.' :
      err.status === 429 ? 'Calendar rate limited — please try again shortly.' :
      'Failed to fetch calendar availability.';

    return NextResponse.json(
      {
        events:   [],
        timeZone: config.timeZone,
        warnings: [],
        error:    clientMsg,
        code,
      },
      {
        status:  502,
        headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
      }
    );
  }
}
