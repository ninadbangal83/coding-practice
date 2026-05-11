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

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        graph: { 'A': ['B', 'C'], 'B': ['A', 'D', 'E'], 'C': ['A', 'F'], 'D': ['B'], 'E': ['B'], 'F': ['C'] },
        start: 'A',
        expected: ['A', 'B', 'C', 'D', 'E', 'F'],
        desc: "Standard symmetric web search"
    },
    {
        graph: { 'A': ['B'], 'B': ['A', 'C'], 'C': ['B'], 'D': ['E'], 'E': ['D'] },
        start: 'A',
        expected: ['A', 'B', 'C'],
        desc: "Disconnected component boundary (never hits D or E)"
    },
    {
        graph: { 'X': [] },
        start: 'X',
        expected: ['X'],
        desc: "Edge: Solitary disconnected root node"
    }
];

console.log("\n--- 🧪 Running BFS Traversal Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = bfsTraversal(tc.graph, tc.start);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${JSON.stringify(result)} | Expected: ${JSON.stringify(tc.expected)}`);
    }
});
