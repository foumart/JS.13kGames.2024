const mainDiv = document.getElementById("mainDiv");
const uiDiv = document.getElementById("uiDiv");
const gameDiv = document.getElementById("gameDiv");
const menuDiv = document.getElementById("menuDiv");
const gameCanvas = document.getElementById("gameCanvas");
const gameContext = gameCanvas.getContext("2d");

menuDiv.style = gameDiv.style = uiDiv.style = 'width:1080px;height:1920px';
//menuDiv.style.cursor = 'pointer';//'height:120px';

const staticCanvas = document.getElementById("staticCanvas");
const staticContext = staticCanvas.getContext("2d");
//staticCanvas.style.opacity = gameCanvas.style.opacity = gameDiv.style.opacity = .6;
staticCanvas.style.filter = "drop-shadow(9px 9px 0 rgba(160,128,142,0.5))";

const pixelCanvas = document.getElementById("pixelCanvas");
pixelCanvas.style = "width:100%";//;opacity:0.3
const pixelContext = pixelCanvas.getContext("2d");

const mobile = navigator.userAgent.search('Mobile') > 0;
let state = 0;
let paused = false;

// global sizes
const hardWidth = 1080;
const hardHeight = 1920;
let width;
let height;
let canvasScale;
//let offsetX;
//let offsetY;

let interval;

function displayLoading() {
	state = state == 11 ? 0 : state + 1;
	menuDiv.innerHTML = `<div style=margin-top:900px;margin-left:46%>${String.fromCodePoint(128336 + state)}</div>`;
}

// resource characters data (&#x1F{xxx};)
const resources = ['533', '50a', '5d1', '39b', '518', '39a', '5b1'];

function getEmojiCode(code) {
	return `&#x1F${resources[code]};`;
}

function init() {
	window.addEventListener("resize", resize, false);
	resize();

	if (mobile) {
		// mobile events
		mainDiv.ontouchstart = touchStartHandler;
		mainDiv.ontouchend = touchEndHandler;
	} else {
		// desktop events
		mainDiv.onmousedown = touchStartHandler;
		mainDiv.onmouseup = touchEndHandler;
	}

	document.addEventListener("keydown", onKeyDown);
	document.addEventListener("keyup", onKeyUp);

	displayLoading();
	interval = setInterval(displayLoading, 90);

	// wait for the emoji font to load
	// display the rotating block preloader, then the main menu
	document.fonts.ready.then(() => {
		gameInitialized();
	});
}

function gameInitialized() {
	state = 0;
	clearInterval(interval);
	generatePixelatedBackground();
	TweenFX.addTimedCallback(drawPixelatedBackground, 1000 / creepyBackgroundFPS);// animation
	displayMenu();
	//switchState();
}

function displayMenu() {
	createUI();
}

function createUI() {
	menuDiv.innerHTML = "";
	if (state) {
		generateUIButton(gameDiv, 2, chargerHandler, "position:fixed;left:978px;top:1400px;padding:180px 10px 0");
		generateUIButton(gameDiv, 4, leftFlipperHandler, "position:fixed;left:80px;top:1715px;transform:scale(1.5);padding:40px 99px");
		generateUIButton(gameDiv, 4, rightFlipperHandler, "position:fixed;left:660px;top:1715px;transform:scale(1.5);padding:40px 150px 40px 99px");

		generateUIButton(gameDiv, 0, toggleFullscreen, "float:right" + (state ? "" : ";margin:20px"));
		generateUIButton(gameDiv, 1, toggleSound, "float:left" + (state ? "" : ";margin:20px 28px"));
		//generateUIButton(gameDiv, 5, leftStrHandler, "position:fixed;left:10px;top:1825px;transform:scale(1.1);");
		//generateUIButton(gameDiv, 5, rightStrHandler, "position:fixed;left:910px;top:1825px;transform:scale(1.1);");
	} else {
		generateUIButton(menuDiv, 0, toggleFullscreen, "float:right");
		generateUIButton(menuDiv, 1, toggleSound, "float:left");
	}
}

function generateUIButton(div, code, handler, style) {
	const button = document.createElement('div');
	button.addEventListener(mobile ? "touchstart" : "mousedown", handler.bind(this));
	button.innerHTML = getEmojiCode(code);
	button.className = "button";
	button.id = "button_" + code;
	button.style = style;
	div.appendChild(button);
}

function resize(e) {
	width = window.innerWidth;
	height = window.innerHeight;
	canvasScale = getScale();
	mainDiv.style.transform = `scale(${canvasScale})`;
	mainDiv.style.width = hardWidth + 'px';
	mainDiv.style.height = hardHeight + 'px';
	mainDiv.style.top = `${(height - hardHeight) / 2}px`;
	mainDiv.style.left = `${(width - hardWidth) / 2}px`;
	//e = gameCanvas.getBoundingClientRect();
	//offsetX = e.left;
	//offsetY = e.top;
}

function getScale(h, w){
	h = (height / hardHeight);
	w = (width / hardWidth)
	return h < w ? h : w;
}

