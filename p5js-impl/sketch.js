//Prueba
let hunter;
let ghostsPosition;

let goal;
let start = false;
let buildings;
let test;
let fr = 60;
let brainLength = 1000
let factor = 0.97

let dotsToPoint = false
function setup() {
  createCanvas(windowWidth*factor, windowHeight*factor);

  frameRate(60);
  if(dotsToPoint){
    test = new Population(500, 10,0);
  }
  else test = new Population(1,20,30)
  ghostsPosition = new createVector(100, 50);
  hunter = new Ghost(ghostsPosition,5);
}

function draw() {
  if(start){
  background(255);
  fill(255, 0, 0);

  if (test.allDotsDead()) {
    test.calculateFitness();
    test.naturalSelection();
    test.mutateBabies();
  }
  text("generation: " + test.gen, 20, 20);
  text("maxFitness: " + test.minStep, 20, 30);
  text("??: " + test.dots.length, 20, 40);
  test.update();
  test.show();
  hunter.update(test.dots[0].pos);
 
  hunter.show();
  }
}
function mouseClicked() {
  //ghostsPosition = new createVector(mouseX, mouseY);
  test.minStep = brainLength ;
  test.reBuild();
  start =true;
}