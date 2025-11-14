# Oscillations and Periodic Motion

## Summary

This chapter explores periodic motion, where objects repeat the same motion pattern over time. Simple harmonic motion (SHM) is the most fundamental type of oscillation, characterized by a restoring force proportional to displacement. You'll analyze SHM using amplitude, period, frequency, and angular frequency, and study two classic oscillating systems: springs obeying Hooke's Law and pendulums swinging under gravity. Real oscillations experience damping due to non-conservative forces like friction and air resistance. When external forces drive oscillations at specific frequencies, resonance can occur with dramatic effects—from shattering wine glasses to destroying bridges. These principles apply throughout physics and engineering.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

1. Simple Harmonic Motion
2. Restoring Force
3. Amplitude
4. Period
5. Frequency
6. Angular Frequency
7. Hooke's Law
8. Spring Constant
9. Pendulum
10. Simple Pendulum
11. Physical Pendulum
12. Damped Harmonic Motion
13. Forced Oscillations
14. Resonance

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Scientific Foundations and Mathematical Tools](../01-scientific-foundations/index.md)
- [Chapter 2: Motion in One Dimension](../02-motion-one-dimension/index.md)
- [Chapter 4: Forces and Newton's Laws](../04-forces-newtons-laws/index.md)
- [Chapter 6: Work, Energy, and Power](../06-work-energy-power/index.md)
- [Chapter 8: Rotational Motion and Angular Momentum](../08-rotational-motion/index.md)

---

## Introduction: The World of Repetition

From the gentle swing of a playground set to the vibrations of a guitar string, from your heartbeat to the ticking of a clock, oscillations surround us. An oscillation is any motion that repeats itself at regular intervals, returning to its starting point again and again. This chapter explores the physics of periodic motion, focusing on the simplest and most important type: simple harmonic motion (SHM).

Understanding oscillations opens doors to comprehending countless phenomena. The suspension system in a car, the timing mechanism in your phone, even the atoms in solid materials—all involve oscillatory motion. Mastering these concepts prepares you for studying waves, sound, and more advanced physics topics.

## Section 1: Understanding Simple Harmonic Motion

### What Makes Motion "Harmonic"?

Simple harmonic motion is oscillatory motion where the restoring force is directly proportional to the displacement from equilibrium and always points toward the equilibrium position. This specific relationship creates a beautiful, predictable pattern.

Think of a mass attached to a spring lying on a frictionless surface. When you pull the mass to the right and release it, the spring pulls it back toward the center. The farther you pull it, the stronger the pull back. This is the essence of SHM.

Key characteristics of simple harmonic motion:

- Motion repeats in identical cycles
- A restoring force always pushes or pulls toward equilibrium
- The restoring force magnitude is proportional to displacement
- The motion can be described by sinusoidal (sine or cosine) functions

### The Restoring Force

The restoring force is the force that brings an oscillating object back toward its equilibrium position. In SHM, this force has a special property: it's directly proportional to how far the object has been displaced, but it points in the opposite direction.

Mathematically, we express this as:

**F = -kx**

Where:
- F is the restoring force (in newtons, N)
- k is a constant that depends on the system (for springs, this is the spring constant)
- x is the displacement from equilibrium (in meters, m)
- The negative sign indicates the force points opposite to displacement

This negative sign is crucial. If you displace an object to the right (positive x), the force points left (negative F). If you displace it left (negative x), the force points right (positive F). The force always tries to restore equilibrium.

### Position, Velocity, and Acceleration in SHM

As an object undergoes SHM, its position, velocity, and acceleration all vary with time in predictable ways. Consider a mass oscillating on a spring:

| Quantity | At Maximum Displacement | At Equilibrium Position | Direction Relationship |
|----------|-------------------------|-------------------------|------------------------|
| Displacement | Maximum (amplitude) | Zero | Changes direction at extremes |
| Velocity | Zero | Maximum | Always toward equilibrium when moving inward |
| Acceleration | Maximum | Zero | Always toward equilibrium |
| Restoring Force | Maximum | Zero | Same direction as acceleration |

When the object reaches its farthest point from equilibrium (maximum displacement), it momentarily stops before reversing direction. At this instant, velocity is zero but acceleration is maximum. Conversely, when the object passes through the equilibrium position, it's moving at its fastest, but the acceleration is zero because there's no restoring force at that point.

#### Diagram: Position-Velocity-Acceleration Relationship in SHM MicroSim
<details markdown="1">
    <summary>Position-Velocity-Acceleration Relationship in SHM MicroSim</summary>
    Type: microsim

    Learning objective: Visualize how position, velocity, and acceleration change during simple harmonic motion and understand their phase relationships

    Canvas layout (800x600px):
    - Left side (500x600): Drawing area showing oscillating mass on spring
    - Right side (300x600): Three synchronized graphs stacked vertically

    Visual elements:
    - Horizontal spring attached to wall on left
    - Mass (blue square, 40x40px) attached to spring
    - Dashed line showing equilibrium position
    - Motion trail (fading dots) showing recent positions
    - Three real-time graphs:
      - Top: Position vs. time (red curve)
      - Middle: Velocity vs. time (green curve)
      - Bottom: Acceleration vs. time (blue curve)
    - All graphs share the same time axis

    Interactive controls:
    - Slider: Amplitude (0.5m to 3.0m, default 2.0m)
    - Slider: Frequency (0.2 Hz to 2.0 Hz, default 0.5 Hz)
    - Button: "Start/Pause"
    - Button: "Reset"
    - Checkbox: "Show vectors" (displays velocity and acceleration arrows on mass)

    Default parameters:
    - Amplitude: 2.0 m
    - Frequency: 0.5 Hz
    - Spring constant: calculated from frequency and mass
    - Mass: 1.0 kg (fixed)

    Behavior:
    - Mass oscillates horizontally in SHM
    - Graphs plot last 4 complete cycles
    - Vertical line on graphs shows current time
    - When "Show vectors" enabled:
      - Green arrow from mass shows velocity (scaled)
      - Blue arrow from mass shows acceleration (scaled)
    - Changing amplitude adjusts graph scales automatically
    - Changing frequency affects period of oscillation

    Implementation notes:
    - Use p5.js for rendering
    - Position: x(t) = A cos(2πft)
    - Velocity: v(t) = -2πfA sin(2πft)
    - Acceleration: a(t) = -(2πf)²A cos(2πft)
    - Use frameCount for animation timing
    - Update graphs every frame with new data point
</details>

Notice how position and acceleration are always out of phase—when one is at maximum, the other is at minimum. Velocity leads position by a quarter cycle, reaching its maximum when the object passes through equilibrium.

## Section 2: Describing Oscillations with Numbers

### Amplitude: How Far It Swings

The amplitude is the maximum displacement from the equilibrium position. For a mass on a spring, if you pull it 10 cm to the right before releasing, the amplitude is 10 cm. The mass will oscillate between +10 cm and -10 cm from equilibrium.

Amplitude represents the energy stored in the oscillation. A larger amplitude means more energy. For a pendulum, pulling it back farther increases the amplitude. For a vibrating guitar string, plucking it harder increases the amplitude.

Important notes about amplitude:

- Amplitude is always a positive number (it's a distance)
- Amplitude doesn't affect the period or frequency in ideal SHM
- Doubling the amplitude quadruples the energy

### Period and Frequency: How Fast It Oscillates

The period (T) is the time required for one complete cycle of oscillation. If a mass on a spring takes 2 seconds to go from right, to left, and back to right again, the period is 2 seconds.

The frequency (f) is the number of complete cycles per second. Frequency is measured in hertz (Hz), where 1 Hz = 1 cycle per second.

Period and frequency are reciprocals:

**T = 1/f** and **f = 1/T**

If a pendulum completes 5 swings in 10 seconds, its period is T = 10 s / 5 = 2 s per swing. The frequency is f = 1/T = 1/2 = 0.5 Hz.

Here's a comparison of different oscillating systems:

| System | Typical Period | Typical Frequency | Common Examples |
|--------|----------------|-------------------|-----------------|
| Pendulum clock | 1-2 seconds | 0.5-1 Hz | Grandfather clocks |
| Mass on spring | 0.1-10 seconds | 0.1-10 Hz | Suspension systems |
| Vibrating guitar string | 0.001-0.01 seconds | 100-1000 Hz | Musical notes |
| Quartz crystal oscillator | 0.0000001 seconds | 10 MHz | Digital watches, computers |

### Angular Frequency: A Mathematical Convenience

While frequency tells us oscillations per second, angular frequency (ω, Greek letter omega) tells us radians per second. Angular frequency connects oscillatory motion to circular motion—a powerful mathematical relationship.

**ω = 2πf = 2π/T**

Angular frequency is measured in radians per second (rad/s). Since there are 2π radians in a complete circle, and frequency counts complete cycles per second, multiplying by 2π converts between them.

For example, if f = 2 Hz, then ω = 2π(2) = 4π rad/s ≈ 12.57 rad/s.

Angular frequency appears naturally in the equations describing SHM. The position of an object in SHM can be written as:

**x(t) = A cos(ωt + φ)**

Where:
- x(t) is position at time t
- A is amplitude
- ω is angular frequency
- φ is the phase constant (initial angle), which depends on where the object started

#### Diagram: Period, Frequency, and Angular Frequency Relationship Diagram
<details markdown="1">
    <summary>Period, Frequency, and Angular Frequency Relationship Diagram</summary>
    Type: infographic

    Purpose: Show the mathematical relationships between period, frequency, and angular frequency with visual representations

    Layout: Circular design with three main sections

    Sections:
    1. Central circle showing a rotating point completing one cycle
       - Labeled "One Complete Cycle = 2π radians = 360°"
       - Arrow showing direction of rotation

    2. Three interconnected boxes around the circle:
       - Top box: "Period (T)" with clock icon
         - Definition: "Time for one complete cycle"
         - Units: seconds (s)
         - Example: T = 2.0 s

       - Bottom-left box: "Frequency (f)" with wave icon
         - Definition: "Cycles per second"
         - Units: hertz (Hz) or s⁻¹
         - Example: f = 0.5 Hz
         - Relationship: f = 1/T

       - Bottom-right box: "Angular Frequency (ω)" with angle icon
         - Definition: "Radians per second"
         - Units: rad/s
         - Example: ω = π rad/s
         - Relationship: ω = 2πf = 2π/T

    3. Connecting arrows between boxes showing conversion formulas

    Interactive elements:
    - Hover over any box to highlight its relationships
    - Click on conversion arrows to see example calculations
    - Slider at bottom to adjust period value (0.5 s to 5 s)
    - All other values update automatically

    Visual style: Modern infographic with color coding:
    - Period: blue
    - Frequency: green
    - Angular frequency: orange
    - Conversion arrows: gray with formula labels

    Implementation: HTML/CSS/JavaScript with SVG graphics and interactive calculation updates
</details>

## Section 3: Springs and Hooke's Law

### Hooke's Law: The Spring Force

When you stretch or compress a spring, it exerts a force trying to return to its natural length. Robert Hooke discovered that this force is proportional to the displacement—double the stretch, double the force. This relationship, known as Hooke's Law, is fundamental to understanding oscillations.

**F = -kx**

Where:
- F is the spring force (N)
- k is the spring constant (N/m)
- x is the displacement from the natural length (m)
- The negative sign means the force opposes the displacement

The spring constant k characterizes the stiffness of the spring. A larger k means a stiffer spring that requires more force to stretch or compress a given distance.

Hooke's Law examples:

- A spring with k = 100 N/m stretched by x = 0.2 m exerts F = -100(0.2) = -20 N
- A spring with k = 500 N/m compressed by x = -0.05 m exerts F = -500(-0.05) = +25 N
- A stiffer spring (larger k) requires more force for the same displacement

### The Spring Constant

The spring constant represents the stiffness of a spring. It's determined by the spring's material properties, wire diameter, coil diameter, and number of coils.

Comparing spring constants:

| Spring Type | Typical k Value | Applications |
|-------------|----------------|--------------|
| Soft toy spring | 1-10 N/m | Slinkies, soft toys |
| Lab spring | 10-100 N/m | Physics demonstrations |
| Suspension spring | 10,000-50,000 N/m | Car suspensions |
| Valve spring | 100-1,000 N/m | Engine components |

To measure a spring constant experimentally:

1. Hang known masses from the spring
2. Measure the displacement for each mass
3. Plot force (F = mg) versus displacement (x)
4. The slope of the line equals k

#### Diagram: Hooke's Law Interactive Demonstration
<details markdown="1">
    <summary>Hooke's Law Interactive Demonstration</summary>
    Type: microsim

    Learning objective: Explore the relationship between force, displacement, and spring constant according to Hooke's Law

    Canvas layout (800x600px):
    - Left side (400x600): Drawing area with spring and hanging mass
    - Right side (400x600): Force vs. displacement graph

    Visual elements:
    - Vertical spring attached to ceiling at top
    - Spring shown as coiled line that stretches realistically
    - Hanging mass (red square) with mass label
    - Ruler on left side showing displacement in cm
    - Equilibrium position marked with dashed line
    - Current force shown with arrow and label
    - Right side shows F vs. x graph with plotted points

    Interactive controls:
    - Slider: Spring constant k (10 N/m to 200 N/m)
    - Slider: Hanging mass (0.1 kg to 2.0 kg)
    - Draggable mass (can pull down to stretch spring)
    - Button: "Release" (lets mass oscillate)
    - Button: "Add Data Point" (plots current F and x on graph)
    - Button: "Clear Graph"
    - Display: Current values of F, x, and k

    Default parameters:
    - Spring constant: 50 N/m
    - Mass: 0.5 kg
    - Natural spring length: 100 pixels
    - Graph scales: F from 0 to 20 N, x from 0 to 40 cm

    Behavior:
    - Dragging mass down stretches spring
    - Force arrow grows proportionally with displacement
    - Ruler shows displacement from equilibrium
    - "Release" button starts SHM oscillation
    - Graph shows linear relationship F = kx
    - Clicking "Add Data Point" plots current position
    - Best-fit line can be toggled on graph
    - Slope of best-fit line displays calculated k value

    Implementation notes:
    - Use p5.js for rendering
    - Spring drawn as series of connected loops
    - Number of loops constant, spacing varies with stretch
    - Oscillation uses SHM equations with damping option
    - Graph uses linear regression for best-fit line
</details>

### Mass-Spring Oscillators

When a mass attached to a spring is displaced and released, it oscillates in SHM. The period of oscillation depends on both the mass and the spring constant:

**T = 2π√(m/k)**

Where:
- T is the period (s)
- m is the mass (kg)
- k is the spring constant (N/m)

From this, we can also find frequency:

**f = (1/2π)√(k/m)**

Notice that:
- Increasing mass increases the period (slower oscillation)
- Increasing spring constant decreases the period (faster oscillation)
- The amplitude doesn't appear in these equations—period is independent of amplitude in ideal SHM

Example calculation: A 0.5 kg mass hangs from a spring with k = 50 N/m. What is the period?

T = 2π√(0.5/50) = 2π√(0.01) = 2π(0.1) = 0.628 s

The frequency would be f = 1/T = 1.59 Hz.

## Section 4: Pendulums

### The Pendulum: An Ancient Oscillator

A pendulum consists of a mass suspended from a pivot point that can swing back and forth under gravity's influence. Pendulums have been used for centuries in clocks, scientific instruments, and architectural applications.

When a pendulum is displaced from vertical and released, gravity provides the restoring force. Unlike springs, where the restoring force is perfectly proportional to displacement, pendulums only approximate SHM when the swing angle is small (less than about 15 degrees).

### Simple Pendulum

A simple pendulum consists of a point mass (the bob) suspended by a massless, inextensible string or rod of length L. While no real pendulum is truly "simple," this idealization helps us understand the fundamental principles.

For a simple pendulum with small amplitude oscillations, the period is:

**T = 2π√(L/g)**

Where:
- T is the period (s)
- L is the length of the pendulum (m)
- g is the gravitational acceleration (9.8 m/s²)

Key observations:

- Period depends on length but not on mass of the bob
- Longer pendulums have longer periods
- Period is independent of amplitude (for small angles)
- Doubling the length increases the period by a factor of √2

The restoring force for a pendulum comes from the component of gravity tangent to the arc of swing:

**F = -mg sin(θ)**

For small angles (in radians), sin(θ) ≈ θ, which makes the restoring force proportional to angular displacement—the condition for SHM.

#### Diagram: Simple Pendulum Period vs. Length Investigation
<details markdown="1">
    <summary>Simple Pendulum Period vs. Length Investigation</summary>
    Type: microsim

    Learning objective: Investigate how pendulum length affects period and verify the T = 2π√(L/g) relationship

    Canvas layout (800x600px):
    - Left side (400x600): Drawing area with pendulum
    - Right side (400x600): Period vs. length graph and controls

    Visual elements:
    - Pendulum pivot point at top center
    - String (thin line) from pivot to bob
    - Bob (circle, 20px diameter) with mass label
    - Protractor overlay showing angle from vertical
    - Dashed vertical line for reference
    - Motion trail showing recent positions
    - Right side shows T vs. L graph with data points
    - Timer display showing current period measurement

    Interactive controls:
    - Slider: Pendulum length L (0.2 m to 2.0 m)
    - Slider: Bob mass (0.1 kg to 2.0 kg)
    - Slider: Initial angle (5° to 30°)
    - Draggable bob (pull to set initial angle)
    - Button: "Release"
    - Button: "Measure Period" (times 10 swings and averages)
    - Button: "Add to Graph"
    - Button: "Clear Data"
    - Checkbox: "Show theoretical curve"
    - Display: Measured period, theoretical period, percent error

    Default parameters:
    - Length: 1.0 m
    - Mass: 0.5 kg
    - Initial angle: 10°
    - g = 9.8 m/s²

    Behavior:
    - Dragging bob sets initial angle
    - Release button starts oscillation
    - Pendulum swings realistically with accurate physics
    - "Measure Period" button automatically counts 10 swings
    - Average period calculated and displayed
    - "Add to Graph" plots measured point on T vs. L graph
    - Theoretical curve shows T = 2π√(L/g)
    - Mass slider shows period is independent of mass
    - Large angles show deviation from simple theory

    Implementation notes:
    - Use p5.js for rendering
    - For small angles: use SHM equations
    - For large angles: numerical integration of exact equations
    - Graph shows theoretical curve and measured points
    - Calculate percent error from theory
</details>

### Physical Pendulum

A physical pendulum is any rigid body that can oscillate about a fixed axis. Unlike the simple pendulum (point mass on a massless string), a physical pendulum has distributed mass. Examples include a swinging door, a baseball bat pivoted at one end, or a meter stick hanging from a nail.

For a physical pendulum, the period depends on the moment of inertia and the distance from the pivot to the center of mass:

**T = 2π√(I/mgd)**

Where:
- I is the moment of inertia about the pivot point (kg·m²)
- m is the total mass (kg)
- g is gravitational acceleration (9.8 m/s²)
- d is the distance from pivot to center of mass (m)

The physical pendulum reduces to the simple pendulum formula when the object is a point mass at distance L from the pivot (I = mL² and d = L).

Examples of physical pendulums:

| Object | Pivot Location | Application |
|--------|---------------|-------------|
| Swinging door | Hinges | Architecture |
| Meter stick | End or hole | Physics lab demonstrations |
| Human leg | Hip joint | Biomechanics, gait analysis |
| Church bell | Top support | Timekeeping, signaling |

Physical pendulums have a special property: there exists a point on the pendulum (called the center of oscillation) where, if you placed all the mass there, the period would be unchanged. This principle is used in designing accurate pendulum clocks.

#### Diagram: Simple vs. Physical Pendulum Comparison Diagram
<details markdown="1">
    <summary>Simple vs. Physical Pendulum Comparison Diagram</summary>
    Type: diagram

    Purpose: Illustrate the difference between simple and physical pendulums with side-by-side comparison

    Components to show:
    - Left side: Simple Pendulum
      - Pivot point at top
      - Massless string (thin line, labeled "massless string")
      - Point mass bob at bottom (small solid circle, labeled "point mass m")
      - Length L indicated with double-headed arrow
      - Center of mass at bob location
      - Formula: T = 2π√(L/g)

    - Right side: Physical Pendulum
      - Pivot point at top (labeled "pivot axis")
      - Extended rigid body (rectangle representing uniform rod)
      - Center of mass marked with X in middle
      - Distance d from pivot to center of mass (double-headed arrow)
      - Entire object labeled "distributed mass"
      - Formula: T = 2π√(I/mgd)

    - Both pendulums shown at small angle θ from vertical
    - Gravity vector (g) shown pointing down on both sides
    - Restoring torque indicated with curved arrow

    Connections:
    - Dashed lines showing comparison elements
    - Note box: "Physical pendulum becomes simple pendulum when I = mL² and d = L"

    Style: Technical diagram with clear labels and annotations

    Labels:
    - "Simple Pendulum: Point mass on massless string"
    - "Physical Pendulum: Rigid body with distributed mass"
    - "Both oscillate with period independent of amplitude (for small angles)"

    Color scheme:
    - Pendulums: dark blue
    - Pivot points: red
    - Center of mass: green
    - Annotations and labels: black
    - Formulas: highlighted in yellow boxes
</details>

## Section 5: Energy in Oscillating Systems

### Energy Transformation in SHM

In an ideal oscillating system with no friction, energy continuously transforms between kinetic and potential forms while the total mechanical energy remains constant. This energy transformation is what keeps the oscillation going.

For a mass-spring system:

- Potential energy is maximum at maximum displacement (amplitude)
- Kinetic energy is maximum at the equilibrium position
- At any point, total energy E = KE + PE = constant

The total mechanical energy in a mass-spring system is:

**E = (1/2)kA²**

Where:
- E is total mechanical energy (J)
- k is spring constant (N/m)
- A is amplitude (m)

Notice that energy depends on the square of the amplitude. Doubling the amplitude quadruples the energy.

At any position x:

- Potential energy: PE = (1/2)kx²
- Kinetic energy: KE = (1/2)mv²
- Total energy: E = KE + PE = (1/2)kA²

For a pendulum, potential energy is gravitational and kinetic energy is rotational or translational depending on how you analyze it.

Energy distribution at different points in the oscillation:

| Position | Displacement | Speed | KE | PE | Total E |
|----------|--------------|-------|----|----|---------|
| Maximum right | +A | 0 | 0 | Maximum | Constant |
| Equilibrium moving left | 0 | Maximum | Maximum | 0 | Constant |
| Maximum left | -A | 0 | 0 | Maximum | Constant |
| Equilibrium moving right | 0 | Maximum | Maximum | 0 | Constant |

#### Diagram: Energy Transformation in SHM Bar Chart Animation
<details markdown="1">
    <summary>Energy Transformation in SHM Bar Chart Animation</summary>
    Type: chart

    Chart type: Animated stacked bar chart with energy bars

    Purpose: Show how kinetic and potential energy transform during oscillation while total energy remains constant

    Layout:
    - Top section (400x200): Oscillating mass-spring system animation
    - Bottom section (400x300): Three vertical bar charts updating in real-time

    Data visualization:
    - Bar 1: Kinetic Energy (green)
      - Height varies from 0 to E_total
      - Maximum at equilibrium position

    - Bar 2: Potential Energy (blue)
      - Height varies from 0 to E_total
      - Maximum at amplitude positions

    - Bar 3: Total Energy (red)
      - Constant height at E_total
      - Shows sum of KE + PE

    Y-axis: Energy in joules (0 to E_total)
    X-axis labels: "Kinetic Energy", "Potential Energy", "Total Energy"

    Animation elements:
    - Mass oscillates on spring in top section
    - Bars update continuously to show current energy distribution
    - Numeric values displayed above each bar
    - Horizontal dashed line at total energy level

    Interactive controls:
    - Slider: Amplitude (0.5 m to 3.0 m)
    - Slider: Spring constant k (10 N/m to 100 N/m)
    - Button: "Start/Pause"
    - Button: "Reset"
    - Display: Total energy value

    Annotations:
    - When mass at maximum displacement: "PE maximum, KE = 0"
    - When mass at equilibrium: "KE maximum, PE = 0"
    - Continuous display: "Energy is conserved: E = ½kA²"

    Implementation: Chart.js with custom animation synchronized to oscillation
    Update rate: 60 fps for smooth energy transitions
</details>

## Section 6: Real-World Oscillations - Damping

### Damped Harmonic Motion

In the real world, no oscillation lasts forever. Friction, air resistance, and other non-conservative forces gradually remove energy from the system, causing the amplitude to decrease over time. This is called damped harmonic motion.

The damping force typically depends on velocity:

**F_damping = -bv**

Where:
- b is the damping coefficient (kg/s or N·s/m)
- v is the velocity
- The negative sign indicates the force opposes motion

Damping affects oscillations in three ways:

1. The amplitude decreases exponentially over time
2. The period may increase slightly (though often negligibly)
3. Eventually, the oscillation stops

Types of damping:

- Underdamping: The system oscillates with decreasing amplitude before coming to rest
- Critical damping: The system returns to equilibrium as quickly as possible without oscillating
- Overdamping: The system returns to equilibrium slowly without oscillating

Most real-world oscillators (pendulums, springs, guitar strings) are underdamped. They oscillate multiple times before stopping.

#### Diagram: Types of Damping Comparison Graph
<details markdown="1">
    <summary>Types of Damping Comparison Graph</summary>
    Type: chart

    Chart type: Line graph showing displacement vs. time for different damping levels

    Purpose: Compare underdamped, critically damped, and overdamped responses

    X-axis: Time (seconds, 0 to 10 s)
    Y-axis: Displacement (meters, -1.0 to +1.0 m)

    Data series:
    1. Underdamped (blue curve):
       - Oscillates with exponentially decreasing amplitude
       - Multiple crosses of equilibrium
       - Amplitude envelope shown as dashed lines
       - Eventually settles to zero

    2. Critically damped (green curve):
       - Starts at displacement = 1.0 m
       - Smoothly returns to zero
       - No oscillation
       - Fastest return without overshooting
       - Crosses zero once at t ≈ 2 s

    3. Overdamped (orange curve):
       - Starts at displacement = 1.0 m
       - Slowly returns to zero
       - No oscillation
       - Slower than critical damping
       - Asymptotically approaches zero

    Title: "Comparison of Damping Types in Oscillating Systems"
    Legend: Position top-right with color coding

    Annotations:
    - Arrow pointing to underdamped curve: "Most physical systems (pendulums, springs)"
    - Arrow pointing to critically damped: "Optimal for shock absorbers"
    - Arrow pointing to overdamped: "Very viscous systems"
    - Horizontal dashed line at y = 0 labeled "Equilibrium"

    Starting conditions (all curves):
    - Initial displacement: 1.0 m
    - Initial velocity: 0 m/s
    - Same natural frequency ω₀

    Implementation: Chart.js or similar library
    Equations used:
    - Underdamped: x(t) = A₀e^(-bt/2m) cos(ω't)
    - Critical: x(t) = (A₀ + Bt)e^(-ω₀t)
    - Overdamped: x(t) = A₁e^(-α₁t) + A₂e^(-α₂t)
</details>

### Applications of Damping

Damping is not always undesirable. Engineers carefully design damping into many systems:

| Application | Damping Type | Purpose |
|-------------|--------------|---------|
| Car shock absorbers | Near critical | Smooth ride without excessive bouncing |
| Building earthquake dampers | Underdamped | Reduce oscillation amplitude during earthquakes |
| Door closers | Near critical | Close smoothly without slamming or bouncing |
| Electrical circuits | Variable | Control signal response in electronics |
| Measuring instruments | Critical | Fast, accurate readings without oscillation |

In musical instruments, damping determines how long a note sustains. A piano string has light damping so notes ring out. Dampers can be applied to stop the sound immediately.

## Section 7: Driven Oscillations and Resonance

### Forced Oscillations

When you periodically apply an external force to an oscillating system, you create a driven or forced oscillation. The system responds to this driving force, and interesting behavior emerges.

Examples of driven oscillations:

- Pushing a child on a swing
- A washing machine during spin cycle
- Speakers driven by electrical signals
- Buildings responding to wind gusts

The driving force can be represented as:

**F_drive = F₀ cos(ω_d t)**

Where:
- F₀ is the amplitude of the driving force
- ω_d is the angular frequency of the driving force
- This is separate from the natural frequency ω₀ of the system

After initial transients die away, the system oscillates at the driving frequency ω_d, not its natural frequency ω₀. However, the amplitude of oscillation depends strongly on how close ω_d is to ω₀.

### Resonance: The Dramatic Effect

Resonance occurs when the driving frequency matches the natural frequency of the system (ω_d ≈ ω₀). At resonance, even a small driving force can produce very large amplitude oscillations. Energy is transferred most efficiently from the driver to the oscillator at the resonant frequency.

The amplitude at resonance depends on damping:

- Low damping: very sharp, high amplitude resonance peak
- High damping: broad, low amplitude resonance peak

Resonance amplitude can be dozens or hundreds of times larger than off-resonance oscillations. This explains why pushing a swing at the right frequency (its natural frequency) builds up large swings with minimal effort.

#### Diagram: Resonance Amplitude vs. Driving Frequency Interactive Graph
<details markdown="1">
    <summary>Resonance Amplitude vs. Driving Frequency Interactive Graph</summary>
    Type: chart

    Chart type: Line graph with interactive controls

    Purpose: Show how oscillation amplitude depends on driving frequency and damping level

    X-axis: Driving frequency ratio (ω_d/ω₀) from 0 to 3
    Y-axis: Amplitude ratio (A/A₀) from 0 to 20

    Data series (multiple curves for different damping):
    1. Low damping (b = 0.1): Sharp, tall peak at ω_d/ω₀ = 1
    2. Medium damping (b = 0.5): Moderate peak at ω_d/ω₀ = 1
    3. High damping (b = 2.0): Broad, low peak

    Title: "Resonance: Amplitude Response vs. Driving Frequency"
    Legend: Top-right showing damping values

    Interactive controls:
    - Slider: Damping coefficient b (0.05 to 3.0)
    - Slider: Natural frequency ω₀ (fixed at 1.0 for normalization)
    - Real-time curve update as damping changes
    - Hover over curve to see exact values

    Annotations:
    - Vertical dashed line at ω_d/ω₀ = 1 labeled "Resonance"
    - Arrow pointing to resonance peak: "Maximum energy transfer"
    - Text box: "At resonance, small driving force → large amplitude"
    - Shaded region around resonance showing "resonance width"

    Key features to highlight:
    - Peak amplitude occurs near natural frequency
    - Lower damping → higher peak, narrower width
    - Higher damping → lower peak, broader width
    - Far from resonance, amplitude is small regardless of damping

    Implementation: Chart.js with responsive curve calculations
    Formula: A/A₀ = F₀/m / √[(ω₀² - ω_d²)² + (bω_d/m)²]
</details>

### Famous Examples of Resonance

Resonance plays a crucial role in many phenomena:

**Positive applications:**

- Musical instruments: Resonance in sound boxes amplifies specific frequencies
- Radio tuning: Circuits resonate at desired frequency to select stations
- MRI machines: Nuclear spins resonate at specific frequencies for imaging
- Microwave ovens: Water molecules resonate at microwave frequency

**Dangerous resonance:**

- Tacoma Narrows Bridge collapse (1940): Wind-driven resonance destroyed the bridge
- Wine glass shattering: Sound wave at resonant frequency can break glass
- Building damage in earthquakes: Buildings resonate at certain frequencies
- Turbine blade failures: Resonant vibrations can cause catastrophic failure

Engineers must carefully analyze natural frequencies and avoid driving systems at resonance unless desired. Earthquake-resistant buildings are designed so their natural frequencies don't match typical earthquake frequencies.

#### Diagram: Tacoma Narrows Bridge Resonance Timeline
<details markdown="1">
    <summary>Tacoma Narrows Bridge Resonance Timeline</summary>
    Type: timeline

    Time period: November 1940 (specific day: November 7, 1940)

    Orientation: Horizontal

    Events:
    - 7:00 AM: Bridge opens to traffic, wind speed 35-40 mph
    - 8:00 AM: Workers notice vertical oscillations of 1.5 feet
    - 9:00 AM: Bridge closed to traffic due to increasing oscillations
    - 10:00 AM: Oscillations change from vertical to twisting mode
    - 10:30 AM: Torsional oscillations reach amplitude of 28 feet (resonance)
    - 11:00 AM: Center span collapses into Puget Sound
    - 11:10 AM: Complete failure of center section (2,800 ft span)

    Visual style: Horizontal timeline with dramatic imagery progression

    Color coding:
    - Green: Normal operation (7:00-8:00 AM)
    - Yellow: Warning signs (8:00-10:00 AM)
    - Orange: Critical resonance (10:00-10:30 AM)
    - Red: Catastrophic failure (10:30-11:10 AM)

    Interactive features:
    - Hover to see detailed description of each stage
    - Click to see archival photos from that time
    - Video icon on 10:30 AM entry links to famous collapse footage

    Key lessons box at end:
    - "Resonance can build destructively when driving frequency matches natural frequency"
    - "Aerodynamic forces created periodic driving force"
    - "Torsional mode had lower damping than vertical mode"
    - "Modern bridges include damping systems and aerodynamic designs"

    Implementation: HTML/CSS timeline with embedded media
</details>

### Controlling Resonance

To avoid destructive resonance or to exploit beneficial resonance, engineers use several strategies:

**Avoiding destructive resonance:**

- Change system design to alter natural frequency away from expected driving frequencies
- Add damping to reduce resonance amplitude
- Use vibration isolators to prevent driving forces from reaching sensitive components
- Monitor systems for unexpected resonance and shut down if detected

**Exploiting beneficial resonance:**

- Design musical instruments with specific resonant frequencies
- Tune radio circuits to resonate at desired signal frequency
- Use resonant cavities to amplify electromagnetic waves
- Create resonant structures in architecture for acoustic purposes

#### Diagram: Driven Oscillator Interactive MicroSim
<details markdown="1">
    <summary>Driven Oscillator Interactive MicroSim</summary>
    Type: microsim

    Learning objective: Observe how a driven oscillator responds to different driving frequencies and explore resonance

    Canvas layout (900x600px):
    - Left side (450x600): Drawing area with driven oscillator
    - Right side (450x600): Amplitude vs. time graph and controls

    Visual elements:
    - Mass on horizontal spring (similar to previous sims)
    - External driver shown as oscillating platform or force indicator
    - Driving force shown as arrow with varying length
    - Natural frequency indicator (dashed reference oscillation)
    - Amplitude measurement display
    - Graph showing amplitude build-up over time

    Interactive controls:
    - Slider: Driving frequency ω_d (0.1 to 3.0 times natural frequency)
    - Slider: Driving force amplitude F₀ (1 N to 20 N)
    - Slider: Damping coefficient b (0.1 to 2.0)
    - Display: Natural frequency ω₀ (calculated from m and k)
    - Display: Frequency ratio ω_d/ω₀
    - Button: "Start Driving Force"
    - Button: "Stop"
    - Button: "Reset"
    - Checkbox: "Show resonance curve" (overlays expected amplitude)

    Default parameters:
    - Mass: 1.0 kg
    - Spring constant: 100 N/m
    - Natural frequency ω₀ = √(k/m) ≈ 10 rad/s
    - Driving frequency: 1.0 × ω₀ (at resonance)
    - Damping: 0.5 kg/s
    - Driving force amplitude: 5 N

    Behavior:
    - System starts at rest
    - Driving force begins when "Start" clicked
    - Amplitude gradually builds up (transient phase)
    - After several cycles, reaches steady-state amplitude
    - Graph shows amplitude increasing over time until steady
    - At resonance (ω_d ≈ ω₀), amplitude becomes very large
    - Off resonance, amplitude remains modest
    - Changing frequency during operation shows transition behavior
    - Color changes when near resonance (red warning)

    Special features:
    - When ω_d/ω₀ is between 0.9 and 1.1, display "Near resonance!" warning
    - Plot maximum amplitude achieved on resonance curve graph
    - Show phase relationship between driving force and displacement

    Implementation notes:
    - Use p5.js for rendering
    - Numerical integration for driven damped oscillator
    - Equation: m(d²x/dt²) + b(dx/dt) + kx = F₀cos(ω_d t)
    - Track amplitude envelope for graph
    - Calculate theoretical steady-state amplitude for comparison
</details>

## Section 8: Mathematical Description of SHM

### Position, Velocity, and Acceleration Equations

For an object undergoing simple harmonic motion, its position as a function of time follows a sinusoidal pattern. Using cosine as our reference:

**Position: x(t) = A cos(ωt + φ)**

Where:
- x(t) is position at time t
- A is amplitude
- ω is angular frequency
- φ is phase constant (initial phase)

Taking the derivative gives velocity:

**Velocity: v(t) = -Aω sin(ωt + φ)**

Taking another derivative gives acceleration:

**Acceleration: a(t) = -Aω² cos(ωt + φ) = -ω²x(t)**

Notice that acceleration is proportional to position but opposite in direction—the defining characteristic of SHM.

The phase constant φ depends on initial conditions:

- If released from maximum positive displacement at t = 0: φ = 0
- If released from equilibrium while moving in positive direction at t = 0: φ = -π/2
- If released from maximum negative displacement at t = 0: φ = π

### Maximum Values

From the equations above, we can identify maximum values:

| Quantity | Maximum Value | When It Occurs |
|----------|---------------|----------------|
| Displacement | A | At turning points (v = 0) |
| Velocity | Aω | At equilibrium (x = 0) |
| Acceleration | Aω² | At maximum displacement |

These maximums relate to energy:

- Maximum KE = (1/2)m(v_max)² = (1/2)m(Aω)² = (1/2)kA²
- Maximum PE = (1/2)kA²
- Total energy = (1/2)kA²

## Section 9: Real-World Applications

### Oscillations in Technology

Oscillations appear throughout modern technology:

**Timekeeping:**
- Quartz watches use crystal oscillators vibrating at 32,768 Hz
- Pendulum clocks rely on gravitational oscillations
- Atomic clocks use cesium atom oscillations (billions of Hz)

**Communications:**
- Radio transmitters use LC circuit oscillations to generate signals
- Cell phone towers operate at gigahertz frequencies
- GPS satellites transmit precise frequency signals

**Sensors and Measurements:**
- Seismographs detect Earth oscillations from earthquakes
- Accelerometers in phones use micro-oscillators
- Pressure sensors often use resonant frequency changes

**Transportation:**
- Car suspension systems are designed as damped oscillators
- Aircraft wings have natural frequencies engineers must avoid exciting
- Train cars use spring-damper systems for passenger comfort

#### Diagram: Applications of Oscillations Across Fields Infographic
<details markdown="1">
    <summary>Applications of Oscillations Across Fields Infographic</summary>
    Type: infographic

    Purpose: Show the wide range of applications for oscillation principles across different fields

    Layout: Radial design with central hub and six extending sections

    Central hub: "Oscillations in the Real World"

    Six sections radiating outward:

    1. Medicine (pink section):
       - Ultrasound imaging (high-frequency oscillations)
       - Heart rate monitoring (periodic biological oscillations)
       - Ventilators (controlled pressure oscillations)
       - Icon: Heart with wave

    2. Architecture (blue section):
       - Earthquake dampers in buildings
       - Tuned mass dampers in skyscrapers
       - Bridge design considerations
       - Icon: Building with damper

    3. Music (purple section):
       - Instrument string vibrations
       - Resonance in sound boxes
       - Tuning forks (440 Hz for A note)
       - Icon: Guitar

    4. Transportation (green section):
       - Shock absorbers
       - Engine balancing
       - Aircraft wing flutter prevention
       - Icon: Car suspension

    5. Electronics (orange section):
       - Crystal oscillators in computers
       - Radio wave transmission
       - Signal processing filters
       - Icon: Circuit with oscillator symbol

    6. Sports (red section):
       - Diving board oscillations
       - Pole vault dynamics
       - Trampoline physics
       - Icon: Athlete on springboard

    Interactive elements:
    - Hover over each section to expand with more details
    - Click section to see example video or animation
    - Rotating highlight to draw attention to each area sequentially

    Visual style: Modern infographic with icons, short text descriptions, and connecting lines from central hub

    Color coding: Each field has distinct color with gradient effects

    Statistics boxes:
    - "32,768 Hz: Quartz watch oscillation frequency"
    - "0.5 Hz: Typical building natural frequency"
    - "20-20,000 Hz: Human hearing range"
    - "300 tons: Mass of Taipei 101 tuned mass damper"

    Implementation: SVG graphics with CSS animations and JavaScript interactivity
</details>

### Biological Oscillations

Living systems exhibit countless oscillations:

**Physiological rhythms:**
- Heartbeat: 60-100 beats per minute (≈1-1.7 Hz)
- Breathing: 12-20 breaths per minute (≈0.2-0.3 Hz)
- Brain waves: 0.5-100 Hz depending on state
- Circadian rhythms: 24-hour cycles

**Cellular oscillations:**
- Neuron firing patterns
- Cell division cycles
- Protein synthesis oscillations
- Calcium ion concentration waves

**Ecological cycles:**
- Predator-prey population oscillations
- Seasonal migration patterns
- Tidal influence on marine life
- Plant circadian rhythms

### Engineering Challenges

Engineers constantly deal with oscillation challenges:

**Preventing unwanted oscillations:**
- Buildings must withstand earthquake frequencies without resonating
- Bridges designed to avoid wind-induced oscillations
- Machinery balanced to prevent destructive vibrations
- Electrical grids stabilized against oscillating power demand

**Exploiting beneficial oscillations:**
- Resonant cavities in microwave devices
- Musical instrument design for specific tones
- Magnetic resonance imaging (MRI) for medical diagnosis
- Wireless power transfer using resonant coupling

## Practice Problems

### Problem Set 1: Basic Concepts

1. A mass oscillates on a spring with amplitude 15 cm, period 2.0 s, and frequency 0.5 Hz. Calculate the angular frequency.

2. At what position is the velocity of an oscillating mass at maximum? At what position is the acceleration maximum?

3. A spring with constant k = 80 N/m is compressed by 0.1 m. What force does it exert?

### Problem Set 2: Mass-Spring Systems

4. A 0.4 kg mass attached to a spring with k = 100 N/m oscillates on a frictionless surface. Calculate:
   a) The period of oscillation
   b) The frequency
   c) The angular frequency

