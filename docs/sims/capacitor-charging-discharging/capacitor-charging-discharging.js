// Capacitor Charging and Discharging MicroSim
// Visualizes RC circuit behavior with exponential charging/discharging

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 620;
let controlHeight = 100;  // Two rows: sliders + buttons
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Circuit parameters
let voltage = 9;         // Battery voltage (V)
let resistance = 10000;  // Resistance (Ω)
let capacitance = 100e-6; // Capacitance (F)
let timeConstant;        // τ = RC

// Simulation state
let simTime = 0;         // Simulation time (seconds)
let switchState = 0;     // 0=Off, 1=Charge, -1=Discharge
let capacitorVoltage = 0;
let capacitorCharge = 0;
let current = 0;
let isRunning = false;
let lastFrameTime = 0;

// Graph data
let voltageHistory = [];
let currentHistory = [];
let timeHistory = [];
let maxGraphTime = 10;   // seconds to show on graph

// UI elements
let voltageSlider, resistanceSlider, capacitanceSlider;
let chargeBtn, pauseBtn, dischargeBtn, resetBtn;

// Layout regions
let circuitX = 20, circuitY = 20, circuitW = 400, circuitH = 280;
let detailX = 440, detailY = 20, detailW = 200, detailH = 280;
let displayX = 660, displayY = 20, displayW = 220, displayH = 280;
let graphX = 20, graphY = 320, graphW = 860, graphH = 280;

function updateCanvasSize() {
    let container = select('#canvas-container');
    if (container) {
        canvasWidth = max(600, container.width - 20);
    } else {
        canvasWidth = max(600, windowWidth - 40);
    }

    // Update layout regions for responsive design
    let scale = canvasWidth / 900;
    circuitW = 400 * scale;
    detailX = circuitX + circuitW + 20;
    detailW = 200 * scale;
    displayX = detailX + detailW + 20;
    displayW = canvasWidth - displayX - 20;
    graphW = canvasWidth - 40;
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    if (mainElement) {
        canvas.parent(mainElement);
    }
    textFont('Arial');

    timeConstant = resistance * capacitance;

    // Create controls - sliders positioned below labels
    let controlY = drawHeight + 25;  // Below the labels
    let xPos = 80;

    // Voltage slider (centered under "Voltage" label at x=120)
    fill(0);
    voltageSlider = createSlider(1, 12, voltage, 0.5);
    voltageSlider.position(xPos, controlY);
    voltageSlider.size(80);
    xPos += 130;

    // Resistance slider (centered under "R" label at x=250)
    resistanceSlider = createSlider(100, 100000, resistance, 100);
    resistanceSlider.position(xPos, controlY);
    resistanceSlider.size(80);
    xPos += 130;

    // Capacitance slider (centered under "C" label at x=380)
    capacitanceSlider = createSlider(1, 1000, capacitance * 1e6, 1);
    capacitanceSlider.position(xPos, controlY);
    capacitanceSlider.size(80);

    // Switch buttons on second row below sliders
    let buttonY = controlY + 30;
    let buttonX = 80;

    chargeBtn = createButton('Start Charging');
    chargeBtn.position(buttonX, buttonY);
    chargeBtn.mousePressed(() => {
        switchState = 1;
        isRunning = true;
        updateButtonStyles();
    });
    buttonX += 110;

    pauseBtn = createButton('Pause');
    pauseBtn.position(buttonX, buttonY);
    pauseBtn.mousePressed(() => {
        switchState = 0;
        isRunning = false;
        updateButtonStyles();
    });
    buttonX += 65;

    dischargeBtn = createButton('Start Discharging');
    dischargeBtn.position(buttonX, buttonY);
    dischargeBtn.mousePressed(() => {
        switchState = -1;
        isRunning = true;
        updateButtonStyles();
    });
    buttonX += 120;

    resetBtn = createButton('Reset');
    resetBtn.position(buttonX, buttonY);
    resetBtn.mousePressed(() => {
        resetSimulation();
        updateButtonStyles();
    });

    // Style buttons initially
    updateButtonStyles();

    lastFrameTime = millis();
}

function resetSimulation() {
    simTime = 0;
    capacitorVoltage = 0;
    capacitorCharge = 0;
    current = 0;
    switchState = 0;
    isRunning = false;
    voltageHistory = [];
    currentHistory = [];
    timeHistory = [];
}

