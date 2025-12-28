// Interactive Atwood Machine MicroSim
// Two masses connected by string over pulley

let canvasWidth = 800;
let drawHeight = 470;
let controlHeight = 80 ;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;

let m1Slider, m2Slider;
let releaseButton, resetButton;

let isReleased = false;
let displacement = 0;
let velocity = 0;
let time = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    m1Slider = createSlider(1, 15, 5, 0.5);
    m1Slider.position(80, drawHeight + 12);
    m1Slider.size(150);

    m2Slider = createSlider(1, 15, 7, 0.5);
    m2Slider.position(80, drawHeight + 42);
    m2Slider.size(150);

    releaseButton = createButton('Release');
    releaseButton.position(260, drawHeight + 20);
    releaseButton.mousePressed(() => { isReleased = true; });
    releaseButton.style('background-color', '#4CAF50');
    releaseButton.style('color', 'white');
    releaseButton.style('padding', '8px 16px');

    resetButton = createButton('Reset');
    resetButton.position(340, drawHeight + 20);
    resetButton.mousePressed(resetSim);
    resetButton.style('padding', '8px 16px');

    describe('Interactive Atwood machine simulation with sliders to adjust masses', LABEL);
}

function resetSim() {
    isReleased = false;
    displacement = 0;
    velocity = 0;
    time = 0;
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

    // Get values
    let m1 = m1Slider.value();
    let m2 = m2Slider.value();
    let g = 9.8;

    // Calculate physics
    let acceleration = (m2 - m1) * g / (m1 + m2);
    let tension = 2 * m1 * m2 * g / (m1 + m2);

    // Update physics if released
    if (isReleased) {
        velocity += acceleration * 0.016;
        displacement += velocity * 0.016;
        time += 0.016;

        // Limit displacement
        if (Math.abs(displacement) > 1.5) {
            displacement = Math.sign(displacement) * 1.5;
            velocity = 0;
        }
    }

    // Title
    fill('black');
    noStroke();
    textSize(22);
    textAlign(CENTER, TOP);
    text('Atwood Machine', canvasWidth / 2, 10);

    // Draw setup
    let pulleyX = canvasWidth * 0.35;
    let pulleyY = 90;
    let pulleyR = 50;

    // Support beam
    fill('#666');
    rect(pulleyX - 60, 50, 120, 15, 3);

    // Draw the Pulley using Circles

    // Outer pulley circle
    fill('#888');
    stroke('#555');
    strokeWeight(2);
    circle(pulleyX, pulleyY, pulleyR * 2);
    // Inner pulley circle
    fill('#aaa');
    circle(pulleyX, pulleyY, pulleyR);

    // String and masses
    let baseY = 300;
    let stringLen = 250;
    let m1Y = baseY - displacement * 80;
    let m2Y = baseY + displacement * 80;

    // Strings
    stroke('#8B4513');
    strokeWeight(3);
    line(pulleyX - pulleyR + 5, pulleyY, pulleyX - pulleyR + 5, m1Y - 30);
    line(pulleyX + pulleyR - 5, pulleyY, pulleyX + pulleyR - 5, m2Y - 30);

    // Mass 1 (left, lighter typically)
    let m1X = pulleyX - pulleyR + 5;
    let boxSize1 = 40 + m1 * 2;
    fill('#3498DB');
    stroke('#2c3e80');
    strokeWeight(2);
    rect(m1X - boxSize1/2, m1Y - 30, boxSize1, boxSize1, 5);

    fill('white');
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text('m₁', m1X, m1Y - 30 + boxSize1/2 - 10);
    textSize(12);
    text(m1.toFixed(1) + ' kg', m1X, m1Y - 30 + boxSize1/2 + 8);

    // Mass 2 (right, heavier typically)
    let m2X = pulleyX + pulleyR - 5;
    let boxSize2 = 40 + m2 * 2;
    fill('#E74C3C');
    stroke('#C0392B');
    strokeWeight(2);
    rect(m2X - boxSize2/2, m2Y - 30, boxSize2, boxSize2, 5);

    fill('white');
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text('m₂', m2X, m2Y - 30 + boxSize2/2 - 10);
    textSize(12);
    text(m2.toFixed(1) + ' kg', m2X, m2Y - 30 + boxSize2/2 + 8);

    // Force arrows
    let forceScale = 3;
    let m1Left = m1X - boxSize1/2;  // Left edge of m1 block
    let m2Right = m2X + boxSize2/2;  // Right edge of m2 block

    // Tension on m1 (left of block)
    drawArrow(m1Left - 15, m1Y - 30 + boxSize1/2, m1Left - 15, m1Y - 30 + boxSize1/2 - tension * forceScale / 10, '#27AE60', 'T');

    // Weight on m1 (left of block)
    drawArrow(m1Left - 35, m1Y - 30 + boxSize1/2, m1Left - 35, m1Y - 30 + boxSize1/2 + m1 * g * forceScale / 10, '#9B59B6', 'W₁');

    // Tension on m2 (right of block)
    drawArrow(m2Right + 15, m2Y - 30 + boxSize2/2, m2Right + 15, m2Y - 30 + boxSize2/2 - tension * forceScale / 10, '#27AE60', 'T');

    // Weight on m2 (right of block)
    drawArrow(m2Right + 35, m2Y - 30 + boxSize2/2, m2Right + 35, m2Y - 30 + boxSize2/2 + m2 * g * forceScale / 10, '#F39C12', 'W₂');

    // Acceleration arrows
    if (isReleased && Math.abs(acceleration) > 0.1) {
        let accelDir = acceleration > 0 ? 1 : -1;
        drawArrow(m1Left - 55, m1Y - 30 + boxSize1/2, m1Left - 55, m1Y - 30 + boxSize1/2 - accelDir * 30, '#E74C3C', 'a');
        drawArrow(m2Right + 55, m2Y - 30 + boxSize2/2, m2Right + 55, m2Y - 30 + boxSize2/2 + accelDir * 30, '#E74C3C', 'a');
    }

    // Info panel
    drawInfoPanel(m1, m2, acceleration, tension, velocity);

    // Control labels
    fill('black');
    noStroke();
    textSize(13);
    textAlign(LEFT, CENTER);
    fill('#3498DB');
    text('m₁: ' + m1.toFixed(1) + ' kg', 10, drawHeight + 19);
    fill('#E74C3C');
    text('m₂: ' + m2.toFixed(1) + ' kg', 10, drawHeight + 49);

    // Status place in the right of the control area offset from the left by margin
    textSize(14);
    textAlign(RIGHT, CENTER);
    if (m1 === m2) {
        fill('#27AE60');
        text('Equilibrium: m₁ = m₂, a = 0', canvasWidth-margin, drawHeight + 20);
    } else if (m2 > m1) {
        fill('#E74C3C');
        text('m₂ > m₁: m₂ falls, m₁ rises', canvasWidth-margin, drawHeight + 20);
    } else {
        fill('#3498DB');
        text('m₁ > m₂: m₁ falls, m₂ rises', canvasWidth-margin, drawHeight + 20);
    }

}

