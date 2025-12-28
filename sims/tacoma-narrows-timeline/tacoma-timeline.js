// Tacoma Narrows Bridge Resonance Timeline
// Shows the sequence of events on November 7, 1940

let canvasWidth = 750;
let drawHeight = 480;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

// Timeline events
let events = [
    {
        time: '7:00 AM',
        title: 'Bridge Opens',
        description: 'Bridge opens to traffic. Wind speed 35-40 mph.',
        severity: 'normal',
        details: 'Morning traffic begins crossing the 2,800 ft main span. Steady winds from the southwest.'
    },
    {
        time: '8:00 AM',
        title: 'Oscillations Begin',
        description: 'Vertical oscillations of 1.5 feet observed.',
        severity: 'warning',
        details: 'Workers notice the roadway moving up and down in wave-like motion. Bridge nicknamed "Galloping Gertie" for this behavior.'
    },
    {
        time: '9:00 AM',
        title: 'Bridge Closed',
        description: 'Traffic stopped due to increasing motion.',
        severity: 'warning',
        details: 'Authorities close the bridge to vehicles. Only personnel remain to monitor the situation.'
    },
    {
        time: '10:00 AM',
        title: 'Mode Change',
        description: 'Motion changes from vertical to twisting.',
        severity: 'critical',
        details: 'Torsional (twisting) oscillations begin. The roadway twists up to 45° from horizontal. This mode has less damping.'
    },
    {
        time: '10:30 AM',
        title: 'Resonance Peak',
        description: 'Torsional amplitude reaches 28 feet!',
        severity: 'critical',
        details: 'Wind vortices drive oscillations at natural frequency. Resonance amplifies motion to destructive levels.'
    },
    {
        time: '11:00 AM',
        title: 'Collapse Begins',
        description: 'Center span cables snap, roadway falls.',
        severity: 'failure',
        details: 'Suspension cables fail under extreme torsional stress. Center section of roadway plunges into Puget Sound.'
    },
    {
        time: '11:10 AM',
        title: 'Complete Failure',
        description: 'Entire 2,800 ft center span destroyed.',
        severity: 'failure',
        details: 'Total collapse of main span. No human casualties (one dog lost). Bridge had only been open 4 months.'
    }
];

// Hover state
let hoveredEvent = -1;
let selectedEvent = -1;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    describe('Timeline showing the collapse of the Tacoma Narrows Bridge on November 7, 1940 due to resonance', LABEL);
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
    textSize(18);
    textAlign(CENTER, TOP);
    noStroke();
    text('Tacoma Narrows Bridge Collapse: November 7, 1940', canvasWidth / 2, 12);

    // Subtitle
    fill(100);
    textSize(13);
    text('A Dramatic Example of Resonance', canvasWidth / 2, 35);

    // Draw timeline
    drawTimeline();

    // Draw detail panel
    drawDetailPanel();

    // Draw key lessons box
    drawLessonsBox();

    // Instructions
    fill(80);
    textSize(12);
    textAlign(CENTER, CENTER);
    text('Click on timeline events to see details. Hover for quick preview.', canvasWidth / 2, drawHeight + 15);

    // Physics note
    textSize(11);
    fill(100);
    text('This disaster led to major advances in bridge aerodynamics and understanding of resonance in structures.', canvasWidth / 2, drawHeight + 50);
}

function drawTimeline() {
    let timelineY = 120;
    let timelineStartX = 60;
    let timelineEndX = canvasWidth - 60;
    let timelineWidth = timelineEndX - timelineStartX;

    // Main timeline line
    stroke(100);
    strokeWeight(4);
    line(timelineStartX, timelineY, timelineEndX, timelineY);

    // End caps
    fill(100);
    noStroke();
    circle(timelineStartX, timelineY, 12);
    circle(timelineEndX, timelineY, 12);

    // Draw events
    hoveredEvent = -1;

    for (let i = 0; i < events.length; i++) {
        let x = timelineStartX + (i / (events.length - 1)) * timelineWidth;
        let isHovered = dist(mouseX, mouseY, x, timelineY) < 25;
        let isSelected = selectedEvent === i;

        if (isHovered) hoveredEvent = i;

        // Event color based on severity
        let eventColor = getSeverityColor(events[i].severity);

        // Event marker
        if (isSelected) {
            // Selected ring
            fill(255);
            stroke(eventColor);
            strokeWeight(4);
            circle(x, timelineY, 40);
        }

        fill(eventColor);
        noStroke();
        circle(x, timelineY, isHovered || isSelected ? 28 : 22);

        // Time label
        fill(60);
        textSize(10);
        textAlign(CENTER, TOP);
        noStroke();
        text(events[i].time, x, timelineY + 25);

        // Short title (alternating above/below)
        textSize(9);
        if (i % 2 === 0) {
            textAlign(CENTER, BOTTOM);
            text(events[i].title, x, timelineY - 20);
        } else {
            textAlign(CENTER, TOP);
            text(events[i].title, x, timelineY + 38);
        }

        // Hover preview
        if (isHovered && !isSelected) {
            drawHoverPreview(x, events[i]);
        }
    }

    // Color legend
    drawSeverityLegend(timelineStartX, timelineY + 60);
}

