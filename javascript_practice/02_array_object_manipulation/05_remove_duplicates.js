// ======================================================
// 5. Remove Duplicates [Difficulty: Medium 🟡]
// Goal: Remove duplicates from primitives and deep objects.
// ======================================================

const removeDuplicates = (arr) => [...new Set(arr)];

const removeDeepDuplicates = (arr) => {
    const seen = new Set();
    return arr.filter(item => {
        const stringifyItem = JSON.stringify(item);
        return seen.has(stringifyItem) ? false : seen.add(stringifyItem);
    });
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCasesPrimitive = [
    { input: [1, 2, 2, 8, 4], expected: [1, 2, 8, 4], desc: "Primitive number distinct check" },
    { input: [1, "1", 2, "apple", "apple"], expected: [1, "1", 2, "apple"], desc: "Type-safety strings vs numbers verification" }
];

const testCasesDeep = [
    {
        input: [
            { id: 1, name: "John" },
            { id: 1, name: "John" },
            { id: 2, name: "Jane" }
        ],
        expected: [
            { id: 1, name: "John" },
            { id: 2, name: "Jane" }
        ],
        desc: "Deep nested object duplication filter"
    }
];

console.log("\n--- 🧪 Running Remove Duplicates Automated Tests ---");
testCasesPrimitive.forEach((tc, i) => {
    const start = performance.now();
    const result = removeDuplicates(tc.input);
    const duration = (performance.now() - start).toFixed(4);
    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Primitive Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
});

testCasesDeep.forEach((tc, i) => {
    const start = performance.now();
    const result = removeDeepDuplicates(tc.input);
    const duration = (performance.now() - start).toFixed(4);
    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Deep Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
});
