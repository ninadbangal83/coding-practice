// ======================================================
// 1. Reverse String [Difficulty: Easy 🟢]
// Goal: Reverse the given string.
// ======================================================

const reverseString = (str) => {
    return str.split('').reverse().join('');
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { input: "hello world", expected: "dlrow olleh", desc: "Standard string reverse" },
    { input: "", expected: "", desc: "Edge: Empty input string" },
    { input: "racecar", expected: "racecar", desc: "Symmetric palindrome retention" },
    { input: "12345", expected: "54321", desc: "Numeric string flip" }
];

console.log("\n--- 🧪 Running Reverse String Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = reverseString(tc.input);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: "${result}" | Expected: "${tc.expected}"`);
    }
});
