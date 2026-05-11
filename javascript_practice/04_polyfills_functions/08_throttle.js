// ======================================================
// 8. Throttle [Difficulty: Hard 🔴]
// Goal: Restrict execution rate of a function to once per specified interval.
// ======================================================

const throttle = (func, limit) => {
    let inThrottle = false;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        exec: () => new Promise(resolve => {
            let count = 0;
            const throttled = throttle(() => count++, 100);
            
            throttled(); // immediately triggers
            throttled(); // locked
            throttled(); // locked

            setTimeout(() => resolve(count), 150);
        }),
        expected: 1,
        desc: "Lock down heavy immediate burst to 1 run"
    }
];

async function runSuite() {
    console.log("\n--- 🧪 Running Throttle Async Automated Tests ---");
    for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        const start = performance.now();
        const result = await tc.exec();
        const duration = (performance.now() - start).toFixed(4);

        const isPassed = result === tc.expected;
        console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
    }
}

runSuite();
