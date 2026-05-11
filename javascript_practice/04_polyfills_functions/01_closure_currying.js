// ======================================================
// 1. The Closure Principle & Currying [Difficulty: Medium 🟡]
// Goal: Retain inner scope state (Encapsulation) & handle partial execution.
// ======================================================

const createCounter = () => {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
};

const curriedSum = (a) => (b) => (c) => a + b + c;

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        exec: () => {
            const c = createCounter();
            c.increment(); c.increment(); c.decrement();
            return c.getCount();
        },
        expected: 1,
        desc: "Isolated count snapshot maintenance"
    },
    {
        exec: () => {
            const c1 = createCounter();
            const c2 = createCounter();
            c1.increment();
            return `${c1.getCount()}-${c2.getCount()}`;
        },
        expected: "1-0",
        desc: "Lexical scope instance distinctness"
    },
    {
        exec: () => curriedSum(10)(20)(30),
        expected: 60,
        desc: "Partial sequential execution execution"
    }
];

console.log("\n--- 🧪 Running Closure & Currying Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = tc.exec();
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
});
