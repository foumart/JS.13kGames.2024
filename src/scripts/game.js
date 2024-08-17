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

let hole1;
let hole2;
let hole3;

let knobs;

let leftSaviour = 3;
let rightSaviour = 3;
let leftSaviourForced = false;
let rightSaviourForced = false;

let score = 0;

const defaultRestitution = .5;

const Bounce = {
	flipper: 1,
	bumper: 2,
	launcher: 3,
	hole: 4,
	bottom: 5,
	knob: 6
}
 
function startGame() {

	// launcher
	launcher = new Launcher(2);

	// flippers
	flipperL = new Flipper(300, bottomY+673, 280, 50, -2.55);
	flipperR = new Flipper(700, bottomY+673, 280, 50, 2.55);

	// frame
	bottomLeft = Rectangle(Vec2(50, 1870), 60, 99, 0, 1, defaultRestitution, Bounce.bottom);
	bottomRight = Rectangle(Vec2(950, 1870), 60, 99, 0, 1, defaultRestitution, Bounce.bottom);
	Rectangle(Vec2(1030, 1790), 60, 260, 0, 1, defaultRestitution);
	Rectangle(Vec2(990, 1290), 18, 1260, 0, 1, defaultRestitution);// |
	Rectangle(Vec2(995, 655), 10, 20, 0, 1, defaultRestitution);
	rotateShape(Rectangle(Vec2(991, 652), 10, 20, 0, 1, defaultRestitution), 0.5);
	Circle(Vec2(996, 642), 4, 0, 0, defaultRestitution);

	bumper1 = new Bumper(425, 425, 70, 16);
	bumper2 = new Bumper(675, 465, 70, 16);
	bumper3 = new Bumper(525, 650, 70, 16);

	// top grid
	Circle(Vec2(275, 100), 10, 0, 0, defaultRestitution);
	Circle(Vec2(275, 203), 10, 0, 0, defaultRestitution);
	Rectangle(Vec2(275, 152), 20, 105, 0, 1, defaultRestitution);
	
	Circle(Vec2(355, 125), 10, 0, 0, defaultRestitution);
	Circle(Vec2(355, 215), 10, 0, 0, defaultRestitution);
	Rectangle(Vec2(355, 170), 20, 90, 0, 1, defaultRestitution);
	
	Circle(Vec2(435, 145), 10, 0, 0, defaultRestitution);
	Circle(Vec2(435, 235), 10, 0, 0, defaultRestitution);
	Rectangle(Vec2(435, 190), 20, 90, 0, 1, defaultRestitution);
	
	Circle(Vec2(515, 158), 10, 0, 0, defaultRestitution);
	Circle(Vec2(515, 248), 10, 0, 0, defaultRestitution);
	Rectangle(Vec2(515, 203), 20, 90, 0, 1, defaultRestitution);
	
	Circle(Vec2(595, 170), 10, 0, 0, defaultRestitution);
	Circle(Vec2(595, 260), 10, 0, 0, defaultRestitution);
	Rectangle(Vec2(595, 215), 20, 90, 0, 1, defaultRestitution);
	

	// top right hole
	Circle(Vec2(738, 113), 7, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(810, 22), 80, 30, 0, 1, defaultRestitution), -0.12);
	rotateShape(Rectangle(Vec2(885, 12), 70, 20, 0, 1, defaultRestitution), -0.28);
	rotateShape(Rectangle(Vec2(746, 30), 45, 25, 0, 1, defaultRestitution), -0.05);
	rotateShape(Rectangle(Vec2(600, 16), 250, 25, 0, 1, defaultRestitution), 0.12);
	hole1 = new Hole(920, 42, 750, 64, 50, 80, -0.15);
	rotateShape(Rectangle(Vec2(828, 107), 90, 20, 0, 1, defaultRestitution), -0.15);
	rotateShape(Rectangle(Vec2(995, 0), 40, 120, 0, 1, defaultRestitution), 1);
	rotateShape(Rectangle(Vec2(938, 10), 40, 20, 0, 1, defaultRestitution), 0.4);
	rotateShape(Rectangle(Vec2(892, 105), 60, 40, 0, 1, defaultRestitution), 2.9);
	rotateShape(Rectangle(Vec2(760, 111), 40, 12, 0, 1, defaultRestitution), -0.05);
	rotateShape(Rectangle(Vec2(1038, 40), 180, 99, 0, 1, defaultRestitution), -0.1);
	
	rotateShape(Rectangle(Vec2(760, 117), 45, 12, 0, 1, defaultRestitution), 0.1);

	const cornersX = [845,891,935,975,1010,1043,1067,1085,1096,1103];
	const cornersY = [-18,-5,14,39,70,110,150,193,238,285];
	const cornersR = [3,2.85,2.65,2.5,2.35,2.2,2.05,1.9,1.75,1.65];

	for (let i = 0; i < 10; i++) {
		//rotateShape(Rectangle(Vec2(320 + cornersX[i] * 0.6, cornersY[i] * 0.7 + 200), 50 + i*10, 10, 0, 1, defaultRestitution), -cornersR[i]);
		rotateShape(Rectangle(Vec2(134 + cornersX[i] * 0.85, cornersY[i] * 0.9 + 140), 130, 24, 0, 1, defaultRestitution), -cornersR[i]);
		rotateShape(Rectangle(Vec2(1080 - cornersX[i], cornersY[i]), 250, 99, 0, 1, defaultRestitution), cornersR[i]);
		rotateShape(Rectangle(Vec2(505 - cornersX[i] * 0.3, cornersY[i] * 0.55 + 222), 50 + i*10, 10, 0, 1, defaultRestitution), cornersR[i]);
	}

	rotateShape(Rectangle(Vec2(955, 110), 75, 95, 0, 1, defaultRestitution), 2.65);
	rotateShape(Rectangle(Vec2(1040, 200), 90, 150, 0, 1, defaultRestitution), 2.5);
	rotateShape(Rectangle(Vec2(1030, 98), 99, 190, 0, 1, defaultRestitution), 2.1);


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

	// central triangle
	Circle(Vec2(390, 822), 9, 0, 0, defaultRestitution);
	Circle(Vec2(508, 964), 16, 0, 0, defaultRestitution);
	Circle(Vec2(550, 924), 12, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(512, 907), 90, 20, 0, 1, defaultRestitution), 0.4);
	rotateShape(Rectangle(Vec2(490, 920), 70, 35, 0, 1, defaultRestitution), 0.7);
	//Rectangle(Vec2(465, 930), 70, 30, 0, 1, defaultRestitution);
	rotateShape(Rectangle(Vec2(430, 855), 99, 18, 0, 1, defaultRestitution), 0.7);
	rotateShape(Rectangle(Vec2(450, 900), 195, 16, 0, 1, defaultRestitution), 0.9);
	rotateShape(Rectangle(Vec2(528, 948), 20, 50, 0, 1, defaultRestitution), 0.75);

	// right chut
	Circle(Vec2(820, 205), 12, 0, 0, defaultRestitution);
	Circle(Vec2(764, 763), 13, 0, 0, defaultRestitution);
	Circle(Vec2(799, 784), 13, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(840, 214), 25, 40, 0, 1, defaultRestitution), -1.15);
	rotateShape(Rectangle(Vec2(867, 234), 28, 40, 0, 1, defaultRestitution), -0.8);
	rotateShape(Rectangle(Vec2(890, 262), 29, 40, 0, 1, defaultRestitution), -0.6);
	rotateShape(Rectangle(Vec2(907, 295), 30, 40, 0, 1, defaultRestitution), -0.4);
	rotateShape(Rectangle(Vec2(918, 332), 31, 40, 0, 1, defaultRestitution), -0.2);
	rotateShape(Rectangle(Vec2(923, 370), 32, 40, 0, 1, defaultRestitution), -0.1);
	Rectangle(Vec2(925, 416), 33, 60, 0, 1, defaultRestitution);
	rotateShape(Rectangle(Vec2(919, 470), 33, 60, 0, 1, defaultRestitution), 0.2);
	rotateShape(Rectangle(Vec2(902, 528), 34, 70, 0, 1, defaultRestitution), 0.35);
	rotateShape(Rectangle(Vec2(872, 592), 35, 80, 0, 1, defaultRestitution), 0.5);
	rotateShape(Rectangle(Vec2(813, 692), 36, 172, 0, 1, defaultRestitution), 0.55);
	rotateShape(Rectangle(Vec2(843, 675), 30, 235, 0, 1, defaultRestitution), 0.4);
	rotateShape(Rectangle(Vec2(781, 776), 20, 40, 0, 1, defaultRestitution), -1);

	// right triangle
	Circle(Vec2(912, 739), 7, 0, 0, defaultRestitution);
	Circle(Vec2(872, 1172), 9, 0, 0, defaultRestitution);
	Circle(Vec2(782, 1104), 18, 0, 0, defaultRestitution);
	Circle(Vec2(906, 1170), 12, 0, 0, defaultRestitution);
	Circle(Vec2(805, 1127), 9, 0, 0, defaultRestitution);
	Rectangle(Vec2(912, 960), 12, 420, 0, 1, defaultRestitution);
	rotateShape(Rectangle(Vec2(894, 800), 15, 120, 0, 1, defaultRestitution), 0.3);
	rotateShape(Rectangle(Vec2(872, 885), 33, 160, 0, 1, defaultRestitution), 0.38);
	Rectangle(Vec2(888, 1172), 30, 20, 0, 1, defaultRestitution);
	rotateShape(Rectangle(Vec2(790, 1116), 30, 20, 0, 1, defaultRestitution), 0.5);
	Rectangle(Vec2(885, 940), 50, 140, 0, 1, defaultRestitution);
	rotateShape(Rectangle(Vec2(812, 1110), 25, 30, 0, 1, defaultRestitution), 0.6);
	rotateShape(Rectangle(Vec2(826, 1080), 30, 40, 0, 1, defaultRestitution), 0.45);
	rotateShape(Rectangle(Vec2(903, 1120), 15, 40, 0, 1, defaultRestitution), 0.4);
	rotateShape(Rectangle(Vec2(892, 1148), 25, 50, 0, 1, defaultRestitution), 0.6);
	rotateShape(Rectangle(Vec2(842, 1045), 45, 50, 0, 1, defaultRestitution), 0.9);
	rotateShape(Rectangle(Vec2(862, 1032), 46, 90, 0, 1, defaultRestitution), 1.4);
	rotateShape(Rectangle(Vec2(898, 1042), 30, 20, 0, 1, defaultRestitution), 2);
	rotateShape(Rectangle(Vec2(905, 1058), 15, 20, 0, 1, defaultRestitution), 2.4);
	rotateShape(Rectangle(Vec2(820, 1036), 52, 160, 0, 1, defaultRestitution), 0.4);
	rotateShape(Rectangle(Vec2(898, 840), 20, 99, 0, 1, defaultRestitution), 0.2);
	hole3 = new Hole(878, 1085, 852, 1132, 55, 40, 0.55);

	// bottom left rear
	Circle(Vec2(127, bottomY+161), 13, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(95, bottomY+194), 24, 20, 0, 1, defaultRestitution), 0.5);
	rotateShape(Rectangle(Vec2(111, bottomY+174), 22, 42, 0, 1, defaultRestitution), 0.8);
	Rectangle(Vec2(90, bottomY+360), 20, 325, 0, 1, defaultRestitution); // |
	rotateShape(Rectangle(Vec2(103, bottomY+450), 20, 175, 0, 1, defaultRestitution), -0.15);
	rotateShape(Rectangle(Vec2(118, bottomY+508), 20, 45, 0, 1, defaultRestitution), -0.5);
	// bottom left corner
	Rectangle(Vec2(87, bottomY+725), 15, 190, 0, 1, defaultRestitution); // '
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
	Rectangle(Vec2(913, bottomY+725), 15, 190, 0, 1, defaultRestitution); // '
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

	
	const bottomC = bottomY + 60;
	// central left corridor
	Circle(Vec2(76, bottomC+15), 16, 0, 0, defaultRestitution);
	Circle(Vec2(70, bottomC-470), 12, 0, 0, defaultRestitution);
	//Circle(Vec2(50, bottomC-340), 12, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(0, bottomC-675), 120, 48, 0, 1, defaultRestitution), 1.5);
	rotateShape(Rectangle(Vec2(0, bottomC-634), 120, 60, 0, 1, defaultRestitution), 1.4);
	rotateShape(Rectangle(Vec2(26, bottomC-540), 162, 60, 0, 1, defaultRestitution), 1.25);
	rotateShape(Rectangle(Vec2(42, bottomC-407), 60, 134, 0, 1, defaultRestitution), 0.15);
	rotateShape(Rectangle(Vec2(20, bottomC-320), 50, 64, 0, 1, defaultRestitution), 0.6);
	rotateShape(Rectangle(Vec2(3, bottomC-280), 40, 50, 0, 1, defaultRestitution), 1.8);
	rotateShape(Rectangle(Vec2(-66, bottomC-230), 180, 50, 0, 1, defaultRestitution), 3.1);
	rotateShape(Rectangle(Vec2(-60, bottomC-170), 180, 60, 0, 1, defaultRestitution), 3);
	rotateShape(Rectangle(Vec2(-44, bottomC-90), 180, 100, 0, 1, defaultRestitution), 2.9);
	rotateShape(Rectangle(Vec2(-20, bottomC+10), 200, 90, 0, 1, defaultRestitution), 2.7);
	rotateShape(Rectangle(Vec2(-62, bottomC+30), 225, 195, 0, 1, defaultRestitution), 2.4);
	rotateShape(Rectangle(Vec2(0, bottomC+99), 75, 45, 0, 1, defaultRestitution), 2);

	// central left stroke
	Circle(Vec2(93, bottomC-253), 8, 0, 0, defaultRestitution);
	Circle(Vec2(173, bottomC-78), 16, 0, 0, defaultRestitution);
	Rectangle(Vec2(93, bottomC-238), 15, 28, 0, 1, defaultRestitution);
	rotateShape(Rectangle(Vec2(98, bottomC-210), 20, 45, 0, 1, defaultRestitution), 3);
	rotateShape(Rectangle(Vec2(113, bottomC-210), 15, 90, 0, 1, defaultRestitution), 2.7);
	rotateShape(Rectangle(Vec2(118, bottomC-150), 34, 90, 0, 1, defaultRestitution), 2.9);
	rotateShape(Rectangle(Vec2(150, bottomC-125), 26, 99, 0, 1, defaultRestitution), 2.65);
	rotateShape(Rectangle(Vec2(144, bottomC-85), 45, 60, 0, 1, defaultRestitution), 2.75);
	rotateShape(Rectangle(Vec2(166, bottomC-62), 20, 30, 0, 1, defaultRestitution), 0.8);
	Circle(Vec2(150, bottomC-58), 18, 0, 0, defaultRestitution);

	// left kicker body
	Circle(Vec2(190, bottomY+275), 18, 0, 0, defaultRestitution);
	Circle(Vec2(284, bottomY+532), 18, 0, 0, defaultRestitution);
	Circle(Vec2(210, bottomY+448), 30, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(180, bottomY+328), 20, 99, 0, 1, defaultRestitution), 0.05);
	rotateShape(Rectangle(Vec2(194, bottomY+410), 40, 75, 0, 1, defaultRestitution), -0.16);
	rotateShape(Rectangle(Vec2(238, bottomY+500), 20, 120, 0, 1, defaultRestitution), 2.3);
	rotateShape(Rectangle(Vec2(220, bottomY+412), 20, 230, 0, 1, defaultRestitution), 2.79);
	// left kicker bouncer
	kickerL = Rectangle(Vec2(242, bottomY+402), 250, 20, 0, 1, 1, 2);
	rotateShape(kickerL, -1.92);

	// right kicker body
	Circle(Vec2(810, bottomY+275), 18, 0, 0, defaultRestitution);
	Circle(Vec2(716, bottomY+532), 18, 0, 0, defaultRestitution);
	Circle(Vec2(790, bottomY+448), 30, 0, 0, defaultRestitution);
	rotateShape(Rectangle(Vec2(820, bottomY+328), 20, 99, 0, 1, defaultRestitution), -0.05);
	rotateShape(Rectangle(Vec2(806, bottomY+410), 40, 75, 0, 1, defaultRestitution), 0.16);
	rotateShape(Rectangle(Vec2(762, bottomY+500), 20, 120, 0, 1, defaultRestitution), -2.3);
	rotateShape(Rectangle(Vec2(780, bottomY+412), 20, 230, 0, 1, defaultRestitution), -2.79)
	// right kicker bouncer
	kickerR = Rectangle(Vec2(758, bottomY+402), 250, 20, 0, 1, 1, 2);
	rotateShape(kickerR, 1.92);

	Rectangle(Vec2(540, -85), 1080, 200, 0, 1, defaultRestitution);// --
	Rectangle(Vec2(-80, 980), 200, 1980, 0, 1, defaultRestitution);// |
	Rectangle(Vec2(1160, 980), 200, 1980, 0, 1, defaultRestitution);//  |

	knobs = [
		new Knob(775, 785, 12, 16).body,
		new Knob(535, 945, 16, 12).body,

		new Knob(70, 730, 12, 25, "X", 9, 4).body,
		new Knob(64, 780, 12, 25, "Y", 9, 6).body,
		//new Knob(238, 390, 9, 6, "Z", 0, 0).body,

		new Knob(838, 930, 9, 6, "A", -5, 2).body,
		new Knob(814, 990, 9, 6, "B", -5, 3).body,
		new Knob(788, 1050, 9, 6, "C", -5, 4).body,

		new Knob(408, 850, 12, 16, "D", -6, 9).body,
		new Knob(444, 895, 12, 16, "E", -5, 10).body,
		new Knob(480, 940, 12, 16, "F", -4, 11).body,
	];
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

