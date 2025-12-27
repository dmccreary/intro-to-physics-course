// Banked Curve Speed Analysis MicroSim
// Explores friction requirements at different speeds

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let angleSlider, radiusSlider, speedSlider, muSlider;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    angleSlider = createSlider(5, 45, 15, 1);
    angleSlider.position(100, drawHeight + 12);
    angleSlider.size(120);

    radiusSlider = createSlider(50, 200, 120, 10);
    radiusSlider.position(100, drawHeight + 42);
    radiusSlider.size(120);

    speedSlider = createSlider(5, 40, 18, 1);
    speedSlider.position(100, drawHeight + 72);
    speedSlider.size(120);

    muSlider = createSlider(0.1, 1.0, 0.5, 0.05);
    muSlider.position(380, drawHeight + 12);
    muSlider.size(120);

    describe('Interactive exploration of friction requirements on banked curves at different speeds', LABEL);
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
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    text('Banked Curve: Speed vs Friction Analysis', canvasWidth / 2, 10);

    let theta = angleSlider.value();
    let radius = radiusSlider.value();
    let speed = speedSlider.value();
    let mu = muSlider.value();
    let g = 9.8;
    let m = 1200; // kg

    // Calculate physics
    let thetaRad = radians(theta);
    let idealSpeed = sqrt(radius * g * tan(thetaRad));
    let N = m * g / cos(thetaRad);
    let NsinTheta = N * sin(thetaRad);
    let requiredFc = m * speed * speed / radius;
    let frictionNeeded = requiredFc - NsinTheta;
    let muRequired = abs(frictionNeeded) / N;

    // Max/min safe speeds
    let maxSpeed = sqrt(radius * g * (sin(thetaRad) + mu * cos(thetaRad)) / (cos(thetaRad) - mu * sin(thetaRad)));
    let minSpeed = 0;
    let denomMin = cos(thetaRad) + mu * sin(thetaRad);
    let numMin = sin(thetaRad) - mu * cos(thetaRad);
    if (numMin > 0 && denomMin > 0) {
        minSpeed = sqrt(radius * g * numMin / denomMin);
    }

    // Draw friction vs speed graph
    drawFrictionGraph(50, 60, 350, 200, theta, radius, speed, idealSpeed, mu, m, g);

    // Draw side view with forces
    drawSideView(450, 60, 300, 200, theta, speed, idealSpeed, frictionNeeded);

    // Draw status panel
    drawStatusPanel(50, 280, 320, 140, speed, idealSpeed, frictionNeeded, muRequired, mu, maxSpeed, minSpeed);

    // Draw equations panel
    drawEquationsPanel(400, 280, 350, 140, theta, radius, idealSpeed, maxSpeed);

    // Control labels
    fill('black');
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Angle: ' + theta + '°', 10, drawHeight + 19);
    text('Radius: ' + radius + ' m', 10, drawHeight + 49);
    text('Speed: ' + speed + ' m/s', 10, drawHeight + 79);
    text('μs (max): ' + mu.toFixed(2), 260, drawHeight + 19);

    // Speed in km/h
    textSize(10);
    fill('#666');
    text('(' + (speed * 3.6).toFixed(0) + ' km/h)', 230, drawHeight + 79);
}

