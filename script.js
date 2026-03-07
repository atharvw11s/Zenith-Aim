/* ================================================================
   AimRivals — script.js  v2
   Real scenario DB · 3D Warmup Games (Three.js) ·
   Dual-dropdown Sens + FOV converters · Routine Engine
   ================================================================ */
'use strict';

/* ═══════════════════════════════════════════════════════════════
   REAL SCENARIO DATABASE  v3
   ─────────────────────────────────────────────────────────────
   AIMLABS:  Voltaic S3 benchmark names (VT ... S3) + classic
             built-in Aimlabs tasks. Search by exact name in-app.
             S3 sources: aimlab-stats.com, voltaic S2 Steam WS
             (S3 appends difficulty level to name).

   KOVAAK'S: Voltaic S5 benchmark names (VT ... S5) + classic
             community scenarios. Search by exact name in-app.
             S5 sources: blog.voltaic.gg KovaaK's S5 post.
   ═══════════════════════════════════════════════════════════════ */
const SCENARIO_DB = {
  aimlabs: {
    tracking: [
      {
        name: 'VT Spheretrack Novice S3',
        difficulty: ['beginner'],
        duration: 5, sets: 3,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 entry-level precise tracking. Single sphere moves predictably — lock on early and ride it.'
      },
      {
        name: 'VT Pilltrack Novice S3',
        difficulty: ['beginner'],
        duration: 5, sets: 3,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 reactive tracking at beginner level. Pill-shaped target gives a bigger surface — stay centered.'
      },
      {
        name: 'VT Shifttrack Novice S3',
        difficulty: ['beginner'],
        duration: 5, sets: 3,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 precise tracking novice tier. Focus on keeping the crosshair centered without over-correcting.'
      },
      {
        name: 'VT Shifttrack Intermediate S3',
        difficulty: ['intermediate'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 precise tracking intermediate. Unpredictable shifts — stay locked with controlled corrections.'
      },
      {
        name: 'VT Verttrack Intermediate S3',
        difficulty: ['intermediate'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 precise tracking with vertical emphasis. Engage your elbow — wrist alone won\'t cut it here.'
      },
      {
        name: 'VT Quaketrack Intermediate S3',
        difficulty: ['intermediate'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 reactive tracking intermediate. Fast erratic target movement — reaction speed tested hard.'
      },
      {
        name: 'VT Steadytrack Advanced S3',
        difficulty: ['advanced'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 control tracking advanced. Smooth deliberate movement — no overcorrection, breathe through it.'
      },
      {
        name: 'VT Verttrack Advanced S3',
        difficulty: ['advanced'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 advanced precise tracking. Full vertical movement — demands full arm control and relaxed grip.'
      },
      {
        name: 'VT Quaketrack Advanced S3',
        difficulty: ['advanced'],
        duration: 5, sets: 5,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 elite reactive tracking. Fast, chaotic movement — top-tier arm control required.'
      },
    ],
    flicking: [
      {
        name: 'VT Angleshot Novice S3',
        difficulty: ['beginner'],
        duration: 5, sets: 3,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 dynamic clicking for beginners. Diagonally-moving targets — read the trajectory before clicking.'
      },
      {
        name: 'VT Sixshot Novice S3',
        difficulty: ['beginner'],
        duration: 5, sets: 3,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 static clicking for beginners. Six medium targets — focus on clean direct flicks, not speed.'
      },
      {
        name: 'Gridshot Ultimate',
        difficulty: ['beginner', 'intermediate', 'advanced'],
        duration: 5, sets: 4,
        verified: true, voltaic: false,
        link: null,
        tip: 'The most iconic Aimlabs scenario. Single-click habits first — accuracy unlocks speed, not the other way.'
      },
      {
        name: 'Microshot',
        difficulty: ['beginner', 'intermediate'],
        duration: 5, sets: 3,
        verified: true, voltaic: false,
        link: null,
        tip: 'Small static targets. Slow down — wrist isolation only, let your arm be still.'
      },
      {
        name: 'VT Waveshot Novice S3',
        difficulty: ['beginner', 'intermediate'],
        duration: 5, sets: 3,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 dynamic clicking novice. Bots leap and arc — time your click at the apex, don\'t panic-spray.'
      },
      {
        name: 'VT Angleshot Intermediate S3',
        difficulty: ['intermediate'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 dynamic clicking intermediate. Steeper diagonal angles — commit the flick, no hesitation.'
      },
      {
        name: 'VT Wideshot Intermediate S3',
        difficulty: ['intermediate'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 static clicking intermediate. Wide spawns punish low sens — use full arm on far targets.'
      },
      {
        name: 'VT Frogshot Intermediate S3',
        difficulty: ['intermediate'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 linear clicking. Targets strafe predictably in straight lines — smooth approach, then snap.'
      },
      {
        name: 'VT Quadshot Advanced S3',
        difficulty: ['advanced'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 static clicking advanced. Four tight targets — maximum precision, zero spray tolerance.'
      },
      {
        name: 'VT Floatshot Advanced S3',
        difficulty: ['advanced'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 linear clicking advanced. Floating, gradually-moving targets — control the micro-adjustments.'
      },
    ],
    switching: [
      {
        name: 'VT Arcswitch Novice S3',
        difficulty: ['beginner'],
        duration: 5, sets: 3,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 speed switching for beginners. Bouncing targets in an arc — flick to the nearest one each time.'
      },
      {
        name: 'VT Sphereswitch Novice S3',
        difficulty: ['beginner'],
        duration: 5, sets: 3,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 evasive switching for beginners. Moving sphere targets — track briefly then commit each switch.'
      },
      {
        name: 'VT Pokeswitch Novice S3',
        difficulty: ['beginner', 'intermediate'],
        duration: 5, sets: 3,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 speed switching novice. Poke at targets rapidly — build decisiveness and flick momentum.'
      },
      {
        name: 'VT Temposwitch Intermediate S3',
        difficulty: ['intermediate'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 speed switching intermediate. Keep momentum — find a rhythm and never pause between switches.'
      },
      {
        name: 'VT Skyswitch Intermediate S3',
        difficulty: ['intermediate'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 evasive switching. Airborne targets that move unpredictably — eyes lead the flick every time.'
      },
      {
        name: 'VT Boltswitch Advanced S3',
        difficulty: ['advanced'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 evasive switching advanced. Targets dash fast — acquire immediately, no hesitation.'
      },
      {
        name: 'VT Leapswitch Advanced S3',
        difficulty: ['advanced'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S3 stability switching advanced. Requires smooth, controlled flicks — precision over raw speed.'
      },
    ]
  },

  kovaaks: {
    tracking: [
      {
        name: 'Smoothbot',
        difficulty: ['beginner', 'intermediate'],
        duration: 5, sets: 3,
        verified: true, voltaic: false,
        link: null,
        tip: 'The classic KovaaK\'s foundation scenario. Smooth, predictable movement — build your tracking base here.'
      },
      {
        name: 'VT Snake Track Novice S5',
        difficulty: ['beginner'],
        duration: 5, sets: 3,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 precise tracking novice. Thin target strafes and accelerates — learn to read speed changes.'
      },
      {
        name: 'VT PGT Novice S5',
        difficulty: ['beginner', 'intermediate'],
        duration: 5, sets: 3,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 Precise Goated Tracking. Targets arc smoothly — stay locked on the arc without over-aiming.'
      },
      {
        name: 'VT Ground Intermediate S5',
        difficulty: ['intermediate'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 reactive tracking. Ground-level horizontal strafes at varied speeds — react to direction changes.'
      },
      {
        name: 'VT Snake Track Intermediate S5',
        difficulty: ['intermediate'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 precise tracking intermediate. Faster acceleration/deceleration on the snake — stay smooth.'
      },
      {
        name: 'VT Aether Intermediate S5',
        difficulty: ['intermediate'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 reactive tracking intermediate. Aerial XYZ movement with fast direction changes — arms stay fluid.'
      },
      {
        name: 'VT Aether Advanced S5',
        difficulty: ['advanced'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 reactive tracking. Aerial XYZ movement — fast direction changes demand full arm engagement.'
      },
      {
        name: 'VT Raw Control Advanced S5',
        difficulty: ['advanced'],
        duration: 5, sets: 5,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 control tracking. XYZ-axis strafe with smooth changes — precision and patience over reaction.'
      },
    ],
    flicking: [
      {
        name: '1wall5targets_pasu',
        difficulty: ['beginner', 'intermediate'],
        duration: 5, sets: 3,
        verified: true, voltaic: false,
        link: null,
        tip: 'The classic KovaaK\'s pasu scenario. Diagonally-moving targets — timing and flick accuracy above all.'
      },
      {
        name: 'VT Pasu Novice S5',
        difficulty: ['beginner'],
        duration: 5, sets: 3,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 dynamic clicking novice. Pasu diagonals — acquire the target, time the click cleanly.'
      },
      {
        name: 'VT Popcorn Novice S5',
        difficulty: ['beginner', 'intermediate'],
        duration: 5, sets: 3,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 dynamic clicking. Targets leap and arc — prioritize center targets, read jump patterns early.'
      },
      {
        name: 'VT ww5t Intermediate S5',
        difficulty: ['intermediate'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 wide-wall static clicking. Wide spawns force full arm flicks — accuracy and speed balanced.'
      },
      {
        name: 'VT Pasu Intermediate S5',
        difficulty: ['intermediate'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 dynamic clicking intermediate. Harder pasu angles — commit the flick, zero hesitation.'
      },
      {
        name: 'VT Floating Heads Advanced S5',
        difficulty: ['advanced'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 linear clicking advanced. Head-sized targets strafe horizontally — smooth approach, precise timing.'
      },
      {
        name: 'VT 1wxts Advanced S5',
        difficulty: ['advanced'],
        duration: 5, sets: 5,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 static clicking advanced. Small static targets in diamond pattern — pure precision flicking.'
      },
    ],
    switching: [
      {
        name: 'VT DotTS Novice S5',
        difficulty: ['beginner'],
        duration: 5, sets: 3,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 speed switching novice. Hold left click throughout — static dot targets on wide wall.'
      },
      {
        name: 'VT EddieTS Novice S5',
        difficulty: ['beginner', 'intermediate'],
        duration: 5, sets: 3,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 speed switching. Diagonally-moving greeble targets — regular, predictable movement. Find the rhythm.'
      },
      {
        name: 'VT DriftTS Intermediate S5',
        difficulty: ['intermediate'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 evasive switching. Targets constantly accelerate and decelerate — micro-correct after each acquire.'
      },
      {
        name: 'VT FlyTS Intermediate S5',
        difficulty: ['intermediate'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 evasive switching. XYZ-movement targets — harder to read, stay calm and track briefly before clicking.'
      },
      {
        name: 'VT ControlTS Advanced S5',
        difficulty: ['advanced'],
        duration: 5, sets: 4,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 stability switching advanced. Small targets with gentle jumps — pure precision switching demanded.'
      },
      {
        name: 'VT PentaBounce Advanced S5',
        difficulty: ['advanced'],
        duration: 5, sets: 5,
        verified: true, voltaic: true,
        link: null,
        tip: 'Voltaic S5 stability switching. Targets ricochet inside a pentagon — read the bounce angle, commit cleanly.'
      },
    ]
  }
};

/* ═══════════════════════════════════════════════════════════════
   SENSITIVITY GAME CONSTANTS
   ─────────────────────────────────────────────────────────────
   yaw = degrees per mouse count at DPI=1, sens=1.0
   Formula:
     cm/360 = 914.4 / (fromDPI × yaw × effectiveSens)
     toSens = (fromDPI × fromYaw × effectiveSens) / (toDPI × toYaw)

   YAW VALUES — derived from verified ground truth:
     Roblox 0.06415 @ 800 DPI = 47.51 cm/360
       → robloxYaw = 914.4 / (800 × 47.51 × 0.06415) = 0.37503
     Aimlabs 0.48116 @ 800 DPI = 47.51 cm/360
       → aimlabsYaw = 0.05 (confirmed)
     KovaaK's: Quake/Source m_yaw = 0.022

   RIVALS TWO-TIER:
     effectiveSens = CameraSens × RivalsInGameSlider
     Slider = 1.0 (default) → Rivals ≡ Arsenal
   ═══════════════════════════════════════════════════════════════ */
const SENS_DB = {
  rivals:  { label: 'Roblox Rivals',  yaw: 0.37503, sensLabel: 'Camera Sensitivity', hasMultiplier: true  },
  arsenal: { label: 'Roblox Arsenal', yaw: 0.37503, sensLabel: 'Camera Sensitivity', hasMultiplier: false },
  aimlabs: { label: 'Aimlabs',        yaw: 0.05,    sensLabel: 'Sensitivity',         hasMultiplier: false },
  kovaaks: { label: "Kovaak's",       yaw: 0.022,   sensLabel: 'Sensitivity',         hasMultiplier: false },
};

/* ═══════════════════════════════════════════════════════════════
   FOV GAME CONSTANTS
   ─────────────────────────────────────────────────────────────
   VERIFIED by user measurement:
     Arsenal slider 70  → VFOV 70,  HFOV 102.447858  ✓ (formula matches exactly)
     Rivals  slider 80  → VFOV 80,  HFOV 112.327252  ✓ (formula matches exactly)
     Aimlabs default 70 → VFOV 70  (user confirmed: "VFOV 70, HFOV 102.45")
     KovaaK's           → HFOV (standard: horizontal field of view)

   type 'vertical'   = game FOV setting is Vertical FOV
   type 'horizontal' = game FOV setting is Horizontal FOV
   ═══════════════════════════════════════════════════════════════ */
const FOV_DB = {
  rivals:  { label: 'Roblox Rivals',  type: 'vertical',   default: 80,  range: [30, 120] },
  arsenal: { label: 'Roblox Arsenal', type: 'vertical',   default: 70,  range: [30, 120] },
  aimlabs: { label: 'Aimlabs',        type: 'vertical',   default: 70,  range: [1,  150] },
  kovaaks: { label: "Kovaak's",       type: 'horizontal', default: 103, range: [60, 150] },
};

/* ═══════════════════════════════════════════════════════════════
   APP STATE
   ═══════════════════════════════════════════════════════════════ */
const state = {
  trainer: 'aimlabs',
  rank: 'beginner',
  priorities: { tracking: 33, flicking: 34, switching: 33 },
  callsign: '',
  _playlist: [],
};

/* ═══════════════════════════════════════════════════════════════
   ROUTINE GENERATOR
   Distributes 9 slots proportionally across categories.
   Never repeats a task — slots are capped at pool size per type.
   ═══════════════════════════════════════════════════════════════ */
function generateRoutine() {
  const { trainer, rank, priorities } = state;
  const db    = SCENARIO_DB[trainer];
  const TOTAL = 9;
  const total = priorities.tracking + priorities.flicking + priorities.switching || 1;

  // Calculate proportional slot counts
  const raw   = {
    tracking:  (priorities.tracking  / total) * TOTAL,
    flicking:  (priorities.flicking  / total) * TOTAL,
    switching: (priorities.switching / total) * TOTAL,
  };
  const slots = {
    tracking:  Math.floor(raw.tracking),
    flicking:  Math.floor(raw.flicking),
    switching: Math.floor(raw.switching),
  };

  // Distribute remainder to whichever category lost the most to flooring
  let rem = TOTAL - (slots.tracking + slots.flicking + slots.switching);
  ['tracking','flicking','switching']
    .sort((a,b) => (raw[b] - slots[b]) - (raw[a] - slots[a]))
    .forEach((k,i) => { if (i < rem) slots[k]++; });

  // Ensure every non-zero priority gets at least 1 slot (steal from largest)
  ['tracking','flicking','switching'].forEach(t => {
    if (priorities[t] > 0 && slots[t] === 0) {
      const big = Object.keys(slots).reduce((a,b) => slots[a] > slots[b] ? a : b);
      if (slots[big] > 1) { slots[big]--; slots[t]++; }
    }
  });

  // Cap each slot count at the available pool size (NO repeats)
  const pools = {};
  for (const type of ['tracking','flicking','switching']) {
    pools[type] = db[type].filter(s => s.difficulty.includes(rank));
    slots[type] = Math.min(slots[type], pools[type].length);
  }

  // Pick unique tasks per category via shuffle-then-slice
  const playlist = [];
  for (const type of ['tracking','flicking','switching']) {
    const pool    = pools[type];
    if (!pool.length || slots[type] === 0) continue;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    shuffled.slice(0, slots[type]).forEach(s => playlist.push({ ...s, type }));
  }

  // Final shuffle so categories aren't always grouped
  return playlist.sort(() => Math.random() - 0.5);
}

/* ═══════════════════════════════════════════════════════════════
   RENDER PLAYLIST
   ═══════════════════════════════════════════════════════════════ */
function renderPlaylist() {
  const playlist = generateRoutine();
  state._playlist = playlist;
  const grid = document.getElementById('taskGrid');
  const trainerLabel = state.trainer === 'aimlabs' ? 'Aimlabs' : "Kovaak's";
  const rankLabel = state.rank.charAt(0).toUpperCase() + state.rank.slice(1);
  const totalMins = playlist.reduce((s,t) => s + t.duration * t.sets, 0);
  document.getElementById('playlistMeta').textContent = `${trainerLabel} · ${rankLabel} · ${playlist.length} tasks`;
  document.getElementById('totalTasks').textContent = playlist.length;
  document.getElementById('estTime').textContent = `${totalMins}m`;
  document.getElementById('navStatus').textContent = `${trainerLabel} · ${rankLabel}`;

  const ICONS  = { tracking:'🎯', flicking:'⚡', switching:'🔀' };
  const LABELS = { tracking:'Tracking', flicking:'Flicking', switching:'Switching' };

  grid.innerHTML = '';
  playlist.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = `task-card ${s.type}`;
    card.style.animationDelay = `${i * 0.055}s`;
    const statusHTML = s.verified
      ? `<div class="card-status status-verified">✓ Verified</div>`
      : `<div class="card-status status-legacy">⚠️ Legacy / Unverified</div>`;
    const voltaicHTML = s.voltaic ? `<span class="card-sets">· Voltaic</span>` : '';
    const linkHTML = s.link
      ? `<a class="card-link" href="${s.link}" target="_blank" rel="noopener">▶ Open in Aimlabs</a>`
      : `<div class="card-sets" style="font-size:10px;color:var(--tx-4)">Search by name in ${trainerLabel}</div>`;

    card.innerHTML = `
      <div class="card-badge">${ICONS[s.type]} ${LABELS[s.type]}</div>
      <div class="card-name">${s.name}</div>
      <div class="card-meta">
        <span class="card-dur">${s.duration} min</span>
        <span class="card-sets">${s.sets}× sets</span>
        ${voltaicHTML}
      </div>
      ${statusHTML}
      ${linkHTML}
      <div class="card-tip">${s.tip}</div>
    `;
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════════ */
function initNav() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = link.dataset.section;
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      link.classList.add('active');
      document.getElementById(target).classList.add('active');
      if (target === 'warmup') setTimeout(() => Warmup3D.resize(), 60);
    });
  });
}

function initTrainerToggle() {
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.trainer = btn.dataset.trainer;
      renderPlaylist();
    });
  });
}

function initRankSelector() {
  document.querySelectorAll('.rank-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.rank-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.rank = btn.dataset.rank;
      renderPlaylist();
    });
  });
}

function initSliders() {
  const sliders  = { tracking: document.getElementById('trackingSlider'), flicking: document.getElementById('flickingSlider'), switching: document.getElementById('switchingSlider') };
  const displays = { tracking: document.getElementById('trackingVal'),    flicking: document.getElementById('flickingVal'),    switching: document.getElementById('switchingVal')    };
  const COLORS   = { tracking: '#3b82f6', flicking: '#f59e0b', switching: '#a855f7' };

  function fill(slider, type) {
    slider.style.background = `linear-gradient(to right,${COLORS[type]} ${slider.value}%,var(--bg-3) ${slider.value}%)`;
  }
  Object.keys(sliders).forEach(t => fill(sliders[t], t));

  Object.keys(sliders).forEach(changed => {
    sliders[changed].addEventListener('input', () => {
      const newVal = parseInt(sliders[changed].value, 10);
      const others = Object.keys(sliders).filter(k => k !== changed);
      const otherTotal = others.reduce((s,k) => s + parseInt(sliders[k].value,10), 0);
      const remaining = 100 - newVal;
      if (otherTotal > 0) {
        others.forEach(k => { sliders[k].value = Math.max(0, Math.round(remaining * (parseInt(sliders[k].value,10)/otherTotal))); });
        let sum = newVal + others.reduce((s,k)=>s+parseInt(sliders[k].value,10),0);
        const diff = 100 - sum;
        if (diff !== 0) { const t = others.reduce((a,b)=>parseInt(sliders[a].value,10)>parseInt(sliders[b].value,10)?a:b); sliders[t].value = Math.max(0, parseInt(sliders[t].value,10)+diff); }
      } else {
        const half = Math.floor(remaining/2);
        sliders[others[0]].value = half;
        sliders[others[1]].value = remaining - half;
      }
      Object.keys(sliders).forEach(k => { state.priorities[k] = parseInt(sliders[k].value,10); displays[k].textContent=`${sliders[k].value}%`; fill(sliders[k],k); });
      renderPlaylist();
    });
  });
}

function initCallsign() {
  document.getElementById('callsignInput').addEventListener('input', e => { state.callsign = e.target.value; });
}

function initCopyPlaylist() {
  document.getElementById('copyPlaylist').addEventListener('click', () => {
    if (!state._playlist.length) return;
    const trainerLabel = state.trainer==='aimlabs'?'Aimlabs':"Kovaak's";
    const rankLabel    = state.rank.charAt(0).toUpperCase()+state.rank.slice(1);
    const ICONS = { tracking:'🎯', flicking:'⚡', switching:'🔀' };
    let text = `⚔ AimRivals — ${trainerLabel} · ${rankLabel}\n`;
    if (state.callsign) text += `👤 ${state.callsign}\n`;
    text += `${'─'.repeat(28)}\n`;
    state._playlist.forEach((s,i) => { text += `${i+1}. ${ICONS[s.type]} ${s.name} · ${s.sets}×${s.duration}min${s.verified?' ✓':' ⚠️'}\n`; });
    text += `${'─'.repeat(28)}\nGenerated by AimRivals`;
    navigator.clipboard.writeText(text).then(()=>showToast('📋 Playlist copied!')).catch(()=>showToast('❌ Copy failed'));
  });
}

function initShare() {
  document.getElementById('shareBtn').addEventListener('click', () => {
    const p = new URLSearchParams({ t:state.trainer, r:state.rank, tr:state.priorities.tracking, fl:state.priorities.flicking, sw:state.priorities.switching, cs:state.callsign });
    const url = `${location.origin}${location.pathname}?${p}`;
    navigator.clipboard.writeText(url).then(()=>showToast('🔗 Config link copied!')).catch(()=>showToast('❌ Copy failed'));
  });
}

function loadFromURL() {
  const p = new URLSearchParams(location.search);
  if (p.has('t') && ['aimlabs','kovaaks'].includes(p.get('t'))) {
    state.trainer = p.get('t');
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.trainer===state.trainer));
  }
  if (p.has('r') && ['beginner','intermediate','advanced'].includes(p.get('r'))) {
    state.rank = p.get('r');
    document.querySelectorAll('.rank-btn').forEach(b => b.classList.toggle('active', b.dataset.rank===state.rank));
  }
  [['tr','tracking','trackingSlider','trackingVal'],['fl','flicking','flickingSlider','flickingVal'],['sw','switching','switchingSlider','switchingVal']].forEach(([param,key,sliderId,valId]) => {
    if (p.has(param)) { const v=Math.min(100,Math.max(0,parseInt(p.get(param),10))); state.priorities[key]=v; document.getElementById(sliderId).value=v; document.getElementById(valId).textContent=`${v}%`; }
  });
  if (p.has('cs')) { state.callsign=p.get('cs'); document.getElementById('callsignInput').value=state.callsign; }
}

/* ═══════════════════════════════════════════════════════════════
   SENSITIVITY CONVERTER — live, single DPI
   ─────────────────────────────────────────────────────────────
   cm/360 = 914.4 / (DPI × fromYaw × effectiveSens)
   toSens = 914.4 / (DPI × toYaw   × cm/360)
          = (fromYaw × effectiveSens) / toYaw   [DPI cancels]

   Higher DPI → higher eDPI → same physical feel → lower sens number.
   e.g. Roblox 0.06415 @ 800 DPI = Aimlabs 0.48116 @ 800 DPI
        Roblox 0.06415 @ 800 DPI = Aimlabs 0.24058 @ 1600 DPI
   The DPI field controls the target DPI. Change it to see what
   sensitivity gives the same feel at a different DPI.
   ═══════════════════════════════════════════════════════════════ */
function initSensConverter() {
  const fromEl    = document.getElementById('sensFrom');
  const toEl      = document.getElementById('sensTo');
  const sensEl    = document.getElementById('rivalsSens');
  const dpiEl     = document.getElementById('mouseDPI');
  const multEl    = document.getElementById('rivalsMultiplier');
  const multRowEl = document.getElementById('sensMultiplierRow');
  const fromLbl   = document.getElementById('sensFromLabel');
  const toLbl     = document.getElementById('sensResultLabel');
  const dpiLbl    = document.getElementById('sensDpiLabel');
  const dpiVal    = document.getElementById('sensDpiVal');

  function recalc() {
    const fg   = SENS_DB[fromEl.value];
    const tg   = SENS_DB[toEl.value];
    const sens = parseFloat(sensEl.value);
    const dpi  = parseFloat(dpiEl.value);

    // Update labels
    if (fromLbl) fromLbl.textContent = fg?.sensLabel || 'Sensitivity';
    if (toLbl)   toLbl.textContent   = (tg?.label || 'Target') + ' Sensitivity';
    if (multRowEl) multRowEl.style.display = fg?.hasMultiplier ? 'flex' : 'none';

    if (!fg || !tg || isNaN(sens) || sens <= 0 || isNaN(dpi) || dpi <= 0) {
      document.getElementById('sensOutput').textContent = '—';
      document.getElementById('sensNote').textContent   = 'Enter your sensitivity and DPI above';
      if (dpiLbl) dpiLbl.textContent = 'at — DPI';
      if (dpiVal) dpiVal.textContent = '— DPI';
      document.getElementById('sensQuick').style.display = 'none';
      return;
    }

    const slider        = fg.hasMultiplier ? Math.max(0.01, parseFloat(multEl?.value) || 1.0) : 1.0;
    const effectiveSens = sens * slider;

    // toSens preserves same physical feel at the entered DPI
    const cm360  = 914.4 / (800 * fg.yaw * effectiveSens); // reference cm/360 at 800 DPI
    const toSens = 914.4 / (dpi  * tg.yaw * cm360);

    document.getElementById('sensOutput').textContent = toSens.toFixed(5);
    if (dpiLbl) dpiLbl.textContent = `at ${dpi} DPI`;
    if (dpiVal) dpiVal.textContent = `${dpi} DPI`;
    document.getElementById('sensNote').textContent   =
      `${fg.label} ${sens}${slider !== 1.0 ? ' × ' + slider + ' slider' : ''} at 800 DPI`
      + ` = ${tg.label} ${toSens.toFixed(5)} at ${dpi} DPI — same aim speed`;
    document.getElementById('sensResult').classList.add('has-result');

    // Quick reference grid
    const sqGrid = document.getElementById('sqGrid');
    sqGrid.innerHTML = '';
    Object.values(SENS_DB).forEach(game => {
      const eq = 914.4 / (dpi * game.yaw * cm360);
      const item = document.createElement('div');
      item.className = 'sq-item';
      item.innerHTML = `<span class="sq-game">${game.label}</span><span class="sq-val">${eq.toFixed(5)}</span>`;
      sqGrid.appendChild(item);
    });
    document.getElementById('sensQuick').style.display = 'block';
  }

  // Live update on every input change — no button press needed
  [fromEl, toEl, sensEl, dpiEl, multEl].forEach(el => {
    if (el) { el.addEventListener('input', recalc); el.addEventListener('change', recalc); }
  });

  document.getElementById('sensSwapBtn').addEventListener('click', () => {
    [fromEl.value, toEl.value] = [toEl.value, fromEl.value];
    recalc();
  });

  // Keep the calculate button working too for users who expect it
  const calcBtn = document.getElementById('convertSens');
  if (calcBtn) calcBtn.addEventListener('click', recalc);

  recalc(); // run once on load with defaults
}

/* ═══════════════════════════════════════════════════════════════
   FOV CONVERTER
   ─────────────────────────────────────────────────────────────
   All conversions pipeline through HFOV radians:
     VFOV → hfovRad = 2·atan(tan(toRad(VFOV)/2) · aspect)
     HFOV → hfovRad = toRad(HFOV)
     hfovRad → VFOV = toDeg(2·atan(tan(hfovRad/2) / aspect))
     hfovRad → HFOV = toDeg(hfovRad)

   Verified against user ground truth:
     Arsenal  70 VFOV → HFOV 102.447858 ✓
     Rivals   80 VFOV → HFOV 112.327252 ✓
     Rivals   80 VFOV → Aimlabs 80 VFOV (same type = identity) ✓
     KovaaK's 103 HFOV → Rivals VFOV 70.53° ✓
   ═══════════════════════════════════════════════════════════════ */
function initFOVConverter() {
  const fromEl  = document.getElementById('fovFrom');
  const toEl    = document.getElementById('fovTo');
  const inEl    = document.getElementById('robloxVFOV');
  const fromLbl = document.getElementById('fovFromLabel');
  const toLbl   = document.getElementById('fovResultLabel');
  const typeEl  = document.getElementById('fovType');

  const typeName = t => t === 'vertical' ? 'Vertical' : 'Horizontal';

  function updateFovLabels() {
    const fg = FOV_DB[fromEl.value];
    const tg = FOV_DB[toEl.value];
    if (fromLbl) fromLbl.textContent = fg ? typeName(fg.type) + ' FOV (°)' : 'FOV (°)';
    if (toLbl)   toLbl.textContent   = (tg?.label || 'Target') + ' FOV';
    if (typeEl)  typeEl.textContent  = tg ? typeName(tg.type) : '—';
    if (fg && inEl) inEl.value = fg.default;
  }
  fromEl.addEventListener('change', updateFovLabels);
  toEl.addEventListener('change',   updateFovLabels);
  updateFovLabels();

  document.getElementById('fovSwapBtn').addEventListener('click', () => {
    [fromEl.value, toEl.value] = [toEl.value, fromEl.value];
    updateFovLabels();
  });

  document.getElementById('convertFOV').addEventListener('click', () => {
    const fg     = FOV_DB[fromEl.value];
    const tg     = FOV_DB[toEl.value];
    const fov    = parseFloat(inEl.value);
    const aspect = parseFloat(document.getElementById('fovAspect').value);

    if (!fg || !tg || isNaN(fov) || fov <= 0 || fov >= 180 || isNaN(aspect)) {
      document.getElementById('fovOutput').textContent = 'Invalid';
      return;
    }

    const toRad = d => d * Math.PI / 180;
    const toDeg = r => r * 180 / Math.PI;

    // Normalize to HFOV radians
    const hRad = fg.type === 'vertical'
      ? 2 * Math.atan(Math.tan(toRad(fov) / 2) * aspect)
      : toRad(fov);

    // Convert to target type
    const out = tg.type === 'vertical'
      ? toDeg(2 * Math.atan(Math.tan(hRad / 2) / aspect))
      : toDeg(hRad);

    // Always compute HFOV for display (useful for KovaaK's reference)
    const hfovDeg = toDeg(hRad);

    document.getElementById('fovOutput').textContent = out.toFixed(2) + '°';
    document.getElementById('fovType').textContent   = typeName(tg.type);
    document.getElementById('fovNote').textContent   =
      `${fg.label} ${fov}° ${typeName(fg.type)} FOV → ${tg.label} ${out.toFixed(2)}° ${typeName(tg.type)} FOV`;

    // Show HFOV helper row whenever input is VFOV (useful for KovaaK's)
    const hfovRow = document.getElementById('fovHfovRow');
    const hfovOut = document.getElementById('fovHfovOut');
    if (fg.type === 'vertical') {
      hfovOut.textContent = hfovDeg.toFixed(2) + '°';
      hfovRow.style.display = 'flex';
    } else {
      hfovRow.style.display = 'none';
    }

    // Extra note for same-type conversions (V→V): explain result is correct
    const extraNote = document.getElementById('fovExtraNote');
    if (fg.type === 'vertical' && tg.type === 'vertical') {
      extraNote.textContent =
        'ℹ️ Both games use Vertical FOV — set Aimlabs to the same number as your Roblox FOV. '
        + 'Use the Equivalent HFOV above for KovaaK\'s.';
    } else {
      extraNote.textContent = '';
    }

    document.getElementById('fovResult').classList.add('has-result');
  });
}


/* ═══════════════════════════════════════════════════════════════
   3D WARMUP GAMES — Three.js
   Three separate games sharing one renderer & canvas.
   ═══════════════════════════════════════════════════════════════ */
const Warmup3D = (() => {
  // ── Shared three.js state ──
  let renderer, camera, scene;
  let animId   = null;
  let gameMode = 'tracking'; // 'tracking' | 'flicking' | 'switching'

  // ── Input state ──
  let yaw = 0, pitch = 0;
  let pointerLocked = false;
  let mouseSens = 0.0022;

  // ── Game timer ──
  let gameRunning = false;
  let score   = 0;
  let hits    = 0;
  let shots   = 0;
  let timeLeft  = 30;
  let bestScore = { tracking: null, flicking: null, switching: null };
  let countdownInt = null;

  // ── Three.js objects ──
  let trackingTarget = null;
  let trackingGlow   = null;
  let trackingLight  = null;
  let trackingT      = 0;

  let flickTargets   = [];
  let flickActive    = -1;

  let switchTargets  = [];
  let switchActive   = 0;

  const raycaster = typeof THREE !== 'undefined' ? new THREE.Raycaster() : null;
  const CENTER    = typeof THREE !== 'undefined' ? new THREE.Vector2(0, 0) : null;

  // ── DOM refs ──
  let canvas, overlay, badge, titleEl, subEl, startBtn, beginBtn;
  let scoreEl, timerEl, accEl, bestEl, scoreLblEl;
  let crosshairEl, hitRingEl, pointerPromptEl;
  let currentTabEl;

  // Tips per game
  const TIPS = {
    tracking:  'Keep your crosshair ahead of the sphere — predict the path, don\'t just chase.',
    flicking:  'Fix your eyes on the lit target before moving your mouse — eyes lead, hand follows.',
    switching: 'Develop a scanning rhythm — sweep in one direction, click each lit target cleanly.',
  };

  // ── INIT ──
  function init() {
    canvas          = document.getElementById('warmupCanvas');
    overlay         = document.getElementById('canvasOverlay');
    badge           = document.getElementById('overlayBadge');
    titleEl         = document.getElementById('overlayTitle');
    subEl           = document.getElementById('overlaySub');
    startBtn        = document.getElementById('startGame');
    scoreEl         = document.getElementById('wScore');
    timerEl         = document.getElementById('wTimer');
    accEl           = document.getElementById('wAccuracy');
    bestEl          = document.getElementById('wBest');
    scoreLblEl      = document.getElementById('wScoreLbl');
    crosshairEl     = document.getElementById('crosshair');
    hitRingEl       = document.getElementById('hitRing');
    pointerPromptEl = document.getElementById('pointerPrompt');

    // Build Three.js renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x050507);

    // Camera — FPS perspective
    camera = new THREE.PerspectiveCamera(90, 1, 0.1, 200);
    camera.position.set(0, 1.7, 0);
    camera.rotation.order = 'YXZ';

    buildScene();
    resize();

    // Game tab switching
    document.querySelectorAll('.game-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        if (gameRunning) stopGame();
        document.querySelectorAll('.game-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        gameMode = tab.dataset.game;
        updateOverlayTheme();
        resetHUD();
        buildScene();
        renderIdle();
        document.getElementById('tipText').textContent = TIPS[gameMode];
      });
    });

    startBtn.addEventListener('click', startGame);
    document.getElementById('restartGame').addEventListener('click', () => { stopGame(); resetHUD(); buildScene(); renderIdle(); showOverlay(true); });
    document.getElementById('gameSensitivity').addEventListener('change', e => { mouseSens = parseFloat(e.target.value); });

    // Pointer lock
    document.addEventListener('pointerlockchange', onPointerLockChange);
    document.addEventListener('mozpointerlockchange', onPointerLockChange);
    document.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onCanvasClick);

    renderIdle();
  }

  function updateOverlayTheme() {
    const BADGE_LABELS = { tracking:'🎯 TRACKING', flicking:'⚡ FLICKING', switching:'🔀 SWITCHING' };
    const TITLE_CLASSES = { tracking:'', flicking:'flicking-title', switching:'switching-title' };
    const BTN_CLASSES   = { tracking:'', flicking:'flicking-btn',   switching:'switching-btn'   };
    badge.textContent  = BADGE_LABELS[gameMode];
    badge.className    = `overlay-game-badge${gameMode !== 'tracking' ? ' ' + gameMode : ''}`;
    titleEl.className  = `overlay-title ${TITLE_CLASSES[gameMode]}`;
    startBtn.className = `btn-begin ${BTN_CLASSES[gameMode]}`;
  }

  // ── SCENE BUILDER ──
  function buildScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.055);

    // Lights
    scene.add(new THREE.AmbientLight(0x111122, 0.7));
    const hemi = new THREE.HemisphereLight(0x223344, 0x080810, 0.4);
    scene.add(hemi);

    // Floor grid
    const grid = new THREE.GridHelper(80, 80, 0x1a1a2e, 0x111128);
    grid.position.y = 0;
    scene.add(grid);

    // Ceiling grid (subtle)
    const ceiling = new THREE.GridHelper(80, 80, 0x0a0a18, 0x0a0a14);
    ceiling.position.y = 8;
    scene.add(ceiling);

    // Back wall indicator (subtle)
    const wallGeo = new THREE.PlaneGeometry(60, 12);
    const wallMat = new THREE.MeshBasicMaterial({ color: 0x070712, transparent: true, opacity: 0.5 });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(0, 4, -25);
    scene.add(wall);

    // Build game-specific objects
    if (gameMode === 'tracking')  buildTracking();
    if (gameMode === 'flicking')  buildFlicking();
    if (gameMode === 'switching') buildSwitching();
  }

  // ─── TRACKING ───
  function buildTracking() {
    trackingT = 0;
    const diff = document.getElementById('gameDifficulty').value;
    const R    = diff === 'easy' ? 0.6 : diff === 'hard' ? 0.28 : 0.44;

    const geo  = new THREE.SphereGeometry(R, 24, 24);
    const mat  = new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x1a4fa3, emissiveIntensity: 0.8, roughness: 0.3, metalness: 0.2 });
    trackingTarget = new THREE.Mesh(geo, mat);
    scene.add(trackingTarget);

    // Glow shell
    const glowGeo  = new THREE.SphereGeometry(R * 1.6, 16, 16);
    const glowMat  = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.08, side: THREE.BackSide });
    trackingGlow   = new THREE.Mesh(glowGeo, glowMat);
    scene.add(trackingGlow);

    // Point light at sphere
    trackingLight = new THREE.PointLight(0x3b82f6, 2.5, 12);
    scene.add(trackingLight);
  }

  function updateTracking(delta) {
    if (!trackingTarget) return;
    const diff   = document.getElementById('gameDifficulty').value;
    const spd    = diff === 'easy' ? 0.5 : diff === 'hard' ? 1.4 : 0.9;
    const spread = diff === 'easy' ? 3.5 : diff === 'hard' ? 6   : 5;
    const vspread = diff === 'easy' ? 1.2 : diff === 'hard' ? 2.5 : 2;

    trackingT += delta * spd;

    // Lissajous path
    const x = spread * Math.sin(1.3 * trackingT + 0.4);
    const y = vspread * Math.sin(0.9 * trackingT) + 2.2;
    const z = -10 - 3 * Math.sin(0.6 * trackingT + 1.0);

    trackingTarget.position.set(x, y, z);
    trackingGlow.position.copy(trackingTarget.position);
    trackingLight.position.copy(trackingTarget.position);

    // Check if crosshair is on target (raycast from camera center)
    if (gameRunning && raycaster) {
      raycaster.setFromCamera(CENTER, camera);
      const hits_ = raycaster.intersectObject(trackingTarget);
      const onTarget = hits_.length > 0;
      if (onTarget) {
        score++;
        scoreEl.textContent = score;
        // Pulse material
        trackingTarget.material.emissiveIntensity = 1.2;
      } else {
        trackingTarget.material.emissiveIntensity = 0.8;
      }
    }

    trackingTarget.rotation.y += delta * 0.8;
  }

  // ─── FLICKING ───
  const FLICK_POSITIONS = [
    [-5, 2.5, -12], [ 0, 2.5, -12], [5, 2.5, -12],
    [-5, 0.5, -12], [ 0, 0.5, -12], [5, 0.5, -12],
    [-7, 1.5, -14], [ 7, 1.5, -14],
  ];

  function buildFlicking() {
    flickTargets = [];
    flickActive  = Math.floor(Math.random() * FLICK_POSITIONS.length);

    const diff = document.getElementById('gameDifficulty').value;
    const R    = diff === 'easy' ? 0.45 : diff === 'hard' ? 0.2 : 0.3;

    FLICK_POSITIONS.forEach((pos, i) => {
      const isActive = i === flickActive;
      const geo = new THREE.SphereGeometry(R, 18, 18);
      const mat = new THREE.MeshStandardMaterial({
        color:            isActive ? 0xf59e0b : 0x2a2a3a,
        emissive:         isActive ? 0xb45309 : 0x080810,
        emissiveIntensity: isActive ? 1.0     : 0.1,
        roughness: 0.4, metalness: 0.3,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh._flickIdx = i;
      scene.add(mesh);
      flickTargets.push(mesh);

      // Glow shell for active
      if (isActive) {
        const gGeo = new THREE.SphereGeometry(R * 1.8, 12, 12);
        const gMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.1, side: THREE.BackSide });
        const glow = new THREE.Mesh(gGeo, gMat);
        glow.position.set(...pos);
        glow._flickGlow = true;
        scene.add(glow);
      }
    });

    // Light at active target
    const pt = new THREE.PointLight(0xf59e0b, 3, 10);
    pt.position.set(...FLICK_POSITIONS[flickActive]);
    pt._flickLight = true;
    scene.add(pt);
  }

  function activateFlickTarget(idx) {
    // Remove old glow & light
    scene.children = scene.children.filter(c => !c._flickGlow && !c._flickLight);

    flickActive = idx;
    const diff = document.getElementById('gameDifficulty').value;
    const R    = diff === 'easy' ? 0.45 : diff === 'hard' ? 0.2 : 0.3;

    flickTargets.forEach((mesh, i) => {
      const active = i === flickActive;
      mesh.material.color.setHex(active ? 0xf59e0b : 0x1e1e2a);
      mesh.material.emissive.setHex(active ? 0xb45309 : 0x050508);
      mesh.material.emissiveIntensity = active ? 1.0 : 0.05;
    });

    // New glow
    const gGeo = new THREE.SphereGeometry(R * 1.8, 12, 12);
    const gMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.12, side: THREE.BackSide });
    const glow = new THREE.Mesh(gGeo, gMat);
    glow.position.set(...FLICK_POSITIONS[flickActive]);
    glow._flickGlow = true;
    scene.add(glow);

    // New light
    const pt = new THREE.PointLight(0xf59e0b, 3, 10);
    pt.position.set(...FLICK_POSITIONS[flickActive]);
    pt._flickLight = true;
    scene.add(pt);
  }

  function onFlickClick() {
    if (!gameRunning || flickTargets.length === 0) return;
    shots++;
    raycaster.setFromCamera(CENTER, camera);
    const intersects = raycaster.intersectObjects(flickTargets);
    if (intersects.length > 0) {
      const hitIdx = intersects[0].object._flickIdx;
      if (hitIdx === flickActive) {
        hits++;
        score++;
        scoreEl.textContent = score;
        accEl.textContent   = `${Math.round((hits/shots)*100)}%`;
        flashHitRing();
        // Pick new random target (not same)
        let next;
        do { next = Math.floor(Math.random() * FLICK_POSITIONS.length); } while (next === flickActive && FLICK_POSITIONS.length > 1);
        activateFlickTarget(next);
      }
    }
  }

  // ─── SWITCHING ───
  const SWITCH_POSITIONS = [
    [-7, 2,   -12],
    [-3.5, 3.2,-11],
    [ 0,  1,   -10],
    [ 3.5, 3.2,-11],
    [ 7,  2,   -12],
  ];

  function buildSwitching() {
    switchTargets  = [];
    switchActive   = 0;

    const diff = document.getElementById('gameDifficulty').value;
    const R    = diff === 'easy' ? 0.42 : diff === 'hard' ? 0.22 : 0.32;

    SWITCH_POSITIONS.forEach((pos, i) => {
      const isActive = i === 0;
      const geo = new THREE.SphereGeometry(R, 18, 18);
      const mat = new THREE.MeshStandardMaterial({
        color:             isActive ? 0xa855f7 : 0x2a2a3a,
        emissive:          isActive ? 0x7c3aed : 0x080810,
        emissiveIntensity: isActive ? 1.0      : 0.1,
        roughness: 0.4, metalness: 0.3,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh._switchIdx = i;
      scene.add(mesh);
      switchTargets.push(mesh);
    });

    // Connector lines between targets
    SWITCH_POSITIONS.forEach((pos, i) => {
      if (i < SWITCH_POSITIONS.length - 1) {
        const pts = [new THREE.Vector3(...pos), new THREE.Vector3(...SWITCH_POSITIONS[i+1])];
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineBasicMaterial({ color: 0x2a1040, transparent: true, opacity: 0.4 });
        scene.add(new THREE.Line(geo, mat));
      }
    });

    // Glow and light for first active
    addSwitchGlowAndLight(0, R);
  }

  function addSwitchGlowAndLight(idx, R) {
    scene.children = scene.children.filter(c => !c._switchGlow && !c._switchLight);
    const pos = SWITCH_POSITIONS[idx];
    const gGeo = new THREE.SphereGeometry((R || 0.32) * 1.9, 12, 12);
    const gMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.1, side: THREE.BackSide });
    const glow = new THREE.Mesh(gGeo, gMat);
    glow.position.set(...pos); glow._switchGlow = true;
    scene.add(glow);
    const pt = new THREE.PointLight(0xa855f7, 3.5, 10);
    pt.position.set(...pos); pt._switchLight = true;
    scene.add(pt);
  }

  function activateSwitchTarget(idx) {
    switchActive = idx;
    switchTargets.forEach((mesh, i) => {
      const active = i === switchActive;
      mesh.material.color.setHex(active ? 0xa855f7 : 0x1e1e2a);
      mesh.material.emissive.setHex(active ? 0x7c3aed : 0x050508);
      mesh.material.emissiveIntensity = active ? 1.0 : 0.05;
    });
    addSwitchGlowAndLight(idx);
  }

  function onSwitchClick() {
    if (!gameRunning || switchTargets.length === 0) return;
    shots++;
    raycaster.setFromCamera(CENTER, camera);
    const intersects = raycaster.intersectObjects(switchTargets);
    if (intersects.length > 0) {
      const hitIdx = intersects[0].object._switchIdx;
      if (hitIdx === switchActive) {
        hits++;
        score++;
        scoreEl.textContent = score;
        accEl.textContent   = `${Math.round((hits/shots)*100)}%`;
        flashHitRing();
        // Advance to next target in sequence (wraps)
        activateSwitchTarget((switchActive + 1) % SWITCH_POSITIONS.length);
      }
    }
  }

  // ── CANVAS CLICK HANDLER ──
  function onCanvasClick() {
    if (!gameRunning) return;
    if (!pointerLocked) {
      canvas.requestPointerLock();
      return;
    }
    if (gameMode === 'flicking')  onFlickClick();
    if (gameMode === 'switching') onSwitchClick();
  }

  // ── POINTER LOCK ──
  function onPointerLockChange() {
    pointerLocked = document.pointerLockElement === canvas || document.mozPointerLockElement === canvas;
    crosshairEl.classList.toggle('visible', pointerLocked);
    pointerPromptEl.classList.toggle('visible', gameRunning && !pointerLocked);
  }

  function onMouseMove(e) {
    if (!pointerLocked || !gameRunning) return;
    yaw   -= e.movementX * mouseSens;
    pitch -= e.movementY * mouseSens;
    pitch  = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, pitch));
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;
  }

  // ── GAME FLOW ──
  function startGame() {
    const duration = parseInt(document.getElementById('gameDuration').value, 10);
    gameRunning = true;
    score = 0; hits = 0; shots = 0; timeLeft = duration;
    resetHUD(duration);
    buildScene();

    overlay.classList.add('hidden');
    crosshairEl.classList.add('visible');
    canvas.requestPointerLock();

    countdownInt = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 5) timerEl.style.color = '#ef4444';
      if (timeLeft <= 0) stopGame();
    }, 1000);

    if (animId) cancelAnimationFrame(animId);
    let last = null;
    function loop(ts) {
      if (!gameRunning) return;
      const delta = last ? (ts - last) / 1000 : 0;
      last = ts;
      if (gameMode === 'tracking') updateTracking(delta);
      renderer.render(scene, camera);
      animId = requestAnimationFrame(loop);
    }
    animId = requestAnimationFrame(loop);
  }

  function stopGame() {
    gameRunning = false;
    clearInterval(countdownInt);
    if (animId) { cancelAnimationFrame(animId); animId = null; }
    document.exitPointerLock();
    crosshairEl.classList.remove('visible');
    pointerPromptEl.classList.remove('visible');

    // Update best
    if (bestScore[gameMode] === null || score > bestScore[gameMode]) {
      bestScore[gameMode] = score;
    }
    bestEl.textContent = bestScore[gameMode] ?? '—';

    const acc = shots > 0 ? `${Math.round((hits/shots)*100)}%` : '—';

    // Show end overlay
    updateOverlayTheme();
    titleEl.textContent  = 'ROUND OVER';
    subEl.textContent    = `Score: ${score}  ·  ${gameMode === 'tracking' ? 'Tracked well!' : `Accuracy: ${acc}`}  ·  Best: ${bestScore[gameMode]}`;
    startBtn.textContent = '▶ Play Again';
    overlay.classList.remove('hidden');

    // Reset timer color
    timerEl.style.color = '';
  }

  function resetHUD(duration) {
    const d = duration || parseInt(document.getElementById('gameDuration').value, 10);
    scoreEl.textContent  = '0';
    timerEl.textContent  = d;
    accEl.textContent    = '—';
    timerEl.style.color  = '';
    scoreLblEl.textContent = gameMode === 'tracking' ? 'On Target' : 'Score';
  }

  function flashHitRing() {
    hitRingEl.classList.remove('flash');
    void hitRingEl.offsetWidth; // reflow
    hitRingEl.classList.add('flash');
  }

  function showOverlay(isReady) {
    updateOverlayTheme();
    titleEl.textContent  = isReady ? 'READY?' : 'ROUND OVER';
    subEl.textContent    = 'Click Begin to lock cursor & start';
    startBtn.textContent = '▶ Begin Warmup';
    overlay.classList.remove('hidden');
  }

  function renderIdle() {
    if (!renderer || !scene) return;
    renderer.render(scene, camera);
  }

  function resize() {
    if (!renderer || !canvas) return;
    const wrap = canvas.parentElement;
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderIdle();
  }

  window.addEventListener('resize', resize);

  return { init, resize };
})();

/* ═══════════════════════════════════════════════════════════════
   TOAST
   ═══════════════════════════════════════════════════════════════ */
let _toastTimer;
function showToast(msg) {
  const el = document.getElementById('toast');
  clearTimeout(_toastTimer);
  el.textContent = msg;
  el.classList.add('show');
  _toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ═══════════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  loadFromURL();
  initNav();
  initTrainerToggle();
  initRankSelector();
  initSliders();
  initCallsign();
  initCopyPlaylist();
  initShare();
  initSensConverter();
  initFOVConverter();
  renderPlaylist();

  // Init 3D warmup only if Three.js loaded
  if (typeof THREE !== 'undefined') {
    Warmup3D.init();
  } else {
    document.getElementById('canvasOverlay').innerHTML = '<div class="overlay-inner"><div class="overlay-title" style="font-size:20px;color:#ef4444">Three.js failed to load</div><div class="overlay-sub">Check your internet connection</div></div>';
  }
});
