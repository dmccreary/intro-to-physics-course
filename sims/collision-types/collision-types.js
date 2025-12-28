// Collision Types Comparison Diagram
// Shows elastic, inelastic, and perfectly inelastic collisions

let canvasWidth = 1000;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let phase = 0; // 0=before, 1=during, 2=after
let animating = false;
let animProgress = 0;

// Collision data
let collisions = [
    {
        name: 'Elastic',
        color: [70, 130, 200],
        ball1: { m: 3, v_i: 4, v_f: 1 },
        ball2: { m: 1, v_i: 0, v_f: 6 },
        ke_before: 24,
        ke_after: 24,
        ke_conserved: true
    },
    {
        name: 'Inelastic',
        color: [220, 150, 50],
        ball1: { m: 3, v_i: 4, v_f: 2.5 },
        ball2: { m: 1, v_i: 0, v_f: 4.5 },
        ke_before: 24,
        ke_after: 19.7,
        ke_conserved: false
    },
    {
        name: 'Perfectly Inelastic',
        color: [200, 70, 70],
        ball1: { m: 3, v_i: 4, v_f: 3 },
        ball2: { m: 1, v_i: 0, v_f: 3 },  // Same as ball1 (stuck together)
        ke_before: 24,
        ke_after: 18,
        ke_conserved: false,
        stickTogether: true
    }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    describe('Diagram comparing three types of collisions', LABEL);
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
    text('Three Types of Collisions', canvasWidth/2, 10);

    // Subtitle
    textSize(12);
    fill(100);
    text('All conserve momentum • Only elastic conserves kinetic energy', canvasWidth/2, 35);

    // Animation progress
    if (animating) {
        animProgress += 0.015;
        if (animProgress >= 1) {
            animProgress = 0;
            phase = (phase + 1) % 3;
        }
    }

    // Draw three columns
    let colWidth = (canvasWidth - 80) / 3;
    for (let i = 0; i < 3; i++) {
        let x = 40 + i * (colWidth + 20);
        drawCollisionColumn(x, 60, colWidth, drawHeight - 80, collisions[i], i);
    }

    // Instructions
    fill('black');
    textSize(12);
    textAlign(CENTER, CENTER);
    text('Click anywhere to cycle through: Before → During → After', canvasWidth/2, drawHeight + 25);

    // Phase indicator
    let phases = ['BEFORE', 'DURING', 'AFTER'];
    fill(50, 100, 200);
    textSize(14);
    text('Phase: ' + phases[phase], canvasWidth/2, drawHeight + 42);
}

