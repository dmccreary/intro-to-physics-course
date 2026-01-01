---
title: Simple Pendulum Period Investigation
description: Investigate how pendulum length affects period and verify the T = 2π√(L/g) relationship through hands-on measurement and data collection.
image: /sims/simple-pendulum/simple-pendulum.png
og:image: /sims/simple-pendulum/simple-pendulum.png
quality_score: 100
---

# Simple Pendulum Period Investigation

<iframe src="main.html" width="100%" height="620px"></iframe>

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/simple-pendulum/main.html" width="100%" height="620px"></iframe>
```

[Run Simple Pendulum MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

[Edit Simple Pendulum Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/Ve3aG8AL6){ .md-button }

## About This MicroSim

This simulation allows you to investigate the relationship between pendulum length and period through systematic measurement. By timing multiple swings and collecting data at various lengths, you can verify the theoretical prediction T = 2π√(L/g) and develop laboratory skills in data collection and analysis.

The simulation provides real-time feedback during measurement, showing individual swing periods, running sums, and averages—making the measurement process transparent and educational.

## The Physics

For small angles (typically less than 15°), the period of a simple pendulum is given by:

$$T = 2\pi\sqrt{\frac{L}{g}}$$

Where:

- **T** = period (seconds) - time for one complete oscillation
- **L** = length from pivot to center of mass (meters)
- **g** = acceleration due to gravity (9.8 m/s²)

### Key Observations

1. **Period depends on length**: Longer pendulums swing slower (T ∝ √L)
2. **Period is independent of mass**: A heavier bob doesn't change the period
3. **Period is independent of amplitude**: For small angles, the period stays constant regardless of how far you pull it back
4. **Square root relationship**: Doubling the length increases the period by √2 ≈ 1.41, not 2

## How to Use

### Basic Operation

1. **Set pendulum length** using the Length L slider (0.2 to 2.0 meters)
2. **Set initial angle** using the Angle slider (5° to 30°)
3. Click **Release** to start the pendulum swinging freely
4. Click **Pause** to stop the pendulum at any position

### Taking Measurements

1. Set your desired length
2. Click **Measure Period** to begin automatic timing
3. Watch the info panel as the simulation counts 10 complete swings
4. Observe individual period measurements as they're recorded
5. The final average is automatically added to the graph
6. Change the length and repeat to collect multiple data points

### Analyzing Results

1. Collect measurements at 5-8 different lengths
2. Check **Show theoretical curve** to compare your data to theory
3. Examine percent error to assess measurement accuracy
4. Use **Clear Measurements** to start a new data set

## Lesson Plan

### Overview

This laboratory investigation introduces students to the physics of simple harmonic motion through hands-on experimentation with a virtual pendulum. Students will develop skills in systematic data collection, understand the relationship between period and length, and verify a fundamental physics equation through empirical measurement.

### Learning Objectives

By the end of this lesson, students will be able to:

1. **Explain** the relationship between pendulum length and period using the equation T = 2π√(L/g)
2. **Predict** how changing length affects period (qualitatively and quantitatively)
3. **Demonstrate** proper experimental technique by collecting multiple measurements and calculating averages
4. **Analyze** experimental data by comparing measured values to theoretical predictions
5. **Evaluate** sources of experimental error and their impact on results
6. **Apply** the square root relationship to solve problems involving pendulum motion

### Target Audience

- High school physics students (grades 10-12)
- AP Physics 1 students
- Introductory college physics students

### Prerequisites

- Basic algebra (solving equations, square roots)
- Understanding of period and frequency
- Familiarity with graphing data points
- Introduction to simple harmonic motion concepts

### Time Required

- **Minimum**: 30 minutes (basic investigation)
- **Standard**: 45-50 minutes (full investigation with analysis)
- **Extended**: 90 minutes (includes mathematical derivation and error analysis)

### Materials Needed

- Computer or tablet with internet access
- Student worksheet (optional)
- Calculator
- Graph paper (optional, for manual plotting)

---

### Activity 1: Prediction and Exploration (10 minutes)

**Purpose**: Activate prior knowledge and develop intuition

**Before using the simulation**, have students predict:

1. If you double the length of a pendulum, what happens to the period?
   - [ ] Doubles
   - [ ] Increases by √2 (about 1.4×)
   - [ ] Stays the same
   - [ ] Halves

2. If you double the mass of the bob, what happens to the period?
   - [ ] Doubles
   - [ ] Increases by √2
   - [ ] Stays the same
   - [ ] Halves

3. If you pull the pendulum back farther (larger angle), what happens to the period?
   - [ ] Increases significantly
   - [ ] Increases slightly
   - [ ] Stays the same
   - [ ] Decreases

**Exploration**: Let students freely explore the simulation for 3-5 minutes. Encourage them to test their predictions qualitatively before formal measurement.

---

### Activity 2: Systematic Data Collection (20 minutes)

**Purpose**: Develop laboratory skills and collect quantitative data

**Procedure**:

1. Set mass to 0.5 kg and angle to 10° (keep these constant throughout)
2. Create a data table:

| Length (m) | Measured Period (s) | Theoretical Period (s) | % Error |
|------------|---------------------|------------------------|---------|
| 0.4        |                     |                        |         |
| 0.6        |                     |                        |         |
| 0.8        |                     |                        |         |
| 1.0        |                     |                        |         |
| 1.2        |                     |                        |         |
| 1.4        |                     |                        |         |
| 1.6        |                     |                        |         |
| 1.8        |                     |                        |         |

3. For each length:
   - Click "Measure Period"
   - Watch the 10-swing measurement process
   - Record the final average period
   - Calculate theoretical period using T = 2π√(L/9.8)
   - Calculate percent error: |measured - theoretical| / theoretical × 100%

4. After collecting all data, check "Show theoretical curve" and compare your points to the curve.

**Discussion Questions During Activity**:

- Why do we measure 10 swings instead of just 1?
- Why does the simulation show individual periods? What do you notice about variation?
- What might cause differences between measured and theoretical values?

---

### Activity 3: Testing Variables (15 minutes)

**Purpose**: Verify which variables affect the period

**Part A: Mass Independence**

1. Set length to 1.0 m and angle to 10°
2. Measure the period at mass = 0.5 kg
3. Change mass to 1.0 kg, measure again
4. Change mass to 1.5 kg, measure again
5. Record all three periods. What do you conclude?

| Mass (kg) | Period (s) |
|-----------|------------|
| 0.5       |            |
| 1.0       |            |
| 1.5       |            |

**Part B: Amplitude Independence (Small Angle Approximation)**

1. Set length to 1.0 m and mass to 0.5 kg
2. Measure period at angle = 5°
3. Measure period at angle = 15°
4. Measure period at angle = 30°
5. At what angle does the measured period start to deviate noticeably from theory?

| Angle (°) | Measured Period (s) | Theoretical Period (s) | % Difference |
|-----------|---------------------|------------------------|--------------|
| 5         |                     | 2.006                  |              |
| 15        |                     | 2.006                  |              |
| 30        |                     | 2.006                  |              |

---

### Activity 4: Mathematical Analysis (15 minutes)

**Purpose**: Connect experimental results to mathematical relationships

**Linearization**:

The equation T = 2π√(L/g) can be rewritten as T² = (4π²/g)L

This means T² vs. L should be a straight line through the origin with slope = 4π²/g ≈ 4.03 s²/m

1. Using your data from Activity 2, calculate T² for each length
2. Plot T² (y-axis) vs. L (x-axis)
3. Draw a best-fit line
4. Calculate the slope of your line
5. Use the slope to calculate g: g = 4π²/slope

| Length (m) | Period T (s) | T² (s²) |
|------------|--------------|---------|
| 0.4        |              |         |
| 0.6        |              |         |
| 0.8        |              |         |
| 1.0        |              |         |
| 1.2        |              |         |
| 1.4        |              |         |

**Analysis Questions**:

1. What is the slope of your T² vs. L graph?
2. Using slope = 4π²/g, what value of g do you calculate?
3. What is the percent error compared to g = 9.8 m/s²?
4. Why might linearizing the data be useful?

---

### Activity 5: Error Analysis and Discussion (10 minutes)

**Purpose**: Develop critical thinking about experimental uncertainty

**Sources of Error**:

Discuss with students which of these might affect their results:

1. **Timing precision**: How accurately can the simulation detect swing completion?
2. **Damping**: The simulation includes slight damping (energy loss). How might this affect later swings in the 10-swing measurement?
3. **Small angle approximation**: The formula T = 2π√(L/g) is only exact for infinitely small angles
4. **Measurement of length**: In a real pendulum, where exactly do you measure from?

**Reflection Questions**:

1. Were your measured periods consistently higher or lower than theoretical? What might explain this systematic error?
2. Why does averaging 10 swings give a better result than timing just one swing?
3. If you were doing this experiment with a real pendulum, what additional sources of error would you need to consider?

---

### Assessment Suggestions

**Formative Assessment** (during lab):

- Circulate and observe data collection technique
- Ask students to predict the next measurement before taking it
- Have students explain the sum/average calculation shown in the simulation

**Summative Assessment Options**:

1. **Lab Report**: Students submit data tables, graphs, and analysis
2. **Quiz Questions**:
   - Calculate the period for a 2.5 m pendulum
   - If a pendulum has period 3 s, what is its length?
   - Explain why mass doesn't affect the period (conceptual)
3. **Extension Problem**: A grandfather clock has a 1-second pendulum (2-second period). How long should the pendulum be?

---

### Differentiation

**For Struggling Students**:

- Provide partially completed data tables
- Focus on qualitative observations first
- Pair with stronger students for data collection
- Use only Activities 1-2

**For Advanced Students**:

- Challenge them to derive the pendulum equation from Newton's laws
- Have them investigate the large-angle correction factor
- Ask them to determine how g varies with latitude using pendulum data
- Calculate the period on the Moon (g = 1.6 m/s²)

---

### Common Misconceptions to Address

1. **"Heavier pendulums swing slower"** - Mass doesn't affect period because both the gravitational force AND the inertia increase proportionally

2. **"Pulling it back farther makes it swing faster"** - For small angles, amplitude doesn't affect period (isochronism)

3. **"The period depends on the string"** - Only the length matters, not the material or thickness of the string

4. **"Doubling the length doubles the period"** - The square root relationship means doubling length only increases period by √2

---

### Extensions

1. **Foucault Pendulum**: Research how a very long pendulum demonstrates Earth's rotation

2. **Coupled Pendulums**: Investigate what happens when two pendulums are connected

3. **Physical Pendulum**: How does the period change for a swinging rod vs. a point mass?

4. **Real-World Applications**:
   - How do grandfather clocks use pendulums to keep time?
   - Why are playground swings a certain length?
   - How did Galileo use pendulums in his research?

## References

1. [Simple Pendulum - HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/pend.html) - Georgia State University - Comprehensive physics resource explaining pendulum mechanics with interactive calculations

2. [The Simple Pendulum - Physics Classroom](https://www.physicsclassroom.com/class/waves/Lesson-0/Pendulum-Motion) - 2024 - Educational resource with clear explanations of pendulum motion and period relationships

3. [Pendulum Motion Lab - PhET Interactive Simulations](https://phet.colorado.edu/en/simulations/pendulum-lab) - University of Colorado Boulder - Complementary simulation for comparing virtual lab experiences

4. [AAPT Simple Harmonic Motion Resources](https://www.aapt.org/) - American Association of Physics Teachers - Professional organization with teaching resources and lab activities

5. [AP Physics 1: Simple Harmonic Motion](https://apcentral.collegeboard.org/courses/ap-physics-1) - College Board - Curriculum framework and learning objectives for SHM

6. Halliday, D., Resnick, R., & Walker, J. (2018). *Fundamentals of Physics* (11th ed.). Wiley. - Chapter 15: Oscillations - Standard textbook treatment of pendulum physics
