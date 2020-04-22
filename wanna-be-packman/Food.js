class Food {
    x;
    y;
    xEnd;
    pos

    //Constructor para la comida
    constructor(a, b) {
        this.pos = new createVector(a, b);     //Vector de posicion de la comida
    }

    //Funcion de dibujar la comida
    show() {
        fill(255, 252, 179);
        ellipse(this.pos.x, this.pos.y, 6, 6);
    }

}