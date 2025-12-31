// Car on Curve MicroSim
// Demonstrates centripetal force and maximum speed on curves

let canvasWidth = 800;
let drawHeight = 510;
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;
let sliderLeftMargin = 130;

let speedSlider, radiusSlider, muSlider;
let startButton;
let carAngle = 0;
let isSkidding = false;
let isPaused = true;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // speed slider in m/s
    speedSlider = createSlider(0, 60, 25, 1);
    speedSlider.position(sliderLeftMargin, drawHeight + 10);

    // radius slider
    radiusSlider = createSlider(20, 200, 140, 5);
    radiusSlider.position(sliderLeftMargin, drawHeight + 40);

    // friction slider
    muSlider = createSlider(0.1, 1.0, 0.55, 0.05);
    muSlider.position(sliderLeftMargin, drawHeight + 70);

    // start/pause button
    startButton = createButton('Start');
    startButton.position(10, drawHeight + 95);
    startButton.mousePressed(togglePause);

    updateSliders();

    describe('Car navigating a curve showing centripetal force and friction', LABEL);
}

function draw() {
    if (!isPaused) {
        carAngle += 0.02;
    }

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Get values
    let carSpeed = speedSlider.value();
    let radius = radiusSlider.value();
    let mu_s = muSlider.value();
    let g = 9.8;

    // Calculate physics
    let mass = 1000; // kg
    let requiredFc = mass * carSpeed * carSpeed / radius;
    let maxFriction = mu_s * mass * g;
    let maxSpeed = sqrt(mu_s * g * radius);

    isSkidding = requiredFc > maxFriction;

    // Title
    fill('black');
    noStroke();
    textSize(20);
    textAlign(CENTER, TOP);
    text('Car on a Curve: Centripetal Force', canvasWidth / 2, 10);

    // Draw road and car
    drawCarAndRoad(radius, carSpeed, requiredFc, maxFriction);

    // Info panel
    drawInfoPanel(carSpeed, radius, requiredFc, maxFriction, maxSpeed, isSkidding);

    // Control labels
    fill('black');
    noStroke();
    textSize(16);
    textAlign(LEFT, CENTER);
    text('Speed: ' + (carSpeed * 2.237).toFixed(0) + ' mph', 10, drawHeight + 19);
    text('Radius: ' + radius + ' m', 10, drawHeight + 49);
    text('Friction: ' + mu_s.toFixed(2) + " μs", 10, drawHeight + 79);

    // Friction reference labels
    textSize(14);
    fill('blue');
    textAlign(LEFT, CENTER);
    text('ice on road', sliderLeftMargin, drawHeight + 100);
    textAlign(RIGHT, CENTER);
    fill('red');
    text('dry pavement', sliderLeftMargin+canvasWidth*.37, drawHeight + 100);

    // Status (right-aligned from canvas edge)
    let rightMargin = canvasWidth - 20;
    textSize(14);
    textAlign(RIGHT, CENTER);
    if (isSkidding) {
        fill('#E74C3C');
        text('⚠ SKIDDING! Required Fc > Available friction', rightMargin, drawHeight + 32);
    } else {
        fill('#27AE60');
        text('✓ Safe: Friction provides enough centripetal force', rightMargin, drawHeight + 32);
    }

    fill('#666');
    textSize(12);
    text('Max safe speed: ' + (maxSpeed * 2.237).toFixed(0) + ' mph', rightMargin, drawHeight + 55);
}

