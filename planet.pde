
class planet{

  PVector v, a, position;
  boolean blackhole;
  float r, m;
  int clr;

  planet(PVector p, PVector v_){

    v = new PVector(v_.x, v_.y);
    v.div(50);
    a = new PVector();
    position = new PVector(p.x, p.y);
    r = random(40);
    clr = int(random(50, 256));
    m = r;
  }

  void update(){

    if(position.x > width) position.x = 0;
    else if(position.x < 0) position.x = width;
    if(position.y > height) position.y = 0;
    else if(position.y < 0) position.y = height;

    v.add(a);
    position.add(v);
    a.mult(0);
  }

  void apply(PVector f){

    a.add(f.copy().div(m));
  }

  void checkcollision(int i){

    planet p = planets.get(i);
    float d = PVector.dist(position, p.position);
    if(p != this && d < r/2 + p.r/2){

      if(m >= p.m){

        PVector v3 = PVector.mult(v, m);
        v3.add(PVector.mult(p.v, p.m));
        v3.div(m + p.m);
        v.set(v3);
        if(blackhole){

          m += p.m;
          r += p.r/10;
        }
        else{

          r += p.r;
          m += p.m;
          if(r >= width || r >= height){

            blackhole = true;
            r = r/10;
            clr = 0;
          }
        }
        planets.remove(i);
      }
    }
  }

  void attract(planet p){

    if(p != this){

      PVector f = PVector.sub(position, p.position);
      float d = PVector.dist(position, p.position);
      f.normalize();
      float magnitude = (m * p.m) / (d * d); //arbitrarily letting gravitational constant be 1
      f.mult(magnitude);
      p.apply(f);
    }
  }

  void place(){

    if(blackhole) stroke(255);
    else stroke(clr);
    fill(clr);
    ellipse(position.x, position.y, r, r);
  }
}
