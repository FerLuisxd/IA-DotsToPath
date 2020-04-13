class Building{
  float x;
  float y;
  float xEnd;
  
  Building(float a, float b,float c){
    x = a;
    y = b;
    xEnd = c;
  }
  
  void show(){
   fill(0,0,random(255));
   rect(x,y,xEnd,10);
  }

}
