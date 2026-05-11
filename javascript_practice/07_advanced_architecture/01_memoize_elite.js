// ======================================================
// 1. Custom Memoize with Multi-Argument Cache [Difficulty: Medium-Hard 🟠]
// Goal: Create persistent internal caching preserving references to deep inputs.
// ======================================================

function memoizeElite(fn) {
    const cache = new Map();
    return function (...args) {
        const storageKey = JSON.stringify(args);
        if (cache.has(storageKey)) {
            return cache.get(storageKey);
        }
        const result = fn(...args);
        cache.set(storageKey, result);
        return result;
    };
}

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        exec: () => {
            let ops = 0;
            const mathFunc = (x, y) => { ops++; return x + y; };
            const memo = memoizeElite(mathFunc);
            
            memo(10, 20);
            memo(10, 20); // Cached
            memo(5, 5);   // Fresh
            return ops;
        },
        expected: 2,
        desc: "Discriminatory cache segmentation across dynamic arguments"
    }
];

console.log("\n--- 🧪 Running Elite Memoization Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = tc.exec();
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
});
