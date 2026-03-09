/* ================================================================
   AimRivals — scores.js
   Persistent global leaderboard via Firebase Realtime Database.
   Public read/write, free tier, no account needed, CORS open.

   SETUP (one-time, 2 minutes):
   1. Go to https://console.firebase.google.com
   2. Create project → Build → Realtime Database → Create database
   3. Choose "Start in TEST MODE" (allows public read/write)
   4. Copy the database URL shown (https://YOUR-APP-rtdb.firebaseio.com)
   5. Paste it into FIREBASE_URL below, then re-upload this file
   ================================================================ */

const Scores = (() => {
  'use strict';

  // ── PUT YOUR FIREBASE DATABASE URL HERE ────────────────────────
  const FIREBASE_URL = 'https://aimrivals-default-rtdb.asia-southeast1.firebasedatabase.app';
  // ──────────────────────────────────────────────────────────────

  const PATH   = '/leaderboard';
  const MODES  = ['tracking', 'flicking', 'switching'];
  const LS_KEY = 'aimrivals_lb_v2';

  let cache  = null;
  let saving = false;

  function empty() { return { tracking:[], flicking:[], switching:[] }; }

  function lsRead()  {
    try { return JSON.parse(localStorage.getItem(LS_KEY)); } catch { return null; }
  }
  function lsWrite(d) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(d)); } catch {}
  }

  async function load() {
    try {
      const res = await fetch(`${FIREBASE_URL}${PATH}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const rec  = data || empty();
      MODES.forEach(m => { if (!Array.isArray(rec[m])) rec[m] = []; });
      cache = rec;
      lsWrite(rec);
      return rec;
    } catch (e) {
      console.warn('[Scores] load failed — using localStorage cache:', e.message);
      cache = lsRead() || empty();
      return cache;
    }
  }

  async function save(data) {
    if (saving) return;
    saving = true;
    lsWrite(data);
    try {
      const res = await fetch(`${FIREBASE_URL}${PATH}.json`, {
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

  async function submit(mode, score, name) {
    const data = await load();  // always read fresh before writing
    if (!Array.isArray(data[mode])) data[mode] = [];
    data[mode].push({
      name:  (name || 'Anonymous').trim().slice(0, 20),
      score: Math.round(score),
      date:  new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'2-digit' }),
      ts:    Date.now(),
    });
    data[mode].sort((a, b) => b.score - a.score);
    if (data[mode].length > 200) data[mode] = data[mode].slice(0, 200);
    await save(data);
    return data[mode];
  }

  async function getTop(mode, n = 10) {
    const data = cache || await load();
    return (data[mode] || []).slice(0, n);
  }

  return { load, submit, getTop };
})();
