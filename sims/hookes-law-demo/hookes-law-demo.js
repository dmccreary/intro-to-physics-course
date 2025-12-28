// Hooke's Law Interactive Demonstration
// Explore F = -kx with spring, mass, and force-displacement graph

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 120;

// Spring parameters
let springConstant = 50;  // N/m
let hangingMass = 0.5;    // kg
let g = 9.8;

// State
let displacement = 0;
let isOscillating = false;
let velocity = 0;
let isDragging = false;

// Graph data
let dataPoints = [];
let showBestFit = true;

// UI elements
let kSlider, massSlider;
let releaseButton, addPointButton, clearButton;
let bestFitCheckbox;

// Natural length
let naturalLength = 100;
let massSize = 40;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Sprint Constant - make sure the minimum does not allow too much stretch to pull the mass off screen for the max mass
    kSlider = createSlider(30, 200, 100, 5);
    kSlider.position(sliderLeftMargin, drawHeight + 15);
    kSlider.size(canvasWidth*.25);
    kSlider.input(() => {
        springConstant = kSlider.value();
        calculateEquilibrium();
    });

    massSlider = createSlider(0.1, 2.0, 1.0, 0.1);
    massSlider.position(sliderLeftMargin, drawHeight + 50);
    massSlider.size(canvasWidth*.25);
    massSlider.input(() => {
        hangingMass = massSlider.value();
        calculateEquilibrium();
    });

    releaseButton = createButton('Release');
    releaseButton.position(330, drawHeight + 15);
    releaseButton.size(70, 28);
    releaseButton.style('background-color', '#4CAF50');
    releaseButton.style('color', 'white');
    releaseButton.mousePressed(() => {
        let equilibriumDisp = (hangingMass * g) / springConstant;
        if (abs(displacement - equilibriumDisp) < 0.01) {
            alert('First pull the mass down, then press Release to see it oscillate.');
            return;
        }
        isOscillating = true;
        isDragging = false;
    });

    addPointButton = createButton('Add Data Point');
    addPointButton.position(410, drawHeight + 15);
    addPointButton.size(120, 28);
    addPointButton.mousePressed(addDataPoint);

    clearButton = createButton('Clear Graph');
    clearButton.position(540, drawHeight + 15);
    clearButton.size(90, 28);
    clearButton.mousePressed(() => dataPoints = []);

    bestFitCheckbox = createCheckbox(' Show best-fit line', true);
    bestFitCheckbox.position(320, drawHeight + 55);
    bestFitCheckbox.changed(() => showBestFit = bestFitCheckbox.checked());

    calculateEquilibrium();

    describe('Interactive Hookes Law demonstration with draggable mass, spring visualization, and force vs displacement graph', LABEL);
}

function calculateEquilibrium() {
    // Equilibrium: kx = mg
    displacement = (hangingMass * g) / springConstant;
    velocity = 0;
    isOscillating = false;
}

