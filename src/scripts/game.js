let balls = [];

const ballLaunchX = 1030;
const ballLaunchY = 1369;
const ballSpeedLimit = 3000;
const bottomY = 1100;

let launcher;

let flipperL;
let flipperR;

let bottom;

let kickerL;
let kickerR;

let bumper1;
let bumper2;
let bumper3;
let bumper4;
let bumper5;

const defaultRestitution = .5;

function startGame() {

	// launcher
	launcher = new Launcher(2);

	// flippers
	flipperL = new Flipper(300, bottomY+673, 280, 50, -2.55);
	flipperR = new Flipper(700, bottomY+673, 280, 50, 2.55);
	

	//            center,      radius, mass, friction, restitution
	//balls.push(Circle(Vec2(530, 190), 30, 10, 1, 0, checkBounce));

	// top
	Rectangle(Vec2(540, -80), 1080, 200, 0, 1, defaultRestitution);

	const cornersX = [845,891,935,975,1010,1043,1067,1085,1096,1103];
	const cornersY = [-23,-15,4,29,60,100,140,183,228,275];
	const cornersR = [3.05,2.85,2.65,2.5,2.35,2.2,2.05,1.9,1.75,1.65];

	for (let i = 0; i < 10; i++) {
		rotateShape(Rectangle(Vec2(cornersX[i], cornersY[i]), 250, 99, 0, 1, defaultRestitution), -cornersR[i]);
		rotateShape(Rectangle(Vec2(1080 - cornersX[i], cornersY[i]), 250, 99, 0, 1, defaultRestitution), cornersR[i]);
	}

	bottom = Rectangle(Vec2(540, 1945), 1080, 90, 0, 1, defaultRestitution);

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

	Rectangle(Vec2(-80, 980), 200, 1980, 0, 1, defaultRestitution);// |
	Rectangle(Vec2(1160, 980), 200, 1980, 0, 1, defaultRestitution);// |
	Rectangle(Vec2(990, 1405), 20, 990, 0, 1, defaultRestitution);// |

	bumper1 = new Bumper(350, 360, 90, 9);
	bumper2 = new Bumper(690, 360, 90, 9);
	bumper3 = new Bumper(520, 580, 60, 16);

	bumper4 = new Bumper(425, 150, 30, 6);
	bumper5 = new Bumper(555, 150, 30, 6);

	// bottom part
	Rectangle(Vec2(90, bottomY+282), 20, 200, 0, 1, defaultRestitution); // |
	Rectangle(Vec2(908, bottomY+345), 20, 400, 0, 1, defaultRestitution); // |
	rotateShape(Rectangle(Vec2(180, bottomY+575), 220, 35, 0, 1, defaultRestitution), -2.5); // /
	rotateShape(Rectangle(Vec2(820, bottomY+575), 220, 35, 0, 1, defaultRestitution), 2.5);
	rotateShape(Rectangle(Vec2(285, bottomY+647), 35, 35, 0, 1, defaultRestitution), -2.8);
	rotateShape(Rectangle(Vec2(302, bottomY+650), 20, 20, 0, 1, defaultRestitution), -2); // \
	rotateShape(Rectangle(Vec2(715, bottomY+647), 35, 35, 0, 1, defaultRestitution), 2.8);
	rotateShape(Rectangle(Vec2(698, bottomY+650), 20, 20, 0, 1, defaultRestitution), 2);
//tmp stoppers
	rotateShape(Rectangle(Vec2(100, bottomY+500), 225, 20, 0, 1, defaultRestitution), -2.4);
	rotateShape(Rectangle(Vec2(940, bottomY+100), 75, 20, 0, 1, defaultRestitution), 2.4);
	//rotateShape(Rectangle(Vec2(480, 1730), 50, 20, 0, 1, defaultRestitution), -0.5);
	//rotateShape(Rectangle(Vec2(520, 1730), 50, 20, 0, 1, defaultRestitution), 0.5);


	// left kicker body
	Circle(Vec2(184, bottomY+324), 18, 0, 0, defaultRestitution);
	Circle(Vec2(280, bottomY+532), 18, 0, 0, defaultRestitution);
	Circle(Vec2(206, bottomY+446), 30, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(182, bottomY+382), 20, 120, 0, 1, defaultRestitution), -0.1);
	rotateShape(Rectangle(Vec2(234, bottomY+500), 20, 120, 0, 1, defaultRestitution), 2.3)
	// left kicker bouncer
	kickerL = Rectangle(Vec2(236, bottomY+425), 200, 20, 0, 1, 1, 2);
	rotateShape(kickerL, -2);

	// right kicker body
	Circle(Vec2(816, bottomY+324), 18, 0, 0, defaultRestitution);
	Circle(Vec2(720, bottomY+532), 18, 0, 0, defaultRestitution);
	Circle(Vec2(794, bottomY+446), 30, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(818, bottomY+382), 20, 120, 0, 1, defaultRestitution), 0.1);
	rotateShape(Rectangle(Vec2(766, bottomY+500), 20, 120, 0, 1, defaultRestitution), -2.3)
	// right kicker bouncer
	kickerR = Rectangle(Vec2(764, bottomY+425), 200, 20, 0, 1, 1, 2);
	rotateShape(kickerR, 2);
}

