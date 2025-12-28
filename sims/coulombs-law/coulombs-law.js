// Coulomb's Law Force Calculator MicroSim
// Explore how electric force depends on charge magnitudes and separation distance

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 450;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 100;

// Physics constants
const k = 8.99e9; // Coulomb's constant N·m²/C²

// Charge parameters (in microcoulombs for UI)
let q1 = 5; // μC
let q2 = -5; // μC
let distance = 1.0; // meters

// UI Elements
let q1Slider, q2Slider, distSlider;
let resetButton;
let showGraphCheckbox;
let showGraph = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Create sliders
    let sliderY = drawHeight + 20;
    let sliderWidth = 150;

    q1Slider = createSlider(-10, 10, 5, 0.5);
    q1Slider.position(sliderLeftMargin, sliderY);
    q1Slider.size(sliderWidth);

    q2Slider = createSlider(-10, 10, -5, 0.5);
    q2Slider.position(sliderLeftMargin + 220, sliderY);
    q2Slider.size(sliderWidth);

    distSlider = createSlider(0.2, 3.0, 1.0, 0.1);
    distSlider.position(sliderLeftMargin + 440, sliderY);
    distSlider.size(sliderWidth);

    // Buttons and checkbox
    let buttonY = drawHeight + 70;
    resetButton = createButton('Reset');
    resetButton.position(margin, buttonY);
    resetButton.mousePressed(resetSimulation);

    showGraphCheckbox = createCheckbox(' Show 1/r² graph', false);
    showGraphCheckbox.position(margin + 80, buttonY + 3);
    showGraphCheckbox.changed(() => showGraph = showGraphCheckbox.checked());

    describe('Coulombs Law calculator showing two charged spheres with force vectors', LABEL);
}

function resetSimulation() {
    q1Slider.value(5);
    q2Slider.value(-5);
    distSlider.value(1.0);
}

function draw() {
    updateCanvasSize();

    // Get slider values
    q1 = q1Slider.value();
    q2 = q2Slider.value();
    distance = distSlider.value();

    // Calculate force
    let q1_C = q1 * 1e-6; // Convert μC to C
    let q2_C = q2 * 1e-6;
    let force = k * abs(q1_C * q2_C) / (distance * distance);
    let isAttractive = (q1 * q2) < 0;

    // Drawing area
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
    textSize(22);
    textAlign(CENTER, TOP);
    text("Coulomb's Law Force Calculator", canvasWidth / 2, 15);

    // Draw charges and force vectors
    let centerY = 200;
    let spacing = map(distance, 0.2, 3.0, 100, 350);
    let x1 = canvasWidth / 2 - spacing / 2;
    let x2 = canvasWidth / 2 + spacing / 2;

    // Draw distance line
    stroke(150);
    strokeWeight(1);
    setLineDash([5, 5]);
    line(x1, centerY + 50, x2, centerY + 50);
    setLineDash([]);

    // Distance label
    fill(100);
    noStroke();
    textSize(14);
    textAlign(CENTER, TOP);
    text('r = ' + distance.toFixed(1) + ' m', (x1 + x2) / 2, centerY + 55);

    // Draw charge 1
    drawCharge(x1, centerY, q1, 'q₁');

    // Draw charge 2
    drawCharge(x2, centerY, q2, 'q₂');

    // Draw force vectors
    drawForceVectors(x1, x2, centerY, force, isAttractive);

    // Draw formula and result panel
    drawFormulaPanel(force, isAttractive);

    // Draw graph if enabled
    if (showGraph) {
        drawInverseSquareGraph(force);
    }

    // Draw slider labels
    drawSliderLabels();
}

function drawCharge(x, y, q, label) {
    // Charge sphere
    let radius = 35;
    noStroke();

    if (q > 0) {
        fill('#E53935'); // Red for positive
    } else if (q < 0) {
        fill('#2196F3'); // Blue for negative
    } else {
        fill('#9E9E9E'); // Gray for neutral
    }

    circle(x, y, radius * 2);

    // Charge symbol
    fill('white');
    textSize(24);
    textAlign(CENTER, CENTER);
    if (q > 0) {
        text('+', x, y);
    } else if (q < 0) {
        text('−', x, y);
    }

    // Label
    fill('black');
    textSize(14);
    text(label + ' = ' + q.toFixed(1) + ' μC', x, y - 55);
}

function drawForceVectors(x1, x2, y, force, isAttractive) {
    // Scale force for display
    let maxArrowLen = 80;
    let arrowLen = map(log(force + 1e-10), log(1e-5), log(100), 10, maxArrowLen);
    arrowLen = constrain(arrowLen, 10, maxArrowLen);

    strokeWeight(4);

    if (isAttractive) {
        // Attractive: arrows point toward each other
        stroke('#4CAF50');
        fill('#4CAF50');

        // Force on q1 (pointing right toward q2)
        drawArrow(x1 + 40, y, x1 + 40 + arrowLen, y);
        // Force on q2 (pointing left toward q1)
        drawArrow(x2 - 40, y, x2 - 40 - arrowLen, y);
    } else {
        // Repulsive: arrows point away from each other
        stroke('#F44336');
        fill('#F44336');

        // Force on q1 (pointing left away from q2)
        drawArrow(x1 - 40, y, x1 - 40 - arrowLen, y);
        // Force on q2 (pointing right away from q1)
        drawArrow(x2 + 40, y, x2 + 40 + arrowLen, y);
    }

    // Force labels
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    if (isAttractive) {
        fill('#4CAF50');
        text('F', x1 + 40 + arrowLen / 2, y - 15);
        text('F', x2 - 40 - arrowLen / 2, y - 15);
    } else {
        fill('#F44336');
        text('F', x1 - 40 - arrowLen / 2, y - 15);
        text('F', x2 + 40 + arrowLen / 2, y - 15);
    }
}

