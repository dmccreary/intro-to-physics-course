// Vector Basics Interactive MicroSim
// Teaches students how vectors are represented graphically with magnitude and direction

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 550;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 120;

// Grid and coordinate system
let gridSize = 50;  // pixels per grid unit
let originX, originY;

// Vector parameters
let magnitude = 50;  // 0-100 m
let angle = 45;      // degrees

// UI elements
let magnitudeSlider;
let angleSlider;
let showComponentsCheckbox;
let showProtractorCheckbox;
let resetButton;

// Animation control
let mouseOverCanvas = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Track mouse for animation control
    canvas.mouseOver(() => mouseOverCanvas = true);
    canvas.mouseOut(() => mouseOverCanvas = false);

    // Calculate origin position (center of drawing area)
    originX = 300;
    originY = drawHeight / 2;

    // Create controls
    createControls();

    describe('Interactive vector visualization showing magnitude, direction, and components on a coordinate plane', LABEL);
}

function createControls() {
    // Magnitude slider
    magnitudeSlider = createSlider(0, 100, 50, 1);
    magnitudeSlider.position(sliderLeftMargin, drawHeight + 15);
    magnitudeSlider.size(180);
    magnitudeSlider.input(() => magnitude = magnitudeSlider.value());

    // Angle slider
    angleSlider = createSlider(0, 360, 45, 1);
    angleSlider.position(sliderLeftMargin, drawHeight + 50);
    angleSlider.size(180);
    angleSlider.input(() => angle = angleSlider.value());

    // Show components checkbox
    showComponentsCheckbox = createCheckbox(' Show Components', true);
    showComponentsCheckbox.position(320, drawHeight + 15);
    showComponentsCheckbox.style('font-size', '14px');

    // Show protractor checkbox
    showProtractorCheckbox = createCheckbox(' Show Protractor', false);
    showProtractorCheckbox.position(320, drawHeight + 45);
    showProtractorCheckbox.style('font-size', '14px');

    // Reset button
    resetButton = createButton('Reset');
    resetButton.position(470, drawHeight + 30);
    resetButton.mousePressed(resetToDefault);
}

function resetToDefault() {
    magnitude = 50;
    angle = 45;
    magnitudeSlider.value(50);
    angleSlider.value(45);
    showComponentsCheckbox.checked(true);
    showProtractorCheckbox.checked(false);
}

function draw() {
    updateCanvasSize();

    // Get current values
    magnitude = magnitudeSlider.value();
    angle = angleSlider.value();

    // Drawing area background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Draw coordinate system and grid
    drawGrid();
    drawAxes();

    // Draw protractor if enabled
    if (showProtractorCheckbox.checked()) {
        drawProtractor();
    }

    // Calculate vector endpoint
    let angleRad = radians(angle);
    let vectorLength = magnitude * 2.5;  // Scale for display (2.5 pixels per meter)
    let endX = originX + vectorLength * cos(angleRad);
    let endY = originY - vectorLength * sin(angleRad);  // Subtract because y is inverted

    // Draw components if enabled
    if (showComponentsCheckbox.checked()) {
        drawComponents(endX, endY, vectorLength, angleRad);
    }

    // Draw the main vector
    drawVector(originX, originY, endX, endY, color(0, 100, 200), 4);

    // Draw title
    fill('black');
    textSize(22);
    textAlign(CENTER, TOP);
    noStroke();
    text('Vector Basics: Magnitude and Direction', canvasWidth / 2, 10);

    // Draw info panel
    drawInfoPanel();

    // Draw control labels
    drawControlLabels();
}

function drawGrid() {
    stroke(220);
    strokeWeight(1);

    // Vertical lines
    for (let x = originX % gridSize; x < canvasWidth - 200; x += gridSize) {
        line(x, 40, x, drawHeight - 20);
    }

    // Horizontal lines
    for (let y = 40; y < drawHeight - 20; y += gridSize) {
        line(0, y, canvasWidth - 220, y);
    }
}

function drawAxes() {
    stroke(100);
    strokeWeight(2);

    // X-axis
    line(20, originY, canvasWidth - 240, originY);
    // X-axis arrow
    fill(100);
    noStroke();
    triangle(canvasWidth - 240, originY, canvasWidth - 250, originY - 6, canvasWidth - 250, originY + 6);

    // Y-axis
    stroke(100);
    strokeWeight(2);
    line(originX, drawHeight - 20, originX, 40);
    // Y-axis arrow
    fill(100);
    noStroke();
    triangle(originX, 40, originX - 6, 50, originX + 6, 50);

    // Axis labels
    textSize(14);
    textAlign(CENTER, CENTER);
    fill(100);
    text('x', canvasWidth - 230, originY + 15);
    text('y', originX + 15, 45);

    // Origin label
    textSize(12);
    text('O', originX - 12, originY + 12);
}

function drawProtractor() {
    // Draw protractor arc
    noFill();
    stroke(255, 200, 100, 150);
    strokeWeight(2);

    let protractorRadius = 80;
    arc(originX, originY, protractorRadius * 2, protractorRadius * 2, -PI, 0);
    arc(originX, originY, protractorRadius * 2, protractorRadius * 2, 0, PI);

    // Draw angle marks every 30 degrees
    for (let a = 0; a < 360; a += 30) {
        let rad = radians(a);
        let innerR = protractorRadius - 8;
        let outerR = protractorRadius + 8;
        stroke(200, 150, 50, 180);
        strokeWeight(1);
        line(
            originX + innerR * cos(rad),
            originY - innerR * sin(rad),
            originX + outerR * cos(rad),
            originY - outerR * sin(rad)
        );

        // Angle labels
        if (a % 90 === 0) {
            fill(150, 100, 0);
            noStroke();
            textSize(11);
            textAlign(CENTER, CENTER);
            let labelR = protractorRadius + 20;
            text(a + '°', originX + labelR * cos(rad), originY - labelR * sin(rad));
        }
    }

    // Draw angle arc from +x axis to vector
    let angleRad = radians(angle);
    stroke(255, 150, 0, 200);
    strokeWeight(3);
    noFill();
    arc(originX, originY, 60, 60, -angleRad, 0);

    // Angle label
    let labelAngle = angleRad / 2;
    fill(200, 100, 0);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text(angle + '°', originX + 45 * cos(labelAngle), originY - 45 * sin(labelAngle));
}

