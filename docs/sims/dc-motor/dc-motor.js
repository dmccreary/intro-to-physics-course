// DC Motor Operation MicroSim
// Demonstrates how DC motors convert electrical energy to mechanical rotation

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 530;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;

// Motor visualization
let motorCenterX = 220;
let motorCenterY = 220;
let motorRadius = 150;

// Motor physics
let voltage = 6;
let loadTorque = 0.002;  // N·m
let motorConstant = 0.01;  // V/(rad/s) or N·m/A
let armatureResistance = 2;  // Ohms
let inertia = 0.0001;  // kg·m²

// Motor state
let angularVelocity = 0;  // rad/s
let armatureAngle = 0;  // radians
let current = 0;
let backEMF = 0;
let torqueMotor = 0;
let mechanicalPower = 0;
let electricalPower = 0;
let efficiency = 0;

// Display options
let showFieldLines = true;
let showForceVectors = true;
let showCurrentDirection = true;
let slowMotion = false;

// UI elements
let voltageSlider, loadSlider;
let fieldCheckbox, forceCheckbox, currentCheckbox, slowCheckbox;
let brakeButton;
let brakeApplied = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    createControls();

    describe('Interactive DC motor simulation showing armature rotation, magnetic forces, commutator action, and performance metrics', LABEL);
}

function createControls() {
    let y1 = drawHeight + 15;
    let y2 = drawHeight + 45;
    let y3 = drawHeight + 75;

    // Voltage slider
    voltageSlider = createSlider(0, 12, 6, 0.5);
    voltageSlider.position(100, y1);
    voltageSlider.size(120);

    // Load slider
    loadSlider = createSlider(0, 100, 20, 1);
    loadSlider.position(100, y2);
    loadSlider.size(120);

    // Checkboxes
    fieldCheckbox = createCheckbox(' Field Lines', true);
    fieldCheckbox.position(250, y1);
    fieldCheckbox.style('font-size', '12px');
    fieldCheckbox.changed(() => showFieldLines = fieldCheckbox.checked());

    forceCheckbox = createCheckbox(' Force Vectors', true);
    forceCheckbox.position(250, y2);
    forceCheckbox.style('font-size', '12px');
    forceCheckbox.changed(() => showForceVectors = forceCheckbox.checked());

    currentCheckbox = createCheckbox(' Current Flow', true);
    currentCheckbox.position(370, y1);
    currentCheckbox.style('font-size', '12px');
    currentCheckbox.changed(() => showCurrentDirection = currentCheckbox.checked());

    slowCheckbox = createCheckbox(' Slow Motion', false);
    slowCheckbox.position(370, y2);
    slowCheckbox.style('font-size', '12px');
    slowCheckbox.changed(() => slowMotion = slowCheckbox.checked());

    // Brake button
    brakeButton = createButton('Apply Brake');
    brakeButton.position(500, y1);
    brakeButton.mousePressed(toggleBrake);

    // Reset button
    let resetBtn = createButton('Reset');
    resetBtn.position(600, y1);
    resetBtn.mousePressed(resetMotor);
}

function toggleBrake() {
    brakeApplied = !brakeApplied;
    brakeButton.html(brakeApplied ? 'Release Brake' : 'Apply Brake');
}

function resetMotor() {
    angularVelocity = 0;
    armatureAngle = 0;
    brakeApplied = false;
    brakeButton.html('Apply Brake');
    voltageSlider.value(6);
    loadSlider.value(20);
}

