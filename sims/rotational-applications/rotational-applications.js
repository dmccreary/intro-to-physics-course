// Real-World Rotational Applications Infographic
// Grid layout showing 12 application boxes across engineering, sports, and nature

let canvasWidth = 1000;
let drawHeight = 700;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Application data
const applications = [
    // Engineering row
    {
        name: 'Flywheel Energy Storage',
        concept: 'Rotational KE',
        description: 'Stores energy in spinning mass at high ω',
        detail: 'Used in hybrid buses; can store/release energy efficiently. Modern flywheels spin at 60,000 rpm in vacuum chambers.',
        icon: '⚡',
        category: 'engineering',
        color: null
    },
    {
        name: 'Gyroscope Navigation',
        concept: 'Angular momentum',
        description: 'Maintains orientation via conserved L',
        detail: 'Found in smartphones, aircraft, spacecraft. Resists changes to angular momentum vector.',
        icon: '🧭',
        category: 'engineering',
        color: null
    },
    {
        name: 'Centrifuge Separation',
        concept: 'Centripetal force',
        description: 'High ω creates large centripetal forces',
        detail: 'Medical centrifuges reach 10,000 rpm to separate blood components by density.',
        icon: '🔬',
        category: 'engineering',
        color: null
    },
    {
        name: 'Wind Turbine Power',
        concept: 'Torque & work',
        description: 'Wind exerts torque, producing rotational work',
        detail: 'Large turbines have rotor diameter >100m, rotational inertia >1000 kg·m².',
        icon: '💨',
        category: 'engineering',
        color: null
    },
    // Sports row
    {
        name: 'Figure Skating Spins',
        concept: 'Angular momentum',
        description: 'Arms in → decrease I → increase ω',
        detail: 'Professional skaters can reach 5-6 revolutions per second in scratch spins.',
        icon: '⛸️',
        category: 'sports',
        color: null
    },
    {
        name: 'Bicycle Stability',
        concept: 'Gyroscopic effect',
        description: 'Spinning wheels resist tipping',
        detail: 'Angular momentum of wheels helps maintain balance; faster spinning = more stable.',
        icon: '🚴',
        category: 'sports',
        color: null
    },
    {
        name: 'Baseball Pitch Spin',
        concept: 'Torque application',
        description: 'Wrist torque creates ball rotation',
        detail: 'Curveballs can spin at 2000 rpm; spin creates pressure differences (Magnus effect).',
        icon: '⚾',
        category: 'sports',
        color: null
    },
    {
        name: 'Gymnastics Tumbling',
        concept: 'Rotational inertia',
        description: 'Tuck reduces I for faster rotation',
        detail: 'Gymnasts change I by factor of 3-4 between tuck and layout positions.',
        icon: '🤸',
        category: 'sports',
        color: null
    },
    // Nature row
    {
        name: 'Hurricane Formation',
        concept: 'Angular momentum',
        description: 'Air spiraling in speeds up',
        detail: 'As air moves toward low pressure, r decreases, so ω increases dramatically.',
        icon: '🌀',
        category: 'nature',
        color: null
    },
    {
        name: 'Planetary Formation',
        concept: 'L conservation',
        description: 'Nebular cloud flattens while conserving L',
        detail: 'Solar system formed from rotating gas cloud; conservation led to orbital plane.',
        icon: '🪐',
        category: 'nature',
        color: null
    },
    {
        name: 'Cat Righting Reflex',
        concept: 'Zero net torque',
        description: 'Rotates body parts independently',
        detail: 'Cats can rotate 180° in <1 second by manipulating rotational inertia distribution.',
        icon: '🐱',
        category: 'nature',
        color: null
    },
    {
        name: "Earth's Rotation",
        concept: 'Angular momentum',
        description: 'L conserved over billions of years',
        detail: 'Tidal friction slowly transfers angular momentum to Moon, lengthening day by 2ms/century.',
        icon: '🌍',
        category: 'nature',
        color: null
    }
];

// Layout
let gridCols = 4;
let gridRows = 3;
let boxWidth = 220;
let boxHeight = 150;
let boxMargin = 15;
let startX = 50;
let startY = 90;

// Interaction
let hoveredIndex = -1;
let selectedFilter = 'all';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Set colors by category
    for (let app of applications) {
        if (app.category === 'engineering') {
            app.color = color(70, 130, 200);
        } else if (app.category === 'sports') {
            app.color = color(200, 100, 70);
        } else {
            app.color = color(70, 170, 100);
        }
    }

    describe('Interactive infographic showing 12 real-world applications of rotational motion across engineering, sports, and nature', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area
    fill(250, 252, 255);
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill(248, 248, 248);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    textSize(24);
    textAlign(CENTER, TOP);
    noStroke();
    text('Real-World Applications of Rotational Motion', canvasWidth / 2, 15);

    // Category headers
    drawCategoryHeaders();

    // Draw grid of application boxes
    drawApplicationGrid();

    // Draw hover detail panel
    if (hoveredIndex >= 0) {
        drawDetailPanel(applications[hoveredIndex]);
    }

    // Draw legend
    drawLegend();

    // Instructions
    fill(80);
    textSize(13);
    textAlign(CENTER, CENTER);
    text('Hover over any card to see detailed information', canvasWidth / 2, drawHeight + 25);
}

