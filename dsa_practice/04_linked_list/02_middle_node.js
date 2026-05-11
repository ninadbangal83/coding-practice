// ======================================================
// 🧬 LINKED LIST ARCHITECTURE HELPER
// ======================================================

class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

const arrayToList = (arr) => {
    const dummy = new ListNode(0);
    let curr = dummy;
    for (const val of arr) {
        curr.next = new ListNode(val);
        curr = curr.next;
    }
    return dummy.next;
};

// ======================================================
// 2. Middle of Linked List [Difficulty: Easy-Medium 🟢🟡]
// Goal: Using Fast/Slow pointers (runner pattern) to locate middle.
// ======================================================

const listForMid = arrayToList([1, 2, 3, 4, 5]);

const middleNode = (head) => {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next; // Travels at double speed
    }
    return slow; // Slow sits perfectly on midpoint upon fast termination
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { arr: [1, 2, 3, 4, 5], expectedVal: 3, desc: "Standard odd-length collection" },
    { arr: [1, 2, 3, 4, 5, 6], expectedVal: 4, desc: "Standard even-length collection (upper mid)" },
    { arr: [1], expectedVal: 1, desc: "Edge: Single node identity" },
    { arr: [1, 2], expectedVal: 2, desc: "Edge: Double node minimal pair" }
];

console.log("\n--- 🧪 Running Middle Node Automated Tests ---");
testCases.forEach((tc, i) => {
    const head = arrayToList(tc.arr);

    const start = performance.now();
    const midNode = middleNode(head);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = midNode && midNode.val === tc.expectedVal;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output Node Val: ${midNode ? midNode.val : 'null'} | Expected: ${tc.expectedVal}`);
    }
});
