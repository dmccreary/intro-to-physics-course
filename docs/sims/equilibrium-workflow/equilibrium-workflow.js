// Equilibrium Classification Workflow MicroSim
// Decision tree to classify equilibrium states

let canvasWidth = 900;
let drawHeight = 480;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

// Decision tree nodes
let nodes = [];
let currentPath = [];
let selectedExample = -1;

// Examples for practice
const examples = [
    { name: "Book on table", velocity: 0, netForce: 0, answer: "static", desc: "At rest, forces balanced" },
    { name: "Car at constant 60 mph", velocity: 27, netForce: 0, answer: "dynamic", desc: "Moving, forces balanced" },
    { name: "Falling ball", velocity: 10, netForce: 10, answer: "none", desc: "Accelerating downward" },
    { name: "Parachutist at terminal velocity", velocity: 50, netForce: 0, answer: "dynamic", desc: "Constant fall speed" },
    { name: "Ball at peak of throw", velocity: 0, netForce: 9.8, answer: "none", desc: "v=0 but a≠0!" }
];

let exampleButtons = [];
let resetButton;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Create example buttons
    let buttonX = 10;
    for (let i = 0; i < examples.length; i++) {
        let btn = createButton(examples[i].name);
        btn.position(buttonX, drawHeight + 10);
        btn.mousePressed(() => selectExample(i));
        btn.style('font-size', '11px');
        btn.style('padding', '5px 8px');
        exampleButtons.push(btn);
        buttonX += btn.elt.offsetWidth + 5;
    }

    resetButton = createButton('Reset');
    resetButton.position(10, drawHeight + 42);
    resetButton.mousePressed(resetPath);
    resetButton.style('padding', '5px 15px');

    initNodes();
    describe('Interactive decision tree for classifying equilibrium states', LABEL);

    // Notify parent frame of initial size for iframe resizing
    window.parent.postMessage({ type: 'microsim-resize', height: canvasHeight+10 }, '*');
}

function initNodes() {
    nodes = [
        { id: 0, x: 340, y: 100, text: "Is net force zero?", type: "decision", width: 180, height: 50 },
        { id: 1, x: 115, y: 200, text: "NOT Equilibrium", type: "result-red", width: 150, height: 45 },
        { id: 2, x: 465, y: 200, text: "Is velocity zero?", type: "decision", width: 160, height: 50 },
        { id: 3, x: 365, y: 320, text: "STATIC\nEquilibrium", type: "result-blue", width: 140, height: 60 },
        { id: 4, x: 565, y: 320, text: "DYNAMIC\nEquilibrium", type: "result-green", width: 140, height: 60 }
    ];
}

function selectExample(index) {
    selectedExample = index;
    currentPath = [];

    let ex = examples[index];
    // Trace the path based on example
    if (ex.netForce !== 0) {
        currentPath = [0, 1]; // Not equilibrium
    } else if (ex.velocity === 0) {
        currentPath = [0, 2, 3]; // Static equilibrium
    } else {
        currentPath = [0, 2, 4]; // Dynamic equilibrium
    }
}

function resetPath() {
    selectedExample = -1;
    currentPath = [];
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
    text('Equilibrium Classification Flowchart', canvasWidth / 2, 10);

    // Draw connections first (so they're behind nodes)
    drawConnections();

    // Draw nodes
    for (let node of nodes) {
        drawNode(node);
    }

    // Draw legend
    drawLegend();

    // Draw example info if selected
    if (selectedExample >= 0) {
        drawExampleInfo();
    }

    // Highlight active button
    for (let i = 0; i < exampleButtons.length; i++) {
        if (i === selectedExample) {
            exampleButtons[i].style('background-color', '#4CAF50');
            exampleButtons[i].style('color', 'white');
        } else {
            exampleButtons[i].style('background-color', '#e0e0e0');
            exampleButtons[i].style('color', 'black');
        }
    }
}

function drawConnections() {
    // Connection data: from, to, label, labelPos
    let connections = [
        { from: 0, to: 1, label: "No (Fnet ≠ 0)", side: "left" },
        { from: 0, to: 2, label: "Yes (Fnet = 0)", side: "right" },
        { from: 2, to: 3, label: "Yes (v = 0)", side: "left" },
        { from: 2, to: 4, label: "No (v ≠ 0)", side: "right" }
    ];

    for (let conn of connections) {
        let fromNode = nodes[conn.from];
        let toNode = nodes[conn.to];

        // Check if this connection is in current path
        let isActive = false;
        for (let i = 0; i < currentPath.length - 1; i++) {
            if (currentPath[i] === conn.from && currentPath[i + 1] === conn.to) {
                isActive = true;
                break;
            }
        }

        // Draw arrow
        if (isActive) {
            stroke('#9B59B6');
            strokeWeight(4);
        } else {
            stroke('#999');
            strokeWeight(2);
        }

        let startY = fromNode.y + fromNode.height / 2;
        let endY = toNode.y - toNode.height / 2;

        // Curved path
        noFill();
        beginShape();
        vertex(fromNode.x, startY);
        if (conn.side === "left") {
            bezierVertex(fromNode.x - 50, (startY + endY) / 2, toNode.x, (startY + endY) / 2, toNode.x, endY);
        } else {
            bezierVertex(fromNode.x + 50, (startY + endY) / 2, toNode.x, (startY + endY) / 2, toNode.x, endY);
        }
        endShape();

        // Arrowhead
        let angle = atan2(10, 0);
        fill(isActive ? '#9B59B6' : '#999');
        noStroke();
        push();
        translate(toNode.x, endY);
        rotate(PI / 2);
        triangle(0, 0, -8, -5, -8, 5);
        pop();

        // Label
        textSize(12);
        textAlign(CENTER, CENTER);
        fill(isActive ? '#9B59B6' : '#666');
        let labelX = (fromNode.x + toNode.x) / 2;
        let labelY = (startY + endY) / 2 - 10;
        if (conn.side === "left") labelX -= 30;
        else labelX += 30;
        text(conn.label, labelX, labelY);
    }
}

