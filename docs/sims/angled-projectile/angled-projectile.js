// Angled Projectile Motion Explorer MicroSim
// Explore how launch angle and initial speed affect trajectory

let canvasWidth = 900;
let drawHeight = 450;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// Physics parameters
let g = 9.8; // m/s²
let launchAngle = 45; // degrees
let initialSpeed = 20; // m/s
let launchHeight = 0; // meters

// Simulation state
let projectile = null;
let isRunning = false;
let time = 0;
let trajectories = []; // Store previous trajectories
let complementaryProjectile = null;

// Display scale
let scale = 5; // pixels per meter
let originX = 80;
let originY;

// UI Controls
let angleSlider, speedSlider, heightSlider;
let launchButton, resetButton, clearButton;
let showPredictedCheckbox, showComponentsCheckbox;
let showMultipleCheckbox, showComplementaryCheckbox;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    originY = drawHeight - 50;

    // Row 1 controls
    launchButton = createButton('Launch');
    launchButton.position(margin, drawHeight + 15);
    launchButton.mousePressed(launchProjectile);
    launchButton.style('font-size', '13px');
    launchButton.style('padding', '6px 14px');

    resetButton = createButton('Reset');
    resetButton.position(margin + 75, drawHeight + 15);
    resetButton.mousePressed(resetSimulation);
    resetButton.style('font-size', '13px');
    resetButton.style('padding', '6px 14px');

    clearButton = createButton('Clear Trails');
    clearButton.position(margin + 140, drawHeight + 15);
    clearButton.mousePressed(clearTrajectories);
    clearButton.style('font-size', '13px');
    clearButton.style('padding', '6px 14px');

    // Angle slider
    angleSlider = createSlider(5, 85, 45, 1);
    angleSlider.position(310, drawHeight + 15);
    angleSlider.style('width', '100px');

    // Speed slider
    speedSlider = createSlider(5, 40, 20, 1);
    speedSlider.position(310, drawHeight + 45);
    speedSlider.style('width', '100px');

    // Height slider
    heightSlider = createSlider(0, 20, 0, 1);
    heightSlider.position(310, drawHeight + 75);
    heightSlider.style('width', '100px');

    // Checkboxes
    showPredictedCheckbox = createCheckbox('Predicted Path', true);
    showPredictedCheckbox.position(520, drawHeight + 12);
    showPredictedCheckbox.style('font-size', '12px');

    showComponentsCheckbox = createCheckbox('Velocity Components', false);
    showComponentsCheckbox.position(520, drawHeight + 34);
    showComponentsCheckbox.style('font-size', '12px');

    showMultipleCheckbox = createCheckbox('Keep Trails', false);
    showMultipleCheckbox.position(520, drawHeight + 56);
    showMultipleCheckbox.style('font-size', '12px');

    showComplementaryCheckbox = createCheckbox('Complementary Angle', false);
    showComplementaryCheckbox.position(520, drawHeight + 78);
    showComplementaryCheckbox.style('font-size', '12px');

    resetSimulation();

    describe('Angled projectile motion explorer showing how launch angle and speed affect trajectory, range, and maximum height.', LABEL);
}

