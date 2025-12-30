// Action-Reaction Pairs MicroSim
// Demonstrates Newton's Third Law through interactive scenarios
/// <reference types="p5/global" />
// @ts-nocheck

let canvasWidth = 900;
let drawHeight = 520;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

// Scenarios
let currentScenario = 0;
const scenarios = [
    { name: "Book on Table", short: "Book" },
    { name: "Hammer and Nail", short: "Hammer" },
    { name: "Rocket in Space", short: "Rocket" },
    { name: "Swimming", short: "Swim" },
    { name: "Earth-Moon System", short: "Gravity" },
    { name: "Car Accelerating", short: "Car" }
];

let scenarioButtons = [];
let showPairsCheckbox;
let animPhase = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Create scenario buttons
    let buttonX = 10;
    for (let i = 0; i < scenarios.length; i++) {
        let btn = createButton(scenarios[i].short);
        btn.position(buttonX, drawHeight + 15);
        btn.mousePressed(() => { currentScenario = i; });
        btn.style('font-size', '12px');
        btn.style('padding', '6px 12px');
        scenarioButtons.push(btn);
        buttonX += 80;
    }

    showPairsCheckbox = createCheckbox(' Highlight Action-Reaction Pairs', true);
    showPairsCheckbox.position(10, drawHeight + 50);
    showPairsCheckbox.style('font-size', '14px');

    describe('Interactive demonstration of Newton\'s Third Law action-reaction pairs', LABEL);
}

function draw() {
    updateCanvasSize();
    animPhase += 0.03;

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
    textSize(24);
    textAlign(CENTER, TOP);
    text("Newton's Third Law: Action-Reaction Pairs", canvasWidth / 2, 10);

    // Subtitle
    textSize(16);
    fill('#666');
    text(scenarios[currentScenario].name, canvasWidth / 2, 40);

    // Draw current scenario
    let showPairs = showPairsCheckbox.checked();

    switch(currentScenario) {
        case 0: drawBookOnTable(showPairs); break;
        case 1: drawHammerNail(showPairs); break;
        case 2: drawRocket(showPairs); break;
        case 3: drawSwimming(showPairs); break;
        case 4: drawEarthMoon(showPairs); break;
        case 5: drawCar(showPairs); break;
    }

    // Highlight active button
    for (let i = 0; i < scenarioButtons.length; i++) {
        if (i === currentScenario) {
            scenarioButtons[i].style('background-color', '#4CAF50');
            scenarioButtons[i].style('color', 'white');
        } else {
            scenarioButtons[i].style('background-color', '#e0e0e0');
            scenarioButtons[i].style('color', 'black');
        }
    }
}

function drawBookOnTable(showPairs) {
    let cx = canvasWidth / 3 - 130;
    let cy = 280;
    let tableWidth = 200;

    // Table
    fill('#8B4513');
    noStroke();
    // Table top
    rect(cx - 120, cy + 35, tableWidth, 30, 5);
    // Table legs slightly lighter color
    fill('#A0522D');
    // Left leg
    rect(cx - 100, cy + 65, 30, 100);
    // Right leg
    rect(cx + 30, cy + 65, 30, 100);

    // Book
    fill('#4169E1');
    stroke('#2c3e80');
    strokeWeight(2);
    // blue book
    rect(cx - 60, cy - 30, 100, 60, 5);
    fill('white');
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text('Book', cx, cy);

    // Forces - positioned to the right of the table/book
    let vx = cx + 160; // Vector x position to the right
    if (showPairs) {
        // Pair 1: Book-Earth (gravity) 80 px long
        drawForceArrow(vx, cy-45, vx, cy + 35, '#E74C3C', '');
        textAlign(CENTER, CENTER);
        text("Earth's gravity pulls the book down", vx-10, cy-55);

        // Reaction force upward on the book
        drawForceArrow(vx, cy + 120, vx, cy + 40, '#E74C3C', '');
        text("Book's gravity pulls Earth up", vx, cy+128);
        
        // Pair 2: Book-Table (contact)
        drawForceArrow(vx + 50, cy + 30, vx + 50, cy + 80, '#3498DB', '');
        text('Book pushes table', vx + 60, cy + 90);
        drawForceArrow(vx + 50, cy + 30, vx + 50, cy - 20, '#3498DB', '');
        text('Table pushes book', vx + 60, cy - 30);
    } else {
        drawForceArrow(vx, cy, vx, cy + 60, '#E74C3C', 'Weight');
        drawForceArrow(vx + 50, cy + 30, vx + 50, cy - 30, '#3498DB', 'Normal');
    }

    // Explanation panel
    drawExplanationPanel(
        "Two Action-Reaction Pairs:",
        [
            "1. Earth pulls book down (gravity)",
            "   Book pulls Earth up (equal force!)",
            "",
            "2. Book pushes down on table",
            "   Table pushes up on book (normal force)",
            "",
            "Note: Weight and Normal are NOT",
            "an action-reaction pair!"
        ],
        '#27AE60'
    );
}

