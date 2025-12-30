# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an intelligent textbook project for a high-school physics course built with MkDocs Material. The project uses AI-generated learning graphs to create structured educational content based on Bloom's Taxonomy (2001). The course covers 200+ physics concepts organized into 12 taxonomies (Foundation, Kinematics, Dynamics, Energy, Momentum, Rotation, Oscillations, Waves, Sound, Light, Optics, and Electricity).

## Core Architecture

### Learning Graph System

The centerpiece is a **learning graph** - a directed acyclic graph (DAG) representing concept dependencies:

- **Structure**: Concepts are nodes, dependencies are directed edges
- **Format**: Stored as JSON (`docs/learning-graph/learning-graph.json`) using vis-network schema with `nodes`, `edges`, `groups`, and `metadata`
- **Taxonomy**: Each concept belongs to one of 12 categories with color coding for visualization
- **Foundation**: Prerequisite concepts (no dependencies) appear at the left; advanced concepts requiring multiple prerequisites at the right

### Key Files & Directories

- `docs/course-description.md` - Source document defining course scope, concepts, and Bloom's Taxonomy alignment (quality_score: 86)
- `docs/learning-graph/learning-graph.json` - Complete concept dependency graph in vis-network format
- `docs/learning-graph/*.py` - Python utilities for graph analysis and validation
- `docs/sims/` - MicroSims (interactive educational simulations), each in its own directory with `main.html` and supporting files
- `mkdocs.yml` - Site configuration with navigation structure

### Python Analysis Scripts

Located in `docs/learning-graph/`:

- `analyze-graph.py` - Validates DAG structure, finds cycles, calculates dependency chains, identifies orphaned nodes, generates quality metrics report
- `csv-to-json.py` - Converts CSV dependency data to vis-network JSON format
- `add-taxonomy.py` - Assigns taxonomy categories to concepts
- `taxonomy-distribution.py` - Analyzes concept distribution across taxonomies

Usage: `python3 analyze-graph.py learning-graph.csv quality-metrics.md`

## Development Commands

### Environment Setup

The project uses conda with mkdocs and Material theme:

```sh
conda activate mkdocs
# If environment doesn't exist:
conda create -n mkdocs python=3
conda activate mkdocs
pip install mkdocs "mkdocs-material[imaging]"
```

### MkDocs Commands

```sh
# Build the site (outputs to site/ directory)
mkdocs build

# Run local development server at http://localhost:8000
mkdocs serve

# Deploy to GitHub Pages (does NOT commit source files)
mkdocs gh-deploy
```

### Git Workflow

Standard git workflow applies. After making changes:

```sh
git add <files>
git commit -m "description"
git push
```

Note: Run `git config advice.addIgnoredFile false` to suppress warnings about ignored files.

## Development Guidelines

### When Working with Learning Graphs

1. **Always validate after edits**: Run `analyze-graph.py` to ensure DAG structure remains valid (no cycles)
2. **Maintain concept IDs**: IDs are referenced across multiple files; changing IDs requires coordinated updates
3. **Respect dependencies**: Dependencies flow from prerequisites to dependent concepts (edge direction matters)
4. **Balance taxonomy**: Keep categories between 3.5%-14.5% of total concepts; no category should exceed 30%

### When Adding MicroSims

1. Create new directory under `docs/sims/<sim-name>/`
2. Include `main.html` as the primary simulation file
3. Add `index.md` with iframe embedding: `<iframe src="main.html" width="100%" height="600px"></iframe>`
4. Use vis-network or p5.js libraries as appropriate for visualizations
5. Update `mkdocs.yml` navigation structure

### Content Organization

- **Prerequisites**: Algebra II, Geometry (grades 10-12)
- **Content structure**: Follows Bloom's Taxonomy progression (Remembering → Understanding → Applying → Analyzing → Evaluating → Creating)
- **Concepts not covered**: Quantum Mechanics, Atomic Physics, Solid State Physics, Digital Electronics, Circuits
- **License**: Creative Commons ShareAlike Attribution Noncommercial (CC BY-NC-SA 4.0)

## Technical Notes

### Material Theme Configuration

The site uses Material theme with:
- Code copy enabled (`content.code.copy`)
- Navigation features: expand, path, prune, indexes, follow, top, footer
- Social card generation (requires brew libraries on macOS: `cairo freetype libffi libjpeg libpng zlib`)
- Custom CSS at `docs/css/extra.css`

### macOS Image Library Setup

If using social card features:
```sh
brew install cairo freetype libffi libjpeg libpng zlib
export DYLD_FALLBACK_LIBRARY_PATH=/opt/homebrew/lib  # Add to ~/.zshrc
```

### Skills Available

The project includes several Claude Code skills for intelligent textbook development (see `.claude/skills/`):
- `learning-graph-generator` - Generates learning graphs from course descriptions
- `course-description-analyzer` - Validates course descriptions for completeness
- `chapter-content-generator` - Generates chapter content from concept lists
- `glossary-generator` - Creates ISO 11179-compliant glossaries
- `quiz-generator` - Builds Bloom-aligned quizzes
- Various MicroSim generators (p5.js, vis-network, mermaid, timeline, venn diagrams, bubble charts)

Use skills when appropriate via the Skill tool.

## Automatically Notify the Parent of the iframe height

Add the following line to the end of the setup() function

```js
// notify parent frame of initial size so we don't have to modify the height is each iframe 
    // Requires add addition to the js/extra.js file to listen for the message
    window.parent.postMessage({ type: 'microsim-resize', height: canvasHeight }, '*');
```

This allows you to not have to maintain the height parameter in each iframe reference.
