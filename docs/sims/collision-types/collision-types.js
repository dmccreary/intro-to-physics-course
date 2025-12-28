// Collision Types MicroSim - Continuous Animation Redesign
// Three types: Elastic, Inelastic and Perfectly Inelastic
// Smooth physics-based animation from start to finish

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;

let selectedType = 0; // 0=Elastic, 1=Inelastic, 2=Perfectly Inelastic
let animating = false;
let time = 0; // Simulation time

// Ball states (will be initialized on reset)
let ball1, ball2;
let hasCollided = false;
let collisionTime = 0;

// Animation constants
let trackY = 210;
let trackLeft = 80;
let trackRight;
let ballR1 = 45; // Larger ball radius (3kg)
let ballR2 = 30; // Smaller ball radius (1kg)
let timeScale = 0.4; // Slow down for visibility

// Button definitions
let buttons = {
    reset: { x: 0, y: 0, w: 80, h: 36, label: '↺ Reset' },
    play: { x: 0, y: 0, w: 100, h: 36, label: '▶ Play' },
    step: { x: 0, y: 0, w: 80, h: 36, label: 'Step →' }
};

// Collision type tabs
let tabs = [
    { label: 'Elastic', shortLabel: 'Elastic' },
    { label: 'Inelastic', shortLabel: 'Inelastic' },
    { label: 'Perfectly Inelastic', shortLabel: 'Perfect' }
];

// Collision data
let collisions = [
    {
        name: 'Elastic Collision',
        description: 'Both momentum AND kinetic energy are conserved',
        color: [70, 130, 200],
        ball1: { m: 3, v_i: 4, v_f: 1 },
        ball2: { m: 1, v_i: 0, v_f: 6 },
        ke_before: 24,
        ke_after: 24,
        ke_conserved: true
    },
    {
        name: 'Inelastic Collision',
        description: 'Momentum conserved, some kinetic energy lost to heat/sound',
        color: [220, 150, 50],
        ball1: { m: 3, v_i: 4, v_f: 2.5 },
        ball2: { m: 1, v_i: 0, v_f: 4.5 },
        ke_before: 24,
        ke_after: 19.7,
        ke_conserved: false
    },
    {
        name: 'Perfectly Inelastic Collision',
        description: 'Objects stick together, maximum kinetic energy loss',
        color: [200, 70, 70],
        ball1: { m: 3, v_i: 4, v_f: 3 },
        ball2: { m: 1, v_i: 0, v_f: 3 },
        ke_before: 24,
        ke_after: 18,
        ke_conserved: false,
        stickTogether: true
    }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');
    describe('Interactive simulation comparing elastic, inelastic, and perfectly inelastic collisions', LABEL);
    resetSimulation();
}

function draw() {
    updateCanvasSize();
    trackRight = canvasWidth - 80;
    background(255);

    let collision = collisions[selectedType];

    // Main drawing area
    fill(250, 252, 255);
    stroke(200);
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Draw collision type tabs
    drawTabs();

    // Draw title and description
    drawHeader(collision);

    // Update physics
    if (animating) {
        updatePhysics(collision);
    }

    // Draw collision visualization
    drawCollisionVisualization(collision);

    // Draw energy and momentum section
    drawDataSection(collision);

    // Draw control bar
    drawControlBar();

    // Draw phase indicator
    drawPhaseIndicator();
}