function updateMotorPhysics() {
    voltage = voltageSlider.value();
    let loadPercent = loadSlider.value();

    // Maximum stall torque
    let maxStallTorque = voltage * motorConstant / armatureResistance;
    loadTorque = (loadPercent / 100) * maxStallTorque * 0.8;

    if (brakeApplied) {
        loadTorque = maxStallTorque * 2;  // Strong brake
    }

    // Calculate back-EMF
    backEMF = motorConstant * angularVelocity;

    // Calculate current: I = (V - E_back) / R
    current = (voltage - backEMF) / armatureResistance;
    current = max(0, current);  // Can't be negative for simple model

    // Calculate motor torque: τ = k * I
    torqueMotor = motorConstant * current;

    // Net torque and angular acceleration
    let frictionTorque = 0.0001 * angularVelocity;  // Viscous friction
    let netTorque = torqueMotor - loadTorque - frictionTorque;

    // Update angular velocity: dω/dt = τ/J
    let dt = slowMotion ? 0.005 : 0.016;
    let angularAccel = netTorque / inertia;
    angularVelocity += angularAccel * dt;
    angularVelocity = max(0, angularVelocity);  // No reverse for simple model

    // Update angle
    let angleStep = slowMotion ? angularVelocity * 0.002 : angularVelocity * 0.016;
    armatureAngle += angleStep;
    if (armatureAngle > TWO_PI) armatureAngle -= TWO_PI;

    // Calculate power and efficiency
    electricalPower = voltage * current;
    mechanicalPower = torqueMotor * angularVelocity;
    efficiency = electricalPower > 0.001 ? (mechanicalPower / electricalPower) * 100 : 0;
    efficiency = min(efficiency, 100);
}

function draw() {
    updateCanvasSize();
    updateMotorPhysics();

    // Background
    background(250);

    // Title
    fill(30);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    text('DC Motor Operation', canvasWidth / 2, 8);

    // Draw motor cross-section
    drawMotor();

    // Draw info panel
    drawInfoPanel();

    // Draw performance graph
    drawPerformanceGraph();

    // Control area
    fill(245);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Control labels
    drawControlLabels();

    // Warnings
    drawWarnings();
}

function drawMotor() {
    push();
    translate(motorCenterX, motorCenterY);

    // Motor housing (stator)
    fill(80);
    stroke(60);
    strokeWeight(3);
    ellipse(0, 0, motorRadius * 2 + 20, motorRadius * 2 + 20);

    // Permanent magnets
    drawMagnets();

    // Magnetic field lines
    if (showFieldLines) {
        drawFieldLines();
    }

    // Armature (rotor)
    push();
    rotate(armatureAngle);
    drawArmature();

    // Force vectors
    if (showForceVectors && current > 0.01) {
        drawForceVectors();
    }

    // Current direction
    if (showCurrentDirection && current > 0.01) {
        drawCurrentArrows();
    }
    pop();

    // Commutator and brushes (drawn after armature rotation)
    drawCommutator();

    // Rotation direction indicator
    if (angularVelocity > 0.5) {
        drawRotationArrow();
    }

    pop();

    // Labels
    fill(30);
    textSize(12);
    textAlign(CENTER, TOP);
    noStroke();
    text('Motor Cross-Section', motorCenterX, motorCenterY + motorRadius + 30);
}

function drawMagnets() {
    // North pole (left, red)
    fill(200, 60, 60);
    stroke(150, 40, 40);
    strokeWeight(2);
    arc(-motorRadius - 5, 0, 40, motorRadius * 1.6, HALF_PI, PI + HALF_PI);

    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    noStroke();
    text('N', -motorRadius - 15, 0);

    // South pole (right, blue)
    fill(60, 60, 200);
    stroke(40, 40, 150);
    strokeWeight(2);
    arc(motorRadius + 5, 0, 40, motorRadius * 1.6, -HALF_PI, HALF_PI);

    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    noStroke();
    text('S', motorRadius + 15, 0);
}

function drawFieldLines() {
    stroke(100, 100, 200, 100);
    strokeWeight(1);
    noFill();

    // Horizontal field lines from N to S
    for (let y = -60; y <= 60; y += 20) {
        // Curved field lines
        beginShape();
        for (let x = -motorRadius + 30; x <= motorRadius - 30; x += 5) {
            let yOffset = y * (1 - pow(x / motorRadius, 2) * 0.3);
            vertex(x, yOffset);
        }
        endShape();

        // Arrowhead in middle
        let arrowX = 0;
        let arrowY = y * 0.85;
        push();
        translate(arrowX, arrowY);
        fill(100, 100, 200, 150);
        noStroke();
        triangle(8, 0, -4, -4, -4, 4);
        pop();
    }
}

