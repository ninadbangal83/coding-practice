
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
//     3
//    / \
//   9  20
//     /  \
//    15   7
const tree1 = new TreeNode(3);
tree1.left = new TreeNode(9);
tree1.right = new TreeNode(20, new TreeNode(15), new TreeNode(7));

const maxDepth = (root) => {
    if (!root) return 0;
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    return 1 + Math.max(leftDepth, rightDepth);
};

// TEST LOG:
console.log("\n--- Max Depth Results ---");
console.log("Max depth of sample tree:", maxDepth(tree1));
// Expected: 3


// ======================================================
// 2. Invert Binary Tree [Difficulty: Easy 🟢]
// Goal: Mutate every node's children to mirror images recursively.
// ======================================================

const invertTree = (root) => {
    if (!root) return null;
    
    // Atomic swap
    [root.left, root.right] = [root.right, root.left];
    
    invertTree(root.left);
    invertTree(root.right);
    
    return root;
};

// Pre-Inversion Check Utility
const getRootValString = (node) => node ? `${node.val} (L:${node.left?.val}, R:${node.right?.val})` : 'null';

// TEST LOG:
console.log("\n--- Invert Tree Results ---");
console.log("Before Inversion -> Root Node:", getRootValString(tree1));
invertTree(tree1);
console.log("After Inversion  -> Root Node:", getRootValString(tree1));
// Expected: Root's left and right should swap memory positions


// ======================================================
// 3. Level Order Traversal (BFS) [Difficulty: Medium 🟡]
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

// TEST LOG:
console.log("\n--- Level Order BFS Results ---");
console.log("Output list of lists:", levelOrder(treeBFS));
// Expected: [ [3], [9, 20], [15, 7] ]


// ======================================================
// 4. Validate Binary Search Tree (BST) [Difficulty: Medium 🟡]
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

// TEST LOGS:
console.log("\n--- Validate BST Results ---");
console.log("Tree [5,1,8] valid? ->", isValidBST(validBST));      // Expected: true
console.log("Tree [5,1,4,3,6] valid? ->", isValidBST(invalidBST)); // Expected: false


// ======================================================
// 5. Path Sum Verification [Difficulty: Easy-Medium 🟢🟡]
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

// TEST LOG:
console.log("\n--- Path Sum Results ---");
console.log("Tree contains path summing to 22? ->", hasPathSum(pathTree, 22));
// Expected: true