5. If the mass in problem 4 has amplitude 0.2 m, what is its maximum velocity? Maximum acceleration?

6. A spring-mass system has period 1.5 s. If you triple the mass, what is the new period?

### Problem Set 3: Pendulums

7. A simple pendulum has length 1.0 m. Calculate its period on Earth (g = 9.8 m/s²).

8. You want to build a pendulum clock with period exactly 2.0 s. What length should the pendulum be?

9. Does doubling the mass of a pendulum bob change the period? Explain.

### Problem Set 4: Energy

10. A mass-spring system has amplitude 0.3 m and spring constant 50 N/m. Calculate:
    a) The total mechanical energy
    b) The potential energy when x = 0.2 m
    c) The kinetic energy when x = 0.2 m

### Problem Set 5: Resonance

11. A mass-spring system has natural frequency 5.0 Hz. At what driving frequency will resonance occur?

12. Explain why pushing a child on a swing at the right frequency builds up large oscillations with minimal effort.

13. The Tacoma Narrows Bridge had a natural frequency near the driving frequency from wind. Explain in terms of resonance why this caused collapse.

## Summary

Oscillations represent one of the most fundamental types of motion in physics. Key takeaways from this chapter:

**Simple Harmonic Motion:**
- Restoring force proportional to displacement: F = -kx
- Motion described by sinusoidal functions
- Period independent of amplitude
- Energy continuously transforms between kinetic and potential

