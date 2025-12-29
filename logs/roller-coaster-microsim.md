# Roller Coaster Energy MicroSim - Bug Fixes and Enhancements

**Date:** 2025-12-28
**File:** `docs/sims/roller-coaster-energy/roller-coaster-energy.js`

## Issues Fixed

### 1. Track Polarity Problems (Reversed Waveforms)

All three track types had hill sections using `cos()` which created discontinuities and inverted waveforms (dipping below ground instead of rising above).

**Simple Hill (tracks[0]):**
- Changed `y = baseY - h * 25 * cos(localT * PI)` to `y = baseY - h * 20 * sin(localT * PI)`
- Hill now smoothly rises from ground level to peak and back down
- Height reduced to 80% of starting height for physical realism

**Double Hill (tracks[1]):**
- First hill: Changed `cos(localT * PI)` to `sin(localT * PI)`, height `h * 25` → `h * 20`
- Second hill: Changed `cos(localT * PI)` to `sin(localT * PI)`, height `h * 18` → `h * 14`
- Both hills now rise smoothly from ground level

**Loop-de-loop (tracks[2]):**
- Entry ramp: Changed `y = baseY - h * 25 * cos(localT * PI * 0.7)` to `y = baseY - 10 * sin(localT * PI / 2)`
- Exit ramp: Changed `y = baseY - 30 + 30 * localT` to `y = baseY - 10 * (1 - localT)`
- Both transitions now connect smoothly to the loop (y=340)

### 2. Release Cart Button Not Working

**Root cause:** Chicken-and-egg problem at t=0:
- Cart starts at height = initialHeight
- Energy calculation: `availableKE = totalEnergy - currentPE = 0`
- Therefore `cart.v = 0` and `speed = cart.v * 0.0015 = 0`
- Cart never moves because it needs to move to gain kinetic energy

**Fix:** Added minimum speed to ensure cart always progresses:
```javascript
let speed = max(0.00008 * speedMult, cart.v * 0.0006 * speedMult);
```

### 3. Simulation Stops on First Button Press

**Root cause:** Stop condition `cart.v < 0.1` triggered immediately at t=0 when v=0.

**Fix:** Added position check before velocity check:
```javascript
if (cart.t >= 1 || (cart.t > 0.2 && cart.v < 0.1)) {
```
Cart must move past initial hill (t > 0.2) before low-velocity stop condition applies.

### 4. Animation Too Fast

**Fix:** Reduced speed multipliers by ~2.5x:
- Base multiplier: `0.0015` → `0.0006`
- Minimum speed: `0.0002` → `0.00008`

## Enhancements

### Speed Slider Added

New slider to control animation speed:
- **Range:** 0.2 to 1.2
- **Default:** 0.5 (50% slower than original)
- **1.0 position:** 80% of slider (20% from top) = original speed

### Responsive 2-Row Slider Layout

Reorganized controls into two rows:
- **Row 1:** Mass, Height
- **Row 2:** Friction, Speed

**Responsive features:**
- Slider width: `canvasWidth * 0.45`
- Column 2 position: `sliderLeftMargin + canvasWidth * 0.5`
- `updateSliderLayout()` function called on setup and window resize

## Technical Summary

| Change | Before | After |
|--------|--------|-------|
| Hill waveform | `cos(localT * PI)` | `sin(localT * PI)` |
| Min speed | 0 | 0.00008 * speedMult |
| Speed multiplier | 0.0015 | 0.0006 * speedMult |
| Stop condition | `cart.v < 0.1` | `cart.t > 0.2 && cart.v < 0.1` |
| Slider layout | Single row, fixed size | Two rows, responsive |
| Speed control | None | Slider (0.2 - 1.2x) |
