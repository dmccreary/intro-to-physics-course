// Angular Momentum Vector Visualization
// Interactive 3D perspective view showing L and ω vectors with right-hand rule

let canvasWidth = 800;
let drawHeight = 410;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;

// Disk parameters
let diskAngle = 0;
let rotationSpeed = 0.03;       // ω value (adjustable)
let isClockwise = true;
let diskRadius = 80;            // Affects moment of inertia

// Calculated values
let momentOfInertia = 1;        // I = 0.5 * m * r² (simplified)
let angularMomentum = 1;        // L = I * ω

// 3D view parameters
let viewAngle = 0;              // Horizontal rotation of view
let viewTilt = 0;               // Vertical tilt (set in setup)

// UI Controls - p5.js built-in sliders and buttons
let omegaSlider, radiusSlider;
let directionBtn, stepBtn, resetBtn;

// Mode states
let stepMode = false;
let currentStep = 0;
let maxSteps = 4;
let stepDescriptions = [
    "Step 1: Observe the rotation direction",
    "Step 2: Apply right-hand rule - curl fingers with rotation",
    "Step 3: Your thumb points in direction of ω",
    "Step 4: L = Iω points in same direction as ω"
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Initialize values that need p5.js constants
    viewTilt = PI / 6;

    // Create p5.js sliders and buttons
    createSliders();
    createButtons();
    positionControls();

    describe('Interactive angular momentum vector visualization where students can adjust rotation speed, disk size, direction, and test their understanding of the right-hand rule', LABEL);
}

function createSliders() {
    // Angular velocity (ω) slider: 0.5 to 8.0 rad/s
    omegaSlider = createSlider(0.5, 8.0, 3.0, 0.1);

    // Disk radius slider: 40 to 120
    radiusSlider = createSlider(40, 120, 80, 1);
}

function createButtons() {
    // Direction toggle button
    directionBtn = createButton('CW → CCW');
    directionBtn.mousePressed(toggleDirection);

    // Step through button
    stepBtn = createButton('Step Through');
    stepBtn.mousePressed(toggleStep);

    // Reset button
    resetBtn = createButton('Reset');
    resetBtn.mousePressed(resetSimulation);
}

function positionControls() {
    let sliderWidth = canvasWidth * 0.35;
    let sliderY = drawHeight + 33;
    let btnY = drawHeight + 70;
    let sliderCenter = sliderWidth / 2;

    // Position sliders - evenly distributed
    omegaSlider.position(canvasWidth * 0.08, sliderY);
    omegaSlider.size(sliderWidth);

    radiusSlider.position(canvasWidth * 0.55, sliderY);
    radiusSlider.size(sliderWidth);

    // Position buttons centered under sliders
    directionBtn.position(canvasWidth * 0.08 + sliderCenter - 50, btnY);
    directionBtn.size(100, 30);

    stepBtn.position(canvasWidth * 0.55 + sliderCenter - 50, btnY);
    stepBtn.size(100, 30);

    resetBtn.position(canvasWidth * 0.85, btnY);
    resetBtn.size(80, 30);
}

function toggleDirection() {
    isClockwise = !isClockwise;
    directionBtn.html(isClockwise ? 'CW → CCW' : 'CCW → CW');
}

function toggleStep() {
    if (!stepMode) {
        stepMode = true;
        currentStep = 0;
        stepBtn.html('Next Step');
    } else {
        currentStep++;
        if (currentStep > maxSteps + 1) {
            stepMode = false;
            currentStep = 0;
            stepBtn.html('Step Through');
        }
    }
}

function resetSimulation() {
    omegaSlider.value(3.0);
    radiusSlider.value(80);

    isClockwise = true;
    directionBtn.html('CW → CCW');

    stepMode = false;
    currentStep = 0;
    stepBtn.html('Step Through');

    viewAngle = 0;
    diskAngle = 0;
}

