class Tile {
	static TILE_SIZE = 30;

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

	draw() {
		if (this.is_wall) fill(50);
		else noFill();
		stroke(110);
		square(
			this.x * Tile.TILE_SIZE,
			this.y * Tile.TILE_SIZE,
			Tile.TILE_SIZE
		);
	}
}
