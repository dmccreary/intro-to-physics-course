// Momentum Comparison Interactive Simulator
// Visualizes how mass and velocity combine to determine momentum

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 100;

// Controls
let massASlider, velASlider, massBSlider, velBSlider;
let resetBtn;

// Object properties
let objectA = { mass: 1, velocity: 5 };
let objectB = { mass: 2, velocity: -3 };

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    let ctrlY = drawHeight + 20;

    // Object A sliders
    massASlider = createSlider(0.1, 10, 1, 0.1);
    massASlider.position(sliderLeftMargin, ctrlY);
    massASlider.size(120);

    velASlider = createSlider(-10, 10, 5, 0.5);
    velASlider.position(sliderLeftMargin + 170, ctrlY);
    velASlider.size(120);

    // Object B sliders
    massBSlider = createSlider(0.1, 10, 2, 0.1);
    massBSlider.position(sliderLeftMargin, ctrlY + 40);
    massBSlider.size(120);

    velBSlider = createSlider(-10, 10, -3, 0.5);
    velBSlider.position(sliderLeftMargin + 170, ctrlY + 40);
    velBSlider.size(120);

    // Reset button
    resetBtn = createButton('Reset Defaults');
    resetBtn.position(sliderLeftMargin + 320, ctrlY + 20);
    resetBtn.mousePressed(() => {
        massASlider.value(1);
        velASlider.value(5);
        massBSlider.value(2);
        velBSlider.value(-3);
    });

    describe('Momentum comparison showing two objects with different mass and velocity', LABEL);
}

function draw() {
    updateCanvasSize();

    // Get slider values
    objectA.mass = massASlider.value();
    objectA.velocity = velASlider.value();
    objectB.mass = massBSlider.value();
    objectB.velocity = velBSlider.value();

    // Calculate momentum
    let pA = objectA.mass * objectA.velocity;
    let pB = objectB.mass * objectB.velocity;
    let pTotal = pA + pB;

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
    textSize(18);
    textAlign(CENTER, TOP);
    noStroke();
    text('Momentum Comparison: p = mv', canvasWidth/2, 10);

    // Draw track
    drawTrack();

    // Draw objects
    drawObject(canvasWidth * 0.3, 200, objectA, 'A', color(70, 130, 200), pA);
    drawObject(canvasWidth * 0.7, 200, objectB, 'B', color(220, 120, 70), pB);

    // Draw momentum vectors
    drawMomentumSection(pA, pB, pTotal);

    // Draw control labels
    drawControlLabels(pA, pB, pTotal);
}

function drawTrack() {
    // Horizontal track
    fill(200, 180, 160);
    noStroke();
    rect(50, 280, canvasWidth - 100, 8);

    // Scale marks
    stroke(150);
    strokeWeight(1);
    fill('black');
    textSize(10);
    textAlign(CENTER, TOP);
    for (let i = 0; i <= 10; i++) {
        let x = 50 + (i / 10) * (canvasWidth - 100);
        line(x, 280, x, 290);
    }
}

function drawObject(x, y, obj, label, col, momentum) {
    // Size based on mass
    let size = map(obj.mass, 0.1, 10, 30, 80);

    // Object body
    fill(col);
    stroke(red(col) * 0.7, green(col) * 0.7, blue(col) * 0.7);
    strokeWeight(2);
    rectMode(CENTER);
    rect(x, y, size, size * 0.8, 8);
    rectMode(CORNER);

    // Wheels
    fill(50);
    noStroke();
    ellipse(x - size * 0.3, y + size * 0.4, 15, 15);
    ellipse(x + size * 0.3, y + size * 0.4, 15, 15);

    // Object label
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    noStroke();
    text(label, x, y);

    // Mass label
    fill('black');
    textSize(12);
    text(obj.mass.toFixed(1) + ' kg', x, y - size * 0.6);

    // Velocity vector (green arrow)
    if (abs(obj.velocity) > 0.3) {
        let arrowLen = obj.velocity * 8;
        let arrowY = y - size * 0.5 - 25;

        stroke(0, 180, 0);
        strokeWeight(3);
        fill(0, 180, 0);
        line(x, arrowY, x + arrowLen, arrowY);

        // Arrowhead
        let dir = obj.velocity > 0 ? 1 : -1;
        triangle(x + arrowLen, arrowY,
                 x + arrowLen - 8 * dir, arrowY - 5,
                 x + arrowLen - 8 * dir, arrowY + 5);

        // Velocity label
        noStroke();
        textSize(10);
        textAlign(CENTER, BOTTOM);
        fill(0, 150, 0);
        text('v = ' + obj.velocity.toFixed(1) + ' m/s', x, arrowY - 8);
    }

    // Momentum arrow (below)
    if (abs(momentum) > 0.3) {
        let arrowLen = momentum * 3;
        let maxArrow = 120;
        arrowLen = constrain(arrowLen, -maxArrow, maxArrow);
        let arrowY = y + size * 0.5 + 35;

        stroke(red(col), green(col), blue(col));
        strokeWeight(4);
        fill(col);
        line(x, arrowY, x + arrowLen, arrowY);

        // Arrowhead
        if (abs(arrowLen) > 10) {
            let dir = arrowLen > 0 ? 1 : -1;
            triangle(x + arrowLen, arrowY,
                     x + arrowLen - 10 * dir, arrowY - 6,
                     x + arrowLen - 10 * dir, arrowY + 6);
        }

        // Momentum label
        noStroke();
        textSize(11);
        textAlign(CENTER, TOP);
        text('p = ' + momentum.toFixed(1) + ' kg·m/s', x, arrowY + 10);
    }
}

