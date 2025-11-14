# Motion in Two Dimensions

## Summary

This chapter extends your understanding of motion from one dimension to two dimensions, where motion occurs in a plane. You'll apply vector decomposition and trigonometry to analyze projectile motion, from horizontally launched objects to angled trajectories like those of kicked soccer balls or launched rockets. Free fall is examined as a special case of accelerated motion, and you'll explore how observers in different reference frames perceive relative velocities. These skills are essential for understanding real-world motion, which rarely occurs along a single straight line.

## Concepts Covered

This chapter covers the following 6 concepts from the learning graph:

1. Kinematic Equations
2. Free Fall
3. Projectile Motion
4. Horizontal Projection
5. Angled Projection
6. Relative Velocity

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Scientific Foundations and Mathematical Tools](../01-scientific-foundations/index.md)
- [Chapter 2: Motion in One Dimension](../02-motion-one-dimension/index.md)

---

## Introduction to Two-Dimensional Motion

In Chapter 2, you analyzed motion along a straight line—objects moving forward or backward, up or down, but always in one dimension. Real-world motion is rarely so simple. When a basketball arcs through the air toward the hoop, when a drone flies diagonally across a field, or when a river current pushes a swimmer downstream while they stroke toward the opposite bank, motion occurs in two dimensions simultaneously. This chapter equips you with the mathematical and conceptual tools to analyze such motion by breaking it into manageable components.

The key insight is surprisingly elegant: two-dimensional motion can be understood as two independent one-dimensional motions happening at the same time. By applying vector decomposition and the kinematic equations you already know, you'll be able to predict where a projectile will land, how long it will stay airborne, and how different observers perceive the same motion differently. These skills are essential for fields ranging from engineering and sports science to video game physics and aerospace design.

## Kinematic Equations in Two Dimensions

You've already mastered the kinematic equations for motion in one dimension from Chapter 2. These same equations apply to two-dimensional motion—you just use them twice, once for each direction. The fundamental equations remain:

- **Position:** $x = x_0 + v_0t + \frac{1}{2}at^2$
- **Velocity:** $v = v_0 + at$
- **Velocity-position relationship:** $v^2 = v_0^2 + 2a(x - x_0)$

In two dimensions, we typically use x for horizontal position and y for vertical position. The crucial principle is that **horizontal and vertical motions are independent**. What happens in the x-direction doesn't affect what happens in the y-direction, and vice versa. This independence allows us to analyze each dimension separately using the same kinematic equations.

Consider the following comparison:

| Dimension | Position Variable | Velocity Variable | Acceleration |
|-----------|-------------------|-------------------|--------------|
| Horizontal (x) | $x$ | $v_x$ | $a_x$ |
| Vertical (y) | $y$ | $v_y$ | $a_y$ |

For each dimension, you can write separate kinematic equations. Time (t) is the common factor that connects the two motions—the projectile experiences the same elapsed time in both dimensions.

<details markdown="1">
    <summary>Vector Components Diagram</summary>
    Type: diagram

    Purpose: Illustrate how a 2D velocity vector can be decomposed into horizontal and vertical components using trigonometry

    Components to show:
    - A velocity vector $\vec{v}$ drawn at an angle θ above the horizontal
    - Horizontal component $v_x$ shown as a vector along the x-axis (red arrow)
    - Vertical component $v_y$ shown as a vector along the y-axis (blue arrow)
    - Right triangle formed by the components with the original vector as hypotenuse
    - Angle θ marked between $\vec{v}$ and horizontal axis
    - Dashed lines showing how components project from the original vector

    Labels:
    - "$\vec{v}$" on main vector
    - "$v_x = v\cos\theta$" on horizontal component
    - "$v_y = v\sin\theta$" on vertical component
    - "$\theta$" marking the angle
    - Coordinate axes labeled "x" and "y"

    Style: Clean vector diagram with right-triangle geometry emphasized

    Color scheme: Black for coordinate axes, purple for main vector, red for x-component, blue for y-component, green for angle arc

    Implementation: SVG diagram or hand-drawn style illustration showing vector decomposition
