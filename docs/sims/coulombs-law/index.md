---
title: Coulomb's Law Force Calculator
description: Interactive simulation demonstrating Coulomb's Law - explore how electric force depends on charge magnitudes and separation distance between two point charges.
image: /sims/coulombs-law/coulombs-law.png
og:image: /sims/coulombs-law/coulombs-law.png
quality_score: 100
---

# Coulomb's Law Force Calculator

This interactive simulation demonstrates Coulomb's Law, which describes the electrostatic force between two point charges.

<iframe src="main.html" height="500px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

Copy this iframe to embed in your own website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/coulombs-law/main.html" width="100%" height="500px"></iframe>
```

[Run Fullscreen](main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/dmccreary/sketches/ceNSsUzZI){ .md-button }

## About This Simulation

Coulomb's Law states that the electric force between two point charges is:

- Directly proportional to the product of their charge magnitudes
- Inversely proportional to the square of the distance between them

$$F = k \frac{|q_1 q_2|}{r^2}$$

Where:

- $F$ is the electric force (Newtons)
- $k = 8.99 \times 10^9 \text{ N·m}^2/\text{C}^2$ (Coulomb's constant)
- $q_1$ and $q_2$ are the charges (Coulombs)
- $r$ is the distance between charges (meters)

## How to Use

1. **Adjust Charges**: Use the q₁ and q₂ sliders to set charge values from -10 to +10 μC (microcoulombs)
2. **Set Distance**: Use the distance slider to adjust separation from 0.2 to 3.0 meters
3. **Observe Force**: Watch the force vectors and calculated force value change in real-time
4. **Toggle Graph**: Check "Show 1/r² graph" to visualize the inverse square relationship

## Key Observations

- **Opposite charges attract** (shown with green arrows pointing toward each other)
- **Like charges repel** (shown with red arrows pointing away from each other)
- **Force increases dramatically** as distance decreases (inverse square relationship)
- **Force is proportional** to the product of the charge magnitudes

## Lesson Plan

### Learning Objectives

After using this simulation, students should be able to:

1. Apply Coulomb's Law to calculate electric forces between point charges
2. Predict whether charges will attract or repel based on their signs
3. Explain the inverse square relationship between force and distance
4. Convert between microcoulombs and coulombs

### Target Audience

- High school physics students (grades 10-12)
- AP Physics students
- Introductory college physics students

### Prerequisites

- Understanding of basic algebra
- Familiarity with scientific notation
- Basic concepts of electric charge (positive/negative)

### Suggested Activities

1. **Exploration (10 min)**: Let students freely explore the simulation, adjusting sliders and observing changes
2. **Prediction Exercise (10 min)**: Ask students to predict the force before adjusting sliders, then verify
3. **Data Collection (15 min)**: Have students record force values for different distances with fixed charges to verify the inverse square law
4. **Calculation Practice (15 min)**: Students calculate forces by hand and compare with simulation results
5. **Graph Analysis (10 min)**: Enable the 1/r² graph and discuss the shape of the curve

### Assessment Suggestions

- **Quick Check**: What happens to the force when you double the distance? (Answer: Force decreases to 1/4)
- **Problem Solving**: Calculate the force between two 5 μC charges separated by 2 meters
- **Conceptual**: Explain why the force vectors change direction when you change the sign of one charge

## References

1. [Coulomb's Law - HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/electric/elefor.html) - Georgia State University - Comprehensive explanation of electrostatic force with diagrams and calculations

2. [Electric Charge and Coulomb's Law - Khan Academy](https://www.khanacademy.org/science/physics/electric-charge-electric-force-and-voltage/electric-charge-field-and-potential/v/coulombs-law) - Video lessons and practice problems on electrostatics

3. [PhET Coulomb's Law Simulation](https://phet.colorado.edu/en/simulations/coulombs-law) - University of Colorado Boulder - Alternative interactive simulation for comparison

4. Halliday, D., Resnick, R., & Walker, J. (2013). *Fundamentals of Physics* (10th ed.). Wiley. Chapter 21: Coulomb's Law - Standard physics textbook reference
