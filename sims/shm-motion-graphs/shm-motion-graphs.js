// Position-Velocity-Acceleration Relationship in SHM MicroSim
// Shows synchronized graphs of x, v, a during simple harmonic motion

let canvasWidth = 800;
let drawHeight = 550;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 140;

// SHM parameters
let amplitude = 2.0;  // meters
let frequency = 0.5;  // Hz
let mass = 1.0;       // kg (fixed)
let phase = 0;        // Current phase

// Animation
let isRunning = true;
let showVectors = true;

// Graph data
let graphHistory = [];
let maxGraphPoints = 400;

// UI elements
let ampSlider, freqSlider;
let startButton, resetButton;
let vectorCheckbox;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    ampSlider = createSlider(0.5, 3.0, 2.0, 0.1);
    ampSlider.position(sliderLeftMargin, drawHeight + 15);
    ampSlider.size(150);
    ampSlider.input(() => {
        amplitude = ampSlider.value();
        resetGraphs();
    });

    freqSlider = createSlider(0.2, 2.0, 0.5, 0.1);
    freqSlider.position(sliderLeftMargin, drawHeight + 50);
    freqSlider.size(150);
    freqSlider.input(() => {
        frequency = freqSlider.value();
        resetGraphs();
    });

    startButton = createButton('Pause');
    startButton.position(350, drawHeight + 25);
    startButton.size(70, 28);
    startButton.mousePressed(() => {
        isRunning = !isRunning;
        startButton.html(isRunning ? 'Pause' : 'Start');
    });

    resetButton = createButton('Reset');
    resetButton.position(430, drawHeight + 25);
    resetButton.size(70, 28);
    resetButton.mousePressed(resetGraphs);

    vectorCheckbox = createCheckbox(' Show vectors on mass', true);
    vectorCheckbox.position(350, drawHeight + 60);
    vectorCheckbox.changed(() => showVectors = vectorCheckbox.checked());

    describe('Simple harmonic motion visualization showing position, velocity, and acceleration with synchronized graphs', LABEL);
}

function draw() {
    updateCanvasSize();

    // Update phase
    if (isRunning) {
        phase += TWO_PI * frequency * (1/60);  // Assuming 60 fps
    }

    // Calculate current values
    let omega = TWO_PI * frequency;
    let x = amplitude * cos(phase);
    let v = -amplitude * omega * sin(phase);
    let a = -amplitude * omega * omega * cos(phase);

    // Store history
    if (isRunning && frameCount % 2 === 0) {
        graphHistory.push({ x: x, v: v, a: a, t: phase / (TWO_PI * frequency) });
        if (graphHistory.length > maxGraphPoints) {
            graphHistory.shift();
        }
    }

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill(248, 248, 248);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    textSize(20);
    textAlign(CENTER, TOP);
    noStroke();
    text('Position, Velocity, and Acceleration in SHM', canvasWidth / 2, 10);

    // Draw mass-spring system
    drawMassSpring(140, 280, x, v, a);

    // Draw graphs
    let graphX = 320;
    let graphY = 55;
    let graphW = canvasWidth - graphX - 30;
    let graphH = 140;
    let graphSpacing = 160;

    drawGraph(graphX, graphY, graphW, graphH, 'Position x(t)', 'x', amplitude, color(220, 70, 70), 'position');
    drawGraph(graphX, graphY + graphSpacing, graphW, graphH, 'Velocity v(t)', 'v', amplitude * omega, color(70, 150, 70), 'velocity');
    drawGraph(graphX, graphY + graphSpacing * 2, graphW, graphH, 'Acceleration a(t)', 'a', amplitude * omega * omega, color(70, 70, 220), 'acceleration');

    // Current time indicator
    drawTimeIndicator(graphX, graphY, graphW, graphSpacing);

    // Draw control labels
    drawControlLabels();
}

