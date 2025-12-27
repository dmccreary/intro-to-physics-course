// Solar System Simulation
// References:
//        https://nssdc.gsfc.nasa.gov/planetary/factsheet/
//        https://en.wikipedia.org/wiki/Sun
//        https://fiftyexamples.readthedocs.io/en/latest/gravity.html
//        https://github.com/techwithtim/Python-Planet-Simulation/blob/main/tutorial.py
//        https://science.nasa.gov/science-news/science-at-nasa/2001/ast04jan_1

let AU = 149.598e6 * 1000;
let G = 6.67430e-11; // The gravitational constant G
let SCALE = 200 / AU; // 1 AU = 100 pixels
let TIMESTEP = 3600 * 24; // 1 day
let centerX, centerY;
let planets, sun, earth, mars, mercury, venus;

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 600;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Controls
let startButton;
let showDataCheckbox;
let running = false;
let showData = false;

function updateCanvasSize() {
    canvasWidth = windowWidth;
    // Update center position - sun in center of drawing area
    // put the sun a bit left of center to make room for planet data on right
    centerX = canvasWidth / 2 - 20;
    centerY = drawHeight / 2;

    // Adjust scale based on canvas width
    SCALE = (canvasWidth * 0.25) / AU;

    positionControls();
}

function setup() {
    updateCanvasSize();
    createCanvas(canvasWidth, canvasHeight);

    sun = new Planet(0, "Sun", 0, 0, 696342 * SCALE * 1e4 + 15, 1.98892e30, 'yellow', 0, 0);
    sun.sun = true;

    mercury = new Planet(1, "Mercury", -0.467 * AU, 0, 2440.5 * SCALE * 1e6, 3.30e23, '#669999', 0, 38.86 * 1000, 88);
    venus = new Planet(2, "Venus", -0.728 * AU, 0, 6051.8 * SCALE * 1e6, 4.8675e24, '#e68a00', 0, 34.79 * 1000, 225);
    earth = new Planet(3, "Earth", -1.02 * AU, 0, 6378.137 * SCALE * 1e6, 5.97237e24, '#00b359', 0, 29.29 * 1000, 366);
    mars = new Planet(4, "Mars", -1.666 * AU, 0, 3396.2 * SCALE * 1e6, 6.39e23, '#e60000', 0, 21.97 * 1000, 687);

    planets = [sun, mercury, venus, earth, mars];

    // Create Start/Pause button
    startButton = createButton('Start');
    startButton.mousePressed(toggleSimulation);
    startButton.style('font-size', '16px');
    startButton.style('padding', '4px 8px');
    startButton.style('cursor', 'pointer');

    // Create checkbox for showing planet data
    showDataCheckbox = createCheckbox(' Show Planet Data', false);
    showDataCheckbox.changed(toggleShowData);
    showDataCheckbox.style('font-size', '14px');
    showDataCheckbox.style('color', '#ccc');

    positionControls();
}

function positionControls() {
    if (!startButton || !showDataCheckbox) return;

    let controlsY = drawHeight + 5;
    startButton.position(margin, controlsY);
    showDataCheckbox.position(margin + 100, controlsY + 5);
}

function toggleSimulation() {
    running = !running;
    startButton.html(running ? 'Pause' : 'Start');
}

function toggleShowData() {
    showData = showDataCheckbox.checked();
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function draw() {
    fill('aliceblue');
    stroke('silver');
    rect(0, 0, width, drawHeight);

    // Controls background
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Update and show planets
    for (let [i, p] of planets.entries()) {
        if (running) {
            p.update();
        }
        p.show();
    }

    // Title
    fill(255);
    noStroke();
    textSize(18);
    textAlign(LEFT, TOP);
    text("Solar System Simulation", margin, 10);
}


class Planet {
    constructor(num, name, x, y, r, m, c, vx, vy, n) {
        this.pos = createVector(x, y);
        this.vel = createVector(vx, vy);
        this.acc = createVector(0, 0);
        this.mass = m;
        this.radius = r;
        this.color = color(c);
        this.orbit = [];
        this.orbitN = n;
        this.aphelion = 0;
        this.perihelion = 0;
        this.avg_dis = x;
        this.sun = false;
        this.distance_to_sun = 0;
        this.name = name;
        this.num = num;
        this.v_max = 0;
        this.v_min = 0;
    }

    attraction(self, other) {
        let distance_x = other.pos.x - self.pos.x;
        let distance_y = other.pos.y - self.pos.y;
        let distance = sqrt(distance_x ** 2 + distance_y ** 2);

        if (other.sun) {
            self.distance_to_sun = distance;

            if (self.distance_to_sun < self.perihelion || self.perihelion == 0) {
                self.perihelion = self.distance_to_sun;
            }

            if (self.distance_to_sun > self.aphelion) {
                self.aphelion = self.distance_to_sun;
            }
        }

        let force = G * (self.mass * other.mass) / distance ** 2;
        let theta = atan2(distance_y, distance_x);
        let force_x = cos(theta) * force;
        let force_y = sin(theta) * force;
        return {
            x: force_x,
            y: force_y
        };
    }

    update() {
        for (let planet of planets) {
            if (this != planet) {
                let force = this.attraction(this, planet);
                this.acc.add(force.x, force.y);
            }
        }

        this.vel.add(this.acc.div(this.mass).mult(TIMESTEP));
        this.pos.add(this.vel.copy().mult(TIMESTEP));
        this.acc.set(0, 0);

        this.orbits();

        this.velocity = sqrt(this.vel.x ** 2 + this.vel.y ** 2) / 1000;

        if (this.velocity < this.v_min || this.v_min == 0) {
            this.v_min = this.velocity;
        }

        if (this.velocity > this.v_max) {
            this.v_max = this.velocity;
        }
    }

    orbits() {
        this.orbit.push({
            x: this.pos.x,
            y: this.pos.y
        });
    }

    show() {
        noStroke();
        fill(this.color, 80);
        ellipse(
            this.pos.x * SCALE + centerX,
            this.pos.y * SCALE + centerY,
            this.radius * 2);

        // Show planet data on right side if checkbox is checked
        if (showData && this.num != 0) {
            let dataX = canvasWidth - 120;
            let dataY = (this.num - 1) * 115 + 40;

            fill(this.color);
            textSize(14);
            textAlign(LEFT, TOP);
            text(`${this.name}`, dataX, dataY);

            fill(200, 200, 220);
            textSize(12);
            text(`Distance: ${(this.distance_to_sun/AU).toFixed(3)} AU`, dataX, dataY + 18);
            text(`Perihelion: ${(this.perihelion/AU).toFixed(3)} AU`, dataX, dataY + 33);
            text(`Aphelion: ${(this.aphelion/AU).toFixed(3)} AU`, dataX, dataY + 48);
            text(`Velocity: ${(this.velocity).toFixed(2)} km/s`, dataX, dataY + 63);
            text(`V max: ${this.v_max.toFixed(2)} km/s`, dataX, dataY + 78);
            text(`V min: ${this.v_min.toFixed(2)} km/s`, dataX, dataY + 93);
        }

        // Draw orbital trail
        for (let i = 0; i < this.orbit.length; i++) {
            if (this.orbit.length > this.orbitN) {
                this.orbit.splice(0, 1);
            }

            noFill();
            strokeWeight(2);
            stroke(this.color, 50);
            point(
                this.orbit[i].x * SCALE + centerX,
                this.orbit[i].y * SCALE + centerY);
        }
    }
}
