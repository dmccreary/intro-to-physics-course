# Forces and Newton's Laws

## Summary

This chapter introduces the fundamental principles of dynamics by exploring the relationship between forces and motion. You'll learn Isaac Newton's three laws of motion, which form the cornerstone of classical mechanics. Starting with the concept of force as a vector quantity, you'll discover how net force determines acceleration, why objects resist changes in motion through inertia, and how action-reaction pairs arise in all interactions. The concepts of equilibrium—both static and dynamic—will help you understand when objects remain at rest or move with constant velocity despite experiencing multiple forces.

## Concepts Covered

This chapter covers the following 13 concepts from the learning graph:

1. Force
2. Net Force
3. Newton's First Law
4. Inertia
5. Newton's Second Law
6. Newton's Third Law
7. Action-Reaction Pairs
8. Equilibrium
9. Static Equilibrium
10. Dynamic Equilibrium
11. Weight
12. Mass vs Weight
13. Normal Force

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Scientific Foundations and Mathematical Tools](../01-scientific-foundations/index.md)
- [Chapter 2: Motion in One Dimension](../02-motion-one-dimension/index.md)

---

## Introduction: The Language of Motion

You've already learned how to describe motion—position, velocity, and acceleration. But what causes motion to change? Why does a basketball fall to the ground? Why does a car slow down when you take your foot off the gas? These questions lead us to the most fundamental topic in all of physics: **forces**.

In this chapter, you'll discover the deep connection between forces and motion through Isaac Newton's three laws. These elegant principles, formulated over 300 years ago, still power everything from rocket launches to video game physics engines. You'll learn to think like a physicist by breaking down complex situations into simple force diagrams, predicting how objects will move, and understanding why the universe follows these rules so precisely.

## What is a Force?

A **force** is a push or a pull that can change an object's motion. Forces are all around you—gravity pulling you toward Earth, friction slowing your bike, your hand pushing a door open. But here's the key insight: forces are **vectors**, which means they have both magnitude (strength) and direction.

Think about pushing a shopping cart. The harder you push (greater magnitude), the more the cart accelerates. But the direction matters too—push forward and the cart speeds up; push backward and it slows down. If you push to the side while someone else pushes forward, the cart moves diagonally. This is vector addition in action.

### Common Forces You'll Encounter

Here are the main types of forces we'll work with in this chapter:

- **Gravity (Weight):** The downward pull of Earth on all objects
- **Normal Force:** The support force from surfaces pushing perpendicular to contact
- **Friction:** The resistance force opposing motion between surfaces
- **Tension:** The pulling force transmitted through ropes, cables, or strings
- **Applied Force:** Any push or pull you directly apply to an object

Each of these forces has specific characteristics, but they all follow the same fundamental rules that Newton discovered.

## Net Force: The Total Effect

Rarely does just one force act on an object. Right now, gravity pulls you down while your chair pushes you up. When you walk, your foot pushes backward on the ground while friction pushes forward on you. To predict motion, we need to find the **net force**—the vector sum of all forces acting on an object.

Here's a simple example. Imagine two students pushing a desk:

| Student | Force Magnitude | Direction |
|---------|----------------|-----------|
| Alex | 50 N | East |
| Jordan | 30 N | West |

What's the net force? Since they push in opposite directions, we subtract: 50 N - 30 N = 20 N east. The desk accelerates eastward.

But what if both students pushed east with the same forces? Then we'd add them: 50 N + 30 N = 80 N east. The desk would accelerate much faster.

The key principle: **Only the net force determines how an object's motion changes.**

#### Diagram: Free-Body Diagram Tutorial

