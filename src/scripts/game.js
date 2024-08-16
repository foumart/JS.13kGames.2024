let balls = [];

const ballLaunchX = 1030;
const ballLaunchY = 1369;
const ballSpeedLimit = 3500;
const bottomY = 1100;

let launcher;

let flipperL;
let flipperR;

let bottomLeft;
let bottomRight;

let kickerL;
let kickerR;

let bumper1;
let bumper2;
let bumper3;
let bumper4;
let bumper5;

let hole1;
let hole2;
let hole3;

const defaultRestitution = .5;

const Bounce = {
	flipper: 1,
	bumper: 2,
	launcher: 3,
	hole: 4,
	bottom: 5
}

function startGame() {

	// launcher
	launcher = new Launcher(2);

	// flippers
	flipperL = new Flipper(300, bottomY+673, 280, 50, -2.55);
	flipperR = new Flipper(700, bottomY+673, 280, 50, 2.55);

	// frame
	Rectangle(Vec2(540, -80), 1080, 200, 0, 1, defaultRestitution);
	bottomLeft = Rectangle(Vec2(50, 1870), 90, 99, 0, 1, defaultRestitution, Bounce.bottom);
	bottomRight = Rectangle(Vec2(950, 1870), 90, 99, 0, 1, defaultRestitution, Bounce.bottom);
	Rectangle(Vec2(1030, 1945), 90, 90, 0, 1, defaultRestitution);
	Rectangle(Vec2(-80, 980), 200, 1980, 0, 1, defaultRestitution);// |
	Rectangle(Vec2(1160, 980), 200, 1980, 0, 1, defaultRestitution);// |
	Rectangle(Vec2(990, 1280), 20, 1240, 0, 1, defaultRestitution);// |
	Rectangle(Vec2(995, 655), 10, 20, 0, 1, defaultRestitution);
	rotateShape(Rectangle(Vec2(991, 652), 10, 20, 0, 1, defaultRestitution), 0.5);
	Circle(Vec2(996, 642), 4, 0, 0, defaultRestitution);

	bumper1 = new Bumper(425, 425, 70, 16);
	bumper2 = new Bumper(675, 465, 70, 16);
	bumper3 = new Bumper(525, 650, 70, 16);

	//bumper4 = new Bumper(425, 150, 30, 9);
	//bumper5 = new Bumper(555, 150, 30, 9);

	// top grid
	Circle(Vec2(275, 100), 10, 0, 0, defaultRestitution);
	Rectangle(Vec2(275, 152), 20, 105, 0, 1, defaultRestitution);
	Circle(Vec2(275, 203), 10, 0, 0, defaultRestitution);

	Circle(Vec2(355, 125), 10, 0, 0, defaultRestitution);
	Rectangle(Vec2(355, 170), 20, 90, 0, 1, defaultRestitution);
	Circle(Vec2(355, 215), 10, 0, 0, defaultRestitution);

	Circle(Vec2(435, 145), 10, 0, 0, defaultRestitution);
	Rectangle(Vec2(435, 190), 20, 90, 0, 1, defaultRestitution);
	Circle(Vec2(435, 235), 10, 0, 0, defaultRestitution);

	Circle(Vec2(515, 158), 10, 0, 0, defaultRestitution);
	Rectangle(Vec2(515, 203), 20, 90, 0, 1, defaultRestitution);
	Circle(Vec2(515, 248), 10, 0, 0, defaultRestitution);

	Circle(Vec2(595, 170), 10, 0, 0, defaultRestitution);
	Rectangle(Vec2(595, 215), 20, 90, 0, 1, defaultRestitution);
	Circle(Vec2(595, 260), 10, 0, 0, defaultRestitution);

	// top right hole
	rotateShape(Rectangle(Vec2(820, 14), 110, 30, 0, 1, defaultRestitution), -0.1);
	Rectangle(Vec2(746, 24), 45, 20, 0, 1, defaultRestitution);
	rotateShape(Rectangle(Vec2(600, 15), 250, 25, 0, 1, defaultRestitution), 0.05);
	Rectangle(Vec2(937, 5), 90, 220, 0, 1, defaultRestitution);
	hole1 = new Hole(862, 53, 748, 60, 50, 80, -0.2);
	rotateShape(Rectangle(Vec2(1060, 125), 280, 200, 0, 1, defaultRestitution), 0.75);
	rotateShape(Rectangle(Vec2(835, 100), 110, 20, 0, 1, defaultRestitution), -0.05);
	rotateShape(Rectangle(Vec2(895, 30), 40, 20, 0, 1, defaultRestitution), 1);
	rotateShape(Rectangle(Vec2(895, 80), 40, 20, 0, 1, defaultRestitution), 2.1);
	rotateShape(Rectangle(Vec2(884, 20), 40, 20, 0, 1, defaultRestitution), 0.5);
	rotateShape(Rectangle(Vec2(884, 88), 40, 20, 0, 1, defaultRestitution), 2.6);
	rotateShape(Rectangle(Vec2(862, 95), 60, 20, 0, 1, defaultRestitution), 3);
	rotateShape(Rectangle(Vec2(760, 101), 40, 12, 0, 1, defaultRestitution), -0.05);
	rotateShape(Rectangle(Vec2(760, 107), 45, 12, 0, 1, defaultRestitution), 0.1);
	Circle(Vec2(738, 103), 7, 0, 0, defaultRestitution);

	const cornersX = [845,891,935,975,1010,1043,1067,1085,1096,1103];
	const cornersY = [-18,-5,14,39,70,110,150,193,238,285];
	const cornersR = [3,2.85,2.65,2.5,2.35,2.2,2.05,1.9,1.75,1.65];

	for (let i = 0; i < 10; i++) {
		rotateShape(Rectangle(Vec2(320 + cornersX[i] * 0.6, cornersY[i] * 0.7 + 200), 50 + i*10, 10, 0, 1, defaultRestitution), -cornersR[i]);
		rotateShape(Rectangle(Vec2(134 + cornersX[i] * 0.85, cornersY[i] * 0.9 + 132), 150, 22, 0, 1, defaultRestitution), -cornersR[i]);
		rotateShape(Rectangle(Vec2(1080 - cornersX[i], cornersY[i]), 250, 99, 0, 1, defaultRestitution), cornersR[i]);
		rotateShape(Rectangle(Vec2(505 - cornersX[i] * 0.3, cornersY[i] * 0.55 + 222), 50 + i*10, 10, 0, 1, defaultRestitution), cornersR[i]);
	}

	// right canal
	Circle(Vec2(800, 184), 5, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(865, 197), 10, 35, 0, 1, defaultRestitution), -1.2);
	rotateShape(Rectangle(Vec2(896, 214), 10, 35, 0, 1, defaultRestitution), -1);
	rotateShape(Rectangle(Vec2(925, 238), 10, 35, 0, 1, defaultRestitution), -0.82);
	rotateShape(Rectangle(Vec2(947, 264), 10, 35, 0, 1, defaultRestitution), -0.65);
	rotateShape(Rectangle(Vec2(965, 295), 10, 35, 0, 1, defaultRestitution), -0.45);
	rotateShape(Rectangle(Vec2(980, 333), 10, 35, 0, 1, defaultRestitution), -0.3);
	rotateShape(Rectangle(Vec2(989, 375), 10, 40, 0, 1, defaultRestitution), -0.15);
	rotateShape(Rectangle(Vec2(994, 425), 10, 70, 0, 1, defaultRestitution), -0.06);
	Rectangle(Vec2(991, 495), 18, 66, 0, 1, defaultRestitution);
	
	rotateShape(Rectangle(Vec2(987, 525), 10, 28, 0, 1, defaultRestitution), 0.1);
	rotateShape(Rectangle(Vec2(991, 534), 10, 20, 0, 1, defaultRestitution), 0.5);
	Circle(Vec2(985, 542), 5, 0, 0, defaultRestitution);

	// left canal
	rotateShape(Rectangle(Vec2(256, 118), 50, 40, 0, 1, defaultRestitution), 1.42);
	rotateShape(Rectangle(Vec2(224, 122), 40, 40, 0, 1, defaultRestitution), 1.2);
	rotateShape(Rectangle(Vec2(188, 129), 20, 40, 0, 1, defaultRestitution), 1);
	rotateShape(Rectangle(Vec2(162, 147), 15, 40, 0, 1, defaultRestitution), 0.8);
	rotateShape(Rectangle(Vec2(138, 174), 14, 40, 0, 1, defaultRestitution), 0.64);
	rotateShape(Rectangle(Vec2(118, 205), 13, 40, 0, 1, defaultRestitution), 0.45);
	rotateShape(Rectangle(Vec2(102, 243), 12, 40, 0, 1, defaultRestitution), 0.3);
	rotateShape(Rectangle(Vec2(92, 285), 11, 45, 0, 1, defaultRestitution), 0.15);
	rotateShape(Rectangle(Vec2(86, 335), 10, 70, 0, 1, defaultRestitution), 0.06);
	Rectangle(Vec2(85, 410), 10, 90, 0, 1, defaultRestitution);
	rotateShape(Rectangle(Vec2(90, 410), 10, 90, 0, 1, defaultRestitution), -0.1);
	Circle(Vec2(90, 455), 11, 0, 0, defaultRestitution);
	// left canal inside
	rotateShape(Rectangle(Vec2(162, 418), 10, 70, 0, 1, defaultRestitution), -0.1);
	rotateShape(Rectangle(Vec2(161, 365), 15, 35, 0, 1, defaultRestitution), 0.05);
	rotateShape(Rectangle(Vec2(165, 330), 15, 35, 0, 1, defaultRestitution), 0.15);
	rotateShape(Rectangle(Vec2(171, 302), 15, 35, 0, 1, defaultRestitution), 0.25);
	rotateShape(Rectangle(Vec2(180, 272), 15, 30, 0, 1, defaultRestitution), 0.35);
	rotateShape(Rectangle(Vec2(193, 245), 15, 30, 0, 1, defaultRestitution), 0.5);
	rotateShape(Rectangle(Vec2(209, 222), 15, 30, 0, 1, defaultRestitution), 0.7);
	rotateShape(Rectangle(Vec2(228, 202), 25, 30, 0, 1, defaultRestitution), 0.4);
	Rectangle(Vec2(244, 172), 52, 80, 0, 1, defaultRestitution);
	rotateShape(Rectangle(Vec2(236, 150), 55, 60, 0, 1, defaultRestitution), -0.4);
	rotateShape(Rectangle(Vec2(226, 140), 55, 50, 0, 1, defaultRestitution), -0.8);
	hole2 = new Hole(186, 182, 125, 432, 80, 60, -0.1);
	rotateShape(Rectangle(Vec2(200, 141), 25, 40, 0, 1, defaultRestitution), -1.3);
	rotateShape(Rectangle(Vec2(174, 147), 12, 30, 0, 1, defaultRestitution), -1.8);
	Circle(Vec2(167, 452), 7, 0, 0, defaultRestitution);

	// right chut
	Circle(Vec2(794, 255), 12, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(815, 264), 25, 40, 0, 1, defaultRestitution), -1.15);
	rotateShape(Rectangle(Vec2(842, 284), 28, 40, 0, 1, defaultRestitution), -0.8);
	rotateShape(Rectangle(Vec2(865, 312), 29, 40, 0, 1, defaultRestitution), -0.6);
	rotateShape(Rectangle(Vec2(882, 345), 30, 40, 0, 1, defaultRestitution), -0.4);
	rotateShape(Rectangle(Vec2(893, 382), 31, 40, 0, 1, defaultRestitution), -0.2);
	rotateShape(Rectangle(Vec2(898, 420), 32, 40, 0, 1, defaultRestitution), -0.1);
	Rectangle(Vec2(900, 466), 33, 60, 0, 1, defaultRestitution);
	rotateShape(Rectangle(Vec2(894, 520), 33, 60, 0, 1, defaultRestitution), 0.2);
	rotateShape(Rectangle(Vec2(877, 578), 34, 70, 0, 1, defaultRestitution), 0.35);
	rotateShape(Rectangle(Vec2(847, 642), 35, 80, 0, 1, defaultRestitution), 0.5);
	rotateShape(Rectangle(Vec2(788, 742), 36, 172, 0, 1, defaultRestitution), 0.55);
	rotateShape(Rectangle(Vec2(818, 725), 30, 235, 0, 1, defaultRestitution), 0.4);
	Circle(Vec2(739, 813), 13, 0, 0, defaultRestitution);
	Circle(Vec2(774, 834), 13, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(756, 826), 20, 40, 0, 1, defaultRestitution), -1);

	// right triangle
	Circle(Vec2(912, 739), 7, 0, 0, defaultRestitution);
	Rectangle(Vec2(905, 980), 26, 380, 0, 1, defaultRestitution);
	Rectangle(Vec2(872, 1040), 50, 250, 0, 1, defaultRestitution);
	Rectangle(Vec2(911, 765), 13, 50, 0, 1, defaultRestitution);
	rotateShape(Rectangle(Vec2(884, 890), 35, 75, 0, 1, defaultRestitution), 0.4);
	rotateShape(Rectangle(Vec2(894, 800), 15, 120, 0, 1, defaultRestitution), 0.3);
	rotateShape(Rectangle(Vec2(868, 873), 20, 190, 0, 1, defaultRestitution), 0.36);
	Circle(Vec2(906, 1170), 12, 0, 0, defaultRestitution);
	Rectangle(Vec2(886, 1172), 40, 20, 0, 1, defaultRestitution);
	Circle(Vec2(866, 1170), 12, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(840, 1036), 90, 160, 0, 1, defaultRestitution), 0.4);
	Circle(Vec2(782, 1104), 18, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(840, 1111), 99, 90, 0, 1, defaultRestitution), 0.6);

	// bottom left rear
	Circle(Vec2(127, bottomY+161), 13, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(95, bottomY+194), 24, 20, 0, 1, defaultRestitution), 0.5);
	rotateShape(Rectangle(Vec2(111, bottomY+174), 22, 42, 0, 1, defaultRestitution), 0.8);
	Rectangle(Vec2(90, bottomY+360), 20, 325, 0, 1, defaultRestitution); // |
	rotateShape(Rectangle(Vec2(103, bottomY+450), 20, 175, 0, 1, defaultRestitution), -0.15);
	rotateShape(Rectangle(Vec2(118, bottomY+508), 20, 45, 0, 1, defaultRestitution), -0.5);
	// bottom left corner
	Rectangle(Vec2(87, bottomY+715), 15, 180, 0, 1, defaultRestitution); // '
	Circle(Vec2(87, bottomY+624), 8, 0, 0, defaultRestitution);
	Rectangle(Vec2(182, bottomY+660), 50, 160, 0, 1, defaultRestitution);
	Rectangle(Vec2(220, bottomY+650), 40, 80, 0, 1, defaultRestitution);
	rotateShape(Rectangle(Vec2(230, bottomY+710), 140, 75, 0, 1, defaultRestitution), -0.9);

	// bottom right rear
	Circle(Vec2(906, bottomY+224), 13, 0, 0, defaultRestitution);
	Rectangle(Vec2(908, bottomY+374), 20, 300, 0, 1, defaultRestitution); // |
	rotateShape(Rectangle(Vec2(896, bottomY+450), 20, 175, 0, 1, defaultRestitution), 0.15);
	rotateShape(Rectangle(Vec2(882, bottomY+508), 20, 45, 0, 1, defaultRestitution), 0.5);
	// bottom right corner
	Rectangle(Vec2(913, bottomY+715), 15, 180, 0, 1, defaultRestitution); // '
	Circle(Vec2(913, bottomY+624), 8, 0, 0, defaultRestitution);
	Rectangle(Vec2(818, bottomY+660), 50, 160, 0, 1, defaultRestitution);
	Rectangle(Vec2(780, bottomY+650), 40, 80, 0, 1, defaultRestitution);
	rotateShape(Rectangle(Vec2(770, bottomY+710), 140, 75, 0, 1, defaultRestitution), 0.9);

	// bottom flipper rears
	rotateShape(Rectangle(Vec2(180, bottomY+575), 220, 35, 0, 1, defaultRestitution), -2.5); // /
	rotateShape(Rectangle(Vec2(820, bottomY+575), 220, 35, 0, 1, defaultRestitution), 2.5);
	rotateShape(Rectangle(Vec2(285, bottomY+647), 35, 35, 0, 1, defaultRestitution), -2.8);
	rotateShape(Rectangle(Vec2(302, bottomY+650), 20, 20, 0, 1, defaultRestitution), -2); // \
	rotateShape(Rectangle(Vec2(715, bottomY+647), 35, 35, 0, 1, defaultRestitution), 2.8);
	rotateShape(Rectangle(Vec2(698, bottomY+650), 20, 20, 0, 1, defaultRestitution), 2);


	// right temp
	/*Circle(Vec2(1000-136, bottomY-292), 28, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(1000-185, bottomY-240), 50, 140, 0, 1, defaultRestitution), -2.4);
	rotateShape(Rectangle(Vec2(1000-141, bottomY-252), 55, 70, 0, 1, defaultRestitution), -3);
	rotateShape(Rectangle(Vec2(1000-168, bottomY-194), 85, 65, 0, 1, defaultRestitution), -2.86);
	Circle(Vec2(1000-235, bottomY-181), 28, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(1000-200, bottomY-155), 80, 66, 0, 1, defaultRestitution), -2.4);
	rotateShape(Rectangle(Vec2(1000-159, bottomY-132), 20, 60, 0, 1, defaultRestitution), -2.65);
	Circle(Vec2(1000-178, bottomY-112), 18, 0, 0, defaultRestitution);*/

	
	const bottomC = bottomY + 50;
	// central left corridor
	rotateShape(Rectangle(Vec2(0, bottomC-580), 99, 48, 0, 1, defaultRestitution), 1.5);
	rotateShape(Rectangle(Vec2(0, bottomC-520), 99, 60, 0, 1, defaultRestitution), 1.4);
	rotateShape(Rectangle(Vec2(18, bottomC-442), 60, 60, 0, 1, defaultRestitution), 1.28);
	rotateShape(Rectangle(Vec2(38, bottomC-386), 70, 60, 0, 1, defaultRestitution), 1.15);
	Circle(Vec2(50, bottomC-350), 34, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(40, bottomC-320), 50, 50, 0, 1, defaultRestitution), 0.6);
	rotateShape(Rectangle(Vec2(23, bottomC-280), 40, 50, 0, 1, defaultRestitution), 1.8);
	rotateShape(Rectangle(Vec2(-46, bottomC-230), 180, 50, 0, 1, defaultRestitution), 3.1);
	rotateShape(Rectangle(Vec2(-40, bottomC-170), 180, 60, 0, 1, defaultRestitution), 3);
	rotateShape(Rectangle(Vec2(-24, bottomC-90), 180, 100, 0, 1, defaultRestitution), 2.9);
	rotateShape(Rectangle(Vec2(0, bottomC+10), 200, 90, 0, 1, defaultRestitution), 2.7);
	Circle(Vec2(96, bottomC+15), 16, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(-42, bottomC+30), 225, 195, 0, 1, defaultRestitution), 2.4);
	rotateShape(Rectangle(Vec2(10, bottomC+99), 75, 45, 0, 1, defaultRestitution), 2);

	// central left stroke
	Circle(Vec2(113, bottomC-253), 8, 0, 0, defaultRestitution);
	Rectangle(Vec2(113, bottomC-238), 15, 28, 0, 1, defaultRestitution);
	rotateShape(Rectangle(Vec2(118, bottomC-210), 20, 45, 0, 1, defaultRestitution), 3);
	rotateShape(Rectangle(Vec2(133, bottomC-210), 15, 90, 0, 1, defaultRestitution), 2.7);
	rotateShape(Rectangle(Vec2(138, bottomC-150), 34, 90, 0, 1, defaultRestitution), 2.9);
	rotateShape(Rectangle(Vec2(170, bottomC-125), 26, 99, 0, 1, defaultRestitution), 2.65);
	Circle(Vec2(193, bottomC-78), 16, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(164, bottomC-85), 45, 60, 0, 1, defaultRestitution), 2.75);
	rotateShape(Rectangle(Vec2(186, bottomC-62), 20, 30, 0, 1, defaultRestitution), 0.8);
	Circle(Vec2(170, bottomC-58), 18, 0, 0, defaultRestitution);

	// left kicker body
	Circle(Vec2(186, bottomY+275), 18, 0, 0, defaultRestitution);
	Circle(Vec2(280, bottomY+532), 18, 0, 0, defaultRestitution);
	Circle(Vec2(206, bottomY+448), 30, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(176, bottomY+328), 20, 99, 0, 1, defaultRestitution), 0.05);
	rotateShape(Rectangle(Vec2(190, bottomY+410), 40, 75, 0, 1, defaultRestitution), -0.16);
	rotateShape(Rectangle(Vec2(234, bottomY+500), 20, 120, 0, 1, defaultRestitution), 2.3);
	rotateShape(Rectangle(Vec2(216, bottomY+412), 20, 230, 0, 1, defaultRestitution), 2.79);
	// left kicker bouncer
	kickerL = Rectangle(Vec2(238, bottomY+402), 250, 20, 0, 1, 1, 2);
	rotateShape(kickerL, -1.92);

	// right kicker body
	Circle(Vec2(814, bottomY+275), 18, 0, 0, defaultRestitution);
	Circle(Vec2(720, bottomY+532), 18, 0, 0, defaultRestitution);
	Circle(Vec2(794, bottomY+448), 30, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(824, bottomY+328), 20, 99, 0, 1, defaultRestitution), -0.05);
	rotateShape(Rectangle(Vec2(810, bottomY+410), 40, 75, 0, 1, defaultRestitution), 0.16);
	rotateShape(Rectangle(Vec2(766, bottomY+500), 20, 120, 0, 1, defaultRestitution), -2.3);
	rotateShape(Rectangle(Vec2(784, bottomY+412), 20, 230, 0, 1, defaultRestitution), -2.79)
	// right kicker bouncer
	kickerR = Rectangle(Vec2(762, bottomY+402), 250, 20, 0, 1, 1, 2);
	rotateShape(kickerR, 1.92);

	//hole3 = Circle(Vec2(640, 1182), 5, 0, 1, defaultRestitution, Bounce.hole);
}

