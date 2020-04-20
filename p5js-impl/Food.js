class Food {
    x;
    y;
    xEnd;
    pos

    constructor(a, b) {
        this.pos = new createVector(a, b);
    }

    show() {
        fill(255, 252, 179);
        ellipse(this.pos.x, this.pos.y, 6, 6);
    }

}