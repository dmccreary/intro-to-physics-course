# Precision vs Accuracy MicroSim Session Log

**Date:** 2024-12-29
**MicroSim:** precision-accuracy
**Location:** docs/sims/precision-accuracy/

## Changes Made

### 1. Reduced Target Circle Radius
- Changed `targetRadius` from 120 to 90 (25% smaller) to give more room for labels between the circle targets

### 2. Swapped Target Positions
The original layout had targets in incorrect positions relative to the axis labels (Low/High Precision on x-axis, Low/High Accuracy on y-axis).

**Before (incorrect):**
| Position | Target |
|----------|--------|
| Top-left | Accurate & Precise (Green) |
| Top-right | Accurate but Imprecise (Blue) |
| Bottom-left | Precise but Inaccurate (Orange) |
| Bottom-right | Neither (Red) |

**After (correct):**
| Position | Accuracy | Precision | Target |
|----------|----------|-----------|--------|
| Top-left | High | Low | Accurate but Imprecise (Blue) |
| Top-right | High | High | Accurate & Precise (Green) |
| Bottom-left | Low | Low | Neither (Red) |
| Bottom-right | Low | High | Precise but Inaccurate (Orange) |

Also moved the "True Value" label to top-right where the green target now sits.

### 3. MicroSim Standardization

Ran the microsim-utils standardization skill. Initial quality score was ~58/100.

**Created files:**
- `metadata.json` - Dublin Core metadata with educational extensions

**Updated index.md:**
- Added `quality_score: 90` to YAML frontmatter
- Updated target positions table to match new layout
- Added proper linked references:
  1. Physics Classroom - Accuracy and Precision
  2. BIPM - International Vocabulary of Metrology (JCGM 200:2012)
  3. Khan Academy - Precision vs Accuracy video

**User added:**
- p5.js editor link: https://editor.p5js.org/dmccreary/sketches/bZJr3DGHW

### Final Quality Score: 90/100

| Test | Points |
|------|--------|
| Title | 2/2 |
| main.html | 10/10 |
| YAML metadata | 8/8 |
| metadata.json present | 10/10 |
| metadata.json valid | 20/20 |
| iframe | 10/10 |
| Fullscreen button | 5/5 |
| iframe example | 5/5 |
| Screenshot image | 0/5 |
| Overview docs | 5/5 |
| Lesson Plan | 10/10 |
| References | 5/5 |
| p5.js editor link | 5/5 |

## Remaining Tasks

- [ ] Create screenshot (`precision-accuracy.png`) using screen-capture utility to reach 95/100

## Files Modified

1. `docs/sims/precision-accuracy/precision-accuracy.js` - Target radius and position swaps
2. `docs/sims/precision-accuracy/index.md` - YAML metadata, table, references
3. `docs/sims/precision-accuracy/metadata.json` - New file with Dublin Core metadata