function drawMomentumSection(pA, pB, pTotal) {
    let sectionX = 50;
    let sectionY = 320;
    let sectionWidth = canvasWidth - 100;

    // Background
    fill(255, 255, 255, 200);
    stroke(200);
    strokeWeight(1);
    rect(sectionX, sectionY, sectionWidth, 110, 10);

    // Title
    fill('black');
    textSize(14);
    textAlign(LEFT, TOP);
    noStroke();
    text('Momentum Vector Addition:', sectionX + 15, sectionY + 10);

    // Vector diagram
    let vecY = sectionY + 55;
    let scale = 2;
    let maxWidth = sectionWidth * 0.4;

    // Draw coordinate axis
    stroke(200);
    strokeWeight(1);
    line(sectionX + 30, vecY, sectionX + sectionWidth - 30, vecY);
    line(sectionX + sectionWidth / 2, vecY - 30, sectionX + sectionWidth / 2, vecY + 30);

    // Zero label
    fill(150);
    textSize(10);
    textAlign(CENTER, TOP);
    text('0', sectionX + sectionWidth / 2, vecY + 5);

    // pA vector
    let startX = sectionX + sectionWidth / 2;
    let pALen = constrain(pA * scale, -maxWidth, maxWidth);
    stroke(70, 130, 200);
    strokeWeight(4);
    fill(70, 130, 200);
    line(startX, vecY - 15, startX + pALen, vecY - 15);
    if (abs(pALen) > 10) {
        let dir = pALen > 0 ? 1 : -1;
        triangle(startX + pALen, vecY - 15,
                 startX + pALen - 8 * dir, vecY - 20,
                 startX + pALen - 8 * dir, vecY - 10);
    }

    // pB vector (from end of pA)
    let pBLen = constrain(pB * scale, -maxWidth + abs(pALen), maxWidth - abs(pALen));
    stroke(220, 120, 70);
    strokeWeight(4);
    fill(220, 120, 70);
    line(startX + pALen, vecY - 15, startX + pALen + pBLen, vecY - 15);
    if (abs(pBLen) > 10) {
        let dir = pBLen > 0 ? 1 : -1;
        triangle(startX + pALen + pBLen, vecY - 15,
                 startX + pALen + pBLen - 8 * dir, vecY - 20,
                 startX + pALen + pBLen - 8 * dir, vecY - 10);
    }

    // Total momentum vector
    let pTotalLen = constrain(pTotal * scale, -maxWidth, maxWidth);
    stroke(150, 50, 150);
    strokeWeight(3);
    fill(150, 50, 150);
    line(startX, vecY + 15, startX + pTotalLen, vecY + 15);
    if (abs(pTotalLen) > 10) {
        let dir = pTotalLen > 0 ? 1 : -1;
        triangle(startX + pTotalLen, vecY + 15,
                 startX + pTotalLen - 8 * dir, vecY + 20,
                 startX + pTotalLen - 8 * dir, vecY + 10);
    }

    // Labels
    noStroke();
    textSize(11);
    textAlign(RIGHT, CENTER);

    fill(70, 130, 200);
    text('pA = ' + pA.toFixed(1), sectionX + 140, vecY - 15);

    fill(220, 120, 70);
    text('pB = ' + pB.toFixed(1), sectionX + 140, vecY);

    fill(150, 50, 150);
    text('pTotal = ' + pTotal.toFixed(1), sectionX + 140, vecY + 15);

    // Calculation
    textAlign(LEFT, CENTER);
    fill('black');
    textSize(12);
    let calcX = sectionX + sectionWidth - 250;
    text('pA + pB = pTotal', calcX, vecY - 10);
    text(pA.toFixed(1) + ' + (' + pB.toFixed(1) + ') = ' + pTotal.toFixed(1) + ' kg·m/s', calcX, vecY + 10);
}

function drawControlLabels(pA, pB, pTotal) {
    textSize(11);
    textAlign(LEFT, CENTER);
    fill('black');
    noStroke();

    let y1 = drawHeight + 30;
    let y2 = drawHeight + 70;

    // Object A
    fill(70, 130, 200);
    text('Object A:', 10, y1);
    fill('black');
    text('Mass: ' + objectA.mass.toFixed(1) + ' kg', sliderLeftMargin - 70, y1);
    text('Velocity: ' + objectA.velocity.toFixed(1) + ' m/s', sliderLeftMargin + 100, y1);

    // Object B
    fill(220, 120, 70);
    text('Object B:', 10, y2);
    fill('black');
    text('Mass: ' + objectB.mass.toFixed(1) + ' kg', sliderLeftMargin - 70, y2);
    text('Velocity: ' + objectB.velocity.toFixed(1) + ' m/s', sliderLeftMargin + 100, y2);

    // Results
    let resX = sliderLeftMargin + 320;
    textSize(12);
    fill(70, 130, 200);
    text('pA = ' + pA.toFixed(1) + ' kg·m/s', resX, y1);
    fill(220, 120, 70);
    text('pB = ' + pB.toFixed(1) + ' kg·m/s', resX, y2);

    textSize(13);
    fill(150, 50, 150);
    text('Total: ' + pTotal.toFixed(1) + ' kg·m/s', resX + 150, (y1 + y2) / 2);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
        if (typeof massASlider !== 'undefined') {
            // Reposition sliders for new width
        }
    }
}
