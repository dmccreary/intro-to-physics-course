---
title: Energy Diagram Explorer
description: Interactive tool to explore potential energy curves, turning points, and equilibrium positions
---

# Energy Diagram Explorer

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Energy diagrams show potential energy as a function of position. By adjusting the total energy line, you can determine where an object can move, where it reverses direction (turning points), and where equilibrium positions occur.

## Key Concepts

- **PE Curve**: Shows potential energy at each position
- **Total Energy Line**: Horizontal line representing E = KE + PE
- **Allowed Region**: Where total energy exceeds PE (KE > 0)
- **Forbidden Region**: Where PE exceeds total energy (KE would be negative - impossible!)
- **Turning Points**: Where E_total = PE (KE = 0, object reverses)
- **Equilibrium**: Where PE slope is zero (no force)

## PE Function Types

1. **Harmonic (½kx²)**: Parabolic well - simple harmonic oscillator
2. **Gravitational (mgh)**: Linear increase with position
3. **Double Well (ax⁴-bx²)**: Two valleys with barrier between
4. **Barrier (Gaussian)**: Peak that particles can get trapped by

## Controls

- **PE Type**: Select potential energy function
- **Mass**: Adjust particle mass (0.5-5 kg)
- **Parameter**: Adjust function parameter (k, slope, depth, height)
- **Total Energy**: Drag slider to change total energy level
- **Animate**: Show particle oscillating between turning points
- **Show Force**: Display force arrow (F = -dPE/dx)
- **Show KE**: Highlight the kinetic energy region (green)

## Reading the Diagram

- **Speed at any position**: KE = E_total - PE, so v = √(2KE/m)
- **Maximum speed**: Occurs where PE is minimum
- **Range of motion**: Between the turning points
- **Force direction**: Points from high PE to low PE (down the slope)
- **Green triangle (▲)**: Stable equilibrium (restoring force)
- **Orange triangle (▼)**: Unstable equilibrium (destabilizing force)
