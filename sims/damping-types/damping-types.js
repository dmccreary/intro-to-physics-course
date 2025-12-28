// Types of Damping Comparison Graph
// Shows underdamped, critically damped, and overdamped responses

let canvasWidth = 750;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Simulation parameters
let omega0 = 2;  // Natural frequency
let A0 = 1.0;    // Initial displacement

// Damping levels
let dampingLevels = {
    underdamped: 0.15,
    critical: 1.0,
    overdamped: 2.5
};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    describe('Line graph comparing underdamped, critically damped, and overdamped oscillator responses over time', LABEL);
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
    textSize(20);
    textAlign(CENTER, TOP);
    noStroke();
    text('Comparison of Damping Types in Oscillating Systems', canvasWidth / 2, 12);

    // Draw graph
    drawDampingGraph(70, 60, canvasWidth - 120, 330);

    // Instructions
    fill(80);
    textSize(13);
    textAlign(CENTER, CENTER);
    text('All three cases start with same initial displacement. Hover over curves for details.', canvasWidth / 2, drawHeight + 25);
}

function drawDampingGraph(x, y, w, h) {
    // Background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(x - 50, y - 20, w + 70, h + 50, 5);

    // Axis labels
    fill(60);
    textSize(13);
    textAlign(CENTER, TOP);
    noStroke();
    text('Time (seconds)', x + w/2, y + h + 25);

    push();
    translate(x - 40, y + h/2);
    rotate(-PI/2);
    textAlign(CENTER, BOTTOM);
    text('Displacement (m)', 0, 0);
    pop();

    // Grid
    stroke(230);
    strokeWeight(1);

    // Vertical grid lines (time)
    for (let t = 0; t <= 10; t += 2) {
        let px = x + (t / 10) * w;
        line(px, y, px, y + h);
    }

    // Horizontal grid lines
    for (let d = -1; d <= 1; d += 0.5) {
        let py = y + h/2 - (d / 1.2) * (h/2);
        line(x, py, x + w, py);
    }

    // Axes
    stroke(100);
    strokeWeight(2);
    line(x, y + h/2, x + w, y + h/2);  // Zero line
    line(x, y, x, y + h);  // Y-axis

    // Axis values
    fill(100);
    textSize(10);
    textAlign(CENTER, TOP);
    noStroke();
    for (let t = 0; t <= 10; t += 2) {
        let px = x + (t / 10) * w;
        text(t, px, y + h + 5);
    }

    textAlign(RIGHT, CENTER);
    for (let d = -1; d <= 1; d += 0.5) {
        let py = y + h/2 - (d / 1.2) * (h/2);
        text(d.toFixed(1), x - 8, py);
    }

    // Draw curves
    drawDampedCurve(x, y, w, h, dampingLevels.underdamped, color(70, 130, 220), 'Underdamped');
    drawDampedCurve(x, y, w, h, dampingLevels.critical, color(50, 180, 50), 'Critically Damped');
    drawDampedCurve(x, y, w, h, dampingLevels.overdamped, color(230, 150, 50), 'Overdamped');

    // Equilibrium label
    fill(100);
    textSize(10);
    textAlign(RIGHT, BOTTOM);
    text('Equilibrium', x + w - 5, y + h/2 - 3);

    // Legend
    drawLegend(x + w - 180, y + 10);

    // Annotations
    drawAnnotations(x, y, w, h);
}

function drawDampedCurve(x, y, w, h, zeta, col, name) {
    let points = [];
    let tMax = 10;
    let dt = 0.02;

    for (let t = 0; t <= tMax; t += dt) {
        let displacement;

        if (zeta < 1) {
            // Underdamped
            let omegaD = omega0 * sqrt(1 - zeta * zeta);
            displacement = A0 * exp(-zeta * omega0 * t) * cos(omegaD * t);
        } else if (zeta === 1) {
            // Critically damped
            displacement = A0 * (1 + omega0 * t) * exp(-omega0 * t);
        } else {
            // Overdamped
            let alpha1 = omega0 * (zeta + sqrt(zeta * zeta - 1));
            let alpha2 = omega0 * (zeta - sqrt(zeta * zeta - 1));
            let c1 = A0 * alpha1 / (alpha1 - alpha2);
            let c2 = -A0 * alpha2 / (alpha1 - alpha2);
            displacement = c1 * exp(-alpha2 * t) + c2 * exp(-alpha1 * t);
        }

        let px = x + (t / tMax) * w;
        let py = y + h/2 - (displacement / 1.2) * (h/2);
        points.push({ x: px, y: py });
    }

    // Draw curve
    noFill();
    stroke(col);
    strokeWeight(3);
    beginShape();
    for (let pt of points) {
        vertex(pt.x, pt.y);
    }
    endShape();

    // Check for hover
    let isHovered = false;
    for (let pt of points) {
        if (dist(mouseX, mouseY, pt.x, pt.y) < 10) {
            isHovered = true;
            break;
        }
    }

    // Draw envelope for underdamped
    if (zeta < 1 && isHovered) {
        stroke(red(col), green(col), blue(col), 100);
        strokeWeight(1);
        setLineDash([5, 5]);
        noFill();
        beginShape();
        for (let t = 0; t <= tMax; t += 0.1) {
            let env = A0 * exp(-zeta * omega0 * t);
            let px = x + (t / tMax) * w;
            let py = y + h/2 - (env / 1.2) * (h/2);
            vertex(px, py);
        }
        endShape();
        beginShape();
        for (let t = 0; t <= tMax; t += 0.1) {
            let env = -A0 * exp(-zeta * omega0 * t);
            let px = x + (t / tMax) * w;
            let py = y + h/2 - (env / 1.2) * (h/2);
            vertex(px, py);
        }
        endShape();
        setLineDash([]);
    }
}

function drawLegend(x, y) {
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(x, y, 170, 95, 5);

    textSize(11);
    textAlign(LEFT, CENTER);
    noStroke();

    // Underdamped
    stroke(70, 130, 220);
    strokeWeight(3);
    line(x + 10, y + 20, x + 35, y + 20);
    noStroke();
    fill(40);
    text('Underdamped (ζ < 1)', x + 42, y + 20);

    // Critical
    stroke(50, 180, 50);
    strokeWeight(3);
    line(x + 10, y + 45, x + 35, y + 45);
    noStroke();
    fill(40);
    text('Critically Damped (ζ = 1)', x + 42, y + 45);

    // Overdamped
    stroke(230, 150, 50);
    strokeWeight(3);
    line(x + 10, y + 70, x + 35, y + 70);
    noStroke();
    fill(40);
    text('Overdamped (ζ > 1)', x + 42, y + 70);
}

function drawAnnotations(x, y, w, h) {
    textSize(10);
    noStroke();

    // Underdamped annotation
    fill(70, 130, 220);
    textAlign(LEFT, CENTER);
    text('Oscillates with', x + 20, y + 50);
    text('decreasing amplitude', x + 20, y + 62);

    // Critical annotation
    fill(50, 180, 50);
    text('Fastest return', x + w * 0.35, y + h - 60);
    text('without overshoot', x + w * 0.35, y + h - 48);

    // Overdamped annotation
    fill(230, 150, 50);
    textAlign(RIGHT, CENTER);
    text('Slow return,', x + w - 20, y + h * 0.6);
    text('no oscillation', x + w - 20, y + h * 0.6 + 12);
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(600, container.offsetWidth);
    }
}
