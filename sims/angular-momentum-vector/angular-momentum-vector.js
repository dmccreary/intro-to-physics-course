// Angular Momentum Vector Visualization
// 3D perspective view showing L and ω vectors with right-hand rule

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Disk parameters
let diskAngle = 0;
let rotationSpeed = 0.02;
let isClockwise = false;
let showRightHand = true;

// 3D view parameters
let viewAngle = PI / 6;  // Tilt of the 3D view

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    describe('Angular momentum vector visualization showing the relationship between rotation direction, angular velocity, and angular momentum vectors using the right-hand rule', LABEL);
}

function draw() {
    updateCanvasSize();

    // Update rotation
    let direction = isClockwise ? -1 : 1;
    diskAngle += direction * rotationSpeed;

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
    textSize(22);
    textAlign(CENTER, TOP);
    noStroke();
    text('Angular Momentum Vector Visualization', canvasWidth / 2, 10);

    // Draw main diagram - counterclockwise
    drawDiskDiagram(canvasWidth / 2 - 150, 250, false, 'Counterclockwise (CCW)');

    // Draw clockwise example
    drawDiskDiagram(canvasWidth / 2 + 180, 250, true, 'Clockwise (CW)');

    // Draw right-hand rule illustration
    drawRightHandRule(100, 350);

    // Draw info text
    drawInfoText();

    // Instructions
    fill(80);
    textSize(14);
    textAlign(CENTER, CENTER);
    text('Rotation direction determines the direction of L and ω (using right-hand rule)', canvasWidth / 2, drawHeight + 25);
}

function drawDiskDiagram(cx, cy, clockwise, label) {
    let direction = clockwise ? -1 : 1;
    let currentAngle = diskAngle * direction;

    push();
    translate(cx, cy);

    // Draw coordinate axes
    stroke(180);
    strokeWeight(1);
    // X-axis
    line(-100, 50, 100, 50);
    // Y-axis (up)
    line(0, 50, 0, -120);

    // Axis labels
    fill(120);
    textSize(12);
    textAlign(CENTER, CENTER);
    noStroke();
    text('x', 110, 50);
    text('z', 0, -130);

    // Draw disk (3D perspective ellipse)
    fill(200, 210, 230, 200);
    stroke(100, 110, 130);
    strokeWeight(2);
    ellipse(0, 30, 160, 50);

    // Disk top surface
    fill(220, 230, 245, 220);
    stroke(100, 110, 130);
    ellipse(0, 20, 160, 50);

    // Draw rotation markers on disk
    stroke(150, 160, 180);
    strokeWeight(1);
    for (let i = 0; i < 8; i++) {
        let angle = currentAngle + i * PI / 4;
        let x = 70 * cos(angle);
        let y = 20 * sin(angle) * 0.3;
        ellipse(x, 20 + y, 8, 4);
    }

    // Draw rotation direction arrow
    noFill();
    stroke(50, 100, 200);
    strokeWeight(3);

    let arrowRadius = 90;
    let startAngle = clockwise ? -PI/4 : -3*PI/4;
    let endAngle = clockwise ? -3*PI/4 : -PI/4;

    // Draw curved arrow on disk plane
    beginShape();
    for (let a = startAngle; a <= endAngle + (clockwise ? -0.1 : 0.1); a += (clockwise ? -0.1 : 0.1)) {
        let x = arrowRadius * cos(a);
        let y = 20 + arrowRadius * sin(a) * 0.3;
        vertex(x, y);
    }
    endShape();

    // Arrowhead on curve
    let tipAngle = clockwise ? startAngle : endAngle;
    let tipX = arrowRadius * cos(tipAngle);
    let tipY = 20 + arrowRadius * sin(tipAngle) * 0.3;

    push();
    translate(tipX, tipY);
    rotate(clockwise ? -PI/2 + tipAngle : PI/2 + tipAngle);
    scale(1, 0.3);
    fill(50, 100, 200);
    noStroke();
    triangle(0, 0, -10, -5, -10, 5);
    pop();

    // Draw omega (ω) vector - along rotation axis
    let omegaLength = 80;
    let omegaDirection = clockwise ? 1 : -1;  // Down for CW, up for CCW

    stroke(150, 50, 150);
    strokeWeight(4);
    line(0, 20, 0, 20 - omegaDirection * omegaLength);

    // Omega arrowhead
    fill(150, 50, 150);
    noStroke();
    push();
    translate(0, 20 - omegaDirection * omegaLength);
    rotate(omegaDirection > 0 ? -PI/2 : PI/2);
    triangle(0, 0, -12, -6, -12, 6);
    pop();

    // Omega label
    fill(150, 50, 150);
    textSize(18);
    textAlign(LEFT, CENTER);
    noStroke();
    text('ω', 10, 20 - omegaDirection * omegaLength / 2);

    // Draw angular momentum (L) vector - parallel to ω
    let LLength = 100;

    stroke(50, 150, 50);
    strokeWeight(5);
    line(0, 20, 0, 20 - omegaDirection * LLength);

    // L arrowhead
    fill(50, 150, 50);
    noStroke();
    push();
    translate(0, 20 - omegaDirection * LLength);
    rotate(omegaDirection > 0 ? -PI/2 : PI/2);
    triangle(0, 0, -14, -7, -14, 7);
    pop();

    // L label
    fill(50, 150, 50);
    textSize(20);
    textStyle(BOLD);
    textAlign(RIGHT, CENTER);
    noStroke();
    text('L', -10, 20 - omegaDirection * LLength / 2);
    textStyle(NORMAL);

    // Label
    fill(40);
    textSize(14);
    textAlign(CENTER, TOP);
    text(label, 0, 80);

    // Direction indicator
    textSize(12);
    fill(80);
    if (clockwise) {
        text('L points DOWN', 0, 100);
    } else {
        text('L points UP', 0, 100);
    }

    pop();
}