function draw() {
    updateCanvasSize();

    // Read values from sliders
    rotationSpeed = omegaSlider.value() / 100;  // Convert to internal scale
    diskRadius = radiusSlider.value();

    updatePhysics();

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill(245);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    textSize(20);
    textAlign(CENTER, TOP);
    noStroke();
    text('Angular Momentum Vector - Interactive Explorer', canvasWidth / 2, 10);

    // Update rotation (unless in step mode and not at final step)
    if (!stepMode || currentStep >= maxSteps) {
        let direction = isClockwise ? 1 : -1;
        diskAngle += direction * rotationSpeed;
    }

    // Main interactive disk
    push();
    translate(canvasWidth / 2, 160);
    drawInteractiveDisk();
    pop();

    // Right-hand rule panel
    drawRightHandRule(90, 240);

    // Info/Formula panel
    drawInfoPanel(canvasWidth - 220, 260);

    // Numerical readouts
    drawReadouts(canvasWidth / 2, 360);

    // Draw control labels and buttons
    drawControls();

    // Mode-specific overlays
    if (stepMode) {
        drawStepOverlay();
    }
}

function updatePhysics() {
    // I = 0.5 * m * r² (assuming mass = 1 for simplicity, radius in arbitrary units)
    momentOfInertia = 0.5 * pow(diskRadius / 40, 2);  // Normalized
    // L = I * ω
    angularMomentum = momentOfInertia * (rotationSpeed * 100);  // Scale for display
}

function drawInteractiveDisk() {
    let direction = isClockwise ? -1 : 1;
    let currentAngle = diskAngle;

    // Apply view rotation for 3D effect
    let skewFactor = cos(viewAngle) * 0.3 + 0.15;
    let xScale = cos(viewAngle) * 0.3 + 0.85;

    push();
    scale(xScale, 1);

    // Draw coordinate axes
    // stroke(180);
    // strokeWeight(1);
    // line(-120, 60, 120, 60);   // X-axis
    // line(0, 60, 0, -180);      // Z-axis (up)

    // Axis labels
    fill(120);
    textSize(14);
    textAlign(CENTER, CENTER);
    noStroke();
    text('x', 130, 60);
    text('z', 0, -190);

    // Draw disk shadow
    fill(200, 200, 200, 100);
    noStroke();
    ellipse(5, 65, diskRadius * 2, diskRadius * skewFactor * 2);

    // Draw disk (3D perspective ellipse) - bottom
    fill(180, 190, 210, 200);
    stroke(100, 110, 130);
    strokeWeight(2);
    ellipse(0, 40, diskRadius * 2, diskRadius * skewFactor * 2);

    // Disk top surface
    fill(210, 220, 240, 230);
    stroke(100, 110, 130);
    ellipse(0, 30, diskRadius * 2, diskRadius * skewFactor * 2);

    // Draw rotation markers on disk
    if (!stepMode || currentStep >= 1) {
        stroke(120, 130, 150);
        strokeWeight(1);
        for (let i = 0; i < 8; i++) {
            let angle = currentAngle + i * PI / 4;
            let x = (diskRadius - 15) * cos(angle);
            let y = 30 + (diskRadius - 15) * sin(angle) * skewFactor;
            fill(150, 160, 180);
            ellipse(x, y, 10, 6);
        }
    }

    // Rotation label
    if (!stepMode || currentStep >= 1) {
        fill(50, 100, 200);
        textSize(14);
        textAlign(CENTER, TOP);
        noStroke();
        text(isClockwise ? 'Clockwise (CW)' : 'Counter-clockwise (CCW)', 0, 30 + diskRadius + 25);
    }

    // Draw vectors (unless in early step mode)
    let showVectors = true;
    if (stepMode && currentStep < 3) showVectors = false;

    if (showVectors) {
        let omegaDirection = isClockwise ? -1 : 1;  // Down for CW, up for CCW

        // Scale vector lengths based on values
        let omegaLength = 60 + rotationSpeed * 800;
        let LLength = 60 + angularMomentum * 3;

        // Offset vectors horizontally for visibility
        let omegaOffset = -12;
        let LOffset = 12;

        // Draw omega (ω) vector - show at step 3+
        if (!stepMode || currentStep >= 3) {
            stroke(150, 50, 150);
            strokeWeight(4);
            line(omegaOffset, 30, omegaOffset, 30 - omegaDirection * omegaLength);

            // Omega arrowhead
            fill(150, 50, 150);
            noStroke();
            push();
            translate(omegaOffset, 30 - omegaDirection * omegaLength);
            rotate(omegaDirection > 0 ? -PI/2 : PI/2);
            triangle(0, 0, -10, -5, -10, 5);
            pop();

            // Omega label
            fill(150, 50, 150);
            textSize(18);
            textAlign(RIGHT, CENTER);
            noStroke();
            text('ω', omegaOffset - 8, 30 - omegaDirection * omegaLength / 2);
        }

        // Draw angular momentum (L) vector - show at step 4
        if (!stepMode || currentStep >= 4) {
            stroke(50, 150, 50);
            strokeWeight(5);
            line(LOffset, 30, LOffset, 30 - omegaDirection * LLength);

            // L arrowhead
            fill(50, 150, 50);
            noStroke();
            push();
            translate(LOffset, 30 - omegaDirection * LLength);
            rotate(omegaDirection > 0 ? -PI/2 : PI/2);
            triangle(0, 0, -12, -6, -12, 6);
            pop();

            // L label
            fill(50, 150, 50);
            textSize(20);
            textStyle(BOLD);
            textAlign(LEFT, CENTER);
            noStroke();
            text('L', LOffset + 10, 30 - omegaDirection * LLength / 2);
            textStyle(NORMAL);
        }

        // Direction indicator
        if (!stepMode || currentStep >= 4) {
            fill(60);
            textSize(13);
            textAlign(CENTER, TOP);
            noStroke();
            let dirText = isClockwise ? 'L points DOWN (-z)' : 'L points UP (+z)';
            text(dirText, 0, 30 - omegaDirection * max(omegaLength, LLength) - 30);
        }
    }

    pop();
}

