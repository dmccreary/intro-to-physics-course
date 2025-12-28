// Electric Field Lines Visualization MicroSim
// Visualize electric field patterns around point charges

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 500;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 120;

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
    let sliderY = drawHeight + 20;
    let sliderWidth = 140;

    q1Slider = createSlider(-10, 10, 5, 1);
    q1Slider.position(sliderLeftMargin, sliderY);
    q1Slider.size(sliderWidth);
    q1Slider.input(() => { if (charges.length > 0) charges[0].q = q1Slider.value(); });

    q2Slider = createSlider(-10, 10, -5, 1);
    q2Slider.position(sliderLeftMargin + 200, sliderY);
    q2Slider.size(sliderWidth);
    q2Slider.input(() => { if (charges.length > 1) charges[1].q = q2Slider.value(); });

    numLinesSlider = createSlider(6, 24, 12, 2);
    numLinesSlider.position(sliderLeftMargin + 400, sliderY);
    numLinesSlider.size(sliderWidth);
    numLinesSlider.input(() => numLines = numLinesSlider.value());

    // Buttons
    let buttonY = drawHeight + 65;
    resetButton = createButton('Reset Dipole');
    resetButton.position(margin, buttonY);
    resetButton.mousePressed(resetDipole);

    clearButton = createButton('Clear All');
    clearButton.position(margin + 110, buttonY);
    clearButton.mousePressed(clearCharges);

    showVectorsCheckbox = createCheckbox(' Show field vectors', false);
    showVectorsCheckbox.position(margin + 200, buttonY + 3);
    showVectorsCheckbox.changed(() => showVectors = showVectorsCheckbox.checked());

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
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Draw title
    fill('black');
    noStroke();
    textSize(22);
    textAlign(CENTER, TOP);
    text("Electric Field Lines", canvasWidth / 2, 12);

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
        if (hitCharge) {
            vertex(x, y);
            break;
        }

        vertex(x, y);
    }

    endShape();

    // Draw arrowhead at midpoint
    if (charges.length >= 1) {
        let midX = (startX + x) / 2;
        let midY = (startY + y) / 2;
        let field = getElectricField(midX, midY);
        let angle = atan2(field.y, field.x);

        push();
        translate(midX, midY);
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
    textSize(13);
    textAlign(LEFT, CENTER);

    let labelY = drawHeight + 30;

    // Q1 label
    let q1 = charges.length > 0 ? charges[0].q : 0;
    fill(q1 > 0 ? '#E53935' : (q1 < 0 ? '#2196F3' : '#666'));
    text('q₁: ' + (q1 > 0 ? '+' : '') + q1 + ' μC', margin, labelY);

    // Q2 label
    let q2 = charges.length > 1 ? charges[1].q : 0;
    fill(q2 > 0 ? '#E53935' : (q2 < 0 ? '#2196F3' : '#666'));
    text('q₂: ' + (q2 > 0 ? '+' : '') + q2 + ' μC', margin + 200, labelY);

    // Field lines label
    fill('black');
    text('Lines: ' + numLines, margin + 400, labelY);
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
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}
