/**
 * Zenith Aim — script.js (v20 — major update)
 * Improvements:
 *  - Fixed warmup shooting (pointer lock + raycasting)
 *  - Full Voltaic S5 KovaaK's scenario database
 *  - Game categorization (Valorant, CS2, Apex, OW2, Fortnite, Roblox)
 *  - Game-specific scenario weighting + task tags
 *  - Extended Aimlabs S3 scenarios
 *  - UI improvements: subcategory labels, game tags, tips
 */

'use strict';

// ═══════════════════════════════════════════════════════════════════════
// SCENARIO DATABASE
// ═══════════════════════════════════════════════════════════════════════

const DB = {
  /* ── KovaaK's Voltaic S5 ── */
  kovaaks: {
    clicking: {
      // Dynamic: multiple targets with unpredictable/bouncing movement
      dynamic: {
        beginner:     ['VT Pasu Novice S5',          'VT Popcorn Novice S5'],
        intermediate: ['VT Pasu Intermediate S5',    'VT Popcorn Intermediate S5'],
        advanced:     ['VT Pasu Advanced S5',         'VT Popcorn Advanced S5'],
        tip: 'Time your click at the peak of each arc — don\'t chase, anticipate.',
        games: ['apex', 'fortnite', 'rivals', 'arsenal'],
        subcat: 'Dynamic Clicking'
      },
      // Static: stationary or slowly vibrating targets — micro-adjustment focus
      static: {
        beginner:     ['VT 1wxts Novice S5',          'VT ww5t Novice S5'],
        intermediate: ['VT 1wxts Intermediate S5',    'VT ww5t Intermediate S5'],
        advanced:     ['VT 1wxts Advanced S5',         'VT ww5t Advanced S5'],
        tip: 'Micro-adjust after each flick — land center, don\'t just graze.',
        games: ['valorant', 'cs2'],
        subcat: 'Static Clicking'
      },
      // Linear: targets that strafe in straight predictable lines
      linear: {
        beginner:     ['VT Frogtagon Novice S5',          'VT Floating Heads Novice S5'],
        intermediate: ['VT Frogtagon Intermediate S5',    'VT Floating Heads Intermediate S5'],
        advanced:     ['VT Frogtagon Advanced S5',         'VT Floating Heads Advanced S5'],
        tip: 'Match the strafe rhythm and click slightly ahead of the target.',
        games: ['cs2', 'valorant'],
        subcat: 'Linear Clicking'
      }
    },
    tracking: {
      // Precise: small targets with smooth arcing paths — requires precise cursor control
      precise: {
        beginner:     ['VT PGT Novice S5',          'VT Snake Track Novice S5'],
        intermediate: ['VT PGT Intermediate S5',    'VT Snake Track Intermediate S5'],
        advanced:     ['VT PGT Advanced S5',         'VT Snake Track Advanced S5'],
        tip: 'Minimize overcorrections — think smooth, not fast.',
        games: ['valorant', 'cs2'],
        subcat: 'Precise Tracking'
      },
      // Reactive: fast direction changes requiring quick reactions
      reactive: {
        beginner:     ['VT Aether Novice S5',          'VT Ground Novice S5'],
        intermediate: ['VT Aether Intermediate S5',    'VT Ground Intermediate S5'],
        advanced:     ['VT Aether Advanced S5',         'VT Ground Advanced S5'],
        tip: 'Stay loose — let your wrist absorb sudden direction changes.',
        games: ['apex', 'overwatch', 'fortnite', 'rivals', 'arsenal'],
        subcat: 'Reactive Tracking'
      },
      // Control: smooth direction changes — wrist/arm control emphasis
      control: {
        beginner:     ['VT Raw Control Novice S5',          'VT Controlsphere Novice S5'],
        intermediate: ['VT Raw Control Intermediate S5',    'VT Controlsphere Intermediate S5'],
        advanced:     ['VT Raw Control Advanced S5',         'VT Controlsphere Advanced S5'],
        tip: 'Use your arm for large movements, wrist for fine control.',
        games: ['overwatch', 'apex', 'rivals'],
        subcat: 'Control Tracking'
      }
    },
    switching: {
      // Speed: fast TTK, raw flick speed between static/moving dots
      speed: {
        beginner:     ['VT DotTS Novice S5',          'VT EddieTS Novice S5'],
        intermediate: ['VT DotTS Intermediate S5',    'VT EddieTS Intermediate S5'],
        advanced:     ['VT DotTS Advanced S5',         'VT EddieTS Advanced S5'],
        tip: 'Commit to each target fully before switching — don\'t half-click.',
        games: ['fortnite', 'apex', 'rivals', 'arsenal'],
        subcat: 'Speed Switching'
      },
      // Evasive: targets actively evade — requires reading movement
      evasive: {
        beginner:     ['VT DriftTS Novice S5',          'VT VoxTS Novice S5'],
        intermediate: ['VT DriftTS Intermediate S5',    'VT VoxTS Intermediate S5'],
        advanced:     ['VT DriftTS Advanced S5',         'VT VoxTS Advanced S5'],
        tip: 'Predict where the target is going, not where it is.',
        games: ['apex', 'overwatch'],
        subcat: 'Evasive Switching'
      },
      // Stability: slow, predictable movement — smoothness over speed
      stability: {
        beginner:     ['VT Pentabounce Novice S5',         'VT StrafebotTS Novice S5'],
        intermediate: ['VT Pentabounce Intermediate S5',   'VT StrafebotTS Intermediate S5'],
        advanced:     ['VT Pentabounce Advanced S5',        'VT StrafebotTS Advanced S5'],
        tip: 'Maintain composure — this is about consistency, not peak speed.',
        games: ['valorant', 'cs2'],
        subcat: 'Stability Switching'
      }
    }
  },

  /* ── Aimlabs Voltaic S3 ── */
  aimlabs: {
    clicking: {
      dynamic: {
        beginner:     ['Gridshot Ultimate', 'Motionshot Wide 180 Small'],
        intermediate: ['Motionshot Wide 180 Medium', 'Sixshot Wide 180'],
        advanced:     ['Gridshot Ultimate Hard', 'Motionshot Wide 180 Hard'],
        tip: 'Lead the target — don\'t wait for it to reach you.',
        games: ['apex', 'fortnite', 'rivals', 'arsenal'],
        subcat: 'Dynamic Clicking'
      },
      static: {
        beginner:     ['Microshot Ultimate', 'Spidershot'],
        intermediate: ['Microshot Advanced', 'Strafeshot Ultimate'],
        advanced:     ['Microshot Expert', 'Precise Orbit Small'],
        tip: 'Hold breath, click once cleanly — no spam.',
        games: ['valorant', 'cs2'],
        subcat: 'Static Clicking'
      },
      linear: {
        beginner:     ['Strafeshot Ultimate', 'Groundshot Wide 180'],
        intermediate: ['Strafeshot Advanced', 'Groundshot Wide 180 Hard'],
        advanced:     ['Strafeshot Expert', 'Voltaic Strafeshot Master'],
        tip: 'Stay at the same horizontal level as strafing targets.',
        games: ['cs2', 'valorant'],
        subcat: 'Linear Clicking'
      }
    },
    tracking: {
      precise: {
        beginner:     ['Smoothbot Ultimate', 'Kinect Smoothbot'],
        intermediate: ['Smoothbot Advanced', 'Smoothbot Hard'],
        advanced:     ['Smoothbot Expert', 'Smoothbot Adept'],
        tip: 'Keep your cursor in the center — smooth wins over fast.',
        games: ['valorant', 'cs2'],
        subcat: 'Precise Tracking'
      },
      reactive: {
        beginner:     ['Reactionshot', 'Multishot'],
        intermediate: ['Reactionshot Hard', 'Kinect Reactiontrack'],
        advanced:     ['Reactionshot Expert', 'Voltaic Reactive Master'],
        tip: 'React to direction changes — don\'t predict, follow.',
        games: ['apex', 'overwatch'],
        subcat: 'Reactive Tracking'
      },
      control: {
        beginner:     ['Peanut Butter', 'Motion Path'],
        intermediate: ['Bounce 180', 'Kinect Control Track'],
        advanced:     ['Bounce 180 Hard', 'Controltrack Expert'],
        tip: 'Large strokes with arm, micro with wrist.',
        games: ['overwatch', 'apex'],
        subcat: 'Control Tracking'
      }
    },
    switching: {
      speed: {
        beginner:     ['Sixshot', 'Speedshot'],
        intermediate: ['Sixshot Hard', 'Speedshot Hard'],
        advanced:     ['Sixshot Expert', 'Voltaic Sixshot Master'],
        tip: 'Move fast but acquire cleanly — speed is useless without accuracy.',
        games: ['fortnite', 'apex', 'rivals', 'arsenal'],
        subcat: 'Speed Switching'
      },
      evasive: {
        beginner:     ['Spidershot Motion', 'Evasive Bot'],
        intermediate: ['Spidershot Motion Hard', 'Evasive Bot Hard'],
        advanced:     ['Spidershot Motion Expert', 'Evasive Master'],
        tip: 'Cut angles — aim where the target will be, not where it is.',
        games: ['apex', 'overwatch'],
        subcat: 'Evasive Switching'
      },
      stability: {
        beginner:     ['Multitarget', 'Preciseshot'],
        intermediate: ['Multitarget Hard', 'Preciseshot Hard'],
        advanced:     ['Multitarget Expert', 'Voltaic Stability Master'],
        tip: 'Breathe between targets — controlled speed beats rushed shots.',
        games: ['valorant', 'cs2'],
        subcat: 'Stability Switching'
      }
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════
// GAME BIAS CONFIG
// Defines how each game profile modifies subcategory weights
// Values are multipliers applied to base training split
// ═══════════════════════════════════════════════════════════════════════

const GAME_BIAS = {
  all: {
    label: 'All Games', icon: '🎮',
    bias: { dynamic:1, static:1, linear:1, precise:1, reactive:1, control:1, speed:1, evasive:1, stability:1 }
  },
  valorant: {
    label: 'Valorant', icon: '⚔️',
    desc: 'One-tap headshots, counter-strafing, precise micro-flicks & tight angles',
    bias: { dynamic:0.5, static:2.3, linear:1.2, precise:2.0, reactive:0.6, control:0.9, speed:0.5, evasive:0.5, stability:1.9 }
  },
  cs2: {
    label: 'CS2', icon: '💣',
    desc: 'One-tap headshots, spray control, strafing enemies',
    bias: { dynamic:0.8, static:2.2, linear:1.6, precise:1.4, reactive:0.7, control:0.9, speed:0.6, evasive:0.6, stability:1.8 }
  },
  apex: {
    label: 'Apex Legends', icon: '🦾',
    desc: 'Movement-heavy, SMG tracking, reactive target jumping',
    bias: { dynamic:1.4, static:0.7, linear:0.9, precise:0.8, reactive:1.8, control:1.4, speed:1.4, evasive:1.6, stability:0.8 }
  },
  overwatch: {
    label: 'Overwatch 2', icon: '🦸',
    desc: 'Hero tracking, large hitboxes, ability-based movement',
    bias: { dynamic:1.0, static:0.7, linear:0.8, precise:0.8, reactive:1.4, control:2.0, speed:1.0, evasive:1.4, stability:0.9 }
  },
  fortnite: {
    label: 'Fortnite', icon: '🏗️',
    desc: 'Fast edit-shoot cycles, pump shotgun flicks, building rotations',
    bias: { dynamic:1.4, static:1.0, linear:0.8, precise:0.9, reactive:1.2, control:0.9, speed:1.8, evasive:1.2, stability:0.8 }
  },
  rivals: {
    label: 'Roblox Rivals', icon: '🎯',
    desc: 'Fast-paced Roblox FPS — SMG spray, fast respawns, medium-range duels',
    bias: { dynamic:1.5, static:0.8, linear:1.1, precise:0.8, reactive:1.6, control:1.2, speed:1.6, evasive:1.3, stability:0.7 }
  },
  arsenal: {
    label: 'Roblox Arsenal', icon: '🔫',
    desc: 'Kill-to-advance weapon cycling — fast flicks, wide map angles, high pace',
    bias: { dynamic:1.3, static:0.9, linear:0.9, precise:0.7, reactive:1.4, control:1.0, speed:2.0, evasive:1.2, stability:0.7 }
  }
};

// ═══════════════════════════════════════════════════════════════════════
// WARMUP GAME PROFILES
// Each profile controls: target size, speed, spawn range, count, tips
// These simulate how each game FEELS mechanically in 3D warmup
// ═══════════════════════════════════════════════════════════════════════

const WARMUP_PROFILES = {
  all: {
    label: 'General', icon: '🎮',
    radius:     { easy: 0.50, medium: 0.35, hard: 0.22 },
    trackSpeed: { easy: 0.030, medium: 0.055, hard: 0.090 },
    flickRangeX: 18, flickRangeY: 7,
    switchCount: 5,
    targetColor: { tracking: 0x7c3aed, flicking: 0xef4444, switching: 0x3b82f6 },
    emissiveColor:{ tracking: 0x3b0764, flicking: 0x7f1d1d, switching: 0x1e3a8a },
    spawnDepth: { min: 8, max: 14 },
    tips: {
      tracking:  ['Keep your crosshair ahead of the target — predict, don\'t chase.',
                  'Use your arm for big sweeps, wrist for fine-tuning.',
                  'Stay relaxed — tension causes jitter and slows reaction time.'],
      flicking:  ['Move fast but stop cleanly — a controlled stop scores more.',
                  'Flick with your arm, micro-correct with your wrist.',
                  'Don\'t click too early — let the cursor settle first.'],
      switching: ['Arrive on target before clicking — don\'t click while moving.',
                  'Move your eyes to the next target before your hand.',
                  'Prioritize closer targets to reduce total travel distance.']
    }
  },

  rivals: {
    label: 'Roblox Rivals', icon: '🎯',
    // Rivals: medium-close range, fast movement, SMG spray
    radius:     { easy: 0.48, medium: 0.34, hard: 0.23 },
    trackSpeed: { easy: 0.055, medium: 0.085, hard: 0.120 }, // fast — SMG targets
    flickRangeX: 20, flickRangeY: 7,
    switchCount: 6,
    targetColor: { tracking: 0x22c55e, flicking: 0xf97316, switching: 0xeab308 },
    emissiveColor:{ tracking: 0x14532d, flicking: 0x7c2d12, switching: 0x713f12 },
    spawnDepth: { min: 6, max: 11 }, // closer range — Rivals is close-mid
    tips: {
      tracking:  ['Rivals uses SMG spray — track center-mass, not the head.',
                  'Targets move fast. Lead by half a body width and hold.',
                  'Rivals strafing is erratic — train reactive tracking, not just precise.'],
      flicking:  ['Rivals headshots reward you — aim high on the target sphere.',
                  'SMG bloom means you hold fire slightly — don\'t tap too fast.',
                  'Rivals angles are tight. Train short, precise flicks not wide sweeps.'],
      switching: ['After a kill in Rivals, reset your aim to spawn angle.',
                  'Learn common respawn zones — pre-aim before the kill confirmation.',
                  'Fast switching beats accuracy in Rivals — speed wins rounds.']
    }
  },

  arsenal: {
    label: 'Roblox Arsenal', icon: '🔫',
    // Arsenal: hyper-fast kills to cycle weapons, close-range frenzy
    radius:     { easy: 0.50, medium: 0.36, hard: 0.26 }, // bigger targets, faster pace
    trackSpeed: { easy: 0.065, medium: 0.100, hard: 0.150 }, // very fast — Arsenal chaos
    flickRangeX: 22, flickRangeY: 9,
    switchCount: 7, // Arsenal = more kills = more switching practice
    targetColor: { tracking: 0xf43f5e, flicking: 0xfbbf24, switching: 0xa855f7 },
    emissiveColor:{ tracking: 0x881337, flicking: 0x92400e, switching: 0x581c87 },
    spawnDepth: { min: 5, max: 10 }, // very close range
    tips: {
      tracking:  ['Arsenal maps are tiny — targets are close. Use wrist more than arm.',
                  'Tracking in Arsenal: short bursts, reacquire fast after each kill.',
                  'Arsenal movement is rapid and chaotic. Train reactive over precise tracking.'],
      flicking:  ['Arsenal = 1-tap kill speed. Flick instantly — no hesitation.',
                  'Each weapon has a different TTK — flick timing changes with each kill.',
                  'Arsenal close-range: flick to upper-chest or head, then hold click.'],
      switching: ['Arsenal cycling is relentless — muscle memory for common spawn angles.',
                  'After each kill, snap crosshair to center screen before next target.',
                  'Speed switching is the #1 skill in Arsenal — speed over precision.']
    }
  },

  valorant: {
    label: 'Valorant', icon: '⚔️',
    // Valorant: small precise heads, slow strafing, corridor distances
    radius:     { easy: 0.36, medium: 0.22, hard: 0.14 }, // small! — Valorant heads
    trackSpeed: { easy: 0.022, medium: 0.038, hard: 0.058 }, // slow — counter-strafe meta
    flickRangeX: 14, flickRangeY: 4, // narrow — Valorant is corridor angles
    switchCount: 4,
    targetColor: { tracking: 0xff4655, flicking: 0xff4655, switching: 0xff4655 },
    emissiveColor:{ tracking: 0x7f2329, flicking: 0x7f2329, switching: 0x7f2329 },
    spawnDepth: { min: 10, max: 18 }, // long range — Vandal/Operator angles
    tips: {
      tracking:  ['Valorant agents counter-strafe to stop instantly — wait for the still frame.',
                  'Track the upper 20% of the target — always head-level.',
                  'Hold common strafe positions — don\'t chase random movement.'],
      flicking:  ['Valorant rewards patience over raw speed. Slow down, place precisely.',
                  'Flick to head level every time — Vandal is one-tap to the head.',
                  'After a flick, hold the angle — don\'t immediately re-flick.',
                  'Operator flicks: flick, wait for scope wobble to settle, then click.'],
      switching: ['Val multi-kills are rare — each switch is a deliberate new peek angle.',
                  'Use utility knowledge to pre-aim before switching targets.',
                  'Switching in Valorant: move fast between targets, but stop to shoot.']
    }
  },

  cs2: {
    label: 'CS2', icon: '💣',
    radius:     { easy: 0.38, medium: 0.24, hard: 0.15 },
    trackSpeed: { easy: 0.024, medium: 0.040, hard: 0.062 },
    flickRangeX: 15, flickRangeY: 4,
    switchCount: 4,
    targetColor: { tracking: 0xf59e0b, flicking: 0xf59e0b, switching: 0xf59e0b },
    emissiveColor:{ tracking: 0x78350f, flicking: 0x78350f, switching: 0x78350f },
    spawnDepth: { min: 10, max: 20 },
    tips: {
      tracking:  ['CS2 spray control: track the recoil pattern, not just the enemy.',
                  'At long range: single-tap between full stops. Track only at close range.',
                  'CS2 targets counter-strafe — train snap acquisition on stopped targets.'],
      flicking:  ['CS2 AWP: flick, scope-in and release instantly. Don\'t drag.',
                  'AK one-taps: flick to head, click once. No follow-through.',
                  'Flick accuracy matters more than speed in CS2 — slow it down.'],
      switching: ['CS2 switching = clearing sites. Pre-aim each angle before committing.',
                  'Flash before switching angles — never switch blind in CS2.',
                  'Pistol rounds: fast switching wins — speed over accuracy.']
    }
  },

  apex: {
    label: 'Apex Legends', icon: '🦾',
    radius:     { easy: 0.52, medium: 0.40, hard: 0.28 }, // larger — Apex hitboxes
    trackSpeed: { easy: 0.060, medium: 0.095, hard: 0.140 }, // very fast movement
    flickRangeX: 22, flickRangeY: 10,
    switchCount: 5,
    targetColor: { tracking: 0xf97316, flicking: 0xf97316, switching: 0xf97316 },
    emissiveColor:{ tracking: 0x7c2d12, flicking: 0x7c2d12, switching: 0x7c2d12 },
    spawnDepth: { min: 7, max: 13 },
    tips: {
      tracking:  ['Apex movement is wild — train control + reactive tracking equally.',
                  'Octane/Pathfinder move vertically — train tracking with pitch changes.',
                  'Track center mass on Apex — hitboxes are large but movement is chaotic.'],
      flicking:  ['Apex shields mean more shots — flick and hold, don\'t tap and release.',
                  'Wingman flicks: one-flick, hold briefly for 2 shots, adjust.',
                  'R301/Flatline: flick to center mass then track during spray.'],
      switching: ['Apex squads: switch target based on who has lowest shield — game sense.',
                  'Switching quickly in Apex wins team fights. Train speed.',
                  'Use slide/jump to reposition between target switches.']
    }
  }
};

// Warmup-specific active game (separate from routines active game)
let warmupActiveGame = 'all';

let state = {
  trainer: 'aimlabs',
  rank: 'beginner',
  flicking: 34,
  tracking: 33,
  switching: 33,
  totalTasks: 9,
  activeGame: 'all',
  currentSection: 'routines',
  currentPlaylist: []
};

// ═══════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════

function showToast(msg, dur = 2500) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), dur);
}

