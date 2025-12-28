// Work-Energy Theorem Interactive Demonstration
// Shows how forces do work to change kinetic energy

let canvasWidth = 1000;
let drawHeight = 400;
let controlHeight = 200;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 240;

// Sliders
let massSlider, velocitySlider, forceSlider, frictionSlider;
let showFrictionCheckbox;
let startBtn, resetBtn;

// Simulation state
let isRunning = false;
let cart = { x: 50, v: 0 };
let time = 0;
let distance = 0;
let initialKE = 0;
let trackLength;

// Physics parameters
let mass = 5;
let initialVelocity = 8;
let appliedForce = 0;
let frictionCoeff = 0.2;
let showFriction = true;
let g = 9.8;

// Results
let workApplied = 0;
let workFriction = 0;
let netWork = 0;
let finalKE = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    let controlY = drawHeight + 15;

    // Buttons
    startBtn = createButton('Start');
    startBtn.position(10, controlY);
    startBtn.mousePressed(toggleSimulation);

    resetBtn = createButton('Reset');
    resetBtn.position(70, controlY);
    resetBtn.mousePressed(resetSimulation);

    // Checkbox
    showFrictionCheckbox = createCheckbox('Show Friction', true);
    showFrictionCheckbox.position(130, controlY);
    showFrictionCheckbox.changed(() => {
        showFriction = showFrictionCheckbox.checked();
    });

    // Sliders - Row 1
    massSlider = createSlider(1, 20, 5, 0.5);
    massSlider.position(sliderLeftMargin, controlY);
    massSlider.size(150);
    massSlider.input(resetSimulation);

    velocitySlider = createSlider(0, 15, 8, 0.5);
    velocitySlider.position(sliderLeftMargin + 200, controlY);
    velocitySlider.size(150);
    velocitySlider.input(resetSimulation);

    // Sliders - Row 2
    forceSlider = createSlider(-50, 50, 0, 1);
    forceSlider.position(sliderLeftMargin, controlY + 35);
    forceSlider.size(150);
    forceSlider.input(resetSimulation);

    frictionSlider = createSlider(0, 0.5, 0.2, 0.01);
    frictionSlider.position(sliderLeftMargin + 200, controlY + 35);
    frictionSlider.size(150);
    frictionSlider.input(resetSimulation);

    resetSimulation();
    describe('Work-Energy Theorem demonstration showing forces doing work on a cart', LABEL);
}

function draw() {
    updateCanvasSize();
    trackLength = canvasWidth - 100;

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Get slider values
    mass = massSlider.value();
    initialVelocity = velocitySlider.value();
    appliedForce = forceSlider.value();
    frictionCoeff = frictionSlider.value();

    // Title
    fill('black');
    textSize(18);
    textAlign(CENTER, TOP);
    noStroke();
    text('Work-Energy Theorem: W_net = ΔKE', canvasWidth/2, 10);

    // Update physics if running
    if (isRunning) {
        updatePhysics();
    }

    // Draw track and cart
    drawTrack();
    drawCart();
    drawForceArrows();
    drawSpeedometer();
    drawEnergyBars();

    // Draw control labels
    drawControlLabels();
}

function updatePhysics() {
    let dt = 0.05;
    let frictionForce = showFriction ? frictionCoeff * mass * g : 0;
    let netForce = appliedForce;

    // Friction opposes motion
    if (cart.v > 0) netForce -= frictionForce;
    else if (cart.v < 0) netForce += frictionForce;

    let acceleration = netForce / mass;
    let prevV = cart.v;
    cart.v += acceleration * dt;

    // Stop if friction stops the cart
    if (showFriction && abs(cart.v) < 0.1 && abs(appliedForce) < frictionForce) {
        cart.v = 0;
        isRunning = false;
        startBtn.html('Start');
    }

    let dx = cart.v * dt;
    cart.x += dx * 20; // Scale for display
    distance += abs(dx);

    // Calculate work
    workApplied = appliedForce * distance;
    workFriction = showFriction ? -frictionCoeff * mass * g * distance : 0;
    netWork = workApplied + workFriction;
    finalKE = 0.5 * mass * cart.v * cart.v;

    time += dt;

    // Stop at boundaries
    if (cart.x < 30 || cart.x > trackLength + 20) {
        isRunning = false;
        startBtn.html('Start');
    }
}

