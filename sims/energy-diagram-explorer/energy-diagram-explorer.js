// Energy Diagram Interactive Explorer
// Shows potential energy curves, total energy, and motion

let canvasWidth = 1000;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 160;

// Graph dimensions
let graphX = 60;
let graphY = 60;
let graphWidth, graphHeight;

// Controls
let peTypeSelect, massSlider, paramSlider, energySlider;
let animateCheckbox, forceCheckbox, keCheckbox;

// Simulation state
let totalEnergy = 10;
let particleX = 0;
let particleV = 0;
let mass = 1;
let animating = false;
let showForce = true;
let showKE = false;
let mouseOverCanvas = false;

// PE function types
let peTypes = [
    { name: 'Harmonic (½kx²)', func: (x, k) => 0.5 * k * x * x, param: 5, paramName: 'k' },
    { name: 'Gravitational (mgh)', func: (x, m) => m * 9.8 * (x + 5), param: 1, paramName: 'slope' },
    { name: 'Double Well (ax⁴-bx²)', func: (x, a) => a * (Math.pow(x, 4) - 6 * x * x + 9), param: 0.5, paramName: 'depth' },
    { name: 'Barrier (Gaussian)', func: (x, h) => h * 20 * Math.exp(-x * x / 4), param: 1, paramName: 'height' }
];
let currentPE = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    canvas.mouseOver(() => mouseOverCanvas = true);
    canvas.mouseOut(() => mouseOverCanvas = false);

    let ctrlY = drawHeight + 15;

    // PE type dropdown
    peTypeSelect = createSelect();
    peTypeSelect.position(100, ctrlY);
    for (let pe of peTypes) {
        peTypeSelect.option(pe.name);
    }
    peTypeSelect.changed(() => {
        currentPE = peTypes.findIndex(p => p.name === peTypeSelect.value());
        paramSlider.value(peTypes[currentPE].param);
        resetParticle();
    });

    // Mass slider
    massSlider = createSlider(0.5, 5, 1, 0.1);
    massSlider.position(sliderLeftMargin + 160, ctrlY);
    massSlider.size(100);

    // Parameter slider
    paramSlider = createSlider(0.1, 3, 5, 0.1);
    paramSlider.position(sliderLeftMargin + 310, ctrlY);
    paramSlider.size(100);

    // Checkboxes
    animateCheckbox = createCheckbox('Animate', false);
    animateCheckbox.position(10, ctrlY + 35);
    animateCheckbox.changed(() => {
        animating = animateCheckbox.checked();
        if (animating) resetParticle();
    });

    forceCheckbox = createCheckbox('Show Force', true);
    forceCheckbox.position(100, ctrlY + 35);
    forceCheckbox.changed(() => showForce = forceCheckbox.checked());

    keCheckbox = createCheckbox('Show KE', false);
    keCheckbox.position(200, ctrlY + 35);
    keCheckbox.changed(() => showKE = keCheckbox.checked());

    // Energy slider
    energySlider = createSlider(1, 30, 10, 0.5);
    energySlider.position(sliderLeftMargin + 80, ctrlY + 35);
    energySlider.size(200);
    energySlider.input(() => {
        totalEnergy = energySlider.value();
        resetParticle();
    });

    describe('Energy diagram explorer showing potential energy curves and particle motion', LABEL);
}

function draw() {
    updateCanvasSize();
    graphWidth = canvasWidth * 0.6;
    graphHeight = drawHeight - 140;

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Get values
    mass = massSlider.value();
    totalEnergy = energySlider.value();
    let param = paramSlider.value();

    // Title
    fill('black');
    textSize(18);
    textAlign(CENTER, TOP);
    noStroke();
    text('Energy Diagram Explorer', canvasWidth * 0.35, 15);

    // Update physics if animating
    if (animating && mouseOverCanvas) {
        updateParticle(param);
    }

    // Draw graph
    drawEnergyDiagram(param);
    drawInfoPanel(param);
    drawControlLabels();
}

