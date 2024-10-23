
class Body{

	constructor(mass, position, velocity){

		this.mass = mass;
		this.position = position;
		this.velocity = velocity;
        this.acceleration = new p5.Vector();
	}

	applyForce(force){

		let acceleration = force.copy().div(this.mass);
		this.acceleration.add(acceleration);
	}

	update(){

		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}
}
