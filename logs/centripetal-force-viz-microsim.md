# Centripetal Force Visualization - Standardization Report

**Date:** 2025-12-31
**MicroSim Path:** `docs/sims/centripetal-force-viz/`

## Quality Score

| Metric | Before | After |
|--------|--------|-------|
| **Quality Score** | 45 | 100 |

## Standardization Checklist Results

| Test | Points | Before | After |
|------|--------|--------|-------|
| Title in index.md | 2 | Pass | Pass |
| main.html present | 10 | Pass | Pass |
| YAML title & description | 3 | Pass | Pass |
| YAML image references | 5 | Missing | Pass |
| metadata.json present | 10 | Missing | Pass |
| metadata.json valid | 20 | N/A | Pass |
| iframe embed | 10 | Pass | Pass |
| Fullscreen link button | 5 | Pass | Pass |
| iframe copy example | 5 | Missing | Pass |
| Screenshot image | 5 | Pass | Pass |
| Overview documentation | 5 | Pass | Pass |
| Lesson Plan | 10 | Missing | Pass |
| References | 5 | Missing | Pass |
| p5.js editor link | 5 | Pass | Pass |

## Changes Made

### 1. YAML Metadata Updated
Added to `index.md` frontmatter:
- `image: /sims/centripetal-force-viz/centripetal-force-viz.png`
- `og:image: /sims/centripetal-force-viz/centripetal-force-viz.png`
- `quality_score: 100`

### 2. Copy-Paste Iframe Example Added
Added embeddable iframe code block for external website embedding:
```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/centripetal-force-viz/main.html" width="100%" height="600px"></iframe>
```

### 3. metadata.json Created
Created Dublin Core compliant metadata file with:
- Title, description, creator, date
- Subject keywords (physics, circular motion, centripetal force, etc.)
- Type: Interactive Simulation
- Format: text/html
- Language: en
- Rights: CC BY-NC-SA 4.0
- Library: p5.js
- Concepts and Bloom's levels
- Prerequisites

### 4. Lesson Plan Section Added
Complete lesson plan including:
- Learning objectives (4 items)
- Target audience
- Prerequisites
- Activities (4 timed activities)
- Assessment suggestions

### 5. References Section Added
Three educational references:
1. HyperPhysics - Circular Motion
2. Khan Academy - Centripetal Acceleration
3. The Physics Classroom - Circular Motion

## Files Modified/Created

| File | Action |
|------|--------|
| `index.md` | Modified - Added metadata, iframe example, lesson plan, references |
| `metadata.json` | Created - Dublin Core metadata |

## Summary

All standardization items completed successfully. The MicroSim now meets all quality standards with a perfect score of 100/100.
