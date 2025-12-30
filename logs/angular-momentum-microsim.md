# Angular Momentum Vector MicroSim - Development Log

**Date:** December 30, 2024
**MicroSim:** `docs/sims/angular-momentum-vector/`
**Focus:** Instructional design tradeoffs and iterative simplification

## Overview

This session transformed a passive dual-diagram animation showing angular momentum vectors into an interactive learning tool. The development followed a classic pattern: initial feature expansion based on instructional design principles, followed by significant simplification as we discovered which features genuinely supported learning versus added complexity.

## Initial Instructional Design Analysis

### Learning Objectives Identified
1. Understanding that angular momentum (L) is a vector quantity
2. Applying the right-hand rule to determine vector direction
3. Recognizing that L and ω are always parallel
4. Understanding the relationship L = Iω

### Initial Feature Set (Maximum Interactivity)

Based on instructional design principles, we initially implemented:

1. **Angular velocity (ω) slider** - Direct manipulation of rotation speed
2. **Moment of inertia (radius) slider** - Adjust disk size to see I changes
3. **3D view angle slider** - Rotate perspective to see vectors from different angles
4. **Direction toggle button** - Switch between CW and CCW rotation
5. **Quiz mode** - Predict vector direction before reveal
6. **Step-through mode** - Scaffolded 4-step learning sequence
7. **Mouse drag interaction** - Drag on disk to rotate 3D view
8. **Blue rotation arrow** - Curved arrow showing rotation direction
9. **Right-hand rule panel** - Visual guide with animated thumb direction
10. **Numerical readouts** - Real-time display of ω, I, and L values
11. **Info panel** - Key relationships and formulas

## Iterative Simplification

### Removed: Quiz Mode

**Rationale:** The quiz mode (predict-then-reveal) added cognitive load without proportional benefit. Students can already test their understanding by:
- Mentally predicting before clicking direction toggle
- Using the step-through mode for scaffolded learning

The explicit quiz infrastructure (buttons, score tracking, feedback messages) cluttered the interface.

### Removed: 3D View Angle Slider

**Rationale:** The 3D perspective rotation was technically impressive but pedagogically distracting:
- Students focused on the "cool 3D effect" rather than the physics
- The default view angle was already optimal for seeing vector directions
- Removing it allowed the remaining two sliders (ω and radius) to have more screen space

### Removed: Mouse Drag Interaction

**Rationale:** With the 3D view angle slider gone, the mouse drag feature became orphaned functionality. It also:
- Confused students who accidentally dragged when trying to click buttons
- Added code complexity (mousePressed, mouseDragged, mouseReleased handlers)
- Required instruction text that cluttered the visualization

### Removed: Blue Rotation Arrow

**Rationale:** The curved blue arrow around the disk was redundant because:
- The rotating dots on the disk surface clearly show rotation direction
- The "Clockwise (CW)" / "Counter-clockwise (CCW)" text label remains
- The right-hand rule panel shows finger curl direction
- Less visual clutter helps students focus on the L and ω vectors

## Technical Refinements

### Custom Controls → p5.js Built-ins

Replaced custom `drawSlider()` and `drawButton()` functions with p5.js native controls:
- `createSlider()` for all sliders
- `createButton()` for all buttons
- Benefits: Better accessibility, native look-and-feel, less code to maintain

### Responsive Layout

Implemented `positionControls()` function called on setup and window resize:
- Sliders positioned at `canvasWidth * 0.08` and `canvasWidth * 0.55`
- Slider widths set to `canvasWidth * 0.35`
- Buttons centered under their respective sliders

### Physics Bug Fixes

**Rotation Direction Mismatch:** When button showed "CW", disk rotated CCW.
- Fix: Changed rotation update from `isClockwise ? -1 : 1` to `isClockwise ? 1 : -1`

**Vector Direction Wrong (Right-Hand Rule):** L and ω vectors pointed UP during CW rotation, but should point DOWN per right-hand rule.
- Fix: Changed `omegaDirection = isClockwise ? 1 : -1` to `omegaDirection = isClockwise ? -1 : 1`
- CW rotation → curl fingers clockwise → thumb points DOWN → L points DOWN
- CCW rotation → curl fingers counter-clockwise → thumb points UP → L points UP

### Right-Hand Rule Panel Spacing

Fixed title overlapping hand illustration by:
- Increasing panel height from 145px to 185px
- Moving title up to y=-100
- Shifting hand illustration down with nested `translate(-20, -30)`

## Final Design

The simplified MicroSim retains high instructional value with reduced complexity:

### Kept Features
| Feature | Instructional Purpose |
|---------|----------------------|
| ω slider | Direct manipulation shows how rotation speed affects L magnitude |
| Radius slider | Shows how moment of inertia (I = ½mr²) affects L |
| Direction toggle | Core interaction for understanding right-hand rule |
| Step-through mode | Scaffolded learning for novices |
| Right-hand rule panel | Visual reference that updates with direction |
| Numerical readouts | Quantitative feedback showing L = Iω relationship |
| Rotating disk markers | Visual confirmation of rotation direction |

### Removed Features
| Feature | Why Removed |
|---------|-------------|
| Quiz mode | Redundant with step-through; added UI clutter |
| 3D view slider | Distracted from physics; one angle is sufficient |
| Mouse drag | Orphaned feature; caused accidental interactions |
| Blue rotation arrow | Redundant with disk markers and text label |

## Key Instructional Design Insights

1. **More interactivity ≠ better learning.** Each interactive element competes for attention. The goal is *targeted* interactivity that supports specific learning objectives.

2. **Redundant feedback can be removed.** When multiple elements communicate the same information (rotation direction shown by: blue arrow, disk markers, text label, right-hand panel), removing some reduces cognitive load without losing information.

3. **Scaffolding beats testing.** The step-through mode (building understanding incrementally) proved more valuable than quiz mode (testing existing understanding). Students in introductory physics need scaffolding first.

4. **Visual simplicity supports focus.** Removing the 3D view controls and blue arrow made the L and ω vectors more prominent—the actual learning target.

5. **Native controls improve UX.** Custom-drawn sliders and buttons may look consistent but lack accessibility features and familiar behavior that p5.js built-ins provide.

## Files Modified

- `docs/sims/angular-momentum-vector/angular-momentum-vector.js` - Complete rewrite
- `docs/sims/angular-momentum-vector/index.md` - Updated iframe height to 530px

## Final Statistics

- **Lines of code:** ~610 (down from ~750 at maximum feature set)
- **Interactive controls:** 2 sliders, 3 buttons
- **Visual panels:** 3 (right-hand rule, info/formulas, numerical readouts)
- **Learning modes:** 2 (free exploration, step-through)
