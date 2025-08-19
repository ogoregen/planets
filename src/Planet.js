
/*
 * G being greater than real results in attraction forces with higher magnitudes.
 */
const GRAVITATIONAL_CONSTANT = 0.2;

class Planet extends Body{
	
	static #density = 10;
	radius;
	
	constructor(mass, position, velocity){
		
		super(mass, position, velocity);
		
		this.radius = Planet.getRadius(mass);
	}
	
	draw(){
		
		push();
		
		// Add basic lighting for 3D effect
		ambientLight(60, 60, 60);
		directionalLight(255, 255, 255, -1, 0.5, -1);
		
		translate(this.position.x, this.position.y, this.position.z);
		
		// Color planets based on mass for better visual differentiation
		if(this.mass > 100000) {
			fill(255, 255, 100); // Large planets: yellowish (star-like)
		} else if(this.mass > 5000) {
			fill(100, 150, 255); // Medium planets: blueish
		} else if(this.mass > 500) {
			fill(150, 255, 150); // Small planets: greenish
		} else {
			fill(255, 100, 100); // Tiny planets: reddish
		}
		
		stroke(255);
		strokeWeight(0.5);
		sphere(this.radius);
		pop();
	}
	
	static getRadius(mass){
		
		let volume = mass / Planet.#density;
		return Math.pow(3 * volume / 4 * Math.PI, 1/3);
	}
	
	/*
	 * Law of gravitation
	 *     F = G * m1 * m2 / r^2
	 */
	static applyGravitationalForce(planet1, planet2){
		
		if(planet1 == planet2) return;
		
		let direction = p5.Vector.sub(planet1.position, planet2.position);
		let distance = direction.mag();
		let magnitude = GRAVITATIONAL_CONSTANT * planet1.mass * planet2.mass / Math.pow(distance, 2);
		
		let force = direction;
		force.setMag(magnitude);
		
		planet2.applyForce(force);
		
		force.rotate(Math.PI);
		planet1.applyForce(force);
	}
	
	static shouldCollide(planet1, planet2){
		
		if(planet1 == planet2) return false;
		
		let distance = p5.Vector.dist(planet1.position, planet2.position);
		return distance <= planet1.radius + planet2.radius;
	}
	
	/*
	 * Conservation of momentum
	 *     p1 + p2 = p3
	 */
	static collide(planet1, planet2){
		
		if(planet1 == planet2) return;
		
		let momentum = p5.Vector.add(planet1.momentum, planet2.momentum);
		let mass = planet1.mass + planet2.mass;
		let velocity = p5.Vector.div(momentum, mass);
		
		let lerpWeight = map(planet2.mass - planet1.mass, -planet1.mass, planet2.mass, 0, 1);
		let position = p5.Vector.lerp(planet1.position, planet2.position, lerpWeight);
		
		return new Planet(mass, position, velocity);
	}
}