function angle(cx, cy, ex, ey) {
	var dy = ey - cy;
	var dx = ex - cx;
	var theta = Math.atan2(dy, dx); // range (-PI, PI]
	theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
	//if (theta < 0) theta = 360 + theta; // range [0, 360)
	return theta + 45;
}

function findNewPoint(x, y, angle, distance) {
    var result = {};

    result.x = Math.round(Math.cos(angle * Math.PI / 180) * distance + x);
    result.y = Math.round(Math.sin(angle * Math.PI / 180) * distance + y);

    return result;
}

function checkBounce(obj, ball) {//if (obj.P) console.log("B")
	if (
		obj == flipperL.body || obj == flipperL.tip ||
		obj == flipperR.body || obj == flipperR.tip
	) {
		const flipper = obj == flipperL.body || obj == flipperL.tip ? flipperL : flipperR;
		
		if (flipper.body.R > defaultRestitution) {
			
			console.warn(ball.V, flipper.tween.frame, ball.C.x, flipper.body.C.x - flipper.body.B * (flipper == flipperL ? -1 : 1));

			console.log(((ball.C.x) - (flipper.body.C.x - flipper.body.B * (flipper == flipperL ? -1 : 1))) / 100);

			if (ball.V.y > 0) {
				ball.V.y *= -flipper.body.R * (4 + ((ball.C.x) - (flipper.body.C.x - flipper.body.B * (flipper == flipperL ? -1 : 1))) / 100);
			} else {
				ball.V.y *= flipper.body.R * 3;
			}

			// TODO: properly bounce ball angle
			// 
		}

		/*if (obj == flipper.tip) {
			//console.warn(Math.atan2(ball.C.y - obj.C.y, ball.C.x - obj.C.x) * (180 / Math.PI));
			//console.warn(ball.C.x, ball.C.y, findNewPoint(obj.C.x, obj.C.y, angle(ball.C.x, ball.C.y, obj.C.x, obj.C.y), 1000));
			ball.V.x -= findNewPoint(obj.C.x, obj.C.y, angle(obj.C.x, obj.C.y, ball.C.x, ball.C.y), 1000).x;
			ball.V.y *= -1;
			ball.V.y -= findNewPoint(obj.C.x, obj.C.y, angle(obj.C.x, obj.C.y, ball.C.x, ball.C.y), 1000).y;
			console.warn(ball.V);
		}*/
	}
	else if (obj == launcher.body) {
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
	} else if (
		obj == bumper1.body || obj == bumper2.body || obj == bumper3.body ||
		knobs.indexOf(obj) > -1
	) {// || obj == bumper4.body || obj == bumper5.body
		//console.log("bumperO");
		ball.G = 0;
		ball.v = 0;
		ball.V.x = (ball.C.x - obj.C.x) * obj.parent.strength;
		ball.V.y = (ball.C.y - obj.C.y) * obj.parent.strength;
	} else if (obj == hole1.body || obj == hole2.body || obj == hole3.body) {
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

	//console.log(ball.V)
	limitBallSpeed(ball);
}

function chargerHandler(event) {
	launcher.chargeHandler(event);
}

function leftFlipperHandler() {
	flipperL.flipperHandler();
}

function rightFlipperHandler() {
	flipperR.flipperHandler();
}

function leftStrHandler(div) {

	console.log(div.target.style.transform)
	//gameDiv.children[gameDiv.children.length-1].style.transform = `scaleY(2)`;
}

function rightStrHandler() {
	gameDiv.children[gameDiv.children.length-1].style.transform = `scaleY(2)`;
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
