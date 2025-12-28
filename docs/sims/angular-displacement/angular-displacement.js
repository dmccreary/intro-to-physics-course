// Angular Displacement Visualization MicroSim
// Demonstrates s = rθ relationship with rotating disk and colored points

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 180;
let defaultTextSize = 16;

// Simulation parameters
let angularDisplacement = Math.PI / 4; // Default: π/4 radians (45°)
let isAnimating = false;
let animationSpeed = 1; // rad/second
let showRightHandRule = false;

// Point radii (in pixels)
let diskRadius = 180;
let radii = [50, 115, 180]; // Red, Blue, Green points
let pointColors;
let trails = [[], [], []]; // Store trail points for each colored point
let maxTrailPoints = 100;

// UI elements
let angleSlider;
let animateButton;
let resetButton;
let rightHandCheckbox;

// Animation state
let mouseOverCanvas = false;
let lastTime = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Track mouse for animation control
    canvas.mouseOver(() => mouseOverCanvas = true);
    canvas.mouseOut(() => mouseOverCanvas = false);

    // Initialize colors
    pointColors = [
        color(220, 50, 50),   // Red
        color(50, 100, 220),  // Blue
        color(50, 180, 50)    // Green
    ];

    // Create UI elements
    angleSlider = createSlider(0, TWO_PI, angularDisplacement, 0.01);
    angleSlider.position(sliderLeftMargin, drawHeight + 15);
    angleSlider.size(canvasWidth - sliderLeftMargin - margin - 200);
    angleSlider.input(() => {
        angularDisplacement = angleSlider.value();
        updateTrails();
    });

    animateButton = createButton('Animate');
    animateButton.position(canvasWidth - 190, drawHeight + 12);
    animateButton.mousePressed(toggleAnimation);
    animateButton.size(80, 28);

    resetButton = createButton('Reset');
    resetButton.position(canvasWidth - 100, drawHeight + 12);
    resetButton.mousePressed(resetSimulation);
    resetButton.size(80, 28);

    rightHandCheckbox = createCheckbox(' Show Right-Hand Rule', false);
    rightHandCheckbox.position(sliderLeftMargin, drawHeight + 55);
    rightHandCheckbox.changed(() => {
        showRightHandRule = rightHandCheckbox.checked();
    });

    describe('Interactive visualization of angular displacement showing a rotating disk with three colored points at different radii demonstrating the s=rθ relationship', LABEL);

    lastTime = millis();
}

function draw() {
    updateCanvasSize();

    // Handle animation
    if (isAnimating && mouseOverCanvas) {
        let currentTime = millis();
        let deltaTime = (currentTime - lastTime) / 1000;
        angularDisplacement += animationSpeed * deltaTime;

        // Wrap around at 2π
        if (angularDisplacement >= TWO_PI) {
            angularDisplacement = 0;
            clearTrails();
        }

        angleSlider.value(angularDisplacement);
        updateTrails();
    }
    lastTime = millis();

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
    text('Angular Displacement Visualization', canvasWidth / 2, 10);

    // Draw the disk and visualization
    let centerX = canvasWidth / 2 - 100;
    let centerY = drawHeight / 2 + 20;

    drawDisk(centerX, centerY);
    drawPoints(centerX, centerY);
    drawAngleIndicator(centerX, centerY);
    drawInfoPanel();

    if (showRightHandRule) {
        drawRightHandRule(centerX, centerY);
    }

    // Draw control labels
    drawControlLabels();

    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
}

function drawDisk(cx, cy) {
    // Draw disk background
    fill(240, 240, 250);
    stroke(150);
    strokeWeight(2);
    ellipse(cx, cy, diskRadius * 2, diskRadius * 2);

    // Draw radial reference lines
    stroke(200);
    strokeWeight(1);
    for (let i = 0; i < 12; i++) {
        let angle = i * PI / 6;
        let x1 = cx + 20 * cos(angle);
        let y1 = cy - 20 * sin(angle);
        let x2 = cx + diskRadius * cos(angle);
        let y2 = cy - diskRadius * sin(angle);
        line(x1, y1, x2, y2);
    }

    // Draw concentric circles for reference
    noFill();
    stroke(220);
    for (let r of radii) {
        ellipse(cx, cy, r * 2, r * 2);
    }

    // Draw center axis point
    fill(0);
    noStroke();
    ellipse(cx, cy, 10, 10);

    // Label center
    textSize(12);
    textAlign(CENTER, TOP);
    fill(80);
    text('Axis', cx, cy + 10);
}

function drawPoints(cx, cy) {
    // Draw trails
    for (let i = 0; i < 3; i++) {
        if (trails[i].length > 1) {
            noFill();
            stroke(pointColors[i]);
            strokeWeight(3);
            beginShape();
            for (let pt of trails[i]) {
                vertex(pt.x, pt.y);
            }
            endShape();
        }
    }

    // Draw radius lines from center to each point
    strokeWeight(2);
    for (let i = 0; i < 3; i++) {
        let x = cx + radii[i] * cos(-angularDisplacement);
        let y = cy + radii[i] * sin(-angularDisplacement);

        stroke(pointColors[i]);
        line(cx, cy, x, y);
    }

    // Draw points
    for (let i = 0; i < 3; i++) {
        let x = cx + radii[i] * cos(-angularDisplacement);
        let y = cy + radii[i] * sin(-angularDisplacement);

        fill(pointColors[i]);
        noStroke();
        ellipse(x, y, 16, 16);

        // Add white border
        stroke(255);
        strokeWeight(2);
        noFill();
        ellipse(x, y, 16, 16);
    }

    // Draw reference line at θ = 0
    stroke(100);
    strokeWeight(1);
    setLineDash([5, 5]);
    line(cx, cy, cx + diskRadius + 20, cy);
    setLineDash([]);

    // Label reference
    fill(100);
    textSize(12);
    textAlign(LEFT, CENTER);
    text('θ = 0', cx + diskRadius + 25, cy);
}

