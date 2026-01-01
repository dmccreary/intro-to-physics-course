# Update Quality Scores and Screenshots Session Log

**Date:** 2024-12-31

## Summary

This session focused on improving the MicroSim similarity visualization tool and ensuring all MicroSims have screenshots for the index page.

## Tasks Completed

### 1. Fixed Plotly Interactive Visualization

Updated `src/similar-microsims/plot_similarity_interactive.py`:
- Changed from fixed width (1200px) to `autosize=True` for full-screen display
- Improved hover infobox contrast:
  - Increased font size from 11px to 14px
  - Changed to solid white background with dark (#333) border
  - Added explicit dark text color (#111)
  - Changed from monospace to Arial font for better readability
- Improved statistics box with larger font (13px) and better contrast
- Enhanced legend with darker border

### 2. Created Quality Score Calculator

Created `src/similar-microsims/calculate_quality_scores.py` - a new script that:
- Scans all MicroSim directories
- Evaluates each against the 100-point standardization rubric
- Updates `index.md` files with calculated `quality_score` in YAML frontmatter

**Quality Score Rubric (100 points total):**

| Criterion | Points |
|-----------|--------|
| Title in index.md (level 1 header) | 2 |
| main.html present | 10 |
| YAML metadata (title & description) | 3 |
| Social preview images in YAML | 5 |
| metadata.json present | 10 |
| metadata.json valid (Dublin Core) | 20 |
| iframe with src="main.html" | 10 |
| Fullscreen link button | 5 |
| Copy-paste iframe example | 5 |
| Screenshot image present | 5 |
| Overview/Description section | 5 |
| Lesson Plan section | 10 |
| References section | 5 |
| Type-specific (p5.js editor link) | 5 |

**Usage:**
```bash
python calculate_quality_scores.py --dry-run   # Preview changes
python calculate_quality_scores.py             # Apply updates
python calculate_quality_scores.py --verbose   # Show detailed breakdown
python calculate_quality_scores.py --only-missing  # Only update missing scores
```

### 3. Captured Missing Screenshots

Used `bk-capture-screenshot` to generate PNG images for 56 MicroSims that were missing screenshots:

- figure-skater-spin
- force-time-impulse
- free-body-diagram
- free-fall
- friction-coefficient-chart
- graph-viewer
- gravitational-attractor
- horizontal-projection
- inclined-plane-forces
- inclined-plane-motion
- inertia-demo
- kinematic-selector
- law-of-reflection
- longitudinal-wave
- metric-scale-zoom
- microscopic-surface-contact
- momentum-comparison
- multistage-rocket
- newtons-second-law
- normal-force-incline
- ohms-law
- oscillation-applications
- pendulum-comparison
- period-frequency-relationship
- position-time-analyzer
- potential-energy-chart
- projectile-motion
- pulley-mechanical-advantage
- relative-velocity
- resonance-graph
- rocket-propulsion
- roller-coaster-energy
- rolling-energy-distribution
- rolling-velocity-vectors
- rotational-applications
- rotational-inertia-race
- rotational-kinematics-solver
- scientific-method
- series-parallel
- shm-energy
- shm-motion-graphs
- snells-law
- standing-waves
- static-friction
- tacoma-narrows-timeline
- tension-force-diagram
- three-graph-analyzer
- torque-diagram
- transverse-wave
- uniform-accelerated-motion
- vector-addition
- vector-basics
- vector-components
- velocity-speed-comparison
- velocity-time-area
- wave-interference
- weight-gravity
- work-energy-theorem
- work-scenarios

### 4. Updated Index Page with Image Links

Updated `docs/sims/index.md` to add image links for all 58 MicroSim entries that were missing them.

Each card entry now has consistent formatting:
```markdown
- **[MicroSim Title](./sim-name/index.md)**

    ![MicroSim Title](./sim-name/sim-name.png)
    Description of the MicroSim.
```

## Files Modified

- `src/similar-microsims/plot_similarity_interactive.py` - Layout and hover improvements
- `src/similar-microsims/calculate_quality_scores.py` - New file
- `src/similar-microsims/README.md` - Added documentation for new script
- `docs/sims/index.md` - Added 58 image links
- `docs/sims/*/` - 56 new PNG screenshot files created

## Notes

- Two directories remain without screenshots but are not in the main index:
  - `graph-viewer-v1` (duplicate/old version)
  - `wave-properties` (not listed in index)

- The quality score calculator reads the standardization rubric from the microsim-utils skill at `~/.claude/skills/microsim-utils/references/standardization.md`

- Circle size in the similarity plot represents quality score (larger = higher quality)
