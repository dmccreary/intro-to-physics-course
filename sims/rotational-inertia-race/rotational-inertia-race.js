// Rotational Inertia Comparison MicroSim
// Race different shapes down an incline to compare rotational inertia effects

let canvasWidth = 900;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Ramp parameters
let rampAngle = 30;
let rampLength = 450;
let rampStartX = 100;
let rampStartY = 120;

// Objects configuration
const objects = [
    { name: 'Solid Sphere', I_factor: 0.4, color: null, position: 0, velocity: 0, icon: '●' },
    { name: 'Solid Cylinder', I_factor: 0.5, color: null, position: 0, velocity: 0, icon: '◯' },
    { name: 'Hollow Sphere', I_factor: 0.667, color: null, position: 0, velocity: 0, icon: '○' },
    { name: 'Hoop/Ring', I_factor: 1.0, color: null, position: 0, velocity: 0, icon: '◎' }
];

// Simulation state
let isRacing = false;
let raceFinished = false;
let finishOrder = [];
let animTime = 0;

// Physics
let g = 9.8;
let objectRadius = 25;
let mass = 1.0;

// UI elements
let angleSlider;
let raceButton;
let resetButton;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Initialize colors
    objects[0].color = color(220, 70, 70);   // Red - Solid Sphere
    objects[1].color = color(70, 130, 220);  // Blue - Solid Cylinder
    objects[2].color = color(70, 180, 70);   // Green - Hollow Sphere
    objects[3].color = color(220, 180, 70);  // Yellow - Hoop

    // Create controls
    angleSlider = createSlider(10, 60, 30, 1);
    angleSlider.position(130, drawHeight + 25);
    angleSlider.size(150);
    angleSlider.input(() => {
        rampAngle = angleSlider.value();
        resetRace();
    });

    raceButton = createButton('Start Race');
    raceButton.position(350, drawHeight + 22);
    raceButton.size(100, 30);
    raceButton.mousePressed(startRace);

    resetButton = createButton('Reset');
    resetButton.position(460, drawHeight + 22);
    resetButton.size(80, 30);
    resetButton.mousePressed(resetRace);

    resetRace();

    describe('Race simulation comparing how different shapes roll down an incline based on their rotational inertia', LABEL);
}

function draw() {
    updateCanvasSize();

    // Update physics
    if (isRacing && !raceFinished) {
        updatePhysics();
    }

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill(248, 248, 248);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    textSize(22);
    textAlign(CENTER, TOP);
    noStroke();
    text('Rotational Inertia Race', canvasWidth / 2, 10);

    // Draw components
    drawRamp();
    drawObjects();
    drawInfoPanel();
    drawResultsPanel();
    drawControlLabels();
}

function drawRamp() {
    let endX = rampStartX + rampLength * cos(radians(rampAngle));
    let endY = rampStartY + rampLength * sin(radians(rampAngle));

    // Ramp shadow
    fill(200);
    noStroke();
    beginShape();
    vertex(rampStartX, rampStartY + 5);
    vertex(endX, endY + 5);
    vertex(endX, endY + 20);
    vertex(rampStartX, rampStartY + 20);
    endShape(CLOSE);

    // Ramp surface
    stroke(100);
    strokeWeight(4);
    line(rampStartX, rampStartY, endX, endY);

    // Ramp support
    strokeWeight(2);
    line(rampStartX, rampStartY, rampStartX, endY + 15);
    line(endX - 5, endY + 15, rampStartX + 5, endY + 15);

    // Start line
    stroke(50, 200, 50);
    strokeWeight(2);
    let startLineX = rampStartX + 40;
    let startLineY = rampStartY + 40 * tan(radians(rampAngle));
    push();
    translate(startLineX, startLineY);
    rotate(radians(rampAngle));
    line(0, -40, 0, 40);
    pop();

    // Finish line
    stroke(200, 50, 50);
    strokeWeight(2);
    let finishLineX = endX - 20;
    let finishLineY = endY - 20 * tan(radians(rampAngle));
    push();
    translate(finishLineX, finishLineY);
    rotate(radians(rampAngle));
    line(0, -40, 0, 40);
    pop();

    // Labels
    fill(50, 200, 50);
    textSize(12);
    textAlign(CENTER, BOTTOM);
    noStroke();
    text('START', startLineX, startLineY - 45);

    fill(200, 50, 50);
    text('FINISH', finishLineX, finishLineY - 45);

    // Angle indicator
    noFill();
    stroke(150);
    strokeWeight(1);
    arc(rampStartX, rampStartY + rampLength * sin(radians(rampAngle)),
        60, 60, -radians(rampAngle), 0);

    fill(100);
    textSize(11);
    noStroke();
    text(rampAngle + '°', rampStartX + 40, rampStartY + rampLength * sin(radians(rampAngle)) - 10);
}