function drawRightHandRule(x, y) {
    push();
    translate(x, y);

    // Background - taller panel for better spacing
    fill('white');
    stroke(200);
    strokeWeight(1);
    rect(-70, -110, 150, 185, 10);

    // Title
    fill(40);
    textSize(14);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    noStroke();
    text('Right-Hand Rule', 5, -100);
    textStyle(NORMAL);

    // Hand illustration - shifted down for spacing
    push();
    translate(-20, -30);
    fill(255, 220, 200);
    stroke(200, 180, 160);
    strokeWeight(2);
    ellipse(0, 15, 55, 65);

    // Thumb pointing up (or down based on direction)
    let thumbDir = isClockwise ? 1 : -1;
    fill(255, 220, 200);
    stroke(200, 180, 160);

    if (thumbDir < 0) {
        // Thumb up
        beginShape();
        vertex(-15, -10);
        vertex(-20, -45);
        vertex(-10, -50);
        vertex(-5, -15);
        endShape(CLOSE);
    } else {
        // Thumb down
        beginShape();
        vertex(-15, 40);
        vertex(-20, 75);
        vertex(-10, 80);
        vertex(-5, 45);
        endShape(CLOSE);
    }

    // Curved fingers indicator
    noFill();
    stroke(100, 150, 200);
    strokeWeight(3);
    if (isClockwise) {
        arc(0, 15, 75, 75, -3*PI/4, -PI/4);
    } else {
        arc(0, 15, 75, 75, PI/4, 3*PI/4);
    }

    // Arrow on fingers
    let fingerAngle = isClockwise ? -PI/4 : 3*PI/4;
    push();
    translate(38 * cos(fingerAngle), 15 + 38 * sin(fingerAngle));
    rotate(isClockwise ? fingerAngle + PI/2 : fingerAngle - PI/2);
    fill(100, 150, 200);
    noStroke();
    triangle(0, 0, -8, -4, -8, 4);
    pop();

    // Labels
    fill(150, 50, 150);
    textSize(11);
    textAlign(CENTER, CENTER);
    noStroke();
    if (isClockwise) {
        text('Thumb = L, ω', 5, 68);
        text('(pointing DOWN)', 5, 82);
    } else {
        text('Thumb = L, ω', 5, -40);
        text('(pointing UP)', 5, -26);
    }

    fill(100, 150, 200);
    textSize(10);
    noStroke();
    text('Fingers follow', 60, 15);
    text('rotation', 60, 27);
    pop()
    pop();
}

