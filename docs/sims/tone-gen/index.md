---
title: Tone Generator MicroSim
description: Interactive tone generator allowing users to create and hear audio tones at different frequencies.
image: /sims/tone-gen/tone-gen.png
og:image: /sims/tone-gen/tone-gen.png
twitter:image: /sims/tone-gen/tone-gen.png
social:
   cards: false
quality_score: 82
hide:
  - toc
---
# Tone Generator MicroSim

<iframe src="./main.html" height="250px" scrolling="no"
  style="overflow: hidden;"></iframe>

You can include this MicroSim in your course by pasting the following HTML directly into your web page.

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/tone-gen/main.html" height="250px" scrolling="no"
  style="overflow: hidden;"></iframe>
```

[Run the MicroSim](./main.html){ .md-button .md-button--primary }
[Edit the MicroSim](https://editor.p5js.org/dmccreary/sketches/NCgsgPY8y)

## Description

This interactive tone generator allows users to create and hear pure audio tones at different frequencies. It demonstrates the fundamental relationship between frequency and pitch—the higher the frequency, the higher the perceived pitch.

### Key Features

- **Frequency Control**: Adjust the frequency slider to generate tones from low bass frequencies to high treble frequencies
- **Real-time Audio**: Hear the tone change instantly as you adjust the frequency
- **Visual Feedback**: See the current frequency value displayed on screen

### How to Use

1. Click the "Start" or "Play" button to begin generating sound
2. Adjust the frequency slider to change the pitch
3. Observe how the displayed frequency corresponds to the sound you hear
4. Click "Stop" to silence the tone

### Physics Concepts

- **Frequency**: The number of wave cycles per second, measured in Hertz (Hz)
- **Pitch**: The perceived highness or lowness of a sound, directly related to frequency
- **Human Hearing Range**: Approximately 20 Hz to 20,000 Hz

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Define frequency and its unit of measurement (Hertz)
2. Explain the relationship between frequency and perceived pitch
3. Identify the approximate frequency ranges of bass, mid, and treble sounds
4. Describe the limits of human hearing

### Grade Level

9th-12th Grade Physics

### Duration

20-30 minutes

### Prerequisites

- Basic understanding of waves
- Concept of vibration and oscillation

### Materials Needed

- Computer with speakers or headphones
- Tone generator MicroSim

### Lesson Activities

**Introduction (5 minutes)**

1. Ask students: "What makes a sound high or low?"
2. Introduce the concept of frequency as cycles per second

**Exploration (10 minutes)**

1. Have students explore the tone generator, starting at 440 Hz (concert A)
2. Ask them to find:
   - The lowest frequency they can hear
   - The highest frequency they can hear
   - A frequency that sounds like a bass guitar (~100 Hz)
   - A frequency that sounds like a whistle (~2000 Hz)

**Discussion (5 minutes)**

1. Compare results—why might different students hear different frequency ranges?
2. Discuss how age affects high-frequency hearing
3. Connect to musical notes (A4 = 440 Hz, doubling frequency = one octave higher)

### Assessment

Students match frequency values to descriptions (bass, mid, treble) and predict what doubling a frequency does to the perceived pitch.

## References

1. [Frequency and Pitch - HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/Sound/freq.html) - Georgia State University - Relationship between frequency and pitch perception

2. [The Physics of Sound](https://www.physicsclassroom.com/class/sound) - The Physics Classroom - Comprehensive sound wave tutorials

3. [p5.js Oscillator Reference](https://p5js.org/reference/#/p5.Oscillator) - Official documentation for generating tones in p5.js
