---
title: Driven Oscillator Interactive MicroSim
description: Interactive simulation showing how a driven oscillator responds to different driving frequencies, demonstrating resonance when the driving frequency matches the natural frequency.
---

# Driven Oscillator Interactive MicroSim

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

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

### Discussion Questions
1. Why does the amplitude keep growing at resonance?
2. What role does damping play in limiting the amplitude?
3. How does this relate to pushing a child on a swing?
