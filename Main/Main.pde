Population test;
PVector goal;
boolean start = false;
Building[] buildings;
void setup(){
   size(800,800);
   test = new Population(100,int(random(0,6)));
}

void draw(){
  if(start){
   background(255);
  
  fill(255,0,0);
  ellipse(goal.x,goal.y,10,10);
  
  
  //fill(0,0,255);
  //rect(0,300,600,10);
  
  //fill(0,0,255);
  //rect(200,500,600,10);
  
  if(test.allDotsDead()){
    test.calculateFitness();
    test.naturalSelection();
    test.mutateBabies();
  }
  text("generation: " + test.gen,20,20);
  text("steps: " + test.minStep,20,30);
  test.update();
  test.show();
  }
 
}  

void mouseClicked() {
   goal = new PVector(mouseX,mouseY);
   test.minStep = 400;
   test.reBuild();
   start =true;
}

void mouseDragged() 
{

}
