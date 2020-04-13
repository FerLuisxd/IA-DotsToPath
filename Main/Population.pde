class Population{
  Dot[] dots;
  Building[] buildings;
  float fitnessSum;
  int gen = 1;
  int bestDot = 0;
  int minStep = 400;
  
  
Population(int size,int buildingsSize){
      println("buildings: ", buildingsSize);
  buildings = new Building[buildingsSize];
  dots = new Dot[size];
    for(int i = 0; i < buildings.length; i++){
    float xRand = random(0,800);
    float yRand = random(0,800);
    float xEndRand = random(xRand,800);
    buildings[i]=  new Building(xRand,yRand,xEndRand);
  }
  for(int i = 0; i < dots.length; i++){
    dots[i]=  new Dot(buildings);
  }

}

void reBuild(){
  for(int i = 0; i < buildings.length; i++){
    float xRand = random(0,800);
    float yRand = random(0,800);
    float xEndRand = random(xRand,800);
    buildings[i]=  new Building(xRand,yRand,xEndRand);
  }
}

void show(){ 
  for(int i = 0; i < buildings.length; i++){
    buildings[i].show();
  }
  for(int i = 1; i < dots.length; i++){
    dots[i].show();
  }

  dots[0].show();
}

void update(){
    for(int i = 0; i < dots.length; i++){
      if(dots[i].brain.step > minStep){
        dots[i].dead = true;
      }
      dots[i].update();

  }
}

void calculateFitness(){
    for(int i = 0; i < dots.length; i++){
    dots[i].calculateFitness();
  }
}


boolean allDotsDead(){
    for(int i = 0; i < dots.length; i++){
      if(!dots[i].dead && !dots[i].reachedGoal)
        return false;
     }
  return true;

}

void naturalSelection(){
   Dot[] newDots = new Dot[dots.length];
  calculateFitnessSum();
  setBestDot();
  
  newDots[0] = dots[bestDot].returnBaby();
  newDots[0] .isBest = true;
    for(int i = 1; i < newDots.length; i++){
      Dot parent = selectParent();
      
      newDots[i] = parent.returnBaby();
    }
   dots = newDots.clone(); 
  gen++;
}

void calculateFitnessSum(){
  fitnessSum = 0;
    for(int i = 0; i < dots.length; i++){
      fitnessSum += dots[i].fitness;
    }

}

Dot selectParent(){
  float rand = random(fitnessSum);
  float runningSum = 0;
  for(int i = 0; i < dots.length; i++){
    runningSum += dots[i].fitness;
    if(runningSum > rand){
      return dots[i];
    }
  }
  
  return null;
}

void mutateBabies(){
    for(int i = 1; i < dots.length; i++){
    dots[i].brain.mutate();
  }
}

void setBestDot(){
  float max = 0;
  int maxIndex = 0;
  for(int i = 0; i< dots.length; i++){
    if(dots[i].fitness > max){
      max = dots[i].fitness;
      maxIndex = i;

    }
  }
  bestDot = maxIndex;
  
  if(dots[bestDot].reachedGoal){
    minStep = dots[bestDot].brain.step;
    println("step: ", minStep);
  }
}



}