function drawArmature() {
    // Armature core
    fill(120);
    stroke(80);
    strokeWeight(2);
    ellipse(0, 0, 60, 60);

    // Coil windings
    stroke(180, 120, 60);
    strokeWeight(6);
    noFill();

    // Rectangular coil
    let coilWidth = 80;
    let coilHeight = 100;
    rect(-coilWidth / 2, -coilHeight / 2, coilWidth, coilHeight, 5);

    // Coil ends connecting to commutator
    stroke(180, 120, 60);
    strokeWeight(4);
    line(-10, coilHeight / 2, -10, coilHeight / 2 + 20);
    line(10, coilHeight / 2, 10, coilHeight / 2 + 20);

    // Shaft
    fill(100);
    stroke(60);
    strokeWeight(1);
    ellipse(0, 0, 20, 20);
}

function drawForceVectors() {
    // Force on top conductor (current into page on left side)
    let forceScale = map(current, 0, 3, 20, 60);
    forceScale = constrain(forceScale, 20, 60);

    // Top conductor - force upward (toward rotation)
    stroke(50, 200, 50);
    strokeWeight(3);
    fill(50, 200, 50);

    // Left side of coil (current one direction)
    let fx1 = -40;
    let fy1 = 0;
    drawArrow(fx1, fy1, fx1, fy1 - forceScale, color(50, 200, 50));

    // Right side of coil (current opposite direction)
    let fx2 = 40;
    let fy2 = 0;
    drawArrow(fx2, fy2, fx2, fy2 + forceScale, color(50, 200, 50));

    // Force labels
    fill(30, 150, 30);
    textSize(10);
    noStroke();
    textAlign(CENTER, BOTTOM);
    text('F', fx1, fy1 - forceScale - 5);
    textAlign(CENTER, TOP);
    text('F', fx2, fy2 + forceScale + 5);
}

function drawCurrentArrows() {
    // Current direction in coil
    let arrowColor = color(255, 200, 50);

    // Determine which way current flows based on commutator position
    let commutatorAngle = armatureAngle % PI;
    let currentDirection = commutatorAngle < HALF_PI ? 1 : -1;

    // Top of coil
    push();
    translate(0, -50);
    rotate(currentDirection > 0 ? 0 : PI);
    fill(arrowColor);
    noStroke();
    triangle(10, 0, -5, -5, -5, 5);
    pop();

    // Bottom of coil
    push();
    translate(0, 50);
    rotate(currentDirection > 0 ? PI : 0);
    fill(arrowColor);
    noStroke();
    triangle(10, 0, -5, -5, -5, 5);
    pop();

    // Current symbols (dot = out, cross = in)
    fill(255, 200, 50);
    textSize(14);
    textAlign(CENTER, CENTER);
    text(currentDirection > 0 ? '⊙' : '⊗', -40, 0);
    text(currentDirection > 0 ? '⊗' : '⊙', 40, 0);
}

function drawCommutator() {
    // Commutator segments (split ring)
    let commRadius = 25;
    let commY = 80;

    push();
    translate(0, commY);
    rotate(armatureAngle);

    // Two segments
    fill(180, 140, 60);
    stroke(120, 80, 40);
    strokeWeight(1);
    arc(0, 0, commRadius * 2, commRadius * 2, -HALF_PI + 0.1, HALF_PI - 0.1);

    fill(160, 120, 40);
    arc(0, 0, commRadius * 2, commRadius * 2, HALF_PI + 0.1, PI + HALF_PI - 0.1);

    // Gap indicators
    stroke(40);
    strokeWeight(2);
    line(-2, -commRadius, 2, -commRadius);
    line(-2, commRadius, 2, commRadius);
    pop();

    // Brushes (stationary)
    fill(50);
    stroke(30);
    strokeWeight(1);
    rect(-35, commY - 8, 12, 16, 2);  // Left brush
    rect(23, commY - 8, 12, 16, 2);   // Right brush

    // Brush labels
    fill(200, 50, 50);
    textSize(10);
    textAlign(CENTER, CENTER);
    noStroke();
    text('+', -29, commY);
    fill(50, 50, 200);
    text('−', 29, commY);

    // Wires to brushes
    stroke(100);
    strokeWeight(2);
    line(-29, commY + 10, -29, commY + 30);
    line(29, commY + 10, 29, commY + 30);
}

