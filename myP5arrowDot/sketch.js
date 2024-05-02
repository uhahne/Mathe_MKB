let vectors = []; // Array to store vectors drawn by the user
let additionResult; // Resultant vector for addition operation
let subtractionResult; // Resultant vector for subtraction operation
let dotProductResult;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(20);
  stroke(220);
  // Draw all the vectors
  for (let v of vectors) {
    v.display();
  }

  // Display projection result vectors if they exist
  if (dotProductResult) {
    stroke(255, 50, 255); // Purple color for dot product/projection result
    dotProductResult.display();
  }
}

function mousePressed() {
  if (vectors.length == 0) {
    vectors.push(new Arrow(mouseX, mouseY, "vec1"));
  } else if (vectors.length == 1) {
    vectors.push(new Arrow(vectors[0].pos.x, vectors[0].pos.y, "vec2"));
  }
}

function mouseDragged() {
  vectors[vectors.length - 1].setEnd(mouseX, mouseY);
  if (dotProductResult) dotProductResult = calculateDotProduct();
}

function keyPressed() {
  if (key === 'd' || key === 'D') {
    dotProductResult = calculateDotProduct();
  } else if (key === 'r' || key === 'R') {
    resetVectors();
  }
}





function calculateDotProduct() {
  // compute the dot product of the two vectors
  let dot = vectors[0].vec.dot(vectors[1].vec);
  // prepare a vector in the same direction as the second
  let w = createVector(vectors[1].vec.x, vectors[1].vec.y);
  // get length of the vector squared
  let magSq = vectors[1].vec.magSq();
  // scale the new vector with the ratio of dot product and squared length
  w.mult(dot / magSq);
  return new Arrow(vectors[0].pos.x, vectors[0].pos.y, "dot", w);
}

function resetVectors() {
  vectors = [];
  additionResult = undefined;
  subtractionResult = undefined;
  stroke(220);
  location.reload();
}

// Arrow class
class Arrow {
  constructor(x, y, id, vec = createVector(1, 0)) {
    this.pos = createVector(x, y);
    this.vec = vec;
    this.id = id;
  }

  setEnd(x, y) {
    this.vec.x = x - this.pos.x;
    this.vec.y = y - this.pos.y;
  }

  display() {
    if (this.vec.mag() > 0.01) {
      push();
      translate(this.pos.x, this.pos.y);
      line(0, 0, this.vec.x, this.vec.y);
      rotate(this.vec.heading());
      let arrowSize = 7;
      translate(this.vec.mag() - arrowSize, 0);
      triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
      pop();
    }
    document.getElementById(this.id).innerText = `<${Math.round(this.vec.x)}, ${Math.round(this.vec.y)}>`;
  }
}
