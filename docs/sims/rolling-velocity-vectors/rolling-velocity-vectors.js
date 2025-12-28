// Rolling Motion Velocity Vectors MicroSim
// Visualize velocity vectors at different points on a rolling wheel

let canvasWidth = 900;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Wheel parameters
let wheelRadius = 80;
let wheelX = 200;
let wheelY = 300;
let v_cm = 2.0;  // Center of mass velocity (m/s)

// Animation
let wheelAngle = 0;
let isFrozen = false;
let showVectors = true;
let showTraces = false;
let selectedPoint = -1;  // -1 = none, 0 = center, 1 = top, 2 = bottom, etc.

// Trace paths
let tracePoints = {
    center: [],
    top: [],
    bottom: [],
    right: [],
    left: []
};
let maxTracePoints = 150;

// UI elements
let speedSlider;
let freezeButton;
let vectorCheckbox;
let traceCheckbox;
let resetButton;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    speedSlider = createSlider(0, 5, 2, 0.1);
    speedSlider.position(130, drawHeight + 20);
    speedSlider.size(150);
    speedSlider.input(() => {
        v_cm = speedSlider.value();
        clearTraces();
    });

    freezeButton = createButton('Freeze Frame');
    freezeButton.position(340, drawHeight + 17);
    freezeButton.size(100, 28);
    freezeButton.mousePressed(() => {
        isFrozen = !isFrozen;
        freezeButton.html(isFrozen ? 'Resume' : 'Freeze Frame');
    });

    vectorCheckbox = createCheckbox(' Show vectors', true);
    vectorCheckbox.position(130, drawHeight + 55);
    vectorCheckbox.changed(() => showVectors = vectorCheckbox.checked());

    traceCheckbox = createCheckbox(' Show trace paths', false);
    traceCheckbox.position(280, drawHeight + 55);
    traceCheckbox.changed(() => {
        showTraces = traceCheckbox.checked();
        if (!showTraces) clearTraces();
    });

    resetButton = createButton('Reset');
    resetButton.position(450, drawHeight + 17);
    resetButton.size(70, 28);
    resetButton.mousePressed(resetSim);

    describe('Rolling wheel visualization showing velocity vectors at different points demonstrating the combination of translational and rotational motion', LABEL);
}

function draw() {
    updateCanvasSize();

    // Update animation
    if (!isFrozen && v_cm > 0) {
        let omega = v_cm / (wheelRadius / 50);  // Convert to angular velocity
        wheelAngle += omega * 0.016;  // Approximate 60fps

        // Move wheel forward
        wheelX += v_cm * 2;

        // Wrap around
        if (wheelX > canvasWidth + wheelRadius) {
            wheelX = -wheelRadius;
            clearTraces();
        }

        // Store trace points
        if (showTraces && frameCount % 2 === 0) {
            storeTracePoints();
        }
    }

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Ground
    fill(200, 180, 150);
    noStroke();
    rect(0, wheelY + wheelRadius, canvasWidth, drawHeight - wheelY - wheelRadius);

    // Ground line
    stroke(100, 80, 60);
    strokeWeight(2);
    line(0, wheelY + wheelRadius, canvasWidth, wheelY + wheelRadius);

    // Grid
    drawGrid();

    // Control area
    fill(248, 248, 248);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    textSize(22);
    textAlign(CENTER, TOP);
    noStroke();
    text('Rolling Motion Velocity Vectors', canvasWidth / 2, 10);

    // Draw components
    if (showTraces) drawTraces();
    drawWheel();
    if (showVectors) drawVelocityVectors();
    drawInfoPanel();
    drawControlLabels();
}

function drawGrid() {
    stroke(220);
    strokeWeight(1);
    for (let x = 0; x < canvasWidth; x += 50) {
        line(x, 50, x, wheelY + wheelRadius);
    }
    for (let y = 50; y < wheelY + wheelRadius; y += 50) {
        line(0, y, canvasWidth, y);
    }
}

