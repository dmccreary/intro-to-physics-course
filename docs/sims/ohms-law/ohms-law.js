// Ohm's Law Interactive Calculator MicroSim
// Explore the relationship between voltage, current, and resistance

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 550;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Circuit layout
let circuitX = 50;
let circuitY = 60;
let circuitWidth = 400;
let circuitHeight = 280;

// Graph layout
let graphX = 500;
let graphY = 60;
let graphWidth = 350;
let graphHeight = 200;

// Info panel
let infoX = 500;
let infoY = 280;
let infoWidth = 350;
let infoHeight = 200;

// Electrical values
let voltage = 6;       // Volts
let resistance = 100;  // Ohms
let current = 0.06;    // Amps (calculated)

// Solve mode: 0 = solve for I, 1 = solve for V, 2 = solve for R
let solveMode = 0;

// UI elements
let voltageSlider, resistanceSlider, currentSlider;
let solveIRadio, solveVRadio, solveRRadio;

// Animation
let particles = [];
let numParticles = 30;

// Resistor color bands
const colorBands = [
    '#000000', // 0 - Black
    '#8B4513', // 1 - Brown
    '#FF0000', // 2 - Red
    '#FFA500', // 3 - Orange
    '#FFFF00', // 4 - Yellow
    '#00FF00', // 5 - Green
    '#0000FF', // 6 - Blue
    '#EE82EE', // 7 - Violet
    '#808080', // 8 - Gray
    '#FFFFFF'  // 9 - White
];
const colorNames = ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Gray', 'White'];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    createControls();
    initParticles();
    calculateValues();

    describe('Interactive Ohm\'s Law calculator showing circuit with animated current, V-I graph, and linked controls', LABEL);
}

function createControls() {
    let y1 = drawHeight + 15;
    let y2 = drawHeight + 50;
    let y3 = drawHeight + 80;

    // Voltage slider
    voltageSlider = createSlider(0, 12, 6, 0.1);
    voltageSlider.position(100, y1);
    voltageSlider.size(150);
    voltageSlider.input(onVoltageChange);

    // Resistance slider (logarithmic display, linear internal)
    resistanceSlider = createSlider(0, 100, 50, 1);  // Maps to 1-1000 Ω
    resistanceSlider.position(100, y2);
    resistanceSlider.size(150);
    resistanceSlider.input(onResistanceChange);

    // Current slider (for solve-for-V or solve-for-R modes)
    currentSlider = createSlider(0.001, 1, 0.06, 0.001);
    currentSlider.position(100, y3);
    currentSlider.size(150);
    currentSlider.input(onCurrentChange);

    // Radio buttons for solve mode
    solveIRadio = createRadio('solveMode');
    solveIRadio.option('Solve for I', 0);
    solveIRadio.option('Solve for V', 1);
    solveIRadio.option('Solve for R', 2);
    solveIRadio.selected('0');
    solveIRadio.position(350, y1);
    solveIRadio.style('font-size', '13px');
    solveIRadio.changed(onSolveModeChange);
}

function mapResistanceSlider(val) {
    // Map 0-100 to 1-1000 Ω logarithmically
    return pow(10, map(val, 0, 100, 0, 3));
}

function unmapResistanceSlider(r) {
    // Inverse of above
    return map(log(r) / log(10), 0, 3, 0, 100);
}

function onVoltageChange() {
    voltage = voltageSlider.value();
    calculateValues();
}

function onResistanceChange() {
    resistance = mapResistanceSlider(resistanceSlider.value());
    calculateValues();
}

function onCurrentChange() {
    current = currentSlider.value();
    calculateFromCurrent();
}

function onSolveModeChange() {
    solveMode = parseInt(solveIRadio.value());
    calculateValues();
}

