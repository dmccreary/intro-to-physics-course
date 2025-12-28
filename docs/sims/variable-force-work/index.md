---
title: Variable Force Work Calculation
description: Interactive visualization showing work as the area under a force-position curve
---

# Variable Force Work Calculation

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This visualization demonstrates how work is calculated for variable forces by showing the area under a force-versus-position graph. Students can experiment with different force functions and see how the integral relates to work.

## Key Concepts

For a force that varies with position, work is calculated using integration:

$$W = \int_{x_1}^{x_2} F(x) \, dx$$

The work equals the area under the force-position curve between the initial and final positions.

## Force Types Available

1. **Constant Force (F = 10 N)**: Work = F × Δx (rectangle area)
2. **Linear/Hooke's Law (F = 5x N)**: Work = ½kx² (triangular area)
3. **Quadratic (F = 2x² N)**: Work = ⅔x³ (curved area)
4. **Square Root (F = 8√x N)**: Work = (16/3)x^(3/2)

## Controls

- **Force Type**: Select the force function to visualize
- **Start Position**: Set the initial position (0-5 m)
- **End Position**: Set the final position (0-10 m)
- **Calculate Work**: Animates the filling of the area under the curve
- **Reset**: Clears the calculation

## Learning Objectives

- Visualize work as the area under a force-position curve
- Understand why variable forces require integration
- Compare work calculations for different force functions
- Connect graphical representation to mathematical integration
