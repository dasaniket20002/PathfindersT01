class DijkstraAlgorithm {
	//uniform cost
	static cost_function(u, v) {
		if (u.x == v.x || u.y == v.y)
			return 1; // cost for up, down, left, right
		else return 1.414; // cost for diagonal tiles
	}
	//distance between 2 points
	static distance_function(u, v) {
		return Math.sqrt((u.x - v.x) * (u.x - v.x) + (u.y - v.y) * (u.y - v.y));
	}

	initialize(grid) {
		this.nodes = [];

		for (let e = 0; e < grid.tiles.length; e++) {
			let tile = grid.tiles[e];
			if (tile.is_wall) continue;
			let node = new DijkstraNode(tile);
			if (node.x == grid.seeker.x && node.y == grid.seeker.y) {
				node.du = 0;
				this.seeker_node = node;
			} else if (node.x == grid.target.x && node.y == grid.target.y) {
				this.target_node = node;
			}
			this.nodes.push(node);
		}

		for (let e = 0; e < this.nodes.length; e++) {
			let node = this.nodes[e];
			for (let i = -1; i <= 1; i++) {
				for (let j = -1; j <= 1; j++) {
					if (i == 0 && j == 0) continue;
					if (
						node.x + i >= 0 &&
						node.x + i < grid.gridSizeX &&
						node.y + j >= 0 &&
						node.y + j < grid.gridSizeY
					) {
						let index =
							(node.x + i) * grid.gridSizeY + (node.y + j);
						let neighbour = this.getNode(
							grid.tiles[index].x,
							grid.tiles[index].y
						);

						if (neighbour == undefined) continue;

						node.adjacent_nodes.push(neighbour);
					}
				}
			}
		}
	}

	evaluate() {
		let traversedTiles = [];
		let isPathFound = false;

		while (this.nodes.length >= 0) {
			let node = this.getSmallestNode();

			if (node.x == this.target_node.x && node.y == this.target_node.y) {
				node.is_visited = true;
				traversedTiles.push(node);
				isPathFound = true;
				break;
			}
			if (node.du == Infinity) break;

			for (let i = 0; i < node.adjacent_nodes.length; i++) {
				let neighbour = node.adjacent_nodes[i];
				if (neighbour.is_visited) continue;
				if (
					node.du + DijkstraAlgorithm.cost_function(node, neighbour) <
					neighbour.du
				) {
					neighbour.du =
						node.du +
						DijkstraAlgorithm.cost_function(node, neighbour);
					neighbour.previous_node = node;
				}
			}

			node.is_visited = true;
			traversedTiles.push(node);
		}
		if (!isPathFound) console.log("Path unavailable");
		return traversedTiles;
	}

	getShortestPath() {
		let path = [];
		let current = this.target_node;
		while (current != undefined) {
			path.push(current);
			current = current.previous_node;
		}
		return path;
	}

	getSmallestNode() {
		for (let i = 1; i < this.nodes.length; i++) {
			if (this.nodes[0].du > this.nodes[i].du) {
				let temp = this.nodes[0];
				this.nodes[0] = this.nodes[i];
				this.nodes[i] = temp;
			}
		}

		return this.nodes.shift();
	}

	getNode(x, y) {
		for (let i = 0; i < this.nodes.length; i++) {
			if (this.nodes[i].x == x && this.nodes[i].y == y)
				return this.nodes[i];
		}
	}
}