function calculateValues() {
    if (solveMode === 0) {
        // Solve for I: I = V/R
        current = voltage / resistance;
    } else if (solveMode === 1) {
        // Solve for V: V = IR (current and resistance adjustable)
        voltage = current * resistance;
        voltage = constrain(voltage, 0, 12);
        voltageSlider.value(voltage);
    } else if (solveMode === 2) {
        // Solve for R: R = V/I
        if (current > 0.001) {
            resistance = voltage / current;
            resistance = constrain(resistance, 1, 1000);
            resistanceSlider.value(unmapResistanceSlider(resistance));
        }
    }
}

function calculateFromCurrent() {
    if (solveMode === 1) {
        // Solve for V
        voltage = current * resistance;
        voltage = constrain(voltage, 0, 12);
        voltageSlider.value(voltage);
    } else if (solveMode === 2) {
        // Solve for R
        if (current > 0.001) {
            resistance = voltage / current;
            resistance = constrain(resistance, 1, 1000);
            resistanceSlider.value(unmapResistanceSlider(resistance));
        }
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            pos: random(0, 1),  // Position along circuit path (0-1)
            speed: 0
        });
    }
}

function updateParticles() {
    // Speed proportional to current (capped for visibility)
    let speed = map(current, 0, 0.5, 0.001, 0.02);
    speed = constrain(speed, 0.001, 0.03);

    for (let p of particles) {
        p.pos += speed;
        if (p.pos > 1) p.pos -= 1;
    }
}

function draw() {
    updateCanvasSize();
    updateParticles();

    // Background
    background(250);

    // Title
    fill(30);
    noStroke();
    textSize(20);
    textAlign(CENTER, TOP);
    text("Ohm's Law: V = IR", canvasWidth / 2, 10);

    // Draw circuit
    drawCircuit();

    // Draw V-I graph
    drawGraph();

    // Draw info panel
    drawInfoPanel();

    // Control area
    fill(245);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Control labels
    drawControlLabels();
}

function drawCircuit() {
    let cx = circuitX + circuitWidth / 2;
    let cy = circuitY + circuitHeight / 2;
    let hw = circuitWidth / 2 - 30;
    let hh = circuitHeight / 2 - 30;

    // Calculate power for wire color
    let power = voltage * current;
    let wireHeat = map(power, 0, 2, 0, 1);
    wireHeat = constrain(wireHeat, 0, 1);

    // Wire color (blue to orange/red based on power)
    let wireColor = lerpColor(color(60, 60, 180), color(255, 100, 50), wireHeat);

    // Draw circuit wires
    stroke(wireColor);
    strokeWeight(4);
    noFill();

    // Top wire
    line(cx - hw, cy - hh, cx + hw, cy - hh);
    // Right wire
    line(cx + hw, cy - hh, cx + hw, cy + hh);
    // Bottom wire
    line(cx - hw, cy + hh, cx + hw, cy + hh);
    // Left wire (with gap for battery)
    line(cx - hw, cy - hh, cx - hw, cy - 30);
    line(cx - hw, cy + 30, cx - hw, cy + hh);

    // Draw battery
    drawBattery(cx - hw - 15, cy, voltage);

    // Draw resistor
    drawResistor(cx + 30, cy - hh - 8, resistance);

    // Draw ammeter
    drawAmmeter(cx, cy + hh + 5, current);

    // Draw voltmeter
    drawVoltmeter(cx + hw + 40, cy, voltage);

    // Draw current particles
    drawParticles(cx, cy, hw, hh, wireColor);

    // Power warning
    if (power > 1) {
        fill(255, 50, 50);
        noStroke();
        textSize(12);
        textAlign(CENTER, TOP);
        text('⚠ High Power: ' + power.toFixed(2) + ' W', cx, circuitY + circuitHeight + 5);
    }
}

function drawBattery(x, y, v) {
    // Battery body
    fill(80);
    stroke(60);
    strokeWeight(2);
    rect(x - 15, y - 40, 30, 80, 3);

    // Positive terminal
    fill(200, 50, 50);
    noStroke();
    rect(x - 8, y - 48, 16, 10, 2);
    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    text('+', x, y - 43);

    // Negative terminal
    fill(50, 50, 200);
    rect(x - 8, y + 38, 16, 10, 2);
    fill(255);
    text('−', x, y + 43);

    // Voltage label
    fill(255);
    textSize(11);
    text(v.toFixed(1) + 'V', x, y);
}