function updatePhysics(collision) {
    let dt = deltaTime * 0.001 * timeScale; // Convert to seconds, apply time scale
    time += dt;

    let pixelsPerMeter = 40; // Scale factor for velocity

    // Check for collision
    if (!hasCollided) {
        // Move balls toward each other
        ball1.x += ball1.v * pixelsPerMeter * dt;
        ball2.x += ball2.v * pixelsPerMeter * dt;

        // Check if balls collide (edges touch)
        let distance = ball2.x - ball1.x;
        let minDist = ballR1 + ballR2;

        if (distance <= minDist) {
            // Collision occurs!
            hasCollided = true;
            collisionTime = time;

            // Position balls so they're just touching
            let overlap = minDist - distance;
            ball1.x -= overlap / 2;
            ball2.x += overlap / 2;

            // Apply post-collision velocities
            ball1.v = collision.ball1.v_f;
            if (collision.stickTogether) {
                ball2.v = collision.ball1.v_f; // Same velocity when stuck
                ball2.stuck = true;
            } else {
                ball2.v = collision.ball2.v_f;
            }
        }
    } else {
        // After collision - continue moving
        ball1.x += ball1.v * pixelsPerMeter * dt;
        if (!ball2.stuck) {
            ball2.x += ball2.v * pixelsPerMeter * dt;
        } else {
            ball2.x = ball1.x; // Stuck together
        }

        // Check if animation should stop (balls reached edges or settled)
        let ball1AtEdge = (ball1.v > 0 && ball1.x >= trackRight - ballR1) ||
                          (ball1.v < 0 && ball1.x <= trackLeft + ballR1) ||
                          (ball1.v === 0);
        let ball2AtEdge = ball2.stuck ||
                          (ball2.v > 0 && ball2.x >= trackRight - ballR2) ||
                          (ball2.v < 0 && ball2.x <= trackLeft + ballR2);

        // Clamp positions to track
        ball1.x = constrain(ball1.x, trackLeft + ballR1, trackRight - ballR1);
        ball2.x = constrain(ball2.x, trackLeft + ballR2, trackRight - ballR2);
        if (ball2.stuck) ball2.x = ball1.x;

        if (ball1AtEdge && ball2AtEdge) {
            animating = false;
        }
    }
}

function getPhase() {
    // Determine current phase based on simulation state
    if (!hasCollided && time === 0) return 0; // Before
    if (!hasCollided) return 0; // Still approaching
    if (hasCollided && time - collisionTime < 0.3) return 1; // During (brief moment)
    return 2; // After
}

function drawTabs() {
    let tabWidth = min(160, (canvasWidth - 40) / 3);
    let tabHeight = 36;
    let startX = (canvasWidth - tabWidth * 3 - 20) / 2;
    let tabY = 15;

    textSize(14);
    textAlign(CENTER, CENTER);

    for (let i = 0; i < 3; i++) {
        let x = startX + i * (tabWidth + 10);
        let isSelected = (i === selectedType);

        // Tab background
        if (isSelected) {
            fill(collisions[i].color[0], collisions[i].color[1], collisions[i].color[2]);
            stroke(collisions[i].color[0] - 30, collisions[i].color[1] - 30, collisions[i].color[2] - 30);
        } else {
            fill(240);
            stroke(200);
        }
        strokeWeight(2);
        rect(x, tabY, tabWidth, tabHeight, 8);

        // Tab label
        fill(isSelected ? 255 : 80);
        noStroke();
        let label = canvasWidth < 500 ? tabs[i].shortLabel : tabs[i].label;
        text(label, x + tabWidth/2, tabY + tabHeight/2);

        // Store tab bounds for click detection
        tabs[i].bounds = { x: x, y: tabY, w: tabWidth, h: tabHeight };
    }
}

function drawHeader(collision) {
    let headerY = 65;

    // Title
    fill(collision.color[0], collision.color[1], collision.color[2]);
    textSize(22);
    textAlign(CENTER, TOP);
    noStroke();
    text(collision.name, canvasWidth/2, headerY);

    // Description
    fill(100);
    textSize(13);
    text(collision.description, canvasWidth/2, headerY + 28);
}

