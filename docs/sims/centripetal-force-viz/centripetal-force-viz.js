// Centripetal Force and Acceleration Visualization
// Shows velocity, acceleration, and force vectors for circular motion

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let speedSlider, radiusSlider, massSlider;
let showGhostsCheckbox;
let angle = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    speedSlider = createSlider(2, 15, 8, 0.5);
    speedSlider.position(100, drawHeight + 12);
    speedSlider.size(130);

    radiusSlider = createSlider(50, 150, 100, 10);
    radiusSlider.position(100, drawHeight + 42);
    radiusSlider.size(130);

    massSlider = createSlider(1, 10, 2, 0.5);
    massSlider.position(100, drawHeight + 72);
    massSlider.size(130);

    showGhostsCheckbox = createCheckbox(' Show path positions', true);
    showGhostsCheckbox.position(260, drawHeight + 20);
    showGhostsCheckbox.style('font-size', '13px');

    describe('Visualization of velocity, centripetal acceleration, and force for circular motion', LABEL);
}

function draw() {
    updateCanvasSize();

    let speed = speedSlider.value();
    let radius = radiusSlider.value();
    let mass = massSlider.value();

    // Update angle
    let omega = speed / radius;
    angle += omega * 0.02;

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
    text('Centripetal Force and Acceleration', canvasWidth * 0.35, 10);

    // Calculate physics
    let ac = speed * speed / radius;
    let Fc = mass * ac;

    // Draw circular path and object
    drawCircularMotion(speed, radius, mass, ac, Fc, showGhostsCheckbox.checked());

    // Draw info panel
    drawInfoPanel(canvasWidth - 240, 50, 220, 280, speed, radius, mass, ac, Fc, omega);

    // Control labels
    fill('black');
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Speed: ' + speed.toFixed(1) + ' m/s', 10, drawHeight + 19);
    text('Radius: ' + radius + ' m', 10, drawHeight + 49);
    text('Mass: ' + mass.toFixed(1) + ' kg', 10, drawHeight + 79);
}

function drawCircularMotion(speed, radius, mass, ac, Fc, showGhosts) {
    let centerX = 280;
    let centerY = 240;
    let displayRadius = radius * 1.2;

    // Circular path
    stroke('#AAA');
    strokeWeight(2);
    drawingContext.setLineDash([8, 8]);
    noFill();
    ellipse(centerX, centerY, displayRadius * 2, displayRadius * 2);
    drawingContext.setLineDash([]);

    // Center point
    fill('#666');
    noStroke();
    ellipse(centerX, centerY, 10, 10);
    textSize(11);
    textAlign(CENTER, TOP);
    text('Center', centerX, centerY + 10);

    // Direction arrow on path
    stroke('#AAA');
    strokeWeight(1);
    let arcAngle = angle + PI/4;
    let arcX = centerX + displayRadius * cos(arcAngle);
    let arcY = centerY + displayRadius * sin(arcAngle);
    let tangentAngle = arcAngle + PI/2;
    drawSmallArrow(arcX, arcY, arcX + 15 * cos(tangentAngle), arcY + 15 * sin(tangentAngle), '#AAA');

    // Ghost positions showing velocity changes
    if (showGhosts) {
        let ghostAngles = [0, PI/2, PI, 3*PI/2];
        for (let ga of ghostAngles) {
            let gx = centerX + displayRadius * cos(ga);
            let gy = centerY + displayRadius * sin(ga);

            // Ghost ball
            fill(100, 150, 255, 100);
            noStroke();
            ellipse(gx, gy, 20, 20);

            // Velocity vector (tangent)
            let tangent = ga + PI/2;
            let vLen = min(speed * 4, 50);
            drawArrow(gx, gy, gx + vLen * cos(tangent), gy + vLen * sin(tangent), '#27AE6080');

            // Acceleration/Force toward center
            let toCenter = atan2(centerY - gy, centerX - gx);
            let aLen = min(ac * 3, 40);
            drawArrow(gx, gy, gx + aLen * cos(toCenter), gy + aLen * sin(toCenter), '#3498DB80');
        }
    }

    // Current object position
    let objX = centerX + displayRadius * cos(angle);
    let objY = centerY + displayRadius * sin(angle);

    // Object (ball)
    fill('#E74C3C');
    stroke('#C0392B');
    strokeWeight(2);
    ellipse(objX, objY, 25, 25);

    // Radius line
    stroke('#666');
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(centerX, centerY, objX, objY);
    drawingContext.setLineDash([]);

    // Radius label
    fill('#666');
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    let midX = (centerX + objX) / 2;
    let midY = (centerY + objY) / 2;
    text('r', midX + 10, midY - 10);

    // Velocity vector (tangent to circle)
    let tangentAngle2 = angle + PI/2;
    let vLen = min(speed * 5, 70);
    let vEndX = objX + vLen * cos(tangentAngle2);
    let vEndY = objY + vLen * sin(tangentAngle2);
    drawArrow(objX, objY, vEndX, vEndY, '#27AE60');

    // Velocity label
    fill('#27AE60');
    textSize(12);
    textAlign(CENTER, CENTER);
    text('v', vEndX + 10 * cos(tangentAngle2), vEndY + 10 * sin(tangentAngle2));

    // Centripetal acceleration (toward center)
    let toCenter = atan2(centerY - objY, centerX - objX);
    let aLen = min(ac * 4, 60);
    let aEndX = objX + aLen * cos(toCenter);
    let aEndY = objY + aLen * sin(toCenter);
    drawArrow(objX, objY, aEndX, aEndY, '#3498DB');

    // ac label
    fill('#3498DB');
    text('ac', aEndX + 15 * cos(toCenter), aEndY + 15 * sin(toCenter));

    // Centripetal force (parallel to ac)
    let fLen = min(Fc * 3, 55);
    let fEndX = objX + fLen * cos(toCenter);
    let fEndY = objY + fLen * sin(toCenter);

    // Draw Fc slightly offset
    let offsetAngle = toCenter + PI/2;
    let offset = 5;
    drawArrow(objX + offset * cos(offsetAngle), objY + offset * sin(offsetAngle),
              fEndX + offset * cos(offsetAngle), fEndY + offset * sin(offsetAngle), '#E74C3C');

    fill('#E74C3C');
    text('Fc', fEndX + offset * cos(offsetAngle) + 15 * cos(toCenter),
               fEndY + offset * sin(offsetAngle) + 15 * sin(toCenter));

    // Key insight box
    fill(255, 255, 255, 240);
    stroke('#27AE60');
    strokeWeight(2);
    rect(30, 40, 200, 100, 10);

    fill('#27AE60');
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);
    text('Key Insights:', 40, 50);

    textSize(10);
    fill('#333');
    text('• Velocity v is tangent to path', 40, 70);
    text('• ac and Fc point toward center', 40, 85);
    text('• v ⊥ ac (perpendicular)', 40, 100);
    text('• Constant |v|, changing direction', 40, 115);
}

