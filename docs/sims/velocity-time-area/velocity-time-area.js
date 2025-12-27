// Velocity-Time Graph Area Calculator MicroSim
// Shows that area under v-t curve equals displacement

let canvasWidth = 900;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Graph parameters
let graphX, graphY, graphW, graphH;
let timeMax = 10;
let velMax = 20;
let velMin = -10;

// Time interval for area calculation
let t1 = 0;
let t2 = 5;

// Selected scenario
let selectedScenario = 0;
let scenarios;

// UI Controls
let scenarioSelect;
let t1Slider, t2Slider;
let showCalculationCheckbox;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Define scenarios
    scenarios = [
        {
            name: "Constant Positive Velocity",
            velocity: (t) => 10,
            areaType: "rectangle",
            description: "v = 10 m/s (rectangle)"
        },
        {
            name: "Constant Negative Velocity",
            velocity: (t) => -5,
            areaType: "rectangle",
            description: "v = -5 m/s (rectangle below axis)"
        },
        {
            name: "Acceleration from Rest",
            velocity: (t) => 2 * t,
            areaType: "triangle",
            description: "v = 2t (triangle)"
        },
        {
            name: "Deceleration to Stop",
            velocity: (t) => 15 - 1.5 * t,
            areaType: "trapezoid",
            description: "v = 15 - 1.5t (trapezoid)"
        },
        {
            name: "Speed Up Then Slow Down",
            velocity: (t) => t < 5 ? 2 * t : 10 - 2 * (t - 5),
            areaType: "complex",
            description: "Triangular peak at t=5"
        },
        {
            name: "Direction Reversal",
            velocity: (t) => 10 - 2 * t,
            areaType: "mixed",
            description: "Crosses zero at t=5 (area above and below)"
        }
    ];

    // Graph dimensions
    graphX = 80;
    graphY = 70;
    graphW = canvasWidth - 350;
    graphH = drawHeight - 180;

    // Create controls
    scenarioSelect = createSelect();
    scenarioSelect.position(margin, drawHeight + 15);
    for (let s of scenarios) {
        scenarioSelect.option(s.name);
    }
    scenarioSelect.changed(() => {
        selectedScenario = scenarios.findIndex(s => s.name === scenarioSelect.value());
    });
    scenarioSelect.style('font-size', '13px');

    t1Slider = createSlider(0, timeMax - 0.5, 0, 0.5);
    t1Slider.position(300, drawHeight + 15);
    t1Slider.style('width', '100px');

    t2Slider = createSlider(0.5, timeMax, 5, 0.5);
    t2Slider.position(500, drawHeight + 15);
    t2Slider.style('width', '100px');

    showCalculationCheckbox = createCheckbox('Show Calculation', true);
    showCalculationCheckbox.position(680, drawHeight + 12);
    showCalculationCheckbox.style('font-size', '13px');

    describe('Velocity-time graph showing that the area under the curve equals displacement.', LABEL);
}

function draw() {
    updateCanvasSize();
    graphW = canvasWidth - 350;

    // Get slider values
    t1 = t1Slider.value();
    t2 = t2Slider.value();
    if (t1 >= t2) t1 = t2 - 0.5;

    // Background
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
    noStroke();
    textSize(22);
    textAlign(CENTER, TOP);
    text('Velocity-Time Graph: Area = Displacement', canvasWidth / 2, 10);

    // Get current scenario
    let scenario = scenarios[selectedScenario];

    // Description
    textSize(14);
    fill(80);
    textAlign(LEFT, TOP);
    text(scenario.description, margin, 42);

    // Draw graph
    drawGraph(scenario);

    // Draw info panel
    drawInfoPanel(scenario);

    // Draw position change visualization
    drawPositionChange(scenario);

    // Control labels
    fill(0);
    textSize(12);
    textAlign(LEFT, CENTER);
    text('t1: ' + t1.toFixed(1) + 's', 240, drawHeight + 25);
    text('t2: ' + t2.toFixed(1) + 's', 440, drawHeight + 25);
}

