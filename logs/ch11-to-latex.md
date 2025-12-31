# Chapter 11 LaTeX Formula Conversion Log

**Date:** 2025-12-30
**File:** `docs/chapters/11-light-optics/index.md`
**Task:** Convert all plain text formulas to LaTeX format

## Summary

Converted all physics formulas in Chapter 11 (Light and Optics) from plain text format (e.g., `**c = λf**`) to proper LaTeX format (e.g., `$c = \lambda f$` for inline math or `$$...$$` for display math).

## Formulas Converted by Section

### The Nature of Light
- Wave equation: `$c = \lambda f$`
- Speed of light: `$c = 299{,}792{,}458$ m/s`, `$c = 3.00 \times 10^8$ m/s`
- Light speeds in materials: `$3.00 \times 10^8$`, `$2.25 \times 10^8$`, etc.
- Variable definitions: `$\lambda$`, `$f$`, `$c$`

### Reflection
- Law of reflection: `$\theta_i = \theta_r$`
- Focal length relation: `$f = R/2$`
- Mirror equation: `$$\frac{1}{f} = \frac{1}{d_o} + \frac{1}{d_i}$$`
- Magnification: `$$M = -\frac{d_i}{d_o} = \frac{h_i}{h_o}$$`
- Magnification conditions: `$M > 1$`, `$M = 1$`, `$M < 1$`
- Sign conventions: `$f$`, `$d_o$`, `$d_i$`

### Refraction
- Index of refraction: `$$n = \frac{c}{v}$$`
- Snell's Law: `$$n_1 \sin \theta_1 = n_2 \sin \theta_2$$`
- Critical angle: `$$\sin \theta_c = \frac{n_2}{n_1}$$`
- Index values: `$n = 1.00$`, `$n = 1.33$`, `$n = 2.42$`, etc.
- Angle references: `$\theta_1$`, `$\theta_2$`, `$\theta_c$`

### Lenses
- Thin lens equation: `$$\frac{1}{f} = \frac{1}{d_o} + \frac{1}{d_i}$$`
- Lens magnification: `$$M = -\frac{d_i}{d_o} = \frac{h_i}{h_o}$$`
- Lens power: `$$P = \frac{1}{f}$$`
- Power examples: `$f = 0.5$ m`, `$P = +2.0$ D`, etc.
- Lensmaker's equation: `$$\frac{1}{f} = (n-1)\left(\frac{1}{R_1} - \frac{1}{R_2}\right)$$`

### Diffraction (Young's Double Slit)
- Constructive interference: `$$d \sin \theta = m\lambda$$`
- Destructive interference: `$$d \sin \theta = \left(m + \frac{1}{2}\right)\lambda$$`
- Variable definitions: `$d$`, `$\theta$`, `$m$`, `$\lambda$`

### Single Slit Diffraction
- Dark fringes: `$$a \sin \theta = m\lambda$$`
- Variable definitions: `$a$`, `$\theta$`, `$m \neq 0$`, `$\lambda$`

### Diffraction Grating
- Bright fringes: `$$d \sin \theta = m\lambda$$`

### Polarization
- Malus's Law: `$$I = I_0 \cos^2 \theta$$`
- Variable definitions: `$I$`, `$I_0$`, `$\theta$`
- Crossed polarizers: `$\theta = 90°$`, `$I = 0$`

### Summary Section
- Speed of light: `$3.00 \times 10^8$ m/s`
- Mirror equation reference: `$1/f = 1/d_o + 1/d_i$`
- Magnification reference: `$M = -d_i/d_o$`
- Snell's Law reference: `$n_1 \sin \theta_1 = n_2 \sin \theta_2$`
- Malus's Law reference: `$I = I_0 \cos^2 \theta$`

## LaTeX Formatting Notes

- Used `$$...$$` for display math (standalone equations)
- Used `$...$` for inline math (within text, lists, or tables)
- Used `\frac{}{}` for fractions instead of `/`
- Used `\sin`, `\cos` for trigonometric functions
- Used `\theta` for angle symbols instead of Unicode θ
- Used `\lambda` for wavelength instead of Unicode λ
- Used subscripts like `$d_o$`, `$d_i$`, `$n_1$`, `$n_2$`
- Used `\times` for multiplication in scientific notation
- Used `\left(` and `\right)` for proper bracket sizing
- Used `\neq` for not-equal symbol
- Used `{,}` in large numbers for proper comma spacing in LaTeX

## Total Formulas Converted

- **Main equations:** 16 display math equations
- **Inline references:** 50+ inline math expressions
- **Variable definitions:** 30+ variable notations converted to LaTeX
