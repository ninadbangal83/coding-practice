// ======================================================
// 4. Deep Compare (isEqual) [Difficulty: Hard 🔴]
// Goal: Recurse deeply into values to check absolute conceptual equality across non-referential structures.
// ======================================================

const isDeepEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true;

    if (typeof obj1 !== 'object' || obj1 === null || 
        typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
        if (!keys2.includes(key) || !isDeepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        a: { val: 1, nest: { arr: [2, 3] } },
        b: { val: 1, nest: { arr: [2, 3] } },
        expected: true,
        desc: "Identical deeply nested object comparison match"
    },
    {
        a: { a: 1 },
        b: { a: 2 },
        expected: false,
        desc: "Primitive leaf value mutation mismatch detect"
    },
    {
        a: { x: 1, y: 2 },
        b: { x: 1 },
        expected: false,
        desc: "Prop-length reduction truncation mismatch detect"
    }
];

console.log("\n--- 🧪 Running Deep Equal Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = isDeepEqual(tc.a, tc.b);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
});
