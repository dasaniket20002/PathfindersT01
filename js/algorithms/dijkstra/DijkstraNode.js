class DijkstraNode extends Tile {
	constructor(tile) {
		super(tile.x, tile.y);
		this.x = tile.x;
		this.y = tile.y;
		this.is_wall = tile.is_wall;
		this.is_occupied = tile.is_occupied;

		this.du = Infinity;
		this.is_visited = false;

		this.adjacent_nodes = [];
		this.previous_node = undefined;
	}
}
