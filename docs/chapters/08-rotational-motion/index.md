# Rotational Motion and Angular Momentum

## Summary

This chapter extends the concepts of linear mechanics to rotational motion, revealing beautiful parallels between translational and rotational quantities. Angular displacement, velocity, and acceleration describe rotational kinematics, while torque (the rotational analog of force) causes angular acceleration. You'll discover that an object's resistance to rotational acceleration depends on its rotational inertia, which varies with mass distribution. Rotational kinetic energy and angular momentum complete the rotational analogs of linear mechanics. The conservation of angular momentum explains phenomena from spinning figure skaters to orbiting planets, and rolling motion combines both translational and rotational motion in a single framework.

## Concepts Covered

This chapter covers the following 10 concepts from the learning graph:

1. Angular Displacement
2. Angular Velocity
3. Angular Acceleration
4. Rotational Kinematics
5. Torque
6. Rotational Inertia
7. Rotational Kinetic Energy
8. Angular Momentum
9. Conservation of Angular Momentum
10. Rolling Motion

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Scientific Foundations and Mathematical Tools](../01-scientific-foundations/index.md)
- [Chapter 2: Motion in One Dimension](../02-motion-one-dimension/index.md)
- [Chapter 4: Forces and Newton's Laws](../04-forces-newtons-laws/index.md)
- [Chapter 6: Work, Energy, and Power](../06-work-energy-power/index.md)
- [Chapter 7: Momentum and Collisions](../07-momentum-collisions/index.md)

---

## Introduction: From Linear to Angular

You've spent much of this course studying objects moving in straight lines or following parabolic arcs. But what about spinning wheels, rotating planets, twirling figure skaters, and rolling balls? These motions follow their own set of rules—rules that beautifully mirror the linear mechanics you already know.

Think about a spinning ice skater. When they pull their arms in, they spin faster. A quarterback's spiral pass flies differently than a tumbling football. A rolling basketball behaves differently than a sliding puck. All of these phenomena involve rotational motion, where objects turn around an axis rather than simply moving from one place to another.

In this chapter, you'll discover that rotational motion follows the same logical framework as linear motion, with angular quantities replacing linear ones. Just as force causes acceleration, torque causes angular acceleration. Just as moving objects have momentum, spinning objects have angular momentum. The parallel is so complete that once you master the pattern, rotational physics becomes intuitive.

## Angular Displacement: Measuring Rotation

When an object rotates, we need a way to describe how far it has turned. Just as displacement measures change in position for linear motion, **angular displacement** measures change in rotational position.

Angular displacement is typically measured in radians (rad), though you might also encounter degrees or revolutions. One complete rotation equals 360° = 2π radians = 1 revolution. Radians provide the most natural unit for physics because they directly relate arc length to radius.

The relationship between arc length *s* traveled by a point and angular displacement θ is:

$$s = r\theta$$

where *r* is the distance from the axis of rotation. This means points farther from the axis travel greater distances for the same angular displacement—think about how the tip of a fan blade moves much faster than a point near the center.

**Key characteristics of angular displacement:**

- Vector quantity with direction (clockwise or counterclockwise)
- Measured in radians (rad), degrees (°), or revolutions (rev)
- Independent of the radius—all points on a rigid object rotate through the same angle
- Follows the right-hand rule for direction (thumb points along axis, fingers curl in rotation direction)

### Linear vs. Angular Quantities Comparison

Here's how angular displacement parallels linear displacement:

| Linear Motion | Angular Motion | Relationship |
|---------------|----------------|--------------|
| Position *x* | Angular position θ | θ = *s*/*r* |
| Displacement Δ*x* | Angular displacement Δθ | Δθ = Δ*s*/*r* |
| Unit: meters (m) | Unit: radians (rad) | 1 rad = *s*/*r* (dimensionless) |
| Depends on path | Depends on rotation | Same angle for all points |

#### Diagram: Angular Displacement Visualization MicroSim

<details markdown="1">
<summary>Angular Displacement Visualization MicroSim</summary>
Type: microsim

Learning objective: Help students understand angular displacement by visualizing how different points on a rotating object move through the same angle but travel different arc lengths.

Canvas layout (800x600px):
- Left side (550x600): Drawing area with a rotating disk
- Right side (250x600): Control panel

Visual elements:
- Large circular disk (radius 200px) at center of drawing area
- Central axis point (black dot)
- Three colored points at different radii: red (50px), blue (125px), green (200px)
- Arc paths showing the trail of each point
- Angle indicator showing θ in radians and degrees
- Radius lines from center to each colored point

Interactive controls:
- Slider: Angular displacement (0 to 2π radians)
- Display: Current angle in radians and degrees
- Display: Arc length for each point (color-coded)
- Button: "Reset"
- Checkbox: "Show right-hand rule"
- Button: "Animate rotation"

Default parameters:
- Angular displacement: π/4 radians (45°)
- Animation speed: 1 rad/second

Behavior:
- As slider moves, disk rotates and colored points trace their paths
- Arc lengths update in real-time showing s = rθ
- Formula displayed: s_red = 50θ, s_blue = 125θ, s_green = 200θ
- Right-hand rule visualization shows thumb along axis with curved fingers
- Animate button causes smooth rotation at constant angular velocity
- Display shows that all points have same θ but different s values

Implementation notes:
- Use p5.js for rendering
- Draw disk with radial lines for reference
- Use line() to draw arc paths as points rotate
- Update text displays with toFixed(2) for clean numbers
- Use lerpColor() for smooth color transitions on paths
</details>

## Angular Velocity: How Fast Things Spin

Just as velocity describes how quickly position changes in linear motion, **angular velocity** describes how quickly angular position changes in rotational motion.

Angular velocity ω (Greek letter omega) is defined as:

$$\omega = \frac{\Delta\theta}{\Delta t}$$

Angular velocity is measured in radians per second (rad/s), though you might also see revolutions per minute (rpm) in everyday contexts. To convert: 1 rpm = 2π/60 rad/s ≈ 0.105 rad/s.

Every point on a rotating rigid object has the same angular velocity—they all rotate through the same angle in the same time. However, points farther from the axis move with greater linear velocity. The relationship between linear velocity *v* and angular velocity ω is:

$$v = r\omega$$

This explains why the outer edge of a merry-go-round moves faster than positions near the center, even though everything rotates together.

### Angular Velocity in Everyday Life

Angular velocity appears everywhere in daily life:

- **Car engines:** A typical engine idles at 800-1000 rpm (84-105 rad/s)
- **Hard drives:** Old HDDs spin at 5400-7200 rpm (565-754 rad/s)
- **Ceiling fans:** Low speed ~100 rpm (10.5 rad/s), high speed ~300 rpm (31.4 rad/s)
- **Earth's rotation:** One rotation per 24 hours = 7.27 × 10⁻⁵ rad/s
- **Washing machine spin cycle:** 1000-1600 rpm (105-168 rad/s)

#### Diagram: Comparative Angular Velocities Chart

<details markdown="1">
<summary>Comparative Angular Velocities Chart</summary>
Type: chart

Chart type: Horizontal bar chart with logarithmic scale

Purpose: Compare angular velocities of common rotating objects to help students develop intuition for typical values.

X-axis: Angular velocity (rad/s, logarithmic scale from 10⁻⁵ to 10⁶)
Y-axis: Rotating objects

Data (from slowest to fastest):
- Earth's rotation: 7.27 × 10⁻⁵ rad/s
- Hour hand of clock: 1.45 × 10⁻⁴ rad/s
- Minute hand of clock: 1.75 × 10⁻³ rad/s
- Second hand of clock: 0.105 rad/s
- Ceiling fan (low): 10.5 rad/s
- Bicycle wheel (casual riding): 20 rad/s
- Car tire (highway): 70 rad/s
- Car engine (idle): 90 rad/s
- Washing machine spin: 130 rad/s
- Hard disk drive: 650 rad/s
- Helicopter rotor: 40 rad/s
- Jet engine turbine: 3,000 rad/s
- Dental drill: 50,000 rad/s
- Computer CPU fan: 250 rad/s

Title: "Angular Velocities in Everyday Life"
Color scheme: Blue gradient (darker for faster rotation)

Annotations:
- Add small icon next to each bar representing the object
- Include conversion to rpm in parentheses for familiar objects
- Highlight "typical human-scale rotations" range (1-1000 rad/s)

Implementation: Chart.js with logarithmic x-axis
Canvas size: 800x600px
</details>

## Angular Acceleration: Changing Rotational Speed

When an object's angular velocity changes, it experiences **angular acceleration**. This is the rotational analog of linear acceleration.

Angular acceleration α (Greek letter alpha) is defined as:

$$\alpha = \frac{\Delta\omega}{\Delta t}$$

Angular acceleration is measured in radians per second squared (rad/s²). Like linear acceleration, angular acceleration can be positive (speeding up) or negative (slowing down, also called angular deceleration).

The relationship between linear tangential acceleration *a*_t and angular acceleration is:

$$a_t = r\alpha$$

This means points farther from the axis experience greater linear acceleration for the same angular acceleration—important for understanding why you feel different forces at different positions on a rotating amusement park ride.

### Signs and Directions

Angular acceleration has sign and direction:

- **Positive α:** Angular velocity increasing (speeding up rotation)
- **Negative α:** Angular velocity decreasing (slowing down rotation)
- **Zero α:** Constant angular velocity (uniform rotation)
- **Direction:** Follows right-hand rule along the rotation axis

**Example:** A spinning wheel starts from rest and reaches 120 rpm in 8.0 seconds. What is its angular acceleration?

**Solution:**
- Initial angular velocity: ω₀ = 0 rad/s
- Final angular velocity: ω = 120 rpm = 120 × (2π/60) = 12.57 rad/s
- Time: t = 8.0 s
- Angular acceleration: α = Δω/Δt = (12.57 - 0)/8.0 = **1.57 rad/s²**

## Rotational Kinematics: Equations of Angular Motion

Just as linear kinematics provides equations relating position, velocity, acceleration, and time, **rotational kinematics** provides parallel equations for angular quantities.

When angular acceleration is constant, we can use four fundamental rotational kinematic equations:

$$\omega = \omega_0 + \alpha t$$

$$\theta = \theta_0 + \omega_0 t + \frac{1}{2}\alpha t^2$$

$$\omega^2 = \omega_0^2 + 2\alpha(\theta - \theta_0)$$

$$\theta = \theta_0 + \frac{1}{2}(\omega_0 + \omega)t$$

Notice the perfect correspondence with linear kinematic equations—simply replace *x* with θ, *v* with ω, and *a* with α!

### Rotational vs. Linear Kinematic Equations

The parallel structure makes these equations easier to remember:

| Linear Kinematics | Rotational Kinematics |
|-------------------|------------------------|
| *v* = *v*₀ + *a*t | ω = ω₀ + αt |
| *x* = *x*₀ + *v*₀t + ½*a*t² | θ = θ₀ + ω₀t + ½αt² |
| *v*² = *v*₀² + 2*a*Δ*x* | ω² = ω₀² + 2αΔθ |
| *x* = *x*₀ + ½(*v*₀ + *v*)t | θ = θ₀ + ½(ω₀ + ω)t |

#### Diagram: Rotational Kinematics Problem Solver MicroSim

<details markdown="1">
<summary>Rotational Kinematics Problem Solver MicroSim</summary>
Type: microsim

Learning objective: Allow students to explore rotational kinematic equations by solving problems interactively with visual feedback.

Canvas layout (900x700px):
- Top (900x150): Input panel for known quantities
- Middle-left (450x450): Visualization of rotating object
- Middle-right (450x450): Graphs showing ω vs. t and θ vs. t
- Bottom (900x100): Solution display

Visual elements:
- Animated spinning disk showing angular position
- Real-time graph of angular velocity vs. time (linear for constant α)
- Real-time graph of angular position vs. time (parabolic for constant α)
- Color-coded known vs. unknown quantities

Interactive controls:
- Input fields for: ω₀ (rad/s), ω (rad/s), α (rad/s²), θ₀ (rad), θ (rad), t (s)
- Radio buttons: Select which quantity to solve for
- Button: "Solve" (calculates unknown using appropriate equation)
- Button: "Animate" (shows motion with calculated values)
- Button: "New Problem"
- Dropdown: Select preset scenarios (accelerating wheel, decelerating fan, etc.)

Preset scenarios:
1. Accelerating from rest: ω₀=0, α=2.5 rad/s², t=5s → find ω and θ
2. Coming to stop: ω₀=30 rad/s, ω=0, α=−3 rad/s² → find t and θ
3. Through angle: ω₀=15 rad/s, α=1.2 rad/s², θ=100 rad → find ω and t

Default parameters:
- ω₀ = 0 rad/s
- α = 3 rad/s²
- t = 4 s

Behavior:
- When "Solve" clicked, show step-by-step equation selection and substitution
- Highlight which equation to use based on known/unknown variables
- Animate rotation matching the calculated angular motion
- Update graphs in real-time during animation
- Display velocity vector on disk edge showing magnitude and direction
- Show work: equation → substitution → calculation → answer

Implementation notes:
- Use p5.js for visualization
- Implement all four kinematic equations
- Check which three quantities are known to select appropriate equation
- Use createInput() for user data entry
- Validate inputs (no contradictory values)
- Format output with proper units and significant figures
</details>

### Practice Problem

**Problem:** A pottery wheel spinning at 120 rpm is turned off and decelerates uniformly, coming to rest in 25 seconds. How many complete revolutions does it make while stopping?

**Solution:**
1. Convert initial angular velocity: ω₀ = 120 rpm = 12.57 rad/s
2. Final angular velocity: ω = 0 rad/s
3. Time: t = 25 s
4. Find angular acceleration using ω = ω₀ + αt:
   - 0 = 12.57 + α(25)
   - α = −0.503 rad/s²
5. Find angular displacement using θ = θ₀ + ½(ω₀ + ω)t:
   - θ = 0 + ½(12.57 + 0)(25)
   - θ = 157.1 rad
6. Convert to revolutions: 157.1 rad ÷ 2π rad/rev = **25.0 revolutions**

## Torque: The Rotational Force

If force causes linear acceleration, what causes angular acceleration? The answer is **torque** (Greek letter tau, τ), the rotational analog of force.

Torque measures the effectiveness of a force in causing rotation. It depends not only on the magnitude of the force but also on where and how the force is applied relative to the rotation axis.

$$\tau = rF\sin\theta$$

where:
- τ is torque (N·m)
- *r* is the distance from the axis to where force is applied (m)
- *F* is the magnitude of the applied force (N)
- θ is the angle between the force vector and the position vector

When the force is perpendicular to the position vector (θ = 90°), the equation simplifies to:

$$\tau = rF_\perp$$

where *F*_⊥ is the component of force perpendicular to the radius.

### Understanding Torque Through Experience

You intuitively understand torque from everyday experiences:

- **Opening a door:** You push near the edge, not near the hinges, because torque increases with distance from the axis (larger *r*)
- **Using a wrench:** A longer wrench provides more torque with the same force, making tight bolts easier to loosen
- **Playground seesaw:** A heavier child can balance a lighter child if the lighter child sits farther from the pivot
- **Steering wheel:** The large radius makes small forces create sufficient torque to turn the wheels

The direction of torque follows the right-hand rule: fingers curl in the direction of rotation the torque would cause, and your thumb points in the direction of the torque vector.

#### Diagram: Interactive Torque Diagram with Forces

<details markdown="1">
<summary>Interactive Torque Diagram with Forces</summary>
Type: diagram

Purpose: Illustrate how torque depends on both force magnitude and its position/angle relative to the rotation axis.

Components to show:
- Horizontal bar (representing a wrench or lever) pivoting at left end
- Pivot point clearly marked with a small circle
- Four different force vectors applied at different points and angles:
  1. Force F₁ at distance r₁ perpendicular to bar (90°) - creates maximum torque
  2. Force F₂ at distance r₂ at 45° angle - creates moderate torque
  3. Force F₃ pointing directly toward pivot (0°) - creates zero torque
  4. Force F₄ at larger distance r₃ perpendicular - creates larger torque than F₁ even if same magnitude
- Dotted lines showing perpendicular distance from pivot to line of force action
- Arc showing angle θ between position and force vectors
- Numerical values for each torque calculated

Labels:
- τ₁ = r₁F₁sin(90°) = r₁F₁
- τ₂ = r₂F₂sin(45°) = 0.707r₂F₂
- τ₃ = r₃F₃sin(0°) = 0
- τ₄ = r₃F₄sin(90°) = r₃F₄
- "Maximum torque: Force ⊥ to radius"
- "Zero torque: Force along radius"
- "Perpendicular distance = r sin θ"

Style: Clean technical diagram with vectors as colored arrows

Color scheme:
- Bar: Gray
- Pivot: Black circle
- Force vectors: Blue arrows with labels
- Perpendicular distance lines: Dashed red
- Rotation arc indicators: Green curved arrows showing CCW or CW

Annotations:
- Arrow boxes explaining: "Same force, different distances"
- Arrow boxes explaining: "Same distance, different angles"
- Formula box showing τ = rF sin θ prominently
</details>

### Net Torque and Equilibrium

Just as net force determines linear acceleration, net torque determines angular acceleration. When multiple torques act on an object:

$$\sum \tau = \tau_1 + \tau_2 + \tau_3 + ...$$

For rotational equilibrium (no angular acceleration), the sum of all torques must equal zero:

$$\sum \tau = 0$$

When calculating net torque, we assign signs:
- **Positive (+):** Counterclockwise torques
- **Negative (−):** Clockwise torques

**Example:** A uniform 2.0 m bar is supported at its center. A 30 N force pulls down at 0.6 m from the center, and a second force pulls down at 0.4 m on the opposite side. What force is needed for equilibrium?

**Solution:**
- First torque (CCW, positive): τ₁ = (0.6 m)(30 N) = +18 N·m
- Second torque (CW, negative): τ₂ = −(0.4 m)F₂
- For equilibrium: τ₁ + τ₂ = 0
- 18 + (−0.4F₂) = 0
- F₂ = **45 N**

## Rotational Inertia: Resistance to Angular Acceleration

Just as mass measures an object's resistance to linear acceleration (inertia), **rotational inertia** (also called moment of inertia, *I*) measures an object's resistance to angular acceleration.

However, rotational inertia doesn't depend only on mass—it also depends on how that mass is distributed relative to the axis of rotation. The farther the mass is from the axis, the greater the rotational inertia.

For a point mass:

$$I = mr^2$$

For extended objects, we sum (or integrate) over all mass elements:

$$I = \sum m_i r_i^2$$

Rotational inertia is measured in kg·m². Different shapes have different rotational inertias:

| Object | Axis of Rotation | Rotational Inertia |
|--------|------------------|-------------------|
| Point mass | Distance *r* from axis | *I* = *mr*² |
| Thin hoop/ring | Through center, ⊥ to plane | *I* = *mR*² |
| Solid cylinder/disk | Through center, along axis | *I* = ½*mR*² |
| Solid sphere | Through center | *I* = ⅖*mR*² |
| Thin rod | Through center, ⊥ to rod | *I* = (1/12)*mL*² |
| Thin rod | Through end, ⊥ to rod | *I* = (1/3)*mL*² |

Notice that a hoop has twice the rotational inertia of a disk with the same mass and radius because all the hoop's mass is at the maximum distance from the axis.

### Why Rotational Inertia Matters

Rotational inertia explains many phenomena:

- **Racing wheels:** Cyclists use lightweight wheels because lower rotational inertia means less energy needed to accelerate
- **Figure skating spins:** Pulling arms in reduces rotational inertia without changing mass
- **Flywheels:** Store energy in rotating mass with high rotational inertia
- **Tightrope walkers:** Long poles increase rotational inertia, making balance easier by slowing potential rotation

#### Diagram: Rotational Inertia Comparison MicroSim

<details markdown="1">
<summary>Rotational Inertia Comparison MicroSim</summary>
Type: microsim

Learning objective: Demonstrate how mass distribution affects rotational inertia by comparing different shapes rolling down an incline or responding to applied torque.

Canvas layout (900x650px):
- Left side (450x500): Inclined plane simulation
- Right side (450x500): Applied torque simulation
- Bottom (900x150): Control panel and data display

Visual elements (Inclined plane):
- Ramp at 30° angle
- Four objects that can race: solid sphere, hollow sphere, solid cylinder, hoop (all same mass and radius)
- Starting line at top
- Finish line at bottom
- Acceleration indicators showing relative speeds

Visual elements (Torque simulation):
- Four objects mounted on axles
- Same constant torque applied to each
- Rotation shown with angular position markers
- Angular acceleration vectors

Interactive controls:
- Button: "Race" (start all objects down ramp simultaneously)
- Slider: Ramp angle (0-60°)
- Checkbox: "Show rotational inertias" (displays *I* values)
- Checkbox: "Show kinetic energies" (displays KE rotation vs. translation split)
- Radio buttons: Select torque simulation or ramp race
- Slider: Applied torque (0-10 N·m)
- Button: "Reset"

Display panels:
- Table showing *I* values: sphere=0.4*mR*², cylinder=0.5*mR*², disk=0.5*mR*², hoop=1.0*mR*²
- Real-time position of each object during race
- Winner announcement with time
- Angular acceleration for each object under same torque

Default parameters:
- Ramp angle: 30°
- Mass: 1.0 kg
- Radius: 0.1 m
- Applied torque: 5 N·m

Behavior:
- During race, objects separate based on rotational inertia
- Solid sphere wins, hoop comes in last
- Explain: objects with smaller *I* accelerate faster
- In torque mode, show α = τ/*I* with different angular accelerations
- Highlight relationship: lower *I* means higher α for same torque

Implementation notes:
- Use p5.js for rendering
- Calculate acceleration down ramp: a = g sin θ / (1 + I/mr²)
- Animate smooth motion with realistic timing
- Use color coding: red=sphere, blue=cylinder, green=disk, yellow=hoop
- Display formulas and numerical calculations
</details>

## Relating Torque, Rotational Inertia, and Angular Acceleration

The rotational version of Newton's second law connects torque, rotational inertia, and angular acceleration:

$$\sum \tau = I\alpha$$

This equation is the rotational analog of *F* = *ma*. It tells us:
- Greater torque produces greater angular acceleration (just as greater force produces greater acceleration)
- Larger rotational inertia means smaller angular acceleration for the same torque (just as larger mass means smaller acceleration)

**Example:** A solid disk with mass 5.0 kg and radius 0.30 m rotates freely on a horizontal axle. What constant torque is required to accelerate it from rest to 120 rpm in 8.0 s?

**Solution:**
1. Rotational inertia of disk: *I* = ½*mR*² = ½(5.0)(0.30)² = 0.225 kg·m²
2. Final angular velocity: ω = 120 rpm = 12.57 rad/s
3. Angular acceleration: α = Δω/Δt = 12.57/8.0 = 1.57 rad/s²
4. Required torque: τ = *I*α = (0.225)(1.57) = **0.353 N·m**

### The Complete Linear-Rotational Analogy

By now, the pattern should be clear:

| Linear Motion | Rotational Motion | Relationship |
|---------------|-------------------|--------------|
| Position *x* | Angular position θ | θ = *s*/*r* |
| Velocity *v* | Angular velocity ω | *v* = *rω* |
| Acceleration *a* | Angular acceleration α | *a* = *rα* |
| Mass *m* | Rotational inertia *I* | *I* = Σ*mr*² |
| Force *F* | Torque τ | τ = *rF* |
| *F* = *ma* | τ = *I*α | Both Newton's 2nd Law |
| Linear momentum *p* = *mv* | Angular momentum *L* = *I*ω | Both conserved |
| KE = ½*mv*² | KE_rot = ½*I*ω² | Both types of energy |

This correspondence means you don't need to memorize an entirely new set of principles—just recognize the pattern and translate between linear and rotational domains.

## Rotational Kinetic Energy: Energy of Spinning Objects

A rotating object possesses kinetic energy due to its motion, just like a moving object in linear motion. The **rotational kinetic energy** of a spinning object is:

$$KE_{rot} = \frac{1}{2}I\omega^2$$

Notice the parallel with linear kinetic energy KE = ½*mv*². The rotational version replaces mass with rotational inertia (*I*) and velocity with angular velocity (ω).

When an object both translates and rotates (like a rolling ball), it has both translational and rotational kinetic energy:

$$KE_{total} = KE_{trans} + KE_{rot} = \frac{1}{2}mv^2 + \frac{1}{2}I\omega^2$$

For a rolling object without slipping, *v* = *rω*, so the two types of kinetic energy are related. Energy is distributed between translation and rotation based on the object's rotational inertia.

**Example:** A solid sphere (mass 2.0 kg, radius 0.15 m) rolls without slipping at 3.0 m/s. What are its translational kinetic energy, rotational kinetic energy, and total kinetic energy?

**Solution:**
1. Translational KE: KE_trans = ½*mv*² = ½(2.0)(3.0)² = 9.0 J
2. Angular velocity: ω = *v*/*r* = 3.0/0.15 = 20 rad/s
3. Rotational inertia: *I* = ⅖*mR*² = ⅖(2.0)(0.15)² = 0.018 kg·m²
4. Rotational KE: KE_rot = ½*I*ω² = ½(0.018)(20)² = 3.6 J
5. Total KE: KE_total = 9.0 + 3.6 = **12.6 J**

Notice that the sphere's energy is split: 71% translational, 29% rotational. Different shapes have different splits.

#### Diagram: Energy Distribution in Rolling Objects Chart

<details markdown="1">
<summary>Energy Distribution in Rolling Objects Chart</summary>
Type: chart

Chart type: Stacked bar chart

Purpose: Show how total kinetic energy is distributed between translational and rotational components for different rolling objects.

X-axis: Object type
Y-axis: Kinetic energy (percentage)

Objects compared (all with same mass and radius, rolling at same speed):
1. Solid sphere (*I* = ⅖*mR*²)
2. Solid cylinder (*I* = ½*mR*²)
3. Hollow sphere (*I* = ⅔*mR*²)
4. Hollow cylinder (*I* = *mR*²)
5. Sliding block (no rotation, *I* = 0)

Data for each object:
- Sliding block: 100% translational, 0% rotational
- Solid sphere: 71.4% translational, 28.6% rotational
- Solid cylinder: 66.7% translational, 33.3% rotational
- Hollow sphere: 60% translational, 40% rotational
- Hollow cylinder: 50% translational, 50% rotational

Title: "Energy Distribution in Rolling vs. Sliding Objects"
Legend: Blue segment = translational KE, Orange segment = rotational KE

Annotations:
- Label showing formula: KE_total = ½mv² + ½Iω²
- Note: "Higher I/mR² ratio means more energy in rotation"
- Arrow pointing out: "Hollow objects store more energy in rotation"
- Formula box: "For rolling: v = rω"

Stacking:
- Bottom segment (blue): Translational KE percentage
- Top segment (orange): Rotational KE percentage
- Total height = 100%

Implementation: Chart.js with stacked bars
Canvas size: 700x500px
Include data table below chart showing numerical percentages
</details>

### Conservation of Energy with Rotation

When solving problems involving rotating objects, remember to include rotational kinetic energy in energy conservation:

$$E_{initial} = E_{final}$$
$$PE_i + KE_{trans,i} + KE_{rot,i} = PE_f + KE_{trans,f} + KE_{rot,f}$$

This principle explains why a hollow cylinder rolls down a ramp more slowly than a solid cylinder—more of its gravitational potential energy must be converted to rotational kinetic energy.

## Angular Momentum: The Rotational Analog of Momentum

Just as moving objects have linear momentum *p* = *mv*, rotating objects have **angular momentum** *L* defined as:

$$L = I\omega$$

Angular momentum is measured in kg·m²/s (or equivalently, J·s). Like linear momentum, angular momentum is a vector quantity with direction determined by the right-hand rule.

The relationship between torque and angular momentum mirrors the relationship between force and linear momentum:

$$\sum \tau = \frac{\Delta L}{\Delta t}$$

This means torque is the rate of change of angular momentum, just as force is the rate of change of linear momentum.

For a point particle moving in a circular path, angular momentum can also be expressed as:

$$L = mvr$$

where *m* is mass, *v* is tangential velocity, and *r* is the radius of the circular path.

**Key properties of angular momentum:**

- Vector quantity with direction along the rotation axis
- Depends on both rotational inertia and angular velocity
- Changes only when external torque is applied
- Conserved in the absence of external torques
- Can be transferred between objects during collisions

#### Diagram: Angular Momentum Vector Visualization

<details markdown="1">
<summary>Angular Momentum Vector Visualization</summary>
Type: diagram

Purpose: Illustrate angular momentum as a vector quantity and show the right-hand rule for determining its direction.

Components to show:
- 3D perspective view of a spinning disk/wheel
- Disk rotating in horizontal plane
- Angular velocity vector ω pointing upward through center (purple arrow)
- Angular momentum vector L pointing upward parallel to ω (green arrow, thicker)
- Curved arrows on disk surface showing rotation direction (clockwise when viewed from above)
- Right hand positioned showing thumb and fingers demonstrating the rule
- Coordinate axes (x, y, z) for reference
- Multiple rotation scenarios: CCW rotation (L up), CW rotation (L down)

Labels:
- "L = Iω" with values
- "ω = 10 rad/s"
- "I = 0.5 kg·m²"
- "L = 5 kg·m²/s"
- "Right-hand rule: Fingers curl with rotation, thumb points along L"
- "Direction of L and ω are parallel"

Style: 3D technical diagram with perspective view

Color scheme:
- Disk: Light blue with motion lines
- ω vector: Purple arrow
- L vector: Green arrow (thicker/bolder)
- Rotation indicators: Curved yellow arrows
- Hand: Realistic skin tone with clear finger/thumb labels

Multiple panels:
1. Main diagram with CCW rotation
2. Smaller diagram showing CW rotation (L points down)
3. Inset showing right hand with labeled thumb and fingers

Annotations:
- "Larger I or larger ω increases L"
- "Direction follows right-hand rule"
- "L is conserved when τ_ext = 0"
</details>

## Conservation of Angular Momentum

One of the most powerful principles in rotational motion is the **conservation of angular momentum**: In the absence of external torques, the total angular momentum of a system remains constant.

$$L_{initial} = L_{final}$$
$$I_i\omega_i = I_f\omega_f$$

This conservation law explains many fascinating phenomena:

**Figure skater spinning:** When a skater pulls their arms in, rotational inertia decreases. Since *L* = *I*ω is conserved, ω must increase—the skater spins faster! When arms extend, *I* increases and ω decreases.

**Falling cat:** A cat dropped upside-down can rotate mid-air to land on its feet by changing its body configuration to manipulate angular momentum distribution without external torques.

**Planetary orbits:** As a planet moves closer to the Sun, it speeds up; as it moves away, it slows down—conserving angular momentum.

**Helicopter tail rotor:** The tail rotor prevents the helicopter body from spinning in the opposite direction to the main rotor, conserving angular momentum of the entire system.

### Quantitative Example

**Problem:** A figure skater spins with arms extended at 1.5 revolutions per second, with rotational inertia 5.0 kg·m². She pulls her arms in, reducing her rotational inertia to 2.0 kg·m². What is her new angular velocity?

**Solution:**
1. Initial angular velocity: ω_i = 1.5 rev/s = 9.42 rad/s
2. Initial angular momentum: *L*_i = *I*_i ω_i = (5.0)(9.42) = 47.1 kg·m²/s
3. By conservation: *L*_f = *L*_i = 47.1 kg·m²/s
4. Final angular velocity: ω_f = *L*_f/*I*_f = 47.1/2.0 = 23.6 rad/s
5. Converting: ω_f = **3.75 rev/s** (2.5 times faster!)

#### Diagram: Figure Skater Angular Momentum Conservation MicroSim

<details markdown="1">
<summary>Figure Skater Angular Momentum Conservation MicroSim</summary>
Type: microsim

Learning objective: Demonstrate conservation of angular momentum by allowing students to control a figure skater's arm position and observe changes in rotation rate.

Canvas layout (800x650px):
- Top center (800x500): Drawing area showing spinning figure skater from above
- Bottom (800x150): Control panel and data display

Visual elements:
- Figure skater represented as circle (body) with two arms extending outward
- Arms shown as lines from body center with hands at endpoints (circles)
- Rotation shown by angular position of arms and trail effects
- Background reference marks to show rotation rate
- Semi-transparent rotation trail showing recent positions

Interactive controls:
- Slider: Arm extension (0-100%, where 0%=arms in, 100%=arms out)
- Display: Current rotational inertia *I* (kg·m²)
- Display: Current angular velocity ω (rad/s and rev/s)
- Display: Angular momentum *L* (kg·m²/s) - stays constant
- Button: "Reset to initial state"
- Checkbox: "Show energy" (display KE_rot changes)
- Slider: Initial angular velocity (0.5-3 rev/s)

Default parameters:
- Initial arm extension: 100% (*I* = 5.0 kg·m²)
- Initial angular velocity: 1.5 rev/s (9.42 rad/s)
- Body mass: 50 kg
- Arm mass (both): 8 kg total

Physics model:
- Arms extended (100%): *I* = 5.0 kg·m², arms at 0.8m from center
- Arms in (0%): *I* = 2.0 kg·m², arms at 0.3m from center
- Linear interpolation between these states
- Conservation: *L* = constant = 47.1 kg·m²/s
- Calculate ω = *L*/*I* at each arm position

Behavior:
- As slider moves left (arms in), skater spins faster
- As slider moves right (arms out), skater slows down
- *L* display remains constant (highlighted in green)
- ω display changes inversely with *I*
- If "Show energy" checked, display KE_rot = ½*I*ω²
- Note: KE actually increases when arms pulled in (student does work)

Visual effects:
- Smooth animation of rotation matching calculated ω
- Trail effect shows faster rotation with tighter trails
- Numbers update in real-time
- Color-code *I* (blue) and ω (red) to show inverse relationship

Implementation notes:
- Use p5.js for rendering
- Use frameRate to control animation smoothness
- Map arm position to *I* values between 2.0 and 5.0 kg·m²
- Calculate ω every frame from *L*/*I*
- Rotate skater graphic by θ += ω × dt
</details>

### Where Does the Extra Energy Come From?

Students often notice something puzzling: when the skater pulls her arms in, her angular velocity increases, which means her rotational kinetic energy increases. But energy is conserved—where does this extra energy come from?

The answer: **The skater does work** pulling her arms inward against the centripetal force. Her muscles provide the energy that increases the rotational kinetic energy. Angular momentum is conserved, but energy is not conserved in isolation—the skater adds energy to the system through muscular work.

## Rolling Motion: Translation Plus Rotation

**Rolling motion** combines translational and rotational motion. When an object rolls without slipping, every point on the object has both types of motion, and there's a special relationship between the two.

For rolling without slipping:

$$v_{cm} = r\omega$$

where *v*_cm is the velocity of the center of mass and ω is the angular velocity.

This constraint means:
- The contact point between rolling object and surface is instantaneously at rest
- The top of the rolling object moves at 2*v*_cm
- Energy is split between translational and rotational forms
- Static friction enables rolling (not kinetic friction)

### Visualizing Rolling Motion

Consider a wheel rolling to the right. At any instant:

- **Center of wheel:** Moves at velocity *v*_cm to the right
- **Top of wheel:** Moves at *v*_cm + *rω* = 2*v*_cm to the right
- **Bottom of wheel (contact point):** Moves at *v*_cm − *rω* = 0 (stationary!)
- **Points on the side:** Have velocities between these extremes

The bottom point being stationary is counterintuitive but crucial. If it weren't stationary, the object would be sliding, not rolling. Static friction prevents this sliding.

#### Diagram: Rolling Motion Velocity Vectors MicroSim

<details markdown="1">
<summary>Rolling Motion Velocity Vectors MicroSim</summary>
Type: microsim

Learning objective: Visualize velocity vectors at different points on a rolling object to understand the combination of translational and rotational motion.

Canvas layout (900x600px):
- Main area (900x450): Side view of rolling wheel
- Bottom (900x150): Control panel

Visual elements:
- Circular wheel rolling from left to right across the screen
- Center point marked clearly
- Multiple points marked around the circumference (top, bottom, sides)
- Velocity vectors drawn from each point showing magnitude and direction
- Reference velocity vector for center of mass
- Trace paths showing cycloid motion of points on rim
- Grid background for reference

Interactive controls:
- Slider: Rolling speed *v*_cm (0-5 m/s)
- Checkbox: "Show velocity vectors"
- Checkbox: "Show trace paths" (cycloid curves)
- Checkbox: "Freeze frame" (pause animation)
- Radio buttons: Select point to highlight (center, top, bottom, side)
- Button: "Reset"
- Display: v_cm value, ω value, and v = rω verification

Points to show with vectors:
1. Center: Velocity = v_cm (rightward, red vector)
2. Top: Velocity = 2v_cm (rightward, green vector, twice as long)
3. Bottom: Velocity = 0 (no vector or very small point, yellow)
4. Right side: Velocity = v_cm at 45° upward (purple vector)
5. Left side: Velocity = v_cm at 45° downward (blue vector)

Default parameters:
- v_cm = 2.0 m/s
- Wheel radius = 0.5 m
- ω = v_cm/r = 4.0 rad/s

Behavior:
- Wheel rolls smoothly across screen, wrapping at edges
- Velocity vectors update in real-time
- When frozen, show clear vector diagram with labels
- Highlight selected point with circle and display its velocity
- Trace paths show cycloid curves (bottom point) and sinusoidal paths (others)
- Display equation v_point = v_cm + rω at that point's angle

Visual effects:
- Color-code vectors by position on wheel
- Use arrows with clear heads for direction
- Show vector addition: v_point = v_trans + v_rot
- Animate smooth rolling motion

Implementation notes:
- Use p5.js for rendering
- Calculate velocity at angle θ: v_x = v_cm + rω·sin(θ), v_y = -rω·cos(θ)
- Draw vectors as arrows using custom arrow function
- Store trace path points in arrays, display with beginShape()
- Ensure v_cm = rω always (rolling without slipping)
</details>

### Rolling Down Ramps

When an object rolls down a ramp without slipping, both gravity and friction affect its motion. Energy conservation gives:

$$mgh = \frac{1}{2}mv_{cm}^2 + \frac{1}{2}I\omega^2$$

For rolling without slipping (*v*_cm = *rω*), we can solve for the velocity at the bottom:

$$v_{cm} = \sqrt{\frac{2gh}{1 + I/mr^2}}$$

This reveals an important result: **Objects with smaller *I*/*mr*² ratios roll down ramps faster.** This is why a solid sphere reaches the bottom before a hollow sphere, even if they have the same mass and radius.

The acceleration down a ramp of angle θ is:

$$a_{cm} = \frac{g\sin\theta}{1 + I/mr^2}$$

**Race rankings** (fastest to slowest):
1. Solid sphere (*I*/*mr*² = 2/5)
2. Solid cylinder (*I*/*mr*² = 1/2)
3. Hollow sphere (*I*/*mr*² = 2/3)
4. Hollow cylinder (*I*/*mr*² = 1)

Notice this is independent of mass and radius—shape alone determines the winner!

### The Role of Friction in Rolling

It might seem paradoxical, but static friction is what allows objects to roll without slipping down ramps. Without friction, objects would slide instead of roll.

However, **static friction does no work** during rolling without slipping because the contact point is instantaneously at rest. The friction force is present (preventing slipping) but doesn't dissipate energy.

Energy is lost to friction only when:
- The object slides (kinetic friction)
- The object rolls with slipping
- The object undergoes rolling resistance (deformation at contact point)

## Applications of Rotational Motion

Rotational motion principles appear throughout technology and nature:

### Engineering Applications

- **Flywheels:** Store kinetic energy in rotating mass; used in hybrid vehicles and power grid stabilization
- **Gyroscopes:** Maintain orientation using conservation of angular momentum; crucial for navigation and stability
- **Centrifuges:** Separate materials by density using high angular velocities
- **Turbines:** Convert fluid flow to rotational motion in power generation
- **Gears:** Transfer torque and angular velocity between rotating components

### Sports and Recreation

- **Baseball pitching:** Torque applied during wind-up creates angular velocity; follow-through conserves angular momentum
- **Golf swing:** Torque from hips and shoulders transfers to club; maximizing clubhead speed at impact
- **Gymnastics:** Tuck positions decrease rotational inertia for faster rotations; extending slows rotation for controlled landings
- **Cycling:** Wheel rotational inertia affects acceleration and hill climbing
- **Figure skating:** Spins demonstrate angular momentum conservation vividly

### Natural Phenomena

- **Planetary rotation:** Conservation of angular momentum as nebular clouds collapse
- **Hurricane formation:** Air spiraling inward speeds up as rotational inertia decreases
- **Cat righting reflex:** Cats twist separate body parts to change orientation without external torque
- **Falling leaves:** Tumbling motion as air resistance creates varying torques

#### Diagram: Real-World Rotational Applications Infographic

<details markdown="1">
<summary>Real-World Rotational Applications Infographic</summary>
Type: infographic

Purpose: Create a visual summary connecting rotational motion concepts to real-world applications across engineering, sports, and nature.

Layout: Grid layout with 12 application boxes arranged in 3 rows × 4 columns

Categories (rows):
1. Engineering & Technology
2. Sports & Recreation
3. Natural Phenomena

Each application box contains:
- Icon or simple illustration
- Application name
- Primary rotational concept demonstrated
- One-sentence description
- Hover text with additional details

Application boxes:

Row 1 - Engineering:
1. Flywheel Energy Storage
   - Concept: Rotational KE
   - Description: "Stores energy in spinning mass at high ω"
   - Hover: "Used in hybrid buses; can store/release energy efficiently. Modern flywheels spin at 60,000 rpm in vacuum chambers."

2. Gyroscope Navigation
   - Concept: Angular momentum conservation
   - Description: "Maintains orientation via conserved L"
   - Hover: "Found in smartphones, aircraft, spacecraft. Resists changes to angular momentum vector."

3. Centrifuge Separation
   - Concept: Centripetal force
   - Description: "High ω creates large centripetal forces"
   - Hover: "Medical centrifuges reach 10,000 rpm to separate blood components by density."

4. Wind Turbine Power
   - Concept: Torque and rotational work
   - Description: "Wind exerts torque, producing rotational work"
   - Hover: "Large turbines have rotor diameter >100m, rotational inertia >1000 kg·m²."

Row 2 - Sports:
5. Figure Skating Spins
   - Concept: Angular momentum conservation
   - Description: "Arms in → decrease I → increase ω"
   - Hover: "Professional skaters can reach 5-6 revolutions per second in scratch spins."

6. Bicycle Wheel Gyroscope
   - Concept: Gyroscopic stability
   - Description: "Spinning wheels resist tipping"
   - Hover: "Angular momentum of wheels helps maintain balance; faster spinning = more stable."

7. Baseball Pitch Spin
   - Concept: Torque application
   - Description: "Wrist torque creates ball rotation"
   - Hover: "Curveballs can spin at 2000 rpm; spin creates pressure differences (Magnus effect)."

8. Gymnastics Tumbling
   - Concept: Rotational inertia control
   - Description: "Tuck reduces I for faster rotation"
   - Hover: "Gymnasts change I by factor of 3-4 between tuck and layout positions."

Row 3 - Nature:
9. Hurricane Formation
   - Concept: Angular momentum conservation
   - Description: "Air spiraling in speeds up"
   - Hover: "As air moves toward low pressure, r decreases, so ω increases dramatically."

10. Planetary Formation
    - Concept: Angular momentum in collapse
    - Description: "Nebular cloud flattens while conserving L"
    - Hover: "Solar system formed from rotating gas cloud; conservation led to orbital plane."

11. Cat Righting Reflex
    - Concept: Zero net torque rotation
    - Description: "Rotates body parts independently"
    - Hover: "Cats can rotate 180° in <1 second by manipulating rotational inertia distribution."

12. Earth's Rotation
    - Concept: Angular momentum conservation
    - Description: "L conserved over billions of years"
    - Hover: "Tidal friction slowly transfers angular momentum to Moon, lengthening day by 2ms/century."

Interactive features:
- Hover over box to see expanded information
- Click box to see video clip or animation
- Filter buttons at top: "Show All", "Engineering", "Sports", "Nature"
- Color coding by rotational concept:
  - Red: Torque
  - Blue: Angular momentum conservation
  - Green: Rotational kinetic energy
  - Yellow: Rotational inertia

Visual style: Modern grid with colorful cards, icons, and hover effects

Implementation: HTML/CSS/JavaScript with hover effects and modal pop-ups
Canvas size: 1200x900px
</details>

## Problem-Solving Strategies for Rotational Motion

When tackling rotational motion problems, follow these strategies:

### 1. Identify the Type of Problem

- **Kinematics:** Given angular position, velocity, or acceleration; find other kinematic quantities
- **Dynamics:** Involve forces, torques, and angular acceleration
- **Energy:** Involve work, kinetic energy (translational and/or rotational), and potential energy
- **Momentum:** Involve collisions, conservation of angular momentum, or impulse-momentum

### 2. Draw Diagrams

- Sketch the situation clearly
- Show all forces and their points of application
- Indicate rotation axis and direction
- Draw separate diagrams for different time instants if needed

### 3. Choose Appropriate Equations

- **Kinematics:** Use rotational kinematic equations (constant α only)
- **Dynamics:** Use Στ = *I*α (rotational analog of ΣF = *ma*)
- **Energy:** Use conservation of energy including rotational KE
- **Momentum:** Use *L*_i = *L*_f when no external torques

### 4. Work Symbolically First

- Set up equations with symbols before plugging in numbers
- This helps catch errors and reveals relationships
- Convert all quantities to consistent units (SI preferred)

### 5. Check Your Answer

- Does the answer have correct units?
- Is the magnitude reasonable?
- Does the sign make sense (direction)?
- Do limiting cases work (e.g., what if *I* → 0)?

## Chapter Summary

Rotational motion beautifully parallels linear motion, with angular quantities replacing linear ones. This chapter covered:

**Angular kinematics:**

- Angular displacement θ measures rotation (radians)
- Angular velocity ω = Δθ/Δt measures rotation rate (rad/s)
- Angular acceleration α = Δω/Δt measures change in rotation rate (rad/s²)
- Rotational kinematic equations parallel linear equations with constant α

**Rotational dynamics:**

- Torque τ = *rF*sinθ causes angular acceleration (N·m)
- Rotational inertia *I* measures resistance to angular acceleration (kg·m²)
- Newton's second law for rotation: Στ = *I*α
- Distribution of mass affects *I*; farther from axis increases *I*

**Energy in rotation:**

- Rotational kinetic energy: KE_rot = ½*I*ω²
- Rolling objects have both translational and rotational KE
- Total energy conserved: includes gravitational PE and both forms of KE

**Angular momentum:**

- Angular momentum *L* = *I*ω (kg·m²/s)
- Conserved when net external torque is zero
- Explains figure skaters, planetary orbits, and gyroscopes
- Torque is rate of change of angular momentum: Στ = Δ*L*/Δt

**Rolling motion:**

- Combines translation and rotation
- Rolling without slipping: *v*_cm = *rω*
- Contact point instantaneously at rest
- Shape determines race down ramp (smaller *I*/*mr*² wins)

The power of this chapter lies in recognizing the deep correspondence between linear and rotational physics. Every linear concept has a rotational analog, and the same physical principles—Newton's laws, conservation of energy, conservation of momentum—apply in both domains.

## Practice Problems

### Problem 1: Angular Kinematics
A centrifuge rotor starts from rest and reaches 3600 rpm in 45 seconds with constant angular acceleration. (a) What is the angular acceleration? (b) How many revolutions does it complete during this time?

### Problem 2: Torque and Equilibrium
A 3.0 m uniform beam with mass 40 kg is supported at its center. A 60 kg person stands 0.80 m from the left end. How far from the right end must a 50 kg person stand for the beam to balance?

### Problem 3: Rotational Dynamics
A solid cylinder (mass 8.0 kg, radius 0.25 m) is mounted horizontally on a frictionless axle. A rope wrapped around the cylinder is pulled with a constant force of 40 N. What is the angular acceleration of the cylinder?

### Problem 4: Rolling Energy
A solid sphere (mass 3.0 kg, radius 0.12 m) rolls without slipping down a ramp from a height of 2.5 m. What is its linear speed at the bottom?

### Problem 5: Angular Momentum Conservation
A turntable (rotational inertia 0.030 kg·m²) rotates freely at 45 rpm. A small mass (0.15 kg) is dropped onto the turntable 0.18 m from the axis and sticks. What is the new angular velocity?

---

**Next Chapter:** [Chapter 9: Simple Harmonic Motion and Oscillations](../09-oscillations/index.md)

You now have the tools to analyze spinning wheels, rolling objects, rotating planets, and any other system involving rotational motion. The principles you've learned form the foundation for understanding oscillations, waves, and many other phenomena in the chapters ahead.
