---
title: 2D Collision Vector Diagram
description: Interactive visualization showing momentum vector conservation in two dimensions before and after collision
---

# 2D Collision Vector Diagram

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This Diagram

This visualization shows how momentum is conserved independently in both the x and y directions during a 2D collision. Adjust the angles of the incoming objects to see how the momentum vectors change.

## Key Equations

For 2D collisions, momentum is conserved in each direction:

**X-direction:**
$$m_1v_{1x,i} + m_2v_{2x,i} = m_1v_{1x,f} + m_2v_{2x,f}$$

**Y-direction:**
$$m_1v_{1y,i} + m_2v_{2y,i} = m_1v_{1y,f} + m_2v_{2y,f}$$

## Visual Elements

- **Blue Arrow**: Object 1 velocity vector (2 kg)
- **Red Arrow**: Object 2 velocity vector (3 kg)
- **Purple Arrow**: Total momentum vector
- **Dashed Lines**: Vector components (vx and vy)
- **Calculation Box**: Shows momentum calculations

## Controls

- **Object 1 Angle**: Direction of first object's velocity (0-360°)
- **Object 2 Angle**: Direction of second object's velocity (0-360°)

## Key Observations

1. Total momentum vector (purple) is the same before and after
2. x-component of total momentum is conserved separately
3. y-component of total momentum is conserved separately
4. Individual object momenta can change, but the sum remains constant

## Strategy for 2D Collision Problems

1. Set up coordinate system (x and y axes)
2. Resolve all velocities into components
3. Apply conservation of momentum to x and y separately
4. Solve the system of equations
5. Convert back to magnitude and direction