function drawGraph(scenario) {
    // Graph background
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(graphX, graphY, graphW, graphH);

    // Grid
    stroke(230);
    strokeWeight(1);
    for (let t = 0; t <= timeMax; t++) {
        let x = map(t, 0, timeMax, graphX, graphX + graphW);
        line(x, graphY, x, graphY + graphH);
    }
    for (let v = velMin; v <= velMax; v += 5) {
        let y = map(v, velMin, velMax, graphY + graphH, graphY);
        line(graphX, y, graphX + graphW, y);
    }

    // Zero velocity line (important reference)
    stroke(100);
    strokeWeight(1);
    let zeroY = map(0, velMin, velMax, graphY + graphH, graphY);
    line(graphX, zeroY, graphX + graphW, zeroY);

    // Shade the area under the curve between t1 and t2
    drawShadedArea(scenario);

    // Axes
    stroke(0);
    strokeWeight(2);
    line(graphX, graphY + graphH, graphX + graphW, graphY + graphH);
    line(graphX, graphY, graphX, graphY + graphH);

    // Axis labels
    fill(0);
    textSize(14);
    textAlign(CENTER, TOP);
    text('Time (s)', graphX + graphW / 2, graphY + graphH + 25);

    push();
    translate(graphX - 50, graphY + graphH / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text('Velocity (m/s)', 0, 0);
    pop();

    // Tick labels
    textSize(10);
    textAlign(CENTER, TOP);
    for (let t = 0; t <= timeMax; t += 2) {
        let x = map(t, 0, timeMax, graphX, graphX + graphW);
        text(t, x, graphY + graphH + 5);
    }

    textAlign(RIGHT, CENTER);
    for (let v = velMin; v <= velMax; v += 5) {
        let y = map(v, velMin, velMax, graphY + graphH, graphY);
        text(v, graphX - 5, y);
    }

    // Draw the velocity curve
    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let t = 0; t <= timeMax; t += 0.1) {
        let vel = scenario.velocity(t);
        let x = map(t, 0, timeMax, graphX, graphX + graphW);
        let y = map(vel, velMin, velMax, graphY + graphH, graphY);
        vertex(x, y);
    }
    endShape();

    // Mark t1 and t2
    stroke(0, 150, 0);
    strokeWeight(2);
    let x1 = map(t1, 0, timeMax, graphX, graphX + graphW);
    let x2 = map(t2, 0, timeMax, graphX, graphX + graphW);
    line(x1, graphY, x1, graphY + graphH);
    line(x2, graphY, x2, graphY + graphH);

    // Labels
    fill(0, 150, 0);
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text('t1', x1, graphY - 3);
    text('t2', x2, graphY - 3);
}

function drawShadedArea(scenario) {
    let zeroY = map(0, velMin, velMax, graphY + graphH, graphY);

    // Shade positive area (blue) and negative area (red)
    for (let t = t1; t < t2; t += 0.05) {
        let vel = scenario.velocity(t);
        let x = map(t, 0, timeMax, graphX, graphX + graphW);
        let y = map(vel, velMin, velMax, graphY + graphH, graphY);

        stroke(vel >= 0 ? color(0, 100, 200, 100) : color(200, 50, 50, 100));
        strokeWeight(3);
        line(x, zeroY, x, y);
    }

    // Outline the area region
    noFill();
    stroke(0, 100, 200, 150);
    strokeWeight(2);
    beginShape();
    let x1 = map(t1, 0, timeMax, graphX, graphX + graphW);
    vertex(x1, zeroY);
    for (let t = t1; t <= t2; t += 0.1) {
        let vel = scenario.velocity(t);
        let x = map(t, 0, timeMax, graphX, graphX + graphW);
        let y = map(vel, velMin, velMax, graphY + graphH, graphY);
        vertex(x, y);
    }
    let x2 = map(t2, 0, timeMax, graphX, graphX + graphW);
    vertex(x2, zeroY);
    endShape(CLOSE);
}

function calculateArea(scenario) {
    // Numerical integration using trapezoidal rule
    let area = 0;
    let posArea = 0;
    let negArea = 0;
    let dt = 0.01;

    for (let t = t1; t < t2; t += dt) {
        let v1 = scenario.velocity(t);
        let v2 = scenario.velocity(t + dt);
        let avgV = (v1 + v2) / 2;
        let dArea = avgV * dt;
        area += dArea;
        if (avgV >= 0) posArea += dArea;
        else negArea += dArea;
    }

    return { total: area, positive: posArea, negative: negArea };
}

