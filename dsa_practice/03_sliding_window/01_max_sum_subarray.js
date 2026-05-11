// ======================================================
// 1. Max Sum Subarray (Fixed K) [Difficulty: Easy 🟢]
// Goal: Return max contiguous sum of subarray with rigid fixed size 'k'.
// ======================================================

const numsForFixedSum = [2, 1, 5, 1, 3, 2];
const windowLimit = 3;

const maxSumSubarrayOfSizeK = (nums, k) => {
    let windowSum = 0;
    let maxSum = 0;

    // Initialize very first full window
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    maxSum = windowSum;

    // Slide window along the numbers
    for (let right = k; right < nums.length; right++) {
        windowSum += nums[right];        // Intake new element from right
        windowSum -= nums[right - k];    // Drop trailing element from left
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { nums: [2, 1, 5, 1, 3, 2], k: 3, expected: 9, desc: "Standard interspersed array" },
    { nums: [2, 3, 4, 1, 5], k: 2, expected: 7, desc: "Optimal is first window match" },
    { nums: [-1, -2, -3], k: 2, expected: -3, desc: "Edge: All-negative data integrity" },
    { nums: [10, 20, 30], k: 3, expected: 60, desc: "k equals total array length limit" },
    { nums: [5, 1, 9], k: 1, expected: 9, desc: "Edge: Single-width slider constraint" },
    { nums: Array.from({ length: 5000 }, (_, i) => i), k: 100, expected: 494950, desc: "Scale: Broad-slider heavy numerical load test" }
];

console.log("\n--- 🧪 Running Max Sum Subarray Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = maxSumSubarrayOfSizeK(tc.nums, tc.k);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input: k=${tc.k}`);
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
