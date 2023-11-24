class CartesianCoordinateSystem2D {
    constructor(origin, baseX, baseY, scale, context, canvas) {
        this.origin = origin;
        this.baseX = baseX;
        this.baseY = baseY;
        this.scale = scale;
        this.context = context;
        this.context.font = "24px Arial";
        this.context.lineWidth = 5;
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    // fields
    origin = new Vector2D(0, 0);
    baseX = new Vector2D(0, 0);
    baseY = new Vector2D(0, 0);
    context = null;
    canvas = null;

    #isColor = (strColor) => {
        const s = new Option().style;
        s.color = strColor;
        return s.color !== '';
      }

    drawPositionVector(v, name ="", showName = true, showCoords = false, color = "black") {
        let from = this.origin;
        let to = this.#transformToPixel(v);
        if (this.#isColor(color)) {
            this.#drawVector(to, from, color, showCoords, showName, name, v);
        }
        else {
            console.error("Color name is not a valid html color.")
        }
    }

    drawVector(v, origin, name ="", showName = true, showCoords = false, color = "black") {
        let from = this.#transformToPixel(origin);
        let to = this.#transformToPixel(v.add(origin));
        if (this.#isColor(color)) {
            this.#drawVector(to, from, color, showCoords, showName, name, v);
        }
        else {
            console.error("Color name is not a valid html color.")
        }
    }

    #drawVector(to, from, color, showCoords, showName, name, v) {
        let headlen = Math.floor(this.scale / 3); // length of head in pixels
        let angle = Math.atan2(to.y - from.y, to.x - from.x);
        this.context.beginPath();
        this.context.font = Math.floor(this.scale / 3) + "px Arial";
        this.context.strokeStyle = color;
        this.context.moveTo(from.x, from.y);
        this.context.lineTo(to.x, to.y);
        this.context.moveTo(to.x, to.y);
        this.context.lineTo(to.x - headlen * Math.cos(angle - Math.PI / 6), to.y - headlen * Math.sin(angle - Math.PI / 6));
        this.context.moveTo(to.x, to.y);
        this.context.lineTo(to.x - headlen * Math.cos(angle + Math.PI / 6), to.y - headlen * Math.sin(angle + Math.PI / 6));
        if (showCoords && showName) {
            this.context.fillText(name + "(" + v.x.toFixed(2) + ", " + v.y.toFixed(2) + ")", to.x + 10, to.y - 10);
        } else if (showName) {
            this.context.fillText(name, to.x + 10, to.y - 10);
        } else if (showCoords) {
            this.context.fillText("(" + v.x.toFixed(2) + ", " + v.y.toFixed(2) + ")", to.x + 10, to.y - 10);
        }
        this.context.stroke();
    }

    #transformToPixel(origin) {
        return new Vector2D(this.origin.x + this.baseX.scale(origin.x).x,
            this.origin.y + this.baseY.scale(origin.y).y);
    }

    drawBaseAxes() {
        // draw coordinate system
        this.drawPositionVector(new Vector2D(1,0),"x");
        this.drawPositionVector(new Vector2D(0,1),"y");
    };

    drawLine(v, origin, color = "black") {
        let from = this.#transformToPixel(origin);
        let to = this.#transformToPixel(v.add(origin));
        if (this.#isColor(color)) {
            this.#drawLine(from, to, color);
        }
        else {
            console.error("Color name is not a valid html color.")
        }
    }

    #drawLine(from, to, color = "black") {
        this.context.beginPath();
        this.context.lineWidth = this.scale / 10;
        this.context.strokeStyle = color;
        this.context.moveTo(from.x, from.y);
        this.context.lineTo(to.x, to.y);
        this.context.stroke();
    }
    
    drawGrid(spacing, color = "black") {
        if (this.#isColor(color)) {
            for (let i = 0; i < this.canvas.width; i += spacing) {
                this.#drawLine(new Vector2D(i, 0), new Vector2D(i, this.canvas.height), color);
            }
            for (let i = 0; i < this.canvas.height; i += spacing) {
                this.#drawLine(new Vector2D(0, i), new Vector2D(this.canvas.width, i), color);
            }
        }
        else {
            console.error("Color name is not a valid html color.")
        }    
    }

    drawPoint(v, name = "", showCoords = false, color = "#" + Math.floor(Math.random()*16777215).toString(16)) {
        if (this.#isColor(color)) {
            let p = new Vector2D(this.origin.x + this.baseX.scale(v.x).x,
                                this.origin.y + this.baseY.scale(v.y).y);
            this.context.beginPath();
            this.context.fillStyle = color;
            this.context.strokeStyle = color;
            this.context.arc(p.x, p.y, 5, 0, 2 * Math.PI);
            if (showCoords) {
                this.context.fillText(name + "(" + v.x.toFixed(2) + ", " + v.y.toFixed(2) + ")", p.x + 10, p.y - 10);
            }
            this.context.fill();
        }
        else {
            console.error("Color name is not a valid html color.")
        }
    }
}
