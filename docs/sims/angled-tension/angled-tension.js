// Angled Tension Component MicroSim
// Visualizes how changing the angle of an applied force affects components

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let forceSlider, angleSlider, massSlider, muSlider;
let showComponentsCheckbox, animateCheckbox;
let boxX = 200;
let boxVel = 0;
let isAnimating = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    forceSlider = createSlider(0, 200, 100, 5);
    forceSlider.position(120, drawHeight + 12);
    forceSlider.size(120);

    angleSlider = createSlider(0, 90, 30, 1);
    angleSlider.position(120, drawHeight + 42);
    angleSlider.size(120);

    massSlider = createSlider(5, 50, 20, 1);
    massSlider.position(120, drawHeight + 72);
    massSlider.size(120);

    muSlider = createSlider(0, 1, 0.25, 0.05);
    muSlider.position(400, drawHeight + 12);
    muSlider.size(120);

    showComponentsCheckbox = createCheckbox(' Show components', true);
    showComponentsCheckbox.position(540, drawHeight + 12);
    showComponentsCheckbox.style('font-size', '13px');

    animateCheckbox = createCheckbox(' Animate motion', false);
    animateCheckbox.position(540, drawHeight + 42);
    animateCheckbox.style('font-size', '13px');

    describe('Interactive visualization of force components when pulling at an angle', LABEL);
    // notify parent frame of initial size so we don't have to modify the height is each iframe 
    // Requires add addition to the js/extra.js file to listen for the message
    window.parent.postMessage({ type: 'microsim-resize', height: canvasHeight }, '*');
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
    text('Angled Force: Component Analysis', canvasWidth / 2, 10);

    // Get values
    let F = forceSlider.value();
    let theta = angleSlider.value();
    let m = massSlider.value();
    let mu = muSlider.value();
    let g = 9.8;

    // Calculate physics
    let thetaRad = radians(theta);
    let Fx = F * cos(thetaRad);
    let Fy = F * sin(thetaRad);
    let W = m * g;
    let N = W - Fy; // Normal force reduced by vertical component
    if (N < 0) N = 0; // Box lifts off
    let fk = mu * N;
    let netFx = Fx - fk;
    let a = (N > 0) ? netFx / m : 0;

    // Animation
    if (animateCheckbox.checked() && a > 0) {
        boxVel += a * 0.016;
        boxX += boxVel * 3;
        if (boxX > canvasWidth - 100) {
            boxX = 200;
            boxVel = 0;
        }
    } else if (!animateCheckbox.checked()) {
        boxX = 250;
        boxVel = 0;
    }

    // Draw main scene
    drawScene(F, theta, Fx, Fy, W, N, fk, showComponentsCheckbox.checked());

    // Draw info panel
    drawInfoPanel(canvasWidth - 215, 50, 200, 280, F, theta, Fx, Fy, W, N, fk, netFx, a, m);

    // Control labels
    fill('black');
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Applied Force: ' + F + ' N', 10, drawHeight + 19);
    text('Angle: ' + theta + '°', 10, drawHeight + 49);
    text('Mass: ' + m + ' kg', 10, drawHeight + 79);
    text('Friction (μk): ' + mu.toFixed(2), 280, drawHeight + 19);
}

