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
// 3. Reverse Linked List [Difficulty: Medium 🟡]
// Goal: Reverse pointers in-place and return new head.
// ======================================================

const listToReverse = arrayToList([1, 2, 3, 4, 5]);

const reverseList = (head) => {
    let prev = null;
    let curr = head;

    while (curr) {
        const nextNode = curr.next; // Cache next ref
        curr.next = prev;           // Perform reverse
        prev = curr;                // Move window forward
        curr = nextNode;
    }
    return prev;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1], desc: "Standard full sequence reversal" },
    { input: [10], expected: [10], desc: "Edge: Single node preservation" },
    { input: [], expected: [], desc: "Edge: Empty list (null head) constraint" },
    { input: Array.from({ length: 1000 }, (_, i) => i), expected: Array.from({ length: 1000 }, (_, i) => i).reverse(), desc: "Scale: 1,000 node chained list processing" }
];

console.log("\n--- 🧪 Running Reverse Linked List Automated Tests ---");
testCases.forEach((tc, i) => {
    // Prepare input node architecture
    const nodeHead = arrayToList(tc.input);

    const start = performance.now();
    const resultHead = reverseList(nodeHead);
    const duration = (performance.now() - start).toFixed(4);

    // Serialize result back to numeric array for logic assertion
    const finalOutput = listToArray(resultHead);
    const isPassed = JSON.stringify(finalOutput) === JSON.stringify(tc.expected);

    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input Length: ${tc.input.length}`);
        console.log(`   Output: ${JSON.stringify(finalOutput)} | Expected: ${JSON.stringify(tc.expected)}`);
    }
});
