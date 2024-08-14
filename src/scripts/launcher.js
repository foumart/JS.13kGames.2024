let charge;
let launcher;
let charging;

function normalizeCharger() {
	menuDiv.firstChild.style.transform = `scaleY(4)`;
	menuDiv.firstChild.style.top = `1480px`;
}

function chargeHandler(event) {
	if (!charging && !ballLaunched) {
		charge = { strength: 5 };
		TweenFX.to(charge, 99, {strength: 90}, 2,
			() => {
				// alter physics while charging
				const diff = charge.strength - launcher.R;
				launcher.R = charge.strength;
				ball.R = 0;
				moveShape(launcher, Vec2(0, diff * 2));
				moveShape(ball, Vec2(0, diff * 2));
				// modify emoji symbol for the launcher
				menuDiv.firstChild.style.transform = `scaleY(${4 - charge.strength / 32})`;
				menuDiv.firstChild.style.top = `${1480 + charge.strength}px`;
			}
		);
		charging = true;
	}
}


function checkLauncherInteractionEnd() {
	charge.killed = true;
	ball.R = launcher.R;
	moveShape(launcher, Vec2(0, 1));
	moveShape(ball, Vec2(0, -1));
	
	let dummy = {a: 0};
	TweenFX.to(dummy, 5, {a: 1}, 2, null,
		() => {
			ballLaunched = true;
			launcher.R = defaultRestitution;
			ball.R = defaultRestitution;
			moveShape(launcher, Vec2(0, -charge.strength * 2));
			moveShape(ball, Vec2(0, -charge.strength * 2));

			normalizeCharger();
			charge = null;
		}
	);

	charging = false;
}