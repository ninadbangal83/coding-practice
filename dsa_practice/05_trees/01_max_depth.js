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
// 1. Maximum Depth of Binary Tree [Difficulty: Easy 🟢]
// Goal: Traverse leaf-nodes finding deepest recursion depth.
// ======================================================

// Test Tree Creation:
const tree1 = new TreeNode(3);
tree1.left = new TreeNode(9);
tree1.right = new TreeNode(20, new TreeNode(15), new TreeNode(7));

const maxDepth = (root) => {
    if (!root) return 0;
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    return 1 + Math.max(leftDepth, rightDepth);
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

// Helper: Reconstruct Level-Order Binary Tree from array definition
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
    { arr: [3, 9, 20, null, null, 15, 7], expected: 3, desc: "Standard balanced depth validation" },
    { arr: [1, null, 2], expected: 2, desc: "Unbalanced right-skew skew constraint" },
    { arr: [], expected: 0, desc: "Edge: Empty tree null head detection" },
    { arr: [0], expected: 1, desc: "Edge: Solitary root single depth" },
    { arr: Array.from({length: 20}, (_, i) => i), expected: 5, desc: "Scale: Full breadth pyramid load test" }
];

console.log("\n--- 🧪 Running Max Depth Automated Tests ---");
testCases.forEach((tc, i) => {
    const rootNode = buildTree(tc.arr);

    const start = performance.now();
    const result = maxDepth(rootNode);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
