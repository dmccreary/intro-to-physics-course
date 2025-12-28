// Standing Waves on a String MicroSim
// Visualize standing wave patterns and understand nodes, antinodes, and harmonics

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 400;
let controlHeight = 200;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Wave parameters
let harmonic = 1;
let amplitude = 40;
let stringLength = 700;
let animationSpeed = 2;

// Animation state
let time = 0;
let isPlaying = true;

// UI Elements
let harmonicButtons = [];
let amplitudeSlider, speedSlider;
let playButton;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Create harmonic selection buttons
    let buttonY = drawHeight + 15;
    let buttonSpacing = 55;

    for (let n = 1; n <= 6; n++) {
        let btn = createButton('n = ' + n);
        btn.position(margin + (n - 1) * buttonSpacing, buttonY);
        btn.mousePressed(() => setHarmonic(n));
        harmonicButtons.push(btn);
    }

    // Amplitude slider
    let sliderY = drawHeight + 60;
    amplitudeSlider = createSlider(10, 60, 40, 1);
    amplitudeSlider.position(margin + 100, sliderY);
    amplitudeSlider.size(150);

    // Animation speed slider
    speedSlider = createSlider(0.5, 5, 2, 0.5);
    speedSlider.position(margin + 380, sliderY);
    speedSlider.size(150);

    // Play/Pause button
    playButton = createButton('Pause');
    playButton.position(margin + 560, sliderY - 5);
    playButton.mousePressed(togglePlay);

    describe('Standing wave animation showing nodes, antinodes, and harmonics on a vibrating string', LABEL);
}

function setHarmonic(n) {
    harmonic = n;
    time = 0;
}

function togglePlay() {
    isPlaying = !isPlaying;
    playButton.html(isPlaying ? 'Pause' : 'Play');
}

function draw() {
    updateCanvasSize();

    // Get slider values
    amplitude = amplitudeSlider.value();
    animationSpeed = speedSlider.value();

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Draw title
    fill('black');
    noStroke();
    textSize(24);
    textAlign(CENTER, TOP);
    text('Standing Waves on a String', canvasWidth / 2, 10);

    // Subtitle with harmonic info
    textSize(16);
    text('Harmonic n = ' + harmonic, canvasWidth / 2, 40);

    // Draw equilibrium line
    let startX = (canvasWidth - stringLength) / 2;
    let centerY = 200;

    stroke(200);
    strokeWeight(1);
    setLineDash([5, 5]);
    line(startX, centerY, startX + stringLength, centerY);
    setLineDash([]);

    // Draw fixed ends
    fill('#333');
    noStroke();
    circle(startX, centerY, 20);
    circle(startX + stringLength, centerY, 20);

    // Update animation
    if (isPlaying) {
        time += animationSpeed * 0.02;
    }

    // Draw standing wave
    drawStandingWave(startX, centerY);

    // Draw nodes and antinodes
    drawNodesAndAntinodes(startX, centerY);

    // Draw info panel
    drawInfoPanel(startX);

    // Draw slider labels
    drawSliderLabels();

    // Highlight current harmonic button
    for (let i = 0; i < harmonicButtons.length; i++) {
        if (i === harmonic - 1) {
            harmonicButtons[i].style('background-color', '#4CAF50');
            harmonicButtons[i].style('color', 'white');
        } else {
            harmonicButtons[i].style('background-color', '#f0f0f0');
            harmonicButtons[i].style('color', 'black');
        }
    }
}

