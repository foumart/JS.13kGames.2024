const mainDiv = document.getElementById("mainDiv");
const gameDiv = document.getElementById("gameDiv");
const menuDiv = document.getElementById("menuDiv");
const gameCanvas = document.getElementById("gameCanvas");
const gameContext = gameCanvas.getContext("2d");

const mobile = navigator.userAgent.search('Mobile') > 0;
let state = 0;

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
		keysHeld.push(32);
		chargerHandler();
	} else if (event.keyCode == 82) {
		resetBall();
	} else if (event.keyCode == 13) {
		debugger
	}
}

function touchStartHandler(event) {console.log(event.target.id);
	//if (event.target == menuDiv.firstChild || event.target == menuDiv.children[1]) return;
	if (state == 0) {
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
	generateUIButton(2, chargerHandler, "position:fixed;left:980px");
	generateUIButton(3, chargerHandler, "position:fixed;left:980px;top:1640px;transform:scale(0.9,1)");
	generateUIButton(3, chargerHandler, "position:fixed;left:980px;top:1700px;transform:scale(0.9,1)");
	generateUIButton(3, chargerHandler, "position:fixed;left:980px;top:1760px;transform:scale(0.9,1)");
	generateUIButton(3, chargerHandler, "position:fixed;left:980px;top:1820px;transform:scale(0.9,1)");
	generateUIButton(4, leftFlipperHandler, "position:fixed;left:140px;top:1750px;transform:scale(3)");
	generateUIButton(4, rightFlipperHandler, "position:fixed;left:760px;top:1750px;transform:scale(3)");
	generateUIButton(0, toggleFullscreen, "float:right");
	generateUIButton(1, toggleSound, "float:left");
	state = 0;
}

function generateUIButton(code, handler, style) {
	const button = document.createElement('div');
	button.addEventListener(mobile ? "touchstart" : "mousedown", handler.bind(this));
	button.innerHTML = getEmojiCode(code);
	button.className = "button";
	button.style = style;
	menuDiv.appendChild(button);
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
