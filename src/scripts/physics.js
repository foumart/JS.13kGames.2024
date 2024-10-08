var physicsFrameRate = 120;
var animationFrameRate = 120;

var boardStrokeStyle = '#98a';
var boardCornerStoneColor = '#6ff';
var boardKnobColor = '#6f6';
var boardHoleColor = '#ff6';
var boardBumperColor = "rgba(255, 255, 255, 0.5)";
var boardKickerAreaColor = '#fe9';
var boardStrokeColor = '#999';

// MINI 2D PHYSICS
// ===============

// 2D vector tools
var Vec2 = (x,y) => ({x,y});
var length = v => Math.pow(dot(v,v), .5);
var add = (v,w) => Vec2(v.x + w.x, v.y + w.y);
var substract = (v,w) => add(v, scale(w, -1));
var scale = (v,n) => Vec2(v.x * n, v.y * n);
var dot = (v,w) => v.x * w.x + v.y * w.y;
var cross = (v,w) => v.x * w.y - v.y * w.x;
var rotate = (v, center, angle, x = v.x - center.x, y = v.y - center.y) => Vec2(x * Math.cos(angle) - y * Math.sin(angle) + center.x, x * Math.sin(angle) + y * Math.cos(angle) + center.y);
var normalize = v => scale(v, 1 / (length(v) || 1));
var distance = (v,w) => length(substract(v,w));
var offsetTo = (angle, distance) => Vec2(Math.cos(angle) * distance, Math.sin(angle) * distance);

// Gravity
var mGravity = Vec2(0, 1200);//2500

// All shapes
var objects = [];
var debug;
var debugFills = false;

var step = 0;
var startTime = Date.now();
var frame = 0;
var fps;

// Collision info 
var collisionInfo = {}; // final collision between two shapes
var collisionInfoR1 = {}; // temp collision: rect 1 vs rect 2
var collisionInfoR2 = {}; // temp collision: rect 2 vs rect 1

// Collision info setter
var setInfo = (collision, D, N, S) => {
	collision.D = D; // depth
	collision.N = N; // normal
	collision.S = S; // start
	collision.E = add(S, scale(N, D)); // end
};

// New shape
var RigidShape = (C, mass, F, R, T, B, W, H, shape, checkBounce, priority) => {
	shape = {
		T, // 0 circle / 1 rectangle
		C, // center
		D: Vec2(0, 0),
		F, // friction
		R, // restitution (bouncing)
		M: mass ? 1 / mass : 0, // inverseMass (0 if immobile)
		V: Vec2(0, 0), // velocity (speed)
		A: mass ? mGravity : Vec2(0, 0), // acceleration
		G: 0, // angle
		v: 0, // angle velocity
		a: 0, // angle acceleration
		B, // (bounds) radius
		W, // width
		H, // height
		I: T // inertia
			? (Math.hypot(W, H) / 2, mass > 0 ? 1 / (mass * (W * W + H * H) / 12) : 0) // rectangle
			: (mass > 0 ? (mass * B * B) / 12 : 0), // circle
		N: [], // face normals array (rectangles)
		X: [ // Vertex: 0: TopLeft, 1: TopRight, 2: BottomRight, 3: BottomLeft (rectangles)
			Vec2(C.x - W / 2, C.y - H / 2),
			Vec2(C.x + W / 2, C.y - H / 2),
			Vec2(C.x + W / 2, C.y + H / 2),
			Vec2(C.x - W / 2, C.y + H / 2)
		],
		O: checkBounce, // method to call on collision with another object that have checkBounce (O = 1) set
		P: priority
	};
	
	// Prepare rectangle
	if(T /* == 1 */){
		computeRectNormals(shape);
	}
	objects.push(shape);
	return shape;
};

var removeObject = (object) => {
	objects.splice(objects.indexOf(object), 1);
}

// Move a shape along a vector
var moveShape = (shape, v, i) => {

	// Center
	shape.C = add(shape.C, v);
	
	// Rectangle (move vertex)
	if(shape.T){
		for(i = 4; i--;){
			shape.X[i] = add(shape.X[i], v);
		}
	}
}