</details>

When a projectile is launched at an angle, you use trigonometry to find the initial velocity components:

- **Horizontal component:** $v_{0x} = v_0\cos\theta$
- **Vertical component:** $v_{0y} = v_0\sin\theta$

Where $v_0$ is the initial speed (magnitude of velocity) and $\theta$ is the launch angle measured from the horizontal.

## Free Fall: Motion Under Gravity Alone

Free fall is a special case of two-dimensional motion where an object moves only vertically under the influence of gravity, with no horizontal motion. Near Earth's surface, all objects in free fall experience a constant downward acceleration of magnitude $g = 9.8 \text{ m/s}^2$, regardless of their mass. This principle, first demonstrated by Galileo, means that a feather and a hammer would fall at the same rate in a vacuum (without air resistance).

In free fall problems, we typically set up our coordinate system with positive y pointing upward. This means acceleration due to gravity is negative:

$$a_y = -g = -9.8 \text{ m/s}^2$$

The kinematic equations for free fall become:

- $y = y_0 + v_{0y}t - \frac{1}{2}gt^2$
- $v_y = v_{0y} - gt$
- $v_y^2 = v_{0y}^2 - 2g(y - y_0)$

Notice the negative signs appear because gravity acts downward (negative y-direction) while we've chosen upward as positive.

### Example Scenarios

Here are common free fall situations you might encounter:

- **Dropped object:** $v_{0y} = 0$, object starts from rest
- **Thrown upward:** $v_{0y} > 0$, object rises then falls
- **Thrown downward:** $v_{0y} < 0$, object speeds up throughout fall
- **At maximum height:** $v_y = 0$ momentarily before falling back down

<details markdown="1">
    <summary>Free Fall Motion MicroSim</summary>
    Type: microsim

    Learning objective: Visualize how objects fall under gravity and understand how initial velocity affects trajectory and timing

    Canvas layout (800x600px):
    - Main drawing area (600x600px): Shows vertical motion with height markers
    - Control panel (200x600px): Interactive controls on the right side

    Visual elements:
    - Vertical coordinate system with ground at y = 0
    - Height markers every 5 meters up to 50 meters (gridlines with labels)
    - Falling object (red circle, 20px diameter)
    - Velocity vector arrow (blue) extending from object, length proportional to speed
    - Acceleration vector (green, constant downward arrow showing g)
    - Trail showing previous positions (fading dots)
    - Digital display showing current y, v_y, and time

    Interactive controls:
    - Slider: Initial height y₀ (0-50 meters, default 30m)
    - Slider: Initial velocity v₀y (-20 to +20 m/s, default 0 m/s)
    - Button: "Drop" (start simulation)
    - Button: "Reset"
    - Button: "Pause/Resume"
    - Checkbox: "Show velocity vector"
    - Checkbox: "Show motion trail"
    - Display panel showing:
      - Current height: [y] m
      - Current velocity: [v_y] m/s
      - Time elapsed: [t] s

    Default parameters:
    - Initial height: 30 meters
    - Initial velocity: 0 m/s (dropped)
    - g = 9.8 m/s²
    - Update rate: 60 frames per second

    Behavior:
    - When "Drop" clicked, object begins falling according to y = y₀ + v₀y·t - ½g·t²
    - Velocity vector updates each frame using v_y = v₀y - g·t
    - Object bounces with 70% energy retention when hitting ground (optional)
    - Simulation stops when object reaches ground (y ≤ 0)
    - Trail shows last 20 positions as fading dots
    - Real-time display updates showing numerical values

    Implementation notes:
    - Use p5.js for rendering
    - Implement Euler integration for smooth animation
    - Use frameRate(60) for consistent timing
    - Map simulation coordinates to canvas pixels (1 meter = 10 pixels)
    - Velocity vector length = v_y × 3 pixels per m/s
