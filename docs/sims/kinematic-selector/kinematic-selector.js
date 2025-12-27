// Kinematic Equation Selector Tool
// Interactive tool to help students choose the right kinematic equation

let canvasWidth = 800;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Variables state: unknown, known, find
let variables = {
    x: 'unknown',
    v: 'unknown',
    v0: 'unknown',
    a: 'unknown',
    t: 'unknown'
};

let variableLabels = {
    x: 'Position (x)',
    v: 'Final Velocity (v)',
    v0: 'Initial Velocity (v\u2080)',
    a: 'Acceleration (a)',
    t: 'Time (t)'
};

let equations = [
    { id: 1, formula: 'v = v\u2080 + at', uses: ['v', 'v0', 'a', 't'], missing: 'x' },
    { id: 2, formula: 'x = x\u2080 + v\u2080t + \u00BDat\u00B2', uses: ['x', 'v0', 'a', 't'], missing: 'v' },
    { id: 3, formula: 'v\u00B2 = v\u2080\u00B2 + 2a(x-x\u2080)', uses: ['v', 'v0', 'a', 'x'], missing: 't' },
    { id: 4, formula: 'x = x\u2080 + \u00BD(v\u2080+v)t', uses: ['x', 'v0', 'v', 't'], missing: 'a' }
];

let buttons = {};
let resetButton;
let recommendedEq = null;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Create reset button
    resetButton = createButton('Reset All');
    resetButton.position(margin, drawHeight + 12);
    resetButton.mousePressed(resetVariables);
    resetButton.style('font-size', '14px');
    resetButton.style('padding', '6px 16px');

    describe('Interactive tool to help students select the appropriate kinematic equation based on known and unknown variables.', LABEL);
}

function draw() {
    updateCanvasSize();

    // Background
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
    text('Kinematic Equation Selector', canvasWidth / 2, 10);

    // Instructions
    textSize(14);
    fill(80);
    text('Click variables to mark as Known (green) or Find This (blue)', canvasWidth / 2, 40);

    // Draw variable selector
    drawVariableSelector();

    // Analyze and draw recommendations
    analyzeAndRecommend();

    // Draw equations panel
    drawEquationsPanel();

    // Draw help text
    drawHelp();
}

function drawVariableSelector() {
    let startX = 60;
    let startY = 80;
    let boxW = 130;
    let boxH = 60;
    let spacing = 15;

    let keys = ['x', 'v0', 'v', 'a', 't'];
    let x = startX;

    for (let key of keys) {
        // Box background color based on state
        let col;
        switch (variables[key]) {
            case 'known': col = color(100, 200, 100); break;
            case 'find': col = color(100, 150, 255); break;
            default: col = color(220, 220, 220);
        }

        fill(col);
        stroke(150);
        strokeWeight(2);
        rect(x, startY, boxW, boxH, 10);

        // Variable name
        fill(0);
        noStroke();
        textSize(16);
        textAlign(CENTER, CENTER);
        text(variableLabels[key], x + boxW / 2, startY + 20);

        // State label
        textSize(12);
        fill(60);
        let stateText = variables[key] === 'known' ? 'KNOWN' :
                        variables[key] === 'find' ? 'FIND THIS' : 'Click to set';
        text(stateText, x + boxW / 2, startY + 45);

        x += boxW + spacing;
    }

    // Draw legend
    let legendY = startY + boxH + 20;
    textSize(12);
    textAlign(LEFT, CENTER);

    fill(100, 200, 100);
    noStroke();
    rect(startX, legendY, 20, 15, 3);
    fill(0);
    text('Known', startX + 28, legendY + 7);

    fill(100, 150, 255);
    rect(startX + 100, legendY, 20, 15, 3);
    fill(0);
    text('Find This', startX + 128, legendY + 7);

    fill(220, 220, 220);
    rect(startX + 210, legendY, 20, 15, 3);
    fill(0);
    text('Not Set', startX + 238, legendY + 7);
}

