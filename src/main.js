
let planets = [];
let showOrbits = true; // Global variable to control orbit visibility

function setup(){
	
	createCanvas(windowWidth, windowHeight, WEBGL);
	initializeDomUi();
	
	planets.push(new Planet(400000, new p5.Vector(0, 0, 0), new p5.Vector(0, 0, 0)));
	planets.push(new Planet(1000, new p5.Vector(-330, 0, 0), new p5.Vector(0, -15, 0)));
	planets.push(new Planet(10000, new p5.Vector(-760, 0, 100), new p5.Vector(0, 10, 0)));
	planets.push(new Planet(50, new p5.Vector(-820, 0, -50), new p5.Vector(0, 15, 5)));
}

function draw(){
	
	background(0);
	
	// Enable orbit controls for 3D navigation
	orbitControl();
	
	scale(scalingFactor);

	let timeScale = getTimeScaleInput();

	for(let planet of planets){
		
		planet.update(timeScale);
		// Update orbit trail every few frames for performance
		if(frameCount % 3 === 0) {
			planet.updateOrbitTrail();
		}
		planet.draw();
	}

	handlePlanetInteractions();
	drawUi();
	
	// Draw 3D instructions
	draw3DInstructions();
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

function draw3DInstructions(){
	
	// Reset transformations to draw UI elements in 2D screen space
	push();
	resetMatrix();
	
	// Set 2D camera for UI
	camera(0, 0, (height/2) / tan(PI/6), 0, 0, 0, 0, 1, 0);
	
	// Semi-transparent background for better readability
	fill(0, 0, 0, 150);
	noStroke();
	rect(5, height - 130, 400, 125);
	
	fill(255);
	textAlign(LEFT);
	textSize(14);
	textStyle(BOLD);
	
	text("🌍 3D CONTROLS", 10, height - 115);
	
	textStyle(NORMAL);
	textSize(12);
	text("• Drag mouse: Rotate 3D view", 10, height - 100);
	text("• Q/E keys: Adjust planet creation depth", 10, height - 85);
	text("• O key: Toggle orbit trails", 10, height - 70);
	text("• Mouse wheel: Scale view (or planet size when creating)", 10, height - 55);
	text("• Click & drag: Create planet with velocity", 10, height - 40);
	
	// Current depth indicator with color coding
	fill(planetCreationDepth === 0 ? 255 : (planetCreationDepth > 0 ? 100 : 200), 
	     planetCreationDepth === 0 ? 255 : 150, 
	     planetCreationDepth === 0 ? 255 : 150);
	text("Current Z-depth: " + planetCreationDepth, 10, height - 25);
	
	// Orbit visibility indicator
	fill(showOrbits ? 150 : 255, showOrbits ? 255 : 150, 150);
	text("Orbit trails: " + (showOrbits ? "ON" : "OFF"), 10, height - 10);
	
	pop();
}
