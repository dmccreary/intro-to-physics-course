// Longitudinal Wave Animation MicroSim
// Demonstrates how particles in a longitudinal wave move parallel to wave propagation direction

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 350;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 120;
let defaultTextSize = 16;

// Wave parameters
let amplitude = 5;
let waveSpeed = 3;
let wavelength = 120;
let numParticles = 60;

// Simulation state
let particles = [];
let wavePosition = -200;
let isRunning = false;
let showDensityGraph = true;

// UI Elements
let amplitudeSlider, speedSlider, wavelengthSlider;
let startButton, stopButton, resetButton;
let densityCheckbox;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Initialize particles
    initializeParticles();

    // Create sliders
    let sliderY = drawHeight + 15;
    let sliderWidth = 120;

    // Amplitude slider
    amplitudeSlider = createSlider(1, 10, 5, 0.5);
    amplitudeSlider.position(sliderLeftMargin, sliderY);
    amplitudeSlider.size(sliderWidth);

    // Speed slider
    speedSlider = createSlider(1, 8, 3, 0.5);
    speedSlider.position(sliderLeftMargin + 180, sliderY);
    speedSlider.size(sliderWidth);

    // Wavelength slider
    wavelengthSlider = createSlider(80, 200, 120, 5);
    wavelengthSlider.position(sliderLeftMargin + 360, sliderY);
    wavelengthSlider.size(sliderWidth);

    // Create buttons
    let buttonY = drawHeight + 50;
    startButton = createButton('Start Continuous');
    startButton.position(margin, buttonY);
    startButton.mousePressed(startWave);

    stopButton = createButton('Stop');
    stopButton.position(margin + 115, buttonY);
    stopButton.mousePressed(stopWave);

    resetButton = createButton('Reset');
    resetButton.position(margin + 165, buttonY);
    resetButton.mousePressed(resetSimulation);

    // Create checkbox
    densityCheckbox = createCheckbox(' Show density graph', true);
    densityCheckbox.position(margin + 230, buttonY + 3);
    densityCheckbox.changed(() => showDensityGraph = densityCheckbox.checked());

    describe('Longitudinal wave animation showing particles oscillating horizontally, creating compressions and rarefactions', LABEL);
}

function initializeParticles() {
    particles = [];
    let spacing = (canvasWidth - 2 * margin) / (numParticles - 1);
    let baseY = 150; // Main particle line

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            baseX: margin + i * spacing,
            x: margin + i * spacing,
            y: baseY,
            vx: 0,
            spacing: spacing
        });
    }
}

function startWave() {
    isRunning = true;
}

function stopWave() {
    isRunning = false;
}

function resetSimulation() {
    wavePosition = -200;
    isRunning = false;
    initializeParticles();
}

function draw() {
    updateCanvasSize();

    // Get current slider values
    amplitude = amplitudeSlider.value();
    waveSpeed = speedSlider.value();
    wavelength = wavelengthSlider.value();

    // Draw background
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
    noStroke();
    textSize(24);
    textAlign(CENTER, TOP);
    text('Longitudinal Wave Animation', canvasWidth / 2, 10);

    // Draw reference line
    stroke(200);
    strokeWeight(1);
    line(margin, 150, canvasWidth - margin, 150);

    // Draw direction labels
    textSize(14);
    textAlign(LEFT, CENTER);
    fill('#2196F3');
    text('Wave Direction', canvasWidth / 2 - 60, 50);
    drawArrow(canvasWidth / 2 + 50, 50, canvasWidth / 2 + 100, 50, '#2196F3');

    // Particle motion label
    fill('#666');
    textAlign(CENTER, CENTER);
    text('Particle Motion', 70, 75);
    drawArrow(30, 75, 20, 75, '#4CAF50');
    drawArrow(110, 75, 120, 75, '#E91E63');

    // Update wave position for continuous wave
    if (isRunning) {
        wavePosition += waveSpeed;
    }

    // Calculate and draw particles
    updateParticles();
    drawCompressionRegions();
    drawParticles();

    // Draw density graph if enabled
    if (showDensityGraph) {
        drawDensityGraph();
    }

    // Draw slider labels
    drawSliderLabels();
}

function updateParticles() {
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        let prevX = p.x;

        // Calculate displacement for continuous wave
        let phase = (TWO_PI * (p.baseX - wavePosition)) / wavelength;

        // Displacement is in the x-direction (parallel to wave motion)
        let displacement = amplitude * sin(phase);

        if (isRunning || wavePosition > 0) {
            p.x = p.baseX + displacement;
        } else {
            p.x = p.baseX;
        }

        // Calculate velocity for color coding
        p.vx = p.x - prevX;
    }
}

