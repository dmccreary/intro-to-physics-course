# Banked Curve Force Analysis MicroSim - Session Log

**Date:** 2025-12-31
**Duration:** ~1.5 hours
**MicroSim:** `docs/sims/banked-curve-forces/`

## Summary

Cleaned up and standardized the Banked Curve Force Analysis MicroSim, fixing visual issues with the simulation and bringing documentation up to quality standards.

## Visual/Code Improvements

### 1. Panel Layout Adjustments
- Moved Force Analysis panel up 20 pixels
- Relocated Key Equations box to below the Force Analysis panel
- Adjusted panel widths from 220 → 200 → 160 → 140 (final)
- Created global variable `rightPanelWidth` for consistent panel sizing

### 2. Car Rotation Fix
- **Problem:** Car angle increased faster than road angle as bank angle increased
- **Root Cause:** Road was drawn using vertex positions that created a different slope than `thetaRad`
- **Solution:** Calculated actual road angle from geometry using `atan2(roadDeltaY, roadDeltaX)`

### 3. Car-Road Spacing Fix
- **Problem:** Gap between car and road varied with changing angle
- **Solution:** Implemented constant perpendicular distance from road surface:
  - Calculate position along rotated road
  - Offset perpendicular to road by fixed `carOffset` value

### 4. Road Shape Fix
- **Problem:** Road turned into trapezoid as angle increased
- **Solution:** Changed road from vertex-based parallelogram to rotating rectangle:
  - Used `push()/translate()/rotate()/rect()/pop()` pattern
  - Road now rotates around left edge pivot point
  - Car rotation updated to use `thetaRad` directly (matching road)

### 5. Car Visual Enhancements (user-made)
- Added wheels to car drawing
- Adjusted windshield rectangle
- Updated "Center of curve" label positioning

## Standardization (microsim-utils skill)

### Before Standardization
- Quality Score: **45/100**
- Missing: image metadata, metadata.json, iframe example, lesson plan, references

### Changes Made

1. **YAML Frontmatter** - Added:
   - `image: /sims/banked-curve-forces/banked-curve-forces.png`
   - `og:image: /sims/banked-curve-forces/banked-curve-forces.png`
   - `quality_score: 95`

2. **metadata.json** - Created with Dublin Core fields:
   - Title, description, creator, date
   - Subject keywords: physics, circular motion, centripetal force, banked curves, etc.
   - Bloom's levels: Understanding, Applying, Analyzing
   - Prerequisites: Newton's laws, force diagrams, trigonometry

3. **Copy-paste iframe example** - Added embeddable code block

4. **Lesson Plan** - Added comprehensive section:
   - 5 learning objectives
   - Target audience (grades 11-12, intro college)
   - Prerequisites
   - 4 classroom activities with timing
   - Assessment criteria

5. **References** - Added 3 links:
   - HyperPhysics banked curves
   - Khan Academy circular motion
   - AASHTO highway design standards

### After Standardization
- Quality Score: **95/100**

## Files Modified

- `docs/sims/banked-curve-forces/banked-curve-forces.js` - Visual fixes
- `docs/sims/banked-curve-forces/index.md` - Documentation standardization
- `docs/sims/banked-curve-forces/metadata.json` - Created new

## Key Code Changes

### Road Drawing (before)
```javascript
beginShape();
vertex(-bankWidth/2, bankHeight/2);
vertex(bankWidth/2 * cos(thetaRad), bankHeight/2 - bankWidth/2 * sin(thetaRad));
// ... trapezoid shape
endShape(CLOSE);
```

### Road Drawing (after)
```javascript
push();
translate(-bankWidth/2, bankHeight/2);
rotate(-thetaRad);
rect(0, 0, bankWidth, 30);
pop();
```

### Car Positioning (after)
```javascript
// Position along the rotated road
let roadX = -bankWidth/2 + carDistAlongRoad * cos(thetaRad);
let roadY = bankHeight/2 - carDistAlongRoad * sin(thetaRad);

// Offset perpendicular to road surface
let carOffset = 20;
let carX = roadX - carOffset * sin(thetaRad);
let carY = roadY - carOffset * cos(thetaRad);
```

## Lessons Learned

1. When drawing rotated shapes, use `push()/translate()/rotate()/pop()` for cleaner code
2. For objects that should maintain constant distance from a rotated surface, calculate position along the surface then offset perpendicular using trig
3. Global variables for shared dimensions (like panel widths) make adjustments easier
