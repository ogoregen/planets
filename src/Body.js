
class Body{

	#acceleration;
	#velocity;
	position;
	mass;
	
	constructor(mass, position, velocity){

		this.mass = mass;
		this.position = position;
		this.#velocity = velocity;
		this.#acceleration = new p5.Vector(0, 0);
	}

	/*
	 * Momentum
	 *     p = m * V
	 */
	get momentum(){

		return p5.Vector.mult(this.#velocity, this.mass);
	}

	/*
	 * Second law of motion
	 *     F = m * a
	 */
	applyForce(force){

		let acceleration = p5.Vector.div(force, this.mass);
		this.#acceleration.add(acceleration);
	}

	/*
	 * Euler integration
	 */
	update(timeScale = 1){

		this.#velocity.add(p5.Vector.mult(this.#acceleration, timeScale));
		this.position.add(p5.Vector.mult(this.#velocity, timeScale));
		this.#acceleration.set(0, 0);
	}
}
