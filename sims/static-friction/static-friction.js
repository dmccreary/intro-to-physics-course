// Interactive Static Friction MicroSim
// Demonstrates static friction responding to applied force

let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let forceSlider;
let muSlider;
let massSlider;
let resetButton;

let boxX = 150;
let boxVelocity = 0;
let isSliding = false;
let appliedForce = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    forceSlider = createSlider(0, 100, 0, 1);
    forceSlider.position(140, drawHeight + 12);
    forceSlider.size(200);

    muSlider = createSlider(0.1, 1.0, 0.5, 0.05);
    muSlider.position(140, drawHeight + 42);
    muSlider.size(200);

    massSlider = createSlider(1, 20, 10, 1);
    massSlider.position(140, drawHeight + 72);
    massSlider.size(200);

    resetButton = createButton('Reset');
    resetButton.position(canvasWidth - 80, drawHeight + 40);
    resetButton.mousePressed(resetSim);

    describe('Interactive static friction demonstration', LABEL);
}

function resetSim() {
    boxX = 150;
    boxVelocity = 0;
    isSliding = false;
    forceSlider.value(0);
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
    noStroke();
    textSize(22);
    textAlign(CENTER, TOP);
    text('Static vs Kinetic Friction', canvasWidth / 2, 10);

    // Get values
    appliedForce = forceSlider.value();
    let mu_s = muSlider.value();
    let mu_k = mu_s * 0.7; // Kinetic is typically ~70% of static
    let mass = massSlider.value();
    let g = 9.8;
    let weight = mass * g;
    let normalForce = weight;
    let maxStaticFriction = mu_s * normalForce;
    let kineticFriction = mu_k * normalForce;

    // Physics
    let netForce = 0;
    let currentFriction = 0;

    if (!isSliding) {
        if (appliedForce > maxStaticFriction) {
            isSliding = true;
        } else {
            currentFriction = appliedForce; // Static friction matches applied
            netForce = 0;
        }
    }

    if (isSliding) {
        currentFriction = kineticFriction;
        netForce = appliedForce - kineticFriction;
        let acceleration = netForce / mass;
        boxVelocity += acceleration * 0.016;
        boxX += boxVelocity * 60;

        // Stop if force removed and velocity reaches zero
        if (appliedForce < kineticFriction && boxVelocity <= 0) {
            isSliding = false;
            boxVelocity = 0;
        }
    }

    // Wrap box position
    if (boxX > canvasWidth - 50) {
        boxX = 150;
        boxVelocity = 0;
    }

    // Draw floor
    fill('#8B4513');
    noStroke();
    rect(50, 280, canvasWidth - 100, 30, 5);

    // Draw surface texture
    stroke('#5D3A1A');
    strokeWeight(1);
    for (let i = 60; i < canvasWidth - 60; i += 20) {
        line(i, 285, i + 10, 295);
    }

    // Draw box
    let boxWidth = 80;
    let boxHeight = 60;
    let boxY = 280 - boxHeight;

    if (isSliding) {
        fill('#E74C3C');
    } else {
        fill('#3498DB');
    }
    stroke('#2c3e80');
    strokeWeight(2);
    rect(boxX - boxWidth/2, boxY, boxWidth, boxHeight, 5);

    // Mass label on box
    fill('white');
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text(mass + ' kg', boxX, boxY + boxHeight/2);

    // Force arrows
    let forceScale = 2;

    // Applied force arrow
    if (appliedForce > 0) {
        drawForceArrow(boxX - boxWidth/2 - 10, boxY + boxHeight/2,
                       boxX - boxWidth/2 - 10 - appliedForce * forceScale, boxY + boxHeight/2,
                       '#9B59B6', 'F = ' + appliedForce + ' N');
    }

    // Friction arrow
    if (currentFriction > 0) {
        drawForceArrow(boxX + boxWidth/2 + 10, boxY + boxHeight/2,
                       boxX + boxWidth/2 + 10 + currentFriction * forceScale, boxY + boxHeight/2,
                       isSliding ? '#F39C12' : '#27AE60',
                       (isSliding ? 'f_k = ' : 'f_s = ') + currentFriction.toFixed(1) + ' N');
    }

    // Info panel
    drawInfoPanel(maxStaticFriction, kineticFriction, currentFriction, netForce);

    // Control labels
    fill('black');
    noStroke();
    textSize(13);
    textAlign(LEFT, CENTER);
    text('Applied Force: ' + appliedForce + ' N', 10, drawHeight + 19);
    text('μs: ' + mu_s.toFixed(2), 10, drawHeight + 49);
    text('Mass: ' + mass + ' kg', 10, drawHeight + 79);

    // Status indicator
    textAlign(LEFT, CENTER);
    textSize(14);
    if (isSliding) {
        fill('#E74C3C');
        text('Status: SLIDING (kinetic friction)', 370, drawHeight + 25);
    } else {
        fill('#27AE60');
        text('Status: STATIONARY (static friction)', 370, drawHeight + 25);
    }

    // Max static friction indicator
    fill('#666');
    textSize(12);
    text('Max static friction: ' + maxStaticFriction.toFixed(1) + ' N', 370, drawHeight + 50);
    text('Kinetic friction: ' + kineticFriction.toFixed(1) + ' N', 370, drawHeight + 70);
}

function drawForceArrow(x1, y1, x2, y2, col, label) {
    let headSize = 10;
    let angle = atan2(y2 - y1, x2 - x1);

    stroke(col);
    strokeWeight(4);
    line(x1, y1, x2, y2);

    fill(col);
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -headSize * 1.5, -headSize/2, -headSize * 1.5, headSize/2);
    pop();

    // Label
    textSize(12);
    textAlign(CENTER, BOTTOM);
    fill(col);
    text(label, (x1 + x2) / 2, min(y1, y2) - 10);
}

function drawInfoPanel(maxStatic, kinetic, current, netF) {
    let px = canvasWidth - 220;
    let py = 50;

    fill(255, 255, 255, 240);
    stroke('#3498DB');
    strokeWeight(2);
    rect(px, py, 200, 150, 10);

    fill('#3498DB');
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text('Friction Analysis', px + 10, py + 10);

    textSize(12);
    fill('#333');
    text('f_s^max = μsN = ' + maxStatic.toFixed(1) + ' N', px + 10, py + 35);
    text('f_k = μkN = ' + kinetic.toFixed(1) + ' N', px + 10, py + 55);

    fill(isSliding ? '#E74C3C' : '#27AE60');
    text('Current: ' + current.toFixed(1) + ' N', px + 10, py + 80);

    fill('#333');
    text('Net force: ' + netF.toFixed(1) + ' N', px + 10, py + 105);

    if (isSliding) {
        fill('#E74C3C');
        text('a = ' + (netF / massSlider.value()).toFixed(2) + ' m/s²', px + 10, py + 125);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.min(container.offsetWidth, 800);
    }
}
