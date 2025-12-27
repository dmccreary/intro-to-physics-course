---
title: Ohm's Law Interactive Calculator MicroSim
description: An interactive visualization exploring the relationship between voltage, current, and resistance with animated circuit and V-I characteristic curves.
image: /sims/ohms-law/ohms-law.png
og:image: /sims/ohms-law/ohms-law.png
social:
   cards: false
---

# Ohm's Law Interactive Calculator MicroSim

<iframe src="main.html" height="652px" width="100%" scrolling="no"></iframe>

[Run the Ohm's Law MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/ohms-law/main.html" height="652px" scrolling="no"></iframe>
```

## Description

This MicroSim provides an interactive exploration of Ohm's Law, the fundamental relationship between voltage, current, and resistance in electrical circuits:

$$V = IR$$

### Visual Elements

| Element | Description |
|---------|-------------|
| **Circuit Diagram** | Complete circuit with battery, resistor, ammeter, and voltmeter |
| **Animated Current** | Yellow particles flow around the circuit at speed proportional to current |
| **Resistor Color Bands** | Standard 4-band color code updates with resistance value |
| **V-I Graph** | Real-time characteristic curve showing operating point |
| **Power Indicator** | Wires change color (blue→orange→red) as power increases |

### Three Solve Modes

| Mode | Fixed Values | Calculated Value |
|------|--------------|------------------|
| **Solve for I** | Voltage, Resistance | Current = V/R |
| **Solve for V** | Current, Resistance | Voltage = I×R |
| **Solve for R** | Voltage, Current | Resistance = V/I |

### Controls

| Control | Range | Description |
|---------|-------|-------------|
| Voltage slider | 0-12 V | Adjust battery voltage |
| Resistance slider | 1-1000 Ω | Logarithmic scale for resistance |
| Current slider | 0.001-1 A | Used in Solve for V/R modes |
| Mode selector | 3 options | Choose which variable to calculate |

## Key Concepts

### Ohm's Law

The relationship between voltage (V), current (I), and resistance (R):

$$V = IR \quad \Rightarrow \quad I = \frac{V}{R} \quad \Rightarrow \quad R = \frac{V}{I}$$

**In words:**
- Voltage is the "push" that drives current through a circuit
- Current is the rate of charge flow
- Resistance opposes current flow

### The Ohm's Law Triangle

A helpful memory aid:

```
    V
   ___
  |   |
  I × R
```

Cover the variable you want to find:
- Cover V → see I × R (multiply)
- Cover I → see V/R (divide)
- Cover R → see V/I (divide)

### Power Relationships

Power (P) in watts can be calculated three ways:

$$P = IV = I^2R = \frac{V^2}{R}$$

The MicroSim shows all three calculations giving the same result.

### Resistor Color Code

Standard 4-band resistor color code:

| Color | Digit | Multiplier |
|-------|-------|------------|
| Black | 0 | ×1 |
| Brown | 1 | ×10 |
| Red | 2 | ×100 |
| Orange | 3 | ×1k |
| Yellow | 4 | ×10k |
| Green | 5 | ×100k |
| Blue | 6 | ×1M |
| Violet | 7 | — |
| Gray | 8 | — |
| White | 9 | — |
| Gold | ±5% tolerance |

**Example:** Brown-Black-Red = 10 × 100 = 1000Ω = 1kΩ

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. State Ohm's Law and explain each variable
2. Calculate any variable given the other two
3. Describe how changing voltage affects current (for fixed R)
4. Describe how changing resistance affects current (for fixed V)
5. Calculate power dissipation in a resistor

### Grade Level

High School Physics (Grades 9-12)

### Prerequisites

- Basic understanding of electric circuits
- Familiarity with voltage, current, resistance concepts
- Ability to rearrange algebraic equations

### Duration

25-35 minutes

### Activities

#### Activity 1: Direct Proportionality (8 min)

1. Set mode to "Solve for I"
2. Keep resistance at 100 Ω
3. Vary voltage from 0 to 12 V
4. Observe: Current increases proportionally
5. Record: When V doubles, I doubles (direct proportion)
6. Watch the V-I graph line remain straight through origin

#### Activity 2: Inverse Proportionality (8 min)

1. Set mode to "Solve for I"
2. Keep voltage at 6 V
3. Vary resistance from 10 Ω to 1000 Ω
4. Observe: Current decreases as resistance increases
5. Record: When R doubles, I halves (inverse proportion)
6. Note how the V-I graph slope changes with resistance

#### Activity 3: Power Dissipation (10 min)

1. Set V = 12 V, R = 100 Ω
2. Calculate expected power: P = V²/R = 144/100 = 1.44 W
3. Observe: Wires turn orange/red (high power warning)
4. Reduce voltage to 6 V: P = 36/100 = 0.36 W
5. Wires return to blue (safe power level)
6. Discuss: Why do high-power circuits need thicker wires?

#### Activity 4: Solve Mode Practice (9 min)

**Problem 1:** A circuit has 9 V and draws 30 mA. What's the resistance?
- Set mode to "Solve for R"
- Adjust V = 9 V, I = 30 mA
- Read R = 300 Ω

**Problem 2:** A 470 Ω resistor should carry 10 mA. What voltage is needed?
- Set mode to "Solve for V"
- Adjust R = 470 Ω, I = 10 mA
- Read V = 4.7 V

**Problem 3:** What current flows through a 220 Ω resistor at 5 V?
- Set mode to "Solve for I"
- Adjust V = 5 V, R = 220 Ω
- Read I ≈ 23 mA

### Discussion Questions

1. Why does current flow faster when voltage increases?
2. What happens to current if you double both V and R?
3. Why do phone chargers specify output voltage and current?
4. A 60W light bulb uses more power than a 40W bulb. If they're at the same voltage, which has lower resistance?

### Assessment

- Students correctly calculate I, V, or R given the other two (5 problems)
- Students explain the difference between series and parallel resistance effects
- Students identify safe vs dangerous power levels

## Common Misconceptions

1. **Current is "used up"**: Current is the same throughout a series circuit
2. **Voltage pushes current**: Voltage is potential difference, not a force
3. **High voltage = high current**: Only if resistance is constant
4. **Resistance always wastes energy**: Resistance controls current; sometimes that's useful

## Safety Notes

- High power (> 1W) causes heating—the MicroSim shows this with wire color change
- Real circuits can cause burns or fires if overloaded
- Always check power ratings of components

## Real-World Applications

- **LED circuits**: Calculate resistor needed to limit current
- **Phone chargers**: Provide specific voltage and current
- **Fuses**: Break circuit when current exceeds safe level
- **Dimmer switches**: Vary resistance to control light brightness
- **Heating elements**: Convert electrical energy to heat via resistance

## References

- Physics Classroom: Ohm's Law
- Khan Academy: Circuits and Ohm's Law
- OpenStax Physics: Current and Resistance
