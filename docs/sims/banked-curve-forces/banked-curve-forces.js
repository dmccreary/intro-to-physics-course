// Banked Curve Force Analysis Diagram
// Shows force decomposition on a banked curve

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let angleSlider, radiusSlider, speedSlider;
let showDecompCheckbox;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    angleSlider = createSlider(5, 45, 20, 1);
    angleSlider.position(100, drawHeight + 12);
    angleSlider.size(130);

    radiusSlider = createSlider(50, 200, 120, 10);
    radiusSlider.position(100, drawHeight + 42);
    radiusSlider.size(130);

    speedSlider = createSlider(5, 35, 18, 1);
    speedSlider.position(100, drawHeight + 72);
    speedSlider.size(130);

    showDecompCheckbox = createCheckbox(' Show N decomposition', true);
    showDecompCheckbox.position(260, drawHeight + 20);
    showDecompCheckbox.style('font-size', '13px');

    describe('Force analysis diagram for a car on a banked curve', LABEL);
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
    text('Banked Curve: Force Analysis', canvasWidth * 0.35, 10);

    let theta = angleSlider.value();
    let radius = radiusSlider.value();
    let speed = speedSlider.value();
    let g = 9.8;
    let m = 1200; // kg, typical car

    // Calculate physics
    let thetaRad = radians(theta);
    let idealSpeed = sqrt(radius * g * tan(thetaRad));
    let N = m * g / cos(thetaRad);
    let NsinTheta = N * sin(thetaRad);
    let NcosTheta = N * cos(thetaRad);
    let requiredFc = m * speed * speed / radius;

    // Friction calculation
    let frictionNeeded = requiredFc - NsinTheta;
    let frictionDirection = frictionNeeded >= 0 ? 'down slope' : 'up slope';

    // Draw the banked curve scene
    drawBankedCurve(theta, m, N, NsinTheta, NcosTheta, requiredFc, frictionNeeded,
                    speed, idealSpeed, showDecompCheckbox.checked());

    // Draw top view
    drawTopView(canvasWidth - 180, 280, 150, speed, radius, requiredFc);

    // Draw info panel
    drawInfoPanel(canvasWidth - 240, 40, 220, 230, theta, radius, speed, idealSpeed,
                  N, NsinTheta, requiredFc, frictionNeeded, m, g);

    // Control labels
    fill('black');
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Bank angle: ' + theta + '°', 10, drawHeight + 19);
    text('Radius: ' + radius + ' m', 10, drawHeight + 49);
    text('Speed: ' + speed + ' m/s', 10, drawHeight + 79);

    // Speed status
    textAlign(LEFT, CENTER);
    if (abs(speed - idealSpeed) < 1) {
        fill('#27AE60');
        text('At ideal speed - no friction needed!', 260, drawHeight + 55);
    } else if (speed > idealSpeed) {
        fill('#E74C3C');
        text('Above ideal - friction down slope', 260, drawHeight + 55);
    } else {
        fill('#F39C12');
        text('Below ideal - friction up slope', 260, drawHeight + 55);
    }
}