function clamp(v, mn, mx) { return Math.max(mn, Math.min(mx, v)); }

// ═══════════════════════════════════════════════════════════════════════
// SECTION / URL ROUTING
// ═══════════════════════════════════════════════════════════════════════

function initRouting() {
  const path = window.location.pathname;
  let section = 'routines';
  if (path.includes('converters')) section = 'converters';
  else if (path.includes('warmup')) section = 'warmup';
  switchSection(section, false);

  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const s = a.dataset.section;
      switchSection(s, true);
      window.history.pushState({}, '', a.href);
    });
  });
}

function switchSection(name, animate) {
  state.currentSection = name;
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.section === name);
  });
  const el = document.getElementById(name);
  if (el) el.classList.add('active');

  // Routine filter bar — routines only
  const bar = document.getElementById('gameFilterBar');
  if (bar) bar.style.display = (name === 'routines') ? '' : 'none';
  // Warmup filter bar — warmup only
  const wbar = document.getElementById('warmupGameFilterBar');
  if (wbar) wbar.style.display = ''; // always visible in warmup section (section visibility handles hide)
}

// ═══════════════════════════════════════════════════════════════════════
// ROUTINES
// ═══════════════════════════════════════════════════════════════════════

function initRoutines() {
  // Platform toggle
  document.querySelectorAll('[data-trainer]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-trainer]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.trainer = btn.dataset.trainer;
      generatePlaylist();
    });
  });

  // Rank selector
  document.querySelectorAll('[data-rank]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-rank]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.rank = btn.dataset.rank;
      generatePlaylist();
    });
  });

  // Sliders
  const sliders = { flicking: 34, tracking: 33, switching: 33 };
  const sliderIds = ['flicking', 'tracking', 'switching'];

  sliderIds.forEach(key => {
    const el = document.getElementById(key + 'Slider');
    if (!el) return;
    el.addEventListener('input', () => {
      sliders[key] = parseInt(el.value);
      rebalanceSliders(key, sliders);
      sliderIds.forEach(k => {
        const sv = document.getElementById(k + 'Val');
        const sl = document.getElementById(k + 'Slider');
        if (sv) sv.textContent = sliders[k] + '%';
        if (sl) sl.value = sliders[k];
      });
      state.flicking = sliders.flicking;
      state.tracking = sliders.tracking;
      state.switching = sliders.switching;
      generatePlaylist();
    });
  });

  // Game filter bar (routines)
  document.querySelectorAll('#gameFilterBar .game-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#gameFilterBar .game-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeGame = btn.dataset.game;
      generatePlaylist();
    });
  });

  // Copy playlist
  const copyBtn = document.getElementById('copyPlaylist');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (!state.currentPlaylist.length) return;
      const text = state.currentPlaylist.map((t, i) => `${i + 1}. ${t.name}`).join('\n');
      navigator.clipboard.writeText(text).then(() => showToast('📋 Playlist copied!')).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('📋 Playlist copied!');
      });
    });
  }

  generatePlaylist();
}

