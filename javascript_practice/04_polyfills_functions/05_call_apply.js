// ======================================================
// 5. Function.prototype.call & apply Polyfills [Difficulty: Medium 🟡]
// Goal: Manually assign function scope and execute immediately.
// ======================================================

Function.prototype.myCall = function(context = global, ...args) {
    const fnKey = Symbol('tempFn'); 
    context[fnKey] = this; 
    const result = context[fnKey](...args);
    delete context[fnKey]; 
    return result;
};

Function.prototype.myApply = function(context = global, args = []) {
    const fnKey = Symbol('tempFn');
    context[fnKey] = this;
    const result = context[fnKey](...args); 
    delete context[fnKey];
    return result;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

function getInfo(greeting) { return `${greeting}, ${this.name}`; }
const user = { name: "Developer" };

const testCases = [
    { 
        exec: () => getInfo.myCall(user, "Hello"), 
        expected: "Hello, Developer", 
        desc: "myCall string context injection" 
    },
    { 
        exec: () => getInfo.myApply(user, ["Greetings"]), 
        expected: "Greetings, Developer", 
        desc: "myApply array arguments context injection" 
    }
];

console.log("\n--- 🧪 Running Call/Apply Polyfill Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = tc.exec();
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
});
