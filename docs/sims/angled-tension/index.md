---
title: Angled Tension Components
description: Interactive visualization showing how the angle of an applied force affects its horizontal and vertical components.
---

# Angled Tension Components

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This simulation demonstrates how pulling at an angle affects motion. When you pull upward at an angle, part of your force lifts the object (reducing normal force and friction) while the rest accelerates it horizontally.

## Key Equations

- **Horizontal component**: $F_x = F \cos\theta$
- **Vertical component**: $F_y = F \sin\theta$
- **Normal force**: $N = mg - F_y$ (reduced by upward pull)
- **Kinetic friction**: $f_k = \mu_k N$
- **Acceleration**: $a = (F_x - f_k) / m$

## Key Insight

Pulling at an angle is a trade-off:
- Higher angles reduce friction (by reducing N)
- But also reduce the horizontal force component
- There's an optimal angle that maximizes acceleration!

## Controls

- **Force**: Magnitude of the applied force
- **Angle**: Angle above horizontal (0-90°)
- **Mass**: Mass of the object
- **μk**: Coefficient of kinetic friction
- **Show components**: Toggle component vector display
- **Animate motion**: Watch the box move based on calculated acceleration
