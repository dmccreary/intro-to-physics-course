// Energy Transformation in SHM Bar Chart Animation
// Shows KE, PE, and Total E during oscillation

let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// SHM parameters
let amplitude = 2.0;  // meters
let springConstant = 50;  // N/m
let phase = 0;

// Animation
let isRunning = true;

// UI elements
let ampSlider, kSlider;
let startButton, resetButton;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    ampSlider = createSlider(0.5, 3.0, 2.0, 0.1);
    ampSlider.position(130, drawHeight + 15);
    ampSlider.size(120);
    ampSlider.input(() => amplitude = ampSlider.value());

    kSlider = createSlider(10, 100, 50, 5);
    kSlider.position(130, drawHeight + 50);
    kSlider.size(120);
    kSlider.input(() => springConstant = kSlider.value());

    startButton = createButton('Pause');
    startButton.position(320, drawHeight + 25);
    startButton.size(70, 28);
    startButton.mousePressed(() => {
        isRunning = !isRunning;
        startButton.html(isRunning ? 'Pause' : 'Start');
    });

    resetButton = createButton('Reset');
    resetButton.position(400, drawHeight + 25);
    resetButton.size(70, 28);
    resetButton.mousePressed(() => phase = 0);

    describe('Animated bar chart showing energy transformation between kinetic and potential energy during simple harmonic motion', LABEL);
}

function draw() {
    updateCanvasSize();

    if (isRunning) {
        phase += 0.03;
    }

    // Calculate energies
    let omega = sqrt(springConstant / 1);  // mass = 1 kg
    let x = amplitude * cos(phase);
    let v = -amplitude * omega * sin(phase);

    let PE = 0.5 * springConstant * x * x;
    let KE = 0.5 * 1 * v * v;  // mass = 1 kg
    let totalE = 0.5 * springConstant * amplitude * amplitude;

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
    text('Energy Transformation in SHM', canvasWidth / 2, 10);

    // Draw mass-spring animation
    drawMassSpring(180, 80, x);

    // Draw energy bars
    drawEnergyBars(canvasWidth / 2 + 50, 80, 250, 280, KE, PE, totalE);

    // Draw info
    drawEnergyInfo(KE, PE, totalE, x);

    // Control labels
    drawControlLabels();
}

function drawMassSpring(cx, startY, x) {
    let naturalLength = 80;
    let displacement = x * 40;
    let massSize = 50;

    // Wall
    fill(100);
    noStroke();
    rect(cx - 80, startY, 15, 150);

    // Spring
    let springEnd = cx + naturalLength + displacement - massSize/2;

    stroke(80);
    strokeWeight(3);
    noFill();

    let numCoils = 12;
    let coilWidth = 20;
    beginShape();
    vertex(cx - 65, startY + 75);
    for (let i = 0; i <= numCoils; i++) {
        let px = cx - 65 + (i / numCoils) * (springEnd - cx + 65);
        let py = startY + 75 + (i % 2 === 0 ? -coilWidth : coilWidth);
        vertex(px, py);
    }
    vertex(springEnd, startY + 75);
    endShape();

    // Mass
    let massX = cx + naturalLength + displacement;

    fill(70, 100, 150);
    stroke(50, 70, 120);
    strokeWeight(2);
    rect(massX - massSize/2, startY + 50, massSize, massSize, 8);

    // Equilibrium marker
    stroke(150);
    strokeWeight(1);
    setLineDash([5, 5]);
    line(cx + naturalLength, startY + 30, cx + naturalLength, startY + 130);
    setLineDash([]);

    // Position label
    fill(80);
    textSize(12);
    textAlign(CENTER, TOP);
    noStroke();
    text('x = ' + x.toFixed(2) + ' m', massX, startY + 110);

    // Labels for positions
    if (abs(x) > amplitude * 0.9) {
        fill(220, 100, 50);
        textSize(11);
        text('PE maximum', massX, startY + 130);
        text('KE = 0', massX, startY + 145);
    } else if (abs(x) < 0.1) {
        fill(50, 150, 50);
        text('KE maximum', massX, startY + 130);
        text('PE = 0', massX, startY + 145);
    }
}