<details markdown="1">
    <summary>Free-Body Diagram Tutorial</summary>
    Type: infographic

    Purpose: Teach students how to draw and interpret free-body diagrams (FBDs), the essential tool for analyzing forces

    Layout: Step-by-step visual guide with four example scenarios of increasing complexity

    Scenario 1: Book resting on table
    - Object representation: Simple box labeled "book" at center
    - Forces shown:
      * Downward arrow labeled "Weight (W = mg)" starting from center
      * Upward arrow labeled "Normal Force (N)" starting from center
    - Annotation: "Forces are equal and opposite → No acceleration"

    Scenario 2: Book being pushed across table (with friction)
    - Object representation: Simple box labeled "book" at center
    - Forces shown:
      * Downward arrow: Weight (W)
      * Upward arrow: Normal (N)
      * Rightward arrow: Applied force (F_app = 20 N)
      * Leftward arrow: Friction (f = 8 N)
    - Calculation box: "Net Force = 20 N - 8 N = 12 N right"
    - Annotation: "Horizontal forces unbalanced → Accelerates right"

    Scenario 3: Box on inclined plane
    - Object representation: Box on 30-degree slope
    - Coordinate system: Tilted axes (x along slope, y perpendicular to slope)
    - Forces shown:
      * Weight vector broken into components: W_parallel and W_perpendicular
      * Normal force perpendicular to slope
      * Friction force up the slope
    - Color coding: Weight components in red, Normal in blue, Friction in orange
    - Annotation: "Always choose convenient coordinate system"

    Scenario 4: Elevator accelerating upward
    - Object representation: Person standing in elevator
    - Forces shown:
      * Weight (W = mg) downward
      * Normal force (N) upward, with N > W
    - Equation shown: N - W = ma
    - Annotation: "Feel 'heavier' when elevator accelerates up"

    Interactive elements:
    - Hover over each force arrow to see its name, formula, and physical cause
    - Click "Show calculations" button to reveal net force computation
    - Toggle between showing forces proportional to magnitude vs all same size
    - "Common mistakes" section that highlights errors:
      * Including motion arrows (velocity/acceleration) on FBD
      * Forgetting to break forces into components
      * Drawing forces acting on different objects

    Visual style: Clean vector graphics with consistent color scheme
    - Forces: Thick arrows with labels
    - Object: Simple geometric shapes
    - Grid background for reference

    Implementation: HTML/CSS/JavaScript with SVG graphics
    Size: 900px width × 700px height
</details>

## Newton's First Law: The Law of Inertia

Here's one of the most counterintuitive ideas in physics: **An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by a net external force.**

This is Newton's First Law, also called the **law of inertia**. It tells us that objects naturally resist changes to their motion. If you've ever tried to push a stalled car, you've felt inertia—it's hard to get it moving. But once it's rolling, it's equally hard to stop it.

### Understanding Inertia

**Inertia** is the tendency of objects to maintain their state of motion. It's not a force—it's a property that depends on mass. A bowling ball has more inertia than a basketball. That's why it's harder to start rolling and harder to stop once it's moving.

Here's a thought experiment. Imagine a hockey puck sliding on perfectly frictionless ice (no air resistance either). According to Newton's First Law, what happens?

The puck keeps sliding forever at constant velocity. There's no net force, so its motion never changes. In reality, friction and air resistance gradually slow it down, but Newton's genius was recognizing what would happen in the ideal case.

### The Importance of Reference Frames

Newton's First Law only works in **inertial reference frames**—coordinate systems that aren't accelerating. If you're in a car that suddenly brakes, you lurch forward. From inside the car, it seems like a force pushed you. But from outside, you just kept moving at constant velocity while the car slowed down. Your reference frame (the car) was accelerating, so Newton's First Law didn't apply from that perspective.

