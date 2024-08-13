let swapperL;
let swapperR;

let ballLaunched;
let ball;

let charge;
let charger;
let charging;

let bottom;

const defaultRestitution = .5;

function startGame() {
	console.log("startGame");

	bottom = Rectangle(Vec2(540, 1910), 1080, 20, 0, 1, defaultRestitution);
	Rectangle(Vec2(540, 10), 1080, 20, 0, 1, defaultRestitution);

	const cornersX = [810, 856,900,940,975,1008,1032,1050,1061,1068];
	const cornersY = [12,20,39,64,95,135,175,218,263,310];
	const cornersR = [3.05,2.85,2.65,2.5,2.35,2.2,2.05,1.9,1.75,1.65];

	for (let i = 0; i < 10; i++) {
		rotateShape(Rectangle(Vec2(cornersX[i], cornersY[i]), 50, 20, 0, 1, defaultRestitution), -cornersR[i]);
		rotateShape(Rectangle(Vec2(1080 - cornersX[i], cornersY[i]), 50, 20, 0, 1, defaultRestitution), cornersR[i]);
	}

	/*rotateShape(Rectangle(Vec2(810, 12), 50, 20, 0, 1, defaultRestitution), -3.05);
	rotateShape(Rectangle(Vec2(856, 20), 50, 20, 0, 1, defaultRestitution), -2.85);
	rotateShape(Rectangle(Vec2(900, 39), 50, 20, 0, 1, defaultRestitution), -2.65);
	rotateShape(Rectangle(Vec2(940, 64), 50, 20, 0, 1, defaultRestitution), -2.5);
	rotateShape(Rectangle(Vec2(975, 95), 50, 20, 0, 1, defaultRestitution), -2.35);
	rotateShape(Rectangle(Vec2(1008, 135), 50, 20, 0, 1, defaultRestitution), -2.2);
	rotateShape(Rectangle(Vec2(1032, 175), 50, 20, 0, 1, defaultRestitution), -2.05);
	rotateShape(Rectangle(Vec2(1050, 218), 50, 20, 0, 1, defaultRestitution), -1.9);
	rotateShape(Rectangle(Vec2(1061, 263), 50, 20, 0, 1, defaultRestitution), -1.75);
	rotateShape(Rectangle(Vec2(1068, 310), 50, 20, 0, 1, defaultRestitution), -1.65);*/

	Rectangle(Vec2(10, 980), 20, 1980, 0, 1, defaultRestitution);
	Rectangle(Vec2(1070, 980), 20, 1980, 0, 1, defaultRestitution);
	Rectangle(Vec2(990, 1405), 20, 990, 0, 1, defaultRestitution);

	rotateShape(Rectangle(Vec2(200, 1590), 225, 20, 0, 1, defaultRestitution), -2.6);
	rotateShape(Rectangle(Vec2(800, 1590), 225, 20, 0, 1, defaultRestitution), 2.6);

	charger = Rectangle(Vec2(1030, 1650), 60, 500, 0, 1, 0, 1);
	normalizeCharger();

	//            center, width, height, mass, friction, restitution
	swapperL = Rectangle(Vec2(300, 1650), 300, 20, 0, 1, defaultRestitution);
	rotateShape(swapperL, -2.6);
	//swapperL.W = 125;

	swapperR = Rectangle(Vec2(700, 1650), 300, 20, 0, 1, defaultRestitution);
	rotateShape(swapperR, 2.6);
	//swapperR.W = 125;

	//            center,      radius, mass, friction, restitution
	ball = Circle(Vec2(1030, 990), 30, 10, 1, 0, checkBounce);

	/*let r = Rectangle(Vec2(500, 200), 400, 20, 0, 1, .5);
	rotateShape(r, 2.8);
	Rectangle(Vec2(200, 400), 400, 20, 0, 1, .5);
	Rectangle(Vec2(100, 200), 200, 20, 0, 1, .5);
	Rectangle(Vec2(10, 360), 20, 100, 0, 1, .5);

	for(var i = 0; i < 30; i++){
		r = Circle(Vec2(Math.random() * 800, Math.random() * 450 / 2), Math.random() * 20 + 10, Math.random() * 30, Math.random() / 2, Math.random() / 2);
		rotateShape(r, Math.random() * 7);
		r = Rectangle(Vec2(Math.random() * 800, Math.random() * 450 / 2), Math.random() * 20 + 10, Math.random() * 20 + 10, Math.random() * 30, Math.random() / 2, Math.random() / 2);
		rotateShape(r, Math.random() * 7);
	}*/
}