function drawScene(F, theta, Fx, Fy, W, N, fk, showComponents) {
    let groundY = 280;
    let boxW = 70;
    let boxH = 55;
    let boxCenterX = boxX;
    let boxCenterY = groundY - boxH/2;

    // Ground
    fill('#D4B896');
    noStroke();
    rect(30, groundY, canvasWidth - 250, 40);

    // Ground texture
    stroke('#B8A082');
    strokeWeight(1);
    for (let x = 40; x < canvasWidth - 230; x += 15) {
        line(x, groundY + 5, x + 8, groundY + 25);
    }

    // Box
    fill('#3498DB');
    stroke('#2980B9');
    strokeWeight(2);
    rect(boxCenterX - boxW/2, boxCenterY - boxH/2, boxW, boxH, 5);

    // Mass label on box
    fill('white');
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text(massSlider.value() + ' kg', boxCenterX, boxCenterY);

    // Force vectors
    let forceScale = 0.6;
    let thetaRad = radians(theta);

    // Applied force F (red)
    let fLen = F * forceScale;
    let fEndX = boxCenterX + fLen * cos(-thetaRad);
    let fEndY = boxCenterY + fLen * sin(-thetaRad);
    drawArrow(boxCenterX, boxCenterY, fEndX, fEndY, '#E74C3C', 'F');

    // Angle arc
    noFill();
    stroke('#E74C3C');
    strokeWeight(1);
    arc(boxCenterX, boxCenterY, 60, 60, -thetaRad, 0);
    fill('#E74C3C');
    noStroke();
    textSize(12);
    text('θ=' + theta + '°', boxCenterX + 40, boxCenterY - 15);

    if (showComponents) {
        // Horizontal component Fx (dashed red)
        drawDashedArrow(boxCenterX, boxCenterY, boxCenterX + Fx * forceScale, boxCenterY, '#E74C3C');
        fill('#E74C3C');
        textSize(12);
        textAlign(CENTER, TOP);
        text('Fx', boxCenterX + Fx * forceScale * 0.5, boxCenterY + 5);

        // Vertical component Fy (dashed red)
        drawDashedArrow(boxCenterX, boxCenterY, boxCenterX, boxCenterY - Fy * forceScale, '#E74C3C');
        textAlign(LEFT, CENTER);
        text('Fy', boxCenterX + 5, boxCenterY - Fy * forceScale * 0.5);

        // Right angle symbol
        stroke('#E74C3C');
        strokeWeight(1);
        noFill();
        let cornerSize = 10;
        rect(boxCenterX + Fx * forceScale - cornerSize, boxCenterY - cornerSize, cornerSize, cornerSize);
    }

    // Weight mg (purple, pointing down)
    drawArrow(boxCenterX, boxCenterY, boxCenterX, boxCenterY + W * forceScale * 0.5, '#9B59B6', 'mg');

    // Normal force N (green, pointing up)
    if (N > 0) {
        drawArrow(boxCenterX, boxCenterY + boxH/2, boxCenterX, boxCenterY + boxH/2 - N * forceScale * 0.5, '#27AE60', 'N');
    }

    // Friction force (brown, opposing motion)
    if (fk > 0) {
        drawArrow(boxCenterX - boxW/2, boxCenterY + boxH/2 - 10,
                  boxCenterX - boxW/2 - fk * forceScale, boxCenterY + boxH/2 - 10, '#8B4513', 'fk');
    }

    // Status indicator
    textAlign(CENTER, TOP);
    textSize(14);
    if (N <= 0) {
        fill('#E74C3C');
        text('Box lifts off the surface!', boxCenterX, 320);
    } else if (Fx > fk) {
        fill('#27AE60');
        text('Box accelerates right', boxCenterX, 320);
    } else if (Fx < fk) {
        fill('#E74C3C');
        text('Friction exceeds horizontal force', boxCenterX, 320);
    } else {
        fill('#F39C12');
        text('Forces balanced', boxCenterX, 320);
    }
}

function drawInfoPanel(x, y, w, h, F, theta, Fx, Fy, W, N, fk, netFx, a, m) {
    push();
    translate(x, y);

    // Background
    fill(255, 255, 255, 245);
    stroke(200);
    strokeWeight(1);
    rect(0, 0, w, h, 10);

    fill('#333');
    noStroke();
    textSize(13);
    textAlign(LEFT, TOP);

    let lineY = 10;
    let spacing = 20;

    fill('#E74C3C');
    text('Force Analysis', 10, lineY);
    lineY += spacing + 5;

    textSize(11);
    fill('#333');

    text('F = ' + F.toFixed(0) + ' N at θ = ' + theta + '°', 10, lineY);
    lineY += spacing;

    text('Fx = F·cos(θ) = ' + Fx.toFixed(1) + ' N', 10, lineY);
    lineY += spacing;

    text('Fy = F·sin(θ) = ' + Fy.toFixed(1) + ' N', 10, lineY);
    lineY += spacing + 8;

    fill('#27AE60');
    textSize(12);
    text('Normal Force', 10, lineY);
    lineY += spacing;

    textSize(11);
    fill('#333');
    text('N = mg - Fy', 10, lineY);
    lineY += spacing - 3;
    text('N = ' + N.toFixed(1) + ' N', 10, lineY);
    lineY += spacing + 8;

    fill('#8B4513');
    textSize(12);
    text('Friction & Motion', 10, lineY);
    lineY += spacing;

    textSize(11);
    fill('#333');
    text('Friction fk = μk·N = ' + fk.toFixed(1) + ' N', 10, lineY);
    lineY += spacing;

    text('Net Fx = ' + netFx.toFixed(1) + ' N', 10, lineY);
    lineY += spacing;

    if (N > 0) {
        fill(a > 0 ? '#27AE60' : '#E74C3C');
        text('a = ' + a.toFixed(2) + ' m/s²', 10, lineY);
    } else {
        fill('#E74C3C');
        text('Box lifts off!', 10, lineY);
    }

    pop();
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
        textSize(14);
        textAlign(CENTER, CENTER);
        fill(col);
        noStroke();
        let perpAngle = angle + PI/2;
        text(label, x2 + cos(perpAngle) * 15, y2 + sin(perpAngle) * 15);
    }
}

function drawDashedArrow(x1, y1, x2, y2, col) {
    let headSize = 6;
    let angle = atan2(y2 - y1, x2 - x1);

    stroke(col);
    strokeWeight(2);
    drawingContext.setLineDash([5, 5]);
    line(x1, y1, x2, y2);
    drawingContext.setLineDash([]);

    fill(col);
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -headSize * 1.5, -headSize/2, -headSize * 1.5, headSize/2);
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