</details>

A common question students ask: "If I throw a ball upward at 10 m/s, how long until it returns to my hand?" The symmetry of motion under constant acceleration provides an elegant answer—the time going up equals the time coming down, so total flight time is twice the time to reach maximum height.

## Projectile Motion: Combining Horizontal and Vertical Motion

Projectile motion describes the curved path an object follows when launched into the air and moving under the influence of gravity alone (neglecting air resistance). Examples include a soccer ball kicked across a field, a water fountain's arc, or a basketball shot toward the hoop. The defining characteristic of projectile motion is that it combines constant horizontal velocity with accelerated vertical motion.

Let's establish the key principles of projectile motion:

- **Horizontal motion:** Constant velocity (no acceleration), so $v_x = v_{0x}$ throughout flight
- **Vertical motion:** Constant downward acceleration due to gravity, so $a_y = -g$
- **Independence:** Horizontal and vertical motions occur simultaneously but don't affect each other
- **Time synchronization:** Both motions share the same time variable t

The trajectory—the path traced by the projectile—forms a parabola. This elegant curve emerges mathematically from combining the linear horizontal motion with the quadratic vertical motion.

| Motion Aspect | Horizontal (x) | Vertical (y) |
|---------------|----------------|--------------|
| Acceleration | 0 | $-g = -9.8 \text{ m/s}^2$ |
| Velocity | Constant ($v_x$) | Changes ($v_y = v_{0y} - gt$) |
| Position equation | $x = v_x t$ | $y = y_0 + v_{0y}t - \frac{1}{2}gt^2$ |

#### Diagram: Projectile Motion
<iframe src="../../sims/projectile-motion/main.html" height="482px" scrolling="no"></iframe>

<details markdown="1">
    <summary>Projectile Motion Trajectory Diagram</summary>
    Type: diagram

    Purpose: Show the parabolic trajectory of projectile motion with velocity vectors at different points

    Components to show:
    - Parabolic trajectory path (thick curved line)
    - Launch point at origin (left side)
    - Landing point on ground (right side)
    - Five positions along trajectory: launch, 25%, 50% (peak), 75%, and landing
    - At each position:
      - Velocity vector showing magnitude and direction
      - Separate horizontal component (red, constant length)
      - Separate vertical component (blue, varying length)
    - Ground level as horizontal line
    - Coordinate axes (x horizontal, y vertical)

    Key features to highlight:
    - Horizontal velocity component remains constant at all points
    - Vertical velocity component decreases, becomes zero at peak, then increases downward
    - Total velocity vector changes direction along trajectory
    - Trajectory is symmetric (time up = time down for same height)

    Labels:
    - "Launch" at starting point
    - "Peak (v_y = 0)" at highest point
    - "Landing" at end point
    - "$v_x$ = constant" with arrow showing horizontal component
    - "$v_y$ changes" with arrows showing vertical components
    - "Parabolic path" along trajectory

    Style: Clean technical diagram with vector arrows and annotations

    Color scheme: Black trajectory, red for horizontal components, blue for vertical components, purple for total velocity vectors, green for ground

    Implementation: SVG or illustration showing projectile motion with vector decomposition at multiple points
</details>

### Solving Projectile Motion Problems

When approaching projectile motion problems, follow this systematic strategy:

1. **Set up coordinate system:** Place origin at launch point, x horizontal, y vertical (up positive)
2. **Identify known quantities:** Initial position, initial velocity components, acceleration
3. **Break into components:** Write separate equations for x-motion and y-motion
4. **Use time as a link:** The same time t appears in both x and y equations
5. **Solve systematically:** Find what's asked using appropriate kinematic equations

Most problems ask you to find quantities such as maximum height, range (horizontal distance), flight time, or impact velocity. Each has a characteristic approach using the equations and principles we've discussed.

## Horizontal Projection: Launching with No Vertical Velocity

