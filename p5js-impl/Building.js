class Building {
    x;
    y;
    xEnd;

    constructor(a, b, c) {
        this.x = a;
        this.y = b;
        this.xEnd = c;
    }

    show() {
        fill(0, 0, 255);
        rect(this.x, this.y, this.xEnd, 10);
    }

}