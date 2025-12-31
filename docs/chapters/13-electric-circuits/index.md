# Electric Circuits

## Summary

This chapter explores how electric charge flows through circuits to power our modern world. Building on your understanding of electric charge, fields, and potential from Chapter 12, you'll learn how components like resistors, capacitors, and inductors control current flow. Ohm's Law provides the fundamental relationship between voltage, current, and resistance. You'll discover the differences between DC and AC power sources and understand how batteries store and release energy. Practical applications include solar-powered systems that charge batteries during daylight and provide illumination at night, and electric motors that convert electrical energy into mechanical motion. These concepts form the foundation for understanding all electrical and electronic technology.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. Electric Current
2. Current Flow
3. Conventional Current
4. Electron Flow
5. Resistance
6. Ohm's Law
7. Resistors
8. Capacitance
9. Capacitors
10. Inductance
11. Inductors
12. DC Power Sources
13. AC Power Sources
14. Batteries
15. Electric Power
16. Series Circuits
17. Parallel Circuits
18. Kirchhoff's Laws
19. Solar Cells
20. Electric Motors

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Scientific Foundations and Mathematical Tools](../01-scientific-foundations/index.md)
- [Chapter 6: Work, Energy, and Power](../06-work-energy-power/index.md)
- [Chapter 12: Electric Charge and Fields](../12-electric-charge-fields/index.md)

---

## Introduction to Electric Circuits

Every time you flip a light switch, charge your phone, or start a car, you're using electric circuits. A circuit is a closed path through which electric charge can flow, carrying energy from a source (like a battery or power plant) to devices that use that energy (like lights, motors, or computers). Understanding circuits is essential for comprehending how virtually all modern technology works.

In this chapter, we'll explore the fundamental components and principles that govern electric circuits, from simple flashlight circuits to sophisticated solar power systems.

## Electric Current

### What Is Electric Current?

**Electric current** is the flow of electric charge through a conductor. Just as water current describes how much water flows past a point per unit time, electric current describes how much charge flows past a point per unit time.

Mathematically, current is defined as:

$$I = \frac{\Delta Q}{\Delta t}$$

where:

- I = current (in amperes, A)
- ΔQ = amount of charge that flows (in coulombs, C)
- Δt = time interval (in seconds, s)

One ampere equals one coulomb of charge flowing past a point per second: 1 A = 1 C/s.

### Current Flow vs. Electron Flow

There's an important historical distinction in how we describe current:

**Conventional current** is defined as the direction positive charges would flow—from the positive terminal of a battery, through the circuit, to the negative terminal. This convention was established before scientists discovered that electrons (negative charges) are what actually move in metal wires.

**Electron flow** is the actual movement of electrons in a conductor—from the negative terminal, through the circuit, to the positive terminal. Electrons flow opposite to the conventional current direction.

Both descriptions are valid and give the same results for circuit analysis. Most physics and engineering use conventional current because it simplifies calculations.

#### Diagram: Current Flow Animation MicroSim

<iframe src="../../sims/current-animation/main.html" width="100%" height="502px" scrolling="no" loading="lazy"></iframe>

[View detailed explanation and educational context](../../sims/current-animation/index.md)

<details markdown="1">
    <summary>Current Flow Animation MicroSim</summary>
    **Status:** done
    **TODO:** human-review-needed (existing sim is simpler than specification - lacks conventional vs electron flow toggle)

    Type: microsim

    Learning objective: Visualize the difference between conventional current and electron flow in a simple circuit

    Canvas layout (900x500px):
    - Main circuit view (700x500): Animated circuit with flowing charges
    - Control panel (200x500): Toggle switches and current display

    Visual elements:
    - Simple circuit with battery, wire loop, and light bulb
    - Battery shown with + and - terminals clearly labeled
    - Animated particles representing charge carriers
    - Wire drawn as thick gray path with rounded corners
    - Light bulb that glows brighter with higher current
    - Arrows showing direction of flow

    Interactive controls:
    - Toggle: "Show conventional current" / "Show electron flow"
    - Slider: Current magnitude (0.1 to 5.0 A)
    - Checkbox: "Show charge values"
    - Button: "Pause/Play animation"
    - Display: Current value in amperes

    Animation behavior:
    - Conventional current mode: Red (+) particles flow from + to - terminal
    - Electron flow mode: Blue (-) particles flow from - to + terminal
    - Particle speed proportional to current magnitude
    - Particles evenly distributed around circuit
    - Light bulb brightness proportional to current
    - Smooth particle motion using p5.js animation

    Default parameters:
    - Mode: Conventional current
    - Current: 1.0 A
    - Animation: Playing

    Implementation notes:
    - Use p5.js for rendering and animation
    - Store particle positions in array, update with velocity each frame
    - Wrap particles around circuit path using modular arithmetic
    - Draw circuit path as series of bezier curves for smooth corners
    - Light bulb glow using radial gradient with alpha based on current
</details>

## Resistance and Ohm's Law

### What Is Resistance?

**Resistance** is a measure of how much a material opposes the flow of electric current. Think of it like friction for electricity—just as friction opposes mechanical motion, resistance opposes current flow.

Resistance is measured in ohms (Ω), named after German physicist Georg Ohm. Materials with high resistance (insulators) allow very little current to flow, while materials with low resistance (conductors) allow current to flow easily.

Factors affecting resistance:

- **Material**: Copper has low resistance; rubber has high resistance
- **Length**: Longer wires have more resistance (R ∝ L)
- **Cross-sectional area**: Thicker wires have less resistance (R ∝ 1/A)
- **Temperature**: Most metals have higher resistance when hot

The resistance of a wire is given by:

$$R = \rho \frac{L}{A}$$

where ρ (rho) is the resistivity of the material, L is length, and A is cross-sectional area.

### Ohm's Law

**Ohm's Law** is the fundamental relationship governing electric circuits:

$$V = IR$$

where:

- V = voltage (potential difference) across a component (in volts, V)
- I = current through the component (in amperes, A)
- R = resistance of the component (in ohms, Ω)

This simple equation can be rearranged to solve for any variable:

- To find voltage: V = IR
- To find current: I = V/R
- To find resistance: R = V/I

Ohm's Law tells us that for a given resistance, the current is directly proportional to the applied voltage. Double the voltage, and you double the current.

