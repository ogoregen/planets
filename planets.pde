
ArrayList<planet> planets;
PVector click, release;
boolean clear, start;
String s;

void settings(){

  size(800, 600);
}

void setup(){

  textSize(20);

  planets = new ArrayList<planet>();
  click = new PVector();
  release = new PVector();
}

void draw(){

  background(0);
  for(int i = planets.size()-1; i >= 0; i--){

    planet p = planets.get(i);
    for(int j = planets.size()-1; j >= 0; j--){

      planet p2 = planets.get(j);
      p.attract(p2);
      p.checkcollision(j);
    }
    p.update();
    p.trails();
    p.place();
  }
  hud();
}

void mousePressed(){

  start = true;
  click.set(mouseX, mouseY);
  if(mouseX > width-60 && mouseY > height-40){

    clear = true;
    for(int i = planets.size()-1; i >= 0; i--) planets.remove(planets.get(i));
  }
}

void mouseReleased(){

  if(!clear){

    release.set(mouseX, mouseY);
    planets.add(new planet(click, PVector.sub(click, release)));

  }
  else clear = false;
}

void hud(){

  fill(255);
  stroke(255);
  if(!start) text("click to create planets", 10, height/2);
  else{

    int count = planets.size();
    if(count == 1) s = "planet";
    else s = "planets";
    text(planets.size() + " " + s, 10, height-20);
    text("clear", width-60, height-20);
  }
  if(mousePressed) line(click.x, click.y, mouseX, mouseY);
}