function drawResistor(x, y, r) {
    // Resistor body
    fill(220, 200, 180);
    stroke(150);
    strokeWeight(1);
    rect(x - 40, y - 10, 80, 20, 3);

    // Color bands
    let bands = getColorBands(r);
    let bandWidth = 8;
    let startX = x - 30;

    for (let i = 0; i < bands.length; i++) {
        fill(bands[i]);
        noStroke();
        rect(startX + i * 15, y - 8, bandWidth, 16);
    }

    // Gold tolerance band
    fill(212, 175, 55);
    rect(startX + 4 * 15, y - 8, bandWidth, 16);

    // Resistance label
    fill(80);
    textSize(11);
    textAlign(CENTER, TOP);
    noStroke();
    text(formatResistance(r), x, y + 15);
}

function getColorBands(r) {
    // Get 4-band color code for resistance
    let value = round(r);
    if (value < 10) value = 10;
    if (value > 999) value = 999;

    let str = value.toString();
    let multiplier = 0;

    // Normalize to 2 significant digits
    while (str.length > 2) {
        str = str.slice(0, -1);
        multiplier++;
    }
    while (str.length < 2) {
        str = '0' + str;
    }

    let digit1 = parseInt(str[0]);
    let digit2 = parseInt(str[1]);

    return [colorBands[digit1], colorBands[digit2], colorBands[multiplier]];
}

function formatResistance(r) {
    if (r >= 1000) {
        return (r / 1000).toFixed(1) + ' kΩ';
    } else {
        return r.toFixed(0) + ' Ω';
    }
}

function drawAmmeter(x, y, i) {
    // Ammeter circle
    fill(255);
    stroke(100);
    strokeWeight(2);
    ellipse(x, y, 50, 50);

    // Label
    fill(30);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    text('A', x, y - 20);

    // Current reading
    textSize(12);
    textAlign(CENTER, CENTER);
    let displayI = i < 1 ? (i * 1000).toFixed(0) + ' mA' : i.toFixed(2) + ' A';
    text(displayI, x, y + 3);
}

function drawVoltmeter(x, y, v) {
    // Voltmeter circle
    fill(255);
    stroke(100);
    strokeWeight(2);
    ellipse(x, y, 45, 45);

    // Probe lines
    stroke(200, 50, 50);
    strokeWeight(2);
    line(x - 30, y - 40, x - 10, y - 15);
    stroke(50, 50, 200);
    line(x - 30, y + 40, x - 10, y + 15);

    // Label
    fill(30);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    text('V', x, y - 18);

    // Voltage reading
    textSize(12);
    textAlign(CENTER, CENTER);
    text(v.toFixed(1) + ' V', x, y + 5);
}

function drawParticles(cx, cy, hw, hh, wireColor) {
    // Draw current flow particles along circuit
    fill(255, 255, 100);
    noStroke();

    for (let p of particles) {
        let pos = p.pos;
        let px, py;

        // Map position 0-1 to circuit path
        // Path: bottom-left -> bottom-right -> top-right -> top-left -> bottom-left
        let pathLength = 2 * (2 * hw + 2 * hh);
        let dist = pos * pathLength;

        if (dist < 2 * hw) {
            // Bottom wire (left to right)
            px = cx - hw + dist;
            py = cy + hh;
        } else if (dist < 2 * hw + 2 * hh) {
            // Right wire (bottom to top)
            px = cx + hw;
            py = cy + hh - (dist - 2 * hw);
        } else if (dist < 4 * hw + 2 * hh) {
            // Top wire (right to left)
            px = cx + hw - (dist - 2 * hw - 2 * hh);
            py = cy - hh;
        } else {
            // Left wire (top to bottom, with battery gap)
            let leftDist = dist - 4 * hw - 2 * hh;
            if (leftDist < hh - 30) {
                px = cx - hw;
                py = cy - hh + leftDist;
            } else if (leftDist < hh + 30) {
                // Skip battery area
                continue;
            } else {
                px = cx - hw;
                py = cy + 30 + (leftDist - hh - 30);
            }
        }

        ellipse(px, py, 8, 8);
    }
}

