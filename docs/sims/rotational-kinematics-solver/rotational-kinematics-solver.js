// Rotational Kinematics Problem Solver MicroSim
// Interactive tool for exploring rotational kinematic equations

let canvasWidth = 900;
let drawHeight = 550;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 120;

// Kinematic variables
let omega0 = 0;      // Initial angular velocity (rad/s)
let omega = 0;       // Final angular velocity (rad/s)
let alpha = 3;       // Angular acceleration (rad/s²)
let theta0 = 0;      // Initial angular position (rad)
let theta = 0;       // Final angular position (rad)
let t = 4;           // Time (s)

// UI elements
let omega0Input, omegaInput, alphaInput, theta0Input, thetaInput, tInput;
let solveButton, animateButton, resetButton, presetSelect;

// Animation state
let isAnimating = false;
let animTime = 0;
let animDuration = 4;

// Disk visualization
let diskAngle = 0;
let diskRadius = 100;

// Graph data
let omegaHistory = [];
let thetaHistory = [];
let maxHistoryPoints = 200;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    createInputs();
    updateCalculations();

    describe('Interactive rotational kinematics problem solver with animated disk and real-time graphs', LABEL);
}

function createInputs() {
    let inputY = drawHeight + 20;
    let col1 = 10;
    let col2 = 160;
    let col3 = 310;

    // Row 1
    omega0Input = createInput('0');
    omega0Input.position(col1 + 40, inputY);
    omega0Input.size(60, 22);
    omega0Input.input(updateCalculations);

    alphaInput = createInput('3');
    alphaInput.position(col2 + 40, inputY);
    alphaInput.size(60, 22);
    alphaInput.input(updateCalculations);

    tInput = createInput('4');
    tInput.position(col3 + 25, inputY);
    tInput.size(60, 22);
    tInput.input(updateCalculations);

    // Row 2
    let row2Y = inputY + 35;

    omegaInput = createInput('');
    omegaInput.position(col1 + 40, row2Y);
    omegaInput.size(60, 22);
    omegaInput.attribute('placeholder', 'calc');
    omegaInput.input(updateCalculations);

    theta0Input = createInput('0');
    theta0Input.position(col2 + 40, row2Y);
    theta0Input.size(60, 22);
    theta0Input.input(updateCalculations);

    thetaInput = createInput('');
    thetaInput.position(col3 + 25, row2Y);
    thetaInput.size(60, 22);
    thetaInput.attribute('placeholder', 'calc');
    thetaInput.input(updateCalculations);

    // Buttons
    let btnY = inputY + 10;
    solveButton = createButton('Solve');
    solveButton.position(col3 + 110, btnY);
    solveButton.size(70, 28);
    solveButton.mousePressed(solve);

    animateButton = createButton('Animate');
    animateButton.position(col3 + 190, btnY);
    animateButton.size(80, 28);
    animateButton.mousePressed(toggleAnimation);

    resetButton = createButton('Reset');
    resetButton.position(col3 + 280, btnY);
    resetButton.size(70, 28);
    resetButton.mousePressed(resetAll);

    // Preset dropdown
    presetSelect = createSelect();
    presetSelect.position(col3 + 110, row2Y);
    presetSelect.option('Preset Scenarios', '');
    presetSelect.option('Accelerating from rest', '1');
    presetSelect.option('Coming to stop', '2');
    presetSelect.option('Through angle', '3');
    presetSelect.changed(loadPreset);
}

