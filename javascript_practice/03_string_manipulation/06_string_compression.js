// ======================================================
// 6. String Compression [Difficulty: Medium-Hard 🟠]
// Goal: Compress string by counting consecutive chars (e.g., "aabcccccaaa" -> "a2b1c5a3").
// Returns original string if compression isn't shorter.
// ======================================================

const compressString = (str) => {
    if (!str) return str;
    
    let compressed = '';
    let count = 1;
    
    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
            count++;
        } else {
            compressed += str[i] + count;
            count = 1; 
        }
    }
    
    // Rule: only return compressed if it's actually smaller than the original
    return compressed.length < str.length ? compressed : str;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { input: "aabcccccaaa", expected: "a2b1c5a3", desc: "Heavily repeating optimal compression" },
    { input: "abcd", expected: "abcd", desc: "Unique sequence returning original (compression overhead)" },
    { input: "aa", expected: "aa", desc: "Equal length boundary retaining original" },
    { input: "", expected: "", desc: "Edge: Void conservation" },
    { input: "a".repeat(100), expected: "a100", desc: "Scale: Long repeating block efficiency" }
];

console.log("\n--- 🧪 Running String Compression Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = compressString(tc.input);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
});
