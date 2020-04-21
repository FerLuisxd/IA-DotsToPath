class Brain {
    directions;
    step = 0;

    constructor(size) {
        this.directions = new Array(size);
        this.randomize();
    }

    //Aca randomizamos las direcciones con angulos aleatoreos
    randomize() {
        for (let i = 0; i < this.directions.length; i++) {
            let randomAngle = Math.random() * 2 * Math.PI;
            this.directions[i] = p5.Vector.fromAngle(randomAngle);
        }
    }
    //Aca extendemos las direcciones con angulos aleatoreos
    extendRandomize(nextend) {
        for (let i = 0; i < nextend; i++) {
            let randomAngle = Math.random() * 2 * Math.PI;
            this.directions.push(p5.Vector.fromAngle(randomAngle));
        }
    }
    //Clonamos las direcciones para retribuirlo
    clone() {
        let clone = new Brain(this.directions.length);
        for (let i = 0; i < this.directions.length; i++) {
            clone.directions[i] = this.directions[i].copy();
        }
        return clone;
    }
    // En caso se necesie se permite mutarlas direcciones
    mutate() {
        let mutationRate = 0.01
        for (let i = 0; i < this.directions.length; i++) {
            let rand = Math.random() * 1;
            if (rand < mutationRate) {
                let randomAngle = Math.random() * 2 * Math.PI;
                this.directions[i] = p5.Vector.fromAngle(randomAngle);
            }
        }
    }

}