#### Diagram: Ohm's Law Interactive Calculator MicroSim

<iframe src="../../sims/ohms-law/main.html" width="100%" height="652px" scrolling="no" loading="lazy"></iframe>

[View detailed explanation and educational context](../../sims/ohms-law/index.md)

<details markdown="1">
    <summary>Ohm's Law Interactive Calculator MicroSim</summary>
    **Status:** done

    Type: microsim

    Learning objective: Explore the relationship between voltage, current, and resistance through interactive manipulation

    Canvas layout (900x600px):
    - Circuit visualization (600x400): Shows battery, resistor, and ammeter
    - Control panel (300x600): Three linked sliders and displays
    - Graph area (600x200): Real-time V-I characteristic curve

    Visual elements:
    - Simple circuit with adjustable battery voltage
    - Resistor shown with color bands indicating value
    - Animated current flow (particle speed reflects current magnitude)
    - Ammeter displaying current reading
    - Voltmeter across resistor
    - V-I graph with current point highlighted

    Interactive controls:
    - Slider: Voltage (0 to 12 V)
    - Slider: Resistance (1 to 1000 Ω, logarithmic scale)
    - Calculated display: Current (automatically updated)
    - Radio buttons: "Solve for V", "Solve for I", "Solve for R"
    - In "Solve for" modes, that variable becomes calculated while others are adjustable

    Graph features:
    - X-axis: Voltage (0-12 V)
    - Y-axis: Current (0-12 A, scaled appropriately)
    - Line showing V = IR relationship for current resistance
    - Moving dot showing current operating point
    - Shaded "power dissipation" region under curve

    Animation behavior:
    - Current particles speed changes with I value
    - Resistor color bands update with resistance value
    - Wire "heats up" (color shifts to orange/red) at high power
    - Graph updates in real-time as sliders move

    Default parameters:
    - Voltage: 6 V
    - Resistance: 100 Ω
    - Mode: Solve for I

    Implementation notes:
    - Use p5.js for all rendering
    - Link sliders mathematically: changing V or R updates I display
    - Color-code resistor using standard 4-band color code
    - Power warning when P > 1 W (wire color change)
</details>

### Resistors

**Resistors** are components designed to provide a specific amount of resistance in a circuit. They're used to:

- Limit current to safe levels
- Divide voltage between components
- Set timing in RC circuits
- Convert electrical energy to heat

Resistors are marked with colored bands that indicate their resistance value and tolerance. The standard color code uses:

| Color | Digit | Multiplier |
|-------|-------|------------|
| Black | 0 | ×1 |
| Brown | 1 | ×10 |
| Red | 2 | ×100 |
| Orange | 3 | ×1,000 |
| Yellow | 4 | ×10,000 |
| Green | 5 | ×100,000 |
| Blue | 6 | ×1,000,000 |
| Violet | 7 | — |
| Gray | 8 | — |
| White | 9 | — |
| Gold | — | ×0.1 (±5%) |
| Silver | — | ×0.01 (±10%) |

## Capacitance and Capacitors

### What Is Capacitance?

**Capacitance** is the ability of a component to store electric charge. A device with high capacitance can store more charge at a given voltage than one with low capacitance.

Capacitance is defined as:

$$C = \frac{Q}{V}$$

where:

- C = capacitance (in farads, F)
- Q = stored charge (in coulombs, C)
- V = voltage across the capacitor (in volts, V)

One farad is a very large capacitance—most practical capacitors are measured in microfarads (μF), nanofarads (nF), or picofarads (pF).

### Capacitors

A **capacitor** consists of two conducting plates separated by an insulating material (dielectric). When voltage is applied, positive charge accumulates on one plate and negative charge on the other, creating an electric field between the plates that stores energy.

The capacitance of a parallel-plate capacitor is:

$$C = \epsilon_0 \epsilon_r \frac{A}{d}$$

where:

- ε₀ = permittivity of free space (8.85 × 10⁻¹² F/m)
- εᵣ = relative permittivity (dielectric constant) of the insulator
- A = plate area
- d = plate separation

#### Diagram: Capacitor Charging and Discharging MicroSim

<iframe src="../../sims/capacitor-charging-discharging/main.html" width="100%" height="740px" scrolling="no" loading="lazy"></iframe>

[Open Capacitor Charging MicroSim in Fullscreen](../../sims/capacitor-charging-discharging/main.html){ .md-button .md-button--primary }

This simulation demonstrates the exponential charging and discharging behavior of capacitors in RC circuits. Use the sliders to adjust voltage (1-12V), resistance (100Ω-100kΩ), and capacitance (1-1000μF). Click "Charge" or "Discharge" to observe how the time constant τ = RC determines the rate of voltage and current changes.

### Energy Storage in Capacitors

Capacitors store energy in the electric field between their plates. The energy stored is:

$$U = \frac{1}{2}CV^2 = \frac{1}{2}QV = \frac{Q^2}{2C}$$

This stored energy can be released quickly (as in camera flashes) or slowly (as in power supply filtering). Capacitors are essential in:

- Power supply smoothing
- Timing circuits
- Energy storage (supercapacitors)
- Signal filtering
- Motor starting circuits

## Inductance and Inductors

### What Is Inductance?

