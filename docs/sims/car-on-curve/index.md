---
title: Car on Curve MicroSim
description: Interactive simulation showing centripetal force requirements for a car navigating a curve.
image: /sims/car-on-curve/car-on-curve.png
og:image: /sims/car-on-curve/car-on-curve.png
quality_score: 95
---

# Car on Curve MicroSim

<iframe src="main.html" height="637px" width="100%" scrolling="no"></iframe>

[Run Car on Curve MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit Car on Curve MicroSim Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/nMEw2z9Ym)

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/car-on-curve/main.html" width="100%" height="650px"></iframe>
```

## About This MicroSim

This simulation demonstrates the physics of a car navigating a curve. Friction between the tires and road provides the centripetal force needed to keep the car moving in a circle. If the required centripetal force exceeds the maximum static friction, the car skids.

## Key Equations

- **Centripetal acceleration**: ac = v²/r
- **Required centripetal force**: Fc = mv²/r
- **Maximum friction**: fs_max = μs × mg
- **Maximum safe speed**: v_max = √(μs × g × r)

## Key Insight

Mass cancels in the maximum speed equation, so all vehicles have the same maximum safe speed on a given curve!

## Lesson Plan

### Learning Objectives

After completing this lesson, students will be able to:

1. Explain why centripetal force is required for circular motion
2. Calculate the centripetal force needed for a given speed and radius
3. Determine the maximum safe speed for a car on a curve given the coefficient of friction
4. Predict whether a car will skid based on speed, radius, and friction conditions

### Target Audience

High school physics students (grades 10-12) studying dynamics and circular motion.

### Prerequisites

- Understanding of Newton's laws of motion
- Knowledge of friction (static vs. kinetic)
- Basic algebra and equation manipulation

### Activities

1. **Explore Mode** (5 min): Let students freely adjust sliders to observe when the car skids
2. **Prediction Exercise** (10 min): Given specific values, have students calculate max safe speed before checking with the simulation
3. **Real-World Connection** (5 min): Discuss why speed limits are lower on curves and how road conditions (rain, ice) affect safe driving speeds
4. **Design Challenge** (10 min): What curve radius would be needed for a highway with 70 mph speed limit and dry pavement?

### Assessment

- Can students explain why mass doesn't affect maximum safe speed?
- Can students correctly identify which variable changes will cause skidding?
- Can students apply the equations to solve for unknown values?

## References

1. [Centripetal Force - Khan Academy](https://www.khanacademy.org/science/physics/centripetal-force-and-gravitation) - Comprehensive video lessons on circular motion and centripetal force
2. [Circular Motion - Physics Classroom](https://www.physicsclassroom.com/class/circles) - Interactive lessons with practice problems on uniform circular motion
3. [Friction and Circular Motion - HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/frict2.html) - Detailed explanation of friction providing centripetal force for vehicles on curves