function drawComponents(endX, endY, vectorLength, angleRad) {
    let vx = vectorLength * cos(angleRad);
    let vy = vectorLength * sin(angleRad);

    // X-component (red dashed line)
    stroke(220, 50, 50);
    strokeWeight(2);
    drawDashedLine(originX, originY, originX + vx, originY, 8);

    // Y-component (green dashed line)
    stroke(50, 180, 50);
    strokeWeight(2);
    drawDashedLine(originX + vx, originY, originX + vx, originY - vy, 8);

    // Right angle indicator
    stroke(100);
    strokeWeight(1);
    noFill();
    let cornerSize = 12;
    if (vx > 0) {
        rect(originX + vx - cornerSize, originY - (vy > 0 ? cornerSize : 0), cornerSize, cornerSize);
    } else {
        rect(originX + vx, originY - (vy > 0 ? cornerSize : 0), cornerSize, cornerSize);
    }

    // Component labels
    textSize(12);
    noStroke();

    // X-component label
    fill(180, 30, 30);
    let xLabelY = originY + (vy < 0 ? -15 : 18);
    text('vₓ = ' + (magnitude * cos(angleRad)).toFixed(1) + ' m', originX + vx/2, xLabelY);

    // Y-component label
    fill(30, 140, 30);
    let yLabelX = originX + vx + (vx < 0 ? -40 : 40);
    text('vᵧ = ' + (magnitude * sin(angleRad)).toFixed(1) + ' m', yLabelX, originY - vy/2);
}

function drawDashedLine(x1, y1, x2, y2, dashLength) {
    let d = dist(x1, y1, x2, y2);
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

function drawVector(x1, y1, x2, y2, col, weight) {
    stroke(col);
    strokeWeight(weight);
    line(x1, y1, x2, y2);

    // Draw arrowhead
    let arrowSize = 12;
    let angle = atan2(y2 - y1, x2 - x1);

    fill(col);
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -arrowSize, -arrowSize/2, -arrowSize, arrowSize/2);
    pop();
}

function drawInfoPanel() {
    // Info panel background
    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(canvasWidth - 210, 50, 195, 200, 10);

    // Panel title
    fill(50);
    noStroke();
    textSize(16);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Vector Properties', canvasWidth - 112, 60);
    textStyle(NORMAL);

    // Calculate components
    let angleRad = radians(angle);
    let vx = magnitude * cos(angleRad);
    let vy = magnitude * sin(angleRad);

    // Display values
    textSize(13);
    textAlign(LEFT, TOP);
    let x = canvasWidth - 200;
    let y = 90;
    let lineHeight = 22;

    fill(0, 80, 160);
    text('Magnitude:', x, y);
    fill(50);
    text('||v|| = ' + magnitude.toFixed(1) + ' m', x + 5, y + lineHeight);

    y += lineHeight * 2 + 5;
    fill(0, 80, 160);
    text('Direction:', x, y);
    fill(50);
    text('θ = ' + angle + '°', x + 5, y + lineHeight);

    y += lineHeight * 2 + 5;
    fill(0, 80, 160);
    text('Components:', x, y);
    fill(180, 30, 30);
    text('vₓ = ' + vx.toFixed(2) + ' m', x + 5, y + lineHeight);
    fill(30, 140, 30);
    text('vᵧ = ' + vy.toFixed(2) + ' m', x + 5, y + lineHeight * 2);

    // Formulas panel
    fill(255, 255, 255, 240);
    stroke(200);
    rect(canvasWidth - 210, 265, 195, 110, 10);

    fill(80);
    textSize(14);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Formulas', canvasWidth - 112, 275);
    textStyle(NORMAL);

    textSize(12);
    textAlign(LEFT, TOP);
    x = canvasWidth - 200;
    y = 300;
    text('vₓ = v·cos(θ)', x, y);
    text('vᵧ = v·sin(θ)', x, y + 18);
    text('||v|| = √(vₓ² + vᵧ²)', x, y + 36);
    text('θ = tan⁻¹(vᵧ/vₓ)', x, y + 54);
}

function drawControlLabels() {
    fill('black');
    textSize(14);
    textAlign(LEFT, CENTER);
    noStroke();

    text('Magnitude: ' + magnitude + ' m', 10, drawHeight + 27);
    text('Angle: ' + angle + '°', 10, drawHeight + 62);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    // Reposition controls
    if (magnitudeSlider) {
        magnitudeSlider.position(sliderLeftMargin, drawHeight + 15);
    }
    if (angleSlider) {
        angleSlider.position(sliderLeftMargin, drawHeight + 50);
    }
    if (showComponentsCheckbox) {
        showComponentsCheckbox.position(320, drawHeight + 15);
    }
    if (showProtractorCheckbox) {
        showProtractorCheckbox.position(320, drawHeight + 45);
    }
    if (resetButton) {
        resetButton.position(470, drawHeight + 30);
    }
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 850);
        originX = min(300, canvasWidth * 0.38);
    }
}
