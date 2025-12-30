// Electric Field Lines Visualization MicroSim
// Visualize electric field patterns around point charges

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 500;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 30;

// Charges array
let charges = [];

// UI Elements
let q1Slider, q2Slider;
let resetButton, addPositiveButton, addNegativeButton, clearButton;
let numLinesSlider;
let showVectorsCheckbox, showVectors = false;

// Field line parameters
let numLines = 12;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Default charges: dipole configuration
    charges.push({ x: canvasWidth/2 - 120, y: drawHeight/2, q: 5 });
    charges.push({ x: canvasWidth/2 + 120, y: drawHeight/2, q: -5 });

    // Create sliders
    q1Slider = createSlider(-10, 10, 5, 1);
    q1Slider.input(() => { if (charges.length > 0) charges[0].q = q1Slider.value(); });

    q2Slider = createSlider(-10, 10, -5, 1);
    q2Slider.input(() => { if (charges.length > 1) charges[1].q = q2Slider.value(); });

    numLinesSlider = createSlider(6, 24, 12, 2);
    numLinesSlider.input(() => numLines = numLinesSlider.value());

    // Buttons
    resetButton = createButton('Reset Dipole');
    resetButton.mousePressed(resetDipole);

    clearButton = createButton('Clear All');
    clearButton.mousePressed(clearCharges);

    showVectorsCheckbox = createCheckbox(' Show field vectors', false);
    showVectorsCheckbox.changed(() => showVectors = showVectorsCheckbox.checked());

    // Position all controls based on canvas size
    updateControlPositions();

    // Instructions
    describe('Electric field lines visualization around point charges', LABEL);
}

function resetDipole() {
    charges = [];
    charges.push({ x: canvasWidth/2 - 120, y: drawHeight/2, q: 5 });
    charges.push({ x: canvasWidth/2 + 120, y: drawHeight/2, q: -5 });
    q1Slider.value(5);
    q2Slider.value(-5);
}

function clearCharges() {
    charges = [];
}

function mousePressed() {
    // Add or move charges on click in draw area
    if (mouseY > 50 && mouseY < drawHeight - 10 && mouseX > 10 && mouseX < canvasWidth - 10) {
        // Check if clicking on existing charge
        for (let i = 0; i < charges.length; i++) {
            let d = dist(mouseX, mouseY, charges[i].x, charges[i].y);
            if (d < 25) {
                // Dragging handled in mouseDragged
                return;
            }
        }
    }
}

function mouseDragged() {
    // Drag charges
    if (mouseY > 50 && mouseY < drawHeight - 10) {
        for (let i = 0; i < charges.length; i++) {
            let d = dist(mouseX, mouseY, charges[i].x, charges[i].y);
            if (d < 40) {
                charges[i].x = constrain(mouseX, 40, canvasWidth - 40);
                charges[i].y = constrain(mouseY, 60, drawHeight - 40);
                return;
            }
        }
    }
}

function draw() {
    updateCanvasSize();

    // Update charges from sliders
    if (charges.length > 0) charges[0].q = q1Slider.value();
    if (charges.length > 1) charges[1].q = q2Slider.value();
    numLines = numLinesSlider.value();

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Draw title
    fill('black');
    noStroke();
    textSize(32);
    textAlign(CENTER, TOP);
    text("Electric Field Lines", canvasWidth / 2, 12);
    textSize(16);
    text("Drag Charges to Reposition", canvasWidth / 2, 45);


    // Draw field lines
    if (charges.length > 0) {
        drawFieldLines();
    }

    // Draw field vectors if enabled
    if (showVectors && charges.length > 0) {
        drawFieldVectors();
    }

    // Draw charges
    for (let charge of charges) {
        drawCharge(charge);
    }

    // Draw slider labels
    drawSliderLabels();

    // Draw legend
    drawLegend();
}

function drawCharge(charge) {
    let radius = 30;
    noStroke();

    if (charge.q > 0) {
        fill('#E53935'); // Red for positive
    } else if (charge.q < 0) {
        fill('#2196F3'); // Blue for negative
    } else {
        fill('#9E9E9E'); // Gray for neutral
    }

    circle(charge.x, charge.y, radius);

    // Charge symbol
    fill('white');
    textSize(20);
    textAlign(CENTER, CENTER);
    if (charge.q > 0) {
        text('+', charge.x, charge.y);
    } else if (charge.q < 0) {
        text('−', charge.x, charge.y);
    }

    // Charge value label
    fill('black');
    textSize(11);
    text(abs(charge.q) + ' μC', charge.x, charge.y - 25);
}