// Visual feedback for active button state
function updateButtonStyles() {
    // Default style for all buttons
    let defaultStyle = 'background-color: #e0e0e0; color: black; border: 2px solid #999; font-weight: normal;';
    let activeChargeStyle = 'background-color: #4CAF50; color: white; border: 2px solid #2E7D32; font-weight: bold;';
    let activePauseStyle = 'background-color: #FF9800; color: white; border: 2px solid #E65100; font-weight: bold;';
    let activeDischargeStyle = 'background-color: #f44336; color: white; border: 2px solid #c62828; font-weight: bold;';

    // Reset all to default
    chargeBtn.style(defaultStyle);
    pauseBtn.style(defaultStyle);
    dischargeBtn.style(defaultStyle);

    // Highlight active button
    if (switchState === 1) {
        chargeBtn.style(activeChargeStyle);
    } else if (switchState === 0) {
        pauseBtn.style(activePauseStyle);
    } else if (switchState === -1) {
        dischargeBtn.style(activeDischargeStyle);
    }
}

function updatePhysics() {
    voltage = voltageSlider.value();
    resistance = resistanceSlider.value();
    capacitance = capacitanceSlider.value() * 1e-6;
    timeConstant = resistance * capacitance;

    if (!isRunning) return;

    // Calculate time step
    let currentTime = millis();
    let dt = (currentTime - lastFrameTime) / 1000;
    lastFrameTime = currentTime;

    // Limit dt to prevent jumps
    dt = min(dt, 0.05);
    simTime += dt;

    if (switchState === 1) {
        // Charging: Vc(t) = V₀(1 - e^(-t/RC))
        capacitorVoltage = voltage * (1 - exp(-simTime / timeConstant));
        current = (voltage / resistance) * exp(-simTime / timeConstant);
    } else if (switchState === -1) {
        // Discharging: Vc(t) = V₀e^(-t/RC)
        let startVoltage = capacitorVoltage > 0 ? voltage : capacitorVoltage;
        if (simTime < 0.01) startVoltage = voltage; // Assume fully charged
        capacitorVoltage = voltage * exp(-simTime / timeConstant);
        current = -(capacitorVoltage / resistance);
    }

    capacitorCharge = capacitance * capacitorVoltage;

    // Record history for graphs
    if (timeHistory.length === 0 || simTime - timeHistory[timeHistory.length - 1] > 0.05) {
        timeHistory.push(simTime);
        voltageHistory.push(capacitorVoltage);
        currentHistory.push(current * 1000); // mA

        // Limit history length
        if (timeHistory.length > 500) {
            timeHistory.shift();
            voltageHistory.shift();
            currentHistory.shift();
        }
    }
}

function draw() {
     // Drawing area (aliceblue background)
    fill('aliceblue');
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);
    // Control area white background
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    updatePhysics();

    drawCircuitDiagram();
    drawCapacitorDetail();
    drawDisplayPanel();
    drawGraphs();
    drawControlLabels();
}

