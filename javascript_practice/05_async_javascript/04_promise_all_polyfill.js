// ======================================================
// 4. Promise.all Polyfill [Difficulty: Medium-Hard 🟠]
// Goal: Custom implementation returning resolved values only if ALL succeed, preserved in array index order.
// ======================================================

const myPromiseAll = (promises) => {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;
        
        if (promises.length === 0) return resolve([]);
        
        promises.forEach((promise, index) => {
            // Wrap values in Promise.resolve to capture raw non-promises
            Promise.resolve(promise).then(val => {
                results[index] = val; // Preserve strict initial array position 
                completed++;
                
                if (completed === promises.length) resolve(results);
            }).catch(reject); // Immediate short-circuit rejection if one fails
        });
    });
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        exec: () => {
            const p1 = Promise.resolve(100);
            const p2 = new Promise(r => setTimeout(() => r("AsyncDone"), 20));
            const raw = 42;
            return myPromiseAll([p1, p2, raw]);
        },
        expected: [100, "AsyncDone", 42],
        desc: "Parallel successful convergence with raw values"
    },
    {
        exec: async () => {
            try {
                await myPromiseAll([Promise.resolve(1), Promise.reject("CRASH")]);
            } catch(e) {
                return e;
            }
        },
        expected: "CRASH",
        desc: "Immediate early reject short-circuit validation"
    }
];

async function runSuite() {
    console.log("\n--- 🧪 Running Promise.all Polyfill Automated Tests ---");
    for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        const start = performance.now();
        const result = await tc.exec();
        const duration = (performance.now() - start).toFixed(4);

        const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
        console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
    }
}

runSuite();
