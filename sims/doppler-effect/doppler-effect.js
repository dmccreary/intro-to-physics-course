// Doppler Effect Interactive Simulation MicroSim
// Demonstrates how source motion affects observed frequency

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 350;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 130;

// Physics constants
let speedOfSound = 340; // m/s (scaled for display)

// Wave parameters
let sourceSpeed = 30; // m/s
let sourceFrequency = 500; // Hz

// Simulation state
let sourceX;
let wavefronts = [];
let isRunning = true;
let direction = 1; // 1 = right, -1 = left

// Observer positions
let observer1, observer2;

// UI Elements
let speedSlider, freqSlider;
let startButton, resetButton;
let directionButtons = [];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    resetSimulation();

    // Create sliders
    speedSlider = createSlider(0, 0.8, 0.1, 0.02);
    freqSlider = createSlider(200, 1000, 500, 50);

    // Buttons
    startButton = createButton('Stop');
    startButton.mousePressed(toggleAnimation);

    resetButton = createButton('Reset');
    resetButton.mousePressed(resetSimulation);

    // Direction buttons
    let leftBtn = createButton('← Left');
    leftBtn.mousePressed(() => {
        direction = -1;
        resetSimulation();
    });
    directionButtons.push(leftBtn);

    let rightBtn = createButton('Right →');
    rightBtn.mousePressed(() => {
        direction = 1;
        resetSimulation();
    });
    directionButtons.push(rightBtn);

    // Position all controls
    updateControlPositions();

    describe('Doppler effect simulation showing wavefront compression and expansion as source moves', LABEL);
}

function resetSimulation() {
    sourceX = direction > 0 ? margin + 50 : canvasWidth - margin - 50;
    wavefronts = [];
    isRunning = true;
    if (startButton) startButton.html('Stop');

    // Observer positions
    observer1 = { x: canvasWidth - margin - 30, y: drawHeight / 2 };
    observer2 = { x: margin + 30, y: drawHeight / 2 };
}

function toggleAnimation() {
    isRunning = !isRunning;
    startButton.html(isRunning ? 'Stop' : 'Start');
}

function draw() {
    updateCanvasSize();

    // Get slider values
    let speedRatio = speedSlider.value(); // as fraction of speed of sound
    sourceSpeed = speedRatio * speedOfSound;
    sourceFrequency = freqSlider.value();

    // Drawing area
    fill('aliceblue');
    // silver border
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    // silver outline of control area
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Draw title
    fill('black');
    noStroke();
    textSize(20);
    textAlign(CENTER, TOP);
    text('Doppler Effect Simulation', canvasWidth / 2, 10);

    // Update simulation
    if (isRunning) {
        updateSimulation();
    }

    // Draw elements
    push();
    translate(0, 40); // Offset drawing area down for title
        drawWavefronts();
        drawObservers();
        drawSource();
    pop();
    drawFrequencyMeters();
    drawSliderLabels();
    drawInfo();

}

function updateSimulation() {
    // Move source
    sourceX += direction * sourceSpeed * 0.03;

    // Emit new wavefront periodically
    let emitInterval = 60 / sourceFrequency * 10; // Scaled for visibility
    if (frameCount % max(1, floor(emitInterval)) === 0) {
        wavefronts.push({
            x: sourceX,
            y: drawHeight / 2,
            radius: 0,
            birthTime: frameCount
        });
    }

    // Expand wavefronts
    for (let i = wavefronts.length - 1; i >= 0; i--) {
        wavefronts[i].radius += speedOfSound * 0.03;

        // Remove old wavefronts
        if (wavefronts[i].radius > canvasWidth) {
            wavefronts.splice(i, 1);
        }
    }

    // Reset if source goes off screen
    if (sourceX > canvasWidth - margin || sourceX < margin) {
        resetSimulation();
    }
}

function drawWavefronts() {
    // Clip to drawing area so wavefronts don't extend into control region
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(0, 0, canvasWidth, drawHeight-40);
    drawingContext.clip();

    noFill();
    strokeWeight(1.5);

    for (let wf of wavefronts) {
        // Color based on age
        let age = (frameCount - wf.birthTime) / 60;
        let alpha = map(age, 0, 3, 255, 50);
        stroke(33, 150, 243, alpha);

        circle(wf.x, wf.y, wf.radius * 2);
    }

    drawingContext.restore();
}

function drawSource() {
    // Source (ambulance/car)
    fill('#E53935');
    stroke('#B71C1C');
    strokeWeight(2);

    push();
        translate(sourceX, drawHeight / 2);

        // Draw simple car shape
        rectMode(CENTER);
        fill('#E53935');
        rect(0, 0, 50, 25, 5);

        // Wheels
        fill('#333');
        noStroke();
        circle(-15, 15, 12);
        circle(15, 15, 12);

        // Direction arrow
        fill('white');
        if (direction > 0) {
            triangle(20, 0, 10, -8, 10, 8);
        } else {
            triangle(-20, 0, -10, -8, -10, 8);
        }

    pop();

    // Velocity arrow
    stroke('#E53935');
    strokeWeight(3);
    let arrowLen = map(sourceSpeed, 0, speedOfSound * 0.8, 0, 80);
    let arrowX = sourceX + direction * 40;
    let arrowEndX = arrowX + direction * arrowLen;
    line(arrowX, drawHeight / 2, arrowEndX, drawHeight / 2);

    // Arrowhead
    fill('#E53935');
    noStroke();
    push();
    translate(arrowEndX, drawHeight / 2);
    rotate(direction > 0 ? 0 : PI);
    triangle(0, 0, -10, -5, -10, 5);
    pop();
}

