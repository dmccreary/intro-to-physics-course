// Interactive Torque Diagram with Forces
// Demonstrates how torque depends on force magnitude, position, and angle

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Lever parameters
let leverLength = 400;
let leverY = 250;
let pivotX = 150;

// Force configurations
let forces = [
    { x: 0.7, angle: 90, magnitude: 50, color: null, name: 'F₁' },
    { x: 0.5, angle: 45, magnitude: 50, color: null, name: 'F₂' },
    { x: 0.3, angle: 0, magnitude: 50, color: null, name: 'F₃' },
    { x: 0.9, angle: 90, magnitude: 50, color: null, name: 'F₄' }
];

// UI elements
let forceSliders = [];
let angleSliders = [];
let showPerpCheckbox;
let selectedForce = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Initialize colors
    forces[0].color = color(70, 130, 200);  // Blue
    forces[1].color = color(200, 130, 70);  // Orange
    forces[2].color = color(130, 70, 200);  // Purple
    forces[3].color = color(70, 180, 130);  // Teal

    // Create controls
    let controlY = drawHeight + 15;

    // Force magnitude slider
    forceSliders[0] = createSlider(10, 100, 50, 1);
    forceSliders[0].position(100, controlY);
    forceSliders[0].size(120);
    forceSliders[0].input(() => forces[selectedForce].magnitude = forceSliders[0].value());

    // Angle slider
    angleSliders[0] = createSlider(0, 180, 90, 1);
    angleSliders[0].position(320, controlY);
    angleSliders[0].size(120);
    angleSliders[0].input(() => forces[selectedForce].angle = angleSliders[0].value());

    // Position slider
    let posSlider = createSlider(0.1, 1.0, 0.7, 0.05);
    posSlider.position(540, controlY);
    posSlider.size(120);
    posSlider.input(() => forces[selectedForce].x = posSlider.value());
    forceSliders[1] = posSlider;

    // Show perpendicular checkbox
    showPerpCheckbox = createCheckbox(' Show perpendicular lines', true);
    showPerpCheckbox.position(100, controlY + 45);

    // Force selector buttons
    for (let i = 0; i < 4; i++) {
        let btn = createButton('F' + (i + 1));
        btn.position(700 + i * 35, controlY + 5);
        btn.size(30, 25);
        btn.mousePressed(() => selectForce(i));
    }

    describe('Interactive diagram showing how torque depends on force magnitude, position, and angle relative to the lever arm', LABEL);
}

function selectForce(index) {
    selectedForce = index;
    forceSliders[0].value(forces[index].magnitude);
    angleSliders[0].value(forces[index].angle);
    forceSliders[1].value(forces[index].x);
}

function draw() {
    updateCanvasSize();

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
    text('Interactive Torque Diagram', canvasWidth / 2, 10);

    // Draw lever system
    drawLever();
    drawForces();
    drawTorqueInfo();
    drawControlLabels();
    drawFormula();
}

function drawLever() {
    // Lever bar
    stroke(100);
    strokeWeight(8);
    line(pivotX, leverY, pivotX + leverLength, leverY);

    // Pivot point
    fill(50);
    noStroke();
    ellipse(pivotX, leverY, 20, 20);

    // Pivot label
    fill(80);
    textSize(14);
    textAlign(CENTER, TOP);
    text('Pivot', pivotX, leverY + 15);

    // Distance markers
    stroke(180);
    strokeWeight(1);
    setLineDash([3, 3]);
    line(pivotX, leverY + 40, pivotX + leverLength, leverY + 40);
    setLineDash([]);

    // Distance labels
    fill(100);
    textSize(11);
    for (let i = 0; i <= 4; i++) {
        let x = pivotX + (leverLength * i / 4);
        stroke(180);
        line(x, leverY + 35, x, leverY + 45);
        noStroke();
        text((i * 25) + '%', x, leverY + 48);
    }
}

