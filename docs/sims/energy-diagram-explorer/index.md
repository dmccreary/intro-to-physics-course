---
title: Energy Diagram Explorer
description: Interactive simulation exploring potential energy curves, kinetic energy, turning points, equilibrium positions, and conservation of energy with four different potential functions
image: /sims/energy-diagram-explorer/energy-diagram-explorer.png
og:image: /sims/energy-diagram-explorer/energy-diagram-explorer.png
quality_score: 92
---

# Energy Diagram Explorer

<iframe src="main.html" width="100%" height="600px"></iframe>

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/energy-diagram-explorer/main.html" width="100%" height="600px"></iframe>
```

[Run Energy Diagram Explorer in Fullscreen](main.html){ .md-button .md-button--primary }

[Edit This MicroSim Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/iafzLZQdr){ .md-button }

## About This MicroSim

Energy diagrams are one of the most powerful tools in physics for understanding motion without solving differential equations. This interactive simulation shows potential energy as a function of position for four different physical systems. By adjusting the total energy line, you can visually determine where an object can move, where it reverses direction (turning points), and where equilibrium positions occur.

The simulation demonstrates the fundamental principle that **total mechanical energy is conserved** in the absence of friction. At any position, the kinetic energy equals the difference between total energy and potential energy: KE = E - PE.

## Key Concepts

- **PE Curve (Blue)**: Shows potential energy at each position
- **Total Energy Line (Red)**: Horizontal line representing E = KE + PE (constant)
- **Allowed Region (White)**: Where total energy exceeds PE (particle can exist here)
- **Forbidden Region (Gray)**: Where PE exceeds total energy (classically forbidden - KE would be negative)
- **Turning Points (Red dots)**: Where E_total = PE (KE = 0, velocity = 0, object reverses)
- **Stable Equilibrium (Green ▲)**: PE minimum - restoring force returns object to equilibrium
- **Unstable Equilibrium (Orange ▼)**: PE maximum - small displacement causes object to accelerate away

## PE Function Types

1. **Harmonic (½kx²)**: Parabolic potential well modeling springs, pendulums, and molecular bonds
2. **Gravity Valley (mg|h|)**: V-shaped potential representing a ball in a valley under gravity
3. **Double Well (ax⁴-bx²)**: Two stable states with energy barrier - models phase transitions
4. **Barrier (Gaussian)**: Energy barrier that particles must overcome or be reflected by

## Controls

- **PE Type**: Select one of four potential energy functions
- **Mass**: Adjust particle mass (0.5-5 kg) - ball size changes to reflect mass
- **Parameter Slider**: Adjust function-specific parameter (k, slope, depth, or height)
- **Energy Slider**: Set total mechanical energy level
- **Animate**: Toggle particle animation showing real-time oscillation
- **Show Force**: Display force vector (green arrow) showing F = -dPE/dx
- **Show KE**: Highlight kinetic energy region in green

## Reading the Diagram

- **Speed at any position**: v = √(2(E - PE)/m)
- **Maximum speed**: Occurs at PE minimum (all energy is kinetic)
- **Range of motion**: Particle oscillates between turning points
- **Force direction**: Always points "downhill" on PE curve (from high PE to low PE)
- **Acceleration**: Proportional to PE curve slope; steeper slope = greater acceleration

---

## Lesson Plans

### Lesson Plan 1: Harmonic Oscillator (½kx²)

**Grade Level:** High School Physics (Grades 10-12)

**Duration:** 45-50 minutes

**Learning Objectives:**

By the end of this lesson, students will be able to:

1. Explain how a parabolic potential energy curve produces simple harmonic motion
2. Predict turning points and maximum velocity positions using energy diagrams
3. Describe how changing spring constant (k) affects oscillation amplitude and frequency
4. Apply conservation of energy to calculate velocity at any position

**Prerequisites:**

- Understanding of kinetic and potential energy
- Basic algebra (solving for variables)
- Familiarity with Hooke's Law (F = -kx)

**Materials:**

- Energy Diagram Explorer MicroSim
- Student worksheet
- Physical spring and mass (optional demonstration)

**Lesson Procedure:**

**Introduction (10 minutes):**

1. Review Hooke's Law and spring potential energy PE = ½kx²
2. Demonstrate with physical spring if available
3. Introduce the energy diagram as a tool for analyzing motion

**Guided Exploration (20 minutes):**

1. Open the MicroSim in Harmonic mode
2. Set Energy to 10 J and k to 0.5
3. **Discuss:** Where are the turning points? (Where red line crosses blue curve)
4. Click "Animate" - observe the ball oscillating
5. **Question:** Where is the ball moving fastest? (At x = 0, the PE minimum)
6. Enable "Show KE" - green region shows kinetic energy at each position
7. **Experiment:** Increase k to 1.5. What happens to turning points? (They move closer)
8. **Experiment:** Increase mass. What happens to speed? (Slower, same turning points)

**Independent Practice (10 minutes):**

Students complete worksheet:

- Calculate turning point positions for given E and k values
- Predict maximum velocity using v = √(2E/m)
- Sketch expected motion for different parameter combinations

**Assessment Questions:**

1. If total energy doubles, how does the amplitude change? (Increases by √2)
2. Why does the ball slow down as it approaches the turning point? (KE converts to PE)
3. A spring with k = 2 N/m holds a 0.5 kg mass with total energy 4 J. Find the amplitude and maximum speed.

**Extension Activities:**

- Compare to pendulum motion (also approximately harmonic for small angles)
- Investigate how mass affects period but not amplitude
- Graph position vs. time and compare to sine wave

---

### Lesson Plan 2: Gravity Valley (mg|h|)

**Grade Level:** High School Physics (Grades 10-12)

**Duration:** 40-45 minutes

**Learning Objectives:**

By the end of this lesson, students will be able to:

1. Analyze motion of a ball rolling in a V-shaped valley
2. Explain why the V-shaped potential produces constant-magnitude acceleration
3. Compare and contrast parabolic (harmonic) and V-shaped (constant force) potentials
4. Predict how changing the slope affects the period of oscillation

**Prerequisites:**

- Understanding of gravitational potential energy (mgh)
- Newton's Second Law (F = ma)
- Conservation of mechanical energy

**Materials:**

- Energy Diagram Explorer MicroSim
- Inclined plane demonstration (optional)
- Graph paper for sketching

**Lesson Procedure:**

**Introduction (8 minutes):**

1. Discuss gravitational PE on an inclined plane: PE = mgh
2. Draw a V-shaped valley on the board
3. **Question:** How is motion in a V-valley different from a spring?

**Guided Exploration (20 minutes):**

1. Select "Gravity Valley (mg|h|)" mode
2. Set slope to 0.3 and Energy to 10 J
3. **Observe:** The PE curve is a "V" shape, not a parabola
4. Click "Animate" and enable "Show Force"
5. **Key observation:** Force magnitude is CONSTANT (same arrow length everywhere)
6. **Compare:** In Harmonic mode, force varies with position
7. **Experiment:** Change slope. What happens to:
   - The steepness of the V? (Increases)
   - The turning point positions? (Move closer together)
   - The force magnitude? (Increases)

**Conceptual Discussion (10 minutes):**

1. Why is the force constant? (Because dPE/dx = constant for a linear PE)
2. How does this differ from a spring? (Spring force increases with displacement)
3. What real-world system behaves this way? (Ball on inclined planes, air track)

**Assessment Questions:**

1. Sketch the velocity vs. position graph for motion in a V-valley
2. If slope doubles, what happens to the acceleration?
3. Why do we call harmonic motion "isochronous" but V-valley motion is not?

**Extension Activities:**

- Derive the period of oscillation for the V-valley (it depends on amplitude!)
- Compare to the harmonic oscillator where period is independent of amplitude
- Investigate what happens at the vertex of the V (instantaneous change in acceleration direction)

---

### Lesson Plan 3: Double Well (ax⁴-bx²)

**Grade Level:** AP Physics or Introductory College Physics

**Duration:** 50-55 minutes

**Learning Objectives:**

By the end of this lesson, students will be able to:

1. Identify stable and unstable equilibrium positions on a potential energy curve
2. Explain how total energy determines whether a particle is "trapped" in one well or can access both
3. Relate the double well potential to real physical systems (molecular configurations, phase transitions)
4. Analyze the concept of an energy barrier and activation energy

**Prerequisites:**

- Strong understanding of potential energy curves
- Familiarity with equilibrium concepts
- Basic calculus helpful but not required

**Materials:**

- Energy Diagram Explorer MicroSim
- Diagrams of molecular potential energy surfaces
- Ball and double-valley track demonstration (optional)

**Lesson Procedure:**

**Introduction (10 minutes):**

1. Introduce the concept of multiple equilibrium positions
2. Real-world examples: molecular isomers, magnetic domains, protein folding
3. **Key question:** What determines which equilibrium state a system occupies?

**Guided Exploration (25 minutes):**

1. Select "Double Well (ax⁴-bx²)" mode
2. Set depth to 0.5 and Energy to about 3 J (below the barrier)
3. Click "Animate" - observe ball trapped in one well
4. **Discuss:** Why can't the ball reach the other well? (Insufficient energy to cross barrier)
5. Note the equilibrium markers:
   - Green triangles (▲) at well bottoms = stable equilibria
   - Orange triangle (▼) at center barrier = unstable equilibrium
6. **Experiment:** Slowly increase Energy until ball can cross the barrier
7. **Critical energy:** The barrier height (where ball can just reach x = 0)
8. Above critical energy: Ball oscillates through BOTH wells

**Conceptual Discussion (10 minutes):**

1. **Activation Energy:** Energy needed to escape one well and reach the other
2. **Metastable States:** Particle trapped in local (not global) minimum
3. **Thermal Fluctuations:** In real systems, temperature provides energy to cross barriers
4. **Applications:**
   - Chemical reactions (reactants → products)
   - Phase transitions (solid ↔ liquid)
   - Protein folding (misfolded vs. correctly folded states)

**Assessment Questions:**

1. At what energy does the particle first access both wells? How can you determine this from the diagram?
2. If a particle starts at rest at x = -2, what is the minimum energy needed to reach x = +2?
3. Explain why the center point (x = 0) is an unstable equilibrium even though the force is zero there.

**Extension Activities:**

- Research how quantum tunneling allows particles to cross barriers without having sufficient energy
- Investigate how changing the "depth" parameter affects barrier height
- Relate to Landau theory of phase transitions

---

### Lesson Plan 4: Gaussian Barrier

**Grade Level:** AP Physics or Introductory College Physics

**Duration:** 45-50 minutes

**Learning Objectives:**

By the end of this lesson, students will be able to:

1. Analyze particle motion near a potential energy barrier
2. Predict whether a particle will be transmitted or reflected based on energy
3. Explain the classical vs. quantum mechanical behavior at barriers
4. Calculate the minimum energy required to overcome a barrier

**Prerequisites:**

- Conservation of mechanical energy
- Understanding of kinetic and potential energy relationships
- Familiarity with equilibrium concepts

**Materials:**

- Energy Diagram Explorer MicroSim
- Diagrams of nuclear fusion barriers
- Optional: quantum tunneling simulation for comparison

**Lesson Procedure:**

**Introduction (10 minutes):**

1. Introduce the concept of an energy barrier
2. Examples: Nuclear fusion (Coulomb barrier), chemical activation energy, escape velocity
3. **Key question:** What happens when a particle encounters a barrier?

**Guided Exploration (20 minutes):**

1. Select "Barrier (Gaussian)" mode
2. Set height to 1 and Energy to 15 J (below the barrier peak)
3. **Observe:** The particle approaches the barrier, slows down, and reverses
4. This is **classical reflection** - insufficient energy to cross
5. Enable "Show Force" - note force always points away from the barrier peak
6. **Experiment:** Increase Energy above 20 J
7. Now the particle crosses over the barrier - **classical transmission**
8. **Critical observation:** Right at E = barrier height, particle would take infinite time to cross (approaches asymptotically)

**Physics Discussion (10 minutes):**

1. **Classical Prediction:** Particle either crosses (E > barrier) or reflects (E < barrier)
2. **Threshold Energy:** Equal to barrier height (peak of Gaussian)
3. **Real Applications:**
   - Nuclear fusion: Protons need ~1 MeV to overcome Coulomb repulsion
   - Chemical reactions: Activation energy determines reaction rate
   - Escape velocity: Earth's gravitational potential barrier

**Quantum Mechanics Preview (5 minutes):**

1. In quantum mechanics, particles can "tunnel" through barriers even with E < barrier height
2. Probability decreases exponentially with barrier width and height
3. Essential for: nuclear decay, scanning tunneling microscope, flash memory

**Assessment Questions:**

1. A particle with 15 J approaches a 20 J barrier. Describe its motion.
2. What is the speed of a 1 kg particle at the barrier peak if E = barrier height exactly?
3. Why does the particle slow down as it approaches the barrier, even though there's no physical wall?

**Extension Activities:**

- Research quantum tunneling and calculate tunneling probability for simple barriers
- Investigate how barrier width affects both classical and quantum behavior
- Relate to nuclear fusion in stars (pp-chain reaction)

---

## References

1. [HyperPhysics - Energy Diagrams](http://hyperphysics.phy-astr.gsu.edu/hbase/hframe.html) - Georgia State University - Comprehensive physics reference with interactive diagrams explaining potential energy concepts

2. [MIT OpenCourseWare - Classical Mechanics](https://ocw.mit.edu/courses/physics/) - MIT - Free course materials covering energy methods in mechanics

3. [PhET Interactive Simulations - Energy](https://phet.colorado.edu/en/simulations/filter?subjects=physics&type=html&sort=alpha&view=grid) - University of Colorado Boulder - Research-based interactive simulations for physics education

4. [The Physics Classroom - Work, Energy, and Power](https://www.physicsclassroom.com/class/energy) - Comprehensive tutorials on energy concepts for high school physics

5. [Khan Academy - Work and Energy](https://www.khanacademy.org/science/physics/work-and-energy) - Free video lessons and practice problems on mechanical energy

6. Halliday, D., Resnick, R., & Walker, J. (2013). *Fundamentals of Physics*. Wiley. - Standard university physics textbook with excellent coverage of energy diagrams

7. [p5.js Reference](https://p5js.org/reference/) - Documentation for the JavaScript library used to create this simulation
