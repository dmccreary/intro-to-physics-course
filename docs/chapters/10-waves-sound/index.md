# Waves and Sound

## Summary

This chapter explores mechanical waves—disturbances that propagate through a medium, transferring energy without transferring matter. You'll distinguish between transverse waves (where particles oscillate perpendicular to wave motion) and longitudinal waves (where particles oscillate parallel to wave motion), and characterize waves using wavelength, frequency, period, and wave speed. Wave interference creates constructive and destructive patterns explained by the superposition principle, and reflection leads to standing waves with nodes and antinodes. Waves also exhibit refraction (bending when changing media) and diffraction (spreading around obstacles). The Doppler effect describes frequency shifts for moving sources or observers. Sound waves exemplify all these principles, with additional properties including intensity measured in decibels, pitch related to frequency, and phenomena like beats, harmonics, and acoustic resonance that shape the music and sounds around us.

## Concepts Covered

This chapter covers the following 30 concepts from the learning graph:

1. Mechanical Waves
2. Transverse Waves
3. Longitudinal Waves
4. Wave Properties
5. Wavelength
6. Wave Frequency
7. Wave Period
8. Wave Speed
9. Wave Interference
10. Constructive Interference
11. Destructive Interference
12. Superposition Principle
13. Standing Waves
14. Nodes and Antinodes
15. Wave Reflection
16. Wave Refraction
17. Wave Diffraction
18. Doppler Effect
19. Shock Waves
20. Sound Waves
21. Speed of Sound
22. Sound Intensity
23. Decibel Scale
24. Pitch
25. Loudness
26. Ultrasound
27. Infrasound
28. Beats
29. Harmonics
30. Acoustic Resonance

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Scientific Foundations and Mathematical Tools](../01-scientific-foundations/index.md)
- [Chapter 2: Motion in One Dimension](../02-motion-one-dimension/index.md)
- [Chapter 3: Motion in Two Dimensions](../03-motion-two-dimensions/index.md)
- [Chapter 6: Work, Energy, and Power](../06-work-energy-power/index.md)
- [Chapter 9: Oscillations and Periodic Motion](../09-oscillations/index.md)

---

## Introduction to Waves

Have you ever watched ripples spread across a pond after tossing in a pebble? Or felt the bass thump of music resonate in your chest at a concert? These experiences reveal one of nature's most fundamental phenomena: waves. Waves are the universe's way of transmitting energy from one place to another without permanently moving matter along with it. From the sound waves that let you hear your favorite song to the seismic waves that shake the earth during an earthquake, waves are everywhere in our physical world.

In this chapter, we'll explore mechanical waves—disturbances that travel through a medium, carrying energy but not matter. We'll discover how waves can be characterized by their wavelength, frequency, and speed, and how they interact through interference to create complex patterns. You'll learn why some sounds are higher-pitched than others, why ambulance sirens change pitch as they pass you, and how musical instruments create the rich harmonies that make music beautiful.

## What Are Mechanical Waves?

**Mechanical waves** are disturbances that propagate through a material medium, transferring energy from one location to another without permanently transporting the medium itself. Unlike electromagnetic waves (such as light) that can travel through a vacuum, mechanical waves require a substance—solid, liquid, or gas—to carry them forward.

Think of doing "the wave" at a sports stadium. Each person stands up and sits down in sequence, creating a moving pattern around the arena. The people themselves don't travel around the stadium; they simply move up and down in place. Yet the wave pattern moves through the crowd, transferring the energy of motion from section to section. This is exactly how mechanical waves work in physical media.

Common examples of mechanical waves include:

- Water waves on the ocean surface
- Sound waves traveling through air
- Seismic waves propagating through the Earth
- Waves on a stretched string or rope
- Pressure waves in fluids

The key characteristics that all mechanical waves share are:

1. They require a medium to travel through
2. They transport energy without permanently transporting matter
3. They involve the oscillation or vibration of particles in the medium
4. Their speed depends on the properties of the medium

## Types of Mechanical Waves: Transverse and Longitudinal

Mechanical waves come in two fundamental varieties, distinguished by how particles in the medium move relative to the direction of wave propagation.

### Transverse Waves

In **transverse waves**, particles of the medium oscillate perpendicular (at right angles) to the direction the wave travels. Imagine shaking one end of a rope up and down while your friend holds the other end. The wave pulse travels horizontally along the rope, but each point on the rope moves vertically up and down.

Key features of transverse waves:

- Particle motion is perpendicular to wave direction
- Can be visualized as having "peaks" (crests) and "valleys" (troughs)
- Typically travel through solids (which resist shear forces)
- Examples: waves on strings, water surface waves, electromagnetic waves

#### Diagram: Transverse Wave Animation MicroSim

<iframe src="../../sims/transverse-wave/main.html" height="502px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Transverse Wave Animation MicroSim</summary>
    **Status:** done
    Type: microsim

    Learning objective: Demonstrate how particles in a transverse wave move perpendicular to wave propagation direction

    Canvas layout (800x500px):
    - Top section (800x300): Drawing area showing wave propagation
    - Bottom section (800x200): Control panel

    Visual elements:
    - 50 particles (small circles) arranged in a horizontal line
    - Each particle connected to neighbors with light lines
    - Wave pulse traveling left to right
    - Particles oscillating up and down as wave passes
    - Reference grid showing horizontal wave direction
    - Arrows indicating particle motion direction

    Interactive controls:
    - Slider: Wave amplitude (5-50 pixels)
    - Slider: Wave speed (1-10 pixels per frame)
    - Slider: Wavelength (50-200 pixels)
    - Button: "Send Pulse"
    - Button: "Reset"
    - Checkbox: "Show particle paths"

    Default parameters:
    - Amplitude: 30 pixels
    - Wave speed: 3 pixels/frame
    - Wavelength: 100 pixels

    Behavior:
    - When "Send Pulse" clicked, create sine wave pulse traveling across particles
    - Each particle oscillates vertically (perpendicular to wave motion)
    - If "Show particle paths" checked, trace dotted vertical lines showing particle motion
    - Particles return to rest position after wave passes
    - Display labels: "Wave Direction →" and "Particle Motion ↕"

    Implementation notes:
    - Use p5.js for rendering
    - Calculate particle y-position using sine function: y = amplitude × sin(2π(x - vt)/λ)
    - Use frameCount for animation timing
    - Color particles: blue at rest, green when moving up, red when moving down
</details>

### Longitudinal Waves

In **longitudinal waves**, particles oscillate parallel to (in the same direction as) the wave travels. Sound waves are the most familiar example. When a speaker cone pushes forward, it compresses the air molecules in front of it; when it pulls back, it creates a region of lower pressure (rarefaction). These compressions and rarefactions travel through the air as a longitudinal wave.

Key features of longitudinal waves:

- Particle motion is parallel to wave direction
- Consist of alternating compressions (high pressure) and rarefactions (low pressure)
- Can travel through solids, liquids, and gases
- Examples: sound waves, seismic P-waves, compression waves in springs

#### Diagram: Longitudinal Wave Animation MicroSim