function drawCollisionColumn(x, y, w, h, collision, idx) {
    // Column background
    fill(255, 255, 255, 200);
    stroke(collision.color[0], collision.color[1], collision.color[2]);
    strokeWeight(2);
    rect(x, y, w, h, 10);

    // Column title
    fill(collision.color[0], collision.color[1], collision.color[2]);
    textSize(16);
    textAlign(CENTER, TOP);
    noStroke();
    text(collision.name + ' Collision', x + w/2, y + 10);

    // Draw balls and arrows based on phase
    let ballY = y + 120;
    let ball1X, ball2X;
    let ballR = 25;

    // Calculate ball positions based on phase
    if (phase === 0) { // Before
        ball1X = x + w * 0.25;
        ball2X = x + w * 0.7;
    } else if (phase === 1) { // During
        let progress = animProgress;
        ball1X = x + w * 0.25 + (w * 0.22) * (animating ? progress : 1);
        ball2X = x + w * 0.7 - (w * 0.22) * (animating ? progress : 1);
    } else { // After
        if (collision.stickTogether) {
            ball1X = x + w * 0.5;
            ball2X = x + w * 0.5;
        } else {
            let separation = animating ? animProgress : 1;
            ball1X = x + w * 0.35 - w * 0.1 * separation;
            ball2X = x + w * 0.55 + w * 0.2 * separation;
        }
    }

    // Draw balls
    // Ball 1 (blue, larger)
    fill(100, 150, 220);
    stroke(50, 100, 180);
    strokeWeight(2);
    ellipse(ball1X, ballY, ballR * 1.3, ballR * 1.3);
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    noStroke();
    text('3kg', ball1X, ballY);

    // Ball 2 (red, smaller)
    if (!collision.stickTogether || phase < 2) {
        fill(220, 120, 120);
        stroke(180, 80, 80);
        strokeWeight(2);
        ellipse(ball2X, ballY, ballR, ballR);
        fill(255);
        textSize(10);
        noStroke();
        text('1kg', ball2X, ballY);
    }

    // Draw velocity arrows
    drawVelocityArrows(ball1X, ball2X, ballY, collision, phase);

    // Draw collision effect during collision
    if (phase === 1) {
        let cx = (ball1X + ball2X) / 2;
        stroke(255, 200, 0);
        strokeWeight(2);
        noFill();
        for (let i = 0; i < 6; i++) {
            let angle = i * PI / 3 + frameCount * 0.05;
            let len = 15 + 5 * sin(frameCount * 0.1 + i);
            line(cx, ballY, cx + cos(angle) * len, ballY + sin(angle) * len);
        }
    }

    // Energy bars section
    let barY = y + 200;
    drawEnergyBars(x, barY, w, collision, phase);

    // Momentum section
    let momY = y + 350;
    drawMomentumSection(x, momY, w, collision, phase);

    // Summary label
    let summaryY = y + h - 40;
    fill(collision.color[0], collision.color[1], collision.color[2]);
    textSize(11);
    textAlign(CENTER, TOP);

    if (collision.ke_conserved) {
        text('✓ Momentum conserved', x + w/2, summaryY);
        text('✓ KE conserved', x + w/2, summaryY + 15);
    } else {
        text('✓ Momentum conserved', x + w/2, summaryY);
        let keLost = collision.ke_before - collision.ke_after;
        text('✗ KE lost: ' + keLost.toFixed(1) + ' J', x + w/2, summaryY + 15);
    }
}

function drawVelocityArrows(ball1X, ball2X, ballY, collision, phase) {
    let arrowY = ballY - 45;
    let scale = 10;

    textSize(9);
    textAlign(CENTER, BOTTOM);

    if (phase === 0) {
        // Ball 1 initial velocity (moving right)
        if (collision.ball1.v_i > 0) {
            stroke(0, 180, 0);
            strokeWeight(2);
            fill(0, 180, 0);
            let len = collision.ball1.v_i * scale;
            line(ball1X, arrowY, ball1X + len, arrowY);
            triangle(ball1X + len, arrowY, ball1X + len - 8, arrowY - 4, ball1X + len - 8, arrowY + 4);
            noStroke();
            text(collision.ball1.v_i + ' m/s', ball1X + len/2, arrowY - 5);
        }

        // Ball 2 initial velocity (stationary)
        noStroke();
        fill(100);
        text('v = 0', ball2X, arrowY - 5);
    } else if (phase === 2) {
        // Ball 1 final velocity
        let v1 = collision.ball1.v_f;
        if (v1 !== 0) {
            stroke(0, 180, 0);
            strokeWeight(2);
            fill(0, 180, 0);
            let len = abs(v1) * scale;
            let dir = v1 > 0 ? 1 : -1;
            line(ball1X, arrowY, ball1X + len * dir, arrowY);
            triangle(ball1X + len * dir, arrowY,
                     ball1X + len * dir - 8 * dir, arrowY - 4,
                     ball1X + len * dir - 8 * dir, arrowY + 4);
            noStroke();
            text(v1 + ' m/s', ball1X + len * dir / 2, arrowY - 5);
        }

        // Ball 2 final velocity
        if (!collision.stickTogether) {
            let v2 = collision.ball2.v_f;
            stroke(0, 180, 0);
            strokeWeight(2);
            fill(0, 180, 0);
            let len = v2 * scale;
            line(ball2X, arrowY, ball2X + len, arrowY);
            triangle(ball2X + len, arrowY, ball2X + len - 8, arrowY - 4, ball2X + len - 8, arrowY + 4);
            noStroke();
            text(v2 + ' m/s', ball2X + len/2, arrowY - 5);
        } else {
            // Combined object velocity
            let v = collision.ball1.v_f;
            stroke(0, 180, 0);
            strokeWeight(2);
            fill(0, 180, 0);
            let len = v * scale;
            line(ball1X, arrowY, ball1X + len, arrowY);
            triangle(ball1X + len, arrowY, ball1X + len - 8, arrowY - 4, ball1X + len - 8, arrowY + 4);
            noStroke();
            text(v + ' m/s (combined)', ball1X + len/2, arrowY - 5);
        }
    }
}