function rebalanceSliders(changed, vals) {
  const others = ['flicking', 'tracking', 'switching'].filter(k => k !== changed);
  const changedVal = vals[changed];
  const remaining = 100 - changedVal;
  const total = vals[others[0]] + vals[others[1]];
  if (total === 0) {
    vals[others[0]] = Math.floor(remaining / 2);
    vals[others[1]] = remaining - vals[others[0]];
  } else {
    vals[others[0]] = Math.round((vals[others[0]] / total) * remaining);
    vals[others[1]] = remaining - vals[others[0]];
  }
}

/**
 * Weighted random pick with bias applied per game profile.
 * Returns array of task objects: { name, category, subcategory, tip, gameTags }
 */
function generatePlaylist() {
  const db = DB[state.trainer];
  const rank = state.rank;
  const gameBias = GAME_BIAS[state.activeGame]?.bias || GAME_BIAS.all.bias;

  // Build weighted subcategory pool
  const clickingWeight = state.flicking / 100;
  const trackingWeight = state.tracking / 100;
  const switchingWeight = state.switching / 100;

  const subcatPool = [
    // Clicking subcats
    { key: 'dynamic',   cat: 'clicking',  catLabel: '⚡ Flicking', weight: clickingWeight * (1/3) * gameBias.dynamic },
    { key: 'static',    cat: 'clicking',  catLabel: '⚡ Flicking', weight: clickingWeight * (1/3) * gameBias.static },
    { key: 'linear',    cat: 'clicking',  catLabel: '⚡ Flicking', weight: clickingWeight * (1/3) * gameBias.linear },
    // Tracking subcats
    { key: 'precise',   cat: 'tracking',  catLabel: '🎯 Tracking', weight: trackingWeight * (1/3) * gameBias.precise },
    { key: 'reactive',  cat: 'tracking',  catLabel: '🎯 Tracking', weight: trackingWeight * (1/3) * gameBias.reactive },
    { key: 'control',   cat: 'tracking',  catLabel: '🎯 Tracking', weight: trackingWeight * (1/3) * gameBias.control },
    // Switching subcats
    { key: 'speed',     cat: 'switching', catLabel: '🔀 Switching', weight: switchingWeight * (1/3) * gameBias.speed },
    { key: 'evasive',   cat: 'switching', catLabel: '🔀 Switching', weight: switchingWeight * (1/3) * gameBias.evasive },
    { key: 'stability', cat: 'switching', catLabel: '🔀 Switching', weight: switchingWeight * (1/3) * gameBias.stability },
  ];

  const totalTasks = state.totalTasks;
  const chosen = [];

  // Weighted selection (ensure at least 1 from each main category if possible)
  const totalW = subcatPool.reduce((s, e) => s + e.weight, 0);

  for (let i = 0; i < totalTasks; i++) {
    let r = Math.random() * totalW;
    let pick = subcatPool[subcatPool.length - 1];
    for (const item of subcatPool) {
      r -= item.weight;
      if (r <= 0) { pick = item; break; }
    }
    const scenarioData = db[pick.cat][pick.key];
    const scenarios = scenarioData[rank];
    const scenarioName = scenarios[Math.floor(Math.random() * scenarios.length)];
    chosen.push({
      name: scenarioName,
      category: pick.cat,
      catLabel: pick.catLabel,
      subcategory: pick.key,
      subcatLabel: scenarioData.subcat,
      tip: scenarioData.tip,
      gameTags: scenarioData.games || []
    });
  }

  state.currentPlaylist = chosen;
  renderPlaylist(chosen);
}

