// ======================================================
// 9. Flatten Arrays [Difficulty: Hard 🔴]
// Goal: Flatten a nested array manually using recursion.
// ======================================================

const flatten = (arr, depth = 1) => {
    if (depth === 0) return arr;
    return arr.reduce((acc, val) => {
        if (Array.isArray(val) && depth > 0) {
            acc.push(...flatten(val, depth - 1));
        } else {
            acc.push(val);
        }
        return acc;
    }, []);
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { arr: [1, [2, [3, [4]]], 5], depth: 1, expected: [1, 2, [3, [4]], 5], desc: "Single level flatten constraints" },
    { arr: [1, [2, [3, [4]]], 5], depth: 2, expected: [1, 2, 3, [4], 5], desc: "Double level recursive descent" },
    { arr: [1, [2, [3, [4]]], 5], depth: 10, expected: [1, 2, 3, 4, 5], desc: "Limit depth exceeding true depth" },
    { arr: [1, 2, 3], depth: 5, expected: [1, 2, 3], desc: "Edge: Already flat array" },
    { arr: [], depth: 1, expected: [], desc: "Edge: Void array preservation" }
];

console.log("\n--- 🧪 Running Flatten Arrays Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = flatten(tc.arr, tc.depth);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${JSON.stringify(result)}`);
        console.log(`   Expected: ${JSON.stringify(tc.expected)}`);
    }
});
