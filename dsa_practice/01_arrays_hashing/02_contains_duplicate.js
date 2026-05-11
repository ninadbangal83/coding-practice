// ======================================================
// 2. Contains Duplicate [Difficulty: Easy 🟢]
// Goal: Return true if any value appears at least twice in array.
// ======================================================

const dupInput1 = [1, 2, 3, 1];
const dupInput2 = [1, 2, 3, 4];

const containsDuplicate = (nums) => {
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    return false;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { nums: [1, 2, 3, 1], expected: true, desc: "Standard duplicate" },
    { nums: [1, 2, 3, 4], expected: false, desc: "All unique numbers" },
    { nums: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2], expected: true, desc: "Multiple occurrences" },
    { nums: [], expected: false, desc: "Edge: Empty array boundary" },
    { nums: [10], expected: false, desc: "Edge: Single element constraint" },
    { nums: [-1, -5, 10, -5], expected: true, desc: "Negative integers duplicate" },
    { nums: Array.from({ length: 10000 }, (_, i) => i).concat([5000]), expected: true, desc: "Scale: Large dataset load (O(n) validation)" }
];

console.log("\n--- 🧪 Running Contains Duplicate Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = containsDuplicate(tc.nums);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
    
    if (!isPassed) {
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