// Rotate a shape around its center
var rotateShape = (shape, angle, i) => {

	// Update angle
	shape.G += angle;
	
	// Rectangle (rotate vertex)
	if(shape.T){
		for(i = 4; i--;){
			shape.X[i] = rotate(shape.X[i], shape.C, angle);
		}
		computeRectNormals(shape);
	}
}

// Test if two shapes have intersecting bounding circles
var boundTest = (s1, s2) => length(substract(s2.C, s1.C)) <= s1.B + s2.B;

// Compute face normals (for rectangles)
var computeRectNormals = (shape, i) => {
	
	// N: normal of each face toward outside of rectangle
	// 0: Top, 1: Right, 2: Bottom, 3: Left
	for(i = 4; i--;){
		shape.N[i] = normalize(substract(shape.X[(i+1) % 4], shape.X[(i+2) % 4]));
	}
}

// Find the axis of least penetration between two rects
var findAxisLeastPenetration = (rect, otherRect, collisionInfo) => {
	var
	n,
	i,
	j,
	supportPoint,
	bestDistance = 1e9,
	bestIndex = -1,
	hasSupport = 1,
	tmpSupportPoint,
	tmpSupportPointDist;

	for(i = 4; hasSupport && i--;){
		
		// Retrieve a face normal from A
		n = rect.N[i];

		// use -n as direction and the vertex on edge i as point on edge
		var
		dir = scale(n, -1),
		ptOnEdge = rect.X[i],
		
		// find the support on B
		vToEdge,
		projection;
		tmpSupportPointDist = -1e9;
		tmpSupportPoint = -1;
		
		// check each vector of other object
		for(j = 4; j--;){
			vToEdge = substract(otherRect.X[j], ptOnEdge);
			projection = dot(vToEdge, dir);
			
			// find the longest distance with certain edge
			// dir is -n direction, so the distance should be positive     
			if(projection > 0 && projection > tmpSupportPointDist){
				tmpSupportPoint = otherRect.X[j];
				tmpSupportPointDist = projection;
			}
		}
		hasSupport = (tmpSupportPoint !== -1);
		
		// get the shortest support point depth
		if(hasSupport && tmpSupportPointDist < bestDistance){
			bestDistance = tmpSupportPointDist;
			bestIndex = i;
			supportPoint = tmpSupportPoint;
		}
	}
	
	if(hasSupport){
		
		// all four directions have support point
		setInfo(collisionInfo, bestDistance, rect.N[bestIndex], add(supportPoint, scale(rect.N[bestIndex], bestDistance)));
	}
	
	return hasSupport;
};

