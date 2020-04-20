class Dot {
    pos;
    vel;
    acc;
    brain;
    dead = false;
    reachedGoal = false;
    isBest = false;
    fitness = 0;
    r;
    g;
    b;
    buildings;
    maxVel;

    constructor(builds, maxVelocity, a = undefined, c = undefined, e = undefined) {
        this.maxVel = maxVelocity;
        this.buildings = builds;
        this.brain = new Brain(400);
        this.r = a ?? Math.floor(Math.random() * 255) + 1;
        this.g = c ?? Math.floor(Math.random() * 255) + 1;
        this.b = e ?? Math.floor(Math.random() * 255) + 1;
        this.pos = new createVector(windowWidth*0.9 / 2, windowHeight*0.9 - 10);
        this.vel = new createVector(0, 0);
        this.acc = new createVector(0, 0);
    }


    show() {
        if (!this.isBest) {
            fill(this.r, this.g, this.b);
        } else {
            fill(0, 0);
        }
        ellipse(this.pos.x, this.pos.y, 4, 4);

    }

    move() {
        if (this.brain.directions.length > this.brain.step) {
            if (this.collisionDetected(true)) {
                this.vel.x =this.vel.x*-1 
                this.vel.y =this.vel.y*-1 
            }
            this.acc = this.brain.directions[this.brain.step];
            this.brain.step++;
        }
        else this.dead = true
        this.vel.add(this.acc);
        this.vel.limit(this.maxVel);
        this.pos.add(this.vel);
    }

    collisionDetected(detectBuildings = false){
        if(this.pos.x < 2 || this.pos.y < 2 || this.pos.x > width - 2 || this.pos.y > height - 2){
            return true
        }
        if(detectBuildings){
            //Used to work
            // if(this.pos.x<600 && this.pos.y<310 &&  this.pos.x>0 && this.pos.y>300 ){
            //     return true;
            // }else if(this.pos.x<800 && this.pos.y<510 &&  this.pos.x>200 && this.pos.y>500 ){
            //     return true;
            // }
            for (let i = 0; i < this.buildings.length; i++) {
                if (
                    this.pos.x < this.buildings[i].xEnd &&
                    this.pos.y < this.buildings[i].y + 10 &&
                    this.pos.x > this.buildings[i].x &&
                    this.pos.y > this.buildings[i].y
                ) {
                        return true
                }
            }
        }
        return false
    }

    update() {
        if (!this.dead && !this.reachedGoal) {
            this.move();
            // if (this.collisionDetected(true)) {
            //     this.dead = true;
            // } 
            if (dist(this.pos.x, this.pos.y, goal.x, goal.y) < 5) {
                this.reachedGoal = true;
            } else {
                // for (let i = 0; i < this.buildings.length; i++) {
                //     if (
                //         this.pos.x < this.buildings[i].xEnd &&
                //         this.pos.y < this.buildings[i].y + 10 &&
                //         this.pos.x > this.buildings[i].x &&
                //         this.pos.y > this.buildings[i].y
                //     ) {
                //         if (!this.dead) {
                //             this.dead = true;
                //         }
                //     }
                // }
                // fill(0,0,255);
                // rect(0,300,600,10);
                //works
                if(this.pos.x<600 && this.pos.y<310 &&  this.pos.x>0 && this.pos.y>300 ){
                    this.dead = true;
                }else if(this.pos.x<800 && this.pos.y<510 &&  this.pos.x>200 && this.pos.y>500 ){
                    this.dead = true;
                }
            }
        }
    }

    calculateFitness() {
        let distanceToGoal = dist(this.pos.x, this.pos.y, goal.x, goal.y)
        if (this.reachedGoal) {
            //fitness = 1.0/16.0+ 10000.0/(float)(brain.step * brain.step);
            this.fitness = 1.0 / (distanceToGoal * distanceToGoal);
        } else {
            this.fitness = 1.0 / (distanceToGoal * distanceToGoal);
        }
    }

    returnBaby() {
        let baby = new Dot(
            this.buildings,
            this.maxVel,
            this.r,
            this.g,
            this.b
        );
        baby.brain = this.brain.clone();
        return baby;
    }
}