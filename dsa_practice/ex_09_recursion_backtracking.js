
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

// TEST LOG:
console.log("\n--- Generate Subsets Results ---");
console.log("All subsets of [1,2,3]:", generateSubsets(subsetInput));
// Expected: [ [], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3] ]


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

// TEST LOG:
console.log("\n--- Generate Permutations Results ---");
console.log("All combinations of [1,2,3]:", generatePermutations(permuteInput));
/* Expected:
[ [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1] ]
*/


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

    backtrack(0, [], targetRequirement);
    return results;
};

// TEST LOG:
console.log("\n--- Combination Sum Results ---");
console.log("Valid combos summing to 7 from [2,3,6,7]:", combinationSum(candidatesSet, targetRequirement));
// Expected: [ [2,2,3], [7] ]
