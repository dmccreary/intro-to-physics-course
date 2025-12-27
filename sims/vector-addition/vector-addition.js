// Vector Addition Interactive MicroSim
// Demonstrates graphical (tip-to-tail) and component methods of vector addition

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 520;
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;

// Panel dimensions
let panelWidth;
let panelHeight = 480;
let panelY = 35;

// Grid settings
let gridSize = 25;  // pixels per grid unit
let scale = 2.5;    // pixels per meter

// Vector parameters
let mag1 = 60, angle1 = 30;   // Vector 1: magnitude and angle
let mag2 = 40, angle2 = 120;  // Vector 2: magnitude and angle

// UI elements
let mag1Slider, angle1Slider;
let mag2Slider, angle2Slider;
let showComponentsCheckbox;
let showCalculationsCheckbox;
let animateTipToTailCheckbox;
let resetButton;

// Animation
let animationProgress = 1;  // 0 to 1
let isAnimating = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    panelWidth = (canvasWidth - 30) / 2;

    createControls();

    describe('Interactive vector addition visualization showing both graphical tip-to-tail method and component calculation method', LABEL);
}

function createControls() {
    let sliderWidth = 100;
    let y1 = drawHeight + 15;
    let y2 = drawHeight + 45;
    let y3 = drawHeight + 75;
    let y4 = drawHeight + 105;

    // Vector 1 controls
    mag1Slider = createSlider(0, 100, 60, 1);
    mag1Slider.position(100, y1);
    mag1Slider.size(sliderWidth);

    angle1Slider = createSlider(0, 360, 30, 1);
    angle1Slider.position(100, y2);
    angle1Slider.size(sliderWidth);

    // Vector 2 controls
    mag2Slider = createSlider(0, 100, 40, 1);
    mag2Slider.position(320, y1);
    mag2Slider.size(sliderWidth);

    angle2Slider = createSlider(0, 360, 120, 1);
    angle2Slider.position(320, y2);
    angle2Slider.size(sliderWidth);

    // Checkboxes
    showComponentsCheckbox = createCheckbox(' Show Components', true);
    showComponentsCheckbox.position(540, y1);
    showComponentsCheckbox.style('font-size', '13px');

    showCalculationsCheckbox = createCheckbox(' Show Calculations', true);
    showCalculationsCheckbox.position(540, y2);
    showCalculationsCheckbox.style('font-size', '13px');

    animateTipToTailCheckbox = createCheckbox(' Animate Tip-to-Tail', false);
    animateTipToTailCheckbox.position(540, y3);
    animateTipToTailCheckbox.style('font-size', '13px');
    animateTipToTailCheckbox.changed(startAnimation);

    // Reset button
    resetButton = createButton('Reset to Example');
    resetButton.position(700, y1 + 15);
    resetButton.mousePressed(resetToDefault);
}

function startAnimation() {
    if (animateTipToTailCheckbox.checked()) {
        animationProgress = 0;
        isAnimating = true;
    }
}

function resetToDefault() {
    mag1 = 60; angle1 = 30;
    mag2 = 40; angle2 = 120;
    mag1Slider.value(60);
    angle1Slider.value(30);
    mag2Slider.value(40);
    angle2Slider.value(120);
    showComponentsCheckbox.checked(true);
    showCalculationsCheckbox.checked(true);
    animateTipToTailCheckbox.checked(false);
    animationProgress = 1;
    isAnimating = false;
}

function draw() {
    updateCanvasSize();

    // Get current values
    mag1 = mag1Slider.value();
    angle1 = angle1Slider.value();
    mag2 = mag2Slider.value();
    angle2 = angle2Slider.value();

    // Update animation
    if (isAnimating) {
        animationProgress += 0.02;
        if (animationProgress >= 1) {
            animationProgress = 1;
            isAnimating = false;
        }
    }

    // Drawing area background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Draw title
    fill('black');
    textSize(20);
    textAlign(CENTER, TOP);
    noStroke();
    text('Vector Addition: Graphical vs Component Method', canvasWidth / 2, 8);

    // Draw panels
    drawGraphicalPanel();
    drawComponentPanel();

    // Draw control labels
    drawControlLabels();
}