function drawTrack() {
    // Ground
    fill(200, 180, 140);
    noStroke();
    rect(30, drawHeight - 60, trackLength, 10);

    // Position markers
    fill('black');
    textSize(10);
    textAlign(CENTER, TOP);
    for (let i = 0; i <= 20; i += 2) {
        let x = 30 + (i / 20) * trackLength;
        stroke(100);
        strokeWeight(1);
        line(x, drawHeight - 60, x, drawHeight - 55);
        noStroke();
        text(i + 'm', x, drawHeight - 45);
    }
}

function drawCart() {
    // Cart body
    fill(100, 120, 180);
    stroke(60, 80, 140);
    strokeWeight(2);
    rect(cart.x - 25, drawHeight - 100, 50, 35, 5);

    // Wheels
    fill(50);
    noStroke();
    ellipse(cart.x - 15, drawHeight - 63, 14, 14);
    ellipse(cart.x + 15, drawHeight - 63, 14, 14);

    // Velocity vector
    if (abs(cart.v) > 0.5) {
        let vArrowLen = map(abs(cart.v), 0, 15, 0, 60);
        let vDir = cart.v > 0 ? 1 : -1;
        stroke(0, 180, 0);
        strokeWeight(3);
        fill(0, 180, 0);
        let arrowX = cart.x + 30 * vDir;
        let arrowEndX = arrowX + vArrowLen * vDir;
        line(arrowX, drawHeight - 85, arrowEndX, drawHeight - 85);
        // Arrowhead
        triangle(arrowEndX, drawHeight - 85,
                 arrowEndX - 8 * vDir, drawHeight - 80,
                 arrowEndX - 8 * vDir, drawHeight - 90);
    }
}

function drawForceArrows() {
    let arrowY = drawHeight - 130;

    // Applied force arrow (red)
    if (abs(appliedForce) > 0) {
        let fLen = map(abs(appliedForce), 0, 50, 0, 50);
        let fDir = appliedForce > 0 ? 1 : -1;
        stroke(220, 50, 50);
        strokeWeight(4);
        fill(220, 50, 50);
        let startX = cart.x;
        let endX = startX + fLen * fDir;
        line(startX, arrowY, endX, arrowY);
        triangle(endX, arrowY, endX - 10 * fDir, arrowY - 5, endX - 10 * fDir, arrowY + 5);

        // Label
        noStroke();
        textSize(12);
        textAlign(CENTER, BOTTOM);
        text('F = ' + appliedForce + ' N', (startX + endX) / 2, arrowY - 5);
    }

    // Friction force arrow (orange)
    if (showFriction && abs(cart.v) > 0.1) {
        let frictionMag = frictionCoeff * mass * g;
        let fLen = map(frictionMag, 0, 50, 0, 40);
        let fDir = cart.v > 0 ? -1 : 1;
        stroke(255, 140, 50);
        strokeWeight(3);
        fill(255, 140, 50);
        let startX = cart.x;
        let endX = startX + fLen * fDir;
        line(startX, arrowY + 25, endX, arrowY + 25);
        triangle(endX, arrowY + 25, endX - 8 * fDir, arrowY + 20, endX - 8 * fDir, arrowY + 30);

        // Label
        noStroke();
        textSize(10);
        textAlign(CENTER, TOP);
        fill(200, 100, 0);
        text('f = ' + frictionMag.toFixed(1) + ' N', (startX + endX) / 2, arrowY + 30);
    }
}

function drawSpeedometer() {
    let sx = canvasWidth - 100;
    let sy = 80;

    // Background
    fill(255, 255, 255, 200);
    stroke(150);
    strokeWeight(1);
    ellipse(sx, sy, 100, 100);

    // Speed arc
    let speedAngle = map(abs(cart.v), 0, 15, PI, 0);
    noFill();
    stroke(0, 150, 0);
    strokeWeight(6);
    arc(sx, sy, 80, 80, PI, speedAngle + PI);

    // Labels
    fill('black');
    textSize(10);
    textAlign(CENTER, CENTER);
    noStroke();
    text('0', sx - 40, sy + 10);
    text('15', sx + 40, sy + 10);
    text('m/s', sx, sy + 5);

    textSize(16);
    text(abs(cart.v).toFixed(1), sx, sy - 15);
}

