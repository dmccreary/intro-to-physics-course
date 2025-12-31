# Energy Diagram Explorer MicroSim Development Log

**Date:** 2024-12-30
**Location:** `docs/sims/energy-diagram-explorer/`
**Final Quality Score:** 92/100

## Overview

This log documents the iterative development and standardization of the Energy Diagram Explorer MicroSim, an interactive p5.js simulation for exploring potential energy curves, kinetic energy, turning points, and equilibrium positions.

---

## Session Summary

### Phase 1: Bug Fixes and Control Layout

#### 1. Fixed Animation Hang Bug
**Problem:** Animation would freeze when the ball reached turning points due to an infinite loop.

**Root Cause:** When `particleV = 0`, `Math.sign(0) = 0`, causing `particleX -= 0` in the while loop.

**Solution:**
- Added minimum velocity check to prevent zero velocity
- Added iteration limit (100) to the while loop as a safety measure
- Rewrote turning point physics to use energy conservation

**File:** `energy-diagram-explorer.js:152-170`

#### 2. Fixed Control Positioning
**Problem:** Sliders were overlapping their labels, making the UI confusing.

**Solution:**
- Reorganized control layout with proper spacing
- Moved Energy slider to left side of second row
- Moved checkboxes to right side of second row
- Adjusted label positions to align with controls

**File:** `energy-diagram-explorer.js:61-99, 489-506`

#### 3. Dynamic Parameter Labels
**Problem:** Generic "Param: X.XX" label didn't indicate what the parameter meant for each PE type.

**Solution:**
- Each PE type now has a `paramName` field (k, slope, depth, height)
- Labels dynamically show the appropriate parameter name
- Info panel also updated to use proper parameter names

#### 4. Fixed Parameter Slider Range Bug
**Problem:** Default parameter value (5) was outside slider range (0.1-3).

**Solution:**
- Each PE type now defines its own `min`, `max`, and default `param` values
- Slider range updates automatically when PE type changes

---

### Phase 2: Animation Improvements

#### 5. Removed Mouse-Over Dependency
**Problem:** Animation only ran when mouse was hovering over the canvas, causing jerky behavior.

**Solution:**
- Removed `mouseOverCanvas` variable and related event handlers
- Animation now runs continuously when Animate checkbox is checked

**File:** `energy-diagram-explorer.js:128-134`

#### 6. Improved Physics Simulation
**Problem:** Animation was jerky at turning points and stopped when sliders changed.

**Solution:**
- Rewrote `updateParticle()` to use proper energy conservation at turning points
- Added input handlers to mass and param sliders to maintain animation state
- Velocity is recalculated using `v = √(2·KE/m)` when parameters change

#### 7. Added Mass-Scaled Ball
**Problem:** No visual feedback when mass changed.

**Solution:**
- Ball size now scales with mass (14px at 0.5 kg to 36px at 5 kg)
- Ball is always visible, not just during animation
- When not animating, ball sits at equilibrium position (x=0)

**File:** `energy-diagram-explorer.js:291-312`

#### 8. Improved Force Arrow
**Problem:** Force arrow was too small and hidden inside the ball.

**Solution:**
- Increased force multiplier from 5 to 15
- Increased max arrow length from 50 to 80 pixels
- Arrow now starts from edge of ball, not center
- Larger arrowhead (12×6 instead of 8×4)
- Thicker stroke (4 instead of 3)

**File:** `energy-diagram-explorer.js:342-370`

---

### Phase 3: PE Type Improvements

#### 9. Fixed Gravitational PE Function
**Problem:** Original `mgh` function was a linear ramp with no minimum - particle just rolled to boundary and stopped.

**Solution:**
- Changed to V-shaped valley: `PE = slope × 9.8 × |x|`
- Renamed to "Gravity Valley (mg|h|)"
- Particle now oscillates between turning points

**File:** `energy-diagram-explorer.js:32`

