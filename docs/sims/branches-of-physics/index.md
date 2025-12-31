---
title: Branches of Physics Dependency Graph
description: Interactive vis-network visualization showing 11 major physics branches and 33 subbranches with their prerequisite dependencies
image: /sims/branches-of-physics/branches-of-physics.png
og:image: /sims/branches-of-physics/branches-of-physics.png
quality_score: 95
---

# Branches of Physics Dependency Graph

## Overview

Physics is a vast discipline organized into interconnected branches, each focusing on different aspects of the physical universe. This interactive dependency graph visualizes the major branches of physics and their subbranches, showing how different areas of study build upon one another through prerequisite relationships.

## Interactive Visualization

<iframe src="main.html" width="100%" height="800px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/branches-of-physics/main.html" width="100%" height="600px"></iframe>
```

## Understanding the Graph

The visualization displays 11 major branches of physics and 33 subbranches as colored nodes connected by arrows. Each arrow represents a "DEPENDS_ON" relationship, pointing from a dependent field to its prerequisite.

### Major Branches

1. **Classical Mechanics** - The foundation of physics, studying motion, forces, and energy in macroscopic systems
2. **Electromagnetism** - Electric charges, magnetic fields, and electromagnetic radiation
3. **Optics** - The behavior and properties of light
4. **Quantum Physics** - Physics at atomic and subatomic scales
5. **Relativity** - Motion at high speeds and gravity as spacetime curvature
6. **Astrophysics & Cosmology** - Physics of celestial objects and the universe
7. **Condensed Matter Physics** - Properties of solid and liquid matter
8. **Nuclear & Particle Physics** - Structure and interactions of atomic nuclei and fundamental particles
9. **Geophysics & Atmospheric Physics** - Physics of Earth's systems
10. **Biophysics** - Physical principles in biological systems
11. **Computational & Theoretical Physics** - Mathematical frameworks and computational methods

### Dependency Patterns

The graph reveals several important dependency patterns:

- **Foundation Branches**: Classical Mechanics and Electromagnetism serve as prerequisites for most other branches
- **Quantum Physics**: Required for understanding modern physics including condensed matter, nuclear physics, and many biophysics topics
- **Relativity**: Essential for astrophysics and cosmology
- **Cross-disciplinary Dependencies**: Many subbranches depend on concepts from multiple major branches (e.g., Quantum Optics requires both Optics and Quantum Physics)

## Key Features

### Subbranches by Category

**Classical Mechanics** (Node ID 1):
- Statics & Dynamics (101)
- Fluid Mechanics (102)
- Acoustics (103)
- Thermodynamics (104)

**Electromagnetism** (Node ID 2):
- Electrostatics (201)
- Electrodynamics & Circuits (202)
- Magnetism (203)
- Electromagnetic Waves (204)

**Optics** (Node ID 3):
- Geometrical Optics (301)
- Physical Optics (302)
- Quantum Optics (303) - Also depends on Quantum Physics

**Quantum Physics** (Node ID 4):
- Quantum Mechanics (401)
- Quantum Field Theory (402)
- Quantum Information & Quantum Computing (403)

**Relativity** (Node ID 5):
- Special Relativity (501)
- General Relativity (502)
- Cosmological Relativity (503)

**Astrophysics & Cosmology** (Node ID 6):
- Stellar Astrophysics (601)
- Planetary Science (602)
- Cosmology (603) - Also depends on Relativity

**Condensed Matter Physics** (Node ID 7):
- Solid-State Physics (701)
- Soft Matter Physics (702)
- Materials Science (703)

**Nuclear & Particle Physics** (Node ID 8):
- Nuclear Physics (801)
- Particle Physics (802)
- High-Energy Physics (803) - Also depends on Quantum Field Theory

**Geophysics & Atmospheric Physics** (Node ID 9):
- Seismology & Geodynamics (901)
- Meteorology & Climate Physics (902) - Also depends on Fluid Mechanics and Thermodynamics
- Oceanography & Planetary Physics (903)

**Biophysics** (Node ID 10):
- Molecular & Cellular Biophysics (1001) - Also depends on Quantum Physics
- Neurophysics (1002) - Also depends on Electromagnetism
- Biomechanics (1003) - Also depends on Classical Mechanics

**Computational & Theoretical Physics** (Node ID 11):
- Mathematical Physics (1101)
- Computational Physics (1102) - Also depends on Classical Mechanics and Quantum Physics
- Statistical Physics (1103) - Also depends on Classical Mechanics and Quantum Physics

## Using the Visualization

### Interactive Features

- **Pan & Zoom**: Click and drag to pan the view; use mouse wheel or pinch to zoom
- **Node Selection**: Click any node to highlight it and see connected relationships
- **Hover**: Hover over nodes to see labels and connection details
- **Physics Simulation**: The layout automatically adjusts to minimize edge crossing

### Interpreting Dependencies

- **Arrows point to prerequisites**: If Branch A has an arrow to Branch B, then understanding Branch B is helpful before studying Branch A
- **Multiple dependencies**: Branches with multiple incoming arrows require knowledge from several prerequisite areas
- **Foundation nodes**: Branches with few or no outgoing arrows represent advanced specializations

## Educational Context

### Course Scope

This high school physics course focuses primarily on:
- Classical Mechanics (foundation concepts)
- Basic Electromagnetism
- Wave phenomena and Sound (part of Acoustics)
- Light and Optics fundamentals
- Introductory electricity concepts

### Beyond This Course

Advanced topics shown in the graph but not covered in this course include:
- Quantum Mechanics and Quantum Field Theory
- Special and General Relativity
- Nuclear and Particle Physics
- Advanced mathematical frameworks
- Specialized applications (biophysics, astrophysics, condensed matter)

Understanding this broader landscape helps you see where foundational concepts lead and what branches of physics you might explore in college or future studies.

## Key Concepts

- **Disciplinary Structure**: Physics is organized hierarchically with foundational branches supporting specialized fields
- **Prerequisite Knowledge**: Advanced physics requires solid understanding of classical mechanics and electromagnetism
- **Interdisciplinary Nature**: Modern physics research often combines concepts from multiple branches
- **Historical Development**: The dependency structure roughly mirrors the historical development of physics (classical → quantum, etc.)

## Connection to Physics Learning

This dependency graph illustrates why physics curricula follow a specific sequence:

1. **Start with Classical Mechanics**: Understanding motion, forces, and energy provides the conceptual framework for all physics
2. **Add Electromagnetism**: Electricity and magnetism explain a vast range of phenomena and lead into modern physics
3. **Build Specialized Knowledge**: With these foundations, students can explore specialized branches based on interests

Throughout this course, you're building the foundational knowledge represented by the leftmost nodes in this graph.

## Further Exploration

Consider these questions:

1. Which branches of physics interest you most? What prerequisites would you need?
2. How many different paths connect Classical Mechanics to Astrophysics? What does this tell you about the complexity of cosmological phenomena?
3. Why does Biophysics depend on three major branches (Classical, Electromagnetic, and Quantum)? What aspects of living systems require each type of physics?

Use the interactive graph to trace these dependency paths and explore the relationships between different areas of physics.

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Identify the 11 major branches of physics and their primary focus areas
2. Explain why classical mechanics and electromagnetism serve as foundational prerequisites
3. Trace dependency paths between different physics branches
4. Recognize cross-disciplinary connections in modern physics research

### Target Audience

- High school physics students (grades 10-12)
- Students beginning undergraduate physics studies
- Anyone interested in understanding how physics is organized as a discipline

### Prerequisites

- Basic understanding of what physics studies
- Familiarity with terms like mechanics, electricity, and waves

### Activities

**Activity 1: Foundation Exploration (10 minutes)**

1. Click on "Classical Mechanics" and observe all branches that depend on it
2. Count how many direct and indirect dependencies exist
3. Discuss: Why is classical mechanics so fundamental?

**Activity 2: Path Tracing (15 minutes)**

1. Find the path from Classical Mechanics to Cosmology
2. Identify all prerequisite branches needed
3. Create a learning roadmap for someone interested in cosmology

**Activity 3: Cross-Disciplinary Analysis (10 minutes)**

1. Find branches that depend on multiple major areas (e.g., Quantum Optics)
2. Discuss why these fields require diverse knowledge
3. Research one cross-disciplinary field and present its applications

### Assessment

- **Formative**: Students sketch their own simplified dependency diagram from memory
- **Summative**: Written reflection on which physics branch interests them most and what prerequisites they would need to study

## References

1. [Physics Portal - Wikipedia](https://en.wikipedia.org/wiki/Portal:Physics) - Comprehensive overview of physics branches and their relationships

2. [vis-network Documentation](https://visjs.github.io/vis-network/docs/network/) - JavaScript library used for the interactive network visualization

3. [Branches of Physics - HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/hframe.html) - Georgia State University - Educational physics reference with branch organization

4. [The Structure of Scientific Disciplines](https://plato.stanford.edu/entries/physics-structuralism/) - Stanford Encyclopedia of Philosophy - Philosophical analysis of how physics is organized
