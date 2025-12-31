---
quality_score: 85
title: Series vs Parallel Circuit Comparison MicroSim
description: An interactive side-by-side comparison of series and parallel circuits showing current flow, voltage distribution, and component failure behavior.
image: /sims/series-parallel/series-parallel.png
og:image: /sims/series-parallel/series-parallel.png
social:
   cards: false
---

# Series vs Parallel Circuit Comparison MicroSim

<iframe src="main.html" height="652px" width="100%" scrolling="no"></iframe>

[Run the Series vs Parallel MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/series-parallel/main.html" height="652px" scrolling="no"></iframe>
```

## Description

This MicroSim provides a side-by-side comparison of series and parallel circuits, demonstrating how current, voltage, and power distribute differently in each configuration.

### Visual Elements

| Element | Series Circuit | Parallel Circuit |
|---------|----------------|------------------|
| **Current Flow** | Same particles everywhere | More particles in low-R branches |
| **Bulb Brightness** | May differ (if R differs) | Proportional to power in each branch |
| **Component Failure** | All components stop | Other branches continue |

### Key Differences Shown

| Property | Series | Parallel |
|----------|--------|----------|
| **Current** | Same through all: I = I₁ = I₂ = I₃ | Divides: I = I₁ + I₂ + I₃ |
| **Voltage** | Divides: V = V₁ + V₂ + V₃ | Same across all: V = V₁ = V₂ = V₃ |
| **Resistance** | Adds: R = R₁ + R₂ + R₃ | Reciprocals: 1/R = 1/R₁ + 1/R₂ + 1/R₃ |
| **If one fails** | Entire circuit stops | Others continue working |

### Controls

| Control | Range | Description |
|---------|-------|-------------|
| Voltage | 1-12 V | Battery voltage for both circuits |
| R₁, R₂, R₃ | 10-500 Ω | Individual resistor values |
| Show as Light Bulbs | On/Off | Toggle between resistor and bulb display |
| Remove R₁/R₂/R₃ | Buttons | Simulate component failure |
| Reset All | Button | Restore default values |

## Key Concepts

### Series Circuits

Components connected end-to-end in a single path:

$$R_{total} = R_1 + R_2 + R_3$$

**Characteristics:**
- Current is the **same** through every component
- Voltage **divides** among components (proportional to resistance)
- Total resistance is the **sum** of all resistances
- If one component fails (opens), **entire circuit stops**

### Parallel Circuits

Components connected across the same two points:

$$\frac{1}{R_{total}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3}$$

**Characteristics:**
- Voltage is the **same** across all branches
- Current **divides** among branches (more current through lower resistance)
- Total resistance is **less than** smallest individual resistance
- If one branch fails, **others continue operating**

### Why This Matters

**Series applications:**
- Voltage dividers
- Current-limiting resistors
- Old-style Christmas lights (one burns out, all go dark)

**Parallel applications:**
- House wiring (outlets independent)
- Modern Christmas lights
- Most practical circuits

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Distinguish between series and parallel circuit configurations
2. Predict how current distributes in each type
3. Predict how voltage distributes in each type
4. Calculate total resistance for each configuration
5. Explain what happens when a component fails in each type

### Grade Level

High School Physics (Grades 9-12)

### Prerequisites

- Understanding of Ohm's Law (V = IR)
- Basic circuit concepts (current, voltage, resistance)

### Duration

30-40 minutes

### Activities

#### Activity 1: Current Distribution (10 min)

1. Set all resistors equal: R₁ = R₂ = R₃ = 100 Ω
2. Set voltage to 9 V
3. Observe particle flow in both circuits:
   - **Series**: Particles move at same speed everywhere
   - **Parallel**: Particles move at same speed in all three branches
4. Now change R₂ to 200 Ω:
   - **Series**: Still same speed everywhere (same current)
   - **Parallel**: Fewer particles in R₂ branch (less current)

#### Activity 2: Voltage Distribution (8 min)

1. Keep R₁ = R₂ = R₃ = 100 Ω, V = 9 V
2. Read voltage drops in series circuit:
   - Each resistor has V = 3 V (9 V ÷ 3)
   - Total = 3 + 3 + 3 = 9 V ✓
3. Now set R₁ = 50 Ω, R₂ = 100 Ω, R₃ = 150 Ω:
   - Voltage divides proportionally to resistance
   - Higher R → higher voltage drop
4. In parallel: All branches always show full 9 V

#### Activity 3: Total Resistance (8 min)

1. Equal resistors: R₁ = R₂ = R₃ = 100 Ω
   - **Series**: R_total = 300 Ω
   - **Parallel**: R_total = 33.3 Ω (100 ÷ 3)
2. Verify with Ohm's Law:
   - Series: I = 9 V ÷ 300 Ω = 30 mA
   - Parallel: I = 9 V ÷ 33.3 Ω = 270 mA
3. Observe: Parallel circuit draws 9× more current!

#### Activity 4: Component Failure (10 min)

1. Start with all three resistors at 100 Ω
2. Click "Remove R₂" for series circuit:
   - All bulbs go dark (circuit is OPEN)
   - Current = 0
   - This is why old Christmas lights all went out when one bulb burned out
3. Click "Reset All"
4. Click "Remove R₂" for parallel circuit:
   - R₁ and R₃ bulbs stay lit
   - They get slightly brighter (more current available)
   - Total current decreases, but remaining branches work
5. This is why houses use parallel wiring!

### Discussion Questions

1. Why does total resistance decrease when you add more resistors in parallel?
2. A string of 100 lights in series needs higher voltage than 100 lights in parallel. Why?
3. If you want to protect a circuit from total failure, which arrangement is safer?
4. Why do car headlights use parallel wiring?

### Assessment

- Students correctly identify which property (I or V) is constant in each circuit type
- Students calculate R_total for both configurations
- Students predict bulb brightness changes when resistance changes
- Students explain the practical advantage of parallel wiring

## Common Misconceptions

1. **"Current gets used up"**: Current is the same at all points in a series circuit
2. **"Parallel always has more current"**: Only true for same resistances; depends on values
3. **"Voltage adds in parallel"**: No, voltage is the same across all parallel branches
4. **"More resistors = more resistance"**: Only in series; parallel can decrease total R

## Real-World Examples

### Series Applications
- Voltage dividers in electronics
- Current-limiting resistors for LEDs
- Fuses (intentionally weak link in series)

### Parallel Applications
- Home electrical outlets
- USB hubs
- Car electrical system
- Computer power supplies

### Combination Circuits
Most real circuits use both:
- Series resistors for current limiting
- Parallel branches for independent operation

## Formulas Reference

### Series Circuit
$$R_{total} = R_1 + R_2 + R_3 + ...$$
$$I_{total} = I_1 = I_2 = I_3$$
$$V_{total} = V_1 + V_2 + V_3$$

### Parallel Circuit
$$\frac{1}{R_{total}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3} + ...$$
$$I_{total} = I_1 + I_2 + I_3$$
$$V_{total} = V_1 = V_2 = V_3$$

### Special Case: Two Parallel Resistors
$$R_{total} = \frac{R_1 \times R_2}{R_1 + R_2}$$

### Special Case: n Equal Resistors in Parallel
$$R_{total} = \frac{R}{n}$$

## References

- Physics Classroom: Series and Parallel Circuits
- Khan Academy: Resistors in Series and Parallel
- OpenStax Physics: Resistors in Series and Parallel
