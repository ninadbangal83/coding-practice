// ======================================================
// 3. Chunk Array [Difficulty: Easy 🟢]
// Goal: Split an array into sub-arrays of a given size.
// ======================================================

const chunkArray = (arr, size) => {
    const chunked = [];
    for (let i = 0; i < arr.length; i += size) {
        chunked.push(arr.slice(i, i + size));
    }
    return chunked;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { arr: [1, 2, 3, 4, 5, 6, 7, 8], size: 3, expected: [[1,2,3], [4,5,6], [7,8]], desc: "Standard uneven termination" },
    { arr: [1, 2], size: 1, expected: [[1], [2]], desc: "Unit size direct chunking" },
    { arr: [1, 2, 3], size: 5, expected: [[1,2,3]], desc: "Edge: Chunk size exceeds source count" },
    { arr: [], size: 3, expected: [], desc: "Edge: Void array preservation" }
];

console.log("\n--- 🧪 Running Chunk Array Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = chunkArray(tc.arr, tc.size);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${JSON.stringify(result)}`);
        console.log(`   Expected: ${JSON.stringify(tc.expected)}`);
    }
});
