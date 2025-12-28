// Applications of Oscillations Across Fields Infographic
// Radial design showing various applications of oscillation principles

let canvasWidth = 750;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Sections
let sections = [
    {
        name: 'Medicine',
        icon: '💓',
        color: [255, 150, 180],
        applications: [
            'Ultrasound imaging (MHz)',
            'Heart rate monitoring',
            'Ventilator oscillations'
        ],
        fact: '2-18 MHz typical ultrasound'
    },
    {
        name: 'Architecture',
        icon: '🏗️',
        color: [150, 180, 255],
        applications: [
            'Earthquake dampers',
            'Tuned mass dampers',
            'Bridge design'
        ],
        fact: '300 ton damper in Taipei 101'
    },
    {
        name: 'Music',
        icon: '🎸',
        color: [200, 150, 255],
        applications: [
            'String vibrations',
            'Resonant sound boxes',
            'Tuning forks (440 Hz)'
        ],
        fact: 'A4 = 440 Hz standard'
    },
    {
        name: 'Transport',
        icon: '🚗',
        color: [150, 220, 150],
        applications: [
            'Shock absorbers',
            'Engine balancing',
            'Wing flutter prevention'
        ],
        fact: 'Car: ~1-2 Hz suspension'
    },
    {
        name: 'Electronics',
        icon: '📡',
        color: [255, 200, 150],
        applications: [
            'Crystal oscillators',
            'Radio transmission',
            'Signal filters'
        ],
        fact: '32,768 Hz quartz watch'
    },
    {
        name: 'Sports',
        icon: '🏊',
        color: [255, 150, 150],
        applications: [
            'Diving boards',
            'Pole vault dynamics',
            'Trampoline physics'
        ],
        fact: '~2-4 Hz diving board'
    }
];

// Interaction
let hoveredSection = -1;
let selectedSection = -1;

// Animation
let rotationOffset = 0;
let pulsePhase = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    describe('Radial infographic showing applications of oscillations across medicine, architecture, music, transportation, electronics, and sports', LABEL);
}

function draw() {
    updateCanvasSize();
    pulsePhase += 0.03;

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
    text('Applications of Oscillations Across Fields', canvasWidth / 2, 12);

    // Draw central hub
    let centerX = canvasWidth / 2;
    let centerY = drawHeight / 2 + 20;
    drawCentralHub(centerX, centerY);

    // Draw sections
    let radius = 180;
    hoveredSection = -1;

    for (let i = 0; i < sections.length; i++) {
        let angle = (i / sections.length) * TWO_PI - PI/2;
        let sx = centerX + radius * cos(angle);
        let sy = centerY + radius * sin(angle);

        let isHovered = dist(mouseX, mouseY, sx, sy) < 60;
        if (isHovered) hoveredSection = i;

        drawSection(sx, sy, sections[i], isHovered || selectedSection === i, angle);

        // Draw connector line
        stroke(sections[i].color[0], sections[i].color[1], sections[i].color[2], 150);
        strokeWeight(2);
        let lineEnd = 55;
        line(centerX + 60 * cos(angle), centerY + 60 * sin(angle),
             sx - lineEnd * cos(angle), sy - lineEnd * sin(angle));
    }

    // Draw stats boxes
    drawStatsBoxes();

    // Draw detail panel if section selected
    if (selectedSection >= 0) {
        drawDetailPanel(sections[selectedSection]);
    }

    // Instructions
    fill(80);
    textSize(12);
    textAlign(CENTER, CENTER);
    text('Click on a field to see details. Hover for quick view.', canvasWidth / 2, drawHeight + 25);
}

function drawCentralHub(cx, cy) {
    // Pulsing outer ring
    let pulseSize = 5 * sin(pulsePhase);

    // Outer glow
    noFill();
    stroke(100, 150, 200, 50);
    strokeWeight(8 + pulseSize);
    circle(cx, cy, 120);

    // Main circle
    fill(70, 130, 200);
    stroke(50, 100, 170);
    strokeWeight(3);
    circle(cx, cy, 110);

    // Inner ring
    noFill();
    stroke(100, 170, 220);
    strokeWeight(2);
    circle(cx, cy, 80);

    // Oscillation icon (sine wave)
    stroke(255);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let a = -40; a <= 40; a += 2) {
        let px = cx + a;
        let py = cy + 15 * sin((a + frameCount * 2) * 0.1);
        vertex(px, py);
    }
    endShape();

    // Text
    fill(255);
    textSize(11);
    textAlign(CENTER, CENTER);
    noStroke();
    text('Oscillations', cx, cy - 25);
    text('in the', cx, cy + 30);
    text('Real World', cx, cy + 43);
}

