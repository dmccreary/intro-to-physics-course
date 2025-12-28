// Energy Conservation Roller Coaster Simulation
// Shows energy transformation between KE and PE

let canvasWidth = 1000;
let drawHeight = 450;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 140;

// Controls
let massSlider, heightSlider, frictionSlider;
let trackSelect;
let releaseBtn, pauseBtn, resetBtn;

// Simulation state
let isRunning = false;
let isPaused = false;
let cart = { t: 0, x: 0, y: 0, v: 0 };
let initialHeight = 10;
let mass = 2;
let friction = 0;
let currentTrack = 0;
let energyHistory = [];
let maxHistoryLength = 200;

// Track definitions
let tracks = [];
let trackPoints = [];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    initTracks();

    let ctrlY = drawHeight + 15;

    // Buttons
    releaseBtn = createButton('Release Cart');
    releaseBtn.position(10, ctrlY);
    releaseBtn.mousePressed(startSimulation);

    pauseBtn = createButton('Pause');
    pauseBtn.position(110, ctrlY);
    pauseBtn.mousePressed(togglePause);

    resetBtn = createButton('Reset');
    resetBtn.position(170, ctrlY);
    resetBtn.mousePressed(resetSimulation);

    // Track selector
    trackSelect = createSelect();
    trackSelect.position(240, ctrlY);
    trackSelect.option('Simple Hill');
    trackSelect.option('Double Hill');
    trackSelect.option('Loop-de-loop');
    trackSelect.changed(() => {
        currentTrack = trackSelect.selected() === 'Simple Hill' ? 0 :
                       trackSelect.selected() === 'Double Hill' ? 1 : 2;
        resetSimulation();
    });

    // Sliders
    massSlider = createSlider(0.5, 5, 2, 0.1);
    massSlider.position(sliderLeftMargin, ctrlY + 35);
    massSlider.size(120);
    massSlider.input(resetSimulation);

    heightSlider = createSlider(5, 15, 10, 0.5);
    heightSlider.position(sliderLeftMargin + 180, ctrlY + 35);
    heightSlider.size(120);
    heightSlider.input(resetSimulation);

    frictionSlider = createSlider(0, 0.3, 0, 0.01);
    frictionSlider.position(sliderLeftMargin + 360, ctrlY + 35);
    frictionSlider.size(120);
    frictionSlider.input(resetSimulation);

    resetSimulation();
    describe('Roller coaster simulation showing energy conservation', LABEL);
}

function initTracks() {
    // Simple hill track
    tracks[0] = (t) => {
        let x = t * 600 + 50;
        let baseY = 350;
        let h = heightSlider ? heightSlider.value() : 10;
        let y;
        if (t < 0.15) {
            y = baseY - h * 25 * (1 - t/0.15);
        } else if (t < 0.5) {
            let localT = (t - 0.15) / 0.35;
            y = baseY - h * 25 * cos(localT * PI);
        } else {
            y = baseY;
        }
        return { x: x, y: y };
    };

    // Double hill track
    tracks[1] = (t) => {
        let x = t * 600 + 50;
        let baseY = 350;
        let h = heightSlider ? heightSlider.value() : 10;
        let y;
        if (t < 0.1) {
            y = baseY - h * 25 * (1 - t/0.1);
        } else if (t < 0.35) {
            let localT = (t - 0.1) / 0.25;
            y = baseY - h * 25 * cos(localT * PI);
        } else if (t < 0.65) {
            let localT = (t - 0.35) / 0.3;
            y = baseY - h * 18 * cos(localT * PI);
        } else {
            y = baseY;
        }
        return { x: x, y: y };
    };

    // Loop track
    tracks[2] = (t) => {
        let x = t * 650 + 50;
        let baseY = 350;
        let h = heightSlider ? heightSlider.value() : 10;
        let y;
        if (t < 0.1) {
            y = baseY - h * 25 * (1 - t/0.1);
        } else if (t < 0.35) {
            let localT = (t - 0.1) / 0.25;
            y = baseY - h * 25 * cos(localT * PI * 0.7);
        } else if (t < 0.55) {
            // Loop section
            let localT = (t - 0.35) / 0.2;
            let loopR = 40;
            let cx = 300;
            let cy = baseY - loopR - 10;
            x = cx + loopR * sin(localT * TWO_PI);
            y = cy + loopR * cos(localT * TWO_PI);
        } else if (t < 0.75) {
            let localT = (t - 0.55) / 0.2;
            y = baseY - 30 + 30 * localT;
        } else {
            y = baseY;
        }
        return { x: x, y: y };
    };
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
    text('Energy Conservation Roller Coaster', canvasWidth/2, 10);

    // Get values
    mass = massSlider.value();
    initialHeight = heightSlider.value();
    friction = frictionSlider.value();

    // Update simulation
    if (isRunning && !isPaused) {
        updatePhysics();
    }

    // Draw elements
    drawTrack();
    drawCart();
    drawEnergyDisplay();
    drawEnergyGraph();
    drawControlLabels();
}

