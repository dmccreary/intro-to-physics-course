// Inertia Demonstration MicroSim
// Shows how mass affects inertia by comparing objects with different masses
// responding to identical forces

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// Objects
let objects = [];
const masses = [1, 5, 10]; // kg
const colors = ['#E74C3C', '#3498DB', '#27AE60'];
const labels = ['Light (1 kg)', 'Medium (5 kg)', 'Heavy (10 kg)'];

// Physics state
let isApplyingForce = false;
let forceApplied = false;
let appliedForce = 20; // Newtons
let applicationTime = 1.0; // seconds
let elapsedTime = 0;
let frameTime = 1/60;

// Controls
let forceSlider;
let timeSlider;
let applyButton;
let resetButton;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Initialize objects
    resetObjects();

    // Create controls
    applyButton = createButton('Apply Force');
    applyButton.position(10, drawHeight + 15);
    applyButton.mousePressed(applyForce);
    applyButton.style('background-color', '#4CAF50');
    applyButton.style('color', 'white');
    applyButton.style('padding', '8px 16px');

    resetButton = createButton('Reset');
    resetButton.position(120, drawHeight + 15);
    resetButton.mousePressed(resetObjects);
    resetButton.style('padding', '8px 16px');

    forceSlider = createSlider(5, 50, 20, 1);
    forceSlider.position(280, drawHeight + 15);
    forceSlider.size(150);

    timeSlider = createSlider(0.5, 3.0, 1.0, 0.1);
    timeSlider.position(280, drawHeight + 50);
    timeSlider.size(150);

    describe('Three objects with different masses responding to the same applied force', LABEL);
}

function resetObjects() {
    objects = [];
    let startX = 80;
    let spacing = 80;

    for (let i = 0; i < 3; i++) {
        objects.push({
            mass: masses[i],
            x: startX,
            y: 150 + i * 120,
            vx: 0,
            size: 30 + masses[i] * 3,
            color: colors[i],
            label: labels[i],
            acceleration: 0,
            finalVelocity: 0
        });
    }

    isApplyingForce = false;
    forceApplied = false;
    elapsedTime = 0;
}

