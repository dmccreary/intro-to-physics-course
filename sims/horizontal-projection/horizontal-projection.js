// Horizontal Projection MicroSim
// Demonstrates that objects with different horizontal velocities
// but same initial height hit the ground simultaneously

let canvasWidth = 900;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// Physics parameters
let g = 9.8; // m/s²
let platformHeight = 40; // meters

// Projectile speeds (m/s)
let speed1 = 10; // red
let speed2 = 15; // blue
let speed3 = 20; // green

// Simulation state
let projectiles = [];
let isRunning = false;
let time = 0;
let slowMotion = false;

// Display scale
let scale = 8; // pixels per meter

// UI Controls
let heightSlider, speed1Slider, speed2Slider, speed3Slider;
let launchButton, resetButton;
let showComponentsCheckbox, showTrailsCheckbox, slowMotionCheckbox;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Create controls
    launchButton = createButton('Launch All');
    launchButton.position(margin, drawHeight + 12);
    launchButton.mousePressed(launchProjectiles);
    launchButton.style('font-size', '13px');
    launchButton.style('padding', '6px 12px');

    resetButton = createButton('Reset');
    resetButton.position(margin + 85, drawHeight + 12);
    resetButton.mousePressed(resetSimulation);
    resetButton.style('font-size', '13px');
    resetButton.style('padding', '6px 12px');

    // Height slider
    heightSlider = createSlider(10, 50, 40, 1);
    heightSlider.position(235, drawHeight + 12);
    heightSlider.style('width', '80px');

    // Speed sliders
    speed1Slider = createSlider(5, 25, 10, 1);
    speed1Slider.position(235, drawHeight + 40);
    speed1Slider.style('width', '80px');

    speed2Slider = createSlider(5, 25, 15, 1);
    speed2Slider.position(235, drawHeight + 68);
    speed2Slider.style('width', '80px');

    speed3Slider = createSlider(5, 25, 20, 1);
    speed3Slider.position(430, drawHeight + 12);
    speed3Slider.style('width', '80px');

    // Checkboxes
    showComponentsCheckbox = createCheckbox('Components', false);
    showComponentsCheckbox.position(430, drawHeight + 38);
    showComponentsCheckbox.style('font-size', '12px');

    showTrailsCheckbox = createCheckbox('Trails', true);
    showTrailsCheckbox.position(430, drawHeight + 58);
    showTrailsCheckbox.style('font-size', '12px');

    slowMotionCheckbox = createCheckbox('Slow (0.5x)', false);
    slowMotionCheckbox.position(520, drawHeight + 38);
    slowMotionCheckbox.style('font-size', '12px');

    resetSimulation();

    describe('Horizontal projection simulation showing three projectiles with different speeds falling from the same height, demonstrating independence of horizontal and vertical motion.', LABEL);
}

function draw() {
    updateCanvasSize();

    // Update parameters from sliders when not running
    if (!isRunning) {
        platformHeight = heightSlider.value();
        speed1 = speed1Slider.value();
        speed2 = speed2Slider.value();
        speed3 = speed3Slider.value();
    }

    slowMotion = slowMotionCheckbox.checked();

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
    textSize(20);
    textAlign(CENTER, TOP);
    text('Horizontal Projection: Same Height, Different Speeds', canvasWidth / 2, 8);

    // Draw scene
    drawScene();

    // Update physics
    if (isRunning) {
        updatePhysics();
    }

    // Draw control labels
    drawControlLabels();

    // Draw info panel
    drawInfoPanel();
}

