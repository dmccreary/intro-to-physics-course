// Distance vs Displacement Interactive Visualization MicroSim
// Learning objective: Help students understand the difference between
// distance (path length) and displacement (straight-line change)

// Canvas dimensions - REQUIRED structure
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Grid settings
let gridSize = 40; // pixels per grid square
let metersPerSquare = 10; // 1 square = 10 meters

// Drawing state
let path = [];
let isDrawing = false;
let startPoint;
let currentPoint;
let journeyComplete = false;

// Calculated values
let totalDistance = 0;
let displacement = 0;
let displacementAngle = 0;

// UI controls
let resetButton;
let completeButton;
let showVectorCheckbox;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Initialize start point at center of drawing area
    startPoint = createVector(canvasWidth / 2, drawHeight / 2);
    currentPoint = startPoint.copy();
    path = [startPoint.copy()];

    // Create controls
    resetButton = createButton('Reset');
    resetButton.position(margin, drawHeight + 15);
    resetButton.mousePressed(resetPath);
    resetButton.style('font-size', '14px');
    resetButton.style('padding', '8px 16px');

    completeButton = createButton('Complete Journey');
    completeButton.position(margin + 80, drawHeight + 15);
    completeButton.mousePressed(completeJourney);
    completeButton.style('font-size', '14px');
    completeButton.style('padding', '8px 16px');

    showVectorCheckbox = createCheckbox('Show Displacement Vector', true);
    showVectorCheckbox.position(margin + 230, drawHeight + 15);
    showVectorCheckbox.style('font-size', '14px');

    describe('Interactive visualization where users draw paths to understand distance vs displacement. Distance is the total path length while displacement is the straight-line distance from start to end.', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Draw grid
    drawGrid();

    // Draw coordinate axes
    drawAxes();

    // Draw title
    fill('black');
    noStroke();
    textSize(24);
    textAlign(CENTER, TOP);
    text('Distance vs Displacement', canvasWidth / 2, 10);

    // Draw instructions
    textSize(14);
    textAlign(LEFT, TOP);
    fill(80);
    text('Click and drag to draw a path. See how distance (total path) differs from displacement (straight line).', margin, 40);

    // Draw the path
    drawPath();

    // Draw start point
    fill(0, 180, 0);
    noStroke();
    ellipse(startPoint.x, startPoint.y, 20, 20);
    fill('white');
    textSize(12);
    textAlign(CENTER, CENTER);
    text('S', startPoint.x, startPoint.y);

    // Draw current position
    if (path.length > 0) {
        let endPoint = path[path.length - 1];
        fill(255, 200, 0);
        noStroke();
        ellipse(endPoint.x, endPoint.y, 16, 16);

        // Draw displacement vector if checkbox is checked
        if (showVectorCheckbox.checked() && path.length > 1) {
            drawDisplacementVector(startPoint, endPoint);
        }
    }

    // Calculate and display metrics
    calculateMetrics();
    drawMetrics();

    // Draw example tip
    if (!journeyComplete && path.length < 3) {
        fill(100, 100, 150);
        textSize(13);
        textAlign(CENTER, BOTTOM);
        text('Try making a circle! Notice how distance increases but displacement returns to near zero.', canvasWidth / 2, drawHeight - 10);
    }

    // Draw control labels
    drawControlLabels();
}

function drawGrid() {
    stroke(220);
    strokeWeight(1);

    // Vertical lines
    for (let x = 0; x <= canvasWidth; x += gridSize) {
        line(x, 0, x, drawHeight);
    }

    // Horizontal lines
    for (let y = 0; y <= drawHeight; y += gridSize) {
        line(0, y, canvasWidth, y);
    }
}

function drawAxes() {
    stroke(150);
    strokeWeight(2);

    // X-axis through center
    line(0, drawHeight / 2, canvasWidth, drawHeight / 2);

    // Y-axis through center
    line(canvasWidth / 2, 0, canvasWidth / 2, drawHeight);

    // Axis labels
    fill(100);
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('x (meters)', canvasWidth - 50, drawHeight / 2 + 5);

    push();
    translate(canvasWidth / 2 - 15, 60);
    rotate(-HALF_PI);
    text('y (meters)', 0, 0);
    pop();

    // Draw scale markers
    textSize(10);
    textAlign(CENTER, TOP);
    for (let x = gridSize; x < canvasWidth; x += gridSize * 2) {
        let meters = Math.round((x - canvasWidth / 2) / gridSize * metersPerSquare);
        if (meters !== 0) {
            text(meters, x, drawHeight / 2 + 3);
        }
    }

    textAlign(RIGHT, CENTER);
    for (let y = gridSize; y < drawHeight; y += gridSize * 2) {
        let meters = Math.round((drawHeight / 2 - y) / gridSize * metersPerSquare);
        if (meters !== 0) {
            text(meters, canvasWidth / 2 - 5, y);
        }
    }
}

function drawPath() {
    if (path.length < 2) return;

    stroke(0, 100, 255);
    strokeWeight(3);
    noFill();

    beginShape();
    for (let p of path) {
        vertex(p.x, p.y);
    }
    endShape();
}

