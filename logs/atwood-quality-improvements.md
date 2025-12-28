# Atwood MicroSims Quality Improvements

**Date:** 2025-12-28
**Session Type:** MicroSim Standardization and Bug Fixes

## Overview

This session involved fixing functionality bugs and running quality standardization on two Atwood machine MicroSims.

## MicroSims Updated

1. `docs/sims/atwood-machine/` - Interactive Atwood machine simulation
2. `docs/sims/atwood-fbd/` - Atwood machine free-body diagram visualization

---

## Part 1: Bug Fixes

### atwood-fbd

| Issue | Fix |
|-------|-----|
| Solution box covering the drawing | Changed position from fixed `280` to `canvasWidth - 250` for responsive positioning |
| m₁ Free Body Diagram box position | Moved from x=50 to x=20 (30 pixels left) |

### atwood-machine

| Issue | Fix |
|-------|-----|
| Motion direction reversed (lighter mass moving down) | Swapped displacement signs: `m1Y = baseY - displacement * 80` and `m2Y = baseY + displacement * 80` |
| Time counter (t=) display | Removed as it added no learning value |
| Pulley too small, blocks overlapping | Increased pulley radius from 30 to 50 (user adjusted from initial 36) |
| Force vectors hard to see on blocks | Moved all m₁ vectors to LEFT of block, all m₂ vectors to RIGHT of block |
| Machine not centered well | Changed `pulleyX` from `canvasWidth / 2` to `canvasWidth * 0.35` |
| Machine height too short | Increased `baseY` from 200 to 300 |

---

## Part 2: Quality Standardization

### Initial Quality Scores

Both MicroSims started at **35/100**

#### Items Passing (35 points)
- Title (level 1 markdown): 2
- main.html present: 10
- Metadata 1 (title/description in yml): 3
- iframe with main.html: 10
- Fullscreen Link Button: 5
- Overview Documentation: 5

#### Items Missing (65 points)
- Metadata 2 (image for social preview): 5
- metadata.json present: 10
- metadata.json valid: 20
- iframe example (copy-paste): 5
- image in directory: 5
- Lesson Plan: 10
- References: 5
- p5.js Editor Link: 5

### Changes Made

#### index.md Updates (Both MicroSims)

1. **YAML Frontmatter** - Added:
   - `image: /sims/<name>/<name>.png`
   - `og:image: /sims/<name>/<name>.png`
   - `quality_score: 90`

2. **Copy This Iframe Section** - Added HTML code block with embed URL:
   ```html
   <iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/<name>/main.html" width="100%" height="600px"></iframe>
   ```

3. **Controls Subsection** - Documented all sliders, buttons, and checkboxes

4. **Lesson Plan Section** - Added complete lesson plans with:
   - Learning Objectives (4-5 items)
   - Target Audience
   - Prerequisites
   - Activities (5 structured activities)
   - Assessment criteria

5. **References Section** - Added 3-4 educational references including:
   - HyperPhysics
   - Khan Academy
   - The Physics Classroom
   - Wikipedia

#### metadata.json Created (Both MicroSims)

Dublin Core compliant metadata files with:
- `title`, `description`, `creator`, `date`
- `subject` (array of keywords)
- `type`: "Interactive Simulation"
- `format`: "text/html"
- `language`: "en"
- `rights`: "CC BY-NC-SA 4.0"
- `library`: "p5.js"
- `concepts` (array)
- `bloomsLevel` (array)
- `prerequisites` (array)

### Final Quality Scores

Both MicroSims improved to **90/100**

#### Items Now Passing (90 points)
- Title: 2
- main.html present: 10
- Metadata 1: 3
- Metadata 2 (image refs): 5
- metadata.json present: 10
- metadata.json valid: 20
- iframe: 10
- Fullscreen Button: 5
- iframe example: 5
- Overview Documentation: 5
- Lesson Plan: 10
- References: 5

#### Items Still Missing (10 points)
- Screenshot image file (PNG): 5
- p5.js Editor Link: 5

---

## Files Modified

### atwood-machine/
- `atwood-machine.js` - Bug fixes (motion direction, vectors, layout)
- `index.md` - Quality standardization
- `metadata.json` - Created new

### atwood-fbd/
- `atwood-fbd.js` - Layout fixes (Solution box, FBD position)
- `index.md` - Quality standardization
- `metadata.json` - Created new

---

## Remaining Work

To reach 100/100 quality score:

1. **Capture screenshots** - Run screen-capture utility to create:
   - `atwood-machine/atwood-machine.png`
   - `atwood-fbd/atwood-fbd.png`

2. **Upload to p5.js Editor** - Create sketches and add editor links to index.md files
