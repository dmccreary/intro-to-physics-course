// Multistage Rocket Efficiency Chart
// Compares single-stage vs multi-stage rocket performance

let canvasWidth = 900;
let drawHeight = 520;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Control
let stageSlider;

// Rocket parameters
let payloadMass = 1000; // kg
let exhaustVel = 3000; // m/s (typical chemical rocket)
let structuralFraction = 0.1; // 10% of each stage is structure

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Stage count slider
    stageSlider = createSlider(1, 5, 2, 1);
    stageSlider.position(180, drawHeight + 30);
    stageSlider.size(150);

    describe('Multistage rocket efficiency chart comparing delta-v achieved by different staging configurations', LABEL);
}

function draw() {
    updateCanvasSize();

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
    textSize(18);
    textAlign(CENTER, TOP);
    noStroke();
    text('Multistage Rocket Efficiency: Why Staging Matters', canvasWidth/2, 10);

    let numStages = stageSlider.value();

    // Calculate and draw comparison
    drawComparisonChart(numStages);
    drawRocketDiagrams(numStages);
    drawExplanation(numStages);

    // Control labels
    drawControlLabels();
}

function calculateDeltaV(stages, totalFuelMass, payloadMass) {
    // Tsiolkovsky rocket equation: Δv = v_e * ln(m_initial / m_final)
    // For multi-stage: Δv_total = sum of each stage's Δv

    if (stages === 1) {
        let structureMass = totalFuelMass * structuralFraction;
        let m_initial = payloadMass + totalFuelMass + structureMass;
        let m_final = payloadMass + structureMass;
        return exhaustVel * Math.log(m_initial / m_final);
    }

    // For multi-stage, divide fuel equally
    let fuelPerStage = totalFuelMass / stages;
    let totalDeltaV = 0;
    let currentPayload = payloadMass;

    // Calculate from top stage down (each stage carries those above it)
    let stageMasses = [];
    for (let i = 0; i < stages; i++) {
        let structureMass = fuelPerStage * structuralFraction;
        stageMasses.push({ fuel: fuelPerStage, structure: structureMass });
    }

    // Calculate delta-v for each stage (from bottom to top, but calculate payload from top)
    for (let i = stages - 1; i >= 0; i--) {
        let payloadAbove = currentPayload;
        for (let j = i + 1; j < stages; j++) {
            payloadAbove += stageMasses[j].fuel + stageMasses[j].structure;
        }

        let m_initial = payloadAbove + stageMasses[i].fuel + stageMasses[i].structure;
        let m_final = payloadAbove + stageMasses[i].structure;

        // Simplified: after staging, we drop the structure
        m_final = payloadAbove;

        let stageDeltaV = exhaustVel * Math.log(m_initial / m_final);
        totalDeltaV += stageDeltaV;
    }

    return totalDeltaV;
}

