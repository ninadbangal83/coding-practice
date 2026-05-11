// ======================================================
// 6. Function.prototype.bind Polyfill [Difficulty: Medium-Hard 🟠]
// Goal: Return a new function that, when called, sets its "this" keyword.
// ======================================================

Function.prototype.myBind = function(context, ...boundArgs) {
    const originalFunc = this;
    return function(...args) {
        return originalFunc.apply(context, [...boundArgs, ...args]);
    };
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

function mult(a, b) { return a * b * (this.factor || 1); }
const context = { factor: 10 };

const testCases = [
    { 
        exec: () => {
            const bnd = mult.myBind(context);
            return bnd(2, 3);
        }, 
        expected: 60, 
        desc: "Basic dynamic context runtime binding" 
    },
    { 
        exec: () => {
            const partial = mult.myBind(context, 5);
            return partial(4);
        }, 
        expected: 200, 
        desc: "Partial argument currying application" 
    }
];

console.log("\n--- 🧪 Running Function.bind Polyfill Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = tc.exec();
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
});
