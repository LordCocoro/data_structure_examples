function setup() {
  //createCanvas(500, 500);
  createCanvas(windowWidth, windowHeight);
  background(200, 200, 200);
  //noCursor();
  frameRate(2);
}

let numeroFigura = 5;
let diaMax = 100;

function draw() {
  background(200, 200, 200);

  strokeWeight(10);
  stroke(255, 0, 0);
  fill(random(255), random(255), random(255));

  

  for(let i = 0; i < numeroFigura; i++){
    ellipse(random(width), random(height), random(diaMax), random(diaMax));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(200, 200, 200);
}