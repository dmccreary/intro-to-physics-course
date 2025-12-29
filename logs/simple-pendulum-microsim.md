# Simple Pendulum MicroSim Development Log

**Date:** 2024-12-28
**MicroSim:** Simple Pendulum Period Investigation
**Location:** `docs/sims/simple-pendulum/`

## Session Overview

This session involved significant enhancements to the Simple Pendulum MicroSim, transforming it from a basic simulation into a comprehensive educational laboratory tool with improved UX, transparent measurement processes, and extensive documentation.

---

## Changes Made

### 1. Code Quality Fixes

#### Added `noStroke()` before axis label text
- **File:** `simple-pendulum.js`
- **Issue:** Text was inheriting stroke settings from axis drawing
- **Fix:** Added `noStroke()` at line 259 before drawing axis labels in `drawPeriodGraph()`

#### Fixed p5.js reserved function name conflict
- **Issue:** p5.js editor rejected code due to `currentTime` being a reserved function name
- **Fix:** Renamed variable `currentTime` to `now` in the swing detection logic

### 2. UI Improvements

#### Increased button height
- Changed all button heights from 25px to 50px (later adjusted to 40px by user)
- Buttons: Release, Measure Period, Add to Graph, Clear

#### Release/Pause toggle functionality
- **Before:** "Release" button only started the pendulum
- **After:** Button toggles between "Release" and "Pause" states
- Clicking "Pause" stops the pendulum at current position
- Clicking "Release" restarts from initial angle
- Button text updates appropriately in all scenarios (measurement complete, slider changes, etc.)

### 3. Physics Calibration Fix

#### Fixed simulation timing to match real time
- **Issue:** Blue measurement point appeared far off the theoretical curve
- **Root cause:** Physics scaling factor was incorrect
- **Before:** `angularAcceleration = -(g / (pendulumLength * 100)) * sin(currentAngle)`
- **After:** `angularAcceleration = -(g / (pendulumLength * 3600)) * sin(currentAngle)`
- **Explanation:** Factor of 3600 (60²) properly converts from real-time units to per-frame² at 60fps

### 4. Instructional Design Improvements

#### Added measurement progress indicator
- Shows "Measuring: Swing X of 10" during measurement
- "Measure Period" button changes to "Measuring..." while active

#### Added individual period logging
- Each swing period is recorded and displayed in real-time
- Format: `Periods: 2.01, 2.00, 2.02, 1.99 s`

#### Added sum and average display
- Shows calculation transparency: `Sum: 8.040 s ÷ 4 = Average: 2.010 s`
- Helps students understand how averaging works

#### Auto-add measurements to graph
- Measurements now automatically added to graph when complete
- Removed "Add to Graph" button (no longer needed)
- Renamed "Clear" to "Clear Measurements"

#### Changed theoretical curve default
- "Show theoretical curve" checkbox now defaults to unchecked
- Supports discovery-based learning - students collect data first, then reveal theory

### 5. Layout Adjustments

#### Moved chart and info panel
- Chart moved up 20px (y: 60 → 40)
- Info panel moved up 20px (y: 360 → 340)
- Info panel height increased by 35px (110 → 145)

#### Added text wrapping for periods
- Used p5.js `text(str, x, y, width, height)` format
- Prevents long period lists from overflowing panel

### 6. State Variables Added

```javascript
let isMeasuring = false;
let swingPeriods = [];  // Array to store individual swing periods
```

### 7. New/Modified Functions

#### `startMeasurement()` - Enhanced
```javascript
function startMeasurement() {
    currentAngle = radians(initialAngle);
    angularVelocity = 0;
    isSwinging = true;
    isMeasuring = true;
    swingCount = 0;
    swingStartTime = millis();
    measuredPeriod = 0;
    swingPeriods = [];
    releaseButton.html('Pause');
    measureButton.html('Measuring...');
}
```

#### `releasePendulum()` - Now toggles
```javascript
function releasePendulum() {
    if (isSwinging) {
        isSwinging = false;
        if (isMeasuring) {
            isMeasuring = false;
            measureButton.html('Measure Period');
        }
        releaseButton.html('Release');
    } else {
        currentAngle = radians(initialAngle);
        angularVelocity = 0;
        isSwinging = true;
        swingCount = 0;
        releaseButton.html('Pause');
    }
}
```

#### `drawInfoPanel()` - Complete rewrite
- Shows different content based on state (measuring, completed, idle)
- Displays individual periods with text wrapping
- Shows sum ÷ count = average calculation

---

## Documentation Updates

### index.md - Complete Rewrite

#### YAML Metadata Added
```yaml
---
title: Simple Pendulum Period Investigation
description: Investigate how pendulum length affects period...
image: /sims/simple-pendulum/simple-pendulum.png
og:image: /sims/simple-pendulum/simple-pendulum.png
quality_score: 85
---
```

