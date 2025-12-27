// Normal Force on Inclined Planes MicroSim
// Shows how normal force changes with incline angle

let canvasWidth = 900;
let drawHeight = 480;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let angleSlider;
let massSlider;
let currentAngle = 30;
let currentMass = 5;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    angleSlider = createSlider(0, 80, 30, 1);
    angleSlider.position(100, drawHeight + 12);
    angleSlider.size(180);

    massSlider = createSlider(1, 20, 5, 0.5);
    massSlider.position(100, drawHeight + 42);
    massSlider.size(180);

    describe('Interactive demonstration of normal force on inclined planes', LABEL);
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
    textSize(22);
    textAlign(CENTER, TOP);
    text('Normal Force on Inclined Planes', canvasWidth / 2, 10);

    currentAngle = angleSlider.value();
    currentMass = massSlider.value();

    // Draw the inclined plane scenario
    drawInclinedPlane();

    // Draw the right panel with multiple angles comparison
    drawAngleComparison();

    // Control labels
    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text('Angle: ' + currentAngle + '°', 10, drawHeight + 19);
    text('Mass: ' + currentMass.toFixed(1) + ' kg', 10, drawHeight + 49);

    // Key equations
    textAlign(LEFT, CENTER);
    fill('#3498DB');
    text('N = mg cos(θ)  |  W∥ = mg sin(θ)', 300, drawHeight + 30);
}

function drawInclinedPlane() {
    let baseX = 80;
    let baseY = 400;
    let planeWidth = 320;
    let angleRad = radians(currentAngle);

    // Calculate plane height
    let planeHeight = planeWidth * tan(angleRad);

    // Draw inclined plane
    fill('#8B4513');
    stroke('#5D3A1A');
    strokeWeight(2);
    beginShape();
    vertex(baseX, baseY);
    vertex(baseX + planeWidth, baseY);
    vertex(baseX + planeWidth, baseY - planeHeight);
    endShape(CLOSE);

    // Draw angle arc
    noFill();
    stroke('#333');
    strokeWeight(1);
    arc(baseX + planeWidth, baseY, 60, 60, -PI + angleRad, 0);

    // Angle label
    fill('black');
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text('θ = ' + currentAngle + '°', baseX + planeWidth - 45, baseY - 20);

    // Box position on slope
    let boxPosRatio = 0.5;
    let boxOnSlopeX = baseX + planeWidth * boxPosRatio;
    let boxOnSlopeY = baseY - (planeWidth * boxPosRatio) * tan(angleRad);

    // Draw box
    push();
    translate(boxOnSlopeX, boxOnSlopeY);
    rotate(-angleRad);

    fill('#4169E1');
    stroke('#2c3e80');
    strokeWeight(2);
    rect(-30, -40, 60, 40, 5);

    fill('white');
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(currentMass.toFixed(1) + ' kg', 0, -20);

    pop();

    // Calculate forces
    let g = 9.8;
    let weight = currentMass * g;
    let wParallel = weight * sin(angleRad);
    let wPerp = weight * cos(angleRad);
    let normal = wPerp;

    // Force scale
    let scale = 2.5;
    let weightLen = weight * scale;
    let normalLen = normal * scale;
    let wParLen = wParallel * scale;
    let wPerpLen = wPerp * scale;

    // Draw weight vector (straight down)
    let forceStartX = boxOnSlopeX;
    let forceStartY = boxOnSlopeY - 20;

    drawArrow(forceStartX, forceStartY, forceStartX, forceStartY + weightLen, '#E74C3C', 'W = ' + weight.toFixed(0) + ' N');

    // Draw weight components (dashed)
    stroke('#E74C3C');
    strokeWeight(1);
    drawingContext.setLineDash([5, 5]);

    // Parallel component direction (down the slope)
    let parEndX = forceStartX - wParLen * cos(angleRad);
    let parEndY = forceStartY + wParLen * sin(angleRad);

    // Perpendicular component direction (into slope)
    let perpEndX = forceStartX + wPerpLen * sin(angleRad);
    let perpEndY = forceStartY + wPerpLen * cos(angleRad);

    // Draw component construction lines
    line(forceStartX, forceStartY + weightLen, parEndX, forceStartY + weightLen);
    drawingContext.setLineDash([]);

    // Draw parallel component arrow (down the slope)
    drawArrow(forceStartX, forceStartY, parEndX, parEndY, '#F39C12', 'W∥ = ' + wParallel.toFixed(0) + ' N');

    // Draw normal force (perpendicular to surface, pointing away)
    let normEndX = forceStartX - normalLen * sin(angleRad);
    let normEndY = forceStartY - normalLen * cos(angleRad);
    drawArrow(forceStartX, forceStartY, normEndX, normEndY, '#27AE60', 'N = ' + normal.toFixed(0) + ' N');

    // Draw coordinate axes
    push();
    translate(boxOnSlopeX + 80, boxOnSlopeY - 80);
    rotate(-angleRad);

    stroke('#666');
    strokeWeight(1);
    // X-axis (along slope)
    line(-30, 0, 50, 0);
    fill('#666');
    noStroke();
    triangle(50, 0, 42, -4, 42, 4);
    textSize(12);
    text('x', 55, 5);

    // Y-axis (perpendicular to slope)
    stroke('#666');
    line(0, 10, 0, -50);
    fill('#666');
    noStroke();
    triangle(0, -50, -4, -42, 4, -42);
    text('y', 5, -55);

    pop();
}

