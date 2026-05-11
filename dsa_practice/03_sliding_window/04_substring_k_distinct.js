// ======================================================
// 4. Substring with K Distinct Chars [Difficulty: Medium 🟡]
// Goal: Find longest continuous block containing at most 'k' unique chars.
// ======================================================

const kDistinctInput = "eceba";
const distinctLimit = 2;

const longestSubstringKDistinct = (s, k) => {
    const charFrequency = new Map();
    let left = 0;
    let maxBlock = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        charFrequency.set(char, (charFrequency.get(char) || 0) + 1);

        // Violates rule? Shrink from left until uniqueness count drops
        while (charFrequency.size > k) {
            const leftChar = s[left];
            charFrequency.set(leftChar, charFrequency.get(leftChar) - 1);
            if (charFrequency.get(leftChar) === 0) {
                charFrequency.delete(leftChar);
            }
            left++;
        }
        maxBlock = Math.max(maxBlock, right - left + 1);
    }
    return maxBlock;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { s: "eceba", k: 2, expected: 3, desc: "Standard mid-string distinct match" },
    { s: "aa", k: 1, expected: 2, desc: "Homogeneous smaller uniqueness requirement" },
    { s: "a", k: 0, expected: 0, desc: "Edge: k limit equals zero boundary" },
    { s: "world", k: 10, expected: 5, desc: "Large k exceeds available chars boundary" },
    { s: "", k: 2, expected: 0, desc: "Edge: Empty input string data flow" },
    { s: "a".repeat(5000) + "b" + "a".repeat(5000), k: 2, expected: 10001, desc: "Scale: Massive length linear performance test" }
];

console.log("\n--- 🧪 Running K Distinct Substring Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = longestSubstringKDistinct(tc.s, tc.k);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input: s="${tc.s.length > 10 ? tc.s.slice(0,10)+'...' : tc.s}", k=${tc.k}`);
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
