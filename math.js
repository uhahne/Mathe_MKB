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

    rotate(angle) {
        let col1 = new Vector2D(Math.cos(angle),Math.sin(angle));
        let col2 = new Vector2D(-Math.sin(angle),Math.cos(angle));
        let M = new Matrix2D(col1, col2);
        return M.multiplyWithVector(this);
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

    composeWith(M) {
        // the math: each entry is dot product of row vector with column vector
        let row1 = new Vector2D(this.col1.x, this.col2.x);
        let row2 = new Vector2D(this.col1.y, this.col2.y);
        let col1new = new Vector2D(row1.dot(M.col1), row2.dot(M.col1));
        let col2new = new Vector2D(row1.dot(M.col2), row2.dot(M.col2));
        return new Matrix2D(col1new, col2new);
    }


}