<iframe src="../../sims/longitudinal-wave/main.html" height="502px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Longitudinal Wave Animation MicroSim</summary>
    **Status:** done
    Type: microsim

    Learning objective: Demonstrate how particles in a longitudinal wave move parallel to wave propagation direction, creating compressions and rarefactions

    Canvas layout (800x500px):
    - Top section (800x250): Drawing area showing particle motion
    - Middle section (800x100): Density graph representation
    - Bottom section (800x150): Control panel

    Visual elements:
    - 60 particles (small circles) arranged horizontally with equal spacing at rest
    - Particles move left-right as wave passes through
    - Compression regions (particles closer together) shown in blue shading
    - Rarefaction regions (particles farther apart) shown in red shading
    - Density graph below shows particle concentration vs position
    - Reference arrow showing wave propagation direction

    Interactive controls:
    - Slider: Wave amplitude (1-10 pixels)
    - Slider: Wave speed (1-8 pixels per frame)
    - Slider: Wavelength (80-200 pixels)
    - Button: "Start Continuous Wave"
    - Button: "Stop"
    - Button: "Reset"
    - Checkbox: "Show density graph"

    Default parameters:
    - Amplitude: 5 pixels
    - Wave speed: 3 pixels/frame
    - Wavelength: 120 pixels

    Behavior:
    - When "Start Continuous Wave" clicked, continuous sine wave travels left to right
    - Each particle oscillates horizontally (parallel to wave motion)
    - Particles bunch together in compressions (high density)
    - Particles spread apart in rarefactions (low density)
    - Density graph shows wave pattern as traditional sine wave
    - Color particles by velocity: blue when moving right, red when moving left
    - Display labels: "Wave Direction →" and "Particle Motion ↔"

    Implementation notes:
    - Use p5.js for rendering
    - Calculate particle x-displacement: Δx = amplitude × sin(2π(x - vt)/λ)
    - Particle spacing indicates compression/rarefaction
    - Use gradient shading for compression/rarefaction regions
    - Density graph plots particle density as sine wave for visual comparison
</details>

### Comparing Transverse and Longitudinal Waves

| Property | Transverse Waves | Longitudinal Waves |
|----------|------------------|-------------------|
| Particle motion | Perpendicular to wave direction | Parallel to wave direction |
| Can travel through solids | Yes | Yes |
| Can travel through liquids | Surface waves only | Yes |
| Can travel through gases | No | Yes |
| Visual pattern | Crests and troughs | Compressions and rarefactions |
| Examples | String waves, EM waves | Sound waves, seismic P-waves |

## Wave Properties: The Language of Waves

To describe and analyze waves quantitatively, physicists have developed a precise vocabulary of wave properties. Understanding these properties allows us to predict wave behavior and compare different types of waves.

### Wavelength (λ)

**Wavelength** is the spatial distance between consecutive corresponding points on a wave—for example, from one crest to the next crest, or from one compression to the next compression. Wavelength is typically represented by the Greek letter lambda (λ) and measured in meters.

For transverse waves, wavelength is easy to visualize as the distance from peak to peak. For longitudinal waves, wavelength represents the distance from one compression center to the next compression center.

### Wave Frequency (f)

**Wave frequency** is the number of complete wave cycles that pass a fixed point per unit time. Frequency is measured in hertz (Hz), where 1 Hz = 1 cycle per second. A wave with a frequency of 440 Hz completes 440 full oscillations every second.

Frequency is closely related to the energy carried by a wave: higher frequency waves carry more energy than lower frequency waves of the same amplitude.

### Wave Period (T)

**Wave period** is the time required for one complete wave cycle to pass a fixed point. Period is measured in seconds and is the reciprocal of frequency:

$$T = \frac{1}{f}$$

For example, a wave with a frequency of 2 Hz has a period of 0.5 seconds. During each 0.5-second interval, one complete wave cycle passes by.

### Wave Speed (v)

**Wave speed** is the distance a wave travels per unit time. Wave speed depends on the properties of the medium, not on the frequency or amplitude of the wave itself.

The fundamental relationship connecting wave speed, frequency, and wavelength is:

$$v = f\lambda$$

This equation tells us that wave speed equals frequency times wavelength. If you know any two of these quantities, you can calculate the third.

Key insight: In a given medium, wave speed is constant. This means that if frequency increases, wavelength must decrease proportionally, and vice versa.

#### Diagram: Wave Properties Interactive Calculator MicroSim
<details markdown="1">
    <summary>Wave Properties Interactive Calculator MicroSim</summary>
    **Status:** INCOMPLETE
    TODO: human-review-needed
    Type: microsim

    Learning objective: Allow students to explore the relationship between wavelength, frequency, period, and wave speed through interactive calculation and visualization

    Canvas layout (900x600px):
    - Left side (450x600): Interactive wave visualization
    - Right side (450x600): Control panel and calculation display

    Visual elements:
    - Animated sine wave showing current parameters
    - Markers indicating wavelength measurement
    - Timer showing wave period
    - Speed indicator showing wave propagation

    Interactive controls:
    - Slider: Frequency (0.5-10 Hz)
    - Slider: Wavelength (0.5-5 meters)
    - Radio buttons: Choose which medium (air, water, steel) - sets wave speed
    - Display: Calculated wave speed (v = fλ)
    - Display: Calculated period (T = 1/f)
    - Button: "Reset to defaults"

    Default parameters:
    - Frequency: 2 Hz
    - Wavelength: 2 meters
    - Medium: Air (speed = 343 m/s)

    Behavior:
    - When frequency slider changes, wavelength adjusts to maintain constant wave speed for selected medium
    - When wavelength slider changes, frequency adjusts to maintain constant wave speed
    - When medium changes, display updates wave speed and adjusts visualization
    - Animated wave moves at calculated speed
    - Period indicator flashes every cycle
    - Display equations: v = fλ and T = 1/f with values substituted

    Calculation display:
    - Shows all four quantities in large, clear text
    - Highlights the two quantities controlled by sliders
    - Shows derived quantities in different color
    - Updates in real-time as sliders move

    Implementation notes:
    - Use p5.js for rendering
    - Medium wave speeds: air (343 m/s), water (1480 m/s), steel (5000 m/s)
    - Ensure wavelength and frequency adjustments maintain v = fλ relationship
    - Use color coding: blue for input values, green for calculated values
    - Animation speed scaled to show wave motion clearly
</details>

### Amplitude

**Amplitude** is the maximum displacement of a particle from its equilibrium (rest) position. For a transverse wave, amplitude is the height of the crest above (or depth of the trough below) the equilibrium line. For a longitudinal wave, amplitude relates to how much particles are compressed or spread apart.

Amplitude determines the energy and intensity of a wave: larger amplitude means more energy. However, amplitude does not affect wave speed or frequency in most cases.

### Wave Property Summary

