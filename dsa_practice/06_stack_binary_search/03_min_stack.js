// ======================================================
// 3. Min Stack Class [Difficulty: Medium 🟡]
// Goal: Constant time O(1) minimum access by storing snapshots.
// ======================================================

class MinStack {
    constructor() {
        this.stack = []; // Format: [ [val, minAtThisSnapshot], ...]
    }
    push(val) {
        const currentMin = this.stack.length === 0 
            ? val 
            : Math.min(val, this.stack[this.stack.length - 1][1]);
        this.stack.push([val, currentMin]);
    }
    pop() {
        return this.stack.pop()?.[0];
    }
    top() {
        return this.stack[this.stack.length - 1][0];
    }
    getMin() {
        return this.stack[this.stack.length - 1][1];
    }
}

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const runStackScenario = (ops, vals) => {
    const obj = new MinStack();
    const output = [];
    
    for (let i = 0; i < ops.length; i++) {
        const op = ops[i];
        const val = vals[i]?.[0];
        
        if (op === "MinStack") {
            output.push(null);
        } else if (op === "push") {
            obj.push(val);
            output.push(null);
        } else if (op === "pop") {
            obj.pop();
            output.push(null);
        } else if (op === "top") {
            output.push(obj.top());
        } else if (op === "getMin") {
            output.push(obj.getMin());
        }
    }
    return output;
};

const testCases = [
    {
        ops: ["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"],
        vals: [[], [-2], [0], [-3], [], [], [], []],
        expected: [null, null, null, null, -3, null, 0, -2],
        desc: "Standard snapshot retention validation"
    },
    {
        ops: ["MinStack", "push", "getMin"],
        vals: [[], [2147483647], []],
        expected: [null, null, 2147483647],
        desc: "Single item threshold validation"
    }
];

console.log("\n--- 🧪 Running Min Stack Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = runStackScenario(tc.ops, tc.vals);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${JSON.stringify(result)} | Expected: ${JSON.stringify(tc.expected)}`);
    }
});
