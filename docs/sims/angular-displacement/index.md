---
title: Angular Displacement Visualization
description: An interactive MicroSim demonstrating angular displacement with a rotating disk showing how different points at various radii travel different arc lengths for the same angle (s = rθ).
image: /sims/angular-displacement/angular-displacement.png
---

# Angular Displacement Visualization

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run the Angular Displacement MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive simulation helps students understand angular displacement by visualizing how different points on a rotating object move through the same angle but travel different arc lengths. The key relationship demonstrated is **s = rθ**, where arc length depends on both the radius and angular displacement.

## How to Use

1. **Angular Displacement Slider**: Adjust the angle θ from 0 to 2π radians (360°)
2. **Animate Button**: Watch the disk rotate continuously at constant angular velocity
3. **Reset Button**: Return to the initial position (45°)
4. **Show Right-Hand Rule**: Display the convention for angular direction

## Key Observations

- **All points rotate through the same angle θ** - this is the defining property of angular displacement
- **Arc length increases with radius** - the outer green point travels farther than the inner red point
- **The s = rθ formula** - arc length is directly proportional to both radius and angle
- **Units matter** - angle must be in radians for the formula to work

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/angular-displacement/main.html"
        height="602px"
        width="100%"
        scrolling="no">
</iframe>
```

## Lesson Plan

### Learning Objectives
- Define angular displacement as the angle through which an object rotates
- Calculate arc length using s = rθ
- Explain why points at different radii travel different distances for the same rotation
- Apply the right-hand rule to determine angular direction

### Discussion Questions
1. If you double the radius, what happens to the arc length for the same angle?
2. Why must we use radians (not degrees) in the s = rθ formula?
3. How does this explain why the outer edge of a merry-go-round moves faster than the center?

### Extensions
- Calculate the linear velocity at each radius when the disk rotates at constant angular velocity
- Explore the relationship between angular and linear quantities
