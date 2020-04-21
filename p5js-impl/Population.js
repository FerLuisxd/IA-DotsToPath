class Population {
    dots;               //Arreglo de dots
    buildings;          //Arreglo de obstaculos
    fitnessSum;         //La suma total del fitness
    gen = 1;            //El gen en el que nos encontramos actualmente
    bestDot = 0;        //El mejor dot de la anterior simulacion
    foods = 0;          //La cantidad de comida que se colocara en el mapa
    minStep = 0;        //
    ghosts;             //Arreglo de fantasmas
    ghostV = 1;         //Velocidad maxima de los fantasmas
    maxLocated = 0;     

    constructor(size, buildingsSize,foodSize,ghosts = false) {
        console.log("buildings: ", buildingsSize);
        this.buildings = new Array(buildingsSize);  //Arreglo de obstaculos
        this.dots = new Array(size);                //Arreglo de dots
        if(ghosts) this.ghosts = new Array(size);              //Arreglo de fantasmas
        this.foods = new Array(foodSize);           //Arreglo de comida
        console.log(width,height)

        //Se genera aleatoriamente el arreglo de comida
        for (let i = 0; i < this.foods.length; i++) {
            let xRand = Math.floor(Math.random() * width) - 1
            let yRand = Math.floor(Math.random() * height) - 1
            this.foods[i] = new Food(xRand, yRand);
        }
        //Se genera aleatoriamente el arreglo de obstaculos
        for (let i = 0; i < this.buildings.length; i++) {
                let xRand = Math.floor(Math.random() * width) - 1
                let yRand = Math.floor(Math.random() * height) - 1
                let xEndRand = Math.floor(Math.random() * xRand) - 1
                this.buildings[i] = new Building(xRand, yRand,xEndRand );
        }
        //Se genera aleatoriamente el arreglo de dots
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i] = new Dot(this.buildings,this.foods,maxVelocity);
        }
        //Se genera aleatoriamente el arreglo de fantasmas
        if(ghosts){
            for (let i = 0; i < this.ghosts.length; i++) {
                // let xRand = Math.floor(Math.random() * width) - 1
                // let yRand = Math.floor(Math.random() * height) - 1                
                let xRand = 0
                let yRand = 0                
                let po = new createVector(xRand, yRand);
                this.ghosts[i] = new Ghost(po, maxVelocity/10, this.dots[i]);
            }
        }
        console.log(width, height, width / 2, height - 10);

    }

    //Funcion para que con cada click se actualicen los obstaculos, 
    //se generan nuevas posiciones y tamaños
    reBuild() {
        for (let i = 0; i < this.buildings.length; i++) {
            let xRand = Math.floor(Math.random() * width) - 1
            let yRand = Math.floor(Math.random() * height) - 1
            let xEndRand = Math.floor(Math.random() * xRand) - 1
            this.buildings[i] = new Building(xRand, yRand,xEndRand );
        }
    }

    //Funcion con la cual se dibuja el escenario
    show() {
        //Se dibuja la comida
        for (let i = 0; i < this.foods.length; i++) {
            this.foods[i].show();
        }
        //Se dibujan los obstaculos
        for (let i = 0; i < this.buildings.length; i++) {
            this.buildings[i].show();
        }
        //Se dibujan los dots
        for (let i = 1; i < this.dots.length; i++) {
            this.dots[i].show();
        }
        //Se dibujan los fantasmas
        if(this.ghosts){
            for (let i = 0; i < this.ghosts.length; i++) {
                this.ghosts[i].show();
            }
        }
        this.dots[0].show();
    }

    //Funcion de update en la cual se actualizan los dots y los fantasmas
    update() {
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].update();
        }
        if(this.ghosts){
            for (let i = 0; i < this.ghosts.length; i++) {
                this.ghosts[i].update();
            }
        }

    }

    //Funcion con la cual se comprueba si todos los dots ya han muerto
    allDotsDead() {
        for (let i = 0; i < this.dots.length; i++) {
            if (!this.dots[i].dead)
                return false;
        }
        return true;

    }

    //Funcion en la cual se realiza la seleccion para futuras generaciones 
    //basandonos en los resultados de la anteiror simulacion
    naturalSelection() {
        //Generamos un arreglo de nuevos dots
        let newDots = new Array(this.dots.length);
        //Calculamos el fitness total
        this.calculateFitnessSum();
        //Seteamos el mejor dot de la generacion
        this.setBestDot();
        //Colocamos el mejor dot de la generacion en el nuevo arreglo
        newDots[0] = this.dots[this.bestDot].returnBaby();
        newDots[0].isBest = true;
        //Para cada dot, vemos que padre es seleccionado 
        for (let i = 1; i < newDots.length; i++) {
            let parent = this.selectParent();
            newDots[i] = parent.returnBaby();    //El padre retorna un dot hijo con su herencia
        }
        //Reemplazamos los antiguos dots con los nuevos
        this.dots = [].concat(newDots)
        console.log(this.dots.length)
        //Pasamos a la siguiente generacion
        this.gen++;
    }

    //Calcular la suma total del fitness
    calculateFitnessSum() {
        this.fitnessSum = 0;
        for (let i = 0; i < this.dots.length; i++) {
            this.fitnessSum += this.dots[i].fitness;
        }

    }

    //Funcion para calcular mediante probabilidad si un dot debe tener hijos
    selectParent() {
        let rand = Math.random() * this.fitnessSum  //Se genera un numero random que tiene como tope el total de fitess
        let runningSum = 0;
        for (let i = 0; i < this.dots.length; i++) {
            runningSum += this.dots[i].fitness;     
            if (runningSum > rand) {                //Si la suma es mayor al numero aleatorio, se selecciona el dot como padre
                return this.dots[i];
            }
        }
        return null;
    }

    //Funcion para cambiar el arreglo de movimientos de un dot hijo aleatoriamente
    mutateBabies() {
        for (let i = 1; i < this.dots.length; i++) {
            this.dots[i].brain.mutate();
        }
    }

    //Funcion para seleccionar el mejor dot de la generacion
    setBestDot() {
        let max = 0;
        let maxIndex = 0;
        for (let i = 0; i < this.dots.length; i++) {
            if (this.dots[i].fitness > max) {
                max = this.dots[i].fitness;
                maxIndex = i;
            }
        }
        //Se asigna a la variable global el index donde esta el mejor dot
        this.bestDot = maxIndex;
        //Se asigna a la variable global el fitness del mejor dot
        this.minStep = this.dots[this.bestDot].fitness;
        //Se asigna a la variable global el maximo de comida recolectada por el dot
        this.maxLocated = this.dots[this.bestDot].located;
        console.log("step: ", this.minStep);
    }

    //Funcion para restaurar los valores del arreglo de fantasmas
    restoreGhosts() {
        if(this.ghosts){
            for (let i = 0; i < this.ghosts.length; i++) {
                this.ghosts[i].restore();
                //Se le asigna un nuevo objetivo al cual cazar
                this.ghosts[i].hunting = this.dots[i];
            }
        }
    }

}