| Property | Symbol | SI Unit | Definition |
|----------|--------|---------|------------|
| Wavelength | λ | meters (m) | Distance between consecutive corresponding points |
| Frequency | f | hertz (Hz) | Number of cycles per second |
| Period | T | seconds (s) | Time for one complete cycle |
| Speed | v | meters/second (m/s) | Distance traveled per unit time |
| Amplitude | A | meters (m) | Maximum displacement from equilibrium |

## Wave Behavior: Interference and Superposition

When waves encounter each other, they don't collide like solid objects. Instead, they pass through one another while temporarily combining their effects. This remarkable behavior is described by the superposition principle.

### The Superposition Principle

The **superposition principle** states that when two or more waves overlap in the same region of space, the resulting displacement at any point is the sum of the displacements that each individual wave would cause at that point.

Mathematically, if wave 1 causes a displacement $y_1$ and wave 2 causes a displacement $y_2$ at a given point, the total displacement is:

$$y_{total} = y_1 + y_2$$

This principle applies regardless of the amplitude, frequency, or direction of the individual waves. After the waves pass through each other, they continue on unchanged—as if they had never met.

### Constructive Interference

**Constructive interference** occurs when two waves combine to produce a displacement larger than either wave alone. This happens when the waves are "in phase"—meaning their crests align with crests and troughs align with troughs.

When two identical waves experience perfect constructive interference, the resulting amplitude is twice the amplitude of either individual wave. Since wave energy is proportional to amplitude squared, the energy at that point becomes four times larger.

Examples of constructive interference:

- Two speakers playing the same frequency in phase create loud spots
- Water waves from two sources creating larger peaks where they meet
- Light waves combining to create bright fringes in interference patterns

### Destructive Interference

**Destructive interference** occurs when two waves combine to produce a displacement smaller than at least one of the individual waves. This happens when waves are "out of phase"—meaning crests align with troughs.

When two identical waves experience perfect destructive interference (180 degrees out of phase), they cancel each other completely, resulting in zero displacement. This phenomenon is the basis for noise-canceling headphones.

Examples of destructive interference:

- Two speakers playing the same frequency out of phase create quiet spots
- Water waves from two sources canceling in certain regions
- Light waves combining to create dark fringes in interference patterns

### Wave Interference

**Wave interference** is the general term for the interaction of waves through the superposition principle. Interference can be constructive, destructive, or anything in between, depending on the relative phase of the combining waves.

#### Diagram: Two-Source Wave Interference Simulation MicroSim

<iframe src="../../sims/wave-interference/main.html" height="652px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Two-Source Wave Interference Simulation MicroSim</summary>
    **Status:** done
    Type: microsim

    Learning objective: Demonstrate constructive and destructive interference patterns created by two wave sources

    Canvas layout (800x650px):
    - Top section (800x500): 2D water surface showing interference pattern
    - Bottom section (800x150): Control panel

    Visual elements:
    - Two point sources (red dots) generating circular waves
    - Color-coded water surface: blue for crests, red for troughs, white for equilibrium
    - Interference pattern showing nodal lines (destructive) and antinodal regions (constructive)
    - Intensity plot showing wave amplitude across the pattern

    Interactive controls:
    - Slider: Frequency (0.5-5 Hz) - controls both sources
    - Slider: Source separation distance (50-300 pixels)
    - Slider: Phase difference between sources (0-360 degrees)
    - Slider: Wavelength (20-80 pixels)
    - Button: "Start/Stop animation"
    - Button: "Reset"
    - Checkbox: "Show nodal lines"
    - Checkbox: "Show intensity plot"

    Default parameters:
    - Frequency: 2 Hz
    - Source separation: 150 pixels
    - Phase difference: 0 degrees (in phase)
    - Wavelength: 40 pixels

    Behavior:
    - Each source generates expanding circular waves
    - Waves from both sources superpose according to superposition principle
    - Regions of constructive interference show enhanced amplitude (bright blue/red)
    - Regions of destructive interference show reduced amplitude (gray/white)
    - When "Show nodal lines" checked, draw lines where destructive interference occurs
    - When phase difference = 0, central axis shows constructive interference
    - When phase difference = 180, central axis shows destructive interference
    - Intensity plot shows cross-section of wave amplitude

    Implementation notes:
    - Use p5.js for rendering
    - Calculate amplitude at each pixel by superposing waves from both sources
    - Wave equation: A(x,y) = A₁×sin(k×r₁ - ωt + φ₁) + A₂×sin(k×r₂ - ωt + φ₂)
    - r₁ and r₂ are distances from each source
    - Use color mapping: amplitude > 0 = shades of blue, amplitude < 0 = shades of red
    - Nodal lines occur where path difference = (n + 0.5)λ for destructive interference
    - Update display 30 frames per second
</details>

### Standing Waves

**Standing waves** are a special interference pattern that occurs when two waves of the same frequency and amplitude travel in opposite directions through the same medium. Unlike traveling waves that move through space, standing waves appear to vibrate in place, with certain points (nodes) that never move and other points (antinodes) that oscillate with maximum amplitude.

Standing waves commonly occur in:

- Vibrating strings (guitar, violin, piano)
- Air columns in wind instruments (flute, organ pipe)
- Resonating cavities (drums, bells)
- Microwave ovens (why food has hot and cold spots)

### Nodes and Antinodes

In a standing wave pattern:

- **Nodes** are points that remain stationary—they experience no displacement at any time
- **Antinodes** are points that oscillate with maximum amplitude—midway between nodes

For a standing wave on a string of length L with both ends fixed:

- Nodes occur at both ends and at regular intervals
- The simplest standing wave pattern (fundamental frequency) has nodes only at the ends and one antinode in the middle
- Higher harmonics have additional nodes and antinodes

The distance between consecutive nodes (or consecutive antinodes) is half a wavelength: $\frac{\lambda}{2}$

#### Diagram: Standing Waves on a String MicroSim

<iframe src="../../sims/standing-waves/main.html" height="602px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Standing Waves on a String MicroSim</summary>
    **Status:** done
    Type: microsim

    Learning objective: Visualize standing wave patterns and understand nodes, antinodes, and harmonics

    Canvas layout (900x600px):
    - Top section (900x400): String visualization showing standing wave pattern
    - Bottom section (900x200): Control panel and harmonic selector

    Visual elements:
    - Horizontal string fixed at both ends (black dots)
    - Animated standing wave pattern (blue curve)
    - Nodes marked with red circles
    - Antinodes marked with green circles
    - Reference line showing string at rest (dashed gray line)
    - Labels indicating wavelength and amplitude

    Interactive controls:
    - Buttons: Select harmonic (n = 1, 2, 3, 4, 5, 6)
    - Slider: Amplitude (10-50 pixels)
    - Slider: String length (300-800 pixels)
    - Slider: Animation speed (slow/medium/fast)
    - Button: "Play/Pause animation"
    - Display: Wavelength for selected harmonic
    - Display: Number of nodes and antinodes
    - Display: Frequency ratio compared to fundamental

    Default parameters:
    - Harmonic: n = 1 (fundamental)
    - Amplitude: 30 pixels
    - String length: 600 pixels
    - Animation speed: Medium

    Behavior:
    - String oscillates showing standing wave for selected harmonic
    - For harmonic n: n half-wavelengths fit on string, so λ = 2L/n
    - Number of nodes = n + 1 (including endpoints)
    - Number of antinodes = n
    - Animation shows time evolution: string shape follows sin(2πx/λ)×cos(2πft)
    - When harmonic changes, display updates node/antinode positions
    - Frequency ratio: f_n = n × f₁ (displayed relative to fundamental)

    Information panel:
    - Shows equations: λ_n = 2L/n and f_n = n × f₁
    - Displays current values
    - Shows diagram of node/antinode pattern for selected harmonic

    Implementation notes:
    - Use p5.js for rendering
    - Standing wave equation: y(x,t) = A × sin(nπx/L) × cos(2πft)
    - n is the harmonic number
    - Update 30 times per second
    - Color code: blue for string, red for nodes, green for antinodes
    - Animate smoothly between harmonic changes
