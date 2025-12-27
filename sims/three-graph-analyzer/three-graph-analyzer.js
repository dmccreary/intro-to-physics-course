// Three-Graph Motion Analyzer: Connecting x-t, v-t, and a-t Graphs
// Shows relationships between position, velocity, and acceleration graphs

let canvasWidth = 1000;
let drawHeight = 600;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// Graph parameters
let graphH = 150;
let timeMax = 10;
let time = 0;
let isPlaying = true;
let animationSpeed = 0.03;

// Selected motion type
let selectedMotion = 0;
let motions;

// UI Controls
let motionSelect;
let playButton;
let resetButton;
let showRelationshipsCheckbox;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    motions = [
        {
            name: "At Rest",
            position: (t) => 5,
            velocity: (t) => 0,
            acceleration: (t) => 0
        },
        {
            name: "Constant Velocity (+)",
            position: (t) => 5 * t,
            velocity: (t) => 5,
            acceleration: (t) => 0
        },
        {
            name: "Constant Velocity (-)",
            position: (t) => 40 - 4 * t,
            velocity: (t) => -4,
            acceleration: (t) => 0
        },
        {
            name: "Constant Acceleration (+)",
            position: (t) => 0.5 * 2 * t * t,
            velocity: (t) => 2 * t,
            acceleration: (t) => 2
        },
        {
            name: "Constant Acceleration (-)",
            position: (t) => 50 + 5 * t - 0.5 * t * t,
            velocity: (t) => 5 - t,
            acceleration: (t) => -1
        },
        {
            name: "Accel → Coast → Decel",
            position: (t) => {
                if (t < 3) return 0.5 * 3 * t * t;
                else if (t < 7) return 13.5 + 9 * (t - 3);
                else return 49.5 + 9 * (t - 7) - 0.5 * 3 * (t - 7) * (t - 7);
            },
            velocity: (t) => {
                if (t < 3) return 3 * t;
                else if (t < 7) return 9;
                else return 9 - 3 * (t - 7);
            },
            acceleration: (t) => {
                if (t < 3) return 3;
                else if (t < 7) return 0;
                else return -3;
            }
        }
    ];

    // Create controls
    motionSelect = createSelect();
    motionSelect.position(margin, drawHeight + 15);
    for (let m of motions) {
        motionSelect.option(m.name);
    }
    motionSelect.changed(() => {
        selectedMotion = motions.findIndex(m => m.name === motionSelect.value());
        time = 0;
    });
    motionSelect.style('font-size', '13px');

    playButton = createButton('Pause');
    playButton.position(200, drawHeight + 12);
    playButton.mousePressed(togglePlay);
    playButton.style('font-size', '14px');
    playButton.style('padding', '6px 16px');

    resetButton = createButton('Reset');
    resetButton.position(270, drawHeight + 12);
    resetButton.mousePressed(resetAnimation);
    resetButton.style('font-size', '14px');
    resetButton.style('padding', '6px 16px');

    showRelationshipsCheckbox = createCheckbox('Show Relationships', true);
    showRelationshipsCheckbox.position(350, drawHeight + 15);
    showRelationshipsCheckbox.style('font-size', '13px');

    describe('Three synchronized graphs showing position, velocity, and acceleration over time with relationship annotations.', LABEL);
}

function draw() {
    updateCanvasSize();

    // Background
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
    text('Three-Graph Motion Analyzer: Connecting x-t, v-t, and a-t', canvasWidth / 2, 8);

    let motion = motions[selectedMotion];

    // Graph layout
    let graphX = 80;
    let graphW = canvasWidth - 280;
    let spacing = 15;

    let y1 = 45;
    let y2 = y1 + graphH + spacing;
    let y3 = y2 + graphH + spacing;

    // Draw three graphs
    drawPositionGraph(graphX, y1, graphW, graphH, motion);
    drawVelocityGraph(graphX, y2, graphW, graphH, motion);
    drawAccelerationGraph(graphX, y3, graphW, graphH, motion);

    // Draw relationship annotations
    if (showRelationshipsCheckbox.checked()) {
        drawRelationships(graphX, y1, graphW, graphH, spacing, motion);
    }

    // Draw info panel
    drawInfoPanel(canvasWidth - 180, y1, 165, y3 + graphH - y1, motion);

    // Update time
    if (isPlaying) {
        time += animationSpeed;
        if (time > timeMax) time = 0;
    }

    // Time display
    fill(0);
    textSize(12);
    textAlign(LEFT, CENTER);
    text('t = ' + time.toFixed(1) + ' s', 520, drawHeight + 25);
}

