class Building {
    x;
    y;
    xEnd; 
    yEnd;

    //Constructor de la clase
    //Se setean tamaños random para cada obstaculo
    constructor(a, b, c) {
        this.x = a;
        this.y = b;
        this.xEnd = c;
        if(Math.random() * 1 < 0.3){
            this.yEnd = 10;
        }
        else{
            this.xEnd = 10
            this.yEnd = Math.floor(Math.random() * this.y) - 1
        }
    }

    //Funcion para dibujar los componentes
    show() {
        fill(0, 0, 255);
        rect(this.x, this.y, this.xEnd, this.yEnd);
    }

}