</details>

## Wave Behavior: Reflection, Refraction, and Diffraction

Waves interact not only with each other but also with boundaries and obstacles in their environment. Three fundamental behaviors—reflection, refraction, and diffraction—govern how waves respond to these interactions.

### Wave Reflection

**Wave reflection** occurs when a wave encounters a boundary or obstacle and bounces back. The angle at which the wave reflects depends on the angle at which it approaches, following the law of reflection: the angle of incidence equals the angle of reflection.

Reflection behavior depends on the boundary type:

- **Fixed boundary**: The reflected wave is inverted (flipped upside down)
- **Free boundary**: The reflected wave has the same orientation
- **Partial reflection**: Some wave energy reflects while some transmits through

Reflection is responsible for:

- Echoes (sound reflecting off walls or mountains)
- Standing waves (waves reflecting between two boundaries)
- Sonar and radar detection systems
- Musical instrument acoustics

### Wave Refraction

**Wave refraction** is the bending of a wave as it passes from one medium into another with a different wave speed. When a wave enters a medium where it travels faster, it bends away from the normal (perpendicular) line; when it enters a slower medium, it bends toward the normal.

Refraction occurs because different parts of the wavefront enter the new medium at different times, causing the wave direction to change. The wavelength changes when the wave speed changes, but the frequency remains constant.

Examples of refraction:

- Sound waves bending as they travel through air layers of different temperatures
- Water waves slowing and bending as they approach a shallow beach
- Seismic waves bending as they travel through Earth's layers of varying density

### Wave Diffraction

**Wave diffraction** is the spreading of waves around obstacles or through openings. When a wave encounters an obstacle or aperture comparable in size to its wavelength, it bends around the edges and spreads into the region behind the obstacle.

Key principles of diffraction:

- Smaller openings produce more spreading
- Longer wavelengths diffract more than shorter wavelengths
- Diffraction is most noticeable when opening size ≈ wavelength

Examples of diffraction:

- Sound waves bending around corners (why you can hear someone talking around a corner)
- Water waves spreading after passing through a harbor opening
- Light waves spreading through small apertures, creating diffraction patterns

#### Diagram: Wave Behavior Comparison Infographic
<details markdown="1">
    <summary>Wave Behavior Comparison Infographic</summary>
    **Status:** INCOMPLETE
    TODO: human-review-needed
    Type: infographic

    Purpose: Provide a visual comparison of reflection, refraction, and diffraction with interactive examples

    Layout: Three-column layout with a row for each wave behavior

    Column 1: Reflection
    - Diagram showing wave approaching a boundary at an angle
    - Incident wave and reflected wave with angle markers
    - Equation: θ_incident = θ_reflected
    - Animation: Wave pulse bouncing off fixed wall
    - Examples: Echo, mirror reflection, sonar
    - Hover effect: Show before/after comparison

    Column 2: Refraction
    - Diagram showing wave entering new medium at an angle
    - Wavefronts bending as they cross boundary
    - Speed labels: v₁ (medium 1) and v₂ (medium 2)
    - Wavelength change illustrated
    - Animation: Wave slowing and bending at boundary
    - Examples: Sound through temperature layers, water waves at beach
    - Hover effect: Show wavelength and speed changes

    Column 3: Diffraction
    - Diagram showing wave encountering obstacle/opening
    - Wavefronts spreading around edges
    - Opening size compared to wavelength
    - Animation: Circular waves spreading through narrow gap
    - Examples: Sound around corners, light through pinhole
    - Hover effect: Show effect of changing opening size

    Interactive features:
    - Click each column header to expand full explanation
    - Hover over diagrams to see animated versions
    - Slider at bottom: Adjust wavelength to see how diffraction changes
    - Toggle button: Switch between water wave and sound wave examples

    Visual style: Clean, modern infographic with:
    - Blue color scheme for water/waves
    - Dotted lines for wavefronts
    - Arrows showing wave direction
    - Labels and annotations
    - Consistent icon style

    Implementation: HTML/CSS/JavaScript with SVG animations or p5.js
</details>

## The Doppler Effect and Shock Waves

When a wave source or observer is in motion, the perceived frequency of the wave changes. This phenomenon, called the Doppler effect, explains why an ambulance siren sounds different as it approaches and then recedes from you.

### The Doppler Effect

The **Doppler effect** is the change in observed frequency (and wavelength) of a wave when there is relative motion between the source and the observer. The effect occurs for all types of waves, but we most commonly notice it with sound.

When the source moves toward the observer:

- Wavefronts bunch together (shorter wavelength)
- Observed frequency increases (higher pitch)
- This is called a "blue shift" for light waves

When the source moves away from the observer:

- Wavefronts spread apart (longer wavelength)
- Observed frequency decreases (lower pitch)
- This is called a "red shift" for light waves

The Doppler effect can be quantified using these equations:

For a moving source:
$$f' = f \left(\frac{v}{v \pm v_s}\right)$$

Where:
- f' is the observed frequency
- f is the source frequency
- v is the wave speed in the medium
- v_s is the source speed
- Use minus sign when source approaches, plus sign when source recedes

For a moving observer:
$$f' = f \left(\frac{v \pm v_o}{v}\right)$$

Where v_o is the observer speed (plus sign when approaching, minus sign when receding).

#### Diagram: Doppler Effect Interactive Simulation MicroSim

