// Work Scenarios Interactive Diagram
// Shows how angle between force and displacement affects work done

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 120;

let angleSlider;
let selectedPanel = 4; // Panel 5 is interactive

let panels = [
    { name: "Pushing Cart", theta: 0, desc: "Same direction", formula: "W = Fd" },
    { name: "Lifting Box", theta: 0, desc: "Force up, displacement up", formula: "W = Fd" },
    { name: "Friction", theta: 180, desc: "Opposite direction", formula: "W = -Fd" },
    { name: "Carrying Box", theta: 90, desc: "Perpendicular", formula: "W = 0" },
    { name: "Pulling Sled", theta: 30, desc: "At angle", formula: "W = Fd cos(θ)" }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Create angle slider for panel 5
    angleSlider = createSlider(0, 90, 30, 1);
    angleSlider.position(sliderLeftMargin, drawHeight + 40);
    angleSlider.size(canvasWidth - sliderLeftMargin - margin);

    describe('Interactive diagram showing how angle affects work done by a force', LABEL);
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
    textSize(20);
    textAlign(CENTER, TOP);
    noStroke();
    text('Work Scenarios: How Angle Affects Work Done', canvasWidth/2, 10);

    // Update panel 5 with slider value
    panels[4].theta = angleSlider.value();

    // Calculate panel dimensions
    let panelWidth = (canvasWidth - 6 * margin) / 5;
    let panelHeight = drawHeight - 100;
    let panelY = 50;

    // Draw each panel
    for (let i = 0; i < 5; i++) {
        let px = margin + i * (panelWidth + margin);
        drawPanel(px, panelY, panelWidth, panelHeight, panels[i], i);
    }

    // Control labels
    textSize(14);
    textAlign(LEFT, CENTER);
    fill('black');
    text('Panel 5 Angle: ' + angleSlider.value() + '°', 10, drawHeight + 20);

    // Show work calculation for panel 5
    let angle = angleSlider.value();
    let cosVal = cos(radians(angle)).toFixed(3);
    let work = (cos(radians(angle)) * 100).toFixed(1);
    text('cos(' + angle + '°) = ' + cosVal + '   W = ' + work + '% of Fd', 10, drawHeight + 60);
}

function drawPanel(x, y, w, h, panel, index) {
    // Panel background
    if (index === 4) {
        fill(255, 255, 220); // Highlight interactive panel
    } else {
        fill(255);
    }
    stroke(150);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    // Panel title
    fill('black');
    textSize(11);
    textAlign(CENTER, TOP);
    noStroke();
    text(panel.name, x + w/2, y + 5);

    // Draw scenario
    let centerX = x + w/2;
    let centerY = y + h/2 - 20;
    let arrowLen = min(w * 0.35, 50);

    // Draw object based on scenario
    drawScenarioObject(centerX, centerY, panel.name, index);

    // Draw displacement vector (blue)
    let dispX, dispY;
    if (panel.name === "Lifting Box") {
        dispX = 0;
        dispY = -arrowLen;
    } else if (panel.name === "Friction") {
        dispX = arrowLen;
        dispY = 0;
    } else {
        dispX = arrowLen;
        dispY = 0;
    }

    stroke(0, 100, 255);
    strokeWeight(3);
    let dispStartX = centerX;
    let dispStartY = centerY + 15;
    if (panel.name === "Lifting Box") {
        dispStartX = centerX + 25;
        dispStartY = centerY;
    }
    drawArrow(dispStartX, dispStartY, dispStartX + dispX, dispStartY + dispY, 'blue');

    // Draw force vector (red)
    let forceX, forceY;
    if (panel.name === "Pushing Cart" || panel.name === "Friction") {
        // Panel 1: same direction, Panel 3: opposite
        if (panel.name === "Friction") {
            forceX = -arrowLen * 0.8;
            forceY = 0;
        } else {
            forceX = arrowLen;
            forceY = 0;
        }
    } else if (panel.name === "Lifting Box") {
        forceX = 0;
        forceY = -arrowLen;
    } else if (panel.name === "Carrying Box") {
        forceX = 0;
        forceY = -arrowLen * 0.8;
    } else if (panel.name === "Pulling Sled") {
        let theta = radians(panel.theta);
        forceX = arrowLen * cos(theta);
        forceY = -arrowLen * sin(theta);
    }

    stroke(220, 50, 50);
    strokeWeight(3);
    let forceStartX = centerX;
    let forceStartY = centerY - 15;
    if (panel.name === "Lifting Box") {
        forceStartX = centerX - 25;
    }
    drawArrow(forceStartX, forceStartY, forceStartX + forceX, forceStartY + forceY, 'red');

    // Draw angle arc for panel 5 or non-zero angles
    if (panel.name === "Pulling Sled" && panel.theta > 0 && panel.theta < 90) {
        noFill();
        stroke(100, 180, 100);
        strokeWeight(2);
        let arcRadius = 25;
        arc(forceStartX, forceStartY + 15, arcRadius * 2, arcRadius * 2, -radians(panel.theta), 0);

        // Draw parallel component (green dashed)
        let compX = arrowLen * cos(radians(panel.theta));
        stroke(50, 180, 50);
        strokeWeight(2);
        drawingContext.setLineDash([5, 5]);
        line(forceStartX, forceStartY + 15, forceStartX + compX, forceStartY + 15);
        drawingContext.setLineDash([]);
    }

    // Angle label
    fill(100, 150, 100);
    textSize(12);
    textAlign(CENTER, CENTER);
    noStroke();
    text('θ = ' + panel.theta + '°', x + w/2, y + h - 55);

    // Formula
    fill('black');
    textSize(11);
    text(panel.formula, x + w/2, y + h - 35);

    // Description
    fill(80);
    textSize(9);
    text(panel.desc, x + w/2, y + h - 18);

    // Work result
    let workResult;
    if (panel.theta === 0) {
        workResult = "Maximum (+)";
        fill(0, 150, 0);
    } else if (panel.theta === 180) {
        workResult = "Maximum (-)";
        fill(200, 0, 0);
    } else if (panel.theta === 90) {
        workResult = "Zero";
        fill(100, 100, 100);
    } else {
        let pct = (cos(radians(panel.theta)) * 100).toFixed(0);
        workResult = pct + "% of Fd";
        fill(0, 100, 180);
    }
    textSize(10);
    text(workResult, x + w/2, y + h - 5);
}

