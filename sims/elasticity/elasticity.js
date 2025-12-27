// Elasticity MicroSim - Bouncing Ball with Adjustable Elasticity
// Demonstrates how elasticity affects energy loss during collisions

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 250;
let defaultTextSize = 16;

// Ball properties
let ballX, ballY;
let ballVX, ballVY;
let ballRadius = 20;
let gravity = 0.5;

// Controls
let elasticitySlider;
let runPauseButton;
let restartButton;

// State
let isRunning = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Initialize ball position and velocity
    resetBall();

    // Create run/pause button
    runPauseButton = createButton('Run');
    runPauseButton.position(10, drawHeight + 12);
    runPauseButton.mousePressed(toggleRunning);

    // Create restart button
    restartButton = createButton('Restart');
    restartButton.position(70, drawHeight + 12);
    restartButton.mousePressed(restartSimulation);

    // Create elasticity slider (0 to 1, default 0.8)
    elasticitySlider = createSlider(0, 1, 0.8, 0.01);
    elasticitySlider.position(sliderLeftMargin, drawHeight + 15);
    elasticitySlider.size(canvasWidth - sliderLeftMargin - margin);

    describe('A ball bouncing in a box with adjustable elasticity. Use the slider to change how much energy is retained after each bounce.', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Draw title
    fill('black');
    textSize(24);
    textAlign(CENTER, TOP);
    noStroke();
    text('Elasticity', canvasWidth / 2, 10);

    // Reset text settings
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);

    // Update ball physics if running
    if (isRunning) {
        // Apply gravity
        ballVY += gravity;

        // Update position
        ballX += ballVX;
        ballY += ballVY;

        // Get current elasticity value
        let elasticity = elasticitySlider.value();

        // Bounce off walls
        // Right wall
        if (ballX + ballRadius > canvasWidth) {
            ballX = canvasWidth - ballRadius;
            ballVX *= -elasticity;
        }
        // Left wall
        if (ballX - ballRadius < 0) {
            ballX = ballRadius;
            ballVX *= -elasticity;
        }
        // Bottom wall (floor)
        if (ballY + ballRadius > drawHeight) {
            ballY = drawHeight - ballRadius;
            ballVY *= -elasticity;
            // Also reduce horizontal velocity due to friction
            ballVX *= 0.99;
        }
        // Top wall (ceiling)
        if (ballY - ballRadius < 0) {
            ballY = ballRadius;
            ballVY *= -elasticity;
        }

        // Stop ball if moving very slowly
        if (abs(ballVY) < 0.1 && ballY + ballRadius >= drawHeight - 1) {
            ballVY = 0;
            ballY = drawHeight - ballRadius;
        }
    }

    // Draw the ball
    fill('steelblue');
    stroke('darkblue');
    strokeWeight(2);
    ellipse(ballX, ballY, ballRadius * 2, ballRadius * 2);

    // Add highlight to ball for 3D effect
    fill(255, 255, 255, 100);
    noStroke();
    ellipse(ballX - ballRadius * 0.3, ballY - ballRadius * 0.3, ballRadius * 0.5, ballRadius * 0.5);

    // Draw control labels
    fill('black');
    noStroke();
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text('Elasticity: ' + elasticitySlider.value().toFixed(2), 140, drawHeight + 25);
}

function toggleRunning() {
    isRunning = !isRunning;
    runPauseButton.html(isRunning ? 'Pause' : 'Run');

    // If starting from stopped state with ball at rest, give it a push
    if (isRunning && abs(ballVX) < 0.5 && abs(ballVY) < 0.5) {
        ballVX = random(3, 6) * (random() > 0.5 ? 1 : -1);
        ballVY = random(-8, -4);
    }
}

function restartSimulation() {
    resetBall();
    isRunning = false;
    runPauseButton.html('Run');
}

function resetBall() {
    ballX = canvasWidth / 2;
    ballY = drawHeight / 2;
    ballVX = 4;
    ballVY = 0;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
        if (typeof elasticitySlider !== 'undefined') {
            elasticitySlider.size(canvasWidth - sliderLeftMargin - margin);
        }
    }
}
