# Bug Fix: Uneven Electron Spacing in Current Animation

**Date:** 2025-12-21
**File:** `docs/sims/current-animation/current-animation.js`
**Function:** `drawAnimatedWire()`

## Problem Description

When adjusting the speed or spacing sliders in the Wire Circuit Simulation, the red dots (representing electrons) displayed inconsistent spacing along the wire segments. Some gaps between electrons were larger than others, even though they should all be evenly spaced.

## Root Cause Analysis

The original algorithm calculated each electron's position independently by adding an offset to a base position and then applying modulo:

```javascript
// Original buggy code
for (let i = 0; i <= numElectrons; i++) {
  let electronPos = (animationTime * speed + i * spacingPixels) % distance;
  // ...
}
```

**The bug:** When the animation offset plus an electron's base position exceeds the wire length (`distance`), the modulo operation wraps that electron to a new position. However, this wrapped position doesn't maintain consistent spacing relative to electrons that didn't wrap.

### Example Trace

With `distance = 300`, `spacingPixels = 70`, and `animationTime * speed = 100`:

| i | Calculation | Position |
|---|-------------|----------|
| 0 | (100 + 0) % 300 | 100 |
| 1 | (100 + 70) % 300 | 170 |
| 2 | (100 + 140) % 300 | 240 |
| 3 | (100 + 210) % 300 | **10** (wrapped) |
| 4 | (100 + 280) % 300 | **80** (wrapped) |

Sorted positions: 10, 80, **100**, 170, 240

Gaps: 70, **20**, 70, 70

The gap from position 80 to 100 is only **20 pixels** instead of the expected 70 pixels.

## Solution

Instead of calculating each electron position independently with modulo, calculate a single starting offset and then space all electrons evenly from that point:

```javascript
// Fixed code
function drawAnimatedWire(x1, y1, x2, y2, speed, spacing) {
  let distance = dist(x1, y1, x2, y2);
  let spacingPixels = spacing * 50;

  // Draw the wire
  stroke('black');
  strokeWeight(lineWidth);
  line(x1, y1, x2, y2);

  if (spacingPixels > 0 && distance > 0) {
    fill('red');
    noStroke();

    // Calculate single offset position (0 to spacingPixels)
    // This ensures all electrons maintain consistent spacing
    let firstPos = (animationTime * speed) % spacingPixels;

    // Draw electrons evenly spaced from that offset
    for (let pos = firstPos; pos < distance; pos += spacingPixels) {
      let t = pos / distance;
      let x = lerp(x1, x2, t);
      let y = lerp(y1, y2, t);
      circle(x, y, 8);
    }
  }
}
```

## Why This Works

1. **Single offset calculation:** `firstPos = (animationTime * speed) % spacingPixels` gives us where the first electron appears on the wire (a value between 0 and spacingPixels).

2. **Consistent increment:** The `for` loop adds `spacingPixels` to each subsequent position, guaranteeing every gap is exactly `spacingPixels`.

3. **Smooth animation:** As `animationTime` increases, `firstPos` smoothly increases from 0 toward `spacingPixels`, then wraps back to 0, creating the illusion of electrons flowing along the wire.

### Verification

With the same parameters (`distance = 300`, `spacingPixels = 70`, `offset = 100`):

- `firstPos = 100 % 70 = 30`
- Positions: 30, 100, 170, 240
- Gaps: 70, 70, 70 ✓

## Additional Improvements

1. Removed the TODO comment noting the bug
2. Fixed typo in function comment: `(y1,y2)` → `(x2,y2)`
3. Simplified guard condition from `numElectrons > 0` to `spacingPixels > 0 && distance > 0`
4. Removed unnecessary `numElectrons` variable calculation
5. Used constant `8` for electron size directly in `circle()` call

## Testing

After applying the fix:
- Electrons maintain consistent spacing at all speed and spacing slider values
- Animation runs smoothly without visual glitches at parameter transitions
- Electrons appear to flow continuously around the circuit
