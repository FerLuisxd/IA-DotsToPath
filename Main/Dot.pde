class Dot{
  PVector pos;  
  PVector vel;
  PVector acc;
  Brain brain;
  boolean dead = false;
  boolean reachedGoal = false;
  boolean isBest = false;
  float fitness = 0;
  int r;
  int g;
  int b;
  Building[] buildings;
  

Dot(Building[] builds){
  buildings = builds;
  brain = new Brain(400);
  r = int(random(255));
  g = int(random(255));
  b = int(random(255));
  pos = new PVector(width/2,height-10);
  vel = new PVector(0,0);
  acc = new PVector(0,0);
  
}

Dot(int a, int c, int e,Building[] builds){
   buildings = builds;
  r = a;
  g = c;
  b = e;
  brain = new Brain(400);
  
pos = new PVector(width/2,height-10);
  vel = new PVector(0,0);
  acc = new PVector(0,0);
  
}

void show(){
  if(!isBest){
    fill(r,g,b);
  ellipse(pos.x,pos.y,4,4);
  }else{
  fill(0,0);
  ellipse(pos.x,pos.y,4,4);
  }

}

void move(){
  
  if(brain.directions.length > brain.step){
   acc = brain.directions[brain.step];
   brain.step++;
 }
  
  vel.add(acc);
  vel.limit(10);
  pos.add(vel);
}

void update(){
  if(!dead && !reachedGoal){
    move();
    if(pos.x<2||pos.y<2|| pos.x>width-2||pos.y>height-2){
    dead = true;
  }else if(dist(pos.x,pos.y,goal.x,goal.y)<5){
    reachedGoal = true;
  } 
  else{
     for(int i = 0; i < buildings.length; i++){
       if(pos.x<buildings[i].xEnd && pos.y<buildings[i].y+10 &&  pos.x>buildings[i].x  && pos.y>buildings[i].y ){
         if(!dead){
                 dead = true;
         }
     }
  }
    //fill(0,0,255);
  //rect(0,300,600,10);
     // else if(pos.x<600 && pos.y<310 &&  pos.x>0 && pos.y>300 ){
    //dead = true;
  //}else if(pos.x<800 && pos.y<510 &&  pos.x>200 && pos.y>500 ){
   // dead = true;
  //}
}
  } 
  }

void calculateFitness(){
  if(reachedGoal){
  fitness = 1.0/16.0+ 10000.0/(float)(brain.step * brain.step);
  }else{
  float distanceToGoal = dist(pos.x,pos.y,goal.x,goal.y);
  fitness = 1.0/(distanceToGoal * distanceToGoal);
  }
}

Dot returnBaby(){
  Dot baby = new Dot(r,g,b,buildings);
  baby.brain = brain.clone();
  return baby;
}



}