function drawObservers() {
    // Observer ahead (green)
    let aheadObs = direction > 0 ? observer1 : observer2;
    let behindObs = direction > 0 ? observer2 : observer1;

    // Draw observers
    fill('#4CAF50');
    stroke('#2E7D32');
    strokeWeight(2);
    circle(aheadObs.x, aheadObs.y, 30);

    fill('white');
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text('A', aheadObs.x, aheadObs.y);

    // Observer behind (blue)
    fill('#2196F3');
    stroke('#1565C0');
    strokeWeight(2);
    circle(behindObs.x, behindObs.y, 30);

    fill('white');
    noStroke();
    text('B', behindObs.x, behindObs.y);

    // Labels
    fill('#4CAF50');
    textSize(12);
    text('Ahead', aheadObs.x, aheadObs.y + 30);

    fill('#2196F3');
    text('Behind', behindObs.x, behindObs.y + 30);
}

function drawFrequencyMeters() {
    let speedRatio = sourceSpeed / speedOfSound;

    // Calculate observed frequencies
    let freqAhead = sourceFrequency / (1 - speedRatio);
    let freqBehind = sourceFrequency / (1 + speedRatio);

    // Meter panel
    let panelX = 20;
    let panelY = 30;
    let panelWidth = 180;
    let panelHeight = 130;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 10);

    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);

    let x = panelX + 10;
    let y = panelY + 10;
    let lineH = 20;

    text('Source: ' + sourceFrequency + ' Hz', x, y);
    y += lineH * 1.5;

    fill('#4CAF50');
    text('Ahead (A):', x, y);
    y += lineH;
    textSize(16);
    text(freqAhead.toFixed(0) + ' Hz', x + 10, y);

    y += lineH * 1.2;
    textSize(14);
    fill('#2196F3');
    text('Behind (B):', x, y);
    y += lineH;
    textSize(16);
    text(freqBehind.toFixed(0) + ' Hz', x + 10, y);

    // Right panel with equations
    let rightX = canvasWidth - 200;
    fill(255, 255, 255, 230);
    stroke(200);
    rect(rightX, panelY, 180, panelHeight+20, 10);

    fill('black');
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);

    x = rightX + 10;
    y = panelY + 10;

    text('Speed of sound: 340 m/s', x, y);
    y += lineH;
    text('Source speed: ' + sourceSpeed.toFixed(0) + ' m/s', x, y);
    y += lineH;
    text('Mach: ' + speedRatio.toFixed(2), x, y);
    y += lineH * 1.5;

    textSize(11);
    text("f' = f × v/(v ± vs)", x, y);
    y += lineH;
    text('- approaching: higher f', x, y);
    y += lineH;
    text('+ receding: lower f', x, y);
}

function updateControlPositions() {
    // Calculate responsive slider width
    let availableWidth = canvasWidth - 2 * margin - 40; // Gap between sliders
    let sliderWidth = min(180, availableWidth / 2);

    // Row positions
    let sliderY = drawHeight + 30;
    let buttonY = drawHeight + 65;

    // Speed slider (left half)
    speedSlider.position(margin, sliderY);
    speedSlider.size(canvasWidth*.45);

    // Frequency slider (right half)
    let rightColX = canvasWidth / 2 + 10;
    freqSlider.position(rightColX, sliderY);
    freqSlider.size(canvasWidth*.45);

    // Buttons below sliders
    startButton.position(margin, buttonY);
    resetButton.position(margin + 55, buttonY);
    directionButtons[0].position(margin + 120, buttonY); // Left
    directionButtons[1].position(margin + 190, buttonY); // Right
}

function drawSliderLabels() {
    fill('black');
    noStroke();
    textSize(13);
    textAlign(LEFT, CENTER);

    let labelY = drawHeight + 15;
    let speedRatio = speedSlider.value();

    // Labels above sliders
    text('Speed: ' + (speedRatio * 100).toFixed(0) + '% of sound', margin, labelY);
    text('Source freq: ' + sourceFrequency + ' Hz', canvasWidth / 2 + 10, labelY);
}

function drawInfo() {
    fill('#666');
    textSize(11);
    textAlign(LEFT, CENTER);

    let infoY = drawHeight + 100;
    text('Wavefronts compress ahead (higher frequency) and spread behind (lower frequency).', margin, infoY);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 900);
        if (observer1) {
            observer1.x = canvasWidth - margin - 30;
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    updateControlPositions();
}
