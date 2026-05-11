// ======================================================
// 1. Generate All Subsets [Difficulty: Medium 🟡]
// Goal: Perform power-set backtracking generating every possible inclusive subset.
// ======================================================

const subsetInput = [1, 2, 3];

const generateSubsets = (nums) => {
    const result = [];

    const backtrack = (startIndex, currentCombination) => {
        // Directly capture current step state in the result output
        result.push([...currentCombination]);

        for (let i = startIndex; i < nums.length; i++) {
            // CHOICE: Inject current target element
            currentCombination.push(nums[i]);
            // RECURSE: Advance one step deeper
            backtrack(i + 1, currentCombination);
            // UNDO: Revert state by popping back up for alternate branches
            currentCombination.pop();
        }
    };

    backtrack(0, []);
    return result;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { nums: [1, 2, 3], expected: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]], desc: "Standard power set generation" },
    { nums: [0], expected: [[], [0]], desc: "Edge: Single element power count" },
    { nums: [], expected: [[]], desc: "Edge: Empty source set constraint" }
];

// Normalizer: Sort nested items and then sort the containers lexicographically
const normalize = (arr) => {
    const sortedInner = arr.map(subset => [...subset].sort((a, b) => a - b));
    return sortedInner.sort((a, b) => a.join(',').localeCompare(b.join(',')));
};

console.log("\n--- 🧪 Running Generate Subsets Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = generateSubsets(tc.nums);
    const duration = (performance.now() - start).toFixed(4);

    const normRes = normalize(result);
    const normExp = normalize(tc.expected);

    const isPassed = JSON.stringify(normRes) === JSON.stringify(normExp);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input: ${JSON.stringify(tc.nums)}`);
        console.log(`   Output Length: ${result.length} | Expected: ${tc.expected.length}`);
    }
});
