
const MIN_PLANET_MASS = 10;
const DEFAULT_PLANET_MASS = 100;

let selectedPlanetMass = DEFAULT_PLANET_MASS;
let mousePressStart = new p5.Vector();
let creatingPlanet = false;
let scalingFactor = 1.0;
let planetCreationDepth = 0; // Z-coordinate for new planets

function mousePressed(){
	
	if(isMousePressUsedByDom()) return;
	
	creatingPlanet = true
	selectedPlanetMass = DEFAULT_PLANET_MASS;
	mousePressStart.set(mouseX - width/2, mouseY - height/2, planetCreationDepth);
	mousePressStart.div(scalingFactor);
}

function mouseReleased(){

	if(!creatingPlanet) return;
	
	let velocity = p5.Vector.sub(mousePressStart, new p5.Vector((mouseX - width/2) / scalingFactor, (mouseY - height/2) / scalingFactor, planetCreationDepth));
	velocity.div(20 / scalingFactor);
	planets.push(new Planet(selectedPlanetMass, mousePressStart.copy(), velocity));
	creatingPlanet = false;
}

function mouseWheel(event){
	
	if(creatingPlanet){
		
		selectedPlanetMass += event.delta * 20;
		selectedPlanetMass = Math.max(selectedPlanetMass, MIN_PLANET_MASS);
	}
	else{

		scalingFactor -= event.delta / 5000;
		scalingFactor = Math.max(scalingFactor, 0)
	}
}

function keyPressed(){
	// Use Q/E keys to adjust Z-depth for planet creation
	if(key === 'q' || key === 'Q'){
		planetCreationDepth -= 50;
	}
	else if(key === 'e' || key === 'E'){
		planetCreationDepth += 50;
	}
	// Use O key to toggle orbit visibility
	else if(key === 'o' || key === 'O'){
		showOrbits = !showOrbits;
	}
}

function drawUi(){
	
	if(!creatingPlanet) return;
	
	// Save the current transform matrix
	push();
	
	// Draw preview planet
	translate(mousePressStart.x, mousePressStart.y, mousePressStart.z);
	fill(150);
	stroke(150);
	let selectedPlanetRadius = Planet.getRadius(selectedPlanetMass);
	sphere(selectedPlanetRadius);
	
	pop();
	
	// Draw velocity line
	push();
	stroke(255);
	strokeWeight(2);
	line(mousePressStart.x, mousePressStart.y, mousePressStart.z, 
	     (mouseX - width/2) / scalingFactor, (mouseY - height/2) / scalingFactor, planetCreationDepth);
	pop();
}

function getScalingFactor(){

	return scalingFactor;
}