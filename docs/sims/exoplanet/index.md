---
title: Exoplanet Transit Detection
description: Interactive simulation demonstrating how astronomers detect exoplanets using the transit method, showing brightness dips as a planet passes in front of its star.
image: /sims/exoplanet/exoplanet.png
og:image: /sims/exoplanet/exoplanet.png
quality_score: 90
---

# Exoplanet Transit Detection

<iframe src="main.html" width="100%" height="500px" scrolling="no"></iframe>

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/exoplanet/main.html" width="100%" height="500px"></iframe>
```

[Run the Exoplanet Transit Detection MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }
[Edit the Exoplanet Transit Detection MicroSim Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/kYFkLMXgi)

## Description

This MicroSim demonstrates the **transit method** for detecting exoplanets—the primary technique used by NASA's Kepler and TESS missions to discover thousands of planets orbiting other stars.

### How the Transit Method Works

When a planet passes in front of (transits) its host star from our perspective, it blocks a small fraction of the star's light. By measuring this periodic dimming, astronomers can:

1. **Detect the planet's presence** from the periodic brightness dips
2. **Calculate the planet's size** from the depth of the dimming
3. **Determine the orbital period** from the time between transits

### Simulation Components

The simulation is divided into three sections:

#### Star View (Top)

- **Yellow star** at center with realistic glow effect
- **Dark planet** orbiting in an edge-on configuration
- **Orbital path** shown as dotted ellipse
- **Transit status** indicator showing when the planet is transiting

#### Light Curve Graph (Middle)

- **Real-time brightness** plotted over time
- **Y-axis**: Relative brightness (1.00 = full brightness)
- **Characteristic dip** when planet transits the star
- **Current brightness** marked with red dot

#### Controls (Bottom)

| Control | Range | Effect |
|---------|-------|--------|
| Planet Size | 5-30% of star | Larger planets create deeper transit dips |
| Orbital Period | 2-15 seconds | Faster orbits show more frequent transits |

### Physics Concepts Demonstrated

1. **Transit Depth Formula**: The fractional brightness decrease equals the ratio of areas:

   $$\text{Transit Depth} = \left(\frac{R_{\text{planet}}}{R_{\text{star}}}\right)^2$$

2. **Light Curve Analysis**: The shape of the brightness dip reveals:
   - Planet size (depth of dip)
   - Orbital inclination (shape of ingress/egress)
   - Orbital period (time between dips)

3. **Detection Limits**:
   - Jupiter-sized planets (~10% of Sun) create ~1% dips (easily detectable)
   - Earth-sized planets (~1% of Sun) create ~0.01% dips (requires precise instruments)

### Real-World Applications

- **Kepler Mission** (2009-2018): Discovered 2,700+ confirmed exoplanets
- **TESS Mission** (2018-present): Surveying the entire sky for nearby transiting planets
- **James Webb Space Telescope**: Studies atmospheres of transiting exoplanets

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Explain how the transit method detects exoplanets
2. Calculate expected transit depth from planet/star radius ratio
3. Interpret light curve data to determine planetary properties
4. Discuss the limitations of the transit method

### Grade Level

High School Physics/Astronomy (Grades 10-12)

### Prerequisites

- Understanding of light and brightness
- Basic geometry (area of circles)
- Familiarity with graphs and data interpretation

### Duration

45-60 minutes

### Activities

#### Activity 1: Transit Depth Investigation (15 min)

1. Set planet size to 10% and observe the transit depth
2. Predict what the transit depth would be for a 20% planet (should be 4× deeper)
3. Test your prediction by adjusting the slider
4. Record: Planet Size vs Transit Depth for 5%, 10%, 15%, 20%, 25%

#### Activity 2: Light Curve Analysis (15 min)

1. Observe the shape of the light curve during transit
2. Identify: ingress (planet entering), full transit, egress (planet exiting)
3. Measure the duration of the flat bottom of the transit
4. How does orbital period affect the light curve appearance?

#### Activity 3: Exoplanet Detective (15 min)

Given only a light curve with:

- Transit depth of 1%
- Orbital period of 10 seconds

Calculate:

1. What fraction of the star does the planet cover?
2. If the star is Sun-sized (696,340 km radius), what is the planet's radius?
3. How does this compare to Jupiter (69,911 km) or Earth (6,371 km)?

### Discussion Questions

1. Why can we only detect exoplanets whose orbits are edge-on to us?
2. What percentage of planetary systems would we miss due to orbital inclination?
3. How would a planet with rings (like Saturn) affect the light curve?
4. Why is the transit method better for finding large planets close to their stars?

### Assessment

- Students calculate transit depth from radius measurements
- Students sketch expected light curves for different scenarios
- Students explain why Kepler discovered mostly "hot Jupiters"

## Usability Features

This simulation was designed with the following usability principles:

1. **Clear Visual Hierarchy**: Star view on top, light curve below, controls at bottom
2. **Real-Time Feedback**: Light curve updates continuously as planet orbits
3. **Labeled Controls**: Each slider shows its current value and physical meaning
4. **Status Indicators**: Transit detection shown with text and visual highlighting
5. **Educational Annotations**: Transit depth percentage calculated and displayed
6. **Space Theme**: Dark background appropriate for astronomy content

## References

1. [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/) - NASA - Database of all confirmed exoplanets
2. [Kepler Mission](https://www.nasa.gov/mission_pages/kepler/main/index.html) - NASA - The spacecraft that revolutionized exoplanet discovery
3. [TESS Mission](https://tess.mit.edu/) - MIT/NASA - Current all-sky exoplanet survey
4. [Transit Photometry](https://en.wikipedia.org/wiki/Transit_photometry) - Wikipedia - Detailed explanation of the transit detection method
5. [Exoplanet Detection Methods](https://exoplanets.nasa.gov/alien-worlds/ways-to-find-a-planet/) - NASA - Overview of all exoplanet detection techniques
