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
    let container = select('main');
    if (container) {
        canvasWidth = container.width;
    } else {
        canvasWidth = windowWidth;
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
    let sliderWidth = canvasWidth * 0.28;

    // Evenly space 3 sliders across canvas width
    // Each slider is 28% wide, leaving 16% for margins/gaps (4% each for 4 spaces)
    let slider1X = canvasWidth * 0.04;
    let slider2X = canvasWidth * 0.36;
    let slider3X = canvasWidth * 0.68;

    // Voltage slider
    fill(0);
    voltageSlider = createSlider(1, 12, voltage, 0.5);
    voltageSlider.position(slider1X, controlY);
    voltageSlider.size(sliderWidth);

    // Resistance slider
    resistanceSlider = createSlider(100, 100000, resistance, 100);
    resistanceSlider.position(slider2X, controlY);
    resistanceSlider.size(sliderWidth);

    // Capacitance slider
    capacitanceSlider = createSlider(1, 1000, capacitance * 1e6, 1);
    capacitanceSlider.position(slider3X, controlY);
    capacitanceSlider.size(sliderWidth);

    // Switch buttons on second row below sliders
    let buttonY = controlY + 30;
    let buttonX = 10;

    chargeBtn = createButton('Start Charging');
    chargeBtn.position(buttonX, buttonY);
    chargeBtn.mousePressed(() => {
        switchState = 1;
        isRunning = true;
        updateButtonStyles();
    });
    buttonX += 110;

    pauseBtn = createButton('Pause Simulation');
    pauseBtn.position(buttonX, buttonY);
    pauseBtn.mousePressed(() => {
        // Toggle pause - don't change switchState so circuit diagram stays the same
        isRunning = !isRunning;
        if (isRunning) {
            lastFrameTime = millis(); // Reset time tracking to avoid jump
        }
        updateButtonStyles();
    });
    buttonX += 130;

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
    // Default style for buttons
    let defaultStyle = 'background-color: #e0e0e0; color: black; border: 2px solid #999; font-weight: normal;';
    let disabledStyle = 'background-color: #ccc; color: #888; border: 2px solid #aaa; font-weight: normal; cursor: not-allowed;';
    let greenStyle = 'background-color: #4CAF50; color: white; border: 2px solid #2E7D32; font-weight: normal;';
    let activeChargeStyle = 'background-color: #2E7D32; color: white; border: 2px solid #1B5E20; font-weight: bold;';
    let activePauseStyle = 'background-color: #FF9800; color: white; border: 2px solid #E65100; font-weight: bold;';
    let activeDischargeStyle = 'background-color: #f44336; color: white; border: 2px solid #c62828; font-weight: bold;';

    // Reset to defaults - charge button is always green
    chargeBtn.style(greenStyle);
    pauseBtn.style(defaultStyle);
    dischargeBtn.style(defaultStyle);

    // Disable pause button at startup (nothing to pause yet)
    if (simTime === 0 && !isRunning) {
        pauseBtn.style(disabledStyle);
        pauseBtn.attribute('disabled', '');
        pauseBtn.html('Pause Simulation');
    } else {
        pauseBtn.removeAttribute('disabled');
        // Change label based on running state
        if (isRunning) {
            pauseBtn.html('Pause Simulation');
            pauseBtn.style(defaultStyle);
        } else {
            pauseBtn.html('Continue Simulation');
            pauseBtn.style(activePauseStyle);
        }
    }

    // Highlight active button with darker/bolder style
    if (switchState === 1 && isRunning) {
        chargeBtn.style(activeChargeStyle);
    } else if (switchState === -1 && isRunning) {
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

    // Circuit layout dimensions
    let cx = circuitX + 30;
    let cy = circuitY + 40;
    let cw = circuitW - 60;
    let ch = circuitH - 60;

    // Component sizes
    let batteryW = 40;
    let batteryH = 100;
    let resistorW = 40;
    let resistorH = 80;
    let capacitorW = 50;
    let capacitorH = 70;
    let lineW = 2;

    // Position battery on left side (VERTICAL)
    let batteryX = cx + 20;
    let batteryY = cy + (ch - batteryH) / 2;

    // Draw battery using library function
    let batteryLevel = map(voltage, 1, 12, 20, 100);
    drawBatterySymbol(batteryX, batteryY, batteryW, batteryH, VERTICAL, batteryLevel);

    // Voltage label
    noStroke();
    fill(0);
    textSize(11);
    textAlign(CENTER, TOP);
    text(voltage.toFixed(1) + " V", batteryX + batteryW/2, batteryY + batteryH + 5);

    // Position resistor and capacitor on right side (VERTICAL)
    // Resistor above capacitor
    let rightX = cx + cw - 60;
    let resistorY = cy + 20;
    let capacitorY = resistorY + resistorH + 30;

    // Draw resistor using library function
    drawResistorSymbol(rightX, resistorY, resistorW, resistorH, lineW, VERTICAL, formatResistance(resistance), RIGHT);

    // Draw capacitor using library function
    drawCapacitorSymbol(rightX-5, capacitorY, capacitorW, capacitorH, lineW, VERTICAL, formatCapacitance(capacitance), RIGHT);

    // Draw wires connecting components
    stroke(0);
    strokeWeight(lineW);

    // Top wire: battery top to switch to resistor top
    let batteryTopY = batteryY;
    let batteryMidX = batteryX + batteryW / 2;
    let resistorMidX = rightX + resistorW / 2;

    // Wire from battery top
    line(batteryMidX, batteryTopY, batteryMidX, cy);
    line(batteryMidX, cy, cx + cw/3, cy);

    // Switch position
    let switchX = cx + cw/3;
    let switchY = cy;

    // Draw switch based on state
    fill(100);
    noStroke();
    ellipse(switchX, switchY, 8, 8);
    ellipse(switchX + 50, switchY - 8, 8, 8);
    ellipse(switchX + 50, switchY + 12, 8, 8);

    stroke(0);
    strokeWeight(3);
    if (switchState === 1) {
        // Charging position
        line(switchX, switchY, switchX + 48, switchY - 6);
        fill(0, 150, 0);
    } else if (switchState === -1) {
        // Discharging position
        line(switchX, switchY, switchX + 48, switchY + 10);
        fill(150, 0, 0);
    } else {
        // Off position (middle)
        line(switchX, switchY, switchX + 40, switchY + 2);
        fill(100);
    }

    strokeWeight(lineW);

    // Wire from switch to resistor top
    line(switchX + 50, switchY - 8, resistorMidX, switchY - 8);
    line(resistorMidX, switchY - 8, resistorMidX, resistorY);

    // Wire from resistor bottom to capacitor top
    line(resistorMidX, resistorY + resistorH, resistorMidX, capacitorY);

    // Bottom wire: capacitor bottom to battery bottom
    let batteryBottomY = batteryY + batteryH;
    let capacitorBottomY = capacitorY + capacitorH;
    let bottomWireY = cy + ch - 10;

    line(resistorMidX, capacitorBottomY, resistorMidX, bottomWireY);
    line(resistorMidX, bottomWireY, batteryMidX, bottomWireY);
    line(batteryMidX, bottomWireY, batteryMidX, batteryBottomY);

    // Discharge path indicator
    if (switchState === -1) {
        stroke(150, 0, 0);
        strokeWeight(1);
        setLineDash([5, 5]);
        line(switchX + 50, switchY + 12, switchX + 50, bottomWireY - 30);
        line(switchX + 50, bottomWireY - 30, resistorMidX - 20, bottomWireY - 30);
        setLineDash([]);
    }

    // Draw current flow animation
    if (isRunning && abs(current) > 0.0001) {
        drawCurrentFlow();
    }
}

// Helper function for dashed lines
function setLineDash(pattern) {
    drawingContext.setLineDash(pattern);
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
    textSize(16);
    textAlign(CENTER, TOP);

    let labelY = drawHeight + 5;  // Labels at top of control area

    // Labels centered above each slider (slider center = sliderX + 0.14 * canvasWidth)
    let label1X = canvasWidth * 0.18;  // 0.04 + 0.14
    let label2X = canvasWidth * 0.50;  // 0.36 + 0.14
    let label3X = canvasWidth * 0.82;  // 0.68 + 0.14

    // Labels above sliders with current values - expanded for clarity
    text("Voltage: " + voltage.toFixed(1) + " V", label1X, labelY);
    text("Resistance: " + formatResistance(resistance), label2X, labelY);
    text("Capacitance: " + formatCapacitance(capacitance), label3X, labelY);

    // Instruction prompt when in standby - helps novice users (to the right of buttons)
    textAlign(LEFT, CENTER);
    textSize(14);
    let promptY = drawHeight + 60;
    let promptX = canvasWidth * 0.6;  // After the buttons, responsive positioning
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
    let sliderWidth = canvasWidth * 0.28;

    // Evenly space 3 sliders across canvas width
    let slider1X = canvasWidth * 0.04;
    let slider2X = canvasWidth * 0.36;
    let slider3X = canvasWidth * 0.68;

    voltageSlider.position(slider1X, controlY);
    voltageSlider.size(sliderWidth);
    resistanceSlider.position(slider2X, controlY);
    resistanceSlider.size(sliderWidth);
    capacitanceSlider.position(slider3X, controlY);
    capacitanceSlider.size(sliderWidth);

    // Position buttons using percentage-based spacing
    let buttonStartX = canvasWidth * 0.04;
    chargeBtn.position(buttonStartX, buttonY);
    pauseBtn.position(buttonStartX + 110, buttonY);
    dischargeBtn.position(buttonStartX + 175, buttonY);
    resetBtn.position(buttonStartX + 295, buttonY);
}

// ============================================
// Circuit Component Library Functions
// From p5-circuit-lib.js - copied here for p5.js editor testing
// ============================================

// Define orientation constants
const HORIZONTAL = 0;
const VERTICAL = 1;

// Draw a battery with level indicator
function drawBatterySymbol(x, y, width, height, orientation, level) {
    push();

    if (orientation === HORIZONTAL) {
        translate(x + height, y);
        rotate(PI/2);
        x = 0;
        y = 0;
        let temp = width;
        width = height;
        height = temp;
    } else {
        translate(x, y);
        x = 0;
        y = 0;
    }

    let terminalHeight = height * 0.1;
    let bodyHeight = height - terminalHeight;
    let goldPercent = 0.4;
    let goldHeight = bodyHeight * goldPercent;
    let blackHeight = bodyHeight * (1 - goldPercent);
    let batteryBorder = width * 0.1;
    let innerWidth = width - (batteryBorder * 2);

    // Draw battery outline
    strokeWeight(2);
    stroke(100);
    fill(240);
    rect(0, 0, width, height, 5, 5, 5, 5);

    // Positive terminal
    fill(220);
    noStroke();
    rect(width * 0.3, -terminalHeight, width * 0.4, terminalHeight);

    // Positive electrode (gold)
    fill('gold');
    rect(batteryBorder, batteryBorder, innerWidth, goldHeight);

    // Negative electrode (black)
    fill('black');
    rect(batteryBorder, batteryBorder + goldHeight, innerWidth, blackHeight);

    // Battery level
    let levelHeight = map(level, 0, 100, 0, bodyHeight - batteryBorder * 2);
    let levelColor;
    if (level < 20) {
        levelColor = color(255, 0, 0);
    } else if (level < 50) {
        levelColor = color(255, 165, 0);
    } else {
        levelColor = color(0, 255, 0);
    }

    fill(levelColor);
    rect(batteryBorder * 1.5, height - batteryBorder - levelHeight, innerWidth - batteryBorder, levelHeight);

    // Terminal symbols
    strokeWeight(2);
    stroke(50);
    let centerX = width / 2;
    let plusY = batteryBorder + goldHeight / 2;
    line(centerX - 10, plusY, centerX + 10, plusY);
    line(centerX, plusY - 10, centerX, plusY + 10);

    let minusY = batteryBorder + goldHeight + blackHeight / 2;
    stroke('gray');
    line(centerX - 10, minusY * 1.2, centerX + 10, minusY * 1.2);

    pop();
}

// Draw a schematic resistor symbol
function drawResistorSymbol(x, y, rwidth, rheight, lw, orientation, label, labelPosition) {
    strokeWeight(lw);
    stroke(0);
    noFill();

    let endWirePercent = 0.15;
    let peaks = 6;

    if (orientation === HORIZONTAL) {
        let halfHeight = y + rheight / 2;
        let endWireLength = rwidth * endWirePercent;
        let peakWidth = (rwidth - 2 * endWireLength) / peaks;
        let peakHeight = rheight / 3;

        line(x, halfHeight, x + endWireLength, halfHeight);
        line(x + rwidth - endWireLength, halfHeight, x + rwidth, halfHeight);

        beginShape();
        vertex(x + endWireLength, halfHeight);
        for (let i = 0; i <= peaks - 1; i++) {
            let xPos = x + endWireLength + i * peakWidth + peakWidth / 2;
            let yPos = (i % 2 === 0) ? halfHeight - peakHeight : halfHeight + peakHeight;
            vertex(xPos, yPos);
        }
        vertex(x + rwidth - endWireLength, halfHeight);
        endShape();
    } else if (orientation === VERTICAL) {
        let halfWidth = x + rwidth / 2;
        let endWireLength = rheight * endWirePercent;
        let peakHeight = rwidth / 3;
        let peakWidth = (rheight - 2 * endWireLength) / peaks;

        beginShape();
        vertex(halfWidth, y);
        vertex(halfWidth, y + endWireLength);
        for (let i = 0; i <= peaks - 1; i++) {
            let yPos = y + endWireLength + i * peakWidth + peakWidth / 2;
            let xPos = (i % 2 === 0) ? halfWidth - peakHeight : halfWidth + peakHeight;
            vertex(xPos, yPos);
        }
        vertex(halfWidth, y + rheight - endWireLength);
        vertex(halfWidth, y + rheight);
        endShape();
    }

    // Draw label
    if (label) {
        push();
        noStroke();
        fill(0);
        let fontSize = Math.max(8, Math.min(14, (orientation === HORIZONTAL ? rwidth : rheight) * 0.12));
        textSize(fontSize);

        let centerX = x + rwidth / 2;
        let centerY = y + rheight / 2;
        let padding = fontSize * 1.2;

        if (orientation === VERTICAL) {
            textAlign(LEFT, CENTER);
            text(label, centerX + rwidth / 3 + padding, centerY);
        } else {
            textAlign(CENTER, TOP);
            text(label, centerX, centerY + rheight / 3 + padding);
        }
        pop();
    }
}

// Draw a schematic capacitor symbol
function drawCapacitorSymbol(x, y, cwidth, cheight, lw, orientation, label, labelPosition) {
    strokeWeight(lw);
    stroke(0);
    noFill();

    let endWirePercent = 0.35;
    let plateSizePercent = 0.5;

    if (orientation === HORIZONTAL) {
        let halfHeight = y + cheight / 2;
        let endWireLength = cwidth * endWirePercent;
        let plateHeight = cheight * plateSizePercent;
        let plateX1 = x + endWireLength;
        let plateX2 = x + cwidth - endWireLength;

        line(x, halfHeight, plateX1, halfHeight);
        line(plateX2, halfHeight, x + cwidth, halfHeight);
        line(plateX1, halfHeight - plateHeight / 2, plateX1, halfHeight + plateHeight / 2);
        line(plateX2, halfHeight - plateHeight / 2, plateX2, halfHeight + plateHeight / 2);
    } else if (orientation === VERTICAL) {
        let halfWidth = x + cwidth / 2;
        let endWireLength = cheight * endWirePercent;
        let plateWidth = cwidth * plateSizePercent;
        let plateY1 = y + endWireLength;
        let plateY2 = y + cheight - endWireLength;

        line(halfWidth, y, halfWidth, plateY1);
        line(halfWidth, plateY2, halfWidth, y + cheight);
        line(halfWidth - plateWidth / 2, plateY1, halfWidth + plateWidth / 2, plateY1);
        line(halfWidth - plateWidth / 2, plateY2, halfWidth + plateWidth / 2, plateY2);
    }

    // Draw label
    if (label) {
        push();
        noStroke();
        fill(0);
        let fontSize = Math.max(8, Math.min(14, (orientation === HORIZONTAL ? cwidth : cheight) * 0.12));
        textSize(fontSize);

        let centerX = x + cwidth / 2;
        let centerY = y + cheight / 2;
        let padding = fontSize * 1.2;

        if (orientation === VERTICAL) {
            textAlign(LEFT, CENTER);
            text(label, centerX + cwidth * plateSizePercent / 2 + padding, centerY);
        } else {
            textAlign(CENTER, TOP);
            text(label, centerX, centerY + cheight * plateSizePercent / 2 + padding);
        }
        pop();
    }
}
