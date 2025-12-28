// Inclined Plane Motion MicroSim
// Shows block sliding down incline with friction

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let angleSlider, muSlider, massSlider;
let releaseButton, resetButton;

let blockX = 0.15; // Position as fraction of slope length
let blockVelocity = 0;
let isReleased = false;
let time = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    angleSlider = createSlider(5, 60, 30, 1);
    angleSlider.position(100, drawHeight + 12);
    angleSlider.size(150);

    muSlider = createSlider(0, 0.8, 0.3, 0.05);
    muSlider.position(100, drawHeight + 42);
    muSlider.size(150);

    massSlider = createSlider(1, 20, 5, 1);
    massSlider.position(100, drawHeight + 72);
    massSlider.size(150);

    releaseButton = createButton('Release');
    releaseButton.position(280, drawHeight + 30);
    releaseButton.mousePressed(() => { isReleased = true; });
    releaseButton.style('background-color', '#4CAF50');
    releaseButton.style('color', 'white');
    releaseButton.style('padding', '8px 16px');

    resetButton = createButton('Reset');
    resetButton.position(360, drawHeight + 30);
    resetButton.mousePressed(resetSim);
    resetButton.style('padding', '8px 16px');

    describe('Block sliding down inclined plane with friction', LABEL);
}

function resetSim() {
    blockX = 0.15;
    blockVelocity = 0;
    isReleased = false;
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
    let angle = angleSlider.value();
    let angleRad = radians(angle);
    let mu_k = muSlider.value();
    let mass = massSlider.value();
    let g = 9.8;

    // Calculate critical angle
    let criticalAngle = degrees(atan(mu_k));

    // Title
    fill('black');
    noStroke();
    textSize(20);
    textAlign(CENTER, TOP);
    text('Inclined Plane Motion', canvasWidth / 2, 10);

    // Draw inclined plane
    let baseX = 60;
    let baseY = 380;
    let planeLength = 350;
    let planeHeight = planeLength * sin(angleRad);

    fill('#8B4513');
    stroke('#5D3A1A');
    strokeWeight(2);
    beginShape();
    vertex(baseX, baseY);
    vertex(baseX + planeLength * cos(angleRad), baseY);
    vertex(baseX + planeLength * cos(angleRad), baseY - planeHeight);
    endShape(CLOSE);

    // Angle arc
    noFill();
    stroke('#333');
    strokeWeight(1);
    arc(baseX + planeLength * cos(angleRad), baseY, 50, 50, -PI + angleRad, 0);

    fill('black');
    noStroke();
    textSize(12);
    text('θ = ' + angle + '°', baseX + planeLength * cos(angleRad) - 40, baseY - 15);

    // Physics calculation
    let wParallel = mass * g * sin(angleRad);
    let wPerp = mass * g * cos(angleRad);
    let normalForce = wPerp;
    let friction = mu_k * normalForce;
    let netForce = wParallel - friction;
    let acceleration = netForce / mass;

    // Check if block should move
    let willSlide = angle > criticalAngle;

    // Update physics if released
    if (isReleased && willSlide) {
        blockVelocity += acceleration * 0.016;
        blockX += blockVelocity * 0.016 / planeLength * 60;
        time += 0.016;

        if (blockX > 0.95) {
            blockX = 0.95;
            blockVelocity = 0;
        }
    }

    // Block position on slope
    let blockDist = blockX * planeLength;
    let blockCenterX = baseX + planeLength * cos(angleRad) - blockDist * cos(angleRad);
    let blockCenterY = baseY - planeHeight + blockDist * sin(angleRad);

    // Draw block
    push();
    translate(blockCenterX, blockCenterY);
    rotate(-angleRad);

    fill(willSlide ? '#E74C3C' : '#3498DB');
    stroke('#2c3e80');
    strokeWeight(2);
    rect(-25, -35, 50, 35, 5);

    fill('white');
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text(mass + ' kg', 0, -18);

    pop();

    // Draw force vectors
    let forceScale = 2;

    // Weight (straight down)
    let weight = mass * g;
    drawArrow(blockCenterX, blockCenterY - 15,
              blockCenterX, blockCenterY - 15 + weight * forceScale,
              '#E74C3C', 'W');

    // Normal force
    let nEndX = blockCenterX - normalForce * forceScale * sin(angleRad);
    let nEndY = blockCenterY - 15 - normalForce * forceScale * cos(angleRad);
    drawArrow(blockCenterX, blockCenterY - 15, nEndX, nEndY, '#27AE60', 'N');

    // W parallel (down slope)
    let wpEndX = blockCenterX + wParallel * forceScale * cos(angleRad);
    let wpEndY = blockCenterY - 15 + wParallel * forceScale * sin(angleRad);
    drawArrow(blockCenterX, blockCenterY - 15, wpEndX, wpEndY, '#F39C12', 'W∥');

    // Friction (up slope, if moving)
    if (isReleased || angle > 0) {
        let fEndX = blockCenterX - friction * forceScale * cos(angleRad);
        let fEndY = blockCenterY - 15 - friction * forceScale * sin(angleRad);
        drawArrow(blockCenterX, blockCenterY - 15, fEndX, fEndY, '#9B59B6', 'f');
    }

    // Info panel
    drawInfoPanel(angle, criticalAngle, wParallel, friction, netForce, acceleration, willSlide);

    // Control labels
    fill('black');
    noStroke();
    textSize(13);
    textAlign(LEFT, CENTER);
    text('Angle: ' + angle + '°', 10, drawHeight + 19);
    text('μk: ' + mu_k.toFixed(2), 10, drawHeight + 49);
    text('Mass: ' + mass + ' kg', 10, drawHeight + 79);

    // Status
    textAlign(LEFT, CENTER);
    textSize(14);
    fill(willSlide ? '#E74C3C' : '#27AE60');
    text(willSlide ? 'Will slide (θ > θc)' : 'Will NOT slide (θ < θc)', 460, drawHeight + 25);
    fill('#666');
    textSize(12);
    text('θc = arctan(μk) = ' + criticalAngle.toFixed(1) + '°', 460, drawHeight + 50);

    if (isReleased) {
        text('v = ' + blockVelocity.toFixed(2) + ' m/s', 460, drawHeight + 70);
    }
}

