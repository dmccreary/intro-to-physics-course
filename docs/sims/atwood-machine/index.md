---
title: Atwood Machine
description: Interactive simulation of the classic Atwood machine with adjustable masses.
image: /sims/atwood-machine/atwood-machine.png
og:image: /sims/atwood-machine/atwood-machine.png
quality_score: 90
---

# Atwood Machine

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run the Atwood Machine MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the Atwood Machine MicroSim using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/ezkyCv2XB)

## Copy This Iframe

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/atwood-machine/main.html" width="100%" height="600px"></iframe>
```

## About This MicroSim

The Atwood machine demonstrates Newton's second law with connected masses. When the masses are unequal, the system accelerates with both masses moving at the same rate (one up, one down).

### Controls

- **m₁ slider**: Adjust the mass of the left (blue) block (1-15 kg)
- **m₂ slider**: Adjust the mass of the right (red) block (1-15 kg)
- **Release button**: Start the simulation
- **Reset button**: Return to initial state

## Key Equations

- **Acceleration**: a = (m₂ - m₁)g / (m₁ + m₂)
- **Tension**: T = 2m₁m₂g / (m₁ + m₂)

## Key Insights

- If m₁ = m₂: System is in equilibrium (a = 0)
- Tension is always between m₁g and m₂g
- Both masses have the same magnitude of acceleration

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Explain how Newton's second law applies to a system of connected masses
2. Predict the direction of motion based on mass comparison
3. Calculate acceleration and tension in an Atwood machine
4. Understand the string constraint (equal magnitude of acceleration)

### Target Audience

High school physics students (grades 10-12) studying dynamics and Newton's laws

### Prerequisites

- Understanding of Newton's second law (F = ma)
- Familiarity with force diagrams
- Basic algebra skills

### Activities

1. **Exploration** (5 min): Have students adjust the sliders and observe which direction each mass moves
2. **Prediction** (5 min): Before clicking Release, predict which mass will fall and why
3. **Calculation** (10 min): For m₁ = 5 kg and m₂ = 7 kg, calculate the acceleration and verify against the simulation
4. **Special Cases** (5 min): Explore what happens when m₁ = m₂ (equilibrium)
5. **Extension**: What if one mass is much larger than the other? What are the limiting cases?

### Assessment

- Can students correctly predict motion direction?
- Can students calculate acceleration within 5% of the simulated value?
- Can students explain why tension is the same on both sides?

## References

1. [The Atwood Machine - HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/atwd.html) - Georgia State University - Comprehensive derivation of Atwood machine equations with diagrams
2. [Newton's Second Law - Khan Academy](https://www.khanacademy.org/science/physics/forces-newtons-laws/newtons-second-law/a/what-is-newtons-second-law) - Foundation for understanding F = ma
3. [Atwood Machine - Wikipedia](https://en.wikipedia.org/wiki/Atwood_machine) - Historical context and mathematical treatment
