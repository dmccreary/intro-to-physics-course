// Free Fall Motion MicroSim
// Visualizes objects falling under gravity

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Physics parameters
let g = 9.8; // m/s²
let initialHeight = 30; // m
let initialVelocity = 0; // m/s (positive = upward)

// Simulation state
let y, vy, time;
let isRunning = false;
let hasLanded = false;

// Display scale
let scale = 12; // pixels per meter

// UI Controls
let heightSlider, velocitySlider;
let dropButton, resetButton;
let showVectorCheckbox, showTrailCheckbox;

// Trail
let trail = [];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Create controls
    dropButton = createButton('Drop');
    dropButton.position(margin, drawHeight + 12);
    dropButton.mousePressed(startDrop);
    dropButton.style('font-size', '14px');
    dropButton.style('padding', '8px 20px');

    resetButton = createButton('Reset');
    resetButton.position(margin + 90, drawHeight + 12);
    resetButton.mousePressed(resetSimulation);
    resetButton.style('font-size', '14px');
    resetButton.style('padding', '8px 20px');

    heightSlider = createSlider(5, 50, 30, 1);
    heightSlider.position(280, drawHeight + 15);
    heightSlider.style('width', '120px');

    velocitySlider = createSlider(-20, 20, 0, 1);
    velocitySlider.position(280, drawHeight + 55);
    velocitySlider.style('width', '120px');

    showVectorCheckbox = createCheckbox('Show Velocity', true);
    showVectorCheckbox.position(500, drawHeight + 12);
    showVectorCheckbox.style('font-size', '13px');

    showTrailCheckbox = createCheckbox('Show Trail', true);
    showTrailCheckbox.position(500, drawHeight + 40);
    showTrailCheckbox.style('font-size', '13px');

    resetSimulation();

    describe('Free fall motion simulation showing an object falling under gravity with velocity vectors and motion trail.', LABEL);
}

function draw() {
    updateCanvasSize();

    if (!isRunning) {
        initialHeight = heightSlider.value();
        initialVelocity = velocitySlider.value();
        y = initialHeight;
        vy = initialVelocity;
    }

    // Background
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
    noStroke();
    textSize(22);
    textAlign(CENTER, TOP);
    text('Free Fall Motion', canvasWidth / 2, 10);

    // Draw scene
    drawScene();

    // Update physics
    if (isRunning && !hasLanded) {
        updatePhysics();
    }

    // Draw info panel
    drawInfoPanel();

    // Control labels
    fill(0);
    textSize(12);
    textAlign(LEFT, CENTER);
    noStroke();
    text('Height: ' + initialHeight + ' m', 180, drawHeight + 25);
    text('Initial v: ' + initialVelocity + ' m/s', 180, drawHeight + 65);

    // Status
    textSize(13);
    if (hasLanded) {
        fill(0, 150, 0);
        text('Landed!', 620, drawHeight + 25);
    } else if (isRunning) {
        fill(0, 100, 200);
        text('Falling...', 620, drawHeight + 25);
    } else {
        fill(100);
        text('Ready', 620, drawHeight + 25);
    }
}

function drawScene() {
    // Ground
    let groundY = drawHeight - 50;

    // Height markers
    stroke(200);
    strokeWeight(1);
    textSize(10);
    textAlign(RIGHT, CENTER);
    fill(100);

    let maxH = 55;
    for (let h = 0; h <= maxH; h += 5) {
        let py = groundY - h * scale;
        if (py > 40) {
            line(80, py, canvasWidth / 2 + 50, py);
            noStroke();
            text(h + ' m', 75, py);
            stroke(200);
        }
    }

    // Ground line
    stroke(100, 80, 50);
    strokeWeight(3);
    line(80, groundY, canvasWidth / 2 + 50, groundY);

    // Ground fill
    fill(150, 130, 100);
    noStroke();
    rect(80, groundY, canvasWidth / 2 - 30, 30);

    // Grass pattern
    stroke(80, 150, 80);
    strokeWeight(1);
    for (let x = 85; x < canvasWidth / 2 + 45; x += 8) {
        line(x, groundY, x - 2, groundY - 5);
        line(x + 3, groundY, x + 5, groundY - 4);
    }

    // Draw trail
    if (showTrailCheckbox.checked() && trail.length > 1) {
        stroke(100, 150, 255, 150);
        strokeWeight(2);
        noFill();
        beginShape();
        for (let p of trail) {
            let py = groundY - p.y * scale;
            vertex(canvasWidth / 4 + 50, py);
        }
        endShape();

        // Trail dots
        fill(100, 150, 255, 100);
        noStroke();
        for (let i = 0; i < trail.length; i += 3) {
            let py = groundY - trail[i].y * scale;
            ellipse(canvasWidth / 4 + 50, py, 6, 6);
        }
    }

    // Draw object
    let objX = canvasWidth / 4 + 50;
    let objY = groundY - y * scale;

    // Object shadow
    fill(0, 0, 0, 50);
    noStroke();
    let shadowY = groundY - 3;
    let shadowScale = map(y, 0, 50, 1, 0.3);
    ellipse(objX, shadowY, 30 * shadowScale, 8 * shadowScale);

    // Object
    fill(200, 50, 50);
    stroke(150, 30, 30);
    strokeWeight(2);
    ellipse(objX, objY, 30, 30);

    // Velocity vector
    if (showVectorCheckbox.checked() && (isRunning || initialVelocity !== 0)) {
        let displayVy = isRunning ? vy : initialVelocity;
        if (abs(displayVy) > 0.1) {
            let arrowLen = displayVy * 3; // Scale for display

            stroke(0, 150, 0);
            strokeWeight(3);
            line(objX, objY, objX, objY - arrowLen);

            // Arrowhead
            fill(0, 150, 0);
            noStroke();
            let dir = displayVy > 0 ? -1 : 1;
            push();
            translate(objX, objY - arrowLen);
            rotate(dir < 0 ? -HALF_PI : HALF_PI);
            triangle(0, 0, -10, -5, -10, 5);
            pop();

            // Label
            textSize(12);
            textAlign(LEFT, CENTER);
            text('v = ' + abs(displayVy).toFixed(1) + ' m/s', objX + 20, objY - arrowLen / 2);
        }
    }

    // Gravity arrow (always show)
    let gArrowX = objX + 50;
    stroke(200, 100, 0);
    strokeWeight(2);
    line(gArrowX, objY - 20, gArrowX, objY + 20);
    fill(200, 100, 0);
    noStroke();
    triangle(gArrowX, objY + 20, gArrowX - 5, objY + 10, gArrowX + 5, objY + 10);
    textSize(11);
    textAlign(LEFT, CENTER);
    text('g = 9.8 m/s\u00B2', gArrowX + 10, objY);
}