function drawAngleIndicator(cx, cy) {
    // Draw arc showing angle
    noFill();
    stroke(100, 100, 200);
    strokeWeight(2);
    arc(cx, cy, 80, 80, -angularDisplacement, 0);

    // Draw angle label
    let labelAngle = -angularDisplacement / 2;
    let labelRadius = 55;
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
    let panelX = canvasWidth - 220;
    let panelY = 50;
    let panelWidth = 200;
    let panelHeight = 280;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 10);

    // Panel content
    fill(0);
    textSize(16);
    textAlign(LEFT, TOP);

    let y = panelY + 15;
    let lineHeight = 22;

    // Title
    textStyle(BOLD);
    text('Arc Lengths (s = rθ)', panelX + 15, y);
    textStyle(NORMAL);
    y += lineHeight + 10;

    // Angle display
    text('θ = ' + angularDisplacement.toFixed(2) + ' rad', panelX + 15, y);
    y += lineHeight;
    text('θ = ' + degrees(angularDisplacement).toFixed(1) + '°', panelX + 15, y);
    y += lineHeight + 15;

    // Arc lengths for each point
    textSize(14);
    for (let i = 0; i < 3; i++) {
        let colorNames = ['Red', 'Blue', 'Green'];
        let arcLength = radii[i] * angularDisplacement;

        fill(pointColors[i]);
        text(colorNames[i] + ' (r=' + radii[i] + '):', panelX + 15, y);
        y += lineHeight - 2;

        fill(0);
        text('  s = ' + arcLength.toFixed(1) + ' px', panelX + 15, y);
        y += lineHeight + 5;
    }

    // Formula
    y += 10;
    fill(80);
    textSize(14);
    textStyle(ITALIC);
    text('Formula: s = r × θ', panelX + 15, y);
    textStyle(NORMAL);
}

function drawRightHandRule(cx, cy) {
    // Draw a simplified right-hand rule illustration
    let ruleX = 100;
    let ruleY = 400;

    // Background
    fill(255, 255, 240, 230);
    stroke(200);
    strokeWeight(1);
    rect(ruleX - 60, ruleY - 60, 130, 120, 10);

    // Axis arrow (thumb pointing up/out of page)
    stroke(150, 50, 50);
    strokeWeight(3);
    fill(150, 50, 50);
    line(ruleX, ruleY + 30, ruleX, ruleY - 30);
    triangle(ruleX, ruleY - 40, ruleX - 8, ruleY - 25, ruleX + 8, ruleY - 25);

    // Curved arrow showing rotation direction
    noFill();
    stroke(50, 100, 200);
    strokeWeight(2);
    arc(ruleX, ruleY, 50, 50, -PI/4, PI + PI/4);

    // Arrowhead on curve
    push();
    translate(ruleX + 25 * cos(PI + PI/4), ruleY - 25 * sin(PI + PI/4));
    rotate(-PI/4);
    fill(50, 100, 200);
    triangle(0, 0, -8, -5, -8, 5);
    pop();

    // Labels
    fill(0);
    textSize(11);
    textAlign(CENTER, CENTER);
    noStroke();
    text('L (thumb)', ruleX, ruleY - 50);
    text('ω', ruleX + 40, ruleY - 10);
    text('Right-Hand', ruleX + 5, ruleY + 45);
    text('Rule', ruleX + 5, ruleY + 55);
}

function drawControlLabels() {
    fill('black');
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);

    // Angle slider label
    let angleText = 'θ: ' + angularDisplacement.toFixed(2) + ' rad (' + degrees(angularDisplacement).toFixed(0) + '°)';
    text(angleText, 10, drawHeight + 28);
}

function updateTrails() {
    let centerX = canvasWidth / 2 - 100;
    let centerY = drawHeight / 2 + 20;

    for (let i = 0; i < 3; i++) {
        let x = centerX + radii[i] * cos(-angularDisplacement);
        let y = centerY + radii[i] * sin(-angularDisplacement);

        trails[i].push({x: x, y: y});

        // Limit trail length
        if (trails[i].length > maxTrailPoints) {
            trails[i].shift();
        }
    }
}

function clearTrails() {
    trails = [[], [], []];
}

function toggleAnimation() {
    isAnimating = !isAnimating;
    animateButton.html(isAnimating ? 'Pause' : 'Animate');
}

function resetSimulation() {
    angularDisplacement = PI / 4;
    angleSlider.value(angularDisplacement);
    isAnimating = false;
    animateButton.html('Animate');
    clearTrails();
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    // Reposition UI elements
    angleSlider.position(sliderLeftMargin, drawHeight + 15);
    angleSlider.size(canvasWidth - sliderLeftMargin - margin - 200);

    animateButton.position(canvasWidth - 190, drawHeight + 12);
    resetButton.position(canvasWidth - 100, drawHeight + 12);
    rightHandCheckbox.position(sliderLeftMargin, drawHeight + 55);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(600, container.offsetWidth);
    }
}
