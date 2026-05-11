// ======================================================
// 🧬 LINKED LIST ARCHITECTURE HELPER
// ======================================================

class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ======================================================
// 4. Detect Cycle [Difficulty: Medium 🟡]
// Goal: Floyd’s algorithm to detect recursive loop cycles.
// ======================================================

const cycleList = new ListNode(3);
const node2 = new ListNode(2);
cycleList.next = node2;
cycleList.next.next = new ListNode(0);
cycleList.next.next.next = new ListNode(-4);
cycleList.next.next.next.next = node2; // Creates loop back to second node!

const hasCycle = (head) => {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true; // Fast laps slow in loop cycle
    }
    return false;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

// Custom Setup Function to construct precise topology maps
const constructDynamicCycle = (arr, cycleIndex) => {
    if (!arr || arr.length === 0) return null;
    const nodes = arr.map(val => new ListNode(val));
    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].next = nodes[i+1];
    }
    // Tie tail into the circle if cycleIndex is valid >= 0
    if (cycleIndex >= 0 && cycleIndex < nodes.length) {
        nodes[nodes.length - 1].next = nodes[cycleIndex];
    }
    return nodes[0];
};

const testCases = [
    { arr: [3, 2, 0, -4], cyclePos: 1, expected: true, desc: "Standard cycle back to node index 1" },
    { arr: [1, 2], cyclePos: 0, expected: true, desc: "Tail loops back directly to head" },
    { arr: [1], cyclePos: -1, expected: false, desc: "Edge: Single node without cycle" },
    { arr: [1, 2, 3, 4], cyclePos: -1, expected: false, desc: "Standard linear list (zero cycles)" },
    { arr: [], cyclePos: -1, expected: false, desc: "Edge: Fully empty dataset" }
];

console.log("\n--- 🧪 Running Detect Cycle Automated Tests ---");
testCases.forEach((tc, i) => {
    const headNode = constructDynamicCycle(tc.arr, tc.cyclePos);

    const start = performance.now();
    const result = hasCycle(headNode);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