function drawBankedCurve(theta, m, N, NsinTheta, NcosTheta, Fc, friction, speed, idealSpeed, showDecomp) {
    let centerX = 220;
    let centerY = 280;
    let bankWidth = 200;
    let bankHeight = 120;
    let thetaRad = radians(theta);

    // Draw banked surface (side view)
    push();
    translate(centerX, centerY);

    // Surface
    fill('#8B7355');
    stroke('#5D4E37');
    strokeWeight(2);
    beginShape();
    vertex(-bankWidth/2, bankHeight/2);
    vertex(bankWidth/2 * cos(thetaRad), bankHeight/2 - bankWidth/2 * sin(thetaRad));
    vertex(bankWidth/2 * cos(thetaRad), bankHeight/2 - bankWidth/2 * sin(thetaRad) + 30);
    vertex(-bankWidth/2, bankHeight/2 + 30);
    endShape(CLOSE);

    // Horizontal reference line
    stroke('#666');
    strokeWeight(1);
    drawingContext.setLineDash([5, 5]);
    line(-bankWidth/2 - 20, bankHeight/2, bankWidth/2 + 20, bankHeight/2);
    drawingContext.setLineDash([]);

    // Angle arc
    noFill();
    stroke('#333');
    arc(-bankWidth/2, bankHeight/2, 60, 60, -thetaRad, 0);
    fill('#333');
    noStroke();
    textSize(12);
    text('θ=' + theta + '°', -bankWidth/2 + 35, bankHeight/2 - 15);

    // Car position on bank
    let carX = 0;
    let carY = bankHeight/2 - bankWidth/4 * sin(thetaRad) - 30;

    // Car (rectangle rotated with bank)
    push();
    translate(carX, carY);
    rotate(-thetaRad);

    fill('#3498DB');
    stroke('#2980B9');
    strokeWeight(2);
    rectMode(CENTER);
    rect(0, 0, 60, 30, 5);

    // Windshield
    fill('#87CEEB');
    noStroke();
    rect(-10, -5, 20, 10, 2);

    pop();

    // Force scale
    let forceScale = 0.008;

    // Weight (vertical, down)
    let W = m * 9.8;
    let wLen = W * forceScale;
    drawArrow(carX, carY, carX, carY + wLen, '#9B59B6');
    fill('#9B59B6');
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);
    text('mg', carX + 5, carY + wLen - 15);

    // Normal force (perpendicular to surface)
    let nAngle = -thetaRad - PI/2;
    let nLen = N * forceScale;
    let nEndX = carX + nLen * cos(nAngle);
    let nEndY = carY + nLen * sin(nAngle);
    drawArrow(carX, carY, nEndX, nEndY, '#27AE60');
    fill('#27AE60');
    text('N', nEndX - 15, nEndY - 10);

    if (showDecomp) {
        // N sin theta (horizontal, toward center)
        let nSinLen = NsinTheta * forceScale;
        drawDashedArrow(carX, carY, carX - nSinLen, carY, '#3498DB');
        fill('#3498DB');
        textSize(10);
        textAlign(CENTER, TOP);
        text('N sin θ', carX - nSinLen/2, carY + 5);

        // N cos theta (vertical, up)
        let nCosLen = NcosTheta * forceScale;
        drawDashedArrow(carX, carY, carX, carY - nCosLen, '#87CEEB');
        textAlign(LEFT, CENTER);
        text('N cos θ', carX + 5, carY - nCosLen/2);

        // Right angle symbol
        stroke('#3498DB');
        strokeWeight(1);
        noFill();
        let cornerSize = 8;
        rect(carX - nSinLen + cornerSize, carY - nCosLen + cornerSize, -cornerSize, -cornerSize);
    }

    // Friction force (along surface)
    if (abs(friction) > 100) {
        let fAngle = friction > 0 ? -thetaRad + PI : -thetaRad; // down or up slope
        let fLen = min(abs(friction) * forceScale, 50);
        let fEndX = carX + fLen * cos(fAngle);
        let fEndY = carY + fLen * sin(fAngle);
        drawArrow(carX, carY, fEndX, fEndY, '#8B4513');
        fill('#8B4513');
        textSize(10);
        text('f', fEndX + 10 * cos(fAngle + PI/2), fEndY + 10 * sin(fAngle + PI/2));
    }

    // Center label
    fill('#E74C3C');
    textSize(11);
    textAlign(RIGHT, CENTER);
    text('← Center of curve', carX - nLen * 0.6, carY - 5);

    pop();

    // Key equations box
    fill(255, 255, 255, 240);
    stroke('#27AE60');
    strokeWeight(2);
    rect(30, 50, 180, 120, 10);

    fill('#27AE60');
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);
    text('Key Equations:', 40, 58);

    textSize(10);
    fill('#333');
    text('Vertical: N cos θ = mg', 40, 80);
    text('Horizontal: N sin θ + f = Fc', 40, 95);
    text('', 40, 110);
    fill('#E74C3C');
    text('Ideal speed (f = 0):', 40, 115);
    text('v = √(rg tan θ)', 40, 130);
    fill('#27AE60');
    text('= ' + idealSpeed.toFixed(1) + ' m/s', 40, 145);
}