function updatePhysics() {
    let dt = 0.003;
    let g = 9.8;

    // Get current and next positions
    let p0 = tracks[currentTrack](cart.t);
    let p1 = tracks[currentTrack](cart.t + 0.001);

    // Calculate height and slope
    let dy = p1.y - p0.y;
    let dx = p1.x - p0.x;
    let ds = sqrt(dx*dx + dy*dy);
    let slope = dy / max(ds, 0.1);

    // Calculate height in meters (pixel to meter conversion)
    let baseY = 350;
    let h = (baseY - p0.y) / 25; // 25 pixels per meter

    // Energy conservation: v = sqrt(2g(h0 - h) - energy_lost)
    let totalEnergy = g * initialHeight;
    let currentPE = g * max(0, h);

    // Apply friction loss
    if (friction > 0 && cart.t > 0) {
        totalEnergy -= friction * cart.t * 10;
    }

    let availableKE = max(0, totalEnergy - currentPE);
    cart.v = sqrt(2 * availableKE);

    // Move along track
    let speed = cart.v * 0.0015; // Scale for animation
    cart.t += speed;

    // Update position
    let pos = tracks[currentTrack](cart.t);
    cart.x = pos.x;
    cart.y = pos.y;

    // Record energy history
    let ke = 0.5 * mass * cart.v * cart.v;
    let pe = mass * g * max(0, h);
    energyHistory.push({ ke: ke, pe: pe, total: ke + pe });
    if (energyHistory.length > maxHistoryLength) {
        energyHistory.shift();
    }

    // Check if simulation complete
    if (cart.t >= 1 || cart.v < 0.1) {
        isRunning = false;
        pauseBtn.html('Pause');
    }
}

function drawTrack() {
    // Draw track
    stroke(100, 80, 60);
    strokeWeight(6);
    noFill();
    beginShape();
    for (let t = 0; t <= 1; t += 0.01) {
        let p = tracks[currentTrack](t);
        vertex(p.x, p.y);
    }
    endShape();

    // Track supports
    stroke(80, 60, 40);
    strokeWeight(3);
    for (let t = 0; t <= 1; t += 0.1) {
        let p = tracks[currentTrack](t);
        line(p.x, p.y, p.x, 360);
    }

    // Ground
    fill(180, 160, 120);
    noStroke();
    rect(0, 355, canvasWidth, 50);

    // Height markers
    fill('black');
    textSize(10);
    textAlign(RIGHT, CENTER);
    for (let h = 0; h <= 15; h += 5) {
        let y = 350 - h * 25;
        stroke(200);
        strokeWeight(1);
        line(30, y, 45, y);
        noStroke();
        text(h + 'm', 28, y);
    }
}

function drawCart() {
    // Cart body
    let pos = tracks[currentTrack](cart.t);

    fill(220, 50, 50);
    stroke(150, 30, 30);
    strokeWeight(2);
    ellipse(pos.x, pos.y - 10, 20, 20);

    // Speed indicator (color based on velocity)
    let speedColor = lerpColor(color(100, 100, 255), color(255, 100, 100), cart.v / 15);
    fill(speedColor);
    noStroke();
    ellipse(pos.x, pos.y - 10, 14, 14);
}