Horizontal projection is a special case of projectile motion where an object is launched horizontally—meaning the initial velocity has no vertical component. Picture a ball rolling off a table, a package dropped from a moving airplane, or a stone thrown horizontally from a cliff. The initial velocity is purely horizontal: $v_{0x} = v_0$ and $v_{0y} = 0$.

This scenario simplifies the mathematics considerably:

**Horizontal motion:**
$$x = v_0 t$$

**Vertical motion:**
$$y = y_0 - \frac{1}{2}gt^2$$
$$v_y = -gt$$

Notice that horizontal projection problems often involve finding either the time to hit the ground or the horizontal range. The vertical motion determines the time (independent of horizontal speed), and then that time determines how far the object travels horizontally.

### Key Insights for Horizontal Projection

Consider these important observations:

- Time to fall depends only on initial height, not on horizontal speed
- Greater horizontal speed increases range but not flight time
- Vertical velocity at impact depends only on fall height, not horizontal motion
- At impact, velocity vector points downward and forward at some angle

<details markdown="1">
    <summary>Horizontal Projection Interactive Comparison</summary>
    Type: microsim

    Learning objective: Demonstrate that objects with different horizontal velocities but same initial height hit the ground simultaneously (independence of horizontal and vertical motion)

    Canvas layout (900x600px):
    - Main drawing area (900x500px): Shows side view of cliff and ground
    - Control panel (900x100px): Controls at bottom

    Visual elements:
    - Cliff or platform on left side (height adjustable, default 40m)
    - Ground level with distance markers (every 10m)
    - Three projectiles (different colors: red, blue, green circles)
    - Trajectory paths traced as dotted lines
    - Velocity vectors on each projectile (showing total velocity)
    - Horizontal and vertical component vectors (toggleable)
    - Timer display showing elapsed time

    Interactive controls:
    - Slider: Platform height (10-50 meters, default 40m)
    - Slider: Projectile 1 speed (5-25 m/s, default 10 m/s, red)
    - Slider: Projectile 2 speed (5-25 m/s, default 15 m/s, blue)
    - Slider: Projectile 3 speed (5-25 m/s, default 20 m/s, green)
    - Button: "Launch All Simultaneously"
    - Button: "Reset"
    - Checkbox: "Show velocity components"
    - Checkbox: "Show trajectory paths"
    - Checkbox: "Slow motion (0.5x speed)"
    - Display: "All projectiles hit ground at t = [time] seconds"

    Default parameters:
    - Platform height: 40 meters
    - Speeds: 10, 15, 20 m/s
    - g = 9.8 m/s²

    Behavior:
    - When "Launch All" clicked, all three projectiles leave platform simultaneously
    - Each follows parabolic path: x = v₀·t, y = h - ½g·t²
    - Trajectory paths trace behind each projectile
    - All three hit ground at exactly same time (emphasize this visually with flash or sound)
    - Display shows landing times and horizontal distances for each
    - Velocity vectors update in real-time
    - When components shown, display v_x (constant) and v_y (increasing downward)

    Key teaching moments:
    - Despite different speeds, all hit ground together → independence of motions
    - Faster projectiles travel farther horizontally but fall for same time
    - Vertical velocity at impact is identical for all three
    - Horizontal velocity remains constant for each projectile

    Implementation notes:
    - Use p5.js for rendering
    - Coordinate mapping: 1 meter = 8 pixels
    - Update physics at 60 fps
    - Draw trajectories by storing previous positions
    - Highlight simultaneous landing with visual cue (screen flash, text emphasis)
</details>

A classic example to test your understanding: if you simultaneously drop one ball and throw another horizontally from the same height, which hits the ground first? The answer—they hit simultaneously—reveals the fundamental independence of horizontal and vertical motion components.

## Angled Projection: Launching at an Angle

