let canvas = document.getElementById("myCanvas");
// Draw canvas for the first time.
resizeCanvas();

// main drawing function
function drawStuff() {
    let cs = createAndDrawCoordinateSystem();
    
    // add new vectors here
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