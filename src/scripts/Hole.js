class Hole {
	constructor(x, y, rx, ry, rw, rh, rr) {
		this.body = Circle(Vec2(x, y), 5, 0, 1, defaultRestitution, Bounce.hole);
		this.body.parent = this;
		this.rx = rx;
		this.ry = ry;
		this.rw = rw;
		this.rh = rh;
		this.rr = rr;
	}

	hold() {
		removeObject(this.body);
		this.plug = Rectangle(Vec2(this.rx, this.ry), this.rw, this.rh, 0, 1, defaultRestitution, Bounce.hole);
		rotateShape(this.plug, this.rr);
	}
}