function drawScene() {
    let groundY = drawHeight - 40;
    let platformX = 80;

    // Ground with distance markers
    stroke(100, 80, 50);
    strokeWeight(3);
    line(platformX, groundY, canvasWidth - 30, groundY);

    // Ground fill
    fill(150, 130, 100);
    noStroke();
    rect(platformX, groundY, canvasWidth - platformX - 30, 25);

    // Distance markers
    textSize(10);
    fill(80);
    textAlign(CENTER, TOP);
    for (let d = 0; d <= 90; d += 10) {
        let x = platformX + d * scale;
        if (x < canvasWidth - 40) {
            stroke(150);
            strokeWeight(1);
            line(x, groundY - 5, x, groundY + 5);
            noStroke();
            text(d + 'm', x, groundY + 8);
        }
    }

    // Platform/cliff
    let platformTop = groundY - platformHeight * scale;

    // Platform structure
    fill(100, 90, 80);
    stroke(70, 60, 50);
    strokeWeight(2);
    rect(platformX - 60, platformTop, 70, platformHeight * scale);

    // Platform top
    fill(120, 110, 100);
    rect(platformX - 60, platformTop - 10, 80, 15);

    // Height markers on platform
    textSize(9);
    fill(200);
    textAlign(RIGHT, CENTER);
    noStroke();
    for (let h = 0; h <= platformHeight; h += 10) {
        let y = groundY - h * scale;
        if (y > 50) {
            text(h + 'm', platformX - 65, y);
        }
    }

    // Draw trajectories (trails)
    if (showTrailsCheckbox.checked()) {
        for (let p of projectiles) {
            if (p.trail.length > 1) {
                stroke(p.color[0], p.color[1], p.color[2], 150);
                strokeWeight(2);
                noFill();
                beginShape();
                for (let pos of p.trail) {
                    let px = platformX + pos.x * scale;
                    let py = groundY - pos.y * scale;
                    vertex(px, py);
                }
                endShape();
            }
        }
    }

    // Draw projectiles
    for (let p of projectiles) {
        let px = platformX + p.x * scale;
        let py = groundY - p.y * scale;

        // Only draw if on screen
        if (px > 0 && px < canvasWidth && py > 30) {
            // Shadow
            fill(0, 0, 0, 40);
            noStroke();
            let shadowScale = map(p.y, 0, platformHeight, 1, 0.3);
            ellipse(px, groundY - 2, 20 * shadowScale, 6 * shadowScale);

            // Projectile
            fill(p.color);
            stroke(p.color[0] * 0.7, p.color[1] * 0.7, p.color[2] * 0.7);
            strokeWeight(2);
            ellipse(px, py, 18, 18);

            // Velocity components
            if (showComponentsCheckbox.checked() && isRunning && !p.landed) {
                // Horizontal component (constant)
                stroke(255, 100, 100);
                strokeWeight(2);
                let vxLen = p.vx * 2;
                line(px, py, px + vxLen, py);
                // Arrow head
                fill(255, 100, 100);
                noStroke();
                triangle(px + vxLen, py, px + vxLen - 6, py - 3, px + vxLen - 6, py + 3);

                // Vertical component (increasing)
                stroke(100, 100, 255);
                strokeWeight(2);
                let vyLen = -p.vy * 2;
                line(px, py, px, py + vyLen);
                // Arrow head
                fill(100, 100, 255);
                noStroke();
                if (vyLen > 5) {
                    triangle(px, py + vyLen, px - 3, py + vyLen - 6, px + 3, py + vyLen - 6);
                }
            }

            // Speed label
            if (isRunning || p.y > 0) {
                textSize(10);
                fill(p.color);
                textAlign(LEFT, CENTER);
                noStroke();
                text(p.speed + ' m/s', px + 12, py - 12);
            }
        }
    }

    // Landing markers
    for (let p of projectiles) {
        if (p.landed) {
            let landX = platformX + p.landingX * scale;
            fill(p.color);
            noStroke();
            triangle(landX, groundY - 8, landX - 5, groundY - 18, landX + 5, groundY - 18);
            textSize(9);
            textAlign(CENTER, BOTTOM);
            text(p.landingX.toFixed(1) + 'm', landX, groundY - 20);
        }
    }
}