// Test collision between two shapes
var testCollision = (c1, c2, info) => {
	
	// Circle vs circle
	if(!c1.T && !c2.T){
		var
		vFrom1to2 = substract(c2.C, c1.C),
		rSum = c1.B + c2.B,
		dist = length(vFrom1to2);
		
		if(dist <= Math.sqrt(rSum * rSum)){
			var
				normalFrom2to1 = normalize(scale(vFrom1to2, -1)),
				radiusC2 = scale(normalFrom2to1, c2.B);
			setInfo(collisionInfo, rSum - dist, normalize(vFrom1to2), add(c2.C, radiusC2));
		}
		
		return 1;
	}
	
	// Rect vs Rect
	if(c1.T /*== 1*/ && c2.T /*== 1*/){
		var
		status1 = 0,
		status2 = 0;

		// find Axis of Separation for both rectangles
		status1 = findAxisLeastPenetration(c1, c2, collisionInfoR1);
		if(status1){
			status2 = findAxisLeastPenetration(c2, c1, collisionInfoR2);
			if(status2){
				
				// if both of rectangles are overlapping, choose the shorter normal as the normal     
				if(collisionInfoR1.D < collisionInfoR2.D){
					setInfo(collisionInfo, collisionInfoR1.D, collisionInfoR1.N, substract(collisionInfoR1.S, scale(collisionInfoR1.N, collisionInfoR1.D)));
				}
				
				else {
					setInfo(collisionInfo, collisionInfoR2.D, scale(collisionInfoR2.N, -1), collisionInfoR2.S);
				}
			}
		}
		return status1 && status2;
	}
	
	// Rectangle vs Circle
	// (c1 is the rectangle and c2 is the circle, invert the two if needed)
	if(!c1.T && c2.T /*== 1*/){
		[c1, c2] = [c2, c1];
	}
	
	if(c1.T /*== 1*/ && !c2.T){
		var
		inside = 1,
		bestDistance = -1e9,
		nearestEdge = 0,
		i, v,
		circ2Pos, projection;
		for(i = 4; i--;){
		
			// find the nearest face for center of circle    
			circ2Pos = c2.C;
			v = substract(circ2Pos, c1.X[i]);
			projection = dot(v, c1.N[i]);
			if(projection > 0){
			
				// if the center of circle is outside of c1angle
				bestDistance = projection;
				nearestEdge = i;
				inside = 0;
				break;
			}
			
			if(projection > bestDistance){
				bestDistance = projection;
				nearestEdge = i;
			}
		}
		var dis, normal;
		
		if(inside){
		
			// the center of circle is inside of c1angle
			setInfo(collisionInfo, c2.B - bestDistance, c1.N[nearestEdge], substract(circ2Pos, scale(c1.N[nearestEdge], c2.B)));
		}
		else {
			
			// the center of circle is outside of c1angle
			// v1 is from left vertex of face to center of circle 
			// v2 is from left vertex of face to right vertex of face
			var
			v1 = substract(circ2Pos, c1.X[nearestEdge]),
			v2 = substract(c1.X[(nearestEdge + 1) % 4], c1.X[nearestEdge]),
			dotp = dot(v1, v2);
			if(dotp < 0){
				
				// the center of circle is in corner region of X[nearestEdge]
				dis = length(v1);
				
				// compare the distance with radium to decide collision
				if(dis > c2.B){
					return;
				}
				normal = normalize(v1);
				setInfo(collisionInfo, c2.B - dis, normal, add(circ2Pos, scale(normal, -c2.B)));
			}
			else {
				
				// the center of circle is in corner region of X[nearestEdge+1]
				// v1 is from right vertex of face to center of circle 
				// v2 is from right vertex of face to left vertex of face
				v1 = substract(circ2Pos, c1.X[(nearestEdge + 1) % 4]);
				v2 = scale(v2, -1);
				dotp = dot(v1, v2); 
				if(dotp < 0){
					dis = length(v1);
					
					// compare the distance with radium to decide collision
					if(dis > c2.B){
						return;
					}
					normal = normalize(v1);
					setInfo(collisionInfo, c2.B - dis, normal, add(circ2Pos, scale(normal, -c2.B)));
				}
				
				else {
					
					// the center of circle is in face region of face[nearestEdge]
					if(bestDistance < c2.B){
						setInfo(collisionInfo, c2.B - bestDistance, c1.N[nearestEdge], substract(circ2Pos, scale(c1.N[nearestEdge], c2.B)));
					}
					
					else {
						return;
					}
				}
			}
		}
		return 1;
	}
};

