// ======================================================
// 2. Async / Await Flow [Difficulty: Easy 🟢]
// Goal: Replicate sequential async operations using the declarative Async/Await cleaner syntax.
// ======================================================

const simulateFetchUser = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id: 1, name: "Bob" }), 20);
    });
};

const simulateFetchPosts = (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(["Reply A", "Reply B"]), 20);
    });
};

const runAsyncSequence = async () => {
    try {
        const user = await simulateFetchUser();
        const posts = await simulateFetchPosts(user.id);
        return posts;
    } catch (e) {
        return e;
    }
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        exec: () => runAsyncSequence(),
        expected: ["Reply A", "Reply B"],
        desc: "Syntactical clarity validation of await triggers"
    }
];

async function runSuite() {
    console.log("\n--- 🧪 Running Async/Await Flow Automated Tests ---");
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
