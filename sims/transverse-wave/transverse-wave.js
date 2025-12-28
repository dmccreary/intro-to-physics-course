// Transverse Wave Animation MicroSim
// Demonstrates how particles in a transverse wave move perpendicular to wave propagation direction

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 120;
let defaultTextSize = 16;

// Wave parameters
let amplitude = 30;
let waveSpeed = 3;
let wavelength = 100;
let numParticles = 50;

// Simulation state
let particles = [];
let wavePosition = -200; // Position of wave front
let isRunning = false;
let showPaths = false;

// UI Elements
let amplitudeSlider, speedSlider, wavelengthSlider;
let sendPulseButton, resetButton;
let showPathsCheckbox;

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
    amplitudeSlider = createSlider(5, 50, 30, 1);
    amplitudeSlider.position(sliderLeftMargin, sliderY);
    amplitudeSlider.size(sliderWidth);

    // Speed slider
    speedSlider = createSlider(1, 10, 3, 0.5);
    speedSlider.position(sliderLeftMargin + 180, sliderY);
    speedSlider.size(sliderWidth);

    // Wavelength slider
    wavelengthSlider = createSlider(50, 200, 100, 5);
    wavelengthSlider.position(sliderLeftMargin + 360, sliderY);
    wavelengthSlider.size(sliderWidth);

    // Create buttons
    let buttonY = drawHeight + 50;
    sendPulseButton = createButton('Send Pulse');
    sendPulseButton.position(margin, buttonY);
    sendPulseButton.mousePressed(sendPulse);

    resetButton = createButton('Reset');
    resetButton.position(margin + 90, buttonY);
    resetButton.mousePressed(resetSimulation);

    // Create checkbox
    showPathsCheckbox = createCheckbox(' Show particle paths', false);
    showPathsCheckbox.position(margin + 170, buttonY + 3);
    showPathsCheckbox.changed(() => showPaths = showPathsCheckbox.checked());

    describe('Transverse wave animation showing particles oscillating vertically as a wave travels horizontally', LABEL);
}

function initializeParticles() {
    particles = [];
    let spacing = (canvasWidth - 2 * margin) / (numParticles - 1);
    let baseY = drawHeight / 2;

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: margin + i * spacing,
            baseY: baseY,
            y: baseY,
            vy: 0, // velocity for color coding
            spacing: spacing
        });
    }
}

function sendPulse() {
    wavePosition = -wavelength; // Start wave from left edge
    isRunning = true;
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
    text('Transverse Wave Animation', canvasWidth / 2, 10);

    // Draw reference grid
    drawGrid();

    // Draw direction labels
    textSize(16);
    textAlign(LEFT, CENTER);
    fill('#2196F3');
    text('Wave Direction', canvasWidth / 2 - 60, drawHeight - 30);
    drawArrow(canvasWidth / 2 + 50, drawHeight - 30, canvasWidth / 2 + 100, drawHeight - 30, '#2196F3');

    // Particle motion label
    fill('#4CAF50');
    textAlign(LEFT, CENTER);
    text('Particle Motion', margin, 60);
    drawArrow(margin + 100, 50, margin + 100, 40, '#4CAF50');
    drawArrow(margin + 100, 70, margin + 100, 80, '#E91E63');

    // Update wave position
    if (isRunning) {
        wavePosition += waveSpeed;

        // Stop when wave has passed all particles
        if (wavePosition > canvasWidth + wavelength) {
            isRunning = false;
        }
    }

    // Calculate and draw particles
    updateParticles();
    drawConnections();
    drawParticles();

    // Draw particle paths if enabled
    if (showPaths) {
        drawParticlePaths();
    }

    // Draw slider labels
    drawSliderLabels();
}

function drawGrid() {
    stroke(220);
    strokeWeight(1);

    // Horizontal center line (equilibrium)
    stroke(180);
    strokeWeight(2);
    line(margin, drawHeight / 2, canvasWidth - margin, drawHeight / 2);

    // Vertical reference lines
    stroke(230);
    strokeWeight(1);
    for (let x = margin; x < canvasWidth - margin; x += 50) {
        line(x, 50, x, drawHeight - 50);
    }
}

function updateParticles() {
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        let prevY = p.y;

        // Calculate displacement using gaussian-modulated sine wave (pulse)
        let relativeX = p.x - wavePosition;

        // Create a pulse that travels: use gaussian envelope
        let pulseWidth = wavelength * 1.5;
        let envelope = exp(-pow(relativeX / pulseWidth, 2) * 2);

        // Sine wave within the envelope
        let phase = (TWO_PI * relativeX) / wavelength;
        let displacement = amplitude * sin(phase) * envelope;

        // Only apply displacement if wave is active
        if (isRunning || wavePosition > -100) {
            p.y = p.baseY - displacement;
        } else {
            p.y = p.baseY;
        }

        // Calculate velocity for color coding
        p.vy = p.y - prevY;
    }
}

function drawConnections() {
    stroke(180);
    strokeWeight(1);

    for (let i = 0; i < particles.length - 1; i++) {
        line(particles[i].x, particles[i].y, particles[i + 1].x, particles[i + 1].y);
    }
}

function drawParticles() {
    noStroke();

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        // Color based on velocity direction
        if (abs(p.vy) < 0.1) {
            fill('#2196F3'); // Blue at rest
        } else if (p.vy < 0) {
            fill('#4CAF50'); // Green moving up (negative y is up)
        } else {
            fill('#E91E63'); // Red/pink moving down
        }

        circle(p.x, p.y, 12);
    }
}

function drawParticlePaths() {
    stroke(200);
    strokeWeight(1);
    setLineDash([5, 5]);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        line(p.x, p.baseY - amplitude - 10, p.x, p.baseY + amplitude + 10);
    }

    setLineDash([]);
}

function setLineDash(pattern) {
    drawingContext.setLineDash(pattern);
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
    text('Amplitude: ' + amplitude + 'px', margin, labelY);

    // Speed label
    text('Speed: ' + waveSpeed.toFixed(1), margin + 180, labelY);

    // Wavelength label
    text('Wavelength: ' + wavelength + 'px', margin + 360, labelY);

    // Color legend
    textSize(12);
    let legendY = drawHeight + 80;

    fill('#2196F3');
    circle(margin + 350, legendY, 10);
    fill('black');
    text('At rest', margin + 360, legendY);

    fill('#4CAF50');
    circle(margin + 420, legendY, 10);
    fill('black');
    text('Moving up', margin + 430, legendY);

    fill('#E91E63');
    circle(margin + 510, legendY, 10);
    fill('black');
    text('Moving down', margin + 520, legendY);
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

    // Update slider positions and sizes
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