function drawInfoPanel(x, y) {
    push();
    translate(x, y);

    let panelW = 200;
    let panelH = 120;

    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(0, -70, panelW, panelH, 8);

    fill(40);
    textSize(16);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    noStroke();
    text('Key Relationships', panelW/2, -60);
    textStyle(NORMAL);

    textSize(18);
    fill(60);
    noStroke();
    text('L = Iω', panelW/2, -35);

    textSize(12);
    fill(80);
    textAlign(LEFT, TOP);
    noStroke();
    text('L = angular momentum', 10, -10);
    text('I = moment of inertia', 10, 5);
    text('ω = angular velocity', 10, 20);

    pop();
}

function drawReadouts(x, y) {
    push();
    translate(x, y);

    // Background
    fill(255, 255, 255, 230);
    stroke(180);
    strokeWeight(1);
    rect(-200, -25, 400, 55, 8);

    textAlign(CENTER, CENTER);
    noStroke();

    // ω readout
    fill(150, 50, 150);
    textSize(14);
    noStroke();
    text('ω = ' + omegaSlider.value().toFixed(1) + ' rad/s', -120, -5);

    // I readout
    fill(100, 100, 150);
    noStroke();
    text('I = ' + momentOfInertia.toFixed(2) + ' kg·m²', 0, -5);

    // L readout
    fill(50, 150, 50);
    noStroke();
    text('L = ' + angularMomentum.toFixed(2) + ' kg·m²/s', 120, -5);

    // Direction
    fill(60);
    textSize(12);
    noStroke();
    let dirSymbol = isClockwise ? '⊗ (into page)' : '⊙ (out of page)';
    text('Direction: ' + dirSymbol, 0, 18);

    pop();
}

function drawControls() {
    let controlY = drawHeight + 15;
    let sliderWidth = canvasWidth * 0.35;
    let sliderCenter = sliderWidth / 2;

    // Slider labels - centered over sliders
    fill(60);
    textSize(12);
    textAlign(CENTER, TOP);
    noStroke();

    // ω Slider label
    text('Angular Velocity (ω)', canvasWidth * 0.08 + sliderCenter, controlY);

    // Radius Slider label
    text('Disk Radius (affects I)', canvasWidth * 0.55 + sliderCenter, controlY);
}

function drawStepOverlay() {
    // Step indicator
    push();

    // Progress bar
    let barX = canvasWidth / 2 - 150;
    let barY = 50;
    let barW = 300;
    let barH = 8;

    fill(220);
    noStroke();
    rect(barX, barY, barW, barH, 4);

    fill(100, 150, 200);
    let progress = currentStep / maxSteps;
    rect(barX, barY, barW * progress, barH, 4);

    // Step dots
    for (let i = 1; i <= maxSteps; i++) {
        let dotX = barX + (barW * i / maxSteps);
        fill(i <= currentStep ? '#4CAF50' : '#ddd');
        stroke(i <= currentStep ? '#388E3C' : '#bbb');
        strokeWeight(2);
        ellipse(dotX, barY + 4, 16, 16);

        fill(i <= currentStep ? 255 : 150);
        textSize(10);
        textAlign(CENTER, CENTER);
        noStroke();
        text(i, dotX, barY + 4);
    }

    // Step description
    fill(60);
    textSize(14);
    textAlign(CENTER, TOP);
    noStroke();
    let desc = currentStep === 0 ? "Click 'Next Step' to begin" :
               currentStep > maxSteps ? "Complete! Vectors revealed." :
               stepDescriptions[currentStep - 1];
    text(desc, canvasWidth / 2, barY + 20);

    pop();
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    positionControls();
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
    }
}