function renderPlaylist(tasks) {
  const grid = document.getElementById('taskGrid');
  const subtitle = document.getElementById('playlistSubtitle');
  if (!grid) return;

  const gameInfo = GAME_BIAS[state.activeGame];
  const trainerLabel = state.trainer === 'kovaaks' ? 'KovaaK\'s' : 'Aimlabs';
  const rankLabel = state.rank.charAt(0).toUpperCase() + state.rank.slice(1);
  const gameLabel = gameInfo ? ` · ${gameInfo.icon} ${gameInfo.label}` : '';

  if (subtitle) {
    subtitle.textContent = `${trainerLabel} · ${rankLabel}${gameLabel}`;
    if (gameInfo?.desc && state.activeGame !== 'all') {
      subtitle.title = gameInfo.desc;
    }
  }

  const catColors = {
    clicking:  { bg: 'rgba(239,68,68,.12)',    border: 'rgba(239,68,68,.25)',   accent: '#f87171' },
    tracking:  { bg: 'rgba(59,130,246,.12)',   border: 'rgba(59,130,246,.25)',  accent: '#60a5fa' },
    switching: { bg: 'rgba(168,85,247,.12)',   border: 'rgba(168,85,247,.25)', accent: '#c084fc' }
  };

  grid.innerHTML = '';
  tasks.forEach((task, i) => {
    const c = catColors[task.category] || catColors.clicking;
    const isGameTagged = state.activeGame !== 'all' && task.gameTags.includes(state.activeGame);

    const card = document.createElement('div');
    card.className = 'task-card' + (isGameTagged ? ' game-tagged' : '');
    card.style.cssText = `
      --card-bg: ${c.bg};
      --card-border: ${c.border};
      --card-accent: ${c.accent};
      animation-delay: ${i * 40}ms;
    `;

    // Game tags HTML
    const tagHtml = task.gameTags.length
      ? `<div class="task-game-tags">${task.gameTags.map(g =>
          `<span class="task-game-tag ${g}">${GAME_BIAS[g]?.icon || ''} ${GAME_BIAS[g]?.label || g}</span>`
        ).join('')}</div>`
      : '';

    card.innerHTML = `
      <div class="task-num">${i + 1}</div>
      <div class="task-body">
        <div class="task-cat-label">${task.catLabel}</div>
        <span class="task-subcategory">${task.subcatLabel}</span>
        <div class="task-name">${task.name}</div>
        ${task.tip ? `<div class="task-tip">${task.tip}</div>` : ''}
        ${tagHtml}
      </div>
      <div class="task-meta">
        <div class="task-check" title="Mark complete">✓</div>
      </div>
    `;

    card.querySelector('.task-check').addEventListener('click', function () {
      card.classList.toggle('done');
      this.textContent = card.classList.contains('done') ? '✓' : '✓';
    });

    grid.appendChild(card);
  });
}