function updateParticle(param) {
    let dt = 0.05;
    let pe = peTypes[currentPE];

    // Calculate force (F = -dPE/dx)
    let dx = 0.01;
    let peL = pe.func(particleX - dx, param);
    let peR = pe.func(particleX + dx, param);
    let force = -(peR - peL) / (2 * dx);

    // Update velocity and position
    particleV += (force / mass) * dt;
    particleX += particleV * dt;

    // Check boundaries and turning points
    let currentPE = pe.func(particleX, param);
    if (currentPE > totalEnergy) {
        // Hit turning point, reverse
        particleV = -particleV * 0.99;
        // Find turning point
        while (pe.func(particleX, param) > totalEnergy && abs(particleX) < 10) {
            particleX -= 0.1 * Math.sign(particleV);
        }
    }

    // Keep in bounds
    if (particleX < -10) { particleX = -10; particleV = abs(particleV); }
    if (particleX > 10) { particleX = 10; particleV = -abs(particleV); }
}

function resetParticle() {
    let pe = peTypes[currentPE];
    let param = paramSlider.value();

    // Find starting position (left turning point)
    particleX = -5;
    for (let x = -10; x < 0; x += 0.1) {
        if (pe.func(x, param) <= totalEnergy) {
            particleX = x;
            break;
        }
    }
    particleV = 0.5; // Start moving right
}

