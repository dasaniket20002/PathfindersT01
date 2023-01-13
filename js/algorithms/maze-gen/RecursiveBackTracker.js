class MazeTile extends Tile {
	constructor(tile) {
		super(tile.x, tile.y);
		this.is_wall = true;
		this.is_visited = false;
		this.neighbours = [];
	}
	getUnvisitedNeighbours() {
		let unvisitedNeighbours = [];
		for (let i = 0; i < this.neighbours.length; i++) {
			if (!this.neighbours[i].is_visited) {
				unvisitedNeighbours.push(this.neighbours[i]);
			}
		}
		return unvisitedNeighbours;
	}

	getMiddleTileIndex(tile) {
		if (this.x == tile.x) {
			let i = tile.y - this.y;
			if (i > 0) return [this.x, this.y + 1];
			else return [this.x, this.y - 1];
		} else if (this.y == tile.y) {
			let i = tile.x - this.x;
			if (i > 0) return [this.x + 1, this.y];
			else return [this.x - 1, this.y];
		}
	}
}
class RecursiveBackTracker {
	static generate(grid) {
		let mazeTiles = [];
		let visitedStack = [];

		let visitOrder = [];

		for (let i = 0; i < grid.tiles.length; i++) {
			let mazeTile = new MazeTile(grid.tiles[i]);
			mazeTiles.push(mazeTile);
		}

		let neighbourIndices = [
			[2, 0],
			[0, 2],
			[-2, 0],
			[0, -2],
		];
		for (let e = 0; e < mazeTiles.length; e++) {
			let mazeTile = mazeTiles[e];
			for (let i = 0; i < neighbourIndices.length; i++) {
				if (
					mazeTile.x + neighbourIndices[i][0] >= 0 &&
					mazeTile.x + neighbourIndices[i][0] < grid.gridSizeX &&
					mazeTile.y + neighbourIndices[i][1] >= 0 &&
					mazeTile.y + neighbourIndices[i][1] < grid.gridSizeY
				) {
					let index =
						(mazeTile.x + neighbourIndices[i][0]) * grid.gridSizeY +
						(mazeTile.y + neighbourIndices[i][1]);
					let neighbour = mazeTiles[index];
					mazeTile.neighbours.push(neighbour);
				}
			}
		}

		let startTile = random(mazeTiles);
		startTile.is_visited = true;
		startTile.is_wall = false;
		visitedStack.push(startTile);

		let currentTile = random(startTile.getUnvisitedNeighbours());
		currentTile.is_visited = true;
		currentTile.is_wall = false;
		visitedStack.push(currentTile);

		let middleIndex = startTile.getMiddleTileIndex(currentTile);
		let middleTile =
			mazeTiles[middleIndex[0] * grid.gridSizeY + middleIndex[1]];
		middleTile.is_wall = false;
		middleTile.is_visited = true;

		visitOrder.push(startTile);
		visitOrder.push(middleTile);
		visitOrder.push(currentTile);

		while (true) {
			if (currentTile.x == startTile.x && currentTile.y == startTile.y)
				break;

			let unvisitedNeighbours = currentTile.getUnvisitedNeighbours();
			if (unvisitedNeighbours.length == 0) {
				currentTile = visitedStack.pop();
				visitOrder.push(currentTile);
				continue;
			}
			let prevTile = currentTile;

			currentTile = random(unvisitedNeighbours);
			currentTile.is_visited = true;
			currentTile.is_wall = false;
			visitedStack.push(currentTile);

			middleIndex = prevTile.getMiddleTileIndex(currentTile);
			middleTile =
				mazeTiles[middleIndex[0] * grid.gridSizeY + middleIndex[1]];
			middleTile.is_wall = false;
			middleTile.is_visited = true;

			visitOrder.push(middleTile);
			visitOrder.push(currentTile);
		}

		return visitOrder;
	}
}
