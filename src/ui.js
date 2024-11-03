
const MIN_PLANET_MASS = 10;
const DEFAULT_PLANET_MASS = 100;

let selectedPlanetMass = DEFAULT_PLANET_MASS;
let mousePressStart = new p5.Vector();
let creatingPlanet = false;
let scalingFactor = 1.0;

function mousePressed(){
	
	if(isMousePressUsedByDom()) return;
	
	creatingPlanet = true
	selectedPlanetMass = DEFAULT_PLANET_MASS;
	mousePressStart.set(mouseX - width/2, mouseY - height/2);
	mousePressStart.div(scalingFactor);
}

function mouseReleased(){

	if(!creatingPlanet) return;
	
	let velocity = p5.Vector.sub(mousePressStart, new p5.Vector((mouseX - width/2) / scalingFactor, (mouseY - height/2) / scalingFactor));
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

function drawUi(){
	
	if(!creatingPlanet) return;
	
	fill(150);
	stroke(150);
	let selectedPlanetDiameter = Planet.getRadius(selectedPlanetMass) * 2;
	ellipse(mousePressStart.x, mousePressStart.y, selectedPlanetDiameter);
	
	stroke(255);
	line(mousePressStart.x, mousePressStart.y, (mouseX - width/2) / scalingFactor, (mouseY - height/2) / scalingFactor);
}

function getScalingFactor(){

	return scalingFactor;
}