function drawStandingWave(startX, centerY) {
    // Standing wave: y = A * sin(n*pi*x/L) * cos(omega*t)
    stroke('#2196F3');
    strokeWeight(3);
    noFill();

    beginShape();
    for (let x = 0; x <= stringLength; x += 2) {
        let normalizedX = x / stringLength;
        let spatialPart = sin(harmonic * PI * normalizedX);
        let temporalPart = cos(time * 5);
        let y = centerY - amplitude * spatialPart * temporalPart;
        vertex(startX + x, y);
    }
    endShape();

    // Draw envelope (max displacement)
    stroke('#2196F3');
    strokeWeight(1);
    setLineDash([3, 3]);

    // Upper envelope
    beginShape();
    for (let x = 0; x <= stringLength; x += 5) {
        let normalizedX = x / stringLength;
        let y = centerY - amplitude * abs(sin(harmonic * PI * normalizedX));
        vertex(startX + x, y);
    }
    endShape();

    // Lower envelope
    beginShape();
    for (let x = 0; x <= stringLength; x += 5) {
        let normalizedX = x / stringLength;
        let y = centerY + amplitude * abs(sin(harmonic * PI * normalizedX));
        vertex(startX + x, y);
    }
    endShape();

    setLineDash([]);
}

function drawNodesAndAntinodes(startX, centerY) {
    // Nodes occur at x = k*L/n for k = 0, 1, 2, ..., n
    // Antinodes occur at x = (2k+1)*L/(2n) for k = 0, 1, ..., n-1

    // Draw nodes (red circles)
    fill('#E53935');
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);

    for (let k = 0; k <= harmonic; k++) {
        let x = startX + (k * stringLength) / harmonic;
        circle(x, centerY, 15);
        fill('#E53935');
        if (k === 0) {
            text('N', x, centerY + 20);
        } else if (k === harmonic) {
            text('N', x, centerY + 20);
        } else {
            text('N', x, centerY + 20);
        }
    }

    // Draw antinodes (green circles)
    fill('#4CAF50');
    for (let k = 0; k < harmonic; k++) {
        let x = startX + ((2 * k + 1) * stringLength) / (2 * harmonic);
        circle(x, centerY, 15);
        fill('#4CAF50');
        text('A', x, centerY + 20);
    }
}

function drawInfoPanel(startX) {
    // Info panel on the right
    let panelX = startX + stringLength + 20;
    let panelY = 70;
    let panelWidth = canvasWidth - panelX - 20;
    let panelHeight = 280;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 10);

    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);

    let x = panelX + 10;
    let y = panelY + 10;
    let lineHeight = 22;

    // Calculate wavelength
    let wavelength = (2 * stringLength) / harmonic;

    text('Harmonic: n = ' + harmonic, x, y);
    y += lineHeight;

    text('Nodes: ' + (harmonic + 1), x, y);
    y += lineHeight;

    text('Antinodes: ' + harmonic, x, y);
    y += lineHeight * 1.5;

    // Formulas
    textSize(13);
    text('Wavelength:', x, y);
    y += lineHeight;
    textSize(12);
    text('λn = 2L/n', x + 10, y);
    y += lineHeight;
    text('λ' + harmonic + ' = ' + (wavelength).toFixed(0) + ' px', x + 10, y);
    y += lineHeight * 1.5;

    textSize(13);
    text('Frequency ratio:', x, y);
    y += lineHeight;
    textSize(12);
    text('fn = n × f₁', x + 10, y);
    y += lineHeight;
    text('f' + harmonic + ' = ' + harmonic + ' × f₁', x + 10, y);
    y += lineHeight * 1.5;

    // Legend
    textSize(12);
    fill('#E53935');
    circle(x + 5, y + 5, 10);
    fill('black');
    text('Node (N)', x + 15, y);
    y += lineHeight;

    fill('#4CAF50');
    circle(x + 5, y + 5, 10);
    fill('black');
    text('Antinode (A)', x + 15, y);
}

function drawSliderLabels() {
    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);

    let labelY = drawHeight + 72;

    text('Amplitude: ' + amplitude + 'px', margin, labelY);
    text('Speed: ' + animationSpeed.toFixed(1), margin + 280, labelY);

    // Harmonic selector label
    textSize(13);
    text('Select harmonic:', margin, drawHeight + 5);
}

function setLineDash(pattern) {
    drawingContext.setLineDash(pattern);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 900);
        stringLength = canvasWidth - 200;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    // Update slider sizes
    if (amplitudeSlider) {
        amplitudeSlider.size(150);
    }
    if (speedSlider) {
        speedSlider.size(150);
    }
}