function drawScenarioObject(x, y, name, index) {
    noStroke();

    if (name === "Pushing Cart") {
        // Cart
        fill(150, 100, 50);
        rect(x - 25, y - 15, 50, 25, 3);
        fill(50);
        ellipse(x - 15, y + 12, 12, 12);
        ellipse(x + 15, y + 12, 12, 12);
    } else if (name === "Lifting Box") {
        // Box being lifted
        fill(180, 140, 100);
        rect(x - 15, y - 15, 30, 30, 2);
    } else if (name === "Friction") {
        // Block with friction
        fill(120, 120, 180);
        rect(x - 20, y - 15, 40, 25, 2);
        // Surface
        stroke(100);
        strokeWeight(2);
        line(x - 40, y + 12, x + 40, y + 12);
        // Friction marks
        for (let i = -30; i < 30; i += 10) {
            line(x + i, y + 12, x + i - 5, y + 17);
        }
    } else if (name === "Carrying Box") {
        // Person carrying box (simplified)
        fill(100, 150, 200);
        rect(x - 12, y - 15, 24, 24, 2);
        // Person (stick figure)
        stroke(50);
        strokeWeight(2);
        line(x, y + 10, x, y + 30);
        line(x - 10, y + 35, x, y + 25);
        line(x + 10, y + 35, x, y + 25);
    } else if (name === "Pulling Sled") {
        // Sled
        fill(139, 90, 43);
        beginShape();
        vertex(x - 30, y + 5);
        vertex(x + 20, y + 5);
        vertex(x + 25, y + 10);
        vertex(x - 35, y + 10);
        vertex(x - 30, y + 5);
        endShape(CLOSE);
        // Rope
        stroke(150, 120, 80);
        strokeWeight(2);
        let theta = radians(panels[4].theta);
        line(x + 20, y + 3, x + 45, y + 3 - 25 * sin(theta));
    }
}

function drawArrow(x1, y1, x2, y2, colorName) {
    let angle = atan2(y2 - y1, x2 - x1);
    let headLen = 10;

    if (colorName === 'red') {
        stroke(220, 50, 50);
        fill(220, 50, 50);
    } else if (colorName === 'blue') {
        stroke(0, 100, 255);
        fill(0, 100, 255);
    }
    strokeWeight(3);

    line(x1, y1, x2, y2);

    // Arrowhead
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -headLen, headLen/2, -headLen, -headLen/2);
    pop();
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
        if (typeof angleSlider !== 'undefined') {
            angleSlider.size(canvasWidth - sliderLeftMargin - margin);
        }
    }
}
