// ======================================================
// 6. Trapping Rain Water [Difficulty: Hard 🔴]
// Goal: Compute trapped rainwater amount efficiently in O(n).
// ======================================================

const elevationMap = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];

const trap = (height) => {
    let left = 0, right = height.length - 1;
    let maxL = 0, maxR = 0;
    let trapped = 0;

    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] >= maxL) {
                maxL = height[left];
            } else {
                trapped += maxL - height[left];
            }
            left++;
        } else {
            if (height[right] >= maxR) {
                maxR = height[right];
            } else {
                trapped += maxR - height[right];
            }
            right--;
        }
    }
    return trapped;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { h: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], expected: 6, desc: "Standard multi-valley distribution" },
    { h: [4, 2, 0, 3, 2, 5], expected: 9, desc: "Deep central gorge pattern" },
    { h: [1, 2, 3, 4], expected: 0, desc: "Edge: Monotonically rising slope (zero capture)" },
    { h: [4, 4, 4], expected: 0, desc: "Edge: Perfectly flat surface constraint" },
    { h: [], expected: 0, desc: "Edge: Void input array" },
    { h: [3, 0, 3], expected: 3, desc: "Simple single pool container" },
    { h: Array.from({ length: 5000 }, (_, i) => (i % 2 === 0 ? 2 : 0)), expected: 4998, desc: "Scale: Large alternating wave simulation" }
];

console.log("\n--- 🧪 Running Trapping Rain Water Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = trap(tc.h);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