function drawFrictionGraph(x, y, w, h, theta, r, currentSpeed, idealSpeed, mu, m, g) {
    push();
    translate(x, y);

    // Background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(0, 0, w, h, 5);

    // Title
    fill('#333');
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('Required Friction vs Speed', w/2, 5);

    // Graph area
    let gx = 50, gy = 30, gw = w - 70, gh = h - 50;

    // Axes
    stroke('#333');
    strokeWeight(1);
    line(gx, gy, gx, gy + gh);
    line(gx, gy + gh, gx + gw, gy + gh);

    // Axis labels
    fill('#333');
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    text('Speed (m/s)', gx + gw/2, gy + gh + 8);

    push();
    translate(gx - 30, gy + gh/2);
    rotate(-PI/2);
    textAlign(CENTER, BOTTOM);
    text('Friction needed', 0, 0);
    pop();

    // Calculate curve
    let thetaRad = radians(theta);
    let N = m * g / cos(thetaRad);
    let NsinTheta = N * sin(thetaRad);
    let maxFriction = mu * N;

    // Speed range
    let vMax = 40;

    // Plot friction curve
    stroke('#3498DB');
    strokeWeight(2);
    noFill();
    beginShape();
    for (let v = 0; v <= vMax; v += 0.5) {
        let Fc = m * v * v / r;
        let f = Fc - NsinTheta;
        let px = gx + (v / vMax) * gw;
        let py = gy + gh/2 - (f / (maxFriction * 1.5)) * (gh/2);
        py = constrain(py, gy, gy + gh);
        vertex(px, py);
    }
    endShape();

    // Zero line
    stroke('#666');
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(gx, gy + gh/2, gx + gw, gy + gh/2);
    drawingContext.setLineDash([]);

    fill('#666');
    textSize(9);
    textAlign(RIGHT, CENTER);
    text('f = 0', gx - 5, gy + gh/2);

    // Max friction lines
    stroke('#E74C3C');
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    let maxFy = gy + gh/2 - (maxFriction / (maxFriction * 1.5)) * (gh/2);
    let minFy = gy + gh/2 + (maxFriction / (maxFriction * 1.5)) * (gh/2);
    line(gx, maxFy, gx + gw, maxFy);
    line(gx, minFy, gx + gw, minFy);
    drawingContext.setLineDash([]);

    fill('#E74C3C');
    textSize(8);
    textAlign(LEFT, CENTER);
    text('+μN', gx + gw + 3, maxFy);
    text('-μN', gx + gw + 3, minFy);

    // Ideal speed marker
    let idealX = gx + (idealSpeed / vMax) * gw;
    stroke('#27AE60');
    strokeWeight(2);
    line(idealX, gy, idealX, gy + gh);

    fill('#27AE60');
    textSize(9);
    textAlign(CENTER, BOTTOM);
    text('v_ideal', idealX, gy - 2);
    text(idealSpeed.toFixed(1), idealX, gy + gh + 18);

    // Current speed marker
    let currentX = gx + (currentSpeed / vMax) * gw;
    let currentFc = m * currentSpeed * currentSpeed / r;
    let currentF = currentFc - NsinTheta;
    let currentY = gy + gh/2 - (currentF / (maxFriction * 1.5)) * (gh/2);
    currentY = constrain(currentY, gy, gy + gh);

    fill('#E74C3C');
    noStroke();
    ellipse(currentX, currentY, 10, 10);

    stroke('#E74C3C');
    strokeWeight(1);
    drawingContext.setLineDash([2, 2]);
    line(currentX, currentY, currentX, gy + gh);
    drawingContext.setLineDash([]);

    // Labels
    fill('#333');
    noStroke();
    textSize(8);
    textAlign(LEFT, TOP);
    text('Above line: f down slope', gx + 5, gy + 5);
    text('Below line: f up slope', gx + 5, gy + gh - 15);

    pop();
}

function drawSideView(x, y, w, h, theta, speed, idealSpeed, friction) {
    push();
    translate(x, y);

    // Background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(0, 0, w, h, 5);

    // Title
    fill('#333');
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('Side View: Friction Direction', w/2, 5);

    let thetaRad = radians(theta);
    let bankCenterX = w/2;
    let bankCenterY = h/2 + 30;
    let bankW = 180;

    // Banked surface
    push();
    translate(bankCenterX, bankCenterY);

    fill('#8B7355');
    stroke('#5D4E37');
    strokeWeight(2);
    beginShape();
    vertex(-bankW/2, 30);
    vertex(bankW/2 * cos(thetaRad), 30 - bankW/2 * sin(thetaRad));
    vertex(bankW/2 * cos(thetaRad), 50 - bankW/2 * sin(thetaRad));
    vertex(-bankW/2, 50);
    endShape(CLOSE);

    // Car
    let carX = bankW/4 * cos(thetaRad);
    let carY = 30 - bankW/4 * sin(thetaRad) - 25;

    push();
    translate(carX, carY);
    rotate(-thetaRad);

    // Car color based on status
    if (abs(speed - idealSpeed) < 1) {
        fill('#27AE60');
        stroke('#1E8449');
    } else if (abs(friction) > 0 && abs(friction) < 10000) {
        fill('#F39C12');
        stroke('#D68910');
    } else {
        fill('#E74C3C');
        stroke('#C0392B');
    }

    strokeWeight(2);
    rectMode(CENTER);
    rect(0, 0, 40, 20, 3);
    pop();

    // Friction arrow
    if (abs(friction) > 500) {
        let fAngle = friction > 0 ? -thetaRad + PI : -thetaRad;
        let fLen = min(abs(friction) * 0.003, 40);

        stroke('#8B4513');
        strokeWeight(3);
        let fStartX = carX;
        let fStartY = carY;
        let fEndX = carX + fLen * cos(fAngle);
        let fEndY = carY + fLen * sin(fAngle);
        line(fStartX, fStartY, fEndX, fEndY);

        // Arrow head
        fill('#8B4513');
        noStroke();
        push();
        translate(fEndX, fEndY);
        rotate(fAngle);
        triangle(0, 0, -8, -4, -8, 4);
        pop();

        // Label
        fill('#8B4513');
        textSize(10);
        textAlign(CENTER, CENTER);
        if (friction > 0) {
            text('f ↓', carX + 50, carY);
            text('(prevents sliding up)', carX + 50, carY + 12);
        } else {
            text('f ↑', carX - 50, carY);
            text('(prevents sliding down)', carX - 50, carY + 12);
        }
    } else {
        fill('#27AE60');
        textSize(10);
        textAlign(CENTER, CENTER);
        text('f ≈ 0', carX, carY + 35);
        text('(ideal speed!)', carX, carY + 47);
    }

    // Center direction
    fill('#E74C3C');
    textSize(9);
    textAlign(RIGHT, CENTER);
    text('← Center', -bankW/2 - 5, 0);

    pop();

    pop();
}