function drawGraphicalPanel() {
    let panelX = 10;

    // Panel background
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    // Panel title
    fill(50);
    noStroke();
    textSize(14);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Graphical Method (Tip-to-Tail)', panelX + panelWidth/2, panelY + 5);
    textStyle(NORMAL);

    // Calculate origin position (center-left of panel)
    let originX = panelX + panelWidth * 0.35;
    let originY = panelY + panelHeight * 0.55;

    // Draw grid
    drawGrid(panelX + 10, panelY + 25, panelWidth - 20, panelHeight - 35, originX, originY);

    // Calculate vector endpoints
    let angle1Rad = radians(angle1);
    let angle2Rad = radians(angle2);

    let v1x = mag1 * scale * cos(angle1Rad);
    let v1y = -mag1 * scale * sin(angle1Rad);
    let v2x = mag2 * scale * cos(angle2Rad);
    let v2y = -mag2 * scale * sin(angle2Rad);

    // Vector 1 end point
    let end1X = originX + v1x;
    let end1Y = originY + v1y;

    // Vector 2 position (animated tip-to-tail)
    let v2StartX, v2StartY;
    if (animateTipToTailCheckbox.checked()) {
        v2StartX = lerp(originX, end1X, animationProgress);
        v2StartY = lerp(originY, end1Y, animationProgress);
    } else {
        v2StartX = end1X;
        v2StartY = end1Y;
    }

    let end2X = v2StartX + v2x;
    let end2Y = v2StartY + v2y;

    // Resultant end point (always from origin)
    let resEndX = originX + v1x + v2x;
    let resEndY = originY + v1y + v2y;

    // Draw components if enabled
    if (showComponentsCheckbox.checked()) {
        // Vector 1 components
        drawDashedLine(originX, originY, originX + v1x, originY, color(100, 100, 200, 150), 2);
        drawDashedLine(originX + v1x, originY, end1X, end1Y, color(100, 100, 200, 150), 2);

        // Vector 2 components
        drawDashedLine(v2StartX, v2StartY, v2StartX + v2x, v2StartY, color(100, 180, 100, 150), 2);
        drawDashedLine(v2StartX + v2x, v2StartY, end2X, end2Y, color(100, 180, 100, 150), 2);
    }

    // Draw Vector 1 (blue)
    drawVector(originX, originY, end1X, end1Y, color(30, 100, 200), 3, 'V₁');

    // Draw Vector 2 (green) - from tip of V1
    drawVector(v2StartX, v2StartY, end2X, end2Y, color(30, 160, 60), 3, 'V₂');

    // Draw Resultant (red) - from origin to final point
    if (animationProgress >= 1 || !animateTipToTailCheckbox.checked()) {
        drawVector(originX, originY, resEndX, resEndY, color(200, 50, 50), 4, 'R');
    }

    // Origin label
    fill(80);
    textSize(11);
    textAlign(RIGHT, TOP);
    text('Origin', originX - 5, originY + 5);
}

