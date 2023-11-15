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

    drawPositionVector(v, name ="", showName = true, showCoords = false, color = "black") {
        let from = this.origin;
        let to = new Vector2D(this.origin.x + this.baseX.scale(v.x).x,
                              this.origin.y + this.baseY.scale(v.y).y);
        let headlen = Math.floor(this.scale/3); // length of head in pixels
        let angle = Math.atan2(to.y - from.y, to.x - from.x);
        this.context.beginPath();
        this.context.font = Math.floor(this.scale/3) + "px Arial";
        this.context.strokeStyle = color;
        if (showCoords && showName) {
            this.context.fillText(name + "(" + v.x.toFixed(2) + ", " + v.y.toFixed(2) + ")", to.x + 10, to.y - 10);
        } else if (showName) {
            this.context.fillText(name, to.x + 10, to.y - 10);
        } else if (showCoords) {
            this.context.fillText("(" + v.x.toFixed(2) + ", " + v.y.toFixed(2) + ")", to.x + 10, to.y - 10);
        }
        this.context.moveTo(from.x, from.y);
        this.context.lineTo(to.x, to.y);
        this.context.moveTo(to.x, to.y);
        this.context.lineTo(to.x - headlen * Math.cos(angle - Math.PI / 6), to.y - headlen * Math.sin(angle - Math.PI / 6));
        this.context.moveTo(to.x, to.y);
        this.context.lineTo(to.x - headlen * Math.cos(angle + Math.PI / 6), to.y - headlen * Math.sin(angle + Math.PI / 6));
        this.context.stroke();
    }

    drawBaseAxes() {
        // draw coordinate system
        this.drawPositionVector(new Vector2D(1,0),"x");
        this.drawPositionVector(new Vector2D(0,1),"y");
    };

    drawLine(from, to, color = "black") {
        this.context.beginPath();
        this.context.lineWidth = this.scale / 10;
        this.context.strokeStyle = color;
        this.context.moveTo(from.x, from.y);
        this.context.lineTo(to.x, to.y);
        this.context.stroke();
    }
    
    drawGrid(spacing, color = "black") {
        for (let i = 0; i < this.canvas.width; i += spacing) {
            this.drawLine(new Vector2D(i, 0), new Vector2D(i, this.canvas.height), color);
        }
        for (let i = 0; i < this.canvas.height; i += spacing) {
            this.drawLine(new Vector2D(0, i), new Vector2D(this.canvas.width, i), color);
        }
    }
}
