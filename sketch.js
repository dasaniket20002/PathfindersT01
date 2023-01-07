var canvas;
var grid;
var drawWallMode;

var isSeekerHeld;
var isTargetHeld;
var previousHeldTile;

var algorithm;
var visited_nodes;
var path_nodes;

var maze;

function setup() {
	createCanvas(windowWidth, windowHeight - 0.1 * windowHeight);
	grid = new Grid(width, height);
	drawWallMode = false;

	isSeekerHeld = false;
	isTargetHeld = false;

	algorithm = new DijkstraAlgorithm();
	visited_nodes = [];
	path_nodes = [];
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight - 0.1 * windowHeight);
}

function update() {
	if (isSeekerHeld) {
		grid.seeker.updateLoc(mouseX / Tile.TILE_SIZE, mouseY / Tile.TILE_SIZE);
	}
	if (isTargetHeld) {
		grid.target.updateLoc(mouseX / Tile.TILE_SIZE, mouseY / Tile.TILE_SIZE);
	}
}

function draw() {
	update();
	background(220);

	if (visited_nodes.length > 0) {
		visited_nodes.forEach((element) => {
			element.drawVisitedNodes();
		});
	}
	if (path_nodes.length > 1) {
		path_nodes.forEach((element) => {
			element.drawPathNodes();
		});
	}
	grid.draw();
}

function setAlgorithm() {
	//TODO
}
function evaluateAlgorithm() {
	algorithm.initialize(grid);
	visited_nodes = algorithm.evaluate();
	path_nodes = algorithm.getShortestPath();
}

function generateMaze() {
	let maze = RecursiveBackTracker.generate(grid);
	if (maze.length != grid.tiles.length) return;
	for (let i = 0; i < grid.tiles.length; i++) {
		grid.tiles[i].is_wall = maze[i].is_wall;
	}
	grid.regenerateAgents();
	visited_nodes = [];
	path_nodes = [];
}

function mousePressed() {
	if (drawWallMode) {
		let t = getClickedTile();
		if (t != undefined && !t.is_occupied) t.toggleWall();
	}
}

function mouseDragged() {
	let t = getClickedTile();
	if (drawWallMode) {
		if (t != undefined && !t.is_occupied) t.setWall();
	} else {
		if (t != undefined && t.is_occupied) {
			if (grid.seeker.x == t.x && grid.seeker.y == t.y && !isTargetHeld) {
				//Seeker Dragged
				isSeekerHeld = true;
				previousHeldTile = t;
				previousHeldTile.is_occupied = false;
			}
			if (grid.target.x == t.x && grid.target.y == t.y && !isSeekerHeld) {
				//Target Dragged
				isTargetHeld = true;
				previousHeldTile = t;
				previousHeldTile.is_occupied = false;
			}
		}
	}
}

function mouseReleased() {
	if (!drawWallMode) {
		let t = getClickedTile();
		if (t == undefined || t.is_wall || t.is_occupied) {
			revertPositions();
		} else {
			updatePositions(t);
		}
		visited_nodes = [];
		path_nodes = [];
	}
}

function revertPositions() {
	if (isSeekerHeld) {
		isSeekerHeld = false;
		grid.seeker.updateLoc(previousHeldTile.x, previousHeldTile.y);
		previousHeldTile.is_occupied = true;
	}
	if (isTargetHeld) {
		isTargetHeld = false;
		grid.target.updateLoc(previousHeldTile.x, previousHeldTile.y);
		previousHeldTile.is_occupied = true;
	}
}
function updatePositions(t) {
	if (isSeekerHeld) {
		isSeekerHeld = false;
		grid.seeker.updateLoc(t.x, t.y);
		t.is_occupied = true;
	}
	if (isTargetHeld) {
		isTargetHeld = false;
		grid.target.updateLoc(t.x, t.y);
		t.is_occupied = true;
	}
}

function getClickedTile() {
	let clickX = Math.floor(mouseX / Tile.TILE_SIZE);
	let clickY = Math.floor(mouseY / Tile.TILE_SIZE);

	if (
		clickX >= 0 &&
		clickX < grid.gridSizeX &&
		clickY >= 0 &&
		clickY < grid.gridSizeY
	) {
		let tileIndex = clickX * grid.gridSizeY + clickY;
		return grid.tiles[tileIndex];
	}
}
