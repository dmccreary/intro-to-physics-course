// Resonance Amplitude vs. Driving Frequency Interactive Graph
// Shows how amplitude depends on driving frequency and damping

let canvasWidth = 750;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Controls
let dampingSlider;
let dampingValue = 0.3;

// Graph parameters
let graphX = 80;
let graphY = 60;
let graphWidth, graphHeight;

// Mouse hover
let hoveredPoint = null;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Damping slider
    dampingSlider = createSlider(0.05, 2.0, 0.3, 0.05);
    dampingSlider.position(canvasWidth/2 - 100, drawHeight + 60);
    dampingSlider.size(200);

    describe('Interactive graph showing resonance amplitude versus driving frequency for different damping levels', LABEL);
}

function draw() {
    updateCanvasSize();
    dampingValue = dampingSlider.value();

    graphWidth = canvasWidth - 150;
    graphHeight = drawHeight - 120;

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
    textSize(20);
    textAlign(CENTER, TOP);
    noStroke();
    text('Resonance: Amplitude Response vs. Driving Frequency', canvasWidth / 2, 12);

    // Draw graph background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(graphX, graphY, graphWidth, graphHeight, 5);

    // Draw grid
    drawGrid();

    // Draw multiple damping curves for reference (faded)
    drawReferenceCurves();

    // Draw main curve for current damping
    drawAmplitudeCurve(dampingValue, color(70, 130, 220), 3);

    // Draw resonance line
    drawResonanceLine();

    // Draw axes labels
    drawAxesLabels();

    // Draw legend
    drawLegend();

    // Draw annotations
    drawAnnotations();

    // Check hover
    checkHover();

    // Control labels
    fill(80);
    textSize(14);
    textAlign(CENTER, CENTER);
    text('Damping Coefficient (ζ):', canvasWidth/2, drawHeight + 30);
    text('ζ = ' + dampingValue.toFixed(2), canvasWidth/2, drawHeight + 85);

    // Damping interpretation
    textSize(12);
    if (dampingValue < 0.3) {
        fill(200, 50, 50);
        text('Low damping - Sharp, tall resonance peak', canvasWidth/2 + 180, drawHeight + 85);
    } else if (dampingValue < 0.7) {
        fill(230, 150, 50);
        text('Medium damping - Moderate peak', canvasWidth/2 + 180, drawHeight + 85);
    } else {
        fill(50, 150, 50);
        text('High damping - Broad, low peak', canvasWidth/2 + 180, drawHeight + 85);
    }
}

function drawGrid() {
    stroke(230);
    strokeWeight(1);

    // Vertical grid lines
    for (let ratio = 0; ratio <= 3; ratio += 0.5) {
        let x = graphX + (ratio / 3) * graphWidth;
        line(x, graphY, x, graphY + graphHeight);
    }

    // Horizontal grid lines
    for (let amp = 0; amp <= 20; amp += 5) {
        let y = graphY + graphHeight - (amp / 20) * graphHeight;
        line(graphX, y, graphX + graphWidth, y);
    }
}

function drawReferenceCurves() {
    // Draw faded reference curves for comparison
    let refDampings = [0.1, 0.5, 1.0, 2.0];
    let refColors = [
        color(255, 150, 150, 80),
        color(255, 200, 150, 80),
        color(150, 255, 150, 80),
        color(150, 200, 255, 80)
    ];

    for (let i = 0; i < refDampings.length; i++) {
        if (abs(refDampings[i] - dampingValue) > 0.1) {
            drawAmplitudeCurve(refDampings[i], refColors[i], 1);
        }
    }
}

function drawAmplitudeCurve(zeta, col, weight) {
    noFill();
    stroke(col);
    strokeWeight(weight);

    beginShape();
    for (let ratio = 0.01; ratio <= 3; ratio += 0.02) {
        let amp = calculateAmplitude(ratio, zeta);
        let x = graphX + (ratio / 3) * graphWidth;
        let y = graphY + graphHeight - (min(amp, 20) / 20) * graphHeight;
        vertex(x, y);
    }
    endShape();
}

function calculateAmplitude(omegaRatio, zeta) {
    // A/A0 = 1 / sqrt((1 - r²)² + (2ζr)²) where r = ωd/ω0
    let r = omegaRatio;
    let denominator = sqrt(pow(1 - r*r, 2) + pow(2*zeta*r, 2));
    return 1 / denominator;
}

function drawResonanceLine() {
    // Vertical dashed line at resonance
    let resX = graphX + (1 / 3) * graphWidth;

    stroke(200, 50, 50);
    strokeWeight(2);
    setLineDash([8, 4]);
    line(resX, graphY, resX, graphY + graphHeight);
    setLineDash([]);

    // Label
    fill(200, 50, 50);
    textSize(11);
    textAlign(CENTER, TOP);
    noStroke();
    text('Resonance', resX, graphY + graphHeight + 5);
    text('ωd/ω₀ = 1', resX, graphY + graphHeight + 18);
}

