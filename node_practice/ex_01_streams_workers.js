
const fs = require('fs');
const path = require('path');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// ======================================================
// 1. NODE NATIVE: Efficient Stream Piping [Difficulty: Medium 🟡]
// Goal: Process potentially large files in chunks to preserve memory bounds.
// ======================================================

function demonstrateStreamPiping() {
    console.log("\n--- 📦 STREAM PIPIING SEQUENCE INITIATED ---");
    
    const sourceFile = path.join(__dirname, 'temp_source.txt');
    const destinationFile = path.join(__dirname, 'temp_copy.txt');

    // Step A: Bootstrap dummy data stream (Simulating raw file gen)
    fs.writeFileSync(sourceFile, "Elite Node.js Stream Memory Chunking Demonstration Data Payload.");

    // Step B: Initialize Low-Memory Footprint Streams
    const readStream = fs.createReadStream(sourceFile);
    const writeStream = fs.createWriteStream(destinationFile);

    // Step C: Pipe the streams ensuring buffer-limit backpressure protection
    readStream.pipe(writeStream);

    writeStream.on('finish', () => {
        console.log("   ✅ SUCCESS: File successfully piped chunk-by-chunk to copy file.");
        // Cleanup generated assets
        fs.unlinkSync(sourceFile);
        fs.unlinkSync(destinationFile);
    });
}


// ======================================================
// 2. NODE NATIVE: Worker Threads (Parallelism) [Difficulty: Hard 🔴]
// Goal: Delegate intensive blocking CPU math computations to a background thread.
// ======================================================

function spawnWorkerThreadDemo() {
    // SCENARIO A: This execution block is the MANAGER (Main Loop)
    if (isMainThread) {
        console.log("\n--- 🧵 MAIN THREAD: Starting CPU operation without blocking ---");
        
        // Spin up parallel process utilizing this exact file as its operational context!
        const parallelAgent = new Worker(__filename, {
            workerData: { targetNumber: 5 } // Pass data securely to thread
        });

        parallelAgent.on('message', (result) => {
            console.log(`   ✅ WORKER COMPLETE: Calculated Factorial of 5 as: ${result}`);
        });

        parallelAgent.on('error', (err) => console.error("   ❌ WORKER FAILED:", err));

        console.log("   💡 LOGIC LOCK CHECK: Main thread still free and running fine instantly!");
    } 
    // SCENARIO B: This execution block is the WORKER (Sub-Process)
    else {
        // 🚨 CPU-INTENSIVE MOCK OPERATION
        const heavyFactorial = (num) => {
            if (num === 0) return 1;
            return num * heavyFactorial(num - 1);
        };

        const result = heavyFactorial(workerData.targetNumber);
        
        // Ship product back across native message channel
        parentPort.postMessage(result); 
    }
}

// ─── DRIVER EXECUTION ───────────────────────────────────────────────────────
// Only initiate demo orchestration from the core main entry point
if (isMainThread) {
    demonstrateStreamPiping();
    spawnWorkerThreadDemo();
} else {
    // Fallback if this execution is inside the spawned worker context
    spawnWorkerThreadDemo();
}
