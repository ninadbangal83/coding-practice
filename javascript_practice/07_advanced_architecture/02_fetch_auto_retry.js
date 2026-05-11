// ======================================================
// 2. Fetch with Automatic Retry & Backoff [Difficulty: Hard 🔴]
// Goal: Wrap unstable calls to automatically attempt self-healing on failure with timeouts.
// ======================================================

async function fetchWithAutoRetry(mockFn, maxRetries = 3, delayMs = 50) {
    let lastError = null;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await mockFn();
        } catch (error) {
            lastError = error;
            if (attempt < maxRetries) {
                await new Promise(res => setTimeout(res, delayMs));
            }
        }
    }
    throw new Error(`TERMINAL: Maximum retries (${maxRetries}) reached.`);
}

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        exec: async () => {
            let errorsLeft = 2;
            const unstable = async () => {
                if (errorsLeft > 0) { errorsLeft--; throw new Error("FAIL"); }
                return "SUCCESS";
            };
            return await fetchWithAutoRetry(unstable, 3);
        },
        expected: "SUCCESS",
        desc: "Successful recovery boundary limits enforced"
    }
];

async function runSuite() {
    console.log("\n--- 🧪 Running Auto-Retry Engine Automated Tests ---");
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
