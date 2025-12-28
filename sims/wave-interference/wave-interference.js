// Two-Source Wave Interference Simulation MicroSim
// Demonstrates constructive and destructive interference patterns

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 140;

// Wave parameters
let frequency = 2;
let sourceSeparation = 150;
let phaseDifference = 0;
let wavelength = 40;

// Simulation state
let time = 0;
let isRunning = true;
let showNodalLines = false;
let showIntensity = false;

// Source positions
let source1, source2;

// UI Elements
let freqSlider, sepSlider, phaseSlider, waveSlider;
let startButton, resetButton;
let nodalCheckbox, intensityCheckbox;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Create sliders
    let sliderY = drawHeight + 15;
    let sliderWidth = 100;

    freqSlider = createSlider(0.5, 5, 2, 0.5);
    freqSlider.position(sliderLeftMargin, sliderY);
    freqSlider.size(sliderWidth);

    sepSlider = createSlider(50, 300, 150, 10);
    sepSlider.position(sliderLeftMargin + 150, sliderY);
    sepSlider.size(sliderWidth);

    phaseSlider = createSlider(0, 360, 0, 15);
    phaseSlider.position(sliderLeftMargin + 300, sliderY);
    phaseSlider.size(sliderWidth);

    waveSlider = createSlider(20, 80, 40, 5);
    waveSlider.position(sliderLeftMargin + 450, sliderY);
    waveSlider.size(sliderWidth);

    // Buttons
    let buttonY = drawHeight + 55;
    startButton = createButton('Stop');
    startButton.position(margin, buttonY);
    startButton.mousePressed(toggleAnimation);

    resetButton = createButton('Reset');
    resetButton.position(margin + 55, buttonY);
    resetButton.mousePressed(resetSimulation);

    // Checkboxes
    nodalCheckbox = createCheckbox(' Show nodal lines', false);
    nodalCheckbox.position(margin + 120, buttonY + 3);
    nodalCheckbox.changed(() => showNodalLines = nodalCheckbox.checked());

    intensityCheckbox = createCheckbox(' Show intensity', false);
    intensityCheckbox.position(margin + 270, buttonY + 3);
    intensityCheckbox.changed(() => showIntensity = intensityCheckbox.checked());

    describe('Two-source wave interference simulation showing constructive and destructive interference patterns', LABEL);
}

function toggleAnimation() {
    isRunning = !isRunning;
    startButton.html(isRunning ? 'Stop' : 'Start');
}

function resetSimulation() {
    time = 0;
    isRunning = true;
    startButton.html('Stop');
}

function draw() {
    updateCanvasSize();

    // Get slider values
    frequency = freqSlider.value();
    sourceSeparation = sepSlider.value();
    phaseDifference = phaseSlider.value() * PI / 180;
    wavelength = waveSlider.value();

    // Calculate source positions
    let centerX = canvasWidth / 2;
    let centerY = drawHeight / 2;
    source1 = { x: centerX - sourceSeparation / 2, y: centerY };
    source2 = { x: centerX + sourceSeparation / 2, y: centerY };

    // Update time
    if (isRunning) {
        time += 0.05 * frequency;
    }

    // Draw background
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
    textSize(20);
    textAlign(CENTER, TOP);
    text('Two-Source Wave Interference', canvasWidth / 2, 10);

    // Draw interference pattern
    if (showIntensity) {
        drawIntensityPattern();
    }
    drawWavePattern();

    // Draw nodal lines if enabled
    if (showNodalLines) {
        drawNodalLines();
    }

    // Draw sources
    drawSources();

    // Draw labels
    drawSliderLabels();
    drawLegend();
}

function drawWavePattern() {
    loadPixels();

    for (let x = 0; x < canvasWidth; x += 2) {
        for (let y = 40; y < drawHeight - 10; y += 2) {
            // Distance from each source
            let d1 = dist(x, y, source1.x, source1.y);
            let d2 = dist(x, y, source2.x, source2.y);

            // Wave amplitudes from each source
            let k = TWO_PI / wavelength;
            let omega = TWO_PI * frequency;

            let wave1 = sin(k * d1 - time);
            let wave2 = sin(k * d2 - time + phaseDifference);

            // Superposition
            let amplitude = (wave1 + wave2) / 2;

            // Fade with distance
            let fade1 = exp(-d1 * 0.003);
            let fade2 = exp(-d2 * 0.003);
            let fade = (fade1 + fade2) / 2;

            amplitude *= fade;

            // Map to color
            let r, g, b;
            if (amplitude > 0) {
                // Positive = blue
                r = map(amplitude, 0, 1, 240, 50);
                g = map(amplitude, 0, 1, 248, 100);
                b = map(amplitude, 0, 1, 255, 200);
            } else {
                // Negative = red
                r = map(amplitude, -1, 0, 200, 240);
                g = map(amplitude, -1, 0, 50, 248);
                b = map(amplitude, -1, 0, 50, 255);
            }

            // Set pixels
            for (let dx = 0; dx < 2; dx++) {
                for (let dy = 0; dy < 2; dy++) {
                    let idx = 4 * ((y + dy) * width + (x + dx));
                    pixels[idx] = r;
                    pixels[idx + 1] = g;
                    pixels[idx + 2] = b;
                    pixels[idx + 3] = 255;
                }
            }
        }
    }

    updatePixels();
}

