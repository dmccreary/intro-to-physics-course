// Angular Displacement Visualization MicroSim
// Demonstrates s = rθ relationship with rotating disk

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 180;

// Simulation parameters
let angularDisplacement = Math.PI / 4; // Default: π/4 radians (45°)

// Two points: inner and outer for clear comparison
let diskRadius = 180;
let innerRadius = 60;
let outerRadius = 180;
let innerColor, outerColor;

// UI elements
let angleSlider;
let resetButton;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Initialize colors
    innerColor = color(220, 50, 50);   // Red (inner)
    outerColor = color(50, 150, 50);   // Green (outer)

    // Create UI elements
    angleSlider = createSlider(0, TWO_PI, angularDisplacement, 0.01);
    angleSlider.position(sliderLeftMargin, drawHeight + 12);
    angleSlider.size(canvasWidth - sliderLeftMargin - margin - 100);
    angleSlider.input(() => {
        angularDisplacement = angleSlider.value();
    });

    resetButton = createButton('Reset');
    resetButton.position(canvasWidth - 90, drawHeight + 10);
    resetButton.mousePressed(resetSimulation);
    resetButton.size(70, 28);

    describe('Interactive visualization showing how arc length depends on radius: s = rθ', LABEL);
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
    textSize(24);
    textAlign(CENTER, TOP);
    noStroke();
    text('Angular Displacement: s = rθ', canvasWidth / 2, 10);

    // Draw the visualization
    let centerX = canvasWidth / 2 - 100;
    let centerY = drawHeight / 2 + 20;

    drawDisk(centerX, centerY);
    drawArcLengths(centerX, centerY);
    drawPoints(centerX, centerY);
    drawAngleIndicator(centerX, centerY);
    drawInfoPanel();
    drawControlLabels();
}

function drawDisk(cx, cy) {
    // Draw disk background
    fill(245, 245, 255);
    stroke(180);
    strokeWeight(2);
    ellipse(cx, cy, diskRadius * 2, diskRadius * 2);

    // Draw inner circle
    noFill();
    stroke(200);
    strokeWeight(1);
    ellipse(cx, cy, innerRadius * 2, innerRadius * 2);

    // Draw center axis point
    fill(60);
    noStroke();
    ellipse(cx, cy, 10, 10);

    // Reference line at θ = 0
    stroke(150);
    strokeWeight(1);
    setLineDash([5, 5]);
    line(cx, cy, cx + diskRadius + 30, cy);
    setLineDash([]);

    // Label reference
    fill(100);
    textSize(14);
    textAlign(LEFT, CENTER);
    text('θ = 0', cx + diskRadius + 35, cy);
}

function drawArcLengths(cx, cy) {
    // Draw the arc lengths as thick colored arcs
    noFill();

    // Inner arc (red)
    stroke(innerColor);
    strokeWeight(6);
    arc(cx, cy, innerRadius * 2, innerRadius * 2, -angularDisplacement, 0);

    // Outer arc (green)
    stroke(outerColor);
    strokeWeight(6);
    arc(cx, cy, outerRadius * 2, outerRadius * 2, -angularDisplacement, 0);
}

function drawPoints(cx, cy) {
    // Draw radius lines from center to each point
    strokeWeight(2);

    // Inner point
    let innerX = cx + innerRadius * cos(-angularDisplacement);
    let innerY = cy + innerRadius * sin(-angularDisplacement);
    stroke(innerColor);
    line(cx, cy, innerX, innerY);

    // Outer point
    let outerX = cx + outerRadius * cos(-angularDisplacement);
    let outerY = cy + outerRadius * sin(-angularDisplacement);
    stroke(outerColor);
    line(cx, cy, outerX, outerY);

    // Draw the points
    // Inner point
    fill(innerColor);
    stroke(255);
    strokeWeight(2);
    ellipse(innerX, innerY, 18, 18);

    // Outer point
    fill(outerColor);
    stroke(255);
    strokeWeight(2);
    ellipse(outerX, outerY, 18, 18);

    // Labels near points
    fill(80);
    textSize(12);
    noStroke();
    textAlign(CENTER, CENTER);

    // Inner label
    let innerLabelX = cx + (innerRadius + 20) * cos(-angularDisplacement);
    let innerLabelY = cy + (innerRadius + 20) * sin(-angularDisplacement);
    fill(innerColor);
    text('r = ' + innerRadius, innerLabelX, innerLabelY);

    // Outer label
    let outerLabelX = cx + (outerRadius + 25) * cos(-angularDisplacement);
    let outerLabelY = cy + (outerRadius + 25) * sin(-angularDisplacement);
    fill(outerColor);
    text('r = ' + outerRadius, outerLabelX, outerLabelY);
}

function drawAngleIndicator(cx, cy) {
    // Draw arc showing angle
    noFill();
    stroke(100, 100, 200);
    strokeWeight(2);
    arc(cx, cy, 50, 50, -angularDisplacement, 0);

    // Draw angle label
    let labelAngle = -angularDisplacement / 2;
    let labelRadius = 35;
    let labelX = cx + labelRadius * cos(labelAngle);
    let labelY = cy + labelRadius * sin(labelAngle);

    fill(100, 100, 200);
    textSize(16);
    textAlign(CENTER, CENTER);
    noStroke();
    text('θ', labelX, labelY);
}

function drawInfoPanel() {
    // Info panel on the right
    let panelX = canvasWidth - 180;
    let panelY = 50;
    let panelWidth = 150;
    let panelHeight = 220;

    // Panel background
    fill(255, 255, 255, 245);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 10);

    // Panel content
    let x = panelX + 15;
    let y = panelY + 20;
    let lineHeight = 24;

    // Angle display
    fill(0);
    textSize(15);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text('Angle θ', x, y);
    textStyle(NORMAL);
    y += lineHeight;

    fill(60);
    textSize(14);
    text(angularDisplacement.toFixed(2) + ' rad', x, y);
    y += lineHeight - 4;
    text(degrees(angularDisplacement).toFixed(0) + '°', x, y);
    y += lineHeight + 10;

    // Arc lengths
    fill(0);
    textSize(15);
    textStyle(BOLD);
    text('Arc Length s = rθ', x, y);
    textStyle(NORMAL);
    y += lineHeight + 5;

    // Inner (red)
    let innerArc = innerRadius * angularDisplacement;
    fill(innerColor);
    textSize(14);
    text('Inner: ' + innerArc.toFixed(1) + ' px', x, y);
    y += lineHeight;

    // Outer (green)
    let outerArc = outerRadius * angularDisplacement;
    fill(outerColor);
    text('Outer: ' + outerArc.toFixed(1) + ' px', x, y);
    y += lineHeight + 10;

    // Ratio
    fill(80);
    textSize(13);
    if (innerArc > 0) {
        text('Ratio: ' + (outerArc / innerArc).toFixed(1) + 'x', x, y);
    }
}

function drawControlLabels() {
    fill('black');
    textSize(16);
    textAlign(LEFT, CENTER);
    noStroke();

    let angleText = 'θ: ' + angularDisplacement.toFixed(2) + ' rad (' + degrees(angularDisplacement).toFixed(0) + '°)';
    text(angleText, 10, drawHeight + 25);
}

function resetSimulation() {
    angularDisplacement = PI / 4;
    angleSlider.value(angularDisplacement);
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    // Reposition UI elements
    angleSlider.position(sliderLeftMargin, drawHeight + 12);
    angleSlider.size(canvasWidth - sliderLeftMargin - margin - 100);
    resetButton.position(canvasWidth - 90, drawHeight + 10);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(600, container.offsetWidth);
    }
}
