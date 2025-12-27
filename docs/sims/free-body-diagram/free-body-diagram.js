// Free-Body Diagram Tutorial MicroSim
// Teaches students how to draw and interpret free-body diagrams
// Four scenarios: book on table, book pushed with friction, inclined plane, elevator

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 550;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// Scenario selection
let currentScenario = 0;
const scenarios = [
    { name: "Book on Table", description: "Static equilibrium - balanced forces" },
    { name: "Book Pushed with Friction", description: "Net force causes acceleration" },
    { name: "Box on Inclined Plane", description: "Force decomposition on slopes" },
    { name: "Elevator Accelerating Up", description: "Apparent weight changes" }
];

// Controls
let scenarioButtons = [];
let proportionalCheckbox;
let showCalculationsCheckbox;

// Animation
let animPhase = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Create scenario buttons
    let buttonY = drawHeight + 15;
    let buttonX = 10;
    for (let i = 0; i < scenarios.length; i++) {
        let btn = createButton(scenarios[i].name);
        btn.position(buttonX, buttonY);
        btn.mousePressed(() => selectScenario(i));
        btn.style('font-size', '12px');
        btn.style('padding', '5px 10px');
        scenarioButtons.push(btn);
        buttonX += btn.elt.offsetWidth + 10;
    }

    // Create checkboxes
    proportionalCheckbox = createCheckbox(' Proportional Arrows', true);
    proportionalCheckbox.position(10, drawHeight + 55);
    proportionalCheckbox.style('font-size', '14px');

    showCalculationsCheckbox = createCheckbox(' Show Calculations', true);
    showCalculationsCheckbox.position(200, drawHeight + 55);
    showCalculationsCheckbox.style('font-size', '14px');

    describe('Interactive free-body diagram tutorial showing four scenarios with force vectors', LABEL);
}

function selectScenario(index) {
    currentScenario = index;
    animPhase = 0;
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
    text('Free-Body Diagram Tutorial', canvasWidth / 2, 10);

    // Subtitle - current scenario
    textSize(18);
    fill('#0066cc');
    text(scenarios[currentScenario].name + ': ' + scenarios[currentScenario].description, canvasWidth / 2, 40);

    // Reset text settings
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);

    // Draw current scenario
    let proportional = proportionalCheckbox.checked();
    let showCalc = showCalculationsCheckbox.checked();

    switch(currentScenario) {
        case 0:
            drawBookOnTable(proportional, showCalc);
            break;
        case 1:
            drawBookPushed(proportional, showCalc);
            break;
        case 2:
            drawInclinedPlane(proportional, showCalc);
            break;
        case 3:
            drawElevator(proportional, showCalc);
            break;
    }

    // Draw tips panel
    drawTipsPanel();

    // Highlight active button
    for (let i = 0; i < scenarioButtons.length; i++) {
        if (i === currentScenario) {
            scenarioButtons[i].style('background-color', '#4CAF50');
            scenarioButtons[i].style('color', 'white');
        } else {
            scenarioButtons[i].style('background-color', '#e0e0e0');
            scenarioButtons[i].style('color', 'black');
        }
    }

    animPhase += 0.02;
}

function drawBookOnTable(proportional, showCalc) {
    let centerX = canvasWidth / 3;
    let centerY = 280;
    let boxW = 120;
    let boxH = 60;

    // Draw table surface
    fill('#8B4513');
    noStroke();
    rect(centerX - 150, centerY + boxH/2, 300, 20, 3);

    // Draw book
    fill('#4169E1');
    stroke('#2c3e80');
    strokeWeight(2);
    rect(centerX - boxW/2, centerY - boxH/2, boxW, boxH, 5);

    // Label the book
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text('Book', centerX, centerY);
    text('m = 2 kg', centerX, centerY + 20);

    // Calculate forces
    let mass = 2;
    let g = 9.8;
    let weight = mass * g;
    let normal = weight;

    // Force scale
    let scale = proportional ? 3 : 5;
    let weightLen = proportional ? weight * scale : 80;
    let normalLen = proportional ? normal * scale : 80;

    // Draw weight vector (down)
    drawArrow(centerX, centerY, centerX, centerY + weightLen, '#E74C3C', 'W = mg');

    // Draw normal force vector (up)
    drawArrow(centerX, centerY, centerX, centerY - normalLen, '#27AE60', 'N');

    // Free-body diagram on the right
    let fbdX = canvasWidth * 0.7;
    let fbdY = 280;

    // FBD label
    fill('black');
    textAlign(CENTER, TOP);
    textSize(16);
    text('Free-Body Diagram', fbdX, 100);

    // Draw dot representing object
    fill('#4169E1');
    stroke('#2c3e80');
    strokeWeight(2);
    ellipse(fbdX, fbdY, 30, 30);

    // Draw forces on FBD
    drawArrow(fbdX, fbdY, fbdX, fbdY + weightLen, '#E74C3C', 'W');
    drawArrow(fbdX, fbdY, fbdX, fbdY - normalLen, '#27AE60', 'N');

    // Calculations panel
    if (showCalc) {
        drawCalcPanel(canvasWidth * 0.7 - 100, 380, [
            'W = mg = 2 × 9.8 = 19.6 N',
            'N = W = 19.6 N',
            'ΣF = N - W = 0',
            '∴ Acceleration = 0'
        ], '#27AE60');
    }
}

