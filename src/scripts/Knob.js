class Knob {
	constructor(x, y, radius, strength = 1, letter = null, letterOffsetX = 0, letterOffsetY = 0) {
		this.body = Circle(Vec2(x, y), radius, 0, 1, defaultRestitution, Bounce.knob);
		this.body.parent = this;
		this.strength = strength;
		this.letter = null;
		this.letterOffsetX = 0;
		this.letterOffsetY = 0;

		if (letter) {
			this.letter = letter;
			this.letterOffsetX = letterOffsetX;
			this.letterOffsetY = letterOffsetY;
		}
	}
}