function drawEnergyDiagram(param) {
    let pe = peTypes[currentPE];

    // Graph background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(graphX, graphY, graphWidth, graphHeight);

    // Find PE range for scaling
    let minPE = Infinity, maxPE = -Infinity;
    for (let x = -10; x <= 10; x += 0.5) {
        let y = pe.func(x, param);
        minPE = min(minPE, y);
        maxPE = max(maxPE, y);
    }
    maxPE = max(maxPE, totalEnergy * 1.2);
    minPE = min(minPE, -2);

    // Grid
    stroke(230);
    strokeWeight(1);
    for (let i = 1; i < 10; i++) {
        let gx = graphX + (i / 10) * graphWidth;
        line(gx, graphY, gx, graphY + graphHeight);
    }
    for (let i = 1; i < 8; i++) {
        let gy = graphY + (i / 8) * graphHeight;
        line(graphX, gy, graphX + graphWidth, gy);
    }

    // Draw forbidden region (shaded gray where PE > totalEnergy)
    fill(220, 220, 220, 150);
    noStroke();
    beginShape();
    vertex(graphX, graphY);
    for (let px = 0; px <= graphWidth; px += 2) {
        let x = map(px, 0, graphWidth, -10, 10);
        let peVal = pe.func(x, param);
        if (peVal > totalEnergy) {
            let py = map(peVal, minPE, maxPE, graphHeight, 0);
            py = constrain(py, 0, graphHeight);
            vertex(graphX + px, graphY + py);
        } else {
            let py = map(totalEnergy, minPE, maxPE, graphHeight, 0);
            vertex(graphX + px, graphY + py);
        }
    }
    vertex(graphX + graphWidth, graphY);
    endShape(CLOSE);

    // Draw allowed region (KE region, green)
    if (showKE) {
        fill(100, 200, 100, 100);
        noStroke();
        beginShape();
        for (let px = 0; px <= graphWidth; px += 2) {
            let x = map(px, 0, graphWidth, -10, 10);
            let peVal = pe.func(x, param);
            if (peVal < totalEnergy) {
                let pyPE = map(peVal, minPE, maxPE, graphHeight, 0);
                vertex(graphX + px, graphY + pyPE);
            }
        }
        for (let px = graphWidth; px >= 0; px -= 2) {
            let x = map(px, 0, graphWidth, -10, 10);
            let peVal = pe.func(x, param);
            if (peVal < totalEnergy) {
                let pyE = map(totalEnergy, minPE, maxPE, graphHeight, 0);
                vertex(graphX + px, graphY + pyE);
            }
        }
        endShape(CLOSE);
    }

    // Draw PE curve
    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = 0; px <= graphWidth; px += 2) {
        let x = map(px, 0, graphWidth, -10, 10);
        let peVal = pe.func(x, param);
        let py = map(peVal, minPE, maxPE, graphHeight, 0);
        py = constrain(py, -20, graphHeight + 20);
        vertex(graphX + px, graphY + py);
    }
    endShape();

    // Draw total energy line
    stroke(200, 50, 50);
    strokeWeight(2);
    let eY = graphY + map(totalEnergy, minPE, maxPE, graphHeight, 0);
    line(graphX, eY, graphX + graphWidth, eY);

    // Find and mark turning points and equilibria
    markSpecialPoints(param, minPE, maxPE);

    // Draw particle
    if (animating) {
        let partPx = map(particleX, -10, 10, 0, graphWidth);
        let partPE = pe.func(particleX, param);
        let partPy = map(partPE, minPE, maxPE, graphHeight, 0);

        // Particle on PE curve
        fill(255, 100, 100);
        stroke(150, 50, 50);
        strokeWeight(2);
        ellipse(graphX + partPx, graphY + partPy, 16, 16);

        // Force arrow
        if (showForce) {
            let dx = 0.01;
            let peL = pe.func(particleX - dx, param);
            let peR = pe.func(particleX + dx, param);
            let force = -(peR - peL) / (2 * dx);
            let arrowLen = constrain(force * 5, -50, 50);

            stroke(0, 180, 0);
            strokeWeight(3);
            fill(0, 180, 0);
            let arrowY = graphY + partPy;
            line(graphX + partPx, arrowY, graphX + partPx + arrowLen, arrowY);
            if (abs(arrowLen) > 5) {
                let dir = arrowLen > 0 ? 1 : -1;
                triangle(graphX + partPx + arrowLen, arrowY,
                         graphX + partPx + arrowLen - 8*dir, arrowY - 4,
                         graphX + partPx + arrowLen - 8*dir, arrowY + 4);
            }
        }
    }

    // Axis labels
    fill('black');
    textSize(14);
    textAlign(CENTER, TOP);
    noStroke();
    text('Position x (m)', graphX + graphWidth/2, graphY + graphHeight + 25);

    push();
    translate(graphX - 40, graphY + graphHeight/2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text('Energy (J)', 0, 0);
    pop();

    // Tick labels
    textSize(10);
    textAlign(CENTER, TOP);
    for (let x = -10; x <= 10; x += 5) {
        let px = graphX + map(x, -10, 10, 0, graphWidth);
        text(x, px, graphY + graphHeight + 5);
    }
}

function markSpecialPoints(param, minPE, maxPE) {
    let pe = peTypes[currentPE];

    // Find turning points (where PE = totalEnergy)
    let turningPoints = [];
    let equilibria = [];

    for (let x = -9.9; x < 10; x += 0.1) {
        let y1 = pe.func(x, param);
        let y2 = pe.func(x + 0.1, param);

        // Turning point
        if ((y1 - totalEnergy) * (y2 - totalEnergy) < 0) {
            turningPoints.push(x + 0.05);
        }

        // Equilibrium (local min/max of PE)
        let y0 = pe.func(x - 0.1, param);
        if ((y1 - y0) * (y2 - y1) < 0) {
            equilibria.push({ x: x, stable: y2 - y1 > 0 });
        }
    }

    // Draw turning points
    for (let tp of turningPoints) {
        let px = graphX + map(tp, -10, 10, 0, graphWidth);
        let py = graphY + map(totalEnergy, minPE, maxPE, graphHeight, 0);
        stroke(200, 50, 50);
        strokeWeight(1);
        drawingContext.setLineDash([4, 4]);
        line(px, graphY, px, graphY + graphHeight);
        drawingContext.setLineDash([]);

        fill(200, 50, 50);
        noStroke();
        ellipse(px, py, 10, 10);
    }

    // Draw equilibrium markers
    for (let eq of equilibria) {
        let px = graphX + map(eq.x, -10, 10, 0, graphWidth);
        let peVal = pe.func(eq.x, param);
        let py = graphY + map(peVal, minPE, maxPE, graphHeight, 0);

        noStroke();
        if (eq.stable) {
            fill(0, 180, 0);
            triangle(px, py + 8, px - 6, py + 16, px + 6, py + 16);
        } else {
            fill(200, 100, 0);
            triangle(px, py - 8, px - 6, py - 16, px + 6, py - 16);
        }
    }
}

