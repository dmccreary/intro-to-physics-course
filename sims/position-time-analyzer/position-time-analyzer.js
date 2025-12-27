// Position-Time Graph Interactive Analyzer MicroSim
// Helps students interpret position-time graphs

let canvasWidth = 900;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Graph parameters
let graphX, graphY, graphW, graphH;
let timeMax = 10;
let posMax = 20;
let posMin = -20;

// Animation
let currentTime = 0;
let isPlaying = false;
let animationSpeed = 0.03;

// Selected scenario
let selectedScenario = 0;
let scenarios;

// UI Controls
let scenarioSelect;
let playButton;
let resetButton;
let timeSlider;
let showTangentCheckbox;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Define scenarios
    scenarios = [
        {
            name: "Constant Positive Velocity",
            equation: (t) => 2 + 3 * t,
            velocity: (t) => 3,
            description: "Object moves at constant speed in positive direction"
        },
        {
            name: "Constant Negative Velocity",
            equation: (t) => 15 - 2 * t,
            velocity: (t) => -2,
            description: "Object moves at constant speed in negative direction"
        },
        {
            name: "At Rest (Stationary)",
            equation: (t) => 5,
            velocity: (t) => 0,
            description: "Object stays at same position - not moving"
        },
        {
            name: "Positive Acceleration",
            equation: (t) => 0.5 * t * t,
            velocity: (t) => t,
            description: "Velocity increases - speeding up in positive direction"
        },
        {
            name: "Negative Acceleration",
            equation: (t) => 15 + 5 * t - 0.5 * t * t,
            velocity: (t) => 5 - t,
            description: "Velocity decreases - slowing down then reversing"
        },
        {
            name: "Complex Motion",
            equation: (t) => {
                if (t < 3) return 2 * t;
                else if (t < 6) return 6;
                else return 6 - 2 * (t - 6);
            },
            velocity: (t) => {
                if (t < 3) return 2;
                else if (t < 6) return 0;
                else return -2;
            },
            description: "Forward, stop, then backward"
        }
    ];

    // Graph dimensions
    graphX = 80;
    graphY = 80;
    graphW = canvasWidth - 350;
    graphH = drawHeight - 150;

    // Create controls
    scenarioSelect = createSelect();
    scenarioSelect.position(margin, drawHeight + 15);
    for (let s of scenarios) {
        scenarioSelect.option(s.name);
    }
    scenarioSelect.changed(() => {
        selectedScenario = scenarios.findIndex(s => s.name === scenarioSelect.value());
        currentTime = 0;
    });
    scenarioSelect.style('font-size', '13px');

    playButton = createButton('Play');
    playButton.position(220, drawHeight + 12);
    playButton.mousePressed(togglePlay);
    playButton.style('font-size', '14px');
    playButton.style('padding', '6px 16px');

    resetButton = createButton('Reset');
    resetButton.position(290, drawHeight + 12);
    resetButton.mousePressed(resetAnimation);
    resetButton.style('font-size', '14px');
    resetButton.style('padding', '6px 16px');

    timeSlider = createSlider(0, timeMax, 0, 0.1);
    timeSlider.position(420, drawHeight + 18);
    timeSlider.style('width', '150px');

    showTangentCheckbox = createCheckbox('Show Tangent', true);
    showTangentCheckbox.position(600, drawHeight + 15);
    showTangentCheckbox.style('font-size', '13px');

    describe('Position-time graph analyzer showing how to interpret slope and curvature of motion graphs.', LABEL);
}

