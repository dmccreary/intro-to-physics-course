# Chapter 12 LaTeX Formula Conversion Log

**Date:** 2025-12-30
**File:** `docs/chapters/12-electric-charge-fields/index.md`
**Task:** Convert all plain text formulas and MkDocs superscript syntax to LaTeX format

## Summary

Converted all physics formulas in Chapter 12 (Electric Charge and Electric Fields) from mixed formats (MkDocs superscript `10^-19^`, Unicode superscripts `10⁹`, subscript `q~1~`) to proper LaTeX format.

## Formulas Converted by Section

### The Nature of Electric Charge
- Electron charge: `$e = 1.6 \times 10^{-19}$` coulombs

### Electrical Properties of Materials
- Critical temperature subscript: `$T_c$` (superconductors)

### Coulomb's Law
- Force equation: `$$F = k \frac{|q_1 q_2|}{r^2}$$`
- Coulomb's constant: `$k = 8.99 \times 10^9$ N·m²/C²`
- Variable definitions: `$F$`, `$k$`, `$q_1$`, `$q_2$`, `$r$`
- Gravitational comparison: `$$F_g = G \frac{m_1 m_2}{r^2}$$`

### Comparing Electric and Gravitational Forces
- Electric repulsion: `$F_e \approx 2.3 \times 10^{-8}$ N`
- Gravitational attraction: `$F_g \approx 5.5 \times 10^{-71}$ N`
- Ratio: `$F_e/F_g \approx 4.2 \times 10^{42}$`
- Magnitude comparison: `$10^{42}$`

### Multiple Charges and Vector Addition
- Force vectors: `$\vec{F}_{12}$`, `$\vec{F}_{13}$`
- Total force: `$$\vec{F}_{total} = \vec{F}_{12} + \vec{F}_{13}$$`

### Electric Field
- Field definition: `$$\vec{E} = \frac{\vec{F}}{q_0}$$`
- Point charge field: `$$E = k \frac{|Q|}{r^2}$$`
- Test charge: `$q_0$`

### Field Strength
- Force from field: `$$F = qE$$`
- Inverse square law examples: `$E = kQ/r^2$`, `$E_0/4$`, `$E_0/9$`
- Field strength ranges: `$10^3$ to $10^6$ N/C`
- Air breakdown: `$3 \times 10^6$ N/C`

### Field Strength Table
| Location | Converted Format |
|----------|------------------|
| Near rubbed balloon | `$10^3$ - $10^4$` |
| Inside thundercloud | `$10^4$ - $10^5$` |
| Air breakdown | `$3 \times 10^6$` |
| Inside atoms | `$10^{11}$` |

### Electric Potential Energy
- Two-charge potential energy: `$$U = k \frac{q_1 q_2}{r}$$`
- Energy conditions: `$U > 0$`, `$U < 0$`, `$U = 0$`
- Distance dependence: `$1/r^2$` vs `$1/r$`

### Energy in Electric Fields
- Work equation: `$$W = -\Delta U = -(U_f - U_i)$$`
- Kinetic energy change: `$$\Delta KE = W = -\Delta U$$`
- Work positive: `$W > 0$`

### Force Laws Comparison Table
| Property | Converted Format |
|----------|------------------|
| Gravitational formula | `$F = G \frac{m_1 m_2}{r^2}$` |
| Electric formula | `$F = k \frac{q_1 q_2}{r^2}$` |
| Gravitational constant | `$G = 6.67 \times 10^{-11}$` |
| Coulomb's constant | `$k = 8.99 \times 10^9$` |
| Inverse square | `$1/r^2$` |

### Lightning Section
- Air breakdown field: `$3 \times 10^6$ N/C`

### Practice Problems
- Charge values: `$-2.0 \times 10^{-7}$` C
- Electron charge: `$-1.6 \times 10^{-19}$` C
- Electron mass: `$9.1 \times 10^{-31}$` kg
- Charge labels: `$q_1$`, `$q_2$`, `$q_3$`

## Conversion Notes

### Original Formats Found
1. **MkDocs superscript**: `10^-19^`, `10^9^`, `10^42^`
2. **Unicode superscripts**: `10⁹`, `10⁻¹⁹`
3. **MkDocs subscripts**: `q~1~`, `F~e~`, `T~c~`
4. **Plain text formulas**: `e = 1.6 × 10^-19^`

### LaTeX Formatting Applied
- Used `$...$` for inline math
- Used `$$...$$` for display math equations
- Used `\times` for multiplication in scientific notation
- Used `\frac{}{}` for fractions
- Used `\vec{}` for vector notation
- Used subscripts: `$q_1$`, `$F_e$`, `$T_c$`
- Used proper exponent grouping: `$10^{-19}$` not `$10^-19$`

## Total Conversions

- **Display equations:** 8
- **Inline math expressions:** 50+
- **Scientific notation values:** 20+
- **Subscript conversions:** 15+
- **Table cell conversions:** 12
