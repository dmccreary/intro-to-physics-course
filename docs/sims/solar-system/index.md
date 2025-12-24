---
title: Solar System
description: Interactive simulation of the inner solar system demonstrating Newtonian gravity, orbital mechanics, and Kepler's laws with real astronomical data for the Sun, Mercury, Venus, Earth, and Mars.
image: /sims/solar-system/solar-system.png
og:image: /sims/solar-system/solar-system.png
quality_score: 90
---

# Solar System

<iframe src="main.html" width="100%" height="650px"></iframe>

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/solar-system/main.html" width="100%" height="650px"></iframe>
```

[Run Solar System MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }
[Edit the Solar System MicroSim Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/k9XP-Pq_p)
## Description

This MicroSim demonstrates **orbital mechanics** by simulating the inner solar system using real astronomical data from NASA. The simulation calculates gravitational forces between celestial bodies using Newton's Law of Universal Gravitation and displays orbital parameters in real-time.

### Celestial Bodies

| Planet | Mass (kg) | Orbital Velocity (km/s) | Orbital Period (days) |
|--------|-----------|------------------------|----------------------|
| Sun | 1.989 × 10³⁰ | — | — |
| Mercury | 3.30 × 10²³ | 38.86 | 88 |
| Venus | 4.87 × 10²⁴ | 34.79 | 225 |
| Earth | 5.97 × 10²⁴ | 29.29 | 366 |
| Mars | 6.39 × 10²³ | 21.97 | 687 |

### Real-Time Statistics

For each planet, the simulation displays:

- **Distance to Sun**: Current distance in Astronomical Units (AU)
- **Perihelion**: Closest approach to the Sun
- **Aphelion**: Farthest distance from the Sun
- **Orbital Velocity**: Current speed in km/s
- **Max/Min Velocity**: Fastest and slowest orbital speeds
- **Eccentricity**: Calculated from velocity ratio (how elliptical the orbit is)

### Physics Concepts Demonstrated

1. **Newton's Law of Universal Gravitation**: F = G(m₁m₂)/r²
2. **Kepler's Laws of Planetary Motion**:
   - Planets orbit in ellipses with the Sun at one focus
   - Equal areas swept in equal times
   - T² ∝ a³ (period squared proportional to semi-major axis cubed)
3. **Conservation of Angular Momentum**: Planets move faster at perihelion, slower at aphelion
4. **Orbital Mechanics**: Relationship between velocity and orbital distance

### Simulation Parameters

- **Gravitational Constant (G)**: 6.67430 × 10⁻¹¹ N⋅m²/kg²
- **Astronomical Unit (AU)**: 149.598 million km
- **Time Step**: 1 day per frame
- **Scale**: 200 pixels per AU

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Explain how gravitational force depends on mass and distance
2. Describe the relationship between orbital velocity and distance from the Sun
3. Calculate orbital eccentricity from velocity data
4. Compare orbital parameters of the inner planets

### Grade Level

High School Physics (Grades 10-12)

### Prerequisites

- Understanding of Newton's Laws of Motion
- Basic knowledge of gravitational force
- Familiarity with vectors and velocity
- Understanding of ellipses and conic sections

### Duration

45-60 minutes

### Activities

#### Activity 1: Orbital Observation (15 min)

1. Watch Mercury complete several orbits (fastest planet)
2. Compare Mercury's orbital speed to Mars (slowest)
3. Record the perihelion and aphelion for each planet
4. Calculate the difference between perihelion and aphelion

#### Activity 2: Kepler's Second Law (15 min)

1. Observe how each planet's velocity changes during its orbit
2. Note where planets move fastest (perihelion) and slowest (aphelion)
3. Explain why this happens using conservation of angular momentum
4. Compare eccentricity values—which planet has the most elliptical orbit?

#### Activity 3: Gravitational Analysis (15 min)

1. Compare the gravitational force on Mercury vs Mars (different distances)
2. Calculate the expected orbital velocity ratio using v ∝ 1/√r
3. Verify the simulation matches theoretical predictions
4. Discuss why inner planets orbit faster than outer planets

### Discussion Questions

1. Why does Mercury orbit the Sun so much faster than Mars?
2. What would happen if Earth's orbital velocity suddenly decreased?
3. How does the Sun's mass affect the orbital periods of planets?
4. Why are the orbits slightly elliptical rather than perfectly circular?

### Assessment

- Students calculate orbital eccentricity from perihelion/aphelion data
- Students predict orbital velocity at a given distance
- Students compare simulation results to published NASA data

## References

1. [NASA Planetary Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/) - NASA GSFC - Authoritative source for planetary data used in this simulation
2. [Newton's Law of Universal Gravitation](https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation) - Wikipedia - Mathematical foundation for the gravitational calculations
3. [Kepler's Laws of Planetary Motion](https://en.wikipedia.org/wiki/Kepler%27s_laws_of_planetary_motion) - Wikipedia - The three laws governing orbital motion
4. [Python Planet Simulation](https://github.com/techwithtim/Python-Planet-Simulation) - Tech With Tim - Original Python implementation that inspired this visualization
5. [Fifty Examples: Gravity](https://fiftyexamples.readthedocs.io/en/latest/gravity.html) - Reference for n-body gravitational simulation algorithms