function drawArrow(x1, y1, x2, y2, col, label) {
    let headSize = 8;
    let angle = atan2(y2 - y1, x2 - x1);
    let len = dist(x1, y1, x2, y2);

    if (len < 5) return;

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

    textSize(11);
    textAlign(CENTER, CENTER);
    fill(col);
    text(label, (x1 + x2) / 2 + 15, (y1 + y2) / 2);
}

function drawInfoPanel(m1, m2, accel, tension, vel) {
    let px = canvasWidth - 220;
    let py = 50;

    fill(255, 255, 255, 240);
    stroke('#3498DB');
    strokeWeight(2);
    rect(px, py, 200, 180, 10);

    fill('#3498DB');
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text('Atwood Machine', px + 10, py + 10);

    textSize(11);
    fill('#333');
    let y = py + 35;

    text('Acceleration:', px + 10, y); y += 18;
    text('a = (m₂-m₁)g/(m₁+m₂)', px + 10, y); y += 18;
    fill('#E74C3C');
    text('a = ' + accel.toFixed(2) + ' m/s²', px + 10, y); y += 25;

    fill('#333');
    text('Tension:', px + 10, y); y += 18;
    text('T = 2m₁m₂g/(m₁+m₂)', px + 10, y); y += 18;
    fill('#27AE60');
    text('T = ' + tension.toFixed(1) + ' N', px + 10, y); y += 25;

    fill('#333');
    text('Velocity: ' + vel.toFixed(2) + ' m/s', px + 10, y);
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