function drawIntensityPattern() {
    noStroke();

    for (let x = 0; x < canvasWidth; x += 4) {
        for (let y = 40; y < drawHeight - 10; y += 4) {
            let d1 = dist(x, y, source1.x, source1.y);
            let d2 = dist(x, y, source2.x, source2.y);

            // Path difference
            let pathDiff = abs(d2 - d1);

            // Intensity based on path difference
            let k = TWO_PI / wavelength;
            let intensity = pow(cos(k * pathDiff / 2 + phaseDifference / 2), 2);

            // Fade with distance
            let fade = exp(-(d1 + d2) * 0.002);
            intensity *= fade;

            fill(255, 255, 0, intensity * 150);
            rect(x, y, 4, 4);
        }
    }
}

function drawNodalLines() {
    stroke(100, 100, 100, 150);
    strokeWeight(2);

    // Draw lines where destructive interference occurs
    // Path difference = (m + 0.5) * wavelength

    for (let m = -10; m <= 10; m++) {
        let targetPathDiff = (m + 0.5) * wavelength;

        // Find points with this path difference
        beginShape();
        for (let y = 40; y < drawHeight - 10; y += 5) {
            // Solve for x where |d2 - d1| = targetPathDiff
            // This is a hyperbola equation
            let a = targetPathDiff / 2;
            let c = sourceSeparation / 2;

            if (abs(a) < c) {
                let b = sqrt(c * c - a * a);
                let centerX = canvasWidth / 2;
                let centerY = drawHeight / 2;

                // Parametric form of hyperbola
                let t = (y - centerY) / 100;
                let xOffset = a / cos(atan(t * b / a));

                if (isFinite(xOffset) && abs(xOffset) < canvasWidth) {
                    let x = centerX + (m >= 0 ? xOffset : -xOffset);
                    if (x > 0 && x < canvasWidth) {
                        vertex(x, y);
                    }
                }
            }
        }
        endShape();
    }
}

function drawSources() {
    // Source 1
    fill('#E53935');
    stroke('#B71C1C');
    strokeWeight(2);
    circle(source1.x, source1.y, 20);

    // Source 2
    fill('#E53935');
    circle(source2.x, source2.y, 20);

    // Labels
    fill('white');
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text('S1', source1.x, source1.y);
    text('S2', source2.x, source2.y);
}

function drawSliderLabels() {
    fill('black');
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);

    let labelY = drawHeight + 25;

    text('Freq: ' + frequency.toFixed(1) + ' Hz', margin, labelY);
    text('Sep: ' + sourceSeparation + ' px', margin + 150, labelY);
    text('Phase: ' + (phaseDifference * 180 / PI).toFixed(0) + '°', margin + 300, labelY);
    text('λ: ' + wavelength + ' px', margin + 450, labelY);
}

function drawLegend() {
    let legendY = drawHeight + 95;

    textSize(12);
    textAlign(LEFT, CENTER);

    // Color legend
    fill(50, 100, 200);
    rect(margin, legendY - 8, 20, 16);
    fill('black');
    text('Crest (positive)', margin + 25, legendY);

    fill(200, 50, 50);
    rect(margin + 130, legendY - 8, 20, 16);
    fill('black');
    text('Trough (negative)', margin + 155, legendY);

    fill(240, 248, 255);
    stroke(200);
    rect(margin + 290, legendY - 8, 20, 16);
    fill('black');
    noStroke();
    text('Equilibrium', margin + 315, legendY);

    // Phase explanation
    let infoY = drawHeight + 120;
    textSize(11);
    fill('#666');
    if (phaseDifference === 0) {
        text('Sources are in phase - central maximum on axis', margin, infoY);
    } else if (abs(phaseDifference - PI) < 0.1) {
        text('Sources 180° out of phase - central minimum on axis', margin, infoY);
    }
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
