class Ghost {
    pos;            //Posicion variable
    initpos;        //Posicion inicial que prevalecera
    vel;            //Velocidad de desplazamiento
    acc;            //Aceleracion de desplazamiento
    maxVel;         //Velocidad maxima a la que ira el fantasma
    rad = 5;        //El diametro del dot
    dead = false;   //Variable para saber si el cazador esta vivo o muerto
    hunting;        //El dot al que estará cazando
            
    //Valores rgb para establecer el color de los puntos
    r = 0;
    g = 0;
    b = 0;

    //Constructor de la función
    constructor(p, maxVelocity, hunt) {
        //Se crea un vector para la posicion inicial que se mantendra
        this.initpos = new createVector(p.x, p.y);
        //Se crea un vector para la posicion inicial que variara
        this.pos = new createVector(p.x, p.y);
        //Se crea un vector para la velocidad
        this.vel = new createVector(0, 0);
        //Se crea un vector para la aceleracion
        this.acc = new createVector(0, 0);
        //Se setea la variable de velocidad
        this.maxVel = maxVelocity;
        //Asignamos a la variable hunting el dot que el fantasma estara cazando
        this.hunting = hunt;
    }

    //Función para restaurar los valores de los fantasmas
    restore() {
        this.dead = false;
        this.pos = new createVector(this.initpos.x, this.initpos.y);
        this.vel = new createVector(0, 0);
        this.acc = new createVector(0, 0);
    }

    //Función inspirada en D* Lite para que los fantasmas persigan constanmente a los dots
    dStarLiteLike(dpos) {
        //Se calcula el ángulo entre el fantasma y el dot
        let angle = atan2(dpos.y-this.pos.y, dpos.x-this.pos.x);
        //Se calcula un vector con ese angulo
        this.acc = p5.Vector.fromAngle(angle);
        //Se asigna la aceleracion al vector velocidad
        this.vel.add(this.acc);
        //Se comprueba que no se sobrepase la velocidad maxima
        this.vel.limit(this.maxVel);
        //Se actualiza la posicion con la velocidad previa
        this.pos.add(this.vel);
    }

    //Función de colision entre fantasmas y dots
    collision(dot) {
        //Calculamos la distancia entre ambos centros
        let distance = sqrt((this.pos.x - dot.pos.x)^2 + (this.pos.y - dot.pos.y)^2)
        //Si la suma de ambos radios es mayor a la distancia calculada, significa que colisionaron
        if ((this.rad/2 ) > distance) {
            console.log("murio por ghost")
            dot.dead = true;
            if(dot.located>maxLocated * 0.90) dot.fitness = dot.fitness * 0.85
            else if(dot.located>maxLocated*0.75) dot.fitness = dot.fitness * 0.60
            else dot.fitness = dot.fitness * 0.3
            this.dead = true;
        }
    }

    //Funcion de colision entre fantasmas y obstaculos
    buildingCollision(dot) {
        for (let i = 0; i < dot.buildings.length; i++) {
            if (
                this.pos.x < dot.buildings[i].x + dot.buildings[i].xEnd &&
                this.pos.x + this.rad/2 > dot.buildings[i].x &&
                this.pos.y < dot.buildings[i].y + dot.buildings[i].yEnd &&
                this.pos.y + this.rad/2 > dot.buildings[i].y
            ) {
                //Se elige invertir el angulo para que no deje de haber movimiento y los
                //fantasmas puedan buscar otro camino
                this.vel.x = this.vel.x * -8;
                this.vel.y = this.vel.y * -8;
            }
        }
    }

    //Funcion de update constante en la cual, si el fantasma y el dot siguen
    //vivos, se comprueban las colisiones del fantasma con los obstaculos, 
    //con los demas dots y se realiza el movimiento de los fantasmas
    update() {
        if (!this.dead) {
            if (!this.hunting.dead) {            
                this.buildingCollision(this.hunting);
                this.dStarLiteLike(this.hunting.pos);
                this.collision(this.hunting);
            }
        }
    }

    //Con la funcion show dibujamos el escenario, en este caso, si el fantasma
    //y el dot al cual esta cazando siguen vivos, dibuja el fantasma, si alguno
    //de los dos estuviera muerto, ya no lo dibujaria
    show() {
        if (!this.dead && !this.hunting.dead) {
            //Funcion para seleccionar el color RGB que se desea para los fantasmas
            fill(this.r, this.g, this.b);
            //Función que dibuja el elipse del fantasma en las posiciones indicadas
            //con el ancho y alto indicado por this.rad
            ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
        }
    }
}