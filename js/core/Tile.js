class Tile {
	static TILE_SIZE = 30;
	static TILE_ANIM_SIZE = Tile.TILE_SIZE + 10;

	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.is_wall = false;
		this.is_occupied = false;

		this.is_visited = false;
		this.is_path = false;

		this.anim_tileSize = 0;

		this.color = color(0);
		this.curr_color = color(0);

		this.is_highlight = false;
	}

	setWall() {
		this.is_wall = true;
		this.startAnimateWall();
	}
	setFloor() {
		this.is_wall = false;
		this.startAnimateFloor();
	}
	toggleWall() {
		if (this.is_wall) this.setFloor();
		else this.setWall();
	}

	draw() {
		if (this.is_wall) this.drawWall();
		else {
			if (this.is_path) this.drawPathNodes();
			else if (this.is_visited) this.drawVisitedNodes();
			else this.drawFloor();
		}
		if (this.is_highlight) {
			fill(this.curr_color);
			square(
				this.x * Tile.TILE_SIZE,
				this.y * Tile.TILE_SIZE,
				Tile.TILE_SIZE
			);
		}

		this.curr_color = lerpColor(this.curr_color, this.color, 0.1);
	}

	startAnimateFloor() {
		this.anim_tileSize = Tile.TILE_SIZE;
		this.color = color(0);
	}
	drawFloor() {
		push();

		stroke(110);
		translate(
			this.x * Tile.TILE_SIZE + Tile.TILE_SIZE / 2,
			this.y * Tile.TILE_SIZE + Tile.TILE_SIZE / 2
		);
		rectMode(CENTER);

		if (this.anim_tileSize > 5) {
			this.anim_tileSize -= this.anim_tileSize * 0.5;
			fill(this.curr_color);
			square(0, 0, this.anim_tileSize);
		} else {
			this.anim_tileSize = 0;
			noFill();
			square(0, 0, Tile.TILE_SIZE);
		}

		pop();
	}

	startAnimateWall() {
		this.anim_tileSize = Tile.TILE_ANIM_SIZE;
		this.color = color(50, 50, 50);
	}
	drawWall() {
		push();
		fill(this.curr_color);
		stroke(110);
		translate(
			this.x * Tile.TILE_SIZE + Tile.TILE_SIZE / 2,
			this.y * Tile.TILE_SIZE + Tile.TILE_SIZE / 2
		);
		rectMode(CENTER);
		square(0, 0, this.anim_tileSize);
		pop();

		if (this.anim_tileSize > Tile.TILE_SIZE) {
			this.anim_tileSize -= this.anim_tileSize * 0.1;
		}
		if (this.anim_tileSize < Tile.TILE_SIZE) {
			this.anim_tileSize = Tile.TILE_SIZE;
		}
	}

	setVisited() {
		this.is_visited = true;
		this.startAnimateVisited();
	}
	setUnvisited() {
		this.is_visited = false;
		this.color = color(0);
	}

	startAnimateVisited() {
		if (this.is_wall || this.is_path) return;
		this.color = color(0, 255, 0);
	}

	drawVisitedNodes() {
		if (this.is_wall || this.is_path) return;
		push();
		fill(this.curr_color);
		stroke(110);
		square(
			this.x * Tile.TILE_SIZE,
			this.y * Tile.TILE_SIZE,
			Tile.TILE_SIZE
		);
		pop();
	}

	setPath() {
		this.is_path = true;
		this.startAnimatePath();
	}
	clearPath() {
		this.is_path = false;
		this.color = color(0);
	}

	startAnimatePath() {
		this.color = color(255, 255, 0);
	}

	drawPathNodes() {
		push();
		fill(this.curr_color);
		stroke(110);
		square(
			this.x * Tile.TILE_SIZE,
			this.y * Tile.TILE_SIZE,
			Tile.TILE_SIZE
		);
		pop();
	}

	drawDebug() {
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
