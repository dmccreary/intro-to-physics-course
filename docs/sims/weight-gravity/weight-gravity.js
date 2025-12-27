// Weight in Different Gravitational Fields MicroSim
// Shows how weight changes with gravity while mass stays constant

let canvasWidth = 900;
let drawHeight = 480;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

// Celestial bodies
const bodies = [
    { name: "Earth", g: 9.8, color: "#4169E1", groundColor: "#228B22" },
    { name: "Moon", g: 1.6, color: "#C0C0C0", groundColor: "#888888" },
    { name: "Mars", g: 3.7, color: "#CD5C5C", groundColor: "#8B4513" },
    { name: "Jupiter", g: 24.8, color: "#DEB887", groundColor: "#8B6914" }
];

let massSlider;
let currentMass = 70;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    massSlider = createSlider(30, 150, 70, 1);
    massSlider.position(120, drawHeight + 25);
    massSlider.size(200);

    describe('Comparison of weight on different celestial bodies', LABEL);
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
    noStroke();
    textSize(22);
    textAlign(CENTER, TOP);
    text('Weight in Different Gravitational Fields', canvasWidth / 2, 10);

    currentMass = massSlider.value();

    // Draw each celestial body
    let sectionWidth = (canvasWidth - 40) / 4;
    for (let i = 0; i < bodies.length; i++) {
        drawCelestialBody(i, 30 + i * sectionWidth, sectionWidth - 10);
    }

    // Draw key insight panel
    drawInsightPanel();

    // Control labels
    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text('Mass: ' + currentMass + ' kg', 10, drawHeight + 32);

    // Mass stays constant note
    fill('#27AE60');
    textAlign(LEFT, CENTER);
    text('Mass is constant everywhere: ' + currentMass + ' kg', 350, drawHeight + 32);
}

function drawCelestialBody(index, x, width) {
    let body = bodies[index];
    let centerX = x + width / 2;
    let groundY = 380;

    // Sky/space background
    if (body.name === "Moon" || body.name === "Jupiter") {
        fill('#1a1a2e');
    } else if (body.name === "Mars") {
        fill('#4a2020');
    } else {
        fill('#87CEEB');
    }
    noStroke();
    rect(x, 50, width, groundY - 50, 10, 10, 0, 0);

    // Stars for Moon and Jupiter
    if (body.name === "Moon" || body.name === "Jupiter") {
        randomSeed(index * 100);
        fill('white');
        for (let i = 0; i < 15; i++) {
            ellipse(x + random(width), random(60, groundY - 10), 2, 2);
        }
    }

    // Ground
    fill(body.groundColor);
    rect(x, groundY, width, 50, 0, 0, 10, 10);

    // Planet name and g value
    fill('white');
    textSize(16);
    textAlign(CENTER, TOP);
    text(body.name, centerX, 60);

    fill('#FFD700');
    textSize(13);
    text('g = ' + body.g + ' m/s²', centerX, 82);

    // Astronaut/person
    let personY = groundY - 60;
    drawPerson(centerX, personY, body.g);

    // Scale/weighing platform
    fill('#333');
    rect(centerX - 35, groundY - 15, 70, 12, 3);

    // Calculate weight
    let weight = currentMass * body.g;

    // Weight display on scale
    fill('#00FF00');
    textSize(14);
    textAlign(CENTER, CENTER);
    text(weight.toFixed(0) + ' N', centerX, groundY - 8);

    // Weight arrow (scaled)
    let maxArrowLen = 100;
    let arrowLen = map(weight, 0, 150 * 24.8, 10, maxArrowLen);
    arrowLen = constrain(arrowLen, 20, maxArrowLen);

    stroke('#E74C3C');
    strokeWeight(3);
    line(centerX, personY + 30, centerX, personY + 30 + arrowLen);

    // Arrowhead
    fill('#E74C3C');
    noStroke();
    triangle(centerX, personY + 30 + arrowLen + 8,
             centerX - 6, personY + 30 + arrowLen,
             centerX + 6, personY + 30 + arrowLen);

    // Weight label
    fill('#E74C3C');
    textSize(12);
    textAlign(CENTER, TOP);
    text('W = ' + weight.toFixed(0) + ' N', centerX, personY + 35 + arrowLen + 10);

    // Comparison to Earth
    if (index > 0) {
        let earthWeight = currentMass * bodies[0].g;
        let ratio = (weight / earthWeight * 100).toFixed(0);
        fill('#9B59B6');
        textSize(11);
        text(ratio + '% of Earth', centerX, 435);
    } else {
        fill('#3498DB');
        textSize(11);
        text('Reference', centerX, 435);
    }
}

function drawPerson(x, y, g) {
    // Simple stick figure astronaut
    // Compression based on gravity
    let compression = map(g, 1.6, 24.8, 0, 15);
    compression = constrain(compression, 0, 20);

    // Head
    fill('#FFB74D');
    noStroke();
    ellipse(x, y - 35 + compression/3, 25, 25);

    // Helmet visor
    fill('#87CEEB');
    arc(x, y - 35 + compression/3, 20, 18, -PI * 0.8, PI * 0.8);

    // Body (spacesuit)
    fill('#ddd');
    stroke('#999');
    strokeWeight(1);
    rect(x - 15, y - 20 + compression/2, 30, 40 - compression/2, 5);

    // Legs
    rect(x - 12, y + 20, 10, 25 - compression/3, 3);
    rect(x + 2, y + 20, 10, 25 - compression/3, 3);

    // Arms
    rect(x - 22, y - 15 + compression/2, 8, 25, 3);
    rect(x + 14, y - 15 + compression/2, 8, 25, 3);

    // Mass label
    fill('#333');
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text(currentMass + 'kg', x, y);
}

function drawInsightPanel() {
    let px = canvasWidth - 200;
    let py = 55;
    let pw = 190;
    let ph = 110;

    fill(255, 255, 255, 240);
    stroke('#3498DB');
    strokeWeight(2);
    rect(px, py, pw, ph, 10);

    fill('#3498DB');
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text('Key Concepts:', px + 10, py + 8);

    fill('#333');
    textSize(11);
    text('• Mass is constant', px + 10, py + 30);
    text('• Weight = mass × gravity', px + 10, py + 48);
    text('• W = mg', px + 10, py + 66);
    text('• Weight varies by location', px + 10, py + 84);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    massSlider.size(Math.min(200, canvasWidth - 400));
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.min(container.offsetWidth, 900);
    }
}
