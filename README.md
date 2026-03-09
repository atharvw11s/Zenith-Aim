# AimRivals — Upgraded

> Daily aim training routines, sensitivity converters, FOV calculators and live 3D warmup games — built for Roblox FPS players.

**Live site:** https://atharvw11s.github.io/AimRivals-Upgraded/  
**Author:** PurplsXD

---

## Features

### 📋 Daily Routines
Generates a 9-task training playlist weighted by your chosen split across **Flicking**, **Tracking**, and **Switching**. Pick your rank (Beginner / Intermediate / Advanced) and your platform (Aimlabs or KovaaK's).

### 🖱️ Sensitivity Converter
Converts mouse sensitivity between **Roblox Rivals**, **Roblox Arsenal**, **Aimlabs**, and **KovaaK's** using accurate yaw values. Shows a full cross-platform reference table so every game feels identical.

| Game | Yaw |
|------|-----|
| Roblox Rivals | 0.37503 |
| Roblox Arsenal | 0.37503 |
| Aimlabs | 0.05 |
| KovaaK's | 0.022 |

### 🔭 FOV Converter
Converts Vertical and Horizontal FOV between any supported game. Automatically calculates equivalent HFOV for KovaaK's.

Formula: `HFOV = 2 × atan(tan(VFOV/2) × aspectRatio)`

### 🎮 3D Warmup Games
Three real-time Three.js games inside the browser — pointer-lock controls, live scoring:

- **Tracking** — follow a smoothly moving sphere through 3D space
- **Flicking** — snap between randomly spawning lit targets
- **Switching** — cycle through a sequence of targets in order

---

## File Structure

```
index.html      Landing page
app.html        Main app (Routines / Converters / Warmup)
styles.css      Shared design system (CSS variables, components)
landing.css     Landing page specific styles
script.js       App logic (routines, converters, 3D warmup)
landing.js      Landing page particles + scroll animations
config.js       Central config (game databases, defaults)
manifest.json   PWA manifest
README.md       This file
```

---

## Tech Stack

- **Vanilla JS** — no frameworks
- **Three.js r128** — 3D warmup games
- **Google Fonts** — Jost, Karla, Oswald
- **CSS Custom Properties** — full design token system

---

## Scenario Credits

Scenarios sourced from the **Voltaic** benchmark system (S3/S5), **VDIM**, and the Aimlabs/KovaaK's community.

---

## License

Open source. Fork it, improve it, share it.