function drawInfoPanel(scenario) {
    let panelX = graphX + graphW + 20;
    let panelY = graphY;
    let panelW = canvasWidth - panelX - margin;
    let panelH = graphH;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 10);

    // Calculate areas
    let areas = calculateArea(scenario);

    // Title
    fill(0);
    textSize(14);
    textAlign(CENTER, TOP);
    text('Area Analysis', panelX + panelW / 2, panelY + 10);

    textSize(12);
    textAlign(LEFT, TOP);
    let y = panelY + 40;
    let lineH = 22;

    // Time interval
    fill(0, 150, 0);
    text('Time interval:', panelX + 15, y);
    y += lineH;
    fill(0);
    text('t1 = ' + t1.toFixed(1) + ' s', panelX + 20, y);
    y += lineH - 5;
    text('t2 = ' + t2.toFixed(1) + ' s', panelX + 20, y);
    y += lineH - 5;
    text('\u0394t = ' + (t2 - t1).toFixed(1) + ' s', panelX + 20, y);
    y += lineH + 10;

    // Areas
    fill(0, 100, 200);
    text('Positive area:', panelX + 15, y);
    text(areas.positive.toFixed(1) + ' m', panelX + panelW - 60, y);
    y += lineH;

    fill(200, 50, 50);
    text('Negative area:', panelX + 15, y);
    text(areas.negative.toFixed(1) + ' m', panelX + panelW - 60, y);
    y += lineH + 5;

    // Net displacement
    stroke(0);
    strokeWeight(1);
    line(panelX + 15, y, panelX + panelW - 15, y);
    y += 10;

    fill(0);
    textSize(13);
    text('Net Displacement:', panelX + 15, y);
    y += lineH;

    textSize(16);
    fill(areas.total >= 0 ? color(0, 100, 200) : color(200, 50, 50));
    text('\u0394x = ' + areas.total.toFixed(1) + ' m', panelX + 20, y);
    y += lineH + 15;

    // Show calculation if enabled
    if (showCalculationCheckbox.checked()) {
        textSize(11);
        fill(60);
        text('Calculation:', panelX + 15, y);
        y += lineH - 5;

        let v1 = scenario.velocity(t1);
        let v2 = scenario.velocity(t2);

        if (scenario.areaType === 'rectangle') {
            text('Area = v \u00D7 \u0394t', panelX + 15, y);
            y += lineH - 5;
            text('= ' + v1.toFixed(1) + ' \u00D7 ' + (t2 - t1).toFixed(1), panelX + 15, y);
            y += lineH - 5;
            text('= ' + areas.total.toFixed(1) + ' m', panelX + 15, y);
        } else if (scenario.areaType === 'triangle') {
            text('Area = \u00BD \u00D7 base \u00D7 height', panelX + 15, y);
            y += lineH - 5;
            text('= \u00BD \u00D7 ' + (t2 - t1).toFixed(1) + ' \u00D7 ' + v2.toFixed(1), panelX + 15, y);
            y += lineH - 5;
            text('= ' + areas.total.toFixed(1) + ' m', panelX + 15, y);
        } else {
            text('(Numerical integration)', panelX + 15, y);
        }
    }

    // Key insight
    y = panelY + panelH - 50;
    fill(50, 100, 150);
    textSize(11);
    textAlign(CENTER, TOP);
    text('Area under v-t curve\n= Displacement', panelX + panelW / 2, y);
}

function drawPositionChange(scenario) {
    let trackY = graphY + graphH + 55;
    let trackX = graphX;
    let trackW = graphW;

    // Calculate start and end positions
    let areas = calculateArea(scenario);
    let startPos = 0;
    let endPos = areas.total;

    // Track
    stroke(150);
    strokeWeight(2);
    line(trackX, trackY, trackX + trackW, trackY);

    // Scale for position display
    let posScale = 2; // pixels per meter

    // Draw displacement arrow
    let startX = trackX + trackW / 2;
    let endX = startX + endPos * posScale;

    if (abs(endPos) > 0.5) {
        stroke(areas.total >= 0 ? color(0, 100, 200) : color(200, 50, 50));
        strokeWeight(3);
        line(startX, trackY, endX, trackY);

        // Arrowhead
        fill(areas.total >= 0 ? color(0, 100, 200) : color(200, 50, 50));
        noStroke();
        let dir = endPos > 0 ? 1 : -1;
        push();
        translate(endX, trackY);
        rotate(dir > 0 ? 0 : PI);
        triangle(0, 0, -10, -6, -10, 6);
        pop();
    }

    // Start marker
    fill(0, 150, 0);
    noStroke();
    ellipse(startX, trackY, 12, 12);

    // End marker
    fill(areas.total >= 0 ? color(0, 100, 200) : color(200, 50, 50));
    ellipse(endX, trackY, 12, 12);

    // Labels
    fill(0);
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text('Start (x=0)', startX, trackY - 15);
    text('End (\u0394x=' + areas.total.toFixed(1) + 'm)', endX, trackY - 15);

    textAlign(CENTER, TOP);
    text('Position visualization: displacement from t1 to t2', trackX + trackW / 2, trackY + 12);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    graphW = canvasWidth - 350;
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 1000);
    }
}
