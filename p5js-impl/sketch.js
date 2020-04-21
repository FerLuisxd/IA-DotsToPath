let goal;
let start = false;
let buildings;
let test;
let fr = 60;
let brainLength = 1500
let factor = 0.97
function setup() {
  createCanvas(windowWidth*factor, windowHeight*factor);

  frameRate(fr);
  test = new Population(500,20,50)

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
  test.update();
  test.show();
  text("generation: " + test.gen, 20, 20);
  text("maxFitness: " + test.minStep, 20, 30);
  text("Fps: " + frameRate(), 20, 40);
  }
}
function mouseClicked() {
  test.minStep = 0;
  test.reBuild();
  start =true;
}