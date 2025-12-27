// Exoplanet Transit Detection Simulation
// Demonstrates how astronomers detect exoplanets using the transit method

let canvasWidth = 800;
let canvasHeight = 550;
let starRadius = 80;
let planetRadiusRatio = 0.1; // Planet radius as fraction of star radius
let orbitalPeriod = 5; // Seconds for one orbit
let orbitalAngle = 0;
let orbitRadius = 200;

// Light curve data
let lightCurve = [];
let maxDataPoints = 400;
let brightness = 1.0;

// Sliders
let planetSizeSlider, periodSlider;
let margin = 30;

// Layout
let starViewHeight = 280;
let graphHeight = 200;
let controlsHeight = 70;

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);

    // Planet size slider (as percentage of star)
    planetSizeSlider = createSlider(5, 30, 10, 1);
    planetSizeSlider.position(margin + 150, starViewHeight + graphHeight + 15);
    planetSizeSlider.style('width', '200px');

    // Orbital period slider
    periodSlider = createSlider(2, 15, 5, 0.5);
    periodSlider.position(margin + 150, starViewHeight + graphHeight + 45);
    periodSlider.style('width', '200px');

    // Initialize light curve with baseline
    for (let i = 0; i < maxDataPoints; i++) {
        lightCurve.push(1.0);
    }
}

function draw() {
    background(20, 20, 40);

    // Update parameters from sliders
    planetRadiusRatio = planetSizeSlider.value() / 100;
    orbitalPeriod = periodSlider.value();

    // Calculate planet position (edge-on orbit for maximum transit visibility)
    let angularSpeed = TWO_PI / (orbitalPeriod * 60); // 60 fps
    orbitalAngle += angularSpeed;
    if (orbitalAngle > TWO_PI) orbitalAngle -= TWO_PI;

    // Planet x position (circular orbit viewed edge-on)
    let planetX = canvasWidth / 2 + orbitRadius * cos(orbitalAngle);
    let planetY = starViewHeight / 2 + 20; // Same Y as star (edge-on view)
    let planetRadius = starRadius * planetRadiusRatio;

    // Calculate brightness based on transit
    brightness = calculateBrightness(planetX, planetY, planetRadius);

    // Update light curve
    lightCurve.push(brightness);
    if (lightCurve.length > maxDataPoints) {
        lightCurve.shift();
    }

    // Draw star view section
    drawStarView(planetX, planetY, planetRadius);

    // Draw light curve graph
    drawLightCurve();

    // Draw controls labels
    drawControls();

    // Draw transit indicator
    drawTransitIndicator(brightness);
}

function calculateBrightness(planetX, planetY, planetRadius) {
    let starX = canvasWidth / 2;
    let starY = starViewHeight / 2 + 20;

    // Distance between planet center and star center
    let d = dist(planetX, planetY, starX, starY);

    // Check if planet is in front of star (sin(angle) > 0 means near side of orbit)
    // angles 0 to PI: planet is between observer and star (can transit)
    // angles PI to 2PI: planet is behind star (no transit)
    let inFront = sin(orbitalAngle) > 0;

    if (!inFront) {
        return 1.0; // Planet behind star, full brightness
    }

    // Calculate overlap area
    let R = starRadius;
    let r = planetRadius;

    if (d >= R + r) {
        return 1.0; // No overlap
    } else if (d <= abs(R - r)) {
        // Complete overlap (planet fully in front of star)
        let blockedArea = PI * r * r;
        let starArea = PI * R * R;
        return 1.0 - (blockedArea / starArea);
    } else {
        // Partial overlap - use lens intersection formula
        let part1 = r * r * acos((d * d + r * r - R * R) / (2 * d * r));
        let part2 = R * R * acos((d * d + R * R - r * r) / (2 * d * R));
        let part3 = 0.5 * sqrt((-d + r + R) * (d + r - R) * (d - r + R) * (d + r + R));
        let overlapArea = part1 + part2 - part3;
        let starArea = PI * R * R;
        return 1.0 - (overlapArea / starArea);
    }
}

