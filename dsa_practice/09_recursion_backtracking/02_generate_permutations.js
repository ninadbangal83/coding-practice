// ======================================================
// 2. Generate All Permutations [Difficulty: Medium 🟡]
// Goal: Backtrack using state depletion until zero available elements remain.
// ======================================================

const permuteInput = [1, 2, 3];

const generatePermutations = (nums) => {
    const result = [];

    const backtrack = (activeCombo, availableChoices) => {
        // Base Case: Exhaustion achieved, lock resolution
        if (availableChoices.length === 0) {
            result.push([...activeCombo]);
            return;
        }

        for (let i = 0; i < availableChoices.length; i++) {
            activeCombo.push(availableChoices[i]); // Choice

            // Create filtered depletion pool for recursive branch
            const nextSelectionPool = availableChoices.filter((_, index) => index !== i);
            backtrack(activeCombo, nextSelectionPool); // Recurse

            activeCombo.pop(); // Undo
        }
    };

    backtrack([], nums);
    return result;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { nums: [1, 2, 3], expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]], desc: "Standard fully exhaustive matrix" },
    { nums: [0, 1], expected: [[0, 1], [1, 0]], desc: "Edge: Dual entry balance" },
    { nums: [1], expected: [[1]], desc: "Edge: Single entry constraint" }
];

// Normalizer: Keeps the inner order strictly intact (essential for permutations!), sorts parent rows only
const normalizePermutations = (arr) => {
    return [...arr].sort((a, b) => a.join(',').localeCompare(b.join(',')));
};

console.log("\n--- 🧪 Running Generate Permutations Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = generatePermutations(tc.nums);
    const duration = (performance.now() - start).toFixed(4);

    const normRes = normalizePermutations(result);
    const normExp = normalizePermutations(tc.expected);

    const isPassed = JSON.stringify(normRes) === JSON.stringify(normExp);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${JSON.stringify(result)}`);
        console.log(`   Expected: ${JSON.stringify(tc.expected)}`);
    }
});
