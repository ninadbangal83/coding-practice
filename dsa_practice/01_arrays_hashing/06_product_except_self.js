// ======================================================
// 6. Product Except Self [Difficulty: Medium-Hard 🟠]
// Goal: Multiply all numbers EXCEPT self WITHOUT using division!
// ======================================================

const productInput = [1, 2, 3, 4];

const productExceptSelf = (nums) => {
    const n = nums.length;
    const result = new Array(n).fill(1);

    // Left Pass: Store multiplication product of all elements on the left
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= nums[i];
    }

    // Right Pass: Multiply current result by products of all elements on the right
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    return result;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { nums: [1, 2, 3, 4], expected: [24, 12, 8, 6], desc: "Standard positives" },
    { nums: [-1, 1, 0, -3, 3], expected: [0, 0, 9, 0, 0], desc: "Edge: Single Zero included" },
    { nums: [0, 0, 5], expected: [0, 0, 0], desc: "Edge: Multiple Zeroes (kills all products)" },
    { nums: [10, 20], expected: [20, 10], desc: "Edge: Minimal length pair constraint" }
];

console.log("\n--- 🧪 Running Product Except Self Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = productExceptSelf(tc.nums);
    const duration = (performance.now() - start).toFixed(4);

    // Direct comparison using JSON stringify is safe for linear ordered number array here
    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input: ${JSON.stringify(tc.nums)}`);
        console.log(`   Output: ${JSON.stringify(result)} | Expected: ${JSON.stringify(tc.expected)}`);
    }
});