function drawCompressionRegions() {
    // Calculate local density and draw colored regions
    noStroke();

    for (let x = margin; x < canvasWidth - margin; x += 5) {
        // Count particles near this x position
        let density = 0;
        let searchRadius = 20;

        for (let i = 0; i < particles.length; i++) {
            let dist = abs(particles[i].x - x);
            if (dist < searchRadius) {
                density += 1 - dist / searchRadius;
            }
        }

        // Normalize and color based on density
        let normalDensity = 2.5; // Expected average density
        let colorIntensity = map(density, normalDensity * 0.5, normalDensity * 1.5, 0, 255);
        colorIntensity = constrain(colorIntensity, 0, 255);

        if (density > normalDensity) {
            // Compression - blue
            fill(100, 150, 255, map(density, normalDensity, normalDensity * 2, 30, 100));
        } else {
            // Rarefaction - red
            fill(255, 100, 100, map(density, 0, normalDensity, 100, 30));
        }

        rect(x, 120, 5, 60);
    }
}

function drawParticles() {
    noStroke();

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        // Color based on velocity direction
        if (abs(p.vx) < 0.05) {
            fill('#2196F3'); // Blue at rest
        } else if (p.vx > 0) {
            fill('#E91E63'); // Pink moving right (with wave)
        } else {
            fill('#4CAF50'); // Green moving left (against wave)
        }

        circle(p.x, p.y, 10);
    }
}

function drawDensityGraph() {
    let graphY = 250;
    let graphHeight = 80;

    // Graph background
    fill(255, 255, 255, 200);
    stroke(200);
    strokeWeight(1);
    rect(margin, graphY, canvasWidth - 2 * margin, graphHeight, 5);

    // Draw density wave as sine curve
    stroke('#9C27B0');
    strokeWeight(2);
    noFill();
    beginShape();

    for (let x = margin; x < canvasWidth - margin; x += 2) {
        let phase = (TWO_PI * (x - wavePosition)) / wavelength;
        let density = sin(phase);
        let y = graphY + graphHeight / 2 - density * (graphHeight / 2 - 10);
        vertex(x, y);
    }
    endShape();

    // Axis label
    fill('#666');
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('Density Graph (Compression = up, Rarefaction = down)', canvasWidth / 2, graphY + graphHeight + 5);

    // Labels on sides
    textAlign(RIGHT, CENTER);
    textSize(10);
    text('High', margin - 5, graphY + 15);
    text('Low', margin - 5, graphY + graphHeight - 15);
}

function drawArrow(x1, y1, x2, y2, col) {
    stroke(col);
    strokeWeight(2);
    line(x1, y1, x2, y2);

    // Arrowhead
    let angle = atan2(y2 - y1, x2 - x1);
    let headLength = 8;

    fill(col);
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -headLength, -headLength / 2, -headLength, headLength / 2);
    pop();
}

function drawSliderLabels() {
    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);

    let labelY = drawHeight + 25;

    // Amplitude label
    text('Amplitude: ' + amplitude.toFixed(1) + 'px', margin, labelY);

    // Speed label
    text('Speed: ' + waveSpeed.toFixed(1), margin + 180, labelY);

    // Wavelength label
    text('Wavelength: ' + wavelength + 'px', margin + 360, labelY);

    // Color legend
    textSize(12);
    let legendY = drawHeight + 90;

    fill(100, 150, 255);
    rect(margin, legendY - 8, 20, 16, 3);
    fill('black');
    text('Compression', margin + 25, legendY);

    fill(255, 100, 100);
    rect(margin + 120, legendY - 8, 20, 16, 3);
    fill('black');
    text('Rarefaction', margin + 145, legendY);

    // Particle color legend
    let legendY2 = drawHeight + 115;

    fill('#2196F3');
    circle(margin + 5, legendY2, 10);
    fill('black');
    text('At rest', margin + 15, legendY2);

    fill('#4CAF50');
    circle(margin + 80, legendY2, 10);
    fill('black');
    text('Moving left', margin + 90, legendY2);

    fill('#E91E63');
    circle(margin + 175, legendY2, 10);
    fill('black');
    text('Moving right', margin + 185, legendY2);
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
    initializeParticles();

    // Update slider positions
    let sliderWidth = 120;
    if (amplitudeSlider) {
        amplitudeSlider.position(sliderLeftMargin, drawHeight + 15);
        amplitudeSlider.size(sliderWidth);
    }
    if (speedSlider) {
        speedSlider.position(sliderLeftMargin + 180, drawHeight + 15);
        speedSlider.size(sliderWidth);
    }
    if (wavelengthSlider) {
        wavelengthSlider.position(sliderLeftMargin + 360, drawHeight + 15);
        wavelengthSlider.size(sliderWidth);
    }
}
