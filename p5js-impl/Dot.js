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
    foods;
    foodReached;
    time = 0;

    constructor(builds, foods, maxVelocity, a = undefined, c = undefined, e = undefined) {
        this.maxVel = maxVelocity;
        this.buildings = builds;
        this.foods = foods;
        this.brain = new Brain(brainLength);
        this.foodReached = new Array(this.foods.length)
        this.r = a ?? Math.floor(Math.random() * 255) + 1;
        this.g = c ?? Math.floor(Math.random() * 255) + 1;
        this.b = e ?? Math.floor(Math.random() * 255) + 1;
        this.pos = new createVector(width * factor / 2, height * factor - 20);
        this.vel = new createVector(0, 0);
        this.acc = new createVector(0, 0);
    }


    show() {
        if(!this.dead){
            // if (!this.isBest) {
            fill(this.r, this.g, this.b);
            // } else {
            //     fill(0, 0);
            // }
            ellipse(this.pos.x, this.pos.y, 4, 4);
        }


    }

    move() {
        if (this.brain.directions.length > this.brain.step) {
            if (this.collisionDetected(true)) {
                this.vel.x = this.vel.x * -1
                this.vel.y = this.vel.y * -1
            }
            this.acc = this.brain.directions[this.brain.step];
            this.brain.step++;
        } else this.dead = true
        this.vel.add(this.acc);
        this.vel.limit(this.maxVel);
        this.pos.add(this.vel);
    }

    collisionDetected(detectBuildings = false) {
        if (detectBuildings) {
            for (let i = 0; i < this.foods.length; i++) {
                if (
                    this.pos.x < this.foods[i].pos.x + 10 &&
                    this.pos.y < this.foods[i].pos.y + 10 &&
                    this.pos.x > this.foods[i].pos.x &&
                    this.pos.y > this.foods[i].pos.y
                ) {
                    if(!this.foodReached[i]){
                        let porcentage = (1 - (this.brain.step/this.brain.directions.length))
                        if(this.fitness < 200000 ){
                            this.fitness += 100000 * porcentage * porcentage * porcentage
                        }
                        else this.fitness += 100000 * porcentage
                        this.foodReached[i] = true
                        this.time = 30;
                    }

                }
            }
            for (let i = 0; i < this.buildings.length; i++) {
                if (
                    this.pos.x < this.buildings[i].x + this.buildings[i].xEnd + 2 &&
                    this.pos.y < this.buildings[i].y + this.buildings[i].yEnd + 2 &&
                    this.pos.x > this.buildings[i].x - 2 &&
                    this.pos.y > this.buildings[i].y - 2
                ) {
                    return true
                }
            }
        }
        if (this.pos.x < 2 || this.pos.y < 2 || this.pos.x > width - 2 || this.pos.y > height - 2) {
            return true
        }
        return false
    }

    update() {
        if (!this.dead) {
            if(this.time--<0){
                this.move();
            }
        }
    }

    calculateFitness() {
        return this.fitness
    }

    returnBaby() {
        let baby = new Dot(
            this.buildings,
            this.foods,
            this.maxVel,
            this.r,
            this.g,
            this.b
        );
        baby.brain = this.brain.clone();
        return baby;
    }
}