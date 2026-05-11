// ======================================================
// 2. House Robber [Difficulty: Medium 🟡]
// Goal: Extract maximum sequential payoff without taking adjacent triggers.
// ======================================================

const lootHouses = [2, 7, 9, 3, 1];

const robMax = (houses) => {
    if (houses.length === 0) return 0;
    if (houses.length === 1) return houses[0];

    let prevTwoStep = 0; // Memory for N-2
    let prevOneStep = 0; // Memory for N-1

    for (const money of houses) {
        // Core DP relation: Max(Skip current, Take current + cache from 2 houses back)
        const currentBest = Math.max(prevOneStep, prevTwoStep + money);
        prevTwoStep = prevOneStep;
        prevOneStep = currentBest;
    }
    return prevOneStep;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { nums: [2, 7, 9, 3, 1], expected: 12, desc: "Standard interleaved high payoff" },
    { nums: [1, 2, 3, 1], expected: 4, desc: "Ends-focused alternate path" },
    { nums: [10], expected: 10, desc: "Edge: Solitary item available" },
    { nums: [2, 1], expected: 2, desc: "Edge: Double item immediate selection" },
    { nums: [], expected: 0, desc: "Edge: Void empty array" },
    { nums: Array.from({ length: 5000 }, (_, i) => (i % 2 === 0 ? 10 : 1)), expected: 25000, desc: "Scale: Large scale alternating static loot chain" }
];

console.log("\n--- 🧪 Running House Robber Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = robMax(tc.nums);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