function drawPositionGraph(x, y, w, h, motion) {
    // Background
    fill(255);
    stroke(180);
    rect(x, y, w, h);

    // Grid
    drawGrid(x, y, w, h, timeMax, 50, -10);

    // Label
    fill(0, 100, 200);
    textSize(14);
    textAlign(CENTER, TOP);
    text('Position vs Time', x + w / 2, y + 3);

    push();
    translate(x - 35, y + h / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    textSize(12);
    text('x (m)', 0, 0);
    pop();

    // Calculate y-range
    let maxPos = 0;
    for (let t = 0; t <= timeMax; t += 0.5) {
        maxPos = max(maxPos, abs(motion.position(t)));
    }
    maxPos = max(maxPos, 10) * 1.2;

    // Draw curve
    stroke(0, 100, 200);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let t = 0; t <= timeMax; t += 0.1) {
        let pos = motion.position(t);
        let px = map(t, 0, timeMax, x, x + w);
        let py = map(pos, 0, maxPos, y + h, y);
        vertex(px, py);
    }
    endShape();

    // Current marker
    let currentPos = motion.position(time);
    let mx = map(time, 0, timeMax, x, x + w);
    let my = map(currentPos, 0, maxPos, y + h, y);
    fill(0, 100, 200);
    noStroke();
    ellipse(mx, my, 10, 10);

    // Vertical time line
    stroke(150, 150, 150, 150);
    strokeWeight(1);
    line(mx, y, mx, y + h);
}

function drawVelocityGraph(x, y, w, h, motion) {
    fill(255);
    stroke(180);
    rect(x, y, w, h);

    // Label
    fill(0, 180, 0);
    textSize(14);
    textAlign(CENTER, TOP);
    text('Velocity vs Time', x + w / 2, y + 3);

    push();
    translate(x - 35, y + h / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    textSize(12);
    text('v (m/s)', 0, 0);
    pop();

    // Calculate range
    let maxVel = 0;
    for (let t = 0; t <= timeMax; t += 0.5) {
        maxVel = max(maxVel, abs(motion.velocity(t)));
    }
    maxVel = max(maxVel, 5) * 1.2;

    // Zero line
    let zeroY = map(0, -maxVel, maxVel, y + h, y);
    stroke(150);
    strokeWeight(1);
    line(x, zeroY, x + w, zeroY);

    // Grid
    stroke(230);
    for (let t = 0; t <= timeMax; t++) {
        let px = map(t, 0, timeMax, x, x + w);
        line(px, y, px, y + h);
    }

    // Draw curve
    stroke(0, 180, 0);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let t = 0; t <= timeMax; t += 0.1) {
        let vel = motion.velocity(t);
        let px = map(t, 0, timeMax, x, x + w);
        let py = map(vel, -maxVel, maxVel, y + h, y);
        vertex(px, py);
    }
    endShape();

    // Shade area (displacement)
    fill(0, 180, 0, 40);
    noStroke();
    beginShape();
    vertex(x, zeroY);
    for (let t = 0; t <= time; t += 0.1) {
        let vel = motion.velocity(t);
        let px = map(t, 0, timeMax, x, x + w);
        let py = map(vel, -maxVel, maxVel, y + h, y);
        vertex(px, py);
    }
    let mx = map(time, 0, timeMax, x, x + w);
    vertex(mx, zeroY);
    endShape(CLOSE);

    // Current marker
    let currentVel = motion.velocity(time);
    let my = map(currentVel, -maxVel, maxVel, y + h, y);
    fill(0, 180, 0);
    noStroke();
    ellipse(mx, my, 10, 10);

    // Vertical line
    stroke(150, 150, 150, 150);
    strokeWeight(1);
    line(mx, y, mx, y + h);
}

function drawAccelerationGraph(x, y, w, h, motion) {
    fill(255);
    stroke(180);
    rect(x, y, w, h);

    // Label
    fill(200, 50, 50);
    textSize(14);
    textAlign(CENTER, TOP);
    text('Acceleration vs Time', x + w / 2, y + 3);

    push();
    translate(x - 35, y + h / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    textSize(12);
    text('a (m/s\u00B2)', 0, 0);
    pop();

    // Calculate range
    let maxAcc = 0;
    for (let t = 0; t <= timeMax; t += 0.5) {
        maxAcc = max(maxAcc, abs(motion.acceleration(t)));
    }
    maxAcc = max(maxAcc, 2) * 1.3;

    // Zero line
    let zeroY = map(0, -maxAcc, maxAcc, y + h, y);
    stroke(150);
    strokeWeight(1);
    line(x, zeroY, x + w, zeroY);

    // Grid
    stroke(230);
    for (let t = 0; t <= timeMax; t++) {
        let px = map(t, 0, timeMax, x, x + w);
        line(px, y, px, y + h);
    }

    // Draw curve
    stroke(200, 50, 50);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let t = 0; t <= timeMax; t += 0.1) {
        let acc = motion.acceleration(t);
        let px = map(t, 0, timeMax, x, x + w);
        let py = map(acc, -maxAcc, maxAcc, y + h, y);
        vertex(px, py);
    }
    endShape();

    // Current marker
    let mx = map(time, 0, timeMax, x, x + w);
    let currentAcc = motion.acceleration(time);
    let my = map(currentAcc, -maxAcc, maxAcc, y + h, y);
    fill(200, 50, 50);
    noStroke();
    ellipse(mx, my, 10, 10);

    // Vertical line
    stroke(150, 150, 150, 150);
    strokeWeight(1);
    line(mx, y, mx, y + h);
}

