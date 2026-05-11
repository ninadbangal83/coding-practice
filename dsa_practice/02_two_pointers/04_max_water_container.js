// ======================================================
// 4. Container With Most Water [Difficulty: Medium 🟡]
// Goal: Find max area enclosed between two lines.
// ======================================================

const heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];

const maxArea = (height) => {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        const currentWidth = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, currentWidth * currentHeight);

        // Move the SHORTER side inward to potentially find larger area
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxWater;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { h: [1, 8, 6, 2, 5, 4, 8, 3, 7], expected: 49, desc: "Standard divergent peak scenario" },
    { h: [1, 1], expected: 1, desc: "Edge: Minimal size container" },
    { h: [4, 3, 2, 1, 4], expected: 16, desc: "Equal heights widest container win" },
    { h: [1, 2, 1], expected: 2, desc: "Central high point test" },
    { h: Array.from({ length: 5000 }, (_, i) => i + 1), expected: 6250000, desc: "Scale: Linearly growing ramp dataset test" }
];

console.log("\n--- 🧪 Running Max Water Container Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = maxArea(tc.h);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