function draw() {
    updateCanvasSize();
    graphW = canvasWidth - 350;

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
    text('Position-Time Graph Analyzer', canvasWidth / 2, 10);

    // Get current scenario
    let scenario = scenarios[selectedScenario];

    // Description
    textSize(14);
    fill(80);
    textAlign(LEFT, TOP);
    text(scenario.description, margin, 40);

    // Draw graph
    drawGraph(scenario);

    // Draw info panel
    drawInfoPanel(scenario);

    // Draw animated object
    drawAnimatedObject(scenario);

    // Update time
    if (isPlaying) {
        currentTime += animationSpeed;
        if (currentTime > timeMax) currentTime = 0;
        timeSlider.value(currentTime);
    } else {
        currentTime = timeSlider.value();
    }

    // Control labels
    fill(0);
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Time: ' + currentTime.toFixed(1) + ' s', 360, drawHeight + 25);
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
    // Vertical lines
    for (let t = 0; t <= timeMax; t++) {
        let x = map(t, 0, timeMax, graphX, graphX + graphW);
        line(x, graphY, x, graphY + graphH);
    }
    // Horizontal lines
    for (let p = posMin; p <= posMax; p += 5) {
        let y = map(p, posMin, posMax, graphY + graphH, graphY);
        line(graphX, y, graphX + graphW, y);
    }

    // Zero line
    stroke(150);
    strokeWeight(1);
    let zeroY = map(0, posMin, posMax, graphY + graphH, graphY);
    line(graphX, zeroY, graphX + graphW, zeroY);

    // Axes
    stroke(0);
    strokeWeight(2);
    line(graphX, graphY + graphH, graphX + graphW, graphY + graphH); // x-axis
    line(graphX, graphY, graphX, graphY + graphH); // y-axis

    // Axis labels
    fill(0);
    textSize(14);
    textAlign(CENTER, TOP);
    text('Time (s)', graphX + graphW / 2, graphY + graphH + 25);

    push();
    translate(graphX - 40, graphY + graphH / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text('Position (m)', 0, 0);
    pop();

    // Tick labels
    textSize(10);
    textAlign(CENTER, TOP);
    for (let t = 0; t <= timeMax; t += 2) {
        let x = map(t, 0, timeMax, graphX, graphX + graphW);
        text(t, x, graphY + graphH + 5);
    }

    textAlign(RIGHT, CENTER);
    for (let p = posMin; p <= posMax; p += 10) {
        let y = map(p, posMin, posMax, graphY + graphH, graphY);
        text(p, graphX - 5, y);
    }

    // Draw the curve
    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let t = 0; t <= timeMax; t += 0.1) {
        let pos = scenario.equation(t);
        let x = map(t, 0, timeMax, graphX, graphX + graphW);
        let y = map(pos, posMin, posMax, graphY + graphH, graphY);
        vertex(x, y);
    }
    endShape();

    // Current position marker
    let currentPos = scenario.equation(currentTime);
    let markerX = map(currentTime, 0, timeMax, graphX, graphX + graphW);
    let markerY = map(currentPos, posMin, posMax, graphY + graphH, graphY);

    // Tangent line (if enabled)
    if (showTangentCheckbox.checked()) {
        let velocity = scenario.velocity(currentTime);
        let tangentLength = 2; // in time units
        let x1 = currentTime - tangentLength / 2;
        let x2 = currentTime + tangentLength / 2;
        let y1 = currentPos - velocity * tangentLength / 2;
        let y2 = currentPos + velocity * tangentLength / 2;

        stroke(220, 50, 50);
        strokeWeight(2);
        let tx1 = map(x1, 0, timeMax, graphX, graphX + graphW);
        let ty1 = map(y1, posMin, posMax, graphY + graphH, graphY);
        let tx2 = map(x2, 0, timeMax, graphX, graphX + graphW);
        let ty2 = map(y2, posMin, posMax, graphY + graphH, graphY);
        line(tx1, ty1, tx2, ty2);

        // Label
        fill(220, 50, 50);
        noStroke();
        textSize(11);
        textAlign(LEFT, BOTTOM);
        text('Slope = v = ' + velocity.toFixed(1) + ' m/s', tx2 + 5, ty2);
    }

    // Marker
    fill(0, 100, 200);
    noStroke();
    ellipse(markerX, markerY, 14, 14);

    // Vertical line to show current time
    stroke(0, 100, 200, 100);
    strokeWeight(1);
    line(markerX, graphY, markerX, graphY + graphH);
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

    // Title
    fill(0);
    textSize(14);
    textAlign(CENTER, TOP);
    text('Analysis', panelX + panelW / 2, panelY + 10);

    // Current values
    let currentPos = scenario.equation(currentTime);
    let currentVel = scenario.velocity(currentTime);

    textSize(13);
    textAlign(LEFT, TOP);
    let y = panelY + 40;
    let lineH = 25;

    fill(0);
    text('At t = ' + currentTime.toFixed(1) + ' s:', panelX + 15, y);
    y += lineH + 5;

    fill(0, 100, 200);
    text('Position:', panelX + 15, y);
    text(currentPos.toFixed(1) + ' m', panelX + 90, y);
    y += lineH;

    fill(220, 50, 50);
    text('Velocity:', panelX + 15, y);
    text(currentVel.toFixed(1) + ' m/s', panelX + 90, y);
    y += lineH;

    // Motion status
    y += 10;
    fill(0);
    text('Motion:', panelX + 15, y);
    y += lineH;

    textSize(12);
    fill(80);
    if (currentVel > 0.1) {
        text('Moving in + direction', panelX + 15, y);
    } else if (currentVel < -0.1) {
        text('Moving in - direction', panelX + 15, y);
    } else {
        text('Momentarily at rest', panelX + 15, y);
    }
    y += lineH;

    // Speed
    text('Speed: ' + abs(currentVel).toFixed(1) + ' m/s', panelX + 15, y);
    y += lineH + 10;

    // Key insight
    fill(50, 100, 150);
    textSize(11);
    textAlign(CENTER, TOP);
    let insight = getInsight(scenario, currentVel);
    text(insight, panelX + panelW / 2, y, panelW - 20, 100);

    // Helpful formulas
    y = panelY + panelH - 80;
    fill(100);
    textSize(11);
    textAlign(LEFT, TOP);
    text('Key Relationships:', panelX + 15, y);
    y += 18;
    text('Slope = velocity', panelX + 15, y);
    y += 16;
    text('Steeper = faster', panelX + 15, y);
    y += 16;
    text('Curved = accelerating', panelX + 15, y);
}