#### Sections Added/Enhanced
- **About This MicroSim** - Expanded description
- **The Physics** - LaTeX equation, key observations
- **How to Use** - Basic operation, taking measurements, analyzing results

#### Extensive Lesson Plan Added

**Learning Objectives:**
1. Explain the T = 2π√(L/g) relationship
2. Predict how changing length affects period
3. Demonstrate proper experimental technique
4. Analyze experimental data
5. Evaluate sources of error
6. Apply square root relationships

**5 Structured Activities:**

1. **Activity 1: Prediction and Exploration** (10 min)
   - Pre-lab predictions with multiple choice
   - Free exploration time

2. **Activity 2: Systematic Data Collection** (20 min)
   - Data table for 8 lengths (0.4m to 1.8m)
   - Calculate theoretical and percent error
   - Discussion questions

3. **Activity 3: Testing Variables** (15 min)
   - Part A: Mass independence test
   - Part B: Amplitude independence test (small angle approximation)

4. **Activity 4: Mathematical Analysis** (15 min)
   - Linearization: T² vs. L
   - Calculate slope and derive g
   - Analysis questions

5. **Activity 5: Error Analysis and Discussion** (10 min)
   - Sources of error
   - Reflection questions

**Additional Sections:**
- Assessment suggestions (formative and summative)
- Differentiation (struggling and advanced students)
- Common misconceptions to address
- Extensions (Foucault pendulum, coupled pendulums, etc.)

#### References Added
1. HyperPhysics - Simple Pendulum
2. Physics Classroom - Pendulum Motion
3. PhET Interactive Simulations
4. AAPT Resources
5. AP Physics 1 Curriculum
6. Halliday/Resnick/Walker textbook

### metadata.json - Created

Dublin Core metadata file with:
- Required fields (title, description, creator, date, subject, type, format, language, rights)
- Educational extensions (level, Bloom's taxonomy, concepts, prerequisites, objectives)
- Technical details (library: p5.js v1.11.10, features list)

---

## Quality Score

### Before: ~38/100

| Test | Status | Points |
|------|--------|--------|
| Title | ✅ | 2/2 |
| main.html | ✅ | 10/10 |
| YAML metadata | ✅ | 3/3 |
| Image references | ❌ | 0/5 |
| metadata.json | ❌ | 0/10 |
| metadata.json valid | ❌ | 0/20 |
| iframe | ✅ | 10/10 |
| Fullscreen button | ✅ | 5/5 |
| iframe example | ❌ | 0/5 |
| Overview docs | ✅ | 5/5 |
| Lesson plan | ⚠️ | 3/10 |
| References | ❌ | 0/5 |
| p5.js editor link | ❌ | 0/5 |

### After: 85/100

| Test | Status | Points |
|------|--------|--------|
| Title | ✅ | 2/2 |
| main.html | ✅ | 10/10 |
| YAML metadata | ✅ | 3/3 |
| Image references | ✅ | 5/5 |
| metadata.json | ✅ | 10/10 |
| metadata.json valid | ✅ | 20/20 |
| iframe | ✅ | 10/10 |
| Fullscreen button | ✅ | 5/5 |
| iframe example | ✅ | 5/5 |
| Overview docs | ✅ | 5/5 |
| Lesson plan | ✅ | 10/10 |
| References | ✅ | 5/5 |
| p5.js editor link | ✅ | 5/5 |

*Note: Score set to 85 pending screenshot creation (simple-pendulum.png)*

---

## Files Modified

1. `docs/sims/simple-pendulum/simple-pendulum.js` - Multiple enhancements
2. `docs/sims/simple-pendulum/index.md` - Complete rewrite with lesson plan
3. `docs/sims/simple-pendulum/metadata.json` - Created new file

---

## Remaining Tasks

1. **Create screenshot** - Run screen-capture utility to create `simple-pendulum.png`
2. **p5.js Editor** - Sketch uploaded to: https://editor.p5js.org/dmccreary/sketches/Ve3aG8AL6

---

## Key Instructional Design Decisions

1. **Transparent measurement process** - Showing individual periods and running averages teaches data collection methodology
2. **Hidden theoretical curve by default** - Supports discovery learning
3. **Auto-add to graph** - Reduces friction, focuses attention on the science
4. **Sum ÷ count = average display** - Makes calculation explicit for students
5. **5-activity lesson plan** - Progressive complexity from prediction to mathematical analysis
6. **Multiple assessment options** - Lab reports, quiz questions, extension problems
7. **Differentiation strategies** - Support for both struggling and advanced students
8. **Common misconceptions** - Explicitly addresses typical student errors