function drawRotationArrow() {
    let arrowRadius = motorRadius + 40;
    stroke(50, 150, 50);
    strokeWeight(2);
    noFill();
    arc(0, 0, arrowRadius * 2, arrowRadius * 2, -PI * 0.7, -PI * 0.3);

    // Arrowhead
    push();
    translate(arrowRadius * cos(-PI * 0.3), arrowRadius * sin(-PI * 0.3));
    rotate(-PI * 0.3 + HALF_PI);
    fill(50, 150, 50);
    noStroke();
    triangle(0, 0, -8, -5, -8, 5);
    pop();
}

function drawArrow(x1, y1, x2, y2, col) {
    stroke(col);
    strokeWeight(3);
    line(x1, y1, x2, y2);

    let angle = atan2(y2 - y1, x2 - x1);
    push();
    translate(x2, y2);
    rotate(angle);
    fill(col);
    noStroke();
    triangle(0, 0, -10, -5, -10, 5);
    pop();
}

function drawInfoPanel() {
    let panelX = 450;
    let panelY = 40;
    let panelWidth = 200;
    let panelHeight = 280;

    // Panel background
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    let x = panelX + 15;
    let y = panelY + 15;
    let lineHeight = 22;

    // Title
    fill(30);
    textSize(14);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Motor Performance', x, y);
    textStyle(NORMAL);

    y += 25;
    textSize(12);

    // Values
    let rpm = angularVelocity * 60 / (2 * PI);

    fill(60);
    text('Voltage:', x, y);
    fill(30);
    textAlign(RIGHT, TOP);
    text(voltage.toFixed(1) + ' V', x + panelWidth - 30, y);

    y += lineHeight;
    textAlign(LEFT, TOP);
    fill(60);
    text('Current:', x, y);
    fill(current > 2.5 ? color(200, 50, 50) : color(30));
    textAlign(RIGHT, TOP);
    text((current * 1000).toFixed(0) + ' mA', x + panelWidth - 30, y);

    y += lineHeight;
    textAlign(LEFT, TOP);
    fill(60);
    text('Speed:', x, y);
    fill(30);
    textAlign(RIGHT, TOP);
    text(rpm.toFixed(0) + ' RPM', x + panelWidth - 30, y);

    y += lineHeight;
    textAlign(LEFT, TOP);
    fill(60);
    text('Back-EMF:', x, y);
    fill(30);
    textAlign(RIGHT, TOP);
    text(backEMF.toFixed(2) + ' V', x + panelWidth - 30, y);

    y += lineHeight;
    textAlign(LEFT, TOP);
    fill(60);
    text('Torque:', x, y);
    fill(30);
    textAlign(RIGHT, TOP);
    text((torqueMotor * 1000).toFixed(1) + ' mN·m', x + panelWidth - 30, y);

    y += lineHeight;
    textAlign(LEFT, TOP);
    fill(60);
    text('Power In:', x, y);
    fill(30);
    textAlign(RIGHT, TOP);
    text((electricalPower * 1000).toFixed(0) + ' mW', x + panelWidth - 30, y);

    y += lineHeight;
    textAlign(LEFT, TOP);
    fill(60);
    text('Power Out:', x, y);
    fill(30);
    textAlign(RIGHT, TOP);
    text((mechanicalPower * 1000).toFixed(0) + ' mW', x + panelWidth - 30, y);

    y += lineHeight;
    textAlign(LEFT, TOP);
    fill(60);
    text('Efficiency:', x, y);
    fill(efficiency > 50 ? color(30, 150, 30) : color(200, 100, 30));
    textAlign(RIGHT, TOP);
    text(efficiency.toFixed(1) + ' %', x + panelWidth - 30, y);

    // Equations
    y += 30;
    textAlign(LEFT, TOP);
    fill(100);
    textSize(10);
    text('V = IR + E_back', x, y);
    text('τ = k × I', x, y + 14);
    text('P = τ × ω', x, y + 28);
}

