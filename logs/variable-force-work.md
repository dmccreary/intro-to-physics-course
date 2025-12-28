# Variable Force Work MicroSim Standardization Log

**Date:** 2024-12-28
**MicroSim:** `docs/sims/variable-force-work/`
**Initial Quality Score:** 40/100
**Final Quality Score:** 95/100

## Pre-Standardization State

### Files Present
- `main.html` - Main HTML file with p5.js integration
- `variable-force-work.js` - JavaScript simulation code
- `variable-force-work.png` - Screenshot (user pre-added)
- `index.md` - Documentation (incomplete)

### Missing Components
- No `metadata.json` file
- No image references in YML frontmatter
- No copy-paste iframe example
- No Lesson Plan section
- No References section
- No quality_score in metadata

## Pre-Work Fix

Before standardization, a minor fix was made to the JavaScript file:

**File:** `variable-force-work.js:201`
**Change:** Added `noStroke()` before drawing axis labels to prevent stroke artifacts on text rendering.

```javascript
// Axis labels
noStroke();  // Added
fill('black');
textSize(14);
```

## Standardization Checklist Results

| Test | Points | Before | After |
|------|--------|--------|-------|
| Title (level 1 header) | 2 | ✓ | ✓ |
| main.html present | 10 | ✓ | ✓ |
| YML title/description | 3 | ✓ | ✓ |
| YML image references | 5 | ✗ | ✓ |
| metadata.json present | 10 | ✗ | ✓ |
| metadata.json valid | 20 | ✗ | ✓ |
| iframe embed | 10 | ✓ | ✓ |
| Fullscreen button | 5 | ✓ | ✓ |
| Copy-paste iframe example | 5 | ✗ | ✓ |
| Image present & referenced | 5 | Partial | ✓ |
| Overview documentation | 5 | ✓ | ✓ |
| Lesson plan | 10 | ✗ | ✓ |
| References | 5 | ✗ | ✓ |
| p5.js editor link | 5 | ✓ | ✓ |
| **TOTAL** | **100** | **40** | **95** |

## Changes Made

### 1. YML Frontmatter Updates

Added image references for social media previews:

```yaml
---
title: Variable Force Work Calculation
description: Interactive visualization showing work as the area under a force-position curve
image: /sims/variable-force-work/variable-force-work.png
og:image: /sims/variable-force-work/variable-force-work.png
quality_score: 95
---
```

### 2. Created metadata.json

New Dublin Core compliant metadata file:

```json
{
  "title": "Variable Force Work Calculation",
  "description": "An interactive MicroSim demonstrating how work is calculated for variable forces by showing the area under a force-versus-position graph. Students can experiment with different force functions and see how the integral relates to work.",
  "creator": "Dan McCreary",
  "date": "2024-12-28",
  "subject": ["work", "energy", "variable force", "integration", "calculus", "physics", "force-position graph"],
  "type": "Interactive Simulation",
  "format": "text/html",
  "language": "en",
  "rights": "CC BY-NC-SA 4.0",
  "library": "p5.js",
  "concepts": ["work", "variable force", "integration", "area under curve", "force-position graph", "Hooke's law"],
  "bloomsLevel": ["Understanding", "Applying", "Analyzing"],
  "prerequisites": ["Basic calculus concepts", "Understanding of work and energy", "Force and displacement relationship"]
}
```

### 3. Added Copy-Paste Iframe Example

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/variable-force-work/main.html" width="100%" height="600px"></iframe>
```

### 4. Added Lesson Plan Section

Complete lesson plan with:
- **Learning Objectives** (4 objectives)
- **Target Audience**: High school physics students (grades 11-12)
- **Prerequisites**: Work concepts, integration basics, Hooke's Law
- **Activities** (4 structured activities):
  1. Exploration with constant force
  2. Linear force investigation
  3. Quadratic force challenge
  4. Energy equivalents discussion
- **Assessment**: 3 assessment questions

### 5. Added References Section

1. [Work Done by a Variable Force - Physics LibreTexts](https://phys.libretexts.org/Bookshelves/University_Physics/University_Physics_(OpenStax)/Book%3A_University_Physics_I_-_Mechanics_Sound_Oscillations_and_Waves_(OpenStax)/07%3A_Work_and_Kinetic_Energy/7.02%3A_Work) - OpenStax
2. [Work - HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/wcon.html) - Georgia State University
3. [p5.js Reference](https://p5js.org/reference/) - Library documentation

## Final Directory Structure

```
docs/sims/variable-force-work/
├── main.html                    # Main HTML wrapper
├── variable-force-work.js       # p5.js simulation code
├── variable-force-work.png      # Screenshot for social preview
├── metadata.json                # Dublin Core metadata (NEW)
└── index.md                     # Documentation (UPDATED)
```

## MicroSim Features

The Variable Force Work MicroSim demonstrates:

- **Force Types**: Constant (F=10N), Linear (F=5x), Quadratic (F=2x²), Square Root (F=8√x)
- **Interactive Controls**: Force type selector, start/end position sliders
- **Visualization**: Animated area fill showing work as area under curve
- **Calculations**: Real-time work calculation with energy equivalent display
- **p5.js Editor**: https://editor.p5js.org/dmccreary/sketches/iJngD-w74

## Notes

- Quality score of 95/100 (not 100) because the simulation could potentially include additional accessibility features or more detailed references
- The p5.js editor link was pre-added by the user
- The screenshot was pre-added by the user