function drawArrow(x1, y1, x2, y2, col, label) {
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

    textSize(11);
    textAlign(CENTER, CENTER);
    fill(col);
    let midX = (x1 + x2) / 2;
    let midY = (y1 + y2) / 2;
    let perpAngle = angle + PI/2;
    text(label, midX + cos(perpAngle) * 18, midY + sin(perpAngle) * 18);
}

function drawInfoPanel(angle, critAngle, wPar, friction, netF, accel, slides) {
    let px = canvasWidth - 220;
    let py = 40;

    fill(255, 255, 255, 240);
    stroke(slides ? '#E74C3C' : '#27AE60');
    strokeWeight(2);
    rect(px, py, 200, 180, 10);

    fill(slides ? '#E74C3C' : '#27AE60');
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text('Force Analysis', px + 10, py + 10);

    textSize(11);
    fill('#333');
    let y = py + 35;
    text('W∥ = mg sin θ = ' + wPar.toFixed(1) + ' N', px + 10, y); y += 20;
    text('f = μkN = ' + friction.toFixed(1) + ' N', px + 10, y); y += 20;
    text('Net = W∥ - f = ' + netF.toFixed(1) + ' N', px + 10, y); y += 25;

    if (slides) {
        fill('#E74C3C');
        text('a = ' + accel.toFixed(2) + ' m/s²', px + 10, y); y += 25;
        fill('#666');
        text('Block accelerates down!', px + 10, y);
    } else {
        fill('#27AE60');
        text('a = 0 (static friction holds)', px + 10, y); y += 25;
        fill('#666');
        text('Increase angle to slide', px + 10, y);
    }
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
