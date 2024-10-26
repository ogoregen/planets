
let planets = [];

function setup(){

	createCanvas(windowWidth, windowHeight);
	initializeDomUi();

	planets.push(new Planet(400000, new p5.Vector(width/2, height/2), new p5.Vector(0, 0)));
	planets.push(new Planet(1000, new p5.Vector(width/2-height/4, height/2), new p5.Vector(0, -15)));
	planets.push(new Planet(10000, new p5.Vector(width/2-height/2-100, height/2), new p5.Vector(0, 10)));
	planets.push(new Planet(50, new p5.Vector(width/2-height/2-160, height/2), new p5.Vector(0, 15)));
}

function draw(){

	background(0);

	for(let i = planets.length - 1; i >= 0; i--){
		
		let planet1 = planets[i]

		let timeScale = getTimeScaleInput();

		planet1.update(timeScale);
		planet1.display();

		for(let j = planets.length - 1; j >= 0; j--){

			let planet2 = planets[j];

			Planet.attract(planet1, planet2);
			
			if(!Planet.shouldCollide(planet1, planet2)) continue;

			let planet = Planet.collide(planet1, planet2);
			if(!planet) continue;

			planets[j] = planet;
			planets.splice(i, 1);
			break;
		}
	}

	drawUi();
}