function draw() {
    updateCanvasSize();

    // Physics update
    if (isOscillating && !isDragging) {
        let equilibriumDisp = (hangingMass * g) / springConstant;
        let restoreDisp = displacement - equilibriumDisp;
        let acceleration = -(springConstant / hangingMass) * restoreDisp;
        velocity += acceleration * 0.016;
        velocity *= 0.995;  // Light damping
        displacement += velocity * 0.016;

        if (abs(velocity) < 0.001 && abs(restoreDisp) < 0.001) {
            isOscillating = false;
            displacement = equilibriumDisp;
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
    textSize(22);
    textAlign(CENTER, TOP);
    noStroke();
    text('Hooke\'s Law Interactive Demonstration', canvasWidth / 2, 10);

    // Draw spring and mass - responsive positioning
    let springX = canvasWidth * 0.16;
    drawSpringMass(springX, 70);

    // Draw graph - fills remainder with margin
    let graphX = canvasWidth * 0.32;
    let graphMargin = canvasWidth * 0.025;
    let graphWidth = canvasWidth - graphX - graphMargin;
    drawForceGraph(graphX, 70, graphWidth, drawHeight - 90);

    // Draw formula
    drawFormula();

    // Draw control labels
    drawControlLabels();
}

function drawSpringMass(x, startY) {
    // Ceiling
    fill(100);
    noStroke();
    rect(x - 80, startY - 10, 160, 15);

    // Ruler on left
    let rulerX = x - 70;
    stroke(150);
    strokeWeight(1);
    line(rulerX, startY + 20, rulerX, startY + 400);

    // Ruler marks (every 20 pixels = 0.1m = 10cm)
    fill(80);
    textSize(9);
    textAlign(RIGHT, CENTER);
    for (let i = 0; i <= 20; i++) {
        let markY = startY + 20 + i * 18;
        stroke(150);
        line(rulerX - 5, markY, rulerX, markY);
        noStroke();
        if (i % 2 === 0) {
            text((i * 5) + ' cm', rulerX - 8, markY);
        }
    }

    // Calculate spring length (ruler uses 18px per 5cm = 3.6px per cm = 360px per m)
    let pixelsPerMeter = 360;
    let springLength = naturalLength + displacement * pixelsPerMeter;
    let massY = startY + 20 + springLength;

    // Spring
    stroke(80, 80, 100);
    strokeWeight(3);
    noFill();

    let numCoils = 15;
    let coilWidth = 25;
    beginShape();
    vertex(x, startY + 5);
    for (let i = 0; i <= numCoils; i++) {
        let py = startY + 5 + (i / numCoils) * springLength;
        let px = x + (i % 2 === 0 ? -coilWidth : coilWidth);
        vertex(px, py);
    }
    vertex(x, startY + 5 + springLength);
    endShape();

    // Mass
    fill(180, 60, 60);
    stroke(120, 40, 40);
    strokeWeight(2);
    rect(x - massSize/2, massY, massSize, massSize, 5);

    // Mass label
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    noStroke();
    text(hangingMass.toFixed(1) + ' kg', x, massY + massSize/2);

    // Force arrow (spring force pointing up)
    let force = springConstant * displacement;
    let forceScale = 1;  // pixels per N

    if (force > 0.5) {
        stroke(50, 150, 50);
        strokeWeight(4);
        let arrowLength = force * forceScale;
        arrowLength = min(arrowLength, 150);

        line(x + 50, massY + massSize/2, x + 50, massY + massSize/2 - arrowLength);

        fill(50, 150, 50);
        noStroke();
        push();
        translate(x + 50, massY + massSize/2 - arrowLength);
        triangle(0, 0, -8, 15, 8, 15);
        pop();

        textSize(12);
        textAlign(LEFT, CENTER);
        text('F = ' + force.toFixed(1) + ' N', x + 60, massY + massSize/2 - arrowLength/2);
    }

    // Displacement indicator
    if (abs(displacement) > 0.01) {
        stroke(220, 100, 50);
        strokeWeight(2);
        setLineDash([5, 5]);
        line(x - 50, startY + 20 + naturalLength, x + 40, startY + 20 + naturalLength);
        setLineDash([]);

        // Double arrow for displacement
        stroke(220, 100, 50);
        strokeWeight(2);
        line(x - 40, startY + 20 + naturalLength, x - 40, massY);

        fill(220, 100, 50);
        noStroke();
        textSize(11);
        textAlign(RIGHT, CENTER);
        text('x = ' + (displacement * 100).toFixed(1) + ' cm', x - 45, startY + 20 + naturalLength + displacement * 50);
    }

    // Equilibrium label
    fill(150);
    textSize(10);
    textAlign(LEFT, CENTER);
    noStroke();
    text('Natural length', x + 45, startY + 20 + naturalLength/2);

    // Mouse interaction - only start drag if clicking in drawing area (not control area)
    if (mouseIsPressed && mouseY < drawHeight &&
        mouseX > x - 60 && mouseX < x + 60 &&
        mouseY > massY - 20 && mouseY < massY + massSize + 20) {
        isDragging = true;
        isOscillating = false;
    }

    if (isDragging) {
        if (mouseIsPressed) {
            let newMassY = mouseY - massSize/2;
            displacement = (newMassY - startY - 20 - naturalLength) / pixelsPerMeter;
            displacement = max(0, min(displacement, 0.8));  // max 80cm
            velocity = 0;
        } else {
            isDragging = false;
        }
    }
}

function drawForceGraph(x, y, w, h) {
    // Background
    fill('white');
    stroke('silver');
    strokeWeight(1);
    rect(x, y, w, h, 5);

    // Title
    fill(40);
    textSize(14);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    noStroke();
    text('Force vs. Displacement Graph', x + w/2, y + 8);
    textStyle(NORMAL);

    // Graph area
    let gx = x + 60;
    let gy = y + 50;
    let gw = w - 80;
    let gh = h - 90;

    // Axes
    stroke(100);
    strokeWeight(2);
    line(gx, gy, gx, gy + gh);
    line(gx, gy + gh, gx + gw, gy + gh);

    // Axis labels
    fill(60);
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('Displacement x (cm)', gx + gw/2, gy + gh + 21);

    push();
    translate(x + 19, gy + gh/2);
    rotate(-PI/2);
    textAlign(CENTER, BOTTOM);
    text('Force F (N)', 0, 0);
    pop();

    // Grid and axis values
    stroke(230);
    strokeWeight(1);
    fill(100);
    textSize(9);

    // X-axis values (0-80cm)
    textAlign(CENTER, TOP);
    for (let i = 0; i <= 8; i++) {
        let xVal = i * 10;  // cm
        let px = gx + (xVal / 80) * gw;
        line(px, gy, px, gy + gh);
        noStroke();
        text(xVal, px, gy + gh + 5);
        stroke(230);
    }

    // Y-axis values (0-130N)
    textAlign(RIGHT, CENTER);
    for (let i = 0; i <= 13; i++) {
        let yVal = i * 10;
        let py = gy + gh - (yVal / 130) * gh;
        line(gx, py, gx + gw, py);
        noStroke();
        text(yVal, gx - 5, py);
        stroke(230);
    }

    // Plot data points
    for (let pt of dataPoints) {
        fill(220, 70, 70);
        noStroke();
        let px = gx + (pt.x * 100 / 80) * gw;  // convert m to cm
        let py = gy + gh - (pt.f / 130) * gh;
        circle(px, py, 10);
    }

    // Current point - constrained to graph bounds
    let force = springConstant * displacement;
    let cpx = gx + (displacement * 100 / 80) * gw;  // convert m to cm
    let cpy = gy + gh - (force / 130) * gh;

    // Constrain to graph area
    cpx = constrain(cpx, gx, gx + gw);
    cpy = constrain(cpy, gy, gy + gh);

    fill('blue');
    stroke('silver');
    strokeWeight(1);
    circle(cpx, cpy, 14);

    // Best fit line
    if (showBestFit && dataPoints.length >= 2) {
        let slope = calculateSlope();

        stroke(50, 180, 50);
        strokeWeight(2);
        let x1 = gx;
        let y1 = gy + gh;
        let x2 = gx + gw;
        let y2 = gy + gh - (slope * 0.8 / 130) * gh;  // 80cm = 0.8m
        line(x1, y1, x2, y2);

        // Show calculated k
        fill(50, 180, 50);
        textSize(12);
        textAlign(LEFT, TOP);
        noStroke();
        text('Slope k = ' + slope.toFixed(1) + ' N/m', gx + 10, gy + 10);
    }

    // Actual k value
    fill(100);
    textSize(11);
    textAlign(RIGHT, TOP);
    text('Actual k = ' + springConstant + ' N/m', gx + gw - 5, gy + 10);
}

function calculateSlope() {
    if (dataPoints.length < 2) return 0;

    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    let n = dataPoints.length;

    for (let pt of dataPoints) {
        sumX += pt.x;
        sumY += pt.f;
        sumXY += pt.x * pt.f;
        sumX2 += pt.x * pt.x;
    }

    return (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
}

function addDataPoint() {
    let force = springConstant * displacement;
    dataPoints.push({ x: displacement, f: force });
}

function drawFormula() {
    let fx = canvasWidth * 0.85;
    let fy = margin;;
    let boxWidth = canvasWidth * 0.1;

    fill('white');
    stroke('gray');
    strokeWeight(1);
    rect(fx, fy, boxWidth, 30, 8);

    fill('black');
    textSize(18);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    noStroke();
    text('F = kx', fx + boxWidth / 2, fy + 15);
    textStyle(NORMAL);
}

function drawControlLabels() {
    fill('black');
    textSize(13);
    textAlign(LEFT, CENTER);
    noStroke();

    text('Spring k: ' + springConstant + ' N/m', 10, drawHeight + 28);
    text('Mass m: ' + hangingMass.toFixed(1) + ' kg', 10, drawHeight + 63);

}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    kSlider.position(sliderLeftMargin, drawHeight + 15);
    massSlider.position(sliderLeftMargin, drawHeight + 50);
    releaseButton.position(330, drawHeight + 15);
    addPointButton.position(410, drawHeight + 15);
    clearButton.position(520, drawHeight + 15);
    bestFitCheckbox.position(310, drawHeight + 55);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(700, container.offsetWidth);
    }
}