function drawBookPushed(proportional, showCalc) {
    let centerX = canvasWidth / 3;
    let centerY = 280;
    let boxW = 120;
    let boxH = 60;

    // Draw floor
    fill('#8B4513');
    noStroke();
    rect(centerX - 200, centerY + boxH/2, 400, 20, 3);

    // Draw book (slightly moving with animation)
    let moveOffset = sin(animPhase) * 3;
    fill('#4169E1');
    stroke('#2c3e80');
    strokeWeight(2);
    rect(centerX - boxW/2 + moveOffset, centerY - boxH/2, boxW, boxH, 5);

    // Label
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text('Book', centerX + moveOffset, centerY);
    text('m = 2 kg', centerX + moveOffset, centerY + 20);

    // Forces
    let mass = 2;
    let g = 9.8;
    let weight = mass * g;
    let normal = weight;
    let applied = 20;
    let friction = 8;
    let netForce = applied - friction;

    let scale = proportional ? 3 : 4;
    let weightLen = proportional ? weight * scale : 60;
    let normalLen = proportional ? normal * scale : 60;
    let appliedLen = proportional ? applied * scale : 80;
    let frictionLen = proportional ? friction * scale : 32;

    // Draw forces on object
    centerX += moveOffset;
    drawArrow(centerX, centerY, centerX, centerY + weightLen, '#E74C3C', 'W');
    drawArrow(centerX, centerY, centerX, centerY - normalLen, '#27AE60', 'N');
    drawArrow(centerX - boxW/2, centerY, centerX - boxW/2 - frictionLen, centerY, '#F39C12', 'f');
    drawArrow(centerX + boxW/2, centerY, centerX + boxW/2 + appliedLen, centerY, '#9B59B6', 'F_app');

    // FBD on right
    let fbdX = canvasWidth * 0.7;
    let fbdY = 280;

    fill('black');
    textAlign(CENTER, TOP);
    textSize(16);
    text('Free-Body Diagram', fbdX, 100);

    fill('#4169E1');
    stroke('#2c3e80');
    strokeWeight(2);
    ellipse(fbdX, fbdY, 30, 30);

    drawArrow(fbdX, fbdY, fbdX, fbdY + weightLen, '#E74C3C', 'W');
    drawArrow(fbdX, fbdY, fbdX, fbdY - normalLen, '#27AE60', 'N');
    drawArrow(fbdX, fbdY, fbdX - frictionLen, fbdY, '#F39C12', 'f');
    drawArrow(fbdX, fbdY, fbdX + appliedLen, fbdY, '#9B59B6', 'F_app');

    if (showCalc) {
        drawCalcPanel(canvasWidth * 0.7 - 110, 380, [
            'F_app = 20 N, f = 8 N',
            'ΣF_x = 20 - 8 = 12 N →',
            'a = ΣF/m = 12/2 = 6 m/s²',
            'Accelerates right!'
        ], '#9B59B6');
    }
}

