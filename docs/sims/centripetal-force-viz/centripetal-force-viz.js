// Centripetal Force and Acceleration Visualization
// Shows velocity, acceleration, and force vectors for circular motion

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let startButtonWidth;
let sliderLeftMargin = 200;
let margin = 20

let speedSlider, radiusSlider, massSlider;
let showGhostsCheckbox;
let startPauseButton;
let angle = 0;
let isPaused = true;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    speedSlider = createSlider(2, 40, 30, 0.5);
    speedSlider.position(sliderLeftMargin, drawHeight + 12);

    radiusSlider = createSlider(50, 150, 100, 10);
    radiusSlider.position(sliderLeftMargin, drawHeight + 42);

    massSlider = createSlider(1, 10, 2, 0.5);
    massSlider.position(sliderLeftMargin, drawHeight + 72);

    showGhostsCheckbox = createCheckbox(' Show path positions', false);
    showGhostsCheckbox.style('font-size', '16px');


    startPauseButton = createButton('Start');
    startPauseButton.position(10, drawHeight + 12);
    startPauseButton.mousePressed(togglePause);
    // set the global variable for button width
    startButtonWidth = startPauseButton.size().width;


    updateSliderWidths();

    describe('Visualization of velocity, centripetal acceleration, and force for circular motion', LABEL);

    // notify parent frame of initial size
    window.parent.postMessage({ type: 'microsim-resize', height: canvasHeight }, '*');
}

function updateSliderWidths() {
    let checkboxX = canvasWidth - 190;
    let gap = 10;
    let sliderWidth = checkboxX - sliderLeftMargin - gap;
    speedSlider.size(sliderWidth);
    radiusSlider.size(sliderWidth);
    massSlider.size(sliderWidth);
    showGhostsCheckbox.position(checkboxX, drawHeight + 10);
}

function togglePause() {
    isPaused = !isPaused;
    startPauseButton.html(isPaused ? 'Start' : 'Pause');
}

function draw() {
    let prevWidth = canvasWidth;
    updateCanvasSize();
    if (canvasWidth !== prevWidth) {
        resizeCanvas(canvasWidth, canvasHeight);
        updateSliderWidths();
    }

    let vel = speedSlider.value();
    let radius = radiusSlider.value();
    let mass = massSlider.value();

    // Update angle
    let omega = vel / radius;
    if (!isPaused) {
        angle += omega * 0.02;
    }

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textSize(30);
    textAlign(CENTER, TOP);
    text('Centripetal Force and Acceleration', canvasWidth * 0.35, 10);

    // Calculate physics
    let ac = vel * vel / radius;
    let Fc = mass * ac;

    // Draw circular path and object
    drawCircularMotion(vel, radius, mass, ac, Fc, showGhostsCheckbox.checked());

    // Draw info panel
    // position at top right
    // parameters: x, y, width, height, v, r, m, ac, Fc, omega
    // width is 160 and the distance from right edge is margin 20 + width
    drawInfoPanel(canvasWidth - 180, margin, 160, 280, vel, radius, mass, ac, Fc, omega);

    // Control labels
    fill('black');
    noStroke();
    textSize(16);
    textAlign(RIGHT, CENTER);
    // position labels to the left of the sliders but after the button
    let labelXoffset = startButtonWidth + 150;
    text('Speed: ' + vel.toFixed(1) + ' m/s', labelXoffset, drawHeight + 20);
    text('Radius: ' + radius + ' m', labelXoffset, drawHeight + 50);
    text('Mass: ' + mass.toFixed(1) + ' kg', labelXoffset, drawHeight + 80);
}

