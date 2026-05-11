// ======================================================
// 5. Object Flattening [Difficulty: Medium-Hard 🟠]
// Goal: Deconstruct nested objects into flat single-layer path mappings.
// ======================================================

const flattenObj = (obj, parentKey = '', res = {}) => {
    for (let key in obj) {
        const propName = parentKey ? `${parentKey}.${key}` : key;
        
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            flattenObj(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    }
    return res;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        input: { a: 1, b: { c: 2, d: { e: 3 } } },
        expected: { a: 1, "b.c": 2, "b.d.e": 3 },
        desc: "Multi-level deep property linkage collapse"
    },
    {
        input: { user: { ids: [1, 2] } },
        expected: { "user.ids": [1, 2] },
        desc: "Array leaf preservation (No recursive iteration on arrays)"
    }
];

console.log("\n--- 🧪 Running Object Flattening Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = flattenObj(tc.input);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
});
