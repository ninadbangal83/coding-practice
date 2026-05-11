// ======================================================
// 3. Combination Sum [Difficulty: Medium-Hard 🟠]
// Goal: Recursive search tree permitting dynamic resource reuse until total target met.
// ======================================================

const candidatesSet = [2, 3, 6, 7];
const targetRequirement = 7;

const combinationSum = (candidates, target) => {
    const results = [];

    const backtrack = (startingIdx, activeList, remainingGap) => {
        // Goal Completion Condition
        if (remainingGap === 0) {
            results.push([...activeList]);
            return;
        }
        // Out-of-Bounds pruning: Stop processing branch instantly
        if (remainingGap < 0) {
            return;
        }

        for (let i = startingIdx; i < candidates.length; i++) {
            activeList.push(candidates[i]);
            // Recurse with SAME 'i' pointer to explicitly permit indefinite reuse
            backtrack(i, activeList, remainingGap - candidates[i]);
            activeList.pop(); // Backtrack undo trigger
        }
    };

    backtrack(0, [], target); // FIX: Use formal 'target' param, not outer scoped constant
    return results;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { candidates: [2, 3, 6, 7], target: 7, expected: [[2,2,3], [7]], desc: "Standard distributed reuse" },
    { candidates: [2, 3, 5], target: 8, expected: [[2,2,2,2], [2,3,3], [3,5]], desc: "Multi-combination varied path" },
    { candidates: [2], target: 1, expected: [], desc: "Edge: Zero reachable matches constraint" }
];

// Normalizer: Full deep sort for combinations
const normalizeCombos = (arr) => {
    const sortedInner = arr.map(sub => [...sub].sort((a, b) => a - b));
    return sortedInner.sort((a, b) => a.join(',').localeCompare(b.join(',')));
};

console.log("\n--- 🧪 Running Combination Sum Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = combinationSum(tc.candidates, tc.target);
    const duration = (performance.now() - start).toFixed(4);

    const normRes = normalizeCombos(result);
    const normExp = normalizeCombos(tc.expected);

    const isPassed = JSON.stringify(normRes) === JSON.stringify(normExp);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Target: ${tc.target}`);
        console.log(`   Output: ${JSON.stringify(result)}`);
        console.log(`   Expected: ${JSON.stringify(tc.expected)}`);
    }
});
