// Comparative Angular Velocities Chart
// Horizontal bar chart with logarithmic scale showing everyday rotating objects

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Data for rotating objects (sorted by angular velocity)
const rotatingObjects = [
    { name: "Earth's rotation", omega: 7.27e-5, rpm: 0.0007, icon: "🌍" },
    { name: "Hour hand of clock", omega: 1.45e-4, rpm: 0.0014, icon: "🕐" },
    { name: "Minute hand of clock", omega: 1.75e-3, rpm: 0.017, icon: "🕐" },
    { name: "Second hand of clock", omega: 0.105, rpm: 1, icon: "🕐" },
    { name: "Ceiling fan (low)", omega: 10.5, rpm: 100, icon: "🌀" },
    { name: "Bicycle wheel (casual)", omega: 20, rpm: 191, icon: "🚲" },
    { name: "Helicopter rotor", omega: 40, rpm: 382, icon: "🚁" },
    { name: "Car tire (highway)", omega: 70, rpm: 668, icon: "🚗" },
    { name: "Car engine (idle)", omega: 90, rpm: 859, icon: "⚙️" },
    { name: "Washing machine spin", omega: 130, rpm: 1241, icon: "🌀" },
    { name: "Computer CPU fan", omega: 250, rpm: 2387, icon: "💨" },
    { name: "Hard disk drive", omega: 650, rpm: 6207, icon: "💾" },
    { name: "Jet engine turbine", omega: 3000, rpm: 28648, icon: "✈️" },
    { name: "Dental drill", omega: 50000, rpm: 477465, icon: "🦷" }
];

// Chart configuration
let barHeight = 28;
let barSpacing = 34;
let chartLeft = 220;
let chartRight;
let chartTop = 60;
let logMin = -5;
let logMax = 5;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    describe('Horizontal bar chart comparing angular velocities of common rotating objects on a logarithmic scale', LABEL);
}

function draw() {
    updateCanvasSize();
    chartRight = canvasWidth - 40;

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
    text('Angular Velocities in Everyday Life', canvasWidth / 2, 15);

    // Draw chart
    drawLogAxis();
    drawBars();
    drawLegend();

    // Draw control area text
    fill('black');
    textSize(14);
    textAlign(CENTER, CENTER);
    text('Hover over bars to see detailed values | Logarithmic scale: 10⁻⁵ to 10⁵ rad/s', canvasWidth / 2, drawHeight + 25);
}

function drawLogAxis() {
    let chartWidth = chartRight - chartLeft;

    // Axis line
    stroke(100);
    strokeWeight(2);
    line(chartLeft, drawHeight - 35, chartRight, drawHeight - 35);

    // Tick marks and labels
    textSize(11);
    textAlign(CENTER, TOP);
    fill(80);

    for (let exp = logMin; exp <= logMax; exp++) {
        let x = map(exp, logMin, logMax, chartLeft, chartRight);

        // Tick mark
        stroke(100);
        strokeWeight(1);
        line(x, drawHeight - 35, x, drawHeight - 30);

        // Label
        noStroke();
        if (exp === 0) {
            text('1', x, drawHeight - 25);
        } else {
            text('10', x - 5, drawHeight - 25);
            textSize(8);
            text(exp.toString(), x + 8, drawHeight - 28);
            textSize(11);
        }
    }

    // Axis label
    textSize(14);
    textAlign(CENTER, CENTER);
    fill(60);
    text('Angular Velocity (rad/s)', (chartLeft + chartRight) / 2, drawHeight - 8);

    // Grid lines
    stroke(230);
    strokeWeight(1);
    for (let exp = logMin; exp <= logMax; exp++) {
        let x = map(exp, logMin, logMax, chartLeft, chartRight);
        line(x, chartTop, x, drawHeight - 40);
    }

    // Highlight human-scale range
    let humanMin = map(0, logMin, logMax, chartLeft, chartRight);
    let humanMax = map(3, logMin, logMax, chartLeft, chartRight);

    fill(200, 230, 200, 80);
    noStroke();
    rect(humanMin, chartTop, humanMax - humanMin, drawHeight - chartTop - 45);

    // Label for human-scale
    fill(80, 130, 80);
    textSize(10);
    textAlign(CENTER, TOP);
    text('Human-scale (1-1000 rad/s)', (humanMin + humanMax) / 2, chartTop + 2);
}

function drawBars() {
    let chartWidth = chartRight - chartLeft;

    for (let i = 0; i < rotatingObjects.length; i++) {
        let obj = rotatingObjects[i];
        let y = chartTop + 18 + i * barSpacing;

        // Calculate bar width based on log scale
        let logOmega = Math.log10(obj.omega);
        let barWidth = map(logOmega, logMin, logMax, 0, chartWidth);
        barWidth = max(2, barWidth); // Minimum visible width

        // Color based on angular velocity (gradient from slow to fast)
        let hue = map(i, 0, rotatingObjects.length - 1, 200, 0);
        let barColor = color(
            lerp(50, 200, i / (rotatingObjects.length - 1)),
            lerp(100, 50, i / (rotatingObjects.length - 1)),
            lerp(200, 50, i / (rotatingObjects.length - 1))
        );

        // Check if mouse is over this bar
        let isHovered = mouseY > y - barHeight/2 && mouseY < y + barHeight/2 &&
                        mouseX > chartLeft && mouseX < chartLeft + barWidth;

        // Draw bar
        if (isHovered) {
            fill(255, 200, 100);
            stroke(200, 150, 50);
        } else {
            fill(barColor);
            stroke(red(barColor) * 0.7, green(barColor) * 0.7, blue(barColor) * 0.7);
        }
        strokeWeight(1);
        rect(chartLeft, y - barHeight/2, barWidth, barHeight, 3);

        // Object name with icon
        fill(40);
        noStroke();
        textSize(12);
        textAlign(RIGHT, CENTER);
        text(obj.icon + ' ' + obj.name, chartLeft - 8, y);

        // Show value on hover
        if (isHovered) {
            fill(0);
            textSize(11);
            textAlign(LEFT, CENTER);
            let valueText = obj.omega.toExponential(2) + ' rad/s (' + formatRPM(obj.rpm) + ' rpm)';

            // Background for text
            let textX = chartLeft + barWidth + 5;
            let textW = textWidth(valueText) + 10;

            fill(255, 255, 220);
            stroke(200);
            rect(textX, y - 10, textW, 20, 3);

            fill(0);
            noStroke();
            text(valueText, textX + 5, y);
        }
    }
}

function formatRPM(rpm) {
    if (rpm < 1) {
        return rpm.toFixed(4);
    } else if (rpm < 100) {
        return rpm.toFixed(1);
    } else if (rpm < 10000) {
        return Math.round(rpm).toLocaleString();
    } else {
        return rpm.toExponential(1);
    }
}

function drawLegend() {
    // Legend box
    let legendX = chartRight - 150;
    let legendY = chartTop + 20;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(legendX, legendY, 140, 55, 5);

    fill(40);
    textSize(11);
    textAlign(LEFT, TOP);
    noStroke();

    text('Slower rotation', legendX + 10, legendY + 8);
    text('Faster rotation', legendX + 10, legendY + 35);

    // Color indicators
    fill(50, 100, 200);
    noStroke();
    rect(legendX + 115, legendY + 8, 15, 12, 2);

    fill(200, 50, 50);
    rect(legendX + 115, legendY + 35, 15, 12, 2);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(600, container.offsetWidth);
    }
}