function drawComponentPanel() {
    let panelX = panelWidth + 20;

    // Panel background
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    // Panel title
    fill(50);
    noStroke();
    textSize(14);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Component Method', panelX + panelWidth/2, panelY + 5);
    textStyle(NORMAL);

    // Calculate origin position
    let originX = panelX + panelWidth * 0.3;
    let originY = panelY + panelHeight * 0.45;

    // Draw smaller grid
    drawGrid(panelX + 10, panelY + 25, panelWidth * 0.55, panelHeight * 0.5, originX, originY);

    // Calculate vectors
    let angle1Rad = radians(angle1);
    let angle2Rad = radians(angle2);

    let v1x = mag1 * cos(angle1Rad);
    let v1y = mag1 * sin(angle1Rad);
    let v2x = mag2 * cos(angle2Rad);
    let v2y = mag2 * sin(angle2Rad);

    let rx = v1x + v2x;
    let ry = v1y + v2y;
    let rMag = sqrt(rx * rx + ry * ry);
    let rAngle = degrees(atan2(ry, rx));
    if (rAngle < 0) rAngle += 360;

    // Scale for drawing
    let drawScale = 1.8;

    // Draw both vectors from origin (light)
    let v1EndX = originX + v1x * drawScale;
    let v1EndY = originY - v1y * drawScale;
    let v2EndX = originX + v2x * drawScale;
    let v2EndY = originY - v2y * drawScale;

    // Components as dashed lines
    if (showComponentsCheckbox.checked()) {
        // V1 components
        drawDashedLine(originX, originY, originX + v1x * drawScale, originY, color(100, 100, 200, 120), 1);
        drawDashedLine(originX + v1x * drawScale, originY, v1EndX, v1EndY, color(100, 100, 200, 120), 1);

        // V2 components
        drawDashedLine(originX, originY, originX + v2x * drawScale, originY, color(100, 180, 100, 120), 1);
        drawDashedLine(originX + v2x * drawScale, originY, v2EndX, v2EndY, color(100, 180, 100, 120), 1);
    }

    // Draw vectors
    drawVector(originX, originY, v1EndX, v1EndY, color(30, 100, 200, 180), 2, '');
    drawVector(originX, originY, v2EndX, v2EndY, color(30, 160, 60, 180), 2, '');

    // Draw resultant
    let rEndX = originX + rx * drawScale;
    let rEndY = originY - ry * drawScale;
    drawVector(originX, originY, rEndX, rEndY, color(200, 50, 50), 3, 'R');

    // Draw calculations if enabled
    if (showCalculationsCheckbox.checked()) {
        drawCalculations(panelX + panelWidth * 0.55, panelY + 30, v1x, v1y, v2x, v2y, rx, ry, rMag, rAngle);
    }
}

function drawCalculations(x, y, v1x, v1y, v2x, v2y, rx, ry, rMag, rAngle) {
    textSize(11);
    textAlign(LEFT, TOP);
    let lineHeight = 16;
    let sectionGap = 8;

    // Vector 1
    fill(30, 100, 200);
    textStyle(BOLD);
    text('Vector 1 (blue):', x, y);
    textStyle(NORMAL);
    fill(60);
    text('v₁ₓ = ' + mag1 + '·cos(' + angle1 + '°) = ' + v1x.toFixed(1) + ' m', x, y + lineHeight);
    text('v₁ᵧ = ' + mag1 + '·sin(' + angle1 + '°) = ' + v1y.toFixed(1) + ' m', x, y + lineHeight * 2);

    y += lineHeight * 3 + sectionGap;

    // Vector 2
    fill(30, 160, 60);
    textStyle(BOLD);
    text('Vector 2 (green):', x, y);
    textStyle(NORMAL);
    fill(60);
    text('v₂ₓ = ' + mag2 + '·cos(' + angle2 + '°) = ' + v2x.toFixed(1) + ' m', x, y + lineHeight);
    text('v₂ᵧ = ' + mag2 + '·sin(' + angle2 + '°) = ' + v2y.toFixed(1) + ' m', x, y + lineHeight * 2);

    y += lineHeight * 3 + sectionGap;

    // Resultant components
    fill(200, 50, 50);
    textStyle(BOLD);
    text('Resultant Components:', x, y);
    textStyle(NORMAL);
    fill(60);
    text('Rₓ = v₁ₓ + v₂ₓ = ' + v1x.toFixed(1) + ' + ' + v2x.toFixed(1) + ' = ' + rx.toFixed(1) + ' m', x, y + lineHeight);
    text('Rᵧ = v₁ᵧ + v₂ᵧ = ' + v1y.toFixed(1) + ' + ' + v2y.toFixed(1) + ' = ' + ry.toFixed(1) + ' m', x, y + lineHeight * 2);

    y += lineHeight * 3 + sectionGap;

    // Resultant magnitude and direction
    fill(200, 50, 50);
    textStyle(BOLD);
    text('Resultant:', x, y);
    textStyle(NORMAL);
    fill(60);
    text('|R| = √(Rₓ² + Rᵧ²) = √(' + rx.toFixed(1) + '² + ' + ry.toFixed(1) + '²)', x, y + lineHeight);
    text('    = ' + rMag.toFixed(1) + ' m', x, y + lineHeight * 2);
    text('θ = tan⁻¹(Rᵧ/Rₓ) = ' + rAngle.toFixed(1) + '°', x, y + lineHeight * 3);

    // Result box
    y += lineHeight * 4 + sectionGap;
    fill(255, 240, 240);
    stroke(200, 100, 100);
    strokeWeight(1);
    rect(x - 5, y, 180, 40, 5);

    fill(180, 30, 30);
    noStroke();
    textSize(13);
    textStyle(BOLD);
    text('R = ' + rMag.toFixed(1) + ' m at ' + rAngle.toFixed(1) + '°', x + 5, y + 12);
    textStyle(NORMAL);
}

