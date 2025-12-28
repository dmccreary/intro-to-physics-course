// Snell's Law Interactive Demonstration MicroSim
// Demonstrates refraction at a boundary between two media

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 600;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;

// Physics
let incidentAngle = 45;
let n1 = 1.0; // Top medium (air)
let n2 = 1.33; // Bottom medium (water)

// Media options
const media = {
    'Air': 1.00,
    'Water': 1.33,
    'Glass': 1.50,
    'Diamond': 2.42
};

// UI Elements
let angleSlider;
let topMediumSelect, bottomMediumSelect;
let showNormal = true;
let showReflected = true;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Angle slider
    let sliderY = drawHeight + 15;
    angleSlider = createSlider(0, 89, 45, 1);
    angleSlider.position(margin + 140, sliderY);
    angleSlider.size(150);

    // Medium selectors
    let selectY = drawHeight + 50;

    // Create labels manually
    let topLabel = createDiv('Top medium:');
    topLabel.position(margin, selectY + 3);
    topLabel.style('font-size', '14px');

    topMediumSelect = createSelect();
    topMediumSelect.position(margin + 90, selectY);
    for (let m in media) {
        topMediumSelect.option(m);
    }
    topMediumSelect.selected('Air');
    topMediumSelect.changed(updateMedia);

    let bottomLabel = createDiv('Bottom medium:');
    bottomLabel.position(margin + 200, selectY + 3);
    bottomLabel.style('font-size', '14px');

    bottomMediumSelect = createSelect();
    bottomMediumSelect.position(margin + 310, selectY);
    for (let m in media) {
        bottomMediumSelect.option(m);
    }
    bottomMediumSelect.selected('Water');
    bottomMediumSelect.changed(updateMedia);

    // Swap button
    let swapBtn = createButton('Swap Media');
    swapBtn.position(margin + 430, selectY);
    swapBtn.mousePressed(swapMedia);

    describe('Snells Law demonstration showing light refraction at a boundary between two media', LABEL);
}

function updateMedia() {
    n1 = media[topMediumSelect.value()];
    n2 = media[bottomMediumSelect.value()];
}

function swapMedia() {
    let temp = topMediumSelect.value();
    topMediumSelect.selected(bottomMediumSelect.value());
    bottomMediumSelect.selected(temp);
    updateMedia();
}

function draw() {
    updateCanvasSize();

    incidentAngle = angleSlider.value();

    // Calculate refracted angle using Snell's Law
    let sinTheta2 = (n1 / n2) * sin(radians(incidentAngle));
    let isTotalInternalReflection = sinTheta2 > 1;
    let refractedAngle = isTotalInternalReflection ? 90 : degrees(asin(sinTheta2));

    // Drawing area
    background('aliceblue');

    // Draw two media regions
    let boundaryY = drawHeight / 2;

    // Top medium (lighter)
    fill(getMediaColor(topMediumSelect.value(), 0.3));
    noStroke();
    rect(0, 0, canvasWidth, boundaryY);

    // Bottom medium (darker)
    fill(getMediaColor(bottomMediumSelect.value(), 0.5));
    rect(0, boundaryY, canvasWidth, boundaryY);

    // Boundary line
    stroke('#333');
    strokeWeight(3);
    line(0, boundaryY, canvasWidth, boundaryY);

    // Control area
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Draw title
    fill('black');
    noStroke();
    textSize(22);
    textAlign(CENTER, TOP);
    text("Snell's Law: Refraction", canvasWidth / 2, 15);

    // Draw normal line
    let centerX = canvasWidth / 2;
    stroke('#666');
    strokeWeight(2);
    setLineDash([8, 8]);
    line(centerX, boundaryY - 200, centerX, boundaryY + 200);
    setLineDash([]);

    // Normal label
    fill('#666');
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Normal', centerX + 5, boundaryY - 180);

    // Draw rays
    drawRays(centerX, boundaryY, refractedAngle, isTotalInternalReflection);

    // Draw media labels
    drawMediaLabels(boundaryY);

    // Draw angle indicators
    drawAngleIndicators(centerX, boundaryY, refractedAngle, isTotalInternalReflection);

    // Draw info panel
    drawInfoPanel(refractedAngle, isTotalInternalReflection);

    // Draw slider label
    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text('Angle of incidence: ' + incidentAngle + '°', margin, drawHeight + 25);
}

function getMediaColor(medium, alpha) {
    switch (medium) {
        case 'Air': return color(220, 240, 255, alpha * 255);
        case 'Water': return color(100, 180, 230, alpha * 255);
        case 'Glass': return color(200, 220, 230, alpha * 255);
        case 'Diamond': return color(230, 230, 250, alpha * 255);
        default: return color(200, 200, 200, alpha * 255);
    }
}

