---
title: Relative Velocity Solver
description: Interactive tool for visualizing and solving relative velocity problems with two moving objects in 2D.
---

# Relative Velocity Problem Solver

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run the Relative Velocity Solver Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim helps you visualize and solve relative velocity problems involving two moving objects. Set the speed and direction of objects A and B, then see how to calculate the velocity of A relative to B using vector subtraction.

## Key Concepts

- **Relative Velocity Formula**: $\vec{v}_{AB} = \vec{v}_A - \vec{v}_B$
- **Component Method**:
    - $v_{ABx} = v_{Ax} - v_{Bx}$
    - $v_{ABy} = v_{Ay} - v_{By}$
- **Magnitude**: $|\vec{v}_{AB}| = \sqrt{v_{ABx}^2 + v_{ABy}^2}$
- **Direction**: $\theta = \tan^{-1}(v_{ABy}/v_{ABx})$

## How to Use

1. Select a **Preset** scenario or keep Custom
2. Adjust **A speed** and **A angle** for object A's velocity
3. Adjust **B speed** and **B angle** for object B's velocity
4. View the calculated relative velocity (purple dashed vector)
5. Click **Animate** to see both objects move
6. Enable **View from B** to see the world from B's reference frame
7. Enable **Components** to see x and y components

## Preset Scenarios

- **Custom**: Set your own values
- **Chase**: Both objects moving in same direction
- **Head-on**: Objects approaching each other
- **Perpendicular**: Objects moving at right angles

## Learning Objectives

After using this MicroSim, students should be able to:

1. Calculate relative velocity using vector subtraction
2. Break velocities into components and subtract them
3. Find magnitude and direction of the relative velocity vector
4. Understand how motion appears from different reference frames
5. Apply relative velocity to real-world scenarios (boats, planes, etc.)
