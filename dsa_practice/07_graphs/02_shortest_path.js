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

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        graph: { 'A': ['B', 'C'], 'B': ['A', 'D', 'E'], 'C': ['A', 'F'], 'D': ['B'], 'E': ['B'], 'F': ['C'] },
        start: 'A', end: 'F', expected: 2, desc: "Standard multi-hop adjacency validation"
    },
    {
        graph: { 'A': ['B', 'C'], 'B': ['A', 'D', 'E'], 'C': ['A', 'F'], 'D': ['B'], 'E': ['B'], 'F': ['C'] },
        start: 'A', end: 'E', expected: 2, desc: "Valid neighbor of neighbor track"
    },
    {
        graph: { 'A': ['B'], 'B': ['A'], 'C': [] },
        start: 'A', end: 'C', expected: -1, desc: "Edge: Dead end unreachable endpoint target"
    },
    {
        graph: { 'A': ['B'], 'B': [] },
        start: 'A', end: 'A', expected: 0, desc: "Edge: Zero distance immediate self-find"
    }
];

console.log("\n--- 🧪 Running Shortest Path Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = shortestPath(tc.graph, tc.start, tc.end);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
