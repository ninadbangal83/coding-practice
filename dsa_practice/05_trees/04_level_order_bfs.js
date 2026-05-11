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
// 4. Level Order Traversal (BFS) [Difficulty: Medium 🟡]
// Goal: Collect nodes list-by-list using queue data structure.
// ======================================================

// Refresh tree structure due to previous inversion mutation for standard traversal test
const treeBFS = new TreeNode(3);
treeBFS.left = new TreeNode(9);
treeBFS.right = new TreeNode(20, new TreeNode(15), new TreeNode(7));

const levelOrder = (root) => {
    if (!root) return [];
    
    const result = [];
    const queue = [root]; // FIFO initialization

    while (queue.length > 0) {
        const currentLevelCount = queue.length;
        const levelBatch = [];

        for (let i = 0; i < currentLevelCount; i++) {
            const node = queue.shift(); // Pull from front
            levelBatch.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(levelBatch);
    }
    return result;
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
    { arr: [3, 9, 20, null, null, 15, 7], expected: [[3], [9, 20], [15, 7]], desc: "Standard tree level separation" },
    { arr: [1], expected: [[1]], desc: "Edge: Single node tree traversal" },
    { arr: [], expected: [], desc: "Edge: Void tree empty batch list" },
    { arr: [1, 2, null, 3, null, 4], expected: [[1], [2], [3], [4]], desc: "Extreme linear skew multi-level verification" }
];

console.log("\n--- 🧪 Running Level Order Automated Tests ---");
testCases.forEach((tc, i) => {
    const root = buildTree(tc.arr);

    const start = performance.now();
    const result = levelOrder(root);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${JSON.stringify(result)} | Expected: ${JSON.stringify(tc.expected)}`);
    }
});
