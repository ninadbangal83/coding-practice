// ======================================================
// 1. Two Sum [Difficulty: Easy ⭐⭐]
// Goal: Find indices of two numbers that add up to a specific target.
// ======================================================

const numsForSum = [2, 7, 11, 15];
const target = 9;

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
    { nums: [2, 7, 11, 15], target: 9, expected: [0, 1], desc: "Standard scenario positive test" },
    { nums: [3, 2, 4], target: 6, expected: [1, 2], desc: "Indices located later in dataset" },
    { nums: [3, 3], target: 6, expected: [0, 1], desc: "Identical values fulfilling sum requirement" },
    { nums: [-1, -2, -3, -4, -5], target: -8, expected: [2, 4], desc: "Negative integral components boundary" },
    { nums: [0, 4, 3, 0], target: 0, expected: [0, 3], desc: "Zero-sum overlap constraint" },
    { nums: Array.from({ length: 10000 }, (_, i) => i), target: 19997, expected: [9998, 9999], desc: "Scale: High-volume speed benchmarking" }
];

console.log("\n--- 🧪 Running Two Sum Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = twoSum(tc.nums, tc.target);
    const duration = (performance.now() - start).toFixed(4);

    // Canonical sort normalization is safer for output independence
    const normalizedRes = [...result].sort((a, b) => a - b);
    const normalizedExp = [...tc.expected].sort((a, b) => a - b);
    
    const isPassed = JSON.stringify(normalizedRes) === JSON.stringify(normalizedExp);
    console.log(`Test Case ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
    
    if (!isPassed) {
        console.log(`   Input: nums=[${tc.nums.length > 10 ? tc.nums.slice(0, 5) + "...(truncated)" : tc.nums}], target=${tc.target}`);
        console.log(`   Output: [${result}] | Expected: [${tc.expected}]`);
    }
});
