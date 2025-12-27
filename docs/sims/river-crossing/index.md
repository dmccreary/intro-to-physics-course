---
title: River Crossing
description: Interactive simulation demonstrating relative velocity through a river crossing scenario with current and swimmer velocities.
---

# River Crossing Relative Velocity

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run the River Crossing MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim demonstrates relative velocity through a classic physics scenario: crossing a river with a current. A swimmer aims to reach a point directly across the river, but the current carries them downstream. The simulation shows how vector addition determines the actual path.

## Key Concepts

- **Relative Velocity**: The swimmer's velocity relative to water combines with the water's velocity relative to ground
- **Vector Addition**: $\vec{v}_{result} = \vec{v}_{swimmer} + \vec{v}_{current}$
- **Crossing Time**: Depends only on swimmer speed and river width: $t = \frac{d}{v_{swim}}$
- **Downstream Drift**: $x_{drift} = v_{current} \times t$
- **Aiming Upstream**: To travel straight across, aim at angle $\theta = \arcsin(v_{current}/v_{swim})$

## How to Use

1. Adjust **Swim speed** (swimmer's speed relative to water)
2. Adjust **Current** speed (river flow rate)
3. Click **Swim** to start the crossing
4. Observe the three velocity vectors:
    - Blue: Swimmer velocity (relative to water)
    - Red: Current velocity
    - Purple: Resultant velocity (actual motion)
5. Enable **Aim Upstream** to see how the swimmer can compensate for current

## Learning Objectives

After using this MicroSim, students should be able to:

1. Apply vector addition to find resultant velocity
2. Calculate downstream drift from current speed and crossing time
3. Determine the angle needed to travel straight across
4. Explain why crossing time depends only on the perpendicular velocity component
