// Vector Components Diagram MicroSim
// Shows how 2D vectors decompose into x and y components

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Vector parameters
let magnitude = 50;
let angle = 45;

// UI Controls
let magnitudeSlider, angleSlider;
let showComponentsCheckbox, showTriangleCheckbox;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Create controls
    magnitudeSlider = createSlider(10, 100, 50, 1);
    magnitudeSlider.position(140, drawHeight + 15);
    magnitudeSlider.style('width', '150px');

    angleSlider = createSlider(0, 360, 45, 1);
    angleSlider.position(140, drawHeight + 50);
    angleSlider.style('width', '150px');

    showComponentsCheckbox = createCheckbox('Show Components', true);
    showComponentsCheckbox.position(350, drawHeight + 15);
    showComponentsCheckbox.style('font-size', '14px');

    showTriangleCheckbox = createCheckbox('Show Triangle', true);
    showTriangleCheckbox.position(350, drawHeight + 45);
    showTriangleCheckbox.style('font-size', '14px');

    describe('Vector components diagram showing how a 2D vector decomposes into horizontal and vertical components.', LABEL);
}

function draw() {
    updateCanvasSize();

    magnitude = magnitudeSlider.value();
    angle = angleSlider.value();

    // Background
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
    text('Vector Components: Breaking Vectors into x and y', canvasWidth / 2, 10);

    // Draw coordinate system
    let originX = canvasWidth / 2 - 100;
    let originY = drawHeight / 2 + 50;
    let scale = 2; // pixels per unit

    drawCoordinateSystem(originX, originY, scale);

    // Calculate components
    let angleRad = radians(angle);
    let vx = magnitude * cos(angleRad);
    let vy = magnitude * sin(angleRad);

    // Draw vector and components
    drawVector(originX, originY, magnitude, angle, scale, vx, vy);

    // Draw info panel
    drawInfoPanel(canvasWidth - 220, 60, 200, 300, vx, vy);

    // Draw formulas
    drawFormulas(margin + 20, 60, vx, vy);

    // Control labels
    fill(0);
    textSize(14);
    textAlign(LEFT, CENTER);
    noStroke();
    text('Magnitude: ' + magnitude, margin, drawHeight + 25);
    text('Angle: ' + angle + '\u00B0', margin, drawHeight + 60);
}

function drawCoordinateSystem(ox, oy, scale) {
    let axisLen = 120 * scale;

    // Grid
    stroke(230);
    strokeWeight(1);
    for (let i = -100; i <= 100; i += 20) {
        let x = ox + i * scale;
        let y = oy - i * scale;
        if (x > margin && x < canvasWidth - 250) {
            line(x, oy - axisLen, x, oy + axisLen / 2);
        }
        if (y > 50 && y < drawHeight - 50) {
            line(ox - axisLen / 2, y, ox + axisLen, y);
        }
    }

    // Axes
    stroke(0);
    strokeWeight(2);
    // X-axis
    line(ox - 20, oy, ox + axisLen, oy);
    // Y-axis
    line(ox, oy + 20, ox, oy - axisLen);

    // Arrowheads
    fill(0);
    noStroke();
    // X arrow
    triangle(ox + axisLen, oy, ox + axisLen - 10, oy - 5, ox + axisLen - 10, oy + 5);
    // Y arrow
    triangle(ox, oy - axisLen, ox - 5, oy - axisLen + 10, ox + 5, oy - axisLen + 10);

    // Labels
    textSize(16);
    textAlign(CENTER, TOP);
    text('x', ox + axisLen + 10, oy - 8);
    textAlign(RIGHT, CENTER);
    text('y', ox - 10, oy - axisLen);

    // Origin
    textAlign(LEFT, TOP);
    textSize(12);
    text('O', ox + 5, oy + 5);
}

