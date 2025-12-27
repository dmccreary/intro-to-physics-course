---
title: Banked Curve Speed Analysis
description: Interactive exploration of how vehicle speed relative to ideal speed determines friction requirements on banked curves.
---

# Banked Curve Speed Analysis

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This simulation explores how the relationship between actual speed and ideal speed determines whether friction is needed, and in which direction it must act. The graph shows friction requirement as a function of speed, making the ideal speed point clearly visible.

## Key Equations

- **Ideal speed** (no friction needed): $v_{ideal} = \sqrt{rg \tan\theta}$
- **Maximum speed** (with friction): $v_{max} = \sqrt{\frac{rg(\sin\theta + \mu\cos\theta)}{\cos\theta - \mu\sin\theta}}$
- **Required friction coefficient**: $\mu_{required} = \frac{|f|}{N}$

## Speed Regions

| Speed | Friction Direction | Status |
|-------|-------------------|--------|
| v = v_ideal | No friction needed | Ideal |
| v > v_ideal | Down the slope | Prevents sliding up |
| v < v_ideal | Up the slope | Prevents sliding down |

## Controls

- **Angle**: Banking angle of the curve
- **Radius**: Curve radius
- **Speed**: Vehicle speed
- **μs (max)**: Maximum available coefficient of static friction
