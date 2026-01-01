---
title: Distance vs Displacement
description: An interactive MicroSim that helps students understand the difference between distance (total path length) and displacement (straight-line change in position).
image: /sims/distance-displacement/distance-displacement.png
og:image: /sims/distance-displacement/distance-displacement.png
quality_score: 95
---

# Distance vs Displacement

<iframe src="main.html" height="612px" width="100%" scrolling="no"></iframe>

[Run the Distance vs Displacement MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit Distance vs Displacement in the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/Rr6vCm33i){ .md-button .md-button--secondary }

Copy this iframe to embed this MicroSim in your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/distance-displacement/main.html" width="100%" height="650px"></iframe>
```

## Description

This interactive MicroSim helps students understand the fundamental difference between **distance** and **displacement** in physics:

- **Distance** is a scalar quantity representing the total length of the path traveled, regardless of direction
- **Displacement** is a vector quantity representing the straight-line distance and direction from the starting point to the ending point

Students can draw any path they like by clicking and dragging on the canvas. The simulation tracks both the total distance traveled (shown by the blue path) and the displacement (shown by the red arrow from start to current position).

## Learning Objectives

After using this MicroSim, students should be able to:

1. Define distance and displacement and explain how they differ
2. Recognize that distance is always greater than or equal to displacement magnitude
3. Understand that displacement can be zero even when distance is non-zero (e.g., returning to the starting point)
4. Calculate displacement as a vector with both magnitude and direction

## How to Use

1. **Click and drag** anywhere in the drawing area to create a path
2. Watch the **Distance Traveled** counter increase as you draw
3. Observe the **Displacement** value showing the straight-line distance from start
4. Toggle the **Show Displacement Vector** checkbox to see/hide the red arrow
5. Click **Complete Journey** when finished to see final statistics
6. Click **Reset** to start over with a new path

## Key Observations

- **Try making a circle**: Notice how distance increases continuously, but displacement returns to near zero when you complete the circle
- **Try a zigzag path**: See how the distance can be much larger than the displacement
- **Try a straight line**: This is the only case where distance equals displacement magnitude

## Lesson Plan

### Grade Level
High School Physics (Grades 9-12)

### Duration
15-20 minutes

### Activities

1. **Exploration (5 min)**: Let students freely explore drawing different paths
2. **Guided Practice (5 min)**: Ask students to draw specific paths:
   - A path where distance = displacement
   - A path where distance >> displacement
   - A path with zero displacement but non-zero distance
3. **Discussion (5 min)**: Compare observations and connect to real-world examples
4. **Assessment (5 min)**: Given a described journey, predict the relationship between distance and displacement

### Real-World Connections

- Walking around a track vs. running across a field
- Road trip distance vs. "as the crow flies" distance
- GPS navigation: total route distance vs. straight-line distance to destination

## References

1. [Distance and Displacement](https://www.physicsclassroom.com/class/1DKin/Lesson-1/Distance-and-Displacement) - The Physics Classroom - Comprehensive tutorial on the difference between distance and displacement with examples
2. [Scalars and Vectors](https://www.khanacademy.org/science/physics/one-dimensional-motion/displacement-velocity-time/v/introduction-to-vectors-and-scalars) - Khan Academy - Video introduction to scalar and vector quantities
3. [p5.js Reference](https://p5js.org/reference/) - p5.js Documentation - JavaScript library used to create this interactive simulation
