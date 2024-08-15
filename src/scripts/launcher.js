class Launcher {

	constructor(amount) {
		this.body = Rectangle(Vec2(1030, 1650), 60, 500, 0, 1, 0, 3);
		this.amount = amount;
		this.chargingBall = Circle(Vec2(ballLaunchX, ballLaunchY), 30, 10, 1, 0, checkBounce);
		balls.push(this.chargingBall);
		this.normalizeCharger();
		this.addBlocker();
	}

	normalizeCharger() {
		menuDiv.firstChild.style.transform = `scaleY(4)`;
		menuDiv.firstChild.style.top = `1480px`;
	}
	
	chargeHandler(event) {
		if (this.chargingBall && !this.charging && !this.ballLaunched) {
			this.charge = { strength: 5 };
			TweenFX.to(this.charge, 99, {strength: 90}, 2,
				() => {
					// alter physics while charging
					const diff = this.charge.strength - this.body.R;
					this.body.R = this.charge.strength;
					this.chargingBall.R = 0;
					moveShape(this.body, Vec2(0, diff * 2));
					moveShape(this.chargingBall, Vec2(0, diff * 2));
					// modify emoji symbol for the launcher
					menuDiv.firstChild.style.transform = `scaleY(${4 - this.charge.strength / 32})`;
					menuDiv.firstChild.style.top = `${1480 + this.charge.strength}px`;
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
	}

	addBlocker() {
		if (!this.blocker) {
			this.blocker = Circle(Vec2(1032, 878), 18, 0, 0, 1);
		}
	}

	removeBlocker() {
		removeObject(this.blocker);
		this.blocker = null;
	}
}