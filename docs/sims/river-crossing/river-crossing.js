// River Crossing Relative Velocity MicroSim
// Shows how river current affects a swimmer's trajectory

let canvasWidth = 850;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// Physics parameters
let swimmerSpeed = 2; // m/s (relative to water)
let currentSpeed = 1.5; // m/s
let riverWidth = 50; // meters

// Simulation state
let swimmer = null;
let isRunning = false;
let time = 0;

// Display scale
let scale = 6; // pixels per meter
let riverTop, riverBottom;

// UI Controls
let swimmerSlider, currentSlider;
let swimButton, resetButton, animateButton;
let showVectorsCheckbox, showTrailCheckbox, aimDirectCheckbox;

// River animation
let isAnimating = false;
let arrowOffset = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    riverTop = 80;
    riverBottom = drawHeight - 60;

    // Buttons
    swimButton = createButton('Swim');
    swimButton.position(margin, drawHeight + 15);
    swimButton.mousePressed(startSwimming);
    swimButton.style('font-size', '13px');
    swimButton.style('padding', '6px 14px');

    resetButton = createButton('Reset');
    resetButton.position(margin + 70, drawHeight + 15);
    resetButton.mousePressed(resetSimulation);
    resetButton.style('font-size', '13px');
    resetButton.style('padding', '6px 14px');

    animateButton = createButton('Start Flow');
    animateButton.position(margin, drawHeight + 55);
    animateButton.mousePressed(toggleAnimation);
    animateButton.style('font-size', '13px');
    animateButton.style('padding', '6px 14px');

    // Sliders
    swimmerSlider = createSlider(0.5, 4, 2, 0.1);
    swimmerSlider.position(260, drawHeight + 15);
    swimmerSlider.style('width', '90px');

    currentSlider = createSlider(0, 3, 1.5, 0.1);
    currentSlider.position(260, drawHeight + 50);
    currentSlider.style('width', '90px');

    // Checkboxes
    // 
    showVectorsCheckbox = createCheckbox('Show Vectors', true);
    showVectorsCheckbox.position(370, drawHeight + 12);
    showVectorsCheckbox.style('font-size', '12px');

    showTrailCheckbox = createCheckbox('Show Trail', true);
    showTrailCheckbox.position(370, drawHeight + 35);
    showTrailCheckbox.style('font-size', '12px');

    aimDirectCheckbox = createCheckbox('Aim Upstream', false);
    aimDirectCheckbox.position(370, drawHeight + 58);
    aimDirectCheckbox.style('font-size', '12px');

    resetSimulation();

    describe('River crossing simulation showing how current affects a swimmer trajectory, demonstrating relative velocity and vector addition.', LABEL);
}

function draw() {
    updateCanvasSize();
    riverTop = 80;
    riverBottom = drawHeight - 60;

    // Update parameters from sliders
    currentSpeed = currentSlider.value();
    swimmerSpeed = swimmerSlider.value();

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
    textSize(18);
    textAlign(CENTER, TOP);
    text('River Crossing: Relative Velocity', canvasWidth / 2 - 80, 8);

    // Draw scene
    drawScene();

    // Update physics
    if (isRunning) {
        updatePhysics();
    }

    // Update river animation (match swimmer drift: currentSpeed * dt * scale)
    if (isAnimating) {
        arrowOffset += currentSpeed * (1/60) * scale;
    }

    // Draw controls and info
    drawControlLabels();
    drawInfoPanel();
}

