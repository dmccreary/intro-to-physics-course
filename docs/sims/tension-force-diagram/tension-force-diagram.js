// Tension Force Diagram MicroSim
// Demonstrates how tension forces act within a rope and on connected objects

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let tensionSlider, frictionSlider;
let showCutsCheckbox, animateCheckbox;
let animationPhase = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    tensionSlider = createSlider(10, 100, 50, 5);
    tensionSlider.position(140, drawHeight + 12);
    tensionSlider.size(180);

    frictionSlider = createSlider(0, 80, 30, 5);
    frictionSlider.position(140, drawHeight + 42);
    frictionSlider.size(180);

    showCutsCheckbox = createCheckbox(' Show rope cuts', true);
    showCutsCheckbox.position(350, drawHeight + 15);
    showCutsCheckbox.style('font-size', '14px');

    animateCheckbox = createCheckbox(' Animate forces', true);
    animateCheckbox.position(350, drawHeight + 45);
    animateCheckbox.style('font-size', '14px');

    describe('Tension force diagram showing how tension acts through a rope connecting two blocks', LABEL);
}

function draw() {
    updateCanvasSize();

    if (animateCheckbox.checked()) {
        animationPhase += 0.02;
    }

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
    textSize(20);
    textAlign(CENTER, TOP);
    text('Tension Force Diagram: Forces in a Rope', canvasWidth / 2, 10);

    let tension = tensionSlider.value();
    let friction = frictionSlider.value();
    let showCuts = showCutsCheckbox.checked();

    // Draw the main scene
    drawMainScene(tension, friction, showCuts);

    // Draw FBD for each block
    drawBlockAFBD(50, 280, 150, 130, tension);
    drawBlockBFBD(canvasWidth - 200, 280, 150, 130, tension, friction);

    // Key insight box
    drawInsightBox(280, 280, 240, 130);

    // Control labels
    fill('black');
    noStroke();
    textSize(13);
    textAlign(LEFT, CENTER);
    text('Applied Force: ' + tension + ' N', 10, drawHeight + 19);
    text('Friction: ' + friction + ' N', 10, drawHeight + 49);

    // Status
    textSize(12);
    let netForce = tension - friction;
    if (netForce > 0) {
        fill('#27AE60');
        text('System accelerates right (net force = ' + netForce + ' N)', 500, drawHeight + 79);
    } else if (netForce < 0) {
        fill('#E74C3C');
        text('System decelerates (net force = ' + netForce + ' N)', 500, drawHeight + 79);
    } else {
        fill('#F39C12');
        text('System at constant velocity (net force = 0)', 500, drawHeight + 79);
    }
}

function drawMainScene(tension, friction, showCuts) {
    let centerY = 140;
    let blockW = 80;
    let blockH = 60;

    // Ground
    fill('#D4B896');
    noStroke();
    rect(30, centerY + blockH/2, canvasWidth - 60, 30);

    // Ground texture
    stroke('#B8A082');
    strokeWeight(1);
    for (let x = 40; x < canvasWidth - 40; x += 15) {
        line(x, centerY + blockH/2 + 5, x + 8, centerY + blockH/2 + 20);
    }

    // Block A (left, being pulled)
    let blockAX = 100;
    fill('#A0A0A0');
    stroke('#707070');
    strokeWeight(2);
    rect(blockAX, centerY - blockH/2, blockW, blockH, 5);

    // Block A label
    fill('white');
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text('Block A', blockAX + blockW/2, centerY);

    // Block B (right, with friction)
    let blockBX = canvasWidth - 180;
    fill('#C19A6B');
    stroke('#8B7355');
    strokeWeight(2);
    rect(blockBX, centerY - blockH/2, blockW, blockH, 5);

    // Block B label
    fill('white');
    noStroke();
    textSize(16);
    text('Block B', blockBX + blockW/2, centerY);

    // Rope
    let ropeY = centerY - 5;
    let ropeStartX = blockAX + blockW;
    let ropeEndX = blockBX;

    stroke('#8B4513');
    strokeWeight(6);
    line(ropeStartX, ropeY, ropeEndX, ropeY);

    // Show cut points with tension
    if (showCuts) {
        let cutPositions = [0.33, 0.66];
        for (let pos of cutPositions) {
            let cutX = ropeStartX + (ropeEndX - ropeStartX) * pos;

            // Dashed cut line
            stroke('#E74C3C');
            strokeWeight(2);
            drawingContext.setLineDash([5, 5]);
            line(cutX, ropeY - 30, cutX, ropeY + 30);
            drawingContext.setLineDash([]);

            // Tension arrows at cut (action-reaction pair)
            let arrowOffset = 8 + sin(animationPhase) * 3;

            // Left arrow (tension pulling left segment right)
            drawArrow(cutX - 10, ropeY, cutX + 30, ropeY, '#3498DB', '');

            // Right arrow (tension pulling right segment left)
            drawArrow(cutX + 10, ropeY, cutX - 30, ropeY, '#3498DB', '');

            // T labels
            fill('#3498DB');
            noStroke();
            textSize(14);
            textAlign(CENTER, CENTER);
            text('T', cutX, ropeY - 40);
        }
    }

    // External force F on Block A (pulling left)
    let forceScale = tension / 100;
    let arrowLen = 60 * forceScale;
    drawArrow(blockAX, centerY, blockAX - arrowLen - 20, centerY, '#E74C3C', 'F');

    // Tension on Block A (rope pulling right)
    drawArrow(blockAX + blockW, centerY, blockAX + blockW + 40, centerY, '#3498DB', 'T');

    // Tension on Block B (rope pulling left)
    drawArrow(blockBX, centerY, blockBX - 40, centerY, '#3498DB', 'T');

    // Friction on Block B (opposing motion)
    if (friction > 0) {
        let frictionLen = map(friction, 0, 80, 10, 50);
        drawArrow(blockBX + blockW/2, centerY + blockH/2 - 5,
                  blockBX + blockW/2 + frictionLen, centerY + blockH/2 - 5, '#8B4513', 'f');
    }

    // Labels
    fill('#333');
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    text('Massless, inextensible rope', (ropeStartX + ropeEndX) / 2, ropeY + 20);
    text('(uniform tension throughout)', (ropeStartX + ropeEndX) / 2, ropeY + 33);
}