function drawTopView(x, y, size, speed, radius, Fc) {
    push();
    translate(x, y);

    // Background
    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(-size/2 - 10, -size/2 - 25, size + 20, size + 40, 8);

    fill('#333');
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    text('Top View', 0, -size/2 - 20);

    // Circular path
    stroke('#AAA');
    strokeWeight(2);
    drawingContext.setLineDash([5, 5]);
    noFill();
    arc(0, 0, size * 0.8, size * 0.8, PI * 0.3, PI * 1.2);
    drawingContext.setLineDash([]);

    // Car position
    let carAngle = PI * 0.75;
    let carX = size * 0.4 * cos(carAngle);
    let carY = size * 0.4 * sin(carAngle);

    fill('#3498DB');
    stroke('#2980B9');
    strokeWeight(1);
    ellipse(carX, carY, 15, 15);

    // Velocity vector (tangent)
    let tangent = carAngle + PI/2;
    let vLen = min(speed * 2, 40);
    drawSmallArrow(carX, carY, carX + vLen * cos(tangent), carY + vLen * sin(tangent), '#27AE60');

    fill('#27AE60');
    textSize(9);
    text('v', carX + vLen * cos(tangent) + 8, carY + vLen * sin(tangent));

    // Fc toward center
    let toCenter = atan2(-carY, -carX);
    let fcLen = min(Fc * 0.003, 35);
    drawSmallArrow(carX, carY, carX + fcLen * cos(toCenter), carY + fcLen * sin(toCenter), '#E74C3C');

    fill('#E74C3C');
    text('Fc', carX + fcLen * 0.5 * cos(toCenter) + 8, carY + fcLen * 0.5 * sin(toCenter));

    // Center point
    fill('#666');
    noStroke();
    ellipse(0, 0, 6, 6);
    textSize(8);
    text('center', 0, 8);

    pop();
}

function drawInfoPanel(x, y, w, h, theta, r, v, vIdeal, N, NsinTheta, Fc, friction, m, g) {
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

    let lineY = 10;
    let spacing = 16;

    fill('#27AE60');
    text('Force Analysis', 10, lineY);
    lineY += spacing + 3;

    textSize(10);
    fill('#333');
    text('Normal force N = ' + (N/1000).toFixed(2) + ' kN', 10, lineY);
    lineY += spacing;

    fill('#3498DB');
    text('N sin θ = ' + (NsinTheta/1000).toFixed(2) + ' kN', 10, lineY);
    lineY += spacing;

    fill('#333');
    text('Required Fc = ' + (Fc/1000).toFixed(2) + ' kN', 10, lineY);
    lineY += spacing + 5;

    fill('#E74C3C');
    textSize(11);
    text('Speed Analysis', 10, lineY);
    lineY += spacing;

    textSize(10);
    fill('#333');
    text('Current: v = ' + v + ' m/s', 10, lineY);
    lineY += spacing;

    fill('#27AE60');
    text('Ideal: v = ' + vIdeal.toFixed(1) + ' m/s', 10, lineY);
    lineY += spacing + 5;

    fill('#8B4513');
    textSize(11);
    text('Friction Required', 10, lineY);
    lineY += spacing;

    textSize(10);
    fill('#333');
    text('f = Fc - N sin θ', 10, lineY);
    lineY += spacing - 2;

    if (abs(friction) < 100) {
        fill('#27AE60');
        text('f ≈ 0 (at ideal speed!)', 10, lineY);
    } else if (friction > 0) {
        fill('#E74C3C');
        text('f = ' + (friction/1000).toFixed(2) + ' kN ↓slope', 10, lineY);
    } else {
        fill('#F39C12');
        text('f = ' + (-friction/1000).toFixed(2) + ' kN ↑slope', 10, lineY);
    }

    pop();
}

function drawArrow(x1, y1, x2, y2, col) {
    let headSize = 7;
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
}

function drawDashedArrow(x1, y1, x2, y2, col) {
    let headSize = 6;
    let angle = atan2(y2 - y1, x2 - x1);

    stroke(col);
    strokeWeight(2);
    drawingContext.setLineDash([4, 4]);
    line(x1, y1, x2, y2);
    drawingContext.setLineDash([]);

    fill(col);
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -headSize * 1.5, -headSize/2, -headSize * 1.5, headSize/2);
    pop();
}

function drawSmallArrow(x1, y1, x2, y2, col) {
    let headSize = 5;
    let angle = atan2(y2 - y1, x2 - x1);

    stroke(col);
    strokeWeight(2);
    line(x1, y1, x2, y2);

    fill(col);
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -headSize, -headSize/2, -headSize, headSize/2);
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