<iframe src="../../sims/doppler-effect/main.html" height="602px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Doppler Effect Interactive Simulation MicroSim</summary>
    **Status:** done
    Type: microsim

    Learning objective: Demonstrate how source motion affects observed frequency through wavefront compression and expansion

    Canvas layout (900x600px):
    - Top section (900x450): Bird's eye view showing moving source and stationary observers
    - Bottom section (900x150): Control panel and frequency displays

    Visual elements:
    - Moving sound source (red circle) representing ambulance or police car
    - Two stationary observers: one ahead of source (green), one behind (blue)
    - Circular wavefronts emanating from source
    - Wavefronts compressed ahead of moving source (shorter wavelength)
    - Wavefronts stretched behind moving source (longer wavelength)
    - Arrows showing source velocity
    - Frequency meters for each observer showing detected frequency

    Interactive controls:
    - Slider: Source speed (0-0.8 × speed of sound)
    - Slider: Source frequency (200-1000 Hz)
    - Button: "Start/Stop motion"
    - Button: "Reset"
    - Radio buttons: Direction (left to right, right to left)
    - Display: Speed of sound (340 m/s)
    - Display: Observed frequency ahead (f_ahead)
    - Display: Observed frequency behind (f_behind)
    - Display: Wavelength ahead vs behind

    Default parameters:
    - Source speed: 30 m/s (about 67 mph)
    - Source frequency: 500 Hz
    - Speed of sound: 340 m/s
    - Direction: Left to right

    Behavior:
    - Source moves horizontally emitting circular wavefronts
    - Wavefronts bunch up in direction of motion (compression)
    - Wavefronts spread out behind source (expansion)
    - Observer ahead detects higher frequency: f' = f(v/(v-v_s))
    - Observer behind detects lower frequency: f' = f(v/(v+v_s))
    - Display percentage change from source frequency
    - Show wavelength measurements with arrows
    - When source speed = 0, both observers detect same frequency

    Information panel:
    - Equations displayed with current values substituted
    - Percent change calculation shown
    - Warning when source speed approaches sound speed

    Implementation notes:
    - Use p5.js for rendering
    - Emit wavefront circles at regular intervals based on frequency
    - Position of each wavefront center moves with source
    - Calculate wavelength ahead: λ_ahead = (v - v_s)/f
    - Calculate wavelength behind: λ_behind = (v + v_s)/f
    - Color code: red for source, green for ahead observer, blue for behind observer
    - Update frequency displays in real-time
</details>

### Applications of the Doppler Effect

The Doppler effect has numerous practical applications:

- **Police radar guns**: Measure the frequency shift of reflected radio waves to determine vehicle speed
- **Medical ultrasound**: Doppler ultrasound detects blood flow by measuring frequency shifts
- **Astronomy**: Red shift of starlight indicates galaxies are moving away from us, supporting the Big Bang theory
- **Weather radar**: Doppler radar detects precipitation motion to predict severe weather
- **Aviation**: Helps determine aircraft velocity relative to air traffic control

### Shock Waves

**Shock waves** are a dramatic consequence of the Doppler effect when a source moves faster than the wave speed in the medium. When an aircraft exceeds the speed of sound (called supersonic flight), it outruns its own sound waves, creating a cone-shaped wavefront called a shock wave.

As the shock wave passes an observer on the ground, they hear a sonic boom—a loud explosive sound created by the sudden pressure change. The sonic boom is not a single event; the aircraft continuously generates the shock wave as long as it flies supersonically, but a ground observer hears it only when the cone sweeps past their location.

Key characteristics of shock waves:

- Occur when source speed > wave speed (Mach number > 1)
- Form a cone with half-angle: $\sin(\theta) = \frac{v}{v_s}$
- Contain very high energy and pressure
- Create loud sounds (sonic booms) or destructive forces

Examples of shock waves:

- Supersonic aircraft creating sonic booms
- Bullets traveling faster than sound (crack sound)
- Whips cracking (tip exceeds sound speed)
- Meteor entries (producing meteor sounds)

## Sound Waves: Mechanical Waves Through Air

Sound is one of the most important types of mechanical waves in our daily lives. Every conversation, every piece of music, every notification alert from your phone—all are carried to your ears by sound waves traveling through air.

**Sound waves** are longitudinal mechanical waves that propagate through a medium by means of compressions and rarefactions of particles. In air, these pressure variations travel outward from a vibrating source, such as a speaker cone, vocal cords, or vibrating string.

Key characteristics of sound waves:

- Longitudinal waves (particle motion parallel to wave direction)
- Require a medium (cannot travel through vacuum)
- Typical frequency range for human hearing: 20 Hz to 20,000 Hz
- Travel at different speeds in different media
- Carry energy that can do work (making your eardrum vibrate)

### Speed of Sound

The **speed of sound** is the rate at which sound waves propagate through a medium. This speed depends on the properties of the medium—specifically, on how easily particles can transmit vibrations to their neighbors.

General trends for sound speed:

- **Solids**: Fastest (typically 3000-6000 m/s) because particles are tightly packed
- **Liquids**: Moderate (typically 1000-1500 m/s)
- **Gases**: Slowest (typically 300-400 m/s) because particles are far apart

The speed of sound in air at 20°C (room temperature) is approximately **343 m/s** (about 767 mph or 1,235 km/h). This speed increases with temperature because warmer air molecules move faster and transmit vibrations more quickly.

Temperature dependence in air:
$$v = 331 + 0.6T$$

Where v is in m/s and T is temperature in degrees Celsius.

| Medium | Speed of Sound (m/s) |
|--------|----------------------|
| Air (0°C) | 331 |
| Air (20°C) | 343 |
| Water (25°C) | 1,480 |
| Steel | 5,960 |
| Aluminum | 6,420 |
| Concrete | 3,100 |

### Sound Intensity and the Decibel Scale

**Sound intensity** is the power carried by sound waves per unit area. It measures the rate at which sound energy flows through a surface and is expressed in watts per square meter (W/m²).

Intensity follows an inverse square law: as you move away from a point source, intensity decreases with the square of the distance:

$$I = \frac{P}{4\pi r^2}$$

Where P is the power of the source and r is the distance from the source.

However, our ears perceive sound intensity logarithmically, not linearly. A sound that is 10 times more intense doesn't sound "10 times louder" to us—it sounds only about twice as loud. To match human perception, we use the **decibel scale**.

The **decibel (dB) scale** is a logarithmic scale for measuring sound intensity level:

$$\beta = 10 \log_{10}\left(\frac{I}{I_0}\right)$$

Where:
- β is the sound level in decibels
- I is the sound intensity
- I₀ = 10⁻¹² W/m² is the threshold of hearing (quietest sound a human can hear)

Key points about the decibel scale:

- It is logarithmic: adding 10 dB means multiplying intensity by 10
- 0 dB is the threshold of hearing (not silence, but the quietest audible sound)
- Normal conversation is about 60 dB
- Prolonged exposure above 85 dB can cause hearing damage
- 120 dB is the threshold of pain
- Every increase of 3 dB represents a doubling of intensity

| Sound Source | Intensity (W/m²) | Level (dB) |
|--------------|------------------|------------|
| Threshold of hearing | 10⁻¹² | 0 |
| Whisper | 10⁻¹⁰ | 20 |
| Normal conversation | 10⁻⁶ | 60 |
| Busy traffic | 10⁻⁵ | 70 |
| Vacuum cleaner | 10⁻⁴ | 80 |
| Lawnmower | 10⁻³ | 90 |
| Rock concert | 10⁻¹ | 110 |
| Threshold of pain | 1 | 120 |
| Jet engine (nearby) | 10² | 140 |