function drawAngleComparison() {
    let px = 480;
    let py = 70;
    let pw = 400;
    let ph = 360;

    // Panel background
    fill(255, 255, 255, 240);
    stroke('#3498DB');
    strokeWeight(2);
    rect(px, py, pw, ph, 10);

    // Title
    fill('#3498DB');
    noStroke();
    textSize(16);
    textAlign(CENTER, TOP);
    text('Normal Force vs Angle', px + pw/2, py + 10);

    // Draw mini diagrams for 0°, 30°, 60°, 90°
    let angles = [0, 30, 60, 90];
    let miniWidth = 80;
    let startX = px + 30;
    let startY = py + 55;

    for (let i = 0; i < angles.length; i++) {
        let angle = angles[i];
        let mx = startX + i * (miniWidth + 15);
        let my = startY;

        // Mini incline
        let angleRad = radians(angle);
        let h = 40 * sin(angleRad);

        fill('#DEB887');
        stroke('#8B4513');
        strokeWeight(1);

        if (angle < 90) {
            beginShape();
            vertex(mx, my + 50);
            vertex(mx + 60, my + 50);
            vertex(mx + 60, my + 50 - h);
            endShape(CLOSE);
        } else {
            rect(mx + 25, my + 10, 10, 40);
        }

        // Mini box
        fill('#4169E1');
        noStroke();
        if (angle < 90) {
            push();
            translate(mx + 30, my + 50 - h/2 - 5);
            rotate(-angleRad);
            rect(-10, -10, 20, 15, 2);
            pop();
        } else {
            rect(mx + 20, my + 20, 20, 15, 2);
        }

        // Angle label
        fill('#333');
        textSize(12);
        textAlign(CENTER, TOP);
        text('θ = ' + angle + '°', mx + 30, my + 55);

        // Calculate N for this angle
        let normalRatio = cos(angleRad);
        let normalPercent = (normalRatio * 100).toFixed(0);

        // N value
        fill('#27AE60');
        textSize(11);
        text('N = ' + normalPercent + '% mg', mx + 30, my + 72);
    }

    // Graph: N vs θ
    let gx = px + 30;
    let gy = py + 140;
    let gw = 340;
    let gh = 140;

    // Graph background
    fill('white');
    stroke('#ccc');
    strokeWeight(1);
    rect(gx, gy, gw, gh);

    // Grid lines
    stroke('#eee');
    for (let a = 0; a <= 90; a += 15) {
        let x = map(a, 0, 90, gx, gx + gw);
        line(x, gy, x, gy + gh);
    }
    for (let n = 0; n <= 1; n += 0.25) {
        let y = map(n, 0, 1, gy + gh, gy);
        line(gx, y, gx + gw, y);
    }

    // Axes labels
    fill('#333');
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    for (let a = 0; a <= 90; a += 30) {
        let x = map(a, 0, 90, gx, gx + gw);
        text(a + '°', x, gy + gh + 3);
    }
    textAlign(RIGHT, CENTER);
    text('mg', gx - 5, gy);
    text('0', gx - 5, gy + gh);

    // Draw N = mg cos(θ) curve
    stroke('#27AE60');
    strokeWeight(2);
    noFill();
    beginShape();
    for (let a = 0; a <= 90; a++) {
        let x = map(a, 0, 90, gx, gx + gw);
        let n = cos(radians(a));
        let y = map(n, 0, 1, gy + gh, gy);
        vertex(x, y);
    }
    endShape();

    // Current point
    let currentX = map(currentAngle, 0, 90, gx, gx + gw);
    let currentN = cos(radians(currentAngle));
    let currentY = map(currentN, 0, 1, gy + gh, gy);

    fill('#9B59B6');
    noStroke();
    ellipse(currentX, currentY, 12, 12);

    // Current value annotation
    fill('#9B59B6');
    textSize(11);
    textAlign(LEFT, BOTTOM);
    text('θ=' + currentAngle + '°, N=' + (currentN * 100).toFixed(0) + '%mg', currentX + 8, currentY - 5);

    // Equation panel
    fill('#FFF3CD');
    stroke('#FFC107');
    strokeWeight(1);
    rect(px + 20, py + ph - 70, pw - 40, 55, 5);

    fill('#856404');
    textSize(13);
    textAlign(LEFT, TOP);
    text('Key Equations:', px + 30, py + ph - 62);
    textSize(12);
    text('N = mg cos(θ)  →  Normal force decreases as θ increases', px + 30, py + ph - 42);
    text('At θ = 0°: N = mg  |  At θ = 90°: N = 0', px + 30, py + ph - 24);
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

    // Label
    if (label) {
        textSize(11);
        textAlign(CENTER, CENTER);
        fill(col);
        let midX = (x1 + x2) / 2;
        let midY = (y1 + y2) / 2;
        let perpAngle = angle + PI/2;
        text(label, midX + cos(perpAngle) * 30, midY + sin(perpAngle) * 30);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.min(container.offsetWidth, 900);
    }
}
