---
title: Microphone Frequency Visualization with FFT
description: A MicroSim that shows the frequency spectrum of sound coming in from a microphone using the p5.js fft library.
image: /sims/fft-mic/fft-mic.png
og:image: /sims/fft-mic/fft-mic.png
twitter:image: /sims/fft-mic/fft-mic.png
social:
   cards: false
quality_score: 82
hide:
   toc
---
# Microphone Frequency Visualization with FFT

<iframe src="main.html" height="450px" scrolling="no"></iframe>

[Run the Microphone Frequency Visualization with FFT MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

[Edit Microphone Frequency Visualization with FFT MicroSim with the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/89df6y1OK)

## Sample iframe

You can add this MicroSim to your course website by adding the following HTML element:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/fft-mic/main.html" height="450px"  scrolling="no"></iframe>
```

Here is a FFT Microphone Visualizer MicroSim that follows the standard responsive design template. Here are the key features:

## Key Features

**Audio Analysis**: Uses p5.js AudioIn and FFT objects to capture and analyze microphone input in real-time, displaying frequency spectrum data as colorful bars.

**Start/Stop Control**: 

1. A "Start" button in the control region that allows users to start/stop audio recording without clearing the display - when stopped, the last spectrum remains visible.
2. Max Frequency Slider - allows you to set the highest frequency displayed

**Responsive Design**: Follows the standard MicroSim layout with separate drawing and control regions that adapt to different screen sizes.

**Visual Feedback**:

-   Color-coded frequency bars (blue for low frequencies, red for high frequencies)
-   Real-time frequency and amplitude scaling
-   Peak frequency detection and display
-   Status indicators showing recording state

**Educational Value**: Students can observe how different sounds (voice, music, noise) create different frequency patterns, helping them understand concepts like:

-   Frequency analysis and Fourier transforms
-   Audio signal processing
-   Harmonic content in different sounds
-   Real-time data visualization

## Usage Instructions


1.  Click "Start" to begin microphone input (browser will request permission)
2.  Make sounds near the microphone to see the frequency spectrum
3.  Click "Stop" to pause recording (spectrum remains visible)
4.  Click "Start" again to resume recording

The visualization shows frequency on the x-axis (0 to ~22kHz) and amplitude on the y-axis, with the peak frequency displayed in the control area. This provides an excellent hands-on way to explore audio signal processing concepts.

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Explain what the Fast Fourier Transform (FFT) does conceptually
2. Identify the relationship between time domain sound and frequency domain representation
3. Recognize harmonic patterns in different types of sounds
4. Understand the frequency ranges of human hearing (20 Hz - 20 kHz)

### Grade Level

9th-12th Grade Physics or Music Technology

### Duration

30-45 minutes

### Prerequisites

- Basic understanding of sound as vibration
- Familiarity with the concept of frequency and pitch

### Materials Needed

- Computer with microphone (built-in or external)
- Various sound sources (tuning fork, musical instruments, smartphone with tone generator app)

### Lesson Activities

**Introduction (5 minutes)**

1. Discuss how sound is a pressure wave traveling through air
2. Explain that the FFT converts time-domain signals to frequency-domain
3. Show that complex sounds are made of multiple frequencies combined

**Exploration Activities (20 minutes)**

1. **Human Voice**: Have students speak, hum, or sing different notes and observe the frequency patterns
2. **Vowel Sounds**: Compare the spectra of different vowel sounds (ah, ee, oh, oo)
3. **Whistling**: Observe the nearly pure single frequency of a whistle
4. **Clapping**: See the broadband spectrum of an impulse sound
5. **Musical Instruments**: If available, show the harmonic series of different instruments

**Discussion Questions (10 minutes)**

1. Why do different instruments playing the same note sound different?
2. What frequencies does the human voice typically produce?
3. How does the spectrum change when you change pitch vs. loudness?

### Assessment

Students identify mystery sounds by their frequency spectra alone, then verify by listening.

## References

1. [Fast Fourier Transform - Wikipedia](https://en.wikipedia.org/wiki/Fast_Fourier_transform) - Mathematical background and history of the FFT algorithm

2. [Seeing Sound: Introduction to Spectral Analysis](https://www.phys.uconn.edu/~gibson/Notes/Section5_2/Sec5_2.htm) - University of Connecticut - Physics of sound visualization

3. [p5.js Sound Library Reference](https://p5js.org/reference/#/libraries/p5.sound) - Official documentation for the p5.js FFT and audio analysis functions