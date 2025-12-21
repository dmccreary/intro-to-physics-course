# Motion in One Dimension

## Summary

This chapter introduces kinematics, the study of motion without considering its causes. You'll learn to describe and analyze motion in one dimension using position, displacement, velocity, and acceleration. Through position-time, velocity-time, and acceleration-time graphs, you'll develop visual and analytical skills for understanding motion patterns. The kinematic equations you master here will enable you to solve complex motion problems involving both uniform motion and uniformly accelerated motion, providing the foundation for understanding all types of mechanical motion in physics.

## Concepts Covered

This chapter covers the following 11 concepts from the learning graph:

1. Displacement
2. Distance
3. Speed
4. Velocity
5. Acceleration
6. Linear Motion
7. Uniform Motion
8. Uniformly Accelerated Motion
9. Position-Time Graphs
10. Velocity-Time Graphs
11. Acceleration-Time Graphs

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Scientific Foundations and Mathematical Tools](../01-scientific-foundations/index.md)

---

## Introduction to Motion

Imagine you're watching a race. A runner explodes from the starting blocks, steadily builds speed down the track, then coasts across the finish line. Even this simple scenario involves multiple types of motion—starting from rest, speeding up, and moving at constant velocity. Understanding motion is fundamental to physics because everything in our universe moves, from subatomic particles to galaxies. In this chapter, you'll develop the tools to describe, analyze, and predict motion mathematically and graphically.

Kinematics is the branch of physics that describes motion without worrying about what causes it. Think of it as the "what" rather than the "why" of motion. Before we can understand forces and energy (coming in later chapters), we need a precise language to describe how objects move through space and time. This chapter focuses on the simplest case: motion along a straight line, also called one-dimensional motion or linear motion.

The concepts you'll master here form the foundation for all motion analysis in physics. Whether you're calculating the stopping distance of a car, predicting where a baseball will land, or analyzing the motion of a roller coaster, you'll use the principles introduced in this chapter. Let's start by understanding what we mean when we say something has moved.

## Distance and Displacement: Two Ways to Describe Motion

When you walk to school, you could describe your trip in two different ways. You might say, "I walked 2 kilometers," which tells someone how far you traveled. Or you might say, "School is 1.5 kilometers northeast of my house," which tells both how far and in what direction. These two descriptions represent fundamentally different concepts: distance and displacement.

**Distance** is the total length of the path traveled, regardless of direction. It's a scalar quantity, meaning it has magnitude (size) but no direction. If you walk around a 400-meter track and return to where you started, you've traveled a distance of 400 meters even though you end up at your starting point.

**Displacement**, on the other hand, is a vector quantity that describes the straight-line distance and direction from your starting position to your ending position. Using the track example, if you complete one lap, your displacement is zero—you haven't moved from your starting point, even though you traveled 400 meters.

Here's a comparison of these two concepts:

| Property | Distance | Displacement |
|----------|----------|--------------|
| Type | Scalar (magnitude only) | Vector (magnitude and direction) |
| Symbol | d | Δx (or Δs) |
| Units | meters (m) | meters (m) |
| Path dependent? | Yes | No |
| Can be zero? | Only if no motion | Yes, if start = end position |
| Can be negative? | No | Yes (indicates direction) |

The Greek letter delta (Δ) means "change in," so Δx represents the change in position. Mathematically, displacement is calculated as:

**Δx = x_final - x_initial**

where x_final is your ending position and x_initial is your starting position.

#### Diagram: Distance vs Displacement Interactive Visualization

<details markdown="1">
<summary>Distance vs Displacement Interactive Visualization</summary>
Type: microsim

Learning objective: Help students understand the difference between distance (path length) and displacement (straight-line change) through an interactive path-drawing exercise.

Canvas layout (800x600px):
- Left side (600x600): Drawing area with coordinate grid
- Right side (200x600): Control panel and results display

Visual elements:
- Coordinate grid with origin at center
- Starting point marked with green circle (labeled "Start")
- Current position marked with yellow circle (follows mouse)
- Path traced in blue line as user drags
- Red arrow from start to current position (displacement vector)
- Distance counter showing accumulated path length
- Displacement counter showing straight-line distance

Interactive controls:
- Click and drag to draw a path on the grid
- Button: "Reset" (clears path, returns to start)
- Button: "Complete Journey" (marks end point)
- Checkbox: "Show Displacement Vector" (toggles red arrow)
- Display panel showing:
  - Distance Traveled: [value] m
  - Displacement: [value] m at [angle]°
  - Ratio: Distance/Displacement = [value]

Default parameters:
- Grid scale: 1 square = 10 meters
- Start position: Center of canvas (0,0)

Behavior:
- As user drags mouse, blue path draws continuously
- Distance counter increases with total path length
- Displacement updates in real-time as straight-line distance from start
- When path crosses itself, distance continues accumulating
- Displacement arrow always points from start to current position
- After "Complete Journey," display final statistics comparing distance and displacement
- Include examples: "Try making a circle! Notice how distance increases but displacement returns to near zero"

Implementation: p5.js with vector math for displacement calculations
</details>

Consider this example: You walk 3 blocks east, then 4 blocks north. Your distance traveled is 7 blocks (3 + 4). However, your displacement is 5 blocks at an angle. Using the Pythagorean theorem: √(3² + 4²) = 5 blocks. The direction would be northeast, specifically at an angle of arctan(4/3) ≈ 53° north of east.

## Speed and Velocity: Describing How Fast

Now that we can describe where something moves, let's describe how fast it moves. Just as we have two ways to describe position change, we have two ways to describe how quickly that change happens: speed and velocity.

**Speed** tells us how fast an object is moving but doesn't specify direction. It's the rate at which distance is covered over time. When your car's speedometer reads 60 km/h, that's speed—it doesn't tell you whether you're going north, south, or in circles.

**Average speed** is calculated as:

**Average speed = Total distance / Total time**

**Velocity**, like displacement, includes direction. It's the rate of change of position (displacement) with respect to time. Velocity is a vector quantity that tells both how fast and in which direction an object is moving.

**Average velocity** is calculated as:

