// Charging by Induction MicroSim
// Step-by-step demonstration of electrostatic induction

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 450;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;

// State machine
let currentStep = 0;
const STEPS = [
    { name: "Initial", desc: "Two neutral metal spheres touching, with a charged rod nearby" },
    { name: "Approach", desc: "Negative rod approaches - electrons in spheres repel to far side" },
    { name: "Polarized", desc: "Charges redistribute - near sphere positive, far sphere negative" },
    { name: "Separate", desc: "Spheres are separated while rod is still near" },
    { name: "Remove", desc: "Rod is removed - spheres retain opposite charges" },
    { name: "Final", desc: "Two oppositely charged spheres created by induction!" }
];

// Animation state
let rodX = 100;
let sphereSeparation = 0;
let animating = false;
let animationProgress = 0;

// UI Elements
let nextButton, prevButton, resetButton, autoButton;
let autoPlay = false;

// Charge particles
let particles = [];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Create buttons
    let buttonY = drawHeight + 10;

    prevButton = createButton('← Previous');
    prevButton.position(margin, buttonY);
    prevButton.mousePressed(() => goToStep(currentStep - 1));

    nextButton = createButton('Next →');
    nextButton.position(margin + 100, buttonY);
    nextButton.mousePressed(() => goToStep(currentStep + 1));

    resetButton = createButton('Reset');
    resetButton.position(margin + 200, buttonY);
    resetButton.mousePressed(resetSimulation);

    autoButton = createButton('▶ Auto Play');
    autoButton.position(margin + 280, buttonY);
    autoButton.mousePressed(toggleAutoPlay);

    initializeParticles();

    describe('Charging by induction demonstration showing step-by-step charge separation', LABEL);
}

function initializeParticles() {
    particles = [];

    // Create electron particles for both spheres
    // Each sphere starts with 12 electrons (neutral)
    for (let i = 0; i < 12; i++) {
        // Left sphere electrons
        let angle = (TWO_PI * i) / 12;
        particles.push({
            sphere: 'left',
            baseAngle: angle,
            angle: angle,
            r: 35,
            charge: -1
        });

        // Right sphere electrons
        particles.push({
            sphere: 'right',
            baseAngle: angle,
            angle: angle,
            r: 35,
            charge: -1
        });
    }
}

function resetSimulation() {
    currentStep = 0;
    rodX = 100;
    sphereSeparation = 0;
    animating = false;
    animationProgress = 0;
    autoPlay = false;
    autoButton.html('▶ Auto Play');
    initializeParticles();
}

function toggleAutoPlay() {
    autoPlay = !autoPlay;
    autoButton.html(autoPlay ? '⏸ Pause' : '▶ Auto Play');
}

function goToStep(step) {
    if (step >= 0 && step < STEPS.length && !animating) {
        currentStep = step;
        animating = true;
        animationProgress = 0;
    }
}

function draw() {
    updateCanvasSize();

    // Auto-advance
    if (autoPlay && !animating && frameCount % 180 === 0) {
        if (currentStep < STEPS.length - 1) {
            goToStep(currentStep + 1);
        } else {
            autoPlay = false;
            autoButton.html('▶ Auto Play');
        }
    }

    // Update animation
    if (animating) {
        animationProgress += 0.02;
        if (animationProgress >= 1) {
            animationProgress = 1;
            animating = false;
        }
        updatePositions();
    }

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Draw title
    fill('black');
    noStroke();
    textSize(22);
    textAlign(CENTER, TOP);
    text("Charging by Induction", canvasWidth / 2, 12);

    // Draw step indicator
    drawStepIndicator();

    // Draw the scene
    drawScene();

    // Draw description
    drawDescription();

    // Update button states
    if (currentStep === 0 || animating) {
        prevButton.attribute('disabled', '');
    } else {
        prevButton.removeAttribute('disabled');
    }

    if (currentStep === STEPS.length - 1 || animating) {
        nextButton.attribute('disabled', '');
    } else {
        nextButton.removeAttribute('disabled');
    }
}

function updatePositions() {
    // Calculate target positions based on current step
    let targetRodX, targetSeparation;

    switch (currentStep) {
        case 0: // Initial
            targetRodX = 100;
            targetSeparation = 0;
            redistributeCharges('neutral');
            break;
        case 1: // Approach
            targetRodX = 280;
            targetSeparation = 0;
            redistributeCharges('approaching');
            break;
        case 2: // Polarized
            targetRodX = 280;
            targetSeparation = 0;
            redistributeCharges('polarized');
            break;
        case 3: // Separate
            targetRodX = 280;
            targetSeparation = 80;
            redistributeCharges('separated');
            break;
        case 4: // Remove
            targetRodX = 100;
            targetSeparation = 80;
            redistributeCharges('removed');
            break;
        case 5: // Final
            targetRodX = 100;
            targetSeparation = 150;
            redistributeCharges('final');
            break;
    }

    // Smooth animation
    rodX = lerp(rodX, targetRodX, 0.1);
    sphereSeparation = lerp(sphereSeparation, targetSeparation, 0.1);
}

