// Driven Oscillator Interactive MicroSim
// Observe how a driven oscillator responds to different driving frequencies

let canvasWidth = 850;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Sliders
let drivingFreqSlider;
let drivingForceSlider;
let dampingSlider;

// System parameters
let mass = 1.0;
let springConstant = 100;
let naturalFrequency;
let omega0;

// State variables
let x = 0;
let v = 0;
let t = 0;

// Driving parameters
let drivingFreqRatio = 1.0;
let drivingForce = 5;
let damping = 0.5;

// Animation
let isRunning = false;
let amplitudeHistory = [];
let maxAmplitude = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Calculate natural frequency
    omega0 = sqrt(springConstant / mass);
    naturalFrequency = omega0 / (2 * PI);

    // Create sliders
    let sliderY = drawHeight + 25;
    drivingFreqSlider = createSlider(0.1, 3.0, 1.0, 0.05);
    drivingFreqSlider.position(100, sliderY);
    drivingFreqSlider.size(120);

    drivingForceSlider = createSlider(1, 20, 5, 1);
    drivingForceSlider.position(350, sliderY);
    drivingForceSlider.size(120);

    dampingSlider = createSlider(0.1, 2.0, 0.5, 0.1);
    dampingSlider.position(600, sliderY);
    dampingSlider.size(120);

    describe('Interactive driven oscillator simulation showing resonance when driving frequency matches natural frequency', LABEL);
}

function draw() {
    updateCanvasSize();

    // Get slider values
    drivingFreqRatio = drivingFreqSlider.value();
    drivingForce = drivingForceSlider.value();
    damping = dampingSlider.value();

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    textSize(18);
    textAlign(CENTER, TOP);
    noStroke();
    text('Driven Oscillator: Exploring Resonance', canvasWidth / 2, 10);

    // Draw oscillator visualization
    drawOscillator(150, 180);

    // Draw amplitude graph
    drawAmplitudeGraph(450, 50, 350, 200);

    // Draw resonance indicator
    drawResonanceIndicator(450, 280, 350, 100);

    // Draw info panel
    drawInfoPanel(450, 390, 350, 50);

    // Update physics if running
    if (isRunning) {
        updatePhysics();
    }

    // Draw control labels
    drawControlLabels();
}

function drawOscillator(cx, cy) {
    let springX = 50;
    let equilibriumX = cx;
    let displacement = x * 50; // Scale for display

    // Background panel
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(30, 50, 280, 280, 8);

    // Wall
    fill(100);
    noStroke();
    rect(springX - 10, cy - 60, 15, 120);

    // Equilibrium line (dashed)
    stroke(150);
    strokeWeight(1);
    setLineDash([5, 5]);
    line(equilibriumX, cy - 50, equilibriumX, cy + 50);
    setLineDash([]);

    // Label
    fill(120);
    textSize(9);
    textAlign(CENTER, TOP);
    text('equilibrium', equilibriumX, cy + 55);

    // Spring
    drawSpring(springX, cy, equilibriumX + displacement - 25, cy);

    // Mass
    let massX = equilibriumX + displacement;
    fill(70, 130, 220);
    stroke(50, 100, 180);
    strokeWeight(2);
    rectMode(CENTER);
    rect(massX, cy, 50, 50, 5);
    rectMode(CORNER);

    // Driving force arrow
    if (isRunning) {
        let drivingOmega = drivingFreqRatio * omega0;
        let forceValue = drivingForce * cos(drivingOmega * t);
        let arrowLength = forceValue * 3;

        if (abs(arrowLength) > 5) {
            stroke(230, 100, 50);
            strokeWeight(3);
            let arrowStart = massX + 30;
            let arrowEnd = arrowStart + arrowLength;
            line(arrowStart, cy, arrowEnd, cy);

            // Arrowhead
            fill(230, 100, 50);
            noStroke();
            if (arrowLength > 0) {
                triangle(arrowEnd, cy, arrowEnd - 8, cy - 5, arrowEnd - 8, cy + 5);
            } else {
                triangle(arrowEnd, cy, arrowEnd + 8, cy - 5, arrowEnd + 8, cy + 5);
            }
        }
    }

    // Force label
    fill(230, 100, 50);
    textSize(10);
    textAlign(CENTER, TOP);
    text('Driving Force', equilibriumX + 50, cy + 35);

    // Natural frequency display
    fill(60);
    textSize(11);
    textAlign(LEFT, TOP);
    text('Natural frequency:', 40, 60);
    text('ω₀ = ' + omega0.toFixed(1) + ' rad/s', 40, 75);
    text('f₀ = ' + naturalFrequency.toFixed(2) + ' Hz', 40, 90);

    // Current state
    text('Displacement: ' + x.toFixed(3) + ' m', 40, 115);
    text('Velocity: ' + v.toFixed(3) + ' m/s', 40, 130);

    // Buttons
    drawButton(70, 280, 80, 30, isRunning ? 'Pause' : 'Start', color(70, 130, 220));
    drawButton(170, 280, 80, 30, 'Reset', color(150));
}

