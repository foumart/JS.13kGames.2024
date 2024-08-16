class Flipper {
	constructor(x, y, width, height, rotation) {
		this.body = Rectangle(Vec2(x, y), width, height, 0, 1, defaultRestitution, Bounce.flipper);
		rotateShape(this.body, rotation);
		this.rotation = rotation;
		this.tip = Circle(this.updateFlipperTip(), height / 2, 0, 1, defaultRestitution, Bounce.flipper);
		//this.holdingFlipper;
		//this.releasedFlipper;
		this.releaseObj = {};
		this.tween = { frame: -1 };

		/*this.pixelart = getUnit(0);
		gameDiv.appendChild(this.pixelart);
		this.pixelart.style.width = `${224}px`;
		this.pixelart.style.height = `${147}px`;
		this.pixelart.style.left = `${x - 60}px`;
		this.pixelart.style.top = `${y - 42}px`;
		this.pixelart.style.transformOrigin = `50px 40px`;*/
	}

	flipperHandler() {
		this.holdingFlipper = true;
		this.flipperSwing(this.rotation < 0 ? -3.6 : 3.6);
	}

	flipperSwing(rotation) {
		this.releaseObj.killed = true;
		this.tween = { rotation: this.body.G, restitution: this.body.R, frame: 0 };
		TweenFX.to(this.tween, 6, { rotation: rotation, restitution: 2, frame: 6 }, 3,
			() => {
				rotateShape(this.body, this.tween.rotation - this.body.G);
				this.body.R = this.tween.restitution;
				this.moveFlipperTip();//console.log((this.tween.rotation - this.rotation) * 52)
				//this.pixelart.style.transform = `rotate(${(this.tween.rotation - this.rotation) * 56}deg)`;
			},
			() => {
				this.tween.frame = -1;
				this.body.R = defaultRestitution;
				if (this.releasedFlipper) {
					this.releaseFlipper(this.rotation);
					this.releasedFlipper = false;
				} else {
					this.releasedFlipper = 0;
				}
			}
		);
	}

	moveFlipperTip() {
		moveShape(this.tip, substract(this.updateFlipperTip(), this.tip.C));
	}

	updateFlipperTip() {
		const tip1 = this.body.X[this.rotation > 0 ? 1 : 0];
		const tip2 = this.body.X[this.rotation > 0 ? 2 : 3];
		return Vec2((tip1.x + tip2.x)/2, (tip1.y + tip2.y)/2);
	}

	checkInteractionEnd() {
		if (this.holdingFlipper) {
			this.holdingFlipper = false;
			if (this.releasedFlipper || this.releasedFlipper === 0) {
				this.releaseFlipper(this.rotation);
				this.releasedFlipper = false;
			} else {
				this.releasedFlipper = true;
			}
		}
	}

	releaseFlipper(rotation) {
		this.releaseObj = { rotation: this.body.G, restitution: 0.3 }
		TweenFX.to(this.releaseObj, 8, { rotation: rotation, restitution: 0.1 }, 1,
			() => {
				this.body.R = this.releaseObj.restitution;
				rotateShape(this.body, this.releaseObj.rotation - this.body.G);
				this.moveFlipperTip();
				//this.pixelart.style.transform = `rotate(${(this.releaseObj.rotation - this.rotation) * 52}deg)`;
			},
			() => {
				this.body.R = defaultRestitution;
			}
		);
	}
}