function drawMassSpring(cx, cy, x, v, a) {
    let springRestLength = 80;
    let springStretch = x * 30;  // Scale for display
    let massSize = 50;

    // Wall
    fill(100);
    noStroke();
    rect(cx - 60, cy - 60, 15, 120);

    // Spring
    let springStart = cx - 45;
    let springEnd = cx + springRestLength + springStretch - massSize/2;

    stroke(100);
    strokeWeight(3);
    noFill();

    // Draw spring as zigzag
    let numCoils = 12;
    let coilWidth = 15;
    beginShape();
    vertex(springStart, cy);
    for (let i = 0; i <= numCoils; i++) {
        let px = springStart + (i / numCoils) * (springEnd - springStart);
        let py = cy + (i % 2 === 0 ? -coilWidth : coilWidth);
        vertex(px, py);
    }
    vertex(springEnd, cy);
    endShape();

    // Mass
    let massX = cx + springRestLength + springStretch;
    fill(70, 100, 150);
    stroke(50, 70, 120);
    strokeWeight(2);
    rect(massX - massSize/2, cy - massSize/2, massSize, massSize, 8);

    // Equilibrium line
    stroke(150);
    strokeWeight(1);
    setLineDash([5, 5]);
    line(cx + springRestLength, cy - 80, cx + springRestLength, cy + 80);
    setLineDash([]);

    fill(100);
    textSize(11);
    textAlign(CENTER, TOP);
    noStroke();
    text('Equilibrium', cx + springRestLength, cy + 85);

    // Vectors on mass
    if (showVectors) {
        let vecScale = 15;

        // Velocity vector (green)
        if (abs(v) > 0.1) {
            stroke(70, 180, 70);
            strokeWeight(4);
            let vx = v * vecScale;
            line(massX, cy - 40, massX + vx, cy - 40);

            fill(70, 180, 70);
            noStroke();
            push();
            translate(massX + vx, cy - 40);
            rotate(vx > 0 ? 0 : PI);
            triangle(0, 0, -10, -5, -10, 5);
            pop();

            textSize(12);
            text('v', massX + vx/2, cy - 55);
        }

        // Acceleration vector (blue)
        if (abs(a) > 0.1) {
            stroke(70, 70, 220);
            strokeWeight(4);
            let ax = a * vecScale * 0.3;  // Scale down acceleration
            line(massX, cy + 40, massX + ax, cy + 40);

            fill(70, 70, 220);
            noStroke();
            push();
            translate(massX + ax, cy + 40);
            rotate(ax > 0 ? 0 : PI);
            triangle(0, 0, -10, -5, -10, 5);
            pop();

            textSize(12);
            text('a', massX + ax/2, cy + 50);
        }
    }

    // Position label
    fill(220, 70, 70);
    textSize(14);
    textAlign(CENTER, BOTTOM);
    noStroke();
    text('x = ' + x.toFixed(2) + ' m', massX, cy - 60);
}

function drawGraph(x, y, w, h, title, label, maxVal, col, type) {
    // Background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    // Title
    fill(col);
    textSize(13);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    noStroke();
    text(title, x + 10, y + 5);
    textStyle(NORMAL);

    // Graph area
    let gx = x + 40;
    let gy = y + 25;
    let gw = w - 55;
    let gh = h - 35;

    // Axis
    stroke(150);
    strokeWeight(1);
    line(gx, gy + gh/2, gx + gw, gy + gh/2);  // Zero line
    line(gx, gy, gx, gy + gh);  // Y-axis

    // Y-axis labels
    fill(100);
    textSize(9);
    textAlign(RIGHT, CENTER);
    text('+' + maxVal.toFixed(1), gx - 3, gy + 5);
    text('-' + maxVal.toFixed(1), gx - 3, gy + gh - 5);
    text('0', gx - 3, gy + gh/2);

    // Draw data
    if (graphHistory.length > 1) {
        noFill();
        stroke(col);
        strokeWeight(2);
        beginShape();
        for (let i = 0; i < graphHistory.length; i++) {
            let pt = graphHistory[i];
            let val = type === 'position' ? pt.x :
                      type === 'velocity' ? pt.v : pt.a;
            let px = gx + (i / maxGraphPoints) * gw;
            let py = gy + gh/2 - (val / maxVal) * (gh/2 - 5);
            vertex(px, py);
        }
        endShape();
    }
}

function drawTimeIndicator(graphX, graphY, graphW, graphSpacing) {
    if (graphHistory.length > 0) {
        let tx = graphX + 40 + (graphHistory.length / maxGraphPoints) * (graphW - 55);

        stroke(255, 100, 100, 150);
        strokeWeight(1);
        for (let i = 0; i < 3; i++) {
            line(tx, graphY + 25 + i * graphSpacing, tx, graphY + 25 + 105 + i * graphSpacing);
        }
    }
}

function drawControlLabels() {
    fill('black');
    textSize(13);
    textAlign(LEFT, CENTER);
    noStroke();

    text('Amplitude A:', 10, drawHeight + 28);
    text(amplitude.toFixed(1) + ' m', sliderLeftMargin + 160, drawHeight + 28);

    text('Frequency f:', 10, drawHeight + 63);
    text(frequency.toFixed(1) + ' Hz', sliderLeftMargin + 160, drawHeight + 63);
}

function resetGraphs() {
    phase = 0;
    graphHistory = [];
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    ampSlider.position(sliderLeftMargin, drawHeight + 15);
    freqSlider.position(sliderLeftMargin, drawHeight + 50);
    startButton.position(350, drawHeight + 25);
    resetButton.position(430, drawHeight + 25);
    vectorCheckbox.position(350, drawHeight + 60);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(650, container.offsetWidth);
    }
}
