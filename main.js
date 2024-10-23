
import "Planet.js";

var planets = [];

function setup(){

	createCanvas(800, 600);

	planets.push(new Planet(3000, new p5.Vector(width/2, height/2), p5.Vector.zero));
	planets.push(new Planet(1000, new p5.Vector(width/3, height/2), p5.Vector.zero));
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
}

function mousePressed(){


}

function mouseReleased(){

}