Angled projection represents the most general case of projectile motion, where an object is launched at some angle above or below the horizontal. Think of a kicked football, a golf drive, or a basketball shot—these all involve angled projection. The initial velocity has both horizontal and vertical components determined by the launch angle.

For an object launched at angle θ above the horizontal with initial speed $v_0$:

**Initial velocity components:**
$$v_{0x} = v_0\cos\theta$$
$$v_{0y} = v_0\sin\theta$$

**Position equations:**
$$x = (v_0\cos\theta)t$$
$$y = y_0 + (v_0\sin\theta)t - \frac{1}{2}gt^2$$

**Velocity equations:**
$$v_x = v_0\cos\theta$$ (remains constant)
$$v_y = v_0\sin\theta - gt$$ (changes with time)

### Important Quantities in Angled Projection

Several key quantities characterize angled projectile motion:

- **Time to maximum height:** $t_{max} = \frac{v_0\sin\theta}{g}$ (when $v_y = 0$)
- **Maximum height:** $y_{max} = y_0 + \frac{(v_0\sin\theta)^2}{2g}$
- **Total flight time:** $t_{total} = \frac{2v_0\sin\theta}{g}$ (for level ground, $y_0 = y_f$)
- **Horizontal range:** $R = \frac{v_0^2\sin(2\theta)}{g}$ (for level ground)

The range equation reveals an interesting optimization: the angle that produces maximum range is 45° (since $\sin(90°) = 1$ is maximum). However, complementary angles (like 30° and 60°) produce the same range—they just have different trajectories and flight times.

| Launch Angle | Trajectory Shape | Time Aloft | Range (relative) |
|--------------|------------------|------------|------------------|
| 30° | Low arc | Shorter | Medium |
| 45° | Optimal parabola | Medium | Maximum |
| 60° | High arc | Longer | Medium |
| 75° | Very steep | Longest | Short |

<details markdown="1">
    <summary>Angled Projectile Motion Explorer MicroSim</summary>
    Type: microsim

    Learning objective: Allow students to explore how launch angle and initial speed affect trajectory, range, maximum height, and flight time

    Canvas layout (1000x700px):
    - Main drawing area (700x600px): Shows trajectory with ground and measurements
    - Control panel (300x600px): Interactive controls on right
    - Data display panel (700x100px): Shows calculated values at bottom

    Visual elements:
    - Ground level with distance markings (every 5 meters)
    - Launch platform at adjustable height (default ground level)
    - Cannon or launcher icon showing angle visually
    - Projectile (orange circle) moving along trajectory
    - Parabolic trajectory path traced in real-time
    - Dashed arc showing predicted full path
    - Maximum height marked with horizontal dashed line
    - Range marked with vertical dashed line
    - Velocity vector (blue arrow) on projectile
    - Component vectors (red = v_x, green = v_y) toggleable
    - Angle indicator showing launch angle from horizontal

    Interactive controls:
    - Slider: Launch angle θ (0-90 degrees, default 45°)
    - Slider: Initial speed v₀ (5-40 m/s, default 20 m/s)
    - Slider: Launch height y₀ (0-20 meters, default 0 m)
    - Button: "Launch"
    - Button: "Reset"
    - Button: "Clear Trajectories"
    - Checkbox: "Show predicted path"
    - Checkbox: "Show velocity components"
    - Checkbox: "Show multiple launches" (overlay previous trajectories)
    - Checkbox: "Show complementary angle" (e.g., show both 30° and 60°)
    - Speed control: Slow motion, normal, fast forward

    Data display panel (real-time updates):
    - Launch angle: [θ]°
    - Initial speed: [v₀] m/s
    - Initial v_x: [v₀x] m/s
    - Initial v_y: [v₀y] m/s
    - Current height: [y] m
    - Current velocity: [v] m/s
    - Time aloft: [t] s
    - Maximum height: [y_max] m
    - Horizontal range: [R] m
    - Impact velocity: [v_impact] m/s at [angle]° below horizontal

    Default parameters:
    - Launch angle: 45°
    - Initial speed: 20 m/s
    - Launch height: 0 m (ground level)
    - g = 9.8 m/s²

    Behavior:
    - When "Launch" clicked, projectile follows calculated parabolic path
    - Position updates: x = v₀cos(θ)·t, y = y₀ + v₀sin(θ)·t - ½g·t²
    - Velocity updates: v_x = v₀cos(θ), v_y = v₀sin(θ) - g·t
    - Trajectory traces behind projectile as colored line
    - At maximum height, briefly highlight with circle and display y_max
    - When landing, show impact point with marker and display R
    - If "Show complementary angle" checked, launch both simultaneously for comparison
    - If "Show multiple launches" checked, keep previous trajectories visible (faded)
    - Calculate and display theoretical values: t_total, y_max, R

    Special teaching features:
    - Highlight when θ = 45° (maximum range condition)
    - Show that complementary angles (e.g., 30° and 60°) produce same range
    - Demonstrate that steeper angles give longer flight time but less range
    - Allow students to test "what if" scenarios

    Implementation notes:
    - Use p5.js for rendering
    - Store previous trajectories in array for multi-trajectory view
    - Coordinate mapping: 1 meter = 10 pixels
    - Update at 60 fps for smooth motion
    - Use parametric equations for accurate trajectory
    - Calculate theoretical values and display alongside experimental
    - Implement collision detection for ground (y ≤ 0)