var resolveCollision = (s1, s2, collisionInfo) => {
	if(!s1.M && !s2.M){
		return;
	}

	// correct positions
	var
	num = collisionInfo.D / (s1.M + s2.M) * .8, // .8 = poscorrectionrate = percentage of separation to project objects
	correctionAmount = scale(collisionInfo.N, num),
	n = collisionInfo.N;
	moveShape(s1, scale(correctionAmount, -s1.M));
	moveShape(s2, scale(correctionAmount, s2.M));

	// the direction of collisionInfo is always from s1 to s2
	// but the Mass is inversed, so start scale with s2 and end scale with s1
	var
	start = scale(collisionInfo.S, s2.M / (s1.M + s2.M)),
	end = scale(collisionInfo.E, s1.M / (s1.M + s2.M)),
	p = add(start, end),
	// r is vector from center of object to collision point
	r1 = substract(p, s1.C),
	r2 = substract(p, s2.C),

	// newV = V + v cross R
	v1 = add(s1.V, Vec2(-1 * s1.v * r1.y, s1.v * r1.x)),
	v2 = add(s2.V, Vec2(-1 * s2.v * r2.y, s2.v * r2.x)),
	relativeVelocity = substract(v2, v1),

	// Relative velocity in normal direction
	rVelocityInNormal = dot(relativeVelocity, n);

	// if objects moving apart ignore
	if(rVelocityInNormal > 0){
		return;
	}

	// compute and apply response impulses for each object  
	var newRestituion = Math.min(s1.R, s2.R),
		newFriction = Math.min(s1.F, s2.F),

	// R cross N
	R1crossN = cross(r1, n),
	R2crossN = cross(r2, n),

	// Calc impulse scalar
	// the formula of jN can be found in http://www.myphysicslab.com/collision.html
	jN = (-(1 + newRestituion) * rVelocityInNormal) / (s1.M + s2.M + R1crossN * R1crossN * s1.I + R2crossN * R2crossN * s2.I),

	// impulse is in direction of normal ( from s1 to s2)
	impulse = scale(n, jN);

	// impulse = F dt = m * ?v
	// ?v = impulse / m
	s1.V = substract(s1.V, scale(impulse, s1.M));
	s2.V = add(s2.V, scale(impulse, s2.M));
	s1.v -= R1crossN * jN * s1.I;
	s2.v += R2crossN * jN * s2.I;
	var
	tangent = scale(normalize(substract(relativeVelocity, scale(n, dot(relativeVelocity, n)))), -1),
	R1crossT = cross(r1, tangent),
	R2crossT = cross(r2, tangent),
	jT = (-(1 + newRestituion) * dot(relativeVelocity, tangent) * newFriction) / (s1.M + s2.M + R1crossT * R1crossT * s1.I + R2crossT * R2crossT * s2.I);

	// friction should less than force in normal direction
	if(jT > jN){
		jT = jN;
	}

	// impulse is from s1 to s2 (in opposite direction of velocity)
	impulse = scale(tangent, jT);
	s1.V = substract(s1.V, scale(impulse, s1.M));
	s2.V = add(s2.V, scale(impulse,s2.M));
	s1.v -= R1crossT * jT * s1.I;
	s2.v += R2crossT * jT * s2.I;
};

var runPhysics = () => {
	// draw static elements
	drawStaticElements(staticCanvas, staticContext);

	// Loop
	setInterval( advance, 1000 / physicsFrameRate );
	//requestAnimationFrame( advance );

	TweenFX.addTimedCallback( animate, 1000 / animationFrameRate );
	//advance();
}

