let swapperL;
let swapperR;

let ball;

let charger;

function startGame() {
	console.log("startGame");

	Rectangle(Vec2(540, 1910), 1080, 20, 0, 1, .5);
	Rectangle(Vec2(540, 10), 1080, 20, 0, 1, .5);

	let corner = Rectangle(Vec2(950, 170), 400, 20, 0, 1, .5);
	rotateShape(corner, -2.2);

	Rectangle(Vec2(10, 980), 20, 1980, 0, 1, .5);

	Rectangle(Vec2(1070, 980), 20, 1980, 0, 1, .5);

	Rectangle(Vec2(990, 1405), 20, 990, 0, 1, .5);

	charger = Rectangle(Vec2(1030, 1650), 60, 500, 0, 1, .7);

	//            center, width, height, mass, friction, restitution
	swapperL = Rectangle(Vec2(350, 1700), 250, 20, 0, 1, 0.7);
	rotateShape(swapperL, -2.6);

	swapperR = Rectangle(Vec2(750, 1700), 250, 20, 0, 1, 0.7);
	rotateShape(swapperR, 2.6);

	//            center,      radius, mass, friction, restitution
	ball = Circle(Vec2(1030, 990), 30, 10, 1, .5);

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

function touchStartHandler(event) {
	//console.log("touchStartHandler", swapperL);

	if (ball.C.y > 1850) {
		ball
	}

	let charge = {strength: charger.R};
	TweenFX.to(charge, 2, {strength: 300}, 2,
		() => {
			charger.R = charge.strength;
			ball.R = 300;
			moveShape(charger, Vec2(0, -10));
		},
		() => {
			moveShape(charger, Vec2(0, 30));
			charger.R = .7;
			ball.R = .5;
		}
	);

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
	
	//swapperL
}