function limitBallSpeed(ball) {//if (ball.V.y > 100) console.log(">",ball.V.y)
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

function checkBounce(obj, ball) {//if (obj.P) console.log("B")
	if (obj == flipperL.body || obj == flipperL.tip) {
		//if (ball.V.y>100) console.log("<",ball.V.y, flipperL.body.R)

		if (flipperL.body.R > defaultRestitution) console.log(` \ ${ball.C.x} x ${ball.C.y} > ${ball.V.x} x ${ball.V.y}`);
		
		/*if (obj == flipperL.tip) {
			if (ball.V.y > 0) {
				ball.V.y *= -flipperL.body.R;console.log("o=", ball.V.y)
			} else {
				//ball.V.y *= flipperR.body.R;
				console.log("o==", ball.V.y)
			}
		}*/
		if (flipperL.body.R > defaultRestitution) {
			if (ball.V.y > 0) {
				ball.V.y *= -flipperL.body.R * 4;//console.log("=", ball.V.y)
			} else {
				ball.V.y *= flipperL.body.R * 3;//console.log("==", ball.V.y)
			}
			//console.log(ball.C.x)
		}
	} else if (obj == flipperR.body || obj == flipperR.tip) {
		//if (ball.V.y>100) console.log("<",ball.V.y, flipperR.body.R)

		if (flipperR.body.R > defaultRestitution) console.log(` / ${ball.C.x} x ${ball.C.y} > ${ball.V.x} x ${ball.V.y}`);

		/*if (obj == flipperL.tip) {
			if (ball.V.y > 0) {
				ball.V.y *= -flipperR.body.R;console.log("o=", ball.V.y)
			} else {
				//ball.V.y *= flipperR.body.R;
				console.log("o==", ball.V.y)
			}
		}*/
		if (flipperR.body.R > defaultRestitution) {
			if (ball.V.y > 0) {
				ball.V.y *= -flipperR.body.R * 4;//console.log("=", ball.V.y)
			} else {
				ball.V.y *= flipperR.body.R * 3;//console.log("==", ball.V.y)
			}
			//console.log(ball.C.x)
		}
	} else if (obj == launcher.body) {
		if (launcher.ballLaunched) {
			launcher.ballLaunched = false;
			launcher.addBlocker();
			ball.R = 0;
		} else if (launcher.charge) {
			launcher.launchBall();
		}
	} else if (obj == kickerL && Math.abs(ball.V.x) + Math.abs(ball.V.y) > 90) {//console.log("kickerL");
		ball.V.y /= 2;
		ball.V.y -= 600 + 300*Math.random() + ball.V.y / 2;
		ball.V.x /= 3;
		ball.V.x += 1600;// - (ball.V.x > 0 ? ball.V.x / 2 : -ball.V.x / 2);
	} else if (obj == kickerR && Math.abs(ball.V.x) + Math.abs(ball.V.y) > 90) {//console.log("kickerR");
		ball.V.y /= 2;
		ball.V.y -= 600 + 300*Math.random() + ball.V.y / 2;
		ball.V.x /= 3;
		ball.V.x -= 1600;// - (ball.V.x > 0 ? -ball.V.x / 2 : ball.V.x / 2);
	} else if (obj == bumper1.body || obj == bumper2.body || obj == bumper3.body) {// || obj == bumper4.body || obj == bumper5.body
		//console.log("bumperO");
		ball.G = 0;
		ball.v = 0;
		ball.V.x = (ball.C.x - obj.C.x) * obj.parent.strength;
		ball.V.y = (ball.C.y - obj.C.y) * obj.parent.strength;
	} else if (obj == hole1.body || obj == hole2.body) {//|| obj == hole3.body
		let hole = obj == hole1.body ? hole1 : obj == hole2.body ? hole2 : hole3;
		ball.C.x = hole.body.C.x;
		ball.C.y = hole.body.C.y;
		ball.V.x = 0;
		ball.V.y = 0;
		ball.v = 0;
		ball.R = 0;
		ball.A = Vec2(0, 0);
		hole.hold();
		drawStaticElements(staticCanvas, staticContext);
		launcher.ballLaunched = false;
		launcher.createNewBall();
	} else if (obj == bottomLeft || obj == bottomRight) {
		ball.G = 0;
		ball.V.x = 0;
		ball.V.y = -3000;
		ball.v = 0;
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

function resetBall(force = false) {
	for (let i = 0; i < balls.length; i++) {
		let ball = balls[i];
		if (ball.C.y > 1960 || (!i && force)) {
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

function releaseAllBalls() {
	// tmp
	balls.forEach(ball => {
		if (ball.A.x == 0 && ball.A.y == 0) {
			ball.A = Vec2(0, 1200);
			ball.v = 9;
			ball.R = defaultRestitution;
			//ball.V.x = 0;
			//ball.V.y = -100;
			//ball.V.y = 1000;
		}
	});
}