// Simple Pendulum Period vs. Length Investigation
// Investigate T = 2π√(L/g) relationship

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Pendulum parameters
let pendulumLength = 1.0;  // meters
let bobMass = 0.5;         // kg
let g = 9.8;               // m/s²
let initialAngle = 10;     // degrees

// State
let currentAngle;
let angularVelocity = 0;
let isSwinging = false;
let swingCount = 0;
let swingStartTime = 0;
let measuredPeriod = 0;
let lastCrossing = 0;

// Graph data
let dataPoints = [];

// UI elements
let lengthSlider, massSlider, angleSlider;
let releaseButton, measureButton, addPointButton, clearButton;
let showTheoryCheckbox;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    currentAngle = radians(initialAngle);

    lengthSlider = createSlider(0.2, 2.0, 1.0, 0.1);
    lengthSlider.position(100, drawHeight + 15);
    lengthSlider.size(120);
    lengthSlider.input(() => {
        pendulumLength = lengthSlider.value();
        resetPendulum();
    });

    massSlider = createSlider(0.1, 2.0, 0.5, 0.1);
    massSlider.position(100, drawHeight + 50);
    massSlider.size(120);
    massSlider.input(() => {
        bobMass = massSlider.value();
    });

    angleSlider = createSlider(5, 30, 10, 1);
    angleSlider.position(340, drawHeight + 15);
    angleSlider.size(100);
    angleSlider.input(() => {
        initialAngle = angleSlider.value();
        resetPendulum();
    });

    releaseButton = createButton('Release');
    releaseButton.position(280, drawHeight + 50);
    releaseButton.size(70, 25);
    releaseButton.mousePressed(releasePendulum);

    measureButton = createButton('Measure Period');
    measureButton.position(360, drawHeight + 50);
    measureButton.size(100, 25);
    measureButton.mousePressed(startMeasurement);

    addPointButton = createButton('Add to Graph');
    addPointButton.position(470, drawHeight + 50);
    addPointButton.size(90, 25);
    addPointButton.mousePressed(addDataPoint);

    clearButton = createButton('Clear');
    clearButton.position(570, drawHeight + 50);
    clearButton.size(60, 25);
    clearButton.mousePressed(() => dataPoints = []);

    showTheoryCheckbox = createCheckbox(' Show theoretical curve', true);
    showTheoryCheckbox.position(470, drawHeight + 15);

    describe('Simple pendulum simulation to investigate the relationship between length and period', LABEL);
}

