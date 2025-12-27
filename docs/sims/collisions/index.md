---
title: Elastic Collisions
description: Interactive simulation demonstrating elastic collisions between particles of varying masses, showing momentum and energy conservation with velocity vectors and collision visualization.
image: /sims/collisions/collisions.png
og:image: /sims/collisions/collisions.png
quality_score: 90
---

# Elastic Collisions

<iframe src="main.html" width="100%" height="550px" scrolling="no"></iframe>

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/collisions/main.html" width="100%" height="560px"></iframe>
```

[Run the Elastic Collisions MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim demonstrates **elastic collisions** between particles of varying masses. The simulation visualizes key physics concepts including conservation of momentum, conservation of kinetic energy, and how mass affects collision outcomes.

### How It Works

- **Particles**: Circles with varying masses (size proportional to mass)
- **Velocity Vectors**: Yellow arrows show each particle's velocity direction and magnitude
- **Collision Detection**: Red lines connect colliding particles
- **Collision Points**: Blue dots mark the exact point of collision
- **Wall Bounces**: Particles bounce elastically off all boundaries

### Visual Indicators

| Element | Color | Meaning |
|---------|-------|---------|
| Particles | Gray circles | Mass shown by size |
| Velocity vectors | Yellow arrows | Direction and speed |
| Collision line | Red | Connects colliding particles |
| Collision point | Blue dot | Contact point between particles |

### Controls

| Control | Range | Default | Description |
|---------|-------|---------|-------------|
| Start/Pause | - | Paused | Toggle simulation running |
| Particles | 5-100 | 30 | Number of particles (resets simulation) |
| Velocity | 1-15 | 5 | Maximum initial velocity |

### Physics Concepts Demonstrated

1. **Conservation of Momentum**: In elastic collisions, total momentum before equals total momentum after:

   $$m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2'$$

2. **Conservation of Kinetic Energy**: In perfectly elastic collisions, kinetic energy is conserved:

   $$\frac{1}{2}m_1 v_1^2 + \frac{1}{2}m_2 v_2^2 = \frac{1}{2}m_1 v_1'^2 + \frac{1}{2}m_2 v_2'^2$$

3. **Mass and Velocity Exchange**: When particles of different masses collide:
   - Lighter particles experience larger velocity changes
   - Heavier particles experience smaller velocity changes
   - Equal mass particles can exchange velocities completely

4. **Collision Geometry**: The collision point lies on the line connecting the centers, weighted by the radii of the particles.

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Explain conservation of momentum in two-dimensional collisions
2. Describe how mass affects velocity changes in elastic collisions
3. Predict collision outcomes based on particle masses and velocities
4. Identify the relationship between particle size and mass in the simulation

### Grade Level

High School Physics (Grades 10-12)

### Prerequisites

- Understanding of vectors and velocity
- Basic knowledge of Newton's Laws of Motion
- Familiarity with momentum (p = mv)
- Basic understanding of kinetic energy

### Duration

45-60 minutes

### Activities

#### Activity 1: Observation (10 min)

1. Start the simulation with default settings (30 particles)
2. Observe collisions between particles of different sizes
3. Note: What happens when a large particle hits a small one?
4. Note: What happens when equal-sized particles collide?

#### Activity 2: Mass Effects (15 min)

1. Reduce particles to 10 for easier observation
2. Find a collision between a very large and very small particle
3. Sketch the velocity vectors before and after collision
4. Which particle's velocity changed more? Why?

#### Activity 3: Velocity Investigation (15 min)

1. Set velocity to minimum (1) and observe collision behavior
2. Increase velocity to maximum (15) and compare
3. Does velocity affect the physics of collisions?
4. What changes with higher velocities?

#### Activity 4: Momentum Conservation Check (15 min)

1. Pause simulation and identify two particles about to collide
2. Estimate their relative masses from their sizes
3. Predict the direction each will move after collision
4. Resume and check your prediction

### Discussion Questions

1. Why do smaller particles seem to "bounce away" faster than larger ones?
2. If momentum is conserved, why don't all particles eventually stop moving?
3. How would the simulation differ if collisions were inelastic?
4. What real-world situations demonstrate these collision principles?

### Assessment

- Students diagram momentum vectors before and after a collision
- Students explain why kinetic energy is conserved in elastic collisions
- Students predict outcomes of collisions between particles of specified masses

## References

1. [Elastic Collision](https://en.wikipedia.org/wiki/Elastic_collision) - Wikipedia - Detailed explanation of elastic collision physics
2. [Conservation of Momentum](https://www.physicsclassroom.com/class/momentum/Lesson-2/Momentum-Conservation-Principle) - The Physics Classroom - Educational resource on momentum conservation
3. [Circle-Circle Collision Response](https://ericleong.me/research/circle-circle/) - Eric Leong - Mathematical derivation of 2D elastic collision physics
4. [The Nature of Code](https://natureofcode.com/) - Daniel Shiffman - 2024 - Inspiration for physics simulations in p5.js
5. [Original Simulation](https://vislupus.github.io/p5-simulations/collision.html) - Nikola Bozhinov (vislupus) - Source code inspiration