// ═══════════════════════════════════════════════════════════════════════
// CONVERTERS
// ═══════════════════════════════════════════════════════════════════════

const YAW = {
  rivals:    0.37503,
  arsenal:   0.37503,
  aimlabs:   0.05,
  kovaaks:   0.022,
  valorant:  0.07,
  cs2:       0.022,
  apex:      0.022,
  overwatch: 0.0066
};

const FOV_DEFAULT_VFOV = {
  rivals: 80, arsenal: 70, aimlabs: 70, kovaaks: null,
  valorant: null, cs2: null, apex: null
};

function initConverters() {
  const sensFrom   = document.getElementById('sensFrom');
  const sensTo     = document.getElementById('sensTo');
  const sensInput  = document.getElementById('rivalsSens');
  const dpiFrom    = document.getElementById('mouseDPIFrom');
  const dpiTo      = document.getElementById('mouseDPITo');
  const sensOutput = document.getElementById('sensOutput');
  const sensNote   = document.getElementById('sensNote');
  const sensRNote  = document.getElementById('sensRivalsNote');
  const sensSwap   = document.getElementById('sensSwapBtn');
  const dpiLock    = document.getElementById('dpiLockBtn');
  const sensQuick  = document.getElementById('sensQuick');
  const sqGrid     = document.getElementById('sqGrid');
  const multRow    = document.getElementById('sensMultiplierRow');
  const multInput  = document.getElementById('rivalsMultiplier');
  const sensFromLbl = document.getElementById('sensFromLabel');

  let dpiLocked = false;

  if (!sensFrom) return;

  function updateSensLabel() {
    const from = sensFrom.value;
    if (sensFromLbl) {
      const labels = {
        rivals: 'Camera Sensitivity',
        arsenal: 'Sensitivity',
        aimlabs: 'Sensitivity',
        kovaaks: 'Sensitivity',
        valorant: 'Sensitivity',
        cs2: 'Sensitivity',
        apex: 'Sensitivity',
        overwatch: 'Sensitivity'
      };
      sensFromLbl.textContent = labels[from] || 'Sensitivity';
    }
    if (multRow) multRow.style.display = (from === 'rivals') ? '' : 'none';
  }

  function calcSens() {
    const from = sensFrom.value;
    const to   = sensTo.value;
    const rawSens = parseFloat(sensInput?.value);
    const fromDPI = parseFloat(dpiFrom?.value) || 800;
    const toDPI   = parseFloat(dpiTo?.value) || 800;
    const mult = (from === 'rivals') ? (parseFloat(multInput?.value) / 100 || 1) : 1;

    if (isNaN(rawSens) || rawSens <= 0) {
      if (sensOutput) sensOutput.textContent = '—';
      if (sensNote)   sensNote.textContent = 'Enter your sensitivity and DPI above';
      if (sensQuick)  sensQuick.style.display = 'none';
      return;
    }

    const effectiveSens = rawSens * mult;
    const cm360From = 360 / (fromDPI * YAW[from] * effectiveSens) * 2.54;
    const result = (fromDPI * YAW[from] * effectiveSens) / (toDPI * YAW[to]);

    if (sensOutput) sensOutput.textContent = result.toFixed(6);
    if (sensNote)   sensNote.textContent = `≈ ${cm360From.toFixed(1)} cm/360°`;
    if (sensRNote)  sensRNote.style.display = (to === 'rivals') ? '' : 'none';

    // Quick reference table
    if (sensQuick && sqGrid) {
      const allGames = Object.keys(YAW);
      const rows = allGames.map(game => {
        const converted = (fromDPI * YAW[from] * effectiveSens) / (toDPI * YAW[game]);
        return `<div class="sq-row"><span class="sq-game">${game.charAt(0).toUpperCase() + game.slice(1)}</span><span class="sq-val">${converted.toFixed(5)}</span></div>`;
      });
      sqGrid.innerHTML = rows.join('');
      sensQuick.style.display = '';
    }
  }

  sensFrom?.addEventListener('change', () => { updateSensLabel(); calcSens(); });
  sensTo?.addEventListener('change', calcSens);
  sensInput?.addEventListener('input', calcSens);
  dpiFrom?.addEventListener('input', () => {
    if (dpiLocked && dpiTo) dpiTo.value = dpiFrom.value;
    calcSens();
  });
  dpiTo?.addEventListener('input', calcSens);
  multInput?.addEventListener('input', calcSens);

  sensSwap?.addEventListener('click', () => {
    const tmp = sensFrom.value;
    sensFrom.value = sensTo.value;
    sensTo.value = tmp;
    updateSensLabel();
    calcSens();
  });

  dpiLock?.addEventListener('click', () => {
    dpiLocked = !dpiLocked;
    dpiLock.classList.toggle('locked', dpiLocked);
    if (dpiLocked && dpiTo && dpiFrom) dpiTo.value = dpiFrom.value;
  });

  updateSensLabel();

  // FOV Converter
  const fovBtn = document.getElementById('convertFOV');
  if (fovBtn) {
    fovBtn.addEventListener('click', calcFOV);
    document.getElementById('fovFrom')?.addEventListener('change', calcFOV);
    document.getElementById('fovTo')?.addEventListener('change', calcFOV);
    document.getElementById('robloxVFOV')?.addEventListener('input', calcFOV);
    document.getElementById('fovAspect')?.addEventListener('change', calcFOV);
    document.getElementById('fovSwapBtn')?.addEventListener('click', () => {
      const ff = document.getElementById('fovFrom');
      const ft = document.getElementById('fovTo');
      const tmp = ff.value; ff.value = ft.value; ft.value = tmp;
      calcFOV();
    });
  }
}

