---
title: Types of Damping Comparison
description: Interactive simulation showing a mass-spring system with real-time displacement graph for underdamped, critically damped, and overdamped oscillators.
image: /sims/damping-types/damping-types.png
og:image: /sims/damping-types/damping-types.png
quality_score: 90
---

# Types of Damping Comparison

<iframe src="main.html" height="460px" width="100%" scrolling="no"></iframe>

[Run Types of Damping Comparison MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

[Edit Types of Damping Comparison MicroSim Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/e9X9D-zme){ .md-button .md-button--secondary }

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/damping-types/main.html" width="100%" height="460px"></iframe>
```

## About This Simulation

This interactive MicroSim demonstrates damped harmonic oscillation through a synchronized mass-spring animation and displacement graph. Watch the mass oscillate while the graph draws in real-time.

### How to Use

1. **Select a damping type** from the dropdown menu
2. **Click "Release"** to start the simulation
3. **Watch** the mass-spring system and graph animate together
4. **Pause/Resume** at any time to examine the motion
5. **Reset** to try a different damping type

## Three Damping Types

### Underdamped (ζ < 1) - Blue curve
- **Oscillates** with exponentially decreasing amplitude
- Multiple crossings of equilibrium before settling
- Most physical oscillators (pendulums, springs, guitar strings)

### Critically Damped (ζ = 1) - Green curve
- **Fastest return** to equilibrium without overshooting
- Crosses equilibrium exactly once
- Optimal for shock absorbers, door closers

### Overdamped (ζ > 1) - Orange curve
- **Slow return** to equilibrium
- Never overshoots or oscillates
- Very viscous systems, heavily dampened mechanisms

## Applications

| Application | Damping Type | Reason |
|-------------|--------------|--------|
| Car shock absorbers | Near critical | Smooth ride, fast response |
| Screen door closers | Near critical | Close smoothly without slamming |
| Guitar strings | Underdamped | Want sustained vibration |
| Measuring instruments | Critical | Fast, accurate readings |

## Learning Activities

### Observe and Compare
1. Run all three damping types and compare how long each takes to reach equilibrium
2. For underdamped motion, count how many oscillations occur before the amplitude drops below 0.1m
3. Notice the initial "overshoot" in underdamped vs. none in overdamped

### Discussion Questions
1. Why would engineers want critical damping for car shock absorbers?
2. What causes the oscillations in underdamped systems to gradually decrease?
3. How could you increase damping in a physical spring system?
4. Which damping type returns to equilibrium fastest? Why might this matter?

### Challenge

Predict what the graph will look like before pressing Release, then verify your prediction.

## References

1. [Damped Harmonic Oscillator](https://en.wikipedia.org/wiki/Harmonic_oscillator#Damped_harmonic_oscillator) - Wikipedia - Comprehensive overview of damped harmonic motion with mathematical derivations
2. [HyperPhysics: Damped Oscillations](http://hyperphysics.phy-astr.gsu.edu/hbase/oscda.html) - Georgia State University - Interactive physics resource explaining damping types with diagrams
3. [The Physics Classroom: Damping](https://www.physicsclassroom.com/class/waves/Lesson-0/Damping) - Educational resource on energy dissipation in oscillating systems
4. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used to create this simulation