function drawBlockAFBD(x, y, w, h, tension) {
    push();
    translate(x, y);

    // Background
    fill(255, 255, 255, 240);
    stroke('#A0A0A0');
    strokeWeight(1);
    rect(0, 0, w, h, 8);

    // Title
    fill('#707070');
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('Block A Free-Body', w/2, 5);

    // Block
    fill('#A0A0A0');
    stroke('#707070');
    strokeWeight(1);
    rect(w/2 - 20, h/2 - 15, 40, 30, 3);

    // Forces
    let centerX = w/2;
    let centerY = h/2;

    // External force F (left)
    drawArrow(centerX - 20, centerY, centerX - 55, centerY, '#E74C3C', 'F');

    // Tension T (right)
    drawArrow(centerX + 20, centerY, centerX + 55, centerY, '#3498DB', 'T');

    pop();
}

function drawBlockBFBD(x, y, w, h, tension, friction) {
    push();
    translate(x, y);

    // Background
    fill(255, 255, 255, 240);
    stroke('#C19A6B');
    strokeWeight(1);
    rect(0, 0, w, h, 8);

    // Title
    fill('#8B7355');
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('Block B Free-Body', w/2, 5);

    // Block
    fill('#C19A6B');
    stroke('#8B7355');
    strokeWeight(1);
    rect(w/2 - 20, h/2 - 15, 40, 30, 3);

    // Forces
    let centerX = w/2;
    let centerY = h/2;

    // Tension T (left)
    drawArrow(centerX - 20, centerY, centerX - 55, centerY, '#3498DB', 'T');

    // Friction f (right)
    if (friction > 0) {
        drawArrow(centerX + 20, centerY, centerX + 55, centerY, '#8B4513', 'f');
    }

    pop();
}

function drawInsightBox(x, y, w, h) {
    push();
    translate(x, y);

    fill(255, 255, 255, 240);
    stroke('#27AE60');
    strokeWeight(2);
    rect(0, 0, w, h, 10);

    fill('#27AE60');
    noStroke();
    textSize(13);
    textAlign(LEFT, TOP);
    text('Key Insights:', 10, 10);

    textSize(11);
    fill('#333');
    let lineY = 30;
    text('• Rope pulls equally on both blocks', 10, lineY); lineY += 18;
    text('• Cut the rope anywhere:', 10, lineY); lineY += 16;
    text('  tension is the same (T)', 15, lineY); lineY += 18;
    text('• Action-reaction pairs at each cut', 10, lineY); lineY += 18;
    text('• For massless rope: T uniform', 10, lineY);

    pop();
}

function drawArrow(x1, y1, x2, y2, col, label) {
    let headSize = 8;
    let angle = atan2(y2 - y1, x2 - x1);

    stroke(col);
    strokeWeight(3);
    line(x1, y1, x2, y2);

    fill(col);
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -headSize * 1.5, -headSize/2, -headSize * 1.5, headSize/2);
    pop();

    if (label) {
        textSize(14);
        textAlign(CENTER, CENTER);
        fill(col);
        noStroke();
        let labelOffset = 18;
        text(label, x2 + cos(angle) * labelOffset, y2 + sin(angle) * labelOffset - 5);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    if (tensionSlider) tensionSlider.size(180);
    if (frictionSlider) frictionSlider.size(180);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.min(container.offsetWidth, 800);
    }
}
