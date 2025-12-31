---
quality_score: 85
title: Vector Basics Interactive MicroSim
description: An interactive visualization teaching how vectors are represented graphically with magnitude, direction, and component decomposition.
image: /sims/vector-basics/vector-basics.png
og:image: /sims/vector-basics/vector-basics.png
social:
   cards: false
---

# Vector Basics Interactive MicroSim

<iframe src="main.html" height="652px" width="100%" scrolling="no"></iframe>

[Run the Vector Basics MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/vector-basics/main.html" height="652px" scrolling="no"></iframe>
```

## Description

This MicroSim provides an interactive exploration of vector fundamentals, helping students understand:

- **Magnitude**: The length (size) of a vector, representing "how much"
- **Direction**: The angle a vector makes, representing "which way"
- **Components**: The horizontal (x) and vertical (y) parts of a vector

### Visual Elements

| Element | Color | Description |
|---------|-------|-------------|
| Main vector | Blue arrow | The vector being studied, originating from the origin |
| X-component | Red dashed line | Horizontal projection of the vector |
| Y-component | Green dashed line | Vertical projection of the vector |
| Protractor | Orange overlay | Shows angle measurement from +x axis |

### Controls

| Control | Range | Default | Description |
|---------|-------|---------|-------------|
| Magnitude | 0-100 m | 50 m | Length of the vector |
| Angle | 0-360° | 45° | Direction measured counterclockwise from +x axis |
| Show Components | On/Off | On | Display x and y component lines |
| Show Protractor | On/Off | Off | Display angle measurement overlay |
| Reset | Button | - | Return to default values |

## Key Concepts

### Vector Representation

A vector has both **magnitude** (size) and **direction**. Unlike scalars (which are just numbers), vectors require both pieces of information to be fully described.

### Component Decomposition

Any vector can be broken into perpendicular components:

- **vₓ = v·cos(θ)** - the x-component
- **vᵧ = v·sin(θ)** - the y-component

This decomposition is fundamental to solving physics problems involving forces, velocities, and accelerations.

### Reverse Process

Given components, you can find magnitude and direction:

- **||v|| = √(vₓ² + vᵧ²)** - magnitude from components
- **θ = tan⁻¹(vᵧ/vₓ)** - direction from components

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Define magnitude and direction for vectors
2. Draw vectors as arrows with correct proportions
3. Decompose a vector into x and y components
4. Calculate component values using trigonometry
5. Reconstruct magnitude and direction from components

### Grade Level

High School Physics (Grades 9-12)

### Prerequisites

- Basic trigonometry (sine, cosine, tangent)
- Understanding of coordinate systems
- Pythagorean theorem

### Duration

20-30 minutes

### Activities

#### Activity 1: Exploration (5 min)
1. Start with the default vector (50 m at 45°)
2. Enable "Show Components" to see the x and y parts
3. Observe how the component values in the info panel match the dashed lines

#### Activity 2: Angle Investigation (8 min)
1. Keep magnitude at 50 m
2. Change angle through special values: 0°, 30°, 45°, 60°, 90°
3. Record vₓ and vᵧ for each angle
4. Notice patterns: At 45°, components are equal. At 0°, all is in x. At 90°, all is in y.

#### Activity 3: Component Prediction (10 min)
1. Turn OFF "Show Components"
2. Set magnitude to 80 m, angle to 60°
3. Calculate vₓ and vᵧ by hand using:
   - vₓ = 80 × cos(60°) = 80 × 0.5 = 40 m
   - vᵧ = 80 × sin(60°) = 80 × 0.866 = 69.3 m
4. Turn ON "Show Components" to verify

#### Activity 4: Quadrant Exploration (7 min)
1. Move the angle through all four quadrants (0-90°, 90-180°, 180-270°, 270-360°)
2. Observe how component signs change:
   - Quadrant I (0-90°): vₓ > 0, vᵧ > 0
   - Quadrant II (90-180°): vₓ < 0, vᵧ > 0
   - Quadrant III (180-270°): vₓ < 0, vᵧ < 0
   - Quadrant IV (270-360°): vₓ > 0, vᵧ < 0

### Discussion Questions

1. Why do we break vectors into components?
2. At what angle are the x and y components equal?
3. What happens to the y-component as the angle approaches 0°?
4. How would you add two vectors using their components?

### Assessment

- Students correctly calculate components for 3 different vectors
- Students can predict which quadrant a vector is in from component signs
- Students explain why component decomposition is useful in physics

## Common Misconceptions

1. **Confusing magnitude with components**: The magnitude is the total length, not the sum of components
2. **Angle direction**: Angles are measured counterclockwise from the positive x-axis
3. **Component signs**: Components can be negative depending on the quadrant

## References

- Physics Classroom: Vectors - Fundamentals and Operations
- Khan Academy: Vector Components
- OpenStax Physics: Vector Addition and Subtraction
