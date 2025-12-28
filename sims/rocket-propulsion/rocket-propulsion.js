// Rocket Propulsion Diagram
// Shows momentum conservation: rocket gains momentum opposite to exhaust

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Control sliders
let exhaustRateSlider, exhaustVelSlider;
let animating = false;
let exhaustParticles = [];
let rocketX = 400;
let rocketVel = 0;
let time = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Exhaust rate slider (kg/s)
    exhaustRateSlider = createSlider(1, 10, 5, 0.5);
    exhaustRateSlider.position(180, drawHeight + 20);
    exhaustRateSlider.size(150);

    // Exhaust velocity slider (m/s relative to rocket)
    exhaustVelSlider = createSlider(100, 500, 300, 10);
    exhaustVelSlider.position(180, drawHeight + 55);
    exhaustVelSlider.size(150);

    describe('Rocket propulsion diagram showing momentum conservation with exhaust gases', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area
    fill('black');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Stars background
    fill(255);
    noStroke();
    randomSeed(42);
    for (let i = 0; i < 100; i++) {
        let sx = random(canvasWidth);
        let sy = random(drawHeight - 50);
        ellipse(sx, sy, random(1, 3));
    }

    // Control area
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('white');
    textSize(18);
    textAlign(CENTER, TOP);
    noStroke();
    text('Rocket Propulsion: Conservation of Momentum', canvasWidth/2, 10);

    let exhaustRate = exhaustRateSlider.value();
    let exhaustVel = exhaustVelSlider.value();

    // Update animation
    if (animating) {
        time += 0.016;

        // Add exhaust particles
        if (frameCount % 3 === 0) {
            exhaustParticles.push({
                x: rocketX - 30,
                y: drawHeight/2 + random(-10, 10),
                vx: -exhaustVel/50 + random(-2, 2),
                vy: random(-3, 3),
                life: 60,
                size: random(5, 15)
            });
        }

        // Thrust = dm/dt * v_exhaust
        let thrust = exhaustRate * exhaustVel;
        let rocketMass = 1000 - exhaustRate * time;
        if (rocketMass > 100) {
            let accel = thrust / rocketMass;
            rocketVel += accel * 0.001;
            rocketX += rocketVel * 0.5;
        }

        // Update particles
        for (let i = exhaustParticles.length - 1; i >= 0; i--) {
            let p = exhaustParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            p.size *= 0.98;
            if (p.life <= 0 || p.x < -50) {
                exhaustParticles.splice(i, 1);
            }
        }

        // Reset if rocket goes off screen
        if (rocketX > canvasWidth + 100) {
            resetAnimation();
        }
    }

    // Draw exhaust particles
    noStroke();
    for (let p of exhaustParticles) {
        let alpha = map(p.life, 0, 60, 0, 255);
        fill(255, 150, 50, alpha);
        ellipse(p.x, p.y, p.size);
        fill(255, 200, 100, alpha * 0.5);
        ellipse(p.x, p.y, p.size * 0.6);
    }

    // Draw rocket
    drawRocket(rocketX, drawHeight/2);

    // Draw momentum vectors
    drawMomentumVectors(exhaustRate, exhaustVel);

    // Draw equation and explanation
    drawEquations(exhaustRate, exhaustVel);

    // Control labels
    drawControlLabels();
}

function drawRocket(x, y) {
    push();
    translate(x, y);

    // Rocket body
    fill(200, 200, 220);
    stroke(100);
    strokeWeight(2);

    // Main body
    beginShape();
    vertex(40, 0);      // Nose
    vertex(20, -20);
    vertex(-30, -20);
    vertex(-30, 20);
    vertex(20, 20);
    endShape(CLOSE);

    // Nose cone
    fill(220, 50, 50);
    triangle(40, 0, 20, -15, 20, 15);

    // Fins
    fill(220, 50, 50);
    triangle(-30, -20, -50, -35, -30, -10);
    triangle(-30, 20, -50, 35, -30, 10);

    // Nozzle
    fill(80);
    rect(-40, -12, 15, 24, 3);

    // Window
    fill(150, 200, 255);
    stroke(100);
    ellipse(10, 0, 15, 15);

    pop();
}

