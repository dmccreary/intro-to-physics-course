// Figure Skater Angular Momentum Conservation MicroSim
// Demonstrates L = Iω conservation by controlling arm position

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Skater parameters
let armExtension = 1.0;  // 0 = arms in, 1 = arms out
let skaterAngle = 0;
let angularMomentum = 47.1;  // L = constant (kg·m²/s)

// Inertia range
let I_max = 5.0;  // Arms out (kg·m²)
let I_min = 2.0;  // Arms in (kg·m²)

// Initial conditions
let initialOmega = 9.42;  // rad/s (1.5 rev/s)

// Animation
let lastTime = 0;
let showEnergy = false;
let trailPoints = [];
let maxTrailPoints = 30;

// UI elements
let armSlider;
let resetButton;
let energyCheckbox;
let initialOmegaSlider;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Calculate initial angular momentum
    angularMomentum = I_max * initialOmega;

    // Create controls
    armSlider = createSlider(0, 100, 100, 1);
    armSlider.position(150, drawHeight + 20);
    armSlider.size(200);
    armSlider.input(() => {
        armExtension = armSlider.value() / 100;
    });

    initialOmegaSlider = createSlider(3, 20, 9.42, 0.1);
    initialOmegaSlider.position(150, drawHeight + 55);
    initialOmegaSlider.size(200);
    initialOmegaSlider.input(() => {
        initialOmega = initialOmegaSlider.value();
        angularMomentum = I_max * initialOmega;
        trailPoints = [];
    });

    energyCheckbox = createCheckbox(' Show kinetic energy', false);
    energyCheckbox.position(420, drawHeight + 20);
    energyCheckbox.changed(() => showEnergy = energyCheckbox.checked());

    resetButton = createButton('Reset');
    resetButton.position(420, drawHeight + 55);
    resetButton.size(80, 25);
    resetButton.mousePressed(resetSim);

    lastTime = millis();

    describe('Figure skater spin simulation demonstrating conservation of angular momentum as arm position changes', LABEL);
}

function draw() {
    updateCanvasSize();

    // Calculate current values
    let I = I_min + armExtension * (I_max - I_min);
    let omega = angularMomentum / I;

    // Update angle
    let currentTime = millis();
    let dt = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    skaterAngle += omega * dt;
    if (skaterAngle > TWO_PI) skaterAngle -= TWO_PI;

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
    text('Figure Skater Angular Momentum Conservation', canvasWidth / 2, 10);

    // Draw skater (top view)
    let centerX = 280;
    let centerY = 270;

    drawIceRink(centerX, centerY);
    drawTrails(centerX, centerY, I);
    drawSkater(centerX, centerY, I, omega);
    drawInfoPanel(I, omega);
    drawControlLabels(I, omega);

    // Store trail points
    if (frameCount % 3 === 0) {
        let armLength = 30 + armExtension * 70;
        trailPoints.push({
            x1: centerX + armLength * cos(skaterAngle),
            y1: centerY + armLength * sin(skaterAngle),
            x2: centerX + armLength * cos(skaterAngle + PI),
            y2: centerY + armLength * sin(skaterAngle + PI),
            alpha: 255
        });
        if (trailPoints.length > maxTrailPoints) {
            trailPoints.shift();
        }
    }

    // Fade trails
    for (let pt of trailPoints) {
        pt.alpha -= 5;
    }
}

function drawIceRink(cx, cy) {
    // Ice surface
    fill(230, 245, 255);
    stroke(180, 200, 220);
    strokeWeight(2);
    ellipse(cx, cy, 400, 400);

    // Reference circles
    noFill();
    stroke(200, 220, 240);
    strokeWeight(1);
    ellipse(cx, cy, 200, 200);
    ellipse(cx, cy, 300, 300);

    // Reference marks
    for (let i = 0; i < 8; i++) {
        let angle = i * PI / 4;
        let x1 = cx + 190 * cos(angle);
        let y1 = cy + 190 * sin(angle);
        let x2 = cx + 200 * cos(angle);
        let y2 = cy + 200 * sin(angle);
        stroke(180, 200, 220);
        line(x1, y1, x2, y2);
    }
}

function drawTrails(cx, cy, I) {
    for (let pt of trailPoints) {
        if (pt.alpha > 0) {
            stroke(100, 150, 200, pt.alpha);
            strokeWeight(3);
            point(pt.x1, pt.y1);
            point(pt.x2, pt.y2);
        }
    }
}

