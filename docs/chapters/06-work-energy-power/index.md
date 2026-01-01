# Work, Energy, and Power

## Summary

This chapter introduces one of physics' most powerful concepts: energy and its conservation. You'll learn how forces do work to transfer energy, and how energy transforms between kinetic energy (energy of motion) and potential energy (stored energy). The work-energy theorem provides an alternative approach to solving mechanics problems, often simpler than using Newton's laws directly. You'll distinguish between conservative and non-conservative forces, analyze energy transformations using diagrams, and explore power as the rate of energy transfer. Simple machines demonstrate how mechanical advantage can amplify forces, though energy conservation always applies. These energy principles will reappear throughout the rest of physics.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Work
2. Work by Constant Force
3. Work by Variable Force
4. Work-Energy Theorem
5. Kinetic Energy
6. Potential Energy
7. Gravitational Potential Energy
8. Elastic Potential Energy
9. Conservative Forces
10. Non-conservative Forces
11. Conservation of Energy
12. Mechanical Energy
13. Energy Diagrams
14. Power
15. Efficiency

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Scientific Foundations and Mathematical Tools](../01-scientific-foundations/index.md)
- [Chapter 2: Motion in One Dimension](../02-motion-one-dimension/index.md)
- [Chapter 4: Forces and Newton's Laws](../04-forces-newtons-laws/index.md)

---

## Introduction to Energy Concepts

Energy is everywhere. It powers your phone, moves cars down the highway, and even keeps your heart beating. In this chapter, you'll explore one of the most fundamental ideas in all of physics: energy and how it transforms from one form to another. Unlike previous chapters where we focused on forces and motion directly, energy provides an alternative perspective that often makes solving problems much simpler.

The beauty of energy analysis lies in its universality. Whether you're analyzing a roller coaster, a bow and arrow, or a hydroelectric dam, the same energy principles apply. Energy is conserved—it never disappears, but constantly transforms between different forms. This powerful idea will help you understand not just physics problems, but real-world phenomena from renewable energy to how your muscles work.

## What is Work?

In everyday language, "work" means many things—homework, a job, effort. In physics, work has a precise definition that connects force and motion. Understanding this definition is your first step toward mastering energy concepts.

### The Physics Definition of Work

**Work** is the process of transferring energy by applying a force over a distance. For work to occur, three conditions must be met:

1. A force must be applied to an object
2. The object must move in some direction
3. At least some component of the force must be in the direction of motion

If any of these conditions is missing, no work is done in the physics sense. You can push against a brick wall all day until you're exhausted, but if the wall doesn't move, you've done zero work in physics terms (though your muscles certainly expended energy!).

### Work by a Constant Force

When a constant force acts on an object that moves in a straight line, calculating work is straightforward. The **work done by a constant force** is given by:

$$W = F \cdot d \cdot \cos(\theta)$$

Where:

- $W$ = work (measured in joules, J)
- $F$ = magnitude of the applied force (newtons, N)
- $d$ = displacement of the object (meters, m)
- $\theta$ = angle between the force vector and displacement vector

This equation reveals several important insights:

- When force and displacement are in the same direction ($\theta = 0°$), work is maximum: $W = Fd$
- When force is perpendicular to displacement ($\theta = 90°$), no work is done: $W = 0$
- When force opposes displacement ($\theta = 180°$), work is negative: $W = -Fd$

**Example:** If you push a 20 kg box with a force of 50 N across a floor for 3 meters in the direction you're pushing, the work done is:

$$W = (50 \text{ N})(3 \text{ m})\cos(0°) = 150 \text{ J}$$

### Work in Different Scenarios

Let's examine how work behaves in different situations:

| Scenario | Force Direction | Angle | Work Done |
|----------|----------------|-------|-----------|
| Pushing a cart forward | Same as motion | 0° | Positive (maximum) |
| Lifting a box upward | Upward (against gravity) | 0° | Positive |
| Friction on sliding object | Opposite to motion | 180° | Negative |
| Carrying a box horizontally | Perpendicular to motion | 90° | Zero |
| Pulling a sled at an angle | Between parallel and perpendicular | 30°-60° | Positive (reduced) |

#### Diagram: Work Scenario Interactive Diagram

<iframe src="../../sims/work-scenarios/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
    <summary>Work Scenario Interactive Diagram</summary>
    **Status:** done

    Type: diagram

    Purpose: Illustrate how the angle between force and displacement affects the work done, showing multiple common scenarios visually.

    Components to show:
    - Five panels showing different work scenarios
    - Each panel shows: object, applied force vector (red arrow), displacement vector (blue arrow), and angle between them

    Panel 1: Pushing cart (same direction)
    - Cart moving right
    - Force arrow pointing right
    - Displacement arrow pointing right
    - Angle: 0°
    - Label: "W = Fd (maximum positive work)"

    Panel 2: Lifting box (upward)
    - Box moving upward
    - Applied force arrow pointing up
    - Weight force arrow pointing down (dashed)
    - Displacement arrow pointing up
    - Angle: 0° (between applied force and displacement)
    - Label: "W = Fd (positive work against gravity)"

    Panel 3: Friction opposing motion
    - Block sliding right
    - Friction force arrow pointing left
    - Displacement arrow pointing right
    - Angle: 180°
    - Label: "W = -Fd (negative work)"

    Panel 4: Carrying box horizontally
    - Person carrying box, walking right
    - Applied force arrow pointing up
    - Displacement arrow pointing right
    - Angle: 90°
    - Label: "W = 0 (no work by lifting force)"

    Panel 5: Pulling sled at angle
    - Sled moving right
    - Rope force arrow at 30° above horizontal
    - Displacement arrow pointing right horizontally
    - Angle: 30°
    - Label: "W = Fd cos(30°) (partial work)"
    - Show force component parallel to ground (dashed green arrow)

    Style: Clean vector diagram with bold arrows, clear labels

    Color scheme:
    - Force arrows: Red
    - Displacement arrows: Blue
    - Weight/opposing forces: Dashed gray
    - Force components: Dashed green
    - Background: Light gray for each panel

    Annotations:
    - Angle arcs showing θ between force and displacement
    - Numerical angle values
    - Work equation result for each case
</details>

### Work by a Variable Force

Many real-world forces aren't constant—they change as an object moves. Springs are a perfect example: the more you compress or stretch a spring, the harder it pushes back. Calculating **work by a variable force** requires a different approach.

For a force that varies with position, work is calculated using integration:

$$W = \int_{x_1}^{x_2} F(x) \, dx$$

Graphically, this represents the area under a force-versus-position graph between the initial and final positions.

**Spring Example:** For an ideal spring following Hooke's Law ($F = kx$), the work done in stretching or compressing the spring from its natural length by a distance $x$ is:

$$W = \frac{1}{2}kx^2$$

This quadratic relationship means doubling the stretch requires four times the work.

#### Diagram: Variable Force Work Calculation MicroSim

<iframe src="../../sims/variable-force-work/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
    <summary>Variable Force Work Calculation MicroSim</summary>
    **Status:** done

    Type: microsim

    Learning objective: Help students visualize how work is calculated for variable forces by showing the area under a force-position curve and allowing them to experiment with different force functions.

    Canvas layout (900x700px):
    - Left side (600x700): Drawing area showing force vs. position graph
    - Right side (300x700): Control panel with inputs and calculations

    Visual elements in drawing area:
    - Axes: Horizontal axis = Position (m), Vertical axis = Force (N)
    - Grid lines for reference
    - Force curve drawn in blue (updates based on selection)
    - Shaded area under curve (yellow/orange gradient) representing work
    - Vertical lines at start and end positions
    - Area calculation displayed on graph

    Interactive controls:
    - Dropdown: Select force type
      * Constant force: F = 10 N
      * Linear (Hooke's Law): F = 5x N
      * Quadratic: F = 2x² N
      * Square root: F = 8√x N

    - Slider: Start position (0-5 m, default 0 m)
    - Slider: End position (0-10 m, default 4 m)

    - Button: "Calculate Work"
    - Button: "Reset"

    - Display panel showing:
      * Force equation
      * Integration setup
      * Calculated work value in joules
      * Comparison message (e.g., "Equivalent to lifting a 2 kg object 5 meters")

    Default parameters:
    - Force type: Hooke's Law (F = 5x)
    - Start position: 0 m
    - End position: 4 m
    - Work calculated: 40 J

    Behavior:
    - When force type selected, update curve immediately
    - When sliders moved, update vertical position lines and shaded area in real-time
    - When "Calculate Work" clicked:
      * Perform numerical integration
      * Display step-by-step calculation
      * Animate filling of area under curve
      * Show final work value
    - Provide real-world comparison for work value

    Implementation notes:
    - Use p5.js for rendering
    - Implement numerical integration (trapezoidal rule or Simpson's rule)
    - Scale axes appropriately based on force function selected
    - Use smooth curves with bezier or vertex points
    - Color-code area based on work magnitude (light yellow for low, deep orange for high)
</details>

## Kinetic Energy: Energy of Motion

Now that we understand work as energy transfer, let's explore the first major form of energy: kinetic energy.

**Kinetic energy** (KE) is the energy an object possesses due to its motion. Any moving object—from a rolling ball to a speeding bullet—has kinetic energy. The faster it moves or the more massive it is, the more kinetic energy it has.

The equation for kinetic energy is:

$$KE = \frac{1}{2}mv^2$$

Where:

- $KE$ = kinetic energy (joules, J)
- $m$ = mass (kilograms, kg)
- $v$ = speed (meters per second, m/s)

Notice that kinetic energy depends on the square of velocity. This means:

- Doubling the speed quadruples the kinetic energy
- Tripling the speed increases kinetic energy by a factor of nine
- Halving the speed reduces kinetic energy to one-quarter

This quadratic relationship has important real-world implications. A car traveling at 60 mph has four times the kinetic energy of the same car at 30 mph, which is why high-speed collisions are so much more destructive.

**Example:** A 1200 kg car traveling at 25 m/s (about 56 mph) has kinetic energy:

$$KE = \frac{1}{2}(1200 \text{ kg})(25 \text{ m/s})^2 = 375,000 \text{ J}$$

That's enough energy to lift the car 32 meters straight up!

## The Work-Energy Theorem

One of the most powerful tools in physics connects work and kinetic energy through a simple, elegant relationship.

### The Fundamental Connection

The **work-energy theorem** states that the net work done on an object equals its change in kinetic energy:

$$W_{net} = \Delta KE = KE_f - KE_i$$

Or expanded:

$$W_{net} = \frac{1}{2}mv_f^2 - \frac{1}{2}mv_i^2$$

This theorem provides an alternative to using Newton's second law for solving motion problems. Instead of analyzing forces and accelerations, you can often solve problems more easily by tracking energy changes.

### Why This Theorem Matters

The work-energy theorem is powerful because:

1. **It's independent of path**: Only the initial and final states matter, not the details of motion in between
2. **It handles variable forces naturally**: No need to track changing accelerations
3. **It simplifies complex problems**: Many multi-step force problems become single-step energy problems
4. **It's universally applicable**: Works for any object, any force, any path

**Example Problem:** A 5 kg block sliding at 8 m/s encounters a rough surface that exerts a friction force of 20 N. How far does the block slide before stopping?

Using forces (Newton's second law):
1. Find acceleration: $a = F/m = -20/5 = -4$ m/s²
2. Use kinematic equation: $v_f^2 = v_i^2 + 2ad$
3. Solve for $d$: $0 = 64 + 2(-4)d$, so $d = 8$ m

Using work-energy theorem:
1. Initial KE: $\frac{1}{2}(5)(8)^2 = 160$ J
2. Final KE: 0 J (block stops)
3. Work by friction: $W = -Fd = -20d$
4. Apply theorem: $-20d = 0 - 160$, so $d = 8$ m

Same answer, but the energy approach is often more intuitive and requires fewer steps.

#### Diagram: Work-Energy Theorem Interactive Demonstration

<iframe src="../../sims/work-energy-theorem/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
    <summary>Work-Energy Theorem Interactive Demonstration</summary>
    **Status:** done

    Type: microsim

    Learning objective: Demonstrate the work-energy theorem by showing how forces do work to change an object's kinetic energy, with real-time calculations and visualizations.

    Canvas layout (1000x600px):
    - Top section (1000x400): Animation area showing object motion
    - Bottom section (1000x200): Energy bar chart and calculations

    Visual elements in animation area:
    - Horizontal track/surface
    - Moving object (box/cart) with velocity vector arrow
    - Applied force arrow (adjustable, red)
    - Friction force arrow (if present, orange)
    - Distance markers along track (0-20 m)
    - Speedometer showing current velocity

    Visual elements in energy display:
    - Bar chart with three bars:
      * Initial KE (blue bar)
      * Final KE (green bar)
      * Work done (red/orange bar showing + or -)
    - Numerical values above each bar
    - Equation display showing W_net = ΔKE

    Interactive controls:
    - Slider: Object mass (1-20 kg, default 5 kg)
    - Slider: Initial velocity (0-15 m/s, default 8 m/s)
    - Slider: Applied force (-50 to +50 N, default 0 N)
    - Slider: Friction coefficient (0-0.5, default 0.2)
    - Checkbox: "Show friction force"
    - Button: "Start Simulation"
    - Button: "Reset"
    - Display: Time elapsed, distance traveled, current velocity

    Default parameters:
    - Mass: 5 kg
    - Initial velocity: 8 m/s
    - Applied force: 0 N
    - Friction coefficient: 0.2
    - Track length: 20 m

    Behavior:
    - When "Start Simulation" clicked:
      * Animate object moving along track
      * Update velocity vector size based on current speed
      * Show force arrows (scaled to magnitude)
      * Update energy bars in real-time
      * Calculate and display work done continuously
      * Stop when object reaches end or velocity = 0

    - Real-time calculations shown:
      * Current KE = ½mv²
      * Work by applied force = F·d
      * Work by friction = -μmg·d
      * Net work = sum of all work
      * Verify: W_net = KE_final - KE_initial

    - Color coding for work:
      * Positive work (energy added): Red bar extending right
      * Negative work (energy removed): Orange bar extending left
      * Net work matches change in KE bars

    - At end of simulation:
      * Display summary: "Net work = ___ J, ΔKE = ___ J"
      * Highlight verification: "Work-energy theorem verified!"
      * Show percent error (should be ~0%)

    Implementation notes:
    - Use p5.js for animation
    - Update position using: v² = v₀² + 2a·Δx
    - Calculate net acceleration: a = (F_applied - F_friction)/m
    - Use frameRate to control animation speed
    - Update energy bars smoothly with interpolation
    - Scale force arrows: 1 cm = 10 N
</details>

## Potential Energy: Stored Energy

While kinetic energy is energy of motion, **potential energy** (PE) is stored energy based on an object's position or configuration. It represents the potential to do work in the future.

Think of potential energy like money in a bank account—it's available to be spent (converted to kinetic energy) when needed. There are several types of potential energy, but we'll focus on the two most common: gravitational and elastic.

### Gravitational Potential Energy

**Gravitational potential energy** is the energy stored in an object due to its height above a reference point. Lift a book above your desk, and you've given it gravitational potential energy. Release it, and that stored energy converts to kinetic energy as it falls.

The equation for gravitational potential energy near Earth's surface is:

$$PE_g = mgh$$

Where:

- $PE_g$ = gravitational potential energy (joules, J)
- $m$ = mass (kg)
- $g$ = gravitational acceleration (9.8 m/s²)
- $h$ = height above reference point (m)

Key points about gravitational potential energy:

- The reference point (where $h = 0$) is arbitrary—choose what's convenient
- Only changes in height matter, not the absolute height
- Gravitational PE increases linearly with height
- The same amount of work is required to lift an object regardless of the path taken

**Example:** Lifting a 10 kg backpack from the floor to a shelf 2 meters high increases its gravitational potential energy by:

$$PE_g = (10 \text{ kg})(9.8 \text{ m/s}^2)(2 \text{ m}) = 196 \text{ J}$$

### Elastic Potential Energy

**Elastic potential energy** is energy stored in objects that can be stretched, compressed, or deformed and then return to their original shape. Springs, rubber bands, and drawn bows all store elastic potential energy.

For an ideal spring obeying Hooke's Law, the elastic potential energy is:

$$PE_s = \frac{1}{2}kx^2$$

Where:

- $PE_s$ = elastic potential energy (J)
- $k$ = spring constant (N/m), measuring the spring's stiffness
- $x$ = displacement from natural length (m)

Notice this is the same expression we found earlier for work done on a spring. That makes sense: the work you do compressing the spring is stored as elastic potential energy.

Important characteristics:

- Elastic PE depends on the square of displacement (quadratic relationship)
- Doubling the compression/extension quadruples the stored energy
- Energy is the same whether spring is compressed or stretched by distance $x$
- Stiffer springs (larger $k$) store more energy for the same displacement

**Example:** Compressing a spring with $k = 200$ N/m by 0.3 meters stores:

$$PE_s = \frac{1}{2}(200 \text{ N/m})(0.3 \text{ m})^2 = 9 \text{ J}$$

#### Diagram: Potential Energy Comparison Chart

<iframe src="../../sims/potential-energy-chart/main.html" width="100%" height="502px" scrolling="no"></iframe>

<details markdown="1">
    <summary>Potential Energy Comparison Chart</summary>
    **Status:** done

    Type: chart

    Chart type: Side-by-side bar chart with grouped bars

    Purpose: Compare gravitational and elastic potential energy values for different scenarios, helping students understand the relative magnitudes and relationships.

    X-axis: Scenario (categorical)
    Y-axis: Potential Energy (joules, linear scale 0-500 J)

    Scenarios and data:
    1. "Small object low height"
       - Gravitational PE: 20 J (1 kg mass at 2 m height)
       - Elastic PE: 25 J (k=100 N/m, x=0.7 m)

    2. "Medium object medium height"
       - Gravitational PE: 98 J (5 kg mass at 2 m height)
       - Elastic PE: 100 J (k=200 N/m, x=1.0 m)

    3. "Large object low height"
       - Gravitational PE: 196 J (20 kg mass at 1 m height)
       - Elastic PE: 200 J (k=400 N/m, x=1.0 m)

    4. "Small object high height"
       - Gravitational PE: 294 J (3 kg mass at 10 m height)
       - Elastic PE: 288 J (k=800 N/m, x=0.85 m)

    5. "Large object high height"
       - Gravitational PE: 490 J (5 kg mass at 10 m height)
       - Elastic PE: 450 J (k=1000 N/m, x=0.95 m)

    Bar colors:
    - Gravitational PE: Blue bars
    - Elastic PE: Orange bars

    Title: "Gravitational vs. Elastic Potential Energy Comparison"

    Legend: Position top-right, showing:
    - Blue: Gravitational PE (mgh)
    - Orange: Elastic PE (½kx²)

    Annotations:
    - Label each bar with exact value in joules
    - Below each scenario, show the parameters in small text:
      * Scenario 1: "1 kg, 2 m" and "k=100 N/m, x=0.7 m"
      * Scenario 2: "5 kg, 2 m" and "k=200 N/m, x=1.0 m"
      * etc.

    Additional features:
    - Hover over bar to see:
      * Full calculation breakdown
      * Energy equivalent (e.g., "Enough to lift ___ kg by 1 meter")

    Implementation: Chart.js library with tooltips enabled
    Canvas size: 800x500px
</details>

## Conservative vs. Non-Conservative Forces

Not all forces are created equal when it comes to energy. Some forces conserve mechanical energy, while others dissipate it. This distinction is crucial for understanding energy conservation.

### Conservative Forces

**Conservative forces** are forces for which the work done is independent of the path taken—only the starting and ending points matter. These forces have an associated potential energy.

Common examples of conservative forces:

- Gravitational force
- Elastic spring force
- Electrostatic force (covered in later chapters)

Key characteristics:

1. Work done is path-independent
2. Work done around a closed loop is zero
3. Associated with a potential energy function
4. Mechanical energy is conserved

**Path Independence Example:** Whether you lift a book straight up 2 meters or carry it up a winding staircase that rises 2 meters, the work done against gravity is the same: $mgh = mg(2)$.

### Non-Conservative Forces

**Non-conservative forces** are forces for which the work done depends on the path taken. These forces convert mechanical energy to other forms (typically thermal energy) and have no associated potential energy function.

Common examples of non-conservative forces:

- Friction (kinetic and static)
- Air resistance
- Tension in a rope (when energy is dissipated)
- Normal force (when used to dissipate energy)
- Applied forces from motors or muscles

Key characteristics:

1. Work done depends on the path
2. Work done around a closed loop is not zero
3. No potential energy function exists
4. Mechanical energy is not conserved (converted to heat, sound, etc.)

**Path Dependence Example:** Sliding a box 10 meters in a straight line requires less work against friction than sliding it along a zigzag path totaling 15 meters, even if both paths start and end at the same points.

### Why This Distinction Matters

Understanding conservative versus non-conservative forces tells you whether you can use energy conservation equations or need to account for energy dissipation:

- **Conservative forces only** → Total mechanical energy is conserved
- **Non-conservative forces present** → Mechanical energy decreases (usually converted to thermal energy)

This guides your problem-solving approach and determines which equations apply.

## Conservation of Energy

We've arrived at one of the most profound principles in all of physics: energy conservation. This principle underlies everything from roller coasters to rocket propulsion to the universe itself.

### The Law of Conservation of Energy

The **law of conservation of energy** states that energy cannot be created or destroyed, only transformed from one form to another. The total energy of an isolated system remains constant.

In equation form:

$$E_{total} = E_{kinetic} + E_{potential} + E_{thermal} + E_{chemical} + ... = \text{constant}$$

For mechanical systems where we focus on kinetic and potential energy, we often refer to **conservation of mechanical energy**:

$$E_{mechanical} = KE + PE = \text{constant}$$

Or more explicitly:

$$KE_i + PE_i = KE_f + PE_f$$

This equation is valid only when no non-conservative forces do work (or when we account for energy converted to other forms).

### When Mechanical Energy is Conserved

Mechanical energy is conserved when:

1. Only conservative forces do work
2. The system is isolated (no external forces)
3. No energy is converted to non-mechanical forms (heat, sound, light, etc.)

Examples where mechanical energy is approximately conserved:

- A pendulum swinging in a vacuum (no air resistance)
- A satellite orbiting Earth (neglecting atmospheric drag)
- A ball on a frictionless track
- An ideal spring-mass system

### When Mechanical Energy is Not Conserved

When non-conservative forces like friction are present, mechanical energy decreases (it's converted to thermal energy, not destroyed):

$$KE_i + PE_i = KE_f + PE_f + E_{thermal}$$

Or equivalently:

$$W_{non-conservative} = \Delta KE + \Delta PE$$

The work done by non-conservative forces equals the change in mechanical energy.

**Example:** A 2 kg ball is dropped from 5 meters. Without air resistance, it would hit the ground at:

Using energy conservation: $mgh = \frac{1}{2}mv^2$

$$v = \sqrt{2gh} = \sqrt{2(9.8)(5)} = 9.9 \text{ m/s}$$

With air resistance doing -20 J of work, the final speed is reduced:

$$mgh - 20 = \frac{1}{2}mv^2$$
$$(2)(9.8)(5) - 20 = \frac{1}{2}(2)v^2$$
$$v = 8.1 \text{ m/s}$$

The "missing" 20 J was converted to thermal energy heating the air and ball.

#### Diagram: Energy Conservation Roller Coaster Simulation

<iframe src="../../sims/roller-coaster-energy/main.html" width="100%" height="702px" scrolling="no"></iframe>

<details markdown="1">
    <summary>Energy Conservation Roller Coaster Simulation</summary>
    **Status:** done

    Type: microsim

    Learning objective: Demonstrate conservation of mechanical energy by simulating a roller coaster where students can see energy transforming between kinetic and potential energy while total mechanical energy remains constant.

    Canvas layout (1000x700px):
    - Top section (1000x500): Animation area with roller coaster track
    - Bottom section (1000x200): Energy display with bar charts and graphs

    Visual elements in animation area:
    - Curved roller coaster track (customizable shape)
    - Cart moving along track (circle or cart icon)
    - Height markers along y-axis (0-15 meters)
    - Velocity vector arrow on cart
    - Current position marker
    - Track supports and ground reference line

    Visual elements in energy display:
    - Stacked bar chart showing energy distribution at current moment:
      * Bottom portion: Kinetic Energy (blue)
      * Top portion: Potential Energy (red)
      * Total height always constant
    - Line graph showing energy over time:
      * Blue line: KE vs. time
      * Red line: PE vs. time
      * Green line: Total mechanical energy (flat horizontal)
    - Numerical displays:
      * Current height: ___ m
      * Current speed: ___ m/s
      * KE: ___ J
      * PE: ___ J
      * Total E: ___ J

    Interactive controls:
    - Slider: Cart mass (0.5-5 kg, default 2 kg)
    - Slider: Initial height (5-15 m, default 10 m)
    - Radio buttons: Track shape
      * Simple hill (one peak)
      * Double hill (two peaks)
      * Loop-de-loop
      * Custom (adjustable points)
    - Checkbox: "Include friction" (adds energy loss)
    - Slider: Friction coefficient (0-0.3, active when friction enabled)
    - Button: "Release Cart"
    - Button: "Pause/Resume"
    - Button: "Reset"
    - Playback speed slider (0.5x to 3x)

    Default parameters:
    - Mass: 2 kg
    - Initial height: 10 m
    - Track: Simple hill
    - No friction
    - Starting position: top of first hill (v = 0)

    Behavior:
    - Cart starts at rest at selected height
    - When "Release Cart" clicked:
      * Cart accelerates down track
      * Speed increases as height decreases (PE → KE)
      * Speed decreases as height increases (KE → PE)
      * Animation follows curved path smoothly

    - Real-time energy tracking:
      * Calculate PE = mgh at current height
      * Calculate KE = ½mv² from speed
      * Display Total E = KE + PE (should be constant)
      * Update bar chart and line graphs continuously

    - With friction enabled:
      * Total mechanical energy gradually decreases
      * Cart eventually stops
      * Show energy "lost" to friction in brown portion of bar
      * Display thermal energy generated

    - Visual cues:
      * Cart color changes with speed (blue = slow, red = fast)
      * Velocity vector size proportional to speed
      * Trail dots showing recent path (fade over time)
      * Flash when cart reaches lowest/highest points

    - At key moments, display messages:
      * "Maximum PE, minimum KE" at highest points
      * "Maximum KE, minimum PE" at lowest points
      * "Energy conserved!" if total E remains constant
      * "Energy dissipated by friction: ___ J" if friction enabled

    Implementation notes:
    - Use p5.js for rendering
    - Model track as series of connected segments or bezier curve
    - Calculate speed at each point using energy conservation: v = √(2g(h₀ - h))
    - For friction: reduce total energy by W_friction = μmg·d at each frame
    - Use parametric equations for loop-de-loop: x(t), y(t)
    - Ensure cart can't go higher than energy allows
    - Smooth animation using small time steps (dt = 0.02 s)
</details>

## Energy Diagrams

Energy diagrams provide a visual way to understand potential energy, stability, and motion without doing detailed calculations. They're particularly useful for analyzing complex systems.

**Energy diagrams** plot potential energy as a function of position. By adding a horizontal line representing total mechanical energy, you can quickly determine where an object can move and how fast it will be going.

Key features of energy diagrams:

1. **PE curve**: Shows potential energy at each position
2. **Total energy line**: Horizontal line representing $E_{total} = KE + PE$
3. **Allowed regions**: Where total energy line is above PE curve (KE would be positive)
4. **Forbidden regions**: Where total energy line is below PE curve (KE would be negative—impossible!)
5. **Turning points**: Where total energy equals PE (KE = 0, object stops and reverses)
6. **Equilibrium positions**: Where PE curve has zero slope (no net force)

### Stable vs. Unstable Equilibrium

Energy diagrams reveal the stability of equilibrium positions:

- **Stable equilibrium**: PE curve has a local minimum (like a ball at the bottom of a bowl)
  * Small displacement results in restoring force back toward equilibrium
  * System oscillates around this point

- **Unstable equilibrium**: PE curve has a local maximum (like a ball balanced on top of a hill)
  * Small displacement results in force away from equilibrium
  * System accelerates away from this point

- **Neutral equilibrium**: PE curve is flat (like a ball on a flat surface)
  * No restoring or destabilizing force
  * System remains in new position after displacement

### Reading Energy Diagrams

From an energy diagram, you can determine:

- **Speed at any position**: $KE = E_{total} - PE(x)$, so $v = \sqrt{2(E_{total} - PE)/m}$
- **Maximum speed**: Occurs where PE is minimum
- **Range of motion**: Between turning points where $E_{total} = PE$
- **Force direction**: Force points from higher PE toward lower PE (down the PE slope)

#### Diagram: Energy Diagram Interactive Explorer

<iframe src="../../sims/energy-diagram-explorer/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
    <summary>Energy Diagram Interactive Explorer</summary>
    **Status:** done

    Type: microsim

    Learning objective: Help students understand energy diagrams by allowing them to explore different potential energy functions, adjust total energy, and see how these determine motion, turning points, and equilibrium positions.

    Canvas layout (1000x700px):
    - Left side (650x700): Main graph showing energy diagram
    - Right side (350x700): Controls and information panel

    Visual elements in main graph:
    - Axes: Horizontal = Position x (m), Vertical = Energy (J)
    - Potential energy curve (thick blue line)
    - Total energy line (thick red horizontal line, draggable)
    - Kinetic energy region (shaded green between PE curve and total E line)
    - Forbidden region (shaded gray where PE > total E)
    - Turning points (marked with vertical dashed lines and dots)
    - Equilibrium positions (marked with triangles on x-axis)
      * Filled triangle pointing up: stable equilibrium (PE minimum)
      * Filled triangle pointing down: unstable equilibrium (PE maximum)
      * Hollow triangle: neutral equilibrium (flat PE)
    - Small ball/particle animating along x-axis showing motion
    - Force vector arrow on particle

    Interactive controls:
    - Dropdown: Select PE function type
      * Harmonic oscillator: PE = ½kx² (parabola)
      * Gravitational: PE = mgh (linear)
      * Double well: PE = ax⁴ - bx² (two valleys)
      * Barrier: PE = gaussian bump
      * Lennard-Jones: PE = (1/r¹² - 1/r⁶) (molecular potential)
      * Custom: Adjustable cubic spline

    - Slider: Adjust PE function parameter (k, slope, barrier height, etc.)
    - Slider: Total energy level (drag or use slider)
    - Slider: Particle mass (0.5-5 kg, default 1 kg)

    - Checkbox: "Animate motion"
    - Checkbox: "Show force arrows"
    - Checkbox: "Show KE graph"
    - Button: "Reset to defaults"

    - Information display:
      * Current position: ___ m
      * Current PE: ___ J
      * Current KE: ___ J
      * Current speed: ___ m/s
      * Turning points at: x = ___, x = ___
      * Equilibrium points: x = ___ (stable/unstable/neutral)
      * Range of motion: ___ to ___ m

    Default parameters:
    - PE function: Harmonic oscillator, k = 5 N/m
    - Total energy: 10 J
    - Mass: 1 kg
    - Starting position: x = 0
    - Animation enabled

    Behavior:
    - When PE function selected, draw curve immediately
    - When total energy adjusted (drag line or slider):
      * Update horizontal line position
      * Recalculate and mark turning points
      * Update allowed/forbidden regions shading
      * Adjust particle motion range

    - When "Animate motion" enabled:
      * Particle oscillates between turning points
      * Speed varies: fastest where PE is lowest (KE maximum)
      * Slowest at turning points (KE = 0)
      * Direction reverses at turning points

    - Real-time calculations displayed:
      * At current position: PE from curve, KE = E_total - PE
      * Speed = √(2·KE/m)
      * Force = -dPE/dx (negative slope of PE curve)

    - Force arrow behavior (if enabled):
      * Arrow points in direction of force (toward lower PE)
      * Length proportional to force magnitude
      * Zero length at equilibrium points

    - If "Show KE graph" enabled:
      * Add green curve showing KE(x) = E_total - PE(x)
      * KE curve mirrors PE curve, flipped about total E line

    - Hover interactions:
      * Hover over any point on PE curve: show PE value and slope
      * Hover over turning point: highlight and show "Turning point: KE = 0"
      * Hover over equilibrium: show "Stable/Unstable equilibrium"

    - Double-click on graph:
      * Set total energy to that y-value
      * Start particle motion from that position

    Special features for different PE functions:
    - Harmonic oscillator: Show period of oscillation
    - Double well: Show barrier height, explain tunneling is quantum effect
    - Lennard-Jones: Label equilibrium as "Bond length"

    Implementation notes:
    - Use p5.js for rendering
    - Store PE function as equation or array of points
    - Calculate force as numerical derivative: F ≈ -(PE(x+Δx) - PE(x-Δx))/(2Δx)
    - Find turning points by solving PE(x) = E_total numerically
    - Find equilibrium points where dPE/dx = 0
    - Classify equilibrium by second derivative: d²PE/dx² > 0 (stable), < 0 (unstable)
    - Animate particle using energy conservation: v(x) = √(2(E_total - PE(x))/m)
    - Scale axes automatically based on PE function range
</details>

## Power: The Rate of Energy Transfer

Imagine two construction workers lifting identical bricks to the top of a building. One takes an hour; the other takes all day. They do the same amount of work, but one does it much faster. This rate of energy transfer is called power.

**Power** is the rate at which work is done or energy is transferred. It measures how quickly energy changes form or location.

The definition of power is:

$$P = \frac{W}{t} = \frac{\Delta E}{t}$$

Where:

- $P$ = power (watts, W)
- $W$ = work done (joules, J)
- $\Delta E$ = energy transferred (J)
- $t$ = time interval (seconds, s)

One watt equals one joule per second: $1 \text{ W} = 1 \text{ J/s}$

For constant power, the work done over time $t$ is:

$$W = Pt$$

### Power in Different Contexts

Power appears in many forms:

- **Mechanical power**: Rate of doing mechanical work (lifting, pushing, pulling)
- **Electrical power**: Rate of electrical energy transfer (covered in later chapters)
- **Metabolic power**: Rate of chemical energy consumption in living organisms
- **Solar power**: Rate of energy reception from the Sun

**Example:** A motor lifts a 500 kg elevator 20 meters in 10 seconds. The power output is:

Work done: $W = mgh = (500)(9.8)(20) = 98,000$ J

Power: $P = W/t = 98,000/10 = 9,800$ W = 9.8 kW

### Instantaneous Power and Force

When a force acts on a moving object, the instantaneous power delivered is:

$$P = F \cdot v = Fv\cos(\theta)$$

Where:

- $F$ = force magnitude (N)
- $v$ = velocity magnitude (m/s)
- $\theta$ = angle between force and velocity vectors

When force and velocity are in the same direction ($\theta = 0°$):

$$P = Fv$$

This relationship shows that for a given power output:

- Larger forces require slower speeds
- Higher speeds are possible with smaller forces

This is why cars have different gears: lower gears provide more force but less speed, while higher gears provide less force but more speed, all for approximately the same engine power output.

**Example:** A car engine producing 75 kW (about 100 horsepower) can exert different forces at different speeds:

| Speed | Force Available |
|-------|----------------|
| 10 m/s (22 mph) | 7,500 N |
| 20 m/s (45 mph) | 3,750 N |
| 30 m/s (67 mph) | 2,500 N |

At higher speeds, less force is available for acceleration—which is why cars accelerate more slowly at highway speeds than from rest.

## Efficiency: Real vs. Ideal Energy Transfer

No real machine or process transfers energy perfectly. Some energy is always "lost" to non-useful forms, typically heat and sound. **Efficiency** quantifies how well a device converts input energy to useful output energy.

Efficiency is defined as:

$$\text{Efficiency} = \frac{E_{output}}{E_{input}} = \frac{P_{output}}{P_{input}}$$

Often expressed as a percentage:

$$\text{Efficiency} = \frac{E_{output}}{E_{input}} \times 100\%$$

Key points about efficiency:

- Efficiency is always less than 100% for real devices (second law of thermodynamics)
- Efficiency equals 100% only for idealized, frictionless systems
- Higher efficiency means less wasted energy
- Improving efficiency saves energy and money

### Efficiency Examples

Different devices and processes have vastly different efficiencies:

| Device/Process | Typical Efficiency |
|----------------|-------------------|
| LED light bulb | 80-90% |
| Electric motor | 70-90% |
| Human muscles | 20-25% |
| Gasoline engine | 20-30% |
| Coal power plant | 33-40% |
| Incandescent bulb | 5-10% |

**Example:** An electric motor draws 2000 W of electrical power and delivers 1600 W of mechanical power. Its efficiency is:

$$\text{Efficiency} = \frac{1600}{2000} = 0.80 = 80\%$$

The remaining 400 W (20%) is converted to heat warming the motor and surroundings.

### Why Efficiency Matters

Efficiency has profound real-world implications:

1. **Energy conservation**: Higher efficiency reduces energy consumption
2. **Cost savings**: Less wasted energy means lower operating costs
3. **Environmental impact**: Reduced energy use decreases pollution and resource depletion
4. **Performance**: More efficient devices often perform better (less heat, longer lifespan)
5. **Sustainability**: Efficient use of resources is essential for long-term sustainability

#### Diagram: Energy Efficiency Comparison Infographic

<iframe src="../../sims/energy-efficiency/main.html" width="100%" height="902px" scrolling="no"></iframe>

<details markdown="1">
    <summary>Energy Efficiency Comparison Infographic</summary>
    **Status:** done

    Type: infographic

    Purpose: Create an interactive visual comparison of energy efficiencies across common devices and processes, helping students understand real-world energy conversion and waste.

    Layout: Grid layout with device cards (4 columns × 4 rows)

    Devices to include (16 total):
    1. LED bulb: 85% efficient
    2. Compact fluorescent (CFL): 70% efficient
    3. Incandescent bulb: 5% efficient
    4. Electric motor: 80% efficient
    5. Gasoline engine: 25% efficient
    6. Diesel engine: 35% efficient
    7. Human muscles: 25% efficient
    8. Coal power plant: 35% efficient
    9. Natural gas plant: 45% efficient
    10. Solar panel: 15-20% efficient
    11. Wind turbine: 35-45% efficient
    12. Hydroelectric dam: 85-90% efficient
    13. Bicycle: 95% efficient (mechanical)
    14. Steam engine: 10% efficient
    15. Electric heater: 100% efficient (all energy becomes heat as desired)
    16. Heat pump: 300% efficient (moves more heat than energy input)

    Each device card shows:
    - Icon/image of the device
    - Device name
    - Efficiency percentage (large, bold)
    - Horizontal bar showing efficiency:
      * Green portion: useful energy output
      * Red portion: wasted energy (typically heat)
    - Small text: "For every 100 J input, ___ J useful output"

    Interactive elements:
    - Hover over card:
      * Expand to show energy flow diagram (Sankey-style)
      * Show input energy → output energy + waste energy breakdown
      * Example: "Input: 100 J electricity → Output: 85 J light + 15 J heat"

    - Click card:
      * Highlight all cards in same category (e.g., all lighting, all engines)
      * Show comparison text: "This device is ___% more/less efficient than average"

    - Filter buttons at top:
      * "All devices"
      * "Lighting"
      * "Engines"
      * "Power generation"
      * "Other"

    - Sort dropdown:
      * "By efficiency (high to low)"
      * "By efficiency (low to high)"
      * "By category"
      * "Alphabetical"

    Visual style:
    - Color-coded efficiency bars:
      * 80-100%: Dark green
      * 60-80%: Light green
      * 40-60%: Yellow
      * 20-40%: Orange
      * 0-20%: Red

    - Card backgrounds match efficiency color (very light tint)
    - Cards with similar efficiency cluster visually

    Additional features:
    - Summary statistics panel:
      * Average efficiency across all devices
      * Most efficient device
      * Least efficient device
      * Total energy "wasted" if each device used 1000 J input

    - "Compare" mode:
      * Select 2-4 devices
      * Show side-by-side comparison with detailed breakdown
      * Calculate how much energy/money saved by using more efficient option

    Educational notes (expandable):
    - Explain why heat pump can exceed 100% (moves vs. generates heat)
    - Explain why electric heater is 100% efficient
    - Discuss second law of thermodynamics limiting efficiency
    - Real-world implications of efficiency improvements

    Implementation: HTML/CSS/JavaScript with SVG graphics
    Responsive design: Adapts from 4 columns (desktop) to 2 (tablet) to 1 (mobile)
    Canvas size: 1200x900px (desktop view)
</details>

## Simple Machines and Mechanical Advantage

Throughout history, humans have used **simple machines** to make work easier by trading force for distance or vice versa. While simple machines can't reduce the amount of work required (energy is conserved!), they can make tasks more achievable by changing how force is applied.

### The Six Classical Simple Machines

1. **Lever** - Bar that pivots on a fulcrum
2. **Pulley** - Wheel with a grooved rim for a rope or cable
3. **Inclined plane** - Flat surface tilted at an angle
4. **Wedge** - Two inclined planes back-to-back
5. **Screw** - Inclined plane wrapped around a cylinder
6. **Wheel and axle** - Large wheel attached to smaller axle

All complex machines are combinations of these basic types.

### Mechanical Advantage

**Mechanical advantage** (MA) is the factor by which a simple machine multiplies force:

$$MA = \frac{F_{output}}{F_{input}}$$

A mechanical advantage greater than 1 means the machine multiplies your input force—you can lift a heavy load with less force. However, there's always a tradeoff:

**Work-Energy Principle for Machines:**

$$W_{input} = W_{output}$$ (ideal, no friction)

$$F_{input} \cdot d_{input} = F_{output} \cdot d_{output}$$

Therefore:

$$MA = \frac{F_{output}}{F_{input}} = \frac{d_{input}}{d_{output}}$$

**The tradeoff**: If you gain force (MA > 1), you must move through a greater distance. If you gain distance (MA < 1), you must apply greater force.

### Examples of Mechanical Advantage

**Lever:**
- Fulcrum near load, far from effort → Large MA (force multiplier)
- Example: Crowbar, wheelbarrow
- $MA = \frac{d_{effort}}{d_{load}}$ (distances from fulcrum)

**Pulley System:**
- Single fixed pulley: MA = 1 (changes direction only)
- Single movable pulley: MA = 2 (force divided between two rope segments)
- Multiple pulleys: MA = number of rope segments supporting load

**Inclined Plane:**
- $MA = \frac{\text{length of ramp}}{\text{height of ramp}} = \frac{L}{h}$
- Longer, more gradual ramps have higher MA (less force needed but greater distance)
- Example: Wheelchair ramps, roads up mountains

### Real vs. Ideal Mechanical Advantage

**Ideal Mechanical Advantage** (IMA): Mechanical advantage calculated assuming no friction or energy loss

**Actual Mechanical Advantage** (AMA): Mechanical advantage measured in real conditions with friction and inefficiencies

Always: $AMA < IMA$

The efficiency of a simple machine relates the two:

$$\text{Efficiency} = \frac{AMA}{IMA} \times 100\%$$

#### Diagram: Simple Machines Comparison Table
<details markdown="1">
    <summary>Simple Machines Comparison Table</summary>
    Type: markdown-table

    Purpose: Summarize the key characteristics, mechanical advantage formulas, and common uses of the six classical simple machines.

| Simple Machine | How It Works | Ideal MA Formula | Common Examples | Typical Uses |
|----------------|--------------|------------------|-----------------|--------------|
| **Lever** | Rigid bar pivots on fulcrum; effort and load at different distances from pivot | $MA = \frac{d_{effort}}{d_{load}}$ | Crowbar, scissors, seesaw, wheelbarrow | Lifting heavy objects, cutting, balancing |
| **Pulley** | Rope runs over grooved wheel; can be fixed or movable | Fixed: MA = 1<br>Movable: MA = 2<br>System: MA = # of ropes supporting load | Flagpole, cranes, blinds, elevators | Lifting loads vertically, changing direction of force |
| **Inclined Plane** | Flat surface at angle to horizontal; trade distance for reduced force | $MA = \frac{L}{h}$ (length ÷ height) | Ramps, roads, stairs | Moving heavy objects to higher elevation |
| **Wedge** | Two inclined planes back-to-back; converts downward force to sideways splitting force | $MA = \frac{L}{W}$ (length ÷ width) | Axe, knife, chisel, doorstop | Splitting, cutting, holding objects in place |
| **Screw** | Inclined plane wrapped around cylinder; rotational motion becomes linear | $MA = \frac{2\pi r}{p}$ (circumference ÷ pitch) | Bolts, jar lids, vise, cork screw | Fastening, lifting, pressing |
| **Wheel & Axle** | Larger wheel attached to smaller axle; both rotate together | $MA = \frac{r_{wheel}}{r_{axle}}$ | Doorknob, steering wheel, winch, screwdriver | Turning with less force, winding rope |

</details>

#### Diagram: Pulley System Mechanical Advantage Simulator

<iframe src="../../sims/pulley-mechanical-advantage/main.html" width="100%" height="560px" scrolling="no"></iframe>

<details markdown="1">
    <summary>Pulley System Mechanical Advantage Simulator</summary>
    **Status:** done

    Type: microsim

    Learning objective: Demonstrate how different pulley configurations provide different mechanical advantages, showing the tradeoff between force and distance.

    Canvas layout (1000x700px):
    - Left side (600x700): Animation area showing pulley system
    - Right side (400x700): Controls and measurements

    Visual elements in animation area:
    - Pulley wheels (circles) at fixed positions
    - Rope (line) threaded through pulleys
    - Load (box) hanging from pulley system, labeled with mass
    - Effort point (hand icon or arrow) where user pulls rope
    - Spring scale showing effort force (hanging from effort point)
    - Measuring tape showing distances:
      * Distance effort moves (blue)
      * Distance load moves (red)
    - Support beam/ceiling at top

    Pulley system configurations (selectable):
    1. Single fixed pulley
       - One pulley attached to ceiling
       - Rope over pulley, load on one end, effort on other
       - MA = 1 (direction change only)

    2. Single movable pulley
       - One pulley attached to load
       - Rope: one end fixed to ceiling, other end is effort
       - MA = 2

    3. Two-pulley system (one fixed, one movable)
       - Fixed pulley at ceiling
       - Movable pulley attached to load
       - MA = 2

    4. Four-pulley system (two fixed, two movable)
       - Complex arrangement
       - MA = 4

    5. Six-pulley system (three fixed, three movable)
       - Block and tackle
       - MA = 6

    Interactive controls:
    - Dropdown: Select pulley configuration (1-5 above)
    - Slider: Load mass (10-100 kg, default 50 kg)
    - Slider: Pull effort rope (0-5 meters, controls how much rope pulled)
    - Button: "Calculate MA"
    - Button: "Reset System"
    - Checkbox: "Include friction" (reduces MA by 10-20%)

    Measurement displays:
    - Load weight: ___ N (= mg)
    - Effort force required: ___ N
    - Ideal MA: ___ (calculated from configuration)
    - Actual MA: ___ (F_load / F_effort measured)
    - Distance effort moved: ___ m
    - Distance load moved: ___ m
    - Distance ratio: ___ (d_effort / d_load)
    - Efficiency: ___% (if friction enabled)
    - Work input: ___ J (= F_effort × d_effort)
    - Work output: ___ J (= F_load × d_load)
    - Work comparison: "Work conserved!" or "Energy lost to friction: ___ J"

    Default parameters:
    - Configuration: Two-pulley system (MA = 2)
    - Load mass: 50 kg (weight = 490 N)
    - No friction initially
    - Effort pulled: 0 m

    Behavior:
    - When configuration selected:
      * Redraw pulley system in appropriate arrangement
      * Calculate and display ideal MA
      * Show number of rope segments supporting load
      * Reset effort distance to 0

    - When effort rope slider moved:
      * Animate rope moving through system
      * Load rises proportionally (d_load = d_effort / MA)
      * Update distance measurements
      * Calculate required effort force: F_effort = Load_weight / MA
      * Display spring scale reading (effort force)

    - Real-time calculations:
      * Effort force = (Load weight) / (Ideal MA)
      * If friction enabled: Effort force increases by friction factor
      * Work input = F_effort × d_effort
      * Work output = Load_weight × d_load
      * Show work comparison (should be equal if no friction)

    - Visual feedback:
      * Rope highlighted as it moves
      * Load rises smoothly
      * Spring scale needle moves to show force
      * Distance measuring tapes extend/retract

    - When "Calculate MA" clicked:
      * Display detailed calculation:
        * "Ideal MA = (# rope segments supporting load) = ___"
        * "Measured MA = F_load / F_effort = ___ / ___ = ___"
        * "Distance ratio = d_effort / d_load = ___ / ___ = ___"
        * "Note: MA = distance ratio (force-distance tradeoff)"

    - Annotations appear explaining:
      * "Each rope segment supports 1/n of the load weight"
      * "You pull less force but over a greater distance"
      * "Work is conserved: W_in = W_out (ideal case)"

    Special features:
    - Highlight rope segments supporting load in different color
    - Count and label: "This system has ___ rope segments supporting the load"
    - Show free-body diagram of load with tension forces
    - Display formula: MA = n (where n = number of rope segments)

    Implementation notes:
    - Use p5.js for rendering
    - Model rope as series of line segments between pulleys
    - Calculate pulley positions based on configuration
    - Animate smoothly using linear interpolation
    - Scale distances appropriately to fit canvas
    - Draw pulleys as circles with grooves (arcs)
    - Use different colors for rope segments supporting load vs. effort side
</details>

## Connecting Work, Energy, and Power

Let's bring together the key concepts from this chapter and see how they interconnect:

### The Energy Flow Chain

1. **Work** transfers energy from one object or system to another
2. **Kinetic energy** represents energy of motion
3. **Potential energy** represents stored energy due to position or configuration
4. **Conservation of energy** ensures total energy remains constant (though it transforms)
5. **Power** measures how quickly energy transfers or transforms
6. **Efficiency** quantifies how much input energy becomes useful output energy

### Problem-Solving Strategies

When approaching work-energy problems, consider these strategies:

**Use the Work-Energy Theorem when:**
- You know initial and final speeds (or can find them)
- Forces may vary with position
- You don't need to know time or acceleration details

**Use Conservation of Energy when:**
- Only conservative forces act (or you can account for non-conservative work)
- You know energy at one point and want to find it at another
- The problem involves height changes or spring compression/extension

**Use Power equations when:**
- The problem involves time rates
- You need to find how long energy transfer takes
- The question asks about "how fast" energy is used or delivered

**Use Force and kinematics (Newton's laws) when:**
- You need detailed information about acceleration, time, or force
- Energy methods aren't applicable
- The problem specifically asks about forces

### Key Equations Summary

**Work:**
- Constant force: $W = Fd\cos(\theta)$
- Variable force: $W = \int F(x) \, dx$

**Energy:**
- Kinetic: $KE = \frac{1}{2}mv^2$
- Gravitational potential: $PE_g = mgh$
- Elastic potential: $PE_s = \frac{1}{2}kx^2$

**Conservation:**
- Mechanical energy (conservative forces only): $KE_i + PE_i = KE_f + PE_f$
- With non-conservative forces: $KE_i + PE_i + W_{nc} = KE_f + PE_f$
- Work-energy theorem: $W_{net} = \Delta KE$

**Power:**
- Average power: $P = W/t = \Delta E/t$
- Instantaneous power: $P = Fv\cos(\theta)$

**Efficiency:**
- $\text{Efficiency} = \frac{E_{output}}{E_{input}} = \frac{P_{output}}{P_{input}}$

**Mechanical Advantage:**
- $MA = \frac{F_{output}}{F_{input}} = \frac{d_{input}}{d_{output}}$ (ideal case)

## Real-World Applications

Energy principles appear everywhere in technology and nature. Understanding work, energy, and power helps explain:

**Transportation:**
- Why cars have better fuel efficiency at constant highway speeds than in stop-and-go traffic
- How regenerative braking in electric vehicles recovers kinetic energy
- Why aerodynamic design matters more at higher speeds (air resistance increases with v²)

**Sports:**
- How pole vaulters convert running kinetic energy to gravitational potential energy
- Why trampolines help gymnasts jump higher (elastic potential energy storage and release)
- How downhill skiers maximize speed by minimizing friction and choosing optimal paths

**Construction and Engineering:**
- How pile drivers use gravitational potential energy to drive posts into ground
- Why cranes use pulley systems to lift heavy loads
- How dam spillways convert gravitational PE to kinetic energy safely

**Energy Production:**
- Hydroelectric dams convert gravitational PE of water to electrical energy
- Wind turbines extract kinetic energy from moving air
- Solar panels convert light energy to electrical energy

**Biology:**
- Muscles convert chemical energy to mechanical work
- Heart does work pumping blood throughout the body
- ATP molecules store and release chemical potential energy

## Key Takeaways

As you complete this chapter, keep these essential ideas in mind:

1. **Work is energy transfer** by applying force through a distance. Only the component of force parallel to displacement does work.

2. **Energy comes in many forms** but can be categorized as kinetic (motion) or potential (position/configuration).

3. **Energy is conserved**: It transforms between types but the total remains constant in an isolated system.

4. **The work-energy theorem** provides a powerful alternative to force analysis: net work equals change in kinetic energy.

5. **Conservative forces** (like gravity and springs) conserve mechanical energy and have associated potential energies.

6. **Non-conservative forces** (like friction) convert mechanical energy to other forms, usually thermal energy.

7. **Power measures rate**: How quickly work is done or energy is transferred. Same work done faster requires more power.

8. **Efficiency quantifies losses**: Real devices always have efficiency less than 100% due to energy conversion to non-useful forms.

9. **Simple machines trade force for distance**: They can multiply force (MA > 1) but you must move through greater distance. Work is still conserved.

10. **Energy analysis often simplifies problems**: Many situations difficult to solve with forces become straightforward using energy methods.

Energy concepts will reappear throughout the rest of this course—in momentum, rotation, oscillations, waves, and even electricity. Mastering these principles now will pay dividends as you continue your physics journey.

---

## The Stories Behind the Science

<div class="grid cards" markdown>

- [![Marie Curie](../../stories/marie-curie/cover.png)](../../stories/marie-curie/index.md)

    **[Glowing in the Dark](../../stories/marie-curie/index.md)**

    She couldn't go to university because she was a woman. So Marie Curie moved to Paris, nearly starved, and worked in a leaky shed for four years. She discovered two new elements and proved that atoms contain vast amounts of hidden energy—the same E=mc² energy that powers the sun. The radiation that made her famous also killed her.

- [![Lise Meitner](../../stories/lise-meitner/cover.png)](../../stories/lise-meitner/index.md)

    **[The Fission Escape](../../stories/lise-meitner/index.md)**

    She did the work. She made the discovery. Her partner got the Nobel Prize. Lise Meitner was the first to explain how splitting an atom releases energy—the science behind nuclear power. She figured it out while literally fleeing Nazi Germany, calculating on scraps of paper in the snow. E=mc² went from equation to reality.

</div>
