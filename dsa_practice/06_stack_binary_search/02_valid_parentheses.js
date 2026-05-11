// ======================================================
// 2. Valid Parentheses [Difficulty: Easy-Medium 🟢🟡]
// Goal: Validate perfectly balanced pair matchings using LIFO stack.
// ======================================================

const bracketStr1 = "()[]{}";
const bracketStr2 = "(]";

const isValid = (s) => {
    const stack = [];
    const pairMap = { ')': '(', ']': '[', '}': '{' };

    for (const char of s) {
        if ('([{'.includes(char)) {
            stack.push(char); // Track active openers
        } else {
            // Immediate failure if opener doesn't match expected stack top
            if (stack.pop() !== pairMap[char]) return false;
        }
    }
    return stack.length === 0; // Must be empty
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { s: "()[]{}", expected: true, desc: "Standard alternating direct closure" },
    { s: "(]", expected: false, desc: "Mismatch cross-pair violation" },
    { s: "([)]", expected: false, desc: "Interleaved overlapping overlap failure" },
    { s: "{[]}", expected: true, desc: "Nested enclosed closure valid" },
    { s: "[", expected: false, desc: "Edge: Unresolved opener stack state" },
    { s: "]", expected: false, desc: "Edge: Immediate closer null-stack failure" },
    { s: "(".repeat(1000) + ")".repeat(1000), expected: true, desc: "Scale: Massive heavy nested stacking validation" }
];

console.log("\n--- 🧪 Running Valid Parentheses Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = isValid(tc.s);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input: "${tc.s.length > 10 ? tc.s.slice(0,10)+'...' : tc.s}"`);
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
