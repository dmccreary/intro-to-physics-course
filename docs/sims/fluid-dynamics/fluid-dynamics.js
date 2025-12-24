
// Fluid Dynamics
// Source: https://vislupus.github.io/p5-simulations/fluid-dynamics.html
// Author: Nikola Bozhinov (github: vislupus)

let numParticles = 100;
let particles = [];
let target, vel, sliderAcc, sliderVel, sliderMassP, sliderG, sliderU, sliderD;
let collisionsPP = 0;
let collisionsPT = 0;
let collisionsPW = 0;
let stopVal = 50;

function setup() {
    createCanvas(950, 600);
//                                    frameRate(5);

    sliderAcc = createSlider(0, 5, 2.6, 0.1);
    sliderAcc.position(10, 5);
    sliderAcc.style('width', '380px');

    sliderVel = createSlider(0, 10, 3.6, 0.1);
    sliderVel.position(10, 30);
    sliderVel.style('width', '380px');

    sliderMassP = createSlider(0.01, 5, 1, 0.01);
    sliderMassP.position(10, 55);
    sliderMassP.style('width', '380px');

    sliderG = createSlider(0, 10, 5, 0.1);
    sliderG.position(10, 85);
    sliderG.style('width', '380px');

    sliderU = createSlider(1000, 10000, 5000, 1);
    sliderU.position(10, 115);
    sliderU.style('width', '380px');

    sliderD = createSlider(0, 1000, 50, 1);
    sliderD.position(10, 145);
    sliderD.style('width', '380px');

    target = new Target(width / 6, height / 2, 30, 3000);
}

function draw() {
    background(0);

    const boundary = new Rectangle(width / 2, height / 2, width, height);
    const capacity = 4;
    const quadtree = new QuadTree(boundary, capacity);

    vel = sliderVel.value();
    acc = sliderAcc.value();

    fill(255);
    noStroke();
    textSize(16);
    text(`Acceleration: ${acc}`, 400, 17);
    text(`Velocity: ${vel}`, 400, 42);
    text(`Mass of particles: ${sliderMassP.value()}`, 400, 66);
    text(`${sliderG.value()}`, 400, 96);
    text(`${sliderU.value()}`, 400, 126);
    text(`${sliderD.value()}`, 400, 156);

    text(`${frameRate().toFixed(1)} fps`, 10, height - 70);
    text(`frames: ${frameCount}`, 10, height - 50);


    let flow = createVector(acc, 0);
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



        if (p.pos.y <= height / 2) {
            p.applyForce(flow.setMag(map(p.pos.y, 200, height / 2, 0.1, acc)));
        } else {
            p.applyForce(flow.setMag(map(p.pos.y, height / 2, height - 200, acc, 0.1)));
        }

        //                                p.applyForce(flow);
        p.update();
        p.collideTarget(target);
        p.edges();
        p.show();
    }

    for (let i = 0; i < numParticles; i++) {
        let x = random(-100, -50);
        let y = random(200, height - 200);
        let vx = random(-vel, vel);
        let vy = random(-vel / 2, vel / 2);

        particles.push(new Particles(x, y, 1, sliderMassP.value(), vx, vy));
    }

    //            Target
    target.show();


    //            noFill();
    //            stroke(color('lime'));
    //
    //            //            rectMode(CENTER);
    //            //            let rangeSampler = new Rectangle(mouseX, mouseY, 25, 25);
    //
    //            let rangeSampler = new Circle(mouseX, mouseY, 25);
    //
    //            if (mouseX < width && mouseY < height) {
    //                //                rect(rangeSampler.x, rangeSampler.y, rangeSampler.w * 2, rangeSampler.h * 2);
    //                circle(rangeSampler.x, rangeSampler.y, 25 * 2);
    //
    //                let points = quadtree.query(rangeSampler);
    //
    //                //                noStroke();
    //                //                fill(255);
    //                //                text(`Count sample: ${points.length}`, 10, height - 30);
    //
    //                for (let p of points) {
    //                    strokeWeight(4);
    //                    point(p.x, p.y);
    //
    //                    //                    console.log(p.userData)
    //                }
    //            }


    noStroke();
    fill(255);
    text(`particles: ${particles.length}`, 10, height - 30);
    text(`collisions particle/target: ${collisionsPT}`, width - 230, height - 70);
    text(`collisions particle/particle: ${collisionsPP}`, width - 230, height - 50);
    text(`collisions particle/wall: ${collisionsPW}`, width - 230, height - 30);

    //            Walls
    stroke(255);
    strokeWeight(2);
    noFill();
    line(0, 200, width, 200)
    line(0, height - 200, width, height - 200)



    //            if (frameCount > stopVal) {
    //                noLoop();
    //            }
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

        //                                if (this.vel.x !== 0 || this.vel.y !== 0 && this.vel.y !== 1) {
        //                                    this.drawArrow('#ffff33', 1, this.vel);
        //                                }
    }

    edges() {
        if (this.pos.x < -150 || this.pos.x > width) {
            particles.splice(particles.indexOf(this), 1);
        }

        if (this.pos.y <= 170 + this.r || this.pos.y >= height - 170 - this.r) {
            particles.splice(particles.indexOf(this), 1);
        }


        if (this.pos.y <= 200 + this.r || this.pos.y >= height - 200 - this.r) {
            this.vel.y = -this.vel.y

            collisionsPW++;
        }

        if (this.pos.y > height - 200 - this.r) {
            this.pos.y = height - 200 - this.r;
        }

        if (this.pos.y < 200 + this.r) {
            this.pos.y = 200 + this.r;
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
                this.vel.limit(vel)

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
        this.vel.limit(vel)

        other.vel.x += p * this.mass * nx;
        other.vel.y += p * this.mass * ny;
        other.vel.limit(vel)

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
        //                noFill();
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