function drawRays(centerX, boundaryY, refractedAngle, isTIR) {
    let rayLength = 180;
    let angleRad = radians(incidentAngle);
    let refractedRad = radians(refractedAngle);

    // Incident ray (red)
    let incX = centerX - rayLength * sin(angleRad);
    let incY = boundaryY - rayLength * cos(angleRad);

    stroke('#E53935');
    strokeWeight(3);
    line(incX, incY, centerX, boundaryY);
    drawArrowhead(centerX, boundaryY, angleRad + PI, '#E53935');

    // Label
    fill('#E53935');
    noStroke();
    textSize(14);
    textAlign(RIGHT, CENTER);
    text('Incident Ray', incX + 60, incY + 20);

    // Reflected ray (partially shown, fainter)
    let refX = centerX + rayLength * 0.5 * sin(angleRad);
    let refY = boundaryY - rayLength * 0.5 * cos(angleRad);

    if (isTIR) {
        // Full reflection for TIR
        stroke('#9C27B0');
        strokeWeight(3);
        refX = centerX + rayLength * sin(angleRad);
        refY = boundaryY - rayLength * cos(angleRad);
        line(centerX, boundaryY, refX, refY);
        drawArrowhead(refX, refY, -angleRad, '#9C27B0');

        fill('#9C27B0');
        noStroke();
        textSize(14);
        textAlign(LEFT, CENTER);
        text('Total Internal Reflection!', refX - 80, refY + 20);
    } else {
        // Partial reflection (faint)
        stroke(150, 100, 150, 150);
        strokeWeight(2);
        line(centerX, boundaryY, refX, refY);

        // Refracted ray (blue)
        let transX = centerX + rayLength * sin(refractedRad);
        let transY = boundaryY + rayLength * cos(refractedRad);

        stroke('#2196F3');
        strokeWeight(3);
        line(centerX, boundaryY, transX, transY);
        drawArrowhead(transX, transY, refractedRad, '#2196F3');

        // Label
        fill('#2196F3');
        noStroke();
        textSize(14);
        textAlign(LEFT, CENTER);
        text('Refracted Ray', transX - 60, transY - 20);
    }

    // Impact point
    fill('#FFC107');
    stroke('#F57C00');
    strokeWeight(2);
    circle(centerX, boundaryY, 12);
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

function drawMediaLabels(boundaryY) {
    textSize(16);
    textAlign(LEFT, CENTER);

    // Top medium
    fill(50, 50, 100);
    text(topMediumSelect.value() + ' (n₁ = ' + n1.toFixed(2) + ')', margin, boundaryY - 30);

    // Bottom medium
    fill(50, 50, 100);
    text(bottomMediumSelect.value() + ' (n₂ = ' + n2.toFixed(2) + ')', margin, boundaryY + 30);
}

function drawAngleIndicators(centerX, boundaryY, refractedAngle, isTIR) {
    let arcRadius = 50;
    let angleRad = radians(incidentAngle);
    let refractedRad = radians(refractedAngle);

    // Incident angle arc
    noFill();
    stroke('#E53935');
    strokeWeight(2);
    arc(centerX, boundaryY, arcRadius * 2, arcRadius * 2, -HALF_PI - angleRad, -HALF_PI);

    // Label
    fill('#E53935');
    noStroke();
    textSize(14);
    let labelAngle = -HALF_PI - angleRad / 2;
    let labelX = centerX + (arcRadius + 20) * cos(labelAngle);
    let labelY = boundaryY + (arcRadius + 20) * sin(labelAngle);
    textAlign(CENTER, CENTER);
    text('θ₁', labelX, labelY);

    if (!isTIR) {
        // Refracted angle arc
        noFill();
        stroke('#2196F3');
        strokeWeight(2);
        arc(centerX, boundaryY, arcRadius * 2, arcRadius * 2, HALF_PI, HALF_PI + refractedRad);

        // Label
        fill('#2196F3');
        noStroke();
        labelAngle = HALF_PI + refractedRad / 2;
        labelX = centerX + (arcRadius + 20) * cos(labelAngle);
        labelY = boundaryY + (arcRadius + 20) * sin(labelAngle);
        text('θ₂', labelX, labelY);
    }
}

function drawInfoPanel(refractedAngle, isTIR) {
    let panelX = canvasWidth - 220;
    let panelY = 50;
    let panelWidth = 200;
    let panelHeight = 180;

    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 10);

    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);

    let x = panelX + 10;
    let y = panelY + 10;
    let lineH = 22;

    text("Snell's Law:", x, y);
    y += lineH;
    textSize(16);
    text('n₁ sin θ₁ = n₂ sin θ₂', x, y);
    y += lineH * 1.3;

    textSize(13);
    text('n₁ = ' + n1.toFixed(2), x, y);
    y += lineH;
    text('n₂ = ' + n2.toFixed(2), x, y);
    y += lineH;
    text('θ₁ = ' + incidentAngle + '°', x, y);
    y += lineH;

    if (isTIR) {
        fill('#9C27B0');
        text('Total Internal Reflection!', x, y);
        y += lineH;
        textSize(11);
        text('Critical angle: ' + degrees(asin(n2 / n1)).toFixed(1) + '°', x, y);
    } else {
        text('θ₂ = ' + refractedAngle.toFixed(1) + '°', x, y);
        y += lineH * 1.2;

        // Show bending direction
        textSize(11);
        fill('#666');
        if (n2 > n1) {
            text('Light bends toward normal', x, y);
            text('(entering denser medium)', x, y + 14);
        } else if (n2 < n1) {
            text('Light bends away from normal', x, y);
            text('(entering less dense medium)', x, y + 14);
        }
    }
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
}