function drawAxesLabels() {
    fill(60);
    textSize(13);
    noStroke();

    // X-axis label
    textAlign(CENTER, TOP);
    text('Driving Frequency Ratio (ωd/ω₀)', graphX + graphWidth/2, graphY + graphHeight + 35);

    // Y-axis label
    push();
    translate(graphX - 50, graphY + graphHeight/2);
    rotate(-PI/2);
    textAlign(CENTER, BOTTOM);
    text('Amplitude Ratio (A/A₀)', 0, 0);
    pop();

    // X-axis values
    textSize(10);
    textAlign(CENTER, TOP);
    for (let ratio = 0; ratio <= 3; ratio += 0.5) {
        let x = graphX + (ratio / 3) * graphWidth;
        text(ratio.toFixed(1), x, graphY + graphHeight + 3);
    }

    // Y-axis values
    textAlign(RIGHT, CENTER);
    for (let amp = 0; amp <= 20; amp += 5) {
        let y = graphY + graphHeight - (amp / 20) * graphHeight;
        text(amp, graphX - 8, y);
    }
}

function drawLegend() {
    fill(255, 255, 255, 230);
    stroke(180);
    strokeWeight(1);
    rect(graphX + graphWidth - 180, graphY + 10, 170, 100, 5);

    fill(60);
    textSize(11);
    textAlign(LEFT, CENTER);
    noStroke();
    text('Reference damping levels:', graphX + graphWidth - 170, graphY + 25);

    // Legend items
    let yStart = graphY + 45;
    let items = [
        { zeta: 0.1, label: 'ζ = 0.1 (low)', col: color(255, 100, 100) },
        { zeta: 0.5, label: 'ζ = 0.5 (medium)', col: color(255, 180, 100) },
        { zeta: 1.0, label: 'ζ = 1.0 (critical)', col: color(100, 255, 100) },
        { zeta: 2.0, label: 'ζ = 2.0 (high)', col: color(100, 180, 255) }
    ];

    for (let i = 0; i < items.length; i++) {
        stroke(items[i].col);
        strokeWeight(2);
        line(graphX + graphWidth - 170, yStart + i * 15, graphX + graphWidth - 145, yStart + i * 15);

        fill(60);
        noStroke();
        textSize(10);
        text(items[i].label, graphX + graphWidth - 140, yStart + i * 15);
    }
}

function drawAnnotations() {
    // Peak annotation
    let peakRatio = sqrt(1 - 2*dampingValue*dampingValue);
    if (peakRatio > 0 && dampingValue < 0.707) {
        let peakAmp = calculateAmplitude(peakRatio, dampingValue);
        let peakX = graphX + (peakRatio / 3) * graphWidth;
        let peakY = graphY + graphHeight - (min(peakAmp, 20) / 20) * graphHeight;

        // Peak marker
        fill(70, 130, 220);
        noStroke();
        circle(peakX, peakY, 10);

        // Peak label
        if (peakAmp < 15) {
            fill(70, 130, 220);
            textSize(10);
            textAlign(LEFT, BOTTOM);
            text('Peak: A/A₀ = ' + peakAmp.toFixed(1), peakX + 10, peakY - 5);
        }
    }

    // Information box
    fill(255, 255, 220);
    stroke(200);
    strokeWeight(1);
    rect(graphX + 10, graphY + 10, 200, 50, 5);

    fill(60);
    textSize(10);
    textAlign(LEFT, CENTER);
    noStroke();
    text('At resonance, small driving force', graphX + 20, graphY + 25);
    text('→ large amplitude oscillations', graphX + 20, graphY + 40);

    // "Maximum energy transfer" label near resonance
    fill(200, 50, 50);
    textSize(10);
    textAlign(CENTER, BOTTOM);
    let resX = graphX + (1 / 3) * graphWidth;
    // Arrow pointing to resonance
    stroke(200, 50, 50);
    strokeWeight(1);
    line(resX + 50, graphY + 80, resX + 5, graphY + 100);

    noStroke();
    text('Maximum energy', resX + 80, graphY + 75);
    text('transfer', resX + 80, graphY + 88);
}

function checkHover() {
    // Show value on hover
    if (mouseX > graphX && mouseX < graphX + graphWidth &&
        mouseY > graphY && mouseY < graphY + graphHeight) {

        let ratio = ((mouseX - graphX) / graphWidth) * 3;
        let amp = calculateAmplitude(ratio, dampingValue);
        let expectedY = graphY + graphHeight - (min(amp, 20) / 20) * graphHeight;

        if (abs(mouseY - expectedY) < 20) {
            // Draw hover info
            fill(255, 255, 200);
            stroke(150);
            strokeWeight(1);
            rect(mouseX + 10, mouseY - 30, 120, 40, 5);

            fill(60);
            textSize(10);
            textAlign(LEFT, CENTER);
            noStroke();
            text('ωd/ω₀ = ' + ratio.toFixed(2), mouseX + 18, mouseY - 18);
            text('A/A₀ = ' + amp.toFixed(2), mouseX + 18, mouseY - 5);

            // Highlight point
            fill(70, 130, 220);
            noStroke();
            circle(mouseX, expectedY, 8);
        }
    }
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    dampingSlider.position(canvasWidth/2 - 100, drawHeight + 60);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(600, container.offsetWidth);
    }
}