function draw() {
    updateCanvasSize();

    // Handle animation
    if (isAnimating) {
        animTime += deltaTime / 1000;
        if (animTime > animDuration) {
            animTime = animDuration;
            isAnimating = false;
            animateButton.html('Replay');
        }

        // Calculate current position using kinematic equations
        let currentOmega = omega0 + alpha * animTime;
        diskAngle = theta0 + omega0 * animTime + 0.5 * alpha * animTime * animTime;

        // Store history for graphs
        if (omegaHistory.length === 0 || animTime > omegaHistory[omegaHistory.length - 1].t + 0.02) {
            omegaHistory.push({ t: animTime, v: currentOmega });
            thetaHistory.push({ t: animTime, v: diskAngle });
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
    textSize(22);
    textAlign(CENTER, TOP);
    noStroke();
    text('Rotational Kinematics Problem Solver', canvasWidth / 2, 10);

    // Draw disk visualization
    drawDisk(180, 250);

    // Draw graphs
    drawOmegaGraph(400, 70, 220, 150);
    drawThetaGraph(400, 280, 220, 150);

    // Draw equations panel
    drawEquationsPanel(660, 70, 220, 180);

    // Draw solution panel
    drawSolutionPanel(660, 270, 220, 180);

    // Draw control labels
    drawControlLabels();
}

function drawDisk(cx, cy) {
    push();
    translate(cx, cy);

    // Draw disk
    fill(220, 230, 245);
    stroke(100);
    strokeWeight(2);
    ellipse(0, 0, diskRadius * 2, diskRadius * 2);

    // Draw radial lines
    stroke(180);
    strokeWeight(1);
    for (let i = 0; i < 8; i++) {
        let angle = diskAngle + i * PI / 4;
        line(0, 0, diskRadius * 0.9 * cos(angle), diskRadius * 0.9 * sin(angle));
    }

    // Draw reference mark
    stroke(200, 50, 50);
    strokeWeight(4);
    line(0, 0, diskRadius * cos(diskAngle), diskRadius * sin(diskAngle));

    // Draw center
    fill(50);
    noStroke();
    ellipse(0, 0, 12, 12);

    // Draw reference line at θ = 0
    stroke(100);
    strokeWeight(1);
    setLineDash([5, 5]);
    line(0, 0, diskRadius + 30, 0);
    setLineDash([]);

    // Current angle display
    fill(0);
    textSize(14);
    textAlign(CENTER, CENTER);
    noStroke();

    let displayAngle = diskAngle;
    text('θ = ' + displayAngle.toFixed(2) + ' rad', 0, diskRadius + 50);
    text('(' + (displayAngle * 180 / PI).toFixed(1) + '°)', 0, diskRadius + 70);

    // Angular velocity arrow
    if (omega0 !== 0 || alpha !== 0) {
        let arrowRadius = diskRadius + 15;
        let arrowAngle = diskAngle + PI / 2;
        let currentOmega = omega0 + alpha * (isAnimating ? animTime : 0);

        if (abs(currentOmega) > 0.1) {
            stroke(50, 100, 200);
            strokeWeight(2);
            noFill();

            let direction = currentOmega > 0 ? 1 : -1;
            arc(0, 0, arrowRadius * 2, arrowRadius * 2,
                diskAngle - direction * 0.3, diskAngle + direction * 0.3);

            // Arrowhead
            let arrowTip = diskAngle + direction * 0.3;
            fill(50, 100, 200);
            push();
            translate(arrowRadius * cos(arrowTip), arrowRadius * sin(arrowTip));
            rotate(arrowTip + direction * PI / 2);
            triangle(0, 0, -6, -4, -6, 4);
            pop();
        }
    }

    pop();
}

function drawOmegaGraph(x, y, w, h) {
    // Background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    // Title
    fill(0);
    textSize(14);
    textAlign(CENTER, TOP);
    noStroke();
    text('ω vs. time', x + w/2, y + 5);

    // Axes
    let graphX = x + 40;
    let graphY = y + 30;
    let graphW = w - 50;
    let graphH = h - 50;

    stroke(150);
    strokeWeight(1);
    line(graphX, graphY, graphX, graphY + graphH);
    line(graphX, graphY + graphH, graphX + graphW, graphY + graphH);

    // Calculate y-axis range
    let maxOmega = max(abs(omega0), abs(omega), 1);
    let minOmega = min(0, omega0, omega);

    // Draw expected line
    stroke(200, 200, 200);
    strokeWeight(1);
    let y1 = map(omega0, minOmega - 0.5, maxOmega + 0.5, graphY + graphH, graphY);
    let y2 = map(omega, minOmega - 0.5, maxOmega + 0.5, graphY + graphH, graphY);
    line(graphX, y1, graphX + graphW, y2);

    // Draw history
    if (omegaHistory.length > 1) {
        stroke(50, 100, 200);
        strokeWeight(2);
        noFill();
        beginShape();
        for (let pt of omegaHistory) {
            let px = map(pt.t, 0, t, graphX, graphX + graphW);
            let py = map(pt.v, minOmega - 0.5, maxOmega + 0.5, graphY + graphH, graphY);
            vertex(px, py);
        }
        endShape();
    }

    // Current time line
    if (isAnimating) {
        stroke(255, 100, 100);
        strokeWeight(1);
        let tx = map(animTime, 0, t, graphX, graphX + graphW);
        line(tx, graphY, tx, graphY + graphH);
    }

    // Labels
    fill(80);
    textSize(10);
    textAlign(CENTER, TOP);
    noStroke();
    text('t (s)', graphX + graphW/2, graphY + graphH + 5);

    textAlign(RIGHT, CENTER);
    text('ω', graphX - 5, graphY + graphH/2);
}

function drawThetaGraph(x, y, w, h) {
    // Background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    // Title
    fill(0);
    textSize(14);
    textAlign(CENTER, TOP);
    noStroke();
    text('θ vs. time', x + w/2, y + 5);

    // Axes
    let graphX = x + 40;
    let graphY = y + 30;
    let graphW = w - 50;
    let graphH = h - 50;

    stroke(150);
    strokeWeight(1);
    line(graphX, graphY, graphX, graphY + graphH);
    line(graphX, graphY + graphH, graphX + graphW, graphY + graphH);

    // Calculate y-axis range
    let maxTheta = max(abs(theta0), abs(theta), 1);
    let minTheta = min(0, theta0);

    // Draw expected parabola
    stroke(200, 200, 200);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let ti = 0; ti <= t; ti += t/50) {
        let thetaT = theta0 + omega0 * ti + 0.5 * alpha * ti * ti;
        let px = map(ti, 0, t, graphX, graphX + graphW);
        let py = map(thetaT, minTheta - 0.5, maxTheta + 0.5, graphY + graphH, graphY);
        vertex(px, py);
    }
    endShape();

    // Draw history
    if (thetaHistory.length > 1) {
        stroke(50, 180, 50);
        strokeWeight(2);
        noFill();
        beginShape();
        for (let pt of thetaHistory) {
            let px = map(pt.t, 0, t, graphX, graphX + graphW);
            let py = map(pt.v, minTheta - 0.5, maxTheta + 0.5, graphY + graphH, graphY);
            vertex(px, py);
        }
        endShape();
    }

    // Current time line
    if (isAnimating) {
        stroke(255, 100, 100);
        strokeWeight(1);
        let tx = map(animTime, 0, t, graphX, graphX + graphW);
        line(tx, graphY, tx, graphY + graphH);
    }

    // Labels
    fill(80);
    textSize(10);
    textAlign(CENTER, TOP);
    noStroke();
    text('t (s)', graphX + graphW/2, graphY + graphH + 5);

    textAlign(RIGHT, CENTER);
    text('θ', graphX - 5, graphY + graphH/2);
}

function drawEquationsPanel(x, y, w, h) {
    // Background
    fill(255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    // Title
    fill(0);
    textSize(14);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    noStroke();
    text('Kinematic Equations', x + w/2, y + 10);
    textStyle(NORMAL);

    // Equations
    textSize(12);
    textAlign(LEFT, TOP);
    let lineHeight = 28;
    let startY = y + 35;

    fill(50);
    text('1. ω = ω₀ + αt', x + 15, startY);
    text('2. θ = θ₀ + ω₀t + ½αt²', x + 15, startY + lineHeight);
    text('3. ω² = ω₀² + 2α(θ - θ₀)', x + 15, startY + lineHeight * 2);
    text('4. θ = θ₀ + ½(ω₀ + ω)t', x + 15, startY + lineHeight * 3);

    // Variable legend
    textSize(10);
    fill(100);
    text('ω₀ = initial angular velocity', x + 15, startY + lineHeight * 4 + 10);
    text('ω = final angular velocity', x + 15, startY + lineHeight * 4 + 22);
    text('α = angular acceleration', x + 15, startY + lineHeight * 4 + 34);
}

function drawSolutionPanel(x, y, w, h) {
    // Background
    fill(240, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    // Title
    fill(0);
    textSize(14);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    noStroke();
    text('Calculated Values', x + w/2, y + 10);
    textStyle(NORMAL);

    // Values
    textSize(13);
    textAlign(LEFT, TOP);
    let startY = y + 35;
    let lineHeight = 24;

    fill(50);
    text('ω₀ = ' + omega0.toFixed(2) + ' rad/s', x + 15, startY);
    text('ω = ' + omega.toFixed(2) + ' rad/s', x + 15, startY + lineHeight);
    text('α = ' + alpha.toFixed(2) + ' rad/s²', x + 15, startY + lineHeight * 2);
    text('θ₀ = ' + theta0.toFixed(2) + ' rad', x + 15, startY + lineHeight * 3);
    text('θ = ' + theta.toFixed(2) + ' rad', x + 15, startY + lineHeight * 4);
    text('t = ' + t.toFixed(2) + ' s', x + 15, startY + lineHeight * 5);
}

function drawControlLabels() {
    fill('black');
    textSize(12);
    textAlign(RIGHT, CENTER);
    noStroke();

    let inputY = drawHeight + 32;
    let col1 = 10;
    let col2 = 160;
    let col3 = 310;

    text('ω₀:', col1 + 35, inputY);
    text('α:', col2 + 35, inputY);
    text('t:', col3 + 20, inputY);

    let row2Y = inputY + 35;
    text('ω:', col1 + 35, row2Y);
    text('θ₀:', col2 + 35, row2Y);
    text('θ:', col3 + 20, row2Y);

    // Units
    textAlign(LEFT, CENTER);
    textSize(10);
    fill(100);
    text('rad/s', col1 + 105, inputY);
    text('rad/s²', col2 + 105, inputY);
    text('s', col3 + 90, inputY);
    text('rad/s', col1 + 105, row2Y);
    text('rad', col2 + 105, row2Y);
    text('rad', col3 + 90, row2Y);
}

function updateCalculations() {
    omega0 = parseFloat(omega0Input.value()) || 0;
    alpha = parseFloat(alphaInput.value()) || 0;
    t = parseFloat(tInput.value()) || 1;
    theta0 = parseFloat(theta0Input.value()) || 0;

    // Calculate omega and theta using kinematic equations
    omega = omega0 + alpha * t;
    theta = theta0 + omega0 * t + 0.5 * alpha * t * t;

    // Update input fields with calculated values
    omegaInput.value(omega.toFixed(2));
    thetaInput.value(theta.toFixed(2));

    animDuration = t;
}

function solve() {
    updateCalculations();
}

function toggleAnimation() {
    if (animateButton.html() === 'Replay' || !isAnimating) {
        // Start/restart animation
        animTime = 0;
        diskAngle = theta0;
        omegaHistory = [];
        thetaHistory = [];
        isAnimating = true;
        animateButton.html('Pause');
    } else {
        // Pause
        isAnimating = false;
        animateButton.html('Resume');
    }
}

function resetAll() {
    omega0Input.value('0');
    alphaInput.value('3');
    tInput.value('4');
    omegaInput.value('');
    theta0Input.value('0');
    thetaInput.value('');

    omega0 = 0;
    alpha = 3;
    t = 4;
    theta0 = 0;

    diskAngle = 0;
    animTime = 0;
    isAnimating = false;
    omegaHistory = [];
    thetaHistory = [];

    animateButton.html('Animate');
    presetSelect.selected('');

    updateCalculations();
}

function loadPreset() {
    let preset = presetSelect.value();

    if (preset === '1') {
        // Accelerating from rest
        omega0Input.value('0');
        alphaInput.value('2.5');
        tInput.value('5');
        theta0Input.value('0');
    } else if (preset === '2') {
        // Coming to stop
        omega0Input.value('30');
        alphaInput.value('-3');
        tInput.value('10');
        theta0Input.value('0');
    } else if (preset === '3') {
        // Through angle
        omega0Input.value('15');
        alphaInput.value('1.2');
        tInput.value('5');
        theta0Input.value('0');
    }

    updateCalculations();
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
        canvasWidth = Math.max(700, container.offsetWidth);
    }
}
