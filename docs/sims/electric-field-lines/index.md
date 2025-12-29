---
title: Electric Field Lines Visualization
description: Interactive simulation visualizing electric field patterns around point charges, demonstrating electrostatic field direction, strength, and dipole configurations.
image: /sims/electric-field-lines/electric-field-lines.png
og:image: /sims/electric-field-lines/electric-field-lines.png
quality_score: 100
---

# Electric Field Lines Visualization

This interactive simulation visualizes electric field lines around point charges, demonstrating the fundamental patterns of electrostatic fields.

<iframe src="main.html" height="612px" width="100%" scrolling="no" style="border: none; overflow: hidden;"></iframe>

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/electric-field-lines/main.html" width="100%" height="612px"></iframe>
```

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/YyoAzgGBw)

## About This Simulation

Electric field lines are visual representations of the electric field around charged objects. They show:

- **Direction**: The direction a positive test charge would move
- **Strength**: Closer lines indicate stronger field regions
- **Source/Sink**: Lines originate from positive charges and terminate on negative charges

## How to Use

1. **Adjust Charges**: Use the q₁ and q₂ sliders to change charge magnitudes (-10 to +10 μC)
2. **Drag Charges**: Click and drag charges to reposition them
3. **Field Lines**: Adjust the number of field lines for more or less detail
4. **Show Vectors**: Enable "Show field vectors" to see field direction and relative strength at grid points

## Field Line Patterns

### Electric Dipole (Default)

- Lines exit the positive charge and enter the negative charge
- Field is strongest between the charges
- Creates the classic dipole pattern

### Like Charges (Both Positive or Both Negative)

- Lines repel each other
- No lines connect the two charges
- Field is zero at a point between them

### Single Charge

- Set one charge to zero to see radial field pattern
- Lines extend radially outward (positive) or inward (negative)

## Lesson Plan

### Learning Objectives

After completing this lesson, students will be able to:

1. **Remember**: Define electric field and identify its units (N/C or V/m)
2. **Understand**: Explain how electric field lines represent field direction and relative strength
3. **Apply**: Predict the direction of force on a test charge placed in an electric field
4. **Analyze**: Compare field patterns for dipoles, like charges, and single charges
5. **Evaluate**: Determine regions of strongest and weakest field from line density
6. **Create**: Sketch accurate field line diagrams for given charge configurations

### Target Audience

- High school physics students (grades 10-12)
- AP Physics 1 and AP Physics 2 students
- Introductory college physics students

### Prerequisites

- Understanding of Coulomb's Law and electric force
- Basic knowledge of vectors (magnitude and direction)
- Familiarity with the concept of a test charge

### Materials Needed

- Computer or tablet with web browser
- Student worksheet (optional)
- Whiteboard for class discussion

### Lesson Timeline

#### Introduction (10 minutes)

1. Review Coulomb's Law: F = kq₁q₂/r²
2. Introduce the concept of electric field: E = F/q
3. Explain that field lines are a visualization tool invented by Michael Faraday

#### Guided Exploration (20 minutes)

1. **Dipole Configuration**
   - Start with default settings (+5 μC and -5 μC)
   - Observe how lines leave positive and enter negative charges
   - Ask: "Where is the field strongest?" (Between the charges)
   - Drag charges closer/farther to see field changes

2. **Like Charges**
   - Set both charges positive (+5 μC each)
   - Observe the repulsion pattern and neutral point
   - Ask: "Why don't any lines connect the charges?"

3. **Single Charge**
   - Set one charge to zero
   - Observe radial symmetry
   - Enable "Show field vectors" to see magnitude variation

4. **Asymmetric Charges**
   - Set charges to different magnitudes (+8 μC and -3 μC)
   - Count lines leaving vs entering
   - Discuss why more lines leave the larger charge

#### Independent Practice (15 minutes)

Students complete worksheet activities:

1. Sketch predicted field lines for given configurations before viewing
2. Verify predictions using the simulation
3. Answer conceptual questions about field strength and direction

#### Assessment Questions

1. A positive test charge is placed at point P between a +4 μC and -4 μC charge. Which direction will it move? Why?
2. If the field lines are twice as dense at point A compared to point B, what can you say about the field strengths at these points?
3. Why do electric field lines never cross each other?
4. Draw the field lines for two charges: +6 μC and +2 μC separated by 10 cm.

### Differentiation

**For Advanced Students:**

- Calculate the electric field magnitude at specific points using E = kq/r²
- Explore equipotential lines (perpendicular to field lines)
- Investigate the superposition principle quantitatively

**For Struggling Students:**

- Focus only on the dipole configuration initially
- Use the "Show field vectors" option to reinforce direction concepts
- Provide partially completed field line diagrams to finish

### Common Misconceptions

1. **Field lines are real paths**: Clarify that they are visualization tools, not actual trajectories
2. **Longer lines mean stronger fields**: Emphasize that density, not length, indicates strength
3. **Charges must be present for fields to exist**: Fields exist in empty space around charges

### Extensions

- Connect to magnetic field lines and compare similarities/differences
- Discuss applications: capacitors, Van de Graaff generators, lightning rods
- Introduce Gauss's Law for quantitative field analysis

## References

1. [Electric Field - HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/electric/elefie.html) - Georgia State University - Comprehensive reference on electric fields with interactive diagrams and mathematical derivations

2. [PhET Electric Field Simulation](https://phet.colorado.edu/en/simulations/charges-and-fields) - University of Colorado Boulder - Research-based interactive simulation for comparing approaches

3. [Faraday's Lines of Force](https://www.britannica.com/science/lines-of-force) - Encyclopedia Britannica - Historical context on Michael Faraday's development of field line visualization

4. [AP Physics 2: Electric Fields](https://apcentral.collegeboard.org/courses/ap-physics-2) - College Board - Curriculum alignment for AP Physics 2 electrostatics unit

5. [Electric Field Lines - Khan Academy](https://www.khanacademy.org/science/physics/electric-charge-electric-force-and-voltage/electric-field/v/electric-field-lines) - Free video tutorial explaining electric field line concepts and conventions
