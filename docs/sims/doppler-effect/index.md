---
title: Doppler Effect Simulation
description: An interactive MicroSim demonstrating how source motion affects observed frequency through wavefront compression and expansion.
image: /sims/doppler-effect/doppler-effect.png
og:image: /sims/doppler-effect/doppler-effect.png
quality_score: 95
---

# Doppler Effect Simulation

<iframe src="main.html" height="472px" width="100%" scrolling="no"></iframe>

[Run the Doppler Effect MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the Doppler Effect MicroSim Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/bUxWwXVkd)

Copy this iframe to embed in your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/doppler-effect/main.html" width="100%" height="500px"></iframe>
```

## About This MicroSim

This simulation demonstrates the **Doppler effect** - the change in observed frequency when a wave source is moving relative to an observer. As the source moves, wavefronts compress ahead (higher frequency) and spread out behind (lower frequency).

### Key Concepts

- **Wavefront compression**: Shorter wavelength ahead of moving source
- **Wavefront expansion**: Longer wavelength behind moving source
- **Frequency shift**: f' = f × v/(v ± vs)
- **Mach number**: Ratio of source speed to wave speed

### Controls

| Control | Range | Description |
|---------|-------|-------------|
| Speed | 0-80% of sound | Source velocity |
| Source freq | 200-1000 Hz | Frequency emitted by source |
| Direction | Left/Right | Source travel direction |

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Explain why observed frequency changes when a sound source moves
2. Predict whether frequency increases or decreases based on source motion direction
3. Apply the Doppler formula to calculate observed frequencies
4. Relate wavefront spacing to wavelength and frequency

### Target Audience

High school physics students (grades 10-12) studying wave mechanics and sound.

### Prerequisites

- Understanding of frequency, wavelength, and wave speed relationship (v = fλ)
- Basic understanding of sound as a mechanical wave
- Familiarity with the speed of sound (~340 m/s)

### Activities

1. **Exploration (5 min)**: Run the simulation with default settings. Observe how wavefronts bunch up ahead and spread out behind the source.

2. **Prediction (5 min)**: Before changing the speed slider, predict what will happen to the frequency difference between observers A and B as source speed increases.

3. **Investigation (10 min)**:
   - Set source frequency to 500 Hz
   - Record observed frequencies at 20%, 40%, and 60% of sound speed
   - Calculate the frequency ratio (ahead/behind) for each speed

4. **Analysis (5 min)**: Verify your measurements match the Doppler formula: f' = f × v/(v ± vs)

### Assessment

- Can students correctly predict frequency shifts for approaching vs. receding sources?
- Can students explain why an ambulance siren sounds different as it passes?
- Can students calculate expected frequency shifts using the formula?

## References

1. [Doppler Effect - HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/Sound/dopp.html) - Georgia State University - Comprehensive physics explanation with derivations

2. [The Doppler Effect - Physics Classroom](https://www.physicsclassroom.com/class/waves/Lesson-3/The-Doppler-Effect) - Interactive tutorial with animations and practice problems

3. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used in this simulation