function drawFieldLines() {
    stroke('#4CAF50');
    strokeWeight(1.5);
    noFill();

    // Draw field lines from positive charges
    for (let charge of charges) {
        if (charge.q > 0) {
            let lineCount = floor(numLines * abs(charge.q) / 10);
            lineCount = max(lineCount, 4);

            for (let i = 0; i < lineCount; i++) {
                let angle = (TWO_PI * i) / lineCount;
                let startX = charge.x + 20 * cos(angle);
                let startY = charge.y + 20 * sin(angle);
                drawFieldLine(startX, startY, 1);
            }
        }
    }

    // If only negative charges, draw lines coming in
    let hasPositive = charges.some(c => c.q > 0);
    if (!hasPositive) {
        for (let charge of charges) {
            if (charge.q < 0) {
                let lineCount = floor(numLines * abs(charge.q) / 10);
                lineCount = max(lineCount, 4);

                for (let i = 0; i < lineCount; i++) {
                    let angle = (TWO_PI * i) / lineCount;
                    // Start from edge of canvas
                    let startX = canvasWidth/2 + 400 * cos(angle);
                    let startY = drawHeight/2 + 350 * sin(angle);
                    startX = constrain(startX, 10, canvasWidth - 10);
                    startY = constrain(startY, 50, drawHeight - 10);
                    drawFieldLine(startX, startY, 1);
                }
            }
        }
    }
}

function drawFieldLine(startX, startY, direction) {
    let x = startX;
    let y = startY;
    let stepSize = 3;
    let maxSteps = 500;

    // Store path points for arrowhead placement
    let pathPoints = [{x: x, y: y}];

    beginShape();
    vertex(x, y);

    for (let step = 0; step < maxSteps; step++) {
        let field = getElectricField(x, y);
        let mag = sqrt(field.x * field.x + field.y * field.y);

        if (mag < 0.0001) break;

        // Normalize and step
        let dx = (field.x / mag) * stepSize * direction;
        let dy = (field.y / mag) * stepSize * direction;

        x += dx;
        y += dy;

        // Check if out of bounds
        if (x < 5 || x > canvasWidth - 5 || y < 45 || y > drawHeight - 5) break;

        // Check if hit a charge
        let hitCharge = false;
        for (let charge of charges) {
            if (dist(x, y, charge.x, charge.y) < 18) {
                hitCharge = true;
                break;
            }
        }

        pathPoints.push({x: x, y: y});

        if (hitCharge) {
            vertex(x, y);
            break;
        }

        vertex(x, y);
    }

    endShape();

    // Draw arrowhead at actual midpoint of path
    if (pathPoints.length > 2) {
        let midIndex = floor(pathPoints.length / 2);
        let midPoint = pathPoints[midIndex];
        let field = getElectricField(midPoint.x, midPoint.y);
        let angle = atan2(field.y, field.x);

        push();
        translate(midPoint.x, midPoint.y);
        rotate(angle);
        fill('#4CAF50');
        noStroke();
        triangle(0, 0, -8, -4, -8, 4);
        pop();
    }
}

function getElectricField(x, y) {
    let Ex = 0;
    let Ey = 0;

    for (let charge of charges) {
        let dx = x - charge.x;
        let dy = y - charge.y;
        let rSq = dx * dx + dy * dy;
        let r = sqrt(rSq);

        if (r < 5) continue;

        // E = kq/r² in direction away from charge
        let E = charge.q / rSq;
        Ex += E * dx / r;
        Ey += E * dy / r;
    }

    return { x: Ex, y: Ey };
}

