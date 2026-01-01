---
quality_score: 55
title: Angular Displacement Visualization
description: An interactive MicroSim demonstrating angular displacement with a rotating disk showing how different points at various radii travel different arc lengths for the same angle (s = rθ).
image: /sims/angular-displacement/angular-displacement.png
---

# Angular Displacement Visualization

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run the Angular Displacement MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This simulation teaches one concept clearly: **arc length depends on radius** (s = rθ). Two colored points at different radii rotate through the same angle, making it visually obvious that the outer point travels a longer arc.

## How to Use

1. **Drag the slider** to change the angular displacement θ
2. **Observe** how both points rotate through the same angle
3. **Compare** the arc lengths (shown as thick colored arcs)
4. **Check the ratio** in the info panel - it equals the ratio of the radii

## Key Insight

Both points always rotate through the **same angle θ**, but the outer point (green, r=180) travels **3 times farther** than the inner point (red, r=60) because arc length is proportional to radius:

**s = r × θ**

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/angular-displacement/main.html"
        height="552px"
        width="100%"
        scrolling="no">
</iframe>
```

## Discussion Questions

1. If you double the radius, what happens to the arc length for the same angle?
2. Why must we use radians (not degrees) in the s = rθ formula?
3. How does this explain why the outer edge of a merry-go-round moves faster than the center?