**Describing Oscillations:**
- Amplitude: maximum displacement from equilibrium
- Period: time for one complete cycle
- Frequency: cycles per second
- Angular frequency: ω = 2πf, connects to circular motion

**Springs:**
- Hooke's Law: F = -kx
- Spring constant k measures stiffness
- Period: T = 2π√(m/k)
- Energy stored: E = (1/2)kA²

**Pendulums:**
- Simple pendulum: T = 2π√(L/g)
- Period independent of mass
- Only approximates SHM for small angles
- Physical pendulums have distributed mass

**Damping:**
- Real oscillations lose energy to friction
- Amplitude decreases exponentially
- Three types: underdamped, critically damped, overdamped
- Critical damping returns to equilibrium fastest without oscillating

**Resonance:**
- Occurs when driving frequency matches natural frequency
- Amplitude can become very large
- Can be beneficial (musical instruments) or destructive (bridge collapse)
- Controlled through design and damping

**Applications:**
- Timekeeping, communications, sensors
- Musical instruments, architectural dampers
- Medical devices, transportation systems
- Biological rhythms and ecological cycles

Understanding oscillations prepares you for the next chapter on waves, where oscillations propagate through space. Many wave phenomena—from sound to light—build directly on the principles of simple harmonic motion you've learned here.

