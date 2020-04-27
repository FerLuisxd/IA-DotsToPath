let start = false;
let buildings;
let test;
let fr = 500;
let brainLength = 100
let factor = 0.97
let foodN = 50
let fit = 100000
let maxLocated = 0
let ghosts = true
let maxVelocity = 20
//Funcion para cargar informacion previamente
function setup() {
  createCanvas(windowWidth*factor, windowHeight*factor);
  frameRate(fr);
  test = new Population(150,20,foodN,ghosts)
}
//Funcion para dibujar los componentes
function draw() {
  if(start){
  background(255);
  fill(255, 0, 0);

  //Condicional para realizar las actualizaciones correspondientes
  if (test.allDotsDead()) {
    // Se selecciona 
    test.naturalSelection();
    // Mutamos los hijos
    test.mutateBabies();
    // Reestablecemos de la posicion de los fantasmas
    test.restoreGhosts();
    maxLocated = test.maxLocated
  }
  test.update();
  test.show();
  text("generation: " + test.gen, 20, 20);
  text("Last maxLocated: " + maxLocated + " out of " + foodN, 20, 50);
  text("maxFitness: " + test.minStep, 20, 30);
  text("Fps: " + frameRate(), 20, 40);
  }
}

//Funcion para dar click al mouse
function mouseClicked() {
  test.minStep = 0;
  test.reBuild();
  start =true;
}