function drawHammerNail(showPairs) {
    let cx = canvasWidth * .33;
    // Hammer position in y
    let cy = 280;
    let hitOffset = sin(animPhase * 2) * 5;

    push();
    translate(-80, 0);
    // Wood block
    fill('#DEB887');
    stroke('#A0522D');
    strokeWeight(2);
    rect(cx - 80, cy + 20, 160, 80, 3);

    // Nail
    fill('#888');
    stroke('#555');
    strokeWeight(1);
    rect(cx - 5, cy - 40 + hitOffset, 10, 70);
    triangle(cx - 5, cy + 30 + hitOffset, cx + 5, cy + 30 + hitOffset, cx, cy + 45 + hitOffset);

    // Hammer - rotated so handle is to the LEFT side
    // Hammer head (vertical, on top of nail)
    fill('#666');
    stroke('#444');
    strokeWeight(2);
    rect(cx - 20, cy - 90 + hitOffset, 40, 50, 3);

    // Hammer handle (horizontal, extending to the left)
    fill('#8B4513');
    noStroke();
    rect(cx - 120, cy - 75 + hitOffset, 100, 16);
    pop();

    if (showPairs) {
        // vertical length for arrows
        let vectorLength = 80;

        push();
            translate(0, -40);
            // Force arrows near hammer/nail
            drawForceArrow(cx + 50, cy, cx + 50, cy - vectorLength, '#3498DB', '');
            text('Nail pushes hammer up', cx + 80, cy - 80);

            drawForceArrow(cx + 50, cy, cx + 50, cy + vectorLength, '#E74C3C', '');
            text('Hammer pushes nail down', cx + 80, cy + vectorLength + 10);
        pop();
    }

    drawExplanationPanel(
        "Hammer and Nail:",
        [
            "Action: Hammer exerts force on nail",
            "Reaction: Nail exerts force on hammer",
            "",
            "Both forces are EQUAL in magnitude!",
            "",
            "Why does the nail move more?",
            "Same force, but nail has less mass",
            "→ Greater acceleration (F = ma)"
        ],
        '#E74C3C'
    );
}

function drawRocket(showPairs) {
    let cx = canvasWidth / 3;
    let cy = 280;
    let rocketY = cy - 50 + sin(animPhase) * 10;

    // Stars background
    fill('#1a1a2e');
    noStroke();
    rect(50, 70, canvasWidth / 2 - 30, 400, 10);

    randomSeed(42);
    fill('white');
    for (let i = 0; i < 50; i++) {
        ellipse(random(60, canvasWidth/2 + 10), random(80, 460), 2, 2);
    }

    // Rocket body
    push();
    translate(-100, 0);
    fill('#ddd');
    stroke('#999');
    strokeWeight(2);
    beginShape();
    vertex(cx, rocketY - 80);
    vertex(cx + 25, rocketY - 40);
    vertex(cx + 25, rocketY + 40);
    vertex(cx + 15, rocketY + 60);
    vertex(cx - 15, rocketY + 60);
    vertex(cx - 25, rocketY + 40);
    vertex(cx - 25, rocketY - 40);
    endShape(CLOSE);

    // Fins
    fill('#E74C3C');
    triangle(cx - 25, rocketY + 30, cx - 45, rocketY + 60, cx - 25, rocketY + 60);
    triangle(cx + 25, rocketY + 30, cx + 45, rocketY + 60, cx + 25, rocketY + 60);

    // Window
    fill('#3498DB');
    ellipse(cx, rocketY - 20, 20, 20);

    // Exhaust flames
    fill('#FFA500');
    noStroke();
    for (let i = 0; i < 5; i++) {
        let flameLen = 40 + random(20) + sin(animPhase * 5 + i) * 10;
        let flameX = cx + random(-10, 10);
        triangle(flameX - 8, rocketY + 60, flameX + 8, rocketY + 60, flameX, rocketY + 60 + flameLen);
    }

    // Gas particles
    fill('#FFA50080');
    for (let i = 0; i < 10; i++) {
        let px = cx + random(-30, 30);
        let py = rocketY + 80 + random(50) + (animPhase * 20) % 100;
        ellipse(px, py, 10 + random(10), 10 + random(10));
    }
    pop();

    if (showPairs) {
        // blue arrow upwards (gas pushes rocket)
        cx -= 20;
        drawForceArrow(cx, rocketY + 30, cx, rocketY - 30, '#3498DB', '');
        text('Gas pushes rocket up', cx + 90, rocketY - 10);

        // red arrow downwards (rocket pushes gas)
        drawForceArrow(cx, rocketY + 80, cx, rocketY + 140, '#E74C3C', '');
        text('Rocket pushes gas down', cx + 90, rocketY + 120);
    }

    drawExplanationPanel(
        "Rocket Propulsion:",
        [
            "Action: Rocket pushes gas backward",
            "Reaction: Gas pushes rocket forward",
            "",
            "No ground or air needed!",
            "The rocket pushes on its own exhaust",
            "",
            "This is how rockets work in space:",
            "Conservation of momentum in action"
        ],
        '#3498DB'
    );
}

