---
title: Angular Momentum Vector Visualization
description: Visualize angular momentum as a vector quantity showing the right-hand rule for determining direction.
image: /sims/angular-momentum-vector/angular-momentum-vector.png
og:image: /sims/angular-momentum-vector/angular-momentum-vector.png
twitter:image: /sims/angular-momentum-vector/angular-momentum-vector.png
quality_score: 95
---

# Angular Momentum Vector Visualization

<iframe src="main.html" height="530px" width="100%" scrolling="no"></iframe>

[Run the Angular Momentum Vector Visualization MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Angular Momentum Vector Visualization MicroSim Using the p5.js editor](https://editor.p5js.org/dmccreary/sketches/yDynjpUqt)

Copy this iframe to embed this MicroSim on your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/angular-momentum-vector/main.html" width="100%" height="530px"></iframe>
```

## About This MicroSim

This visualization illustrates that angular momentum (L) is a vector quantity. Its direction is determined by the right-hand rule and is parallel to the angular velocity vector (ω).

## The Right-Hand Rule

1. **Curl your fingers** in the direction of rotation
2. **Your thumb points** in the direction of L (and ω)

## Key Observations

- **Counterclockwise rotation** (when viewed from above): L points UP
- **Clockwise rotation** (when viewed from above): L points DOWN
- **L and ω are always parallel** (same direction)

## Why Vectors?

Angular momentum is a vector because:
- It has **magnitude**: L = Iω
- It has **direction**: Along the rotation axis
- It follows **vector addition rules**

This vector nature is crucial for understanding:
- Gyroscopic effects
- Precession
- Conservation of angular momentum in 3D

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. **Explain** that angular momentum is a vector quantity with both magnitude and direction
2. **Apply** the right-hand rule to determine the direction of angular momentum
3. **Describe** the relationship L = Iω and how changes in I or ω affect L
4. **Predict** how reversing rotation direction changes the angular momentum vector

### Target Audience

High school physics students (grades 10-12) studying rotational motion

### Prerequisites

- Understanding of scalar vs. vector quantities
- Basic knowledge of rotational motion (angular velocity, rotation)
- Familiarity with the concept of moment of inertia

### Activities

#### Activity 1: Exploring the Right-Hand Rule (5 minutes)

1. Set rotation to clockwise (CW) and observe the direction of L and ω vectors
2. Practice the right-hand rule: curl fingers in rotation direction, thumb points in direction of L
3. Toggle to counter-clockwise (CCW) and verify the vectors reverse direction

#### Activity 2: Investigating L = Iω (10 minutes)

1. Keep ω constant, vary the disk radius slider
2. Observe how L changes as moment of inertia (I) increases
3. Keep radius constant, vary the angular velocity slider
4. Record observations about the relationship between ω, I, and L magnitude

#### Activity 3: Step-Through Mode (5 minutes)

1. Click "Step Through" to enter guided mode
2. Progress through each step, predicting outcomes before advancing
3. Discuss each step's connection to the right-hand rule

### Discussion Questions

1. Which way does L point for Earth's rotation? (Answer: Along the axis toward the North Star)
2. If you reverse the rotation, what happens to L? (Answer: L reverses direction)
3. Why is angular momentum conserved as a vector, not just a number? (Answer: Both magnitude and direction must be conserved)
4. A figure skater pulls in their arms during a spin. What happens to ω if L is conserved?

### Assessment

- **Formative**: Observe students using the right-hand rule correctly
- **Summative**: Quiz asking students to predict L direction for various rotation scenarios

## References

1. [Angular Momentum - HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/amom.html) - Georgia State University - Comprehensive reference on angular momentum with mathematical derivations and examples

2. [Right-Hand Rule - Khan Academy](https://www.khanacademy.org/science/physics/torque-angular-momentum/angular-momentum/v/angular-momentum-of-an-extended-object) - Video explanation of angular momentum as a vector quantity

3. [Conservation of Angular Momentum - Physics Classroom](https://www.physicsclassroom.com/class/momentum/Lesson-2/Angular-Momentum) - Educational resource explaining angular momentum conservation with real-world examples