function drawSpring(x1, y1, x2, y2) {
    let numCoils = 12;
    let amplitude = 15;
    let length = x2 - x1;

    stroke(100);
    strokeWeight(2);
    noFill();

    beginShape();
    vertex(x1, y1);
    for (let i = 0; i <= numCoils; i++) {
        let t = i / numCoils;
        let px = x1 + t * length;
        let py = y1 + sin(i * PI) * amplitude;
        vertex(px, py);
    }
    vertex(x2, y2);
    endShape();
}

function drawAmplitudeGraph(gx, gy, gw, gh) {
    // Background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(gx, gy, gw, gh, 5);

    // Title
    fill(60);
    textSize(12);
    textAlign(CENTER, TOP);
    noStroke();
    text('Displacement vs Time', gx + gw/2, gy + 5);

    // Axes
    stroke(150);
    strokeWeight(1);
    line(gx + 40, gy + gh - 25, gx + gw - 10, gy + gh - 25); // x-axis
    line(gx + 40, gy + 25, gx + 40, gy + gh - 25); // y-axis

    // Zero line
    stroke(200);
    setLineDash([3, 3]);
    line(gx + 40, gy + gh/2, gx + gw - 10, gy + gh/2);
    setLineDash([]);

    // Plot amplitude history
    if (amplitudeHistory.length > 1) {
        noFill();
        stroke(70, 130, 220);
        strokeWeight(2);
        beginShape();
        let graphHeight = (gh - 50) / 2;
        let maxDisplay = max(1, maxAmplitude * 1.2);

        for (let i = 0; i < amplitudeHistory.length; i++) {
            let px = gx + 40 + (i / 500) * (gw - 50);
            let py = gy + gh/2 - (amplitudeHistory[i] / maxDisplay) * graphHeight;
            vertex(px, py);
        }
        endShape();
    }

    // Labels
    fill(100);
    textSize(9);
    textAlign(CENTER, TOP);
    text('Time', gx + gw/2, gy + gh - 15);

    push();
    translate(gx + 15, gy + gh/2);
    rotate(-PI/2);
    textAlign(CENTER, BOTTOM);
    text('x (m)', 0, 0);
    pop();

    // Max amplitude indicator
    textAlign(RIGHT, TOP);
    text('Max: ' + maxAmplitude.toFixed(3) + ' m', gx + gw - 15, gy + 25);
}

function drawResonanceIndicator(rx, ry, rw, rh) {
    // Background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(rx, ry, rw, rh, 5);

    // Title
    fill(60);
    textSize(11);
    textAlign(LEFT, TOP);
    noStroke();
    text('Frequency Ratio: ωd/ω₀ = ' + drivingFreqRatio.toFixed(2), rx + 15, ry + 10);

    // Resonance bar
    let barWidth = rw - 80;
    let barX = rx + 40;
    let barY = ry + 45;
    let barHeight = 20;

    // Background gradient
    for (let i = 0; i < barWidth; i++) {
        let ratio = (i / barWidth) * 3;
        let distFromResonance = abs(1 - ratio);
        let r = map(distFromResonance, 0, 1, 255, 100);
        let g = map(distFromResonance, 0, 1, 80, 200);
        let b = map(distFromResonance, 0, 1, 80, 100);
        stroke(r, g, b);
        line(barX + i, barY, barX + i, barY + barHeight);
    }

    // Border
    noFill();
    stroke(150);
    strokeWeight(1);
    rect(barX, barY, barWidth, barHeight);

    // Resonance marker
    let resonanceX = barX + (1/3) * barWidth;
    stroke(0);
    strokeWeight(2);
    line(resonanceX, barY - 5, resonanceX, barY + barHeight + 5);

    fill(0);
    textSize(9);
    textAlign(CENTER, BOTTOM);
    text('Resonance', resonanceX, barY - 6);

    // Current position marker
    let currentX = barX + (drivingFreqRatio / 3) * barWidth;
    fill(70, 130, 220);
    stroke(255);
    strokeWeight(2);
    triangle(currentX, barY - 3, currentX - 8, barY - 15, currentX + 8, barY - 15);

    // Scale labels
    fill(100);
    textSize(9);
    textAlign(CENTER, TOP);
    noStroke();
    text('0', barX, barY + barHeight + 3);
    text('1', resonanceX, barY + barHeight + 3);
    text('2', barX + (2/3) * barWidth, barY + barHeight + 3);
    text('3', barX + barWidth, barY + barHeight + 3);

    // Warning if near resonance
    if (drivingFreqRatio > 0.85 && drivingFreqRatio < 1.15) {
        fill(200, 50, 50);
        textSize(12);
        textAlign(RIGHT, CENTER);
        text('⚠ Near Resonance!', rx + rw - 10, ry + 35);
    }
}