**Average velocity = Displacement / Time interval**

or mathematically: **v_avg = Δx / Δt**

where Δt represents the change in time.

The distinction between speed and velocity becomes important when direction changes. Imagine you drive around a circular track at a constant speed of 100 km/h. Your speed remains 100 km/h throughout, but your velocity constantly changes because your direction changes. At each moment, your velocity vector points in a different direction.

Here are some key points about speed and velocity:

- Speed is always positive or zero
- Velocity can be positive, negative, or zero
- Negative velocity indicates motion in the negative direction (typically left or down)
- Average speed ≥ average velocity magnitude (distance ≥ displacement magnitude)
- Units for both: meters per second (m/s), kilometers per hour (km/h), miles per hour (mph)

**Example Problem:** You drive to a store 15 km away in 20 minutes, shop for 10 minutes, then drive home in 25 minutes. Calculate your average speed and average velocity for the entire trip.

**Solution:**
- Total distance = 15 km (to store) + 15 km (back home) = 30 km
- Total time = 20 min + 10 min + 25 min = 55 min = 0.917 hours
- Average speed = 30 km / 0.917 hours ≈ 32.7 km/h

- Displacement = 0 km (you ended where you started)
- Average velocity = 0 km / 0.917 hours = 0 km/h

This example illustrates an important principle: you can have a high average speed but zero average velocity if you return to your starting point.

## Instantaneous Velocity: Motion at a Single Moment

Average velocity tells us about motion over a time interval, but what about velocity at a specific instant? When you glance at your car's speedometer, you're reading instantaneous speed—your speed at that exact moment, not averaged over your trip.

**Instantaneous velocity** is the velocity of an object at a specific moment in time. Conceptually, it's the average velocity over an infinitesimally small time interval. Mathematically, if you've taken calculus, instantaneous velocity is the derivative of position with respect to time: **v = dx/dt**.

For those without calculus background, think of it this way: to find instantaneous velocity at time t, calculate the average velocity over a very small time interval centered on t. The smaller the time interval, the closer you get to the true instantaneous velocity. It's like taking a snapshot of motion—freezing time and asking "how fast and in what direction right now?"

On a position-time graph (which we'll explore in detail later), the instantaneous velocity at any point is the slope of the tangent line to the curve at that point. A steeper slope indicates higher velocity. We can determine several things from the slope:

- Positive slope → positive velocity → moving in positive direction
- Negative slope → negative velocity → moving in negative direction
- Zero slope → zero velocity → momentarily at rest
- Steeper slope → greater speed

In everyday conversation, when people say "velocity" or "speed," they usually mean instantaneous velocity or speed unless they specify otherwise. From now on in this course, when we use the term "velocity" without qualification, we typically mean instantaneous velocity.

#### Diagram: Velocity vs Speed Comparison Table

<details markdown="1">
<summary>Velocity vs Speed Comparison Table</summary>
Type: diagram

Purpose: Create a visual comparison showing scenarios where speed and velocity differ, helping students distinguish between these concepts.

Layout: 2x3 grid of scenario illustrations with accompanying data tables

Scenarios to illustrate:
1. Straight-line motion forward
   - Arrow showing rightward motion
   - Speed: 10 m/s
   - Velocity: +10 m/s (right)
   - Note: "Speed and velocity magnitude are equal"

2. Straight-line motion backward
   - Arrow showing leftward motion
   - Speed: 10 m/s
   - Velocity: -10 m/s (left)
   - Note: "Speed positive, velocity negative"

3. Circular motion (constant speed)
   - Circle with arrows showing path
   - Speed: 10 m/s (constant)
   - Velocity: changing direction continuously
   - Note: "Speed constant, velocity always changing"

4. Stationary object
   - Dot with no arrows
   - Speed: 0 m/s
   - Velocity: 0 m/s
   - Note: "Both zero—no motion"

5. Round trip journey
   - Path showing out-and-back motion
   - Average speed: 15 m/s
   - Average velocity: 0 m/s
   - Note: "Returned to start—displacement is zero"

6. Changing speed in one direction
   - Arrow with gradient showing acceleration
   - Speed: increasing from 5 to 15 m/s
   - Velocity: increasing from +5 to +15 m/s
   - Note: "Both increasing—speeding up"

Visual style: Clean diagrams with coordinate axes, arrows for vectors, and color coding (blue for speed, red for velocity vectors)

Implementation: SVG-based diagram or illustration with clear labels and annotations
</details>

## Acceleration: The Rate of Change of Velocity

So far, we've described position (where something is) and velocity (how fast and in what direction it's moving). But motion isn't always constant—cars speed up and slow down, balls thrown upward slow as they rise, then speed up as they fall. **Acceleration** describes how velocity changes over time.

Acceleration is the rate of change of velocity with respect to time. Like velocity, acceleration is a vector quantity—it has both magnitude and direction. The average acceleration is calculated as:

**a_avg = Δv / Δt = (v_final - v_initial) / (t_final - t_initial)**

**Instantaneous acceleration** is the acceleration at a specific moment, which is the derivative of velocity with respect to time (or the second derivative of position): **a = dv/dt = d²x/dt²**.

The SI unit for acceleration is meters per second squared (m/s²), which can be read as "meters per second, per second." This unit tells us how much the velocity changes (in m/s) each second. For example, an acceleration of 5 m/s² means the velocity increases by 5 m/s every second.

Here's a crucial point that often confuses students: **acceleration can be positive or negative, regardless of whether the object is speeding up or slowing down**. The sign of acceleration tells you its direction, not whether the object is gaining or losing speed. Let's clarify:

- **Positive acceleration** means acceleration in the positive direction (usually right or up)
- **Negative acceleration** means acceleration in the negative direction (usually left or down)

Whether an object speeds up or slows down depends on the relationship between velocity and acceleration:

| Velocity Direction | Acceleration Direction | Result |
|--------------------|------------------------|--------|
| Positive (+) | Positive (+) | Speeding up |
| Positive (+) | Negative (-) | Slowing down |
| Negative (-) | Positive (+) | Slowing down (becoming less negative) |
| Negative (-) | Negative (-) | Speeding up (becoming more negative) |
| Zero (0) | Positive (+) or (-) | Starting to move |

