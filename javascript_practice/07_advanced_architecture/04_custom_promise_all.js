// ======================================================
// 4. Custom Promise.all Re-implementation [Difficulty: Hard 🔴]
// Goal: Pure logic handler delivering comprehensive convergence and error boundary guarding.
// ======================================================

function customPromiseAll(promiseList) {
    return new Promise((resolve, reject) => {
        const results = new Array(promiseList.length);
        let completed = 0;
        if (promiseList.length === 0) return resolve([]);

        promiseList.forEach((prom, i) => {
            Promise.resolve(prom).then(val => {
                results[i] = val; // Preserve strict ordering
                completed++;
                if (completed === promiseList.length) resolve(results);
            }).catch(reject); // Fail-fast instant cancellation
        });
    });
}

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        exec: async () => {
            const p1 = Promise.resolve("A");
            const p2 = new Promise(r => setTimeout(() => r("B"), 20));
            const raw = 99;
            return await customPromiseAll([p1, p2, raw]);
        },
        expected: ["A", "B", 99],
        desc: "Parallel data aggregation with index-preserving order"
    }
];

async function runSuite() {
    console.log("\n--- 🧪 Running Rebuilt Promise.all Automated Tests ---");
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
