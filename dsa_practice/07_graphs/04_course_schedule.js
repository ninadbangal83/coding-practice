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

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { numCourses: 4, prereqs: [[1,0],[2,0],[3,1],[3,2]], expected: true, desc: "Standard execution tree path" },
    { numCourses: 2, prereqs: [[1,0],[0,1]], expected: false, desc: "Direct circular deadlock pair" },
    { numCourses: 3, prereqs: [[1,0],[2,1]], expected: true, desc: "Simple linear sequence execution" },
    { numCourses: 1, prereqs: [], expected: true, desc: "Edge: Zero dependencies free range" },
    { numCourses: 2, prereqs: [[1,1]], expected: false, desc: "Edge: Self-contained immediate cycle" }
];

console.log("\n--- 🧪 Running Course Schedule Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = canFinish(tc.numCourses, tc.prereqs);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