**Inductance** is a property of a conductor that opposes changes in current. When current through a coil changes, it creates a changing magnetic field, which in turn induces a voltage that opposes the change in current (Lenz's Law).

Inductance is measured in henrys (H), named after American physicist Joseph Henry.

The induced voltage across an inductor is:

$$V = L\frac{dI}{dt}$$

where L is the inductance and dI/dt is the rate of change of current.

### Inductors

An **inductor** is typically a coil of wire, often wound around a magnetic core. Inductors:

- Oppose changes in current (like electrical inertia)
- Store energy in magnetic fields
- Are used in filters, transformers, and motors
- Block high-frequency AC while passing DC

The inductance of a solenoid (coil) is:

$$L = \mu_0 \mu_r \frac{N^2 A}{l}$$

where N is the number of turns, A is the cross-sectional area, l is the length, and μ is the permeability.

#### Diagram: Inductor Behavior in DC Circuits MicroSim

<details markdown="1">
    <summary>Inductor Behavior in DC Circuits MicroSim</summary>
    **Status:** INCOMPLETE
    TODO: human-review-needed
    Type: microsim

    Learning objective: Demonstrate how inductors oppose changes in current and store energy in magnetic fields

    Canvas layout (900x700px):
    - Circuit view (600x400): RL circuit with switch
    - Inductor detail view (300x400): Coil with magnetic field visualization
    - Graph area (900x300): Current and voltage vs. time

    Visual elements:
    - Battery with voltage label
    - Resistor with value label
    - Inductor shown as coiled wire with magnetic field lines
    - Animated magnetic field (concentric circles around coil)
    - Current flow animation (particles in wire)
    - Switch for connecting/disconnecting battery

    Interactive controls:
    - Slider: Battery voltage (1 to 12 V)
    - Slider: Resistance (10 Ω to 1 kΩ)
    - Slider: Inductance (1 mH to 1 H)
    - Toggle: Switch on/off
    - Button: Reset
    - Display: Time constant τ = L/R
    - Display: Current I and stored energy

    Animation behavior:
    - Switch on: Current rises slowly (inductor opposes change)
    - Magnetic field builds up around coil
    - Current approaches V/R exponentially with time constant L/R
    - Switch off: Current tries to continue (inductor opposes decrease)
    - Without proper circuit, this can cause voltage spike (shown as spark)
    - With flyback diode: Current decays through diode

    Graph features:
    - Current vs. time: exponential rise/fall
    - Inductor voltage vs. time: high at switch, decays to zero
    - Markers at τ, 2τ, 3τ showing 63%, 86%, 95% of final value

    Equations displayed:
    - Current rise: I(t) = (V/R)(1 - e^(-Rt/L))
    - Current fall: I(t) = I₀e^(-Rt/L)
    - Energy stored: U = ½LI²

    Default parameters:
    - Voltage: 6 V
    - Resistance: 100 Ω
    - Inductance: 100 mH

    Implementation notes:
    - Use p5.js for rendering
    - Magnetic field lines as animated concentric circles
    - Field intensity (line density) proportional to current
    - Spark effect using random bright yellow particles
</details>

## DC and AC Power Sources

### DC Power Sources

**Direct current (DC)** flows in one direction only, maintaining a constant polarity. DC sources include:

- **Batteries**: Convert chemical energy to electrical energy
- **Solar cells**: Convert light energy to electrical energy
- **DC power supplies**: Convert AC to DC
- **Fuel cells**: Convert hydrogen and oxygen to electricity

DC is used in:

- Electronic devices (phones, computers, LED lights)
- Electric vehicles
- Battery-powered tools
- Low-voltage lighting systems

### AC Power Sources

**Alternating current (AC)** periodically reverses direction, typically following a sinusoidal pattern. The voltage varies as:

$$V(t) = V_0 \sin(2\pi ft)$$

where V₀ is the peak voltage and f is the frequency (60 Hz in North America, 50 Hz in most other countries).

AC advantages:

- Easy to transform to different voltages
- Efficient for long-distance transmission
- Simple to generate with rotating machinery

AC is used in:

- Household power distribution
- Industrial motors
- Power transmission lines
- Many appliances (refrigerators, air conditioners)

#### Diagram: DC vs AC Waveform Comparison MicroSim

<details markdown="1">
    <summary>DC vs AC Waveform Comparison MicroSim</summary>
    **Status:** INCOMPLETE
    TODO: human-review-needed
    Type: microsim

    Learning objective: Compare DC and AC power sources and understand key AC parameters (amplitude, frequency, RMS)

    Canvas layout (900x600px):
    - Waveform display (900x400): Side-by-side DC and AC waveforms
    - Control panel (900x200): Sliders and calculated values

    Visual elements:
    - Left graph: DC voltage (horizontal line)
    - Right graph: AC voltage (sine wave)
    - Time axis with grid lines
    - Voltage axis with positive and negative regions
    - RMS value line overlaid on AC waveform
    - Peak and peak-to-peak annotations
    - Animated "electron" showing instantaneous current direction

    Interactive controls:
    - Slider: DC voltage (0 to 12 V)
    - Slider: AC peak voltage (0 to 170 V)
    - Slider: AC frequency (1 to 120 Hz)
    - Checkbox: "Show RMS value"
    - Checkbox: "Show instantaneous power"
    - Toggle: "Sync animations to frequency"

    Calculated displays:
    - V_rms = V_peak / √2
    - Period T = 1/f
    - Comparison: "A 120V AC outlet has V_peak = 170V"

    Animation behavior:
    - DC side: Steady electron drift in one direction
    - AC side: Electrons oscillate back and forth
    - Waveform scrolls left to show time progression
    - Current direction arrows reverse with AC polarity
    - Power graph (if shown) always positive for resistive load

    Special features:
    - Overlay mode: Show DC and equivalent AC RMS on same axes
    - Power comparison: Same power delivery at V_dc = V_ac(rms)

    Default parameters:
    - DC voltage: 6 V
    - AC peak voltage: 8.5 V (6 V RMS)
    - Frequency: 60 Hz

    Implementation notes:
    - Use p5.js for waveform rendering
    - Scrolling waveform using circular buffer or array shift
    - Draw sine wave point by point: y = amplitude * sin(2πft)
    - RMS line as dashed horizontal at V_peak/√2
</details>

## Batteries and Energy Storage

### How Batteries Work

A **battery** is an electrochemical device that converts chemical energy into electrical energy through oxidation-reduction (redox) reactions. A battery consists of:

- **Anode** (negative electrode): Where oxidation occurs (electrons released)
- **Cathode** (positive electrode): Where reduction occurs (electrons absorbed)
- **Electrolyte**: Allows ion flow between electrodes while preventing electron flow
- **Separator**: Prevents direct contact between electrodes

When connected to a circuit, electrons flow from anode to cathode through the external circuit (providing useful work), while ions flow through the electrolyte to complete the circuit internally.

### Types of Batteries

| Type | Voltage | Rechargeable | Energy Density | Common Uses |
|------|---------|--------------|----------------|-------------|
| Alkaline | 1.5 V | No | Medium | Remote controls, toys |
| Lithium-ion | 3.7 V | Yes | High | Phones, laptops, EVs |
| Lead-acid | 2.0 V/cell | Yes | Low | Cars, backup power |
| NiMH | 1.2 V | Yes | Medium | Rechargeable AAs |
| LiFePO₄ | 3.2 V | Yes | Medium-High | Solar storage, EVs |

### Battery Capacity and Energy

Battery capacity is measured in ampere-hours (Ah) or milliampere-hours (mAh):

$$\text{Capacity (Ah)} = \text{Current (A)} \times \text{Time (h)}$$

A 2000 mAh battery can theoretically deliver 2000 mA for 1 hour, or 1000 mA for 2 hours, or 500 mA for 4 hours.

Energy stored is:

$$E = \text{Capacity} \times \text{Voltage}$$

A 3.7 V, 2000 mAh battery stores: E = 3.7 V × 2 Ah = 7.4 Wh

#### Diagram: Battery Internal Structure and Operation MicroSim

<details markdown="1">
    <summary>Battery Internal Structure and Operation MicroSim</summary>
    **Status:** INCOMPLETE
    TODO: human-review-needed
    Type: microsim

    Learning objective: Understand the electrochemical processes inside batteries and how they produce electric current

    Canvas layout (900x600px):
    - Battery cross-section (500x500): Detailed internal view
    - External circuit (400x300): Load connected to battery
    - Status panel (400x300): Voltage, current, charge level

    Visual elements:
    - Cutaway view of cylindrical or rectangular battery
    - Anode (labeled, colored gray/dark)
    - Cathode (labeled, colored lighter)
    - Electrolyte region (translucent blue)
    - Ion movement animated within battery (+ ions moving toward cathode)
    - Electron flow in external circuit
    - Chemical equation annotations

    Interactive controls:
    - Slider: Load resistance (1 Ω to 1 MΩ)
    - Toggle: Connect/disconnect load
    - Slider: Simulation speed
    - Dropdown: Battery type (Alkaline, Li-ion, Lead-acid)
    - Button: "Recharge" (for rechargeable types)

    Animation behavior:
    - Discharge mode:
      - Electrons flow from anode through external circuit to cathode
      - Positive ions flow through electrolyte from anode to cathode
      - Anode material slowly "dissolves" (visual shrinking)
      - Cathode material "grows"
      - Voltage slowly decreases as battery depletes
    - Charge mode (rechargeable):
      - Reverse process with external power supply
      - Electrons forced back to anode
      - Ions return through electrolyte

    Status displays:
    - Terminal voltage (decreases under load)
    - Current draw
    - State of charge (% remaining)
    - Internal resistance effect

    Chemical reactions shown:
    - Li-ion: Li ⇌ Li⁺ + e⁻ (anode)
    - Electrons flow through circuit, ions through electrolyte

    Default parameters:
    - Battery type: Li-ion
    - Load: 100 Ω
    - Initial charge: 100%

    Implementation notes:
    - Use p5.js for all animations
    - Particle system for electrons (blue) and ions (red/orange)
    - State of charge affects animation speed and voltage display
    - Cutaway effect using clipping mask
</details>

## Electric Power

### Power in Electric Circuits

**Electric power** is the rate at which electrical energy is converted to other forms (heat, light, motion, etc.). Power is given by:

$$P = IV$$

Using Ohm's Law, we can also write:

$$P = I^2R = \frac{V^2}{R}$$

Power is measured in watts (W), where 1 watt = 1 joule per second.

Examples of power consumption:

| Device | Typical Power |
|--------|--------------|
| LED bulb | 10 W |
| Laptop | 50 W |
| Refrigerator | 150 W |
| Hair dryer | 1500 W |
| Electric car charger | 7000-19000 W |

### Energy and Cost

Electrical energy is typically billed in kilowatt-hours (kWh):

$$\text{Energy (kWh)} = \text{Power (kW)} \times \text{Time (h)}$$

If electricity costs $0.15 per kWh, running a 1500 W hair dryer for 15 minutes costs:

$$\text{Cost} = 1.5 \text{ kW} \times 0.25 \text{ h} \times \$0.15/\text{kWh} = \$0.056$$

## Series and Parallel Circuits

### Series Circuits

In a **series circuit**, components are connected end-to-end, so the same current flows through all components.

Key properties of series circuits:

- **Current**: Same through all components: I~total~ = I~1~ = I~2~ = I~3~
- **Voltage**: Divides among components: V~total~ = V~1~ + V~2~ + V~3~
- **Resistance**: Adds directly: R~total~ = R~1~ + R~2~ + R~3~

If one component fails (opens), the entire circuit stops working—like old Christmas lights.

### Parallel Circuits

In a **parallel circuit**, components are connected across the same two points, so they all have the same voltage across them.

Key properties of parallel circuits:

- **Voltage**: Same across all components: V~total~ = V~1~ = V~2~ = V~3~
- **Current**: Divides among branches: I~total~ = I~1~ + I~2~ + I~3~
- **Resistance**: Combines as reciprocals: 1/R~total~ = 1/R~1~ + 1/R~2~ + 1/R~3~

If one component fails, other branches continue operating—like modern house wiring.

#### Diagram: Series vs Parallel Circuit Comparison MicroSim

<iframe src="../../sims/series-parallel/main.html" width="100%" height="652px" scrolling="no" loading="lazy"></iframe>

[View detailed explanation and educational context](../../sims/series-parallel/index.md)

<details markdown="1">
    <summary>Series vs Parallel Circuit Comparison MicroSim</summary>
    **Status:** done

    Type: microsim

    Learning objective: Compare current, voltage, and power distribution in series vs parallel circuits

    Canvas layout (900x700px):
    - Series circuit (450x500): Three resistors in series with battery
    - Parallel circuit (450x500): Three resistors in parallel with battery
    - Comparison table (900x200): Side-by-side values

    Visual elements:
    - Each circuit shows:
      - Battery with labeled voltage
      - Three resistors (can be different values)
      - Ammeter symbols showing current at each point
      - Voltmeter symbols showing voltage across each component
      - Animated current flow (particle density shows current magnitude)
      - Brightness indicators (bulbs instead of resistors option)

    Interactive controls:
    - Slider: Battery voltage (1 to 12 V)
    - Slider: R₁ value (10 to 1000 Ω)
    - Slider: R₂ value (10 to 1000 Ω)
    - Slider: R₃ value (10 to 1000 Ω)
    - Toggle: "Show as resistors" / "Show as light bulbs"
    - Checkbox: "Highlight voltage drops"
    - Checkbox: "Show power dissipation"

    Calculated displays (for each circuit):
    - Total resistance
    - Total current
    - Current through each component
    - Voltage across each component
    - Power dissipated in each component
    - Total power

    Animation behavior:
    - Particle speed reflects current magnitude
    - Series: Same number of particles everywhere (same current)
    - Parallel: More particles in lower-resistance branches
    - If using bulbs: Brightness proportional to power dissipated
    - Color coding: Red for high current paths, blue for low

    Special features:
    - "Remove component" button to show what happens when one fails
    - Series: All bulbs go out
    - Parallel: Other bulbs stay on, get slightly brighter

    Equations displayed:
    - Series: R_total = R₁ + R₂ + R₃
    - Parallel: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃

    Default parameters:
    - Voltage: 9 V
    - R₁ = R₂ = R₃ = 100 Ω

    Implementation notes:
    - Use p5.js for circuit rendering and animation
    - Calculate all values using circuit equations
    - Particle system with adjustable density and speed
    - Bulb brightness using glow effect with variable alpha
</details>

### Kirchhoff's Laws

**Kirchhoff's Laws** provide the foundation for analyzing any circuit:

**Kirchhoff's Current Law (KCL)**: The sum of currents entering a junction equals the sum of currents leaving:

$$\sum I_{in} = \sum I_{out}$$

This is conservation of charge—charge doesn't accumulate at junctions.

**Kirchhoff's Voltage Law (KVL)**: The sum of voltage changes around any closed loop equals zero:

$$\sum V = 0$$

This is conservation of energy—a charge returning to its starting point has the same potential energy.

## Solar Cells and Photovoltaics

### How Solar Cells Work

**Solar cells** (photovoltaic cells) convert light energy directly into electrical energy using the photovoltaic effect. When photons strike a semiconductor material (usually silicon), they knock electrons loose, creating a flow of current.

A typical silicon solar cell:

1. Is made of two layers of silicon: n-type (extra electrons) and p-type (electron "holes")
2. Creates an electric field at the p-n junction
3. When light hits, it frees electrons that flow through external circuit
4. Produces about 0.5-0.6 V per cell at ~15-22% efficiency

### Solar Panel Characteristics

Solar panels are rated by their peak power output under standard test conditions:

- **V~oc~** (Open-circuit voltage): Maximum voltage with no load
- **I~sc~** (Short-circuit current): Maximum current with no resistance
- **V~mp~, I~mp~** (Maximum power point): Voltage and current at peak power
- **P~max~** = V~mp~ × I~mp~

Real output varies with:

- Light intensity (direct sunlight vs. clouds)
- Temperature (cooler is better for efficiency)
- Angle to sun
- Shading (even partial shade dramatically reduces output)

#### Diagram: Solar Cell Operation and I-V Curve MicroSim

<details markdown="1">
    <summary>Solar Cell Operation and I-V Curve MicroSim</summary>
    **Status:** INCOMPLETE
    TODO: human-review-needed
    Type: microsim

    Learning objective: Understand how solar cells generate electricity and how to interpret their characteristic curves

    Canvas layout (900x700px):
    - Solar cell cross-section (450x400): Showing photovoltaic effect
    - I-V and P-V curves (450x400): Characteristic curves
    - Control panel (900x300): Light and load controls

    Visual elements:
    - Cross-section of solar cell showing:
      - Incoming light rays (yellow arrows)
      - N-type and P-type silicon layers
      - P-N junction with electric field
      - Free electrons being knocked loose by photons
      - Electron flow through external circuit
      - Metal contacts on top and bottom
    - I-V curve with operating point marked
    - P-V curve showing maximum power point

    Interactive controls:
    - Slider: Light intensity (0 to 1000 W/m², representing 0 to full sun)
    - Slider: Load resistance (0 to ∞, or use specific values)
    - Slider: Temperature (0°C to 50°C)
    - Checkbox: "Show photon animation"
    - Checkbox: "Show electron generation"
    - Button: "Find maximum power point"

    Animation behavior:
    - Photons (yellow dots) rain down on cell
    - Some photons penetrate to junction and create electron-hole pairs
    - Electrons flow through external circuit (blue particles)
    - Animation speed proportional to current
    - More photons at higher light intensity

    Graph features:
    - I-V curve: Current vs. voltage, shifts with light intensity
    - P-V curve: Power vs. voltage, peak at MPP
    - Operating point moves along curve as load changes
    - MPP (maximum power point) highlighted
    - Fill factor shown as ratio of rectangles

    Calculated displays:
    - Open-circuit voltage (V_oc)
    - Short-circuit current (I_sc)
    - Maximum power (P_max)
    - Fill factor = P_max / (V_oc × I_sc)
    - Efficiency = P_out / P_in × 100%

    Temperature effects:
    - Higher temperature: Lower V_oc, slightly higher I_sc
    - Net effect: Lower efficiency at high temperature

    Default parameters:
    - Light: 1000 W/m² (full sun)
    - Load: At maximum power point
    - Temperature: 25°C

    Implementation notes:
    - Use p5.js for rendering and particle systems
    - I-V curve from diode equation with light-generated current
    - Particle generation rate proportional to light intensity
    - Color gradient for intensity (yellow = bright, gray = dim)
</details>

## Solar Battery Charging Systems

### Complete Solar Power System

A solar battery charging system allows you to capture sunlight during the day, store the energy in batteries, and use it when needed (at night or during cloudy weather). A complete system includes:

1. **Solar panels**: Convert sunlight to DC electricity
2. **Charge controller**: Regulates charging to protect batteries
3. **Battery bank**: Stores electrical energy
4. **Inverter** (optional): Converts DC to AC for standard appliances
5. **Load**: Devices that use the stored energy

### Charge Controllers

A **charge controller** is essential for protecting batteries from overcharging and deep discharge. Types include:

- **PWM (Pulse Width Modulation)**: Simple, inexpensive, ~75-80% efficient
- **MPPT (Maximum Power Point Tracking)**: Sophisticated, tracks optimal operating point, ~94-99% efficient

The charge controller:

- Prevents overcharging (stops charging when battery is full)
- Prevents over-discharge (disconnects load when battery is low)
- May provide load control and system monitoring

#### Diagram: Solar Battery Charging System MicroSim

<details markdown="1">
    <summary>Solar Battery Charging System MicroSim</summary>
    **Status:** INCOMPLETE
    TODO: human-review-needed
    Type: microsim

    Learning objective: Understand how solar panels charge batteries and power loads through a complete day-night cycle

    Canvas layout (1000x800px):
    - System diagram (700x500): Complete solar system schematic
    - Time simulation (300x200): Day/night cycle control
    - Energy flow diagram (300x300): Sankey-style power flow
    - Status panel (1000x300): All readings and graphs

    Visual elements:
    - Animated sun that moves across sky (day) or moon (night)
    - Solar panel with variable angle, shows current output
    - Charge controller with LED status indicators
    - Battery bank with charge level indicator (like fuel gauge)
    - Inverter (if AC loads present)
    - Load (LED lights that turn on at night)
    - Power flow arrows showing energy direction (animated particles)
    - Wire connections with current flow visualization

    Interactive controls:
    - Slider: Time of day (0-24 hours) or play button for real-time simulation
    - Slider: Cloud cover (0-100%)
    - Slider: Load power (0 to battery capacity)
    - Toggle: "Manual time control" / "Auto simulation"
    - Slider: Simulation speed (1x to 100x)
    - Dropdown: Battery type (Lead-acid, Li-ion, LiFePO4)
    - Slider: Battery capacity (10 Ah to 200 Ah)
    - Slider: Solar panel wattage (10 W to 200 W)

    Day/night behavior:
    - Dawn to dusk: Sun rises, solar panel generates power
    - Power flows: Panel → Charge controller → Battery (if not full) and/or Load
    - Dusk to dawn: No solar input
    - Power flows: Battery → Load (lights turn on automatically)
    - Battery level decreases at night, increases during day

    Energy flow visualization:
    - Sankey diagram showing power distribution
    - Yellow arrows from panel (solar input)
    - Green arrows to battery (charging)
    - Red arrows to load (consumption)
    - Gray arrows for losses

    Status displays:
    - Solar panel output (W)
    - Battery voltage, current, state of charge (%)
    - Load consumption (W)
    - Energy harvested today (Wh)
    - Energy consumed today (Wh)
    - Estimated hours of remaining power

    Graphs (scrolling 24-hour view):
    - Solar power output vs. time
    - Battery state of charge vs. time
    - Load power vs. time

    Scenarios:
    - "Sunny day": Full solar harvest
    - "Cloudy day": Reduced harvest, may not fully charge
    - "High load": Battery drains faster at night
    - "Balanced system": Battery maintains 50-80% through cycle

    Default parameters:
    - 100W solar panel
    - 100 Ah, 12V battery (LiFePO4)
    - 20W LED load (on at night only)
    - Clear day

    Implementation notes:
    - Use p5.js for all rendering
    - Sun position: angle = (time - 6) * 15 degrees (rises at 6, sets at 18)
    - Solar output: P = P_max × sin(sun_angle) × (1 - cloud_cover)
    - Battery SOC: integrate (charge_current - discharge_current) over time
    - LED brightness proportional to power when on
    - Particle flow animation for current
</details>

### Example: Off-Grid Solar Lighting System

Let's design a simple solar-powered LED lighting system for a garden shed:

**Requirements:**
- Provide 4 hours of light each evening
- Use a 10W LED light
- System should work even after 2 cloudy days

**Calculations:**

1. Daily energy need: 10 W × 4 h = 40 Wh

2. For 2 cloudy days reserve: 40 Wh × 3 days = 120 Wh

3. Battery sizing (12V system, 50% max discharge):
   - Capacity needed: 120 Wh ÷ 12 V ÷ 0.5 = 20 Ah

4. Solar panel sizing (assuming 5 peak sun hours, 80% system efficiency):
   - Daily harvest needed: 40 Wh ÷ 0.8 = 50 Wh
   - Panel size: 50 Wh ÷ 5 h = 10 W minimum
   - With margin for cloudy days: 20 W panel recommended

**System components:**
- 20 W solar panel
- 20 Ah, 12V LiFePO4 battery
- PWM charge controller (10A rating)
- 10W, 12V LED light with dusk sensor

## Electric Motors

### How Electric Motors Work

An **electric motor** converts electrical energy into mechanical (rotational) energy using the magnetic force on current-carrying conductors. The basic principle:

1. Current flows through a coil of wire (armature) placed in a magnetic field
2. The magnetic force on the current creates a torque on the coil
3. The coil rotates, doing mechanical work
4. A commutator or electronic controller reverses current direction to maintain rotation

### DC Motor Operation

In a **DC motor**:

- Permanent magnets or field coils create a stationary magnetic field
- Current through the armature creates a second magnetic field
- The two fields interact, creating torque
- A commutator switches current direction as the armature rotates
- This maintains consistent torque direction

Key relationships for DC motors:

**Back-EMF**: As the motor spins, it generates a voltage (back-EMF) that opposes the applied voltage:

$$V = IR + E_{back}$$

$$E_{back} = k\omega$$

where k is a motor constant and ω is angular velocity.

**Torque**: The torque is proportional to current:

$$\tau = k_t I$$

**Power**: Mechanical power output:

$$P_{mech} = \tau \omega = E_{back} \times I$$

#### Diagram: DC Motor Operation MicroSim

<iframe src="../../sims/dc-motor/main.html" width="100%" height="502px" scrolling="no" loading="lazy"></iframe>

[View detailed explanation and educational context](../../sims/dc-motor/index.md)

<details markdown="1">
    <summary>DC Motor Operation MicroSim</summary>
    **Status:** done

    Type: microsim

    Learning objective: Understand how DC motors convert electrical energy to mechanical rotation using magnetic forces

    Canvas layout (1000x700px):
    - Motor cross-section view (500x500): Shows armature, magnets, commutator
    - Side panel (300x500): Force vectors and current direction
    - Control panel (200x700): Voltage, load, and displays
    - Performance graphs (1000x200): Speed-torque and efficiency curves

    Visual elements:
    - Permanent magnets (N and S poles labeled, colored red and blue)
    - Rotating armature coil (multiple turns shown)
    - Commutator segments (split ring)
    - Brushes contacting commutator
    - Current direction indicators (arrows in wire)
    - Magnetic field lines (permanent magnets)
    - Force arrows on current-carrying conductors (F = IL × B)
    - Rotation direction arrow
    - Animated rotation of armature

    Interactive controls:
    - Slider: Applied voltage (0 to 12 V)
    - Slider: Load torque (0 to max stall torque)
    - Checkbox: "Show magnetic field lines"
    - Checkbox: "Show force vectors"
    - Checkbox: "Show current direction"
    - Button: "Apply brake" (increases load suddenly)
    - Toggle: "Slow motion" for commutator action
    - Slider: Motor constant (for different motor sizes)

    Animation behavior:
    - Armature rotates at speed proportional to (V - I×R) / k
    - Current increases when load increases (motor slows)
    - At stall (zero speed): I = V/R (maximum current, danger!)
    - At no load: Speed = V/k (maximum speed, minimum current)
    - Commutator action shown: Current reverses as brushes cross gaps
    - Force vectors rotate with armature, always creating torque

    Performance displays:
    - Applied voltage (V)
    - Motor current (A)
    - Motor speed (RPM)
    - Torque (N·m)
    - Mechanical power output (W)
    - Electrical power input (W)
    - Efficiency (%)
    - Back-EMF (V)

    Graph panel:
    - Speed vs. Torque characteristic (linear for ideal DC motor)
    - Current vs. Torque
    - Efficiency vs. Speed (peaks at mid-range)
    - Operating point highlighted on curves

    Warning indicators:
    - "Stall current!" warning if motor is stalled
    - "Overload!" if current exceeds safe limit
    - Temperature indicator rises with I²R losses

    Default parameters:
    - Voltage: 6 V
    - Motor: Small hobby motor (k = 0.01 V/rad/s)
    - Load: Light (10% of stall torque)

    Implementation notes:
    - Use p5.js for rendering with rotation transforms
    - Physics model: dω/dt = (τ_motor - τ_load - τ_friction) / J
    - Commutator: Draw segmented ring, highlight active segment
    - Force vectors: Calculate F = BIL, show as arrows
    - Smooth animation using requestAnimationFrame
</details>

### Motor Speed Control

The speed of a DC motor can be controlled by:

1. **Voltage control**: Higher voltage = higher speed
2. **PWM (Pulse Width Modulation)**: Rapidly switching voltage on/off
3. **Field weakening**: Reducing field strength increases speed (but reduces torque)

PWM is the most common method—by varying the duty cycle (percentage of time the voltage is on), you can smoothly control speed while maintaining good efficiency.

#### Diagram: Motor Speed Control with Variable Voltage MicroSim

<details markdown="1">
    <summary>Motor Speed Control with Variable Voltage MicroSim</summary>
    **Status:** INCOMPLETE
    TODO: human-review-needed
    Type: microsim

    Learning objective: Explore how changing voltage affects motor speed and understand the relationship between voltage, speed, current, and torque

    Canvas layout (1000x700px):
    - Motor with spinning load (500x400): Visual representation
    - Power supply controls (250x400): Voltage source
    - Oscilloscope view (250x400): PWM waveform
    - Performance dashboard (1000x300): Meters and graphs

    Visual elements:
    - DC motor with visible shaft
    - Spinning fan or wheel attached to shaft (speed visible)
    - Power supply with large voltage display
    - PWM controller with duty cycle knob
    - Ammeter showing motor current
    - Tachometer showing RPM
    - Load weight attached to pulley (variable)

    Interactive controls:
    - Mode selector: "Variable DC" or "PWM Control"

    Variable DC mode:
    - Slider: Voltage (0 to 12 V, continuous)

    PWM mode:
    - Slider: Duty cycle (0 to 100%)
    - Slider: PWM frequency (100 Hz to 20 kHz)
    - Fixed supply voltage (12 V)

    Both modes:
    - Slider: Load (light to heavy)
    - Button: "Brake" (stops motor)
    - Button: "Release" (removes brake)
    - Checkbox: "Show efficiency"

    Animation behavior:
    - Fan/wheel rotation speed matches motor RPM
    - Higher voltage/duty cycle = faster rotation
    - Higher load = slower rotation, higher current
    - Brake: Motor stops, current spikes then system shuts down

    PWM visualization:
    - Oscilloscope shows voltage waveform
    - On/off states clearly visible
    - Average voltage line overlaid
    - Motor "sees" average voltage for speed, but full voltage during on-time

    Dashboard displays:
    - Applied voltage (or average for PWM)
    - Motor current (average and peak for PWM)
    - Speed (RPM)
    - Torque (calculated)
    - Input power (W)
    - Output power (W)
    - Efficiency (%)
    - Temperature indicator

    Comparison feature:
    - Side-by-side: Same average voltage via DC vs. PWM
    - Show that PWM is more efficient at partial speeds
    - PWM keeps motor running smoothly at low speeds

    Speed-Voltage graph:
    - Real-time plot of speed vs. applied voltage
    - Shows linear relationship (for DC) or average voltage (for PWM)
    - Load lines for different load settings

    Default parameters:
    - Mode: Variable DC
    - Voltage: 6 V
    - Load: Medium
    - PWM frequency: 1 kHz

    Implementation notes:
    - Use p5.js for all rendering
    - Rotation animation: angle += angular_velocity × dt
    - PWM: Use frameCount to toggle on/off state
    - Motor model: first-order lag from voltage to speed
    - Current ripple in PWM mode (triangular wave superimposed)
</details>

### Applications of Electric Motors

Electric motors are everywhere:

**Small motors (< 1 W):**
- Vibration motors in phones
- Toy motors
- Watch movements

**Medium motors (1 W - 1 kW):**
- Fans and blowers
- Power tools
- Appliances (washing machines, vacuum cleaners)
- Drones and RC vehicles

**Large motors (> 1 kW):**
- Electric vehicles (50-500 kW)
- Industrial machinery
- HVAC systems
- Elevators

## Real-World Application: Solar-Powered Electric Motor System

Let's combine our knowledge of solar cells, batteries, and motors in a practical application: a solar-powered water pump for irrigation.

### System Design

A small farm needs to pump water from a well during daylight hours. The system must:

- Pump 1000 liters of water per day
- Lift water 10 meters from well to storage tank
- Operate without grid power

**Calculations:**

1. Energy to lift water:
   - Mass of water: 1000 kg (1000 L)
   - Height: 10 m
   - Energy = mgh = 1000 × 9.8 × 10 = 98,000 J = 27.2 Wh

2. Accounting for pump and motor efficiency (50% combined):
   - Electrical energy needed: 27.2 ÷ 0.5 = 54.4 Wh

3. Solar panel sizing (5 peak sun hours):
   - Panel power: 54.4 Wh ÷ 5 h = 10.9 W minimum
   - With margin: 20 W panel

4. Motor and pump:
   - 12V DC pump motor rated 20W
   - Operating at 50% duty cycle during peak sun

#### Diagram: Solar Water Pump System MicroSim

<details markdown="1">
    <summary>Solar Water Pump System MicroSim</summary>
    **Status:** INCOMPLETE
    TODO: human-review-needed
    Type: microsim

    Learning objective: Apply concepts of solar power, batteries, and motors to a real-world pumping application

    Canvas layout (1000x800px):
    - System overview (700x600): Complete installation diagram
    - Control center (300x400): Switches and displays
    - Performance graphs (300x400): Flow rate and energy

    Visual elements:
    - Sun with time-of-day position
    - Solar panel (tilted at optimal angle)
    - Controller box with indicator lights
    - Battery (optional, for cloudy-day storage)
    - Submersible pump in well (cutaway view)
    - Water rising through pipe (animated blue particles)
    - Storage tank at elevated position (fill level shown)
    - Water outflow to irrigation (when tank has water)

    Interactive controls:
    - Slider: Time of day (6 AM to 8 PM)
    - Slider: Cloud cover (0 to 100%)
    - Slider: Water level in well (full to low)
    - Slider: Storage tank capacity (100 to 2000 L)
    - Toggle: "Battery backup" on/off
    - Toggle: "Auto" / "Manual" pump control
    - Button: "Open irrigation valve"

    Animation behavior:
    - Solar panel output varies with sun angle and clouds
    - Pump runs when sufficient power available
    - Water particles flow up pipe when pump runs
    - Tank level increases as water pumped
    - Pump stops if well water level too low
    - Irrigation drains tank when valve open

    System calculations displayed:
    - Solar power generated (W)
    - Pump power consumption (W)
    - Water flow rate (L/min)
    - Well water level (m)
    - Tank level (L and %)
    - Total water pumped today (L)
    - Total energy harvested today (Wh)
    - System efficiency (%)

    Performance graphs:
    - Solar power vs. time (today)
    - Water pumped vs. time (cumulative)
    - Tank level vs. time
    - Battery level vs. time (if battery present)

    Failure modes to demonstrate:
    - Cloudy weather: Pump runs slower or stops
    - Low well: Pump stops to prevent dry running
    - Full tank: Pump stops, excess power charges battery
    - Night: Only battery can run pump

    Default parameters:
    - 50W solar panel
    - 20W pump (pumps 5 L/min at 10m head)
    - 500L storage tank
    - No battery initially

    Implementation notes:
    - Use p5.js for all animations
    - Water particles: array of positions, move upward when pump on
    - Sun position: map time to angle across sky
    - Energy balance: P_solar - P_pump = P_battery_charge
    - Flow rate dependent on available power (reduced in low light)
</details>

## Summary and Key Takeaways

Electric circuits are the pathways through which charge flows, carrying energy from sources to loads. The fundamental principles governing circuits include:

**Current and Resistance:**
- Current (I) is the flow rate of charge, measured in amperes
- Resistance (R) opposes current flow, measured in ohms
- Ohm's Law (V = IR) relates voltage, current, and resistance

**Energy Storage Components:**
- Capacitors store energy in electric fields (U = ½CV²)
- Inductors store energy in magnetic fields (U = ½LI²)
- Batteries store energy chemically and convert it to electricity

**Power Sources:**
- DC sources provide steady voltage in one direction (batteries, solar cells)
- AC sources alternate direction sinusoidally (grid power, generators)
- Power = VI = I²R = V²/R, measured in watts

**Circuit Configurations:**
- Series: Same current through all components, voltages add
- Parallel: Same voltage across all components, currents add
- Kirchhoff's Laws ensure conservation of charge and energy

**Practical Applications:**
- Solar cells convert light to electricity for sustainable power
- Battery systems store energy for use when solar isn't available
- Electric motors convert electrical energy to mechanical motion
- Speed control via voltage or PWM enables precise motor control

These concepts form the foundation for understanding all electrical and electronic systems, from simple flashlights to complex smart grids and electric vehicles.

## Practice Problems

1. A 9V battery is connected to a 180Ω resistor. Calculate the current through the resistor and the power dissipated.

2. Three resistors (100Ω, 200Ω, 300Ω) are connected in series to a 12V battery. Find the total resistance, current, and voltage across each resistor.

3. The same three resistors are now connected in parallel to the same battery. Find the total resistance and the current through each resistor.

4. A 100μF capacitor is charged to 12V. Calculate the stored energy and the charge on the capacitor.

5. A solar panel produces 50W under full sun. If the sun provides peak power for 5 hours per day, how many watt-hours of energy can be harvested? If this charges a 12V battery with 80% efficiency, how many amp-hours are added to the battery?

6. A DC motor runs at 3000 RPM when connected to 12V with no load, drawing 0.5A. When a load is applied, it slows to 2000 RPM and draws 2A. Calculate the back-EMF in each case and the power delivered to the mechanical load.

## Further Reading

- Horowitz, P., & Hill, W. (2015). *The Art of Electronics* (3rd ed.). Cambridge University Press.
- Platt, C. (2015). *Make: Electronics* (2nd ed.). Maker Media.
- Boxwell, M. (2017). *Solar Electricity Handbook*. Greenstream Publishing.
- Hughes, A., & Drury, B. (2019). *Electric Motors and Drives* (5th ed.). Elsevier.
- Floyd, T. L. (2017). *Principles of Electric Circuits* (10th ed.). Pearson.

## Looking Ahead

In future physics courses, you'll explore more advanced electrical concepts:

- Magnetism and electromagnetic induction
- AC circuit analysis with complex impedance
- Electromagnetic waves and their applications
- Semiconductor physics and modern electronics
- Power systems and renewable energy technology

The circuit fundamentals you've learned here provide the essential foundation for understanding how electricity powers and connects our modern world.
