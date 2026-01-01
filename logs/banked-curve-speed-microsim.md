# Banked Curve Speed Analysis MicroSim - Session Log

**Date:** 2025-12-31
**Duration:** ~45 minutes
**MicroSim:** `docs/sims/banked-curve-speed/`

## Summary

Applied improvements from the banked-curve-forces MicroSim and added new features for better usability. Completed full standardization.

## Visual/Code Improvements

### 1. Slider Layout - 2x2 Grid
- Rearranged sliders from 3 rows to 2 rows × 2 columns:
  - Row 1: Angle | Radius
  - Row 2: Speed | μs (friction coefficient)
- Added `calculateSliderWidths()` function for responsive sizing
- Reduced `controlHeight` from 100 to 80 pixels

### 2. Side View Drawing Improvements
- **Road:** Changed from trapezoid to rotating rectangle using `push()/translate()/rotate()/rect()/pop()`
- **Car positioning:** Constant perpendicular distance from road at all angles
- **Car drawing:** Added windshield (light blue) and wheels (black rectangles)
- **Reference line:** Added horizontal dashed line with angle arc
- **Theta label:** Shows `θ=X°` with actual value

### 3. Panel Layout
- Created global `panelWidth = 350` variable
- All four panels now use same width
- Consistent spacing: left column at x=25, right column at x=25+panelWidth+20

### 4. Label Improvements
- Added `noStroke()` before all `text()` calls in graph functions
- Speed displayed in mph (primary) with m/s and km/h below
- Added "ice on road" and "dry road" labels under friction slider
- Moved "down slope" label right 100px for readability
- Adjusted "ideal" text position

### 5. Physics Verification
- Confirmed friction direction logic is correct:
  - speed > ideal → friction down slope (toward center)
  - speed < ideal → friction up slope (away from center)
  - θ=0 (flat) → friction toward center (positive)

## Standardization

### Before Standardization
- Quality Score: **45/100**
- Missing: image metadata, metadata.json, iframe example, lesson plan, references

### Changes Made

1. **YAML Frontmatter** - Added:
   - `image: /sims/banked-curve-speed/banked-curve-speed.png`
   - `og:image: /sims/banked-curve-speed/banked-curve-speed.png`
   - `quality_score: 95`

2. **metadata.json** - Created with Dublin Core fields:
   - Subject keywords: physics, circular motion, centripetal force, banked curves, friction, safe driving
   - Bloom's levels: Understanding, Applying, Analyzing
   - Prerequisites: Newton's laws, force diagrams, trigonometry, circular motion, friction

3. **Copy-paste iframe example** - Added embeddable code block

4. **Lesson Plan** - Added comprehensive section:
   - 5 learning objectives
   - Target audience (grades 11-12, intro college)
   - Prerequisites
   - 4 classroom activities including graph exploration, safe speed range analysis
   - Assessment criteria

5. **References** - Added 3 links:
   - HyperPhysics banked curves
   - Khan Academy circular motion
   - Engineering Toolbox friction coefficients

### After Standardization
- Quality Score: **95/100**

## Files Modified

- `docs/sims/banked-curve-speed/banked-curve-speed.js` - Visual and code improvements
- `docs/sims/banked-curve-speed/index.md` - Documentation standardization
- `docs/sims/banked-curve-speed/metadata.json` - Created new

## Key Code Patterns Applied

### Responsive Sliders
```javascript
function calculateSliderWidths() {
    let sliderWidth = canvasWidth * 0.30;
    let col2X = canvasWidth / 2 + 110;
    angleSlider.size(sliderWidth);
    radiusSlider.size(sliderWidth);
    radiusSlider.position(col2X, drawHeight + 12);
    // ... etc
}
```

### Rotating Road Rectangle
```javascript
push();
translate(-bankW/2, 30);
rotate(-thetaRad);
fill('#8B7355');
stroke('#5D4E37');
strokeWeight(2);
rect(0, 0, bankW, roadThickness);
pop();
```

### Car with Constant Road Distance
```javascript
let roadX = -bankW/2 + carDistAlongRoad * cos(thetaRad);
let roadY = 30 - carDistAlongRoad * sin(thetaRad);
let carX = roadX - carOffset * sin(thetaRad);
let carY = roadY - carOffset * cos(thetaRad);
```

## Relationship to banked-curve-forces

This MicroSim complements banked-curve-forces by focusing on:
- **Speed analysis** rather than force decomposition
- **Friction vs speed graph** showing safe operating regions
- **Maximum/minimum safe speeds** based on friction coefficient
- **Real-world applications** (ice vs dry road conditions)

Both MicroSims now share consistent:
- Car drawing style (with windshield and wheels)
- Road as rotating rectangle
- Responsive slider design
- Documentation standards
