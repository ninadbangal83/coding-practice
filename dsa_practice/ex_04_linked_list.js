
// ======================================================
// 🧬 LINKED LIST ARCHITECTURE HELPER
// ======================================================

class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

// Helper: array → linked list
const arrayToList = (arr) => {
    const dummy = new ListNode(0);
    let curr = dummy;
    for (const val of arr) {
        curr.next = new ListNode(val);
        curr = curr.next;
    }
    return dummy.next;
};

// Helper: linked list → array (for verification)
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
// 1. Reverse Linked List [Difficulty: Medium 🟡]
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

// TEST LOG:
console.log("\n--- Reverse Linked List Results ---");
console.log("Input: 1→2→3→4→5 -> Output Array:", listToArray(reverseList(listToReverse)));
// Expected: [5, 4, 3, 2, 1]


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

// TEST LOG:
console.log("\n--- Middle Node Results ---");
console.log("Middle node of [1,2,3,4,5] -> Node Value:", middleNode(listForMid).val);
// Expected: 3


// ======================================================
// 3. Detect Cycle [Difficulty: Medium 🟡]
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

// TEST LOG:
console.log("\n--- Detect Cycle Results ---");
console.log("Cycle injected list -> hasCycle?:", hasCycle(cycleList));
// Expected: true


// ======================================================
// 4. Merge Two Sorted Lists [Difficulty: Easy 🟢]
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

// TEST LOG:
console.log("\n--- Merge Sorted Lists Results ---");
console.log("Merged [1,2,4] & [1,3,4] ->", listToArray(mergeTwoLists(l1, l2)));
// Expected: [1, 1, 2, 3, 4, 4]


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

// TEST LOG:
console.log("\n--- Remove Nth From End Results ---");
console.log("Removed 2nd from end of [1,2,3,4,5] ->", listToArray(removeNthFromEnd(listForRemoval, targetFromEnd)));
// Expected: [1, 2, 3, 5] (Node 4 is successfully wiped)