function drawInfoPanel() {
    let panelX = canvasWidth / 2 + 80;
    let panelY = 50;
    let panelW = canvasWidth - panelX - margin;
    let panelH = drawHeight - 100;

    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 10);

    textAlign(LEFT, TOP);
    fill(0);
    textSize(15);
    text('Motion Data:', panelX + 15, panelY + 15);

    let lineY = panelY + 45;
    let lineH = 26;
    textSize(13);

    fill(0);
    text('Time:', panelX + 15, lineY);
    textAlign(RIGHT, TOP);
    text(time.toFixed(2) + ' s', panelX + panelW - 15, lineY);
    lineY += lineH;

    textAlign(LEFT, TOP);
    text('Height:', panelX + 15, lineY);
    textAlign(RIGHT, TOP);
    text(max(0, y).toFixed(1) + ' m', panelX + panelW - 15, lineY);
    lineY += lineH;

    textAlign(LEFT, TOP);
    fill(0, 150, 0);
    text('Velocity:', panelX + 15, lineY);
    textAlign(RIGHT, TOP);
    text(vy.toFixed(1) + ' m/s', panelX + panelW - 15, lineY);
    lineY += lineH;

    textAlign(LEFT, TOP);
    fill(0);
    text('Speed:', panelX + 15, lineY);
    textAlign(RIGHT, TOP);
    text(abs(vy).toFixed(1) + ' m/s', panelX + panelW - 15, lineY);
    lineY += lineH + 15;

    // Equations section
    stroke(200);
    line(panelX + 15, lineY, panelX + panelW - 15, lineY);
    lineY += 10;

    textAlign(LEFT, TOP);
    fill(0);
    textSize(14);
    text('Equations:', panelX + 15, lineY);
    lineY += 25;

    textSize(12);
    fill(60);
    text('y = y\u2080 + v\u2080t - \u00BDgt\u00B2', panelX + 15, lineY);
    lineY += 22;
    text('v = v\u2080 - gt', panelX + 15, lineY);
    lineY += 22;
    text('v\u00B2 = v\u2080\u00B2 - 2g(y - y\u2080)', panelX + 15, lineY);
    lineY += 30;

    // Key insight
    fill(50, 100, 150);
    textSize(11);
    text('All objects fall at the', panelX + 15, lineY);
    lineY += 16;
    text('same rate regardless', panelX + 15, lineY);
    lineY += 16;
    text('of mass!', panelX + 15, lineY);
}

function updatePhysics() {
    let dt = 1 / 60; // Assuming 60 fps

    // Update velocity: v = v0 - g*t
    vy -= g * dt;

    // Update position: y = y + v*dt
    y += vy * dt;
    time += dt;

    // Add to trail
    if (frameCount % 2 === 0) {
        trail.push({ y: y, t: time });
    }

    // Check for landing
    if (y <= 0) {
        y = 0;
        hasLanded = true;
        isRunning = false;
        dropButton.html('Drop');
    }
}

function startDrop() {
    if (isRunning) {
        isRunning = false;
        dropButton.html('Resume');
    } else {
        if (hasLanded) {
            resetSimulation();
        }
        isRunning = true;
        dropButton.html('Pause');
    }
}

function resetSimulation() {
    initialHeight = heightSlider.value();
    initialVelocity = velocitySlider.value();
    y = initialHeight;
    vy = initialVelocity;
    time = 0;
    isRunning = false;
    hasLanded = false;
    trail = [];
    dropButton.html('Drop');
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 900);
    }
}
