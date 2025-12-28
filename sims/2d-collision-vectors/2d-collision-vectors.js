// 2D Collision Vector Diagram
// Shows momentum conservation in two dimensions

let canvasWidth = 1000;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Control sliders
let angle1Slider, angle2Slider;

// Objects
let obj1 = { m: 2, vx_i: 3.46, vy_i: 2.0 };  // 4 m/s at 30°
let obj2 = { m: 3, vx_i: -2.60, vy_i: -1.5 }; // 3 m/s at 210°

// After collision (calculated for momentum conservation)
let obj1_f, obj2_f;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Angle sliders
    angle1Slider = createSlider(0, 360, 30, 5);
    angle1Slider.position(150, drawHeight + 20);
    angle1Slider.size(150);
    angle1Slider.input(updateVelocities);

    angle2Slider = createSlider(0, 360, 210, 5);
    angle2Slider.position(150, drawHeight + 55);
    angle2Slider.size(150);
    angle2Slider.input(updateVelocities);

    updateVelocities();
    describe('2D collision vector diagram showing momentum conservation in x and y', LABEL);
}

function updateVelocities() {
    let angle1 = radians(angle1Slider.value());
    let angle2 = radians(angle2Slider.value());

    // Object 1: 2 kg at 4 m/s
    obj1.vx_i = 4 * cos(angle1);
    obj1.vy_i = 4 * sin(angle1);

    // Object 2: 3 kg at 3 m/s
    obj2.vx_i = 3 * cos(angle2);
    obj2.vy_i = 3 * sin(angle2);

    // Calculate after collision (simplified elastic-like result)
    // For demonstration, we'll show a plausible outcome
    let px_total = obj1.m * obj1.vx_i + obj2.m * obj2.vx_i;
    let py_total = obj1.m * obj1.vy_i + obj2.m * obj2.vy_i;

    // Simple collision model: exchange some momentum
    obj1_f = {
        vx: obj1.vx_i * 0.3 + (px_total / 5) * 0.4,
        vy: -obj1.vy_i * 0.5 + (py_total / 5) * 0.3
    };
    obj2_f = {
        vx: (px_total - obj1.m * obj1_f.vx) / obj2.m,
        vy: (py_total - obj1.m * obj1_f.vy) / obj2.m
    };
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
    textSize(18);
    textAlign(CENTER, TOP);
    noStroke();
    text('2D Collision: Momentum Conservation in X and Y', canvasWidth/2, 10);

    // Draw before and after panels
    let panelWidth = (canvasWidth - 60) / 2;
    drawCollisionPanel(20, 45, panelWidth, drawHeight - 65, 'BEFORE', true);
    drawCollisionPanel(40 + panelWidth, 45, panelWidth, drawHeight - 65, 'AFTER', false);

    // Central annotation
    fill(0, 150, 0);
    textSize(14);
    textAlign(CENTER, CENTER);
    text('p_total conserved!', canvasWidth/2, drawHeight - 30);

    // Control labels
    drawControlLabels();
}

