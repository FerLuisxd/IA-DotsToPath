class Brain {
    directions;
    step = 0;

    constructor(size) {
        this.directions = new Array(size);
        this.randomize();
    }

    randomize() {
        for (let i = 0; i < this.directions.length; i++) {
            let randomAngle = Math.random() * 2 * Math.PI + 1;
            this.directions[i] = p5.Vector.fromAngle(randomAngle);
        }
    }

    clone() {
        let clone = new Brain(this.directions.length);
        for (let i = 0; i < this.directions.length; i++) {
            clone.directions[i] = this.directions[i].copy();
        }
        return clone;
    }

    mutate() {
        let mutationRate = 0.02;
        for (let i = 0; i < this.directions.length; i++) {
            let rand = Math.random() * 1;
            if (rand < mutationRate) {
                let randomAngle = Math.random() * 2 * Math.PI + 1;
                this.directions[i] = p5.Vector.fromAngle(randomAngle);
            }
        }

    }

}