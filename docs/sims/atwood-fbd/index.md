---
title: Atwood Machine Free-Body Diagram
description: Interactive visualization of free-body diagrams for the Atwood machine showing how to set up and solve the equations.
image: /sims/atwood-fbd/atwood-fbd.png
og:image: /sims/atwood-fbd/atwood-fbd.png
quality_score: 90
---

# Atwood Machine Free-Body Diagram

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Copy This Iframe

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/atwood-fbd/main.html" width="100%" height="600px"></iframe>
```

## About This MicroSim

This simulation shows how to analyze an Atwood machine by drawing separate free-body diagrams for each mass and applying Newton's second law. The key insight is that both masses have the same magnitude of acceleration because they're connected by an inextensible string.

### Controls

- **m₁ slider**: Adjust the mass of the left (blue) block (1-15 kg)
- **m₂ slider**: Adjust the mass of the right (red) block (1-15 kg)
- **Show equations**: Toggle the step-by-step solution panel
- **Animate motion**: Watch the system move based on calculated acceleration

## Key Equations

- **For m₁ (lighter)**: $T - m_1g = m_1a$
- **For m₂ (heavier)**: $m_2g - T = m_2a$
- **Acceleration**: $a = \frac{(m_2 - m_1)g}{m_1 + m_2}$
- **Tension**: $T = \frac{2m_1m_2g}{m_1 + m_2}$

## Key Insights

- Same magnitude of acceleration for both masses (string constraint)
- Tension is the same on both sides (massless string, frictionless pulley)
- When m₁ = m₂, the system is in equilibrium (a = 0)
- Tension is always between m₁g and m₂g

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Draw correct free-body diagrams for each mass in an Atwood machine
2. Apply Newton's second law to each mass separately
3. Use the string constraint to relate the accelerations
4. Solve simultaneous equations to find acceleration and tension
5. Verify their calculations using the interactive simulation

### Target Audience

High school physics students (grades 10-12) studying dynamics and problem-solving with Newton's laws

### Prerequisites

- Understanding of Newton's second law (F = ma)
- Ability to draw free-body diagrams
- Solving systems of linear equations
- Understanding of tension in strings

### Activities

1. **Diagram Analysis** (5 min): Examine the free-body diagrams for each mass. Identify all forces and their directions.
2. **Equation Setup** (10 min): For each mass, write Newton's second law. Discuss sign conventions (positive direction).
3. **Algebraic Solution** (10 min): Add the two equations to eliminate T and solve for acceleration.
4. **Verification** (5 min): Compare hand calculations with simulation values.
5. **Extension**: Derive the formula for tension by substituting the acceleration back.

### Assessment

- Can students correctly draw FBDs with all forces labeled?
- Can students write correct Newton's second law equations for each mass?
- Can students solve for acceleration and tension algebraically?
- Do students understand why T cancels when adding equations?

## References

1. [Free-Body Diagrams - The Physics Classroom](https://www.physicsclassroom.com/class/newtlaws/Lesson-2/Drawing-Free-Body-Diagrams) - Tutorial on drawing and interpreting free-body diagrams
2. [The Atwood Machine - HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/atwd.html) - Georgia State University - Comprehensive derivation with diagrams
3. [Newton's Laws Problem Solving - Khan Academy](https://www.khanacademy.org/science/physics/forces-newtons-laws) - Step-by-step problem solving strategies
4. [Atwood Machine Analysis - MIT OpenCourseWare](https://ocw.mit.edu/courses/physics/) - University-level treatment of connected body problems
