---
title: Multistage Rocket Efficiency Chart
description: Interactive chart comparing delta-v achieved by single-stage vs multi-stage rockets using the Tsiolkovsky rocket equation
---

# Multistage Rocket Efficiency Chart

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This Chart

This interactive visualization demonstrates why rockets use multiple stages to reach orbit. Using the Tsiolkovsky rocket equation, it calculates the delta-v (change in velocity) achievable with different staging configurations.

## The Tsiolkovsky Rocket Equation

$$\Delta v = v_e \times \ln\left(\frac{m_{initial}}{m_{final}}\right)$$

Where:
- $\Delta v$ = change in velocity (m/s)
- $v_e$ = exhaust velocity (m/s)
- $m_{initial}$ = initial mass (with fuel)
- $m_{final}$ = final mass (without fuel)

## Why Staging Matters

### The Problem with Single-Stage Rockets

A single-stage rocket must carry:
- All the fuel for the entire journey
- Empty fuel tanks (dead weight after fuel is used)
- Engines sized for liftoff (oversized for upper atmosphere)

### The Staging Solution

By dropping empty stages:
1. **Less dead weight** = better mass ratio
2. **Each stage optimized** for its flight phase
3. **Logarithmic advantage** compounds with each stage

## Visual Elements

- **Bar Chart**: Delta-v comparison for 1-5 stages
- **Rocket Diagram**: Visual representation of current staging
- **Reference Lines**: LEO (7.8 km/s) and GTO (10.5 km/s) requirements
- **Improvement Percentage**: Gain over single-stage configuration

## Controls

- **Stage Slider**: Select 1-5 stages to compare performance

## Key Observations

1. **Dramatic improvement** from 1 to 2 stages
2. **Diminishing returns** after 3-4 stages
3. **Complexity cost** limits practical staging
4. **Real rockets** typically use 2-3 stages

## Reference Velocities

| Destination | Required Δv |
|-------------|-------------|
| Low Earth Orbit (LEO) | ~7.8 km/s |
| Geostationary Transfer (GTO) | ~10.5 km/s |
| Moon | ~12 km/s |
| Mars | ~15+ km/s |

## Real-World Examples

- **Saturn V**: 3 stages (Moon missions)
- **Falcon 9**: 2 stages (LEO/GTO)
- **Electron**: 2 stages (small satellites)
- **SLS**: 2 stages + boosters (deep space)
