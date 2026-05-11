// ======================================================
// 5. 3Sum Triplet Search [Difficulty: Medium-Hard 🟠]
// Goal: Find all UNIQUE triplets summing to zero.
// ======================================================

const tripletInput = [-1, 0, 1, 2, -1, -4];

const threeSum = (nums) => {
    nums.sort((a, b) => a - b); // SORTING IS ESSENTIAL
    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        // Stop duplicates for index i
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        if (nums[i] > 0) break; // Minimal element > 0, no solutions possible

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                // Skip internal duplicates
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { nums: [-1, 0, 1, 2, -1, -4], expected: [[-1, -1, 2], [-1, 0, 1]], desc: "Standard intersecting set" },
    { nums: [0, 1, 1], expected: [], desc: "All positive numbers boundary (impossible)" },
    { nums: [0, 0, 0, 0], expected: [[0, 0, 0]], desc: "Multiple zeros (must eliminate duplicate triplets)" },
    { nums: [0], expected: [], desc: "Edge: Insufficient element count" },
    { nums: [-2, 0, 0, 2, 2], expected: [[-2, 0, 2]], desc: "Overlapping matches constraint" }
];

// Normalization Helper: Deep sort both levels to bypass order variations
const normalize = (arr) => {
    const sortedInner = arr.map(t => [...t].sort((a,b) => a-b));
    return sortedInner.sort((a,b) => a.join(',').localeCompare(b.join(',')));
};

console.log("\n--- 🧪 Running 3Sum Triplet Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = threeSum(tc.nums);
    const duration = (performance.now() - start).toFixed(4);

    const normRes = normalize(result);
    const normExp = normalize(tc.expected);
    
    const isPassed = JSON.stringify(normRes) === JSON.stringify(normExp);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input: ${JSON.stringify(tc.nums)}`);
        console.log(`   Output: ${JSON.stringify(result)}`);
        console.log(`   Expected: ${JSON.stringify(tc.expected)}`);
    }
});
