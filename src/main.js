
let planets = [];

function setup(){
	
	createCanvas(windowWidth, windowHeight, WEBGL);
	initializeDomUi();
	
	planets.push(new Planet(400000, new p5.Vector(0, 0), new p5.Vector(0, 0)));
	planets.push(new Planet(1000, new p5.Vector(-330, 0), new p5.Vector(0, -15)));
	planets.push(new Planet(10000, new p5.Vector(-760, 0), new p5.Vector(0, 10)));
	planets.push(new Planet(50, new p5.Vector(-820, 0), new p5.Vector(0, 15)));
}

function draw(){
	
	background(0);
	scale(scalingFactor);

	let timeScale = getTimeScaleInput();

	for(let planet of planets){
		
		planet.update(timeScale);
		planet.draw();
	}

	handlePlanetInteractions();
	drawUi();
}

function handlePlanetInteractions(){

	let planetIndicesToRemove = new Set();
	let newPlanets = [];

	for(let i = 0; i < planets.length; i++){
		
		for(let j = i + 1; j < planets.length; j++){
			
			Planet.applyGravitationalForce(planets[i], planets[j]);
			
			if(planetIndicesToRemove.has(i) || planetIndicesToRemove.has(j)) continue;

			if(!Planet.shouldCollide(planets[i], planets[j])) continue;
			
			let planet = Planet.collide(planets[i], planets[j]);
			if(!planet) continue;
	
			newPlanets.push(planet);
			planetIndicesToRemove.add(i);
			planetIndicesToRemove.add(j);
		}
	}

	for(let i of [...planetIndicesToRemove].sort((a, b) => b - a)) planets.splice(i, 1);
	planets.push(...newPlanets);
}
