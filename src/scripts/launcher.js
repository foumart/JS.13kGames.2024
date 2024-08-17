class Launcher {

	constructor(amount) {
		this.body = Rectangle(Vec2(ballLaunchX, 1650), 60, 500, 0, 1, 0, Bounce.launcher);
		this.amount = amount;
		this.createNewBall();
	}

	createNewBall() {
		this.chargingBall = Circle(Vec2(ballLaunchX, ballLaunchY), 30, 10, 1, 0, checkBounce);
		balls.push(this.chargingBall);
		this.normalizeCharger();
		this.addBlocker();
	}

	normalizeCharger() {
		gameDiv.firstChild.style.transform = `scaleY(4)`;
		gameDiv.firstChild.style.top = `1485px`;
	}
	
	chargeHandler(event) {
		if (this.chargingBall && !this.charging && !this.ballLaunched) {
			this.charge = { strength: 5 };
			TweenFX.to(this.charge, 99, {strength: 90}, 2,
				() => {
					if (!this.charge) {
						this.charge = { strength: 1 };
						this.charging = false;
						this.ballLaunched = false;
						//moveShape(this.body, Vec2(0, (this.charge.strength - this.body.R) * 2));
						//moveShape(this.chargingBall, Vec2(0, (this.charge.strength - this.body.R) * 2));
						return;
					}
					// alter physics while charging
					const diff = this.charge.strength - this.body.R;
					this.body.R = this.charge.strength;
					this.chargingBall.R = 0;
					moveShape(this.body, Vec2(0, diff * 2));
					moveShape(this.chargingBall, Vec2(0, diff * 2));
					// modify emoji symbol for the launcher
					gameDiv.firstChild.style.transform = `scaleY(${4 - this.charge.strength / 32})`;
					gameDiv.firstChild.style.top = `${1485 + this.charge.strength}px`;
				}
			);
			this.charging = true;
		}
	}
	
	checkLauncherInteractionEnd() {
		this.charge.killed = true;
		this.chargingBall.R = this.body.R;
		moveShape(this.body, Vec2(0, 1));
		moveShape(this.chargingBall, Vec2(0, -1));
		this.charging = false;
	}

	launchBall() {
		TweenFX.to(this.charge, 5, {dummy: 1}, 0, null, () => {
			this.body.R = defaultRestitution;
			this.ballLaunched = true;
			this.chargingBall.R = defaultRestitution;
			moveShape(this.body, Vec2(0, -this.charge.strength * 2));
			moveShape(this.chargingBall, Vec2(0, -this.charge.strength * 2));
			this.removeBlocker();
			this.normalizeCharger();
			
			TweenFX.to(this.charge, 20, {dummy: 1}, 0, null, () => {
				this.addBlocker();
				this.charge = null;
			});
		});

		//releaseAllBalls();
	}

	addBlocker() {
		if (!this.blocker) {
			this.blocker = Rectangle(Vec2(ballLaunchX, 606), 12, 120, 0, 0, 1);
			rotateShape(this.blocker, 0.7);
		}
	}

	removeBlocker() {
		removeObject(this.blocker);
		this.blocker = null;
	}
}