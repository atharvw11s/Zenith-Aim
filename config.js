/* ================================================================
   AimRivals — config.js
   Central configuration — game databases, scenario pools, defaults
   ================================================================ */

const AimRivalsConfig = {

  version: '6.0.0',
  author:  'PurplsXD',
  repo:    'https://github.com/atharvw11s/AimRivals-Upgraded',

  /* ── Sensitivity yaw values ── */
  SENS_DB: {
    rivals:  { label: 'Roblox Rivals',  yaw: 0.37503, sensLabel: 'Camera Sensitivity', hasMultiplier: true  },
    arsenal: { label: 'Roblox Arsenal', yaw: 0.37503, sensLabel: 'Camera Sensitivity', hasMultiplier: false },
    aimlabs: { label: 'Aimlabs',        yaw: 0.05,    sensLabel: 'Sensitivity',         hasMultiplier: false },
    kovaaks: { label: "Kovaak's",       yaw: 0.022,   sensLabel: 'Sensitivity',         hasMultiplier: false },
  },

  /* ── FOV databases ── */
  FOV_DB: {
    rivals:  { label: 'Roblox Rivals',  type: 'vertical',   default: 80,  range: [30, 120] },
    arsenal: { label: 'Roblox Arsenal', type: 'vertical',   default: 70,  range: [30, 120] },
    aimlabs: { label: 'Aimlabs',        type: 'vertical',   default: 70,  range: [1,  150] },
    kovaaks: { label: "Kovaak's",       type: 'horizontal', default: 103, range: [60, 150] },
  },

  /* ── Default app state ── */
  defaults: {
    trainer:    'aimlabs',
    rank:       'beginner',
    priorities: { flicking: 34, tracking: 33, switching: 33 },
    dpi:        800,
    duration:   30,
    sensitivity: 0.0022,
    difficulty: 'medium',
  },

  /* ── Warmup game settings by difficulty ── */
  warmup: {
    easy:   { speed: 0.6, targetSize: 0.40, flickCount: 5, switchPositions: 4 },
    medium: { speed: 1.0, targetSize: 0.28, flickCount: 7, switchPositions: 6 },
    hard:   { speed: 1.6, targetSize: 0.18, flickCount: 9, switchPositions: 8 },
  },

};

/* Make available globally for script.js */
if (typeof window !== 'undefined') window.AimRivalsConfig = AimRivalsConfig;
if (typeof module !== 'undefined') module.exports = AimRivalsConfig;
