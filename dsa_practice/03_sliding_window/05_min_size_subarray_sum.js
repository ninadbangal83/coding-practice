// ======================================================
// 5. Minimum Size Subarray Sum [Difficulty: Medium 🟡]
// Goal: Find MINIMUM array width satisfying target threshold.
// ======================================================

const minSubNums = [2, 3, 1, 2, 4, 3];
const targetThreshold = 7;

const minSubArrayLen = (target, nums) => {
    let left = 0;
    let sum = 0;
    let minWidth = Infinity;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];

        // Constraint MET: Shrink actively as long as condition holds to find MIN size
        while (sum >= target) {
            minWidth = Math.min(minWidth, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }
    return minWidth === Infinity ? 0 : minWidth;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { target: 7, nums: [2, 3, 1, 2, 4, 3], expected: 2, desc: "Standard distribution middle winner" },
    { target: 4, nums: [1, 4, 4], expected: 1, desc: "Direct single-element match" },
    { target: 11, nums: [1, 1, 1, 1], expected: 0, desc: "Edge: Sum unreachable constraint (expect 0)" },
    { target: 10, nums: [], expected: 0, desc: "Edge: Void dataset state" },
    { target: 5000, nums: Array.from({ length: 5000 }, () => 1), expected: 5000, desc: "Scale: Full-array traversal match" }
];

console.log("\n--- 🧪 Running Min Size Subarray Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = minSubArrayLen(tc.target, tc.nums);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input: target=${tc.target}`);
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
