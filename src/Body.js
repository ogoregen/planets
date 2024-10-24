
class Body{

	#acceleration;
	velocity;
	position;
	mass;
	
	constructor(mass, position, velocity){

		this.mass = mass;
		this.position = position;
		this.velocity = velocity;
		this.#acceleration = new p5.Vector(0, 0);
	}

	/*
	 * Second law of motion
	 *     F = m * a
	 */
	applyForce(force){

		let acceleration = force.copy().div(this.mass);
		this.#acceleration.add(acceleration);
	}

	/*
	 * Euler integration
	 */
	update(){

		this.velocity.add(this.#acceleration);
		this.position.add(this.velocity);
		this.#acceleration.mult(0);
	}
}