function drawEnergyBars(x, y, w, collision, phase) {
    let barWidth = w * 0.7;
    let barHeight = 25;
    let barX = x + (w - barWidth) / 2;
    let maxKE = 30;

    // Title
    fill('black');
    textSize(11);
    textAlign(CENTER, TOP);
    noStroke();
    text('Kinetic Energy', x + w/2, y);

    // Before bar
    y += 20;
    fill(200);
    rect(barX, y, barWidth, barHeight, 3);

    let ke = phase === 0 ? collision.ke_before :
             phase === 1 ? lerp(collision.ke_before, collision.ke_after, animating ? animProgress : 0.5) :
             collision.ke_after;

    let fillWidth = map(ke, 0, maxKE, 0, barWidth);
    fill(100, 180, 100);
    rect(barX, y, fillWidth, barHeight, 3);

    fill('black');
    textSize(10);
    textAlign(LEFT, CENTER);
    text(ke.toFixed(1) + ' J', barX + fillWidth + 5, y + barHeight/2);

    // Label
    textAlign(RIGHT, CENTER);
    fill(80);
    text(phase === 0 ? 'Before:' : phase === 2 ? 'After:' : 'During:', barX - 5, y + barHeight/2);

    // Show energy loss for non-elastic
    if (phase === 2 && !collision.ke_conserved) {
        y += 30;
        let lost = collision.ke_before - collision.ke_after;
        fill(220, 100, 100);
        textSize(10);
        textAlign(CENTER, TOP);
        text('Energy converted to heat/sound: ' + lost.toFixed(1) + ' J', x + w/2, y);
    }
}

function drawMomentumSection(x, y, w, collision, phase) {
    // Title
    fill('black');
    textSize(11);
    textAlign(CENTER, TOP);
    noStroke();
    text('Momentum', x + w/2, y);

    y += 20;

    // Calculate momentum
    let p1_i = collision.ball1.m * collision.ball1.v_i;
    let p2_i = collision.ball2.m * 0; // Ball 2 starts stationary
    let p_total_i = p1_i + p2_i;

    let p1_f, p2_f;
    if (collision.stickTogether) {
        p1_f = (collision.ball1.m + collision.ball2.m) * collision.ball1.v_f;
        p2_f = 0;
    } else {
        p1_f = collision.ball1.m * collision.ball1.v_f;
        p2_f = collision.ball2.m * collision.ball2.v_f;
    }
    let p_total_f = p1_f + p2_f;

    // Draw momentum vectors
    let vecY = y + 15;
    let centerX = x + w/2;
    let scale = 3;

    // Before momentum
    if (phase === 0 || phase === 1) {
        stroke(100, 150, 220);
        strokeWeight(3);
        fill(100, 150, 220);
        let len = p1_i * scale;
        line(centerX, vecY, centerX + len, vecY);
        triangle(centerX + len, vecY, centerX + len - 6, vecY - 3, centerX + len - 6, vecY + 3);

        noStroke();
        textSize(9);
        text('p = ' + p_total_i + ' kg·m/s', centerX + len/2, vecY - 10);
    }

    // After momentum
    if (phase === 2) {
        stroke(150, 100, 200);
        strokeWeight(3);
        fill(150, 100, 200);
        let len = p_total_f * scale;
        line(centerX, vecY, centerX + len, vecY);
        triangle(centerX + len, vecY, centerX + len - 6, vecY - 3, centerX + len - 6, vecY + 3);

        noStroke();
        textSize(9);
        text('p = ' + p_total_f.toFixed(0) + ' kg·m/s', centerX + len/2, vecY - 10);
    }

    // Conservation note
    y += 40;
    fill(0, 150, 0);
    textSize(10);
    textAlign(CENTER, TOP);
    text('p_before = p_after = ' + p_total_i + ' kg·m/s', x + w/2, y);
}

function mousePressed() {
    if (mouseY < drawHeight) {
        phase = (phase + 1) % 3;
        animProgress = 0;
        animating = true;
        setTimeout(() => animating = false, 1500);
    }
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
