
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
		
		let timeScale = getTimeScaleInput();
		
		planets[i].update(timeScale);
		planets[i].display();
		
		for(let j = i - 1; j >= 0; j--){
			
			Planet.attract(planets[i], planets[j]);
			
			if(!Planet.shouldCollide(planets[i], planets[j])) continue;
			
			let planet = Planet.collide(planets[i], planets[j]);
			if(!planet) continue;
			
			planets[j] = planet;
			planets.splice(i, 1);
			break;
		}
	}
	
	drawUi();
}