function limitBallSpeed(ball) {if (ball.V.y > 100) console.log(">",ball.V.y)
	if (ball.V.y > ballSpeedLimit) {
		ball.V.y = ballSpeedLimit;
	} else if (ball.V.y < -ballSpeedLimit) {
		ball.V.y = -ballSpeedLimit;
	}

	if (ball.V.x > ballSpeedLimit) {
		ball.V.x = ballSpeedLimit;
	} else if (ball.V.x < -ballSpeedLimit) {
		ball.V.x = -ballSpeedLimit;
	}
}

function checkBounce(obj, ball) {//console.log("B")
	if (obj == flipperL.body || obj == flipperL.tip) {
		if (ball.V.y>100) console.log("<",ball.V.y, flipperL.body.R)
		
		if (flipperL.body.R > defaultRestitution) {
			if (ball.V.y > 0) {
				ball.V.y *= -flipperL.body.R * 2;console.log("=", ball.V.y)
			} else {
				ball.V.y *= flipperL.body.R;console.log("==", ball.V.y)
			}
			
		}
	} else if (obj == flipperR.body || obj == flipperR.tip) {
		if (ball.V.y>100) console.log("<",ball.V.y, flipperR.body.R)
		
		if (flipperR.body.R > defaultRestitution) {
			if (ball.V.y > 0) {
				ball.V.y *= -flipperR.body.R * 2;console.log("=", ball.V.y)
			} else {
				ball.V.y *= flipperR.body.R;console.log("==", ball.V.y)
			}
		}
	} else if (obj == launcher.body) {
		if (launcher.ballLaunched) {
			launcher.ballLaunched = false;
			launcher.addBlocker();
			ball.R = 0;
		} else if (launcher.charge) {
			launcher.launchBall();
		}
	} else if (obj == kickerL) {console.log("kickerL");
		ball.V.y /= 2;
		ball.V.y -= 600 + ball.V.y / 2;
		ball.V.x /= 3;
		ball.V.x += 1600;// - (ball.V.x > 0 ? ball.V.x / 2 : -ball.V.x / 2);
	} else if (obj == kickerR) {console.log("kickerR");
		ball.V.y /= 2;
		ball.V.y -= 600 + ball.V.y / 2;
		ball.V.x /= 3;
		ball.V.x -= 1600;// - (ball.V.x > 0 ? -ball.V.x / 2 : ball.V.x / 2);
	} else if (obj == bumper1.body || obj == bumper2.body || obj == bumper3.body || obj == bumper4.body || obj == bumper5.body) {
		console.log("bumperO");
		ball.G = 0;
		ball.v = 0;
		ball.V.x = (ball.C.x - obj.C.x) * obj.parent.strength;
		ball.V.y = (ball.C.y - obj.C.y) * obj.parent.strength;
	}

	limitBallSpeed(ball);
}

function chargerHandler() {
	launcher.chargeHandler();
}

function leftFlipperHandler() {
	flipperL.flipperHandler();
}

function rightFlipperHandler() {
	flipperR.flipperHandler();
}

function resetBall() {
	for (let i = 0; i < balls.length; i++) {
		let ball = balls[i];
		if (ball.C.y > 1850 || ball.C.y < 0 || ball.C.x > 1060 || ball.C.x < 0) {
			ball.C.x = ballLaunchX;
			ball.C.y = ballLaunchY;
			ball.G = 0;
			ball.V.x = 0;
			ball.V.y = 0;
			ball.v = 0;
			break;
		}
	}
}