function analyzeAndRecommend() {
    let known = [];
    let findVar = null;

    for (let key in variables) {
        if (variables[key] === 'known') known.push(key);
        if (variables[key] === 'find') findVar = key;
    }

    recommendedEq = null;

    // Need at least 3 known and 1 to find
    if (known.length >= 3 && findVar) {
        // Find equation that uses findVar and has its missing variable not needed
        for (let eq of equations) {
            if (eq.uses.includes(findVar)) {
                // Check if all other variables in this equation are known
                let canUse = true;
                for (let v of eq.uses) {
                    if (v !== findVar && !known.includes(v)) {
                        canUse = false;
                        break;
                    }
                }
                if (canUse) {
                    recommendedEq = eq.id;
                    break;
                }
            }
        }
    }

    // Draw analysis panel
    let panelX = 60;
    let panelY = 195;
    let panelW = canvasWidth - 120;
    let panelH = 70;

    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 10);

    textSize(14);
    textAlign(LEFT, TOP);
    fill(0);
    text('Analysis:', panelX + 15, panelY + 12);

    textSize(13);
    fill(60);
    let analysisY = panelY + 35;

    if (known.length < 3) {
        text('Need at least 3 known variables. Currently have: ' + known.length, panelX + 15, analysisY);
    } else if (!findVar) {
        text('Mark one variable as "Find This" to get a recommendation.', panelX + 15, analysisY);
    } else if (recommendedEq) {
        fill(0, 150, 0);
        textSize(15);
        text('\u2713 Use Equation #' + recommendedEq + ' (highlighted below)', panelX + 15, analysisY);
    } else {
        fill(200, 50, 50);
        text('Cannot find ' + variableLabels[findVar] + ' with current known variables.', panelX + 15, analysisY);
    }
}

function drawEquationsPanel() {
    let panelX = 60;
    let panelY = 280;
    let panelW = canvasWidth - 120;
    let eqH = 55;

    textSize(16);
    textAlign(LEFT, TOP);
    fill(0);
    text('Kinematic Equations:', panelX, panelY);

    let y = panelY + 30;

    for (let eq of equations) {
        let isRecommended = eq.id === recommendedEq;

        // Equation box
        fill(isRecommended ? color(200, 255, 200) : color(255));
        stroke(isRecommended ? color(0, 150, 0) : color(180));
        strokeWeight(isRecommended ? 3 : 1);
        rect(panelX, y, panelW, eqH, 8);

        // Equation number
        fill(isRecommended ? color(0, 150, 0) : color(100));
        noStroke();
        textSize(14);
        textAlign(LEFT, CENTER);
        text('#' + eq.id, panelX + 15, y + eqH / 2);

        // Formula
        fill(0);
        textSize(18);
        textAlign(CENTER, CENTER);
        text(eq.formula, panelX + panelW / 2, y + eqH / 2);

        // Missing variable
        fill(100);
        textSize(12);
        textAlign(RIGHT, CENTER);
        text('Missing: ' + variableLabels[eq.missing], panelX + panelW - 15, y + eqH / 2);

        // Recommended badge
        if (isRecommended) {
            fill(0, 150, 0);
            textSize(14);
            textAlign(LEFT, TOP);
            text('\u2605 RECOMMENDED', panelX + 60, y + 5);
        }

        y += eqH + 10;
    }
}

function drawHelp() {
    let helpY = 530;
    textSize(12);
    fill(80);
    textAlign(CENTER, TOP);
    text('Tip: Choose the equation that contains what you know and what you need to find, but NOT the variable you don\'t have.', canvasWidth / 2, helpY);
}

function mousePressed() {
    // Check if clicked on a variable box
    let startX = 60;
    let startY = 80;
    let boxW = 130;
    let boxH = 60;
    let spacing = 15;

    let keys = ['x', 'v0', 'v', 'a', 't'];

    for (let i = 0; i < keys.length; i++) {
        let x = startX + i * (boxW + spacing);
        if (mouseX >= x && mouseX <= x + boxW && mouseY >= startY && mouseY <= startY + boxH) {
            // Cycle through states
            let key = keys[i];
            if (variables[key] === 'unknown') {
                variables[key] = 'known';
            } else if (variables[key] === 'known') {
                // Check if there's already a 'find' variable
                let hasFind = Object.values(variables).includes('find');
                variables[key] = hasFind ? 'unknown' : 'find';
            } else {
                variables[key] = 'unknown';
            }
        }
    }
}

function resetVariables() {
    for (let key in variables) {
        variables[key] = 'unknown';
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 900);
    }
}
