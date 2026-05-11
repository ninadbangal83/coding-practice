// ======================================================
// 3. Array.prototype.filter Polyfill [Difficulty: Easy 🟢]
// Goal: Implement custom filter that keeps elements matching a condition.
// ======================================================

Array.prototype.myFilter = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { arr: [1, 2, 3, 4, 5], fn: n => n % 2 === 0, expected: [2, 4], desc: "Even numbers numeric filter" },
    { arr: ["apple", "banana", "cherry"], fn: w => w.length > 5, expected: ["banana", "cherry"], desc: "String length constraint filter" },
    { arr: [1, 2, 3], fn: n => n > 10, expected: [], desc: "Negative case fully empty set" }
];

console.log("\n--- 🧪 Running Array.filter Polyfill Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = tc.arr.myFilter(tc.fn);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
});
