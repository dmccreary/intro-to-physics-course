---
quality_score: 65
title: Angled Projectile Explorer
description: Interactive simulation exploring how launch angle and speed affect projectile trajectory, range, and maximum height.
---

# Angled Projectile Motion Explorer

<iframe src="main.html" height="582px" width="100%" scrolling="no"></iframe>

[Run the Angled Projectile MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim allows you to explore the full range of projectile motion by adjusting launch angle, initial speed, and launch height. Watch how these parameters affect the trajectory, maximum height reached, horizontal range, and flight time. The simulation includes special features like complementary angle comparison and trajectory overlay.

## Key Concepts

- **Initial Velocity Components:**
    - $v_{0x} = v_0 \cos\theta$ (horizontal, constant)
    - $v_{0y} = v_0 \sin\theta$ (vertical, changes with time)
- **Maximum Height:** $y_{max} = y_0 + \frac{v_{0y}^2}{2g}$
- **Range (from ground level):** $R = \frac{v_0^2 \sin(2\theta)}{g}$
- **45-degree rule:** Maximum range occurs at 45 degrees (on level ground)
- **Complementary angles:** 30 and 60 degrees produce the same range

## How to Use

1. Adjust **Angle** (5-85 degrees) to change launch direction
2. Adjust **Speed** (5-40 m/s) to change initial velocity
3. Adjust **Height** (0-20 m) to launch from an elevated platform
4. Click **Launch** to fire the projectile
5. Enable **Complementary Angle** to simultaneously launch at the complementary angle (90 - angle)
6. Enable **Keep Trails** to overlay multiple trajectories for comparison
7. Enable **Velocity Components** to see horizontal and vertical velocity vectors

## Learning Objectives

After using this MicroSim, students should be able to:

1. Decompose initial velocity into horizontal and vertical components
2. Explain why 45 degrees gives maximum range on level ground
3. Understand that complementary angles produce equal ranges
4. Calculate maximum height from initial vertical velocity
5. Predict how changing angle affects height vs. range tradeoff