The term **deceleration** is sometimes used to describe slowing down, but it's not a technical physics term. In physics, we simply say an object has acceleration opposite to its velocity direction.

**Example:** A car traveling at 20 m/s to the right (positive direction) applies brakes and comes to a stop in 4 seconds. Calculate the acceleration.

**Solution:**
- v_initial = +20 m/s
- v_final = 0 m/s
- Δt = 4 s
- a = (0 - 20) / 4 = -5 m/s²

The acceleration is -5 m/s², meaning the car accelerates in the negative direction (opposite its motion), causing it to slow down. Each second, the velocity decreases by 5 m/s: 20 m/s → 15 m/s → 10 m/s → 5 m/s → 0 m/s.

## Types of Linear Motion

Now that we've defined the fundamental quantities—position, velocity, and acceleration—let's examine different categories of one-dimensional motion. Understanding these categories will help you quickly identify which equations and analysis techniques to apply.

**Linear motion** (also called rectilinear motion) is motion along a straight line. This is the simplest type of motion to analyze because we only need to track one spatial dimension. All motion can be described using just one coordinate axis, with positive and negative values indicating direction. Examples include a train on a straight track, an elevator moving up and down, or a ball rolling across a flat floor.

Within linear motion, we can identify two important special cases based on acceleration:

### Uniform Motion

**Uniform motion** (also called constant velocity motion) occurs when an object moves at a constant velocity—meaning both constant speed and constant direction. In uniform motion:

- Velocity is constant (v = constant)
- Acceleration is zero (a = 0)
- The object covers equal distances in equal time intervals
- Position changes linearly with time

Examples of uniform motion include:

- A car on cruise control on a straight highway
- A hockey puck sliding on frictionless ice
- A satellite in orbit (though the orbit is circular, each small segment approximates uniform motion)

The equation describing uniform motion is simple:

**x = x₀ + vt**

where x₀ is the initial position, v is the constant velocity, and t is time.

### Uniformly Accelerated Motion

**Uniformly accelerated motion** (also called constant acceleration motion) occurs when an object's velocity changes at a constant rate. In this type of motion:

- Acceleration is constant (a = constant)
- Velocity changes linearly with time
- Position changes quadratically with time
- The relationship between distance and time follows a parabolic curve

Examples of uniformly accelerated motion include:

- A ball in free fall (ignoring air resistance)
- A car accelerating from a stoplight at constant throttle
- An airplane taking off down a runway
- An object sliding down a frictionless inclined plane