function drawPerformanceGraph() {
    let graphX = 670;
    let graphY = 40;
    let graphWidth = 200;
    let graphHeight = 150;

    // Background
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(graphX, graphY, graphWidth, graphHeight, 5);

    // Title
    fill(30);
    textSize(11);
    textAlign(CENTER, TOP);
    noStroke();
    text('Speed-Torque Curve', graphX + graphWidth / 2, graphY + 5);

    // Axes
    let axisX = graphX + 35;
    let axisY = graphY + graphHeight - 25;
    let plotWidth = graphWidth - 50;
    let plotHeight = graphHeight - 45;

    stroke(150);
    strokeWeight(1);
    line(axisX, axisY, axisX + plotWidth, axisY);  // X-axis
    line(axisX, axisY, axisX, axisY - plotHeight);  // Y-axis

    // Labels
    fill(80);
    textSize(9);
    textAlign(CENTER, TOP);
    text('Torque', axisX + plotWidth / 2, axisY + 3);
    push();
    translate(axisX - 12, axisY - plotHeight / 2);
    rotate(-HALF_PI);
    text('Speed', 0, 0);
    pop();

    // Speed-torque line (linear for DC motor)
    let noLoadSpeed = voltage / motorConstant;  // rad/s at no load
    let stallTorque = voltage * motorConstant / armatureResistance;

    stroke(50, 100, 200);
    strokeWeight(2);
    let x1 = axisX;
    let y1 = axisY - plotHeight;  // No load (max speed)
    let x2 = axisX + plotWidth;
    let y2 = axisY;  // Stall (zero speed)
    line(x1, y1, x2, y2);

    // Operating point
    let opTorque = torqueMotor;
    let opSpeed = angularVelocity;
    let opX = map(opTorque, 0, stallTorque, axisX, axisX + plotWidth);
    let opY = map(opSpeed, 0, noLoadSpeed, axisY, axisY - plotHeight);
    opX = constrain(opX, axisX, axisX + plotWidth);
    opY = constrain(opY, axisY - plotHeight, axisY);

    fill(200, 50, 50);
    stroke(150, 30, 30);
    strokeWeight(2);
    ellipse(opX, opY, 12, 12);

    // Legend
    fill(80);
    textSize(8);
    textAlign(LEFT, TOP);
    noStroke();
    text('● Operating Point', graphX + 10, graphY + graphHeight - 18);

    // Efficiency indicator below
    let effY = graphY + graphHeight + 20;
    fill(255);
    stroke(180);
    rect(graphX, effY, graphWidth, 60, 5);

    fill(30);
    textSize(11);
    textAlign(CENTER, TOP);
    noStroke();
    text('Efficiency', graphX + graphWidth / 2, effY + 5);

    // Efficiency bar
    let barX = graphX + 20;
    let barY = effY + 25;
    let barWidth = graphWidth - 40;
    let barHeight = 20;

    fill(230);
    stroke(180);
    rect(barX, barY, barWidth, barHeight, 3);

    let effWidth = map(efficiency, 0, 100, 0, barWidth);
    let effColor = lerpColor(color(200, 50, 50), color(50, 200, 50), efficiency / 100);
    fill(effColor);
    noStroke();
    rect(barX, barY, effWidth, barHeight, 3);

    fill(30);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(efficiency.toFixed(0) + '%', graphX + graphWidth / 2, barY + barHeight / 2);
}

function drawWarnings() {
    let rpm = angularVelocity * 60 / (2 * PI);

    if (rpm < 10 && voltage > 1 && current > 0.5) {
        // Stall warning
        fill(255, 50, 50);
        noStroke();
        textSize(14);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        text('⚠ STALL - High Current!', motorCenterX, motorCenterY + motorRadius + 55);
        textStyle(NORMAL);
    }

    if (current > 2.5) {
        // Overcurrent warning
        fill(255, 100, 50);
        textSize(12);
        textAlign(LEFT, TOP);
        text('⚠ Overcurrent', 670, 280);
    }
}

function drawControlLabels() {
    fill(60);
    textSize(12);
    textAlign(LEFT, CENTER);
    noStroke();

    text('Voltage: ' + voltage.toFixed(1) + ' V', 10, drawHeight + 27);
    text('Load: ' + loadSlider.value() + '%', 10, drawHeight + 57);

    // Instructions
    fill(100);
    textSize(11);
    text('Adjust voltage and load to see motor response. Apply brake to simulate stall condition.', 10, drawHeight + 100);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 950);
    }
}
