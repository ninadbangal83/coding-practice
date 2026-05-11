// ======================================================
// 1. Promise Chaining [Difficulty: Easy 🟢]
// Goal: Execute sequential asynchronous tasks utilizing raw Promise chains.
// ======================================================

const simulateFetchUser = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id: 1, name: "Alice" }), 20);
    });
};

const simulateFetchPosts = (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(["Post 1", "Post 2"]), 20);
    });
};

// Chained execution runner returning a promise for testing
const runPromiseChain = () => {
    return simulateFetchUser()
        .then(user => simulateFetchPosts(user.id))
        .then(posts => posts);
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        exec: () => runPromiseChain(),
        expected: ["Post 1", "Post 2"],
        desc: "Sequential execution via .then() linkages"
    }
];

async function runSuite() {
    console.log("\n--- 🧪 Running Promise Chain Automated Tests ---");
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
