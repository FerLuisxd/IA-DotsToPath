class Ghost {
    pos;
    initpos;
    vel;
    acc;
    maxVel;
    rad;
    dead = false;
    hunting;

    r = 0;
    g = 0;
    b = 0;

    constructor(p, maxVelocity, hunt) {
        this.initpos = new createVector(p.x, p.y);
        this.pos = new createVector(p.x, p.y);
        this.vel = new createVector(0, 0);
        this.acc = new createVector(0, 0);
        this.maxVel = maxVelocity;
        this.hunting = hunt;
        this.rad = 10;
    }

    restore() {
        console.log(this.pos);
        console.log(this.initpos);
        this.dead = false;
        this.pos = new createVector(this.initpos.x, this.initpos.y);
        this.vel = new createVector(0, 0);
        this.acc = new createVector(0, 0);
    }

    dStarLite(dpos) {
        if (this.pos.x < 2 || this.pos.y < 2 || this.pos.x > width - 2 || this.pos.y > height - 2) {
            this.vel.x = this.vel.x * -1
            this.vel.y = this.vel.y * -1
        }
        let angle = atan2(dpos.y-this.pos.y, dpos.x-this.pos.x);
        this.acc = p5.Vector.fromAngle(angle);
        this.vel.add(this.acc);
        this.vel.limit(this.maxVel);
        this.pos.add(this.vel);
    }

    collision(dot) {
        if (
            this.pos.x < dot.pos.x + 2 &&
            this.pos.x + this.rad/2 > dot.pos.x &&
            this.pos.y < dot.pos.y + 2 &&
            this.pos.y + this.rad/2 > dot.pos.y) {
                dot.dead = true;
                this.dead = true;
            }
    }

    buildingCollission(dot) {

    }

    update() {
        if (!this.dead) {        
            this.dStarLite(this.hunting.pos);
            this.collision(this.hunting);
        }
    }

    show() {
        fill(this.r, this.g, this.b);
        ellipse(this.pos.x+10, this.pos.y+10, this.rad, this.rad);
    }
}