function drawSwimming(showPairs) {
    let cx = canvasWidth / 3 - 100;
    let cy = 280;
    // Slowed animation by 2x (was animPhase * 30, now * 15)
    let swimX = (animPhase * 15) % 200 - 50;

    // Water
    fill('#87CEEB');
    noStroke();
    rect(50, 150, canvasWidth / 2 - 30, 250, 10);

    // Waves
    stroke('#5DA9E9');
    strokeWeight(2);
    noFill();
    for (let y = 160; y < 400; y += 30) {
        beginShape();
        for (let x = 50; x < canvasWidth / 2 + 20; x += 10) {
            vertex(x, y + sin((x + animPhase * 15) * 0.05) * 5);
        }
        endShape();
    }

    // Swimmer - using push/translate/pop for easy position management
    let sx = cx + swimX;
    push();
    translate(sx, cy);

    // Head
    fill('#FFB74D');
    noStroke();
    ellipse(30, -10, 30, 25);

    // Body
    fill('#2196F3');
    beginShape();
    vertex(-40, 0);
    vertex(20, -15);
    vertex(20, 15);
    vertex(-40, 10);
    endShape(CLOSE);

    // Arm - slowed by 2x (was animPhase * 3, now * 1.5)
    stroke('#FFB74D');
    strokeWeight(8);
    let armAngle = sin(animPhase * 1.5) * 0.5;
    line(0, 0, -30 * cos(armAngle), 30 * sin(armAngle));

    // Water particles being pushed back - slowed by 2x (was * 10, now * 5)
    fill('#5DA9E940');
    noStroke();
    for (let i = 0; i < 5; i++) {
        let px = -50 - i * 20 - (animPhase * 5) % 50;
        ellipse(px, random(-20, 20), 15, 15);
    }

    pop();

    if (showPairs) {

        // Force arrows above the swimmer
        drawForceArrow(sx - 30, cy - 80, sx + 20, cy - 80, '#3498DB', 'Water pushes swimmer forward');

        // Arrow below the swimmer
        drawForceArrow(sx - 30, cy + 80, sx - 80, cy + 80, '#E74C3C', 'Hand pushes water back');
    }

    drawExplanationPanel(
        "Swimming:",
        [
            "Action: Hand pushes water backward",
            "Reaction: Water pushes hand forward",
            "",
            "You cannot push yourself forward!",
            "You must push on something else",
            "(the water) to move forward.",
            "",
            "Same principle as walking!"
        ],
        '#2196F3'
    );
}

function drawEarthMoon(showPairs) {
    let cx = canvasWidth / 3;
    let cy = 280;

    // Space background
    fill('#0a0a20');
    noStroke();
    rect(50, 70, canvasWidth / 2 - 30, 400, 10);

    randomSeed(123);
    fill('white');
    for (let i = 0; i < 40; i++) {
        ellipse(random(60, canvasWidth/2 + 10), random(80, 460), 2, 2);
    }

    // Earth
    fill('#4169E1');
    stroke('#2c3e80');
    strokeWeight(2);
    ellipse(cx - 60, cy, 100, 100);

    // Continents (simplified)
    fill('#228B22');
    noStroke();
    ellipse(cx - 80, cy - 20, 30, 25);
    ellipse(cx - 50, cy + 10, 25, 30);

    // Moon
    fill('#ccc');
    stroke('#999');
    strokeWeight(2);
    ellipse(cx + 100, cy, 40, 40);

    // Craters
    fill('#aaa');
    noStroke();
    ellipse(cx + 95, cy - 8, 8, 8);
    ellipse(cx + 108, cy + 5, 6, 6);

    // Orbit path
    stroke('#ffffff40');
    strokeWeight(1);
    noFill();
    ellipse(cx - 60, cy, 320, 320);

    if (showPairs) {
        drawForceArrow(cx - 10, cy - 30, cx + 70, cy - 30, '#E74C3C', 'Earth pulls Moon');
        drawForceArrow(cx + 70, cy + 30, cx - 10, cy + 30, '#3498DB', 'Moon pulls Earth');
    }

    // Force labels
    fill('white');
    textSize(12);
    textAlign(CENTER, CENTER);
    text('Earth', cx - 60, cy + 60);
    text('Moon', cx + 100, cy + 30);

    drawExplanationPanel(
        "Gravitational Attraction:",
        [
            "Action: Earth pulls Moon toward it",
            "Reaction: Moon pulls Earth toward it",
            "",
            "Both forces are EXACTLY equal!",
            "F = GMm/r²",
            "",
            "Moon causes ocean tides on Earth",
            "Earth causes a small 'wobble'"
        ],
        '#9B59B6'
    );
}