function drawStarView(planetX, planetY, planetRadius) {
    let starX = canvasWidth / 2;
    let starY = starViewHeight / 2 + 20;

    // Section background
    fill(15, 15, 30);
    noStroke();
    rect(0, 0, canvasWidth, starViewHeight);

    // Draw some background stars
    fill(255, 255, 255, 100);
    randomSeed(42);
    for (let i = 0; i < 50; i++) {
        let sx = random(canvasWidth);
        let sy = random(starViewHeight);
        let size = random(1, 3);
        ellipse(sx, sy, size, size);
    }

    // Draw orbital path (dashed line)
    stroke(100, 100, 150, 100);
    strokeWeight(1);
    drawingContext.setLineDash([5, 5]);
    noFill();
    ellipse(starX, starY, orbitRadius * 2, 20); // Ellipse for edge-on view
    drawingContext.setLineDash([]);

    // Draw star with glow effect
    noStroke();
    let glowLayers = 5;
    for (let i = glowLayers; i > 0; i--) {
        let alpha = map(i, glowLayers, 1, 30, 200);
        let size = starRadius * 2 + i * 20;
        fill(255, 200, 100, alpha * brightness);
        ellipse(starX, starY, size, size);
    }

    // Star surface
    fill(255, 240, 200);
    ellipse(starX, starY, starRadius * 2, starRadius * 2);

    // Draw planet only when in front of star (visible to observer)
    let inFront = sin(orbitalAngle) > 0;
    if (inFront) {
        fill(50, 50, 80);
        stroke(30, 30, 50);
        strokeWeight(2);
        ellipse(planetX, planetY, planetRadius * 2, planetRadius * 2);
    }
    // Planet is completely hidden when behind star - no drawing

    // Title
    fill(255);
    noStroke();
    textSize(24);
    textAlign(LEFT, TOP);
    text("Exoplanet Transit Detection", margin, 10);

    // Transit depth display
    let transitDepth = (1 - brightness) * 100;
    textSize(14);
    textAlign(RIGHT, TOP);
    fill(200, 200, 255);
    text(`Transit Depth: ${transitDepth.toFixed(2)}%`, canvasWidth - margin*2, 10);

    let status = inFront && transitDepth > 0.01 ? "TRANSITING" : (inFront ? "Approaching" : "Behind Star");
    fill(transitDepth > 0.01 && inFront ? color(255, 100, 100) : color(150, 150, 200));
    text(status, canvasWidth - margin*2, 30);
}

function drawLightCurve() {
    let graphY = starViewHeight;
    let graphWidth = canvasWidth - margin * 2;

    // Graph background
    fill(10, 10, 25);
    stroke(50, 50, 80);
    strokeWeight(1);
    rect(margin, graphY, graphWidth, graphHeight);

    // Grid lines
    stroke(40, 40, 60);
    strokeWeight(1);

    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
        let y = graphY + graphHeight * i / 4;
        line(margin, y, canvasWidth - margin, y);
    }

    // Y-axis labels
    fill(150, 150, 200);
    noStroke();
    textSize(11);
    textAlign(RIGHT, CENTER);
    for (let i = 0; i <= 4; i++) {
        let y = graphY + graphHeight * i / 4;
        let val = 1.0 - (i * 0.01); // 1.00 to 0.96
        text(val.toFixed(2), margin - 5, y);
    }

    // X-axis label
    textAlign(CENTER, TOP);
    text("Time →", canvasWidth / 2, graphY + graphHeight + 5);

    // Y-axis label
    push();
    translate(15, graphY + graphHeight / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text("Relative Brightness", 0, 0);
    pop();

    // Graph title in the upper left
    textAlign(LEFT, TOP);
    textSize(14);
    fill(200, 200, 255);
    text("Light Curve", margin + 10, graphY -20);

    // Draw light curve
    stroke(100, 200, 255);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < lightCurve.length; i++) {
        let x = map(i, 0, maxDataPoints, margin, canvasWidth - margin);
        // Map brightness 0.96-1.0 to fill the graph height
        let minBrightness = 0.96;
        let y = map(lightCurve[i], minBrightness, 1.0, graphY + graphHeight, graphY);
        y = constrain(y, graphY, graphY + graphHeight);
        vertex(x, y);
    }
    endShape();

    // Current position marker
    let currentX = canvasWidth - margin;
    let currentY = map(brightness, 0.96, 1.0, graphY + graphHeight, graphY);
    currentY = constrain(currentY, graphY, graphY + graphHeight);
    fill(255, 100, 100);
    noStroke();
    ellipse(currentX, currentY, 8, 8);
}

function drawControls() {
    let controlsY = starViewHeight + graphHeight;

    // Controls background
    fill(25, 25, 45);
    noStroke();
    rect(0, controlsY, canvasWidth, controlsHeight);

    // Divider line
    stroke(60, 60, 100);
    strokeWeight(1);
    line(0, controlsY, canvasWidth, controlsY);

    // Labels
    fill(200, 200, 255);
    noStroke();
    textSize(13);
    textAlign(LEFT, CENTER);

    text(`Planet Size: ${planetSizeSlider.value()}% of star`, margin/2, controlsY + 22);
    text(`Orbital Period: ${periodSlider.value().toFixed(1)} seconds`, margin/2, controlsY + 52);

    // Current values on right side
    textAlign(RIGHT, CENTER);
    let planetRadiusKm = (planetSizeSlider.value() / 100 * 696340).toFixed(0); // Sun radius = 696,340 km
    text(`(${planetRadiusKm} km if Sun-sized star)`, canvasWidth - margin*2, controlsY + 22);

    // Transit depth calculation
    let depth = pow(planetSizeSlider.value() / 100, 2) * 100;
    text(`Expected max transit depth: ${depth.toFixed(2)}%`, canvasWidth - margin*2, controlsY + 52);
}

function drawTransitIndicator(brightness) {
    // Visual indicator when transit is occurring
    if (brightness < 0.9999) {
        let transitDepth = (1 - brightness) * 100;

        // Pulsing border effect
        let pulse = sin(frameCount * 0.1) * 0.3 + 0.7;
        stroke(255, 100, 100, 150 * pulse);
        strokeWeight(3);
        noFill();
        rect(2, 2, canvasWidth - 4, starViewHeight - 4, 5);
    }
}

// Reset light curve when parameters change significantly
function mouseReleased() {
    // Optional: could reset light curve here
}
