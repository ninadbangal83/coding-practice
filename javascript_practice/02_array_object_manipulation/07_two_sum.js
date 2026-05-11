// ======================================================
// 7. Two Sum [Difficulty: Medium 🟡]
// Goal: Find 2 indices in an array that sum to a specific target optimally.
// ======================================================

const twoSum = (nums, target) => {
    const map = new Map(); // value -> index
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { nums: [2, 7, 11, 15], target: 9, expected: [0, 1], desc: "Standard contiguous indices" },
    { nums: [3, 2, 4], target: 6, expected: [1, 2], desc: "Mid-array displacement lookup" },
    { nums: [3, 3], target: 6, expected: [0, 1], desc: "Edge: Twin duplicate detection" },
    { nums: [1, 2], target: 10, expected: [], desc: "Edge: No solution available failure" },
    { nums: Array.from({ length: 5000 }, (_, i) => i), target: 9997, expected: [4998, 4999], desc: "Scale: Heavy scale tail lookup" }
];

console.log("\n--- 🧪 Running Two Sum Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = twoSum(tc.nums, tc.target);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = JSON.stringify(result.sort()) === JSON.stringify(tc.expected.sort());
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${JSON.stringify(result)}`);
    }
});
