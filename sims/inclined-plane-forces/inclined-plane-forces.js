// Inclined Plane Force Decomposition Diagram
// Shows how to properly decompose weight into components

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let angleSlider, massSlider, muSlider;
let showDecompositionCheckbox, showAxesCheckbox;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    angleSlider = createSlider(5, 60, 30, 1);
    angleSlider.position(120, drawHeight + 12);
    angleSlider.size(150);

    massSlider = createSlider(1, 20, 5, 1);
    massSlider.position(120, drawHeight + 42);
    massSlider.size(150);

    muSlider = createSlider(0, 0.8, 0.3, 0.05);
    muSlider.position(120, drawHeight + 72);
    muSlider.size(150);

    showDecompositionCheckbox = createCheckbox(' Show decomposition', true);
    showDecompositionCheckbox.position(300, drawHeight + 15);
    showDecompositionCheckbox.style('font-size', '13px');

    showAxesCheckbox = createCheckbox(' Show tilted axes', true);
    showAxesCheckbox.position(300, drawHeight + 42);
    showAxesCheckbox.style('font-size', '13px');

    describe('Interactive diagram showing force decomposition on an inclined plane', LABEL);
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
    textSize(20);
    textAlign(CENTER, TOP);
    text('Inclined Plane: Force Decomposition', canvasWidth / 2, 10);

    let theta = angleSlider.value();
    let m = massSlider.value();
    let mu = muSlider.value();
    let g = 9.8;
    let thetaRad = radians(theta);

    // Calculate forces
    let W = m * g;
    let Wparallel = W * sin(thetaRad);
    let Wperp = W * cos(thetaRad);
    let N = Wperp;
    let fs_max = mu * N;

    // Draw the scene
    drawInclinedPlane(theta, m, W, Wparallel, Wperp, N, fs_max,
                      showDecompositionCheckbox.checked(),
                      showAxesCheckbox.checked());

    // Draw info panel
    drawInfoPanel(canvasWidth - 240, 50, 220, 250, theta, m, W, Wparallel, Wperp, N, fs_max, mu);

    // Control labels
    fill('black');
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Angle θ: ' + theta + '°', 10, drawHeight + 19);
    text('Mass: ' + m + ' kg', 10, drawHeight + 49);
    text('μs: ' + mu.toFixed(2), 10, drawHeight + 79);

    // Critical angle check
    let criticalAngle = degrees(atan(mu));
    textAlign(LEFT, CENTER);
    if (theta > criticalAngle && mu > 0) {
        fill('#E74C3C');
        text('θ > θc (' + criticalAngle.toFixed(1) + '°): Block slides!', 450, drawHeight + 79);
    } else if (mu > 0) {
        fill('#27AE60');
        text('θ < θc (' + criticalAngle.toFixed(1) + '°): Block at rest', 450, drawHeight + 79);
    }
}

