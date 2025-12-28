// Variable Force Work Calculation MicroSim
// Shows work as area under force-position curve

let canvasWidth = 900;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 120;

let startSlider, endSlider;
let forceTypeSelect;
let calculateBtn, resetBtn;

let graphX = 50;
let graphY = 60;
let graphWidth, graphHeight;
let rightPanelX;

let forceTypes = [
    { name: "Constant (F = 10 N)", func: (x) => 10, integral: (a, b) => 10 * (b - a), color: [50, 150, 50] },
    { name: "Linear (F = 5x N)", func: (x) => 5 * x, integral: (a, b) => 2.5 * (b*b - a*a), color: [50, 100, 200] },
    { name: "Quadratic (F = 2x² N)", func: (x) => 2 * x * x, integral: (a, b) => (2/3) * (b*b*b - a*a*a), color: [200, 100, 50] },
    { name: "Square Root (F = 8√x N)", func: (x) => 8 * Math.sqrt(x), integral: (a, b) => (16/3) * (Math.pow(b, 1.5) - Math.pow(a, 1.5)), color: [150, 50, 150] }
];
let currentForceType = 1;

let animating = false;
let animationProgress = 0;
let calculatedWork = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Force type dropdown
    forceTypeSelect = createSelect();
    forceTypeSelect.position(sliderLeftMargin, drawHeight + 15);
    for (let ft of forceTypes) {
        forceTypeSelect.option(ft.name);
    }
    forceTypeSelect.selected(forceTypes[1].name);
    forceTypeSelect.changed(() => {
        currentForceType = forceTypes.findIndex(ft => ft.name === forceTypeSelect.value());
        resetAnimation();
    });

    // Start position slider
    startSlider = createSlider(0, 5, 0, 0.1);
    startSlider.position(sliderLeftMargin, drawHeight + 45);
    startSlider.size(150);
    startSlider.input(resetAnimation);

    // End position slider
    endSlider = createSlider(0, 10, 4, 0.1);
    endSlider.position(sliderLeftMargin + 200, drawHeight + 45);
    endSlider.size(150);
    endSlider.input(resetAnimation);

    // Buttons
    calculateBtn = createButton('Calculate Work');
    calculateBtn.position(sliderLeftMargin, drawHeight + 75);
    calculateBtn.mousePressed(startAnimation);

    resetBtn = createButton('Reset');
    resetBtn.position(sliderLeftMargin + 120, drawHeight + 75);
    resetBtn.mousePressed(resetAnimation);

    describe('Interactive graph showing work as area under force-position curve', LABEL);
}

function draw() {
    updateCanvasSize();

    graphWidth = canvasWidth * 0.55;
    graphHeight = drawHeight - 120;
    rightPanelX = graphX + graphWidth + 40;

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
    text('Variable Force Work Calculation', canvasWidth * 0.35, 15);

    let startPos = startSlider.value();
    let endPos = endSlider.value();
    let ft = forceTypes[currentForceType];

    // Draw graph
    drawGraph(startPos, endPos, ft);

    // Draw right panel with calculations
    drawInfoPanel(startPos, endPos, ft);

    // Animation
    if (animating) {
        animationProgress += 0.02;
        if (animationProgress >= 1) {
            animationProgress = 1;
            animating = false;
        }
    }

    // Control labels
    textSize(12);
    textAlign(LEFT, CENTER);
    fill('black');
    text('Force Type:', 10, drawHeight + 25);
    text('Start: ' + startPos.toFixed(1) + ' m', 10, drawHeight + 55);
    text('End: ' + endPos.toFixed(1) + ' m', sliderLeftMargin + 160, drawHeight + 55);
}