This is one of the most important types of motion to master because many real-world situations approximate constant acceleration, and the mathematics remains manageable. When acceleration is constant, we can use a set of powerful equations called the kinematic equations (which we'll derive shortly).

#### Diagram: Comparison of Uniform vs Uniformly Accelerated Motion

<details markdown="1">
<summary>Comparison of Uniform vs Uniformly Accelerated Motion</summary>
Type: chart

Chart type: Multi-panel comparison showing position, velocity, and acceleration graphs over time

Purpose: Help students visualize the key differences between uniform motion and uniformly accelerated motion through comparative graphs.

Layout: 2 columns × 3 rows = 6 graphs total
- Left column: Uniform Motion
- Right column: Uniformly Accelerated Motion
- Row 1: Position vs Time
- Row 2: Velocity vs Time
- Row 3: Acceleration vs Time

Uniform Motion Graphs (Left Column):

1. Position vs Time (x vs t):
   - Straight line with positive slope
   - Starting position: x₀ = 0 m
   - Constant slope representing constant velocity
   - Equation shown: x = vt
   - Time range: 0-10 seconds
   - Position range: 0-50 meters

2. Velocity vs Time (v vs t):
   - Horizontal line at v = 5 m/s
   - Perfectly flat—no change in velocity
   - Shaded area under curve labeled "displacement"
   - Time range: 0-10 seconds

3. Acceleration vs Time (a vs t):
   - Horizontal line at a = 0 m/s²
   - No area under curve
   - Time range: 0-10 seconds

Uniformly Accelerated Motion Graphs (Right Column):

1. Position vs Time (x vs t):
   - Parabolic curve (concave up)
   - Starting position: x₀ = 0 m
   - Curve gets steeper with time
   - Equation shown: x = ½at²
   - Time range: 0-10 seconds
   - Position range: 0-100 meters

2. Velocity vs Time (v vs t):
   - Straight line with positive slope
   - Starting velocity: v₀ = 0 m/s
   - Constant slope representing constant acceleration
   - Shaded area under curve labeled "displacement"
   - Time range: 0-10 seconds
   - Velocity range: 0-20 m/s

3. Acceleration vs Time (a vs t):
   - Horizontal line at a = 2 m/s²
   - Constant acceleration throughout
   - Shaded area labeled "change in velocity"
   - Time range: 0-10 seconds

Visual styling:
- Uniform motion in blue
- Uniformly accelerated motion in orange
- Grid lines for easy reading of values
- Axes clearly labeled with units
- Arrows indicating "slope represents velocity" and "area represents displacement"

Annotations:
- "Notice: Constant slope for uniform motion"
- "Notice: Increasing slope for accelerated motion"
- "Area under v-t graph always gives displacement"

Title: "Comparing Uniform and Uniformly Accelerated Motion"

Implementation: Chart.js or D3.js for interactive graphs with tooltips showing values
</details>

Beyond these two special cases, motion can have changing acceleration, but such motion is more complex and typically requires calculus to analyze. For this course, we'll focus primarily on uniform motion and uniformly accelerated motion, as they cover the vast majority of introductory physics problems.

## Position-Time Graphs: Visualizing Motion

Graphs are incredibly powerful tools for understanding motion. Rather than just analyzing numbers, graphs let you see patterns, compare different motions, and extract information visually. Let's start with the most fundamental graph: **position vs. time** (or x-t graph).

A position-time graph shows how an object's position changes as time progresses. Time is always plotted on the horizontal axis (x-axis), and position is plotted on the vertical axis (y-axis). Each point on the graph represents where the object is at a specific time.

What can we learn from a position-time graph?

**1. The slope tells us velocity**

The slope of a position-time graph at any point equals the velocity at that moment. Mathematically, slope = Δx/Δt = velocity. This makes intuitive sense: a steep slope means position changes rapidly (high velocity), while a gentle slope means position changes slowly (low velocity).

- Positive slope → positive velocity → moving in positive direction
- Negative slope → negative velocity → moving in negative direction
- Zero slope (horizontal line) → zero velocity → at rest
- Constant slope (straight line) → constant velocity → uniform motion
- Changing slope (curved line) → changing velocity → acceleration present

**2. The steepness indicates speed**

The steeper the graph, the faster the object is moving. An extremely steep line means the object is moving very quickly; a nearly horizontal line means the object is barely moving.

**3. The shape reveals the type of motion**

- Straight line → constant velocity (uniform motion)
- Parabolic curve → constant acceleration (uniformly accelerated motion)
- More complex curves → changing acceleration

**4. Horizontal sections mean stationary**

When the graph is perfectly horizontal, position isn't changing—the object is at rest during that time interval.

Let's examine some example scenarios:

#### Diagram: Position-Time Graph Interactive Analyzer

<details markdown="1">
<summary>Position-Time Graph Interactive Analyzer</summary>
Type: microsim

Learning objective: Help students interpret position-time graphs by analyzing slopes, understanding what different curve shapes mean, and connecting graphical features to physical motion.

Canvas layout (900x700px):
- Top section (900x400): Large position-time graph display
- Bottom left (450x300): Motion description panel
- Bottom right (450x300): Control panel

Visual elements in graph area:
- Position-time graph with gridlines
- Time axis (horizontal): 0-10 seconds
- Position axis (vertical): -20 to +20 meters
- Movable point on the graph (drag to select time)
- Tangent line at selected point (shows instantaneous velocity)
- Small animated icon (car, ball, or runner) showing object position
- Trace line showing path up to current time

Interactive controls:
- Dropdown: "Select Motion Scenario"
  - Constant positive velocity
  - Constant negative velocity
  - Stationary (at rest)
  - Increasing positive velocity (acceleration)
  - Decreasing positive velocity (deceleration)
  - Speeding up in negative direction
  - Complex motion (multiple segments)

- Slider: Time selector (0-10 seconds)
- Button: "Play Motion" (animate through time)
- Button: "Pause"
- Button: "Reset"
- Checkbox: "Show Tangent Line"
- Checkbox: "Show Velocity Value"
- Checkbox: "Animate Object"

Motion description panel displays:
- At time t = [value] seconds:
- Position: x = [value] meters
- Velocity: v = [value] m/s (calculated from slope)
- Moving: [direction description]
- Speed: [value] m/s
- Description: "[plain English description of what's happening]"

Default parameters:
- Starting scenario: "Constant positive velocity"
- Graph shows: straight line with positive slope
- Animation speed: 1 second real time = 1 second graph time
- Tangent line: ON by default

Behavior:
- When user selects a scenario from dropdown, graph updates to show that motion pattern
- Dragging time slider or clicking on graph shows instantaneous values at that moment
- Tangent line rotates to show slope (velocity) at selected time
- Velocity calculation shown: v = Δx/Δt = (x₂-x₁)/(t₂-t₁)
- Animated object moves along a parallel track below the graph
- Play button animates through time, showing how position evolves
- For complex motion, display includes annotations like "speeding up," "slowing down," "changing direction"

Example scenarios with their graphs:
1. Constant velocity: x = 2 + 3t (straight line, slope = 3 m/s)
2. Acceleration from rest: x = 0.5t² (parabola opening upward)
3. Slowing to stop: x = 15 + 10t - t² (parabola opening downward)
4. Complex: Multiple connected linear segments with different slopes

Educational callouts:
- "Slope of x-t graph = velocity"
- "Steeper = faster"
- "Curved line = changing velocity = acceleration"
- "Horizontal line = at rest"

Implementation: p5.js with interactive drag handlers and real-time slope calculations
</details>

**Critical insight:** Never confuse the path of the graph with the physical path of the object! A position-time graph does not show the trajectory or shape of the motion path. It's not a picture of where the object went in space. Rather, it's an abstract representation showing how one quantity (position) changes with respect to another (time). An object moving in a straight line can produce a curved position-time graph if its velocity is changing.

## Velocity-Time Graphs: A Different Perspective

While position-time graphs show where an object is, **velocity-time graphs** (v-t graphs) show how fast and in what direction it's moving. Time is still on the horizontal axis, but now velocity is on the vertical axis.

Velocity-time graphs reveal different information than position-time graphs:

**1. The height indicates velocity**

Simply read off the graph: at any time, the y-value tells you the velocity at that moment. Above the time axis means positive velocity (moving in positive direction); below means negative velocity (moving in negative direction).

**2. The slope tells us acceleration**

Just as the slope of an x-t graph gives velocity, the slope of a v-t graph gives acceleration. Mathematically, slope = Δv/Δt = acceleration.

- Positive slope → positive acceleration → velocity increasing in positive direction
- Negative slope → negative acceleration → velocity becoming more negative or less positive
- Zero slope (horizontal line) → zero acceleration → constant velocity
- Constant slope (straight line) → constant acceleration → uniformly accelerated motion

**3. The area under the curve gives displacement**

This is one of the most useful features of velocity-time graphs. The area between the curve and the time axis represents displacement during that time interval. To find displacement:

- Calculate the area under the curve (use geometric formulas for simple shapes)
- Area above the time axis is positive displacement
- Area below the time axis is negative displacement
- Net displacement = positive area - negative area

For a rectangle (constant velocity): Area = base × height = Δt × v = displacement

For a triangle (constant acceleration from rest): Area = ½ × base × height = ½ × Δt × v_final = displacement

**4. Crossing the time axis means changing direction**

When a v-t graph crosses the time axis (velocity goes from positive to negative or vice versa), the object changes direction. At the moment of crossing, velocity is zero—the object is momentarily at rest before reversing direction.

Let's connect v-t graphs to x-t graphs with an example:

| Feature | Uniform Motion | Uniformly Accelerated Motion |
|---------|----------------|------------------------------|
| v-t graph shape | Horizontal line | Straight sloped line |
| Slope of v-t graph | Zero (no acceleration) | Constant (constant acceleration) |
| Area under v-t graph | Rectangle | Triangle or trapezoid |
| Corresponding x-t graph | Straight line | Parabola |

#### Diagram: Velocity-Time Graph Area Calculator MicroSim

<details markdown="1">
<summary>Velocity-Time Graph Area Calculator MicroSim</summary>
Type: microsim

Learning objective: Help students understand that the area under a velocity-time curve represents displacement, and practice calculating this area for different motion scenarios.

Canvas layout (900x700px):
- Top section (900x400): Large velocity-time graph with interactive area highlighting
- Bottom left (450x300): Area calculation panel showing work
- Bottom right (450x300): Control panel and scenarios

Visual elements:
- Velocity-time graph with gridlines
- Time axis (horizontal): 0-10 seconds
- Velocity axis (vertical): -10 to +20 m/s with clear zero line
- Shaded regions showing areas being calculated
- Different colors for positive area (above axis) and negative area (below axis)
- Numerical labels on shaded regions

Interactive controls:
- Dropdown: "Select Scenario"
  1. Constant positive velocity (rectangle)
  2. Constant negative velocity (rectangle below axis)
  3. Acceleration from rest (triangle)
  4. Deceleration to stop (triangle)
  5. Speed up then slow down (trapezoid)
  6. Direction reversal (area above and below axis)
  7. Custom: draw your own velocity curve

- Time interval selector:
  - Start time: slider (0-10 s)
  - End time: slider (0-10 s)
  - Or click two points on graph to select interval

- Checkbox: "Show Area Calculation"
- Checkbox: "Show Position Change"
- Checkbox: "Break Into Geometric Shapes"
- Button: "Calculate Displacement"
- Button: "Reset"

Area calculation panel displays:
- Shape identified: [Rectangle/Triangle/Trapezoid/Complex]
- Formula: [geometric formula with values]
- Calculation steps:
  - Base = Δt = [value] seconds
  - Height = v = [value] m/s (for rectangle)
  - or Height = v_avg = [value] m/s (for triangle)
  - Area = [calculation] = [result] m
- Interpretation: "Displacement = [value] m [direction]"
- If multiple regions: Show calculation for each region and sum

For complex shapes:
- Break into rectangles and triangles
- Calculate each separately with color coding
- Show: Total area = Area₁ + Area₂ + Area₃...

Visual feedback:
- As user selects time interval, shaded region updates in real-time
- Positive area (above axis) shaded in blue
- Negative area (below axis) shaded in red
- Display running total as regions are added
- Animate a position-time graph in corner showing corresponding position change

Default parameters:
- Scenario: "Constant positive velocity"
- v = 10 m/s from t = 0 to t = 5 s
- Area = 50 m (rectangle)

Special feature for "Custom" mode:
- Click to add vertices to create piecewise linear velocity function
- Automatically calculate complex areas
- Snap to grid option for cleaner values

Educational callouts:
- "Area under v-t curve = displacement"
- "Positive area = movement in positive direction"
- "Negative area = movement in negative direction"
- "Net area = final displacement from start"

Practice problems integrated:
- After calculating area, ask: "If the object started at x = 10 m, where does it end up?"
- "What was the object's average velocity?"
- Compare area method to displacement formula

Implementation: p5.js with polygon area calculation algorithms and interactive region selection
</details>

**Example:** A car accelerates from rest at 2 m/s² for 5 seconds. Draw the velocity-time graph and find the displacement.

**Solution:**
The v-t graph is a straight line starting at the origin (v = 0 at t = 0) with slope = 2 m/s². After 5 seconds, v = 0 + (2)(5) = 10 m/s. The graph is a triangle with base = 5 s and height = 10 m/s.

Displacement = Area of triangle = ½ × base × height = ½ × 5 s × 10 m/s = 25 m

## Acceleration-Time Graphs: Completing the Picture

The third type of motion graph is the **acceleration-time graph** (a-t graph), which shows how acceleration changes over time. While less commonly used than x-t and v-t graphs, a-t graphs complete our graphical toolkit for analyzing motion.

**Key features of acceleration-time graphs:**

**1. The height indicates acceleration**

Read the value directly from the graph at any time. Positive values mean acceleration in the positive direction; negative values mean acceleration in the negative direction.

**2. The area under the curve gives change in velocity**

Just as area under a v-t graph gives displacement, area under an a-t graph gives the change in velocity (Δv) during that time interval.

**3. Horizontal lines mean constant acceleration**

Since we focus primarily on uniformly accelerated motion in this course, most a-t graphs you'll encounter will be horizontal lines. A horizontal line at a = 0 represents uniform motion (constant velocity, zero acceleration).

**4. The slope would indicate rate of change of acceleration**

Though we rarely analyze this in introductory physics, the slope of an a-t graph represents how quickly acceleration itself is changing—sometimes called "jerk" in technical contexts.

Let's see how all three graph types connect:

#### Diagram: Three-Graph Motion Analyzer: Connecting x-t, v-t, and a-t Graphs

<details markdown="1">
<summary>Three-Graph Motion Analyzer: Connecting x-t, v-t, and a-t Graphs</summary>
Type: microsim

Learning objective: Help students understand the relationships between position, velocity, and acceleration graphs by showing all three simultaneously and demonstrating how features in one graph correspond to features in the others.

Canvas layout (1000x800px):
- Three vertically stacked graph panels (1000x220 each)
  - Top: Position vs Time (x-t)
  - Middle: Velocity vs Time (v-t)
  - Bottom: Acceleration vs Time (a-t)
- Control panel at bottom (1000x140)

Visual elements:
- All three graphs share the same time axis (0-10 seconds)
- Vertical line (cursor) that can move across all three graphs simultaneously
- At cursor position, highlight corresponding points on all three graphs
- Color coding: position (blue), velocity (green), acceleration (red)
- Dotted lines connecting related features across graphs

Interactive controls:
- Dropdown: "Select Motion Type"
  1. Rest (stationary)
  2. Constant velocity (positive)
  3. Constant velocity (negative)
  4. Constant positive acceleration from rest
  5. Constant negative acceleration (slowing down)
  6. Acceleration then coast
  7. Speed up, coast, slow down (three phases)
  8. Reverse direction (go forward, stop, go backward)

- Time slider: Move vertical cursor across all graphs (0-10 s)
- Button: "Play Animation" (auto-advance time cursor)
- Button: "Pause"
- Button: "Reset to start"
- Playback speed slider
- Checkbox: "Show Relationships"
  - When ON, display arrows and annotations showing:
    - "Slope of x-t = value on v-t"
    - "Slope of v-t = value on a-t"
    - "Area under v-t = change in position"
    - "Area under a-t = change in velocity"

Display panel shows at current time:
- Time: t = [value] s
- Position: x = [value] m
- Velocity: v = [value] m/s
- Acceleration: a = [value] m/s²
- Status: [description like "Speeding up in positive direction"]

Relationship annotations (when "Show Relationships" enabled):

Between x-t and v-t:
- Tangent line on x-t graph
- Horizontal line from tangent slope to corresponding v-t value
- Label: "Slope here = velocity here"

Between v-t and a-t:
- Tangent line on v-t graph
- Horizontal line from tangent slope to corresponding a-t value
- Label: "Slope here = acceleration here"

Area demonstrations:
- Highlight shaded area under v-t curve from t=0 to current time
- Show corresponding position change on x-t graph
- Label: "This area = this distance"

Special visual for "Speed up, coast, slow down":

x-t graph: Concave up curve, then straight line, then concave down curve
v-t graph: Increasing line, then horizontal, then decreasing line
a-t graph: Positive rectangle, then zero, then negative rectangle

Annotate the three phases clearly with different background shading

Default parameters:
- Scenario: "Constant positive acceleration from rest"
- a = 2 m/s², starting from x₀ = 0, v₀ = 0
- Time range: 0-10 seconds

Behavior:
- When motion scenario selected, all three graphs update simultaneously
- As time cursor moves, show animated marker on each graph
- Highlight numerical relationships in real-time
- For curved graphs, show tangent lines and calculate slopes
- Display instantaneous values in a clear readout panel

Educational features:
- Quiz mode: Hide one graph type and ask student to predict its shape
- Highlight common mistakes: "Notice this is not a picture of the path!"
- Challenge: "If x-t is a parabola opening up, what must v-t look like?"

Implementation: p5.js with synchronized graphs and real-time calculus visualization (slopes and areas)
</details>

**Summary of Graph Relationships:**

| To find... | Look at... | How... |
|------------|------------|--------|
| Velocity from x-t | Slope of position-time graph | v = Δx/Δt |
| Acceleration from v-t | Slope of velocity-time graph | a = Δv/Δt |
| Displacement from v-t | Area under velocity-time curve | Δx = area |
| Velocity change from a-t | Area under acceleration-time curve | Δv = area |
| Position-time shape from v-t | Integration concept | Straight v → parabolic x |
| Velocity-time shape from a-t | Integration concept | Straight a → linear v |

These relationships become even more powerful when you learn calculus: velocity is the derivative of position (v = dx/dt), and acceleration is the derivative of velocity (a = dv/dt). Conversely, position is the integral of velocity, and velocity is the integral of acceleration. Even without calculus, you can use these graphical relationships to analyze complex motion scenarios.

## The Kinematic Equations: Mathematical Tools for Uniformly Accelerated Motion

While graphs provide visual insight into motion, equations let us calculate precise numerical answers. For **uniformly accelerated motion** (constant acceleration), we can derive a set of powerful equations called the **kinematic equations** or **equations of motion**. These four equations relate five kinematic variables:

- **x₀** = initial position
- **x** = final position (sometimes written as x_f)
- **v₀** = initial velocity
- **v** = final velocity (sometimes written as v_f)
- **a** = acceleration (constant)
- **t** = time elapsed

Here are the four kinematic equations:

**1. v = v₀ + at**
   - Relates: velocity, initial velocity, acceleration, time
   - Missing: position
   - Use when: You know acceleration and want to find velocity at a certain time

**2. x = x₀ + v₀t + ½at²**
   - Relates: position, initial position, initial velocity, acceleration, time
   - Missing: final velocity
   - Use when: You want to find position at a certain time

**3. v² = v₀² + 2a(x - x₀)**
   - Relates: velocities, acceleration, displacement
   - Missing: time
   - Use when: Time is unknown or irrelevant

**4. x = x₀ + ½(v₀ + v)t**
   - Relates: positions, velocities, time
   - Missing: acceleration
   - Use when: You know both velocities and want position or time

**Important notes:**

- These equations ONLY apply when acceleration is constant
- Position (x) and displacement (Δx = x - x₀) are related but different—pay attention to which the problem asks for
- All quantities are signed (positive or negative)—direction matters!
- When starting from rest, v₀ = 0, which simplifies several equations
- When ending at rest, v = 0

**Problem-solving strategy:**

1. **Identify what you know:** List all given quantities with units and signs
2. **Identify what you need:** What is the problem asking for?
3. **Choose an equation:** Select the kinematic equation that contains what you know and what you need
4. **Solve algebraically:** Rearrange the equation before plugging in numbers
5. **Substitute and calculate:** Insert values with units
6. **Check your answer:** Does the sign make sense? Is the magnitude reasonable?

Let's work through some examples:

**Example 1:** A car accelerates from rest at 3.0 m/s² for 5.0 seconds. How fast is it going, and how far has it traveled?

**Solution:**
Given: v₀ = 0 m/s, a = 3.0 m/s², t = 5.0 s, x₀ = 0 m (assume starting at origin)
Find: v and x

For velocity, use equation 1:
v = v₀ + at = 0 + (3.0)(5.0) = 15 m/s

For position, use equation 2:
x = x₀ + v₀t + ½at² = 0 + 0 + ½(3.0)(5.0)² = ½(3.0)(25) = 37.5 m

**Example 2:** A plane needs to reach 80 m/s to take off and has a runway 1200 m long. What minimum acceleration is required?

**Solution:**
Given: v₀ = 0 m/s, v = 80 m/s, x - x₀ = 1200 m
Find: a
Note: Time is not given and not asked for, so use equation 3

v² = v₀² + 2a(x - x₀)
(80)² = 0² + 2a(1200)
6400 = 2400a
a = 6400/2400 = 2.67 m/s²

**Example 3:** A ball rolling at 5.0 m/s slows down at -0.50 m/s² until it stops. How long does this take, and how far does it roll?

**Solution:**
Given: v₀ = 5.0 m/s, v = 0 m/s (comes to rest), a = -0.50 m/s²
Find: t and x - x₀

For time, use equation 1:
v = v₀ + at
0 = 5.0 + (-0.50)t
0.50t = 5.0
t = 10 s

For displacement, use equation 3:
v² = v₀² + 2a(x - x₀)
0² = (5.0)² + 2(-0.50)(x - x₀)
0 = 25 - 1.0(x - x₀)
x - x₀ = 25 m

The kinematic equations are tools you'll use throughout your physics education and beyond. Mastering them now will make dynamics, projectile motion, and many other topics much easier to understand.

#### Diagram: Kinematic Equation Selector Tool

<details markdown="1">
<summary>Kinematic Equation Selector Tool</summary>
Type: infographic

Purpose: Create an interactive decision tree to help students select the appropriate kinematic equation based on known and unknown variables.

Layout: Flowchart-style decision tree with clickable nodes

Central question at top:
"Which kinematic equation should I use?"

Five boxes representing the five variables (arranged in a circle):
- x (position)
- v (final velocity)
- v₀ (initial velocity)
- a (acceleration)
- t (time)

Interactive elements:
- Click boxes to mark variables as "Known" (green), "Unknown/Find" (blue), or "Not needed" (gray)
- As user clicks, the appropriate equation highlights below
- Show all four equations at bottom, with the recommended one glowing or enlarged

The four equations displayed:
1. v = v₀ + at ... (missing: x)
2. x = x₀ + v₀t + ½at² ... (missing: v)
3. v² = v₀² + 2a(x - x₀) ... (missing: t)
4. x = x₀ + ½(v₀ + v)t ... (missing: a)

Decision logic displayed:
- "You have marked [N] variables as known"
- "You are looking for [variable]"
- "You don't need [variable]"
- "→ Use equation [#]"

Visual style:
- Clean, modern interface with physics theme
- Color coding: green (known), blue (find this), gray (don't need), gold (recommended equation)
- Arrows connecting variable selections to equation recommendations

Additional features:
- Button: "Start Over" (reset all selections)
- Checkbox: "Show worked example" → displays sample problem using selected equation
- Link to "Common scenarios" showing typical problems for each equation

Example scenario callouts:
- "Finding final velocity after given time? → Equation 1"
- "Finding position at a certain time? → Equation 2"
- "No time information? → Equation 3"
- "Know both velocities? → Equation 4"

Implementation: HTML/CSS/JavaScript with interactive highlighting and conditional display
</details>

## Special Case: Free Fall

One of the most important examples of uniformly accelerated motion is **free fall**—the motion of an object falling under the influence of gravity alone, with no air resistance. Near Earth's surface, all objects fall with the same constant acceleration, called the **acceleration due to gravity**:

**g = 9.8 m/s²** (or approximately 10 m/s² for quick estimates)

This acceleration always points downward, toward the center of the Earth. When setting up free fall problems, we need to establish a coordinate system. Two common choices are:

- **Positive upward, negative downward:** With this choice, g = -9.8 m/s² (negative because it points down)
- **Positive downward, negative upward:** With this choice, g = +9.8 m/s² (positive because it points down)

Most physics courses use the first convention (positive upward), which we'll adopt here. This means **a = -9.8 m/s²** for all free fall problems.

Key insights about free fall:

- Objects fall at the same rate regardless of mass (in the absence of air resistance)
- An object thrown upward has the same acceleration as one thrown downward: -9.8 m/s²
- At the highest point of its trajectory, an object's velocity is zero, but its acceleration is still -9.8 m/s²
- The time to rise to maximum height equals the time to fall back down
- An object returns to its launch height with the same speed it had when launched (but opposite direction)

**Example:** You throw a ball upward at 15 m/s from the ground. How high does it go, and when does it return to your hand?

**Solution:**
Given: v₀ = +15 m/s (upward), a = -9.8 m/s², x₀ = 0 m
At maximum height: v = 0 m/s (momentarily stops before falling)

Find maximum height using equation 3:
v² = v₀² + 2a(x - x₀)
0² = (15)² + 2(-9.8)(x - 0)
0 = 225 - 19.6x
x = 225/19.6 ≈ 11.5 m

Find time to return using equation 2 with x = 0 (back to starting position):
x = x₀ + v₀t + ½at²
0 = 0 + 15t + ½(-9.8)t²
0 = 15t - 4.9t²
0 = t(15 - 4.9t)

This gives t = 0 (initial throw) or t = 15/4.9 ≈ 3.06 s (return to hand)

Free fall problems directly apply the kinematic equations with a = -9.8 m/s², making them excellent practice for mastering these concepts.

## Putting It All Together: Problem-Solving Framework

You've now learned the fundamental concepts, graphical representations, and mathematical equations for one-dimensional motion. Let's consolidate this knowledge with a systematic problem-solving approach you can apply to any kinematics problem:

**Step 1: Visualize**
- Sketch the situation
- Draw a coordinate system (choose positive direction)
- Mark initial and final positions
- Indicate velocities and acceleration with arrows

**Step 2: List Known Information**
- Write down all given quantities with proper signs
- Identify the variable you're solving for
- Note any implied information (e.g., "from rest" means v₀ = 0)

**Step 3: Choose Your Tool**
- Equation: Select appropriate kinematic equation
- Graph: Construct relevant graph and extract information
- Combination: Use graphs to find quantities, then equations to solve

**Step 4: Solve**
- Manipulate equations algebraically before substituting numbers
- Include units in all calculations
- Keep track of significant figures

**Step 5: Check**
- Does the sign make sense for the direction?
- Is the magnitude reasonable?
- Do units work out correctly?
- Can you verify using an alternative method (e.g., graph vs. equation)?

**Common pitfalls to avoid:**

- Confusing speed with velocity (forgetting about direction)
- Using kinematic equations when acceleration isn't constant
- Mixing up displacement and distance
- Forgetting that acceleration can be negative
- Assuming negative acceleration always means slowing down
- Thinking graphs show the physical path of motion

Let's apply this framework to a comprehensive problem:

**Challenge Problem:** A motorcycle is stopped at a traffic light. When the light turns green, it accelerates at 4.0 m/s² for 6.0 seconds, then continues at constant velocity. A car, traveling at a steady 20 m/s, passes the motorcycle just as the light turns green. (a) How far does the motorcycle travel while accelerating? (b) When and where does the motorcycle catch up to the car? (c) How fast is the motorcycle going when it catches the car?

**Solution:**

*Visualize:* Two objects, both moving in the positive direction. Motorcycle starts from rest and accelerates, then coasts. Car moves at constant velocity throughout.

*Phase 1: Motorcycle acceleration (0 to 6 s)*

For motorcycle:
- v₀ = 0 m/s, a = 4.0 m/s², t = 6.0 s
- Find distance: x = x₀ + v₀t + ½at² = 0 + 0 + ½(4.0)(6.0)² = 72 m
- Find velocity after 6 s: v = v₀ + at = 0 + (4.0)(6.0) = 24 m/s

For car:
- Constant velocity: v = 20 m/s
- Distance in 6 s: x = vt = (20)(6.0) = 120 m

*Answer to (a):* The motorcycle travels 72 m while accelerating.

After 6 seconds, the car is ahead by 120 - 72 = 48 m.

*Phase 2: Both at constant velocity*

Now the motorcycle travels at 24 m/s and the car at 20 m/s. The motorcycle is closing the gap at 4 m/s. To close a 48 m gap:

Time needed: t = 48 m ÷ 4 m/s = 12 s

Total time from start: 6 + 12 = 18 s

Distance from start: For motorcycle: 72 m (phase 1) + (24 m/s)(12 s) = 72 + 288 = 360 m
Verify with car: (20 m/s)(18 s) = 360 m ✓

*Answer to (b):* The motorcycle catches the car at t = 18 s, at position x = 360 m from the traffic light.

*Answer to (c):* The motorcycle is traveling at 24 m/s when it catches the car.

This multi-phase problem demonstrates how real-world situations often combine different types of motion, requiring you to break them into segments and apply concepts systematically.

## Chapter Summary and Key Takeaways

Congratulations! You've completed your introduction to kinematics and one-dimensional motion. Let's recap the essential concepts:

**Fundamental Quantities:**

- **Distance:** Total path length (scalar)
- **Displacement:** Straight-line change in position (vector)
- **Speed:** Rate of distance change (scalar)
- **Velocity:** Rate of displacement change (vector)
- **Acceleration:** Rate of velocity change (vector)

**Types of Motion:**

- **Uniform motion:** Constant velocity, zero acceleration
- **Uniformly accelerated motion:** Constant acceleration, changing velocity

**Graphical Analysis:**

- **Position-time graphs:** Slope = velocity; curve shape indicates acceleration
- **Velocity-time graphs:** Slope = acceleration; area = displacement
- **Acceleration-time graphs:** Area = velocity change

**Mathematical Tools:**

The four kinematic equations for constant acceleration:
1. v = v₀ + at
2. x = x₀ + v₀t + ½at²
3. v² = v₀² + 2a(x - x₀)
4. x = x₀ + ½(v₀ + v)t

**Problem-Solving Strategy:**

1. Visualize and sketch
2. List known information
3. Choose appropriate tool (equation or graph)
4. Solve with attention to signs and units
5. Check answer for reasonableness

These concepts form the foundation for everything that follows in mechanics. In the next chapter, we'll explore what causes motion—forces and Newton's Laws of Dynamics. You'll see that understanding kinematics (the "what" of motion) is essential before tackling dynamics (the "why" of motion).

Keep practicing with various problems, pay careful attention to signs and directions, and remember: motion is all around you. Every car, ball, and person is a living physics problem. The more you observe and analyze real motion, the more intuitive these concepts will become.

## Practice Problems

Test your understanding with these problems (answers and detailed solutions would typically be provided in a separate section):

**Basic Level:**

1. A runner completes a 400 m lap in 60 s. Calculate (a) average speed and (b) average velocity.

2. A car's velocity increases from 10 m/s to 30 m/s in 4 seconds. Calculate the acceleration.

3. Sketch position-time graphs for: (a) an object at rest, (b) an object moving at constant positive velocity, (c) an object moving at constant negative velocity.

**Intermediate Level:**

4. A ball is thrown upward at 20 m/s. Calculate (a) maximum height reached, (b) time in the air, (c) velocity when it returns to the thrower's hand.

5. From a velocity-time graph showing v = 10 m/s from t = 0 to t = 3 s, then v decreases linearly to 0 m/s at t = 7 s, calculate the total displacement.

6. A train accelerates at 0.5 m/s² from rest. How long until it reaches 25 m/s, and how far does it travel in that time?

**Advanced Level:**

7. Two cars are 100 m apart. Car A accelerates from rest at 2 m/s². Car B, initially ahead, travels at constant 15 m/s. When and where does Car A catch Car B?

8. On a position-time graph, a curve passes through (0 s, 0 m), (2 s, 8 m), and (4 s, 32 m). Determine the type of motion and calculate the acceleration.

9. A rocket accelerates vertically from rest at 20 m/s² for 3 seconds, then shuts off its engines. Calculate (a) maximum height, (b) total time in air, (c) velocity when it hits the ground.

These problems will help solidify your understanding of motion in one dimension. Work through them systematically, use the problem-solving framework, and check your work carefully. Kinematics is a skill that improves with practice!
