// Energy Distribution in Rolling Objects Chart
// Stacked bar chart showing KE distribution between translational and rotational

let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Rolling objects data
const rollingObjects = [
    { name: 'Sliding Block', I_factor: 0, trans: 100, rot: 0 },
    { name: 'Solid Sphere', I_factor: 0.4, trans: 71.4, rot: 28.6 },
    { name: 'Solid Cylinder', I_factor: 0.5, trans: 66.7, rot: 33.3 },
    { name: 'Hollow Sphere', I_factor: 0.667, trans: 60.0, rot: 40.0 },
    { name: 'Hollow Cylinder', I_factor: 1.0, trans: 50.0, rot: 50.0 }
];

// Chart configuration
let barWidth = 80;
let barSpacing = 120;
let chartLeft = 100;
let chartBottom = 380;
let chartHeight = 280;

// Animation
let animProgress = 0;
let animSpeed = 0.02;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    describe('Stacked bar chart showing how kinetic energy is distributed between translational and rotational components for different rolling objects', LABEL);
}

function draw() {
    updateCanvasSize();

    // Animate bars growing
    if (animProgress < 1) {
        animProgress += animSpeed;
    }

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
    textSize(22);
    textAlign(CENTER, TOP);
    noStroke();
    text('Energy Distribution in Rolling vs. Sliding Objects', canvasWidth / 2, 15);

    // Draw chart
    drawAxes();
    drawBars();
    drawLegend();
    drawDataTable();

    // Formula
    fill('black');
    textSize(14);
    textAlign(CENTER, CENTER);
    text('KE_total = ½mv² + ½Iω²    |    For rolling: v = rω', canvasWidth / 2, drawHeight + 25);
}

function drawAxes() {
    // Y-axis
    stroke(100);
    strokeWeight(2);
    line(chartLeft - 10, chartBottom, chartLeft - 10, chartBottom - chartHeight);

    // X-axis
    line(chartLeft - 10, chartBottom, chartLeft + rollingObjects.length * barSpacing, chartBottom);

    // Y-axis labels
    fill(80);
    textSize(12);
    textAlign(RIGHT, CENTER);
    noStroke();

    for (let i = 0; i <= 100; i += 20) {
        let y = chartBottom - (i / 100) * chartHeight;
        text(i + '%', chartLeft - 15, y);

        stroke(220);
        strokeWeight(1);
        line(chartLeft - 5, y, chartLeft + rollingObjects.length * barSpacing - 40, y);
        noStroke();
    }

    // Y-axis title
    push();
    translate(25, chartBottom - chartHeight / 2);
    rotate(-PI / 2);
    textAlign(CENTER, CENTER);
    textSize(14);
    fill(60);
    text('Kinetic Energy (%)', 0, 0);
    pop();
}

function drawBars() {
    for (let i = 0; i < rollingObjects.length; i++) {
        let obj = rollingObjects[i];
        let x = chartLeft + i * barSpacing + 20;

        // Calculate bar heights with animation
        let transHeight = (obj.trans / 100) * chartHeight * animProgress;
        let rotHeight = (obj.rot / 100) * chartHeight * animProgress;

        // Translational KE (bottom, blue)
        fill(70, 130, 220);
        stroke(50, 100, 180);
        strokeWeight(1);
        rect(x, chartBottom - transHeight, barWidth, transHeight);

        // Rotational KE (top, orange)
        if (rotHeight > 0) {
            fill(230, 150, 50);
            stroke(200, 120, 30);
            rect(x, chartBottom - transHeight - rotHeight, barWidth, rotHeight);
        }

        // Object label
        fill(40);
        textSize(11);
        textAlign(CENTER, TOP);
        noStroke();

        // Split long names
        let lines = obj.name.split(' ');
        let labelY = chartBottom + 8;
        for (let line of lines) {
            text(line, x + barWidth / 2, labelY);
            labelY += 14;
        }

        // Percentage labels on bars
        if (animProgress > 0.8) {
            textSize(12);
            textAlign(CENTER, CENTER);

            // Translational percentage
            if (transHeight > 30) {
                fill(255);
                text(obj.trans.toFixed(1) + '%', x + barWidth / 2, chartBottom - transHeight / 2);
            }

            // Rotational percentage
            if (rotHeight > 25) {
                fill(255);
                text(obj.rot.toFixed(1) + '%', x + barWidth / 2, chartBottom - transHeight - rotHeight / 2);
            }
        }

        // I/mR² value
        fill(100);
        textSize(10);
        textAlign(CENTER, TOP);
        if (obj.I_factor > 0) {
            text('I/mR²=' + obj.I_factor.toFixed(2), x + barWidth / 2, chartBottom + 38);
        } else {
            text('(no rotation)', x + barWidth / 2, chartBottom + 38);
        }
    }
}

function drawLegend() {
    let legendX = canvasWidth - 180;
    let legendY = 55;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(legendX, legendY, 160, 70, 8);

    // Translational
    fill(70, 130, 220);
    noStroke();
    rect(legendX + 15, legendY + 15, 20, 15);
    fill(40);
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Translational KE', legendX + 45, legendY + 22);

    // Rotational
    fill(230, 150, 50);
    noStroke();
    rect(legendX + 15, legendY + 40, 20, 15);
    fill(40);
    text('Rotational KE', legendX + 45, legendY + 47);
}

function drawDataTable() {
    // Note about hollow objects
    fill(80);
    textSize(11);
    textAlign(CENTER, BOTTOM);
    noStroke();
    text('Note: Higher I/mR² ratio → more energy in rotation → slower rolling', canvasWidth / 2, drawHeight - 5);
}

function mousePressed() {
    // Reset animation on click
    if (mouseY < drawHeight) {
        animProgress = 0;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(600, container.offsetWidth);
        barSpacing = (canvasWidth - chartLeft - 50) / rollingObjects.length;
        barWidth = min(80, barSpacing - 40);
    }
}