function drawEnergyDisplay() {
    let g = 9.8;
    let baseY = 350;
    let h = (baseY - cart.y) / 25;

    let ke = 0.5 * mass * cart.v * cart.v;
    let pe = mass * g * max(0, h);
    let total = ke + pe;
    let maxE = mass * g * initialHeight * 1.2;

    // Energy bars panel
    let panelX = canvasWidth - 200;
    let panelY = 50;
    let barWidth = 30;
    let barMaxHeight = 150;

    // Background
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX - 10, panelY - 10, 190, barMaxHeight + 80, 10);

    // Title
    fill('black');
    textSize(12);
    textAlign(CENTER, TOP);
    noStroke();
    text('Energy Distribution', panelX + 85, panelY);

    // Stacked bar
    let barX = panelX + 30;
    let barBaseY = panelY + barMaxHeight + 20;

    // PE portion (bottom, red)
    let peHeight = map(pe, 0, maxE, 0, barMaxHeight);
    fill(255, 100, 100);
    stroke(200, 50, 50);
    strokeWeight(1);
    rect(barX, barBaseY - peHeight, barWidth, peHeight);

    // KE portion (top, blue)
    let keHeight = map(ke, 0, maxE, 0, barMaxHeight);
    fill(100, 150, 255);
    stroke(50, 100, 200);
    rect(barX, barBaseY - peHeight - keHeight, barWidth, keHeight);

    // Total line
    let totalHeight = map(total, 0, maxE, 0, barMaxHeight);
    stroke(0, 180, 0);
    strokeWeight(2);
    line(barX - 5, barBaseY - totalHeight, barX + barWidth + 5, barBaseY - totalHeight);

    // Labels
    fill('black');
    textSize(10);
    textAlign(LEFT, CENTER);
    noStroke();
    text('KE: ' + ke.toFixed(0) + ' J', barX + 45, barBaseY - peHeight - keHeight/2);
    text('PE: ' + pe.toFixed(0) + ' J', barX + 45, barBaseY - peHeight/2);
    text('Total: ' + total.toFixed(0) + ' J', barX + 45, barBaseY + 15);

    // Legend
    fill(100, 150, 255);
    rect(panelX + 100, panelY + 20, 12, 12);
    fill(255, 100, 100);
    rect(panelX + 100, panelY + 38, 12, 12);
    fill('black');
    textSize(10);
    text('KE', panelX + 118, panelY + 26);
    text('PE', panelX + 118, panelY + 44);

    // Current values display
    textAlign(LEFT, TOP);
    text('Height: ' + h.toFixed(1) + ' m', panelX, barBaseY + 30);
    text('Speed: ' + cart.v.toFixed(1) + ' m/s', panelX + 80, barBaseY + 30);
}

function drawEnergyGraph() {
    if (energyHistory.length < 2) return;

    let graphX = 60;
    let graphY = 50;
    let graphW = 250;
    let graphH = 100;

    // Background
    fill(255, 255, 255, 200);
    stroke(200);
    strokeWeight(1);
    rect(graphX - 5, graphY - 5, graphW + 10, graphH + 30, 5);

    // Title
    fill('black');
    textSize(10);
    textAlign(CENTER, TOP);
    noStroke();
    text('Energy vs Time', graphX + graphW/2, graphY);

    // Find max energy for scaling
    let maxE = mass * 9.8 * initialHeight * 1.2;

    // Draw KE line (blue)
    stroke(100, 150, 255);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < energyHistory.length; i++) {
        let x = graphX + (i / maxHistoryLength) * graphW;
        let y = graphY + graphH - 10 - map(energyHistory[i].ke, 0, maxE, 0, graphH - 20);
        vertex(x, y);
    }
    endShape();

    // Draw PE line (red)
    stroke(255, 100, 100);
    beginShape();
    for (let i = 0; i < energyHistory.length; i++) {
        let x = graphX + (i / maxHistoryLength) * graphW;
        let y = graphY + graphH - 10 - map(energyHistory[i].pe, 0, maxE, 0, graphH - 20);
        vertex(x, y);
    }
    endShape();

    // Draw total line (green)
    stroke(0, 180, 0);
    beginShape();
    for (let i = 0; i < energyHistory.length; i++) {
        let x = graphX + (i / maxHistoryLength) * graphW;
        let y = graphY + graphH - 10 - map(energyHistory[i].total, 0, maxE, 0, graphH - 20);
        vertex(x, y);
    }
    endShape();

    // Legend
    textSize(8);
    noStroke();
    fill(100, 150, 255);
    text('KE', graphX + graphW + 5, graphY + 20);
    fill(255, 100, 100);
    text('PE', graphX + graphW + 5, graphY + 35);
    fill(0, 180, 0);
    text('Total', graphX + graphW + 5, graphY + 50);
}

function drawControlLabels() {
    textSize(11);
    textAlign(LEFT, CENTER);
    fill('black');
    noStroke();

    let y = drawHeight + 50;
    text('Mass: ' + mass.toFixed(1) + ' kg', 10, y);
    text('Height: ' + initialHeight.toFixed(1) + ' m', sliderLeftMargin + 140, y);
    text('Friction: ' + friction.toFixed(2), sliderLeftMargin + 320, y);

    // Status
    if (friction > 0) {
        fill(200, 100, 0);
        text('(Energy dissipated by friction)', sliderLeftMargin + 420, y);
    } else {
        fill(0, 150, 0);
        text('(Energy conserved!)', sliderLeftMargin + 420, y);
    }
}

function startSimulation() {
    isRunning = true;
    isPaused = false;
    pauseBtn.html('Pause');
}

function togglePause() {
    if (isRunning) {
        isPaused = !isPaused;
        pauseBtn.html(isPaused ? 'Resume' : 'Pause');
    }
}

function resetSimulation() {
    isRunning = false;
    isPaused = false;
    pauseBtn.html('Pause');
    cart.t = 0;
    cart.v = 0;
    let pos = tracks[currentTrack](0);
    cart.x = pos.x;
    cart.y = pos.y;
    energyHistory = [];
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
