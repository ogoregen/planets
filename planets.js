
var clear, start, click, release, planets, s;

function setup(){

  createCanvas(800, 600);
  textSize(20);

  clear = false;
  start = false;
  click = createVector();
  release = createVector();
  planets = [];
}

function draw(){

  background(0);
  for(let i = 0; i < planets.length; i++){

    p = planets[i];
    for(let j = 0; j < planets.length; j++){

      p2 = planets[j];
      p.attract(p2);
      p.checkcollision(j);
    }
    p.update();
    p.place();
  }
  hud();
}

function mousePressed(){

  start = true;
  click.set(mouseX, mouseY);
  if(mouseX > width-60 && mouseY > height-40){

    clear = true;
    for(let i = planets.length-1; i >= 0; i--) planets.pop();
  }
}

function mouseReleased(){

  if(!clear){

    release.set(mouseX, mouseY);
    planets.push(new planet(click, p5.Vector.sub(click, release)));
  }
  else clear = false;
}

function hud(){

  fill(255);
  stroke(255);
  if(!start) text("click to create planets", 10, height/2);
  else{

    var count = planets.length;
    if(count == 1) s = "planet";
    else s = "planets";
    text(count + " " + s, 10, height-20);
    text("clear", width-60, height-20);
  }
  if(mouseIsPressed) line(click.x, click.y, mouseX, mouseY);
}

class planet{

  constructor(p, v_){

    this.blackhole = false;
    this.v = v_.copy();
    this.v.div(50);
    this.a = createVector();
    this.position = p.copy();
    this.r = random(40);
    this.clr = int(random(50, 256));
    this.m = this.r;
  }

  update(){

    if(this.position.x > width) this.position.x = 0;
    else if(this.position.x < 0) this.position.x = width;
    if(this.position.y > height) this.position.y = 0;
    else if(this.position.y < 0) this.position.y = height;

    this.v.add(this.a);
    this.position.add(this.v);
    this.a.mult(0);
  }

  apply(f){

    this.a.add(f.copy().div(this.m));
  }

  checkcollision(i){

    this.p = planets[i];
    this.d = p5.Vector.dist(this.position, this.p.position);
    if(this != this.p && this.d < this.r/2 + this.p.r/2){

      if(this.m >= this.p.m){

        this.v3 = p5.Vector.mult(this.v, this.m);
        this.v3.add(p5.Vector.mult(this.p.v, this.p.m));
        this.v3.div(this.m + this.p.m);
        this.v.set(this.v3);
        this.m += this.p.m;
        if(this.blackhole) this.r += this.p.r/10;
        else{

          this.r += this.p.r;
          if(this.r >= width || this.r >= height){

            this.blackhole = true;
            this.r = this.r/10;
            this.clr = 0;
          }
        }
        planets.splice(i, 1);
      }
    }
  }

  attract(p){

    if(p != this){

      this.f = p5.Vector.sub(this.position, p.position);
      this.d = p5.Vector.dist(this.position, p.position);
      this.f.normalize();
      this.magnitude = (this.m * p.m) / (this.d * this.d);
      this.f.mult(this.magnitude);
      p.apply(this.f);
    }
  }

  place(){

    if(this.blackhole) stroke(255);
    else stroke(this.clr);
    fill(this.clr);
    ellipse(this.position.x, this.position.y, this.r, this.r);
  }
}
