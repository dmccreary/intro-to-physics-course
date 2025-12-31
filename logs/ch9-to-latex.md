# Chapter 9 LaTeX Formula Conversion Log

**Date:** 2025-12-30
**File:** `docs/chapters/09-oscillations/index.md`
**Task:** Convert all plain text formulas to LaTeX format

## Summary

Converted all physics formulas in Chapter 9 (Oscillations and Periodic Motion) from plain text format (e.g., `**F = -kx**`) to proper LaTeX format (e.g., `$$F = -kx$$` for display math or `$F = -kx$` for inline math).

## Formulas Converted by Section

### Section 1: Understanding Simple Harmonic Motion
- Restoring force: `$$F = -kx$$`

### Section 2: Describing Oscillations with Numbers
- Period-frequency relationship: `$$T = \frac{1}{f} \quad \text{and} \quad f = \frac{1}{T}$$`
- Angular frequency: `$$\omega = 2\pi f = \frac{2\pi}{T}$$`
- SHM position equation: `$$x(t) = A \cos(\omega t + \phi)$$`

### Section 3: Springs and Hooke's Law
- Hooke's Law: `$$F = -kx$$`
- Mass-spring period: `$$T = 2\pi\sqrt{\frac{m}{k}}$$`
- Mass-spring frequency: `$$f = \frac{1}{2\pi}\sqrt{\frac{k}{m}}$$`

### Section 4: Pendulums
- Simple pendulum period: `$$T = 2\pi\sqrt{\frac{L}{g}}$$`
- Pendulum restoring force: `$$F = -mg \sin(\theta)$$`
- Physical pendulum period: `$$T = 2\pi\sqrt{\frac{I}{mgd}}$$`

### Section 5: Energy in Oscillating Systems
- Total mechanical energy: `$$E = \frac{1}{2}kA^2$$`
- Potential energy: `$PE = \frac{1}{2}kx^2$`
- Kinetic energy: `$KE = \frac{1}{2}mv^2$`

### Section 6: Damped Harmonic Motion
- Damping force: `$$F_{\text{damping}} = -bv$$`

### Section 7: Driven Oscillations and Resonance
- Driving force: `$$F_{\text{drive}} = F_0 \cos(\omega_d t)$$`
- Resonance condition: `$\omega_d \approx \omega_0$`

### Section 8: Mathematical Description of SHM
- Position: `$x(t) = A \cos(\omega t + \phi)$`
- Velocity: `$v(t) = -A\omega \sin(\omega t + \phi)$`
- Acceleration: `$a(t) = -A\omega^2 \cos(\omega t + \phi) = -\omega^2 x(t)$`
- Maximum values table (all entries converted to inline LaTeX)
- Energy relationships with proper fractions

## Other Sections Updated

### Key Equations Reference Table
All 12 equations converted to inline LaTeX format:
- Restoring force, Hooke's Law, Period-frequency
- Angular frequency, Mass-spring period, Simple pendulum period
- SHM position, velocity, acceleration
- Total energy, Potential energy, Kinetic energy

### Summary Section
- All formula references converted to inline LaTeX

### Vocabulary Section
- Angular frequency definition: `$\omega = 2\pi f$`
- Hooke's Law definition: `$F = -kx$`

### Inline References
- Factor of `$\sqrt{2}$` for pendulum length doubling
- Physical pendulum reduction conditions: `$I = mL^2$` and `$d = L$`
- Resonance frequency relationships: `$\omega_d$`, `$\omega_0$`

## Notes

- Used `$$...$$` for display math (standalone equations)
- Used `$...$` for inline math (within text or tables)
- Converted variable definitions to inline LaTeX where they appear in "Where:" lists
- Used `\frac{}{}` for fractions instead of `/`
- Used `\sqrt{}` for square roots instead of `√`
- Used `\text{}` for subscript labels like `$F_{\text{damping}}$`
- Used proper Greek letters: `\omega`, `\theta`, `\phi`, `\pi`
