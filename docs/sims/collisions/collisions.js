// Collisions Simulation
// Inspired by https://vislupus.github.io/p5-simulations/collision.html
// Modified by Dan McCreary
// The inspiration for many of these simulations comes from the brilliant work of
// Daniel Shiffman and his incredible YouTube channel, The Coding Train.

// Canvas dimensions
let canvasWidth = 950;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Simulation state
let running = false;
let startButton;

// Simulation parameters
let particles = [];
let numParticles = 30;
let vel = 5;
let numParticlesSlider, velocitySlider;

function updateCanvasSize() {
    canvasWidth = windowWidth;
    positionControls();
}

function setup() {
    updateCanvasSize();
    createCanvas(canvasWidth, canvasHeight);

    // Create Start/Pause button
    startButton = createButton('Start');
    startButton.mousePressed(toggleSimulation);
    startButton.style('font-size', '16px');
    startButton.style('padding', '4px 12px');
    startButton.style('cursor', 'pointer');

    // Create sliders
    numParticlesSlider = createSlider(5, 100, 30, 1);
    velocitySlider = createSlider(1, 15, 5, 0.5);

    positionControls();
    initParticles();
}

function initParticles() {
    particles = [];
    numParticles = numParticlesSlider.value();
    vel = velocitySlider.value();

    for (let i = 0; i < numParticles; i++) {
        let x = random(50, canvasWidth - 50);
        let y = random(50, drawHeight - 50);
        let vx = random(-vel, vel);
        let vy = random(-vel, vel);
        let m = random(10, 150);
        particles[i] = new Particle(x, y, m, i, vx, vy);
    }
}

function positionControls() {
    if (!startButton || !numParticlesSlider) return;

    let controlsY = drawHeight;
    let buttonWidth = 80;
    let sliderWidth = 150;
    let startX = margin + buttonWidth + 20;

    // Button position
    startButton.position(margin, controlsY + 8);

    // Sliders
    numParticlesSlider.position(startX + 80, controlsY + 12);
    numParticlesSlider.size(sliderWidth);
    velocitySlider.position(startX + 340, controlsY + 12);
    velocitySlider.size(sliderWidth);
}

