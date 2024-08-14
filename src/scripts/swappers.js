let swapperL;
let swapperR;
let holdingSwapperL;
let holdingSwapperR;
let releasedSwapperL;
let releasedSwapperR;
let rotationSwapperL;
let rotationSwapperR;
let releaseObj = {};

function checkSwappersInteractionEnd() {
	if (holdingSwapperL) {
		holdingSwapperL = false;
		if (releasedSwapperL || releasedSwapperL === 0) {
			releaseSwapper(swapperL, -2.6);
			releasedSwapperL = false;
		} else {
			releasedSwapperL = true;
		}
	}
	
	if (holdingSwapperR) {
		holdingSwapperR = false;
		if (releasedSwapperR || releasedSwapperR === 0) {
			releaseSwapper(swapperR, 2.6);
			releasedSwapperR = false;
		} else {
			releasedSwapperR = true;
		}
	}
}

function releaseSwapper(swapper, rotation) {
	releaseObj = { rotation: swapper.G }
	TweenFX.to(releaseObj, 15, {rotation: rotation}, 1,
		() => {
			swapper.R = defaultRestitution;
			rotateShape(swapper, releaseObj.rotation - swapper.G);
		},
		() => {
			swapper.R = defaultRestitution;
		}
	);
}

function leftSwapperHandler() {
	holdingSwapperL = true;
	swapperSwing(swapperL, rotationSwapperL, -3.8);
}

function rightSwapperHandler() {
	holdingSwapperR = true;
	swapperSwing(swapperR, rotationSwapperR, 3.8);
}

function swapperSwing(swapper, tweenObject, rotation) {
	releaseObj.killed = true;
	tweenObject = { rotation: swapper.G };
	TweenFX.to(tweenObject, 10, {rotation: rotation}, 2,
		() => {
			rotateShape(swapper, tweenObject.rotation - swapper.G);
		},
		() => {
			if (rotation > 0) {
				if (releasedSwapperR) {
					releaseSwapper(swapper, 2.6);
					releasedSwapperR = false;
				} else {
					releasedSwapperR = 0;
				}
			} else {
				if (releasedSwapperL) {
					releaseSwapper(swapper, -2.6);
					releasedSwapperL = false;
				} else {
					releasedSwapperL = 0;
				}
			}
		}
	);

	let restitutionObj = {strength: 1};
	TweenFX.to(restitutionObj, 6, {strength: 3}, 2,
		() => {
			swapper.R = restitutionObj.strength;
		},
		() => {
			TweenFX.to(restitutionObj, 4, {strength: defaultRestitution}, 2,
				() => {
					swapper.R = restitutionObj.strength;
				},
				() => {
					swapper.R = defaultRestitution;
				}
			);
		}
	);
}