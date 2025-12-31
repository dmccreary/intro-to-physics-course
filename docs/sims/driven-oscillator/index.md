---
title: Driven Oscillator Interactive MicroSim
description: Interactive simulation showing how a driven oscillator responds to different driving frequencies, demonstrating resonance when the driving frequency matches the natural frequency.
image: /sims/driven-oscillator/driven-oscillator.png
og:image: /sims/driven-oscillator/driven-oscillator.png
quality_score: 95
---

# Driven Oscillator Interactive MicroSim

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/dmccreary/sketches/ifMjcoHl_)

### Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/driven-oscillator/main.html" width="100%" height="560px"></iframe>
```

## About This MicroSim

This interactive simulation demonstrates the physics of driven (forced) oscillations. You can adjust the driving frequency, driving force amplitude, and damping to observe how the system responds, especially when near resonance.

## Controls

### Driving Frequency (ωd/ω₀)
- Ratio of driving frequency to natural frequency
- At ratio = 1.0, you're driving at resonance
- Watch the amplitude grow dramatically at resonance!

### Driving Force (F₀)
- Amplitude of the periodic driving force
- Larger force = larger steady-state amplitude

### Damping (b)
- Resistance that removes energy from the system
- Higher damping = smaller resonance peak

## What to Observe

### At Resonance (ωd/ω₀ ≈ 1)
- Amplitude builds up over time
- Maximum energy transfer from driver to oscillator
- Lower damping → higher amplitude

### Below Resonance (ωd/ω₀ < 1)
- Motion follows the driving force
- Amplitude relatively small

### Above Resonance (ωd/ω₀ > 1)
- Motion opposes the driving force (180° phase shift)
- Amplitude decreases as frequency increases

## The Physics

The equation of motion for a driven damped oscillator:

**m(d²x/dt²) + b(dx/dt) + kx = F₀cos(ωd·t)**

Where:
- m = mass
- b = damping coefficient
- k = spring constant
- F₀ = driving force amplitude
- ωd = driving angular frequency

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. **Explain** the concept of resonance and identify when it occurs in a driven oscillator
2. **Predict** how changes in driving frequency affect the amplitude of oscillation
3. **Analyze** the role of damping in limiting resonance amplitude
4. **Apply** the driven oscillator model to real-world examples (bridges, musical instruments, radio tuning)

### Target Audience

- High school physics students (grades 11-12)
- Introductory college physics students
- Prerequisites: Understanding of simple harmonic motion and damped oscillations

### Activities

#### Activity 1: Discovering Resonance (10 minutes)

1. Set damping to minimum (0.1 kg/s) and driving force to 10 N
2. Slowly increase the frequency ratio from 0.5 to 1.5
3. Record the maximum amplitude at each frequency
4. Identify the frequency ratio that produces maximum amplitude

#### Activity 2: The Effect of Damping (10 minutes)

1. Set frequency ratio to 1.0 (resonance)
2. Run simulation with damping = 0.5, 1.0, 1.5, and 2.0 kg/s
3. Compare steady-state amplitudes and time to reach steady state
4. Graph amplitude vs. damping coefficient

#### Activity 3: Phase Relationships (5 minutes)

1. Observe the phase lag indicator at different frequency ratios
2. Note: Below resonance (nearly in phase), at resonance (90° lag), above resonance (nearly 180° lag)
3. Connect to energy transfer efficiency

### Discussion Questions

1. Why does the amplitude keep growing at resonance?
2. What role does damping play in limiting the amplitude?
3. How does this relate to pushing a child on a swing?
4. Why did the Tacoma Narrows Bridge collapse? How could engineers prevent similar failures?
5. How do noise-canceling headphones use the principle of driven oscillations?

### Assessment

- **Formative**: Observe student predictions before adjusting parameters
- **Summative**: Students explain in writing why a wine glass shatters when a singer hits the right note
- **Extension**: Calculate the theoretical resonance amplitude using the formula and compare to simulation results

## References

1. [Forced Oscillations and Resonance](https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations) - OpenStax University Physics - Comprehensive textbook treatment of driven oscillators with mathematical derivations

2. [The Tacoma Narrows Bridge Collapse](https://www.youtube.com/watch?v=j-zczJXSxnw) - 1940 - Historical footage demonstrating catastrophic resonance failure in engineering

3. [Resonance in Physics](https://www.physicsclassroom.com/class/waves/Lesson-5/Resonance) - The Physics Classroom - Accessible introduction to resonance concepts for high school students

4. [Damped and Driven Oscillations](https://www.feynmanlectures.caltech.edu/I_23.html) - Feynman Lectures on Physics - Richard Feynman's classic explanation of oscillatory systems

5. [p5.js Reference](https://p5js.org/reference/) - p5.js Documentation - JavaScript library used to create this interactive simulation
