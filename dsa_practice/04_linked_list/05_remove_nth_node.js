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

const listToArray = (head) => {
    const result = [];
    let curr = head;
    while (curr) {
        result.push(curr.val);
        curr = curr.next;
    }
    return result;
};

// ======================================================
// 5. Remove N-th Node From End [Difficulty: Medium 🟡]
// Goal: One-pass deletion by creating a fixed-gap leader pointer.
// ======================================================

const listForRemoval = arrayToList([1, 2, 3, 4, 5]);
const targetFromEnd = 2;

const removeNthFromEnd = (head, n) => {
    const dummy = new ListNode(0, head);
    let fast = dummy;
    let slow = dummy;

    // Shift fast pointer forward to create 'N+1' node buffer gap
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }

    // Slide gap until fast reaches end of list
    while (fast) {
        fast = fast.next;
        slow = slow.next;
    }

    // Slow sits directly BEFORE the execution target
    slow.next = slow.next.next;
    return dummy.next;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { arr: [1, 2, 3, 4, 5], n: 2, expected: [1, 2, 3, 5], desc: "Standard middle removal" },
    { arr: [1], n: 1, expected: [], desc: "Edge: Remove only single element" },
    { arr: [1, 2], n: 1, expected: [1], desc: "Edge: Remove exact tail node" },
    { arr: [1, 2], n: 2, expected: [2], desc: "Edge: Remove exact head node" },
    { arr: Array.from({ length: 1000 }, (_, i) => i), n: 500, expected: Array.from({ length: 1000 }, (_, i) => i).filter(v => v !== 500), desc: "Scale: Large list mid-stream removal" }
];

console.log("\n--- 🧪 Running Remove Nth Node Automated Tests ---");
testCases.forEach((tc, i) => {
    const head = arrayToList(tc.arr);

    const start = performance.now();
    const modifiedHead = removeNthFromEnd(head, tc.n);
    const duration = (performance.now() - start).toFixed(4);

    const resultArr = listToArray(modifiedHead);
    const isPassed = JSON.stringify(resultArr) === JSON.stringify(tc.expected);

    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input N: ${tc.n}`);
        console.log(`   Output: ${JSON.stringify(resultArr)} | Expected: ${JSON.stringify(tc.expected)}`);
    }
});