function checkBounce(obj) {
	if (obj == charger) {
		if (ballLaunched) {
			if (charger.O == 1) {
				charger.O = 0;
			}
			ballLaunched = false;
		} else {
			charger.O = 1;
		}
	}
	console.log("checkBounce", obj);
}

function normalizeCharger() {
	menuDiv.firstChild.style.transform = `scaleY(4)`;
	menuDiv.firstChild.style.top = `1480px`;
}

function touchEndHandler(event) {//console.log(event);
	if (charge && !ballLaunched) {
		charge.killed = true;
		ball.R = charger.R;
		moveShape(charger, Vec2(0, 1));
		moveShape(ball, Vec2(0, -1));
		
		let dummy = {a: 0};
		TweenFX.to(dummy, 5, {a: 1}, 2, null,
			() => {
				ballLaunched = true;
				charger.R = defaultRestitution;
				ball.R = defaultRestitution;
				moveShape(charger, Vec2(0, -charge.strength * 2));
				moveShape(ball, Vec2(0, -charge.strength * 2));

				normalizeCharger();
				charge = null;
			}
		);

		charging = false;
	}

	/*if (ball.C.y > 1850) {
		bottom.R = 30;
		ball.R = 30;
		moveShape(bottom, Vec2(0, 2));
		moveShape(ball, Vec2(0, -2));
		let dummy = {a: 0};
		TweenFX.to(dummy, 3, {a: 1}, 2, null,
			() => {
				bottom.R = defaultRestitution;
				ball.R = defaultRestitution;
				moveShape(bottom, Vec2(0, -4));
				moveShape(ball, Vec2(0, 4));
			}
		);
	}*/
}

function chargeHandler(event) {
	if (!charging && !ballLaunched) {
		charge = { strength: 0 };
		TweenFX.to(charge, 30, {strength: 60}, 2,
			() => {
				// alter physics while charging
				const diff = charge.strength - charger.R;
				charger.R = charge.strength;
				ball.R = 0;
				moveShape(charger, Vec2(0, diff * 2));
				moveShape(ball, Vec2(0, diff * 2));
				// modify emoji symbol for the charger
				menuDiv.firstChild.style.transform = `scaleY(${4 - charge.strength / 32})`;
				menuDiv.firstChild.style.top = `${1480 + charge.strength}px`;
			}
		);
		charging = true;
	}
}

function touchStartHandler(event) {console.log(event.target);
	if (event.target == menuDiv.firstChild || event.target == menuDiv.children[1]) return;

	let obj = {rotation: swapperL.G};
	TweenFX.to(obj, 6, {rotation: -4}, 2,
		() => {
			swapperL.R = 2;
			rotateShape(swapperL, obj.rotation - swapperL.G);
		},
		() => {
			TweenFX.to(obj, 10, {rotation: -2.6}, 1,
				() => {
					rotateShape(swapperL, obj.rotation - swapperL.G);
				},
				() => {
					swapperL.R = 0.7;
				}
			);
		}
	);

	let objR = {rotation: swapperR.G};
	TweenFX.to(objR, 6, {rotation: 4}, 2,
		() => {
			swapperR.R = 2;
			rotateShape(swapperR, objR.rotation - swapperR.G);
		},
		() => {
			TweenFX.to(objR, 10, {rotation: 2.6}, 1,
				() => {
					rotateShape(swapperR, objR.rotation - swapperR.G);
				},
				() => {
					swapperR.R = 0.7;
				}
			);
		}
	);
}