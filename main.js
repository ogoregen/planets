
import "Planet.js";

var planets = [];
var mousePressStart = new p5.Vector();

function setup(){

	createCanvas(800, 600);

	planets.push(new Planet(3000, new p5.Vector(width/2, height/2), new p5.Vector(0, 0)));
	planets.push(new Planet(1000, new p5.Vector(width/3, height/2), new p5.Vector(0, 0)));
}

function draw(){

	background(0);

	for(let i = 0; i < planets.length; i++){

		let planet1 = planets[i];

		planet1.update();
		planet1.display();

		for(let j = 0; j < planets.length; j++){

			let planet2 = planets[j];
			Planet.attract(planet1, planet2);
			
			if(Planet.shouldCollide(planet1, planet2)){

				let planet = Planet.collide(planet1, planet2);
				if(planet){

					planets[j] = planet;
					planets.splice(i, 1);
				} 
			}
		}
	}

	drawHud();
}

function mousePressed(){

	mousePressStart.set(mouseX, mouseY);
}

function mouseReleased(){

	let velocity = p5.Vector.sub(mousePressStart, new p5.Vector(mouseX, mouseY));
	velocity.div(50);
    planets.push(new Planet(1000, mousePressStart, velocity));
}

function drawHud(){

	if(!mouseIsPressed) return;
	
	stroke(255);
	line(mousePressStart.x, mousePressStart.y, mouseX, mouseY);
}