function drawCircuitDiagram() {
    // Circuit region background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(circuitX, circuitY, circuitW, circuitH, 5);

    // Title
    fill(0);
    noStroke();
    textSize(14);
    textAlign(CENTER, TOP);
    text("RC Circuit", circuitX + circuitW/2, circuitY + 5);

    // Circuit dimensions
    let cx = circuitX + 50;
    let cy = circuitY + 60;
    let cw = circuitW - 100;
    let ch = circuitH - 100;

    stroke(0);
    strokeWeight(2);

    // Draw battery (left side)
    let batteryX = cx + 30;
    let batteryY = cy + ch/2;

    // Battery symbol
    line(batteryX, batteryY - 20, batteryX, batteryY + 20);
    strokeWeight(4);
    line(batteryX + 8, batteryY - 12, batteryX + 8, batteryY + 12);
    strokeWeight(2);

    // + and - labels
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text("+", batteryX + 20, batteryY - 15);
    text("-", batteryX - 10, batteryY - 15);
    text(voltage.toFixed(1) + "V", batteryX + 5, batteryY + 35);

    stroke(0);
    strokeWeight(2);

    // Top wire from battery to switch
    line(batteryX + 8, batteryY - 12, batteryX + 8, cy);
    line(batteryX + 8, cy, cx + cw/3, cy);

    // Switch
    let switchX = cx + cw/3;
    let switchY = cy;

    // Draw switch based on state
    fill(100);
    noStroke();
    ellipse(switchX, switchY, 8, 8);
    ellipse(switchX + 40, switchY - 5, 8, 8);
    ellipse(switchX + 40, switchY + 15, 8, 8);

    stroke(0);
    strokeWeight(3);
    if (switchState === 1) {
        // Charging position
        line(switchX, switchY, switchX + 38, switchY - 3);
        fill(0, 150, 0);
    } else if (switchState === -1) {
        // Discharging position
        line(switchX, switchY, switchX + 38, switchY + 13);
        fill(150, 0, 0);
    } else {
        // Off position (middle)
        line(switchX, switchY, switchX + 30, switchY + 5);
        fill(100);
    }

    strokeWeight(2);

    // Continue top wire to resistor
    line(switchX + 40, switchY - 5, switchX + 80, cy);

    // Resistor
    let resistorX = switchX + 80;
    drawResistor(resistorX, cy, 60);

    // Label resistor
    noStroke();
    fill(0);
    textSize(10);
    textAlign(CENTER, TOP);
    text(formatResistance(resistance), resistorX + 30, cy + 15);

    stroke(0);
    strokeWeight(2);

    // Wire from resistor to capacitor
    line(resistorX + 60, cy, cx + cw - 30, cy);
    line(cx + cw - 30, cy, cx + cw - 30, cy + ch/3);

    // Capacitor
    let capX = cx + cw - 30;
    let capY = cy + ch/3 + 20;

    // Capacitor plates
    strokeWeight(3);
    line(capX - 15, capY, capX + 15, capY);
    line(capX - 15, capY + 15, capX + 15, capY + 15);

    // Draw charges on plates
    let chargeLevel = map(capacitorVoltage, 0, voltage, 0, 5);
    for (let i = 0; i < chargeLevel; i++) {
        let px = capX - 10 + i * 5;
        fill(0, 0, 200);
        noStroke();
        textSize(10);
        text("-", px, capY - 5);
        fill(200, 0, 0);
        text("+", px, capY + 25);
    }

    stroke(0);
    strokeWeight(2);

    // Label capacitor
    noStroke();
    fill(0);
    textSize(10);
    textAlign(LEFT, CENTER);
    text(formatCapacitance(capacitance), capX + 20, capY + 7);

    stroke(0);
    strokeWeight(2);

    // Bottom wire back to battery
    line(capX, capY + 15, capX, cy + ch);
    line(capX, cy + ch, batteryX, cy + ch);
    line(batteryX, cy + ch, batteryX, batteryY + 20);

    // Discharge path (parallel)
    if (switchState === -1) {
        stroke(150, 0, 0);
        strokeWeight(1);
        line(switchX + 40, switchY + 15, switchX + 40, cy + ch/2);
        line(switchX + 40, cy + ch/2, cx + cw - 30, cy + ch/2);
    }

    // Draw current flow animation
    if (isRunning && abs(current) > 0.0001) {
        drawCurrentFlow();
    }
}

function drawResistor(x, y, w) {
    let zigzags = 6;
    let amplitude = 8;
    stroke(0);
    strokeWeight(2);

    beginShape();
    noFill();
    vertex(x, y);
    for (let i = 0; i <= zigzags; i++) {
        let px = x + (i / zigzags) * w;
        let py = y + (i % 2 === 0 ? -amplitude : amplitude);
        vertex(px, py);
    }
    vertex(x + w, y);
    endShape();
}

function drawCapacitorDetail() {
    // Detail region background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(detailX, detailY, detailW, detailH, 5);

    // Title
    fill(0);
    noStroke();
    textSize(14);
    textAlign(CENTER, TOP);
    text("Capacitor Detail", detailX + detailW/2, detailY + 5);

    // Draw large capacitor plates
    let plateX = detailX + 30;
    let plateY = detailY + 50;
    let plateW = detailW - 60;
    let plateH = 80;
    let gap = 40;

    // Left plate (negative during charging)
    stroke(100);
    strokeWeight(3);
    fill(220);
    rect(plateX, plateY, 15, plateH);

    // Right plate (positive during charging)
    rect(plateX + plateW - 15, plateY, 15, plateH);

    // Draw charges on plates
    let numCharges = floor(map(capacitorVoltage, 0, voltage, 0, 12));
    textSize(14);
    noStroke();

    for (let i = 0; i < numCharges; i++) {
        let py = plateY + 10 + (i % 6) * 12;
        let row = floor(i / 6);

        // Negative charges on left plate
        fill(0, 0, 200);
        text("-", plateX + 3 + row * 5, py);

        // Positive charges on right plate
        fill(200, 0, 0);
        text("+", plateX + plateW - 12 + row * 5, py);
    }

    // Draw electric field lines
    if (capacitorVoltage > 0.1) {
        stroke(150, 100, 0, 150);
        strokeWeight(1);
        let fieldLines = floor(map(capacitorVoltage, 0, voltage, 0, 5));
        for (let i = 0; i < fieldLines; i++) {
            let ly = plateY + 15 + i * 15;
            line(plateX + 20, ly, plateX + plateW - 20, ly);
            // Arrow head
            line(plateX + plateW - 25, ly - 3, plateX + plateW - 20, ly);
            line(plateX + plateW - 25, ly + 3, plateX + plateW - 20, ly);
        }
    }

    // Labels
    fill(0);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    text("E-field", detailX + detailW/2, plateY + plateH + 10);

    // Charge indicator
    textSize(12);
    textAlign(CENTER, TOP);
    let chargeText = "Q = " + (capacitorCharge * 1e6).toFixed(2) + " μC";
    text(chargeText, detailX + detailW/2, plateY + plateH + 30);
}

