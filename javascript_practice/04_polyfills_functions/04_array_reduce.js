// ======================================================
// 4. Array.prototype.reduce Polyfill [Difficulty: Medium 🟡]
// Goal: Implement custom reduce accumulating value down to a single output.
// ======================================================

Array.prototype.myReduce = function(callback, initialValue) {
    let accumulator = initialValue;
    let startIndex = 0;

    if (accumulator === undefined) {
        if (this.length === 0) throw new TypeError('Reduce of empty array with no initial value');
        accumulator = this[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { arr: [1, 2, 3, 4], fn: (acc, v) => acc + v, init: 0, expected: 10, desc: "Basic summation with initial zero" },
    { arr: [1, 2, 3, 4], fn: (acc, v) => acc + v, init: undefined, expected: 10, desc: "Summation without initial value (use head)" },
    { arr: ["a", "b", "a"], fn: (acc, v) => { acc[v] = (acc[v]||0)+1; return acc; }, init: {}, expected: {a:2, b:1}, desc: "Hash mapping reducer accumulation" }
];

console.log("\n--- 🧪 Running Array.reduce Polyfill Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    // Handle parameter exclusion for undefined initialValue explicitly to trigger undefined logic inside reducer
    const result = tc.init === undefined ? tc.arr.myReduce(tc.fn) : tc.arr.myReduce(tc.fn, tc.init);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
});
