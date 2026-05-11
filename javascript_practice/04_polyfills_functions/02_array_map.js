// ======================================================
// 2. Array.prototype.map Polyfill [Difficulty: Easy 🟢]
// Goal: Implement custom map function that returns a new array.
// ======================================================

Array.prototype.myMap = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { arr: [1, 2, 3], fn: x => x * 2, expected: [2, 4, 6], desc: "Basic numeric transformation" },
    { arr: ["a", "b"], fn: (v, i) => v + i, expected: ["a0", "b1"], desc: "Argument integrity (index access)" },
    { arr: [], fn: x => x, expected: [], desc: "Edge: Empty array map preservation" }
];

console.log("\n--- 🧪 Running Array.map Polyfill Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = tc.arr.myMap(tc.fn);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
});