function drawCar(showPairs) {
    let cx = canvasWidth / 3;
    let cy = 300;
    let carX = (animPhase * 20) % 200 - 50;

    // Road
    fill('black');
    noStroke();
    // a black road from the left edge to middle of canvas
    rect(5, cy + 30, canvasWidth*.6, 80);

    // Yellow dashed road lines
    stroke('#FFD700');
    strokeWeight(3);
    for (let x = 5; x <  canvasWidth*.6 + 20; x += 40) {
        line(x + (animPhase * 20) % 40, cy + 70, x + 20 + (animPhase * 20) % 40, cy + 70);
    }

    // Car body
    let carCx = cx + carX;
    fill('#E74C3C');
    stroke('#B03A2E');
    strokeWeight(2);
    rect(carCx - 60, cy - 30, 120, 50, 5);
    rect(carCx - 40, cy - 60, 80, 35, 10, 10, 0, 0);

    // Windows
    fill('#87CEEB');
    rect(carCx - 35, cy - 55, 30, 25, 5);
    rect(carCx + 5, cy - 55, 30, 25, 5);

    // Wheels
    fill('#333');
    stroke('#222');
    strokeWeight(2);
    ellipse(carCx - 35, cy + 25, 30, 30);
    ellipse(carCx + 35, cy + 25, 30, 30);

    // Wheel details
    fill('#666');
    ellipse(carCx - 35, cy + 25, 15, 15);
    ellipse(carCx + 35, cy + 25, 15, 15);

    if (showPairs) {
        // Wheel-ground interaction
        // red arrow backward (tire pushes ground back)
        drawForceArrow(carCx - 120, cy, carCx - 160, cy, '#E74C3C', 'Tire pushes ground back');

        // blue arrow forward (ground pushes tire forward)
        // place light arrows on the darker road area
        drawForceArrow(carCx - 35, cy + 45, carCx + 5, cy + 45, '#6496b8ff', '');
        text('Ground pushes tire forward', carCx - 100, cy + 55);
    }

    drawExplanationPanel(
        "Car Acceleration:",
        [
            "Action: Tire pushes ground backward",
            "Reaction: Ground pushes tire forward",
            "",
            "The engine doesn't push the car!",
            "It spins the wheels, which push the ground",
            "",
            "Friction between tire and road",
            "creates the action-reaction pair"
        ],
        '#E74C3C'
    );
}

function drawForceArrow(x1, y1, x2, y2, col, label) {
    let headSize = 10;
    let angle = atan2(y2 - y1, x2 - x1);

    stroke(col);
    strokeWeight(4);
    line(x1, y1, x2, y2);

    fill(col);
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -headSize * 1.5, -headSize/2, -headSize * 1.5, headSize/2);
    pop();

    // Label
    textSize(11);
    textAlign(CENTER, CENTER);
    fill(col);
    let midX = (x1 + x2) / 2;
    let midY = (y1 + y2) / 2;
    let perpAngle = angle + PI/2;
    text(label, midX + cos(perpAngle) * 25, midY + sin(perpAngle) * 25);
}

function drawExplanationPanel(title, lines, borderColor) {
    let px = canvasWidth * .6;
    let py = 80;
    let pw = canvasWidth *.35;
    let ph = canvasHeight*.55;

    fill(255, 255, 255, 245);
    stroke(borderColor);
    strokeWeight(2);
    rect(px, py, pw, ph, 10);

    fill(borderColor);
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    text(title, px + 15, py + 12);

    fill('#333');
    textSize(13);
    for (let i = 0; i < lines.length; i++) {
        text(lines[i], px + 15, py + 40 + i * 20);
    }

    // Key insight box at bottom
    fill('#FFF3CD');
    stroke('#FFC107');
    strokeWeight(1);
    rect(px + 10, py + ph - 80, pw - 20, 75, 5);

    fill('#856404');
    textSize(12);
    textAlign(LEFT, TOP);
    text("Key: Action-reaction pairs are", px + 15, py + ph - 72);
    text("• Equal in magnitude", px + 15, py + ph - 55);
    text("• Opposite in direction", px + 15, py + ph - 40);
    text("• Acting on DIFFERENT objects", px + 15, py + ph - 25);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.min(container.offsetWidth, 900);
    }
}