function drawForces() {
    let showPerp = showPerpCheckbox.checked();

    for (let i = 0; i < forces.length; i++) {
        let f = forces[i];
        let forceX = pivotX + f.x * leverLength;
        let angleRad = radians(f.angle);

        // Calculate force components
        let fx = f.magnitude * cos(angleRad) * 0.8;
        let fy = -f.magnitude * sin(angleRad) * 0.8;

        // Draw perpendicular distance line
        if (showPerp && f.angle !== 0 && f.angle !== 180) {
            let perpDist = f.x * leverLength * sin(angleRad);
            stroke(red(f.color), green(f.color), blue(f.color), 100);
            strokeWeight(1);
            setLineDash([4, 4]);

            // Line from pivot to force line
            let extendedX = forceX + fx * 3;
            let extendedY = leverY + fy * 3;

            // Calculate perpendicular foot
            let dx = extendedX - forceX;
            let dy = extendedY - leverY;
            let t = -((forceX - pivotX) * dx + (leverY - leverY) * dy) / (dx * dx + dy * dy);

            if (t > -2 && t < 2) {
                let footX = forceX + t * dx;
                let footY = leverY + t * dy;

                line(pivotX, leverY, footX, footY);

                // Show perpendicular distance value
                noStroke();
                fill(f.color);
                textSize(10);
                let midX = (pivotX + footX) / 2;
                let midY = (leverY + footY) / 2 - 10;
                text('r⊥=' + (f.x * 100 * sin(angleRad)).toFixed(0) + '%', midX, midY);
            }
            setLineDash([]);
        }

        // Draw force vector
        stroke(f.color);
        strokeWeight(3);
        line(forceX, leverY, forceX + fx, leverY + fy);

        // Arrowhead
        push();
        translate(forceX + fx, leverY + fy);
        rotate(atan2(fy, fx));
        fill(f.color);
        noStroke();
        triangle(0, 0, -12, -5, -12, 5);
        pop();

        // Force label
        noStroke();
        fill(f.color);
        textSize(14);
        textAlign(CENTER, CENTER);
        text(f.name, forceX + fx * 1.3, leverY + fy * 1.3);

        // Angle arc
        if (f.angle > 0 && f.angle < 180) {
            noFill();
            stroke(f.color);
            strokeWeight(1);
            let arcRadius = 25;
            arc(forceX, leverY, arcRadius * 2, arcRadius * 2, -radians(f.angle), 0);

            // Angle label
            noStroke();
            fill(f.color);
            textSize(10);
            let labelAngle = -radians(f.angle / 2);
            text(f.angle + '°', forceX + 35 * cos(labelAngle), leverY + 35 * sin(labelAngle));
        }

        // Highlight selected force
        if (i === selectedForce) {
            noFill();
            stroke(255, 200, 0);
            strokeWeight(2);
            ellipse(forceX, leverY, 25, 25);
        }
    }
}

function drawTorqueInfo() {
    // Info panel
    let panelX = canvasWidth - 220;
    let panelY = 50;
    let panelW = 200;
    let panelH = 180;

    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    // Title
    fill(0);
    textSize(14);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    noStroke();
    text('Torque Values', panelX + panelW/2, panelY + 8);
    textStyle(NORMAL);

    // Calculate and display torques
    textSize(12);
    textAlign(LEFT, TOP);
    let y = panelY + 30;

    for (let i = 0; i < forces.length; i++) {
        let f = forces[i];
        let r = f.x * leverLength;
        let torque = r * f.magnitude * sin(radians(f.angle));
        let direction = torque > 0 ? 'CCW' : (torque < 0 ? 'CW' : '—');

        fill(f.color);
        text(f.name + ': τ = ' + torque.toFixed(1) + ' N·m', panelX + 12, y);
        fill(100);
        textSize(10);
        text('(' + direction + ')', panelX + 150, y + 2);
        textSize(12);

        y += 25;
    }

    // Net torque
    let netTorque = 0;
    for (let f of forces) {
        netTorque += f.x * leverLength * f.magnitude * sin(radians(f.angle));
    }

    y += 10;
    fill(0);
    textStyle(BOLD);
    text('Στ = ' + netTorque.toFixed(1) + ' N·m', panelX + 12, y);
    textStyle(NORMAL);
}

function drawFormula() {
    // Formula box
    let boxX = 50;
    let boxY = 50;
    let boxW = 200;
    let boxH = 80;

    fill(255, 255, 240, 240);
    stroke(200);
    strokeWeight(1);
    rect(boxX, boxY, boxW, boxH, 8);

    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    noStroke();
    text('τ = rF sin θ', boxX + boxW/2, boxY + 25);

    textSize(11);
    fill(80);
    text('τ = torque (N·m)', boxX + boxW/2, boxY + 50);
    text('r = distance from pivot', boxX + boxW/2, boxY + 65);
}

function drawControlLabels() {
    fill('black');
    textSize(12);
    textAlign(LEFT, CENTER);
    noStroke();

    let controlY = drawHeight + 28;

    text('Force:', 10, controlY);
    text(forces[selectedForce].magnitude + ' N', 225, controlY);

    text('Angle:', 250, controlY);
    text(forces[selectedForce].angle + '°', 445, controlY);

    text('Position:', 470, controlY);
    text((forces[selectedForce].x * 100).toFixed(0) + '%', 665, controlY);

    text('Select:', 700, controlY - 12);
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
        canvasWidth = Math.max(700, container.offsetWidth);
        leverLength = min(400, canvasWidth - 350);
    }
}