function drawGraph() {
    // Graph background
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(graphX, graphY, graphWidth, graphHeight);

    // Title
    fill(30);
    noStroke();
    textSize(14);
    textAlign(CENTER, TOP);
    text('V-I Characteristic Curve', graphX + graphWidth / 2, graphY + 5);

    // Grid
    stroke(230);
    strokeWeight(1);
    for (let i = 1; i < 6; i++) {
        let x = graphX + i * graphWidth / 6;
        let y = graphY + i * graphHeight / 6;
        line(x, graphY + 25, x, graphY + graphHeight - 20);
        line(graphX + 40, y, graphX + graphWidth - 10, y);
    }

    // Axes
    stroke(100);
    strokeWeight(2);
    // X-axis
    line(graphX + 40, graphY + graphHeight - 20, graphX + graphWidth - 10, graphY + graphHeight - 20);
    // Y-axis
    line(graphX + 40, graphY + 25, graphX + 40, graphY + graphHeight - 20);

    // Axis labels
    fill(60);
    textSize(11);
    textAlign(CENTER, TOP);
    text('Voltage (V)', graphX + graphWidth / 2, graphY + graphHeight - 15);

    push();
    translate(graphX + 12, graphY + graphHeight / 2);
    rotate(-PI / 2);
    textAlign(CENTER, BOTTOM);
    text('Current (A)', 0, 0);
    pop();

    // Tick labels
    textSize(9);
    textAlign(CENTER, TOP);
    for (let v = 0; v <= 12; v += 3) {
        let x = map(v, 0, 12, graphX + 40, graphX + graphWidth - 10);
        text(v, x, graphY + graphHeight - 18);
    }

    textAlign(RIGHT, CENTER);
    let maxI = 12 / resistance;
    maxI = min(maxI, 1);
    for (let i = 0; i <= 5; i++) {
        let iVal = i * maxI / 5;
        let y = map(iVal, 0, maxI, graphY + graphHeight - 20, graphY + 25);
        text(iVal.toFixed(2), graphX + 38, y);
    }

    // V = IR line for current resistance
    stroke(200, 50, 50);
    strokeWeight(2);
    let x1 = graphX + 40;
    let y1 = graphY + graphHeight - 20;
    let x2 = graphX + graphWidth - 10;
    let i2 = 12 / resistance;
    let y2 = map(min(i2, maxI), 0, maxI, graphY + graphHeight - 20, graphY + 25);
    line(x1, y1, x2, y2);

    // Current operating point
    let opX = map(voltage, 0, 12, graphX + 40, graphX + graphWidth - 10);
    let opY = map(min(current, maxI), 0, maxI, graphY + graphHeight - 20, graphY + 25);

    // Power shading (area under curve to operating point)
    fill(100, 200, 100, 50);
    noStroke();
    beginShape();
    vertex(graphX + 40, graphY + graphHeight - 20);
    vertex(opX, graphY + graphHeight - 20);
    vertex(opX, opY);
    vertex(graphX + 40, graphY + graphHeight - 20);
    endShape(CLOSE);

    // Operating point
    fill(50, 150, 50);
    stroke(30, 100, 30);
    strokeWeight(2);
    ellipse(opX, opY, 14, 14);

    // Label
    fill(30, 100, 30);
    noStroke();
    textSize(10);
    textAlign(LEFT, BOTTOM);
    text('(' + voltage.toFixed(1) + 'V, ' + (current * 1000).toFixed(0) + 'mA)', opX + 8, opY - 3);
}

