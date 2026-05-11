// ======================================================
// 5. API Retry Logic [Difficulty: Hard 🔴]
// Goal: Wrapper enabling resilient retrying of falling asynchronous tasks with dynamic ceilings.
// ======================================================

const fetchWithRetry = async (asyncFn, maxRetries = 3, delayMs = 10) => {
    let attempts = 0;
    while (attempts < maxRetries) {
        try {
            return await asyncFn(); 
        } catch (error) {
            attempts++;
            if (attempts >= maxRetries) throw new Error(`Limit ${maxRetries} reached`);
            await new Promise(res => setTimeout(res, delayMs));
        }
    }
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        exec: async () => {
            let tries = 0;
            const flakey = async () => {
                tries++;
                if (tries < 3) throw new Error("FAIL");
                return "SUCCESS";
            };
            // Should succeed on 3rd attempt. Limit 4 ensures safety.
            return await fetchWithRetry(flakey, 4);
        },
        expected: "SUCCESS",
        desc: "Eventual convergence after sequential failures"
    },
    {
        exec: async () => {
            const permanentFail = async () => { throw new Error("DOOM"); };
            try {
                await fetchWithRetry(permanentFail, 2);
            } catch(e) {
                return e.message;
            }
        },
        expected: "Limit 2 reached",
        desc: "Safety threshold enforced hard halt"
    }
];

async function runSuite() {
    console.log("\n--- 🧪 Running API Retry Automated Tests ---");
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
