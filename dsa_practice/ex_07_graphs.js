
// ======================================================
// 🗺️ GRAPH ARCHITECTURE HELPER
// ======================================================

const defaultGraph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B'],
    'F': ['C']
};


// ======================================================
// 1. Standard BFS Traversal [Difficulty: Easy-Medium 🟢🟡]
// Goal: Breadth-First exploration utilizing a FIFO queue.
// ======================================================

const bfsTraversal = (graph, startNode) => {
    const visited = new Set([startNode]);
    const queue = [startNode];
    const path = [];

    while (queue.length > 0) {
        const currentNode = queue.shift();
        path.push(currentNode);

        // Process neighboring edges
        for (const neighbor of graph[currentNode]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return path;
};

// TEST LOG:
console.log("\n--- BFS Traversal Results ---");
console.log("Level-by-level path starting at A:", bfsTraversal(defaultGraph, 'A'));
// Expected: ['A', 'B', 'C', 'D', 'E', 'F']


// ======================================================
// 2. Shortest Path (BFS) [Difficulty: Medium 🟡]
// Goal: Compute minimum traversal weight/distance between two points.
// ======================================================

const shortestPath = (graph, start, end) => {
    const visited = new Set([start]);
    const queue = [[start, 0]]; // Store tuple [currentNode, currentDistance]

    while (queue.length > 0) {
        const [node, dist] = queue.shift();
        if (node === end) return dist; // Minimal distance path unlocked

        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, dist + 1]);
            }
        }
    }
    return -1; // No path exists
};

// TEST LOG:
console.log("\n--- Shortest Path Results ---");
console.log("Minimum steps A to F ->", shortestPath(defaultGraph, 'A', 'F'));
// Expected: 2 (A -> C -> F)


// ======================================================
// 3. Number Of Islands (Grid Graph) [Difficulty: Medium-Hard 🟠]
// Goal: Count and consume connected recursive node batches ('islands').
// ======================================================

const islandGrid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
];

const numIslands = (grid) => {
    if (!grid || grid.length === 0) return 0;

    // Clone grid to avoid mutating test sample
    const map = JSON.parse(JSON.stringify(grid));
    const rows = map.length;
    const cols = map[0].length;
    let islandCounter = 0;

    const sinkIslandBFS = (r, c) => {
        const queue = [[r, c]];
        map[r][c] = '0'; // Mark initial land processed

        while (queue.length > 0) {
            const [currentRow, currentCol] = queue.shift();
            const vectors = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right

            for (const [dx, dy] of vectors) {
                const nx = currentRow + dx;
                const ny = currentCol + dy;
                // Verify boundaries and ensure node matches LAND type
                if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && map[nx][ny] === '1') {
                    map[nx][ny] = '0'; // Sink connected node instantly to prevent infinite loops
                    queue.push([nx, ny]);
                }
            }
        }
    };

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (map[i][j] === '1') {
                islandCounter++; // Found new isolated mass
                sinkIslandBFS(i, j); // Purge entirety of connected mass via BFS
            }
        }
    }
    return islandCounter;
};

// TEST LOG:
console.log("\n--- Number Of Islands Results ---");
console.log("Island count on grid sample ->", numIslands(islandGrid));
// Expected: 3


// ======================================================
// 4. Course Schedule (Cycle Detection) [Difficulty: Hard 🔴]
// Goal: DFS topological verification testing dependency loops.
// ======================================================

const prereqs = [[1,0],[2,0],[3,1],[3,2]]; // No cycles present
const courseCount = 4;

const canFinish = (numCourses, prerequisites) => {
    // Build adjacency representation
    const adj = Array.from({ length: numCourses }, () => []);
    for (const [course, dependency] of prerequisites) {
        adj[dependency].push(course);
    }

    // Track states: 0 = empty, 1 = active cycle, 2 = safe processed
    const state = new Array(numCourses).fill(0);

    const hasCycle = (node) => {
        if (state[node] === 1) return true;  // HIT: Detected circular back-reference
        if (state[node] === 2) return false; // PASS: Previously validated node branch

        state[node] = 1; // Lock node into current traversal chain

        for (const neighbor of adj[node]) {
            if (hasCycle(neighbor)) return true;
        }

        state[node] = 2; // Release node, officially cleared as safe
        return false;
    };

    // Scan all node components
    for (let i = 0; i < numCourses; i++) {
        if (hasCycle(i)) return false;
    }
    return true;
};

// TEST LOG:
console.log("\n--- Course Schedule Cycle Detect Results ---");
console.log("Schedule [[1,0],[2,0],[3,1],[3,2]] executable? ->", canFinish(courseCount, prereqs));
// Expected: true