function drawStatusPanel(x, y, w, h, speed, idealSpeed, friction, muReq, muMax, maxSpeed, minSpeed) {
    push();
    translate(x, y);

    // Determine status
    let status, statusColor;
    if (abs(speed - idealSpeed) < 1) {
        status = 'IDEAL';
        statusColor = '#27AE60';
    } else if (muReq <= muMax) {
        status = 'SAFE';
        statusColor = '#F39C12';
    } else {
        status = 'UNSAFE';
        statusColor = '#E74C3C';
    }

    fill(255);
    stroke(statusColor);
    strokeWeight(3);
    rect(0, 0, w, h, 10);

    fill(statusColor);
    noStroke();
    textSize(16);
    textAlign(CENTER, TOP);
    text('Status: ' + status, w/2, 10);

    textSize(11);
    fill('#333');
    textAlign(LEFT, TOP);
    let lineY = 35;

    text('Current speed: ' + speed + ' m/s (' + (speed*3.6).toFixed(0) + ' km/h)', 10, lineY);
    lineY += 18;

    fill('#27AE60');
    text('Ideal speed: ' + idealSpeed.toFixed(1) + ' m/s', 10, lineY);
    lineY += 18;

    fill('#333');
    if (friction > 0) {
        text('Friction needed: ' + (friction/1000).toFixed(2) + ' kN (down slope)', 10, lineY);
    } else if (friction < 0) {
        text('Friction needed: ' + (-friction/1000).toFixed(2) + ' kN (up slope)', 10, lineY);
    } else {
        text('Friction needed: ≈ 0 (perfect!)', 10, lineY);
    }
    lineY += 18;

    text('μ required: ' + muReq.toFixed(3) + ' (max available: ' + muMax.toFixed(2) + ')', 10, lineY);
    lineY += 18;

    if (!isNaN(maxSpeed) && isFinite(maxSpeed)) {
        fill('#E74C3C');
        text('Safe range: ' + minSpeed.toFixed(1) + ' - ' + maxSpeed.toFixed(1) + ' m/s', 10, lineY);
    }

    pop();
}

function drawEquationsPanel(x, y, w, h, theta, r, idealSpeed, maxSpeed) {
    push();
    translate(x, y);

    fill(255, 255, 255, 245);
    stroke(200);
    strokeWeight(1);
    rect(0, 0, w, h, 10);

    fill('#333');
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);

    text('Key Equations:', 10, 10);

    textSize(10);
    let lineY = 30;

    fill('#27AE60');
    text('Ideal speed (no friction):', 10, lineY);
    lineY += 15;
    fill('#333');
    text('v_ideal = √(rg tan θ) = ' + idealSpeed.toFixed(1) + ' m/s', 20, lineY);
    lineY += 20;

    fill('#E74C3C');
    text('Maximum speed (with friction μ):', 10, lineY);
    lineY += 15;
    fill('#333');
    text('v_max = √[rg(sin θ + μ cos θ)/(cos θ - μ sin θ)]', 20, lineY);
    lineY += 15;
    if (!isNaN(maxSpeed) && isFinite(maxSpeed)) {
        text('v_max = ' + maxSpeed.toFixed(1) + ' m/s (' + (maxSpeed*3.6).toFixed(0) + ' km/h)', 20, lineY);
    }
    lineY += 20;

    fill('#666');
    textSize(9);
    text('Banking reduces friction dependence for safe cornering', 10, lineY);

    pop();
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
