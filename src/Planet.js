
class Planet extends Body{

	#density = 1;
	radius;

	constructor(mass, position, velocity){
      
		super(mass, position, velocity);
    
		let volume = this.mass / this.#density;
		this.radius = Math.pow(3 * volume / 4 * Math.PI, 1/3);
	}

	display(){
		
		fill(255);
		ellipse(this.position.x, this.position.y, this.radius * 2);
	}

	/*
	 * Law of gravitation
	 *     F = G * m1 * m2 / r^2
	 * 
	 * Gravitational constant G is taken 1 resulting in attraction forces with greatly higher magnitudes.
	 */
	static attract(planet1, planet2){

		if(planet1 == planet2) return;

		let force = p5.Vector.sub(planet1.position, planet2.position);
		force.normalize();

		let distance = p5.Vector.dist(planet1.position, planet2.position);
		let magnitude = planet1.mass * planet2.mass / Math.pow(distance, 2);

		force.mult(magnitude);

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
	 * Momentum
	 *     p = m * V
	 * Conservation of momentum
	 *     p1 + p2 = p3
	 */
	static collide(planet1, planet2){

		if(planet1 == planet2) return;
		
		let velocity = p5.Vector.mult(planet1.velocity, planet1.mass);
		velocity.add(p5.Vector.mult(planet2.velocity, planet2.mass));

		let mass = planet1.mass + planet2.mass;
		velocity.div(mass);

		let position = p5.Vector.lerp(planet1.position, planet2.position, 0.5);

		return new Planet(mass, position, velocity);
	}
}