function drawWheel() {
    push();
    translate(wheelX, wheelY);

    // Wheel shadow
    fill(0, 0, 0, 30);
    noStroke();
    ellipse(5, wheelRadius + 5, wheelRadius * 2, 15);

    // Wheel body
    fill(70, 70, 80);
    stroke(50, 50, 60);
    strokeWeight(3);
    ellipse(0, 0, wheelRadius * 2, wheelRadius * 2);

    // Tire
    noFill();
    stroke(40, 40, 50);
    strokeWeight(8);
    ellipse(0, 0, wheelRadius * 2, wheelRadius * 2);

    // Spokes
    stroke(150, 150, 160);
    strokeWeight(3);
    for (let i = 0; i < 6; i++) {
        let angle = wheelAngle + i * PI / 3;
        line(0, 0, wheelRadius * 0.85 * cos(angle), wheelRadius * 0.85 * sin(angle));
    }

    // Hub
    fill(100, 100, 110);
    noStroke();
    ellipse(0, 0, 20, 20);

    // Reference points
    let points = getPointPositions();
    for (let i = 0; i < points.length; i++) {
        let pt = points[i];
        fill(pt.color);
        stroke(255);
        strokeWeight(2);
        ellipse(pt.x, pt.y, 16, 16);
    }

    pop();
}

function getPointPositions() {
    return [
        { name: 'Center', x: 0, y: 0, color: color(220, 50, 50) },
        { name: 'Top', x: wheelRadius * sin(wheelAngle), y: -wheelRadius * cos(wheelAngle), color: color(50, 200, 50) },
        { name: 'Bottom', x: -wheelRadius * sin(wheelAngle), y: wheelRadius * cos(wheelAngle), color: color(255, 200, 50) },
        { name: 'Right', x: wheelRadius * cos(wheelAngle), y: wheelRadius * sin(wheelAngle), color: color(150, 50, 200) },
        { name: 'Left', x: -wheelRadius * cos(wheelAngle), y: -wheelRadius * sin(wheelAngle), color: color(50, 150, 200) }
    ];
}

function drawVelocityVectors() {
    let points = getPointPositions();
    let omega = v_cm / (wheelRadius / 50);
    let scale = 20;  // Pixels per m/s

    push();
    translate(wheelX, wheelY);

    for (let i = 0; i < points.length; i++) {
        let pt = points[i];

        // Calculate velocity at this point
        // v = v_cm + ω × r (cross product in 2D)
        let v_rot_x = -omega * pt.y / 50 * scale;  // Perpendicular to radius
        let v_rot_y = omega * pt.x / 50 * scale;

        let v_trans_x = v_cm * scale;
        let v_trans_y = 0;

        let v_total_x = v_trans_x + v_rot_x;
        let v_total_y = v_trans_y + v_rot_y;

        // Draw total velocity vector
        if (sqrt(v_total_x * v_total_x + v_total_y * v_total_y) > 1) {
            stroke(pt.color);
            strokeWeight(3);
            line(pt.x, pt.y, pt.x + v_total_x, pt.y + v_total_y);

            // Arrowhead
            push();
            translate(pt.x + v_total_x, pt.y + v_total_y);
            rotate(atan2(v_total_y, v_total_x));
            fill(pt.color);
            noStroke();
            triangle(0, 0, -10, -5, -10, 5);
            pop();
        } else {
            // Show zero velocity with small circle
            noFill();
            stroke(pt.color);
            strokeWeight(2);
            ellipse(pt.x, pt.y, 25, 25);

            fill(pt.color);
            textSize(10);
            textAlign(CENTER, CENTER);
            noStroke();
            text('v=0', pt.x, pt.y + 22);
        }
    }

    pop();

    // Labels with velocity magnitudes
    if (isFrozen) {
        drawVelocityLabels(points, omega, scale);
    }
}

