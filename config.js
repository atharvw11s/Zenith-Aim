/* ================================================================
   Zenith Aim — config.js
   ================================================================ */

const AimRivalsConfig = {

  version: '6.2.0',
  author:  'PurplsXD',
  repo:    'https://github.com/atharvw11s/Zenith-Aim',

  SENS_DB: {
    rivals:    { label: 'Roblox Rivals',  yaw: 0.5,     sensLabel: 'Camera Sensitivity', hasMultiplier: true,  sensScale: 0.01 },
    arsenal:   { label: 'Roblox Arsenal', yaw: 0.375,   sensLabel: 'Camera Sensitivity', hasMultiplier: false, sensScale: 1    },
    aimlabs:   { label: 'Aimlabs',        yaw: 0.05,    sensLabel: 'Sensitivity',         hasMultiplier: false, sensScale: 1    },
    kovaaks:   { label: "Kovaak's",       yaw: 0.022,   sensLabel: 'Sensitivity',         hasMultiplier: false, sensScale: 1    },
    valorant:  { label: 'Valorant',       yaw: 0.07,    sensLabel: 'Sensitivity',         hasMultiplier: false, sensScale: 1    },
    cs2:       { label: 'CS2',            yaw: 0.022,   sensLabel: 'Sensitivity',         hasMultiplier: false, sensScale: 1    },
    apex:      { label: 'Apex Legends',   yaw: 0.022,   sensLabel: 'Sensitivity',         hasMultiplier: false, sensScale: 1    },
    overwatch: { label: 'Overwatch 2',    yaw: 0.0066,  sensLabel: 'Sensitivity',         hasMultiplier: false, sensScale: 1    },
    fortnite:  { label: 'Fortnite',       yaw: 0.005555,sensLabel: 'Sensitivity %',       hasMultiplier: false, sensScale: 1    },
  },

  FOV_DB: {
    rivals:  { label: 'Roblox Rivals',  type: 'vertical',   default: 80,  range: [30, 120], aspect: 16/9 },
    arsenal: { label: 'Roblox Arsenal', type: 'vertical',   default: 70,  range: [30, 120], aspect: 16/9 },
    aimlabs: { label: 'Aimlabs',        type: 'vertical',   default: 70,  range: [1,  150], aspect: 16/9 },
    kovaaks: { label: "Kovaak's",       type: 'horizontal', default: 103, range: [60, 150], aspect: 16/9 },
  },

  defaults: {
    trainer:    'aimlabs',
    rank:       'beginner',
    priorities: { flicking: 34, tracking: 33, switching: 33 },
    dpi:        800,
    duration:   30,
    sensitivity: 100,
    difficulty: 'medium',
  },

  warmup: {
    easy:   { speed: 0.6, targetSize: 0.40, flickCount: 5, switchPositions: 4 },
    medium: { speed: 1.0, targetSize: 0.28, flickCount: 7, switchPositions: 6 },
    hard:   { speed: 1.6, targetSize: 0.18, flickCount: 9, switchPositions: 8 },
  },
};

if (typeof window !== 'undefined') window.AimRivalsConfig = AimRivalsConfig;
if (typeof module !== 'undefined') module.exports = AimRivalsConfig;
