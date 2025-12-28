// Pulley System Mechanical Advantage Diagram
// Compares three pulley configurations

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let loadSlider;
let animPhase = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    loadSlider = createSlider(50, 200, 100, 10);
    loadSlider.position(120, drawHeight + 30);
    loadSlider.size(200);

    describe('Comparison of three pulley configurations showing mechanical advantage', LABEL);
}

function draw() {
    updateCanvasSize();
    animPhase += 0.015;

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
    textSize(18);
    textAlign(CENTER, TOP);
    text('Pulley Systems: Mechanical Advantage Comparison', canvasWidth / 2, 10);

    let load = loadSlider.value();

    // Draw three configurations
    let spacing = canvasWidth / 4;

    drawSingleFixed(spacing * 0.8, 60, load);
    drawSingleMovable(spacing * 2, 60, load);
    drawBlockAndTackle(spacing * 3.2, 60, load);

    // Trade-off note
    fill(255, 255, 255, 240);
    stroke('#F39C12');
    strokeWeight(2);
    rect(canvasWidth/2 - 180, drawHeight - 55, 360, 45, 10);

    fill('#F39C12');
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text('Trade-off: Higher MA requires pulling more rope', canvasWidth/2, drawHeight - 42);
    text('Work is conserved: F × d_rope = W × d_load', canvasWidth/2, drawHeight - 25);

    // Control labels
    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text('Load Weight: ' + load + ' N', 10, drawHeight + 37);

    textSize(12);
    fill('#666');
    text('Compare the force needed and rope pulled for each system', 350, drawHeight + 37);
}

function drawSingleFixed(x, y, load) {
    let pulleyR = 18;
    let pulleyY = y + 50;

    // Title
    fill('#333');
    noStroke();
    textSize(13);
    textAlign(CENTER, TOP);
    text('Single Fixed Pulley', x, y);

    // Ceiling
    fill('#8B7355');
    rect(x - 35, y + 25, 70, 10);

    // Support
    stroke('#5D4E37');
    strokeWeight(2);
    line(x, y + 35, x, pulleyY);

    // Pulley
    fill('#888');
    stroke('#555');
    strokeWeight(2);
    ellipse(x, pulleyY, pulleyR * 2, pulleyR * 2);
    fill('#666');
    ellipse(x, pulleyY, 10, 10);

    // Rope
    stroke('#8B4513');
    strokeWeight(3);

    let loadY = y + 200;
    let personY = y + 260;

    // Left side (load)
    line(x - pulleyR, pulleyY, x - pulleyR, loadY);

    // Right side (person pulling)
    line(x + pulleyR, pulleyY, x + pulleyR, personY);

    // Load box
    let boxH = 40;
    fill('#C0392B');
    stroke('#922B21');
    strokeWeight(2);
    rect(x - pulleyR - 25, loadY, 50, boxH, 5);

    fill('white');
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(load + ' N', x - pulleyR, loadY + boxH/2);

    // Person pulling (stick figure)
    drawStickFigure(x + pulleyR + 5, personY, load);

    // Force arrow
    drawArrow(x + pulleyR + 30, personY - 60, x + pulleyR + 30, personY - 20, '#E74C3C');
    fill('#E74C3C');
    textSize(11);
    textAlign(LEFT, CENTER);
    text('F = ' + load + ' N', x + pulleyR + 35, personY - 40);

    // MA label
    fill('#27AE60');
    textSize(14);
    textAlign(CENTER, TOP);
    text('MA = 1', x, y + 310);

    fill('#666');
    textSize(10);
    text('Direction change only', x, y + 328);
    text('No force advantage', x, y + 342);
}

function drawSingleMovable(x, y, load) {
    let pulleyR = 18;
    let fixedPulleyY = y + 50;

    // Title
    fill('#333');
    noStroke();
    textSize(13);
    textAlign(CENTER, TOP);
    text('Single Movable Pulley', x, y);

    // Ceiling
    fill('#8B7355');
    rect(x - 50, y + 25, 100, 10);

    // Fixed pulley support
    stroke('#5D4E37');
    strokeWeight(2);
    line(x + 25, y + 35, x + 25, fixedPulleyY);

    // Fixed pulley
    fill('#888');
    stroke('#555');
    strokeWeight(2);
    ellipse(x + 25, fixedPulleyY, pulleyR * 2, pulleyR * 2);
    fill('#666');
    ellipse(x + 25, fixedPulleyY, 10, 10);

    // Movable pulley with load
    let movablePulleyY = y + 180;
    fill('#3498DB');
    stroke('#2980B9');
    ellipse(x - 10, movablePulleyY, pulleyR * 2, pulleyR * 2);
    fill('#2980B9');
    ellipse(x - 10, movablePulleyY, 10, 10);

    // Rope
    stroke('#8B4513');
    strokeWeight(3);

    // Anchor point
    fill('#5D4E37');
    noStroke();
    ellipse(x - 35, y + 50, 12, 12);

    stroke('#8B4513');
    strokeWeight(3);
    // From anchor down to movable pulley left
    line(x - 35, y + 50, x - 35, movablePulleyY);
    line(x - 35, movablePulleyY, x - 10 - pulleyR, movablePulleyY);

    // Over movable pulley, up to fixed pulley
    line(x - 10 + pulleyR, movablePulleyY, x + 25 - pulleyR, fixedPulleyY);

    // Over fixed pulley, down to person
    let personY = y + 260;
    line(x + 25 + pulleyR, fixedPulleyY, x + 25 + pulleyR, personY);

    // Load attached to movable pulley
    let boxH = 40;
    fill('#C0392B');
    stroke('#922B21');
    strokeWeight(2);
    rect(x - 35, movablePulleyY + pulleyR + 10, 50, boxH, 5);

    fill('white');
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(load + ' N', x - 10, movablePulleyY + pulleyR + 10 + boxH/2);

    // Segment count
    fill('#27AE60');
    textSize(10);
    textAlign(CENTER, CENTER);
    text('1', x - 35, movablePulleyY - 30);
    text('2', x + 10, movablePulleyY - 40);

    // Person pulling
    drawStickFigure(x + 25 + pulleyR + 5, personY, load/2);

    // Force arrow
    let force = load / 2;
    drawArrow(x + 25 + pulleyR + 30, personY - 60, x + 25 + pulleyR + 30, personY - 20, '#E74C3C');
    fill('#E74C3C');
    textSize(11);
    textAlign(LEFT, CENTER);
    text('F = ' + force + ' N', x + 25 + pulleyR + 35, personY - 40);

    // MA label
    fill('#27AE60');
    textSize(14);
    textAlign(CENTER, TOP);
    text('MA = 2', x, y + 310);

    fill('#666');
    textSize(10);
    text('2 rope segments', x, y + 328);
    text('support the load', x, y + 342);
}

