// ======================================================
// 2. Longest Word [Difficulty: Easy 🟢]
// Goal: Find the longest word in a sentence.
// ======================================================

const findLongestWord = (sentence) => {
    // Adding trim and split regex to handle multi-spaces robustly
    const words = sentence.trim().split(/\s+/);
    if (words.length === 0 || words[0] === "") return "";
    
    return words.reduce((longest, current) => {
        return current.length > longest.length ? current : longest;
    }, "");
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { input: "The quick brown fox jumped over the lazy dog", expected: "jumped", desc: "Standard multisyllabic string" },
    { input: "Short test case", expected: "Short", desc: "Tiebreaker length retention (first encountered)" },
    { input: "   isolated   ", expected: "isolated", desc: "Edge: Leading/trailing whitespace cleanup" },
    { input: "", expected: "", desc: "Edge: Void input safe return" }
];

console.log("\n--- 🧪 Running Longest Word Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = findLongestWord(tc.input);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: "${result}"`);
    }
});
