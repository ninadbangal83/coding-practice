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
// 5. Validate Binary Search Tree (BST) [Difficulty: Medium 🟡]
// Goal: Test nested subtree boundaries ensuring root integrity.
// ======================================================

const validBST = new TreeNode(5, new TreeNode(1), new TreeNode(8));
const invalidBST = new TreeNode(5, new TreeNode(1), new TreeNode(4, new TreeNode(3), new TreeNode(6)));

const isValidBST = (root, min = -Infinity, max = Infinity) => {
    if (!root) return true; // Base safe state

    // Enforce boundary limit
    if (root.val <= min || root.val >= max) return false;

    // Recursively lower boundaries left and elevate boundaries right
    return (
        isValidBST(root.left, min, root.val) &&
        isValidBST(root.right, root.val, max)
    );
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
    { arr: [2, 1, 3], expected: true, desc: "Basic valid triad" },
    { arr: [5, 1, 4, null, null, 3, 6], expected: false, desc: "Subtree deep range violation (right child too low)" },
    { arr: [2, 2, 2], expected: false, desc: "Duplicate equal nodes failure (BST must strictly vary)" },
    { arr: [], expected: true, desc: "Edge: Null tree satisfies condition" },
    { arr: [2147483647], expected: true, desc: "Maximum integer boundary safe match" }
];

console.log("\n--- 🧪 Running Validate BST Automated Tests ---");
testCases.forEach((tc, i) => {
    const root = buildTree(tc.arr);

    const start = performance.now();
    const result = isValidBST(root);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
