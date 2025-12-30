// Comparative Angular Velocities Chart
// Horizontal bar chart with logarithmic scale showing everyday rotating objects

let canvasWidth = 800;
let drawHeight = 595;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Data for rotating objects (sorted by angular velocity)
const rotatingObjects = [
    { name: "Earth's rotation", omega: 7.27e-5, rpm: 0.0007, icon: "🌍" },
    { name: "Hour hand of clock", omega: 1.45e-4, rpm: 0.0014, icon: "🕐" },
    { name: "Minute hand of clock", omega: 1.75e-3, rpm: 0.017, icon: "🕐" },
    { name: "Second hand of clock", omega: 0.105, rpm: 1, icon: "🕐" },
    { name: "Ceiling fan (low)", omega: 10.5, rpm: 100, icon: "🌀" },
    { name: "Bicycle wheel (casual)", omega: 20, rpm: 150, icon: "🚲" },
    { name: "Helicopter rotor", omega: 40, rpm: 400, icon: "🚁" },
    { name: "Car tire (highway)", omega: 70, rpm: 600, icon: "🚗" },
    { name: "Car engine (idle)", omega: 90, rpm: 800, icon: "⚙️" },
    { name: "Washing machine spin", omega: 130, rpm: 1200, icon: "🌀" },
    { name: "Computer CPU fan", omega: 250, rpm: 2500, icon: "💨" },
    { name: "Hard disk drive", omega: 650, rpm: 6000, icon: "💾" },
    { name: "Jet engine turbine", omega: 3000, rpm: 30000, icon: "✈️" },
    { name: "Dental drill", omega: 50000, rpm: 500000, icon: "🦷" }
];

// Chart configuration
let barHeight = 28;
let barSpacing = 34;
let chartLeft = 220;
let chartRight;
let chartTop = 60;
let logMin = -4;
let logMax = 6;

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
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    textSize(22);
    textAlign(CENTER, TOP);
    noStroke();
    text('Angular Velocities in Everyday Life', canvasWidth / 2, 15);

    // Draw chart
    push();
        translate(-50, 0);
        scale(1.1, 1);
        drawLogAxis();
        drawBars();
        drawLegend();
    pop();

    // Draw control area text
    fill('black');
    textSize(14);
    textAlign(CENTER, CENTER);
    text('Hover over bars to see RPM values | Logarithmic scale: 10⁻⁴ to 10⁶ RPM', canvasWidth / 2, drawHeight + 25);
}

function drawLogAxis() {
    let chartWidth = chartRight - chartLeft;

    push();
    translate(0, -10)
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
    text('Rotation Speed (RPM)', (chartLeft + chartRight) / 2, drawHeight - 2);

    // Grid lines
    stroke(230);
    strokeWeight(1);
    for (let exp = logMin; exp <= logMax; exp++) {
        let x = map(exp, logMin, logMax, chartLeft, chartRight);
        line(x, chartTop, x, drawHeight - 40);
    }

    pop();

    // Highlight human-scale range (10 - 10,000 RPM)
    let humanMin = map(1, logMin, logMax, chartLeft, chartRight);
    let humanMax = map(4, logMin, logMax, chartLeft, chartRight);

    fill(200, 230, 200, 80);
    noStroke();
    rect(humanMin, chartTop, humanMax - humanMin, drawHeight - chartTop - 45);

    // Label for human-scale
    fill(80, 130, 80);
    textSize(10);
    textAlign(CENTER, TOP);
    text('Human-scale (10-10,000 RPM)', (humanMin + humanMax) / 2, chartTop + 2);
}

function drawBars() {
    let chartWidth = chartRight - chartLeft;

    for (let i = 0; i < rotatingObjects.length; i++) {
        let obj = rotatingObjects[i];
        let y = chartTop + 18 + i * barSpacing;

        // Calculate bar width based on log scale (using RPM)
        let logRPM = Math.log10(obj.rpm);
        let barWidth = map(logRPM, logMin, logMax, 0, chartWidth);
        barWidth = max(2, barWidth); // Minimum visible width

        // Color based on angular velocity (gradient from slow to fast)
        let hue = map(i, 0, rotatingObjects.length - 1, 200, 0);
        let barColor = color(
            lerp(50, 200, i / (rotatingObjects.length - 1)),
            lerp(100, 50, i / (rotatingObjects.length - 1)),
            lerp(200, 50, i / (rotatingObjects.length - 1))
        );

        // Check if mouse is over this bar (account for translate(-50,0) and scale(1.1,1) transforms)
        let adjustedMouseX = (mouseX + 50) / 1.1;
        let isHovered = mouseY > y - barHeight/2 && mouseY < y + barHeight/2 &&
                        adjustedMouseX > chartLeft && adjustedMouseX < chartLeft + barWidth;

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
            textSize(11);
            let valueText = formatRPM(obj.rpm) + ' RPM';
            let textW = textWidth(valueText);

            // Check if text fits inside the bar (with padding)
            if (textW + 16 < barWidth) {
                // Center text inside the bar
                fill(0);
                noStroke();
                textAlign(CENTER, CENTER);
                text(valueText, chartLeft + barWidth / 2, y);
            } else {
                // Place text to the right of the bar with background
                textAlign(LEFT, CENTER);
                let textX = chartLeft + barWidth + 5;

                fill(255, 255, 220);
                stroke(200);
                rect(textX, y - 10, textW + 10, 20, 3);

                fill(0);
                noStroke();
                text(valueText, textX + 5, y);
            }
        }
    }
}

function formatRPM(rpm) {
    if (rpm < 0.01) {
        return rpm.toFixed(4);
    } else if (rpm < 1) {
        return rpm.toFixed(2);
    } else if (rpm < 100) {
        return rpm.toFixed(1);
    } else {
        return Math.round(rpm).toLocaleString();
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
