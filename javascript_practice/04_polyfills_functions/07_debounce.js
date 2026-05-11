// ======================================================
// 7. Debounce [Difficulty: Hard 🔴]
// Goal: Delay executing a function until after a specified silence window.
// ======================================================

const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId); 
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        exec: () => new Promise(resolve => {
            let count = 0;
            const debounced = debounce(() => count++, 50);
            
            debounced();
            debounced();
            debounced(); // Squashed to 1

            setTimeout(() => resolve(count), 100);
        }),
        expected: 1,
        desc: "Squash 3 immediate fires into 1 execution"
    },
    {
        exec: () => new Promise(resolve => {
            let count = 0;
            const debounced = debounce(() => count++, 20);
            
            debounced(); // fire 1
            setTimeout(() => {
                debounced(); // fire 2 (runs after 40ms gap)
                setTimeout(() => resolve(count), 40);
            }, 40);
        }),
        expected: 2,
        desc: "Allow distinct separated clusters (gap > delay)"
    }
];

async function runSuite() {
    console.log("\n--- 🧪 Running Debounce Async Automated Tests ---");
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
