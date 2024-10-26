
const MIN_PLANET_MASS = 10;
const DEFAULT_PLANET_MASS = 100;

let selectedPlanetMass = DEFAULT_PLANET_MASS;
let mousePressStart = new p5.Vector();

function mousePressed(){

	selectedPlanetMass = DEFAULT_PLANET_MASS;
	mousePressStart.set(mouseX, mouseY);
}

function mouseReleased(){

	let velocity = p5.Vector.sub(mousePressStart, new p5.Vector(mouseX, mouseY));
	velocity.div(50);
    planets.push(new Planet(selectedPlanetMass, mousePressStart.copy(), velocity));
}

function mouseWheel(event){

	selectedPlanetMass += event.delta * 20;
	selectedPlanetMass = Math.max(selectedPlanetMass, MIN_PLANET_MASS);
}

function drawUi(){

	if(!mouseIsPressed) return;

	fill(150);
	stroke(150);
	let selectedPlanetDiameter = Planet.getRadius(selectedPlanetMass) * 2;
	ellipse(mousePressStart.x, mousePressStart.y, selectedPlanetDiameter);

	stroke(255);
	line(mousePressStart.x, mousePressStart.y, mouseX, mouseY);
}
