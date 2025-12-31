# Car on Curve MicroSim Development Log

**Date:** 2025-12-31
**Duration:** ~30 minutes

## Overview

Enhanced and standardized the Car on Curve MicroSim, which demonstrates centripetal force and friction requirements for a car navigating a curve.

## Changes Made

### Code Improvements (car-on-curve.js)

1. **Responsive sliders** - Consolidated slider positioning into `updateSliders()` function called on setup and window resize
2. **Increased control height** - Changed from 100px to 130px to accommodate additional labels
3. **Added friction reference labels** - "ice on road" and "dry pavement" labels under friction slider
4. **Right-aligned status labels** - Moved "Safe/Skidding" status to align from right edge of canvas
5. **Renamed `speed` to `carSpeed`** - Fixed p5.js reserved function name conflict
6. **Refactored drawing code** - Extracted road and car drawing into `drawCarAndRoad()` function
7. **Changed road to full circle** - Updated from 180° arc to 360° ellipse
8. **Added Start/Pause button** - Default state is paused with toggle functionality
9. **Converted units to mph** - Speed display and max safe speed now shown in miles per hour

### Standardization (index.md)

1. **YAML frontmatter** - Added `image`, `og:image`, and `quality_score` fields
2. **Copy-paste iframe** - Added embeddable iframe code block
3. **Lesson Plan** - Added complete lesson plan with:
   - Learning objectives (4 items)
   - Target audience
   - Prerequisites
   - Activities (4 classroom activities)
   - Assessment questions
4. **References** - Added 3 educational resource links (Khan Academy, Physics Classroom, HyperPhysics)

### New Files Created

- `metadata.json` - Dublin Core metadata with educational extensions

## Quality Score

- **Before:** 43/100
- **After:** 100/100

## Key Features of the MicroSim

- Interactive sliders for speed (0-60 m/s), radius (20-200 m), and friction coefficient (0.1-1.0)
- Visual car animation driving around circular track
- Force vectors showing velocity and centripetal force
- Real-time physics calculations displayed in info panel
- Skid detection with visual feedback (car turns red, drifts outward)
- Start/Pause control for animation

## Files Modified

- `docs/sims/car-on-curve/car-on-curve.js`
- `docs/sims/car-on-curve/index.md`
- `docs/sims/car-on-curve/metadata.json` (created)