function draw() {
    updateCanvasSize();

    // Physics update
    if (isSwinging) {
        let angularAcceleration = -(g / (pendulumLength * 100)) * sin(currentAngle);
        angularVelocity += angularAcceleration;
        angularVelocity *= 0.9995;  // Slight damping
        currentAngle += angularVelocity;

        // Count swings
        if (swingCount > 0 && currentAngle * (currentAngle - angularVelocity) < 0 && angularVelocity > 0) {
            let currentTime = millis();
            if (swingCount === 1) {
                lastCrossing = currentTime;
            } else if (swingCount === 11) {
                measuredPeriod = (currentTime - swingStartTime) / 10000;
                isSwinging = false;
            }
            swingCount++;
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
    textSize(20);
    textAlign(CENTER, TOP);
    noStroke();
    text('Simple Pendulum Period vs. Length Investigation', canvasWidth / 2, 10);

    // Draw pendulum
    drawPendulum(200, 80);

    // Draw graph
    drawPeriodGraph(canvasWidth / 2 + 20, 60, 320, 280);

    // Draw info panel
    drawInfoPanel(canvasWidth / 2 + 20, 360, 320, 110);

    // Control labels
    drawControlLabels();
}

function drawPendulum(cx, startY) {
    let scale = 150;  // pixels per meter
    let stringLength = pendulumLength * scale;
    let bobRadius = 15 + bobMass * 10;

    // Pivot
    fill(80);
    noStroke();
    ellipse(cx, startY, 15, 15);

    // String
    let bobX = cx + stringLength * sin(currentAngle);
    let bobY = startY + stringLength * cos(currentAngle);

    stroke(100);
    strokeWeight(2);
    line(cx, startY, bobX, bobY);

    // Protractor arc
    noFill();
    stroke(200);
    strokeWeight(1);
    arc(cx, startY, 100, 100, PI/2 - 0.6, PI/2 + 0.6);

    // Angle marks
    for (let a = -30; a <= 30; a += 10) {
        let markAngle = PI/2 - radians(a);
        let x1 = cx + 45 * cos(markAngle);
        let y1 = startY + 45 * sin(markAngle);
        let x2 = cx + 50 * cos(markAngle);
        let y2 = startY + 50 * sin(markAngle);
        line(x1, y1, x2, y2);
    }

    // Vertical reference
    stroke(180);
    setLineDash([5, 5]);
    line(cx, startY, cx, startY + stringLength + 30);
    setLineDash([]);

    // Angle indicator
    let angleArc = abs(currentAngle);
    if (angleArc > 0.02) {
        noFill();
        stroke(100, 150, 200);
        strokeWeight(2);
        if (currentAngle > 0) {
            arc(cx, startY, 60, 60, PI/2, PI/2 + angleArc);
        } else {
            arc(cx, startY, 60, 60, PI/2 + currentAngle, PI/2);
        }

        fill(100, 150, 200);
        textSize(11);
        textAlign(LEFT, CENTER);
        noStroke();
        text(degrees(currentAngle).toFixed(1) + '°', cx + 35, startY + 40);
    }

    // Bob
    fill(200, 80, 80);
    stroke(150, 50, 50);
    strokeWeight(2);
    ellipse(bobX, bobY, bobRadius * 2, bobRadius * 2);

    // Length indicator
    stroke(100);
    strokeWeight(1);
    line(cx + 60, startY, cx + 60, startY + stringLength);
    line(cx + 55, startY, cx + 65, startY);
    line(cx + 55, startY + stringLength, cx + 65, startY + stringLength);

    fill(80);
    textSize(11);
    textAlign(LEFT, CENTER);
    noStroke();
    text('L = ' + pendulumLength.toFixed(1) + ' m', cx + 70, startY + stringLength/2);

    // Motion trail
    if (isSwinging) {
        noFill();
        stroke(200, 100, 100, 100);
        strokeWeight(3);
        arc(cx, startY, stringLength * 2, stringLength * 2,
            PI/2 - radians(initialAngle), PI/2 + radians(initialAngle));
    }
}

function drawPeriodGraph(x, y, w, h) {
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    // Title
    fill(40);
    textSize(14);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    noStroke();
    text('Period T vs. Length L', x + w/2, y + 8);
    textStyle(NORMAL);

    // Graph area
    let gx = x + 50;
    let gy = y + 40;
    let gw = w - 70;
    let gh = h - 70;

    // Axes
    stroke(100);
    strokeWeight(2);
    line(gx, gy, gx, gy + gh);
    line(gx, gy + gh, gx + gw, gy + gh);

    // Labels
    fill(60);
    textSize(11);
    textAlign(CENTER, TOP);
    text('Length L (m)', gx + gw/2, gy + gh + 20);

    push();
    translate(x + 12, gy + gh/2);
    rotate(-PI/2);
    textAlign(CENTER, BOTTOM);
    text('Period T (s)', 0, 0);
    pop();

    // Grid
    stroke(230);
    strokeWeight(1);
    fill(100);
    textSize(9);

    // X-axis (0 to 2 m)
    textAlign(CENTER, TOP);
    for (let i = 0; i <= 4; i++) {
        let xVal = i * 0.5;
        let px = gx + (xVal / 2) * gw;
        line(px, gy, px, gy + gh);
        noStroke();
        text(xVal.toFixed(1), px, gy + gh + 5);
        stroke(230);
    }

    // Y-axis (0 to 3 s)
    textAlign(RIGHT, CENTER);
    for (let i = 0; i <= 3; i++) {
        let py = gy + gh - (i / 3) * gh;
        line(gx, py, gx + gw, py);
        noStroke();
        text(i.toFixed(0), gx - 5, py);
        stroke(230);
    }

    // Theoretical curve
    if (showTheoryCheckbox.checked()) {
        noFill();
        stroke(100, 180, 100);
        strokeWeight(2);
        beginShape();
        for (let L = 0.1; L <= 2; L += 0.05) {
            let T = 2 * PI * sqrt(L / g);
            let px = gx + (L / 2) * gw;
            let py = gy + gh - (T / 3) * gh;
            vertex(px, py);
        }
        endShape();

        // Legend
        fill(100, 180, 100);
        textSize(10);
        textAlign(LEFT, CENTER);
        noStroke();
        text('T = 2π√(L/g)', gx + gw - 80, gy + 15);
    }

    // Data points
    for (let pt of dataPoints) {
        fill(220, 70, 70);
        noStroke();
        let px = gx + (pt.L / 2) * gw;
        let py = gy + gh - (pt.T / 3) * gh;
        ellipse(px, py, 10, 10);
    }

    // Current point highlight
    if (measuredPeriod > 0) {
        fill(70, 70, 220);
        stroke(50, 50, 180);
        strokeWeight(2);
        let px = gx + (pendulumLength / 2) * gw;
        let py = gy + gh - (measuredPeriod / 3) * gh;
        ellipse(px, py, 14, 14);
    }
}

function drawInfoPanel(x, y, w, h) {
    fill(255, 255, 245);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    fill(40);
    textSize(13);
    textAlign(LEFT, TOP);
    noStroke();

    let theoreticalT = 2 * PI * sqrt(pendulumLength / g);

    text('Theoretical Period: T = 2π√(L/g) = ' + theoreticalT.toFixed(3) + ' s', x + 15, y + 15);

    if (measuredPeriod > 0) {
        text('Measured Period: T = ' + measuredPeriod.toFixed(3) + ' s', x + 15, y + 40);
        let error = abs(measuredPeriod - theoreticalT) / theoreticalT * 100;
        text('Percent Error: ' + error.toFixed(1) + '%', x + 15, y + 65);
    } else {
        fill(100);
        text('Click "Measure Period" to time 10 swings', x + 15, y + 40);
    }

    fill(80);
    textSize(11);
    text('Note: Period is independent of mass!', x + 15, y + 90);
}

function drawControlLabels() {
    fill('black');
    textSize(12);
    textAlign(LEFT, CENTER);
    noStroke();

    text('Length L:', 10, drawHeight + 28);
    text(pendulumLength.toFixed(1) + ' m', 230, drawHeight + 28);

    text('Mass m:', 10, drawHeight + 63);
    text(bobMass.toFixed(1) + ' kg', 230, drawHeight + 63);

    text('Angle:', 280, drawHeight + 28);
    text(initialAngle + '°', 450, drawHeight + 28);
}

function resetPendulum() {
    currentAngle = radians(initialAngle);
    angularVelocity = 0;
    isSwinging = false;
    swingCount = 0;
    measuredPeriod = 0;
}

function releasePendulum() {
    currentAngle = radians(initialAngle);
    angularVelocity = 0;
    isSwinging = true;
    swingCount = 0;
}

function startMeasurement() {
    currentAngle = radians(initialAngle);
    angularVelocity = 0;
    isSwinging = true;
    swingCount = 1;
    swingStartTime = millis();
    measuredPeriod = 0;
}

function addDataPoint() {
    if (measuredPeriod > 0) {
        dataPoints.push({ L: pendulumLength, T: measuredPeriod });
    }
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
