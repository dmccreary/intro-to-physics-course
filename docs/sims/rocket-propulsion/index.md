---
quality_score: 60
title: Rocket Propulsion Diagram
description: Interactive visualization showing momentum conservation in rocket propulsion with exhaust gases
---

# Rocket Propulsion Diagram

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This Diagram

This interactive simulation demonstrates how rockets propel themselves using the conservation of momentum. As exhaust gases are expelled backward, the rocket gains momentum in the forward direction.

## Key Physics Principles

### Conservation of Momentum
$$\vec{p}_{initial} = \vec{p}_{final}$$
$$0 = \vec{p}_{rocket} + \vec{p}_{exhaust}$$
$$\vec{p}_{rocket} = -\vec{p}_{exhaust}$$

### Thrust Equation
$$F_{thrust} = \frac{dm}{dt} \times v_{exhaust}$$

Where:
- $\frac{dm}{dt}$ = mass flow rate of exhaust (kg/s)
- $v_{exhaust}$ = exhaust velocity relative to rocket (m/s)

## Visual Elements

- **Rocket**: Animated spacecraft with visible exhaust
- **Orange Particles**: Exhaust gases carrying momentum backward
- **Orange Arrow**: Momentum of exhaust gases (p_exhaust)
- **Blue Arrow**: Momentum gained by rocket (p_rocket)
- **Equation Box**: Real-time thrust calculation

## Controls

- **Exhaust Rate**: Mass of fuel expelled per second (1-10 kg/s)
- **Exhaust Velocity**: Speed of exhaust relative to rocket (100-500 m/s)
- **Launch Button**: Start/stop the animation

## Key Observations

1. **Higher exhaust velocity = greater thrust** for same mass flow
2. **Momentum vectors are equal and opposite** (Newton's 3rd Law)
3. **Rocket accelerates continuously** as long as fuel is expelled
4. **No external medium needed** - rockets work in vacuum!

## Why Rockets Work in Space

Unlike cars or airplanes that push against ground or air, rockets carry their own "reaction mass" (fuel). By expelling mass at high velocity, they create an equal and opposite momentum change - this is pure Newton's Third Law in action.

## Real-World Applications

- Space launch vehicles
- Spacecraft maneuvering thrusters
- Missile propulsion
- Jet engines (similar principle with air intake)