function drawCollisionVisualization(collision) {
    // Track/ground line
    stroke(180);
    strokeWeight(2);
    line(trackLeft, trackY + 50, trackRight, trackY + 50);

    // Draw tick marks on track
    stroke(200);
    strokeWeight(1);
    for (let x = trackLeft; x <= trackRight; x += 50) {
        line(x, trackY + 45, x, trackY + 55);
    }

    // Draw velocity arrows ABOVE balls
    drawVelocityArrows(collision);

    // Draw Ball 1 (blue, larger - 3kg) - only if not stuck together
    if (!ball2.stuck) {
        fill(100, 150, 220);
        stroke(60, 110, 180);
        strokeWeight(3);
        ellipse(ball1.x, trackY, ballR1 * 2, ballR1 * 2);

        // Ball 1 label
        fill(255);
        noStroke();
        textSize(16);
        textAlign(CENTER, CENTER);
        text('3 kg', ball1.x, trackY);
    }

    // Draw Ball 2 (red, smaller - 1kg)
    if (!ball2.stuck) {
        fill(220, 100, 100);
        stroke(180, 60, 60);
        strokeWeight(3);
        ellipse(ball2.x, trackY, ballR2 * 2, ballR2 * 2);

        // Ball 2 label
        fill(255);
        noStroke();
        textSize(14);
        text('1 kg', ball2.x, trackY);
    } else {
        // Draw combined ball over ball1 position
        // Blue fill with thick red stroke to show merger
        let combinedRadius = ballR1 + 8; // Slightly larger to show combined mass
        fill(100, 150, 220); // Blue ball fill
        stroke(220, 100, 100); // Red ball stroke color
        strokeWeight(6); // Thicker stroke
        ellipse(ball1.x, trackY, combinedRadius * 2, combinedRadius * 2);

        // Show combined mass label
        fill(255);
        noStroke();
        textSize(14);
        textAlign(CENTER, CENTER);
        text('(3+1)kg', ball1.x, trackY);
    }

    // Collision effect
    if (hasCollided && time - collisionTime < 0.5) {
        let intensity = 1 - (time - collisionTime) / 0.5;
        drawCollisionEffect((ball1.x + ball2.x) / 2, trackY, intensity);
    }

    // Phase label
    let phase = getPhase();
    let phaseLabels = ['Before Collision', 'During Collision', 'After Collision'];
    fill(60);
    textSize(14);
    textAlign(CENTER, TOP);
    text(phaseLabels[phase], canvasWidth/2, trackY + 70);
}

function drawVelocityArrows(collision) {
    let arrowY = trackY - 60;
    let scale = 12;
    textSize(12);

    // Show current velocities as arrows
    stroke(0, 160, 0);
    strokeWeight(3);
    fill(0, 160, 0);

    // Ball 1 velocity arrow
    if (abs(ball1.v) > 0.1) {
        let len = ball1.v * scale;
        drawArrow(ball1.x, arrowY, ball1.x + len, arrowY);
        noStroke();
        textAlign(CENTER, BOTTOM);
        text('v = ' + ball1.v.toFixed(1) + ' m/s', ball1.x + len/2, arrowY - 8);
    } else if (!animating && time === 0) {
        // Show initial velocity before animation starts
        let len = collision.ball1.v_i * scale;
        drawArrow(ball1.x, arrowY, ball1.x + len, arrowY);
        noStroke();
        textAlign(CENTER, BOTTOM);
        text('v = ' + collision.ball1.v_i + ' m/s', ball1.x + len/2, arrowY - 8);
    }

    // Ball 2 velocity arrow (or stationary indicator)
    if (!ball2.stuck) {
        if (abs(ball2.v) > 0.1) {
            stroke(0, 160, 0);
            strokeWeight(3);
            fill(0, 160, 0);
            let len = ball2.v * scale;
            drawArrow(ball2.x, arrowY, ball2.x + len, arrowY);
            noStroke();
            textAlign(CENTER, BOTTOM);
            text('v = ' + ball2.v.toFixed(1) + ' m/s', ball2.x + len/2, arrowY - 8);
        } else {
            noStroke();
            fill(120);
            textAlign(CENTER, BOTTOM);
            text('v = 0', ball2.x, arrowY - 8);
        }
    }
}

function drawArrow(x1, y1, x2, y2) {
    line(x1, y1, x2, y2);
    let angle = atan2(y2 - y1, x2 - x1);
    let arrowSize = 10;
    triangle(
        x2, y2,
        x2 - arrowSize * cos(angle - PI/6), y2 - arrowSize * sin(angle - PI/6),
        x2 - arrowSize * cos(angle + PI/6), y2 - arrowSize * sin(angle + PI/6)
    );
}

function drawCollisionEffect(cx, cy, intensity) {
    push();
    stroke(255, 180, 0, intensity * 255);
    strokeWeight(3);
    noFill();
    let pulseSize = 1 + 0.3 * sin(frameCount * 0.2);
    for (let i = 0; i < 8; i++) {
        let angle = i * PI / 4 + frameCount * 0.1;
        let len = 30 * pulseSize * intensity;
        line(cx, cy, cx + cos(angle) * len, cy + sin(angle) * len);
    }
    pop();
}