function calcFOV() {
  const from   = document.getElementById('fovFrom')?.value;
  const to     = document.getElementById('fovTo')?.value;
  const vfov   = parseFloat(document.getElementById('robloxVFOV')?.value);
  const aspect = parseFloat(document.getElementById('fovAspect')?.value) || 16/9;
  const out    = document.getElementById('fovOutput');
  const hOut   = document.getElementById('fovHfovOut');
  const hRow   = document.getElementById('fovHfovRow');
  const fovType = document.getElementById('fovType');

  if (!from || !to || isNaN(vfov) || vfov <= 0) return;

  // Convert VFOV to HFOV
  const vRad  = vfov * Math.PI / 180;
  const hRad  = 2 * Math.atan(Math.tan(vRad / 2) * aspect);
  const hfov  = hRad * 180 / Math.PI;

  // For KovaaK's output HFOV, for others output VFOV
  const isToKovaaks = to === 'kovaaks';
  const result = isToKovaaks ? hfov : vfov;
  const typeLabel = isToKovaaks ? 'Horizontal' : 'Vertical';

  if (out) out.textContent = result.toFixed(1);
  if (fovType) fovType.textContent = typeLabel;
  if (hOut)  hOut.textContent = hfov.toFixed(1) + '°';
  if (hRow)  hRow.style.display = isToKovaaks ? '' : '';
}

// ═══════════════════════════════════════════════════════════════════════
// 3D WARMUP — FIXED SHOOTING
// Key fixes:
//  1. mousedown on document (not canvas click) — works while pointer locked
//  2. raycaster.setFromCamera with {x:0,y:0} — uses camera center
//  3. pointerlockerror + pointerchange handlers for robust state management
// ═══════════════════════════════════════════════════════════════════════

let warmupState = {
  mode: 'tracking',
  isPlaying: false,
  score: 0,
  shots: 0,
  hits: 0,
  timeLeft: 30,
  best: {},
  animFrameId: null,
  tickId: null,
  targets: [],
  trackTarget: null,
  switchIndex: 0,
  difficulty: 'medium',
};

function initWarmup() {
  const canvas = document.getElementById('warmupCanvas');
  if (!canvas) return;

  // Tab switching
  document.querySelectorAll('.game-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.game-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      warmupState.mode = btn.dataset.game;
      resetWarmup();
      updateWarmupBadge();
      updateWarmupGameBanner();
      updateTip();
    });
  });

  // Warmup game filter bar
  document.querySelectorAll('#warmupGameFilterBar .warmup-game-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#warmupGameFilterBar .warmup-game-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      warmupActiveGame = btn.dataset.wgame;
      updateWarmupGameBanner();
      updateTip();
      if (!warmupState.isPlaying) spawnTargets();
    });
  });

  // Controls
  document.getElementById('restartGame')?.addEventListener('click', resetWarmup);
  document.getElementById('btnStartGame')?.addEventListener('click', startWarmup);
  document.getElementById('fullscreenBtn')?.addEventListener('click', () => {
    const wrap = document.getElementById('canvasWrap');
    if (!document.fullscreenElement) wrap?.requestFullscreen();
    else document.exitFullscreen();
  });

  // Leaderboard tabs
  document.querySelectorAll('.lb-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lb-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (typeof Scores !== 'undefined') Scores.loadLeaderboard(btn.dataset.lbmode);
    });
  });

  // Score modal
  document.getElementById('nmSubmit')?.addEventListener('click', submitScore);
  document.getElementById('nmSkip')?.addEventListener('click', closeNameModal);

  // Duration/difficulty
  document.getElementById('gameDuration')?.addEventListener('change', () => {
    warmupState.timeLeft = parseInt(document.getElementById('gameDuration').value);
    document.getElementById('wTimer').textContent = warmupState.timeLeft;
    if (warmupState.isPlaying) resetWarmup();
  });
  document.getElementById('gameDifficulty')?.addEventListener('change', resetWarmup);

  // ── Pointer lock & shooting ──────────────────────────────────────────
  canvas.addEventListener('click', () => {
    if (!warmupState.isPlaying) return;
    if (document.pointerLockElement !== canvas) {
      canvas.requestPointerLock();
    }
  });

  // PRIMARY FIX: Listen mousedown on document — fires when pointer locked
  document.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    if (document.pointerLockElement !== canvas) return;
    if (!warmupState.isPlaying) return;
    shoot3D();
  });

  document.addEventListener('pointerlockchange', () => {
    const locked = document.pointerLockElement === canvas;
    const wrap = document.getElementById('canvasWrap');
    const prompt = document.getElementById('pointerPrompt');
    wrap?.classList.toggle('locked', locked);
    if (prompt) prompt.style.display = (warmupState.isPlaying && !locked) ? '' : 'none';
  });

  document.addEventListener('pointerlockerror', () => {
    showToast('⚠️ Pointer lock failed — click the game area to try again');
  });

  // Mouse movement for camera
  document.addEventListener('mousemove', e => {
    if (document.pointerLockElement !== canvas) return;
    if (!warmup3D.camera) return;
    const sens = parseFloat(document.getElementById('gameSensitivity')?.value) || 0.0022;
    warmup3D.yaw   -= e.movementX * sens;
    warmup3D.pitch -= e.movementY * sens;
    warmup3D.pitch = clamp(warmup3D.pitch, -Math.PI / 2.1, Math.PI / 2.1);
  });

  initThreeJS();
  updateWarmupBadge();
  updateWarmupGameBanner();
  updateTip();
}

// ── Three.js state object ──────────────────────────────────────────────
const warmup3D = {
  scene: null, camera: null, renderer: null,
  raycaster: null,
  targets: [],     // meshes
  trackTarget: null,
  yaw: 0, pitch: 0,
  trackVel: { x: 0, y: 0, z: 0 },
  switchIndex: 0,
  switchTargets: []
};

function initThreeJS() {
  const canvas = document.getElementById('warmupCanvas');
  const wrap   = document.getElementById('canvasWrap');
  if (!canvas || typeof THREE === 'undefined') return;

  const W = wrap.clientWidth  || 800;
  const H = wrap.clientHeight || 420;

  warmup3D.scene = new THREE.Scene();
  warmup3D.scene.background = new THREE.Color(0x0f0f14);
  warmup3D.scene.fog = new THREE.Fog(0x0f0f14, 20, 80);

  warmup3D.camera = new THREE.PerspectiveCamera(90, W / H, 0.1, 200);
  warmup3D.camera.position.set(0, 0, 0);

  warmup3D.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  warmup3D.renderer.setSize(W, H);
  warmup3D.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  warmup3D.raycaster = new THREE.Raycaster();

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  warmup3D.scene.add(ambient);
  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(5, 10, 5);
  warmup3D.scene.add(dir);

  // Arena floor/walls (visual grid)
  const gridHelper = new THREE.GridHelper(60, 30, 0x222233, 0x1a1a2e);
  gridHelper.position.y = -4;
  warmup3D.scene.add(gridHelper);

  // Resize observer
  new ResizeObserver(() => {
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    warmup3D.renderer.setSize(w, h);
    warmup3D.camera.aspect = w / h;
    warmup3D.camera.updateProjectionMatrix();
  }).observe(wrap);

  spawnTargets();
  renderLoop();
}

