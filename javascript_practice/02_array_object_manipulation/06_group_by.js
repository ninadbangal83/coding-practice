// ======================================================
// 6. Group Items [Difficulty: Medium 🟡]
// Goal: Implement groupBy function to group objects by a key.
// ======================================================

const groupBy = (arr, key) => {
    return arr.reduce((acc, item) => {
        const groupValue = item[key];
        if (!acc[groupValue]) {
            acc[groupValue] = [];
        }
        acc[groupValue].push(item);
        return acc;
    }, {});
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const inventory = [
    { name: "asparagus", type: "vegetables" },
    { name: "bananas", type: "fruit" },
    { name: "goat", type: "meat" },
    { name: "cherries", type: "fruit" },
];

const expectedResult = {
    vegetables: [{ name: "asparagus", type: "vegetables" }],
    fruit: [{ name: "bananas", type: "fruit" }, { name: "cherries", type: "fruit" }],
    meat: [{ name: "goat", type: "meat" }]
};

const testCases = [
    { arr: inventory, key: "type", expected: expectedResult, desc: "Standard categoric mapping" },
    { arr: [], key: "any", expected: {}, desc: "Edge: Empty list preserves null hash" }
];

console.log("\n--- 🧪 Running Group By Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = groupBy(tc.arr, tc.key);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   OutputKeys: ${Object.keys(result).join(", ")}`);
    }
});
