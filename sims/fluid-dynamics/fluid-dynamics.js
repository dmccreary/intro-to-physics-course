// Fluid Dynamics
// Source: https://vislupus.github.io/p5-simulations/fluid-dynamics.html
// Author: Nikola Bozhinov (github: vislupus)

// Canvas dimensions
let canvasWidth = 950;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Simulation state
let running = false;
let startButton;

// Simulation parameters
let numParticles = 100;
let particles = [];
let target, vel, acc;
let sliderAcc, sliderVel, sliderMassP, sliderG, sliderU, sliderD;
let collisionsPP = 0;
let collisionsPT = 0;
let collisionsPW = 0;

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
    sliderAcc = createSlider(0, 5, 2.6, 0.1);
    sliderVel = createSlider(0, 10, 3.6, 0.1);
    sliderMassP = createSlider(0.01, 5, 1, 0.01);
    sliderG = createSlider(0, 10, 5, 0.1);
    sliderU = createSlider(1000, 10000, 5000, 1);
    sliderD = createSlider(0, 1000, 50, 1);

    positionControls();

    // Create target obstacle
    target = new Target(canvasWidth / 6, drawHeight / 2, 30, 3000);
}

function positionControls() {
    if (!startButton || !sliderAcc) return;

    let controlsY = drawHeight + 10;
    let buttonWidth = 80;
    let labelWidth = 50;
    let availableWidth = canvasWidth - margin - buttonWidth - margin;
    let sliderWidth = (availableWidth / 3) - labelWidth - 10;

    // Start after button
    let startX = margin + buttonWidth + 10;
    let col1X = startX + labelWidth;
    let col2X = startX + (availableWidth / 3) + labelWidth;
    let col3X = startX + (availableWidth * 2 / 3) + labelWidth;

    // Button position
    startButton.position(margin, controlsY + 25);

    // Row 1: Acc, Vel, Mass
    sliderAcc.position(col1X, controlsY + 5);
    sliderAcc.style('width', sliderWidth + 'px');

    sliderVel.position(col2X, controlsY + 5);
    sliderVel.style('width', sliderWidth + 'px');

    sliderMassP.position(col3X, controlsY + 5);
    sliderMassP.style('width', sliderWidth + 'px');

    // Row 2: G, Upper, Lower
    sliderG.position(col1X, controlsY + 50);
    sliderG.style('width', sliderWidth + 'px');

    sliderU.position(col2X, controlsY + 50);
    sliderU.style('width', sliderWidth + 'px');

    sliderD.position(col3X, controlsY + 50);
    sliderD.style('width', sliderWidth + 'px');
}

function toggleSimulation() {
    running = !running;
    startButton.html(running ? 'Pause' : 'Start');
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    // Update target position on resize
    if (target) {
        target.pos.x = canvasWidth / 6;
        target.pos.y = drawHeight / 2;
    }
}