function drawInclinedPlane(proportional, showCalc) {
    let baseX = 80;
    let baseY = 420;
    let planeWidth = 350;
    let angle = 30;
    let angleRad = radians(angle);

    // Draw inclined plane
    fill('#8B4513');
    stroke('#5D3A1A');
    strokeWeight(2);
    beginShape();
    vertex(baseX, baseY);
    vertex(baseX + planeWidth, baseY);
    vertex(baseX + planeWidth, baseY - planeWidth * tan(angleRad));
    endShape(CLOSE);

    // Draw angle arc
    noFill();
    stroke('#333');
    strokeWeight(1);
    arc(baseX + planeWidth, baseY, 60, 60, -PI + angleRad, 0);
    fill('black');
    noStroke();
    textSize(14);
    text('θ = 30°', baseX + planeWidth - 70, baseY - 15);

    // Box on slope
    let boxOnSlopeX = baseX + planeWidth * 0.5;
    let boxOnSlopeY = baseY - (planeWidth * 0.5) * tan(angleRad);

    push();
    translate(boxOnSlopeX, boxOnSlopeY);
    rotate(-angleRad);

    fill('#4169E1');
    stroke('#2c3e80');
    strokeWeight(2);
    rect(-40, -50, 80, 50, 5);

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    text('Box', 0, -25);

    pop();

    // Calculate forces
    let mass = 5;
    let g = 9.8;
    let weight = mass * g;
    let wParallel = weight * sin(angleRad);
    let wPerp = weight * cos(angleRad);
    let normal = wPerp;

    let scale = proportional ? 2.5 : 3;
    let weightLen = proportional ? weight * scale : 80;
    let wParLen = proportional ? wParallel * scale : 40;
    let wPerpLen = proportional ? wPerp * scale : 70;
    let normalLen = proportional ? normal * scale : 70;

    // Draw weight (straight down)
    drawArrow(boxOnSlopeX, boxOnSlopeY - 25, boxOnSlopeX, boxOnSlopeY - 25 + weightLen, '#E74C3C', 'W');

    // Draw components (dashed lines)
    stroke('#E74C3C');
    strokeWeight(1);
    drawingContext.setLineDash([5, 5]);
    // Parallel component arrow direction
    let parEndX = boxOnSlopeX - wParLen * cos(angleRad);
    let parEndY = boxOnSlopeY - 25 + wParLen * sin(angleRad);
    line(boxOnSlopeX, boxOnSlopeY - 25 + weightLen, parEndX, boxOnSlopeY - 25 + weightLen);
    drawingContext.setLineDash([]);

    // Normal force (perpendicular to surface)
    let normEndX = boxOnSlopeX - normalLen * sin(angleRad);
    let normEndY = boxOnSlopeY - 25 - normalLen * cos(angleRad);
    drawArrow(boxOnSlopeX, boxOnSlopeY - 25, normEndX, normEndY, '#27AE60', 'N');

    // Weight parallel to slope (down the slope)
    let parDirX = cos(angleRad);
    let parDirY = sin(angleRad);
    drawArrow(boxOnSlopeX, boxOnSlopeY - 25,
              boxOnSlopeX - wParLen * parDirX,
              boxOnSlopeY - 25 + wParLen * parDirY, '#F39C12', 'W∥');

    // FBD on right
    let fbdX = canvasWidth * 0.75;
    let fbdY = 250;

    fill('black');
    textAlign(CENTER, TOP);
    textSize(16);
    text('Free-Body Diagram', fbdX, 100);
    text('(Tilted coordinates)', fbdX, 120);

    // Draw tilted coordinate axes
    stroke('#aaa');
    strokeWeight(1);
    // x-axis along slope
    line(fbdX - 80, fbdY + 80 * tan(angleRad), fbdX + 80, fbdY - 80 * tan(angleRad));
    // y-axis perpendicular to slope
    line(fbdX - 60 * sin(angleRad), fbdY - 60 * cos(angleRad),
         fbdX + 60 * sin(angleRad), fbdY + 60 * cos(angleRad));

    fill('#4169E1');
    stroke('#2c3e80');
    strokeWeight(2);
    ellipse(fbdX, fbdY, 30, 30);

    // Forces on FBD
    drawArrow(fbdX, fbdY, fbdX, fbdY + weightLen * 0.8, '#E74C3C', 'W');
    drawArrow(fbdX, fbdY, fbdX - normalLen * sin(angleRad), fbdY - normalLen * cos(angleRad), '#27AE60', 'N');

    if (showCalc) {
        drawCalcPanel(canvasWidth * 0.75 - 120, 350, [
            'W = mg = 5 × 9.8 = 49 N',
            'W∥ = mg sin30° = 24.5 N',
            'W⊥ = mg cos30° = 42.4 N',
            'N = W⊥ = 42.4 N'
        ], '#F39C12');
    }
}

