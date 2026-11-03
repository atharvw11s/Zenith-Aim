/* NON-VT AIMLABS CLASSICS */
{ name: 'Gridshot Ultimate',                 difficulty: ['beginner','intermediate'], duration: 5, sets: 3, tip: 'The classic Aimlabs speed test. Click centre of each target the instant it appears.' },
{ name: 'Microshot',                         difficulty: ['beginner'],               duration: 5, sets: 3, tip: 'Small static targets. Build precision — accuracy unlocks speed, never the reverse.' },
{ name: 'Sixshot Ultimate',                  difficulty: ['beginner','intermediate'], duration: 5, sets: 3, tip: 'Six spawning targets, rapid cycle. Pre-aim the spawn zone, not the last hit spot.' },
{ name: 'Strafetrack Ultimate',              difficulty: ['intermediate'],           duration: 5, sets: 3, tip: 'Strafing targets at mid range. Lead the target slightly — click just ahead of movement.' },
{ name: 'Smoothbot',                         difficulty: ['beginner','intermediate'], duration: 5, sets: 3, tip: 'Classic smooth tracking. Minimise lag angle — stay locked, not chasing.' },
{ name: 'Multiclick 1wall 5targets Ultimate',difficulty: ['beginner'],               duration: 5, sets: 3, tip: 'Five targets in a row. Reset your aim between each — no carryover momentum.' },
{ name: 'Spidershot Precision',              difficulty: ['intermediate','advanced'],duration: 5, sets: 4, tip: 'Scattered spawns, fast TTK. Scan ahead — know the next target before clicking current.' },
{ name: 'Motionshot Ultimate',               difficulty: ['intermediate'],           duration: 5, sets: 4, tip: 'Moving target clicking. Read the arc, flick to the future position, not the current one.' },
{ name: 'Precisionshot Ultimate',            difficulty: ['advanced'],               duration: 5, sets: 4, tip: 'Tiny targets, high accuracy demanded. Slow down — one clean click beats three sloppy ones.' },
{ name: 'Microtrack 180',                    difficulty: ['intermediate','advanced'],duration: 5, sets: 4, tip: 'Target bounces off walls. Predict the next wall — aim before the bounce happens.' },
{ name: 'Groundshot Ultimate',               difficulty: ['beginner','intermediate'], duration: 5, sets: 3, tip: 'Ground-level strafing targets. Keep your elbow anchored — pure wrist drifts low.' },
{ name: 'Reactionshot Ultimate',             difficulty: ['intermediate','advanced'],duration: 5, sets: 4, tip: 'Reaction time focused. Relax your hand completely between targets — tension slows you.' },
],
},
@@ -231,10 +231,10 @@ const SENS_DB = {
  aspect: internal aspect ratio used to convert VFOV↔HFOV for that game
  ═══════════════════════════════════════════════════════════════ */
const FOV_DB = {
  rivals:  { label: 'Roblox Rivals',  type: 'vertical',   default: 80,  range: [30, 120], aspect: 16/9 },
  arsenal: { label: 'Roblox Arsenal', type: 'vertical',   default: 70,  range: [30, 120], aspect: 16/9 },
  aimlabs: { label: 'Aimlabs',        type: 'vertical',   default: 70,  range: [1,  150], aspect: 16/9 },
  kovaaks: { label: "Kovaak's",       type: 'horizontal', default: 103, range: [60, 150], aspect: 16/9 },
};
/* ═══════════════════════════════════════════════════════════════