function drawVector(ox, oy, mag, ang, scale, vx, vy) {
    let angleRad = radians(ang);
    let endX = ox + vx * scale;
    let endY = oy - vy * scale; // Flip y for screen coordinates

    // Draw components first (if enabled)
    if (showComponentsCheckbox.checked()) {
        // X component
        stroke(200, 50, 50);
        strokeWeight(4);
        line(ox, oy, ox + vx * scale, oy);

        // Arrowhead for x
        fill(200, 50, 50);
        noStroke();
        let xDir = vx >= 0 ? 1 : -1;
        push();
        translate(ox + vx * scale, oy);
        rotate(xDir > 0 ? 0 : PI);
        triangle(0, 0, -10, -5, -10, 5);
        pop();

        // Y component
        stroke(50, 50, 200);
        strokeWeight(4);
        line(ox + vx * scale, oy, endX, endY);

        // Arrowhead for y
        fill(50, 50, 200);
        noStroke();
        let yDir = vy >= 0 ? -1 : 1;
        push();
        translate(endX, endY);
        rotate(yDir < 0 ? -HALF_PI : HALF_PI);
        triangle(0, 0, -10, -5, -10, 5);
        pop();

        // Component labels
        textSize(14);
        textAlign(CENTER, TOP);
        fill(200, 50, 50);
        text('vx', ox + vx * scale / 2, oy + 10);
        textAlign(LEFT, CENTER);
        fill(50, 50, 200);
        text('vy', endX + 10, oy - vy * scale / 2);
    }

    // Draw right angle triangle (if enabled)
    if (showTriangleCheckbox.checked() && showComponentsCheckbox.checked()) {
        stroke(150, 150, 150);
        strokeWeight(1);
        setLineDash([5, 5]);
        line(ox, oy, ox + vx * scale, oy);
        line(ox + vx * scale, oy, endX, endY);
        setLineDash([]);

        // Right angle marker
        let markerSize = 10;
        let signX = vx >= 0 ? 1 : -1;
        let signY = vy >= 0 ? 1 : -1;
        noFill();
        stroke(100);
        rect(ox + vx * scale - markerSize * signX, oy - markerSize * signY, markerSize * signX, markerSize * signY);
    }

    // Draw main vector
    stroke(100, 50, 150);
    strokeWeight(5);
    line(ox, oy, endX, endY);

    // Vector arrowhead
    fill(100, 50, 150);
    noStroke();
    push();
    translate(endX, endY);
    rotate(-angleRad);
    triangle(0, 0, -15, -7, -15, 7);
    pop();

    // Draw angle arc
    noFill();
    stroke(0, 150, 0);
    strokeWeight(2);
    let arcRadius = 40;
    arc(ox, oy, arcRadius * 2, arcRadius * 2, -angleRad, 0);

    // Angle label
    fill(0, 150, 0);
    noStroke();
    textSize(14);
    let labelAngle = -angleRad / 2;
    let labelR = arcRadius + 15;
    text('\u03B8', ox + labelR * cos(labelAngle), oy + labelR * sin(labelAngle));

    // Vector label
    fill(100, 50, 150);
    textSize(16);
    textAlign(LEFT, CENTER);
    let labelX = ox + (vx * scale) / 2 - 20;
    let labelY = oy - (vy * scale) / 2 - 15;
    text('v', labelX, labelY);
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function drawInfoPanel(x, y, w, h, vx, vy) {
    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 10);

    textAlign(LEFT, TOP);
    let lineY = y + 15;
    let lineH = 28;

    fill(0);
    textSize(15);
    text('Vector Properties:', x + 15, lineY);
    lineY += lineH + 5;

    textSize(14);
    fill(100, 50, 150);
    text('Magnitude |v|:', x + 15, lineY);
    textAlign(RIGHT, TOP);
    text(magnitude.toFixed(1), x + w - 15, lineY);
    lineY += lineH;

    textAlign(LEFT, TOP);
    fill(0, 150, 0);
    text('Angle \u03B8:', x + 15, lineY);
    textAlign(RIGHT, TOP);
    text(angle + '\u00B0', x + w - 15, lineY);
    lineY += lineH + 10;

    // Components
    textAlign(LEFT, TOP);
    fill(0);
    textSize(15);
    text('Components:', x + 15, lineY);
    lineY += lineH;

    textSize(14);
    fill(200, 50, 50);
    text('vx = v cos(\u03B8):', x + 15, lineY);
    textAlign(RIGHT, TOP);
    text(vx.toFixed(1), x + w - 15, lineY);
    lineY += lineH;

    textAlign(LEFT, TOP);
    fill(50, 50, 200);
    text('vy = v sin(\u03B8):', x + 15, lineY);
    textAlign(RIGHT, TOP);
    text(vy.toFixed(1), x + w - 15, lineY);
    lineY += lineH + 15;

    // Verify magnitude
    textAlign(LEFT, TOP);
    fill(80);
    textSize(12);
    text('Verify: \u221A(vx\u00B2 + vy\u00B2)', x + 15, lineY);
    lineY += 20;
    let calcMag = sqrt(vx * vx + vy * vy);
    text('= ' + calcMag.toFixed(1), x + 25, lineY);
}

function drawFormulas(x, y, vx, vy) {
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(x, y, 200, 120, 10);

    fill(0);
    textSize(14);
    textAlign(LEFT, TOP);
    text('Formulas:', x + 15, y + 10);

    textSize(13);
    fill(60);
    let lineY = y + 35;
    text('vx = v \u00B7 cos(\u03B8)', x + 15, lineY);
    lineY += 22;
    text('vy = v \u00B7 sin(\u03B8)', x + 15, lineY);
    lineY += 28;
    text('v = \u221A(vx\u00B2 + vy\u00B2)', x + 15, lineY);
    lineY += 22;
    text('\u03B8 = tan\u207B\u00B9(vy / vx)', x + 15, lineY);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    magnitudeSlider.style('width', min(150, canvasWidth / 4) + 'px');
    angleSlider.style('width', min(150, canvasWidth / 4) + 'px');
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 900);
    }
}
