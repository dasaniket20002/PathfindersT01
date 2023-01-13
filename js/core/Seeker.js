class Seeker {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	updateLoc(x, y) {
		this.x = x;
		this.y = y;
	}

	draw() {
		push();
		fill(0);
		textSize(Tile.TILE_SIZE - 5);
		textAlign(CENTER, CENTER);
		text(
			"O",
			this.x * Tile.TILE_SIZE,
			this.y * Tile.TILE_SIZE + 2,
			Tile.TILE_SIZE,
			Tile.TILE_SIZE
		);
		noFill();

		stroke("red");
		rect(
			this.x * Tile.TILE_SIZE,
			this.y * Tile.TILE_SIZE,
			Tile.TILE_SIZE,
			Tile.TILE_SIZE
		);
		noStroke();
		pop();
	}
}
