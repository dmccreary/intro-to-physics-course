// Atwood Machine Free-Body Diagram
// Shows forces on each mass and how to set up equations

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let m1Slider, m2Slider;
let showEquationsCheckbox, animateCheckbox;
let animPhase = 0;
let position = 0;
let velocity = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    m1Slider = createSlider(1, 15, 5, 0.5);
    m1Slider.position(100, drawHeight + 12);
    m1Slider.size(150);

    m2Slider = createSlider(1, 15, 7, 0.5);
    m2Slider.position(100, drawHeight + 42);
    m2Slider.size(150);

    showEquationsCheckbox = createCheckbox(' Show equations', true);
    showEquationsCheckbox.position(280, drawHeight + 15);
    showEquationsCheckbox.style('font-size', '13px');

    animateCheckbox = createCheckbox(' Animate motion', false);
    animateCheckbox.position(280, drawHeight + 42);
    animateCheckbox.style('font-size', '13px');

    describe('Atwood machine free-body diagram showing forces and equations for connected masses', LABEL);
}

function draw() {
    updateCanvasSize();

    let m1 = m1Slider.value();
    let m2 = m2Slider.value();
    let g = 9.8;

    // Calculate physics
    let a = (m2 - m1) * g / (m1 + m2);
    let T = 2 * m1 * m2 * g / (m1 + m2);

    // Animation
    if (animateCheckbox.checked() && abs(a) > 0.1) {
        velocity += a * 0.001;
        position += velocity;
        if (abs(position) > 80) {
            position = 0;
            velocity = 0;
        }
    } else if (!animateCheckbox.checked()) {
        position = 0;
        velocity = 0;
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
    text('Atwood Machine: Free-Body Analysis', canvasWidth / 2, 10);

    // Draw Atwood machine and FBDs
    drawAtwoodMachine(m1, m2, T, a, position);
    drawFBD1(50, 250, 140, 160, m1, T, a);
    drawFBD2(canvasWidth - 190, 250, 140, 160, m2, T, a);

    if (showEquationsCheckbox.checked()) {
        drawEquationsPanel(280, 50, 240, 180, m1, m2, T, a, g);
    }

    // Control labels
    fill('black');
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('m₁: ' + m1.toFixed(1) + ' kg', 10, drawHeight + 19);
    text('m₂: ' + m2.toFixed(1) + ' kg', 10, drawHeight + 49);

    // Results
    fill('#333');
    text('a = ' + a.toFixed(2) + ' m/s²', 430, drawHeight + 19);
    text('T = ' + T.toFixed(1) + ' N', 430, drawHeight + 49);

    // Direction indicator
    if (m2 > m1) {
        fill('#27AE60');
        text('m₂ falls, m₁ rises', 550, drawHeight + 79);
    } else if (m1 > m2) {
        fill('#E74C3C');
        text('m₁ falls, m₂ rises', 550, drawHeight + 79);
    } else {
        fill('#F39C12');
        text('Equilibrium (m₁ = m₂)', 550, drawHeight + 79);
    }
}

function drawAtwoodMachine(m1, m2, T, a, pos) {
    let pulleyX = 260;
    let pulleyY = 90;
    let pulleyR = 25;

    // Support
    stroke('#5D4E37');
    strokeWeight(3);
    line(pulleyX, 45, pulleyX, pulleyY);

    // Ceiling
    fill('#8B7355');
    noStroke();
    rect(pulleyX - 40, 40, 80, 10);

    // Pulley
    fill('#888');
    stroke('#555');
    strokeWeight(2);
    ellipse(pulleyX, pulleyY, pulleyR * 2, pulleyR * 2);

    // Pulley detail
    fill('#666');
    ellipse(pulleyX, pulleyY, 15, 15);

    // String
    stroke('#8B4513');
    strokeWeight(3);

    let m1Y = 200 - pos;
    let m2Y = 200 + pos;

    // Left string
    line(pulleyX - pulleyR, pulleyY, pulleyX - pulleyR - 30, m1Y - 30);

    // Right string
    line(pulleyX + pulleyR, pulleyY, pulleyX + pulleyR + 30, m2Y - 30);

    // Mass 1 (left, blue)
    let m1X = pulleyX - pulleyR - 30;
    let boxH1 = 30 + m1 * 2;
    fill('#3498DB');
    stroke('#2980B9');
    strokeWeight(2);
    rect(m1X - 25, m1Y - 30, 50, boxH1, 5);

    fill('white');
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text('m₁', m1X, m1Y - 30 + boxH1/2);
    textSize(11);
    text(m1.toFixed(1) + ' kg', m1X, m1Y - 30 + boxH1/2 + 15);

    // Mass 2 (right, red)
    let m2X = pulleyX + pulleyR + 30;
    let boxH2 = 30 + m2 * 2;
    fill('#E74C3C');
    stroke('#C0392B');
    strokeWeight(2);
    rect(m2X - 25, m2Y - 30, 50, boxH2, 5);

    fill('white');
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text('m₂', m2X, m2Y - 30 + boxH2/2);
    textSize(11);
    text(m2.toFixed(1) + ' kg', m2X, m2Y - 30 + boxH2/2 + 15);

    // Acceleration arrows
    if (abs(a) > 0.1) {
        let arrowLen = min(abs(a) * 8, 40);
        if (a > 0) {
            // m1 accelerates up, m2 down
            drawSmallArrow(m1X + 35, m1Y, m1X + 35, m1Y - arrowLen, '#27AE60');
            fill('#27AE60');
            textSize(10);
            textAlign(LEFT, CENTER);
            text('a', m1X + 40, m1Y - arrowLen/2);

            drawSmallArrow(m2X + 35, m2Y, m2X + 35, m2Y + arrowLen, '#27AE60');
            text('a', m2X + 40, m2Y + arrowLen/2);
        } else {
            // m1 accelerates down, m2 up
            drawSmallArrow(m1X + 35, m1Y, m1X + 35, m1Y + arrowLen, '#27AE60');
            fill('#27AE60');
            textSize(10);
            textAlign(LEFT, CENTER);
            text('a', m1X + 40, m1Y + arrowLen/2);

            drawSmallArrow(m2X + 35, m2Y, m2X + 35, m2Y - arrowLen, '#27AE60');
            text('a', m2X + 40, m2Y - arrowLen/2);
        }
    }

    // Labels
    fill('#333');
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    text('Massless, frictionless pulley', pulleyX, pulleyY + 35);
    text('Inextensible string (same |a|)', pulleyX, pulleyY + 48);
}

function drawFBD1(x, y, w, h, m1, T, a) {
    push();
    translate(x, y);

    // Background
    fill(255, 255, 255, 240);
    stroke('#3498DB');
    strokeWeight(2);
    rect(0, 0, w, h, 8);

    // Title
    fill('#3498DB');
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('m₁ Free-Body Diagram', w/2, 8);

    // Block
    let cx = w/2;
    let cy = h/2 + 10;
    fill('#3498DB');
    stroke('#2980B9');
    strokeWeight(1);
    rect(cx - 20, cy - 15, 40, 30, 3);

    fill('white');
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text('m₁', cx, cy);

    // Tension (up)
    drawArrowLocal(cx, cy - 15, cx, cy - 55, '#2980B9', 'T');

    // Weight (down)
    let wLen = min(m1 * 3, 40);
    drawArrowLocal(cx, cy + 15, cx, cy + 15 + wLen, '#9B59B6', 'm₁g');

    // Equation
    fill('#333');
    textSize(10);
    textAlign(CENTER, BOTTOM);
    if (a >= 0) {
        text('T - m₁g = m₁a', w/2, h - 5);
    } else {
        text('m₁g - T = m₁|a|', w/2, h - 5);
    }

    pop();
}

function drawFBD2(x, y, w, h, m2, T, a) {
    push();
    translate(x, y);

    // Background
    fill(255, 255, 255, 240);
    stroke('#E74C3C');
    strokeWeight(2);
    rect(0, 0, w, h, 8);

    // Title
    fill('#E74C3C');
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('m₂ Free-Body Diagram', w/2, 8);

    // Block
    let cx = w/2;
    let cy = h/2 + 10;
    fill('#E74C3C');
    stroke('#C0392B');
    strokeWeight(1);
    rect(cx - 20, cy - 15, 40, 30, 3);

    fill('white');
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text('m₂', cx, cy);

    // Tension (up)
    drawArrowLocal(cx, cy - 15, cx, cy - 55, '#2980B9', 'T');

    // Weight (down)
    let wLen = min(m2 * 3, 40);
    drawArrowLocal(cx, cy + 15, cx, cy + 15 + wLen, '#9B59B6', 'm₂g');

    // Equation
    fill('#333');
    textSize(10);
    textAlign(CENTER, BOTTOM);
    if (a >= 0) {
        text('m₂g - T = m₂a', w/2, h - 5);
    } else {
        text('T - m₂g = m₂|a|', w/2, h - 5);
    }

    pop();
}

function drawEquationsPanel(x, y, w, h, m1, m2, T, a, g) {
    push();
    translate(x, y);

    fill(255, 255, 255, 245);
    stroke('#27AE60');
    strokeWeight(2);
    rect(0, 0, w, h, 10);

    fill('#27AE60');
    noStroke();
    textSize(13);
    textAlign(LEFT, TOP);
    text('Solution:', 10, 10);

    textSize(10);
    fill('#333');
    let lineY = 30;

    text('Add equations to eliminate T:', 10, lineY);
    lineY += 18;

    text('(m₂g - T) + (T - m₁g) = m₂a + m₁a', 10, lineY);
    lineY += 16;

    text('(m₂ - m₁)g = (m₁ + m₂)a', 10, lineY);
    lineY += 20;

    fill('#E74C3C');
    textSize(11);
    text('a = (m₂ - m₁)g / (m₁ + m₂)', 10, lineY);
    lineY += 18;

    fill('#333');
    textSize(10);
    text('a = (' + m2.toFixed(1) + ' - ' + m1.toFixed(1) + ')×9.8 / (' + m1.toFixed(1) + ' + ' + m2.toFixed(1) + ')', 10, lineY);
    lineY += 16;

    fill('#27AE60');
    textSize(11);
    text('a = ' + a.toFixed(2) + ' m/s²', 10, lineY);
    lineY += 22;

    fill('#2980B9');
    text('T = 2m₁m₂g / (m₁ + m₂)', 10, lineY);
    lineY += 16;

    fill('#27AE60');
    text('T = ' + T.toFixed(1) + ' N', 10, lineY);

    pop();
}

function drawArrowLocal(x1, y1, x2, y2, col, label) {
    let headSize = 6;
    let angle = atan2(y2 - y1, x2 - x1);

    stroke(col);
    strokeWeight(2);
    line(x1, y1, x2, y2);

    fill(col);
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -headSize * 1.5, -headSize/2, -headSize * 1.5, headSize/2);
    pop();

    if (label) {
        textSize(10);
        textAlign(CENTER, CENTER);
        fill(col);
        let perpAngle = angle + PI/2;
        text(label, x2 + cos(perpAngle) * 12, y2 + sin(perpAngle) * 12);
    }
}

function drawSmallArrow(x1, y1, x2, y2, col) {
    let headSize = 5;
    let angle = atan2(y2 - y1, x2 - x1);

    stroke(col);
    strokeWeight(2);
    line(x1, y1, x2, y2);

    fill(col);
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -headSize, -headSize/2, -headSize, headSize/2);
    pop();
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
