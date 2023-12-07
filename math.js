class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
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

    transform(M) {
        // the math: M*this = M.col1*this.x + M.col2*this.y
        // assuming that M is of type Matrix2D
        return M.col1.scale(this.x).add(M.col2.scale(this.y));
    }
}

class Matrix2D {
    constructor(col1,col2){
        this.col1 = col1;
        this.col2 = col2;
    }

    multiplyWithVector(v) {
        // the math: this.col1 * v.x + this.col2 * v.y
        return this.col1.scale(v.x).add(this.col2.scale(v.y));
    }


}


