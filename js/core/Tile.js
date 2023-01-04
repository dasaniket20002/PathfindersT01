class Tile {
	static TILE_SIZE = 30;
	static IS_DEBUG = false;

	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.is_wall = false;
		this.is_occupied = false;
	}

	setWall() {
		this.is_wall = true;
	}
	setFloor() {
		this.is_wall = false;
	}
	toggleWall() {
		this.is_wall = !this.is_wall;
	}

	draw(num = 50) {
		if (this.is_wall) fill(num);
		else noFill();
		stroke(110);
		square(
			this.x * Tile.TILE_SIZE,
			this.y * Tile.TILE_SIZE,
			Tile.TILE_SIZE
		);
		noFill();

		if (Tile.IS_DEBUG) {
			fill(0);
			textSize(10);
			textAlign(CENTER);
			text(
				this.x + "," + this.y,
				this.x * Tile.TILE_SIZE,
				this.y * Tile.TILE_SIZE + 2,
				Tile.TILE_SIZE,
				Tile.TILE_SIZE
			);
			noFill();
		}
	}

	drawVisitedNodes() {
		fill(0, 255, 0);
		stroke(110);
		square(
			this.x * Tile.TILE_SIZE,
			this.y * Tile.TILE_SIZE,
			Tile.TILE_SIZE
		);
		noFill();

		if (Tile.IS_DEBUG) {
			fill(0);
			textSize(10);
			textAlign(CENTER);
			text(
				this.x + "," + this.y,
				this.x * Tile.TILE_SIZE,
				this.y * Tile.TILE_SIZE + 2,
				Tile.TILE_SIZE,
				Tile.TILE_SIZE
			);
			noFill();
		}
	}

	drawPathNodes() {
		fill(255, 255, 0);
		stroke(110);
		square(
			this.x * Tile.TILE_SIZE,
			this.y * Tile.TILE_SIZE,
			Tile.TILE_SIZE
		);
		noFill();

		if (Tile.IS_DEBUG) {
			fill(0);
			textSize(10);
			textAlign(CENTER);
			text(
				this.x + "," + this.y,
				this.x * Tile.TILE_SIZE,
				this.y * Tile.TILE_SIZE + 2,
				Tile.TILE_SIZE,
				Tile.TILE_SIZE
			);
			noFill();
		}
	}
}
