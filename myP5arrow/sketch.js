let vectors = []; // Array to store vectors drawn by the user
let additionResult; // Resultant vector for addition operation
let subtractionResult; // Resultant vector for subtraction operation

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

  // Display addition and subtraction result vectors if they exist
  if (additionResult) {
    stroke(50, 255, 50); // Green color for addition result
    additionResult.display();
  }
  if (subtractionResult) {
    stroke(255, 50, 50); // Red color for subtraction result
    subtractionResult.display();
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
  if (additionResult) additionResult = calculateVectorSum();
  if (subtractionResult) subtractionResult = calculateVectorDifference();
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    additionResult = calculateVectorSum();
  } else if (key === 'd' || key === 'D') {
    subtractionResult = calculateVectorDifference();
  } else if (key === 'r' || key === 'R') {
    resetVectors();
  }
}

// Function to calculate the sum of all vectors
function calculateVectorSum() {
  let sum = vectors[0].vec.copy();
  sum.add(vectors[1].vec);
  subtractionResult = undefined;
  return new Arrow(vectors[0].pos.x, vectors[0].pos.y, "sum", sum);
}

// Function to calculate the difference of all vectors
function calculateVectorDifference() {
  let difference = vectors[0].vec.copy();
  difference.sub(vectors[1].vec);
  additionResult = undefined;
  return new Arrow(vectors[1].pos.x + vectors[1].vec.x, vectors[1].pos.y + vectors[1].vec.y, "diff", difference);
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
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.vec.x, this.vec.y);
    rotate(this.vec.heading());
    let arrowSize = 7;
    translate(this.vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
    document.getElementById(this.id).innerText = `<${this.vec.x}, ${this.vec.y}>`;
  }
}