function drawScene() {
    // Calculate dimensions
    let riverPixelWidth = riverBottom - riverTop;
    // Starting point X of the 
    let startX = 120;
    // 
    let maxX = canvasWidth - 20;

    // Top bank (destination side)
    fill(120, 180, 100);
    noStroke();
    rect(0, 40, canvasWidth, riverTop - 40);

    // Bottom bank (start side)
    fill(120, 180, 100);
    rect(0, riverBottom, canvasWidth, drawHeight - riverBottom);

    // River
    fill(100, 150, 220);
    rect(0, riverTop, canvasWidth, riverPixelWidth);

    // River flow arrows (animated)
    stroke(80, 130, 200);
    strokeWeight(1);
    let arrowSpacing = 80;
    let offset = arrowOffset % arrowSpacing;
    for (let y = riverTop + 30; y < riverBottom - 20; y += 40) {
        for (let x = 50 - arrowSpacing + offset; x < canvasWidth - 20; x += arrowSpacing) {
            if (x >= 20 && x < canvasWidth - 50) {
                drawArrow(x, y, x + 30, y, [80, 130, 200], 1);
            }
        }
    }

    // Current direction label
    fill(60, 100, 160);
    textSize(14);
    textAlign(LEFT, CENTER);
    noStroke();
    text('Current \u2192', 20, riverTop + 20);
    text(currentSpeed.toFixed(1) + ' m/s', 20, riverTop + 35);

    // Bank labels
    fill(60, 100, 60);
    textSize(16);
    textAlign(LEFT, CENTER);
    text('FAR BANK (destination)', 10, 60);
    text('NEAR BANK (start)', 10, riverBottom + 45);

    // Distance markers along river
    textSize(12);
    fill(80);
    textAlign(CENTER, TOP);
    for (let d = 0; d <= 160; d += 10) {
        let x = startX + d * scale;
        if (x < maxX) {
            stroke(150);
            strokeWeight(1);
            line(x, riverBottom + 5, x, riverBottom + 12);
            noStroke();
            text(d + 'm', x, riverBottom + 14);
        }
    }

    // Start point (A)
    let startY = riverBottom;
    fill(0, 180, 0);
    stroke(0, 130, 0);
    strokeWeight(2);
    ellipse(startX, startY, 20, 20);
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    noStroke();
    text('A', startX, startY);

    // Intended destination (B) - directly across
    let destX = startX;
    let destY = riverTop;
    fill(100, 100, 255);
    stroke(70, 70, 200);
    strokeWeight(2);
    ellipse(destX, destY, 20, 20);
    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    noStroke();
    text('B', destX, destY);

    // Labels
    textSize(14);
    fill(0);
    textAlign(LEFT, CENTER);
    text('Start (A)', startX + 15, startY);
    text('Target (B)', destX + 15, destY);

    // Dashed line from A to B (intended path)
    stroke(100, 100, 255, 150);
    strokeWeight(1);
    setLineDash([5, 5]);
    line(startX, startY, destX, destY);
    setLineDash([]);

    // Draw swimmer trail
    if (swimmer && showTrailCheckbox.checked() && swimmer.trail.length > 1) {
        stroke(255, 150, 50, 180);
        strokeWeight(2);
        noFill();
        beginShape();
        for (let p of swimmer.trail) {
            let px = startX + p.x * scale;
            let py = riverBottom - p.y * scale;
            vertex(px, py);
        }
        endShape();
    }

    // Show vectors at start position when no swimmer yet
    if (!swimmer && showVectorsCheckbox.checked()) {
        let px = startX;
        let py = startY;
        let vecScale = 25;

        // Calculate swim velocity based on checkbox
        let swimVx, swimVy;
        if (aimDirectCheckbox.checked() && swimmerSpeed > currentSpeed) {
            let angle = asin(currentSpeed / swimmerSpeed);
            swimVx = -swimmerSpeed * sin(angle);
            swimVy = swimmerSpeed * cos(angle);
        } else {
            swimVx = 0;
            swimVy = swimmerSpeed;
        }

        // Resultant velocity
        let resVx = swimVx + currentSpeed;
        let resVy = swimVy;

        // Swimmer velocity (relative to water) - blue
        drawArrow(px, py, px + swimVx * vecScale, py - swimVy * vecScale, [50, 50, 255], 3);

        // Current velocity - red
        drawArrow(px, py, px + currentSpeed * vecScale, py, [255, 50, 50], 3);

        // Resultant velocity - purple
        drawArrow(px, py, px + resVx * vecScale, py - resVy * vecScale, [180, 50, 180], 3);

        // Vector labels
        textSize(12);
        noStroke();
        fill(50, 50, 255);
        text('v_swim', px + swimVx * vecScale + 5, py - swimVy * vecScale);
        fill(255, 50, 50);
        text('v_current', px + currentSpeed * vecScale + 5, py + 5);
        fill(180, 50, 180);
        text('v_result', px + resVx * vecScale + 5, py - resVy * vecScale - 10);
    }

    // Draw swimmer
    if (swimmer) {
        let px = startX + swimmer.x * scale;
        let py = riverBottom - swimmer.y * scale;

        if (py >= riverTop - 10) {
            // Swimmer body
            fill(255, 180, 100);
            stroke(200, 140, 80);
            strokeWeight(2);
            ellipse(px, py, 18, 18);

            // Show velocity vectors
            if (showVectorsCheckbox.checked() && !swimmer.landed) {
                let vecScale = 25;

                // Swimmer velocity (relative to water) - blue
                let swimVx = swimmer.swimVx;
                let swimVy = swimmer.swimVy;
                drawArrow(px, py, px + swimVx * vecScale, py - swimVy * vecScale, [50, 50, 255], 3);

                // Current velocity - red
                drawArrow(px, py, px + currentSpeed * vecScale, py, [255, 50, 50], 3);

                // Resultant velocity - purple
                let resVx = swimmer.vx;
                let resVy = swimmer.vy;
                drawArrow(px, py, px + resVx * vecScale, py - resVy * vecScale, [180, 50, 180], 3);

                // Vector labels
                textSize(12);
                noStroke();
                fill(50, 50, 255);
                text('v_swim', px + swimVx * vecScale + 5, py - swimVy * vecScale);
                fill(255, 50, 50);
                text('v_current', px + currentSpeed * vecScale + 5, py + 5);
                fill(180, 50, 180);
                text('v_result', px + resVx * vecScale + 5, py - resVy * vecScale - 10);
            }
        }
    }

    // Landing point (C) if landed
    if (swimmer && swimmer.landed) {
        let landX = startX + swimmer.x * scale;
        let landY = riverTop;

        fill(255, 100, 50);
        stroke(200, 70, 30);
        strokeWeight(2);
        ellipse(landX, landY, 20, 20);
        fill(255);
        textSize(16);
        textAlign(CENTER, CENTER);
        noStroke();
        text('C', landX, landY);

        // Label
        textSize(14);
        fill(200, 70, 30);
        textAlign(LEFT, CENTER);
        text('Landed (C)', landX + 15, landY);

        // Downstream drift
        if (swimmer.x > 0) {
            stroke(200, 100, 50);
            strokeWeight(1);
            setLineDash([3, 3]);
            line(startX, landY, landX, landY);
            setLineDash([]);

            fill(200, 70, 30);
            textSize(12);
            textAlign(CENTER, BOTTOM);
            text('Drift: ' + swimmer.x.toFixed(1) + 'm', (startX + landX) / 2, landY - 25);
        }
    }

    // Draw vector addition triangle (when showing vectors)
    if (showVectorsCheckbox.checked() && (!swimmer || !swimmer.landed)) {
        drawVectorTriangle();
    }
}

