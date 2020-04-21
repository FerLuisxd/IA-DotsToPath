class Ghost {
    pos;
    vel;
    acc;
    maxVel;

    r = 0;
    g = 0;
    b = 0;

    constructor(p, maxVelocity) {
        this.pos = p;
        this.vel = new createVector(0, 0);
        this.acc = new createVector(0, 0);
        this.maxVel = maxVelocity;
    }

    dStarLite(dpos) {
        let angle = atan2(dpos.y, dpos.x);
        console.log(angle);
        this.acc = p5.Vector.fromAngle(angle);
        this.vel.add(this.acc);
        this.vel.limit(this.maxVel);
        this.pos.add(this.vel);
    }

    update(hunting) {
        this.dStarLite(hunting);
    }


    show() {
        fill(this.r, this.g, this.b);
        ellipse(this.pos.x+10, this.pos.y+10, 10, 10);
    }
}