function drawArrow(x1, y1, x2, y2) {
    line(x1, y1, x2, y2);

    let angle = atan2(y2 - y1, x2 - x1);
    let headLen = 12;

    push();
    translate(x2, y2);
    rotate(angle);
    noStroke();
    triangle(0, 0, -headLen, -headLen / 2, -headLen, headLen / 2);
    pop();
}

function drawFormulaPanel(force, isAttractive) {
    // Panel background
    let panelX = 30;
    let panelY = 280;
    let panelW = 280;
    let panelH = 150;

    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 10);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);

    let x = panelX + 15;
    let y = panelY + 15;
    let lineH = 22;

    // Formula
    textSize(16);
    text("Coulomb's Law:", x, y);
    y += lineH;

    textSize(14);
    text('F = k |q₁ q₂| / r²', x, y);
    y += lineH * 1.5;

    // Values
    textSize(12);
    text('k = 8.99 × 10⁹ N·m²/C²', x, y);
    y += lineH;
    text('q₁ = ' + q1.toFixed(1) + ' μC', x, y);
    y += lineH;
    text('q₂ = ' + q2.toFixed(1) + ' μC', x, y);
    y += lineH;
    text('r = ' + distance.toFixed(1) + ' m', x, y);

    // Result
    y = panelY + 15;
    x = panelX + 150;

    textSize(14);
    fill(isAttractive ? '#4CAF50' : '#F44336');
    text('Force:', x, y + lineH * 3);

    textSize(16);
    let forceStr;
    if (force < 0.001) {
        forceStr = force.toExponential(2) + ' N';
    } else if (force < 1) {
        forceStr = (force * 1000).toFixed(2) + ' mN';
    } else {
        forceStr = force.toFixed(2) + ' N';
    }
    text(forceStr, x, y + lineH * 4);

    textSize(12);
    text(isAttractive ? '(Attractive)' : '(Repulsive)', x, y + lineH * 5);
}

function drawInverseSquareGraph(currentForce) {
    // Graph panel on the right
    let graphX = canvasWidth - 280;
    let graphY = 280;
    let graphW = 250;
    let graphH = 150;

    // Background
    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(graphX, graphY, graphW, graphH, 10);

    // Graph area
    let plotX = graphX + 40;
    let plotY = graphY + 20;
    let plotW = graphW - 60;
    let plotH = graphH - 50;

    // Axes
    stroke(100);
    strokeWeight(1);
    line(plotX, plotY + plotH, plotX + plotW, plotY + plotH); // x-axis
    line(plotX, plotY, plotX, plotY + plotH); // y-axis

    // Axis labels
    fill(100);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    text('Distance r (m)', plotX + plotW / 2, plotY + plotH + 5);

    push();
    translate(plotX - 25, plotY + plotH / 2);
    rotate(-HALF_PI);
    text('Force F', 0, 0);
    pop();

    // Plot 1/r² curve
    stroke('#9C27B0');
    strokeWeight(2);
    noFill();

    let q1_C = q1 * 1e-6;
    let q2_C = q2 * 1e-6;
    let maxForce = k * abs(q1_C * q2_C) / (0.2 * 0.2);

    beginShape();
    for (let r = 0.2; r <= 3.0; r += 0.05) {
        let f = k * abs(q1_C * q2_C) / (r * r);
        let px = map(r, 0.2, 3.0, plotX, plotX + plotW);
        let py = map(f, 0, maxForce, plotY + plotH, plotY);
        py = constrain(py, plotY, plotY + plotH);
        vertex(px, py);
    }
    endShape();

    // Mark current operating point
    let currentX = map(distance, 0.2, 3.0, plotX, plotX + plotW);
    let currentY = map(currentForce, 0, maxForce, plotY + plotH, plotY);
    currentY = constrain(currentY, plotY, plotY + plotH);

    fill('#FF5722');
    noStroke();
    circle(currentX, currentY, 10);

    // Label
    textSize(9);
    fill(100);
    text('Current', currentX, currentY - 12);
}

function drawSliderLabels() {
    fill('black');
    noStroke();
    textSize(13);
    textAlign(LEFT, CENTER);

    let labelY = drawHeight + 30;

    // Q1 label with color
    fill(q1 > 0 ? '#E53935' : (q1 < 0 ? '#2196F3' : '#666'));
    text('q₁: ' + q1.toFixed(1) + ' μC', margin, labelY);

    // Q2 label with color
    fill(q2 > 0 ? '#E53935' : (q2 < 0 ? '#2196F3' : '#666'));
    text('q₂: ' + q2.toFixed(1) + ' μC', margin + 220, labelY);

    // Distance label
    fill('black');
    text('r: ' + distance.toFixed(1) + ' m', margin + 440, labelY);

    // Legend
    textSize(11);
    let legendY = drawHeight + 110;

    fill('#4CAF50');
    circle(margin + 200, legendY, 12);
    fill('black');
    text('Attractive (opposite charges)', margin + 210, legendY);

    fill('#F44336');
    circle(margin + 400, legendY, 12);
    fill('black');
    text('Repulsive (like charges)', margin + 410, legendY);
}

function setLineDash(pattern) {
    drawingContext.setLineDash(pattern);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 900);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}