function drawVectorTriangle() {
    // Draw a vector triangle diagram in the corner
    let triX = canvasWidth - 180;
    let triY = riverTop + 40;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(triX - 10, triY - 10, 170, 120, 8);

    textSize(12);
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    text('Vector Addition:', triX, triY);

    let baseX = triX + 20;
    let baseY = triY + 80;
    let triScale = 20;

    // Calculate swim velocity (from swimmer or from settings)
    let swimVx, swimVy;
    if (swimmer) {
        swimVx = swimmer.swimVx;
        swimVy = swimmer.swimVy;
    } else {
        // Calculate based on checkbox settings
        if (aimDirectCheckbox.checked() && swimmerSpeed > currentSpeed) {
            let angle = asin(currentSpeed / swimmerSpeed);
            swimVx = -swimmerSpeed * sin(angle);
            swimVy = swimmerSpeed * cos(angle);
        } else {
            swimVx = 0;
            swimVy = swimmerSpeed;
        }
    }

    // Swimmer velocity (pointing up or angled)
    drawArrow(baseX, baseY, baseX + swimVx * triScale, baseY - swimVy * triScale, [50, 50, 255], 2);

    // Current (from tip of swimmer velocity)
    let tipX = baseX + swimVx * triScale;
    let tipY = baseY - swimVy * triScale;
    drawArrow(tipX, tipY, tipX + currentSpeed * triScale, tipY, [255, 50, 50], 2);

    // Resultant (from base to final tip)
    let finalX = tipX + currentSpeed * triScale;
    let finalY = tipY;
    stroke(180, 50, 180);
    strokeWeight(1);
    setLineDash([3, 3]);
    line(baseX, baseY, finalX, finalY);
    setLineDash([]);
}