function drawDisplayPanel() {
    // Display region background
    fill(250, 250, 240);
    stroke(200);
    strokeWeight(1);
    rect(displayX, displayY, displayW, displayH, 5);

    // Title
    fill(0);
    noStroke();
    textSize(14);
    textAlign(CENTER, TOP);
    text("Measurements", displayX + displayW/2, displayY + 5);

    let y = displayY + 35;
    let lineHeight = 28;
    textSize(12);
    textAlign(LEFT, TOP);

    // Time constant
    fill(0, 100, 0);
    text("τ = RC = " + timeConstant.toFixed(3) + " s", displayX + 10, y);
    y += lineHeight;

    // Capacitor voltage
    fill(0, 0, 150);
    text("Vc = " + capacitorVoltage.toFixed(2) + " V", displayX + 10, y);
    y += lineHeight;

    // Percentage charged
    let percentCharged = (capacitorVoltage / voltage * 100);
    text("Charged: " + percentCharged.toFixed(1) + "%", displayX + 10, y);
    y += lineHeight;

    // Current
    fill(150, 0, 0);
    text("I = " + (current * 1000).toFixed(3) + " mA", displayX + 10, y);
    y += lineHeight;

    // Charge
    fill(100, 0, 100);
    text("Q = " + (capacitorCharge * 1e6).toFixed(2) + " μC", displayX + 10, y);
    y += lineHeight;

    // Simulation time
    fill(0);
    text("Time: " + simTime.toFixed(2) + " s", displayX + 10, y);
    y += lineHeight;

    // Time constant markers
    textSize(10);
    fill(80);
    text("At 1τ: 63.2% charged", displayX + 10, y);
    y += 18;
    text("At 3τ: 95.0% charged", displayX + 10, y);
    y += 18;
    text("At 5τ: 99.3% charged", displayX + 10, y);
}

function drawGraphs() {
    // Graph region background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(graphX, graphY, graphW, graphH, 5);

    // Title
    fill(0);
    noStroke();
    textSize(14);
    textAlign(CENTER, TOP);
    text("Voltage and Current vs. Time", graphX + graphW/2, graphY + 5);

    // Split into two graphs
    let vGraphY = graphY + 25;
    let vGraphH = (graphH - 50) / 2 - 10;
    let iGraphY = vGraphY + vGraphH + 20;
    let iGraphH = vGraphH;
    let gLeft = graphX + 60;
    let gWidth = graphW - 80;

    // Draw voltage graph
    drawGraph(gLeft, vGraphY, gWidth, vGraphH, timeHistory, voltageHistory,
              "Voltage (V)", voltage, color(0, 0, 200));

    // Draw current graph
    let maxCurrent = (voltage / resistance) * 1000; // mA
    drawGraph(gLeft, iGraphY, gWidth, iGraphH, timeHistory, currentHistory,
              "Current (mA)", maxCurrent, color(200, 0, 0));

    // Draw time constant markers
    if (timeHistory.length > 0) {
        let maxTime = max(5 * timeConstant, simTime, 5);
        stroke(0, 150, 0, 100);
        strokeWeight(1);
        for (let t = 1; t <= 5; t++) {
            let tauTime = t * timeConstant;
            if (tauTime < maxTime) {
                let x = map(tauTime, 0, maxTime, gLeft, gLeft + gWidth);
                line(x, vGraphY, x, iGraphY + iGraphH);
                fill(0, 150, 0);
                noStroke();
                textSize(9);
                textAlign(CENTER, TOP);
                text(t + "τ", x, graphY + graphH - 15);
                stroke(0, 150, 0, 100);
            }
        }
    }
}

