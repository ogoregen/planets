
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
	
	let timeScale = getTimeScaleInput();

	for(let planet of planets){
		
		planet.update(timeScale);
		planet.draw();
	}

	let planetIndicesToRemove = new Set();
	let newPlanets = [];

	for(let i = 0; i < planets.length; i++){
		
		for(let j = i + 1; j < planets.length; j++){
			
			Planet.applyGravitationalForce(planets[i], planets[j]);
			
			if(indicesToRemove.has(i) || indicesToRemove.has(j)) continue;

			if(!Planet.shouldCollide(planets[i], planets[j])) continue;
			
			let planet = Planet.collide(planets[i], planets[j]);
			if(!planet) continue;
	
			newPlanets.push(planet);
			indicesToRemove.add(i);
			indicesToRemove.add(j);
		}
	}

	for(let i of Array.from(planetIndicesToRemove).sort((a, b) => b - a)) planets.splice(i, 1);
	planets.push(...newPlanets);
	
	drawUi();
}
