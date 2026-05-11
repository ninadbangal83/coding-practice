// ======================================================
// 1. Standard Binary Search [Difficulty: Easy 🟢]
// Goal: Locate index of target in O(log N) time.
// ======================================================

const searchArray = [-1, 0, 3, 5, 9, 12];
const targetVal = 9;

const binarySearch = (nums, target) => {
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { nums: [-1, 0, 3, 5, 9, 12], target: 9, expected: 4, desc: "Standard match in upper half" },
    { nums: [-1, 0, 3, 5, 9, 12], target: 2, expected: -1, desc: "Target missing expected -1 failure" },
    { nums: [5], target: 5, expected: 0, desc: "Edge: Single element instant find" },
    { nums: [2, 5], target: 5, expected: 1, desc: "Edge: Two element right-hand boundary hit" },
    { nums: Array.from({ length: 5000 }, (_, i) => i), target: 4999, expected: 4999, desc: "Scale: Extreme right-edge rapid retrieval" }
];

console.log("\n--- 🧪 Running Binary Search Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = binarySearch(tc.nums, tc.target);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input Target: ${tc.target}`);
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
