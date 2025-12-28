// Simple vs. Physical Pendulum Comparison Diagram
// Side-by-side comparison showing the differences

let canvasWidth = 750;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Animation
let angle = 0.3; // radians
let angleVelocity = 0;
let isAnimating = true;

// Pendulum parameters
let simplePendulumLength = 200;
let physicalPendulumLength = 180;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    describe('Side-by-side comparison of simple and physical pendulums showing their key differences', LABEL);
}

function draw() {
    updateCanvasSize();

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
    textSize(20);
    textAlign(CENTER, TOP);
    noStroke();
    text('Simple vs. Physical Pendulum Comparison', canvasWidth / 2, 12);

    // Dividing line
    stroke(180);
    strokeWeight(1);
    line(canvasWidth/2, 45, canvasWidth/2, drawHeight - 10);

    // Draw both pendulums
    drawSimplePendulum(canvasWidth/4, 100);
    drawPhysicalPendulum(3*canvasWidth/4, 100);

    // Labels
    drawLabels();

    // Note box at bottom
    drawNoteBox();

    // Instructions
    fill(80);
    textSize(13);
    textAlign(CENTER, CENTER);
    text('Click to pause/resume animation. Both pendulums oscillate with same small-angle period formula structure.', canvasWidth / 2, drawHeight + 25);

    // Animate
    if (isAnimating) {
        let g = 9.8;
        let L = simplePendulumLength / 100; // Convert to meters
        let omega0 = sqrt(g / L);
        let angularAccel = -omega0 * omega0 * sin(angle);
        angleVelocity += angularAccel * 0.016;
        angleVelocity *= 0.9995; // Light damping
        angle += angleVelocity * 0.016;
    }
}

function drawSimplePendulum(cx, pivotY) {
    let L = simplePendulumLength;

    // Section title
    fill(70, 130, 220);
    textSize(16);
    textAlign(CENTER, TOP);
    noStroke();
    text('Simple Pendulum', cx, pivotY - 50);

    // Subtitle
    fill(80);
    textSize(11);
    text('Point mass on massless string', cx, pivotY - 32);

    // Pivot point
    fill(200, 50, 50);
    noStroke();
    circle(cx, pivotY, 12);

    // Vertical reference (dashed)
    stroke(150);
    strokeWeight(1);
    setLineDash([5, 5]);
    line(cx, pivotY, cx, pivotY + L + 20);
    setLineDash([]);

    // String
    let bobX = cx + L * sin(angle);
    let bobY = pivotY + L * cos(angle);

    stroke(50);
    strokeWeight(2);
    line(cx, pivotY, bobX, bobY);

    // String label
    fill(100);
    textSize(10);
    textAlign(LEFT, CENTER);
    noStroke();
    push();
    translate(cx + 15, pivotY + L/3);
    rotate(angle);
    text('"massless string"', 0, 0);
    pop();

    // Bob (point mass)
    fill(70, 130, 220);
    noStroke();
    circle(bobX, bobY, 30);

    // Bob label
    fill(40);
    textSize(11);
    textAlign(CENTER, TOP);
    text('point mass m', bobX, bobY + 20);

    // Length indicator
    stroke(50, 180, 50);
    strokeWeight(2);
    let labelX = cx - 40;
    line(labelX, pivotY, labelX, pivotY + L);
    line(labelX - 5, pivotY, labelX + 5, pivotY);
    line(labelX - 5, pivotY + L, labelX + 5, pivotY + L);

    fill(50, 180, 50);
    textSize(14);
    textAlign(CENTER, CENTER);
    noStroke();
    text('L', labelX - 15, pivotY + L/2);

    // Center of mass at bob
    fill(50, 180, 50);
    noStroke();
    textSize(16);
    text('×', bobX, bobY);

    // Gravity vector
    stroke(150);
    strokeWeight(2);
    drawArrow(cx + 60, pivotY + 50, cx + 60, pivotY + 90, color(150));

    fill(100);
    textSize(11);
    textAlign(LEFT, CENTER);
    noStroke();
    text('g', cx + 65, pivotY + 70);

    // Formula box
    fill(255, 255, 200);
    stroke(200);
    strokeWeight(1);
    rect(cx - 70, pivotY + L + 50, 140, 40, 5);

    fill(40);
    textSize(14);
    textAlign(CENTER, CENTER);
    noStroke();
    text('T = 2π√(L/g)', cx, pivotY + L + 70);

    // Angle indicator
    noFill();
    stroke(230, 150, 50);
    strokeWeight(2);
    arc(cx, pivotY, 50, 50, PI/2 - abs(angle), PI/2);

    fill(230, 150, 50);
    textSize(11);
    noStroke();
    text('θ', cx + 30, pivotY + 30);
}