function drawDisplacementVector(start, end) {
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    let mag = sqrt(dx * dx + dy * dy);

    if (mag < 5) return;

    // Draw the displacement arrow
    stroke(220, 50, 50);
    strokeWeight(3);
    line(start.x, start.y, end.x, end.y);

    // Draw arrowhead
    let angle = atan2(dy, dx);
    let arrowSize = 12;

    push();
    translate(end.x, end.y);
    rotate(angle);
    fill(220, 50, 50);
    noStroke();
    triangle(0, 0, -arrowSize, -arrowSize / 2, -arrowSize, arrowSize / 2);
    pop();

    // Label the displacement vector
    fill(220, 50, 50);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    let midX = (start.x + end.x) / 2;
    let midY = (start.y + end.y) / 2;

    // Offset label perpendicular to the vector
    let perpX = -dy / mag * 15;
    let perpY = dx / mag * 15;
    text('Displacement', midX + perpX, midY + perpY);
}

function calculateMetrics() {
    // Calculate total distance (path length)
    totalDistance = 0;
    for (let i = 1; i < path.length; i++) {
        let dx = path[i].x - path[i-1].x;
        let dy = path[i].y - path[i-1].y;
        totalDistance += sqrt(dx * dx + dy * dy);
    }

    // Convert to meters
    totalDistance = totalDistance / gridSize * metersPerSquare;

    // Calculate displacement
    if (path.length > 0) {
        let endPoint = path[path.length - 1];
        let dx = endPoint.x - startPoint.x;
        let dy = endPoint.y - startPoint.y;
        displacement = sqrt(dx * dx + dy * dy) / gridSize * metersPerSquare;

        // Calculate angle (in degrees, from positive x-axis, counterclockwise positive)
        displacementAngle = atan2(-dy, dx) * 180 / PI; // Negative dy because y increases downward
        if (displacementAngle < 0) displacementAngle += 360;
    }
}

function drawMetrics() {
    // Draw metrics panel on right side
    let panelX = canvasWidth - 200;
    let panelY = 70;
    let panelW = 180;
    let panelH = 140;

    // Panel background
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 10);

    // Panel content
    fill(0);
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);

    let y = panelY + 15;
    let lineHeight = 22;

    // Distance
    fill(0, 100, 255);
    text('Distance Traveled:', panelX + 10, y);
    y += lineHeight;
    fill(0);
    textSize(16);
    text(totalDistance.toFixed(1) + ' m', panelX + 20, y);
    y += lineHeight + 5;

    // Displacement
    textSize(14);
    fill(220, 50, 50);
    text('Displacement:', panelX + 10, y);
    y += lineHeight;
    fill(0);
    textSize(16);
    text(displacement.toFixed(1) + ' m', panelX + 20, y);
    y += lineHeight - 5;
    textSize(12);
    fill(80);
    text('at ' + displacementAngle.toFixed(0) + '\u00B0', panelX + 20, y);
    y += lineHeight;

    // Ratio
    textSize(14);
    fill(100);
    if (displacement > 0.1) {
        let ratio = totalDistance / displacement;
        text('Ratio: ' + ratio.toFixed(2), panelX + 10, y);
    } else {
        text('Ratio: --', panelX + 10, y);
    }
}

function drawControlLabels() {
    fill(0);
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);

    // Status indicator
    if (journeyComplete) {
        fill(0, 150, 0);
        text('Journey Complete!', margin, drawHeight + 70);

        // Final summary
        fill(80);
        textSize(13);
        let summaryText = 'You traveled ' + totalDistance.toFixed(1) + ' m but ended up only ' +
                         displacement.toFixed(1) + ' m from your starting point.';
        text(summaryText, margin, drawHeight + 90);
    } else {
        fill(80);
        text('Drawing path...', margin, drawHeight + 70);
    }

    // Legend
    textSize(12);
    textAlign(RIGHT, CENTER);

    fill(0, 100, 255);
    text('Blue line = Path (Distance)', canvasWidth - margin, drawHeight + 60);

    fill(220, 50, 50);
    text('Red arrow = Displacement', canvasWidth - margin, drawHeight + 80);
}

function mousePressed() {
    if (mouseY < drawHeight && mouseY > 60 && !journeyComplete) {
        isDrawing = true;
        // Start new path segment from current end
        if (path.length === 1) {
            // First drawing - start from center
            path = [createVector(mouseX, mouseY)];
            startPoint = path[0].copy();
        }
    }
}

function mouseDragged() {
    if (isDrawing && mouseY < drawHeight && mouseY > 60 && !journeyComplete) {
        // Only add point if it's far enough from the last point
        let lastPoint = path[path.length - 1];
        let d = dist(mouseX, mouseY, lastPoint.x, lastPoint.y);
        if (d > 5) {
            path.push(createVector(mouseX, mouseY));
        }
    }
}

function mouseReleased() {
    isDrawing = false;
}

function resetPath() {
    startPoint = createVector(canvasWidth / 2, drawHeight / 2);
    path = [startPoint.copy()];
    totalDistance = 0;
    displacement = 0;
    displacementAngle = 0;
    journeyComplete = false;
}

function completeJourney() {
    if (path.length > 1) {
        journeyComplete = true;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    // Reposition controls
    resetButton.position(margin, drawHeight + 15);
    completeButton.position(margin + 80, drawHeight + 15);
    showVectorCheckbox.position(margin + 230, drawHeight + 15);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 900);
    }
}
