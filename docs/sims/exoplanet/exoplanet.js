// Exoplanet Transit Detection Simulation
// Demonstrates how astronomers detect exoplanets using the transit method

let canvasWidth = 800;
let drawHeight = 430;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let starRadius, orbitRadius;
let planetRadiusRatio = 0.1;
let orbitalPeriod = 5;
let orbitalAngle = 0;

// Light curve data
let lightCurve = [];
let maxDataPoints = 400;
let brightness = 1.0;

// Controls
let planetSizeSlider, periodSlider;
let startButton;
let running = false;
let margin = 30;
// x position for left edge of sliders
// Take into account button width
let sliderLeftMargin = 200;
let controlsY = drawHeight;


// Layout proportions
let starViewHeight, graphHeight;
let controlsHeight = 70;

function updateCanvasSize() {
    canvasWidth = windowWidth;

    // Update layout based on canvas size
    starViewHeight = canvasHeight * 0.52;
    graphHeight = canvasHeight * 0.34;

    // Scale star and orbit based on width
    starRadius = canvasWidth * 0.09;
    orbitRadius = canvasWidth * 0.22;
    positionControls();
}

function setup() {
    updateCanvasSize();
    createCanvas(canvasWidth, canvasHeight);

    // Start/Pause button
    startButton = createButton('Start');
    startButton.mousePressed(toggleSimulation);
    startButton.style('font-size', '14px');
    startButton.style('padding', '8px 16px');
    startButton.style('cursor', 'pointer');

    // Planet size slider
    planetSizeSlider = createSlider(5, 30, 10, 1);
    planetSizeSlider.position(sliderLeftMargin, controlsY + 12);

    // Orbital period slider
    periodSlider = createSlider(2, 15, 5, 0.5);
    periodSlider.position(sliderLeftMargin, controlsY + 40);

    // position the controls initially and after resize
    positionControls();

    // Initialize light curve
    for (let i = 0; i < maxDataPoints; i++) {
        lightCurve.push(1.0);
    }
}

function positionControls() {
    // Only update if controls exist
    if (!startButton || !planetSizeSlider || !periodSlider) return;

    // Button in lower left
    startButton.position(margin, controlsY + 20);

    // Resize the sliders to fill the width of the canvas
    planetSizeSlider.size(canvasWidth - margin*5 - sliderLeftMargin);
    periodSlider.size(canvasWidth - margin*5 - sliderLeftMargin);
}

function toggleSimulation() {
    running = !running;
    startButton.html(running ? 'Pause' : 'Start');
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    positionControls();
}

function draw() {
    background(20, 20, 40);

    // Update parameters from sliders
    planetRadiusRatio = planetSizeSlider.value() / 100;
    orbitalPeriod = periodSlider.value();

    // Only update angle when running
    if (running) {
        let angularSpeed = TWO_PI / (orbitalPeriod * 60);
        orbitalAngle += angularSpeed;
        if (orbitalAngle > TWO_PI) orbitalAngle -= TWO_PI;
    }

    // Star is always at center
    let starX = canvasWidth / 2;
    let starY = starViewHeight / 2;

    // Planet orbits around star
    let planetX = starX + orbitRadius * cos(orbitalAngle);
    let planetY = starY;
    let planetRadius = starRadius * planetRadiusRatio;

    // Calculate brightness
    brightness = calculateBrightness(planetX, planetY, planetRadius, starX, starY);

    // Update light curve only when running
    if (running) {
        lightCurve.push(brightness);
        if (lightCurve.length > maxDataPoints) {
            lightCurve.shift();
        }
    }

    // Draw sections
    drawStarView(planetX, planetY, planetRadius, starX, starY);
    drawLightCurve();
    drawControls();
    drawTransitIndicator();
}

function calculateBrightness(planetX, planetY, planetRadius, starX, starY) {
    let d = dist(planetX, planetY, starX, starY);

    // Planet in front when sin > 0 (angles 0 to PI)
    let inFront = sin(orbitalAngle) > 0;

    if (!inFront) {
        return 1.0;
    }

    let R = starRadius;
    let r = planetRadius;

    if (d >= R + r) {
        return 1.0;
    } else if (d <= abs(R - r)) {
        let blockedArea = PI * r * r;
        let starArea = PI * R * R;
        return 1.0 - (blockedArea / starArea);
    } else {
        let part1 = r * r * acos((d * d + r * r - R * R) / (2 * d * r));
        let part2 = R * R * acos((d * d + R * R - r * r) / (2 * d * R));
        let part3 = 0.5 * sqrt((-d + r + R) * (d + r - R) * (d - r + R) * (d + r + R));
        let overlapArea = part1 + part2 - part3;
        let starArea = PI * R * R;
        return 1.0 - (overlapArea / starArea);
    }
}

