---
title: Banked Curve Force Analysis
description: Interactive force analysis diagram for a vehicle on a banked curve showing how the normal force provides centripetal force.
---

# Banked Curve Force Analysis

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This simulation shows force decomposition on a banked curve. The key insight is that tilting the road surface causes the normal force to have a horizontal component pointing toward the center of the curve, providing centripetal force without relying entirely on friction.

## Key Equations

- **Vertical equilibrium**: $N \cos\theta = mg$
- **Horizontal (centripetal)**: $N \sin\theta + f = \frac{mv^2}{r}$
- **Ideal speed** (no friction): $v_{ideal} = \sqrt{rg \tan\theta}$

## Key Insights

- At ideal speed, the horizontal component of N exactly provides the needed centripetal force
- Above ideal speed: friction must point down the slope to prevent sliding up
- Below ideal speed: friction must point up the slope to prevent sliding down
- Banking reduces dependence on friction for safe curve navigation

## Controls

- **Bank angle**: Angle of the banked surface
- **Radius**: Radius of the curve
- **Speed**: Vehicle speed
- **Show N decomposition**: Display the horizontal and vertical components of the normal force