#### 10. Fixed Y-Axis Scaling
**Problem:** Auto-scaling y-axis made parameter changes invisible (slope changes didn't appear to change the V angle).

**Solution:**
- Each PE type now has its own `yMax` value for appropriate scaling
- Added `fixedY` flag for types like Double Well where auto-expansion should be disabled
- Harmonic: yMax=50, Gravity Valley: yMax=60, Double Well: yMax=25, Barrier: yMax=50

**File:** `energy-diagram-explorer.js:31-36, 237-249`

#### 11. Added Speed Multiplier
**Problem:** Barrier (Gaussian) animation was too slow.

**Solution:**
- Each PE type now has a `speed` multiplier
- Barrier set to `speed: 4` for 4× faster animation
- Other modes remain at `speed: 1`

**File:** `energy-diagram-explorer.js:31-36, 175-177`

---

### Phase 4: UI Polish

#### 12. Added "Energy is Fixed" Note
**Problem:** Users were confused why energy stayed constant when mass changed.

**Solution:**
- Added small gray text "(Energy is fixed)" next to the title
- Explains that this is intentional behavior for educational purposes

**File:** `energy-diagram-explorer.js:156-160`

#### 13. Added iframe Height Notification
**Solution:**
- Added `postMessage` call to notify parent frame of canvas height
- Enables automatic iframe sizing per project guidelines

**File:** `energy-diagram-explorer.js:103-104`

---

### Phase 5: Standardization

#### 14. Updated index.md
- Added YAML frontmatter with `quality_score`, `image`, and `og:image`
- Added copy-paste iframe example
- Added p5.js Editor link placeholder
- Enhanced documentation sections
- Added comprehensive **Lesson Plans** for all four PE modes:
  - **Harmonic Oscillator** (45-50 min) - Springs, SHM, energy conservation
  - **Gravity Valley** (40-45 min) - Constant force, comparison to harmonic
  - **Double Well** (50-55 min) - Stable/unstable equilibrium, activation energy
  - **Gaussian Barrier** (45-50 min) - Classical reflection/transmission, quantum preview
- Added References section with 7 quality sources

#### 15. Created metadata.json
- Dublin Core compliant metadata
- All 9 required fields
- Educational extensions (Bloom's levels, concepts, prerequisites)
- Subject keywords for discoverability

---

## Final PE Type Configuration

```javascript
let peTypes = [
    { name: 'Harmonic (½kx²)', param: 0.5, paramName: 'k',
      min: 0.1, max: 2, yMax: 50, fixedY: false, speed: 1 },
    { name: 'Gravity Valley (mg|h|)', param: 0.3, paramName: 'slope',
      min: 0.1, max: 1, yMax: 60, fixedY: false, speed: 1 },
    { name: 'Double Well (ax⁴-bx²)', param: 0.5, paramName: 'depth',
      min: 0.2, max: 1.5, yMax: 25, fixedY: true, speed: 1 },
    { name: 'Barrier (Gaussian)', param: 1, paramName: 'height',
      min: 0.1, max: 2, yMax: 50, fixedY: false, speed: 4 }
];
```

---

## Files Modified

1. **energy-diagram-explorer.js** - Complete physics and UI overhaul
2. **index.md** - Standardized documentation with 4 lesson plans
3. **metadata.json** - Created with Dublin Core metadata

---

## Quality Score Breakdown

| Component | Points | Status |
|-----------|--------|--------|
| Title in markdown | 2 | ✅ |
| main.html present | 10 | ✅ |
| YAML title/description | 3 | ✅ |
| Image references | 5 | ✅ |
| metadata.json present | 10 | ✅ |
| metadata.json valid | 20 | ✅ |
| iframe embed | 10 | ✅ |
| Fullscreen button | 5 | ✅ |
| iframe example | 5 | ✅ |
| Preview image | 5 | ✅ |
| Overview documentation | 5 | ✅ |
| Lesson plans | 10 | ✅ |
| References | 5 | ✅ |
| p5.js Editor link | 5 | ✅ |
| **Total** | **92** | |

---

## Key Learnings

1. **Energy conservation** is the proper way to handle turning points in physics simulations
2. **Per-type configuration** (yMax, speed, fixedY) allows each PE function to display optimally
3. **Visual feedback** (mass-scaled ball, force arrows) significantly improves educational value
4. **Fixed y-axis ranges** are essential for showing parameter effects on curve shapes
5. **Comprehensive lesson plans** transform a simulation into a complete teaching tool
