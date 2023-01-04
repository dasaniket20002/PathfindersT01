class Grid {
	constructor(windowW, windowH) {
		this.gridSizeX = Math.floor(windowW / Tile.TILE_SIZE);
		this.gridSizeY = Math.floor(windowH / Tile.TILE_SIZE);

		this.constructTiles();
		this.seeker = new Seeker(0, 0);
		this.target = new Target(0, 0);
		this.regenerateAgents();
	}
	constructTiles() {
		this.tiles = [];
		for (let i = 0; i < this.gridSizeX; i++) {
			for (let j = 0; j < this.gridSizeY; j++) {
				this.tiles.push(new Tile(i, j));
			}
		}
	}

	regenerateAgents() {
		let randomTile1 = random(this.tiles);
		while (randomTile1.is_wall || randomTile1.is_occupied)
			randomTile1 = random(this.tiles);
		randomTile1.is_occupied = true;

		let randomTile2 = random(this.tiles);
		while (randomTile2.is_wall || randomTile2.is_occupied)
			randomTile2 = random(this.tiles);
		randomTile2.is_occupied = true;

		this.seeker.updateLoc(randomTile1.x, randomTile1.y);
		this.target.updateLoc(randomTile2.x, randomTile2.y);
	}

	draw() {
		strokeWeight(2);
		this.tiles.forEach(function (tile) {
			tile.draw();
		});
		strokeWeight(1);
		this.seeker.draw();
		this.target.draw();
	}
}