function draw() {
    background(0);

    // Get slider values
    vel = sliderVel.value();
    acc = sliderAcc.value();

    // Calculate wall positions based on drawHeight
    let wallTop = 50;
    let wallBottom = drawHeight - 50;

    const boundary = new Rectangle(canvasWidth / 2, drawHeight / 2, canvasWidth, drawHeight);
    const capacity = 4;
    const quadtree = new QuadTree(boundary, capacity);

    collisionsPP = 0;
    collisionsPT = 0;
    collisionsPW = 0;

    for (let p of particles) {
        let pt = new Point(p.pos.x, p.pos.y, p);
        quadtree.insert(pt);

        let range = new Circle(p.pos.x, p.pos.y, p.r * 2);
        let points = quadtree.query(range);

        for (let pt of points) {
            let other = pt.userData;
            let intersects = p.intersects(other);
            if (p !== other && intersects.check) {
                p.collide(other, intersects.dist, intersects.minDist);
            }
        }

        range = new Circle(p.pos.x, p.pos.y, p.r * 6);
        points = quadtree.query(range);

        for (let pt of points) {
            let other = pt.userData;
            let intersects = p.intersects(other);

            if (p !== other && intersects.dist > p.r * 3) {
                p.attract(other);
            }

            if (p !== other && intersects.dist <= p.r * 3) {
                p.repuls(other);
            }
        }

        let flow = createVector(acc, 0);
        if (p.pos.y <= drawHeight / 2) {
            p.applyForce(flow.setMag(map(p.pos.y, wallTop, drawHeight / 2, 0.1, acc)));
        } else {
            p.applyForce(flow.setMag(map(p.pos.y, drawHeight / 2, wallBottom, acc, 0.1)));
        }

        if (running) {
            p.update();
        }
        p.collideTarget(target);
        p.edges(wallTop, wallBottom);
        p.show();
    }

    // Add new particles only when running
    if (running) {
        for (let i = 0; i < numParticles; i++) {
            let x = random(-100, -50);
            let y = random(wallTop + 50, wallBottom - 50);
            let vx = random(-vel, vel);
            let vy = random(-vel / 2, vel / 2);
            particles.push(new Particles(x, y, 1, sliderMassP.value(), vx, vy));
        }
    }

    // Draw target obstacle
    target.show();

    // Draw walls
    stroke(255);
    strokeWeight(2);
    noFill();
    line(0, wallTop, canvasWidth, wallTop);
    line(0, wallBottom, canvasWidth, wallBottom);

    // Draw title
    fill(255);
    noStroke();
    textSize(18);
    textAlign(LEFT, TOP);
    text("Fluid Dynamics Simulation", margin, 10);

    // Draw statistics on right side of drawing area
    textSize(12);
    textAlign(RIGHT, TOP);
    fill(150, 150, 200);
    text(`Particles: ${particles.length}`, canvasWidth - margin, 10);
    text(`P/Target: ${collisionsPT}`, canvasWidth - margin, 26);
    text(`P/Particle: ${collisionsPP}`, canvasWidth - margin, 42);
    text(`P/Wall: ${collisionsPW}`, canvasWidth - margin, 58);

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
    textSize(11);
    textAlign(LEFT, CENTER);

    let controlsY = drawHeight + 10;
    let buttonWidth = 80;
    let availableWidth = canvasWidth - margin - buttonWidth - margin;
    let startX = margin + buttonWidth + 10;
    let col1LabelX = startX;
    let col2LabelX = startX + (availableWidth / 3);
    let col3LabelX = startX + (availableWidth * 2 / 3);

    // Row 1 labels
    text(`Acc: ${sliderAcc.value().toFixed(1)}`, col1LabelX, controlsY + 12);
    text(`Vel: ${sliderVel.value().toFixed(1)}`, col2LabelX, controlsY + 12);
    text(`Mass: ${sliderMassP.value().toFixed(2)}`, col3LabelX, controlsY + 12);

    // Row 2 labels
    text(`Grav: ${sliderG.value().toFixed(1)}`, col1LabelX, controlsY + 57);
    text(`Upper: ${sliderU.value()}`, col2LabelX, controlsY + 57);
    text(`Lower: ${sliderD.value()}`, col3LabelX, controlsY + 57);
}


class Particles {
    constructor(x, y, r, m, vx, vy) {
        this.pos = createVector(x, y);
        this.vel = createVector(vx, vy);
        this.acc = createVector(0, 0);
        this.mass = m;
        this.r = r;
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
            let arrowSize = 1;
            triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
            pop();
        }
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }

    edges(wallTop, wallBottom) {
        // Remove particles that leave the canvas
        if (this.pos.x < -150 || this.pos.x > canvasWidth) {
            particles.splice(particles.indexOf(this), 1);
        }

        // Remove particles that go too far beyond walls
        if (this.pos.y <= wallTop - 30 || this.pos.y >= wallBottom + 30) {
            particles.splice(particles.indexOf(this), 1);
        }

        // Bounce off walls
        if (this.pos.y <= wallTop + this.r || this.pos.y >= wallBottom - this.r) {
            this.vel.y = -this.vel.y;
            collisionsPW++;
        }

        // Constrain to walls
        if (this.pos.y > wallBottom - this.r) {
            this.pos.y = wallBottom - this.r;
        }

        if (this.pos.y < wallTop + this.r) {
            this.pos.y = wallTop + this.r;
        }
    }

    collideTarget(target) {
        let minDist = target.r + this.r;

        if (this.pos.x + minDist > target.pos.x &&
            this.pos.x < target.pos.x + minDist &&
            this.pos.y + minDist > target.pos.y &&
            this.pos.y < target.pos.y + minDist) {

            let distance = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);

            if (distance <= minDist) {
                let overlap = 0.5 * (distance - this.r - target.r);

                this.pos.x -= overlap * (this.pos.x - target.pos.x) / distance;
                this.pos.y -= overlap * (this.pos.y - target.pos.y) / distance;

                let dx = target.pos.x - this.pos.x;
                let dy = target.pos.y - this.pos.y;

                let nx = dx / minDist;
                let ny = dy / minDist;

                let p = 2 * (nx * this.vel.x + ny * this.vel.y) / (this.mass + target.mass);

                this.vel.x -= p * target.mass * nx;
                this.vel.y -= p * target.mass * ny;
                this.vel.limit(vel);

                collisionsPT++;
            }
        }
    }

    collide(other, distance, minDist) {
        let overlap = 0.5 * (distance - this.r - other.r);

        this.pos.x -= overlap * (this.pos.x - other.pos.x) / distance;
        this.pos.y -= overlap * (this.pos.y - other.pos.y) / distance;

        other.pos.x += overlap * (this.pos.x - other.pos.x) / distance;
        other.pos.y += overlap * (this.pos.y - other.pos.y) / distance;

        let dx = other.pos.x - this.pos.x;
        let dy = other.pos.y - this.pos.y;

        let dvx = this.vel.x - other.vel.x;
        let dvy = this.vel.y - other.vel.y;

        let nx = dx / minDist;
        let ny = dy / minDist;

        let p = 2 * (nx * dvx + ny * dvy) / (this.mass + other.mass);

        this.vel.x -= p * other.mass * nx;
        this.vel.y -= p * other.mass * ny;
        this.vel.limit(vel);

        other.vel.x += p * this.mass * nx;
        other.vel.y += p * this.mass * ny;
        other.vel.limit(vel);

        collisionsPP++;
    }

    intersects(other) {
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        let minDist = this.r + other.r;
        return {
            dist: d,
            minDist: minDist,
            check: d < minDist
        };
    }

    attract(other) {
        let force = p5.Vector.sub(this.pos, other.pos);
        let distanceSq = constrain(force.magSq(), sliderD.value(), sliderU.value());
        let strength = sliderG.value() * (this.mass * other.mass) / distanceSq;
        force.setMag(strength);

        this.applyForce(force.copy().mult(-1));
        other.applyForce(force);
    }

    repuls(other) {
        let force = p5.Vector.sub(this.pos, other.pos);
        let distanceSq = constrain(force.magSq(), sliderD.value(), sliderU.value());
        let strength = sliderG.value() * (this.mass * other.mass) / distanceSq;
        force.setMag(strength).mult(-1);

        this.applyForce(force.copy().mult(-1));
        other.applyForce(force);
    }

    show() {
        noStroke();
        fill(150);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
}