function drawComparisonChart(highlightStages) {
    let chartX = 50;
    let chartY = 50;
    let chartW = 400;
    let chartH = 300;

    // Chart background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(chartX, chartY, chartW, chartH);

    // Axes
    stroke(0);
    strokeWeight(2);
    line(chartX, chartY + chartH, chartX + chartW, chartY + chartH); // X
    line(chartX, chartY, chartX, chartY + chartH); // Y

    // Y-axis label
    push();
    translate(chartX - 35, chartY + chartH/2);
    rotate(-PI/2);
    fill('black');
    textSize(12);
    textAlign(CENTER, CENTER);
    noStroke();
    text('Delta-V (km/s)', 0, 0);
    pop();

    // X-axis label
    fill('black');
    textSize(12);
    textAlign(CENTER, TOP);
    noStroke();
    text('Number of Stages', chartX + chartW/2, chartY + chartH + 25);

    // Calculate delta-v for 1-5 stages
    let totalFuel = 50000; // 50 tons of fuel
    let maxDeltaV = 0;
    let deltaVs = [];

    for (let s = 1; s <= 5; s++) {
        let dv = calculateDeltaV(s, totalFuel, payloadMass);
        deltaVs.push(dv);
        maxDeltaV = max(maxDeltaV, dv);
    }

    // Scale
    let yScale = chartH / (maxDeltaV * 1.2);

    // Y-axis ticks
    fill('black');
    textSize(10);
    textAlign(RIGHT, CENTER);
    noStroke();
    for (let v = 0; v <= maxDeltaV * 1.1; v += 2000) {
        let y = chartY + chartH - v * yScale;
        stroke(220);
        strokeWeight(1);
        line(chartX, y, chartX + chartW, y);
        noStroke();
        text((v/1000).toFixed(1), chartX - 5, y);
    }

    // Draw bars
    let barWidth = chartW / 7;
    let barSpacing = chartW / 6;

    for (let s = 1; s <= 5; s++) {
        let x = chartX + s * barSpacing - barWidth/2;
        let barHeight = deltaVs[s-1] * yScale;
        let y = chartY + chartH - barHeight;

        // Bar color based on stages
        if (s === highlightStages) {
            fill(100, 200, 100);
            stroke(50, 150, 50);
        } else {
            fill(150, 180, 220);
            stroke(100, 130, 170);
        }
        strokeWeight(2);
        rect(x, y, barWidth, barHeight, 3, 3, 0, 0);

        // Value label
        fill('black');
        textSize(11);
        textAlign(CENTER, BOTTOM);
        noStroke();
        text((deltaVs[s-1]/1000).toFixed(2) + ' km/s', x + barWidth/2, y - 5);

        // X-axis label
        textAlign(CENTER, TOP);
        text(s + (s === 1 ? ' stage' : ' stages'), x + barWidth/2, chartY + chartH + 5);
    }

    // Reference lines for orbital velocities
    stroke(255, 100, 100);
    strokeWeight(1);
    drawingContext.setLineDash([5, 5]);

    // LEO ~7.8 km/s
    let leoY = chartY + chartH - 7800 * yScale;
    if (leoY > chartY) {
        line(chartX, leoY, chartX + chartW, leoY);
        fill(255, 100, 100);
        textSize(10);
        textAlign(LEFT, BOTTOM);
        noStroke();
        text('LEO (7.8 km/s)', chartX + 5, leoY - 2);
    }

    // GTO ~10.5 km/s
    let gtoY = chartY + chartH - 10500 * yScale;
    if (gtoY > chartY) {
        stroke(255, 150, 50);
        line(chartX, gtoY, chartX + chartW, gtoY);
        fill(255, 150, 50);
        noStroke();
        text('GTO (10.5 km/s)', chartX + 5, gtoY - 2);
    }

    drawingContext.setLineDash([]);
}

