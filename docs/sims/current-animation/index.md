---
title: Current Animation Test
description: A MicroSim demonstrating the animation of current in wires.
image: /sims/current-animation/current-animation.png
og:image: /sims/current-animation/current-animation.png
social:
   cards: false
---

# Current Animation Test

<iframe src="main.html" height="502px" scrolling="no"></iframe>

[Run the Current Animation Test MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the Current Animation Test MicroSim Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/gZgpvo2zS)

## Description

This MicroSim demonstrates animating electric current flow through a wire circuit. Red circles represent electrons moving along black wire segments, creating a visual representation of current flow. The simulation includes controls for adjusting the speed and spacing of the electrons.

## Algorithm

The `drawAnimatedWire(x1, y1, x2, y2, speed, spacing)` function draws a wire segment with animated electrons flowing from point (x1, y1) to point (x2, y2).

### Key Concept: Single Offset with Even Spacing

To ensure electrons remain evenly spaced regardless of animation time, the algorithm:

1. **Calculates a single starting offset** using modulo arithmetic:
   ```javascript
   let firstPos = (animationTime * speed) % spacingPixels;
   ```
   This gives a value between 0 and `spacingPixels` that smoothly increases over time.

2. **Spaces all electrons evenly** from that offset:
   ```javascript
   for (let pos = firstPos; pos < distance; pos += spacingPixels) {
       // draw electron at pos
   }
   ```

### Why This Approach Works

A naive approach might calculate each electron's position independently:
```javascript
// WRONG: causes uneven spacing when electrons wrap
let electronPos = (animationTime * speed + i * spacingPixels) % distance;
```

This fails because when positions wrap around via modulo, the gaps become inconsistent. For example, with distance=300 and spacing=70, you might get gaps of 70, 20, 70, 70 instead of uniform 70px gaps.

The correct approach ensures every gap equals exactly `spacingPixels` because we start from one offset and add a constant increment.

### Animation Flow

As `animationTime` increases:

- `firstPos` smoothly increases from 0 toward `spacingPixels`
- When it reaches `spacingPixels`, it wraps back to 0
- This creates the illusion of electrons continuously entering at the start and exiting at the end of each wire segment

## Controls

- **Speed Slider**: Controls how fast electrons move along the wires (0.02 to 0.5)
- **Spacing Slider**: Controls the distance between electrons (0.15 to 1.5, multiplied by 50 for pixels)
- **Start/Pause Button**: Toggles the animation on and off
- **Reset Button**: Returns sliders to default values and stops animation

## Usage in Other Projects

To reuse this animation pattern in your own circuit simulations:

```javascript
// In your draw() function:
drawAnimatedWire(startX, startY, endX, endY, speed, spacing);
```

The function handles:

- Drawing the wire as a black line
- Calculating electron positions based on global `animationTime`
- Rendering electrons as red circles
- Maintaining consistent spacing at all parameter values