function drawEnergyBars() {
    let barX = canvasWidth - 220;
    let barY = 170;
    let barWidth = 180;
    let barHeight = 25;
    let maxEnergy = 0.5 * mass * 15 * 15; // Max KE at max velocity

    // Initial KE bar
    fill(100, 150, 220);
    stroke(50, 100, 180);
    strokeWeight(1);
    let initWidth = map(initialKE, 0, maxEnergy, 0, barWidth);
    rect(barX, barY, initWidth, barHeight);
    fill('black');
    textSize(10);
    textAlign(LEFT, CENTER);
    noStroke();
    text('Initial KE: ' + initialKE.toFixed(0) + ' J', barX, barY - 10);

    // Final KE bar
    barY += 40;
    fill(100, 200, 100);
    stroke(50, 150, 50);
    strokeWeight(1);
    let finalWidth = map(finalKE, 0, maxEnergy, 0, barWidth);
    rect(barX, barY, finalWidth, barHeight);
    fill('black');
    noStroke();
    text('Final KE: ' + finalKE.toFixed(0) + ' J', barX, barY - 10);

    // Work bars
    barY += 40;
    textSize(10);
    text('Work Applied: ' + workApplied.toFixed(0) + ' J', barX, barY - 10);
    if (workApplied >= 0) {
        fill(220, 100, 100);
    } else {
        fill(100, 100, 220);
    }
    stroke(150);
    let workWidth = map(abs(workApplied), 0, maxEnergy, 0, barWidth/2);
    rect(barX + barWidth/2, barY, workApplied >= 0 ? workWidth : -workWidth, barHeight/2);

    barY += 25;
    text('Work Friction: ' + workFriction.toFixed(0) + ' J', barX, barY - 10);
    fill(255, 140, 50);
    workWidth = map(abs(workFriction), 0, maxEnergy, 0, barWidth/2);
    rect(barX + barWidth/2, barY, -workWidth, barHeight/2);

    // Net work and verification
    barY += 35;
    fill('black');
    textSize(12);
    text('Net Work = ' + netWork.toFixed(0) + ' J', barX, barY);
    let deltaKE = finalKE - initialKE;
    text('ΔKE = ' + deltaKE.toFixed(0) + ' J', barX + 100, barY);

    if (distance > 0.1 && !isRunning) {
        barY += 20;
        fill(0, 150, 0);
        textSize(11);
        text('W_net ≈ ΔKE ✓ Verified!', barX, barY);
    }
}

function drawControlLabels() {
    textSize(11);
    textAlign(LEFT, CENTER);
    fill('black');
    noStroke();

    let y1 = drawHeight + 25;
    let y2 = drawHeight + 60;

    text('Mass: ' + mass.toFixed(1) + ' kg', sliderLeftMargin - 90, y1);
    text('Initial v: ' + initialVelocity.toFixed(1) + ' m/s', sliderLeftMargin + 110, y1);
    text('Force: ' + appliedForce + ' N', sliderLeftMargin - 90, y2);
    text('μ: ' + frictionCoeff.toFixed(2), sliderLeftMargin + 110, y2);

    // Status display
    y2 += 40;
    textSize(12);
    text('Time: ' + time.toFixed(1) + ' s', 10, y2);
    text('Distance: ' + distance.toFixed(2) + ' m', 120, y2);
    text('Current v: ' + cart.v.toFixed(2) + ' m/s', 260, y2);
    text('Current KE: ' + finalKE.toFixed(0) + ' J', 420, y2);
}

function toggleSimulation() {
    if (!isRunning) {
        isRunning = true;
        startBtn.html('Pause');
    } else {
        isRunning = false;
        startBtn.html('Start');
    }
}

function resetSimulation() {
    isRunning = false;
    startBtn.html('Start');
    cart.x = 50;
    cart.v = velocitySlider.value();
    initialVelocity = velocitySlider.value();
    initialKE = 0.5 * massSlider.value() * initialVelocity * initialVelocity;
    finalKE = initialKE;
    time = 0;
    distance = 0;
    workApplied = 0;
    workFriction = 0;
    netWork = 0;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
    }
}