function drawInfoPanel() {
    // Panel background
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(infoX, infoY, infoWidth, infoHeight, 5);

    let x = infoX + 20;
    let y = infoY + 15;
    let lineHeight = 22;

    // Title
    fill(30);
    textSize(14);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text("Ohm's Law Relationships", x, y);
    textStyle(NORMAL);

    y += 30;

    // Formulas
    textSize(13);

    // V = IR
    fill(solveMode === 1 ? color(200, 50, 50) : color(60));
    textStyle(solveMode === 1 ? BOLD : NORMAL);
    text('V = I × R', x, y);
    fill(80);
    textStyle(NORMAL);
    text('= ' + (current * 1000).toFixed(1) + ' mA × ' + formatResistance(resistance) + ' = ' + voltage.toFixed(2) + ' V', x + 70, y);

    y += lineHeight;

    // I = V/R
    fill(solveMode === 0 ? color(200, 50, 50) : color(60));
    textStyle(solveMode === 0 ? BOLD : NORMAL);
    text('I = V ÷ R', x, y);
    fill(80);
    textStyle(NORMAL);
    text('= ' + voltage.toFixed(1) + ' V ÷ ' + formatResistance(resistance) + ' = ' + (current * 1000).toFixed(1) + ' mA', x + 70, y);

    y += lineHeight;

    // R = V/I
    fill(solveMode === 2 ? color(200, 50, 50) : color(60));
    textStyle(solveMode === 2 ? BOLD : NORMAL);
    text('R = V ÷ I', x, y);
    fill(80);
    textStyle(NORMAL);
    let rCalc = current > 0.0001 ? voltage / current : 0;
    text('= ' + voltage.toFixed(1) + ' V ÷ ' + (current * 1000).toFixed(1) + ' mA = ' + formatResistance(rCalc), x + 70, y);

    y += lineHeight + 10;

    // Power
    let power = voltage * current;
    fill(power > 1 ? color(200, 50, 50) : color(60));
    textStyle(BOLD);
    text('Power:', x, y);
    textStyle(NORMAL);
    text('P = V × I = ' + voltage.toFixed(1) + ' × ' + (current * 1000).toFixed(1) + ' mA = ' + (power * 1000).toFixed(1) + ' mW', x + 60, y);

    y += lineHeight;

    // Alternative power formula
    fill(80);
    text('P = I²R = ' + (power * 1000).toFixed(1) + ' mW', x + 60, y);

    y += lineHeight;

    text('P = V²/R = ' + (power * 1000).toFixed(1) + ' mW', x + 60, y);
}

function drawControlLabels() {
    fill(60);
    textSize(13);
    textAlign(LEFT, CENTER);
    noStroke();

    // Enable/disable sliders based on solve mode
    voltageSlider.removeAttribute('disabled');
    resistanceSlider.removeAttribute('disabled');
    currentSlider.removeAttribute('disabled');

    if (solveMode === 0) {
        currentSlider.attribute('disabled', '');
    } else if (solveMode === 1) {
        voltageSlider.attribute('disabled', '');
    } else if (solveMode === 2) {
        resistanceSlider.attribute('disabled', '');
    }

    // Labels
    let labelColor = color(60);
    let disabledColor = color(180);

    fill(solveMode === 1 ? disabledColor : labelColor);
    text('Voltage: ' + voltage.toFixed(1) + ' V', 10, drawHeight + 27);

    fill(solveMode === 2 ? disabledColor : labelColor);
    text('Resistance: ' + formatResistance(resistance), 10, drawHeight + 62);

    fill(solveMode === 0 ? disabledColor : labelColor);
    let currentDisplay = current < 1 ? (current * 1000).toFixed(1) + ' mA' : current.toFixed(3) + ' A';
    text('Current: ' + currentDisplay, 10, drawHeight + 92);

    // Mode label
    fill(60);
    text('Mode:', 280, drawHeight + 27);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 950);
    }
}