#### Diagram: Sound Intensity and Decibel Calculator MicroSim
<details markdown="1">
    <summary>Sound Intensity and Decibel Calculator MicroSim</summary>
    **Status:** INCOMPLETE
    TODO: human-review-needed
    Type: microsim

    Learning objective: Help students understand the logarithmic relationship between sound intensity and decibel level

    Canvas layout (900x600px):
    - Left section (450x600): Visual comparison of sound sources with decibel levels
    - Right section (450x600): Interactive calculator and intensity/distance relationship

    Visual elements:
    - Vertical decibel scale from 0 to 140 dB
    - Icons for common sound sources positioned at appropriate levels
    - Color coding: green (safe), yellow (caution), red (dangerous)
    - Animated sound waves emanating from selected source
    - Distance vs intensity graph

    Interactive controls:
    - Slider: Select intensity (10⁻¹² to 10 W/m²) - logarithmic scale
    - Display: Corresponding decibel level (calculated)
    - Slider: Distance from source (1-100 meters)
    - Display: Intensity at that distance (inverse square law)
    - Dropdown: Choose common sound source (updates sliders)
    - Button: "Reset"

    Sound sources with positions:
    - Threshold of hearing: 0 dB (bottom)
    - Whisper: 20 dB
    - Library: 40 dB
    - Conversation: 60 dB
    - Vacuum cleaner: 80 dB
    - Lawnmower: 90 dB
    - Rock concert: 110 dB
    - Jet engine: 140 dB (top)

    Calculation displays:
    - Intensity in W/m² (scientific notation)
    - Decibel level: β = 10 log₁₀(I/I₀)
    - Intensity ratio: I/I₀ = 10^(β/10)
    - Distance calculation using inverse square law
    - Exposure time limits (for levels > 85 dB)

    Visual feedback:
    - Highlight current position on vertical scale
    - Show animated sound waves (larger amplitude for higher intensity)
    - Color background by safety zone
    - Display warning icon if level exceeds 85 dB

    Information panel:
    - Explain logarithmic scale
    - Show that +10 dB = 10× intensity
    - Show that +3 dB = 2× intensity
    - Display safe exposure times from OSHA guidelines

    Implementation notes:
    - Use p5.js for rendering
    - Calculate β = 10 × log₁₀(I/I₀)
    - Calculate I from distance: I = P/(4πr²)
    - Use logarithmic slider for intensity (powers of 10)
    - Update all displays in real-time as sliders move
    - Include educational tooltips on hover
</details>

### Pitch and Frequency

**Pitch** is the perceived highness or lowness of a sound, and it is directly related to the frequency of the sound wave. Higher frequency waves are perceived as higher pitch sounds; lower frequency waves produce lower pitch sounds.

The human ear can typically detect frequencies from about 20 Hz to 20,000 Hz (20 kHz), though this range decreases with age. Frequencies below 20 Hz are called **infrasound**, and frequencies above 20,000 Hz are called **ultrasound**.

Musical notes have specific frequencies:

- Middle C: 261.6 Hz
- A above middle C: 440 Hz (standard tuning reference)
- Each octave doubles the frequency (A at 880 Hz is one octave above A at 440 Hz)

While frequency is an objective physical property (measurable with instruments), pitch is a subjective perception. Two sounds with the same frequency might be perceived as having slightly different pitches due to factors like timbre, loudness, and individual hearing differences.

### Loudness and Amplitude

**Loudness** is the perceived volume of a sound, and it is primarily related to the amplitude (and thus intensity) of the sound wave. Larger amplitude waves carry more energy and are perceived as louder sounds.

However, like pitch, loudness is a subjective perception that depends on more than just intensity:

- **Frequency dependence**: Our ears are most sensitive to frequencies between 1,000 and 5,000 Hz. A 60 dB sound at 3,000 Hz sounds louder than a 60 dB sound at 100 Hz.
- **Duration**: Very brief sounds may seem quieter than sustained sounds of the same intensity
- **Context**: Background noise affects our perception of loudness

The relationship between intensity and perceived loudness is approximately logarithmic, which is why the decibel scale works well for describing sound levels.

### Infrasound and Ultrasound

**Infrasound** refers to sound waves with frequencies below 20 Hz—below the range of human hearing. Although we cannot hear these sounds, we can sometimes feel them as vibrations, and they can have significant effects.

Sources of infrasound:

- Earthquakes and volcanic eruptions
- Wind and ocean waves
- Large machinery and industrial equipment
- Nuclear explosions
- Some animals (elephants, whales) use infrasound for communication

Effects of infrasound:

- Can cause feelings of unease or anxiety at high intensities
- May cause resonance in human body cavities
- Can travel very long distances through atmosphere

**Ultrasound** refers to sound waves with frequencies above 20,000 Hz—above the range of human hearing. Many animals, including dogs, cats, bats, and dolphins, can hear ultrasound frequencies.

Applications of ultrasound:

- **Medical imaging**: Ultrasound machines create images of internal organs and fetuses by analyzing reflected ultrasound waves
- **Echolocation**: Bats and dolphins navigate and hunt using ultrasound
- **Industrial cleaning**: Ultrasonic cleaners use high-frequency vibrations to remove contaminants
- **Distance measurement**: Ultrasonic sensors measure distances by timing echo returns
- **Welding**: Ultrasonic welding joins materials using high-frequency vibrations

#### Diagram: Human Hearing Range Interactive Diagram
<details markdown="1">
    <summary>Human Hearing Range Interactive Diagram</summary>
    **Status:** INCOMPLETE
    TODO: human-review-needed
    Type: infographic

    Purpose: Visualize the human hearing range in context with infrasound, ultrasound, and various animal hearing ranges

    Layout: Horizontal frequency spectrum from 1 Hz to 100,000 Hz (logarithmic scale)

    Main elements:
    - Horizontal logarithmic frequency axis (1 Hz to 100 kHz)
    - Human hearing range highlighted (20 Hz to 20 kHz) in blue
    - Infrasound region (<20 Hz) in purple
    - Ultrasound region (>20 kHz) in orange
    - Overlaid hearing ranges for different animals
    - Examples of sounds at specific frequencies

    Animal hearing ranges (as horizontal bars):
    - Elephant: 14 Hz to 12 kHz (purple-blue gradient)
    - Human: 20 Hz to 20 kHz (bright blue)
    - Dog: 67 Hz to 45 kHz (blue-orange gradient)
    - Cat: 45 Hz to 64 kHz (blue-orange gradient)
    - Bat: 2 kHz to 110 kHz (orange)
    - Dolphin: 150 Hz to 150 kHz (wide orange)

    Example sounds marked on scale:
    - Earthquake rumble: 1-10 Hz
    - Lowest piano note: 27.5 Hz
    - Human voice: 85-255 Hz
    - Middle C: 261.6 Hz
    - Standard tuning A: 440 Hz
    - Highest piano note: 4,186 Hz
    - Dog whistle: 23-54 kHz
    - Bat echolocation: 50-100 kHz
    - Medical ultrasound: 1-10 MHz

    Interactive features:
    - Hover over frequency regions to see descriptions
    - Click on animal names to highlight their hearing range
    - Hover over example sounds to hear audio sample (if possible) or see waveform
    - Slider to adjust age: Shows how human hearing range decreases with age
    - Toggle button: Switch between linear and logarithmic frequency scale

    Visual style:
    - Clean, modern design with gradient background
    - Color coding: purple (infrasound), blue (audible), orange (ultrasound)
    - Animal icons next to their hearing range bars
    - Clear axis labels and frequency markers
    - Legend explaining color scheme

    Information panels (expand on click):
    - What is infrasound? (purple panel)
    - What is ultrasound? (orange panel)
    - Why do different animals hear different frequencies? (educational content)
    - How does age affect hearing? (graph showing high-frequency loss)

    Implementation: HTML/CSS/JavaScript with SVG elements and interactive controls
