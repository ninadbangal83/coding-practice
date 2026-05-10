
// ======================================================
// ═══ PART 1: STACK LOGIC ═══
// ======================================================

// ======================================================
// 1. Valid Parentheses [Difficulty: Easy-Medium 🟢🟡]
// Goal: Validate perfectly balanced pair matchings using LIFO stack.
// ======================================================

const bracketStr1 = "()[]{}";
const bracketStr2 = "(]";

const isValid = (s) => {
    const stack = [];
    const pairMap = { ')': '(', ']': '[', '}': '{' };

    for (const char of s) {
        if ('([{'.includes(char)) {
            stack.push(char); // Track active openers
        } else {
            // Immediate failure if opener doesn't match expected stack top
            if (stack.pop() !== pairMap[char]) return false;
        }
    }
    return stack.length === 0; // Must be empty
};

// TEST LOGS:
console.log("\n--- Valid Parentheses Results ---");
console.log("Input '()[]{}' ->", isValid(bracketStr1)); // Expected: true
console.log("Input '(]' ->", isValid(bracketStr2));     // Expected: false


// ======================================================
// 2. Daily Temperatures [Difficulty: Medium 🟡]
// Goal: Monotonic stack resolves wait-times for next greater item.
// ======================================================

const temperatures = [73, 74, 75, 71, 69, 72, 76, 73];

const dailyTemperatures = (temps) => {
    const result = new Array(temps.length).fill(0);
    const stack = []; // Tracks indices of "pending/unresolved" cooler days

    for (let i = 0; i < temps.length; i++) {
        // While current temp is WARMER than stack-top items, RESOLVE them!
        while (stack.length > 0 && temps[i] > temps[stack[stack.length - 1]]) {
            const prevIdx = stack.pop();
            result[prevIdx] = i - prevIdx; // Compute duration gap
        }
        stack.push(i); // Store current day for future resolution
    }
    return result;
};

// TEST LOG:
console.log("\n--- Daily Temperatures Results ---");
console.log("Days to wait for warmer weather ->", dailyTemperatures(temperatures));
// Expected: [1, 1, 4, 2, 1, 1, 0, 0]


// ======================================================
// 3. Min Stack Class [Difficulty: Medium 🟡]
// Goal: Constant time O(1) minimum access by storing snapshots.
// ======================================================

class MinStack {
    constructor() {
        this.stack = []; // Format: [ [val, minAtThisSnapshot], ...]
    }
    push(val) {
        const currentMin = this.stack.length === 0 
            ? val 
            : Math.min(val, this.stack[this.stack.length - 1][1]);
        this.stack.push([val, currentMin]);
    }
    pop() {
        return this.stack.pop()?.[0];
    }
    top() {
        return this.stack[this.stack.length - 1][0];
    }
    getMin() {
        return this.stack[this.stack.length - 1][1];
    }
}

// TEST LOG:
console.log("\n--- Min Stack Results ---");
const s = new MinStack();
s.push(5); s.push(3); s.push(7); s.push(2);
console.log("Stack pushing [5,3,7,2]. Current Min (2):", s.getMin());
s.pop();
console.log("After pop (removes 2). Current Min (3):", s.getMin());


// ======================================================
// ═══ PART 2: BINARY SEARCH LOGIC ═══
// ======================================================

// ======================================================
// 4. Standard Binary Search [Difficulty: Easy 🟢]
// Goal: Locate index of target in O(log N) time.
// ======================================================

const searchArray = [-1, 0, 3, 5, 9, 12];
const targetVal = 9;

const binarySearch = (nums, target) => {
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
};

// TEST LOG:
console.log("\n--- Binary Search Results ---");
console.log("Target 9 index location ->", binarySearch(searchArray, targetVal));
// Expected: 4


// ======================================================
// 5. Search In Rotated Sorted Array [Difficulty: Medium-Hard 🟠]
// Goal: Pivot logic algorithm analyzing which half maintains ordered sorting.
// ======================================================

const rotatedNums = [4, 5, 6, 7, 0, 1, 2];
const findVal = 0;

const searchRotated = (nums, target) => {
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;

        // Branch: Left-half sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1; // Exists within sorted side bound
            } else {
                left = mid + 1;  // Must range on right side
            }
        } 
        // Branch: Right-half sorted
        else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1; // Exists in sorted right side
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
};

// TEST LOG:
console.log("\n--- Rotated Array Search Results ---");
console.log("Rotated array [4,5,6,7,0,1,2] -> Index of 0:", searchRotated(rotatedNums, findVal));
// Expected: 4
