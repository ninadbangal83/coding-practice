// ======================================================
// 1. Climbing Stairs [Difficulty: Easy 🟢]
// Goal: Compute discrete recursive combinations using O(1) bottom-up linear DP.
// ======================================================

const climbStairs = (n) => {
    if (n <= 2) return n;

    let prevPrevious = 1; // Base step 1
    let previous = 2;     // Base step 2

    for (let i = 3; i <= n; i++) {
        const currentWays = previous + prevPrevious;
        prevPrevious = previous;
        previous = currentWays;
    }
    return previous;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { n: 1, expected: 1, desc: "Edge: Single step constraint" },
    { n: 2, expected: 2, desc: "Edge: Dual step starting bound" },
    { n: 3, expected: 3, desc: "Triple step standard overlap" },
    { n: 5, expected: 8, desc: "Mid-level distribution match" },
    { n: 40, expected: 165580141, desc: "Scale: Deep sequence computation load" }
];

console.log("\n--- 🧪 Running Climbing Stairs Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = climbStairs(tc.n);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input: ${tc.n}`);
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