function redistributeCharges(state) {
    for (let p of particles) {
        let targetAngle = p.baseAngle;

        switch (state) {
            case 'neutral':
                // Evenly distributed
                targetAngle = p.baseAngle;
                break;

            case 'approaching':
            case 'polarized':
                // Electrons pushed to right side of both spheres
                if (p.sphere === 'left') {
                    // Electrons in left sphere move to right half
                    targetAngle = p.baseAngle;
                    if (cos(p.baseAngle) < 0) {
                        targetAngle = PI - p.baseAngle; // Flip to right side
                    }
                } else {
                    // Electrons in right sphere stay on right half
                    targetAngle = p.baseAngle;
                }
                break;

            case 'separated':
                // Left sphere loses electrons to right
                if (p.sphere === 'left') {
                    targetAngle = p.baseAngle;
                } else {
                    // Right sphere has more electrons, packed on right
                    targetAngle = p.baseAngle;
                }
                break;

            case 'removed':
            case 'final':
                // Electrons redistribute within each separated sphere
                targetAngle = p.baseAngle;
                break;
        }

        p.angle = lerp(p.angle, targetAngle, 0.1);
    }
}

function drawScene() {
    let centerY = 220;
    let leftSphereX = canvasWidth / 2 - 60 - sphereSeparation / 2;
    let rightSphereX = canvasWidth / 2 + 60 + sphereSeparation / 2;

    // Draw insulating stands
    fill('#8D6E63');
    noStroke();
    rect(leftSphereX - 10, centerY + 50, 20, 80);
    rect(rightSphereX - 10, centerY + 50, 20, 80);

    // Draw charged rod
    if (currentStep < 5) {
        drawChargedRod(rodX, centerY);
    }

    // Draw ground wire if needed (step 3-4 simulation)
    // Not included in this simplified version

    // Draw spheres
    drawMetalSphere(leftSphereX, centerY, 'left');
    drawMetalSphere(rightSphereX, centerY, 'right');

    // Draw charge indicators
    drawChargeIndicators(leftSphereX, rightSphereX, centerY);

    // Draw labels
    fill('black');
    textSize(12);
    textAlign(CENTER, TOP);
    text('Metal Sphere A', leftSphereX, centerY + 140);
    text('Metal Sphere B', rightSphereX, centerY + 140);
}

function drawChargedRod(x, y) {
    // Rod body
    fill('#9C27B0');
    noStroke();
    rect(x - 80, y - 8, 120, 16, 5);

    // Handle
    fill('#5D4037');
    rect(x - 100, y - 6, 30, 12, 3);

    // Negative charges on rod
    fill('#2196F3');
    for (let i = 0; i < 5; i++) {
        let cx = x - 60 + i * 25;
        circle(cx, y, 10);
        fill('white');
        textSize(12);
        textAlign(CENTER, CENTER);
        text('−', cx, y);
        fill('#2196F3');
    }

    // Label
    fill('black');
    textSize(11);
    text('Charged Rod (−)', x - 40, y - 25);
}

function drawMetalSphere(x, y, side) {
    // Sphere gradient effect
    for (let r = 50; r > 0; r -= 2) {
        let c = map(r, 0, 50, 220, 180);
        fill(c, c, c + 10);
        noStroke();
        circle(x, y, r);
    }

    // Highlight
    fill(255, 255, 255, 100);
    ellipse(x - 12, y - 12, 15, 10);

    // Draw electron particles
    for (let p of particles) {
        if (p.sphere === side) {
            let px = x + p.r * cos(p.angle);
            let py = y + p.r * sin(p.angle);

            fill('#2196F3');
            noStroke();
            circle(px, py, 8);
        }
    }
}

function drawChargeIndicators(leftX, rightX, y) {
    textSize(28);
    textAlign(CENTER, CENTER);

    // Show net charge based on step
    if (currentStep >= 2) {
        // Left sphere becomes positive (lost electrons)
        if (currentStep >= 3) {
            fill('#E53935');
            text('+', leftX, y - 70);
        }

        // Right sphere becomes negative (gained electrons)
        if (currentStep >= 3) {
            fill('#2196F3');
            text('−', rightX, y - 70);
        }
    }

    // Show induced charges during polarization
    if (currentStep === 2) {
        textSize(16);
        fill('#E53935');
        text('+', leftX - 25, y);
        text('+', leftX - 25, y - 15);
        text('+', leftX - 25, y + 15);

        fill('#2196F3');
        text('−', rightX + 25, y);
        text('−', rightX + 25, y - 15);
        text('−', rightX + 25, y + 15);
    }
}

function drawStepIndicator() {
    let startX = canvasWidth / 2 - 150;
    let y = 50;

    for (let i = 0; i < STEPS.length; i++) {
        let x = startX + i * 60;

        // Circle
        if (i === currentStep) {
            fill('#4CAF50');
        } else if (i < currentStep) {
            fill('#81C784');
        } else {
            fill('#E0E0E0');
        }
        noStroke();
        circle(x, y, 25);

        // Number
        fill(i <= currentStep ? 'white' : '#666');
        textSize(14);
        textAlign(CENTER, CENTER);
        text(i + 1, x, y);

        // Line to next
        if (i < STEPS.length - 1) {
            stroke(i < currentStep ? '#81C784' : '#E0E0E0');
            strokeWeight(2);
            line(x + 15, y, x + 45, y);
        }
    }

    // Step name
    fill('black');
    noStroke();
    textSize(14);
    textAlign(CENTER, TOP);
    text('Step ' + (currentStep + 1) + ': ' + STEPS[currentStep].name, canvasWidth / 2, y + 20);
}

function drawDescription() {
    // Description panel
    let panelX = margin;
    let panelY = drawHeight - 70;
    let panelW = canvasWidth - 2 * margin;
    let panelH = 60;

    fill(245, 245, 255);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text(STEPS[currentStep].desc, panelX + 15, panelY + panelH / 2);

    // Key insight for final step
    if (currentStep === 5) {
        fill('#4CAF50');
        textSize(12);
        text('✓ No contact with the charged rod was needed!', panelX + 15, panelY + panelH - 10);
    }
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 900);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}
