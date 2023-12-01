class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // fields
    x = 0;
    y = 0;
    
    // methods
    add(v) {
        return new Vector2D(this.x + v.x, this.y + v.y);
    }

    scale(s) {
        return new Vector2D(this.x * s, this.y * s);
    }

    sub(v) {
        return new Vector2D(this.x - v.x, this.y - v.y);
    }

    dot(v) {
        return this.x*v.x + this.y*v.y;
    }

    length() {
        let len = Math.sqrt(this.x*this.x + this.y*this.y);
        return len;
    }
}