function drawInfoPanel(param) {
    let pe = peTypes[currentPE];
    let panelX = graphX + graphWidth + 30;
    let panelY = graphY;
    let panelW = canvasWidth - panelX - margin;

    // Background
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, graphHeight, 10);

    fill('black');
    textSize(12);
    textAlign(LEFT, TOP);
    noStroke();
    let y = panelY + 15;

    text('PE Function:', panelX + 10, y);
    y += 20;
    textSize(11);
    fill(0, 100, 200);
    text(pe.name, panelX + 10, y);

    y += 30;
    fill('black');
    textSize(12);
    text('Total Energy:', panelX + 10, y);
    y += 18;
    fill(200, 50, 50);
    textSize(14);
    text('E = ' + totalEnergy.toFixed(1) + ' J', panelX + 10, y);

    y += 30;
    fill('black');
    textSize(12);
    text('Mass: ' + mass.toFixed(1) + ' kg', panelX + 10, y);

    y += 25;
    text('Parameter ' + pe.paramName + ':', panelX + 10, y);
    y += 18;
    text(param.toFixed(2), panelX + 10, y);

    if (animating) {
        y += 30;
        fill('black');
        textSize(11);
        text('Position: ' + particleX.toFixed(2) + ' m', panelX + 10, y);
        y += 18;
        text('Velocity: ' + particleV.toFixed(2) + ' m/s', panelX + 10, y);

        let currentPEval = pe.func(particleX, param);
        let ke = totalEnergy - currentPEval;
        y += 18;
        text('PE: ' + currentPEval.toFixed(1) + ' J', panelX + 10, y);
        y += 18;
        text('KE: ' + max(0, ke).toFixed(1) + ' J', panelX + 10, y);
    }

    // Legend
    y = panelY + graphHeight - 100;
    textSize(10);
    fill(0, 100, 200);
    rect(panelX + 10, y, 15, 3);
    fill('black');
    text('PE curve', panelX + 30, y - 3);

    y += 15;
    fill(200, 50, 50);
    rect(panelX + 10, y, 15, 3);
    fill('black');
    text('Total energy', panelX + 30, y - 3);

    y += 15;
    fill(220, 220, 220);
    rect(panelX + 10, y, 15, 10);
    fill('black');
    text('Forbidden region', panelX + 30, y + 2);

    y += 15;
    fill(0, 180, 0);
    triangle(panelX + 17, y + 2, panelX + 12, y + 10, panelX + 22, y + 10);
    fill('black');
    text('Stable equilibrium', panelX + 30, y + 2);

    y += 15;
    fill(200, 100, 0);
    triangle(panelX + 17, y + 8, panelX + 12, y, panelX + 22, y);
    fill('black');
    text('Unstable equilibrium', panelX + 30, y + 2);
}

function drawControlLabels() {
    textSize(11);
    textAlign(LEFT, CENTER);
    fill('black');
    noStroke();

    let y = drawHeight + 25;
    text('PE Type:', 10, y);
    text('Mass: ' + mass.toFixed(1) + ' kg', sliderLeftMargin + 110, y);
    text('Param: ' + paramSlider.value().toFixed(2), sliderLeftMargin + 265, y);

    text('Total Energy: ' + totalEnergy.toFixed(1) + ' J', 300, drawHeight + 50);
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
