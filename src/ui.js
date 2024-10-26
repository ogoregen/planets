
let mousePressStart = new p5.Vector();

function mousePressed(){

	mousePressStart.set(mouseX, mouseY);
}

function mouseReleased(){

	let velocity = p5.Vector.sub(mousePressStart, new p5.Vector(mouseX, mouseY));
	velocity.div(50);
    planets.push(new Planet(100, mousePressStart.copy(), velocity));
}

function drawUi(){

	if(!mouseIsPressed) return;

	stroke(255);
	line(mousePressStart.x, mousePressStart.y, mouseX, mouseY);
}
