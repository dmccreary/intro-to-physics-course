---
quality_score: 85
title: Vector Addition Interactive MicroSim
description: An interactive visualization demonstrating both graphical (tip-to-tail) and component methods of vector addition side by side.
image: /sims/vector-addition/vector-addition.png
og:image: /sims/vector-addition/vector-addition.png
social:
   cards: false
---

# Vector Addition Interactive MicroSim

<iframe src="main.html" height="652px" width="100%" scrolling="no"></iframe>

[Run the Vector Addition MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/vector-addition/main.html" height="652px" scrolling="no"></iframe>
```

## Description

This MicroSim demonstrates two equivalent methods for adding vectors, displayed side by side:

### Left Panel: Graphical Method (Tip-to-Tail)

The graphical method provides visual intuition:
1. Draw Vector 1 (blue) starting from the origin
2. Draw Vector 2 (green) starting from the tip of Vector 1
3. The Resultant (red) connects the origin to the final endpoint

### Right Panel: Component Method

The component method provides precise calculations:
1. Break each vector into x and y components using trigonometry
2. Add all x-components together to get Rₓ
3. Add all y-components together to get Rᵧ
4. Calculate magnitude: |R| = √(Rₓ² + Rᵧ²)
5. Calculate direction: θ = tan⁻¹(Rᵧ/Rₓ)

### Visual Elements

| Element | Color | Description |
|---------|-------|-------------|
| Vector 1 | Blue | First input vector |
| Vector 2 | Green | Second input vector |
| Resultant | Red | Sum of the two vectors |
| Components | Dashed lines | X and Y projections |

### Controls

| Control | Range | Default | Description |
|---------|-------|---------|-------------|
| Vector 1 Magnitude | 0-100 m | 60 m | Length of first vector |
| Vector 1 Angle | 0-360° | 30° | Direction of first vector |
| Vector 2 Magnitude | 0-100 m | 40 m | Length of second vector |
| Vector 2 Angle | 0-360° | 120° | Direction of second vector |
| Show Components | On/Off | On | Display component projections |
| Show Calculations | On/Off | On | Display step-by-step math |
| Animate Tip-to-Tail | On/Off | Off | Animate Vector 2 sliding into position |

## Key Concepts

### Why Two Methods?

- **Graphical method**: Builds intuition, works well for 2-3 vectors, good for estimation
- **Component method**: More precise, scales to any number of vectors, essential for complex problems

### Vector Addition is Commutative

The order doesn't matter: **V₁ + V₂ = V₂ + V₁**

Try swapping the vectors' values to verify this yourself!

### Component Formulas

For a vector with magnitude v at angle θ:

- **vₓ = v·cos(θ)** - the x-component
- **vᵧ = v·sin(θ)** - the y-component

For the resultant:

- **Rₓ = v₁ₓ + v₂ₓ** - sum of x-components
- **Rᵧ = v₁ᵧ + v₂ᵧ** - sum of y-components
- **|R| = √(Rₓ² + Rᵧ²)** - resultant magnitude
- **θ = tan⁻¹(Rᵧ/Rₓ)** - resultant direction

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Add two vectors using the tip-to-tail graphical method
2. Add two vectors using the component method
3. Explain why both methods give the same result
4. Calculate resultant magnitude and direction from components

### Grade Level

High School Physics (Grades 9-12)

### Prerequisites

- Understanding of vector basics (magnitude and direction)
- Trigonometry (sine, cosine, tangent)
- Coordinate systems

### Duration

25-35 minutes

### Activities

#### Activity 1: Graphical Exploration (8 min)

1. Start with default values (V₁ = 60m at 30°, V₂ = 40m at 120°)
2. Focus on the LEFT panel
3. Enable "Animate Tip-to-Tail" to see Vector 2 slide into position
4. Note how the resultant connects origin to final point
5. Verify: The resultant shown matches what you'd estimate visually

#### Activity 2: Component Verification (10 min)

1. Focus on the RIGHT panel with calculations visible
2. Verify the component calculations by hand:
   - v₁ₓ = 60·cos(30°) = 60 × 0.866 = 51.96 m ✓
   - v₁ᵧ = 60·sin(30°) = 60 × 0.5 = 30.0 m ✓
3. Check that Rₓ = v₁ₓ + v₂ₓ and Rᵧ = v₁ᵧ + v₂ᵧ
4. Verify magnitude calculation: |R| = √(Rₓ² + Rᵧ²)

#### Activity 3: Special Cases (10 min)

Try these configurations and predict the result before checking:

| V₁ | V₂ | Expected Resultant |
|----|----|--------------------|
| 50m at 0° | 50m at 90° | ~70.7m at 45° |
| 40m at 0° | 40m at 180° | 0m (vectors cancel!) |
| 30m at 45° | 30m at 45° | 60m at 45° (same direction = double) |
| 60m at 30° | 40m at 210° | Check if vectors partially cancel |

#### Activity 4: Problem Solving (7 min)

A boat heads east at 8 m/s while a river current flows north at 6 m/s.

1. Set V₁ = 80m at 0° (east)
2. Set V₂ = 60m at 90° (north)
3. Read the resultant velocity and direction
4. Expected: 100 m at 36.9° north of east

### Discussion Questions

1. Why does the tip-to-tail method work?
2. What happens when two vectors point in opposite directions?
3. When would you prefer the graphical method vs. the component method?
4. How would you extend this to add three or more vectors?

### Assessment

- Students correctly calculate components for given vectors
- Students can predict resultant direction (which quadrant)
- Students explain the relationship between the two methods

## Common Misconceptions

1. **Adding magnitudes directly**: |R| ≠ |V₁| + |V₂| unless vectors are parallel
2. **Ignoring direction**: The resultant depends heavily on the angle between vectors
3. **Quadrant errors**: Remember to consider signs of components in different quadrants

## Real-World Applications

- **Navigation**: Combining wind velocity with aircraft velocity
- **Forces**: Finding net force from multiple applied forces
- **Displacement**: Total journey from multiple legs of travel
- **Relative motion**: Object velocity relative to moving reference frame

## References

- Physics Classroom: Vector Addition
- Khan Academy: Adding Vectors
- OpenStax Physics: Vector Addition and Subtraction
