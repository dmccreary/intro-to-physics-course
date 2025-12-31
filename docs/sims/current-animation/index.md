---
title: Circuit Current Simulation
description: An interactive simulation demonstrating electric current flow through a circuit with battery and resistor. Switch between conventional current and electron flow, and explore Ohm's Law.
image: /sims/current-animation/current-animation.png
og:image: /sims/current-animation/current-animation.png
quality_score: 100
social:
   cards: false
---

# Circuit Current Simulation

<iframe src="main.html" width="100%" height="520px" scrolling="no"></iframe>

[Run the Current Animation MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/3YL2KjiYE)

### Copy This iframe to Your Website

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/current-animation/main.html" width="100%" height="520px"></iframe>
```

## Description

This MicroSim demonstrates electric current flow through a simple circuit containing a battery and resistor. The simulation visualizes current as animated particles flowing through the wires, with the speed determined by Ohm's Law (I = V/R).

**Key Features:**

- **Battery** on the left side showing voltage
- **Resistor** on the right side with adjustable resistance
- **Conventional Current vs Electron Flow** toggle to show both physics conventions
- **Voltage and Resistance sliders** to explore Ohm's Law interactively
- Real-time display of calculated current (I = V/R)

**Color Coding:**

- Red particles: Conventional current (flows from + to -)
- Blue particles: Electron flow (flows from - to +)

## Algorithm

The `drawAnimatedWire(x1, y1, x2, y2, speed, spacing)` function draws a wire segment with animated electrons flowing from point (x1, y1) to point (x2, y2).

### Key Concept: Single Offset with Even Spacing

To ensure electrons remain evenly spaced regardless of animation time, the algorithm:

1. **Calculates a single starting offset** using modulo arithmetic:
   ```javascript
   let firstPos = (animationTime * speed) % spacingPixels;
   ```
   This gives a value between 0 and `spacingPixels` that smoothly increases over time.

2. **Spaces all electrons evenly** from that offset:
   ```javascript
   for (let pos = firstPos; pos < distance; pos += spacingPixels) {
       // draw electron at pos
   }
   ```

### Why This Approach Works

A naive approach might calculate each electron's position independently:
```javascript
// WRONG: causes uneven spacing when electrons wrap
let electronPos = (animationTime * speed + i * spacingPixels) % distance;
```

This fails because when positions wrap around via modulo, the gaps become inconsistent. For example, with distance=300 and spacing=70, you might get gaps of 70, 20, 70, 70 instead of uniform 70px gaps.

The correct approach ensures every gap equals exactly `spacingPixels` because we start from one offset and add a constant increment.

### Animation Flow

As `animationTime` increases:

- `firstPos` smoothly increases from 0 toward `spacingPixels`
- When it reaches `spacingPixels`, it wraps back to 0
- This creates the illusion of electrons continuously entering at the start and exiting at the end of each wire segment

## Controls

- **Voltage Slider**: Adjusts the battery voltage (1-12 V). Higher voltage = faster current.
- **Resistance Slider**: Adjusts the resistor value (1-100 Ω). Higher resistance = slower current.
- **Current Mode Radio Buttons**: Toggle between "Conventional Current" (red, clockwise) and "Electron Flow" (blue, counter-clockwise).
- **Start/Pause Button**: Toggles the animation on and off.
- **Reset Button**: Returns all controls to default values and stops animation.

## Usage in Other Projects

To reuse this animation pattern in your own circuit simulations:

```javascript
// In your draw() function:
drawAnimatedWire(startX, startY, endX, endY, speed, spacing);
```

The function handles:

- Drawing the wire as a black line
- Calculating electron positions based on global `animationTime`
- Rendering electrons as red circles
- Maintaining consistent spacing at all parameter values

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Explain the difference between conventional current and electron flow
2. Apply Ohm's Law (I = V/R) to calculate current in a simple circuit
3. Predict how changes in voltage and resistance affect current flow
4. Describe the relationship between current speed and the amount of current

### Target Audience

High school physics students (grades 10-12) studying electricity and circuits.

### Prerequisites

- Basic understanding of atoms and electrons
- Familiarity with voltage as electrical pressure
- Knowledge of resistance as opposition to current flow

### Activities

1. **Exploration (5 min)**: Run the simulation with default settings. Observe the movement of particles through the circuit.

2. **Conventional vs Electron Flow (10 min)**: Toggle between "Conventional Current" and "Electron Flow" modes. Discuss why physicists use two different models and which direction electrons actually move.

3. **Ohm's Law Investigation (15 min)**:
   - Keep resistance constant, vary voltage. Record observations about particle speed.
   - Keep voltage constant, vary resistance. Record observations.
   - Calculate I = V/R for several combinations and verify the simulation matches.

4. **Prediction Challenge (10 min)**: Before adjusting sliders, predict what will happen to current when:
   - Voltage doubles
   - Resistance is cut in half
   - Both voltage and resistance double

### Assessment

- Can students correctly predict current changes based on voltage/resistance adjustments?
- Can students explain why electrons flow opposite to conventional current?
- Can students calculate current using Ohm's Law and verify with the simulation?

## References

1. [Ohm's Law - Physics Classroom](https://www.physicsclassroom.com/class/circuits/Lesson-3/Ohm-s-Law) - Comprehensive tutorial on Ohm's Law with examples and practice problems.

2. [Conventional Current vs Electron Flow - Electronics Tutorials](https://www.electronics-tutorials.ws/dccircuits/dcp_1.html) - Explains the historical reasons for the two current conventions.

3. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used in this simulation.