function drawGrid(x, y, w, h, originX, originY) {
    stroke(230);
    strokeWeight(1);

    // Clip to panel area
    push();
    // Vertical lines
    for (let gx = originX; gx < x + w; gx += gridSize) {
        if (gx >= x) line(gx, y, gx, y + h);
    }
    for (let gx = originX - gridSize; gx >= x; gx -= gridSize) {
        line(gx, y, gx, y + h);
    }

    // Horizontal lines
    for (let gy = originY; gy < y + h; gy += gridSize) {
        if (gy >= y) line(x, gy, x + w, gy);
    }
    for (let gy = originY - gridSize; gy >= y; gy -= gridSize) {
        line(x, gy, x + w, gy);
    }
    pop();

    // Axes
    stroke(150);
    strokeWeight(1.5);
    // X-axis
    line(x, originY, x + w, originY);
    // Y-axis
    line(originX, y, originX, y + h);

    // Axis arrows
    fill(150);
    noStroke();
    // X arrow
    triangle(x + w, originY, x + w - 8, originY - 4, x + w - 8, originY + 4);
    // Y arrow
    triangle(originX, y, originX - 4, y + 8, originX + 4, y + 8);

    // Labels
    textSize(10);
    textAlign(CENTER, CENTER);
    fill(120);
    text('x', x + w - 5, originY + 12);
    text('y', originX + 12, y + 8);
}

function drawVector(x1, y1, x2, y2, col, weight, label) {
    stroke(col);
    strokeWeight(weight);
    line(x1, y1, x2, y2);

    // Arrowhead
    let arrowSize = 10;
    let angle = atan2(y2 - y1, x2 - x1);

    fill(col);
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -arrowSize, -arrowSize/2, -arrowSize, arrowSize/2);
    pop();

    // Label
    if (label !== '') {
        let midX = (x1 + x2) / 2;
        let midY = (y1 + y2) / 2;
        let perpAngle = angle + PI/2;
        let labelOffset = 15;

        fill(col);
        textSize(14);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text(label, midX + labelOffset * cos(perpAngle), midY + labelOffset * sin(perpAngle));
        textStyle(NORMAL);
    }
}

function drawDashedLine(x1, y1, x2, y2, col, weight) {
    stroke(col);
    strokeWeight(weight);

    let d = dist(x1, y1, x2, y2);
    let dashLength = 6;
    let dashCount = floor(d / dashLength);

    for (let i = 0; i < dashCount; i += 2) {
        let startRatio = i / dashCount;
        let endRatio = min((i + 1) / dashCount, 1);
        line(
            lerp(x1, x2, startRatio),
            lerp(y1, y2, startRatio),
            lerp(x1, x2, endRatio),
            lerp(y1, y2, endRatio)
        );
    }
}

function drawControlLabels() {
    fill('black');
    textSize(13);
    textAlign(LEFT, CENTER);
    noStroke();

    // Vector 1 labels
    fill(30, 100, 200);
    textStyle(BOLD);
    text('Vector 1', 10, drawHeight + 10);
    textStyle(NORMAL);
    fill('black');
    text('Mag: ' + mag1 + ' m', 10, drawHeight + 27);
    text('Angle: ' + angle1 + '°', 10, drawHeight + 57);

    // Vector 2 labels
    fill(30, 160, 60);
    textStyle(BOLD);
    text('Vector 2', 230, drawHeight + 10);
    textStyle(NORMAL);
    fill('black');
    text('Mag: ' + mag2 + ' m', 230, drawHeight + 27);
    text('Angle: ' + angle2 + '°', 230, drawHeight + 57);

    // Legend
    fill(80);
    textSize(11);
    text('Scale: 1 grid = 10 m', 10, drawHeight + 115);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    panelWidth = (canvasWidth - 30) / 2;
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 950);
        panelWidth = (canvasWidth - 30) / 2;
    }
}