function drawElevator(proportional, showCalc) {
    let centerX = canvasWidth / 3;
    let elevTop = 100;
    let elevHeight = 300;
    let elevWidth = 180;

    // Elevator shaft
    fill('#ccc');
    stroke('#999');
    strokeWeight(2);
    rect(centerX - elevWidth/2 - 20, elevTop - 20, elevWidth + 40, elevHeight + 40);

    // Elevator car
    fill('#ddd');
    stroke('#666');
    rect(centerX - elevWidth/2, elevTop, elevWidth, elevHeight, 5);

    // Elevator doors (slightly open showing crack)
    fill('#888');
    rect(centerX - 5, elevTop + 20, 10, elevHeight - 40);

    // Person in elevator
    let personX = centerX;
    let personY = elevTop + elevHeight - 100;

    // Body
    fill('#FFB74D');
    noStroke();
    ellipse(personX, personY - 60, 40, 40); // Head

    fill('#2196F3');
    rect(personX - 20, personY - 40, 40, 60, 5); // Body

    // Scale under person
    fill('#333');
    rect(personX - 35, personY + 25, 70, 15, 3);

    // Scale reading
    let mass = 70;
    let g = 9.8;
    let a = 2;
    let weight = mass * g;
    let normal = mass * (g + a); // Accelerating up

    fill('#0f0');
    textAlign(CENTER, CENTER);
    textSize(12);
    text(normal.toFixed(0) + ' N', personX, personY + 33);

    // Arrow showing elevator motion
    fill('#E74C3C');
    noStroke();
    triangle(centerX + elevWidth/2 + 30, elevTop + 50,
             centerX + elevWidth/2 + 20, elevTop + 70,
             centerX + elevWidth/2 + 40, elevTop + 70);
    textSize(14);
    text('a = 2 m/s²', centerX + elevWidth/2 + 50, elevTop + 80);

    // Forces on person
    let scale = proportional ? 0.15 : 0.12;
    let weightLen = proportional ? weight * scale : 80;
    let normalLen = proportional ? normal * scale : 100;

    drawArrow(personX, personY - 20, personX, personY - 20 + weightLen, '#E74C3C', 'W');
    drawArrow(personX, personY + 20, personX, personY + 20 - normalLen, '#27AE60', 'N');

    // FBD on right
    let fbdX = canvasWidth * 0.72;
    let fbdY = 260;

    fill('black');
    textAlign(CENTER, TOP);
    textSize(16);
    text('Free-Body Diagram', fbdX, 100);

    fill('#FFB74D');
    stroke('#E67E22');
    strokeWeight(2);
    ellipse(fbdX, fbdY, 40, 40);

    drawArrow(fbdX, fbdY, fbdX, fbdY + weightLen, '#E74C3C', 'W = 686 N');
    drawArrow(fbdX, fbdY, fbdX, fbdY - normalLen, '#27AE60', 'N = 826 N');

    // Net force indicator
    let netForce = normal - weight;
    fill('black');
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Net force: ' + netForce.toFixed(0) + ' N ↑', fbdX, fbdY - normalLen - 30);

    if (showCalc) {
        drawCalcPanel(canvasWidth * 0.72 - 120, 380, [
            'W = mg = 70 × 9.8 = 686 N',
            'ΣF = ma = 70 × 2 = 140 N',
            'N - W = ma',
            'N = 686 + 140 = 826 N',
            'Person feels 20% heavier!'
        ], '#27AE60');
    }
}

function drawArrow(x1, y1, x2, y2, col, label) {
    let headSize = 10;
    let angle = atan2(y2 - y1, x2 - x1);

    stroke(col);
    strokeWeight(3);
    line(x1, y1, x2, y2);

    // Arrowhead
    fill(col);
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -headSize * 1.5, -headSize/2, -headSize * 1.5, headSize/2);
    pop();

    // Label
    if (label) {
        fill(col);
        noStroke();
        textSize(14);
        textAlign(CENTER, CENTER);

        let labelOffset = 20;
        let midX = (x1 + x2) / 2;
        let midY = (y1 + y2) / 2;

        // Position label perpendicular to arrow
        let perpAngle = angle + PI/2;
        let labelX = midX + cos(perpAngle) * labelOffset;
        let labelY = midY + sin(perpAngle) * labelOffset;

        text(label, labelX, labelY);
    }
}

function drawCalcPanel(x, y, lines, borderColor) {
    let panelWidth = 220;
    let lineHeight = 22;
    let panelHeight = lines.length * lineHeight + 20;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(borderColor);
    strokeWeight(2);
    rect(x, y, panelWidth, panelHeight, 10);

    // Title
    fill(borderColor);
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text('Calculations:', x + 10, y + 8);

    // Lines
    fill('black');
    textSize(13);
    for (let i = 0; i < lines.length; i++) {
        text(lines[i], x + 10, y + 30 + i * lineHeight);
    }
}

function drawTipsPanel() {
    let panelX = 10;
    let panelY = 80;
    let panelW = 200;

    fill(255, 255, 255, 230);
    stroke('#3498DB');
    strokeWeight(2);
    rect(panelX, panelY, panelW, 110, 10);

    fill('#3498DB');
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text('FBD Tips:', panelX + 10, panelY + 10);

    fill('#333');
    textSize(12);
    let tips = [
        '• Draw object as a dot or box',
        '• Show ALL forces on object',
        '• Arrows start from object',
        '• Length shows magnitude',
        '• Label each force'
    ];
    for (let i = 0; i < tips.length; i++) {
        text(tips[i], panelX + 10, panelY + 30 + i * 16);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    // Reposition buttons
    let buttonY = drawHeight + 15;
    let buttonX = 10;
    for (let i = 0; i < scenarioButtons.length; i++) {
        scenarioButtons[i].position(buttonX, buttonY);
        buttonX += scenarioButtons[i].elt.offsetWidth + 10;
    }

    // Reposition checkboxes
    proportionalCheckbox.position(10, drawHeight + 55);
    showCalculationsCheckbox.position(200, drawHeight + 55);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.min(container.offsetWidth, 900);
    }
}