function drawVelocityLabels(points, omega, scale) {
    textSize(11);
    textAlign(LEFT, CENTER);

    let labelX = wheelX + wheelRadius + 30;
    let labelY = wheelY - 100;

    fill(255, 255, 255, 200);
    stroke(200);
    strokeWeight(1);
    rect(labelX - 5, labelY - 10, 140, 130, 5);

    noStroke();

    for (let i = 0; i < points.length; i++) {
        let pt = points[i];
        let v_rot_x = -omega * pt.y / 50;
        let v_rot_y = omega * pt.x / 50;
        let v_total = sqrt(pow(v_cm + v_rot_x, 2) + pow(v_rot_y, 2));

        fill(pt.color);
        text(pt.name + ': ' + v_total.toFixed(2) + ' m/s', labelX, labelY + i * 24);
    }
}

function storeTracePoints() {
    let points = getPointPositions();
    let keys = ['center', 'top', 'bottom', 'right', 'left'];

    for (let i = 0; i < points.length; i++) {
        let pt = points[i];
        tracePoints[keys[i]].push({
            x: wheelX + pt.x,
            y: wheelY + pt.y,
            color: pt.color
        });

        if (tracePoints[keys[i]].length > maxTracePoints) {
            tracePoints[keys[i]].shift();
        }
    }
}

function drawTraces() {
    let keys = ['center', 'top', 'bottom', 'right', 'left'];

    for (let key of keys) {
        let pts = tracePoints[key];
        if (pts.length > 1) {
            noFill();
            strokeWeight(2);
            beginShape();
            for (let i = 0; i < pts.length; i++) {
                let pt = pts[i];
                let alpha = map(i, 0, pts.length, 50, 255);
                stroke(red(pt.color), green(pt.color), blue(pt.color), alpha);
                vertex(pt.x, pt.y);
            }
            endShape();
        }
    }
}

function drawInfoPanel() {
    let panelX = canvasWidth - 230;
    let panelY = 50;
    let panelW = 210;
    let panelH = 170;

    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    fill(0);
    textSize(14);
    textAlign(LEFT, TOP);
    noStroke();

    let y = panelY + 12;
    let lineHeight = 22;

    textStyle(BOLD);
    text('Rolling Without Slipping', panelX + 15, y);
    textStyle(NORMAL);
    y += lineHeight + 5;

    textSize(12);
    fill(50);
    text('v_cm = ' + v_cm.toFixed(1) + ' m/s', panelX + 15, y);
    y += lineHeight;

    let omega = v_cm / (wheelRadius / 50);
    text('ω = ' + omega.toFixed(1) + ' rad/s', panelX + 15, y);
    y += lineHeight;

    text('Constraint: v_cm = rω', panelX + 15, y);
    y += lineHeight + 10;

    textSize(11);
    fill(80);
    text('• Top: v = 2v_cm (fastest)', panelX + 15, y);
    y += 18;
    text('• Center: v = v_cm', panelX + 15, y);
    y += 18;
    text('• Bottom: v = 0 (stationary!)', panelX + 15, y);
}

function drawControlLabels() {
    fill('black');
    textSize(13);
    textAlign(LEFT, CENTER);
    noStroke();

    text('Speed v_cm:', 10, drawHeight + 33);
    text(v_cm.toFixed(1) + ' m/s', 290, drawHeight + 33);
}

function clearTraces() {
    for (let key in tracePoints) {
        tracePoints[key] = [];
    }
}

function resetSim() {
    wheelX = 200;
    wheelAngle = 0;
    isFrozen = false;
    freezeButton.html('Freeze Frame');
    clearTraces();
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    speedSlider.position(130, drawHeight + 20);
    freezeButton.position(340, drawHeight + 17);
    vectorCheckbox.position(130, drawHeight + 55);
    traceCheckbox.position(280, drawHeight + 55);
    resetButton.position(450, drawHeight + 17);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(700, container.offsetWidth);
    }
}
