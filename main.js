let canvas = document.getElementById("myCanvas");
// Draw canvas for the first time.
resizeCanvas();

// main drawing function
function drawStuff() {
    let cs = createAndDrawCoordinateSystem();

    let u = new Vector2D(3, 1);
    
    // create a transformation matrix L
    let col1L = new Vector2D(-1,0);
    let col2L = new Vector2D(0,1);
    let L = new Matrix2D(col1L,col2L); // named as in 3b1b video

    // create a transformation matrix L
    let col1M1 = new Vector2D(1,1);
    let col2M1 = new Vector2D(-2,0);
    let M1 = new Matrix2D(col1M1,col2M1); // named as in slides

    // create a (rotation) transformation matrix R
    let alpha = 90*(Math.PI/180)
    let col1Rot = new Vector2D(Math.cos(alpha),Math.sin(alpha));
    let col2Rot = new Vector2D(-Math.sin(alpha),Math.cos(alpha));
    let rot = new Matrix2D(col1Rot,col2Rot); // named to indicate rotation

    // check transform of base vectors
    let e1 = new Vector2D(1,0);
    let e2 = new Vector2D(0,1);
    //let Le1 = e1.transform(L);
    //let Le2 = e2.transform(L);
    
    // transform the vector and draw it
    //let v = u.transform(L);
    //let v = L.multiplyWithVector(u);
    let v = L.composeWith(rot).multiplyWithVector(u);
    
    cs.drawPositionVector(u, "u", true, true, "blue");
    cs.drawPositionVector(v, "v", true, true, "lightblue");
    //cs.drawPositionVector(Le1,"L(e1)", true, true, "red");
    //cs.drawPositionVector(Le2,"L(e2)", true, true, "green");
    
    
}

// event listener for canvas size changes
window.addEventListener('resize', resizeCanvas, false);

function createAndDrawCoordinateSystem() {
    let scale = 80; // pixels per unit

    // find best origin of canvas, close to center but on grid
    let xOffset = Math.floor(canvas.width / 2) % scale;
    let yOffset = Math.ceil(canvas.height / 2) % scale;
    let origin = new Vector2D(Math.floor(canvas.width / 2) - xOffset, Math.ceil(canvas.height / 2) - yOffset);
    // define base vectors
    let baseX = new Vector2D(scale, 0); 
    let baseY = new Vector2D(0, -scale); // negative y flips axis
    // get context for drawing
    let context = canvas.getContext("2d");

    // create coordinate system
    let coordinateSystem = new CartesianCoordinateSystem2D(origin, baseX, baseY, scale, context, canvas);
    coordinateSystem.drawGrid(scale, "lightgray");
    coordinateSystem.drawBaseAxes();
    return coordinateSystem;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawStuff();
  }