class Bumper {
	constructor(x, y, radius, strength) {
		this.body = Circle(Vec2(x, y), radius, 0, 1, 1, Bounce.bumper);
		this.body.parent = this;
		this.strength = strength;
	}
}