function drawStarView(planetX, planetY, planetRadius, starX, starY) {
    // Background
    fill(15, 15, 30);
    noStroke();
    rect(0, 0, canvasWidth, starViewHeight);

    // Background stars
    fill(255, 255, 255, 100);
    randomSeed(42);
    for (let i = 0; i < 50; i++) {
        ellipse(random(canvasWidth), random(starViewHeight), random(1, 3));
    }

    // Orbital path (dashed ellipse)
    stroke(100, 100, 150, 100);
    strokeWeight(1);
    drawingContext.setLineDash([5, 5]);
    noFill();
    ellipse(starX, starY, orbitRadius * 2, 20);
    drawingContext.setLineDash([]);

    // Star glow
    noStroke();
    for (let i = 5; i > 0; i--) {
        let alpha = map(i, 5, 1, 30, 200);
        let size = starRadius * 2 + i * 15;
        fill(255, 200, 100, alpha * brightness);
        ellipse(starX, starY, size, size);
    }

    // Star surface
    fill(255, 240, 200);
    ellipse(starX, starY, starRadius * 2, starRadius * 2);

    // Planet (only when in front)
    let inFront = sin(orbitalAngle) > 0;
    if (inFront) {
        fill(50, 50, 80);
        stroke(30, 30, 50);
        strokeWeight(2);
        ellipse(planetX, planetY, planetRadius * 2, planetRadius * 2);
    }

    // Title
    fill(255);
    noStroke();
    textSize(18);
    textAlign(LEFT, TOP);
    text("Exoplanet Transit Detection", margin, 10);

    // Transit info
    let transitDepth = (1 - brightness) * 100;
    textSize(13);
    textAlign(RIGHT, TOP);
    fill(200, 200, 255);
    text(`Transit Depth: ${transitDepth.toFixed(2)}%`, canvasWidth - margin, 10);

    let status = inFront && transitDepth > 0.01 ? "TRANSITING" : (inFront ? "Approaching" : "Behind Star");
    fill(transitDepth > 0.01 && inFront ? color(255, 100, 100) : color(150, 150, 200));
    text(status, canvasWidth - margin, 28);
}

function drawLightCurve() {
    let graphY = starViewHeight;
    let graphWidth = canvasWidth - margin * 3;

    // Background
    fill(10, 10, 25);
    stroke(50, 50, 80);
    strokeWeight(1);
    rect(margin*2, graphY, graphWidth, graphHeight);

    // Grid lines
    stroke(40, 40, 60);
    for (let i = 0; i <= 4; i++) {
        let y = graphY + graphHeight * i / 4;
        line(margin, y, canvasWidth - margin, y);
    }

    // Y-axis labels
    fill(150, 150, 200);
    noStroke();
    textSize(10);
    textAlign(RIGHT, CENTER);
    for (let i = 0; i <= 4; i++) {
        let y = graphY + graphHeight * i / 4;
        let val = 1.0 - (i * 0.01);
        text(val.toFixed(2), margin +20, y);
    }

    // Axis labels
    textAlign(CENTER, TOP);
    text("Time", canvasWidth / 2, graphY + graphHeight + 4);

    push();
        translate(12, graphY + graphHeight / 2);
        rotate(-HALF_PI);
        textAlign(CENTER, CENTER);
        text("Brightness", 0, 0);
    pop();

    // Title
    textAlign(LEFT, TOP);
    textSize(12);
    fill(200, 200, 255);
    text("Light Curve", margin + 8, graphY - margin);

    // Draw curve
    // Do not draw in the y-label area
    stroke(100, 200, 255);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < lightCurve.length; i++) {
        let x = map(i, 0, maxDataPoints, margin*2, canvasWidth - margin);
        let y = map(lightCurve[i], 0.96, 1.0, graphY + graphHeight, graphY);
        y = constrain(y, graphY, graphY + graphHeight);
        vertex(x, y);
    }
    endShape();

    // Current marker
    let currentX = canvasWidth - margin;
    let currentY = map(brightness, 0.96, 1.0, graphY + graphHeight, graphY);
    currentY = constrain(currentY, graphY, graphY + graphHeight);
    fill(255, 100, 100);
    noStroke();
    ellipse(currentX, currentY, 6, 6);
}

function drawControls() {
    let controlsY = starViewHeight + graphHeight;

    // Background
    fill(25, 25, 45);
    noStroke();
    rect(0, controlsY, canvasWidth, controlsHeight);

    // Divider
    stroke(60, 60, 100);
    line(0, controlsY, canvasWidth, controlsY);

    // Slider labels (to the right of button)
    fill(200, 200, 255);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    let labelX = margin + 100;
    text(`Size: ${planetSizeSlider.value()}%`, labelX, controlsY + 20);
    text(`Period: ${periodSlider.value().toFixed(1)}s`, labelX, controlsY + 48);

    // Right side info
    textAlign(RIGHT, CENTER);
    let depth = pow(planetSizeSlider.value() / 100, 2) * 100;
    text(`Max depth: ${depth.toFixed(2)}%`, canvasWidth - margin, controlsY + 20);

    let radiusKm = (planetSizeSlider.value() / 100 * 696340).toFixed(0);
    text(`(${radiusKm} km)`, canvasWidth - margin, controlsY + 48);
}

function drawTransitIndicator() {
    if (brightness < 0.9999) {
        let pulse = sin(frameCount * 0.1) * 0.3 + 0.7;
        stroke(255, 100, 100, 150 * pulse);
        strokeWeight(3);
        noFill();
        rect(2, 2, canvasWidth - 4, starViewHeight - 4, 5);
    }
}