function drawObjects() {
    let startOffset = 40;
    let rampEnd = rampLength - 20;

    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        let pos = startOffset + obj.position;

        // Calculate position on ramp
        let x = rampStartX + pos * cos(radians(rampAngle));
        let y = rampStartY + pos * sin(radians(rampAngle));

        // Offset each object vertically so they don't overlap
        let laneOffset = (i - 1.5) * 15;
        let perpX = -sin(radians(rampAngle)) * laneOffset;
        let perpY = cos(radians(rampAngle)) * laneOffset;

        x += perpX;
        y += perpY;

        // Calculate rotation angle
        let rotations = obj.position / (2 * PI * objectRadius);
        let rotAngle = rotations * TWO_PI;

        // Draw object
        push();
        translate(x, y - objectRadius);

        // Draw shadow
        fill(0, 0, 0, 30);
        noStroke();
        ellipse(5, objectRadius + 3, objectRadius * 2, objectRadius * 0.5);

        // Draw the rolling object
        rotate(rotAngle);

        fill(obj.color);
        stroke(red(obj.color) * 0.7, green(obj.color) * 0.7, blue(obj.color) * 0.7);
        strokeWeight(2);
        ellipse(0, 0, objectRadius * 2, objectRadius * 2);

        // Draw radial lines to show rotation
        stroke(255, 255, 255, 150);
        strokeWeight(2);
        for (let j = 0; j < 4; j++) {
            let lineAngle = j * PI / 2;
            let r1 = obj.I_factor < 0.6 ? objectRadius * 0.3 : objectRadius * 0.7;
            line(r1 * cos(lineAngle), r1 * sin(lineAngle),
                 objectRadius * 0.9 * cos(lineAngle), objectRadius * 0.9 * sin(lineAngle));
        }

        // Center point or hole for different types
        if (obj.I_factor >= 0.6) {
            fill(240);
            noStroke();
            ellipse(0, 0, objectRadius * 0.6, objectRadius * 0.6);
        } else {
            fill(255);
            noStroke();
            ellipse(0, 0, 8, 8);
        }

        pop();

        // Draw finish position indicator
        if (finishOrder.includes(i)) {
            let place = finishOrder.indexOf(i) + 1;
            fill(255, 215, 0);
            stroke(0);
            strokeWeight(1);
            textSize(16);
            textAlign(CENTER, CENTER);
            text(place, x + 30, y - objectRadius);
        }
    }
}

function drawInfoPanel() {
    let panelX = canvasWidth - 260;
    let panelY = 50;
    let panelW = 240;
    let panelH = 200;

    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    fill(0);
    textSize(14);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    noStroke();
    text('Rotational Inertia (I = factor × mR²)', panelX + panelW/2, panelY + 10);
    textStyle(NORMAL);

    textSize(12);
    textAlign(LEFT, TOP);
    let y = panelY + 35;

    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];

        fill(obj.color);
        ellipse(panelX + 20, y + 8, 16, 16);

        fill(40);
        text(obj.name, panelX + 35, y);
        text('I = ' + obj.I_factor.toFixed(2) + ' mR²', panelX + 35, y + 15);

        y += 40;
    }
}

function drawResultsPanel() {
    let panelX = canvasWidth - 260;
    let panelY = 270;
    let panelW = 240;
    let panelH = 130;

    fill(255, 255, 240, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    fill(0);
    textSize(14);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    noStroke();
    text('Race Results', panelX + panelW/2, panelY + 10);
    textStyle(NORMAL);

    if (finishOrder.length > 0) {
        textSize(12);
        textAlign(LEFT, TOP);
        let y = panelY + 35;

        for (let i = 0; i < finishOrder.length; i++) {
            let obj = objects[finishOrder[i]];
            let medal = i === 0 ? '🥇' : (i === 1 ? '🥈' : (i === 2 ? '🥉' : '  '));

            fill(40);
            text(medal + ' ' + (i + 1) + '. ' + obj.name, panelX + 15, y);
            y += 22;
        }
    } else {
        fill(100);
        textSize(12);
        textAlign(CENTER, CENTER);
        text('Press "Start Race" to begin', panelX + panelW/2, panelY + panelH/2);
    }

    // Explanation
    if (raceFinished) {
        fill(80);
        textSize(10);
        textAlign(CENTER, BOTTOM);
        text('Lower I/mR² ratio = faster acceleration', panelX + panelW/2, panelY + panelH - 5);
    }
}

function drawControlLabels() {
    fill('black');
    textSize(14);
    textAlign(LEFT, CENTER);
    noStroke();

    text('Ramp Angle: ' + rampAngle + '°', 10, drawHeight + 38);
}

function updatePhysics() {
    let dt = deltaTime / 1000;
    dt = min(dt, 0.05); // Cap delta time

    let sinTheta = sin(radians(rampAngle));
    let rampEnd = rampLength - 60;

    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];

        if (obj.position < rampEnd) {
            // Calculate acceleration: a = g sin θ / (1 + I/mr²)
            let acceleration = (g * sinTheta) / (1 + obj.I_factor);
            acceleration *= 50; // Scale for pixels

            obj.velocity += acceleration * dt;
            obj.position += obj.velocity * dt;

            // Check finish
            if (obj.position >= rampEnd && !finishOrder.includes(i)) {
                finishOrder.push(i);
                obj.position = rampEnd;

                if (finishOrder.length === objects.length) {
                    raceFinished = true;
                    isRacing = false;
                    raceButton.html('Race Again');
                }
            }
        }
    }

    animTime += dt;
}

function startRace() {
    if (raceFinished) {
        resetRace();
    }
    isRacing = true;
    raceButton.html('Racing...');
}

function resetRace() {
    isRacing = false;
    raceFinished = false;
    finishOrder = [];
    animTime = 0;

    for (let obj of objects) {
        obj.position = 0;
        obj.velocity = 0;
    }

    raceButton.html('Start Race');
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    angleSlider.position(130, drawHeight + 25);
    raceButton.position(350, drawHeight + 22);
    resetButton.position(460, drawHeight + 22);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(700, container.offsetWidth);
    }
}