function draw() {
    updateCanvasSize();
    originY = drawHeight - 50;

    // Update parameters from sliders when not running
    if (!isRunning) {
        launchAngle = angleSlider.value();
        initialSpeed = speedSlider.value();
        launchHeight = heightSlider.value();
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
    textSize(18);
    textAlign(CENTER, TOP);
    text('Angled Projectile Motion Explorer', canvasWidth / 2 - 80, 8);

    // Draw scene
    drawScene();

    // Update physics
    if (isRunning) {
        updatePhysics();
    }

    // Draw control labels
    drawControlLabels();

    // Draw data panel
    drawDataPanel();
}

function drawScene() {
    // Ground
    stroke(100, 80, 50);
    strokeWeight(3);
    line(originX - 20, originY, canvasWidth - 30, originY);

    // Ground fill
    fill(120, 180, 100);
    noStroke();
    rect(originX - 20, originY, canvasWidth - originX - 10, 30);

    // Distance markers
    textSize(9);
    fill(80);
    textAlign(CENTER, TOP);
    for (let d = 0; d <= 150; d += 10) {
        let x = originX + d * scale;
        if (x < canvasWidth - 40) {
            stroke(180);
            strokeWeight(1);
            line(x, originY - 3, x, originY + 3);
            noStroke();
            if (d % 20 === 0) {
                text(d + 'm', x, originY + 6);
            }
        }
    }

    // Height markers
    textAlign(RIGHT, CENTER);
    for (let h = 0; h <= 60; h += 10) {
        let y = originY - h * scale;
        if (y > 40) {
            stroke(200);
            strokeWeight(1);
            line(originX - 10, y, originX + 10, y);
            noStroke();
            fill(80);
            text(h + 'm', originX - 15, y);
        }
    }

    // Launch platform
    if (launchHeight > 0) {
        let platY = originY - launchHeight * scale;
        fill(100, 90, 80);
        stroke(70, 60, 50);
        strokeWeight(2);
        rect(originX - 30, platY, 40, launchHeight * scale);
        fill(120, 110, 100);
        rect(originX - 30, platY - 8, 50, 12);
    }

    // Draw stored trajectories
    for (let traj of trajectories) {
        stroke(traj.color[0], traj.color[1], traj.color[2], 100);
        strokeWeight(1.5);
        noFill();
        beginShape();
        for (let p of traj.points) {
            vertex(originX + p.x * scale, originY - p.y * scale);
        }
        endShape();
    }

    // Draw predicted path
    if (showPredictedCheckbox.checked() && !isRunning) {
        drawPredictedPath(launchAngle, initialSpeed, launchHeight, [100, 100, 200]);

        // Complementary angle prediction
        if (showComplementaryCheckbox.checked()) {
            let compAngle = 90 - launchAngle;
            if (compAngle !== launchAngle && compAngle > 0) {
                drawPredictedPath(compAngle, initialSpeed, launchHeight, [200, 100, 100]);
            }
        }
    }

    // Draw launcher
    let launchY = originY - launchHeight * scale;
    push();
    translate(originX, launchY);
    rotate(-radians(launchAngle));

    // Cannon body
    fill(80, 80, 90);
    stroke(50);
    strokeWeight(2);
    rect(-10, -8, 40, 16, 2);

    // Cannon opening
    fill(40);
    noStroke();
    ellipse(30, 0, 10, 12);
    pop();

    // Angle indicator
    noFill();
    stroke(100, 100, 200);
    strokeWeight(1);
    arc(originX, launchY, 50, 50, -radians(launchAngle), 0);
    fill(100, 100, 200);
    textSize(11);
    textAlign(LEFT, CENTER);
    noStroke();
    text(launchAngle + '\u00B0', originX + 30, launchY - 20);

    // Draw complementary projectile
    if (showComplementaryCheckbox.checked() && complementaryProjectile && isRunning) {
        drawProjectile(complementaryProjectile, [200, 100, 100]);
    }

    // Draw main projectile
    if (projectile) {
        drawProjectile(projectile, [50, 100, 200]);
    }
}

function drawPredictedPath(angle, speed, h0, col) {
    let rad = radians(angle);
    let vx = speed * cos(rad);
    let vy = speed * sin(rad);

    stroke(col[0], col[1], col[2], 150);
    strokeWeight(1);
    setLineDash([5, 5]);
    noFill();
    beginShape();

    for (let t = 0; t < 20; t += 0.05) {
        let x = vx * t;
        let y = h0 + vy * t - 0.5 * g * t * t;
        if (y < 0) break;
        vertex(originX + x * scale, originY - y * scale);
    }
    endShape();
    setLineDash([]);

    // Calculate and mark theoretical values
    let tPeak = vy / g;
    let yMax = h0 + vy * tPeak - 0.5 * g * tPeak * tPeak;

    // Time to land (quadratic formula)
    let tLand = (vy + sqrt(vy * vy + 2 * g * h0)) / g;
    let range = vx * tLand;

    // Max height marker
    if (yMax > h0) {
        let xPeak = vx * tPeak;
        let peakPx = originX + xPeak * scale;
        let peakPy = originY - yMax * scale;
        stroke(col[0], col[1], col[2], 100);
        setLineDash([3, 3]);
        line(peakPx, peakPy, peakPx, originY);
        setLineDash([]);
        fill(col[0], col[1], col[2]);
        noStroke();
        ellipse(peakPx, peakPy, 6, 6);
    }

    // Range marker
    let rangePx = originX + range * scale;
    if (rangePx < canvasWidth - 40) {
        fill(col[0], col[1], col[2]);
        noStroke();
        triangle(rangePx, originY - 5, rangePx - 4, originY - 12, rangePx + 4, originY - 12);
    }
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function drawProjectile(p, col) {
    let px = originX + p.x * scale;
    let py = originY - p.y * scale;

    if (px > 0 && px < canvasWidth && py > 20 && py < drawHeight) {
        // Trail
        if (p.trail.length > 1) {
            stroke(col[0], col[1], col[2], 180);
            strokeWeight(2);
            noFill();
            beginShape();
            for (let pt of p.trail) {
                vertex(originX + pt.x * scale, originY - pt.y * scale);
            }
            endShape();
        }

        // Projectile
        fill(col);
        stroke(col[0] * 0.7, col[1] * 0.7, col[2] * 0.7);
        strokeWeight(2);
        ellipse(px, py, 16, 16);

        // Velocity components
        if (showComponentsCheckbox.checked() && !p.landed) {
            // Horizontal component
            stroke(255, 100, 100);
            strokeWeight(2);
            let vxLen = p.vx * 2;
            line(px, py, px + vxLen, py);
            fill(255, 100, 100);
            noStroke();
            triangle(px + vxLen, py, px + vxLen - 6, py - 3, px + vxLen - 6, py + 3);

            // Vertical component
            stroke(100, 255, 100);
            strokeWeight(2);
            let vyLen = p.vy * 2;
            line(px, py, px, py - vyLen);
            fill(100, 255, 100);
            noStroke();
            if (abs(vyLen) > 5) {
                let dir = vyLen > 0 ? -1 : 1;
                triangle(px, py - vyLen, px - 3, py - vyLen + dir * 6, px + 3, py - vyLen + dir * 6);
            }
        }
    }
}

function drawDataPanel() {
    let panelX = canvasWidth - 180;
    let panelY = 35;
    let panelW = 165;
    let panelH = 195;

    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    textAlign(LEFT, TOP);
    fill(0);
    textSize(12);
    noStroke();
    text('Projectile Data:', panelX + 10, panelY + 10);

    let lineY = panelY + 30;
    let lineH = 18;
    textSize(11);

    // Calculate theoretical values
    let rad = radians(launchAngle);
    let v0x = initialSpeed * cos(rad);
    let v0y = initialSpeed * sin(rad);
    let tPeak = v0y / g;
    let yMax = launchHeight + v0y * tPeak - 0.5 * g * tPeak * tPeak;
    let tLand = (v0y + sqrt(v0y * v0y + 2 * g * launchHeight)) / g;
    let range = v0x * tLand;

    // Display values
    fill(80);
    text('v\u2080x = ' + v0x.toFixed(1) + ' m/s', panelX + 10, lineY);
    lineY += lineH;
    text('v\u2080y = ' + v0y.toFixed(1) + ' m/s', panelX + 10, lineY);
    lineY += lineH + 5;

    fill(0);
    text('Max Height: ' + yMax.toFixed(1) + ' m', panelX + 10, lineY);
    lineY += lineH;
    text('Range: ' + range.toFixed(1) + ' m', panelX + 10, lineY);
    lineY += lineH;
    text('Flight Time: ' + tLand.toFixed(2) + ' s', panelX + 10, lineY);
    lineY += lineH + 5;

    // Current values if running
    if (projectile && isRunning) {
        fill(50, 100, 200);
        text('t = ' + time.toFixed(2) + ' s', panelX + 10, lineY);
        lineY += lineH;
        text('y = ' + max(0, projectile.y).toFixed(1) + ' m', panelX + 10, lineY);
    }

    // 45 degree note
    if (launchAngle === 45 && launchHeight === 0) {
        lineY = panelY + panelH - 25;
        fill(0, 130, 0);
        textSize(10);
        text('45\u00B0 = Max Range!', panelX + 10, lineY);
    }
}

function drawControlLabels() {
    fill(0);
    textSize(11);
    textAlign(LEFT, CENTER);
    noStroke();

    text('Angle: ' + launchAngle + '\u00B0', 240, drawHeight + 25);
    text('Speed: ' + initialSpeed + ' m/s', 240, drawHeight + 55);
    text('Height: ' + launchHeight + ' m', 240, drawHeight + 85);

    // Status
    textSize(12);
    textAlign(LEFT, CENTER);
    if (projectile && projectile.landed) {
        fill(0, 130, 0);
        text('Landed at ' + projectile.x.toFixed(1) + 'm', margin, drawHeight + 55);
    } else if (isRunning) {
        fill(0, 100, 200);
        text('In flight...', margin, drawHeight + 55);
    }

    // Legend for complementary
    if (showComplementaryCheckbox.checked()) {
        textSize(10);
        fill(50, 100, 200);
        text('\u25CF ' + launchAngle + '\u00B0', margin, drawHeight + 100);
        fill(200, 100, 100);
        text('\u25CF ' + (90 - launchAngle) + '\u00B0', margin + 50, drawHeight + 100);
    }
}

function updatePhysics() {
    let dt = 1 / 60;

    // Update main projectile
    if (projectile && !projectile.landed) {
        projectile.vy -= g * dt;
        projectile.x += projectile.vx * dt;
        projectile.y += projectile.vy * dt;
        if (frameCount % 2 === 0) {
            projectile.trail.push({ x: projectile.x, y: max(0, projectile.y) });
        }
        if (projectile.y <= 0) {
            projectile.y = 0;
            projectile.landed = true;
        }
    }

    // Update complementary projectile
    if (complementaryProjectile && !complementaryProjectile.landed) {
        complementaryProjectile.vy -= g * dt;
        complementaryProjectile.x += complementaryProjectile.vx * dt;
        complementaryProjectile.y += complementaryProjectile.vy * dt;
        if (frameCount % 2 === 0) {
            complementaryProjectile.trail.push({ x: complementaryProjectile.x, y: max(0, complementaryProjectile.y) });
        }
        if (complementaryProjectile.y <= 0) {
            complementaryProjectile.y = 0;
            complementaryProjectile.landed = true;
        }
    }

    time += dt;

    // Check if all done
    let allLanded = projectile.landed;
    if (showComplementaryCheckbox.checked() && complementaryProjectile) {
        allLanded = allLanded && complementaryProjectile.landed;
    }

    if (allLanded) {
        isRunning = false;
        launchButton.html('Launch');

        // Store trajectory if keeping trails
        if (showMultipleCheckbox.checked()) {
            trajectories.push({
                points: [...projectile.trail],
                color: [50, 100, 200]
            });
            if (complementaryProjectile) {
                trajectories.push({
                    points: [...complementaryProjectile.trail],
                    color: [200, 100, 100]
                });
            }
        }
    }
}

function launchProjectile() {
    if (isRunning) {
        isRunning = false;
        launchButton.html('Resume');
    } else {
        if (projectile && projectile.landed) {
            resetSimulation();
        }

        // Create main projectile
        let rad = radians(launchAngle);
        projectile = {
            x: 0,
            y: launchHeight,
            vx: initialSpeed * cos(rad),
            vy: initialSpeed * sin(rad),
            trail: [],
            landed: false
        };

        // Create complementary if checked
        if (showComplementaryCheckbox.checked()) {
            let compAngle = 90 - launchAngle;
            let compRad = radians(compAngle);
            complementaryProjectile = {
                x: 0,
                y: launchHeight,
                vx: initialSpeed * cos(compRad),
                vy: initialSpeed * sin(compRad),
                trail: [],
                landed: false
            };
        } else {
            complementaryProjectile = null;
        }

        time = 0;
        isRunning = true;
        launchButton.html('Pause');
    }
}

function resetSimulation() {
    projectile = null;
    complementaryProjectile = null;
    time = 0;
    isRunning = false;
    launchButton.html('Launch');
}

function clearTrajectories() {
    trajectories = [];
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