function drawBlockAndTackle(x, y, load) {
    let pulleyR = 15;
    let fixedPulleyY1 = y + 50;
    let fixedPulleyY2 = y + 90;

    // Title
    fill('#333');
    noStroke();
    textSize(13);
    textAlign(CENTER, TOP);
    text('Block and Tackle (4 segments)', x, y);

    // Ceiling
    fill('#8B7355');
    rect(x - 50, y + 25, 100, 10);

    // Fixed pulleys (top block)
    stroke('#5D4E37');
    strokeWeight(2);
    line(x, y + 35, x, fixedPulleyY1);

    fill('#888');
    stroke('#555');
    strokeWeight(2);
    ellipse(x - 18, fixedPulleyY1, pulleyR * 2, pulleyR * 2);
    ellipse(x + 18, fixedPulleyY1, pulleyR * 2, pulleyR * 2);
    fill('#666');
    ellipse(x - 18, fixedPulleyY1, 8, 8);
    ellipse(x + 18, fixedPulleyY1, 8, 8);

    // Movable pulleys with load
    let movablePulleyY = y + 170;
    fill('#3498DB');
    stroke('#2980B9');
    ellipse(x - 18, movablePulleyY, pulleyR * 2, pulleyR * 2);
    ellipse(x + 18, movablePulleyY, pulleyR * 2, pulleyR * 2);
    fill('#2980B9');
    ellipse(x - 18, movablePulleyY, 8, 8);
    ellipse(x + 18, movablePulleyY, 8, 8);

    // Simplified rope representation
    stroke('#8B4513');
    strokeWeight(2);

    // 4 vertical segments
    line(x - 30, fixedPulleyY1, x - 30, movablePulleyY);
    line(x - 6, fixedPulleyY1 + pulleyR, x - 6, movablePulleyY - pulleyR);
    line(x + 6, fixedPulleyY1 + pulleyR, x + 6, movablePulleyY - pulleyR);
    line(x + 30, fixedPulleyY1, x + 30, movablePulleyY);

    // Count labels
    fill('#27AE60');
    textSize(9);
    textAlign(CENTER, CENTER);
    text('1', x - 30, movablePulleyY - 35);
    text('2', x - 6, movablePulleyY - 35);
    text('3', x + 6, movablePulleyY - 35);
    text('4', x + 30, movablePulleyY - 35);

    // Down to person
    let personY = y + 260;
    stroke('#8B4513');
    line(x + 45, fixedPulleyY1, x + 45, personY);

    // Load
    let boxH = 35;
    fill('#C0392B');
    stroke('#922B21');
    strokeWeight(2);
    rect(x - 30, movablePulleyY + pulleyR + 10, 60, boxH, 5);

    fill('white');
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(load + ' N', x, movablePulleyY + pulleyR + 10 + boxH/2);

    // Person pulling
    drawStickFigure(x + 50, personY, load/4);

    // Force arrow
    let force = load / 4;
    drawArrow(x + 70, personY - 60, x + 70, personY - 20, '#E74C3C');
    fill('#E74C3C');
    textSize(11);
    textAlign(LEFT, CENTER);
    text('F = ' + force + ' N', x + 75, personY - 40);

    // MA label
    fill('#27AE60');
    textSize(14);
    textAlign(CENTER, TOP);
    text('MA = 4', x, y + 310);

    fill('#666');
    textSize(10);
    text('4 rope segments', x, y + 328);
    text('support the load', x, y + 342);
}

function drawStickFigure(x, y, force) {
    stroke('#333');
    strokeWeight(2);

    // Head
    noFill();
    ellipse(x, y - 35, 15, 15);

    // Body
    line(x, y - 27, x, y - 5);

    // Legs
    line(x, y - 5, x - 8, y + 15);
    line(x, y - 5, x + 8, y + 15);

    // Arms (reaching up)
    line(x, y - 20, x - 10, y - 35);
    line(x, y - 20, x + 5, y - 40);
}

function drawArrow(x1, y1, x2, y2, col) {
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
