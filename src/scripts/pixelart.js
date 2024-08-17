let currentBackground;

const creepyBackgroundFPS = 20;

let rot = 0;

function generatePixelatedBackground() {
	currentBackground = [];
}

function drawPixelatedBackground() {
	pixelContext.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);
	if (!state) {
		pixelContext.fillStyle = "white";
		pixelContext.font = '18px Arial';
		pixelContext.fillText( "Start Game", 48, 166);
		
		return;
	}

	pixelContext.fillStyle = "#222";//"#66757f";//gradient;
	pixelContext.fillRect(0, 0, 184, 328);

	// arrow
	pixelContext.font = 12 + 'px emoji';
	pixelContext.fillStyle = "#FFFFFF";
	pixelContext.fillText( String.fromCodePoint(128315), 48, 32 );

	pixelContext.fillText( String.fromCodePoint(128315), 62, 35 );

	pixelContext.fillText( String.fromCodePoint(128315), 75, 38 );

	pixelContext.fillText( String.fromCodePoint(128315), 89, 41 );


	pixelContext.fillText( String.fromCodePoint(128228), 3, 309 );
	pixelContext.fillText( String.fromCodePoint(128228), 156, 309 );

	
	// bumpers
	pixelContext.font = 26 + 'px emoji';
	pixelContext.fillText( String.fromCodePoint(127845), 59.5, 82 );
	pixelContext.save();
	pixelContext.translate(175, -46);
	pixelContext.rotate(1.4);
	pixelContext.fillText( String.fromCodePoint(127845), 100, 90 );
	pixelContext.restore();
	pixelContext.save();
	pixelContext.translate(88, 63);
	pixelContext.rotate(4);
	pixelContext.fillText( String.fromCodePoint(127845), -50, -20 );
	pixelContext.restore();

	pixelContext.font = 'bold ' + 9 + 'px Arial';

	//rot += 0.1;
	if (knobs) knobs.forEach (knob => {
		if (knob.parent.letter) {
			pixelContext.save();
			pixelContext.fillStyle = "#666";
			pixelContext.translate(knob.C.x/6 + knob.parent.letterOffsetX, knob.C.y/6 + knob.parent.letterOffsetY);
			pixelContext.rotate(rot);
			pixelContext.fillText( knob.parent.letter, -3, 3 );
			pixelContext.restore();
		}
	});
}