var advance = (i,j,k) => {
	if (paused) return;

	balls.forEach(ball => {
		ball.D.x = ball.C.x;
		ball.D.y = ball.C.y;
	});

	// Compute collisions
	//const collisions = [];
	for(i = objects.length; i--;){
		for(j = objects.length; j-- > i;){

			// Test bounds
			if(boundTest(objects[i], objects[j]) && i != j){

				// Test collision
				if(testCollision(objects[i], objects[j], collisionInfo)){

					// Make sure the normal is always from object[i] to object[j]
					if(dot(collisionInfo.N, substract(objects[j].C, objects[i].C)) < 0){
						collisionInfo = {
							D: collisionInfo.D,
							N: scale(collisionInfo.N, -1),
							S: collisionInfo.E,
							E: collisionInfo.S
						};
					}

					// Send bounce event
					if (objects[i].O && !(objects[i].O > 0) && objects[i].R && objects[j].O) {
						//collisions.push([objects[i], objects[j]]);
						objects[i].O(objects[j], objects[i]);
						//if (objects[i].R != defaultRestitution) break;
					}
					if (objects[j].O && !(objects[j].O > 0) && objects[j].R && objects[i].O) {
						//collisions.push([objects[j], objects[i]]);
						objects[j].O(objects[i], objects[j]);
						//if (objects[i].R != defaultRestitution) break;
					}

					// Resolve collision
					resolveCollision(objects[i], objects[j], collisionInfo);
				}
			}
		}

		// Update objects position/rotation
		objects[i].V = add(objects[i].V, scale(objects[i].A, 1/physicsFrameRate));
		moveShape(objects[i], scale(objects[i].V, 1/physicsFrameRate));
		objects[i].v += objects[i].a * 1/physicsFrameRate;
		rotateShape(objects[i], objects[i].v * 1/physicsFrameRate);
	}

	//if (collisions.length) console.log(collisions);
	/*collisions.forEach(collisionObject => {
		collisionObject[0].O(collisionObject[1], collisionObject[0]);
	});*/

	balls.forEach(ball => {
		if (Math.round(ball.C.y) > 1960) {
			// a ball has fallen
			let ballsInMotion = 0;
			balls.forEach(ballInMotion => {
				if (ballInMotion.v) {
					ballsInMotion ++;
				}
			});
			if (ballsInMotion == 1) resetBall();
			else {
				balls.splice(balls.indexOf(ball), 1);
				removeObject(ball);
			}
		} else {
			if (Math.round(ball.C.x) == 555 && ball.D.y < 200 && ball.C.y > 200) {
				//console.log("GG1");debugger
				//Switcher.
			}
		
			if (Math.round(ball.C.x) == 475 && ball.D.y < 190 && ball.C.y > 190) {
				//console.log("GG2");debugger
			}
		
			if (Math.round(ball.C.x) == 395 && ball.D.y < 180 && ball.C.y > 180) {
				//console.log("GG3");debugger
			}
		
			if (Math.round(ball.C.x) == 315 && ball.D.y < 160 && ball.C.y > 160) {
				//console.log("GG4");debugger
			}
		}
	});

	

	//console.log(balls[0].C.x, balls[0].C.y, balls[0].D.x, balls[0].D.y);
}

function animate() {

	if (!state && step) return;

	step ++;

	if (debug) {
		if (!fps) {
			fps = document.createElement('div');
			menuDiv.appendChild(fps);
			fps.style.fontFamily = "Arial";
			fps.style.fontSize = "30px";
			fps.style.pointerEvents = "none";
		}
		var time = Date.now();
		frame++;
		if (time - startTime > 1000) {
			fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
			startTime = time;
			frame = 0;
		}
	}

	drawDynamicElements(gameCanvas, gameContext);
}

function drawDynamicElements(canvas, context) {

	// Reset
	//canvas.width ^= 0;
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Draw / Update scene
	for(let i = objects.length; i--;) {

		context.save();
		context.translate(objects[i].C.x, objects[i].C.y);
		context.rotate(objects[i].G);

		// Circle
		if (!objects[i].T) {
			if (objects[i].O == Bounce.flipper) {
				// flipper tip
			} else
			if (objects[i].O > 0) {
				// bumpers
			} else
			if (objects[i].O) {
				// ball
				context.beginPath();
				context.arc(0, 0, objects[i].B, 0, 7);
				context.closePath();
				// ball metallic gradient
				const gradient = context.createRadialGradient(-10, -10, 5, -5, -5, 35);
				gradient.addColorStop(0.1, "white");
				gradient.addColorStop(0.75, "#bbb");
				gradient.addColorStop(1, "white");
				context.fillStyle = gradient;
				//context.strokeStyle = '#000';
				//context.lineWidth = 1;
				context.fill();//context.stroke();
			} else {
				// walls
			}
		}

		// Rectangle
		else {
			// draw flippers
			if (objects[i].O == Bounce.flipper) {
				context.beginPath();
				context.arc(0, 0, 28, 1.6, 4.6, objects[i].G < 0);
				context.arc(objects[i].G > 0 ? 150 : -150, 12, 12, 4.6, 1.6, objects[i].G < 0);
				context.closePath();

				context.fillStyle = '#bbb';
				context.fill();
				context.strokeStyle = "#fff";
				context.lineWidth = 6;
				context.stroke();
			}
		}

		context.restore();
	}

	// Debug display
	if (debug) {
		for(let i = objects.length; i--;){
			context.save();
			context.translate(objects[i].C.x, objects[i].C.y);
			context.rotate(objects[i].G);

			// Circle
			if (!objects[i].T) {
				context.beginPath();
				context.arc(0, 0, objects[i].B, 0, 7);
				context.lineTo(0, 0);
				context.closePath();
				if (debugFills) {
					if (objects[i].O >= 0) {
						context.fillStyle = objects[i].O == 1 ? 'green' : objects[i].O == 2 ? '#c00' : '#800';
						context.fill();
					}
				}
				context.lineWidth = 2;
				context.strokeStyle = "#0f0";
				context.stroke();
			}

			// Rectangle
			else {
				if (debugFills) {
					if (objects[i].O >= 0) {
						context.fillStyle = objects[i].O == 1 ? 'green' : objects[i].O == 2 ? '#c00' : '#800';
						context.fillRect(-objects[i].W / 2, -objects[i].H / 2, objects[i].W, objects[i].H);
					}
				}
				context.lineWidth = 2;
				context.strokeStyle = "#0f0";
				context.strokeRect(-objects[i].W / 2, -objects[i].H / 2, objects[i].W, objects[i].H);
			}
			
			context.restore();
		}
	}
};