function drawInclinedPlane(theta, m, W, Wpar, Wperp, N, fs_max, showDecomp, showAxes) {
    let inclineLength = 320;
    let inclineBaseX = 80;
    let inclineBaseY = 350;
    let thetaRad = radians(theta);

    // Calculate incline endpoints
    let inclineTopX = inclineBaseX + inclineLength * cos(thetaRad);
    let inclineTopY = inclineBaseY - inclineLength * sin(thetaRad);

    // Draw incline surface
    fill('#8B7355');
    stroke('#5D4E37');
    strokeWeight(2);
    triangle(inclineBaseX, inclineBaseY,
             inclineBaseX + inclineLength * 1.1, inclineBaseY,
             inclineTopX, inclineTopY);

    // Ground line
    stroke('#5D4E37');
    strokeWeight(2);
    line(inclineBaseX - 20, inclineBaseY, inclineBaseX + inclineLength * 1.2, inclineBaseY);

    // Angle arc
    noFill();
    stroke('#333');
    strokeWeight(1);
    arc(inclineBaseX, inclineBaseY, 80, 80, -thetaRad, 0);
    fill('#333');
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text('θ', inclineBaseX + 50, inclineBaseY - 15);

    // Block position on incline
    let blockDist = inclineLength * 0.5;
    let blockCenterX = inclineBaseX + blockDist * cos(thetaRad);
    let blockCenterY = inclineBaseY - blockDist * sin(thetaRad);

    // Draw tilted axes (if enabled)
    if (showAxes) {
        push();
        translate(blockCenterX, blockCenterY);
        rotate(-thetaRad);

        // X-axis (parallel to incline)
        stroke('#666');
        strokeWeight(1);
        drawingContext.setLineDash([5, 5]);
        line(-80, 0, 120, 0);

        // Y-axis (perpendicular to incline)
        line(0, -100, 0, 60);
        drawingContext.setLineDash([]);

        // Axis labels
        fill('#666');
        noStroke();
        textSize(12);
        textAlign(LEFT, CENTER);
        text('x (parallel)', 125, 0);
        textAlign(CENTER, BOTTOM);
        text('y (perpendicular)', 0, -105);

        // Positive direction indicators
        drawSmallArrow(100, 0, 120, 0, '#666');
        drawSmallArrow(0, -80, 0, -100, '#666');

        pop();
    }

    // Draw block
    push();
    translate(blockCenterX, blockCenterY);
    rotate(-thetaRad);

    fill('#3498DB');
    stroke('#2980B9');
    strokeWeight(2);
    rectMode(CENTER);
    rect(0, -20, 50, 40, 3);

    // Mass label
    fill('white');
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(m + ' kg', 0, -20);

    pop();

    // Force scale
    let forceScale = 2.5;

    // Weight vector (always vertical, from block center)
    let wLen = W * forceScale;
    drawArrow(blockCenterX, blockCenterY, blockCenterX, blockCenterY + wLen, '#9B59B6', 'mg');

    if (showDecomp) {
        // Weight parallel component (down the slope)
        let wParLen = Wpar * forceScale;
        let wParEndX = blockCenterX + wParLen * cos(thetaRad - PI/2);
        let wParEndY = blockCenterY + wParLen * sin(thetaRad - PI/2);
        // Actually parallel is down the slope
        wParEndX = blockCenterX + wParLen * cos(-thetaRad + PI);
        wParEndY = blockCenterY - wParLen * sin(-thetaRad + PI);

        push();
        translate(blockCenterX, blockCenterY);
        rotate(-thetaRad);
        // mg sin theta points down the slope (+x in rotated frame)
        drawArrowLocal(0, 0, Wpar * forceScale, 0, '#E74C3C', 'mg sin θ');
        // mg cos theta points into the surface (-y in rotated frame)
        drawArrowLocal(0, 0, 0, Wperp * forceScale, '#2980B9', 'mg cos θ');

        // Dashed lines for decomposition
        stroke('#666');
        strokeWeight(1);
        drawingContext.setLineDash([3, 3]);
        // Rectangle from tip of mg to components
        line(Wpar * forceScale, 0, Wpar * forceScale, Wperp * forceScale);
        line(0, Wperp * forceScale, Wpar * forceScale, Wperp * forceScale);
        drawingContext.setLineDash([]);

        // Right angle symbol
        noFill();
        stroke('#666');
        let cornerSize = 8;
        rect(Wpar * forceScale - cornerSize, Wperp * forceScale - cornerSize, cornerSize, cornerSize);

        pop();

        // Also show mg going down in world coordinates connects to decomposition
        // Draw dashed line from mg tip to decomposition
        let mgTipX = blockCenterX;
        let mgTipY = blockCenterY + wLen;

        stroke('#9B59B680');
        strokeWeight(1);
        drawingContext.setLineDash([4, 4]);
        push();
        translate(blockCenterX, blockCenterY);
        rotate(-thetaRad);
        line(0, W * forceScale / cos(thetaRad) * 0, Wpar * forceScale, Wperp * forceScale);
        drawingContext.setLineDash([]);
        pop();
    }

    // Normal force (perpendicular to surface, pointing away)
    push();
    translate(blockCenterX, blockCenterY);
    rotate(-thetaRad);
    drawArrowLocal(0, -20, 0, -20 - N * forceScale, '#27AE60', 'N');
    pop();

    // Friction force (along surface, up the slope)
    let fs = min(Wpar, fs_max); // actual static friction
    if (fs > 0) {
        push();
        translate(blockCenterX, blockCenterY);
        rotate(-thetaRad);
        drawArrowLocal(0, 0, -fs * forceScale, 0, '#8B4513', 'f');
        pop();
    }

    // Key insight box
    fill(255, 255, 255, 240);
    stroke('#27AE60');
    strokeWeight(2);
    rect(50, 50, 200, 90, 10);

    fill('#27AE60');
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);
    text('Key Strategy:', 60, 58);

    textSize(10);
    fill('#333');
    text('• Choose axes ∥ and ⊥ to incline', 60, 78);
    text('• Weight has both components', 60, 93);
    text('• N balances mg cos θ', 60, 108);
    text('• mg sin θ causes acceleration', 60, 123);
}

