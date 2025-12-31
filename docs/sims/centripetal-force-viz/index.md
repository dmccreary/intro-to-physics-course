---
title: Centripetal Force Visualization
description: Interactive visualization showing the relationship between velocity, centripetal acceleration, and centripetal force in circular motion.
image: /sims/centripetal-force-viz/centripetal-force-viz.png
og:image: /sims/centripetal-force-viz/centripetal-force-viz.png
quality_score: 100
---

# Centripetal Force Visualization

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run Centripetal Force Visualization MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the Centripetal Force Visualization MicroSim Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/7-jl5tog0)

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/centripetal-force-viz/main.html" width="100%" height="600px"></iframe>
```

## About This MicroSim

This simulation visualizes the key vectors in uniform circular motion: velocity (tangent to the path), centripetal acceleration (toward center), and centripetal force (toward center).

## Key Equations

- **Centripetal acceleration**: $a_c = \frac{v^2}{r} = \omega^2 r$
- **Centripetal force**: $F_c = ma_c = \frac{mv^2}{r}$
- **Angular velocity**: $\omega = \frac{v}{r}$

## Key Insights

- Velocity is always tangent to the circular path
- Acceleration and force always point toward the center
- Velocity and acceleration are perpendicular
- Even at constant speed, direction change means acceleration
- "Centripetal" means "center-seeking"

## Controls

- **Speed**: Linear speed of the object
- **Radius**: Radius of the circular path
- **Mass**: Mass of the object
- **Show path positions**: Display ghost positions showing how velocity direction changes around the circle

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Explain why an object moving in a circle at constant speed is accelerating
2. Describe the direction of velocity, acceleration, and force vectors in circular motion
3. Calculate centripetal acceleration and force using the formulas $a_c = v^2/r$ and $F_c = mv^2/r$
4. Relate angular velocity to linear velocity and radius

### Target Audience

High school physics students (grades 10-12) studying dynamics and circular motion

### Prerequisites

- Understanding of vectors and vector addition
- Newton's Second Law ($F = ma$)
- Basic trigonometry (sine, cosine)

### Activities

1. **Exploration (10 min)**: Students manipulate sliders to observe how changing speed, radius, and mass affects the vectors
2. **Prediction (5 min)**: Before changing a slider, predict what will happen to acceleration and force
3. **Calculation Check (10 min)**: Use the displayed values to verify the equations match the simulation
4. **Discussion (10 min)**: Why does doubling speed quadruple the acceleration? What real-world examples demonstrate centripetal force?

### Assessment

- Calculate centripetal force for a car turning a corner at given speed and radius
- Explain why velocity and acceleration are perpendicular in uniform circular motion
- Identify the source of centripetal force in various scenarios (friction, tension, gravity)

## References

1. [Circular Motion - HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/circ.html) - Georgia State University - Comprehensive coverage of circular motion concepts with interactive diagrams
2. [Khan Academy: Centripetal Acceleration](https://www.khanacademy.org/science/physics/centripetal-force-and-gravitation) - Free video lessons on centripetal force and circular motion
3. [The Physics Classroom: Circular Motion](https://www.physicsclassroom.com/class/circles) - Detailed explanations with practice problems for circular motion concepts
