/* ================================================================
   AimRivals — scores.js
   Weekly global leaderboard via Firebase Realtime Database.
   Resets every Monday. All visitors share the same board.
   ================================================================ */

const Scores = (() => {
  'use strict';

  const FIREBASE_URL = 'https://aimrivals-default-rtdb.asia-southeast1.firebasedatabase.app';
  const MODES  = ['tracking', 'flicking', 'switching'];
  const LS_KEY = 'aimrivals_lb_v3';

  let cache  = null;
  let saving = false;

  // ── ISO week key: "2025-W22" style — changes every Monday ──────
  function getWeekKey() {
    const now  = new Date();
    const day  = now.getUTCDay() || 7;           // Mon=1 … Sun=7
    const mon  = new Date(now);
    mon.setUTCDate(now.getUTCDate() - (day - 1)); // rewind to Monday
    const y    = mon.getUTCFullYear();
    const start = new Date(Date.UTC(y, 0, 1));
    const week  = Math.ceil(((mon - start) / 86400000 + start.getUTCDay() + 1) / 7);
    return `${y}-W${String(week).padStart(2, '0')}`;
  }

  function weekPath() { return `/weeks/${getWeekKey()}`; }

  function empty() { return { tracking:[], flicking:[], switching:[], week: getWeekKey() }; }

  function lsRead()  { try { return JSON.parse(localStorage.getItem(LS_KEY)); } catch { return null; } }
  function lsWrite(d) { try { localStorage.setItem(LS_KEY, JSON.stringify(d)); } catch {} }

  // ── Fetch this week's data from Firebase ────────────────────────
  async function load() {
    try {
      const res = await fetch(`${FIREBASE_URL}${weekPath()}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const rec  = data || empty();
      MODES.forEach(m => { if (!Array.isArray(rec[m])) rec[m] = []; });
      rec.week = getWeekKey();
      cache = rec;
      lsWrite(rec);
      return rec;
    } catch (e) {
      console.warn('[Scores] load failed — using localStorage cache:', e.message);
      const cached = lsRead();
      // If cached data is from a different week, return fresh empty
      if (cached && cached.week === getWeekKey()) {
        cache = cached;
        return cache;
      }
      cache = empty();
      return cache;
    }
  }

  // ── Write to Firebase ───────────────────────────────────────────
  async function save(data) {
    if (saving) return;
    saving = true;
    lsWrite(data);
    try {
      const res = await fetch(`${FIREBASE_URL}${weekPath()}.json`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      cache = data;
    } catch (e) {
      console.warn('[Scores] save failed:', e.message);
    } finally {
      saving = false;
    }
  }

  // ── Submit a score ──────────────────────────────────────────────
  async function submit(mode, score, name) {
    const data = await load();
    if (!Array.isArray(data[mode])) data[mode] = [];
    data[mode].push({
      name:  (name || 'Anonymous').trim().slice(0, 20),
      score: Math.round(score),
      date:  new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short' }),
      ts:    Date.now(),
    });
    data[mode].sort((a, b) => b.score - a.score);
    if (data[mode].length > 200) data[mode] = data[mode].slice(0, 200);
    await save(data);
    return data[mode];
  }

  // ── Get top N ───────────────────────────────────────────────────
  async function getTop(mode, n = 10) {
    const data = cache || await load();
    return (data[mode] || []).slice(0, n);
  }

  // ── Get current week label for UI ──────────────────────────────
  function getWeekLabel() {
    const now = new Date();
    const day = now.getUTCDay() || 7;
    const mon = new Date(now);
    mon.setUTCDate(now.getUTCDate() - (day - 1));
    const sun = new Date(mon);
    sun.setUTCDate(mon.getUTCDate() + 6);
    const fmt = d => d.toLocaleDateString('en-GB', { day:'2-digit', month:'short' });
    return `${fmt(mon)} – ${fmt(sun)}`;
  }

  return { load, submit, getTop, getWeekKey, getWeekLabel };
})();
