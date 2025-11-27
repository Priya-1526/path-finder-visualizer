// ---------- DIJKSTRA ----------
export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;

  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) return visitedNodesInOrder;

    updateDijkstraNeighbors(closestNode, grid);
  }
}

// ---------- A* SEARCH ----------
export function AStar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];

  // Initialize costs
  startNode.gCost = 0;
  startNode.hCost = getManhattanDistance(startNode, finishNode);
  startNode.fCost = startNode.gCost + startNode.hCost;

  const openSet = getAllNodes(grid);

  while (openSet.length) {
    openSet.sort((a, b) => a.fCost - b.fCost);
    const current = openSet.shift();

    if (current.isWall) continue;
    if (current.fCost === Infinity) return visitedNodesInOrder;

    current.isVisited = true;
    visitedNodesInOrder.push(current);

    if (current === finishNode) return visitedNodesInOrder;

    updateAStarNeighbors(current, grid, finishNode);
  }
}

// ---------- BFS ----------
export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const queue = [startNode];

  startNode.isVisited = true;

  while (queue.length) {
    const node = queue.shift();
    visitedNodesInOrder.push(node);

    if (node === finishNode) return visitedNodesInOrder;

    const neighbors = getNeighbors(node, grid);
    
    for (const next of neighbors) {
      if (!next.isVisited && !next.isWall) {
        next.isVisited = true;
        next.previousNode = node;
        queue.push(next);
      }
    }
  }
  return visitedNodesInOrder;
}

// ---------- DFS ----------
export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const stack = [startNode];

  while (stack.length) {
    const node = stack.pop();

    if (node.isWall || node.isVisited) continue;

    node.isVisited = true;
    visitedNodesInOrder.push(node);

    if (node === finishNode) return visitedNodesInOrder;

    const neighbors = getNeighbors(node, grid);

    // Push in reverse order to match typical visual patterns
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const next = neighbors[i];
      if (!next.isVisited) {
        next.previousNode = node;
        stack.push(next);
      }
    }
  }
  return visitedNodesInOrder;
}

// ---------- HELPERS ----------
function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) for (const node of row) {
    node.fCost = Infinity;
    node.gCost = Infinity;
    node.hCost = Infinity;
    nodes.push(node);
  }
  return nodes;
}

function sortNodesByDistance(nodes) {
  nodes.sort((a, b) => a.distance - b.distance);
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors;
}

function updateDijkstraNeighbors(node, grid) {
  const neighbors = getNeighbors(node, grid);

  for (const neighbor of neighbors) {
    if (!neighbor.isVisited && !neighbor.isWall) {
      const newDist = node.distance + 1;
      if (newDist < neighbor.distance) {
        neighbor.distance = newDist;
        neighbor.previousNode = node;
      }
    }
  }
}

function updateAStarNeighbors(node, grid, finishNode) {
  const neighbors = getNeighbors(node, grid);

  for (const neighbor of neighbors) {
    if (neighbor.isWall) continue;

    const tentativeG = node.gCost + 1;

    if (tentativeG < neighbor.gCost) {
      neighbor.gCost = tentativeG;
      neighbor.hCost = getManhattanDistance(neighbor, finishNode);
      neighbor.fCost = neighbor.gCost + neighbor.hCost;
      neighbor.previousNode = node;
    }
  }
}

function getManhattanDistance(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}