function drawSection(sx, sy, section, isHighlighted, angle) {
    let baseSize = isHighlighted ? 70 : 55;
    let pulseAdd = isHighlighted ? 3 * sin(pulsePhase * 2) : 0;
    let size = baseSize + pulseAdd;

    // Shadow
    fill(0, 0, 0, 30);
    noStroke();
    circle(sx + 3, sy + 3, size);

    // Main circle with gradient effect
    fill(section.color[0], section.color[1], section.color[2]);
    stroke(section.color[0] - 50, section.color[1] - 50, section.color[2] - 50);
    strokeWeight(isHighlighted ? 3 : 2);
    circle(sx, sy, size);

    // Inner highlight
    noFill();
    stroke(255, 255, 255, 80);
    strokeWeight(2);
    arc(sx, sy, size - 10, size - 10, PI + angle, TWO_PI + angle);

    // Icon
    textSize(isHighlighted ? 28 : 22);
    textAlign(CENTER, CENTER);
    noStroke();
    text(section.icon, sx, sy - (isHighlighted ? 5 : 0));

    // Name
    fill(40);
    textSize(isHighlighted ? 12 : 10);
    text(section.name, sx, sy + (isHighlighted ? 22 : 18));

    // Hover preview
    if (isHighlighted && selectedSection !== sections.indexOf(section)) {
        drawHoverPreview(sx, sy, section);
    }
}

function drawHoverPreview(sx, sy, section) {
    let boxWidth = 140;
    let boxHeight = 70;
    let boxX = constrain(sx - boxWidth/2, 10, canvasWidth - boxWidth - 10);
    let boxY = sy - 100;

    if (boxY < 50) boxY = sy + 50;

    fill(255, 255, 250, 240);
    stroke(section.color[0], section.color[1], section.color[2]);
    strokeWeight(2);
    rect(boxX, boxY, boxWidth, boxHeight, 8);

    fill(60);
    textSize(10);
    textAlign(LEFT, TOP);
    noStroke();

    for (let i = 0; i < min(section.applications.length, 3); i++) {
        text('• ' + section.applications[i], boxX + 8, boxY + 10 + i * 18);
    }
}

function drawStatsBoxes() {
    let stats = [
        { value: '32,768 Hz', label: 'Quartz watch' },
        { value: '0.5-1 Hz', label: 'Building sway' },
        { value: '20-20k Hz', label: 'Human hearing' },
        { value: '300 tons', label: 'Taipei 101 damper' }
    ];

    let boxWidth = 110;
    let startX = (canvasWidth - (stats.length * boxWidth + (stats.length - 1) * 10)) / 2;
    let boxY = drawHeight - 55;

    for (let i = 0; i < stats.length; i++) {
        let bx = startX + i * (boxWidth + 10);

        fill(255);
        stroke(180);
        strokeWeight(1);
        rect(bx, boxY, boxWidth, 45, 5);

        fill(70, 130, 200);
        textSize(14);
        textAlign(CENTER, CENTER);
        noStroke();
        text(stats[i].value, bx + boxWidth/2, boxY + 15);

        fill(100);
        textSize(9);
        text(stats[i].label, bx + boxWidth/2, boxY + 33);
    }
}

function drawDetailPanel(section) {
    let panelWidth = 280;
    let panelHeight = 150;
    let panelX = canvasWidth - panelWidth - 20;
    let panelY = 50;

    // Background
    fill(255, 255, 250);
    stroke(section.color[0], section.color[1], section.color[2]);
    strokeWeight(2);
    rect(panelX, panelY, panelWidth, panelHeight, 10);

    // Color bar
    fill(section.color[0], section.color[1], section.color[2]);
    noStroke();
    rect(panelX, panelY, panelWidth, 5, 10, 10, 0, 0);

    // Icon and title
    textSize(20);
    textAlign(LEFT, CENTER);
    text(section.icon, panelX + 15, panelY + 30);

    fill(40);
    textSize(16);
    text(section.name, panelX + 45, panelY + 30);

    // Applications list
    fill(60);
    textSize(11);
    textAlign(LEFT, TOP);
    noStroke();

    for (let i = 0; i < section.applications.length; i++) {
        text('• ' + section.applications[i], panelX + 15, panelY + 55 + i * 18);
    }

    // Fact box
    fill(255, 255, 220);
    stroke(200);
    strokeWeight(1);
    rect(panelX + 10, panelY + panelHeight - 35, panelWidth - 20, 25, 3);

    fill(100);
    textSize(10);
    textAlign(CENTER, CENTER);
    text('📊 ' + section.fact, panelX + panelWidth/2, panelY + panelHeight - 22);

    // Close button
    fill(150);
    noStroke();
    circle(panelX + panelWidth - 15, panelY + 15, 20);
    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    text('×', panelX + panelWidth - 15, panelY + 14);
}

function mousePressed() {
    if (hoveredSection >= 0) {
        selectedSection = selectedSection === hoveredSection ? -1 : hoveredSection;
    }

    // Check close button
    if (selectedSection >= 0) {
        let panelX = canvasWidth - 300;
        if (dist(mouseX, mouseY, panelX + 280 - 15, 50 + 15) < 15) {
            selectedSection = -1;
        }
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
    }
}
