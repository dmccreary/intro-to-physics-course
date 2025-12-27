// Newton's Second Law: F = ma Visualization
// Shows relationship between force, mass, and acceleration

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 500;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Graph parameters
let graphWidth = 350;
let graphHeight = 300;
let graph1X = 50;
let graph2X = 470;
let graphY = 120;

// Interactive values
let selectedForce = 50;
let selectedMass = 5;

// Controls
let forceSlider;
let massSlider;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Create sliders
    forceSlider = createSlider(0, 100, 50, 1);
    forceSlider.position(140, drawHeight + 15);
    forceSlider.size(200);

    massSlider = createSlider(1, 20, 5, 0.5);
    massSlider.position(140, drawHeight + 45);
    massSlider.size(200);

    describe('Interactive graphs showing Newton\'s Second Law F = ma relationships', LABEL);
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
    textSize(24);
    textAlign(CENTER, TOP);
    text("Exploring Newton's Second Law: F = ma", canvasWidth / 2, 10);

    // Get slider values
    selectedForce = forceSlider.value();
    selectedMass = massSlider.value();

    // Draw both graphs
    drawGraph1();
    drawGraph2();

    // Draw calculation panel
    drawCalcPanel();

    // Control labels
    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text('Force: ' + selectedForce + ' N', 10, drawHeight + 22);
    text('Mass: ' + selectedMass.toFixed(1) + ' kg', 10, drawHeight + 52);

    // Calculated acceleration
    let accel = selectedForce / selectedMass;
    textAlign(LEFT, CENTER);
    text('→ Acceleration: ' + accel.toFixed(2) + ' m/s²', 370, drawHeight + 35);
}

function drawGraph1() {
    // Graph 1: Acceleration vs Force (constant mass)
    let gx = graph1X;
    let gy = graphY;
    let gw = graphWidth;
    let gh = graphHeight;

    // Background
    fill('white');
    stroke('#ccc');
    strokeWeight(1);
    rect(gx, gy, gw, gh);

    // Title
    fill('black');
    noStroke();
    textSize(16);
    textAlign(CENTER, BOTTOM);
    text('Acceleration vs Force', gx + gw/2, gy - 5);
    textSize(12);
    fill('#666');
    text('(constant mass)', gx + gw/2, gy + 12);

    // Axes
    stroke('black');
    strokeWeight(2);
    // X-axis
    line(gx + 40, gy + gh - 30, gx + gw - 10, gy + gh - 30);
    // Y-axis
    line(gx + 40, gy + 20, gx + 40, gy + gh - 30);

    // Axis labels
    fill('black');
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('Force (N)', gx + gw/2 + 15, gy + gh - 15);

    push();
    translate(gx + 15, gy + gh/2);
    rotate(-PI/2);
    textAlign(CENTER, CENTER);
    text('Acceleration (m/s²)', 0, 0);
    pop();

    // Grid lines and tick labels
    stroke('#eee');
    strokeWeight(1);
    textSize(10);
    fill('#666');
    textAlign(CENTER, TOP);

    // X-axis ticks
    for (let f = 0; f <= 100; f += 20) {
        let x = map(f, 0, 100, gx + 40, gx + gw - 10);
        line(x, gy + 20, x, gy + gh - 30);
        noStroke();
        text(f, x, gy + gh - 25);
        stroke('#eee');
    }

    // Y-axis ticks (acceleration up to 100 m/s² for m=1kg)
    textAlign(RIGHT, CENTER);
    for (let a = 0; a <= 100; a += 20) {
        let y = map(a, 0, 100, gy + gh - 30, gy + 20);
        line(gx + 40, y, gx + gw - 10, y);
        noStroke();
        text(a, gx + 38, y);
        stroke('#eee');
    }

    // Draw lines for different masses
    let masses = [2, 5, 10];
    let lineColors = ['#E74C3C', '#27AE60', '#3498DB'];

    for (let i = 0; i < masses.length; i++) {
        let m = masses[i];
        stroke(lineColors[i]);
        strokeWeight(2);
        noFill();

        beginShape();
        for (let f = 0; f <= 100; f += 2) {
            let a = f / m;
            let x = map(f, 0, 100, gx + 40, gx + gw - 10);
            let y = map(a, 0, 100, gy + gh - 30, gy + 20);
            y = constrain(y, gy + 20, gy + gh - 30);
            vertex(x, y);
        }
        endShape();

        // Legend
        noStroke();
        fill(lineColors[i]);
        textSize(11);
        textAlign(LEFT, CENTER);
        text('m = ' + m + ' kg', gx + gw - 70, gy + 35 + i * 18);
    }

    // Draw selected point
    let selX = map(selectedForce, 0, 100, gx + 40, gx + gw - 10);
    let selA = selectedForce / selectedMass;
    let selY = map(selA, 0, 100, gy + gh - 30, gy + 20);
    selY = constrain(selY, gy + 20, gy + gh - 30);

    // Crosshairs
    stroke('#9B59B6');
    strokeWeight(1);
    drawingContext.setLineDash([5, 5]);
    line(selX, gy + gh - 30, selX, selY);
    line(gx + 40, selY, selX, selY);
    drawingContext.setLineDash([]);

    // Point
    fill('#9B59B6');
    noStroke();
    ellipse(selX, selY, 12, 12);

    // Annotation
    textSize(11);
    textAlign(LEFT, BOTTOM);
    fill('#9B59B6');
    text('(' + selectedForce + ' N, ' + selA.toFixed(1) + ' m/s²)', selX + 8, selY - 5);
}

