---
title: Collision Types Comparison
description: Interactive simulation comparing elastic, inelastic, and perfectly inelastic collisions demonstrating conservation of momentum and kinetic energy principles.
image: /sims/collision-types/collision-types.png
og:image: /sims/collision-types/collision-types.png
quality_score: 100
---

# Collision Types Comparison

<iframe src="main.html" height="520px" width="100%" scrolling="no"></iframe>

[Run the Collision Types MicroSim in Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit in p5.js Editor](https://editor.p5js.org/dmccreary/sketches/dcbcCTmX2){ .md-button }

## Copy This MicroSim to Your Website

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/collision-types/main.html" width="100%" height="520px"></iframe>
```

## About This MicroSim

This interactive simulation compares the three fundamental types of collisions in physics: elastic, inelastic, and perfectly inelastic. Students can observe how momentum and kinetic energy behave differently in each collision type through smooth, physics-based animations.

### How to Use

1. **Select Collision Type**: Click the tabs at the top to switch between Elastic, Inelastic, and Perfectly Inelastic collisions
2. **Play Animation**: Click the Play button to watch the collision unfold continuously from start to finish
3. **Step Through Phases**: Use the Step button to manually advance through Before → During → After phases
4. **Reset**: Click Reset to return to the initial state

### What to Observe

- **Velocity arrows** show the speed and direction of each ball
- **Kinetic Energy bar** shows how energy changes (or doesn't) during the collision
- **Momentum bar** demonstrates that momentum is always conserved
- **Phase indicator** dots show your progress through the simulation

## Collision Types Summary

| Type | Momentum Conserved? | KE Conserved? | Objects After |
|------|---------------------|---------------|---------------|
| **Elastic** | Yes | Yes | Separate, no deformation |
| **Inelastic** | Yes | No | Separate, some deformation |
| **Perfectly Inelastic** | Yes | No | Stick together |

## Example Scenario

All three collision types demonstrate:

- **Ball 1 (Blue)**: 3 kg, initially moving at 4 m/s to the right
- **Ball 2 (Red)**: 1 kg, initially at rest
- **Initial momentum**: p = 3 kg × 4 m/s = 12 kg·m/s
- **Initial kinetic energy**: KE = ½(3)(4²) = 24 J

## Key Physics Concepts

1. **Momentum is ALWAYS conserved** in all collision types (assuming no external forces)
2. **Only elastic collisions conserve kinetic energy** - the balls bounce apart with no energy loss
3. **Perfectly inelastic collisions have maximum KE loss** - objects stick together
4. **"Lost" kinetic energy becomes heat, sound, or deformation** - energy is never destroyed, just transformed

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. **Define** the three types of collisions (elastic, inelastic, perfectly inelastic)
2. **Distinguish** between conservation of momentum and conservation of kinetic energy
3. **Predict** final velocities using conservation principles
4. **Calculate** kinetic energy before and after collisions
5. **Explain** where "lost" kinetic energy goes in inelastic collisions

### Target Audience

- High school physics students (grades 10-12)
- AP Physics 1 students
- Introductory college physics students

### Prerequisites

- Understanding of velocity and mass
- Basic knowledge of kinetic energy (KE = ½mv²)
- Understanding of momentum (p = mv)
- Algebra skills for solving equations

### Suggested Activities

#### Activity 1: Prediction Exercise (10 minutes)

Before using the simulation:

1. Present the scenario: 3 kg ball moving at 4 m/s hits stationary 1 kg ball
2. Ask students to predict outcomes for each collision type
3. Have students calculate initial momentum and KE

#### Activity 2: Simulation Exploration (15 minutes)

1. Run each collision type and observe differences
2. Record final velocities from the velocity arrows
3. Calculate final momentum for each type (should all equal 12 kg·m/s)
4. Calculate final KE for each type and compare

#### Activity 3: Data Analysis (10 minutes)

Complete the following table:

| Collision Type | v₁ final | v₂ final | p final | KE final | KE lost |
|----------------|----------|----------|---------|----------|---------|
| Elastic        |          |          |         |          |         |
| Inelastic      |          |          |         |          |         |
| Perfectly Inelastic |     |          |         |          |         |

#### Activity 4: Discussion Questions (10 minutes)

1. Why is momentum conserved in all three types but KE is not?
2. Where does the "lost" kinetic energy go in inelastic collisions?
3. Give real-world examples of each collision type
4. Why do car bumpers crumple in accidents? (Connection to perfectly inelastic collisions)

### Assessment Questions

1. A 2 kg ball moving at 6 m/s collides elastically with a stationary 2 kg ball. What are the final velocities?

2. Two football players (80 kg each) collide and grab onto each other. If one was moving at 5 m/s and the other at rest, what is their combined velocity after collision?

3. Explain why a "perfectly elastic" collision is an idealization that rarely occurs in real life.

4. Calculate the percentage of kinetic energy lost in the perfectly inelastic collision shown in the simulation.

### Extensions

- **Advanced**: Derive the equations for final velocities in elastic collisions
- **Lab Connection**: Perform air track experiments to measure collision types
- **Real World**: Research crumple zones in automotive safety design

## References

1. [Conservation of Momentum](https://www.physicsclassroom.com/class/momentum/Lesson-2/Momentum-Conservation-Principle) - The Physics Classroom - Comprehensive explanation of momentum conservation with examples and practice problems.

2. [Types of Collisions](https://openstax.org/books/college-physics/pages/8-4-elastic-collisions-in-one-dimension) - OpenStax College Physics - Detailed mathematical treatment of elastic and inelastic collisions.

3. [Khan Academy: Elastic and Inelastic Collisions](https://www.khanacademy.org/science/physics/linear-momentum/elastic-and-inelastic-collisions/v/elastic-and-inelastic-collisions) - Video explanations with worked examples.

4. [HyperPhysics: Collisions](http://hyperphysics.phy-astr.gsu.edu/hbase/colcon.html) - Georgia State University - Interactive concept maps for collision physics.

5. [PHET Collision Lab](https://phet.colorado.edu/en/simulations/collision-lab) - University of Colorado Boulder - Related interactive simulation for exploring collisions.
