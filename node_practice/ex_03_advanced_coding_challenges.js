
const fs = require('fs').promises;
const path = require('path');

// ======================================================
// 1. ASYNC CONCURRENCY LIMITER (Task Queue) [Difficulty: Hard 🔴]
// Interview Context: "Execute 10 tasks, but run max 2 at a time."
// ======================================================

class AsyncQueueLimiter {
    /**
     * @param {number} maxParallel - Maximum simultaneous running tasks
     */
    constructor(maxParallel) {
        this.maxParallel = maxParallel;
        this.activeCount = 0;
        this.backlog = []; // Queue of pending task injection wrappers
    }

    // Add dynamic task to execution pool
    enqueue(taskGenerator) {
        return new Promise((resolve, reject) => {
            
            // Wrap actual task inside management callback
            const executorWrapper = async () => {
                this.activeCount++;
                try {
                    const result = await taskGenerator();
                    resolve(result);
                } catch (e) {
                    reject(e);
                } finally {
                    this.activeCount--;
                    this._next(); // Trigger cleanup pipeline to fill empty slot
                }
            };

            this.backlog.push(executorWrapper);
            this._next(); // Immediate trigger check
        });
    }

    _next() {
        // Refill active execution slots until capacity ceiling hit
        while (this.activeCount < this.maxParallel && this.backlog.length > 0) {
            const task = this.backlog.shift();
            task(); // Fire async execution block
        }
    }
}

// --- TEST EXECUTION A: ---
console.log("\n--- 🚦 STARTING CONCURRENCY LIMITER SIMULATION ---");
const limiter = new AsyncQueueLimiter(2); // Max 2 running!

const mockAsyncTask = (id, duration) => () => {
    console.log(`   👉 Task ${id} STARTED (Duration: ${duration}ms)`);
    return new Promise(resolve => setTimeout(() => {
        console.log(`   ✅ Task ${id} COMPLETED.`);
        resolve();
    }, duration));
};

// Inject 4 tasks instantly. Only 1 & 2 should fire immediately.
limiter.enqueue(mockAsyncTask("A", 300));
limiter.enqueue(mockAsyncTask("B", 100)); // Shortest: Should clear slot for C first!
limiter.enqueue(mockAsyncTask("C", 200));
limiter.enqueue(mockAsyncTask("D", 150));


// ======================================================
// 2. RECURSIVE DIRECTORY SCANNER [Difficulty: Medium-Hard 🟠]
// Interview Context: "Build a tree crawler reading all nested assets safely."
// ======================================================

async function scanDirectoryDeep(targetDirPath) {
    let finalAssetList = [];
    
    try {
        // Read direct children with rich metadata typing (isDir info)
        const rawContents = await fs.readdir(targetDirPath, { withFileTypes: true });

        for (const item of rawContents) {
            const fullTargetUri = path.join(targetDirPath, item.name);

            if (item.isDirectory()) {
                // 🔄 RECURSE: Dive deeper into child nodes
                const nestedResults = await scanDirectoryDeep(fullTargetUri);
                finalAssetList = finalAssetList.concat(nestedResults);
            } else {
                // 📍 CAPTURE: Found terminal leaf file
                finalAssetList.push(fullTargetUri);
            }
        }
    } catch (e) {
        console.log("   ⚠️ Access violation or invalid read on path:", targetDirPath);
    }

    return finalAssetList;
}

// --- TEST EXECUTION B: ---
// Delay execution slightly to let the task simulation print clean outputs
setTimeout(async () => {
    console.log("\n--- 📁 INITIATING RECURSIVE TREE DISCOVERY SCAN ---");
    
    // Crawl our actual practice workspace folder!
    const scanTarget = path.join(__dirname); 
    
    const results = await scanDirectoryDeep(scanTarget);
    
    console.log(`   ✅ SCAN COMPLETE! Located ${results.length} nested scripts.`);
    results.forEach(f => console.log(`      • ${path.basename(f)}`));
}, 1000);
