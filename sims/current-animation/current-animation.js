// Electric Current Circuit Simulation with Battery and Resistor
// This simulation shows a circuit with a battery on the left, resistor on the right,
// and animated current flow. Users can switch between conventional current and electron flow,
// and adjust voltage and resistance to see how current speed changes (Ohm's Law: I = V/R).

// Canvas dimensions following standard MicroSim layout
let canvasWidth = 450;                      // Initial width that will be updated responsively
let drawHeight = 400;                       // Height of simulation/drawing area
let controlHeight = 105;                    // Height of controls region
let canvasHeight = drawHeight + controlHeight; // Total canvas height
let margin = 25;                            // Margin for visual elements
let sliderLeftMargin = 145;                 // Left margin for slider positioning
let defaultTextSize = 16;                   // Base text size for readability

// Global variables for responsive design
let containerWidth;                         // Calculated from container upon resize
let containerHeight = canvasHeight;         // Usually fixed height on page

// Simulation variables
let isRunning = false;
let animationTime = 0;                      // Track animation time independently
let voltageSlider;
let resistanceSlider;
let startButton;
let resetButton;
let currentModeRadio;

// Wire drawing parameters
let lineWidth = 6;

// Circuit component dimensions
let batteryWidth = 40;
let batteryHeight = 80;
let resistorWidth = 30;
let resistorHeight = 100;

// Current flow mode: true = conventional current (+ to -), false = electron flow (- to +)
let showConventionalCurrent = true;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  // Create voltage control slider (1-12 volts)
  voltageSlider = createSlider(1, 12, 6, 0.5);
  voltageSlider.position(sliderLeftMargin, drawHeight + 15);
  voltageSlider.size(containerWidth - sliderLeftMargin - 25);

  // Create resistance control slider (1-100 ohms)
  resistanceSlider = createSlider(1, 100, 20, 1);
  resistanceSlider.position(sliderLeftMargin, drawHeight + 40);
  resistanceSlider.size(containerWidth - sliderLeftMargin - 25);

  // Create start/pause button
  startButton = createButton('Start');
  startButton.position(10, drawHeight + 70);
  startButton.mousePressed(toggleSimulation);

  // Create reset button
  resetButton = createButton('Reset');
  resetButton.position(70, drawHeight + 70);
  resetButton.mousePressed(resetSimulation);

  // Create radio button for current mode
  currentModeRadio = createRadio();
  currentModeRadio.option('conventional', 'Conventional Current');
  currentModeRadio.option('electron', 'Electron Flow');
  currentModeRadio.selected('conventional');
  currentModeRadio.position(140, drawHeight + 65);
  currentModeRadio.style('font-size', '14px');
  currentModeRadio.changed(updateCurrentMode);

  describe('Circuit simulation with battery and resistor showing current flow. Users can switch between conventional current and electron flow, and adjust voltage and resistance.', LABEL);

  // Notify parent frame of initial size
  window.parent.postMessage({ type: 'microsim-resize', height: canvasHeight }, '*');
}

function updateCurrentMode() {
  showConventionalCurrent = (currentModeRadio.value() === 'conventional');
}