function drawCollisionPanel(x, y, w, h, title, isBefore) {
    // Background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 10);

    // Title
    fill('black');
    textSize(14);
    textAlign(CENTER, TOP);
    noStroke();
    text(title + ' Collision', x + w/2, y + 10);

    // Draw coordinate system
    let originX = x + w * 0.5;
    let originY = y + h * 0.4;
    let axisLen = min(w, h) * 0.35;

    // Axes
    stroke(150);
    strokeWeight(1);
    line(originX - axisLen, originY, originX + axisLen, originY);
    line(originX, originY - axisLen, originX, originY + axisLen);

    // Axis labels
    fill(100);
    textSize(10);
    textAlign(CENTER, TOP);
    text('x', originX + axisLen + 10, originY - 5);
    textAlign(RIGHT, CENTER);
    text('y', originX + 5, originY - axisLen - 5);

    // Scale for vectors
    let scale = 25;

    // Get velocities based on before/after
    let v1x, v1y, v2x, v2y;
    if (isBefore) {
        v1x = obj1.vx_i; v1y = obj1.vy_i;
        v2x = obj2.vx_i; v2y = obj2.vy_i;
    } else {
        v1x = obj1_f.vx; v1y = obj1_f.vy;
        v2x = obj2_f.vx; v2y = obj2_f.vy;
    }

    // Draw Object 1 velocity (blue)
    stroke(70, 130, 200);
    strokeWeight(3);
    fill(70, 130, 200);
    let v1EndX = originX + v1x * scale;
    let v1EndY = originY - v1y * scale;
    line(originX, originY, v1EndX, v1EndY);
    drawArrowhead(originX, originY, v1EndX, v1EndY, 8);

    // Draw Object 2 velocity (red)
    stroke(220, 100, 100);
    fill(220, 100, 100);
    let v2EndX = originX + v2x * scale;
    let v2EndY = originY - v2y * scale;
    line(originX, originY, v2EndX, v2EndY);
    drawArrowhead(originX, originY, v2EndX, v2EndY, 8);

    // Draw components (dashed)
    drawingContext.setLineDash([4, 4]);
    strokeWeight(1);

    // Object 1 components
    stroke(70, 130, 200, 150);
    line(originX, originY, v1EndX, originY);
    line(v1EndX, originY, v1EndX, v1EndY);

    // Object 2 components
    stroke(220, 100, 100, 150);
    line(originX, originY, v2EndX, originY);
    line(v2EndX, originY, v2EndX, v2EndY);

    drawingContext.setLineDash([]);

    // Velocity labels
    noStroke();
    textSize(10);

    fill(70, 130, 200);
    textAlign(LEFT, CENTER);
    text('v₁ = (' + v1x.toFixed(1) + ', ' + v1y.toFixed(1) + ') m/s', v1EndX + 5, v1EndY);

    fill(220, 100, 100);
    text('v₂ = (' + v2x.toFixed(1) + ', ' + v2y.toFixed(1) + ') m/s', v2EndX + 5, v2EndY);

    // Momentum calculations
    let p1x = obj1.m * v1x;
    let p1y = obj1.m * v1y;
    let p2x = obj2.m * v2x;
    let p2y = obj2.m * v2y;
    let pTotalX = p1x + p2x;
    let pTotalY = p1y + p2y;

    // Momentum info box
    let infoY = y + h - 140;
    fill(250, 250, 255);
    stroke(200);
    strokeWeight(1);
    rect(x + 10, infoY, w - 20, 130, 5);

    fill('black');
    textSize(11);
    textAlign(LEFT, TOP);
    let textX = x + 20;
    let textY = infoY + 10;

    text('Momentum Calculations:', textX, textY);
    textY += 18;

    fill(70, 130, 200);
    text('p₁ = m₁v₁ = 2(' + v1x.toFixed(1) + ', ' + v1y.toFixed(1) + ') = (' + p1x.toFixed(1) + ', ' + p1y.toFixed(1) + ')', textX, textY);
    textY += 15;

    fill(220, 100, 100);
    text('p₂ = m₂v₂ = 3(' + v2x.toFixed(1) + ', ' + v2y.toFixed(1) + ') = (' + p2x.toFixed(1) + ', ' + p2y.toFixed(1) + ')', textX, textY);
    textY += 20;

    fill(100, 50, 150);
    text('p_total = p₁ + p₂', textX, textY);
    textY += 15;
    textSize(12);
    text('= (' + pTotalX.toFixed(1) + ', ' + pTotalY.toFixed(1) + ') kg·m/s', textX + 20, textY);

    // Draw total momentum vector (purple)
    stroke(100, 50, 150);
    strokeWeight(2);
    fill(100, 50, 150);
    let pScale = 5;
    let pEndX = originX + pTotalX * pScale;
    let pEndY = originY - pTotalY * pScale;
    line(originX, originY, pEndX, pEndY);
    drawArrowhead(originX, originY, pEndX, pEndY, 6);
}

function drawArrowhead(x1, y1, x2, y2, size) {
    let angle = atan2(y2 - y1, x2 - x1);
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -size, size/2, -size, -size/2);
    pop();
}

function drawControlLabels() {
    textSize(11);
    textAlign(LEFT, CENTER);
    fill('black');
    noStroke();

    text('Object 1 (2 kg, 4 m/s): Angle = ' + angle1Slider.value() + '°', 10, drawHeight + 30);
    text('Object 2 (3 kg, 3 m/s): Angle = ' + angle2Slider.value() + '°', 10, drawHeight + 65);

    // Show total momentum is conserved
    let px_i = obj1.m * obj1.vx_i + obj2.m * obj2.vx_i;
    let py_i = obj1.m * obj1.vy_i + obj2.m * obj2.vy_i;
    let px_f = obj1.m * obj1_f.vx + obj2.m * obj2_f.vx;
    let py_f = obj1.m * obj1_f.vy + obj2.m * obj2_f.vy;

    textAlign(RIGHT, CENTER);
    fill(100, 50, 150);
    text('Before: p = (' + px_i.toFixed(1) + ', ' + py_i.toFixed(1) + ') kg·m/s', canvasWidth - 20, drawHeight + 30);
    text('After: p = (' + px_f.toFixed(1) + ', ' + py_f.toFixed(1) + ') kg·m/s', canvasWidth - 20, drawHeight + 65);

    if (abs(px_i - px_f) < 0.1 && abs(py_i - py_f) < 0.1) {
        fill(0, 150, 0);
        text('✓ Momentum conserved in both directions!', canvasWidth - 20, drawHeight + 85);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
    }
}