function drawGraph2() {
    // Graph 2: Acceleration vs Mass (constant force)
    let gx = graph2X;
    let gy = graphY;
    let gw = graphWidth;
    let gh = graphHeight;

    // Background
    fill('white');
    stroke('#ccc');
    strokeWeight(1);
    rect(gx, gy, gw, gh);

    // Title
    fill('black');
    noStroke();
    textSize(16);
    textAlign(CENTER, BOTTOM);
    text('Acceleration vs Mass', gx + gw/2, gy - 5);
    textSize(12);
    fill('#666');
    text('(constant force)', gx + gw/2, gy + 12);

    // Axes
    stroke('black');
    strokeWeight(2);
    line(gx + 40, gy + gh - 30, gx + gw - 10, gy + gh - 30);
    line(gx + 40, gy + 20, gx + 40, gy + gh - 30);

    // Axis labels
    fill('black');
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('Mass (kg)', gx + gw/2 + 15, gy + gh - 15);

    push();
    translate(gx + 15, gy + gh/2);
    rotate(-PI/2);
    textAlign(CENTER, CENTER);
    text('Acceleration (m/s²)', 0, 0);
    pop();

    // Grid and ticks
    stroke('#eee');
    strokeWeight(1);
    textSize(10);
    fill('#666');
    textAlign(CENTER, TOP);

    // X-axis ticks (mass 0-20)
    for (let m = 0; m <= 20; m += 5) {
        let x = map(m, 0, 20, gx + 40, gx + gw - 10);
        line(x, gy + 20, x, gy + gh - 30);
        noStroke();
        text(m, x, gy + gh - 25);
        stroke('#eee');
    }

    // Y-axis ticks (acceleration 0-50)
    textAlign(RIGHT, CENTER);
    for (let a = 0; a <= 50; a += 10) {
        let y = map(a, 0, 50, gy + gh - 30, gy + 20);
        line(gx + 40, y, gx + gw - 10, y);
        noStroke();
        text(a, gx + 38, y);
        stroke('#eee');
    }

    // Draw curves for different forces (hyperbolas: a = F/m)
    let forces = [20, 50, 100];
    let curveColors = ['#3498DB', '#27AE60', '#E74C3C'];

    for (let i = 0; i < forces.length; i++) {
        let f = forces[i];
        stroke(curveColors[i]);
        strokeWeight(2);
        noFill();

        beginShape();
        for (let m = 0.5; m <= 20; m += 0.2) {
            let a = f / m;
            let x = map(m, 0, 20, gx + 40, gx + gw - 10);
            let y = map(a, 0, 50, gy + gh - 30, gy + 20);
            y = constrain(y, gy + 20, gy + gh - 30);
            vertex(x, y);
        }
        endShape();

        // Legend
        noStroke();
        fill(curveColors[i]);
        textSize(11);
        textAlign(LEFT, CENTER);
        text('F = ' + f + ' N', gx + gw - 70, gy + 35 + i * 18);
    }

    // Draw selected point
    let selX = map(selectedMass, 0, 20, gx + 40, gx + gw - 10);
    let selA = selectedForce / selectedMass;
    let selY = map(selA, 0, 50, gy + gh - 30, gy + 20);
    selY = constrain(selY, gy + 20, gy + gh - 30);

    // Crosshairs
    stroke('#9B59B6');
    strokeWeight(1);
    drawingContext.setLineDash([5, 5]);
    line(selX, gy + gh - 30, selX, selY);
    line(gx + 40, selY, selX, selY);
    drawingContext.setLineDash([]);

    // Point
    fill('#9B59B6');
    noStroke();
    ellipse(selX, selY, 12, 12);

    // Annotation
    textSize(11);
    textAlign(LEFT, BOTTOM);
    fill('#9B59B6');
    text('(' + selectedMass.toFixed(1) + ' kg, ' + selA.toFixed(1) + ' m/s²)', selX + 8, selY - 5);

    // Annotation about inverse relationship
    fill('#666');
    textSize(11);
    textAlign(CENTER, TOP);
    text('Doubling mass cuts acceleration in half', gx + gw/2, gy + gh + 5);
}

function drawCalcPanel() {
    let px = 50;
    let py = 440;
    let pw = 350;
    let ph = 50;

    fill(255, 255, 255, 240);
    stroke('#9B59B6');
    strokeWeight(2);
    rect(px, py, pw, ph, 10);

    let accel = selectedForce / selectedMass;

    fill('#333');
    noStroke();
    textSize(16);
    textAlign(LEFT, CENTER);
    text('F = ma  →  ' + selectedForce + ' N = ' + selectedMass.toFixed(1) + ' kg × a', px + 15, py + 18);
    text('a = F/m = ' + selectedForce + '/' + selectedMass.toFixed(1) + ' = ' + accel.toFixed(2) + ' m/s²', px + 15, py + 38);

    // Key insights panel
    let ix = 470;
    let iy = 440;
    let iw = 380;

    fill(255, 255, 255, 240);
    stroke('#27AE60');
    strokeWeight(2);
    rect(ix, iy, iw, ph, 10);

    fill('#27AE60');
    textSize(14);
    textAlign(LEFT, TOP);
    text('Key Insights:', ix + 10, iy + 8);

    fill('#333');
    textSize(12);
    text('• More force → more acceleration (linear)', ix + 10, iy + 28);
    text('• More mass → less acceleration (inverse)', ix + 200, iy + 28);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    forceSlider.size(Math.min(200, canvasWidth - 360));
    massSlider.size(Math.min(200, canvasWidth - 360));
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.min(container.offsetWidth, 900);
    }
}