function drawDataSection(collision) {
    let sectionY = 310;
    let labelWidth = 120;
    let barX = labelWidth + 40;
    let barWidth = min(300, canvasWidth * 0.35); // Fixed max width for bars
    let barHeight = 24;
    let maxKE = 30;
    let valueX = barX + barWidth + 15; // Position for value labels

    // Section background
    fill(248, 250, 252);
    noStroke();
    rect(20, sectionY - 10, canvasWidth - 40, 130, 8);

    // Calculate current kinetic energy
    let currentKE;
    if (!hasCollided) {
        currentKE = collision.ke_before;
    } else {
        // Smoothly interpolate KE loss over collision duration
        let t = min((time - collisionTime) / 0.3, 1);
        currentKE = lerp(collision.ke_before, collision.ke_after, t);
    }

    // Kinetic Energy section
    fill(60);
    textSize(14);
    textAlign(LEFT, CENTER);
    noStroke();
    text('Kinetic Energy', 40, sectionY + 15);

    // KE bar background
    fill(220);
    rect(barX, sectionY + 5, barWidth, barHeight, 4);

    // KE bar fill
    let fillWidth = map(currentKE, 0, maxKE, 0, barWidth);
    fill(collision.ke_conserved ? [80, 180, 80] : [220, 150, 50]);
    rect(barX, sectionY + 5, fillWidth, barHeight, 4);

    // KE value
    fill(40);
    textSize(13);
    textAlign(LEFT, CENTER);
    text(currentKE.toFixed(1) + ' J', valueX, sectionY + 17);

    // KE conservation status (show after collision)
    if (hasCollided && time - collisionTime > 0.3) {
        textAlign(RIGHT, CENTER);
        if (collision.ke_conserved) {
            fill(0, 150, 0);
            text('✓ KE Conserved (24 J → 24 J)', canvasWidth - 40, sectionY + 17);
        } else {
            fill(200, 80, 80);
            let lost = collision.ke_before - collision.ke_after;
            text('✗ KE Lost: ' + lost.toFixed(1) + ' J (heat/sound)', canvasWidth - 40, sectionY + 17);
        }
    }

    // Momentum section
    let momY = sectionY + 60;
    fill(60);
    textSize(14);
    textAlign(LEFT, CENTER);
    text('Momentum', 40, momY + 15);

    // Calculate momentum (always conserved)
    let p_total = collision.ball1.m * collision.ball1.v_i; // = 12 kg·m/s

    // Momentum bar background
    fill(220);
    rect(barX, momY + 5, barWidth, barHeight, 4);

    // Momentum bar fill (always full - momentum conserved)
    let momFillWidth = map(p_total, 0, 15, 0, barWidth);
    fill(100, 140, 200);
    rect(barX, momY + 5, momFillWidth, barHeight, 4);

    // Momentum value
    fill(40);
    textSize(13);
    textAlign(LEFT, CENTER);
    text(p_total + ' kg·m/s', valueX, momY + 17);

    // Momentum conservation status
    textAlign(RIGHT, CENTER);
    fill(0, 150, 0);
    text('✓ Momentum Always Conserved', canvasWidth - 40, momY + 17);
}

function drawControlBar() {
    // Control bar background
    fill(245);
    stroke(220);
    strokeWeight(1);
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Calculate button positions
    let buttonY = drawHeight + (controlHeight - 36) / 2;
    let centerX = canvasWidth / 2;

    buttons.reset.x = centerX - 150;
    buttons.reset.y = buttonY;

    buttons.play.x = centerX - 50;
    buttons.play.y = buttonY;

    buttons.step.x = centerX + 60;
    buttons.step.y = buttonY;

    // Update play button label
    buttons.play.label = animating ? '❚❚ Pause' : '▶ Play';

    // Draw buttons
    drawButton(buttons.reset, false);
    drawButton(buttons.play, animating);
    drawButton(buttons.step, !animating && getPhase() < 2);
}

