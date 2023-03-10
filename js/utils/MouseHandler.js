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
		this.resetVisitedAndPath();
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
