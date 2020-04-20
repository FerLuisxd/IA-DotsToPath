// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// Demonstration of using a genetic algorithm to perform a search

// setup()
//  # Step 1: The Population
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function,
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//
//   # Rinse and repeat

let goal;
let start = false;
let buildings;
let test;
let fr = 60;
function setup() {
  // display = createP("STARTING");
  // display.class("results");
  // display.position(10, 10);
  // goal = new createVector(windowWidth*0.9 / 2, windowHeight*0.9 - 700)
  frameRate(300);
  test = new Population(10, 10);
  createCanvas(windowWidth*0.9, windowHeight*0.9);

}

function draw() {
  if(start){
  if (!test) {
    console.log('no hay test')
    test = new Population(2000, 3);
  }
  background(255);
  fill(255, 0, 0);
  // rect(goal.x,goal.y,10,10)
  ellipse(goal.x, goal.y, 10, 10);


  fill(0,0,255);
  rect(0,300,600,10);

  fill(0,0,255);
  rect(200,500,600,10);

  if (test.allDotsDead()) {
    test.calculateFitness();
    test.naturalSelection();
    test.mutateBabies();
  }
  text("generation: " + test.gen, 20, 20);
  text("steps: " + test.minStep, 20, 30);
  text("??: " + test.dots.length, 20, 40);
  test.update();
  test.show();
  }
}
function mouseClicked() {
  goal = new createVector(mouseX,mouseY);
  test.minStep = 400;
  test.reBuild();
  start =true;
}