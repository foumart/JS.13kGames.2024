let ballLaunched = 0;
let ball;
let bouncing;

let bottom;

let bumper1;

const defaultRestitution = .5;

function startGame() {
	console.log("startGame");

	bottom = Rectangle(Vec2(540, 1945), 1080, 90, 0, 1, defaultRestitution);
	// top
	Rectangle(Vec2(540, -80), 1080, 200, 0, 1, defaultRestitution);

	const cornersX = [845,891,935,975,1010,1043,1067,1085,1096,1103];
	const cornersY = [-23,-15,4,29,60,100,140,183,228,275];
	const cornersR = [3.05,2.85,2.65,2.5,2.35,2.2,2.05,1.9,1.75,1.65];

	for (let i = 0; i < 10; i++) {
		rotateShape(Rectangle(Vec2(cornersX[i], cornersY[i]), 50, 90, 0, 1, defaultRestitution), -cornersR[i]);
		rotateShape(Rectangle(Vec2(1080 - cornersX[i], cornersY[i]), 50, 90, 0, 1, defaultRestitution), cornersR[i]);
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

	Rectangle(Vec2(-80, 980), 200, 1980, 0, 1, defaultRestitution);
	Rectangle(Vec2(1160, 980), 200, 1980, 0, 1, defaultRestitution);
	Rectangle(Vec2(990, 1405), 20, 990, 0, 1, defaultRestitution);

	rotateShape(Rectangle(Vec2(200, 1580), 225, 20, 0, 1, defaultRestitution), -2.6);
	rotateShape(Rectangle(Vec2(800, 1580), 225, 20, 0, 1, defaultRestitution), 2.6);
//tmp
	rotateShape(Rectangle(Vec2(100, 1500), 225, 20, 0, 1, defaultRestitution), -2.6);
	rotateShape(Rectangle(Vec2(900, 1500), 225, 20, 0, 1, defaultRestitution), 2.6);
	rotateShape(Rectangle(Vec2(480, 1700), 50, 20, 0, 1, defaultRestitution), -0.5);
	rotateShape(Rectangle(Vec2(520, 1700), 50, 20, 0, 1, defaultRestitution), 0.5);

	bumper1 = Circle(Vec2(550, 390), 90, 0, 10, 200, checkBounce);

	launcher = Rectangle(Vec2(1030, 1650), 60, 500, 0, 1, 0, 1);
	normalizeCharger();

	//                          center, width, height, mass, friction, restitution
	swapperL = Rectangle(Vec2(300, 1650), 300, 20, 0, 100, defaultRestitution, 1);
	rotateShape(swapperL, -2.6);
	//swapperL.W = 125;

	swapperR = Rectangle(Vec2(700, 1650), 300, 20, 0, 100, defaultRestitution, 1);
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
	if (obj == launcher) {
		if (ballLaunched) {
			ballLaunched = false;
			ball.R = 0;
		}
	} else if (obj == swapperL) {//console.log(swapperL.R, ball.v);
		if (swapperL.R != defaultRestitution) {
			ball.V.y -= Math.pow(swapperL.R, 6);
			console.log(swapperL.R, ball.V.y);
			ball.R = swapperL.R;
		}
		//ball.v += swapperL.R * 10;
		/*if (bouncing && swapperL.R != defaultRestitution) {
			ball.V.y *= swapperL.R * 2;
			bouncing = false;
		} else {
			bouncing = true;
			ball.R = swapperL.R;
		}*/
	} else if (obj == swapperR) {
		if (swapperR.R != defaultRestitution) {
			ball.V.y -= Math.pow(swapperR.R, 6);
			console.log(swapperR.R, ball.V.y);
			ball.R = swapperL.R;
		}

		//ball.v += swapperR.R * 10;
		/*if (bouncing && swapperR.R != defaultRestitution) {
			ball.V.y *= swapperR.R * 2;
			bouncing = false;
		} else {
			bouncing = true;
			ball.R = swapperR.R;
		}*/
	}
	//console.log("checkBounce", obj, );
}

function touchEndHandler(event) {//console.log(event);
	// release launcher
	if (charge && !ballLaunched) {
		checkLauncherInteractionEnd();
	}
	// release swappers
	else {
		checkSwappersInteractionEnd();
	}

	if (ball.C.y > 1850) {
		bottom.R = 30;
		ball.R = 30;
		moveShape(bottom, Vec2(0, 2));
		moveShape(ball, Vec2(0, -2));
		let dummy = {a: 0};
		TweenFX.to(dummy, 5, {a: 1}, 2, null,
			() => {
				bottom.R = defaultRestitution;
				ball.R = defaultRestitution;
				moveShape(bottom, Vec2(0, -2));
				moveShape(ball, Vec2(0, 2));
			}
		);
	}
}

function touchStartHandler(event) {//console.log(event.target);
	if (event.target == menuDiv.firstChild || event.target == menuDiv.children[1]) return;

	/*let objR = {rotation: swapperR.G};
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
	);*/
}