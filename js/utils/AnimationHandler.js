function anim_generateMaze(mult, i = 0) {
	for (let itr = 0; itr < mult; itr++) {
		let gridIndex =
			mazeVisitOrder[i].x * grid.gridSizeY + mazeVisitOrder[i].y;

		if (mazeVisitOrder[i].is_wall && !grid.tiles[gridIndex].is_wall) {
			grid.tiles[gridIndex].setWall();
		} else if (
			!mazeVisitOrder[i].is_wall &&
			grid.tiles[gridIndex].is_wall
		) {
			grid.tiles[gridIndex].setFloor();
		}

		grid.tiles[gridIndex].is_highlight = true;
		grid.tiles[gridIndex].curr_color = color(204, 0, 255);

		setTimeout(function () {
			grid.tiles[gridIndex].is_highlight = false;
		}, 10);

		i++;
		if (i > mazeVisitOrder.length - 1) break;
	}
	if (i < mazeVisitOrder.length) {
		setTimeout(function () {
			anim_generateMaze(mult, i);
		}, 20);
	} else {
		grid.regenerateAgents();
	}
}

function anim_visitedNodes(mult, i = 0) {
	if (visited_nodes.length <= 0) return;
	for (let itr = 0; itr < mult; itr++) {
		let gridIndex =
			visited_nodes[i].x * grid.gridSizeY + visited_nodes[i].y;

		grid.tiles[gridIndex].setVisited();

		grid.tiles[gridIndex].is_highlight = true;
		grid.tiles[gridIndex].curr_color = color(204, 0, 255);

		setTimeout(function () {
			grid.tiles[gridIndex].is_highlight = false;
		}, 10);

		i++;
		if (i > visited_nodes.length - 1) break;
	}

	if (i < visited_nodes.length) {
		setTimeout(function () {
			anim_visitedNodes(mult, i);
		}, 10);
	} else {
		anim_pathNodes(mult);
	}
}

function anim_pathNodes(mult, i = 0) {
	if (path_nodes.length <= 0) return;
	for (let itr = 0; itr < mult; itr++) {
		let gridIndex = path_nodes[i].x * grid.gridSizeY + path_nodes[i].y;

		grid.tiles[gridIndex].setPath();

		grid.tiles[gridIndex].is_highlight = true;
		grid.tiles[gridIndex].curr_color = color(204, 0, 255);

		setTimeout(function () {
			grid.tiles[gridIndex].is_highlight = false;
		}, 10);

		i++;
		if (i > path_nodes.length - 1) break;
	}

	if (i < path_nodes.length) {
		setTimeout(function () {
			anim_pathNodes(mult, i);
		}, 10);
	}
}
