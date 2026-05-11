// ======================================================
// 1. Move Zeroes In-Place [Difficulty: Easy 🟢]
// Goal: Shift zeroes to end of array without changing relative order.
// ======================================================

const zeroInput = [0, 1, 0, 3, 12];

const moveZeroes = (nums) => {
    let writePointer = 0;
    
    // Move valid numbers to front
    for (let readPointer = 0; readPointer < nums.length; readPointer++) {
        if (nums[readPointer] !== 0) {
            // Swap values for clean in-place logic
            [nums[writePointer], nums[readPointer]] = [nums[readPointer], nums[writePointer]];
            writePointer++;
        }
    }
    return nums;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { nums: [0, 1, 0, 3, 12], expected: [1, 3, 12, 0, 0], desc: "Standard mixed test case" },
    { nums: [0], expected: [0], desc: "Edge: Single zero element" },
    { nums: [1], expected: [1], desc: "Edge: Single non-zero element" },
    { nums: [0, 0, 0], expected: [0, 0, 0], desc: "Edge: Pure zeroes dataset" },
    { nums: [1, 2, 3], expected: [1, 2, 3], desc: "Zero-free array boundary" },
    { nums: Array.from({ length: 5000 }, (_, i) => (i % 10 === 0 ? 0 : i)), desc: "Scale: Distributed heavy stream check" }
];

console.log("\n--- 🧪 Running Move Zeroes Automated Tests ---");
testCases.forEach((tc, i) => {
    // Clone inputs to avoid modifying test definitions across test reruns
    const inputArr = [...tc.nums];
    const start = performance.now();
    const result = moveZeroes(inputArr);
    const duration = (performance.now() - start).toFixed(4);

    // If expected omitted for large scales, check logical invariant: count of non-zero precedes zero
    let isPassed = true;
    if (tc.expected) {
        isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    } else {
        // Logic validation invariant check for large-scale generated arrays
        let foundZero = false;
        for (let val of result) {
            if (val === 0) foundZero = true;
            else if (foundZero && val !== 0) {
                isPassed = false; // Invalid: non-zero detected AFTER a zero was shifted
                break;
            }
        }
    }

    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input: truncated due to large size or failed comparison`);
        console.log(`   Output: ${JSON.stringify(result)}`);
    }
});
