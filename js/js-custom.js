const PARTICLES = [];
const NR_OF_PARTICLES = 120;
const VELOCITY_RANGE = 2;
const LINE_RANGE = 120;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    for(let i = 0; i < NR_OF_PARTICLES; i++) {
        PARTICLES.push(new Particle());
    }
}

function draw() {
    background(0);

    for(let i = 0; i < PARTICLES.length; i++) {
        PARTICLES[i].update();
        PARTICLES[i].checkBorders();
        PARTICLES[i].draw();
        
        for(let j = i + 1; j < PARTICLES.length; j++) {
            PARTICLES[i].drawLine(PARTICLES[j]);
        }
    }
}

class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-VELOCITY_RANGE, VELOCITY_RANGE), random(-VELOCITY_RANGE, VELOCITY_RANGE));
        this.r = random(2, 5);
    }

    update() {
        this.pos.add(this.vel);
    }

    checkBorders() {
        if(this.pos.x > width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        }

        if(this.pos.y > height) {
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }

    draw() {
        noStroke();
		fill(255, 85)
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }

    drawLine(particle) {
        let d = dist(particle.pos.x, particle.pos.y, this.pos.x, this.pos.y);

        if(d < LINE_RANGE) {
            stroke(255, 140 - d);
            line(particle.pos.x, particle.pos.y, this.pos.x, this.pos.y);
        }
    }
}