function drawInfoPanel() {
    let panelX = canvasWidth - 200;
    let panelY = 40;
    let panelW = 185;
    let panelH = 200;

    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    textAlign(LEFT, TOP);
    fill(0);
    textSize(13);
    text('Results:', panelX + 12, panelY + 12);

    let lineY = panelY + 35;
    let lineH = 22;
    textSize(11);

    // Time display
    fill(0);
    text('Time: ' + time.toFixed(2) + ' s', panelX + 12, lineY);
    lineY += lineH;

    // Theoretical fall time
    let tTheory = sqrt(2 * platformHeight / g);
    fill(100);
    text('Theory: t = ' + tTheory.toFixed(2) + ' s', panelX + 12, lineY);
    lineY += lineH + 5;

    // Landing info for each projectile
    for (let i = 0; i < projectiles.length; i++) {
        let p = projectiles[i];
        fill(p.color);
        let status = p.landed ? 'Landed: ' + p.landingX.toFixed(1) + 'm' : 'x = ' + p.x.toFixed(1) + 'm';
        text((i + 1) + '. ' + p.speed + ' m/s: ' + status, panelX + 12, lineY);
        lineY += lineH;
    }

    // Key insight
    lineY += 10;
    fill(0, 100, 150);
    textSize(10);
    text('All land at SAME time!', panelX + 12, lineY);
    lineY += 14;
    text('(Different distances)', panelX + 12, lineY);
}

function drawControlLabels() {
    fill(0);
    textSize(11);
    textAlign(LEFT, CENTER);
    noStroke();

    // Row 1
    text('Height: ' + platformHeight + 'm', 155, drawHeight + 22);

    // Row 2 - speed1 (red)
    fill(200, 50, 50);
    text('v\u2081: ' + speed1 + ' m/s', 155, drawHeight + 50);

    // Row 3 - speed2 (blue)
    fill(50, 50, 200);
    text('v\u2082: ' + speed2 + ' m/s', 155, drawHeight + 78);

    // speed3 (green) label
    fill(50, 150, 50);
    text('v\u2083: ' + speed3 + ' m/s', 340, drawHeight + 22);

    // Status
    fill(0);
    textSize(12);
    textAlign(RIGHT, CENTER);
    if (projectiles.some(p => p.landed)) {
        fill(0, 130, 0);
        text('All landed!', canvasWidth - 30, drawHeight + 75);
    } else if (isRunning) {
        fill(0, 100, 200);
        text('Falling...', canvasWidth - 30, drawHeight + 75);
    } else {
        fill(100);
        text('Ready', canvasWidth - 30, drawHeight + 75);
    }
}

function updatePhysics() {
    let dt = slowMotion ? 1 / 120 : 1 / 60;

    let allLanded = true;
    for (let p of projectiles) {
        if (!p.landed) {
            allLanded = false;

            // Update velocity (only vertical changes)
            p.vy -= g * dt;

            // Update position
            p.x += p.vx * dt;
            p.y += p.vy * dt;

            // Record trail
            if (frameCount % 2 === 0) {
                p.trail.push({ x: p.x, y: max(0, p.y) });
            }

            // Check for landing
            if (p.y <= 0) {
                p.y = 0;
                p.landed = true;
                p.landingX = p.x;
                p.landingTime = time;
            }
        }
    }

    time += dt;

    if (allLanded) {
        isRunning = false;
        launchButton.html('Launch All');
    }
}

function launchProjectiles() {
    if (isRunning) {
        isRunning = false;
        launchButton.html('Resume');
    } else {
        if (projectiles.every(p => p.landed)) {
            resetSimulation();
        }
        isRunning = true;
        launchButton.html('Pause');
    }
}

function resetSimulation() {
    platformHeight = heightSlider.value();
    speed1 = speed1Slider.value();
    speed2 = speed2Slider.value();
    speed3 = speed3Slider.value();

    projectiles = [
        {
            x: 0, y: platformHeight,
            vx: speed1, vy: 0,
            speed: speed1,
            color: [200, 50, 50],
            trail: [],
            landed: false,
            landingX: 0,
            landingTime: 0
        },
        {
            x: 0, y: platformHeight,
            vx: speed2, vy: 0,
            speed: speed2,
            color: [50, 50, 200],
            trail: [],
            landed: false,
            landingX: 0,
            landingTime: 0
        },
        {
            x: 0, y: platformHeight,
            vx: speed3, vy: 0,
            speed: speed3,
            color: [50, 150, 50],
            trail: [],
            landed: false,
            landingX: 0,
            landingTime: 0
        }
    ];

    time = 0;
    isRunning = false;
    launchButton.html('Launch All');
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