function drawArrowLocal(x1, y1, x2, y2, col, label) {
    let headSize = 7;
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

    if (label) {
        textSize(11);
        textAlign(CENTER, CENTER);
        fill(col);
        noStroke();
        let perpAngle = angle + PI/2;
        let labelDist = 15;
        text(label, x2 + cos(perpAngle) * labelDist, y2 + sin(perpAngle) * labelDist);
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

    if (label) {
        textSize(12);
        textAlign(CENTER, CENTER);
        fill(col);
        let perpAngle = angle + PI/2;
        text(label, x2 + cos(perpAngle) * 15, y2 + sin(perpAngle) * 15);
    }
}

function drawSmallArrow(x1, y1, x2, y2, col) {
    let headSize = 5;
    let angle = atan2(y2 - y1, x2 - x1);

    stroke(col);
    strokeWeight(1);
    line(x1, y1, x2, y2);

    fill(col);
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -headSize, -headSize/2, -headSize, headSize/2);
    pop();
}

function drawInfoPanel(x, y, w, h, theta, m, W, Wpar, Wperp, N, fs_max, mu) {
    push();
    translate(x, y);

    fill(255, 255, 255, 245);
    stroke(200);
    strokeWeight(1);
    rect(0, 0, w, h, 10);

    fill('#333');
    noStroke();
    textSize(13);
    textAlign(LEFT, TOP);

    let lineY = 10;
    let spacing = 18;

    fill('#9B59B6');
    text('Weight Decomposition', 10, lineY);
    lineY += spacing + 5;

    textSize(11);
    fill('#333');
    text('mg = ' + W.toFixed(1) + ' N', 10, lineY);
    lineY += spacing;

    fill('#E74C3C');
    text('mg sin θ = ' + Wpar.toFixed(1) + ' N', 10, lineY);
    lineY += spacing;

    fill('#2980B9');
    text('mg cos θ = ' + Wperp.toFixed(1) + ' N', 10, lineY);
    lineY += spacing + 8;

    fill('#27AE60');
    textSize(12);
    text('Other Forces', 10, lineY);
    lineY += spacing;

    textSize(11);
    fill('#333');
    text('N = mg cos θ = ' + N.toFixed(1) + ' N', 10, lineY);
    lineY += spacing;

    fill('#8B4513');
    text('fs_max = μsN = ' + fs_max.toFixed(1) + ' N', 10, lineY);
    lineY += spacing + 8;

    textSize(12);
    fill('#333');
    text('Critical angle:', 10, lineY);
    lineY += spacing;

    textSize(11);
    text('θc = arctan(μs) = ' + degrees(atan(mu)).toFixed(1) + '°', 10, lineY);

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
