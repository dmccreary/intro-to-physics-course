---
title: Gravitational Attractor
description: Interactive simulation demonstrating gravitational attraction between particles and a central attractor, with collision physics and path tracing.
image: /sims/gravitational-attractor/gravitational-attractor.png
og:image: /sims/gravitational-attractor/gravitational-attractor.png
quality_score: 95
---

# Gravitational Attractor

<iframe src="main.html" width="100%" height="600px"></iframe>

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/gravitational-attractor/main.html" width="100%" height="600px"></iframe>
```

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/dmccreary/sketches/zSe6aifWA){ .md-button .md-button--secondary }

## Description

This MicroSim demonstrates **gravitational attraction** between particles and a central attractor mass. The simulation visualizes Newton's Law of Universal Gravitation in an interactive environment.

### How It Works

- **Central Attractor**: A large pink mass at the center that attracts all particles
- **Particles**: 100 colorful particles with random initial positions and velocities
- **Force Arrows**: Green arrows show the gravitational force acting on each particle; yellow arrows show velocity
- **Path Tracing**: Each particle leaves a fading trail showing its orbital path
- **Collision Physics**: When particles collide, they merge into a larger particle with combined mass
- **Absorption**: Particles that reach the central attractor are absorbed, increasing its mass

### Interactions

- **Click anywhere** on the canvas to add a new particle at that location

### Physics Concepts Demonstrated

1. **Gravitational Force**: Force increases with mass and decreases with distance squared (F = G*m1*m2/r^2)
2. **Orbital Motion**: Particles can achieve stable orbits around the attractor
3. **Conservation of Momentum**: Particle collisions conserve momentum
4. **Mass Aggregation**: The central attractor grows as it absorbs particles

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Explain how gravitational force depends on mass and distance
2. Describe the conditions necessary for orbital motion
3. Predict how changing initial velocity affects a particle's trajectory
4. Analyze the relationship between kinetic energy and orbital stability

### Grade Level

High School Physics (Grades 10-12)

### Prerequisites

- Understanding of vectors (magnitude and direction)
- Basic knowledge of Newton's Laws of Motion
- Familiarity with the concept of force

### Duration

45-60 minutes

### Activities

#### Activity 1: Orbital Exploration (15 min)

1. Observe the initial particle behavior
2. Click to add particles with different positions relative to the attractor
3. Record observations about which particles achieve stable orbits vs. spiral inward

#### Activity 2: Force Analysis (15 min)

1. Pause and observe the green force arrows
2. Compare arrow lengths for particles at different distances
3. Discuss: Why are arrows longer for closer particles?

#### Activity 3: Collision Investigation (15 min)

1. Watch for particle collisions (particles merge when they touch)
2. Observe how the new particle's size and trajectory changes
3. Discuss conservation of momentum in the collision

### Discussion Questions

1. What happens to particles that start with very low velocity?
2. Why do some particles achieve stable orbits while others spiral in?
3. How does the central attractor's growth affect nearby particles?
4. What would happen if we added a second attractor?

### Assessment

- Students sketch predicted trajectories for particles at different starting positions
- Students explain the relationship between initial velocity and orbital radius
- Students compare this simulation to real planetary motion

## References

1. [Newton's Law of Universal Gravitation](https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation) - Wikipedia - Comprehensive overview of gravitational theory
2. [The Nature of Code: Chapter 2 - Forces](https://natureofcode.com/forces/) - Daniel Shiffman - 2024 - Explains implementing forces in p5.js simulations
3. [Orbital Mechanics](https://www.grc.nasa.gov/www/k-12/airplane/orbit.html) - NASA Glenn Research Center - Educational resource on orbital motion
4. [Original Simulation](https://vislupus.github.io/p5-simulations/gravitational_attraction.html) - Nikola Bozhinov (vislupus) - Source code inspiration
