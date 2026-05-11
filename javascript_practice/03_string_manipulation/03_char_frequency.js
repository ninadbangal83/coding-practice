// ======================================================
// 3. Character Frequency [Difficulty: Easy 🟢]
// Goal: Count frequency of each character in a string.
// ======================================================

const getCharFrequency = (str) => {
    const cleaned = str.replace(/\s+/g, '').toLowerCase(); // Standardize
    const freq = {};
    for (let char of cleaned) {
        freq[char] = (freq[char] || 0) + 1;
    }
    return freq;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { input: "Mississippi", expected: { m: 1, i: 4, s: 4, p: 2 }, desc: "Classic repetitive chain" },
    { input: "Hello World", expected: { h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1 }, desc: "Mixed case space ignoring check" },
    { input: "", expected: {}, desc: "Edge: Empty string preservation" }
];

console.log("\n--- 🧪 Running Character Frequency Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = getCharFrequency(tc.input);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${JSON.stringify(result)}`);
    }
});
