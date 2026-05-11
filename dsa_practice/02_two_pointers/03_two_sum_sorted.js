// ======================================================
// 3. Two Sum Sorted [Difficulty: Easy-Medium 🟢🟡]
// Goal: Find indices of numbers that sum to target in a SORTED array.
// ======================================================

const sortedNums = [2, 7, 11, 15];
const targetVal = 9;

const twoSumSorted = (numbers, target) => {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];
        if (sum === target) {
            return [left + 1, right + 1]; // 1-indexed output per prompt
        } else if (sum < target) {
            left++; // Need larger sum
        } else {
            right--; // Need smaller sum
        }
    }
    return [];
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { nums: [2, 7, 11, 15], target: 9, expected: [1, 2], desc: "Base 1-indexed start" },
    { nums: [2, 3, 4], target: 6, expected: [1, 3], desc: "Matching boundary opposite ends" },
    { nums: [-1, 0], target: -1, expected: [1, 2], desc: "Including negative integer input" },
    { nums: [5, 25, 75], target: 100, expected: [2, 3], desc: "Matching final two elements" },
    { nums: Array.from({ length: 10000 }, (_, i) => i * 2), target: 19994, expected: [1, 9998], desc: "Scale: Deep range iteration check" }
];

console.log("\n--- 🧪 Running Two Sum Sorted Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = twoSumSorted(tc.nums, tc.target);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input: target=${tc.target}`);
        console.log(`   Output: ${JSON.stringify(result)} | Expected: ${JSON.stringify(tc.expected)}`);
    }
});
