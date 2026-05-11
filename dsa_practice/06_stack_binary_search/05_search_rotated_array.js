// ======================================================
// 5. Search In Rotated Sorted Array [Difficulty: Medium-Hard 🟠]
// Goal: Pivot logic algorithm analyzing which half maintains ordered sorting.
// ======================================================

const rotatedNums = [4, 5, 6, 7, 0, 1, 2];
const findVal = 0;

const searchRotated = (nums, target) => {
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;

        // Branch: Left-half sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1; // Exists within sorted side bound
            } else {
                left = mid + 1;  // Must range on right side
            }
        } 
        // Branch: Right-half sorted
        else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1; // Exists in sorted right side
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { nums: [4, 5, 6, 7, 0, 1, 2], target: 0, expected: 4, desc: "Pivot straddled target in lower half" },
    { nums: [4, 5, 6, 7, 0, 1, 2], target: 3, expected: -1, desc: "Target not present in rotated array" },
    { nums: [1], target: 0, expected: -1, desc: "Edge: Single element missing match" },
    { nums: [1, 3], target: 3, expected: 1, desc: "Edge: Twin element unrotated find" },
    { nums: [6, 7, 8, 1, 2, 3, 4, 5], target: 6, expected: 0, desc: "Target sits exactly at initial pivot point boundary" },
    { nums: Array.from({length: 5000}, (_, i) => i + 500).concat(Array.from({length: 500}, (_, i) => i)), target: 250, expected: 5250, desc: "Scale: Large offset-rotational data load search" }
];

console.log("\n--- 🧪 Running Rotated Search Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = searchRotated(tc.nums, tc.target);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input Target: ${tc.target}`);
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
