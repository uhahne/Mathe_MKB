let canvas = document.getElementById("myCanvas");
// Draw canvas for the first time.
resizeCanvas();

// main drawing function
function drawStuff() {
    let scale = 80; // pixels per unit
    // find best origin of canvas, close to center but on grid
    let xOffset = Math.floor(canvas.width / 2) % scale;
    let yOffset = Math.floor(canvas.height / 2) % scale;
    let origin = new Vector2D(Math.floor(canvas.width / 2) - xOffset, Math.floor(canvas.height / 2) - yOffset);
    let baseX = new Vector2D(scale, 0); // first base vector
    let baseY = new Vector2D(0, -scale); // second base vector
    let context = canvas.getContext("2d");

    let coordinateSystem = new CartesianCoordinateSystem2D(origin, baseX, baseY, scale, context, canvas);
    coordinateSystem.drawGrid(scale, "lightgray");
    coordinateSystem.drawBaseAxes();

    let vec1 = new Vector2D(-1, 3);
    let vec2 = new Vector2D(3, 2);
    let vec3 = vec1.add(vec2);

    console.log(vec1);
    coordinateSystem.drawPositionVector(vec1, "V1", true, true, "blue");
    coordinateSystem.drawPositionVector(vec2, "V2", true, true, "green");
    coordinateSystem.drawPositionVector(vec3, "V3", true, true, "red");
}

// event listener for canvas size changes
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawStuff();
  }