function applyForce() {
    if (!isApplyingForce && !forceApplied) {
        isApplyingForce = true;
        elapsedTime = 0;
        appliedForce = forceSlider.value();
        applicationTime = timeSlider.value();

        // Calculate accelerations (F = ma, so a = F/m)
        for (let obj of objects) {
            obj.acceleration = appliedForce / obj.mass;
        }
    }
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
    text('Inertia Demonstration: Same Force, Different Masses', canvasWidth / 2, 10);

    // Subtitle
    textSize(16);
    fill('#666');
    text('Observe how mass affects acceleration when the same force is applied', canvasWidth / 2, 40);

    // Update slider values
    appliedForce = forceSlider.value();
    applicationTime = timeSlider.value();

    // Physics update
    if (isApplyingForce) {
        elapsedTime += frameTime;

        for (let obj of objects) {
            // v = v0 + at
            obj.vx += obj.acceleration * frameTime;
            // x = x0 + vt
            obj.x += obj.vx * 60; // Scale for visibility
        }

        if (elapsedTime >= applicationTime) {
            isApplyingForce = false;
            forceApplied = true;
            // Store final velocities
            for (let obj of objects) {
                obj.finalVelocity = obj.vx;
                obj.acceleration = 0; // No more acceleration, but keeps moving
            }
        }
    } else if (forceApplied) {
        // Objects continue at constant velocity (Newton's 1st Law!)
        for (let obj of objects) {
            obj.x += obj.vx * 60;
        }
    }

    // Draw ground lines
    stroke('#8B4513');
    strokeWeight(3);
    for (let i = 0; i < 3; i++) {
        let y = 150 + i * 120 + objects[i].size / 2 + 5;
        line(50, y, canvasWidth - 300, y);
    }

    // Draw distance markers
    stroke('#ccc');
    strokeWeight(1);
    for (let x = 100; x < canvasWidth - 300; x += 100) {
        line(x, 70, x, drawHeight - 30);
        fill('#999');
        noStroke();
        textSize(12);
        textAlign(CENTER, TOP);
        text((x - 80) + ' m', x, drawHeight - 25);
    }

    // Draw objects
    for (let obj of objects) {
        // Glow effect when force is being applied
        if (isApplyingForce) {
            noStroke();
            fill(obj.color + '40');
            ellipse(obj.x, obj.y, obj.size + 20, obj.size + 20);
        }

        // Object
        fill(obj.color);
        stroke('#333');
        strokeWeight(2);
        rect(obj.x - obj.size/2, obj.y - obj.size/2, obj.size, obj.size, 5);

        // Mass label
        fill('white');
        noStroke();
        textSize(12);
        textAlign(CENTER, CENTER);
        text(obj.mass + ' kg', obj.x, obj.y);

        // Label on left
        fill('black');
        textAlign(RIGHT, CENTER);
        textSize(14);
        text(obj.label, 70, obj.y);

        // Velocity arrow
        if (obj.vx > 0.01) {
            let arrowLen = min(obj.vx * 50, 100);
            drawArrow(obj.x + obj.size/2 + 10, obj.y, obj.x + obj.size/2 + 10 + arrowLen, obj.y, '#9B59B6');
            fill('#9B59B6');
            textSize(12);
            textAlign(LEFT, CENTER);
            text('v = ' + (obj.vx).toFixed(2) + ' m/s', obj.x + obj.size/2 + arrowLen + 20, obj.y);
        }

        // Force arrow during application
        if (isApplyingForce) {
            drawArrow(obj.x - obj.size/2 - 10, obj.y, obj.x - obj.size/2 - 60, obj.y, '#E74C3C');
        }
    }

    // Info panel
    drawInfoPanel();

    // Control labels
    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text('Force: ' + appliedForce + ' N', 450, drawHeight + 22);
    text('Time: ' + applicationTime.toFixed(1) + ' s', 450, drawHeight + 57);

    // Status message
    textAlign(LEFT, TOP);
    textSize(14);
    if (isApplyingForce) {
        fill('#E74C3C');
        text('Applying force... (' + elapsedTime.toFixed(1) + 's / ' + applicationTime.toFixed(1) + 's)', 10, drawHeight + 75);
    } else if (forceApplied) {
        fill('#27AE60');
        text("Force stopped - objects continue at constant velocity (Newton's 1st Law!)", 10, drawHeight + 75);
    } else {
        fill('#666');
        text('Click "Apply Force" to apply the same force to all three objects', 10, drawHeight + 75);
    }
}

function drawArrow(x1, y1, x2, y2, col) {
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
}

function drawInfoPanel() {
    let panelX = canvasWidth - 280;
    let panelY = 70;
    let panelW = 260;
    let panelH = 320;

    fill(255, 255, 255, 240);
    stroke('#3498DB');
    strokeWeight(2);
    rect(panelX, panelY, panelW, panelH, 10);

    fill('#3498DB');
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    text('Physics of Inertia', panelX + 10, panelY + 10);

    fill('#333');
    textSize(13);
    let y = panelY + 35;

    text('Newton\'s 2nd Law: F = ma', panelX + 10, y);
    y += 20;
    text('Therefore: a = F/m', panelX + 10, y);
    y += 30;

    text('For F = ' + appliedForce + ' N:', panelX + 10, y);
    y += 25;

    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        let a = appliedForce / obj.mass;
        fill(obj.color);
        text('• ' + obj.mass + ' kg: a = ' + a.toFixed(1) + ' m/s²', panelX + 15, y);
        y += 20;
    }

    y += 10;
    fill('#333');
    text('Key Insight:', panelX + 10, y);
    y += 20;
    textSize(12);
    text('Greater mass = greater inertia', panelX + 10, y);
    y += 18;
    text('= more resistance to acceleration', panelX + 10, y);
    y += 25;

    if (forceApplied) {
        fill('#27AE60');
        textSize(13);
        text('After force stops:', panelX + 10, y);
        y += 20;
        textSize(12);
        for (let i = 0; i < objects.length; i++) {
            let obj = objects[i];
            text('• ' + obj.mass + ' kg → v = ' + obj.finalVelocity.toFixed(2) + ' m/s', panelX + 15, y);
            y += 18;
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    // Update control positions
    forceSlider.size(Math.min(150, canvasWidth - 480));
    timeSlider.size(Math.min(150, canvasWidth - 480));
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.min(container.offsetWidth, 900);
    }
}