function drawInfoPanel(ix, iy, iw, ih) {
    // Calculate theoretical steady-state amplitude
    let r = drivingFreqRatio;
    let zeta = damping / (2 * sqrt(springConstant * mass));
    let denominator = sqrt(pow(1 - r*r, 2) + pow(2*zeta*r, 2));
    let theoreticalAmp = (drivingForce / springConstant) / denominator;

    fill(255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(ix, iy, iw, ih, 5);

    fill(60);
    textSize(11);
    textAlign(LEFT, CENTER);
    noStroke();
    text('Steady-state amplitude (theory): ' + theoreticalAmp.toFixed(4) + ' m', ix + 15, iy + ih/2);

    // Phase info
    let phase = atan2(2*zeta*r, 1 - r*r);
    textAlign(RIGHT, CENTER);
    text('Phase lag: ' + (phase * 180 / PI).toFixed(1) + '°', ix + iw - 15, iy + ih/2);
}

function drawControlLabels() {
    fill(60);
    textSize(11);
    textAlign(CENTER, TOP);
    noStroke();

    // Driving frequency
    text('Driving Frequency', 160, drawHeight + 8);
    text('ωd/ω₀ = ' + drivingFreqRatio.toFixed(2), 160, drawHeight + 50);

    // Driving force
    text('Driving Force F₀', 410, drawHeight + 8);
    text(drivingForce + ' N', 410, drawHeight + 50);

    // Damping
    text('Damping b', 660, drawHeight + 8);
    text(damping.toFixed(1) + ' kg/s', 660, drawHeight + 50);

    // Instructions
    fill(100);
    textSize(10);
    text('Adjust sliders and click Start to observe driven oscillation', canvasWidth/2, drawHeight + 75);
}

function drawButton(bx, by, bw, bh, label, col) {
    let isHovered = mouseX > bx && mouseX < bx + bw && mouseY > by && mouseY < by + bh;

    fill(isHovered ? lerpColor(col, color(255), 0.2) : col);
    stroke(100);
    strokeWeight(1);
    rect(bx, by, bw, bh, 5);

    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    noStroke();
    text(label, bx + bw/2, by + bh/2);
}

function updatePhysics() {
    let dt = 0.016; // ~60fps
    let drivingOmega = drivingFreqRatio * omega0;

    // F = F0*cos(ωd*t) - kx - bv
    // ma = F0*cos(ωd*t) - kx - bv
    let drivingForceNow = drivingForce * cos(drivingOmega * t);
    let springForce = -springConstant * x;
    let dampingForce = -damping * v;
    let totalForce = drivingForceNow + springForce + dampingForce;

    let a = totalForce / mass;
    v += a * dt;
    x += v * dt;
    t += dt;

    // Track amplitude
    amplitudeHistory.push(x);
    if (amplitudeHistory.length > 500) {
        amplitudeHistory.shift();
    }

    // Track max amplitude (for last 100 points)
    let recentMax = 0;
    for (let i = max(0, amplitudeHistory.length - 100); i < amplitudeHistory.length; i++) {
        recentMax = max(recentMax, abs(amplitudeHistory[i]));
    }
    maxAmplitude = recentMax;
}

function mousePressed() {
    // Check Start/Pause button
    if (mouseX > 70 && mouseX < 150 && mouseY > 280 && mouseY < 310) {
        isRunning = !isRunning;
    }

    // Check Reset button
    if (mouseX > 170 && mouseX < 250 && mouseY > 280 && mouseY < 310) {
        x = 0;
        v = 0;
        t = 0;
        amplitudeHistory = [];
        maxAmplitude = 0;
        isRunning = false;
    }
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    let sliderY = drawHeight + 25;
    drivingFreqSlider.position(100, sliderY);
    drivingForceSlider.position(350, sliderY);
    dampingSlider.position(600, sliderY);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(700, container.offsetWidth);
    }
}