function drawRightHandRule(x, y) {
    push();
    translate(x, y);

    // Background
    fill(255, 255, 240, 230);
    stroke(200);
    strokeWeight(1);
    rect(-60, -80, 130, 140, 10);

    // Title
    fill(40);
    textSize(13);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    noStroke();
    text('Right-Hand Rule', 5, -70);
    textStyle(NORMAL);

    // Hand illustration (simplified)
    // Fist
    fill(255, 220, 200);
    stroke(200, 180, 160);
    strokeWeight(2);
    ellipse(0, 0, 50, 60);

    // Thumb pointing up
    fill(255, 220, 200);
    stroke(200, 180, 160);
    beginShape();
    vertex(-15, -25);
    vertex(-20, -60);
    vertex(-10, -65);
    vertex(-5, -30);
    endShape(CLOSE);

    // Curved fingers indicator
    noFill();
    stroke(100, 150, 200);
    strokeWeight(2);
    arc(0, 0, 70, 70, PI/4, 3*PI/4);

    // Arrow on fingers
    push();
    translate(35 * cos(PI/4), -35 * sin(PI/4));
    rotate(-PI/4);
    fill(100, 150, 200);
    noStroke();
    triangle(0, 0, -8, -4, -8, 4);
    pop();

    // Labels
    fill(150, 50, 150);
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Thumb = L, ω', -50, -60);

    fill(100, 150, 200);
    text('Fingers = rotation', -55, 45);

    pop();
}

function drawInfoText() {
    // Info panel
    let panelX = canvasWidth / 2 - 100;
    let panelY = 400;
    let panelW = 200;
    let panelH = 80;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    fill(40);
    textSize(13);
    textAlign(CENTER, TOP);
    noStroke();

    text('L = Iω', panelX + panelW/2, panelY + 10);
    text('L and ω are parallel', panelX + panelW/2, panelY + 30);

    textSize(11);
    fill(80);
    text('Direction follows right-hand rule', panelX + panelW/2, panelY + 55);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(600, container.offsetWidth);
    }
}
