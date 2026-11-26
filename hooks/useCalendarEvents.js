'use client';
/**
 * useCalendarEvents
 * ─────────────────────────────────────────────────────────────────
 * Shared fetch hook for /api/booked-dates.
 * Used by AvailabilityDrawer and FormDatePicker.
 *
 * Returns:
 *   events        — Event[] ([] when loaded but empty; never null after first attempt)
 *   loading       — true ONLY while an in-flight request is pending
 *   error         — true when network/server returned a non-configured error
 *   notConfigured — true when server returns CALENDAR_NOT_CONFIGURED (503)
 *   warnings      — string[] from server (e.g. holiday source failed)
 *   retry         — () => void — re-fetch
 *
 * Grid rendering contract:
 *   The calendar month grid must render independently of events state.
 *   Consumers must NOT gate the grid on events.length > 0.
 *   Show skeleton OVER the grid while loading; show error message on failure.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export function useCalendarEvents(enabled = true) {
  const [events,        setEvents]        = useState(null);   // null = never attempted
  const [loading,       setLoading]       = useState(false);  // true only while fetching
  const [error,         setError]         = useState(false);
  const [notConfigured, setNotConfigured] = useState(false);
  const [warnings,      setWarnings]      = useState([]);

  // Increment to trigger a re-fetch (retry)
  const [fetchCount, setFetchCount] = useState(0);
  const abortRef    = useRef(null);
  const mountedRef  = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const doFetch = useCallback(async () => {
    // Cancel any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (!mountedRef.current) return;
    setLoading(true);
    setError(false);
    setNotConfigured(false);

    // 15s timeout — Vercel serverless functions complete well within this
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch('/api/booked-dates', {
        signal: controller.signal,
        cache:  'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });

      // Parse JSON safely — malformed body should not crash the hook
      let data = {};
      try { data = await res.json(); } catch {}

      if (!mountedRef.current || controller.signal.aborted) return;

      if (!res.ok) {
        if (data?.code === 'CALENDAR_NOT_CONFIGURED') {
          // Not an error — calendar simply not set up yet; show empty grid
          setNotConfigured(true);
          setEvents([]);
          return;
        }
        // All other non-2xx responses are real errors
        throw new Error(`HTTP ${res.status}: ${data?.code ?? 'UNKNOWN'}`);
      }

      // Successful response — always set events (even if empty array)
      setEvents(Array.isArray(data.events) ? data.events : []);
      setWarnings(Array.isArray(data.warnings) ? data.warnings : []);
      setError(false);
      setNotConfigured(false);

    } catch (err) {
      if (err.name === 'AbortError') return;      // unmount or new fetch — not an error
      if (!mountedRef.current) return;
      console.warn('[useCalendarEvents] fetch failed:', err.message);
      setError(true);
      // Keep any previously loaded events so the grid stays usable on retry
      setEvents(prev => prev ?? []);
    } finally {
      clearTimeout(timeoutId);
      if (mountedRef.current && !controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    doFetch();
    return () => { abortRef.current?.abort(); };
  // fetchCount is the only external re-trigger beside enabled
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, fetchCount]);

  const retry = useCallback(() => {
    setFetchCount(c => c + 1);
  }, []);

  return {
    // Grid-safe: always return an array, never null
    events:        events ?? [],
    // Loading is only true while a request is in-flight — not "never loaded"
    loading,
    // Distinct states for distinct UI: error vs not-configured vs loading vs success
    error,
    notConfigured,
    warnings,
    retry,
    // Helper: true when we have never successfully loaded (first paint before data)
    isFirstLoad:   events === null && loading,
  };
}