function drawSkater(cx, cy, I, omega) {
    push();
    translate(cx, cy);
    rotate(skaterAngle);

    // Body
    fill(70, 100, 150);
    noStroke();
    ellipse(0, 0, 50, 50);

    // Head
    fill(255, 220, 200);
    ellipse(0, -15, 25, 25);

    // Arms
    let armLength = 30 + armExtension * 70;
    stroke(255, 220, 200);
    strokeWeight(8);
    line(-armLength, 0, armLength, 0);

    // Hands
    fill(255, 220, 200);
    noStroke();
    ellipse(-armLength, 0, 15, 15);
    ellipse(armLength, 0, 15, 15);

    // Dress/costume
    fill(150, 70, 120);
    noStroke();
    arc(0, 15, 60, 50, 0, PI);

    pop();

    // Angular velocity indicator
    let arrowRadius = 120;
    noFill();
    stroke(50, 100, 200, 150);
    strokeWeight(3);

    // Arc showing rotation direction
    let arcLength = min(omega * 0.15, PI);
    arc(cx, cy, arrowRadius * 2, arrowRadius * 2,
        skaterAngle - arcLength/2, skaterAngle + arcLength/2);

    // Speed indicator (thicker arc for faster)
    strokeWeight(map(omega, 5, 25, 2, 8));
    arc(cx, cy, arrowRadius * 2 + 10, arrowRadius * 2 + 10,
        skaterAngle - 0.3, skaterAngle);

    // Arrowhead
    push();
    translate(cx + (arrowRadius + 5) * cos(skaterAngle),
              cy + (arrowRadius + 5) * sin(skaterAngle));
    rotate(skaterAngle + PI/2);
    fill(50, 100, 200);
    noStroke();
    triangle(0, 0, -8, -5, -8, 5);
    pop();
}

function drawInfoPanel(I, omega) {
    let panelX = canvasWidth - 250;
    let panelY = 50;
    let panelW = 230;
    let panelH = showEnergy ? 250 : 200;

    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    fill(0);
    textSize(14);
    textAlign(LEFT, TOP);
    noStroke();

    let y = panelY + 15;
    let lineHeight = 26;

    // Rotational Inertia
    fill(40);
    text('Rotational Inertia (I):', panelX + 15, y);
    fill(70, 70, 200);
    textStyle(BOLD);
    text(I.toFixed(2) + ' kg·m²', panelX + 150, y);
    textStyle(NORMAL);
    y += lineHeight;

    // Angular Velocity
    fill(40);
    text('Angular Velocity (ω):', panelX + 15, y);
    fill(200, 70, 70);
    textStyle(BOLD);
    text(omega.toFixed(2) + ' rad/s', panelX + 150, y);
    textStyle(NORMAL);
    y += lineHeight - 5;

    fill(100);
    textSize(11);
    text('(' + (omega / (2 * PI)).toFixed(2) + ' rev/s)', panelX + 150, y);
    textSize(14);
    y += lineHeight;

    // Angular Momentum (constant!)
    fill(40);
    text('Angular Momentum (L):', panelX + 15, y);
    y += lineHeight - 8;

    fill(50, 150, 50);
    textStyle(BOLD);
    textSize(16);
    text(angularMomentum.toFixed(1) + ' kg·m²/s', panelX + 15, y);
    textStyle(NORMAL);
    textSize(11);
    fill(50, 150, 50);
    text('← CONSERVED!', panelX + 130, y + 3);
    textSize(14);
    y += lineHeight + 5;

    // Formula
    fill(80);
    textSize(12);
    text('L = Iω = constant', panelX + 15, y);
    y += 20;
    text('When I ↓, ω ↑ (and vice versa)', panelX + 15, y);

    // Kinetic energy (if shown)
    if (showEnergy) {
        y += lineHeight;
        let KE = 0.5 * I * omega * omega;

        fill(40);
        textSize(14);
        text('Kinetic Energy:', panelX + 15, y);
        y += lineHeight - 5;

        fill(180, 100, 50);
        textStyle(BOLD);
        text(KE.toFixed(1) + ' J', panelX + 15, y);
        textStyle(NORMAL);

        fill(100);
        textSize(10);
        text('(Energy increases when', panelX + 80, y);
        text('arms pulled in - skater', panelX + 80, y + 12);
        text('does work!)', panelX + 80, y + 24);
    }
}

function drawControlLabels(I, omega) {
    fill('black');
    textSize(13);
    textAlign(LEFT, CENTER);
    noStroke();

    text('Arm Extension:', 10, drawHeight + 33);
    text((armExtension * 100).toFixed(0) + '%', 360, drawHeight + 33);

    text('Initial ω:', 10, drawHeight + 68);
    text(initialOmega.toFixed(1) + ' rad/s', 360, drawHeight + 68);

    // Visual indicator of I and ω relationship
    fill(70, 70, 200);
    text('I: ' + I.toFixed(2), 550, drawHeight + 33);
    fill(200, 70, 70);
    text('ω: ' + omega.toFixed(1), 550, drawHeight + 68);
}

function resetSim() {
    armExtension = 1.0;
    armSlider.value(100);
    skaterAngle = 0;
    trailPoints = [];
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    armSlider.position(150, drawHeight + 20);
    initialOmegaSlider.position(150, drawHeight + 55);
    energyCheckbox.position(420, drawHeight + 20);
    resetButton.position(420, drawHeight + 55);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(650, container.offsetWidth);
    }
}