function drawCategoryHeaders() {
    textSize(14);
    textAlign(LEFT, CENTER);
    noStroke();

    let categories = [
        { name: 'Engineering & Technology', color: color(70, 130, 200), y: startY - 25 },
        { name: 'Sports & Recreation', color: color(200, 100, 70), y: startY + boxHeight + boxMargin + 5 },
        { name: 'Natural Phenomena', color: color(70, 170, 100), y: startY + (boxHeight + boxMargin) * 2 + 35 }
    ];

    for (let cat of categories) {
        fill(cat.color);
        rect(startX - 5, cat.y - 8, 4, 16, 2);
        fill(60);
        textStyle(BOLD);
        text(cat.name, startX + 5, cat.y);
        textStyle(NORMAL);
    }
}

function drawApplicationGrid() {
    hoveredIndex = -1;

    for (let i = 0; i < applications.length; i++) {
        let row = floor(i / gridCols);
        let col = i % gridCols;

        let x = startX + col * (boxWidth + boxMargin);
        let y = startY + row * (boxHeight + boxMargin + 30);

        // Check hover
        let isHovered = mouseX > x && mouseX < x + boxWidth &&
                        mouseY > y && mouseY < y + boxHeight;

        if (isHovered) hoveredIndex = i;

        drawApplicationBox(applications[i], x, y, isHovered);
    }
}

function drawApplicationBox(app, x, y, isHovered) {
    // Box shadow
    if (isHovered) {
        fill(0, 0, 0, 20);
        noStroke();
        rect(x + 4, y + 4, boxWidth, boxHeight, 10);
    }

    // Box background
    if (isHovered) {
        fill(255, 250, 240);
        stroke(app.color);
        strokeWeight(3);
    } else {
        fill(255);
        stroke(200);
        strokeWeight(1);
    }
    rect(x, y, boxWidth, boxHeight, 10);

    // Category color bar
    fill(app.color);
    noStroke();
    rect(x, y, 8, boxHeight, 10, 0, 0, 10);

    // Icon
    textSize(28);
    textAlign(CENTER, CENTER);
    noStroke();
    text(app.icon, x + 35, y + 35);

    // Name
    fill(40);
    textSize(13);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(app.name, x + 60, y + 15, boxWidth - 70);
    textStyle(NORMAL);

    // Concept tag
    fill(app.color);
    textSize(10);
    text(app.concept, x + 60, y + 45);

    // Short description
    fill(80);
    textSize(11);
    textAlign(LEFT, TOP);
    text(app.description, x + 20, y + 70, boxWidth - 35, 70);
}

function drawDetailPanel(app) {
    let panelW = 350;
    let panelH = 140;
    let panelX = mouseX + 20;
    let panelY = mouseY - panelH / 2;

    // Keep panel on screen
    if (panelX + panelW > canvasWidth - 10) {
        panelX = mouseX - panelW - 20;
    }
    if (panelY < 50) panelY = 50;
    if (panelY + panelH > drawHeight - 10) panelY = drawHeight - panelH - 10;

    // Panel shadow
    fill(0, 0, 0, 30);
    noStroke();
    rect(panelX + 5, panelY + 5, panelW, panelH, 10);

    // Panel background
    fill(255, 255, 250);
    stroke(app.color);
    strokeWeight(2);
    rect(panelX, panelY, panelW, panelH, 10);

    // Content
    fill(app.color);
    textSize(14);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    noStroke();
    text(app.icon + ' ' + app.name, panelX + 15, panelY + 15);
    textStyle(NORMAL);

    fill(app.color);
    textSize(11);
    text('Concept: ' + app.concept, panelX + 15, panelY + 38);

    fill(60);
    textSize(12);
    text(app.detail, panelX + 15, panelY + 60, panelW - 30, 80);
}

function drawLegend() {
    let legendX = canvasWidth - 200;
    let legendY = 55;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(legendX, legendY, 180, 100, 8);

    fill(40);
    textSize(12);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    noStroke();
    text('Concept Categories:', legendX + 12, legendY + 10);
    textStyle(NORMAL);

    let categories = [
        { name: 'Torque', color: color(220, 70, 70) },
        { name: 'Angular momentum', color: color(70, 130, 220) },
        { name: 'Rotational KE', color: color(70, 180, 70) },
        { name: 'Rotational inertia', color: color(220, 180, 70) }
    ];

    textSize(10);
    for (let i = 0; i < categories.length; i++) {
        let cat = categories[i];
        fill(cat.color);
        rect(legendX + 12, legendY + 32 + i * 16, 12, 12, 2);
        fill(60);
        textAlign(LEFT, CENTER);
        text(cat.name, legendX + 30, legendY + 38 + i * 16);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(900, container.offsetWidth);
        // Recalculate layout
        boxWidth = (canvasWidth - startX * 2 - boxMargin * 3) / 4;
        boxWidth = min(boxWidth, 240);
    }
}