function drawInfoPanel(x, y, w, h, v, r, m, ac, Fc, omega) {
    push();
    translate(x, y);

    fill(255, 255, 255, 245);
    stroke(200);
    strokeWeight(1);
    rect(0, 0, w, h, 10);

    fill('#333');
    noStroke();
    textSize(13);
    textAlign(LEFT, TOP);

    let lineY = 10;
    let spacing = 18;

    fill('#27AE60');
    text('Velocity', 10, lineY);
    lineY += spacing;

    textSize(11);
    fill('#333');
    text('v = ' + v.toFixed(1) + ' m/s (tangent)', 10, lineY);
    lineY += spacing;
    text('ω = v/r = ' + omega.toFixed(2) + ' rad/s', 10, lineY);
    lineY += spacing + 8;

    fill('#3498DB');
    textSize(12);
    text('Centripetal Acceleration', 10, lineY);
    lineY += spacing;

    textSize(11);
    fill('#333');
    text('ac = v²/r', 10, lineY);
    lineY += spacing - 3;
    text('ac = ' + v.toFixed(1) + '² / ' + r, 10, lineY);
    lineY += spacing - 3;
    fill('#3498DB');
    text('ac = ' + ac.toFixed(2) + ' m/s²', 10, lineY);
    lineY += spacing + 8;

    fill('#E74C3C');
    textSize(12);
    text('Centripetal Force', 10, lineY);
    lineY += spacing;

    textSize(11);
    fill('#333');
    text('Fc = mac = mv²/r', 10, lineY);
    lineY += spacing - 3;
    text('Fc = ' + m.toFixed(1) + ' × ' + ac.toFixed(2), 10, lineY);
    lineY += spacing - 3;
    fill('#E74C3C');
    text('Fc = ' + Fc.toFixed(1) + ' N', 10, lineY);
    lineY += spacing + 8;

    fill('#9B59B6');
    textSize(11);
    text('Alternative form:', 10, lineY);
    lineY += spacing - 3;
    text('ac = ω²r = ' + (omega * omega * r).toFixed(2) + ' m/s²', 10, lineY);

    pop();
}

function drawArrow(x1, y1, x2, y2, col) {
    let headSize = 8;
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

function drawSmallArrow(x1, y1, x2, y2, col) {
    let headSize = 5;
    let angle = atan2(y2 - y1, x2 - x1);

    stroke(col);
    strokeWeight(1);
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