Most physics problems assume you're viewing from Earth's surface, which is approximately an inertial frame (Earth's rotation and orbital motion introduce tiny effects we usually ignore).

#### Diagram: Inertia Demonstration MicroSim

<details markdown="1">
    <summary>Inertia Demonstration MicroSim</summary>
    Type: microsim

    Learning objective: Demonstrate how mass affects inertia by comparing how different objects respond to identical forces

    Canvas layout (900x600px):
    - Top section (900x450): Drawing area showing three objects on a frictionless surface
    - Bottom section (900x150): Control panel with sliders and buttons

    Visual elements:
    - Three colored squares representing objects:
      * Small red square (mass = 1 kg)
      * Medium blue square (mass = 5 kg)
      * Large green square (mass = 10 kg)
    - All start at left side of screen
    - Velocity vectors shown as arrows above each object
    - Position markers along bottom showing distance traveled

    Interactive controls:
    - Slider: "Applied Force" (0-50 N)
    - Slider: "Application Time" (0.1-2.0 seconds)
    - Button: "Apply Force"
    - Button: "Reset"
    - Display: Current velocity of each object
    - Display: Distance traveled by each object after force stops

    Default parameters:
    - Applied Force: 20 N
    - Application Time: 1.0 second
    - All objects start at rest

    Behavior:
    - When "Apply Force" is clicked:
      * Same force applied to all three objects for specified time
      * Objects accelerate according to F = ma (different accelerations due to different masses)
      * During force application, objects show green glow
      * After force stops, objects continue at constant velocity (Newton's 1st Law)
      * Velocity arrows update in real-time
    - Lighter objects reach higher final velocities and travel farther
    - Display shows: "Large mass = large inertia = more resistance to acceleration"

    Educational features:
    - Running graph showing velocity vs time for all three objects
    - Calculation display showing a = F/m for each object
    - Highlight: After force stops, all velocities remain constant (illustrating inertia)

    Implementation notes:
    - Use p5.js for rendering and animation
    - Physics: x = x₀ + v₀t + ½at² during force application
    - After force: x = x₀ + vt (constant velocity)
    - Frame rate: 60 FPS for smooth animation
    - Show numerical values updating in real-time

    Canvas background: Light gray with measurement grid
</details>

## Newton's Second Law: Force and Acceleration

Now we get to the most important equation in all of classical mechanics:

**F_net = ma**

This is Newton's Second Law. It tells us exactly how net force relates to acceleration. Let's unpack what this means:

- **F_net** is the net force (vector sum of all forces)
- **m** is the mass of the object
- **a** is the acceleration that results

The equation reveals three crucial relationships:

1. **More force means more acceleration** (if mass stays constant)
2. **More mass means less acceleration** (if force stays constant)
3. **Force and acceleration point in the same direction**

### Working with Newton's Second Law

Let's see this in action. A 50 kg student stands on a skateboard. You push with a force of 100 N. What's the acceleration?

Using F = ma:
- F_net = 100 N
- m = 50 kg
- a = F/m = 100 N / 50 kg = 2 m/s²

The skateboard accelerates at 2 m/s² in the direction you push. Every second, the velocity increases by 2 m/s.

But what if friction opposes your push with 30 N? Then:
- F_net = 100 N - 30 N = 70 N
- a = 70 N / 50 kg = 1.4 m/s²

The acceleration is smaller because the net force is smaller.

### The Unit of Force: The Newton

Newton's Second Law defines the unit of force. One **newton** (N) is the force needed to accelerate a 1 kg mass at 1 m/s². In other words:

1 N = 1 kg⋅m/s²

To get a feel for this: a typical apple weighs about 1 N. When you hold it, you're exerting an upward force of 1 N to balance gravity's downward pull.

### Problem-Solving Strategy

When solving Newton's Second Law problems, follow these steps:

1. **Draw a free-body diagram** showing all forces
2. **Choose a coordinate system** (usually x horizontal, y vertical)
3. **Write F_net = ma for each direction** (x and y separately)
4. **Solve the equations** for the unknown quantity
5. **Check your answer** (Does it make physical sense? Are the units correct?)

#### Diagram: Force and Acceleration Relationship Chart

<details markdown="1">
    <summary>Force and Acceleration Relationship Chart</summary>
    Type: chart

    Chart type: Multiple line graphs with interactive controls

    Purpose: Visualize how acceleration depends on force and mass according to F = ma

    Graph 1: Acceleration vs Force (constant mass)
    - X-axis: Applied Force (0-100 N)
    - Y-axis: Acceleration (0-20 m/s²)
    - Three lines for different masses:
      * m = 2 kg (steep blue line): a = F/2
      * m = 5 kg (medium green line): a = F/5
      * m = 10 kg (shallow red line): a = F/10
    - All lines pass through origin (no force = no acceleration)
    - Annotation: "Steeper line = smaller mass = more responsive to force"

    Graph 2: Acceleration vs Mass (constant force)
    - X-axis: Mass (0-20 kg)
    - Y-axis: Acceleration (0-50 m/s²)
    - Three curves for different forces:
      * F = 20 N (blue curve): a = 20/m
      * F = 50 N (green curve): a = 50/m
      * F = 100 N (red curve): a = 100/m
    - All curves show inverse relationship (hyperbola)
    - Annotation: "Doubling mass cuts acceleration in half"

    Interactive controls:
    - Slider: Select force value (0-100 N)
    - Slider: Select mass value (0-20 kg)
    - Display: Calculated acceleration shown numerically
    - Cursor: Crosshairs track position on graphs
    - Highlight: Selected point glows on both graphs

    Visual styling:
    - Clean grid lines
    - Color-coded by scenario
    - Large, readable axis labels
    - Equation F = ma shown prominently

    Title: "Exploring Newton's Second Law: F = ma"

    Additional features:
    - Toggle: Switch between showing all lines vs just selected scenario
    - Data table showing key points for each line
    - "Real-world examples" callouts:
      * Point on 2kg line: "Accelerating a soccer ball"
      * Point on 10kg line: "Pushing a shopping cart"

    Implementation: Chart.js or D3.js
    Canvas size: 800px × 600px
</details>

## Newton's Third Law: Action-Reaction Pairs

You've probably heard this one before: "For every action, there is an equal and opposite reaction." This is Newton's Third Law, but it's often misunderstood. Let's get it right.

Whenever object A exerts a force on object B, object B simultaneously exerts a force on object A that is equal in magnitude and opposite in direction. These are called **action-reaction pairs**.

### Key Points About Action-Reaction Pairs

Here's what makes action-reaction pairs special:

- **They always act on different objects** (that's crucial!)
- **They have equal magnitudes**
- **They point in opposite directions**
- **They occur simultaneously** (no delay)
- **They are the same type of force** (both gravitational, both contact, etc.)

### Examples of Action-Reaction Pairs

Let's look at concrete examples to clarify this concept.

**Example 1: You push a wall**
- Action: Your hand exerts a force on the wall (push east)
- Reaction: The wall exerts a force on your hand (push west)
- Result: You don't move the wall (too much mass/friction), but you might slide backward

**Example 2: Earth pulls on the Moon**
- Action: Earth's gravity pulls Moon toward Earth (6400 km/s orbit maintained)
- Reaction: Moon's gravity pulls Earth toward Moon (causes tides!)
- Both forces have the same magnitude: F = GMₘM_moon/r²

**Example 3: You walk forward**
- Action: Your foot pushes backward on the ground
- Reaction: Ground pushes forward on your foot (friction provides this force)
- Result: You accelerate forward; ground doesn't move (enormous mass)

### Common Misconception: Why Don't They Cancel?

Students often ask: "If action and reaction are equal and opposite, why don't they cancel out and nothing moves?"

The answer: **They act on different objects!** When you push a cart, the cart pushes back on you with equal force. But the forward force on the cart makes the cart accelerate, while the backward force on you might make you slide backward. They don't cancel because they're not acting on the same object.

Forces only cancel (produce equilibrium) when they act on the same object.

#### Diagram: Action-Reaction Pairs Interactive Diagram

<details markdown="1">
    <summary>Action-Reaction Pairs Interactive Diagram</summary>
    Type: infographic

    Purpose: Help students identify action-reaction pairs in various scenarios and understand why they don't cancel

    Layout: Grid of six interactive scenarios with toggle functionality

    Scenario 1: Book on table
    - Visual: Book resting on table surface
    - Clickable forces:
      * Click book → Highlights two forces:
        - Action: Earth pulls down on book (weight)
        - Reaction: Book pulls up on Earth (equal magnitude, usually ignored)
      * Click table → Highlights different pair:
        - Action: Book pushes down on table
        - Reaction: Table pushes up on book (normal force)
    - Color coding: Action-reaction pairs shown in matching colors
    - Text box: "Why book doesn't accelerate: Weight and normal are NOT action-reaction (both act on book)"

    Scenario 2: Hammer hitting nail
    - Visual: Hammer head contacting nail
    - Animation: Plays when clicked
    - Forces shown:
      * Action: Hammer exerts force on nail (pushes nail into wood)
      * Reaction: Nail exerts force on hammer (slows hammer down)
    - Both forces shown as equal-length arrows in opposite directions
    - Text: "Both objects feel equal force, but nail accelerates more (less mass)"

    Scenario 3: Rocket in space
    - Visual: Rocket with exhaust flames
    - Forces shown:
      * Action: Rocket pushes gas molecules backward (expels exhaust)
      * Reaction: Gas molecules push rocket forward (thrust)
    - Animation: Gas particles streaming out, rocket accelerating opposite direction
    - Text: "No ground needed! Rocket pushes on expelled gas, gas pushes back on rocket"

    Scenario 4: Swimming
    - Visual: Person swimming in pool
    - Forces shown:
      * Action: Hand pushes water backward
      * Reaction: Water pushes hand (and person) forward
    - Animation: Water particles moving backward as person moves forward
    - Text: "You can't push yourself forward—you push on something else"

    Scenario 5: Earth-Moon system
    - Visual: Earth and Moon with gravitational force arrows
    - Forces shown:
      * Action: Earth pulls Moon (keeps Moon in orbit)
      * Reaction: Moon pulls Earth (causes tides, small Earth wobble)
    - Both arrows same length despite different object sizes
    - Text: "Forces equal even though masses differ greatly"

    Scenario 6: Car accelerating
    - Visual: Car with wheels on ground
    - Forces shown at wheel-ground contact:
      * Action: Wheel pushes backward on ground (tire friction)
      * Reaction: Ground pushes forward on wheel (car accelerates)
    - Common mistake highlight: Shows engine force as separate (not action-reaction pair)
    - Text: "Friction between tire and ground creates action-reaction pair"

    Interactive features:
    - Click any scenario to highlight action-reaction pair
    - Hover over force arrows to see magnitude and direction
    - "Quiz mode" button: Shows scenario without labels, student identifies action-reaction pair
    - "Why don't they cancel?" button: Highlights which object each force acts on with colored outlines
    - Toggle: "Show all forces" vs "Show only action-reaction pairs"

    Visual styling:
    - Action-reaction pairs connected by dotted line
    - Color-matched arrows for each pair (blue-blue, red-red, etc.)
    - Objects outlined in matching color when force acts on them
    - Clean, cartoonish graphics for clarity

    Legend:
    - "Action" and "Reaction" labels (with note: naming is arbitrary)
    - Force magnitude representation (arrow length)
    - Object highlighting explanation

    Implementation: HTML/CSS/JavaScript with SVG graphics
    Size: 1000px × 800px
</details>

## Equilibrium: When Forces Balance

An object is in **equilibrium** when the net force on it is zero. This doesn't mean no forces act on it—it means all forces balance out. From Newton's Second Law:

If F_net = 0, then a = 0

Zero acceleration means the object either stays at rest or continues moving at constant velocity. We distinguish two types:

### Static Equilibrium

**Static equilibrium** occurs when an object is at rest and remains at rest. All forces cancel perfectly.

Example: A book sitting on a table
- Weight (W = mg) pulls down
- Normal force (N) pushes up
- N = W, so F_net = 0
- The book doesn't accelerate vertically

### Dynamic Equilibrium

**Dynamic equilibrium** occurs when an object moves at constant velocity (no acceleration). All forces still cancel.

Example: A car cruising at constant 60 mph on a highway
- Engine force pushes forward
- Air resistance and friction push backward
- Forward and backward forces equal, so F_net = 0
- Velocity constant (no acceleration)

### Conditions for Equilibrium

For an object to be in equilibrium:

1. **Sum of all forces in x-direction = 0**
2. **Sum of all forces in y-direction = 0**

In equation form:
- ΣF_x = 0
- ΣF_y = 0

You'll use these conditions extensively when solving statics problems.

#### Diagram: Equilibrium Classification Workflow

<details markdown="1">
    <summary>Equilibrium Classification Workflow</summary>
    Type: workflow

    Purpose: Help students determine whether an object is in equilibrium and classify the type

    Visual style: Decision tree flowchart with color-coded paths

    Start node: "Object with forces acting on it"

    Step 1 - Decision diamond: "Is the net force zero?"
    - Calculation shown: ΣF_x = ? and ΣF_y = ?
    - Hover text: "Add all force components in each direction. Use + for one direction, - for opposite."

    Branch: If F_net ≠ 0 → "NOT in equilibrium"
    - Process box: "Object accelerates according to F_net = ma"
    - Example shown: Skydiver speeding up (Weight > Air resistance)
    - Color: Red path

    Branch: If F_net = 0 → Continue to Step 2

    Step 2 - Decision diamond: "Is the velocity zero?"
    - Hover text: "Check if object is at rest or moving"

    Branch: If v = 0 → "STATIC EQUILIBRIUM"
    - Process box: "Object remains at rest"
    - Examples shown:
      * Book on table
      * Bridge supporting traffic
      * Hanging picture frame
    - Color: Blue path
    - Hover details: "All forces balanced, no motion"

    Branch: If v ≠ 0 → "DYNAMIC EQUILIBRIUM"
    - Process box: "Object moves at constant velocity"
    - Examples shown:
      * Parachutist at terminal velocity
      * Car at constant highway speed
      * Object sliding on frictionless ice
    - Color: Green path
    - Hover details: "All forces balanced, motion continues unchanged"

    Additional annotation box:
    - "Common mistake: 'No motion' doesn't mean 'no forces'!"
    - "Equilibrium means forces balance, NOT that they're absent"

    Practice problems (shown in sidebar):
    1. Chandelier hanging from ceiling → Static
    2. Elevator moving up at constant 2 m/s → Dynamic
    3. Ball thrown upward (at peak) → NOT equilibrium (acceleration = -g)
    4. Hockey puck sliding at constant v on ice → Dynamic

    Interactive features:
    - Click on examples to see free-body diagrams
    - "Test yourself" mode: Random scenario appears, student selects path
    - Hover over decision diamonds to see expanded criteria

    Color scheme:
    - Decision diamonds: Yellow
    - Static equilibrium path/result: Blue
    - Dynamic equilibrium path/result: Green
    - Non-equilibrium path/result: Red
    - Start/examples: Gray

    Implementation: Flowchart using Mermaid.js with custom hover interactions
</details>

## Weight: A Special Force

One of the most important forces you'll encounter is **weight**—the gravitational force that Earth exerts on objects. Here's the key equation:

**W = mg**

Where:
- W is weight (measured in newtons, N)
- m is mass (measured in kilograms, kg)
- g is the acceleration due to gravity (9.8 m/s² on Earth's surface)

### Mass vs Weight: A Critical Distinction

Students often confuse mass and weight, but they're fundamentally different:

| Property | Mass | Weight |
|----------|------|--------|
| Definition | Amount of matter in an object | Gravitational force on an object |
| Type | Scalar | Vector (always points toward Earth's center) |
| Units | kilograms (kg) | newtons (N) |
| Depends on location? | No (same everywhere) | Yes (changes with gravity) |
| Measured with | Balance scale | Spring scale |

Here's a mind-bending example: An astronaut with mass 70 kg has a weight of:
- On Earth: W = (70 kg)(9.8 m/s²) = 686 N
- On the Moon: W = (70 kg)(1.6 m/s²) = 112 N (Moon's gravity is weaker)
- In deep space: W ≈ 0 N (no nearby gravitational source)

But the mass stays 70 kg in all three locations! Mass is an intrinsic property; weight depends on the gravitational environment.

### Weight and Apparent Weight

When you stand on a scale, it doesn't actually measure your weight directly. It measures the normal force it exerts on you. Normally these are equal, but not always.

**In an elevator:**
- Accelerating upward: You feel heavier (scale reads more than your weight)
- Accelerating downward: You feel lighter (scale reads less than your weight)
- Free fall: You feel weightless (scale reads zero, even though gravity still pulls on you!)

This "apparent weight" is what causes the stomach-drop feeling on roller coasters and the floating sensation in free-falling elevators (don't try this at home).

#### Diagram: Weight in Different Gravitational Fields MicroSim

<details markdown="1">
    <summary>Weight in Different Gravitational Fields MicroSim</summary>
    Type: microsim

    Learning objective: Demonstrate the difference between mass (constant) and weight (variable) by showing the same object in different gravitational environments

    Canvas layout (900x600px):
    - Left section (600x600): Visual display showing three planetary surfaces side-by-side
    - Right section (300x600): Control panel and data display

    Visual elements:
    - Three planets/celestial bodies shown:
      * Earth (blue-green)
      * Moon (gray)
      * Jupiter (orange with bands)
    - Same object (astronaut figure) standing on each surface
    - Spring scales beneath each astronaut showing different readings
    - Force arrows showing weight (W = mg) scaled to magnitude

    Planetary data displayed:
    Earth:
    - g = 9.8 m/s²
    - Astronaut mass: 70 kg
    - Weight: 686 N (calculated in real-time)

    Moon:
    - g = 1.6 m/s²
    - Astronaut mass: 70 kg
    - Weight: 112 N

    Jupiter:
    - g = 24.8 m/s²
    - Astronaut mass: 70 kg
    - Weight: 1,736 N

    Interactive controls:
    - Slider: "Object mass" (10-200 kg)
    - Dropdown: Select celestial body to add (Mars, Venus, Saturn, etc.)
    - Button: "Add custom planet" (enter custom g value)
    - Toggle: "Show force arrows" vs "Show numerical values only"
    - Display: Weight/mass ratio (W/m = g) for each location

    Real-time updates:
    - As mass slider changes, all three weights recalculate
    - Astronaut figure size changes to represent mass (visual cue)
    - Spring scales compress proportionally to weight
    - Force arrows scale in length

    Educational features:
    - Highlight box: "Mass = 70 kg EVERYWHERE (constant)"
    - Color coding: Mass values in blue (constant), weight values in red (variable)
    - Comparison table showing weight ratios:
      * Moon weight = 0.16 × Earth weight
      * Jupiter weight = 2.53 × Earth weight
    - "What if?" scenarios:
      * "Could you jump higher on the Moon?" (Yes—same muscle force, less weight)
      * "Would a baseball fly farther on Mars?" (Yes—weaker gravity)

    Special feature - Free space mode:
    - Toggle: "Enter deep space (zero gravity)"
    - Visual: Astronaut floats, no surface contact
    - Spring scale reads zero
    - Weight = 0 N
    - Mass still = 70 kg
    - Annotation: "Weightless but not massless!"

    Implementation notes:
    - Use p5.js for rendering
    - Store g-values for all celestial bodies in data structure
    - Calculate W = mg on every frame
    - Smooth transitions when changing mass (use lerp function)

    Visual styling:
    - Planetary surfaces with appropriate colors/textures
    - Clear numeric displays with large fonts
    - Arrows with thickness proportional to force magnitude

    Canvas background: Star field for space context
</details>

## Normal Force: The Support Force

The **normal force** is the support force that surfaces exert on objects in contact with them. "Normal" here means perpendicular—the normal force always acts perpendicular to the surface.

### Characteristics of Normal Force

Here are the key properties:

- **Direction:** Always perpendicular to the contact surface
- **Magnitude:** Adjusts to prevent objects from passing through surfaces
- **Origin:** Electromagnetic repulsion between atoms at the surface
- **Symbol:** Usually written as N or F_N

### Normal Force in Different Situations

**On a horizontal surface:**
- Object at rest: N = mg (normal force equals weight)
- Object pushed down: N = mg + F_push (normal force increases)
- Object pulled up partially: N = mg - F_pull (normal force decreases)

**On an inclined plane:**
- Normal force = mg cos(θ), where θ is the angle of incline
- Normal force is less than weight (some of weight acts parallel to slope)
- Steeper slope → smaller normal force

**In an elevator:**
- Accelerating up: N = m(g + a) (normal force greater than weight)
- Accelerating down: N = m(g - a) (normal force less than weight)
- Free fall: N = 0 (no contact force)

### Why Normal Force Matters

The normal force is crucial because:

1. It's one of the forces you'll encounter in nearly every problem
2. Friction depends on normal force (f = μN, which you'll learn in the next chapter)
3. It's not always equal to weight—you must calculate it from equilibrium conditions
4. It can do no work (always perpendicular to motion)

#### Diagram: Normal Force on Inclined Planes Diagram

<details markdown="1">
    <summary>Normal Force on Inclined Planes Diagram</summary>
    Type: diagram

    Purpose: Show how normal force changes with incline angle and how weight components relate to it

    Main visualization:
    - Inclined plane at adjustable angle θ (initially 30°)
    - Block (labeled with mass m) resting on slope
    - Coordinate system: x-axis parallel to slope, y-axis perpendicular to slope

    Forces shown:
    1. Weight vector (W = mg):
       - Drawn from center of block, pointing straight down (toward Earth's center)
       - Red color
       - Magnitude labeled

    2. Weight components:
       - W_parallel = mg sin(θ): Along the slope, pointing downward
         * Orange dashed arrow
         * Label: "Component pulling block down slope"
       - W_perpendicular = mg cos(θ): Into the slope
         * Orange dashed arrow
         * Label: "Component pressing into surface"

    3. Normal force (N):
       - Blue arrow perpendicular to slope surface, pointing away from surface
       - Starts at center of block
       - Magnitude: N = mg cos(θ)
       - Label showing N = W_perpendicular (they balance)

    4. Friction force (shown but marked "Next Chapter"):
       - Small gray arrow up the slope
       - Balances W_parallel if block at rest

    Multiple viewing angles:
    - View 1 (θ = 0°): Horizontal surface
      * N = mg (no components needed)
      * Annotation: "Flat surface: Normal force equals weight"

    - View 2 (θ = 30°): Moderate incline
      * N = mg cos(30°) = 0.87 mg
      * Shows component breakdown clearly
      * Right triangle formed by W, W_parallel, W_perpendicular highlighted

    - View 3 (θ = 60°): Steep incline
      * N = mg cos(60°) = 0.50 mg
      * W_parallel now larger than W_perpendicular
      * Annotation: "Steeper slope: Normal force gets smaller"

    - View 4 (θ = 90°): Vertical wall
      * N = 0 (no surface contact in this orientation)
      * Annotation: "Vertical: No normal force"

    Geometric construction:
    - Right triangle showing angle θ
    - Height and base labeled to reinforce trigonometry
    - Angle θ marked at slope base
    - Dotted lines showing how components project from weight vector

    Equations displayed:
    - W = mg (weight magnitude)
    - N = mg cos(θ) (normal force)
    - W_∥ = mg sin(θ) (parallel component)
    - W_⊥ = mg cos(θ) (perpendicular component)

    Color scheme:
    - Weight (total): Red
    - Components: Orange (dashed)
    - Normal force: Blue
    - Surface: Brown
    - Block: Gray with mass label

    Annotations:
    - "Normal means perpendicular to surface"
    - "As θ increases, N decreases"
    - "Components always perpendicular to each other"

    Implementation: Static diagram with multiple panels showing different angles
    Style: Clean vector graphics suitable for textbook
    Size: 1000px × 700px
</details>

## Putting It All Together: Problem-Solving Examples

Let's apply everything you've learned to solve some realistic problems. These examples will show you how to use free-body diagrams, Newton's laws, and equilibrium conditions.

### Example 1: Box on a Table

A 5.0 kg box sits at rest on a horizontal table. What is the normal force?

**Solution:**

Step 1: Draw free-body diagram
- Weight W = mg pointing down
- Normal force N pointing up

Step 2: Apply equilibrium (at rest, so F_net = 0)
- Vertical direction: N - W = 0
- Therefore: N = W = mg

Step 3: Calculate
- N = (5.0 kg)(9.8 m/s²) = 49 N upward

The table pushes up with 49 N to balance the box's weight.

### Example 2: Pushing a Crate

You push a 20 kg crate across a frictionless floor with a force of 60 N. What is the crate's acceleration?

**Solution:**

Step 1: Free-body diagram
- Applied force F_app = 60 N (horizontal)
- Weight W = mg (downward)
- Normal force N (upward)
- No friction (frictionless surface)

Step 2: Apply Newton's Second Law (horizontal direction only, since there's no vertical acceleration)
- F_net = F_app = 60 N
- F_net = ma

Step 3: Solve for acceleration
- a = F_net / m = 60 N / 20 kg = 3.0 m/s²

The crate accelerates at 3.0 m/s² in the direction you push.

### Example 3: Tug of War

Two teams pull on opposite ends of a rope. Team A pulls with 500 N east, Team B pulls with 400 N west. The rope has mass 2.0 kg. What is the rope's acceleration?

**Solution:**

Step 1: Free-body diagram (horizontal forces only)
- Force from Team A: F_A = 500 N east (call this positive)
- Force from Team B: F_B = 400 N west (this is negative)

Step 2: Calculate net force
- F_net = F_A - F_B = 500 N - 400 N = 100 N east

Step 3: Apply F = ma
- a = F_net / m = 100 N / 2.0 kg = 50 m/s² east

Team A wins! The rope accelerates eastward at 50 m/s².

Note: By Newton's Third Law, the rope pulls on Team A with 500 N west and on Team B with 400 N east. These are the reaction forces.

## Connections and Looking Ahead

You've now mastered the fundamental laws that govern all motion in the universe (at everyday speeds, at least—Einstein's relativity takes over near light speed). These three laws are incredibly powerful:

- **Newton's First Law** tells us objects naturally maintain their motion
- **Newton's Second Law** quantifies how forces cause acceleration
- **Newton's Third Law** reveals that forces always come in pairs

In the next chapter, we'll explore specific types of forces in detail—friction, air resistance, tension, and circular motion. You'll see how these principles apply to inclined planes, pulleys, and rotating systems. The foundation you've built here will support everything that follows.

But the applications go far beyond this course. Newton's laws power:

- Rocket science and orbital mechanics
- Vehicle safety design (crumple zones, airbags)
- Sports biomechanics
- Video game physics engines
- Structural engineering
- Robotics and control systems

Every time you walk, drive, throw a ball, or ride an elevator, Newton's laws are in action. You've learned to see the invisible forces that shape our physical world.

## Key Concepts Summary

Before moving on, make sure you can confidently explain these concepts:

- **Force:** A vector quantity (push or pull) that can change motion
- **Net Force:** The vector sum of all forces acting on an object
- **Newton's First Law (Inertia):** Objects maintain their motion unless acted upon by a net force
- **Inertia:** The tendency of objects to resist changes in motion (depends on mass)
- **Newton's Second Law:** F_net = ma (force causes acceleration proportional to mass)
- **Newton's Third Law:** Forces come in equal and opposite action-reaction pairs acting on different objects
- **Action-Reaction Pairs:** Equal magnitude, opposite direction, same type, different objects
- **Equilibrium:** State where net force is zero (no acceleration)
- **Static Equilibrium:** Object at rest with balanced forces
- **Dynamic Equilibrium:** Object moving at constant velocity with balanced forces
- **Weight:** Gravitational force W = mg (depends on location)
- **Mass vs Weight:** Mass is constant, weight varies with gravity
- **Normal Force:** Support force perpendicular to a surface (adjusts to prevent penetration)

If any of these feel unclear, review the relevant section before continuing. These concepts form the foundation for all of dynamics!