function drawCarAndRoad(radius, carSpeed, requiredFc, maxFriction) {
    let centerX = 250;
    let centerY = 265;
    let displayRadius = radius;

    // Road
    stroke('#444');
    strokeWeight(60);
    noFill();
    ellipse(centerX, centerY, displayRadius * 2, displayRadius * 2);

    // Road markings
    stroke('#FFD700');
    strokeWeight(3);
    drawingContext.setLineDash([15, 10]);
    ellipse(centerX, centerY, displayRadius * 2, displayRadius * 2);
    drawingContext.setLineDash([]);

    // Car position
    let carX = centerX + displayRadius * cos(carAngle + PI);
    let carY = centerY + displayRadius * sin(carAngle + PI);
    let carHeading = carAngle + PI/2;

    // If skidding, car drifts outward
    let skidOffset = 0;
    if (isSkidding) {
        skidOffset = sin(carAngle * 5) * 10 + 15;
        carX += cos(carAngle + PI) * skidOffset;
        carY += sin(carAngle + PI) * skidOffset;
    }

    // Draw car
    push();
    translate(carX, carY);
    rotate(carHeading);

    // Car body
    fill(isSkidding ? '#E74C3C' : '#3498DB');
    stroke('#222');
    strokeWeight(2);
    rect(-25, -15, 50, 30, 5);

    // Windshield
    fill('lightblue');
    noStroke();
    rect(-10, -10, 10, 20, 2);

    // Wheels
    fill('black');
    rect(-22, -18, 12, 6, 2);
    rect(-22, 12, 12, 6, 2);
    rect(10, -18, 12, 6, 2);
    rect(10, 12, 12, 6, 2);

    pop();

    // Force vectors
    let forceScale = 0.01;

    // Velocity vector (tangent)
    let vLen = min(carSpeed * 3, 80);
    let vEndX = carX + cos(carHeading) * vLen;
    let vEndY = carY + sin(carHeading) * vLen;
    drawArrow(carX, carY, vEndX, vEndY, '#27AE60', 'v');

    // Centripetal force (toward center)
    let toCenter = atan2(centerY - carY, centerX - carX);
    let fcLen = min(requiredFc * forceScale, 80);
    let fcEndX = carX + cos(toCenter) * fcLen;
    let fcEndY = carY + sin(toCenter) * fcLen;
    drawArrow(carX, carY, fcEndX, fcEndY, '#E74C3C', 'Fc');

    // Max friction indicator
    let fMaxLen = min(maxFriction * forceScale, 80);
    stroke('#9B59B680');
    strokeWeight(2);
    drawingContext.setLineDash([5, 5]);
    line(carX, carY, carX + cos(toCenter) * fMaxLen, carY + sin(toCenter) * fMaxLen);
    drawingContext.setLineDash([]);

    // Center point
    fill('#666');
    noStroke();
    ellipse(centerX, centerY, 8, 8);
    textSize(10);
    textAlign(CENTER, TOP);
    text('Center', centerX, centerY + 10);
}

function drawArrow(x1, y1, x2, y2, col, label) {
    let headSize = 10;
    let angle = atan2(y2 - y1, x2 - x1);

    stroke(col);
    strokeWeight(3);
    line(x1, y1, x2, y2);

    fill(col);
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -headSize * 1.5, -headSize/2, -headSize * 1.5, headSize/2);
    pop();

    textSize(12);
    textAlign(CENTER, CENTER);
    fill(col);
    text(label, x2 + cos(angle + PI/2) * 15, y2 + sin(angle + PI/2) * 15);
}

function drawInfoPanel(carSpeed, radius, reqFc, maxF, maxV, skid) {
    let px = canvasWidth - 240;
    let py = 50;
    let panelWidth = 200;
    let panelHeight = 195;

    fill('white');
    // change border color based on skidding
    stroke(skid ? '#E74C3C' : '#27AE60');
    strokeWeight(2);
    rect(px, py, panelWidth, panelHeight, 10);

    fill(skid ? '#E74C3C' : '#27AE60');
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text('Circular Motion Analysis', px + 10, py + 10);

    textSize(11);
    fill('#333');
    let y = py + 35;

    text('Centripetal acceleration:', px + 10, y); y += 18;
    text('ac = v²/r = ' + (carSpeed*carSpeed/radius).toFixed(2) + ' m/s²', px + 10, y); y += 22;

    text('Required centripetal force:', px + 10, y); y += 18;
    text('Fc = mv²/r = ' + (reqFc/1000).toFixed(1) + ' kN', px + 10, y); y += 22;

    text('Max available friction:', px + 10, y); y += 18;
    text('fs_max = μs·mg = ' + (maxF/1000).toFixed(1) + ' kN', px + 10, y); y += 22;

    text('Max safe speed:', px + 10, y); y += 18;
    fill('#9B59B6');
    text('v_max = √(μsgr) = ' + maxV.toFixed(1) + ' m/s', px + 10, y);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    updateSliders();
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
    }
}

function updateSliders() {
    if (!speedSlider || !radiusSlider || !muSlider) return;
    let sliderWidth = canvasWidth*.37;

    speedSlider.size(sliderWidth);
    radiusSlider.size(sliderWidth);
    muSlider.size(sliderWidth);
}

function togglePause() {
    isPaused = !isPaused;
    startButton.html(isPaused ? 'Start' : 'Pause');
}
