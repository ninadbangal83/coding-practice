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
// 2. Invert Binary Tree [Difficulty: Easy 🟢]
// Goal: Mutate every node's children to mirror images recursively.
// ======================================================

const tree1 = new TreeNode(3);
tree1.left = new TreeNode(9);
tree1.right = new TreeNode(20, new TreeNode(15), new TreeNode(7));

const invertTree = (root) => {
    if (!root) return null;
    
    // Atomic swap
    [root.left, root.right] = [root.right, root.left];
    
    invertTree(root.left);
    invertTree(root.right);
    
    return root;
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

// Serializer: Return Level-Order array for comparison
const serializeTree = (root) => {
    if (!root) return [];
    const result = [];
    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            result.push(null);
        }
    }
    // Trim trailing nulls to match canonical definitions
    while (result[result.length - 1] === null) result.pop();
    return result;
};

const testCases = [
    { arr: [4, 2, 7, 1, 3, 6, 9], expected: [4, 7, 2, 9, 6, 3, 1], desc: "Standard full inverse verification" },
    { arr: [2, 1, 3], expected: [2, 3, 1], desc: "Simple triple node inverse" },
    { arr: [], expected: [], desc: "Edge: Empty tree structure" }
];

console.log("\n--- 🧪 Running Invert Tree Automated Tests ---");
testCases.forEach((tc, i) => {
    const root = buildTree(tc.arr);

    const start = performance.now();
    const invertedRoot = invertTree(root);
    const duration = (performance.now() - start).toFixed(4);

    const finalOutput = serializeTree(invertedRoot);
    const isPassed = JSON.stringify(finalOutput) === JSON.stringify(tc.expected);

    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${JSON.stringify(finalOutput)} | Expected: ${JSON.stringify(tc.expected)}`);
    }
});
