class Population {
    dots;
    buildings;
    fitnessSum;
    gen = 1;
    bestDot = 0;
    foods = 0;
    minStep = brainLength;
    ghosts;
    ghostV = 2;


    constructor(size, buildingsSize,foodSize) {
        console.log("buildings: ", buildingsSize);
        this.buildings = new Array(buildingsSize);
        this.dots = new Array(size);
        this.ghosts = new Array(size);
        this.foods = new Array(foodSize);
        console.log(width,height)

        for (let i = 0; i < this.foods.length; i++) {
            let xRand = Math.floor(Math.random() * width) - 1
            let yRand = Math.floor(Math.random() * height) - 1
            this.foods[i] = new Food(xRand, yRand);
        }
        for (let i = 0; i < this.buildings.length; i++) {
                let xRand = Math.floor(Math.random() * width) - 1
                let yRand = Math.floor(Math.random() * height) - 1
                let xEndRand = Math.floor(Math.random() * xRand) - 1
                this.buildings[i] = new Building(xRand, yRand,xEndRand );
        }
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i] = new Dot(this.buildings,this.foods,10);
        }
        for (let i = 0; i < this.ghosts.length; i++) {
            let xRand = Math.floor(Math.random() * width) - 1
            let yRand = Math.floor(Math.random() * height) - 1
            let p = new createVector(xRand, yRand);
            this.ghosts[i] = new Ghost(p, this.ghostV, this.dots[i]);
        }
        console.log(width, height, width / 2, height - 10);

    }

    reBuild() {
        for (let i = 0; i < this.buildings.length; i++) {
            let xRand = Math.floor(Math.random() * width) - 1
            let yRand = Math.floor(Math.random() * height) - 1
            let xEndRand = Math.floor(Math.random() * xRand) - 1
            this.buildings[i] = new Building(xRand, yRand,xEndRand );
        }
    }

    show() {
        for (let i = 0; i < this.foods.length; i++) {
            this.foods[i].show();
        }
        for (let i = 0; i < this.buildings.length; i++) {
            this.buildings[i].show();
        }
        for (let i = 1; i < this.dots.length; i++) {
            this.dots[i].show();
        }
        for (let i = 0; i < this.ghosts.length; i++) {
            this.ghosts[i].show();
        }
        this.dots[0].show();
    }

    update() {
        for (let i = 0; i < this.dots.length; i++) {
            if (this.dots[i].brain.step > this.minStep) {
                this.dots[i].dead = true;
            }
            this.dots[i].update();
        }
        for (let i = 0; i < this.ghosts.length; i++) {
            this.ghosts[i].update();
        }
    }

    allDotsDead() {
        for (let i = 0; i < this.dots.length; i++) {
            if (!this.dots[i].dead )
                return false;
        }
        return true;

    }

    naturalSelection() {
        let newDots = new Array(this.dots.length);
        this.calculateFitnessSum();
        this.setBestDot();

        newDots[0] = this.dots[this.bestDot].returnBaby();
        newDots[0].isBest = true;
        for (let i = 1; i < newDots.length; i++) {
            let parent = this.selectParent();
            newDots[i] = parent.returnBaby();
        }
        this.dots = [].concat(newDots)
        console.log(this.dots.length)
        this.gen++;
    }

    calculateFitnessSum() {
        this.fitnessSum = 0;
        for (let i = 0; i < this.dots.length; i++) {
            this.fitnessSum += this.dots[i].fitness;
        }

    }

    selectParent() {
        let rand = Math.random() * this.fitnessSum
        let runningSum = 0;
        for (let i = 0; i < this.dots.length; i++) {
            runningSum += this.dots[i].fitness;
            if (runningSum > rand) {
                return this.dots[i];
            }
        }
        return null;
    }

    mutateBabies() {
        for (let i = 1; i < this.dots.length; i++) {
            this.dots[i].brain.mutate();
        }
    }

    setBestDot() {
        let max = 0;
        let maxIndex = 0;
        for (let i = 0; i < this.dots.length; i++) {
            if (this.dots[i].fitness > max) {
                max = this.dots[i].fitness;
                maxIndex = i;

            }
        }
        this.bestDot = maxIndex;

            this.minStep = this.dots[this.bestDot].fitness;
            console.log("step: ", this.minStep);
        
    }

    restoreGhosts() {
        for (let i = 0; i < this.ghosts.length; i++) {
            this.ghosts[i].restore();
            this.ghosts[i].hunting = this.dots[i];
        }
    }

}