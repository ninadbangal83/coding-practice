// ======================================================
// 3. Longest Substring Without Repeats [Difficulty: Medium 🟡]
// Goal: Find length of longest block with total unique characters.
// ======================================================

const stringInput1 = "abcabcbb";
const stringInput2 = "pwwkew";

const lengthOfLongestSubstring = (s) => {
    const charIndexMap = new Map(); // char -> last seen absolute position
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        // Shrink Logic: If we found duplicate, shift LEFT past its old position
        if (charIndexMap.has(char) && charIndexMap.get(char) >= left) {
            left = charIndexMap.get(char) + 1;
        }

        charIndexMap.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { s: "abcabcbb", expected: 3, desc: "Standard overlapping set" },
    { s: "bbbbb", expected: 1, desc: "Single homogeneous character repetition" },
    { s: "pwwkew", expected: 3, desc: "Disjoint substring validation" },
    { s: "", expected: 0, desc: "Edge: Completely empty string" },
    { s: " ", expected: 1, desc: "Whitespace character edge verification" },
    { s: "abcdef", expected: 6, desc: "Entire string perfectly distinct" },
    { s: "a".repeat(10000), expected: 1, desc: "Scale: Extreme repetitive massive string" }
];

console.log("\n--- 🧪 Running Longest Substring Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = lengthOfLongestSubstring(tc.s);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input: "${tc.s.length > 10 ? tc.s.slice(0,10)+'...' : tc.s}"`);
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