function draw() {
  // Draw simulation area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, containerWidth, drawHeight);

  // Draw controls area background
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, containerWidth, controlHeight);

  // Draw title
  fill('black');
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  text("Circuit Current Simulation", containerWidth/2, 10);

  // Reset text properties for other elements
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);

  // Get current slider values
  let voltage = voltageSlider.value();
  let resistance = resistanceSlider.value();
  let spacing = 1.0; // Fixed spacing for particles

  // Calculate current using Ohm's Law: I = V/R
  // Scale speed based on current (higher current = faster movement)
  let current = voltage / resistance;
  let currentSpeed = current * 0.15; // Scale factor for visible animation

  // Update animation time only when running
  if (isRunning) {
    animationTime += deltaTime;
  }

  // Calculate circuit boundaries
  let circuitLeft = margin * 3;
  let circuitRight = containerWidth - margin * 3;
  let circuitTop = margin * 2.5;
  let circuitBottom = drawHeight - margin * 2;

  // Calculate component positions
  let batteryX = circuitLeft - batteryWidth/2;
  let batteryY = (circuitTop + circuitBottom)/2 - batteryHeight/2;

  let resistorX = circuitRight - resistorWidth/2;
  let resistorY = (circuitTop + circuitBottom)/2 - resistorHeight/2;

  // Draw the circuit wires with animated current
  // The direction depends on current mode:
  // Conventional current: flows from + (top of battery) through circuit clockwise
  // Electron flow: flows from - (bottom of battery) through circuit counter-clockwise

  let currentColor = showConventionalCurrent ? color(255, 0, 0) : color(0, 100, 255);

  if (showConventionalCurrent) {
    // Conventional current flows clockwise (from + terminal)
    // Top wire: left to right
    drawAnimatedWireWithColor(circuitLeft, circuitTop, circuitRight, circuitTop,
                               currentSpeed, spacing, currentColor);
    // Right wire: top to bottom (around resistor)
    drawAnimatedWireWithColor(circuitRight, circuitTop, circuitRight, resistorY,
                               currentSpeed, spacing, currentColor);
    drawAnimatedWireWithColor(circuitRight, resistorY + resistorHeight, circuitRight, circuitBottom,
                               currentSpeed, spacing, currentColor);
    // Bottom wire: right to left
    drawAnimatedWireWithColor(circuitRight, circuitBottom, circuitLeft, circuitBottom,
                               currentSpeed, spacing, currentColor);
    // Left wire: bottom to top (around battery)
    drawAnimatedWireWithColor(circuitLeft, circuitBottom, circuitLeft, batteryY + batteryHeight,
                               currentSpeed, spacing, currentColor);
    drawAnimatedWireWithColor(circuitLeft, batteryY, circuitLeft, circuitTop,
                               currentSpeed, spacing, currentColor);
  } else {
    // Electron flow goes counter-clockwise (from - terminal)
    // Left wire: top to bottom
    drawAnimatedWireWithColor(circuitLeft, circuitTop, circuitLeft, batteryY,
                               currentSpeed, spacing, currentColor);
    drawAnimatedWireWithColor(circuitLeft, batteryY + batteryHeight, circuitLeft, circuitBottom,
                               currentSpeed, spacing, currentColor);
    // Bottom wire: left to right
    drawAnimatedWireWithColor(circuitLeft, circuitBottom, circuitRight, circuitBottom,
                               currentSpeed, spacing, currentColor);
    // Right wire: bottom to top (around resistor)
    drawAnimatedWireWithColor(circuitRight, circuitBottom, circuitRight, resistorY + resistorHeight,
                               currentSpeed, spacing, currentColor);
    drawAnimatedWireWithColor(circuitRight, resistorY, circuitRight, circuitTop,
                               currentSpeed, spacing, currentColor);
    // Top wire: right to left
    drawAnimatedWireWithColor(circuitRight, circuitTop, circuitLeft, circuitTop,
                               currentSpeed, spacing, currentColor);
  }

  // Draw battery on left side
  drawBattery(batteryX, batteryY, batteryWidth, batteryHeight, 'vertical');

  // Draw voltage label to the right of battery
  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text(voltage + 'V', batteryX + batteryWidth + 8, batteryY + batteryHeight/2);

  // Draw resistor on right side
  drawResistor(resistorX, resistorY, resistorWidth, resistorHeight, 3, VERTICAL,
               resistance + 'Ω', LEFT);

  // Draw current value display
  fill('black');
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  text("Current: " + current.toFixed(2) + " A", containerWidth/2, circuitBottom + 15);

  // Draw Ohm's Law equation
  textSize(12);
  text("I = V/R = " + voltage + "V / " + resistance + "Ω = " + current.toFixed(2) + "A",
       containerWidth/2, circuitBottom + 35);

  // Draw control labels
  drawControlLabels(voltage, resistance);
}

// Draw a wire with animated current particles in a specific color
function drawAnimatedWireWithColor(x1, y1, x2, y2, speed, spacing, particleColor) {
  let distance = dist(x1, y1, x2, y2);
  let spacingPixels = spacing * 40; // Convert spacing to pixels

  // Draw the wire
  stroke('black');
  strokeWeight(lineWidth);
  line(x1, y1, x2, y2);

  // Draw moving current particles
  if (spacingPixels > 0 && distance > 0) {
    fill(particleColor);
    noStroke();

    // Calculate offset position
    let firstPos = (animationTime * speed) % spacingPixels;

    // Draw particles evenly spaced
    for (let pos = firstPos; pos < distance; pos += spacingPixels) {
      let t = pos / distance;
      let x = lerp(x1, x2, t);
      let y = lerp(y1, y2, t);
      circle(x, y, 10);
    }
  }
}

function drawControlLabels(voltage, resistance) {
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);

  // Voltage label and value
  text('Voltage: ' + voltage.toFixed(1) + ' V', 10, drawHeight + 22);

  // Resistance label and value
  text('Resistance: ' + resistance + ' Ω', 10, drawHeight + 47);
}

function toggleSimulation() {
  isRunning = !isRunning;
  startButton.html(isRunning ? 'Pause' : 'Start');
}

function resetSimulation() {
  // Reset sliders to default values
  voltageSlider.value(6);
  resistanceSlider.value(20);

  // Reset to conventional current
  currentModeRadio.selected('conventional');
  showConventionalCurrent = true;

  // Reset animation time
  animationTime = 0;

  // Stop simulation
  isRunning = false;
  startButton.html('Start');

  // Redraw to show reset state
  redraw();
}

// Required functions for responsive design
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();

  // Resize sliders to match new width
  voltageSlider.size(containerWidth - sliderLeftMargin - 15);
  resistanceSlider.size(containerWidth - sliderLeftMargin - 15);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}

// ============================================
// Circuit Component Drawing Functions
// (from p5-circuit-lib.js)
// ============================================

