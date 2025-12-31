// Banked Curve Speed Analysis MicroSim
// Explores friction requirements at different speeds

let canvasWidth = 800;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

// Panel layout
let panelWidth = 350;

// Slider layout constants
let sliderLeftMargin = 100;
let sliderRightMargin = 100;

let angleSlider, radiusSlider, speedSlider, muSlider;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Row 1: Angle and Radius
    angleSlider = createSlider(0, 45, 15, 1);
    angleSlider.position(sliderLeftMargin, drawHeight + 12);

    radiusSlider = createSlider(50, 200, 120, 10);
    // Position will be set in calculateSliderWidths()

    // Row 2: Speed and Friction coefficient
    speedSlider = createSlider(5, 40, 18, 1);
    speedSlider.position(sliderLeftMargin, drawHeight + 42);

    muSlider = createSlider(0.1, 1.0, 0.5, 0.05);
    // Position will be set in calculateSliderWidths()

    // Adjust slider widths based on canvas size
    calculateSliderWidths();

    describe('Interactive exploration of friction requirements on banked curves at different speeds', LABEL);
}

function calculateSliderWidths() {
    // Calculate slider width - each slider takes about 35% of canvas width
    let sliderWidth = canvasWidth * 0.30;
    let col2X = canvasWidth / 2 + 110;

    angleSlider.size(sliderWidth);
    radiusSlider.size(sliderWidth);
    radiusSlider.position(col2X, drawHeight + 12);

    speedSlider.size(sliderWidth);
    muSlider.size(sliderWidth);
    muSlider.position(col2X, drawHeight + 42);
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
    drawFrictionGraph(25, 45, panelWidth, 200, theta, radius, speed, idealSpeed, mu, m, g);

    // Draw side view with forces
    drawSideView(25 + panelWidth + 20, 45, panelWidth, 200, theta, speed, idealSpeed, frictionNeeded);

    // Draw status panel
    drawStatusPanel(25, 265, panelWidth, 140, speed, idealSpeed, frictionNeeded, muRequired, mu, maxSpeed, minSpeed);

    // Draw equations panel
    drawEquationsPanel(25 + panelWidth + 20, 265, panelWidth, 140, theta, radius, idealSpeed, maxSpeed);

    // Control labels - 2 rows x 2 columns
    let col2X = canvasWidth / 2 + 30;
    fill('black');
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);

    // Row 1
    text('Angle: ' + theta + '°', 10, drawHeight + 19);
    text('Radius: ' + radius + ' m', col2X, drawHeight + 19);

    // Row 2
    text('Speed: ' + (speed * 2.237).toFixed(0) + ' mph', 10, drawHeight + 49);
    text('μs (max): ' + mu.toFixed(2), col2X, drawHeight + 49);

    // Speed conversions under the speed label
    textSize(10);
    fill('#666');
    text('(' + speed + ' m/s, ' + (speed * 3.6).toFixed(0) + ' km/h)', 10, drawHeight + 65);

    // Friction reference labels under the μ slider
    let sliderWidth = canvasWidth * 0.30;
    let muSliderX = canvasWidth / 2 + 110;
    textSize(12);
    fill('#3498DB');
    textAlign(LEFT, CENTER);
    text('ice on road', muSliderX, drawHeight + 65);
    fill('#E74C3C');
    textAlign(RIGHT, CENTER);
    text('dry road', muSliderX + sliderWidth, drawHeight + 65);
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
    noStroke();
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

    // draw the theta
    fill('black');
    noStroke();
    textSize(14);
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
    noStroke();
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
    noStroke();
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
    let bankCenterX = w/2 - 20;
    let bankCenterY = h/2 + 20;
    let bankW = 160;
    let roadThickness = 20;

    push();
    translate(bankCenterX, bankCenterY);

    // Horizontal reference line
    stroke('#666');
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(-bankW/2 - 15, 30, bankW/2 + 15, 30);
    drawingContext.setLineDash([]);

    // Angle arc at pivot point
    noFill();
    stroke('#333');
    arc(-bankW/2, 30, 40, 40, -thetaRad, 0);
    fill('#333');
    noStroke();
    textSize(14);
    text('θ=' + theta + '°', -bankW/2 - 35, 25);

    // Surface - rotating rectangle around left edge pivot
    push();
    translate(-bankW/2, 30);
    rotate(-thetaRad);
    fill('#8B7355');
    stroke('#5D4E37');
    strokeWeight(2);
    rect(0, 0, bankW, roadThickness);
    pop();

    // Car position on bank - constant perpendicular distance from road
    let carPosOnRoad = 0.5;
    let carDistAlongRoad = carPosOnRoad * bankW;

    // Position along the rotated road
    let roadX = -bankW/2 + carDistAlongRoad * cos(thetaRad);
    let roadY = 30 - carDistAlongRoad * sin(thetaRad);

    // Offset perpendicular to road surface (up from road)
    let carOffset = 15;
    let carX = roadX - carOffset * sin(thetaRad);
    let carY = roadY - carOffset * cos(thetaRad);

    // Car (rectangle rotated with bank)
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
    rect(0, 0, 45, 22, 4);

    // Windshield
    fill('#87CEEB');
    noStroke();
    rect(0, -4, 35, 8, 2);

    // Wheels
    fill('black');
    rect(-16, 11, 8, 8, 2);
    rect(16, 11, 8, 8, 2);

    pop();

    // Friction arrow
    if (abs(friction) > 500) {
        let fAngle = friction > 0 ? -thetaRad + PI : -thetaRad;
        let fLen = min(abs(friction) * 0.003, 40);

        stroke('#8B4513');
        strokeWeight(3);
        let fEndX = carX + fLen * cos(fAngle);
        let fEndY = carY + fLen * sin(fAngle);
        line(carX, carY, fEndX, fEndY);

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
        noStroke();
        textSize(10);
        textAlign(CENTER, CENTER);
        if (friction > 0) {
            text('f ↓', carX + 155, carY);
            text('(down slope)', carX + 155, carY + 12);
        } else {
            text('f ↑', carX - 55, carY);
            text('(up slope)', carX - 55, carY + 12);
        }
    } else {
        fill('#27AE60');
        noStroke();
        textSize(10);
        textAlign(CENTER, CENTER);
        text('f ≈ 0', carX, carY + 55);
        text('(ideal!)', carX, carY + 67);
    }

    // Center direction
    fill('#E74C3C');
    noStroke();
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
        canvasWidth = container.offsetWidth;
    }
    // Recalculate slider widths if they exist
    if (angleSlider && radiusSlider && speedSlider && muSlider) {
        calculateSliderWidths();
    }
}
