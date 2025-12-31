---
title: Fluid Dynamics
description: Interactive simulation demonstrating fluid flow around an obstacle with particle collisions, adjustable flow parameters, and real-time collision statistics.
image: /sims/fluid-dynamics/fluid-dynamics.png
og:image: /sims/fluid-dynamics/fluid-dynamics.png
quality_score: 95
---

# Fluid Dynamics

<iframe src="main.html" width="100%" height="600px"></iframe>

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/fluid-dynamics/main.html" width="100%" height="600px"></iframe>
```

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim demonstrates **fluid dynamics** by simulating particles flowing through a channel and interacting with an obstacle. The simulation visualizes key concepts in fluid mechanics including laminar flow, particle collisions, and flow around objects.

### How It Works

- **Particle Flow**: Particles are continuously generated on the left side and flow toward the right
- **Central Obstacle**: A circular target in the flow path causes particles to deflect and collide
- **Collision Detection**: Uses QuadTree spatial partitioning for efficient particle-particle collision detection
- **Wall Boundaries**: Horizontal walls constrain the flow channel, causing wall collisions
- **Particle Interactions**: Particles attract and repel each other based on distance

### Controls

The simulation includes six adjustable sliders:

| Slider | Parameter | Range | Default | Description |
|--------|-----------|-------|---------|-------------|
| 1 | Acceleration | 0-5 | 2.6 | Flow acceleration magnitude |
| 2 | Velocity | 0-10 | 3.6 | Initial particle velocity |
| 3 | Mass | 0.01-5 | 1.0 | Particle mass |
| 4 | Gravity | 0-10 | 5 | Inter-particle attraction strength |
| 5 | Upper Bound | 1000-10000 | 5000 | Maximum distance constraint |
| 6 | Lower Bound | 0-1000 | 50 | Minimum distance constraint |

### Real-Time Statistics

The simulation displays:

- Current frame rate (fps)
- Frame count
- Total particle count
- Collision counts: particle/target, particle/particle, particle/wall

### Physics Concepts Demonstrated

1. **Laminar vs Turbulent Flow**: Observe how flow behavior changes with different parameters
2. **Conservation of Momentum**: Particle collisions conserve momentum
3. **Flow Around Obstacles**: Particles deflect around the central target
4. **Viscosity Effects**: Particle interactions simulate fluid viscosity

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Explain how fluid particles interact with obstacles in a flow
2. Describe the difference between laminar and turbulent flow
3. Predict how changing flow parameters affects particle behavior
4. Analyze collision statistics to understand flow dynamics

### Grade Level

High School Physics (Grades 10-12)

### Prerequisites

- Understanding of vectors and velocity
- Basic knowledge of Newton's Laws of Motion
- Familiarity with momentum and collisions

### Duration

45-60 minutes

### Activities

#### Activity 1: Flow Observation (15 min)

1. Set all sliders to their default positions
2. Observe the steady-state flow pattern
3. Count approximately how many particles are in the channel at equilibrium
4. Record the collision rates for each type

#### Activity 2: Parameter Exploration (20 min)

1. Increase acceleration to maximum - observe changes in flow pattern
2. Decrease velocity to minimum - what happens to the flow?
3. Increase particle mass - how does this affect collisions?
4. Adjust gravity slider - observe attraction/repulsion effects

#### Activity 3: Obstacle Interaction Analysis (15 min)

1. Focus on the region around the central obstacle
2. Sketch the flow pattern you observe
3. Identify regions of high and low particle density
4. Compare to real fluid dynamics (wake regions, stagnation points)

### Discussion Questions

1. What happens to the collision rate as particle density increases?
2. How does the flow pattern around the obstacle compare to water around a rock in a stream?
3. Why do some particles get deflected more than others?
4. What real-world applications use these fluid dynamics principles?

### Assessment

- Students diagram the flow field around the obstacle
- Students predict collision rates for different parameter settings
- Students compare simulation behavior to real fluid phenomena

## References

1. [Fluid Dynamics](https://en.wikipedia.org/wiki/Fluid_dynamics) - Wikipedia - Comprehensive overview of fluid mechanics principles
2. [QuadTree Algorithm](https://en.wikipedia.org/wiki/Quadtree) - Wikipedia - Spatial partitioning data structure used for efficient collision detection
3. [Original Simulation](https://vislupus.github.io/p5-simulations/fluid-dynamics.html) - Nikola Bozhinov (vislupus) - Source code inspiration
4. [The Nature of Code: Chapter 6 - Autonomous Agents](https://natureofcode.com/autonomous-agents/) - Daniel Shiffman - 2024 - Explains particle systems and flocking behavior
