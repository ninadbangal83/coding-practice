// ======================================================
// 4. Merge Sorted Arrays [Difficulty: Easy 🟢]
// Goal: Combine two already sorted arrays into one.
// ======================================================

const mergeSortedArrays = (a, b) => {
    let merged = [];
    let i = 0, j = 0;
    
    while (i < a.length && j < b.length) {
        if (a[i] < b[j]) {
            merged.push(a[i++]);
        } else {
            merged.push(b[j++]);
        }
    }
    
    return [...merged, ...a.slice(i), ...b.slice(j)];
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { a: [1, 3, 5, 7], b: [2, 4, 6, 8, 10], expected: [1, 2, 3, 4, 5, 6, 7, 8, 10], desc: "Standard interleaved zipper merge" },
    { a: [], b: [1, 2], expected: [1, 2], desc: "Edge: Empty first array left-biased" },
    { a: [1, 2], b: [], expected: [1, 2], desc: "Edge: Empty second array right-biased" },
    { a: [1, 2, 3], b: [4, 5, 6], expected: [1,2,3,4,5,6], desc: "Sequential end-to-end concatenation" },
    { a: Array.from({length: 5000}, (_, i) => i * 2), b: Array.from({length: 5000}, (_, i) => i * 2 + 1), expectedLength: 10000, desc: "Scale: Heavy load sorted aggregation" }
];

console.log("\n--- 🧪 Running Merge Sorted Arrays Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = mergeSortedArrays(tc.a, tc.b);
    const duration = (performance.now() - start).toFixed(4);

    let isPassed = false;
    if (tc.expectedLength) {
        isPassed = result.length === tc.expectedLength;
    } else {
        isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    }

    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output Length: ${result.length}`);
    }
});
