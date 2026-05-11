// ======================================================
// 8. Sort Objects [Difficulty: Medium-Hard 🟠]
// Goal: Sort array of objects by a nested property path.
// ======================================================

const sortByKey = (arr, keyPath, ascending = true) => {
    const getProp = (obj, path) => path.split('.').reduce((o, key) => o?.[key], obj);
    
    return [...arr].sort((a, b) => {
        const valA = getProp(a, keyPath);
        const valB = getProp(b, keyPath);
        
        if (valA < valB) return ascending ? -1 : 1;
        if (valA > valB) return ascending ? 1 : -1;
        return 0;
    });
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const users = [
    { name: "Alice", info: { age: 25 } },
    { name: "Charlie", info: { age: 20 } },
    { name: "Bob", info: { age: 30 } }
];

const testCases = [
    { 
        arr: users, path: 'info.age', asc: true, 
        expected: ["Charlie", "Alice", "Bob"], 
        desc: "Nested numerical path ascending" 
    },
    { 
        arr: users, path: 'name', asc: false, 
        expected: ["Charlie", "Bob", "Alice"], 
        desc: "Root alphabetic path descending" 
    }
];

console.log("\n--- 🧪 Running Sort Objects Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = sortByKey(tc.arr, tc.path, tc.asc);
    const duration = (performance.now() - start).toFixed(4);

    const resNames = result.map(u => u.name);
    const isPassed = JSON.stringify(resNames) === JSON.stringify(tc.expected);
    
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${JSON.stringify(resNames)}`);
    }
});
