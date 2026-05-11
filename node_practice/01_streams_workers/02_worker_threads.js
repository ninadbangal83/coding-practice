// ===========================================================================
// 💡 NODE.JS ANALYSIS: CPU PARALLELISM VIA WORKER THREADS
// ---------------------------------------------------------------------------
// 🚀 Time Complexity: O(F) factorial calculation relocated to separate OS thread.
// 💾 Space Complexity: Separate V8 Heap initialized for isolation (higher memory cost).
// 🛡️  Edge Case Handled: Prevents Event-Loop freezing during heavy numerical analysis.
// ===========================================================================

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function heavyFactorial(num) {
    if (num <= 1) return 1;
    return num * heavyFactorial(num - 1);
}

if (isMainThread) {
    // --- MAIN THREAD TEST HARNESS LAYER ---

    const executeWorkerTask = (val) => {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, {
                workerData: { input: val }
            });
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    };

    const testCases = [
        {
            exec: async () => {
                return await executeWorkerTask(5); // Calculates 5! in background
            },
            expected: 120,
            desc: "Background CPU offloading accuracy check (Factorial 5)"
        },
        {
            exec: async () => {
                return await executeWorkerTask(10); // Calculates 10! 
            },
            expected: 3628800,
            desc: "High Scale Numerical vector routing across V8 partition"
        }
    ];

    async function runSuite() {
        console.log("\n--- 🧪 Running Worker Thread CPU Load Verification Suite ---");
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

} else {
    // --- PARALLEL CPU WORKER LAYER ---
    const inputData = workerData.input;
    const outputData = heavyFactorial(inputData);
    parentPort.postMessage(outputData); // Signal success to Main thread
}