function drawGrid(x, y, w, h, xMax, yMax, yMin) {
    stroke(230);
    strokeWeight(1);
    for (let t = 0; t <= xMax; t++) {
        let px = map(t, 0, xMax, x, x + w);
        line(px, y, px, y + h);
    }
}

function drawRelationships(x, y1, w, h, spacing, motion) {
    let y2 = y1 + h + spacing;
    let y3 = y2 + h + spacing;
    let mx = map(time, 0, timeMax, x, x + w);

    // Annotation arrows between graphs
    stroke(100);
    strokeWeight(1);

    // Between x-t and v-t
    let arrowX = x + w + 15;
    drawBrace(arrowX, y1 + h / 2, arrowX, y2 + h / 2, 'Slope of x-t = v');

    // Between v-t and a-t
    drawBrace(arrowX, y2 + h / 2, arrowX, y3 + h / 2, 'Slope of v-t = a');

    // Area annotations
    fill(0, 180, 0, 100);
    textSize(10);
    textAlign(LEFT, CENTER);
    text('Area = \u0394x', x + 5, y2 + h - 15);
}

function drawBrace(x1, y1, x2, y2, label) {
    let midY = (y1 + y2) / 2;

    stroke(100);
    strokeWeight(1);
    // Vertical line
    line(x1, y1, x1, y2);
    // Horizontal ticks
    line(x1, y1, x1 - 5, y1);
    line(x1, y2, x1 - 5, y2);
    // Arrow to label
    line(x1, midY, x1 + 10, midY);

    // Label
    fill(80);
    noStroke();
    textSize(10);
    textAlign(LEFT, CENTER);
    text(label, x1 + 12, midY);
}

function drawInfoPanel(x, y, w, h, motion) {
    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 10);

    let currentPos = motion.position(time);
    let currentVel = motion.velocity(time);
    let currentAcc = motion.acceleration(time);

    fill(0);
    textSize(13);
    textAlign(CENTER, TOP);
    text('Values at t = ' + time.toFixed(1) + 's', x + w / 2, y + 10);

    let lineY = y + 40;
    let lineH = 28;
    textAlign(LEFT, TOP);
    textSize(12);

    fill(0, 100, 200);
    text('Position:', x + 10, lineY);
    textAlign(RIGHT, TOP);
    text(currentPos.toFixed(1) + ' m', x + w - 10, lineY);
    lineY += lineH;

    textAlign(LEFT, TOP);
    fill(0, 180, 0);
    text('Velocity:', x + 10, lineY);
    textAlign(RIGHT, TOP);
    text(currentVel.toFixed(1) + ' m/s', x + w - 10, lineY);
    lineY += lineH;

    textAlign(LEFT, TOP);
    fill(200, 50, 50);
    text('Acceleration:', x + 10, lineY);
    textAlign(RIGHT, TOP);
    text(currentAcc.toFixed(2) + ' m/s\u00B2', x + w - 10, lineY);
    lineY += lineH + 15;

    // Motion description
    textAlign(CENTER, TOP);
    fill(80);
    textSize(11);
    let desc = getMotionDescription(currentVel, currentAcc);
    text(desc, x + w / 2, lineY, w - 20, 80);

    // Key relationships
    lineY = y + h - 120;
    stroke(200);
    line(x + 10, lineY, x + w - 10, lineY);
    lineY += 10;

    fill(0);
    textSize(11);
    textAlign(CENTER, TOP);
    text('Key Relationships:', x + w / 2, lineY);
    lineY += 18;

    textAlign(LEFT, TOP);
    textSize(10);
    fill(60);
    text('v = slope of x-t', x + 10, lineY);
    lineY += 16;
    text('a = slope of v-t', x + 10, lineY);
    lineY += 16;
    text('\u0394x = area under v-t', x + 10, lineY);
    lineY += 16;
    text('\u0394v = area under a-t', x + 10, lineY);
}

function getMotionDescription(vel, acc) {
    if (abs(vel) < 0.1 && abs(acc) < 0.1) {
        return "At rest";
    } else if (abs(acc) < 0.1) {
        return vel > 0 ? "Moving forward at constant speed" : "Moving backward at constant speed";
    } else if (vel >= 0 && acc > 0) {
        return "Speeding up in + direction";
    } else if (vel >= 0 && acc < 0) {
        return "Slowing down (moving +)";
    } else if (vel < 0 && acc < 0) {
        return "Speeding up in - direction";
    } else {
        return "Slowing down (moving -)";
    }
}

function togglePlay() {
    isPlaying = !isPlaying;
    playButton.html(isPlaying ? 'Pause' : 'Play');
}

function resetAnimation() {
    time = 0;
    isPlaying = true;
    playButton.html('Pause');
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 1100);
    }
}
