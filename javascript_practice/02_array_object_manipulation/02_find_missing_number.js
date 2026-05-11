// ======================================================
// 2. Find Missing Number [Difficulty: Easy 🟢]
// Goal: Find the missing number in an array containing digits 0 to n.
// ======================================================

const findMissingNumber = (arr) => {
    const n = arr.length;
    // Arithmetic sum formula: sum = (n * (n + 1)) / 2
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = arr.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { input: [3, 0, 1, 4, 6, 2], expected: 5, desc: "Standard randomized sequence gap" },
    { input: [0, 1, 3], expected: 2, desc: "Small minimal dataset match" },
    { input: [1, 2, 3], expected: 0, desc: "Edge: Missing zero start node" },
    { input: [0, 1, 2], expected: 3, desc: "Edge: Missing final bound node" },
    { input: Array.from({ length: 10000 }, (_, i) => i).filter(x => x !== 7542), expected: 7542, desc: "Scale: Large range lookup (10k items)" }
];

console.log("\n--- 🧪 Running Find Missing Number Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = findMissingNumber(tc.input);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