</details>

In practice, real projectiles experience air resistance, which makes actual trajectories deviate from the ideal parabola. Lighter objects with large surface areas (like badminton shuttlecocks) show greater deviation than dense, streamlined objects (like javelins). However, the ideal projectile model provides an excellent approximation for many situations and forms the foundation for more advanced analysis.

### Projectile Motion in Sports and Engineering

Understanding angled projection has practical applications across many fields:

- **Sports:** Optimizing basketball shot angles, determining golf club selection, analyzing football punt trajectories
- **Engineering:** Designing water fountains, calculating sprinkler coverage, planning projectile weapons
- **Safety:** Analyzing vehicle accident trajectories, understanding avalanche paths, predicting debris patterns
- **Entertainment:** Programming realistic physics in video games, creating special effects in movies

## Relative Velocity: Motion from Different Perspectives

Relative velocity addresses a fundamental question: how does motion appear to different observers? Imagine you're on a train moving at 20 m/s, and you walk toward the front at 2 m/s. From your perspective, you're walking at 2 m/s. But to someone standing on the platform, you're moving at 22 m/s. Both observations are correct—they just represent different reference frames.

A **reference frame** is the perspective from which motion is observed. Your velocity relative to one reference frame can be very different from your velocity relative to another. In two dimensions, relative velocity requires vector addition because velocities have both magnitude and direction.

The fundamental equation for relative velocity is:

$$\vec{v}_{AB} = \vec{v}_A - \vec{v}_B$$

This reads as "the velocity of A relative to B equals the velocity of A minus the velocity of B" (where both velocities are measured in some common reference frame, like the ground).

### Common Relative Velocity Scenarios

Here are typical situations involving relative velocity:

- **River crossing:** Swimmer's velocity relative to shore = swimmer's velocity in water + water's velocity relative to shore
- **Airplane in wind:** Plane's velocity relative to ground = plane's velocity in air + wind velocity
- **Moving walkway:** Person's velocity relative to ground = walking velocity on walkway + walkway velocity
- **Chase problems:** Relative velocity of pursuer and target determines whether they'll meet