function getSeverityColor(severity) {
    switch(severity) {
        case 'normal': return color(80, 180, 80);
        case 'warning': return color(230, 180, 50);
        case 'critical': return color(230, 100, 50);
        case 'failure': return color(180, 50, 50);
        default: return color(100);
    }
}

function drawSeverityLegend(x, y) {
    fill(255, 255, 255, 200);
    stroke(180);
    strokeWeight(1);
    rect(x, y, 280, 25, 5);

    let items = [
        { label: 'Normal', color: getSeverityColor('normal') },
        { label: 'Warning', color: getSeverityColor('warning') },
        { label: 'Critical', color: getSeverityColor('critical') },
        { label: 'Failure', color: getSeverityColor('failure') }
    ];

    for (let i = 0; i < items.length; i++) {
        fill(items[i].color);
        noStroke();
        circle(x + 20 + i * 70, y + 12, 12);

        fill(60);
        textSize(9);
        textAlign(LEFT, CENTER);
        text(items[i].label, x + 30 + i * 70, y + 12);
    }
}

function drawHoverPreview(x, event) {
    let boxWidth = 200;
    let boxHeight = 50;
    let boxX = constrain(x - boxWidth/2, 10, canvasWidth - boxWidth - 10);
    let boxY = 70;

    fill(255, 255, 230);
    stroke(getSeverityColor(event.severity));
    strokeWeight(2);
    rect(boxX, boxY, boxWidth, boxHeight, 5);

    fill(60);
    textSize(10);
    textAlign(LEFT, TOP);
    noStroke();

    // Wrap text
    let words = event.description.split(' ');
    let lines = [''];
    let lineIndex = 0;

    for (let word of words) {
        let testLine = lines[lineIndex] + word + ' ';
        if (textWidth(testLine) > boxWidth - 20 && lines[lineIndex] !== '') {
            lineIndex++;
            lines[lineIndex] = word + ' ';
        } else {
            lines[lineIndex] = testLine;
        }
    }

    for (let i = 0; i < lines.length; i++) {
        text(lines[i], boxX + 10, boxY + 10 + i * 14);
    }
}

function drawDetailPanel() {
    let panelX = 60;
    let panelY = 220;
    let panelWidth = canvasWidth - 120;
    let panelHeight = 130;

    // Panel background
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 8);

    if (selectedEvent >= 0) {
        let event = events[selectedEvent];

        // Header with color bar
        fill(getSeverityColor(event.severity));
        noStroke();
        rect(panelX, panelY, panelWidth, 5, 8, 8, 0, 0);

        // Time and title
        fill(60);
        textSize(16);
        textAlign(LEFT, TOP);
        noStroke();
        text(event.time + ' - ' + event.title, panelX + 15, panelY + 15);

        // Description
        fill(80);
        textSize(12);
        text(event.description, panelX + 15, panelY + 40);

        // Details
        textSize(11);
        fill(100);

        // Wrap details text
        let words = event.details.split(' ');
        let lines = [''];
        let lineIndex = 0;
        let maxWidth = panelWidth - 30;

        for (let word of words) {
            let testLine = lines[lineIndex] + word + ' ';
            if (textWidth(testLine) > maxWidth && lines[lineIndex] !== '') {
                lineIndex++;
                lines[lineIndex] = word + ' ';
            } else {
                lines[lineIndex] = testLine;
            }
        }

        for (let i = 0; i < min(lines.length, 4); i++) {
            text(lines[i], panelX + 15, panelY + 60 + i * 15);
        }
    } else {
        // Prompt to select
        fill(120);
        textSize(14);
        textAlign(CENTER, CENTER);
        text('Click an event on the timeline to see details', panelX + panelWidth/2, panelY + panelHeight/2);
    }
}

function drawLessonsBox() {
    let boxX = 60;
    let boxY = 365;
    let boxWidth = canvasWidth - 120;
    let boxHeight = 100;

    // Box background
    fill(255, 250, 240);
    stroke(200, 150, 100);
    strokeWeight(2);
    rect(boxX, boxY, boxWidth, boxHeight, 8);

    // Title
    fill(150, 100, 50);
    textSize(14);
    textAlign(LEFT, TOP);
    noStroke();
    text('🔑 Key Physics Lessons', boxX + 15, boxY + 10);

    // Lessons
    fill(80);
    textSize(11);
    let lessons = [
        '• Resonance can build destructively when driving frequency matches natural frequency',
        '• Aerodynamic forces (wind vortices) created periodic driving force on the bridge',
        '• Torsional mode had lower damping than vertical mode, allowing larger amplitudes',
        '• Modern bridges include damping systems and aerodynamic designs to prevent resonance'
    ];

    for (let i = 0; i < lessons.length; i++) {
        text(lessons[i], boxX + 15, boxY + 32 + i * 16);
    }
}

function mousePressed() {
    if (hoveredEvent >= 0) {
        selectedEvent = hoveredEvent;
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