function drawGraph(x, y, w, h, xData, yData, label, maxY, lineColor) {
    // Graph background
    fill(250);
    stroke(180);
    strokeWeight(1);
    rect(x, y, w, h);

    // Axes
    stroke(0);
    strokeWeight(1);
    line(x, y + h, x + w, y + h); // X axis
    line(x, y, x, y + h);         // Y axis

    // Y label
    push();
    translate(x - 40, y + h/2);
    rotate(-HALF_PI);
    fill(0);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text(label, 0, 0);
    pop();

    // Y axis scale
    textSize(9);
    textAlign(RIGHT, CENTER);
    text(maxY.toFixed(1), x - 5, y + 5);
    text("0", x - 5, y + h - 5);

    // Plot data
    if (xData.length > 1) {
        let maxTime = max(5 * timeConstant, simTime, 5);

        noFill();
        stroke(lineColor);
        strokeWeight(2);
        beginShape();
        for (let i = 0; i < xData.length; i++) {
            let px = map(xData[i], 0, maxTime, x, x + w);
            let py = map(yData[i], 0, maxY, y + h, y);
            py = constrain(py, y, y + h);
            vertex(px, py);
        }
        endShape();

        // Current time marker
        if (isRunning) {
            let currentX = map(simTime, 0, maxTime, x, x + w);
            stroke(0, 200, 0);
            strokeWeight(2);
            line(currentX, y, currentX, y + h);
        }
    }

    // Draw theoretical curves faintly
    stroke(lineColor.levels[0], lineColor.levels[1], lineColor.levels[2], 50);
    strokeWeight(1);
    noFill();
    beginShape();
    let maxTime = max(5 * timeConstant, 5);
    for (let t = 0; t <= maxTime; t += maxTime/100) {
        let px = map(t, 0, maxTime, x, x + w);
        let theoreticalY;
        if (label.includes("Voltage")) {
            theoreticalY = voltage * (1 - exp(-t / timeConstant));
        } else {
            theoreticalY = (voltage / resistance) * 1000 * exp(-t / timeConstant);
        }
        let py = map(theoreticalY, 0, maxY, y + h, y);
        vertex(px, py);
    }
    endShape();
}

function drawCurrentFlow() {
    let flowSpeed = map(abs(current), 0, voltage/resistance, 0, 5);
    let numDots = floor(map(abs(current), 0, voltage/resistance, 0, 10));

    fill(255, 200, 0);
    noStroke();
    for (let i = 0; i < numDots; i++) {
        let phase = (frameCount * flowSpeed / 60 + i / numDots) % 1;
        // Simplified electron position along circuit
        let ex = circuitX + 100 + phase * (circuitW - 150);
        let ey = circuitY + 60 + sin(phase * TWO_PI) * 20;
        ellipse(ex, ey, 6, 6);
    }
}

function drawControlLabels() {

    fill('black');
    textSize(11);
    textAlign(CENTER, TOP);

    let labelY = drawHeight + 5;  // Labels at top of control area

    // Labels above sliders with current values - expanded for clarity
    text("Voltage: " + voltage.toFixed(1) + " V", 120, labelY);
    text("Resistance: " + formatResistance(resistance), 250, labelY);
    text("Capacitance: " + formatCapacitance(capacitance), 380, labelY);

    // Instruction prompt when in standby - helps novice users (to the right of buttons)
    textAlign(LEFT, CENTER);
    textSize(10);
    let promptY = drawHeight + 60;
    let promptX = 450;  // After the buttons
    if (switchState === 0 && simTime === 0) {
        // Initial state - show getting started instruction
        fill(0, 100, 150);
        text("Click 'Start Charging' to begin", promptX, promptY);
    } else if (switchState === 0 && capacitorVoltage > 0.1) {
        // Paused with charge - suggest next action
        fill(100, 80, 0);
        text("Charged " + (capacitorVoltage/voltage*100).toFixed(0) + "% - Try 'Start Discharging'", promptX, promptY);
    }
}

function formatResistance(r) {
    if (r >= 1000000) return (r/1000000).toFixed(1) + " MΩ";
    if (r >= 1000) return (r/1000).toFixed(1) + " kΩ";
    return r.toFixed(0) + " Ω";
}

function formatCapacitance(c) {
    let uF = c * 1e6;
    if (uF >= 1000) return (uF/1000).toFixed(1) + " mF";
    return uF.toFixed(0) + " μF";
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    // Reposition controls - sliders on first row, buttons on second row
    let controlY = drawHeight + 25;
    let buttonY = controlY + 30;

    voltageSlider.position(80, controlY);
    resistanceSlider.position(210, controlY);
    capacitanceSlider.position(340, controlY);

    chargeBtn.position(80, buttonY);
    pauseBtn.position(190, buttonY);
    dischargeBtn.position(255, buttonY);
    resetBtn.position(375, buttonY);
}
