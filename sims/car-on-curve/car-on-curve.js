// Car on Curve MicroSim
// Demonstrates centripetal force and maximum speed on curves

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let speedSlider, radiusSlider, muSlider;
let carAngle = 0;
let isSkidding = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    speedSlider = createSlider(0, 40, 15, 1);
    speedSlider.position(100, drawHeight + 12);
    speedSlider.size(150);

    radiusSlider = createSlider(20, 200, 80, 5);
    radiusSlider.position(100, drawHeight + 42);
    radiusSlider.size(150);

    muSlider = createSlider(0.1, 1.0, 0.85, 0.05);
    muSlider.position(100, drawHeight + 72);
    muSlider.size(150);

    describe('Car navigating a curve showing centripetal force and friction', LABEL);
}

function draw() {
    updateCanvasSize();
    carAngle += 0.02;

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Get values
    let speed = speedSlider.value();
    let radius = radiusSlider.value();
    let mu_s = muSlider.value();
    let g = 9.8;

    // Calculate physics
    let mass = 1000; // kg
    let requiredFc = mass * speed * speed / radius;
    let maxFriction = mu_s * mass * g;
    let maxSpeed = sqrt(mu_s * g * radius);

    isSkidding = requiredFc > maxFriction;

    // Title
    fill('black');
    noStroke();
    textSize(20);
    textAlign(CENTER, TOP);
    text('Car on a Curve: Centripetal Force', canvasWidth / 2, 10);

    // Draw road (top-down view)
    let centerX = 220;
    let centerY = 250;
    let displayRadius = min(radius, 150);

    // Road
    stroke('#444');
    strokeWeight(60);
    noFill();
    arc(centerX, centerY, displayRadius * 2, displayRadius * 2, PI * 0.5, PI * 1.5);

    // Road markings
    stroke('#FFD700');
    strokeWeight(3);
    drawingContext.setLineDash([15, 10]);
    arc(centerX, centerY, displayRadius * 2, displayRadius * 2, PI * 0.5, PI * 1.5);
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
    fill('#87CEEB');
    noStroke();
    rect(-15, -12, 20, 10, 2);

    // Wheels
    fill('#333');
    rect(-22, -18, 12, 6, 2);
    rect(-22, 12, 12, 6, 2);
    rect(10, -18, 12, 6, 2);
    rect(10, 12, 12, 6, 2);

    pop();

    // Force vectors
    let forceScale = 0.01;

    // Velocity vector (tangent)
    let vLen = min(speed * 3, 80);
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

    // Info panel
    drawInfoPanel(speed, radius, requiredFc, maxFriction, maxSpeed, isSkidding);

    // Control labels
    fill('black');
    noStroke();
    textSize(13);
    textAlign(LEFT, CENTER);
    text('Speed: ' + speed + ' m/s', 10, drawHeight + 19);
    text('Radius: ' + radius + ' m', 10, drawHeight + 49);
    text('μs: ' + mu_s.toFixed(2), 10, drawHeight + 79);

    // Status
    textSize(14);
    textAlign(LEFT, CENTER);
    if (isSkidding) {
        fill('#E74C3C');
        text('⚠ SKIDDING! Required Fc > Available friction', 280, drawHeight + 30);
    } else {
        fill('#27AE60');
        text('✓ Safe: Friction provides enough centripetal force', 280, drawHeight + 30);
    }

    fill('#666');
    textSize(12);
    text('Max safe speed: ' + maxSpeed.toFixed(1) + ' m/s (' + (maxSpeed * 3.6).toFixed(0) + ' km/h)', 280, drawHeight + 55);
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

function drawInfoPanel(speed, radius, reqFc, maxF, maxV, skid) {
    let px = canvasWidth - 280;
    let py = 50;

    fill(255, 255, 255, 240);
    stroke(skid ? '#E74C3C' : '#27AE60');
    strokeWeight(2);
    rect(px, py, 260, 200, 10);

    fill(skid ? '#E74C3C' : '#27AE60');
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text('Circular Motion Analysis', px + 10, py + 10);

    textSize(11);
    fill('#333');
    let y = py + 35;

    text('Centripetal acceleration:', px + 10, y); y += 18;
    text('ac = v²/r = ' + (speed*speed/radius).toFixed(2) + ' m/s²', px + 10, y); y += 22;

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
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.min(container.offsetWidth, 800);
    }
}