function spawnTargets() {
  // Clear existing targets
  warmup3D.targets.forEach(t => warmup3D.scene.remove(t));
  warmup3D.targets = [];

  const mode    = warmupState.mode;
  const diff    = document.getElementById('gameDifficulty')?.value || 'medium';
  const profile = WARMUP_PROFILES[warmupActiveGame] || WARMUP_PROFILES.all;

  const radius = profile.radius[diff];
  const count  = mode === 'switching' ? profile.switchCount : 1;

  const geo = new THREE.SphereGeometry(radius, 20, 20);

  const baseColor  = profile.targetColor[mode];
  const emissColor = profile.emissiveColor[mode];

  for (let i = 0; i < count; i++) {
    const mat = new THREE.MeshPhongMaterial({
      color:    baseColor,
      emissive: emissColor,
      shininess: 120,
      specular:  0x444444
    });
    const mesh = new THREE.Mesh(geo, mat);
    const depth = profile.spawnDepth.min + Math.random() * (profile.spawnDepth.max - profile.spawnDepth.min);
    mesh.position.set(
      (Math.random() - 0.5) * profile.flickRangeX,
      (Math.random() - 0.5) * profile.flickRangeY,
      -depth
    );
    warmup3D.scene.add(mesh);
    warmup3D.targets.push(mesh);
  }

  if (mode === 'switching') {
    warmup3D.switchIndex = 0;
    warmup3D.switchTargets = [...warmup3D.targets];
    highlightSwitchTarget();
  }

  if (mode === 'tracking') {
    const spd = profile.trackSpeed[diff];
    warmup3D.trackVel = {
      x: (Math.random() < 0.5 ? 1 : -1) * spd * (0.7 + Math.random() * 0.6),
      y: (Math.random() - 0.5) * spd * 0.5,
      z: 0
    };
  }
}

function highlightSwitchTarget() {
  warmup3D.switchTargets.forEach((t, i) => {
    const isActive = i === warmup3D.switchIndex;
    t.material.color.setHex(isActive ? 0xef4444 : 0x1e3a8a);
    t.material.emissive.setHex(isActive ? 0x7f1d1d : 0x0f1f4d);
    t.material.emissiveIntensity = isActive ? 0.6 : 0.2;
  });
}

function shoot3D() {
  warmupState.shots++;

  // Raycast from camera center
  warmup3D.raycaster.setFromCamera({ x: 0, y: 0 }, warmup3D.camera);
  const intersects = warmup3D.raycaster.intersectObjects(warmup3D.targets);

  const hitRing = document.getElementById('hitRing');

  if (intersects.length > 0) {
    const hitMesh = intersects[0].object;

    // Check if correct target in switching mode
    if (warmupState.mode === 'switching') {
      const expectedMesh = warmup3D.switchTargets[warmup3D.switchIndex];
      if (hitMesh !== expectedMesh) {
        // Miss: wrong target
        flashIndicator('miss');
        updateHUD();
        return;
      }
    }

    warmupState.hits++;
    warmupState.score++;

    // Hit flash
    flashIndicator('hit');

    if (warmupState.mode === 'flicking') {
      const profile = WARMUP_PROFILES[warmupActiveGame] || WARMUP_PROFILES.all;
      const depth = profile.spawnDepth.min + Math.random() * (profile.spawnDepth.max - profile.spawnDepth.min);
      hitMesh.position.set(
        (Math.random() - 0.5) * profile.flickRangeX,
        (Math.random() - 0.5) * profile.flickRangeY,
        -depth
      );
    } else if (warmupState.mode === 'switching') {
      warmup3D.switchIndex = (warmup3D.switchIndex + 1) % warmup3D.switchTargets.length;
      highlightSwitchTarget();
      warmupState.score++; // bonus for quick switch
    } else if (warmupState.mode === 'tracking') {
      // tracking: score for hitting moving target (handled continuously)
    }
  } else {
    // Miss
    flashIndicator('miss');
  }

  updateHUD();
}

function flashIndicator(type) {
  const wrap = document.getElementById('canvasWrap');
  if (!wrap) return;
  const el = document.createElement('div');
  el.className = type === 'hit' ? 'hit-flash' : 'miss-flash';
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 300);
}

let trackingScoreAccum = 0;
let trackingScoreTick = 0;

function renderLoop() {
  warmup3D.animFrameId = requestAnimationFrame(renderLoop);

  // Camera rotation from mouse input
  if (warmup3D.camera) {
    warmup3D.camera.rotation.order = 'YXZ';
    warmup3D.camera.rotation.y = warmup3D.yaw;
    warmup3D.camera.rotation.x = warmup3D.pitch;
  }

  // Move tracking target
  if (warmupState.isPlaying && warmupState.mode === 'tracking' && warmup3D.targets[0]) {
    const t = warmup3D.targets[0];
    const diff    = document.getElementById('gameDifficulty')?.value || 'medium';
    const profile = WARMUP_PROFILES[warmupActiveGame] || WARMUP_PROFILES.all;
    const spd     = profile.trackSpeed[diff];
    const accel   = spd * 0.06;

    warmup3D.trackVel.x += (Math.random() - 0.5) * accel;
    warmup3D.trackVel.y += (Math.random() - 0.5) * accel * 0.5;
    // Clamp speed
    const mag = Math.sqrt(warmup3D.trackVel.x ** 2 + warmup3D.trackVel.y ** 2);
    if (mag > spd) {
      warmup3D.trackVel.x = (warmup3D.trackVel.x / mag) * spd;
      warmup3D.trackVel.y = (warmup3D.trackVel.y / mag) * spd;
    }
    // Min speed clamp — keep it moving
    if (mag < spd * 0.3) {
      warmup3D.trackVel.x += (Math.random() - 0.5) * accel * 3;
      warmup3D.trackVel.y += (Math.random() - 0.5) * accel * 2;
    }

    t.position.x += warmup3D.trackVel.x;
    t.position.y += warmup3D.trackVel.y;

    // Bounce off bounds
    const bx = profile.flickRangeX / 2 - 1;
    const by = profile.flickRangeY / 2 - 0.5;
    if (Math.abs(t.position.x) > bx) { warmup3D.trackVel.x *= -1; t.position.x = Math.sign(t.position.x) * bx; }
    if (Math.abs(t.position.y) > by)  { warmup3D.trackVel.y *= -1; t.position.y = Math.sign(t.position.y) * by; }

    // Score for tracking proximity
    if (warmup3D.raycaster) {
      warmup3D.raycaster.setFromCamera({ x: 0, y: 0 }, warmup3D.camera);
      const ints = warmup3D.raycaster.intersectObject(t);
      if (ints.length > 0) {
        trackingScoreAccum += 1;
        if (trackingScoreAccum >= 6) { // every 6 frames
          warmupState.score++;
          trackingScoreAccum = 0;
          updateHUD();
        }
      }
    }
  }

  warmup3D.renderer?.render(warmup3D.scene, warmup3D.camera);
}