class Target {
    constructor(x, y, r, m) {
        this.pos = createVector(x, y);
        this.mass = m;
        this.r = r;
    }

    show() {
        stroke(255);
        noFill();
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
}

// QuadTree implementation for spatial partitioning
class Point {
    constructor(x, y, userData) {
        this.x = x;
        this.y = y;
        this.userData = userData;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        return (
            point.x >= this.x - this.w / 2 &&
            point.x < this.x + this.w / 2 &&
            point.y >= this.y - this.h / 2 &&
            point.y < this.y + this.h / 2
        );
    }

    intersects(range) {
        return !(
            range.x - range.w / 2 > this.x + this.w / 2 ||
            range.x + range.w / 2 < this.x - this.w / 2 ||
            range.y - range.h / 2 > this.y + this.h / 2 ||
            range.y + range.h / 2 < this.y - this.h / 2
        );
    }
}

class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.rSquared = r * r;
    }

    contains(point) {
        let d = Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2);
        return d <= this.rSquared;
    }

    intersects(range) {
        let xDist = Math.abs(range.x - this.x);
        let yDist = Math.abs(range.y - this.y);
        let r = this.r;
        let w = range.w / 2;
        let h = range.h / 2;

        if (xDist > r + w || yDist > r + h) {
            return false;
        }
        if (xDist <= w || yDist <= h) {
            return true;
        }
        let edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);
        return edges <= this.rSquared;
    }
}

class QuadTree {
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }

    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w / 2;
        let h = this.boundary.h / 2;

        let ne = new Rectangle(x + w / 2, y - h / 2, w, h);
        this.northeast = new QuadTree(ne, this.capacity);

        let nw = new Rectangle(x - w / 2, y - h / 2, w, h);
        this.northwest = new QuadTree(nw, this.capacity);

        let se = new Rectangle(x + w / 2, y + h / 2, w, h);
        this.southeast = new QuadTree(se, this.capacity);

        let sw = new Rectangle(x - w / 2, y + h / 2, w, h);
        this.southwest = new QuadTree(sw, this.capacity);

        this.divided = true;
    }

    insert(point) {
        if (!this.boundary.contains(point)) {
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }

        if (!this.divided) {
            this.subdivide();
        }

        return (
            this.northeast.insert(point) ||
            this.northwest.insert(point) ||
            this.southeast.insert(point) ||
            this.southwest.insert(point)
        );
    }

    query(range, found) {
        if (!found) {
            found = [];
        }

        if (!this.boundary.intersects(range)) {
            return found;
        }

        for (let p of this.points) {
            if (range.contains(p)) {
                found.push(p);
            }
        }

        if (this.divided) {
            this.northwest.query(range, found);
            this.northeast.query(range, found);
            this.southwest.query(range, found);
            this.southeast.query(range, found);
        }

        return found;
    }
}
