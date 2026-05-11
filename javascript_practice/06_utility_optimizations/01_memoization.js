// ======================================================
// 1. Memoization [Difficulty: Medium 🟡]
// Goal: Cache pure function results based on input arguments to prevent recalculation.
// ======================================================

const memoize = (func) => {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func.apply(this, args);
        cache.set(key, result);
        return result;
    };
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        exec: () => {
            let callCount = 0;
            const add = (a, b) => { callCount++; return a + b; };
            const memoized = memoize(add);
            
            memoized(5, 10); // trigger 1
            memoized(5, 10); // cached
            memoized(5, 10); // cached
            
            return callCount;
        },
        expected: 1,
        desc: "Duplicate arg avoidance (Only 1 calculation invocation)"
    },
    {
        exec: () => {
            let callCount = 0;
            const mul = (a) => { callCount++; return a * a; };
            const memoized = memoize(mul);
            
            memoized(2); // trig 1
            memoized(3); // trig 2
            memoized(2); // cached
            
            return callCount;
        },
        expected: 2,
        desc: "Key partitioning discrimination across varied arguments"
    }
];

console.log("\n--- 🧪 Running Memoization Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = tc.exec();
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
});
