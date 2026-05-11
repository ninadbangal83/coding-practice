// ======================================================
// 🌳 TREE ARCHITECTURE HELPER
// ======================================================

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// ======================================================
// 3. Path Sum Verification [Difficulty: Easy-Medium 🟢🟡]
// Goal: Check if root-to-leaf total sums to matching target value.
// ======================================================

const pathTree = new TreeNode(5);
pathTree.left = new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2)));
pathTree.right = new TreeNode(8); // Target 22 lies at 5->4->11->2

const hasPathSum = (root, targetSum) => {
    if (!root) return false;

    // Check terminal leaf trigger
    if (!root.left && !root.right) {
        return root.val === targetSum;
    }

    // Recurse and substract consumed path cost from target
    const remainingRequirement = targetSum - root.val;
    return hasPathSum(root.left, remainingRequirement) || 
           hasPathSum(root.right, remainingRequirement);
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const buildTree = (arr) => {
    if (!arr || !arr.length || arr[0] === null) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    while (queue.length > 0 && i < arr.length) {
        const node = queue.shift();
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
};

const testCases = [
    { arr: [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], target: 22, expected: true, desc: "Valid terminal leaf summation" },
    { arr: [1, 2, 3], target: 5, expected: false, desc: "Target sum mathematically reachable nowhere" },
    { arr: [1, 2], target: 1, expected: false, desc: "Edge: Premature non-leaf level match (must hit terminal node)" },
    { arr: [], target: 0, expected: false, desc: "Edge: Null tree boundary always false" },
    { arr: [-2, null, -3], target: -5, expected: true, desc: "Negative integer total pathway integrity" }
];

console.log("\n--- 🧪 Running Has Path Sum Automated Tests ---");
testCases.forEach((tc, i) => {
    const rootNode = buildTree(tc.arr);

    const start = performance.now();
    const result = hasPathSum(rootNode, tc.target);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input: target=${tc.target}`);
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
