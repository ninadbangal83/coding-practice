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
// 1. Merge Two Sorted Lists [Difficulty: Easy 🟢]
// Goal: Combine two pre-sorted linked structures seamlessly.
// ======================================================

const l1 = arrayToList([1, 2, 4]);
const l2 = arrayToList([1, 3, 4]);

const mergeTwoLists = (list1, list2) => {
    const dummy = new ListNode(0); // Sentinel node to smooth start cases
    let curr = dummy;

    while (list1 && list2) {
        if (list1.val <= list2.val) {
            curr.next = list1;
            list1 = list1.next;
        } else {
            curr.next = list2;
            list2 = list2.next;
        }
        curr = curr.next;
    }
    curr.next = list1 || list2; // Append remaining tail
    return dummy.next;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { l1: [1, 2, 4], l2: [1, 3, 4], expected: [1, 1, 2, 3, 4, 4], desc: "Standard matched parallel growth" },
    { l1: [], l2: [], expected: [], desc: "Edge: Double void list convergence" },
    { l1: [], l2: [0], expected: [0], desc: "Edge: Single populated list appended" },
    { l1: [5], l2: [1, 2, 3], expected: [1, 2, 3, 5], desc: "High single value merged at end of longer series" }
];

console.log("\n--- 🧪 Running Merge Sorted Lists Automated Tests ---");
testCases.forEach((tc, i) => {
    const head1 = arrayToList(tc.l1);
    const head2 = arrayToList(tc.l2);

    const start = performance.now();
    const mergedHead = mergeTwoLists(head1, head2);
    const duration = (performance.now() - start).toFixed(4);

    const resultArr = listToArray(mergedHead);
    const isPassed = JSON.stringify(resultArr) === JSON.stringify(tc.expected);

    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${JSON.stringify(resultArr)} | Expected: ${JSON.stringify(tc.expected)}`);
    }
});
