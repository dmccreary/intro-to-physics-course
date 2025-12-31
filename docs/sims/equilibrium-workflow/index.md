---
title: Equilibrium Classification Workflow
description: Interactive decision tree to classify objects as in static equilibrium, dynamic equilibrium, or not in equilibrium.
image: /sims/equilibrium-workflow/equilibrium-workflow.png
og:image: /sims/equilibrium-workflow/equilibrium-workflow.png
quality_score: 100
---

# Equilibrium Classification Workflow

<iframe src="main.html" height="572px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit in p5.js Editor](https://editor.p5js.org/dmccreary/sketches/s6hVBBbyA)

Copy this iframe to embed in your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/equilibrium-workflow/main.html" width="100%" height="600px"></iframe>
```

## About This MicroSim

Use this interactive flowchart to classify whether an object is in equilibrium, and if so, what type. Click on the example buttons to see the decision path highlighted for different scenarios.

## Decision Process

1. **Is the net force zero?**
   - If NO → Object accelerates (NOT in equilibrium)
   - If YES → Continue to step 2

2. **Is the velocity zero?**
   - If YES → **Static Equilibrium** (at rest, stays at rest)
   - If NO → **Dynamic Equilibrium** (constant velocity)

## Key Insight

Being "at rest" does NOT mean equilibrium! A ball at the peak of its throw has v = 0, but it's NOT in equilibrium because gravity still accelerates it downward.

## Lesson Plan

**Learning Objectives:**

- Distinguish between static and dynamic equilibrium
- Apply the equilibrium classification process to real-world scenarios
- Recognize that zero velocity does not guarantee equilibrium

**Target Audience:** High school physics students (grades 10-12)

**Prerequisites:**

- Understanding of force and net force
- Familiarity with velocity and acceleration concepts
- Knowledge of Newton's First Law

**Activities:**

1. **Guided Exploration (10 min):** Walk through each example in the MicroSim, discussing why each scenario is classified as it is.

2. **Predict and Check (15 min):** Before clicking an example button, have students predict the classification and explain their reasoning. Then check with the flowchart.

3. **Create Your Own (10 min):** Have students think of 3 additional real-world examples and classify them using the decision tree.

**Assessment:**

- Can students correctly identify whether net force is zero for a given scenario?
- Can students distinguish between static and dynamic equilibrium?
- Do students understand why v = 0 alone does not indicate equilibrium?

## References

1. [Newton's First Law - The Physics Classroom](https://www.physicsclassroom.com/class/newtlaws/Lesson-1/Newton-s-First-Law) - Comprehensive explanation of inertia and equilibrium conditions

2. [Equilibrium and Statics - Khan Academy](https://www.khanacademy.org/science/physics/forces-newtons-laws/normal-forces-and-friction/v/static-and-kinetic-friction-example) - Video lessons on equilibrium concepts

3. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used in this MicroSim