function drawRocketDiagrams(numStages) {
    let diagramX = 500;
    let diagramY = 50;
    let diagramW = canvasWidth - diagramX - 30;
    let diagramH = 200;

    // Background
    fill(250, 250, 255);
    stroke(200);
    strokeWeight(1);
    rect(diagramX, diagramY, diagramW, diagramH, 10);

    // Title
    fill('black');
    textSize(14);
    textAlign(CENTER, TOP);
    noStroke();
    text(numStages + '-Stage Rocket Configuration', diagramX + diagramW/2, diagramY + 10);

    // Draw rocket stages
    let rocketHeight = diagramH - 60;
    let rocketWidth = 60;
    let rocketX = diagramX + diagramW/2;
    let rocketBaseY = diagramY + diagramH - 20;

    // Stage colors
    let colors = [
        [200, 100, 100],  // Red - first stage
        [100, 150, 200],  // Blue - second stage
        [100, 200, 100],  // Green - third stage
        [200, 180, 100],  // Yellow - fourth stage
        [180, 100, 180]   // Purple - fifth stage
    ];

    let stageHeight = (rocketHeight - 30) / numStages;

    for (let i = 0; i < numStages; i++) {
        let y = rocketBaseY - (i + 1) * stageHeight;
        let stageW = rocketWidth - i * 8;

        fill(colors[i][0], colors[i][1], colors[i][2]);
        stroke(colors[i][0] - 50, colors[i][1] - 50, colors[i][2] - 50);
        strokeWeight(2);

        if (i === numStages - 1) {
            // Top stage with nose cone
            beginShape();
            vertex(rocketX - stageW/2, y + stageHeight);
            vertex(rocketX - stageW/2, y + 15);
            vertex(rocketX, y);
            vertex(rocketX + stageW/2, y + 15);
            vertex(rocketX + stageW/2, y + stageHeight);
            endShape(CLOSE);
        } else {
            rect(rocketX - stageW/2, y, stageW, stageHeight, 3);
        }

        // Stage label
        fill(255);
        textSize(10);
        textAlign(CENTER, CENTER);
        noStroke();
        text('S' + (i + 1), rocketX, y + stageHeight/2 + 5);
    }

    // Payload at top
    fill(50);
    noStroke();
    let payloadY = rocketBaseY - numStages * stageHeight - 25;
    ellipse(rocketX, payloadY, 20, 15);
    fill('black');
    textSize(9);
    text('Payload', rocketX, payloadY - 15);
}

function drawExplanation(numStages) {
    let boxX = 500;
    let boxY = 270;
    let boxW = canvasWidth - boxX - 30;
    let boxH = 230;

    // Background
    fill(255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(boxX, boxY, boxW, boxH, 10);

    fill('black');
    textSize(12);
    textAlign(LEFT, TOP);
    noStroke();

    let y = boxY + 15;
    let x = boxX + 15;

    // Tsiolkovsky equation
    fill(100, 50, 150);
    textSize(13);
    text('Tsiolkovsky Rocket Equation:', x, y);
    y += 22;

    fill('black');
    textSize(12);
    text('Δv = v_e × ln(m_initial / m_final)', x, y);
    y += 30;

    // Why staging helps
    fill(0, 100, 0);
    textSize(13);
    text('Why Staging Works:', x, y);
    y += 20;

    fill('black');
    textSize(11);
    let explanations = [
        '• Drop empty tanks = less dead weight',
        '• Each stage optimized for its phase',
        '• Logarithmic gain from mass ratio',
        '• Diminishing returns after 3-4 stages'
    ];

    for (let exp of explanations) {
        text(exp, x, y);
        y += 16;
    }

    y += 10;

    // Current selection stats
    fill(100, 50, 150);
    textSize(12);
    text('Selected: ' + numStages + ' stage' + (numStages > 1 ? 's' : ''), x, y);
    y += 18;

    let totalFuel = 50000;
    let dv = calculateDeltaV(numStages, totalFuel, payloadMass);
    let singleDv = calculateDeltaV(1, totalFuel, payloadMass);
    let improvement = ((dv - singleDv) / singleDv * 100);

    fill('black');
    textSize(11);
    text('Delta-V: ' + (dv/1000).toFixed(2) + ' km/s', x, y);
    y += 16;

    if (numStages > 1) {
        fill(0, 150, 0);
        text('Improvement over single stage: +' + improvement.toFixed(0) + '%', x, y);
    } else {
        fill(150, 100, 0);
        text('Single stage: baseline efficiency', x, y);
    }
}

function drawControlLabels() {
    textSize(12);
    textAlign(LEFT, CENTER);
    fill('black');
    noStroke();

    text('Number of Stages: ' + stageSlider.value(), 10, drawHeight + 40);

    textAlign(RIGHT, CENTER);
    textSize(11);
    fill(100);
    text('Parameters: Payload=1000kg, v_exhaust=3km/s, Fuel=50,000kg', canvasWidth - 20, drawHeight + 40);
    text('Structural fraction: 10% per stage', canvasWidth - 20, drawHeight + 60);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
    }
}
