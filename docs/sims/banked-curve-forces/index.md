---
title: Banked Curve Force Analysis
description: Interactive force analysis diagram for a vehicle on a banked curve showing how the normal force provides centripetal force.
image: /sims/banked-curve-forces/banked-curve-forces.png
og:image: /sims/banked-curve-forces/banked-curve-forces.png
quality_score: 95
---

# Banked Curve Force Analysis

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Banked Curve Force Analysis Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/7NdTk-BLo)

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/banked-curve-forces/main.html" width="100%" height="600px"></iframe>
```

## About This MicroSim

This simulation shows force decomposition on a banked curve. The key insight is that tilting the road surface causes the normal force to have a horizontal component pointing toward the center of the curve, providing centripetal force without relying entirely on friction.

## Key Equations

- **Vertical equilibrium**: $N \cos\theta = mg$
- **Horizontal (centripetal)**: $N \sin\theta + f = \frac{mv^2}{r}$
- **Ideal speed** (no friction): $v_{ideal} = \sqrt{rg \tan\theta}$

## Key Insights

- At ideal speed, the horizontal component of N exactly provides the needed centripetal force
- Above ideal speed: friction must point down the slope to prevent sliding up
- Below ideal speed: friction must point up the slope to prevent sliding down
- Banking reduces dependence on friction for safe curve navigation

## Controls

- **Bank angle**: Angle of the banked surface (5-45 degrees)
- **Radius**: Radius of the curve (50-200 meters)
- **Speed**: Vehicle speed (5-35 m/s)
- **Show N decomposition**: Display the horizontal and vertical components of the normal force

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Explain why roads are banked on curves
2. Decompose the normal force into horizontal and vertical components
3. Calculate the ideal speed for a banked curve with no friction
4. Predict the direction of friction force when traveling above or below ideal speed
5. Apply Newton's second law to circular motion on banked surfaces

### Target Audience

High school physics students (grades 11-12) and introductory college physics students

### Prerequisites

- Newton's laws of motion
- Free body diagrams
- Trigonometry (sine, cosine, tangent)
- Circular motion and centripetal acceleration

### Activities

1. **Exploration (10 min)**: Have students adjust the bank angle while keeping speed constant. Ask: "What happens to the friction requirement as the angle increases?"

2. **Ideal Speed Investigation (15 min)**: Students find the ideal speed for various combinations of angle and radius. They should verify their calculations match the simulation.

3. **Real-World Application (10 min)**: Research actual highway banking angles (typically 2-6 degrees) and calculate safe speeds for those conditions.

4. **Challenge Problem**: Design a race track curve with radius 150m where cars can safely travel at 30 m/s without relying on friction.

### Assessment

- Can students correctly identify when friction points up vs. down the slope?
- Can students derive and apply the ideal speed equation?
- Can students explain why banking reduces dependence on friction?

## References

1. [Banked Curves - HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/Mechanics/carbank.html) - Georgia State University - Comprehensive physics explanation of banked curve mechanics

2. [Circular Motion and Banked Curves - Khan Academy](https://www.khanacademy.org/science/physics/centripetal-force-and-gravitation) - Interactive lessons on centripetal force and circular motion

3. [AASHTO Highway Design Standards](https://www.transportation.gov/) - U.S. Department of Transportation - Engineering guidelines for road banking angles