function drawCircularMotion(vel, radius, mass, ac, Fc, showGhosts) {
    let centerX = 280;
    let centerY = 240;
    let displayRadius = radius * 1.2;

    // Circular path
    stroke('#AAA');
    strokeWeight(2);
    drawingContext.setLineDash([8, 8]);
    noFill();
    ellipse(centerX, centerY, displayRadius * 2, displayRadius * 2);
    drawingContext.setLineDash([]);

    // Center point
    fill('#666');
    noStroke();
    ellipse(centerX, centerY, 10, 10);
    textSize(11);
    textAlign(CENTER, TOP);
    text('Center', centerX, centerY + 10);

    // Direction arrow on path
    stroke('#AAA');
    strokeWeight(1);
    let arcAngle = angle + PI/4;
    let arcX = centerX + displayRadius * cos(arcAngle);
    let arcY = centerY + displayRadius * sin(arcAngle);
    let tangentAngle = arcAngle + PI/2;
    drawSmallArrow(arcX, arcY, arcX + 15 * cos(tangentAngle), arcY + 15 * sin(tangentAngle), '#AAA');

    // Ghost positions showing velocity changes
    if (showGhosts) {
        let ghostAngles = [0, PI/2, PI, 3*PI/2];
        for (let ga of ghostAngles) {
            let gx = centerX + displayRadius * cos(ga);
            let gy = centerY + displayRadius * sin(ga);

            // Ghost ball
            fill(100, 150, 255, 100);
            noStroke();
            ellipse(gx, gy, 20, 20);

            // Velocity vector (tangent)
            let tangent = ga + PI/2;
            let vLen = min(vel * 4, 50);
            drawArrow(gx, gy, gx + vLen * cos(tangent), gy + vLen * sin(tangent), '#27AE6080');

            // Acceleration/Force toward center
            let toCenter = atan2(centerY - gy, centerX - gx);
            let aLen = min(ac * 3, 40);
            drawArrow(gx, gy, gx + aLen * cos(toCenter), gy + aLen * sin(toCenter), '#3498DB80');
        }
    }

    // Current object position
    let objX = centerX + displayRadius * cos(angle);
    let objY = centerY + displayRadius * sin(angle);

    // Object (ball) - size scales with mass
    let ballSize = 15 + mass * 2;
    fill('#E74C3C');
    stroke('#C0392B');
    strokeWeight(2);
    ellipse(objX, objY, ballSize, ballSize);

    // Radius line
    stroke('#666');
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(centerX, centerY, objX, objY);
    drawingContext.setLineDash([]);

    // Radius label
    fill('#666');
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    let midX = (centerX + objX) / 2;
    let midY = (centerY + objY) / 2;
    text('r', midX + 10, midY - 10);

    // Velocity vector (tangent to circle)
    let tangentAngle2 = angle + PI/2;
    let vLen = min(vel * 5, 70);
    let vEndX = objX + vLen * cos(tangentAngle2);
    let vEndY = objY + vLen * sin(tangentAngle2);
    drawArrow(objX, objY, vEndX, vEndY, '#27AE60');

    // Velocity label
    fill('#27AE60');
    textSize(12);
    textAlign(CENTER, CENTER);
    text('v', vEndX + 10 * cos(tangentAngle2), vEndY + 10 * sin(tangentAngle2));

    // Centripetal acceleration (toward center)
    let toCenter = atan2(centerY - objY, centerX - objX);
    let aLen = min(ac * 4, 60);
    let aEndX = objX + aLen * cos(toCenter);
    let aEndY = objY + aLen * sin(toCenter);
    drawArrow(objX, objY, aEndX, aEndY, '#3498DB');

    // ac label
    fill('#3498DB');
    text('ac', aEndX + 15 * cos(toCenter), aEndY + 15 * sin(toCenter));

    // Centripetal force (parallel to ac)
    let fLen = min(Fc * 3, 55);
    let fEndX = objX + fLen * cos(toCenter);
    let fEndY = objY + fLen * sin(toCenter);

    // Draw Fc slightly offset
    let offsetAngle = toCenter + PI/2;
    let offset = 5;
    drawArrow(objX + offset * cos(offsetAngle), objY + offset * sin(offsetAngle),
              fEndX + offset * cos(offsetAngle), fEndY + offset * sin(offsetAngle), '#E74C3C');

    fill('#E74C3C');
    text('Fc', fEndX + offset * cos(offsetAngle) + 15 * cos(toCenter),
               fEndY + offset * sin(offsetAngle) + 15 * sin(toCenter));

    // Key insights box in the lower right
    // the panel is 180 wide and needs a 20 margin from right and bottom
    drawKeyInsights(canvasWidth - 200, 320);
}

function drawKeyInsights(x, y) {
    push();
    translate(x, y);

    fill('white');
    stroke('#27AE60');
    strokeWeight(2);
    rect(0, 0, 180, 110, 10);

    fill('#27AE60');
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    text('Key Insights:', 10, 10);

    textSize(10);
    fill('#333');
    let lineHeight = 15;
    text('• Velocity v is tangent to path', 10, 10 + lineHeight*2);
    text('• ac and Fc point toward center', 10, 10 + lineHeight*3);
    text('• v ⊥ ac (perpendicular)', 10, 10 + lineHeight*4);
    text('• Constant |v|, changing direction', 10, 10 + lineHeight*5);

    pop();
}

// Draws the info panel with calculations
function drawInfoPanel(x, y, w, h, v, r, m, ac, Fc, omega) {
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

    fill('#27AE60');
    text('Velocity', 10, lineY);
    lineY += spacing;

    textSize(11);
    fill('#333');
    text('v = ' + v.toFixed(1) + ' m/s (tangent)', 10, lineY);
    lineY += spacing;
    text('ω = v/r = ' + omega.toFixed(2) + ' rad/s', 10, lineY);
    lineY += spacing + 8;

    fill('#3498DB');
    textSize(12);
    text('Centripetal Acceleration', 10, lineY);
    lineY += spacing;

    textSize(11);
    fill('#333');
    text('ac = v²/r', 10, lineY);
    lineY += spacing - 3;
    text('ac = ' + v.toFixed(1) + '² / ' + r, 10, lineY);
    lineY += spacing - 3;
    fill('#3498DB');
    text('ac = ' + ac.toFixed(2) + ' m/s²', 10, lineY);
    lineY += spacing + 8;

    fill('#E74C3C');
    textSize(12);
    text('Centripetal Force', 10, lineY);
    lineY += spacing;

    textSize(11);
    fill('#333');
    text('Fc = mac = mv²/r', 10, lineY);
    lineY += spacing - 3;
    text('Fc = ' + m.toFixed(1) + ' × ' + ac.toFixed(2), 10, lineY);
    lineY += spacing - 3;
    fill('#E74C3C');
    text('Fc = ' + Fc.toFixed(1) + ' N', 10, lineY);
    lineY += spacing + 8;

    fill('#9B59B6');
    textSize(11);
    text('Alternative form:', 10, lineY);
    lineY += spacing - 3;
    text('ac = ω²r = ' + (omega * omega * r).toFixed(2) + ' m/s²', 10, lineY);

    pop();
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

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    updateSliderWidths();
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
    }
}
