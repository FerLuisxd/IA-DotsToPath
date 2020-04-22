class Dot {
    pos;            //Vector de posicion
    vel;            //Vector de velocidad
    acc;            //Vector de aceleracion
    brain;          //Cerebro que posee las direcciones
    dead = false;   //Variable para saber si el dot esta muerto o no
    isBest = false; //Variable para saber si el dot es el mejor de la generacion
    fitness = 0;    //El fitness del dot
    r;              //Los componentes para el color RGB
    g;
    b;
    buildings;      //Arreglo de obstaculos
    maxVel;         //Velocidad maxima del dot
    foods;          //Arreglo de comida
    foodReached;    //Arreglo de comida conseguida
    time = 0;       //Tiempo del dot
    located = 0;    //La cantidad de comida que ha conseguido

    //Constructor
    constructor(builds, foods, maxVelocity, a = undefined, c = undefined, e = undefined) {
        this.maxVel = maxVelocity;
        this.buildings = builds;
        this.foods = foods;
        this.brain = new Brain(brainLength);
        this.foodReached = new Array(this.foods.length)
        this.r = a ?? Math.floor(Math.random() * 255) + 1;
        this.g = c ?? Math.floor(Math.random() * 255) + 1;
        this.b = e ?? Math.floor(Math.random() * 255) + 1;
        this.pos = new createVector(width * factor / 2, height * factor /2);
        this.vel = new createVector(0, 0);
        this.acc = new createVector(0, 0);
    }

    //Funcion para dibujar los dots
    show() {
        //Si el dot esta muerto, no se dibujara
        if(!this.dead){
            // if (!this.isBest) {
            fill(this.r, this.g, this.b);
            // } else {
            //     fill(0, 0);
            // }
            ellipse(this.pos.x, this.pos.y, 4, 4);
        }
    }

    //Funcion de movimiento del dot
    move() {
        //Comprueba si le quedan pasos para dar
        if (this.brain.directions.length > this.brain.step) {
            //Comprueba alguna de las colisiones
            if (this.collisionDetected(true)) {
                this.vel.x = this.vel.x * -1
                this.vel.y = this.vel.y * -1
            }
            //Obtiene una direccion
            this.acc = this.brain.directions[this.brain.step];
            this.brain.step++;
        } else {
            if(this.located >= maxLocated *0.85 ) this.dead = true
            else {
                console.log('soy down')
                this.fitness = this.fitness * 0.75
                this.dead = true
            }   
        }
        //Setea la aceleracion
        this.vel.add(this.acc);
        //Setea la velocidad
        this.vel.limit(this.maxVel);
        //Setea la posicion
        this.pos.add(this.vel);
    }

    //Funcion para detectar la colision entre el dot y los demas componentes
    collisionDetected(detectBuildings = false) {
        if (detectBuildings) {
            //Colision con la comida
            for (let i = 0; i < this.foods.length; i++) {
                if (
                    this.pos.x < this.foods[i].pos.x + 8 &&
                    this.pos.y < this.foods[i].pos.y + 8 &&
                    this.pos.x > this.foods[i].pos.x - 2 &&
                    this.pos.y > this.foods[i].pos.y - 2
                ) {
                    if(!this.foodReached[i]){
                        this.located++
                        let porcentage = 1 - (this.brain.step/this.brain.directions.length)
                        // if(this.fitness < 2*fit ){
                        //     this.fitness += fit * porcentage * porcentage
                        // }
                        //else{}
                        if(this.located>= maxLocated) {
                            this.fitness += fit * porcentage
                        }
                        else if(porcentage <0.75){
                            this.fitness += fit * porcentage * porcentage 
                        }
                        else {
                            this.fitness += fit * porcentage * porcentage * porcentage * porcentage
                        }

                        if(this.located>=maxLocated){
                            let random = Math.floor(Math.random() * 100)+ 150
                            console.log('aumente de verdad ?', random)
                            this.brain.extendRandomize(random) 
                        }
                        // else if(this.located>=maxLocated * 0.85){
                        //     let random = Math.floor(Math.random() * 50)+ 50
                        //     console.log('aumente?', random)
                        //     this.brain.extendRandomize(random) 
                        // }

                        this.foodReached[i] = true
                        this.time = 2;
                    }

                }
            }
            //Colision con los obstaculos
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
        //Colision con los bordes
        if (this.pos.x < 2 || this.pos.y < 2 || this.pos.x > width - 2 || this.pos.y > height - 2) {
            return true
        }
        return false
    }

    //Funcion para actualizar. Si el dot esta muerto, no se movera
    update() {
        if (!this.dead) {
            if(this.time--<0){
                this.move();
            }
        }
    }

    //Funcion que retorna un dot hijo con la informacion del padre
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