function drawGraph(startPos, endPos, ft) {
    // Graph background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(graphX, graphY, graphWidth, graphHeight);

    // Grid
    stroke(230);
    strokeWeight(1);
    let xSteps = 10;
    let ySteps = 8;
    for (let i = 1; i < xSteps; i++) {
        let x = graphX + (i / xSteps) * graphWidth;
        line(x, graphY, x, graphY + graphHeight);
    }
    for (let i = 1; i < ySteps; i++) {
        let y = graphY + (i / ySteps) * graphHeight;
        line(graphX, y, graphX + graphWidth, y);
    }

    // Calculate max force for scaling
    let maxX = 10;
    let maxForce = ft.func(maxX) * 1.1;

    // Draw shaded area (work region)
    if (animationProgress > 0 && endPos > startPos) {
        let animEnd = startPos + (endPos - startPos) * animationProgress;

        // Color based on work magnitude
        let work = abs(ft.integral(startPos, animEnd));
        let maxWork = abs(ft.integral(0, 10));
        let intensity = map(work, 0, maxWork, 50, 200);

        fill(255, 220, 100, 180);
        stroke(255, 180, 50);
        strokeWeight(1);
        beginShape();
        // Bottom left
        vertex(graphX + (startPos / maxX) * graphWidth, graphY + graphHeight);
        // Along curve
        for (let x = startPos; x <= animEnd; x += 0.1) {
            let px = graphX + (x / maxX) * graphWidth;
            let py = graphY + graphHeight - (ft.func(x) / maxForce) * graphHeight;
            vertex(px, py);
        }
        // Bottom right
        vertex(graphX + (animEnd / maxX) * graphWidth, graphY + graphHeight);
        endShape(CLOSE);
    }

    // Draw force curve
    stroke(ft.color[0], ft.color[1], ft.color[2]);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let x = 0; x <= maxX; x += 0.1) {
        let px = graphX + (x / maxX) * graphWidth;
        let py = graphY + graphHeight - (ft.func(x) / maxForce) * graphHeight;
        vertex(px, py);
    }
    endShape();

    // Draw vertical lines at start and end
    stroke(0, 150, 0);
    strokeWeight(2);
    drawingContext.setLineDash([5, 5]);
    let startX = graphX + (startPos / maxX) * graphWidth;
    let endX = graphX + (endPos / maxX) * graphWidth;
    line(startX, graphY, startX, graphY + graphHeight);
    stroke(200, 0, 0);
    line(endX, graphY, endX, graphY + graphHeight);
    drawingContext.setLineDash([]);

    // Axis labels
    noStroke();
    fill('black');
    textSize(14);
    textAlign(CENTER, TOP);
    text('Position (m)', graphX + graphWidth/2, graphY + graphHeight + 25);

    push();
    translate(graphX - 35, graphY + graphHeight/2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text('Force (N)', 0, 0);
    pop();

    // Tick labels
    textSize(10);
    textAlign(CENTER, TOP);
    for (let i = 0; i <= 10; i += 2) {
        let x = graphX + (i / 10) * graphWidth;
        text(i, x, graphY + graphHeight + 5);
    }

    textAlign(RIGHT, CENTER);
    for (let i = 0; i <= maxForce; i += maxForce/4) {
        let y = graphY + graphHeight - (i / maxForce) * graphHeight;
        text(i.toFixed(0), graphX - 8, y);
    }
}

function drawInfoPanel(startPos, endPos, ft) {
    let panelWidth = canvasWidth - rightPanelX - margin;

    // Panel background
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(rightPanelX, graphY, panelWidth, graphHeight, 10);

    fill('black');
    textSize(14);
    textAlign(LEFT, TOP);
    let y = graphY + 15;
    let x = rightPanelX + 15;

    // Force equation
    text('Force Equation:', x, y);
    y += 25;
    textSize(16);
    fill(ft.color[0], ft.color[1], ft.color[2]);
    if (currentForceType === 0) text('F(x) = 10 N', x, y);
    else if (currentForceType === 1) text('F(x) = 5x N', x, y);
    else if (currentForceType === 2) text('F(x) = 2x² N', x, y);
    else if (currentForceType === 3) text('F(x) = 8√x N', x, y);

    y += 35;
    fill('black');
    textSize(14);
    text('Work Integral:', x, y);
    y += 25;
    textSize(13);
    fill(80);
    text('W = ∫ F(x) dx', x, y);
    y += 20;
    text('from x₁ = ' + startPos.toFixed(1) + ' m', x, y);
    y += 18;
    text('to x₂ = ' + endPos.toFixed(1) + ' m', x, y);

    y += 35;
    fill('black');
    textSize(14);
    text('Calculated Work:', x, y);
    y += 25;

    if (animationProgress > 0) {
        let animEnd = startPos + (endPos - startPos) * animationProgress;
        calculatedWork = ft.integral(startPos, animEnd);
        textSize(24);
        fill(200, 100, 0);
        text('W = ' + calculatedWork.toFixed(1) + ' J', x, y);

        y += 40;
        textSize(12);
        fill(80);

        // Real-world comparison
        let heightEquiv = calculatedWork / (2 * 9.8);
        text('Energy Equivalent:', x, y);
        y += 18;
        text('Lifts 2 kg by ' + heightEquiv.toFixed(2) + ' m', x, y);
    } else {
        textSize(16);
        fill(150);
        text('Click "Calculate Work"', x, y);
    }
}

function startAnimation() {
    animating = true;
    animationProgress = 0;
}

function resetAnimation() {
    animating = false;
    animationProgress = 0;
    calculatedWork = 0;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
        if (typeof forceTypeSelect !== 'undefined') {
            forceTypeSelect.size(200);
        }
    }
}