function drawStaticElements(canvas, context) {

	// Reset
	//canvas.width ^= 0;
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Draw / Update scene
	for(let i = objects.length; i--;) {

		// Draw
		// ----
		context.save();
		context.translate(objects[i].C.x, objects[i].C.y);
		context.rotate(objects[i].G);
		context.lineWidth = 5;
		context.strokeStyle = boardStrokeStyle;

		// Circle
		if (!objects[i].T) {
			if (objects[i].O == 1) {
				// flipper tip
			} else
			if (objects[i].O > 0) {//console.warn(objects[i].O);
				// bumpers
				context.beginPath();
				context.setLineDash([5, 10+(step%5)]);
				context.arc(0, 0, objects[i].B + 16 - objects[i].O*2, 0, 7);
				context.closePath();
				context.fillStyle = objects[i].O == 6 ? boardKnobColor : objects[i].O == 4 ? boardHoleColor : boardBumperColor;
				context.fill();
				context.strokeStyle = boardStrokeColor;
				context.stroke();
			} else
			if (objects[i].O) {
				// ball
			} else {
				// walls
				context.beginPath();
				context.arc(0, 0, objects[i].B, 0, 7);
				context.closePath();
				context.fillStyle = boardCornerStoneColor;
				context.fill();context.stroke();
			}
		}

		// Rectangle
		else {
			// draw flippers
			if (objects[i].O == 1) {
				// flipper
			} else if (objects[i].O == 2) {
				// kicker
				context.fillStyle = boardKickerAreaColor;// yellow color hit area
				context.fillRect(-objects[i].W / 2, -objects[i].H / 2, objects[i].W, objects[i].H);
			} else if (objects[i].O == 3) {
				
			}/* else if (objects[i].O == Bounce.hole) {
				
			} */else {
				context.fillStyle = randomGreyHex(86, 96);
				context.fillRect(-objects[i].W / 2, -objects[i].H / 2, objects[i].W, objects[i].H);
				context.strokeRect(-objects[i].W / 2, -objects[i].H / 2, objects[i].W, objects[i].H);
			}
		}

		context.restore();
	}
};

function randomGreyHex(topLimit = 0, bottomLimit = 0) {
	var v = (bottomLimit + Math.random()*(256-bottomLimit-topLimit)|0).toString(16);
	var w = (parseInt(v,16)+0x0e).toString(16);
	return "#" + v + w + w;
}

// New circle
var Circle = (center, radius, mass, friction, restitution, checkBounce = 0, priority = 0) =>
	RigidShape(center, mass, friction, restitution, 0, radius, null, null, null, checkBounce, priority);

// New rectangle
var Rectangle = (center, width, height, mass, friction, restitution, checkBounce = 0, priority = 0) =>
	RigidShape(center, mass, friction, restitution, 1, Math.hypot(width, height)/2, width, height, null, checkBounce, priority);
