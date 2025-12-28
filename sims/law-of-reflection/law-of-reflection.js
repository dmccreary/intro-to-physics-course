// Law of Reflection Interactive Diagram MicroSim
// Demonstrates the law of reflection: angle of incidence equals angle of reflection

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 180;

// Physics
let incidentAngle = 45;

// UI
let angleSlider;
let showNormalCheckbox, showAnglesCheckbox;
let showNormal = true;
let showAngles = true;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Create slider
    let sliderY = drawHeight + 25;
    angleSlider = createSlider(0, 85, 45, 1);
    angleSlider.position(sliderLeftMargin, sliderY);
    angleSlider.size(200);

    // Checkboxes
    let checkY = drawHeight + 60;
    showNormalCheckbox = createCheckbox(' Show normal line', true);
    showNormalCheckbox.position(margin, checkY);
    showNormalCheckbox.changed(() => showNormal = showNormalCheckbox.checked());

    showAnglesCheckbox = createCheckbox(' Show angle measurements', true);
    showAnglesCheckbox.position(margin + 160, checkY);
    showAnglesCheckbox.changed(() => showAngles = showAnglesCheckbox.checked());

    // Reset button
    let resetBtn = createButton('Reset to 45°');
    resetBtn.position(margin + 370, checkY - 3);
    resetBtn.mousePressed(() => angleSlider.value(45));

    describe('Law of reflection demonstration showing incident and reflected rays with equal angles', LABEL);
}

function draw() {
    updateCanvasSize();

    incidentAngle = angleSlider.value();

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Draw title
    fill('black');
    noStroke();
    textSize(24);
    textAlign(CENTER, TOP);
    text('Law of Reflection', canvasWidth / 2, 15);

    // Mirror center point
    let mirrorY = drawHeight * 0.65;
    let centerX = canvasWidth / 2;

    // Draw mirror surface
    drawMirror(mirrorY);

    // Draw normal line
    if (showNormal) {
        drawNormal(centerX, mirrorY);
    }

    // Draw incident and reflected rays
    drawRays(centerX, mirrorY);

    // Draw angle arcs and labels
    if (showAngles) {
        drawAngleIndicators(centerX, mirrorY);
    }

    // Draw equation
    drawEquation(centerX);

    // Draw slider label
    drawSliderLabel();
}

function drawMirror(y) {
    // Mirror surface
    strokeWeight(4);
    stroke('#1565C0');
    line(margin + 50, y, canvasWidth - margin - 50, y);

    // Mirror backing (hatching to indicate solid surface)
    stroke('#90CAF9');
    strokeWeight(1);
    for (let x = margin + 60; x < canvasWidth - margin - 50; x += 15) {
        line(x, y + 5, x - 10, y + 20);
    }

    // Label
    fill('#1565C0');
    noStroke();
    textSize(14);
    textAlign(CENTER, TOP);
    text('Reflective Surface (Mirror)', canvasWidth / 2, y + 25);
}

function drawNormal(x, y) {
    // Normal (perpendicular) line
    stroke('#666');
    strokeWeight(2);
    setLineDash([8, 8]);
    line(x, y - 180, x, y + 10);
    setLineDash([]);

    // Normal label
    fill('#666');
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Normal', x + 5, y - 170);
}

function drawRays(centerX, mirrorY) {
    let rayLength = 200;
    let angleRad = radians(incidentAngle);

    // Calculate ray endpoints
    // Incident ray comes from upper left
    let incidentStartX = centerX - rayLength * sin(angleRad);
    let incidentStartY = mirrorY - rayLength * cos(angleRad);

    // Reflected ray goes to upper right
    let reflectedEndX = centerX + rayLength * sin(angleRad);
    let reflectedEndY = mirrorY - rayLength * cos(angleRad);

    // Draw incident ray (red)
    stroke('#E53935');
    strokeWeight(3);
    line(incidentStartX, incidentStartY, centerX, mirrorY);

    // Arrowhead for incident ray
    drawArrowhead(centerX, mirrorY, angleRad + PI, '#E53935');

    // Label
    fill('#E53935');
    noStroke();
    textSize(14);
    textAlign(RIGHT, CENTER);
    let labelX = incidentStartX + 40;
    let labelY = incidentStartY + 30;
    text('Incident Ray', labelX, labelY);

    // Draw reflected ray (blue)
    stroke('#2196F3');
    strokeWeight(3);
    line(centerX, mirrorY, reflectedEndX, reflectedEndY);

    // Arrowhead for reflected ray
    drawArrowhead(reflectedEndX, reflectedEndY, -angleRad, '#2196F3');

    // Label
    fill('#2196F3');
    noStroke();
    textAlign(LEFT, CENTER);
    labelX = reflectedEndX - 40;
    labelY = reflectedEndY + 30;
    text('Reflected Ray', labelX, labelY);

    // Impact point
    fill('#FFC107');
    stroke('#F57C00');
    strokeWeight(2);
    circle(centerX, mirrorY, 12);
}

function drawArrowhead(x, y, angle, col) {
    push();
    translate(x, y);
    rotate(angle);
    fill(col);
    noStroke();
    triangle(0, 0, 15, -8, 15, 8);
    pop();
}

function drawAngleIndicators(centerX, mirrorY) {
    let arcRadius = 60;
    let angleRad = radians(incidentAngle);

    // Draw incident angle arc (red)
    noFill();
    stroke('#E53935');
    strokeWeight(2);
    arc(centerX, mirrorY, arcRadius * 2, arcRadius * 2, -HALF_PI - angleRad, -HALF_PI);

    // Draw reflected angle arc (blue)
    stroke('#2196F3');
    arc(centerX, mirrorY, arcRadius * 2 + 10, arcRadius * 2 + 10, -HALF_PI, -HALF_PI + angleRad);

    // Angle labels
    let labelRadius = arcRadius + 25;

    // Incident angle label
    fill('#E53935');
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    let labelAngle = -HALF_PI - angleRad / 2;
    let labelX = centerX + labelRadius * cos(labelAngle);
    let labelY = mirrorY + labelRadius * sin(labelAngle);
    text('θᵢ = ' + incidentAngle + '°', labelX - 20, labelY);

    // Reflected angle label
    fill('#2196F3');
    labelAngle = -HALF_PI + angleRad / 2;
    labelX = centerX + (labelRadius + 5) * cos(labelAngle);
    labelY = mirrorY + (labelRadius + 5) * sin(labelAngle);
    text('θᵣ = ' + incidentAngle + '°', labelX + 20, labelY);
}

function drawEquation(centerX) {
    // Equation box
    let boxX = centerX - 150;
    let boxY = 60;
    let boxW = 300;
    let boxH = 60;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(boxX, boxY, boxW, boxH, 10);

    // Equation text
    fill('black');
    noStroke();
    textSize(18);
    textAlign(CENTER, CENTER);
    text('Law of Reflection:', centerX, boxY + 20);

    textSize(22);
    fill('#4CAF50');
    text('θᵢ = θᵣ', centerX, boxY + 45);

    // Verification
    if (incidentAngle === incidentAngle) { // Always true, demonstrating equality
        textSize(14);
        fill('#4CAF50');
        text('✓ ' + incidentAngle + '° = ' + incidentAngle + '°', centerX, boxY + 80);
    }
}

function drawSliderLabel() {
    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text('Angle of Incidence: ' + incidentAngle + '°', margin, drawHeight + 35);
}

function setLineDash(pattern) {
    drawingContext.setLineDash(pattern);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 800);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    if (angleSlider) {
        angleSlider.size(min(200, canvasWidth - sliderLeftMargin - margin));
    }
}
