var canvas;
var grid;
var drawWallMode;

var isSeekerHeld;
var isTargetHeld;
var previousHeldTile;

var algorithm;
var visited_nodes;
var path_nodes;

var mazeVisitOrder;

function setup() {
	createCanvas(windowWidth, windowHeight - 0.1 * windowHeight);
	colorMode(RGB);

	grid = new Grid(width, height);
	drawWallMode = false;

	isSeekerHeld = false;
	isTargetHeld = false;

	algorithm = new DijkstraAlgorithm();
	visited_nodes = [];
	path_nodes = [];
	visitedAnimOver = false;
}

function draw() {
	update();
	background(247);

	grid.draw();
}

function update() {
	if (isSeekerHeld) {
		grid.seeker.updateLoc(mouseX / Tile.TILE_SIZE, mouseY / Tile.TILE_SIZE);
	}
	if (isTargetHeld) {
		grid.target.updateLoc(mouseX / Tile.TILE_SIZE, mouseY / Tile.TILE_SIZE);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight - 0.1 * windowHeight);
}

function setAlgorithm() {
	//TODO
}
function evaluateAlgorithm() {
	this.resetVisitedAndPath();

	algorithm.initialize(grid);
	visited_nodes = algorithm.evaluate();
	path_nodes = algorithm.getShortestPath();

	anim_visitedNodes(10);
}

function generateMaze() {
	mazeVisitOrder = RecursiveBackTracker.generate(grid);
	this.resetVisitedAndPath();

	for (let i = 0; i < grid.tiles.length; i++) {
		grid.tiles[i].setWall();
	}
	anim_generateMaze(10);
}

function resetVisitedAndPath() {
	visited_nodes = [];
	path_nodes = [];

	grid.tiles.forEach((element) => {
		element.setUnvisited();
		element.clearPath();
	});
}
