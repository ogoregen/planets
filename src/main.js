
let planets = [];
let mousePressStart = new p5.Vector();

function setup(){

	createCanvas(windowWidth, windowHeight);

	planets.push(new Planet(6000, new p5.Vector(width/2, height/2), new p5.Vector(0, 0)));
	planets.push(new Planet(500, new p5.Vector(width/2-height/2, height/2), new p5.Vector(0, 5)));
	planets.push(new Planet(500, new p5.Vector(width/2-height/4, height/2), new p5.Vector(0, -5)));
}

function draw(){

	background(0);

	for(let i = 0; i < planets.length; i++){
		
		planets[i].update();
		planets[i].display();

		for(let j = 0; j < planets.length; j++){

			Planet.attract(planets[i], planets[j]);
			
			if(!Planet.shouldCollide(planets[i], planets[j])) continue;

			let planet = Planet.collide(planets[i], planets[j]);
			if(!planet) continue;

			planets[j] = planet;
			planets.splice(i, 1);
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
    planets.push(new Planet(1000, mousePressStart.copy(), velocity));
}

function drawHud(){

	if(!mouseIsPressed) return;

	stroke(255);
	line(mousePressStart.x, mousePressStart.y, mouseX, mouseY);
}