function drawPhysicalPendulum(cx, pivotY) {
    let L = physicalPendulumLength;
    let rodWidth = 25;

    // Section title
    fill(230, 150, 50);
    textSize(16);
    textAlign(CENTER, TOP);
    noStroke();
    text('Physical Pendulum', cx, pivotY - 50);

    // Subtitle
    fill(80);
    textSize(11);
    text('Rigid body with distributed mass', cx, pivotY - 32);

    // Pivot point
    fill(200, 50, 50);
    noStroke();
    circle(cx, pivotY, 12);

    // Pivot label
    fill(100);
    textSize(10);
    textAlign(LEFT, CENTER);
    text('pivot axis', cx + 10, pivotY);

    // Vertical reference (dashed)
    stroke(150);
    strokeWeight(1);
    setLineDash([5, 5]);
    line(cx, pivotY, cx, pivotY + L + 20);
    setLineDash([]);

    // Rigid rod (rectangle)
    push();
    translate(cx, pivotY);
    rotate(angle);

    fill(230, 150, 50);
    stroke(180, 100, 30);
    strokeWeight(2);
    rectMode(CENTER);
    rect(0, L/2, rodWidth, L, 3);

    // "Distributed mass" label
    fill(60);
    textSize(9);
    textAlign(CENTER, CENTER);
    noStroke();
    text('distributed', 0, L/2 - 20);
    text('mass', 0, L/2 - 8);

    // Center of mass marker (at center of rod)
    fill(50, 180, 50);
    textSize(20);
    text('×', 0, L/2);

    pop();

    // Center of mass label
    let comX = cx + (L/2) * sin(angle);
    let comY = pivotY + (L/2) * cos(angle);

    fill(50, 180, 50);
    textSize(10);
    textAlign(LEFT, CENTER);
    noStroke();
    text('center of mass', comX + 20, comY);

    // Distance d indicator
    stroke(50, 180, 50);
    strokeWeight(2);
    let d = L/2;
    let endX = cx + d * sin(angle);
    let endY = pivotY + d * cos(angle);

    // Line from pivot to COM
    setLineDash([3, 3]);
    line(cx, pivotY, endX, endY);
    setLineDash([]);

    // d label
    fill(50, 180, 50);
    textSize(14);
    textAlign(CENTER, CENTER);
    noStroke();
    text('d', cx + d/2 * sin(angle) - 20, pivotY + d/2 * cos(angle));

    // Gravity vector
    stroke(150);
    strokeWeight(2);
    drawArrow(cx + 70, pivotY + 50, cx + 70, pivotY + 90, color(150));

    fill(100);
    textSize(11);
    textAlign(LEFT, CENTER);
    noStroke();
    text('g', cx + 75, pivotY + 70);

    // Formula box
    fill(255, 255, 200);
    stroke(200);
    strokeWeight(1);
    rect(cx - 75, pivotY + L + 50, 150, 40, 5);

    fill(40);
    textSize(14);
    textAlign(CENTER, CENTER);
    noStroke();
    text('T = 2π√(I/mgd)', cx, pivotY + L + 70);

    // Restoring torque indicator
    noFill();
    stroke(200, 80, 80);
    strokeWeight(2);
    arc(cx, pivotY, 80, 80, PI/2, PI/2 + 0.4);

    // Arrowhead on arc
    push();
    translate(cx + 40 * cos(PI/2 + 0.4), pivotY + 40 * sin(PI/2 + 0.4));
    rotate(PI/2 + 0.4 + PI/2);
    fill(200, 80, 80);
    noStroke();
    triangle(0, 0, -8, -4, -8, 4);
    pop();

    fill(200, 80, 80);
    textSize(10);
    noStroke();
    text('torque', cx - 55, pivotY + 55);

    // Angle indicator
    noFill();
    stroke(230, 150, 50);
    strokeWeight(2);
    arc(cx, pivotY, 50, 50, PI/2 - abs(angle), PI/2);

    fill(230, 150, 50);
    textSize(11);
    noStroke();
    text('θ', cx + 30, pivotY + 30);
}

function drawLabels() {
    // Common properties box
    fill(240, 240, 255);
    stroke(150);
    strokeWeight(1);
    rect(canvasWidth/2 - 170, drawHeight - 75, 340, 55, 8);

    fill(60);
    textSize(12);
    textAlign(CENTER, CENTER);
    noStroke();
    text('Both oscillate with period independent of amplitude (for small angles)', canvasWidth/2, drawHeight - 55);

    textSize(11);
    fill(100);
    text('Physical pendulum reduces to simple when: I = mL² and d = L', canvasWidth/2, drawHeight - 35);
}

function drawNoteBox() {
    // Legend for symbols
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(15, drawHeight - 140, 130, 85, 5);

    fill(60);
    textSize(11);
    textAlign(LEFT, CENTER);
    noStroke();

    // Legend items
    fill(200, 50, 50);
    circle(30, drawHeight - 125, 10);
    fill(60);
    text('Pivot point', 42, drawHeight - 125);

    fill(50, 180, 50);
    textSize(14);
    text('×', 30, drawHeight - 105);
    textSize(11);
    fill(60);
    text('Center of mass', 42, drawHeight - 105);

    fill(230, 150, 50);
    textSize(11);
    text('θ = angle', 25, drawHeight - 85);

    fill(50, 180, 50);
    text('L, d = lengths', 25, drawHeight - 68);
}

function drawArrow(x1, y1, x2, y2, col) {
    stroke(col);
    strokeWeight(2);
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

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function mousePressed() {
    if (mouseY < drawHeight) {
        isAnimating = !isAnimating;
    }
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
