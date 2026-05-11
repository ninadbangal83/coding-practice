// ======================================================
// 3. Event Loop Ordering [Difficulty: Medium 🟡]
// Goal: Validate understanding of execution context between Sync Code, Microtasks, and Macrotasks.
// ======================================================

const captureEventLoopSequence = () => {
    return new Promise((resolve) => {
        const order = [];

        order.push("SYNC_1"); // #1 Current Call Stack

        setTimeout(() => {
            order.push("MACRO_TASK"); // #4 Macrotask Queue (Timer expires)
            resolve(order); // Final conclusion
        }, 0);

        Promise.resolve().then(() => {
            order.push("MICRO_TASK_1"); // #3 Microtask Queue immediate
        }).then(() => {
            order.push("MICRO_TASK_2"); // Continues microtask chain until drained
        });

        order.push("SYNC_2"); // #2 Tail of Call Stack
    });
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        exec: () => captureEventLoopSequence(),
        expected: ["SYNC_1", "SYNC_2", "MICRO_TASK_1", "MICRO_TASK_2", "MACRO_TASK"],
        desc: "Event Loop precedence verification (Sync -> Micro -> Macro)"
    }
];

async function runSuite() {
    console.log("\n--- 🧪 Running Event Loop Ordering Automated Tests ---");
    for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        const start = performance.now();
        const result = await tc.exec();
        const duration = (performance.now() - start).toFixed(4);

        const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
        console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
        
        if (!isPassed) {
            console.log("   Received sequence:", result);
        }
    }
}

runSuite();
