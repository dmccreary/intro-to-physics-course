---
title: Comparative Angular Velocities Chart
description: An interactive horizontal bar chart comparing angular velocities of common rotating objects on a logarithmic scale.
image: /sims/angular-velocities-chart/angular-velocities-chart.png
og:image: /sims/angular-velocities-chart/angular-velocities-chart.png
quality_score: 85
---

# Comparative Angular Velocities Chart

<iframe src="main.html" height="642px" width="100%" scrolling="no"></iframe>

[Run Comparative Angular Velocities Chart Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Comparative Angular Velocities Chart Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/ciylHh-Eg)

Copy this iframe to embed this MicroSim on your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/angular-velocities-chart/main.html" width="100%" height="650px"></iframe>
```

## About This Chart

This visualization compares the angular velocities of common rotating objects, spanning over 10 orders of magnitude from Earth's rotation to dental drills. The logarithmic scale allows meaningful comparison of these vastly different rotation rates.

## Key Observations

- **Earth's rotation** is incredibly slow at just 0.0007 RPM (7.27 × 10⁻⁵ rad/s)
- **Human-scale rotations** (highlighted in green) range from about 10 to 10,000 RPM
- **Dental drills** spin at 500,000 RPM (50,000 rad/s)
- **Each major tick mark** represents a factor of 10 increase

## How to Read the Chart

- Hover over any bar to see the RPM value
- The bars are color-coded from blue (slower) to red (faster)
- The green shaded region shows "human-scale" rotations we commonly encounter

## Quiz

Test your understanding of angular velocities with these questions based on the chart above.

---

#### 1. Approximately how many times faster does a dental drill spin compared to a ceiling fan?

<div class="upper-alpha" markdown>
1. 10 times faster
2. 100 times faster
3. 1,000 times faster
4. 5,000 times faster
</div>

??? question "Show Answer"
    The correct answer is **D**. A dental drill spins at about 50,000 rad/s while a ceiling fan on low spins at about 10.5 rad/s. That's roughly 50,000 ÷ 10.5 ≈ 5,000 times faster! This is why logarithmic scales are needed—the differences are too large to show on a linear scale.

    **Concept Tested:** Comparing Angular Velocities

---

#### 2. Why does this chart use a logarithmic scale instead of a linear scale?

<div class="upper-alpha" markdown>
1. Logarithmic scales are always used in physics
2. The angular velocities span many orders of magnitude (10⁻⁵ to 10⁵)
3. Linear scales cannot display negative numbers
4. The objects rotate in different directions
</div>

??? question "Show Answer"
    The correct answer is **B**. Angular velocities in everyday life span over 10 orders of magnitude—from Earth's rotation at 7.27 × 10⁻⁵ rad/s to a dental drill at 50,000 rad/s. On a linear scale, the slower objects would be invisible dots while the dental drill bar would extend off the page. A logarithmic scale compresses large ranges so all values are visible.

    **Concept Tested:** Logarithmic Scales

---

#### 3. What is the relationship between angular velocity in rad/s and rpm (revolutions per minute)?

<div class="upper-alpha" markdown>
1. rpm = ω (they are equal)
2. rpm = ω × 60
3. rpm = ω × 60/(2π) ≈ ω × 9.55
4. rpm = ω/60
</div>

??? question "Show Answer"
    The correct answer is **C**. One revolution = 2π radians, and there are 60 seconds per minute. So: rpm = (ω rad/s) × (60 s/min) × (1 rev/2π rad) = ω × 60/(2π) ≈ ω × 9.55. For example, a second hand at ω = 0.105 rad/s gives 0.105 × 9.55 ≈ 1 rpm, which is correct!

    **Concept Tested:** Unit Conversion

---

#### 4. The green "human-scale" region on the chart spans from 1 to 1,000 rad/s. Which of these objects falls within this range?

<div class="upper-alpha" markdown>
1. Earth's rotation
2. The minute hand of a clock
3. A car tire at highway speed
4. A jet engine turbine
</div>

??? question "Show Answer"
    The correct answer is **C**. A car tire at highway speed rotates at about 70 rad/s, which falls within the 1–1,000 rad/s human-scale range. Earth's rotation (7.27 × 10⁻⁵ rad/s) and the minute hand (1.75 × 10⁻³ rad/s) are far too slow, while a jet engine turbine (3,000 rad/s) is above this range.

    **Concept Tested:** Angular Velocity Magnitudes

---

#### 5. If Earth's angular velocity is 7.27 × 10⁻⁵ rad/s, how many revolutions does Earth complete per day?

<div class="upper-alpha" markdown>
1. Approximately 0.5 revolutions
2. Approximately 1 revolution
3. Approximately 7.27 revolutions
4. Approximately 24 revolutions
</div>

??? question "Show Answer"
    The correct answer is **B**. Using the conversion: revolutions per day = ω × (86,400 s/day)/(2π rad/rev) = 7.27 × 10⁻⁵ × 86,400/6.28 ≈ 1.0 revolution per day. This makes sense—Earth completes one full rotation every 24 hours!

    **Concept Tested:** Angular Velocity and Period

---

## Discussion Questions

1. Why is a logarithmic scale necessary for this comparison?
2. Convert Earth's angular velocity to revolutions per day—does it match what you know?
3. Why do hard drives spin faster than ceiling fans?
4. Which everyday objects might you add to this chart? Where would they fall?

## References

1. [Angular Velocity](https://en.wikipedia.org/wiki/Angular_velocity) - Wikipedia - Comprehensive overview of angular velocity concepts and mathematical definitions.
2. [Rotational Motion](https://openstax.org/books/college-physics-2e/pages/10-1-angular-acceleration) - OpenStax College Physics - Free textbook chapter on rotational kinematics including angular velocity and acceleration.
3. [p5.js Reference](https://p5js.org/reference/) - p5.js Foundation - Documentation for the JavaScript library used to create this visualization.