function drawFieldVectors() {
    let spacing = 50;

    for (let x = 50; x < canvasWidth - 30; x += spacing) {
        for (let y = 70; y < drawHeight - 30; y += spacing) {
            // Skip if too close to a charge
            let tooClose = false;
            for (let charge of charges) {
                if (dist(x, y, charge.x, charge.y) < 40) {
                    tooClose = true;
                    break;
                }
            }
            if (tooClose) continue;

            let field = getElectricField(x, y);
            let mag = sqrt(field.x * field.x + field.y * field.y);

            if (mag < 0.0001) continue;

            // Normalize and scale
            let scale = min(20, mag * 500);
            let dx = (field.x / mag) * scale;
            let dy = (field.y / mag) * scale;

            stroke(150, 100, 200);
            strokeWeight(1);
            line(x, y, x + dx, y + dy);

            // Small arrowhead
            let angle = atan2(dy, dx);
            fill(150, 100, 200);
            noStroke();
            push();
            translate(x + dx, y + dy);
            rotate(angle);
            triangle(0, 0, -5, -2.5, -5, 2.5);
            pop();
        }
    }
}

function drawSliderLabels() {
    fill('black');
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);

    // Use same spacing as updateControlPositions
    let sliderWidth = canvasWidth * 0.25;
    let sliderSpacing = canvasWidth * 0.29;

    // Labels above sliders
    let labelY = drawHeight + 10;
    // Labels below sliders
    let labelY2 = drawHeight + 45;

    // Q1 label - centered over first slider
    let q1 = charges.length > 0 ? charges[0].q : 0;
    let q1CenterX = sliderLeftMargin + sliderWidth / 2;
    fill(q1 > 0 ? '#E53935' : (q1 < 0 ? '#2196F3' : '#666'));
    text('q₁: ' + (q1 > 0 ? '+' : '') + q1 + ' μC', q1CenterX, labelY);
    // Plus and minus signs under the slider
    textSize(24);
    text('—', sliderLeftMargin + 10, labelY2);
    text('+', sliderLeftMargin + sliderWidth - 10, labelY2);

    // Q2 label - centered over second slider
    textSize(16);
    let q2 = charges.length > 1 ? charges[1].q : 0;
    let q2CenterX = sliderLeftMargin + sliderSpacing + sliderWidth / 2;
    fill(q2 > 0 ? '#E53935' : (q2 < 0 ? '#2196F3' : '#666'));
    text('q₂: ' + (q2 > 0 ? '+' : '') + q2 + ' μC', q2CenterX, labelY);

    // Plus and minus signs under the slider
    textSize(24);
    text('—', sliderLeftMargin + sliderSpacing + 10, labelY2);
    text('+', sliderLeftMargin + sliderSpacing + sliderWidth - 10, labelY2);

    // Field lines label - centered over third slider
    fill('black');
    textSize(16);
    let linesCenterX = sliderLeftMargin + sliderSpacing * 2 + sliderWidth / 2;
    text('Lines: ' + numLines, linesCenterX, labelY);
}

function drawLegend() {
    let legendX = canvasWidth - 220;
    let legendY = drawHeight + 70;

    fill('black');
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);

    fill('#E53935');
    circle(legendX, legendY, 12);
    fill('black');
    text('Positive charge', legendX + 12, legendY);

    fill('#2196F3');
    circle(legendX + 120, legendY, 12);
    fill('black');
    text('Negative charge', legendX + 132, legendY);

    textSize(10);
    fill('#666');
    text('Drag charges to reposition', legendX, legendY + 20);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 900);
    }
    canvasHeight = drawHeight + controlHeight;
}

function updateControlPositions() {
    // Calculate responsive positions and sizes
    let sliderY = drawHeight + 20;
    let sliderWidth = canvasWidth * 0.25;
    let sliderSpacing = canvasWidth * 0.29;

    // Position sliders
    q1Slider.position(sliderLeftMargin, sliderY);
    q1Slider.size(sliderWidth);

    q2Slider.position(sliderLeftMargin + sliderSpacing, sliderY);
    q2Slider.size(sliderWidth);

    numLinesSlider.position(sliderLeftMargin + sliderSpacing * 2, sliderY);
    numLinesSlider.size(sliderWidth);

    // Position buttons and checkbox
    let buttonY = drawHeight + 65;
    resetButton.position(margin, buttonY);
    clearButton.position(margin + 110, buttonY);
    showVectorsCheckbox.position(margin + 200, buttonY + 3);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    updateControlPositions();
}