<details markdown="1">
    <summary>River Crossing Relative Velocity Diagram</summary>
    Type: diagram

    Purpose: Illustrate how river current affects a swimmer's trajectory and how to calculate resultant velocity using vector addition

    Components to show:
    - Top-down view of river flowing left to right
    - Both banks of river shown (parallel horizontal lines)
    - Starting position on bottom bank (point A)
    - Intended destination directly across river on top bank (point B)
    - Actual landing position downstream on top bank (point C)
    - Three velocity vectors:
      1. Swimmer's velocity relative to water (blue arrow pointing toward B)
      2. Current velocity relative to ground (red arrow pointing right)
      3. Resultant velocity relative to ground (purple arrow pointing from A to C)
    - Right triangle formed by the three vectors (showing vector addition)
    - Distance markers: river width (d) and downstream drift (x)

    Labels:
    - "$\vec{v}_{sw}$" for swimmer velocity (blue)
    - "$\vec{v}_{current}$" for current velocity (red)
    - "$\vec{v}_{resultant}$" for resultant velocity (purple)
    - "Starting point (A)" at bottom
    - "Intended destination (B)" directly across
    - "Actual landing (C)" downstream
    - "River width = d"
    - "Downstream drift = x"
    - Angle θ showing direction of resultant

    Annotations:
    - "Vector addition: $\vec{v}_{resultant} = \vec{v}_{sw} + \vec{v}_{current}$"
    - "Swimmer aims perpendicular to banks but drifts downstream"

    Style: Clear top-down view with vector arrows and right-triangle geometry

    Color scheme: Light blue for river, brown for banks, blue for swimmer velocity, red for current, purple for resultant, black for labels

    Implementation: SVG diagram or illustration showing vector addition in river crossing context
</details>

### Vector Addition for Relative Velocity

Since velocity is a vector quantity, relative velocity problems require vector addition. In two dimensions, you can use either:

1. **Component method:** Break each velocity into x and y components, add components separately, then recombine
2. **Pythagorean theorem and trigonometry:** For perpendicular velocities, use $v = \sqrt{v_x^2 + v_y^2}$ and $\theta = \tan^{-1}(v_y/v_x)$

The component method is more general and works for any angles, while the geometric method is faster for perpendicular or parallel velocities.

<details markdown="1">
    <summary>Relative Velocity Problem Solver MicroSim</summary>
    Type: microsim

    Learning objective: Help students visualize and solve relative velocity problems involving two moving objects in 2D space

    Canvas layout (1000x650px):
    - Main visualization area (650x550px): Shows bird's-eye view of scenario
    - Control panel (350x550px): Interactive inputs on right
    - Solution display (1000x100px): Shows step-by-step solution at bottom

    Visual elements:
    - 2D coordinate grid with x and y axes (ground reference frame)
    - Object A (blue circle) with velocity vector
    - Object B (red circle) with velocity vector
    - Resultant relative velocity vector (green dashed arrow from B to A)
    - Paths traced for both objects showing motion over time
    - Reference point showing relative position
    - Angle indicators for all velocity vectors

    Scenario presets (dropdown menu):
    1. "River Crossing" - swimmer and current
    2. "Airplane in Wind" - plane velocity and wind
    3. "Boat to Boat" - two boats moving at angles
    4. "Custom" - user-defined velocities

    Interactive controls:
    - **Object A:**
      - Slider: Speed v_A (0-30 m/s, default 10 m/s)
      - Slider: Direction θ_A (0-360°, default 0°)
      - Color: Blue
    - **Object B (reference object):**
      - Slider: Speed v_B (0-30 m/s, default 5 m/s)
      - Slider: Direction θ_B (0-360°, default 90°)
      - Color: Red
    - Button: "Calculate Relative Velocity"
    - Button: "Animate Motion"
    - Button: "Reset"
    - Checkbox: "Show component vectors"
    - Checkbox: "Show reference frame from B"
    - Dropdown: Scenario presets

    Default parameters (Custom scenario):
    - Object A: 10 m/s at 0° (east)
    - Object B: 5 m/s at 90° (north)

    Behavior when "Calculate Relative Velocity" clicked:
    - Display component breakdown:
      - v_Ax = v_A cos(θ_A)
      - v_Ay = v_A sin(θ_A)
      - v_Bx = v_B cos(θ_B)
      - v_By = v_B sin(θ_B)
    - Calculate relative velocity v_AB = v_A - v_B:
      - v_ABx = v_Ax - v_Bx
      - v_ABy = v_Ay - v_By
      - |v_AB| = √(v_ABx² + v_ABy²)
      - θ_AB = tan⁻¹(v_ABy / v_ABx)
    - Draw green dashed arrow showing v_AB
    - Display result: "A's velocity relative to B: [magnitude] m/s at [angle]°"

    Behavior when "Animate Motion" clicked:
    - Both objects move according to their velocities
    - Trace paths over 10 seconds of motion
    - Show relative position vector updating in real-time
    - Optional: switch to reference frame of B (B appears stationary, everything else moves)

    Solution display panel shows:
    - Step 1: Component breakdown of both velocities
    - Step 2: Subtract components (v_AB = v_A - v_B)
    - Step 3: Calculate magnitude and direction of v_AB
    - Final answer highlighted in green box
    - Interpretation: "From B's perspective, A is moving at [result]"

    Special teaching features:
    - When "Show reference frame from B" is checked, redraw entire scene from B's perspective
    - Highlight that relative velocity depends on which object is the observer
    - Show v_BA = -v_AB (relative velocity reverses when changing observer)
    - For river crossing preset, show optimal angle to reach directly across

    Implementation notes:
    - Use p5.js for rendering and interaction
    - Vector math library for calculations
    - Store velocities as vector objects {x, y, mag, angle}
    - Update positions using Euler integration
    - Coordinate mapping: 1 m/s = 15 pixels
    - Grid spacing: 50 pixels (represents 5 meters)
    - Update at 60 fps for smooth animation