function toggleSimulation() {
    running = !running;
    startButton.html(running ? 'Pause' : 'Start');
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function draw() {
    background(0);

    // Check if particle count changed
    if (numParticlesSlider.value() !== numParticles) {
        initParticles();
    }

    // Update velocity limit from slider
    vel = velocitySlider.value();

    for (let [i, p] of particles.entries()) {
        p.collide();
        if (running) {
            p.update();
        }
        p.edges();
        p.show();
    }

    // Draw title
    fill(255);
    noStroke();
    textSize(18);
    textAlign(LEFT, TOP);
    text("Elastic Collisions Simulation", margin, 10);

    // Draw particle count
    textSize(12);
    textAlign(RIGHT, TOP);
    fill(150, 150, 200);
    text(`Particles: ${particles.length}`, canvasWidth - margin, 10);

    // Draw controls area background
    noStroke();
    fill(25, 25, 45);
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Draw divider line
    stroke(60, 60, 100);
    line(0, drawHeight, canvasWidth, drawHeight);

    // Draw slider labels
    fill(200, 200, 255);
    noStroke();
    textSize(16);
    textAlign(LEFT, CENTER);

    let controlsY = drawHeight + 10;
    let buttonWidth = 80;
    let startX = margin + buttonWidth;

    text(`Particles: ${numParticlesSlider.value()}`, startX, controlsY + 12);
    text(`Velocity: ${velocitySlider.value().toFixed(1)}`, startX + 260, controlsY + 12);
}


class Particle {
    constructor(x, y, m, id, vx, vy) {
        this.pos = createVector(x, y);
        this.vel = createVector(vx, vy);
        this.acc = createVector(0, 0);
        this.id = id;
        this.mass = m;
        this.r = sqrt(this.mass) * 2;
    }

    drawArrow(showColor, size, f) {
        if (f.x != 0 || f.y != 0) {
            push();
            stroke(color(showColor));
            fill(color(showColor));
            translate(this.pos.x, this.pos.y);
            line(0, 0, f.x * size, f.y * size);
            rotate(f.heading());
            translate(f.mag() * size, 0);
            let arrowSize = 7;
            triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
            pop();
        }
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);

        if (this.vel.x !== 0 || this.vel.y !== 0 && this.vel.y !== 1) {
            this.drawArrow('#ffff33', 5, this.vel);
        }
    }

    edges() {
        if (this.pos.x <= this.r || this.pos.x >= canvasWidth - this.r) {
            this.vel.x = -this.vel.x;
        }

        if (this.pos.x > canvasWidth - this.r) {
            this.pos.x = canvasWidth - this.r;
        }

        if (this.pos.x < this.r) {
            this.pos.x = this.r;
        }

        if (this.pos.y <= this.r || this.pos.y >= drawHeight - this.r) {
            this.vel.y = -this.vel.y;
        }

        if (this.pos.y > drawHeight - this.r) {
            this.pos.y = drawHeight - this.r;
        }

        if (this.pos.y < this.r) {
            this.pos.y = this.r;
        }
    }

    collide() {
        for (var i = this.id + 1; i < numParticles; i++) {
            if (this.pos.x + this.r + particles[i].r > particles[i].pos.x &&
                this.pos.x < particles[i].pos.x + this.r + particles[i].r &&
                this.pos.y + this.r + particles[i].r > particles[i].pos.y &&
                this.pos.y < particles[i].pos.y + this.r + particles[i].r) {

                let distance = dist(this.pos.x, this.pos.y, particles[i].pos.x, particles[i].pos.y);
                let minDist = particles[i].r + this.r;

                if (distance <= minDist) {
                    stroke(color('red'));
                    strokeWeight(2);
                    line(this.pos.x, this.pos.y, particles[i].pos.x, particles[i].pos.y);

                    // Collision point
                    let collisionPointX = ((this.pos.x * particles[i].r) + (particles[i].pos.x * this.r)) / (this.r + particles[i].r);
                    let collisionPointY = ((this.pos.y * particles[i].r) + (particles[i].pos.y * this.r)) / (this.r + particles[i].r);

                    noStroke();
                    fill(color(0, 102, 255));
                    ellipse(collisionPointX, collisionPointY, 10);

                    let overlap = 0.5 * (distance - this.r - particles[i].r);

                    this.pos.x -= overlap * (this.pos.x - particles[i].pos.x) / distance;
                    this.pos.y -= overlap * (this.pos.y - particles[i].pos.y) / distance;

                    particles[i].pos.x += overlap * (this.pos.x - particles[i].pos.x) / distance;
                    particles[i].pos.y += overlap * (this.pos.y - particles[i].pos.y) / distance;

                    // https://ericleong.me/research/circle-circle/
                    let dx = particles[i].pos.x - this.pos.x;
                    let dy = particles[i].pos.y - this.pos.y;

                    let dvx = this.vel.x - particles[i].vel.x;
                    let dvy = this.vel.y - particles[i].vel.y;

                    // Normal
                    let nx = dx / minDist;
                    let ny = dy / minDist;

                    let p = 2 * (nx * dvx + ny * dvy) / (this.mass + particles[i].mass);

                    this.vel.x -= p * particles[i].mass * nx;
                    this.vel.y -= p * particles[i].mass * ny;
                    this.vel.limit(vel);

                    particles[i].vel.x += p * this.mass * nx;
                    particles[i].vel.y += p * this.mass * ny;
                    particles[i].vel.limit(vel);
                }
            }
        }
    }

    show() {
        stroke(255);
        strokeWeight(2);
        fill(color(200, 200, 200, 80));
        circle(this.pos.x, this.pos.y, this.r * 2);
    }
}