const keysHeld = [];
function onKeyDown(event) {console.log(event.keyCode)
	if (state) {
		if (event.keyCode == 40 && keysHeld.indexOf(40) == -1) {
			keysHeld.push(40);
		} else if (event.keyCode == 37 && keysHeld.indexOf(37) == -1) {
			keysHeld.push(37);
			leftFlipperHandler();
		} else if (event.keyCode == 39 && keysHeld.indexOf(39) == -1) {
			keysHeld.push(39);
			rightFlipperHandler();
		} else if (event.keyCode == 32 && keysHeld.indexOf(32) == -1) {
			keysHeld.push(32);
			chargerHandler();
		} else if (event.keyCode == 65 && keysHeld.indexOf(65) == -1) {
			// temp debug
			/*balls[0].C.x = 750;
			balls[0].C.y = 900;
			balls[0].V.x = -150;*/
			/*balls[0].C.x = 130;
			balls[0].C.y = 200;
			balls[0].V.x = 150;
			balls[0].V.y = -450;

			launcher.ballLaunched = true;
			balls[0].R = defaultRestitution;*/

			/*balls[0].C.x = 360;
			balls[0].C.y = 1200;
			balls[0].V.x = 150;
			balls[0].V.y = 1450;

			launcher.ballLaunched = true;
			balls[0].R = defaultRestitution;

			leftFlipperHandler();*/

			/*balls[0].C.x = 360;
			balls[0].C.y = 1200;
			balls[0].V.x = 150;
			balls[0].V.y = 1450;

			launcher.ballLaunched = true;
			balls[0].R = defaultRestitution;
			setTimeout(() => {leftFlipperHandler();}, 200);*/
			
			const offsetX = 0;
			const offsetY = 0;
			balls[0].C.x = 445 + offsetX;
			balls[0].C.y = 1300 + offsetY;
			balls[0].V.x = 250;
			balls[0].V.y = 1550;

			launcher.ballLaunched = true;
			balls[0].R = defaultRestitution;
			setTimeout(() => {rightFlipperHandler();}, 160);

			/*const offsetX = 0;
			const offsetY = 0;
			balls[0].C.x = 556 + offsetX;
			balls[0].C.y = 1300 + offsetY;
			balls[0].V.x = -250;
			balls[0].V.y = 1550;

			launcher.ballLaunched = true;
			balls[0].R = defaultRestitution;
			setTimeout(() => {leftFlipperHandler();}, 160);*/

			//switchState();
		} else if (event.keyCode == 80) {// P pause
			paused = !paused;
		} else if (event.keyCode == 82) {// R reset
			resetBall(true);
		} else if (event.keyCode == 13) {
			debugger
		}
	} else if (event.keyCode == 32) {
		switchState();
	}
}

function leftToRightFlipper() {console.log("leftToRightFlipper");
	flipperL.releasedFlipper = true;
	flipperL.checkInteractionEnd();
	setTimeout(() => {leftFlipperHandler();}, 99);
}

function rightToLeftFlipper() {console.log("rightToLeftFlipper");
	flipperR.releasedFlipper = true;
	flipperR.checkInteractionEnd();
	setTimeout(() => {rightFlipperHandler();}, 60);
}

function onKeyUp(event) {
	if (event.keyCode == 40 && keysHeld.indexOf(40) > -1) {
		keysHeld.splice(keysHeld.indexOf(40), 1);
		if (keysHeld.indexOf(37) > -1) leftToRightFlipper();
		if (keysHeld.indexOf(39) > -1) rightToLeftFlipper();
	} else if (event.keyCode == 37 && keysHeld.indexOf(37) > -1) {
		keysHeld.splice(keysHeld.indexOf(37), 1);
		flipperL.checkInteractionEnd();
	} else if (event.keyCode == 39 && keysHeld.indexOf(39) > -1) {
		keysHeld.splice(keysHeld.indexOf(39), 1);
		flipperR.checkInteractionEnd();
	} else if (event.keyCode == 32 && keysHeld.indexOf(32) > -1) {
		keysHeld.splice(keysHeld.indexOf(32), 1);
		if (launcher.charge && !launcher.ballLaunched) {
			launcher.checkLauncherInteractionEnd();
		}
	} else {
		touchEndHandler();
	}
}

function touchStartHandler(event) {//console.log(event.target.id);
	//if (event.target == menuDiv.firstChild || event.target == menuDiv.children[1]) return;
	if (state == 0 && event.target.id == "menuDiv") {
		switchState();
	} else {

	}
}

function switchState() {
	if (!state) {
		state = 1;
		createUI();
		startGame();
		runPhysics();
	} else {

	}
}

function touchEndHandler(event) {//console.log(event.target);
	// release launcher
	if (launcher.charge && !launcher.ballLaunched) {
		launcher.checkLauncherInteractionEnd();
	}
	// release flippers
	else {
		flipperL.checkInteractionEnd();
		flipperR.checkInteractionEnd();
	}
}

function initSound() {
	if (!audioContext) {
		SoundFXstart();
	}
}

function toggleSound(event) {
	if (event) {
		initSound();
		if (SoundFXvolume == 1) {
			SoundFXvolume = 0;
		} else {
			SoundFXvolume += SoundFXvolume || 0.25;
			SoundFXmute();
		}
	}

	if (!SoundFXvolume) {
		//soundButton.innerHTML = "&nbsp&#215&#10919";
	} else {
		//soundButton.innerHTML = (SoundFXvolume == 1 ? "&#8901&#8901&#8901" : SoundFXvolume > 0.25 ? "&nbsp&#8901&#8901" : "&nbsp&nbsp&#8901") + "&#10919";
	}
}

// toggle fullscreen mode
function toggleFullscreen(e) {
	setTimeout(() => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}, 99);
}