function drawEnergyBars(x, y, w, h, KE, PE, totalE) {
    let barWidth = 60;
    let barSpacing = 80;
    let maxHeight = h - 50;

    // Background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    // Title
    fill(40);
    textSize(14);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    noStroke();
    text('Energy Distribution', x + w/2, y + 10);
    textStyle(NORMAL);

    // Total energy line
    let totalHeight = maxHeight;
    stroke(200, 50, 50);
    strokeWeight(2);
    setLineDash([5, 5]);
    line(x + 30, y + 45 + maxHeight - totalHeight, x + w - 30, y + 45 + maxHeight - totalHeight);
    setLineDash([]);

    // Bar positions
    let bar1X = x + 40;
    let bar2X = x + 40 + barSpacing;
    let bar3X = x + 40 + barSpacing * 2;
    let barBottom = y + 45 + maxHeight;

    // KE bar (green)
    let keHeight = (KE / totalE) * maxHeight;
    fill(70, 180, 70);
    stroke(50, 140, 50);
    strokeWeight(1);
    rect(bar1X, barBottom - keHeight, barWidth, keHeight);

    // PE bar (blue)
    let peHeight = (PE / totalE) * maxHeight;
    fill(70, 130, 220);
    stroke(50, 100, 180);
    rect(bar2X, barBottom - peHeight, barWidth, peHeight);

    // Total E bar (red, always full)
    fill(220, 70, 70);
    stroke(180, 50, 50);
    rect(bar3X, barBottom - maxHeight, barWidth, maxHeight);

    // Bar labels
    fill(40);
    textSize(12);
    textAlign(CENTER, TOP);
    noStroke();
    text('Kinetic', bar1X + barWidth/2, barBottom + 5);
    text('Energy', bar1X + barWidth/2, barBottom + 18);

    text('Potential', bar2X + barWidth/2, barBottom + 5);
    text('Energy', bar2X + barWidth/2, barBottom + 18);

    text('Total', bar3X + barWidth/2, barBottom + 5);
    text('Energy', bar3X + barWidth/2, barBottom + 18);

    // Value labels on bars
    textSize(11);
    textAlign(CENTER, BOTTOM);

    if (keHeight > 20) {
        fill(255);
        text(KE.toFixed(1) + ' J', bar1X + barWidth/2, barBottom - keHeight/2 + 6);
    }

    if (peHeight > 20) {
        fill(255);
        text(PE.toFixed(1) + ' J', bar2X + barWidth/2, barBottom - peHeight/2 + 6);
    }

    fill(255);
    text(totalE.toFixed(1) + ' J', bar3X + barWidth/2, barBottom - maxHeight/2 + 6);

    // Stacked bar representation
    fill(80);
    textSize(10);
    textAlign(LEFT, TOP);
    text('KE + PE = Total', x + 10, y + h - 25);
}

function drawEnergyInfo(KE, PE, totalE, x) {
    let infoX = 50;
    let infoY = 280;

    fill(255, 255, 245);
    stroke(200);
    strokeWeight(1);
    rect(infoX, infoY, 200, 130, 8);

    fill(40);
    textSize(13);
    textAlign(LEFT, TOP);
    noStroke();

    text('Current State:', infoX + 15, infoY + 15);

    textSize(12);
    fill(70, 180, 70);
    text('KE = ½mv² = ' + KE.toFixed(2) + ' J', infoX + 15, infoY + 40);

    fill(70, 130, 220);
    text('PE = ½kx² = ' + PE.toFixed(2) + ' J', infoX + 15, infoY + 60);

    fill(220, 70, 70);
    textStyle(BOLD);
    text('Total E = ½kA² = ' + totalE.toFixed(2) + ' J', infoX + 15, infoY + 85);
    textStyle(NORMAL);

    fill(80);
    textSize(11);
    text('Energy is conserved!', infoX + 15, infoY + 110);
}

function drawControlLabels() {
    fill('black');
    textSize(13);
    textAlign(LEFT, CENTER);
    noStroke();

    text('Amplitude A:', 10, drawHeight + 28);
    text(amplitude.toFixed(1) + ' m', 260, drawHeight + 28);

    text('Spring k:', 10, drawHeight + 63);
    text(springConstant + ' N/m', 260, drawHeight + 63);
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(600, container.offsetWidth);
    }
}