</details>

## Musical Sounds: Beats, Harmonics, and Resonance

Music is physics made audible. The rich sounds of musical instruments result from complex wave interactions involving beats, harmonics, and resonance.

### Beats

**Beats** are the periodic variations in loudness that occur when two sound waves of slightly different frequencies interfere. The amplitude oscillates between constructive and destructive interference, creating a "wah-wah-wah" pulsing sound.

The **beat frequency** equals the difference between the two original frequencies:

$$f_{beat} = |f_1 - f_2|$$

For example, if one tuning fork vibrates at 440 Hz and another at 443 Hz, you'll hear 3 beats per second.

Musicians use beats to tune instruments: when two strings are perfectly in tune, the beats disappear (beat frequency = 0). If beats are heard, one string is adjusted until the beats slow down and stop, indicating the strings are now at the same frequency.

### Harmonics

**Harmonics** (also called overtones) are whole-number multiples of a fundamental frequency. When a string or air column vibrates, it doesn't vibrate at just one frequency; it simultaneously vibrates at the fundamental frequency and at multiple harmonics.

For a string or open pipe:
- 1st harmonic (fundamental): f₁
- 2nd harmonic: f₂ = 2f₁
- 3rd harmonic: f₃ = 3f₁
- nth harmonic: f_n = nf₁

The relative amplitudes of these harmonics determine the **timbre** (tone quality) of the sound. This is why a trumpet and a violin playing the same note sound different—they have different harmonic content.

Harmonic series on a guitar string:
- Plucking in the middle emphasizes odd harmonics (1st, 3rd, 5th...)
- Plucking near the end emphasizes all harmonics
- Each harmonic has a different standing wave pattern with different node positions

### Acoustic Resonance

**Acoustic resonance** occurs when an object vibrates at its natural frequency in response to sound waves of the same frequency. The result is a dramatic increase in amplitude—the object absorbs energy efficiently and vibrates strongly.

Examples of acoustic resonance:

- **Musical instruments**: Guitar bodies resonate at specific frequencies, amplifying the string vibrations
- **Organ pipes**: Air columns resonate at frequencies determined by pipe length
- **Singing glasses**: Rubbing a wet finger around a glass rim excites resonant vibrations
- **Tacoma Narrows Bridge**: Wind caused resonance that destroyed the bridge in 1940
- **Human voice**: Vocal tract shapes create resonances that form different vowel sounds

Resonance conditions for different systems:

**String with both ends fixed** (guitar, violin):
$$f_n = \frac{n}{2L}\sqrt{\frac{T}{\mu}}$$

Where n is the harmonic number, L is length, T is tension, and μ is mass per unit length.

**Open pipe** (flute, organ pipe open at both ends):
$$f_n = \frac{nv}{2L}$$

**Closed pipe** (bottle, organ pipe closed at one end):
$$f_n = \frac{nv}{4L}$$ (only odd harmonics: n = 1, 3, 5...)

#### Diagram: Musical Harmonics Visualizer MicroSim
<details markdown="1">
    <summary>Musical Harmonics Visualizer MicroSim</summary>
    **Status:** INCOMPLETE
    TODO: human-review-needed
    Type: microsim

    Learning objective: Demonstrate how musical instruments produce multiple harmonics simultaneously and how harmonic content affects timbre

    Canvas layout (900x700px):
    - Top left (450x300): Waveform showing composite sound
    - Top right (450x300): Frequency spectrum showing individual harmonics
    - Middle (900x200): Visual representation of string with standing wave patterns
    - Bottom (900x200): Control panel with harmonic mixer

    Visual elements:
    - Time-domain waveform (blue oscillating curve)
    - Frequency spectrum (bar chart showing harmonic amplitudes)
    - String diagram showing standing wave pattern for each active harmonic
    - Node and antinode positions marked
    - Color coding for each harmonic (1st=red, 2nd=orange, 3rd=yellow, etc.)

    Interactive controls:
    - Fundamental frequency slider (100-500 Hz)
    - 8 sliders for harmonics 1-8 (amplitude 0-100%)
    - Preset buttons: "Pure tone" (fundamental only), "Flute" (odd harmonics), "Violin" (rich harmonics), "Square wave" (odd harmonics decreasing)
    - Button: "Play sound" (using Web Audio API)
    - Button: "Stop"
    - Dropdown: Select instrument timbre (adjusts harmonic sliders)
    - Checkbox: "Show standing wave patterns"

    Default parameters:
    - Fundamental frequency: 220 Hz (A3)
    - Harmonic 1: 100%
    - Harmonics 2-8: Preset to "Violin" profile

    Behavior:
    - Each harmonic slider adjusts amplitude of that frequency component
    - Waveform shows sum of all active harmonics (superposition)
    - Frequency spectrum shows bar for each harmonic with height = amplitude
    - String diagram overlays standing wave patterns for active harmonics
    - When "Play sound" clicked, synthesize and play the composite sound
    - Different instrument presets demonstrate how harmonic content creates timbre
    - Changing fundamental frequency shifts all harmonics proportionally

    Frequency spectrum display:
    - X-axis: Frequency (showing f₁, 2f₁, 3f₁, etc.)
    - Y-axis: Amplitude (0-100%)
    - Bars color-coded by harmonic number
    - Labels showing exact frequency for each harmonic

    Standing wave patterns:
    - Show n half-wavelengths for nth harmonic
    - Display node positions with red dots
    - Display antinode positions with green dots
    - Animate standing waves if "Play sound" is active

    Implementation notes:
    - Use p5.js for visualization
    - Use Web Audio API for sound synthesis
    - Composite waveform: y(t) = Σ A_n × sin(2πnf₁t)
    - Update waveform 60 times per second
    - FFT-style display for frequency spectrum
    - Smooth slider transitions with animation
</details>