## Key Equations Reference

| Concept | Equation | Variables |
|---------|----------|-----------|
| Restoring force | F = -kx | k = constant, x = displacement |
| Hooke's Law | F = -kx | k = spring constant |
| Period-frequency | T = 1/f | T = period, f = frequency |
| Angular frequency | ω = 2πf = 2π/T | ω in rad/s |
| Mass-spring period | T = 2π√(m/k) | m = mass, k = spring constant |
| Simple pendulum period | T = 2π√(L/g) | L = length, g = gravity |
| SHM position | x(t) = A cos(ωt + φ) | A = amplitude, φ = phase |
| SHM velocity | v(t) = -Aω sin(ωt + φ) | Maximum at equilibrium |
| SHM acceleration | a(t) = -ω²x(t) | Proportional to displacement |
| Total energy | E = (1/2)kA² | For mass-spring system |
| Potential energy | PE = (1/2)kx² | Spring at displacement x |
| Kinetic energy | KE = (1/2)mv² | Mass with velocity v |

## Vocabulary

- **Amplitude**: Maximum displacement from equilibrium position in an oscillation
- **Angular frequency**: Rate of oscillation in radians per second (ω = 2πf)
- **Critical damping**: Damping level that returns system to equilibrium as quickly as possible without oscillation
- **Damping**: Energy loss in an oscillating system due to non-conservative forces
- **Driving frequency**: Frequency at which an external force is applied to an oscillator
- **Equilibrium position**: Position where net force on oscillating object is zero
- **Forced oscillation**: Oscillation driven by periodic external force
- **Frequency**: Number of complete oscillation cycles per second, measured in hertz (Hz)
- **Hooke's Law**: Spring force proportional to displacement: F = -kx
- **Oscillation**: Repetitive back-and-forth motion about an equilibrium position
- **Overdamping**: Heavy damping causing slow return to equilibrium without oscillation
- **Pendulum**: Mass suspended from pivot that swings under gravity
- **Period**: Time required for one complete oscillation cycle
- **Phase constant**: Initial angle in SHM equation determining starting conditions
- **Physical pendulum**: Rigid body oscillating about a fixed axis
- **Resonance**: Large amplitude oscillations when driving frequency matches natural frequency
- **Restoring force**: Force that returns oscillating object toward equilibrium
- **Simple harmonic motion (SHM)**: Oscillation with restoring force proportional to displacement
- **Simple pendulum**: Idealized pendulum with point mass on massless string
- **Spring constant**: Measure of spring stiffness in Hooke's Law (k in N/m)
- **Underdamping**: Light damping allowing multiple oscillations with decreasing amplitude

---

**Next Steps:** In [Chapter 10: Waves](../10-waves/index.md), you'll see how oscillations propagate through space, creating wave motion. The concepts of period, frequency, and amplitude carry directly into wave physics, while new concepts like wavelength and wave speed emerge.
