// ======================================================
// 4. Palindrome Check [Difficulty: Medium 🟡]
// Goal: Determine if a string is a palindrome, ignoring case/symbols.
// ======================================================

const isPalindrome = (str) => {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { input: "Race Car", expected: true, desc: "Mixed case validity" },
    { input: "A man, a plan, a canal: Panama", expected: true, desc: "Extensive symbol pruning" },
    { input: "hello", expected: false, desc: "Negative case mismatch" },
    { input: "0P", expected: false, desc: "Alphanumeric boundary mismatch" },
    { input: "   ", expected: true, desc: "Edge: Pure symbols reduction to void" }
];

console.log("\n--- 🧪 Running Palindrome Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = isPalindrome(tc.input);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
});