function getInsight(scenario, velocity) {
    if (scenario.name === "At Rest (Stationary)") {
        return "Horizontal line means no change in position - the object is stationary.";
    } else if (scenario.name === "Constant Positive Velocity") {
        return "Straight line with positive slope means constant positive velocity.";
    } else if (scenario.name === "Constant Negative Velocity") {
        return "Straight line with negative slope means constant negative velocity.";
    } else if (scenario.name === "Positive Acceleration") {
        return "Curve getting steeper means velocity is increasing - the object is speeding up.";
    } else if (scenario.name === "Negative Acceleration") {
        if (velocity > 0) return "Curve flattening means velocity decreasing - slowing down.";
        else if (velocity < 0) return "Negative slope means object now moving backward.";
        else return "Slope is zero - object momentarily at rest at maximum position.";
    } else {
        if (velocity > 0) return "Positive slope section - moving forward.";
        else if (velocity < 0) return "Negative slope section - moving backward.";
        else return "Horizontal section - at rest.";
    }
}

function drawAnimatedObject(scenario) {
    let trackY = graphY + graphH + 55;
    let trackX = graphX;
    let trackW = graphW;

    // Track
    stroke(150);
    strokeWeight(2);
    line(trackX, trackY, trackX + trackW, trackY);

    // Position markers
    stroke(200);
    strokeWeight(1);
    textSize(9);
    fill(100);
    textAlign(CENTER, TOP);
    for (let p = posMin; p <= posMax; p += 5) {
        let x = map(p, posMin, posMax, trackX, trackX + trackW);
        line(x, trackY - 5, x, trackY + 5);
        if (p % 10 === 0) text(p, x, trackY + 7);
    }

    // Object
    let currentPos = scenario.equation(currentTime);
    let objX = map(currentPos, posMin, posMax, trackX, trackX + trackW);

    fill(0, 100, 200);
    noStroke();
    ellipse(objX, trackY, 20, 20);

    // Velocity arrow
    let velocity = scenario.velocity(currentTime);
    if (abs(velocity) > 0.1) {
        let arrowLen = velocity * 10;
        stroke(220, 50, 50);
        strokeWeight(3);
        line(objX, trackY, objX + arrowLen, trackY);

        fill(220, 50, 50);
        noStroke();
        let dir = velocity > 0 ? 1 : -1;
        push();
        translate(objX + arrowLen, trackY);
        rotate(dir > 0 ? 0 : PI);
        triangle(0, 0, -8, -5, -8, 5);
        pop();
    }

    // Label
    fill(0);
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text('Object Position', trackX + trackW / 2, trackY - 10);
}

function togglePlay() {
    isPlaying = !isPlaying;
    playButton.html(isPlaying ? 'Pause' : 'Play');
}

function resetAnimation() {
    currentTime = 0;
    timeSlider.value(0);
    isPlaying = false;
    playButton.html('Play');
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    graphW = canvasWidth - 350;
    timeSlider.style('width', min(150, canvasWidth - 500) + 'px');
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 1000);
    }
}
