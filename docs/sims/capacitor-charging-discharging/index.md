---
title: Capacitor Charging and Discharging
description: Interactive simulation showing how capacitors store and release energy in RC circuits with exponential charging/discharging behavior
image: /sims/capacitor-charging-discharging/capacitor-charging-discharging.png
og:image: /sims/capacitor-charging-discharging/capacitor-charging-discharging.png
twitter:image: /sims/capacitor-charging-discharging/capacitor-charging-discharging.png
quality_score: 85
---

# Capacitor Charging and Discharging

<iframe src="main.html" width="100%" height="720px" scrolling="no"></iframe>

[Run Capacitor Charging and Discharging MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/capacitor-charging-discharging/main.html" width="100%" height="720px" scrolling="no"></iframe>
```

## About This MicroSim

This simulation visualizes the behavior of a capacitor in an RC (resistor-capacitor) circuit during charging and discharging cycles. Students can observe the exponential nature of voltage and current changes, and understand the significance of the time constant (τ = RC).

The simulation includes:

- **Circuit View**: An RC circuit schematic with battery, resistor, capacitor, and three-position switch
- **Capacitor Detail**: Close-up view showing charge accumulation on plates and electric field lines
- **Measurement Panel**: Real-time values for voltage, current, charge, and time constant
- **Graphs**: Dual plots showing voltage and current vs. time with time constant markers

## How to Use

1. **Adjust Circuit Parameters**: Use the sliders to change battery voltage (1-12V), resistance (100Ω-100kΩ), and capacitance (1-1000μF)
2. **Control the Switch**: Click "Charge" to connect the battery and charge the capacitor, "Discharge" to release stored energy, or "Off" to pause
3. **Observe the Graphs**: Watch real-time plots of voltage and current vs. time, with time constant markers (1τ through 5τ)
4. **Monitor Measurements**: The display panel shows current values of voltage, current, charge, and percent charged

## Key Concepts Demonstrated

- **Time Constant (τ = RC)**: The characteristic time for charging/discharging - determines how quickly the capacitor responds
- **Exponential Charging**: Voltage follows V(t) = V₀(1 - e^(-t/τ)) during charging
- **Exponential Discharging**: Voltage follows V(t) = V₀e^(-t/τ) during discharging
- **Current Decay**: Current decreases exponentially as I(t) = (V₀/R)e^(-t/τ)
- **Energy Storage**: Charge accumulates on capacitor plates, creating an electric field between them
- **Time Constant Milestones**: At 1τ (63.2% charged), 3τ (95% charged), 5τ (99.3% charged)

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. **Explain** the function of a capacitor in storing electrical energy
2. **Calculate** the time constant (τ = RC) for an RC circuit
3. **Predict** how changing R or C affects charging/discharging rates
4. **Interpret** voltage and current graphs during capacitor charging and discharging
5. **Apply** exponential equations to describe capacitor behavior

### Target Audience

High school physics students (Grades 10-12) studying electricity and circuits

### Prerequisites

- Understanding of voltage, current, and resistance
- Familiarity with Ohm's Law (V = IR)
- Basic knowledge of circuit diagrams
- Exposure to exponential functions

### Suggested Activities

**Activity 1: Exploring Time Constant (10 minutes)**

1. Set R = 10 kΩ and C = 100 μF (τ = 1 second)
2. Click "Charge" and observe how long it takes to reach 63% voltage
3. Verify this matches 1τ on the graph
4. Repeat with R = 20 kΩ - how does doubling R affect charging time?

**Activity 2: Parameter Investigation (15 minutes)**

1. Keep V constant at 9V
2. Systematically vary R and record time to reach 90% charge
3. Systematically vary C and record time to reach 90% charge
4. Create a data table and identify the relationship between τ and R×C

**Activity 3: Discharge Analysis (10 minutes)**

1. Fully charge the capacitor (wait for 5τ)
2. Click "Discharge" and observe the current graph
3. Note that current flows in the opposite direction
4. Compare the discharge curve shape to the charging curve

**Activity 4: Real-World Applications (Discussion)**

- Camera flashes (rapid discharge of stored energy)
- Computer power supplies (smoothing voltage)
- Heart defibrillators (large capacitor discharge)
- Touch screens (capacitance changes with touch)

### Assessment Questions

1. If R = 5 kΩ and C = 200 μF, what is the time constant?
2. A capacitor reaches 95% charge after 6 seconds. What is its time constant?
3. Why does current decrease as a capacitor charges?
4. Explain why the capacitor never reaches exactly 100% charge (asymptotic behavior)
5. How would you design an RC circuit with a 0.5-second time constant?

## References

1. [RC Circuit - HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/electric/capchg.html) - Georgia State University - Comprehensive explanation of RC charging with derivations

2. [Capacitor Charging and Discharging - Electronics Tutorials](https://www.electronics-tutorials.ws/rc/rc_1.html) - Practical tutorial on RC time constants with worked examples

3. [Khan Academy: RC Natural Response](https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic/ee-natural-and-forced-response/v/rc-natural-response) - Video explanation of capacitor charging behavior

4. [PHET RC Circuit Simulation](https://phet.colorado.edu/en/simulation/legacy/capacitor-lab) - University of Colorado - Related interactive simulation for comparison

5. [The Physics Classroom: Capacitors](https://www.physicsclassroom.com/class/circuits/Lesson-5/What-is-a-Capacitor) - Student-friendly explanation of capacitor fundamentals