function drawArrow(x1, y1, x2, y2, col, weight) {
    stroke(col[0], col[1], col[2]);
    strokeWeight(weight);
    line(x1, y1, x2, y2);

    // Arrowhead
    let angle = atan2(y2 - y1, x2 - x1);
    let headLen = 8;
    fill(col[0], col[1], col[2]);
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -headLen, -headLen / 2, -headLen, headLen / 2);
    pop();
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function drawInfoPanel() {
    let panelX = 480;
    let panelY = drawHeight + 10;

    textSize(14);
    textAlign(LEFT, TOP);
    noStroke();

    // Results
    if (swimmer) {
        fill(0);
        text('Time: ' + time.toFixed(2) + ' s', panelX, panelY);

        if (swimmer.landed) {
            fill(0, 130, 0);
            text('Crossed! Drift: ' + swimmer.x.toFixed(1) + 'm downstream', panelX, panelY + 18);

            // Calculate what angle would have worked
            let neededAngle = degrees(atan2(currentSpeed, swimmerSpeed));
            fill(100);
            text('To go straight: aim ' + neededAngle.toFixed(1) + '\u00B0 upstream', panelX, panelY + 36);
        }
    }

    // Theory
    let crossTime = riverWidth / swimmerSpeed;
    let drift = currentSpeed * crossTime;
    fill(80);
    textSize(14);
    text('Theory: t = ' + crossTime.toFixed(2) + 's, drift = ' + drift.toFixed(1) + 'm', panelX, panelY + 58);
}

function drawControlLabels() {
    fill(0);
    textSize(11);
    textAlign(LEFT, CENTER);
    noStroke();

    text('Swim speed: ' + swimmerSpeed.toFixed(1) + ' m/s', 155, drawHeight + 25);
    text('Current: ' + currentSpeed.toFixed(1) + ' m/s', 155, drawHeight + 60);

    // Legend (horizontal below sliders)
    textSize(14);
    fill(50, 50, 255);
    text('\u25CF Swimmer', 155, drawHeight + 82);
    fill(255, 50, 50);
    text('\u25CF Current', 230, drawHeight + 82);
    fill(180, 50, 180);
    text('\u25CF Result', 300, drawHeight + 82);
}

function updatePhysics() {
    let dt = 1 / 60;

    if (!swimmer.landed) {
        // Recalculate swim velocity based on checkbox
        if (aimDirectCheckbox.checked() && swimmerSpeed > currentSpeed) {
            // Aim upstream to go straight across
            let angle = asin(currentSpeed / swimmerSpeed);
            swimmer.swimVx = -swimmerSpeed * sin(angle);
            swimmer.swimVy = swimmerSpeed * cos(angle);
        } else {
            // Aim straight across
            swimmer.swimVx = 0;
            swimmer.swimVy = swimmerSpeed;
        }

        // Update resultant velocity based on current slider
        swimmer.vx = swimmer.swimVx + currentSpeed;
        swimmer.vy = swimmer.swimVy;

        // Update position using resultant velocity
        swimmer.x += swimmer.vx * dt;
        swimmer.y += swimmer.vy * dt;

        // Trail
        if (frameCount % 2 === 0) {
            swimmer.trail.push({ x: swimmer.x, y: swimmer.y });
        }

        // Check if crossed
        if (swimmer.y >= riverWidth) {
            swimmer.y = riverWidth;
            swimmer.landed = true;
            isRunning = false;
            swimButton.html('Swim');
        }

        time += dt;
    }
}

function startSwimming() {
    if (isRunning) {
        isRunning = false;
        swimButton.html('Resume');
    } else {
        if (swimmer && swimmer.landed) {
            resetSimulation();
        }

        // Calculate velocities
        let swimVx, swimVy;

        if (aimDirectCheckbox.checked() && swimmerSpeed > currentSpeed) {
            // Aim upstream to go straight across
            let angle = asin(currentSpeed / swimmerSpeed);
            swimVx = -swimmerSpeed * sin(angle);
            swimVy = swimmerSpeed * cos(angle);
        } else {
            // Aim straight across
            swimVx = 0;
            swimVy = swimmerSpeed;
        }

        // Resultant velocity = swimmer + current
        let vx = swimVx + currentSpeed;
        let vy = swimVy;

        swimmer = {
            x: 0,
            y: 0,
            vx: vx,
            vy: vy,
            swimVx: swimVx,
            swimVy: swimVy,
            trail: [],
            landed: false
        };

        time = 0;
        isRunning = true;
        swimButton.html('Pause');
    }
}

function resetSimulation() {
    swimmer = null;
    time = 0;
    isRunning = false;
    swimButton.html('Swim');
}

function toggleAnimation() {
    isAnimating = !isAnimating;
    animateButton.html(isAnimating ? 'Pause Flow' : 'Start Flow');
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
