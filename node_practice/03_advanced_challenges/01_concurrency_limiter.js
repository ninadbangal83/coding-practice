// ===========================================================================
// 💡 NODE.JS ANALYSIS: ASYNC CONCURRENCY POOL LIMITER
// ---------------------------------------------------------------------------
// 🚀 Time Complexity: O(1) task enqueue mechanics; O(N) overall total drain time.
// 💾 Space Complexity: O(N) backlog buffer dynamically scaled by total workload.
// 🛡️  Edge Case Handled: Backpressure Interlock prevents heavy external batch loads
//     from overwhelming Node Event Loop memory allocations by forcing queueing.
// ===========================================================================

class AsyncQueueLimiter {
    constructor(maxParallel) {
        this.maxParallel = maxParallel;
        this.activeCount = 0;
        this.backlog = [];
        this.peakCount = 0; // Tracking metric for automated test validation
    }

    enqueue(taskGenerator) {
        return new Promise((resolve, reject) => {
            const executorWrapper = async () => {
                this.activeCount++;
                this.peakCount = Math.max(this.peakCount, this.activeCount);
                
                try {
                    const result = await taskGenerator();
                    resolve(result);
                } catch (e) {
                    reject(e);
                } finally {
                    this.activeCount--;
                    this._next(); 
                }
            };
            this.backlog.push(executorWrapper);
            this._next(); 
        });
    }

    _next() {
        while (this.activeCount < this.maxParallel && this.backlog.length > 0) {
            const task = this.backlog.shift();
            task(); 
        }
    }
}

// ======================================================
// 🧪 TEST AUTOMATION SECTION (CONCURRENCY AUDIT)
// ======================================================

const testCases = [
    {
        exec: async () => {
            const limiter = new AsyncQueueLimiter(2);
            const sleepTask = () => new Promise(r => setTimeout(r, 20));
            
            // Inject 5 tasks instantly
            await Promise.all([
                limiter.enqueue(sleepTask),
                limiter.enqueue(sleepTask),
                limiter.enqueue(sleepTask),
                limiter.enqueue(sleepTask),
                limiter.enqueue(sleepTask)
            ]);
            
            // Assert peak observed simultaneously active tasks equals the ceiling
            return limiter.peakCount;
        },
        expected: 2,
        desc: "Ceiling Limit Enforce: Parallelism clamped at peak threshold 2"
    }
];

async function runSuite() {
    console.log("\n--- 🧪 Running Task Concurrency Gating Diagnostics ---");
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