function drawButton(btn, active) {
    let enabled = true;
    if (btn === buttons.step && (animating || getPhase() >= 2)) {
        enabled = false;
    }

    // Button shadow
    noStroke();
    fill(200);
    rect(btn.x + 2, btn.y + 2, btn.w, btn.h, 6);

    // Button background
    if (!enabled) {
        fill(180);
        stroke(160);
    } else if (active) {
        fill(70, 130, 200);
        stroke(60, 110, 180);
    } else if (isMouseOverButton(btn)) {
        fill(100, 160, 230);
        stroke(60, 110, 180);
    } else {
        fill(80, 140, 210);
        stroke(60, 110, 180);
    }
    strokeWeight(2);
    rect(btn.x, btn.y, btn.w, btn.h, 6);

    // Button label
    fill(enabled ? 255 : 220);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text(btn.label, btn.x + btn.w/2, btn.y + btn.h/2);
}

function drawPhaseIndicator() {
    let indicatorY = drawHeight + controlHeight - 15;
    let dotSpacing = 20;
    let startX = canvasWidth - 80;

    let phase = getPhase();

    // Phase dots
    for (let i = 0; i < 3; i++) {
        let x = startX + i * dotSpacing;
        if (i === phase) {
            fill(70, 130, 200);
        } else if (i < phase) {
            fill(150, 180, 220);
        } else {
            fill(200);
        }
        noStroke();
        ellipse(x, indicatorY, 10, 10);
    }

    // Phase label
    fill(100);
    textSize(11);
    textAlign(RIGHT, CENTER);
    text('Phase:', startX - 15, indicatorY);
}

function isMouseOverButton(btn) {
    return mouseX >= btn.x && mouseX <= btn.x + btn.w &&
           mouseY >= btn.y && mouseY <= btn.y + btn.h;
}

function mousePressed() {
    // Check tab clicks
    for (let i = 0; i < tabs.length; i++) {
        let t = tabs[i];
        if (t.bounds && mouseX >= t.bounds.x && mouseX <= t.bounds.x + t.bounds.w &&
            mouseY >= t.bounds.y && mouseY <= t.bounds.y + t.bounds.h) {
            selectedType = i;
            resetSimulation();
            return;
        }
    }

    // Check button clicks
    if (isMouseOverButton(buttons.reset)) {
        resetSimulation();
    } else if (isMouseOverButton(buttons.play)) {
        if (animating) {
            animating = false;
        } else {
            if (getPhase() === 2) {
                resetSimulation();
            }
            animating = true;
        }
    } else if (isMouseOverButton(buttons.step)) {
        if (!animating && getPhase() < 2) {
            // Step through simulation in increments
            stepSimulation();
        }
    }
}

function stepSimulation() {
    let collision = collisions[selectedType];
    let pixelsPerMeter = 40;

    if (!hasCollided) {
        // Move to collision point
        let collisionX = (trackLeft + trackRight) / 2;
        ball1.x = collisionX - ballR1;
        ball2.x = collisionX + ballR2;

        // Trigger collision
        hasCollided = true;
        collisionTime = time;
        ball1.v = collision.ball1.v_f;
        if (collision.stickTogether) {
            ball2.v = collision.ball1.v_f;
            ball2.stuck = true;
            ball2.x = ball1.x;
        } else {
            ball2.v = collision.ball2.v_f;
        }
        time = collisionTime + 0.4; // Skip past collision animation
    } else {
        // Move to final positions
        if (ball1.v > 0) {
            ball1.x = trackRight - ballR1;
        } else if (ball1.v < 0) {
            ball1.x = trackLeft + ballR1;
        }

        if (ball2.stuck) {
            ball2.x = ball1.x;
        } else if (ball2.v > 0) {
            ball2.x = trackRight - ballR2;
        }

        time = collisionTime + 2; // Ensure we're in "after" phase
    }
}

function resetSimulation() {
    let collision = collisions[selectedType];

    // Initialize ball positions
    // Blue ball starts on the left, red ball starts at center
    let startX1 = trackLeft + 100;
    let startX2 = canvasWidth / 2;

    ball1 = {
        x: startX1,
        v: collision.ball1.v_i,
        m: collision.ball1.m
    };

    ball2 = {
        x: startX2,
        v: collision.ball2.v_i,
        m: collision.ball2.m,
        stuck: false
    };

    hasCollided = false;
    collisionTime = 0;
    time = 0;
    animating = false;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    resetSimulation();
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 900);
    }
    trackRight = canvasWidth - 80;
}
