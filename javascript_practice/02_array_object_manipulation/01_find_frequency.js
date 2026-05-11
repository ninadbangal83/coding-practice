// ======================================================
// 1. Find Frequency [Difficulty: Easy 🟢]
// Goal: Return frequencies of elements in an array.
// ======================================================

const findFrequency = (arr) => {
    return arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {});
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { input: ["apple", "orange", "apple", "banana", "orange", "apple"], expected: { apple: 3, orange: 2, banana: 1 }, desc: "Standard repeat strings" },
    { input: [], expected: {}, desc: "Edge: Empty dataset" },
    { input: [1, 2, 2, 3, 3, 3], expected: { "1": 1, "2": 2, "3": 3 }, desc: "Numeric distribution count" },
    { input: ["a"], expected: { a: 1 }, desc: "Edge: Solitary item limit" }
];

console.log("\n--- 🧪 Running Find Frequency Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = findFrequency(tc.input);
    const duration = (performance.now() - start).toFixed(4);

    // Direct stringify equality check for flat frequency object
    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${JSON.stringify(result)}`);
        console.log(`   Expected: ${JSON.stringify(tc.expected)}`);
    }
});