function startWarmup() {
  const overlay = document.getElementById('canvasOverlay');
  const canvas  = document.getElementById('warmupCanvas');
  if (overlay) overlay.style.display = 'none';

  warmupState.isPlaying = true;
  warmupState.score = 0;
  warmupState.shots = 0;
  warmupState.hits  = 0;
  trackingScoreAccum = 0;

  const dur = parseInt(document.getElementById('gameDuration')?.value) || 30;
  warmupState.timeLeft = dur;
  document.getElementById('wTimer').textContent = dur;
  document.getElementById('wScore').textContent = '0';
  document.getElementById('wAccuracy').textContent = '—';

  spawnTargets();

  // Request pointer lock
  canvas?.requestPointerLock();

  // Countdown
  clearInterval(warmupState.tickId);
  warmupState.tickId = setInterval(() => {
    warmupState.timeLeft--;
    document.getElementById('wTimer').textContent = warmupState.timeLeft;
    if (warmupState.timeLeft <= 0) endWarmup();
  }, 1000);
}

function endWarmup() {
  clearInterval(warmupState.tickId);
  warmupState.isPlaying = false;

  if (document.pointerLockElement) document.exitPointerLock();

  // Update best
  const mode = warmupState.mode;
  const diff = document.getElementById('gameDifficulty')?.value || 'medium';
  const key  = `${mode}-${diff}`;
  const prev = warmupState.best[key] || 0;
  if (warmupState.score > prev) warmupState.best[key] = warmupState.score;
  document.getElementById('wBest').textContent = warmupState.best[key];

  // Show name modal
  showNameModal();
}

function resetWarmup() {
  clearInterval(warmupState.tickId);
  warmupState.isPlaying = false;
  warmupState.score = 0;
  warmupState.shots = 0;
  warmupState.hits  = 0;
  trackingScoreAccum = 0;

  if (document.pointerLockElement) document.exitPointerLock();

  const dur = parseInt(document.getElementById('gameDuration')?.value) || 30;
  warmupState.timeLeft = dur;

  document.getElementById('wTimer').textContent = dur;
  document.getElementById('wScore').textContent = '0';
  document.getElementById('wAccuracy').textContent = '—';

  // Restore overlay
  const overlay = document.getElementById('canvasOverlay');
  if (overlay) overlay.style.display = '';

  spawnTargets();
  updateWarmupBadge();
  updateTip();
}

function updateHUD() {
  document.getElementById('wScore').textContent = warmupState.score;
  const acc = warmupState.shots > 0
    ? Math.round((warmupState.hits / warmupState.shots) * 100)
    : 0;
  const accEl = document.getElementById('wAccuracy');
  if (warmupState.mode !== 'tracking' && warmupState.shots > 0) {
    if (accEl) accEl.textContent = acc + '%';
  }
}

function updateWarmupBadge() {
  const mode = warmupState.mode;
  const badge = document.getElementById('overlayBadge');
  const title = document.getElementById('overlayTitle');
  const btn   = document.getElementById('btnStartGame');

  const modeMap = {
    tracking:  { label: '🎯 TRACKING',  title: 'READY?', btnClass: 'tracking-btn' },
    flicking:  { label: '⚡ FLICKING',  title: 'READY?', btnClass: 'flicking-btn' },
    switching: { label: '🔀 SWITCHING', title: 'READY?', btnClass: 'switching-btn' }
  };
  const m = modeMap[mode] || modeMap.tracking;

  if (badge) { badge.textContent = m.label; badge.className = `overlay-game-badge ${mode}`; }
  if (title) { title.textContent = m.title; }
  if (btn)   { btn.className = `btn-begin ${m.btnClass}`; }
}

function updateTip() {
  const mode    = warmupState.mode;
  const profile = WARMUP_PROFILES[warmupActiveGame] || WARMUP_PROFILES.all;
  const tips    = profile.tips[mode] || WARMUP_PROFILES.all.tips[mode];
  const tip     = tips[Math.floor(Math.random() * tips.length)];
  const el      = document.getElementById('tipText');
  if (el) el.textContent = tip;
}

function updateWarmupGameBanner() {
  const banner = document.getElementById('warmupGameBanner');
  if (!banner) return;
  const profile = WARMUP_PROFILES[warmupActiveGame] || WARMUP_PROFILES.all;

  // Remove all color classes
  banner.className = 'warmup-game-banner';

  if (warmupActiveGame === 'all') {
    banner.style.display = 'none';
    return;
  }
  banner.style.display = '';
  banner.classList.add(`${warmupActiveGame}-active`);

  const descriptions = {
    rivals:   'Targets tuned for close-mid range SMG duels. Fast movement, medium hitboxes.',
    arsenal:  'Targets tuned for hyper-fast Arsenal pace. Very fast, close range.',
    valorant: 'Targets tuned for Valorant heads. Small, precise, slow-strafe corridor angles.',
    cs2:      'Targets tuned for CS2 duels. Small heads, long range, deliberate pace.',
    apex:     'Targets tuned for Apex chaos. Large hitboxes, fast erratic movement.'
  };

  banner.innerHTML = `<span class="wgb-icon">${profile.icon}</span>
    <div><strong>${profile.label}</strong> — ${descriptions[warmupActiveGame] || 'Game-specific targets and tips active.'}</div>`;
}

function showNameModal() {
  const bg   = document.getElementById('nameModalBg');
  const badge = document.getElementById('nmBadge');
  const score = document.getElementById('nmScore');
  if (!bg) return;

  const modeLabels = { tracking: '🎯 TRACKING', flicking: '⚡ FLICKING', switching: '🔀 SWITCHING' };
  if (badge) badge.textContent = modeLabels[warmupState.mode] || '🎯 TRACKING';
  if (score) score.textContent = warmupState.score;

  bg.style.display = '';
}

function closeNameModal() {
  const bg = document.getElementById('nameModalBg');
  if (bg) bg.style.display = 'none';
  resetWarmup();
}

function submitScore() {
  const name = document.getElementById('nmNameInput')?.value?.trim();
  if (!name) { showToast('⚠️ Please enter your name'); return; }
  const diff = document.getElementById('gameDifficulty')?.value || 'medium';
  if (typeof Scores !== 'undefined') {
    Scores.submit(warmupState.mode, warmupState.score, name, diff);
  }
  closeNameModal();
}

// ═══════════════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════════════

window.addEventListener('DOMContentLoaded', () => {
  initRouting();
  initRoutines();
  initConverters();

  // Load Three.js dynamically then init warmup
  if (document.getElementById('warmupCanvas')) {
    if (typeof THREE !== 'undefined') {
      initWarmup();
    } else {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      s.onload = initWarmup;
      document.head.appendChild(s);
    }
  }

  // Fire initial leaderboard load
  if (typeof Scores !== 'undefined') Scores.loadLeaderboard('tracking');
});

window.addEventListener('popstate', () => {
  const path = window.location.pathname;
  let section = 'routines';
  if (path.includes('converters')) section = 'converters';
  else if (path.includes('warmup')) section = 'warmup';
  switchSection(section, false);
});
