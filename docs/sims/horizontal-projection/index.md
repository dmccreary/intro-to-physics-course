---
title: Horizontal Projection
description: Interactive simulation demonstrating that objects with different horizontal velocities but same initial height hit the ground simultaneously.
---

# Horizontal Projection

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run the Horizontal Projection MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim demonstrates a fundamental principle of projectile motion: horizontal and vertical motions are independent. Three projectiles with different horizontal speeds (but zero initial vertical velocity) are launched simultaneously from the same height. Despite traveling different horizontal distances, they all hit the ground at exactly the same time.

## Key Concepts

- **Independence of Motion**: Horizontal velocity has no effect on vertical motion
- **Time of Fall**: Depends only on initial height, not horizontal speed: $t = \sqrt{\frac{2h}{g}}$
- **Horizontal Range**: Faster projectiles travel farther: $R = v_x \cdot t$
- **Vertical Velocity at Impact**: Same for all projectiles: $v_y = gt$

## How to Use

1. Adjust the **platform height** and individual projectile speeds using the sliders
2. Click **Launch All** to release all three projectiles simultaneously
3. Observe that all three land at the same time
4. Toggle **Components** to see horizontal (constant) and vertical (increasing) velocity vectors
5. Use **Slow motion** for detailed observation

## Learning Objectives

After using this MicroSim, students should be able to:

1. Explain why horizontal speed doesn't affect time of fall
2. Calculate time of fall from height: $t = \sqrt{2h/g}$
3. Calculate horizontal range from speed and fall time: $R = v_x \cdot t$
4. Understand that vertical motion is accelerated while horizontal motion is constant
