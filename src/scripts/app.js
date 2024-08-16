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
	menuDiv.innerHTML = `<div style=margin-top:480px;margin-left:48%>${String.fromCodePoint(128336 + state)}</div>`;
}

// resource characters data (&#x1F{xxx};)
const resources = ['533', '50a', '5d1', '39b', '5b2'];

function getEmojiCode(code) {
	return `</b>&#x1F${resources[code]};<b>`;
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

	gameDiv.style = menuDiv.style = 'width:1080px;height:1920px';

	displayLoading();
	interval = setInterval(displayLoading, 90);

	// wait for the emoji font to load
	document.fonts.ready.then(() => {
		createUI();
		startGame();
		runPhysics();
	});
}

const keysHeld = [];
function onKeyDown(event) {//console.log(event.keyCode)
	if (event.keyCode == 37 && keysHeld.indexOf(37) == -1) {
		keysHeld.push(37);
		leftFlipperHandler();
	} else if (event.keyCode == 39 && keysHeld.indexOf(39) == -1) {
		keysHeld.push(39);
		rightFlipperHandler();
	} else if (event.keyCode == 32 && keysHeld.indexOf(32) == -1) {
		if (state == 0) {
			// temp debug
			/*balls[0].C.x = 750;
			balls[0].C.y = 900;
			balls[0].V.x = -150;*/
			balls[0].C.x = 130;
			balls[0].C.y = 200;
			balls[0].V.x = 150;
			balls[0].V.y = -450;

			launcher.ballLaunched = true;
			balls[0].R = defaultRestitution;
			switchState();
		}  else if (event.keyCode == 80) {// P pause
			paused = !paused;
		} else if (event.keyCode == 82) {// R reset
			resetBall(true);
		} else {
			keysHeld.push(32);
			chargerHandler();
		}
	} else if (event.keyCode == 13) {
		debugger
	}
}

function touchStartHandler(event) {console.log(event.target.id);
	//if (event.target == menuDiv.firstChild || event.target == menuDiv.children[1]) return;
	if (state == 0) {
		switchState();
	} else {

	}
}

function switchState() {
	if (!state) {
		state = 1;
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

function onKeyUp(event) {
	if (event.keyCode == 37 && keysHeld.indexOf(37) > -1) {
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

function createUI() {
	menuDiv.innerHTML = "";
	clearInterval(interval);
	generateUIButton(gameDiv, 2, chargerHandler, "position:fixed;left:988px");
	generateUIButton(gameDiv, 3, chargerHandler, "position:fixed;left:988px;top:1645px;transform:scale(0.9,1)");
	generateUIButton(gameDiv, 3, chargerHandler, "position:fixed;left:988px;top:1705px;transform:scale(0.9,1)");
	generateUIButton(gameDiv, 3, chargerHandler, "position:fixed;left:988px;top:1765px;transform:scale(0.9,1)");
	generateUIButton(gameDiv, 3, chargerHandler, "position:fixed;left:988px;top:1825px;transform:scale(0.9,1)");
	generateUIButton(gameDiv, 4, leftFlipperHandler, "position:fixed;left:87px;top:1715px;transform:scale(1.5);padding:40px 90px");
	generateUIButton(gameDiv, 4, rightFlipperHandler, "position:fixed;left:658px;top:1715px;transform:scale(1.5);padding:40px 90px");
	generateUIButton(gameDiv, 0, toggleFullscreen, "float:right");
	generateUIButton(gameDiv, 1, toggleSound, "float:right");
	state = 0;
}

function generateUIButton(div, code, handler, style) {
	const button = document.createElement('div');
	button.addEventListener(mobile ? "touchstart" : "mousedown", handler.bind(this));
	button.innerHTML = getEmojiCode(code);
	button.className = "button";
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
