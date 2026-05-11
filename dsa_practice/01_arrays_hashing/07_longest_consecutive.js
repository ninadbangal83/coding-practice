// ======================================================
// 7. Longest Consecutive Sequence [Difficulty: Hard 🔴]
// Goal: Find longest consecutive elements sequence chain in O(n) time.
// ======================================================

const sequenceInput = [100, 4, 200, 1, 3, 2];

const longestConsecutive = (nums) => {
    const numSet = new Set(nums); // Direct O(1) lookup table
    let maxLen = 0;

    for (const num of numSet) {
        // Step: Only verify chains starting from base (where num-1 doesn't exist)
        if (!numSet.has(num - 1)) {
            let current = num;
            let currentLen = 1;

            // Crawl forward sequentially
            while (numSet.has(current + 1)) {
                current++;
                currentLen++;
            }
            maxLen = Math.max(maxLen, currentLen);
        }
    }
    return maxLen;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { nums: [100, 4, 200, 1, 3, 2], expected: 4, desc: "Standard interleaved set" },
    { nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1], expected: 9, desc: "Large sequential with dupes" },
    { nums: [], expected: 0, desc: "Edge: Empty array input" },
    { nums: [-1, 0, 1, -2, 50], expected: 4, desc: "Negative inclusive sequence range" },
    { nums: Array.from({ length: 5000 }, (_, i) => i), expected: 5000, desc: "Scale: Massive contiguous set speed load test" }
];

console.log("\n--- 🧪 Running Longest Consecutive Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = longestConsecutive(tc.nums);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
