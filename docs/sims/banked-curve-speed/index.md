---
title: Banked Curve Speed Analysis
description: Interactive exploration of how vehicle speed relative to ideal speed determines friction requirements on banked curves.
image: /sims/banked-curve-speed/banked-curve-speed.png
og:image: /sims/banked-curve-speed/banked-curve-speed.png
quality_score: 95
---

# Banked Curve Speed Analysis

<iframe src="main.html" height="507px" width="100%" scrolling="no"></iframe>

[Run Banked Curve Speed Analysis MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Banked Curve Speed Analysis MicroSim Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/ZJYV6tJK2)

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/banked-curve-speed/main.html" width="100%" height="520px"></iframe>
```

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

- **Angle**: Banking angle of the curve (0-45 degrees)
- **Radius**: Curve radius (50-200 meters)
- **Speed**: Vehicle speed (5-40 m/s, displayed in mph)
- **μs (max)**: Maximum available coefficient of static friction (0.1-1.0, from ice to dry road)

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Calculate the ideal speed for a banked curve where no friction is needed
2. Determine the maximum safe speed given a friction coefficient
3. Explain why friction direction changes above vs below ideal speed
4. Interpret a friction vs speed graph to identify safe operating regions
5. Apply these concepts to real-world driving safety scenarios

### Target Audience

High school physics students (grades 11-12) and introductory college physics students

### Prerequisites

- Newton's laws of motion
- Free body diagrams
- Trigonometry (sine, cosine, tangent)
- Circular motion and centripetal acceleration
- Friction (static vs kinetic)

### Activities

1. **Graph Exploration (10 min)**: Have students identify the ideal speed on the friction graph. Ask: "What does the zero-crossing point represent physically?"

2. **Safe Speed Range (15 min)**: Students adjust the friction coefficient slider and observe how the safe speed range (between +μN and -μN lines) changes. Calculate safe ranges for ice (μ=0.1) vs dry pavement (μ=0.8).

3. **Real Highway Design (10 min)**: Research typical highway banking angles (2-6°) and speed limits. Verify whether the design assumes dry or wet conditions.

4. **Challenge Problem**: A race track curve has radius 100m and banking angle 30°. What is the range of safe speeds if μ=0.9? What happens if it rains and μ drops to 0.4?

### Assessment

- Can students correctly read the safe speed range from the graph?
- Can students explain why friction points in opposite directions above vs below ideal speed?
- Can students calculate ideal and maximum speeds for given conditions?

## References

1. [Banked Curves - HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/Mechanics/carbank.html) - Georgia State University - Comprehensive physics explanation of banked curve mechanics

2. [Circular Motion and Banked Curves - Khan Academy](https://www.khanacademy.org/science/physics/centripetal-force-and-gravitation) - Interactive lessons on centripetal force and circular motion

3. [Coefficient of Friction Values](https://www.engineeringtoolbox.com/friction-coefficients-d_778.html) - Engineering Toolbox - Reference table for friction coefficients of various road surfaces
