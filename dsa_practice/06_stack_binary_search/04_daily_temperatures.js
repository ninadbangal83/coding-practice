// ======================================================
// 4. Daily Temperatures [Difficulty: Medium 🟡]
// Goal: Monotonic stack resolves wait-times for next greater item.
// ======================================================

const temperatures = [73, 74, 75, 71, 69, 72, 76, 73];

const dailyTemperatures = (temps) => {
    const result = new Array(temps.length).fill(0);
    const stack = []; // Tracks indices of "pending/unresolved" cooler days

    for (let i = 0; i < temps.length; i++) {
        // While current temp is WARMER than stack-top items, RESOLVE them!
        while (stack.length > 0 && temps[i] > temps[stack[stack.length - 1]]) {
            const prevIdx = stack.pop();
            result[prevIdx] = i - prevIdx; // Compute duration gap
        }
        stack.push(i); // Store current day for future resolution
    }
    return result;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { temps: [73, 74, 75, 71, 69, 72, 76, 73], expected: [1, 1, 4, 2, 1, 1, 0, 0], desc: "Standard distributed dataset" },
    { temps: [30, 40, 50, 60], expected: [1, 1, 1, 0], desc: "Fully monotonic ascending chain" },
    { temps: [30, 60, 90], expected: [1, 1, 0], desc: "Sharp jump ascending" },
    { temps: [30, 30, 30], expected: [0, 0, 0], desc: "Edge: Flat static temperatures constraint" },
    { temps: [50, 40, 30], expected: [0, 0, 0], desc: "Edge: Monotonic descending (zero resolution)" },
    { temps: Array.from({ length: 5000 }, (_, i) => 5000 - i), expected: Array(5000).fill(0), desc: "Scale: Long cooling trend O(n) load validation" }
];

console.log("\n--- 🧪 Running Daily Temperatures Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = dailyTemperatures(tc.temps);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${result.slice(0, 5)}... | Expected: ${tc.expected.slice(0, 5)}...`);
    }
});