function drawNode(node) {
    let isActive = currentPath.includes(node.id);

    // Node styling based on type
    if (node.type === "decision") {
        // Diamond shape
        fill(isActive ? '#FFF3CD' : 'white');
        stroke(isActive ? '#FFC107' : '#999');
        strokeWeight(isActive ? 3 : 2);

        push();
        translate(node.x, node.y);
        beginShape();
        vertex(0, -node.height / 2 - 10);
        vertex(node.width / 2 + 10, 0);
        vertex(0, node.height / 2 + 10);
        vertex(-node.width / 2 - 10, 0);
        endShape(CLOSE);
        pop();

        fill('#333');
        noStroke();
        textSize(14);
        textAlign(CENTER, CENTER);
        text(node.text, node.x, node.y);

    } else if (node.type === "result-red") {
        fill(isActive ? '#FADBD8' : '#f8f8f8');
        stroke(isActive ? '#E74C3C' : '#ccc');
        strokeWeight(isActive ? 3 : 2);
        rect(node.x - node.width / 2, node.y - node.height / 2, node.width, node.height, 10);

        fill(isActive ? '#E74C3C' : '#666');
        noStroke();
        textSize(14);
        textAlign(CENTER, CENTER);
        text(node.text, node.x, node.y);

        // Subtext
        textSize(11);
        fill('#888');
        text("Object accelerates", node.x, node.y + node.height / 2 + 15);

    } else if (node.type === "result-blue") {
        fill(isActive ? '#D4E6F1' : '#f8f8f8');
        stroke(isActive ? '#3498DB' : '#ccc');
        strokeWeight(isActive ? 3 : 2);
        rect(node.x - node.width / 2, node.y - node.height / 2, node.width, node.height, 10);

        fill(isActive ? '#3498DB' : '#666');
        noStroke();
        textSize(14);
        textAlign(CENTER, CENTER);
        let lines = node.text.split('\n');
        text(lines[0], node.x, node.y - 8);
        text(lines[1], node.x, node.y + 10);

        textSize(11);
        fill('#888');
        text("At rest, stays at rest", node.x, node.y + node.height / 2 + 15);

    } else if (node.type === "result-green") {
        fill(isActive ? '#D5F5E3' : '#f8f8f8');
        stroke(isActive ? '#27AE60' : '#ccc');
        strokeWeight(isActive ? 3 : 2);
        rect(node.x - node.width / 2, node.y - node.height / 2, node.width, node.height, 10);

        fill(isActive ? '#27AE60' : '#666');
        noStroke();
        textSize(14);
        textAlign(CENTER, CENTER);
        let lines = node.text.split('\n');
        text(lines[0], node.x, node.y - 8);
        text(lines[1], node.x, node.y + 10);

        textSize(11);
        fill('#888');
        text("Constant velocity", node.x, node.y + node.height / 2 + 15);
    }
}

function drawLegend() {
    let lx = 30;
    let ly = 400;

    fill(255, 255, 255, 230);
    stroke('#999');
    strokeWeight(1);
    rect(lx, ly, 250, 70, 8);

    fill('#333');
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);
    text("Equilibrium = Net force is zero", lx + 10, ly + 10);
    text("Static: At rest (v = 0)", lx + 10, ly + 28);
    text("Dynamic: Moving at constant velocity", lx + 10, ly + 46);
}

function drawExampleInfo() {
    let ex = examples[selectedExample];
    let ix = canvasWidth - 300;
    let iy = 400;

    fill(255, 255, 255, 240);
    stroke('#9B59B6');
    strokeWeight(2);
    rect(ix, iy, 250, 70, 8);

    fill('#9B59B6');
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text(ex.name, ix + 10, iy + 8);

    fill('#333');
    textSize(12);
    text("v = " + ex.velocity + " m/s, Fnet = " + ex.netForce + " N", ix + 10, iy + 28);
    text(ex.desc, ix + 10, iy + 46);
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
