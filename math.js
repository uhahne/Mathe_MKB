class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Vector2D(this.x,this.y);
    }

    scale(s) {
        return new Vector2D(s*this.x, s*this.y);
    }

    add(v) {
        return new Vector2D(this.x+v.x, this.y+v.y);
    }

    sub(v) {
        return new Vector2D(this.x - v.x, this.y - v.y);
    }
}