function drawMomentumVectors(exhaustRate, exhaustVel) {
    let baseY = drawHeight/2 + 80;

    // Exhaust momentum (left arrow)
    let pExhaust = exhaustRate * exhaustVel / 100;
    stroke(255, 150, 50);
    strokeWeight(4);
    fill(255, 150, 50);
    let exhaustArrowLen = min(pExhaust * 2, 150);
    line(rocketX - 50, baseY, rocketX - 50 - exhaustArrowLen, baseY);
    triangle(rocketX - 50 - exhaustArrowLen, baseY,
             rocketX - 50 - exhaustArrowLen + 15, baseY - 8,
             rocketX - 50 - exhaustArrowLen + 15, baseY + 8);

    // Rocket momentum (right arrow)
    stroke(100, 200, 255);
    fill(100, 200, 255);
    let rocketArrowLen = min(pExhaust * 2, 150);
    line(rocketX + 50, baseY, rocketX + 50 + rocketArrowLen, baseY);
    triangle(rocketX + 50 + rocketArrowLen, baseY,
             rocketX + 50 + rocketArrowLen - 15, baseY - 8,
             rocketX + 50 + rocketArrowLen - 15, baseY + 8);

    // Labels
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    fill(255, 150, 50);
    text('p_exhaust', rocketX - 50 - exhaustArrowLen/2, baseY + 10);
    fill(100, 200, 255);
    text('p_rocket', rocketX + 50 + rocketArrowLen/2, baseY + 10);

    // Equal and opposite
    fill(0, 255, 0);
    textSize(14);
    text('Δp_rocket = -Δp_exhaust', rocketX, baseY + 35);
}

function drawEquations(exhaustRate, exhaustVel) {
    let boxX = 20;
    let boxY = 40;
    let boxW = 280;
    let boxH = 160;

    // Semi-transparent background
    fill(0, 0, 0, 200);
    stroke(100, 200, 255);
    strokeWeight(1);
    rect(boxX, boxY, boxW, boxH, 10);

    fill('white');
    textSize(14);
    textAlign(LEFT, TOP);
    noStroke();

    let y = boxY + 15;
    text('Conservation of Momentum:', boxX + 15, y);
    y += 25;

    textSize(12);
    fill(200, 200, 255);
    text('p_initial = p_final', boxX + 15, y);
    y += 20;
    text('0 = p_rocket + p_exhaust', boxX + 15, y);
    y += 25;

    fill(100, 200, 255);
    text('Thrust = (dm/dt) × v_exhaust', boxX + 15, y);
    y += 20;

    let thrust = exhaustRate * exhaustVel;
    fill(255, 200, 100);
    text('F = ' + exhaustRate.toFixed(1) + ' × ' + exhaustVel + ' = ' + thrust.toFixed(0) + ' N', boxX + 15, y);
    y += 25;

    fill(150, 255, 150);
    textSize(11);
    text('Rocket accelerates opposite to', boxX + 15, y);
    y += 15;
    text('exhaust direction!', boxX + 15, y);
}

function drawControlLabels() {
    textSize(12);
    textAlign(LEFT, CENTER);
    fill('black');
    noStroke();

    text('Exhaust Rate (dm/dt): ' + exhaustRateSlider.value().toFixed(1) + ' kg/s', 10, drawHeight + 30);
    text('Exhaust Velocity: ' + exhaustVelSlider.value() + ' m/s', 10, drawHeight + 65);

    // Animation button
    let btnX = canvasWidth - 150;
    let btnY = drawHeight + 25;
    let btnW = 130;
    let btnH = 50;

    fill(animating ? '#ff6666' : '#66cc66');
    stroke(100);
    strokeWeight(1);
    rect(btnX, btnY, btnW, btnH, 8);

    fill('white');
    textSize(14);
    textAlign(CENTER, CENTER);
    noStroke();
    text(animating ? 'Stop' : 'Launch!', btnX + btnW/2, btnY + btnH/2);

    // Velocity display
    textAlign(RIGHT, CENTER);
    fill('black');
    textSize(12);
    text('Rocket Velocity: ' + (rocketVel * 100).toFixed(1) + ' m/s', canvasWidth - 170, drawHeight + 30);
    text('Time: ' + time.toFixed(1) + ' s', canvasWidth - 170, drawHeight + 65);
}

function mousePressed() {
    // Check button click
    let btnX = canvasWidth - 150;
    let btnY = drawHeight + 25;
    let btnW = 130;
    let btnH = 50;

    if (mouseX > btnX && mouseX < btnX + btnW &&
        mouseY > btnY && mouseY < btnY + btnH) {
        if (animating) {
            animating = false;
        } else {
            resetAnimation();
            animating = true;
        }
    }
}

function resetAnimation() {
    rocketX = 200;
    rocketVel = 0;
    time = 0;
    exhaustParticles = [];
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
    }
}
