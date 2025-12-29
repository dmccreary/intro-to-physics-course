# Introduction to Physics

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/intro-to-physics-course/)
[![GitHub](https://img.shields.io/badge/GitHub-dmccreary%2Fintro--to--physics--course-blue?logo=github)](https://github.com/dmccreary/intro-to-physics-course/)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Claude Skills](https://img.shields.io/badge/Uses-Claude%20Skills-DA7857?logo=anthropic)](https://github.com/dmccreary/claude-skills)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?logo=p5.js&logoColor=white)](https://p5js.org/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## View the Live Site

Visit the interactive textbook at: [https://dmccreary.github.io/intro-to-physics-course/](https://dmccreary.github.io/intro-to-physics-course/)

## Overview

This is an AI-generated intelligent textbook for a comprehensive year-long high school physics course, designed for grades 10-12 students who have completed Algebra II and Geometry. Built using MkDocs with the Material theme, it incorporates a learning graph with concept dependencies, interactive MicroSims (p5.js simulations), and AI-assisted content generation structured on the Revised Bloom's Taxonomy (2001).

The course develops students' scientific literacy through systematic progression from foundational knowledge to creative application. Students master 200+ physics concepts across 12 taxonomies—from scientific foundations through kinematics, dynamics, energy, momentum, rotation, oscillations, waves, sound, light, optics, and electricity. The textbook uses concept dependency graphs to ensure proper prerequisite sequencing, making it a Level 2+ intelligent textbook with rich interactive elements.

Whether you're a student learning physics for the first time, an educator looking for structured course materials with hands-on lab activities, or a curriculum developer seeking AI-generated educational content, this textbook provides comprehensive coverage with interactive simulations that make complex concepts accessible and engaging. The course emphasizes real-world applications, problem-solving skills, and creative design challenges—transforming physics from abstract theory into an exciting exploration of how the universe works.

## Site Status and Metrics

| Metric | Count |
|--------|-------|
| **Concepts in Learning Graph** | 200 |
| **Quality Score** | 86/100 |
| **Chapters** | 13 |
| **Glossary Terms** | 389 |
| **FAQ Questions** | 158 |
| **Quiz Questions** | 123 |
| **MicroSims** | 98 |
| **Diagrams** | 118 |
| **Equations** | 765 |
| **Total Words** | 186,113 |
| **References** | 20 |
| **Equivalent Pages** | 822 |

**Completion Status:** Approximately 90% complete (content refinement phase)

**Visual Elements in Chapters:**

| Category | Count |
|----------|-------|
| Total Visual Elements | 116 |
| Diagrams | 29 |
| MicroSims (in chapters) | 68 |
| Easy Difficulty | 30 |
| Medium Difficulty | 19 |
| Hard Difficulty | 40 |
| Very Hard Difficulty | 27 |

**Learning Graph Characteristics:**
- Foundational concepts (no dependencies): 7
- Maximum dependency chain length: 17
- Average dependencies per concept: 1.48
- Connected as single directed acyclic graph (DAG)

**Chapter Metrics Summary:**

| Chapter | Name | Sections | Diagrams | Equations | Words |
|---------|------|----------|----------|-----------|-------|
| 1 | Scientific Foundations | 25 | 7 | 152 | 8,188 |
| 2 | Motion in One Dimension | 19 | 7 | 76 | 9,745 |
| 3 | Motion in Two Dimensions | 19 | 7 | 70 | 6,170 |
| 4 | Forces and Newton's Laws | 35 | 7 | 36 | 7,018 |
| 5 | Applications of Newton's Laws | 34 | 14 | 82 | 11,199 |
| 6 | Work, Energy, and Power | 44 | 9 | 105 | 9,454 |
| 7 | Momentum and Collisions | 43 | 7 | 51 | 6,670 |
| 8 | Rotational Motion | 47 | 10 | 29 | 8,669 |
| 9 | Oscillations | 46 | 11 | 0 | 8,340 |
| 10 | Waves and Sound | 46 | 11 | 25 | 9,506 |
| 11 | Light and Optics | 48 | 9 | 0 | 9,882 |
| 12 | Electric Charge and Fields | 44 | 7 | 18 | 7,631 |
| 13 | Electric Circuits | 50 | 12 | 21 | 9,118 |

## Key Features

**Structured Learning Progression**
- 200 physics concepts organized in a dependency graph ensuring prerequisites are met
- 12 taxonomic categories covering classical mechanics through electricity
- Bloom's Taxonomy alignment from remembering to creating
- Clear learning paths from foundational concepts to advanced applications

**Interactive MicroSims (98 simulations)**
- Standalone p5.js simulations for hands-on exploration
- Interactive Learning Graph Viewer with search and filtering
- Projectile Motion Simulator with customizable parameters
- Collision and momentum visualizers
- Wave and sound demonstrations
- Electric field and circuit simulators

**Comprehensive Educational Resources**
- ISO 11179-compliant glossary with 389 precise definitions
- 158 frequently asked questions addressing common student queries
- 123 quiz questions with multiple choice assessment
- 20 curated references for further study
- Quality metrics and validation reports for learning graph

**Modern Web Experience**
- Responsive Material Design theme
- Full-text search across all content
- LaTeX equation rendering (765 equations)
- Code syntax highlighting
- Navigation breadcrumbs and table of contents
- Mobile-friendly interface

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/dmccreary/intro-to-physics-course.git
cd intro-to-physics-course
```

### Install Dependencies

This project uses MkDocs with the Material theme. Install using pip:

```bash
pip install mkdocs
pip install mkdocs-material
```

Or using conda:

```bash
conda create -n mkdocs python=3
conda activate mkdocs
pip install mkdocs "mkdocs-material[imaging]"
```

**Note for macOS users:** If using social card generation features, install required libraries:

```bash
brew install cairo freetype libffi libjpeg libpng zlib
export DYLD_FALLBACK_LIBRARY_PATH=/opt/homebrew/lib
```

Add the export command to your `~/.zshrc` file for persistence.

### Build and Serve Locally

**Build the site:**

```bash
mkdocs build
```

This generates static HTML files in the `site/` directory.

**Serve locally for development:**

```bash
mkdocs serve
```

Open your browser to `http://localhost:8000`. The development server includes live reload—changes to markdown files automatically refresh your browser.

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

This builds the site and pushes it to the `gh-pages` branch. Note: This does NOT commit source files—use git separately to manage your markdown content.

### Using the Textbook

**Navigation:**
- Use the left sidebar to browse chapters sequentially
- Click the search icon (magnifying glass) to search across all content
- Each chapter includes clear learning objectives and concept connections
- Review the Learning Graph to understand concept dependencies

**Interactive MicroSims:**
- Found under the "MicroSims" section in the navigation
- Each simulation runs standalone in your browser (no installation required)
- Adjust parameters with sliders and interactive controls
- Explore the Learning Graph Viewer to visualize concept relationships

**Customization:**
- Edit markdown files in `docs/` to modify content
- Modify `mkdocs.yml` to change site structure and navigation
- Add your own MicroSims in `docs/sims/` following the existing pattern
- Customize theme colors and fonts in `docs/css/extra.css`
- Update the learning graph in `docs/learning-graph/learning-graph.json`

## Repository Structure

```
intro-to-physics-course/
├── docs/                                  # MkDocs documentation source
│   ├── chapters/                          # Chapter content (13 chapters)
│   │   ├── index.md                       # Chapter overview
│   │   ├── 01-scientific-foundations/
│   │   │   ├── index.md                   # Chapter markdown content
│   │   │   └── quiz.md                    # Chapter quiz
│   │   ├── 02-motion-one-dimension/
│   │   └── ...
│   ├── sims/                              # Interactive p5.js MicroSims (98)
│   │   ├── graph-viewer/                  # Interactive learning graph
│   │   ├── projectile-motion/
│   │   ├── collisions/
│   │   └── ...
│   ├── learning-graph/                    # Learning graph data and analysis
│   │   ├── learning-graph.json            # Concept dependencies (vis-network)
│   │   ├── concept-list.md                # Complete list of 200 concepts
│   │   ├── book-metrics.md                # Site metrics report
│   │   ├── chapter-metrics.md             # Per-chapter metrics
│   │   ├── list-equations.md              # All 765 equations
│   │   └── *.py                           # Python analysis scripts
│   ├── prompts/                           # AI generation prompts
│   ├── glossary.md                        # 389 ISO 11179-compliant definitions
│   ├── faq.md                             # 158 frequently asked questions
│   ├── references.md                      # 20 curated educational resources
│   ├── course-description.md              # Complete course specification
│   └── index.md                           # Site homepage
├── .claude/skills/                        # Claude AI skills for content generation
├── mkdocs.yml                             # MkDocs site configuration
├── CLAUDE.md                              # Instructions for Claude Code
└── README.md                              # This file
```

## Course Content

### Physics Topics Covered

**Foundation** (20 concepts): Scientific method, measurement, SI units, vectors, dimensional analysis, error analysis, graphical analysis, trigonometry for physics

**Kinematics** (17 concepts): Displacement, velocity, acceleration, motion graphs, kinematic equations, free fall, projectile motion, relative velocity

**Dynamics** (23 concepts): Force, Newton's Laws, friction, weight, tension, normal force, inclined planes, pulleys, centripetal force, equilibrium

**Energy** (20 concepts): Work, kinetic and potential energy, conservation of energy, power, efficiency, simple machines, mechanical advantage

**Momentum** (10 concepts): Linear momentum, impulse, conservation of momentum, elastic and inelastic collisions, center of mass

**Rotation** (10 concepts): Angular displacement, velocity, acceleration, torque, rotational inertia, angular momentum, rolling motion

**Oscillations** (13 concepts): Simple harmonic motion, restoring force, amplitude, period, frequency, Hooke's Law, pendulums, resonance

**Waves** (19 concepts): Mechanical waves, transverse and longitudinal waves, wavelength, frequency, wave speed, interference, standing waves, Doppler effect

**Sound** (11 concepts): Sound waves, speed of sound, intensity, decibel scale, pitch, ultrasound, beats, harmonics, acoustic resonance

**Light** (5 concepts): Light waves, electromagnetic spectrum, visible spectrum, speed of light, luminous intensity

**Optics** (32 concepts): Reflection, mirrors, refraction, Snell's Law, lenses, focal length, magnification, ray diagrams, diffraction, polarization

**Electricity** (20 concepts): Electric charge, Coulomb's Law, electric field, electric potential, voltage, conductors, insulators, charging methods

**Electric Circuits** (10 concepts): Current, Ohm's Law, capacitors, inductors, power, batteries, solar cells, motors

### Concepts NOT Covered

- Quantum Mechanics
- Atomic Physics
- Solid State Physics
- Digital Electronics
- Circuit Analysis (beyond basic concepts)

### Bloom's Taxonomy Alignment

The course progressively develops cognitive skills:

- **Remembering (10%)**: Fundamental quantities, units, laws, constants
- **Understanding (15%)**: Explaining phenomena, interpreting graphs, classifying forces
- **Applying (30%)**: Multi-step calculations, conducting experiments, using problem-solving frameworks
- **Analyzing (20%)**: Force analysis, energy tracking, error analysis, pattern recognition
- **Evaluating (15%)**: Critiquing experimental designs, assessing solutions, defending conclusions
- **Creating (10%)**: Designing experiments, proposing solutions, developing demonstrations

## Learning Graph

The learning graph is a directed acyclic graph (DAG) representing prerequisite relationships between 200 physics concepts. Each concept is a node, and directed edges show which concepts must be learned before others.

**Key Characteristics:**
- 7 foundational concepts with no prerequisites (Scientific Method, Trigonometry for Physics, etc.)
- Maximum learning path of 17 concepts (Scientific Method → ... → Critical Angle)
- Single connected component (all concepts reachable)
- Average 1.48 dependencies per concept

**Visualization:**
Visit the [Interactive Learning Graph Viewer](https://dmccreary.github.io/intro-to-physics-course/sims/graph-viewer/) to explore concept relationships with search, filtering, and zoom capabilities.

**Analysis Tools:**
Python scripts in `docs/learning-graph/` validate DAG structure, identify cycles, calculate dependency chains, and generate quality metrics reports.

## Development Workflow

### Working with Learning Graphs

1. **Always validate after edits**: Run `analyze-graph.py` to ensure DAG structure remains valid
2. **Maintain concept IDs**: IDs are referenced across multiple files—coordinate updates carefully
3. **Respect dependencies**: Dependencies flow from prerequisites to dependent concepts
4. **Balance taxonomy**: Keep categories between 3.5%-14.5% of total concepts

### Adding New MicroSims

1. Create directory under `docs/sims/<sim-name>/`
2. Include `main.html` as the primary simulation file
3. Add `index.md` with iframe embedding and documentation
4. Update `mkdocs.yml` navigation structure
5. Use p5.js or vis-network libraries for visualizations

### Git Workflow

Standard git workflow for source files:

```bash
git add <files>
git commit -m "description"
git push
```

Suppress warnings about ignored files (optional):

```bash
git config advice.addIgnoredFile false
```

## Reporting Issues

Found a bug, typo, or have a suggestion for improvement? Please report it on GitHub:

[**Create an Issue**](https://github.com/dmccreary/intro-to-physics-course/issues)

When reporting issues, please include:

- **Description**: Clear explanation of the problem or suggestion
- **Location**: Chapter, section, or file affected
- **Steps to reproduce**: For bugs, provide detailed steps
- **Expected vs actual**: What should happen vs. what actually happens
- **Screenshots**: Visual evidence if applicable (especially for MicroSims)
- **Environment**: Browser and device details for simulation issues

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- **Share** — Copy and redistribute the material in any medium or format
- **Adapt** — Remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original repository
- **NonCommercial** — No commercial use without explicit permission
- **ShareAlike** — Distribute contributions under the same license

For educational institutions, individual teachers, and students: this textbook is free to use, adapt, and share for non-commercial educational purposes. If you'd like to use this content commercially, please contact the author.

See [LICENSE](docs/license.md) for full details.

## Acknowledgements

This project stands on the shoulders of giants in the open source and educational technology communities:

**Core Technologies:**
- **[MkDocs](https://www.mkdocs.org/)** - Static site generator optimized for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - Beautiful, responsive theme with advanced features
- **[Python](https://www.python.org/)** - Data processing, graph analysis, and build automation
- **[GitHub Pages](https://pages.github.com/)** - Free hosting for open source educational projects

**Interactive Elements:**
- **[p5.js](https://p5js.org/)** - Creative coding library from NYU ITP for educational simulations
- **[vis-network](https://visjs.org/)** - Network visualization library for learning graph exploration
- **[Mermaid](https://mermaid.js.org/)** - Diagram and flowchart generation
- **[MathJax](https://www.mathjax.org/)** - LaTeX equation rendering

**AI-Assisted Development:**
- **[Claude AI](https://claude.ai)** by Anthropic - AI-assisted content generation and quality assurance
- **[Claude Code](https://claude.ai/code)** - Development environment for educational content creation
- **[Claude Skills](https://github.com/dmccreary/claude-skills)** - Reusable AI skills for intelligent textbook development

**Inspiration and Resources:**
Special thanks to the educators, physicists, and developers who contribute to making quality physics education accessible and engaging. This project draws inspiration from open educational resources (OER) movements, the Physics Education Research community, and innovative uses of technology in STEM education.

## Contact

**Dan McCreary**

- **LinkedIn**: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- **GitHub**: [@dmccreary](https://github.com/dmccreary)

Questions, suggestions, or collaboration opportunities? Feel free to connect on LinkedIn or open an issue on GitHub. I'm particularly interested in hearing from:

- Teachers using this textbook in their classrooms
- Students who have feedback on content clarity or MicroSim usefulness
- Developers interested in contributing new interactive simulations
- Education researchers studying AI-generated educational materials
- Curriculum specialists exploring intelligent textbook design

## How to Cite

If you use this textbook in your research, teaching, or curriculum development, please cite it as:

```
McCreary, Dan. (2025). Introduction to Physics: An AI-Generated Intelligent Textbook.
GitHub. https://github.com/dmccreary/intro-to-physics-course
```

**BibTeX:**

```bibtex
@misc{mccreary-physics-2025,
  author = {McCreary, Dan},
  title = {Introduction to Physics: An AI-Generated Intelligent Textbook},
  year = {2025},
  publisher = {GitHub},
  url = {https://github.com/dmccreary/intro-to-physics-course},
  note = {Built with MkDocs Material, p5.js, and Claude AI}
}
```

---

**Built with MkDocs Material, p5.js, and Claude AI** | **Structured on Bloom's Taxonomy** | **200 Concepts, 13 Chapters, 98 MicroSims**