// Define orientation constants
if (typeof HORIZONTAL === 'undefined') window.HORIZONTAL = 0;
if (typeof VERTICAL === 'undefined') window.VERTICAL = 1;

function drawBattery(x, y, width, height, orientation) {
  push();

  if (orientation === "horizontal") {
    translate(x + height, y);
    rotate(PI/2);
    x = 0;
    y = 0;
    let temp = width;
    width = height;
    height = temp;
  } else {
    translate(x, y);
    x = 0;
    y = 0;
  }

  let terminalHeight = height * 0.1;
  let bodyHeight = height - terminalHeight;
  let goldPercent = 0.4;
  let goldHeight = bodyHeight * goldPercent;
  let blackHeight = bodyHeight * (1 - goldPercent);
  let batteryBorder = width * 0.1;
  let innerWidth = width - (batteryBorder * 2);

  // Battery outline
  strokeWeight(2);
  stroke(100);
  fill(240);
  rect(0, 0, width, height, 5, 5, 5, 5);

  // Positive terminal
  fill(220);
  noStroke();
  rect(width * 0.3, -terminalHeight, width * 0.4, terminalHeight);

  // Positive electrode (gold)
  fill('gold');
  rect(batteryBorder, batteryBorder, innerWidth, goldHeight);

  // Negative electrode (black)
  fill('black');
  rect(batteryBorder, batteryBorder + goldHeight, innerWidth, blackHeight);

  // Terminal symbols
  strokeWeight(2);
  stroke(50);

  // Plus symbol
  let centerX = width / 2;
  let plusY = batteryBorder + goldHeight / 2;
  line(centerX - 8, plusY, centerX + 8, plusY);
  line(centerX, plusY - 8, centerX, plusY + 8);

  // Minus symbol
  let minusY = batteryBorder + goldHeight + blackHeight / 2;
  stroke('gray');
  line(centerX - 8, minusY * 1.2, centerX + 8, minusY * 1.2);

  pop();
}

function drawResistor(x, y, rwidth, rheight, lineWeight, orientation, label, labelPosition) {
  strokeWeight(lineWeight);
  stroke(0);
  noFill();

  let endWirePercent = 0.15;
  let peaks = 6;

  if (orientation === HORIZONTAL) {
    let halfHeight = y + rheight/2;
    let endWireLength = rwidth * endWirePercent;
    let peakWidth = (rwidth - 2*endWireLength) / peaks;
    let peakHeight = rheight / 3;

    beginShape();
    line(x, halfHeight, x + endWireLength, halfHeight);
    line(x + rwidth - endWireLength, halfHeight, x + rwidth, halfHeight);
    vertex(x + endWireLength, halfHeight);
    for(let i = 0; i <= peaks - 1; i++) {
      let xPos = x + endWireLength + i * peakWidth + peakWidth/2;
      let yPos = (i % 2 === 0) ? halfHeight - peakHeight : halfHeight + peakHeight;
      vertex(xPos, yPos);
    }
    vertex(x + rwidth - endWireLength, halfHeight);
    endShape();
  } else if (orientation === VERTICAL) {
    let halfwidth = x + rwidth/2;
    let endWireLength = rheight * endWirePercent;
    let peakHeight = rwidth / 3;
    let peakWidth = (rheight - 2*endWireLength) / peaks;

    beginShape();
    vertex(halfwidth, y);
    vertex(halfwidth, y + endWireLength);
    for(let i = 0; i <= peaks - 1; i++) {
      let yPos = y + endWireLength + i * peakWidth + peakWidth/2;
      let xPos = (i % 2 === 0) ? halfwidth - peakHeight : halfwidth + peakHeight;
      vertex(xPos, yPos);
    }
    vertex(halfwidth, y + rheight - endWireLength);
    vertex(halfwidth, y + rheight);
    endShape();
  }

  // Draw label
  if (label) {
    push();
    noStroke();
    fill(0);
    let resistorSize = orientation === HORIZONTAL ? rwidth : rheight;
    let fontSize = Math.max(10, Math.min(16, resistorSize * 0.14));
    textSize(fontSize);
    textAlign(CENTER, CENTER);

    let labelX, labelY;
    let centerX = x + rwidth / 2;
    let centerY = y + rheight / 2;
    let padding = fontSize * 1.2;

    if (orientation === VERTICAL) {
      let vertPeakHeight = rwidth / 3;
      if (labelPosition === LEFT) {
        labelX = centerX - vertPeakHeight - padding;
        labelY = centerY;
        textAlign(RIGHT, CENTER);
      } else {
        labelX = centerX + vertPeakHeight + padding;
        labelY = centerY;
        textAlign(LEFT, CENTER);
      }
    } else {
      let horizPeakHeight = rheight / 3;
      if (labelPosition === TOP) {
        labelX = centerX;
        labelY = centerY - horizPeakHeight - padding;
      } else {
        labelX = centerX;
        labelY = centerY + horizPeakHeight + padding;
      }
    }

    text(label, labelX, labelY);
    pop();
  }
}