#### Diagram: Acoustic Resonance in Pipes Diagram
<details markdown="1">
    <summary>Acoustic Resonance in Pipes Diagram</summary>
    **Status:** INCOMPLETE
    TODO: human-review-needed
    Type: diagram

    Purpose: Illustrate standing wave patterns and resonant frequencies in open and closed pipes

    Components to show:
    - Two side-by-side diagrams: Open pipe (left) and Closed pipe (right)
    - Each pipe showing first three resonant modes (fundamental and first two overtones)
    - Pressure variation patterns (compressions and rarefactions)
    - Displacement wave patterns
    - Node and antinode positions marked
    - Wavelength measurements
    - Frequency calculations

    Open pipe diagram:
    - Shows pipe open at both ends
    - Fundamental (1st harmonic): λ₁ = 2L, one antinode at each end
    - 2nd harmonic: λ₂ = L, one node in middle
    - 3rd harmonic: λ₃ = 2L/3, two nodes inside pipe
    - Equation: f_n = nv/(2L) where n = 1, 2, 3...
    - Label: "All harmonics present"

    Closed pipe diagram:
    - Shows pipe closed at one end, open at other
    - Fundamental (1st harmonic): λ₁ = 4L, node at closed end, antinode at open end
    - 3rd harmonic: λ₃ = 4L/3, two nodes, two antinodes
    - 5th harmonic: λ₅ = 4L/5, three nodes, three antinodes
    - Equation: f_n = nv/(4L) where n = 1, 3, 5... (odd only)
    - Label: "Only odd harmonics"

    Visual elements for each resonant mode:
    - Pressure wave shown as shaded regions (blue=compression, red=rarefaction)
    - Displacement wave shown as sine curve
    - Nodes marked with "N" (no displacement)
    - Antinodes marked with "A" (maximum displacement)
    - Wavelength dimension lines with measurements

    Connections:
    - Dashed lines connecting equivalent modes between open and closed pipes
    - Annotations explaining why closed pipe has only odd harmonics

    Style: Technical diagram with clear labels

    Labels:
    - "Open Pipe" and "Closed Pipe" headers
    - "Fundamental (n=1)", "2nd Harmonic (n=2)", etc.
    - Frequency calculations with example (L=0.5m, v=343 m/s)
    - "Node (N): No displacement"
    - "Antinode (A): Maximum displacement"
    - Wavelength formulas: λ_n = 2L/n (open), λ_n = 4L/n (closed, odd n)

    Color scheme:
    - Blue for compressions
    - Red for rarefactions
    - Black outline for pipe
    - Green curves for displacement waves
    - Orange markers for nodes and antinodes

    Implementation: Create as SVG diagram or use drawing tool with clear annotations
</details>

## Summary

Waves are fundamental to understanding how energy moves through our world. In this chapter, we explored mechanical waves—disturbances that propagate through media, transferring energy without permanently moving matter. We distinguished between transverse waves (perpendicular particle motion) and longitudinal waves (parallel particle motion), and learned to characterize all waves using wavelength, frequency, period, speed, and amplitude.

The superposition principle explains how waves interact: when waves overlap, their displacements add. This leads to constructive interference (waves combining to larger amplitudes) and destructive interference (waves canceling). Standing waves result from interference between waves traveling in opposite directions, creating stationary patterns of nodes and antinodes.

Waves exhibit three key behaviors when encountering boundaries and obstacles:
- **Reflection**: Bouncing back from boundaries
- **Refraction**: Bending when entering a new medium with different wave speed
- **Diffraction**: Spreading around obstacles or through openings

The Doppler effect describes how frequency changes when sources or observers are in motion, explaining phenomena from ambulance sirens to astronomical red shifts. When sources exceed the wave speed, shock waves form, creating sonic booms.

Sound waves exemplify all these principles. These longitudinal mechanical waves travel at speeds depending on the medium (343 m/s in air at 20°C). We measure sound intensity using the logarithmic decibel scale, which matches our ears' perception. Pitch relates to frequency (audible range: 20-20,000 Hz), with infrasound below and ultrasound above this range. Loudness relates to amplitude and intensity.

Musical sounds arise from complex wave interactions:
- **Beats**: Interference between slightly different frequencies creates pulsing loudness
- **Harmonics**: Instruments vibrate at multiple frequencies simultaneously, creating rich timbres
- **Acoustic resonance**: Objects vibrate strongly at their natural frequencies, amplifying specific sounds

Understanding waves gives us insight into everything from how musical instruments create beautiful sounds to how doctors use ultrasound to see inside the body, from why earthquakes are so destructive to how bats navigate in total darkness. Waves connect the microscopic world of vibrating atoms to the cosmic scale of gravitational waves rippling through spacetime.

## Key Equations

| Concept | Equation | Variables |
|---------|----------|-----------|
| Wave speed | $v = f\lambda$ | v = wave speed, f = frequency, λ = wavelength |
| Period-frequency | $T = \frac{1}{f}$ | T = period, f = frequency |
| Doppler (moving source) | $f' = f\left(\frac{v}{v \pm v_s}\right)$ | f' = observed frequency, v = wave speed, v_s = source speed |
| Doppler (moving observer) | $f' = f\left(\frac{v \pm v_o}{v}\right)$ | v_o = observer speed |
| Sound level | $\beta = 10\log_{10}\left(\frac{I}{I_0}\right)$ | β = decibels, I = intensity, I₀ = 10⁻¹² W/m² |
| Beat frequency | $f_{beat} = \|f_1 - f_2\|$ | f₁, f₂ = frequencies of interfering waves |
| String harmonics | $f_n = \frac{n}{2L}\sqrt{\frac{T}{\mu}}$ | n = harmonic number, L = length, T = tension, μ = mass/length |
| Open pipe harmonics | $f_n = \frac{nv}{2L}$ | n = 1, 2, 3... (all harmonics) |
| Closed pipe harmonics | $f_n = \frac{nv}{4L}$ | n = 1, 3, 5... (odd harmonics only) |

## Practice Problems

1. **Wave properties**: A wave has a frequency of 5 Hz and travels at 20 m/s. Calculate its wavelength and period.

2. **Doppler effect**: An ambulance siren emits sound at 800 Hz. If the ambulance approaches you at 30 m/s, what frequency do you hear? (Use v_sound = 343 m/s)

3. **Sound intensity**: A sound has an intensity of 10⁻⁴ W/m². What is its level in decibels?

4. **Standing waves**: A guitar string is 64 cm long. What is the wavelength of the fundamental mode? What about the third harmonic?

5. **Beats**: Two tuning forks produce beats with a frequency of 4 Hz. If one fork is 256 Hz, what are the two possible frequencies of the other fork?

## Connections to Other Topics

The concepts in this chapter connect to:

- **Chapter 9 (Oscillations)**: Simple harmonic motion is the basis for wave motion
- **Chapter 11 (Light and Optics)**: Light exhibits all wave behaviors (interference, diffraction, refraction)
- **Energy concepts**: Waves transport energy; intensity relates to energy flow
- **Mathematics**: Trigonometric functions describe wave motion
- **Future physics**: Wave-particle duality in quantum mechanics
- **Engineering**: Acoustical engineering, noise control, medical imaging
- **Music**: All musical instruments operate through wave principles

## Further Exploration

To deepen your understanding of waves and sound:

- Experiment with musical instruments to explore harmonics and resonance
- Use smartphone apps to measure sound levels in different environments
- Investigate how noise-canceling headphones use destructive interference
- Research how whales and dolphins use sound to communicate across vast ocean distances
- Explore applications of ultrasound in medicine and industry
- Study how concert halls are designed for optimal acoustics using wave principles