</details>

A practical application: pilots must account for wind velocity when planning flight paths. If a pilot wants to fly due north but a crosswind blows from the west, the plane must be aimed somewhat west of north so the resultant velocity (plane + wind) points due north. This is called "crabbing" and is essential for maintaining the intended course.

## Connecting to Real-World Applications

The concepts in this chapter extend far beyond classroom physics problems. Every time you watch a basketball game, see a fountain, or observe a drone flying, you're witnessing two-dimensional motion governed by the principles we've explored. Engineers designing roller coasters, video game developers programming character jumps, and civil engineers planning drainage systems all apply projectile motion analysis.

Understanding relative velocity is equally important. Air traffic controllers use relative velocity to maintain safe spacing between aircraft. Self-driving car systems calculate relative velocities of surrounding vehicles to make navigation decisions. Even sports analytics increasingly employ relative velocity concepts to optimize player positioning and strategy.

The mathematical framework you've developed—decomposing vectors, applying kinematic equations independently to each dimension, and combining results—is a powerful tool that extends to more complex scenarios in advanced physics, including motion in three dimensions, circular motion, and eventually relativistic motion at speeds approaching the speed of light.

## Key Concepts Summary

As you complete this chapter, ensure you can:

- Apply kinematic equations separately to horizontal and vertical components of 2D motion
- Recognize that horizontal and vertical motions are independent but synchronized by time
- Analyze free fall motion using constant acceleration equations with $a_y = -g$
- Decompose initial velocity into components using trigonometry: $v_{0x} = v_0\cos\theta$ and $v_{0y} = v_0\sin\theta$
- Solve horizontal projection problems where $v_{0y} = 0$
- Calculate range, maximum height, and flight time for angled projection
- Understand that 45° launch angle produces maximum range on level ground
- Apply relative velocity using vector addition: $\vec{v}_{AB} = \vec{v}_A - \vec{v}_B$
- Recognize that motion appears different from different reference frames
- Use both component method and geometric method for vector addition problems

The independence of horizontal and vertical motion is the central principle underlying all projectile motion. Once you master decomposing a complex 2D problem into two simpler 1D problems, you've gained a powerful strategy for physics problem-solving that will serve you throughout the course and beyond.
