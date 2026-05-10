
// ======================================================
// 1. Find Frequency [Difficulty: Easy 🟢]
// Goal: Return frequencies of elements in an array.
// ======================================================

const words = ["apple", "orange", "apple", "banana", "orange", "apple"];

const findFrequency = (arr) => {
    return arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {});
};

// TEST LOG:
console.log("\n--- Find Frequency Results ---");
console.log("Frequency:", findFrequency(words));
/* Expected Output:
{ apple: 3, orange: 2, banana: 1 }
*/


// ======================================================
// 2. Find Missing Number [Difficulty: Easy 🟢]
// Goal: Find the missing number in an array containing digits 0 to n.
// ======================================================

const numsSequence = [3, 0, 1, 4, 6, 2]; // missing 5, range 0-6

const findMissingNumber = (arr) => {
    const n = arr.length;
    // Arithmetic sum formula: sum = (n * (n + 1)) / 2
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = arr.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
};

// TEST LOG:
console.log("\n--- Missing Number Results ---");
console.log("Missing:", findMissingNumber(numsSequence));
// Expected: 5


// ======================================================
// 3. Chunk Array [Difficulty: Easy 🟢]
// Goal: Split an array into sub-arrays of a given size.
// ======================================================

const chunkArray = (arr, size) => {
    const chunked = [];
    for (let i = 0; i < arr.length; i += size) {
        chunked.push(arr.slice(i, i + size));
    }
    return chunked;
};

// TEST LOGS:
console.log("\n--- Chunk Array Results ---");
const numbersToChunk = [1, 2, 3, 4, 5, 6, 7, 8];
console.log("Chunk Size 3:", chunkArray(numbersToChunk, 3));
// Expected: [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8 ] ]


// ======================================================
// 4. Merge Sorted Arrays [Difficulty: Easy 🟢]
// Goal: Combine two already sorted arrays into one.
// ======================================================

const arr1 = [1, 3, 5, 7];
const arr2 = [2, 4, 6, 8, 10];

const mergeSortedArrays = (a, b) => {
    let merged = [];
    let i = 0, j = 0;
    
    while (i < a.length && j < b.length) {
        if (a[i] < b[j]) {
            merged.push(a[i++]);
        } else {
            merged.push(b[j++]);
        }
    }
    
    return [...merged, ...a.slice(i), ...b.slice(j)];
};

// TEST LOG:
console.log("\n--- Merge Arrays Results ---");
console.log("Merged:", mergeSortedArrays(arr1, arr2));
/* Expected Output:
[ 1, 2, 3, 4, 5, 6, 7, 8, 10 ]
*/


// ======================================================
// 5. Remove Duplicates [Difficulty: Medium 🟡]
// Goal: Remove duplicates from primitives and deep objects.
// ======================================================

const numbers = [1, 2, 2, 8, 4]
const strings = ["apple", "banana", "apple", "orange"];
const mixed = [1, "1", 2, 2, "apple", true, true];
const objects = [
    { id: 1, name: "John" }, 
    { id: 1, name: "John" },
    { id: 2, name: "Jane" }
];

const removeDuplicates = (arr) => [...new Set(arr)]

// TEST LOGS:
console.log("\n--- Remove Duplicates Results ---");
console.log("Numbers:", removeDuplicates(numbers)); 
console.log("Strings:", removeDuplicates(strings)); 
console.log("Mixed:", removeDuplicates(mixed)); 

const removeDeepDuplicates = (arr) => {
    const seen = new Set();
    return arr.filter(item => {
        const stringifyItem = JSON.stringify(item);
        return seen.has(stringifyItem) ? false : seen.add(stringifyItem)
    });
};

console.log("\n--- Deep Duplicates Results ---");
console.log("Objects:", removeDeepDuplicates(objects)); 


// ======================================================
// 6. Group Items [Difficulty: Medium 🟡]
// Goal: Implement groupBy function to group objects by a key.
// ======================================================

const inventory = [
    { name: "asparagus", type: "vegetables" },
    { name: "bananas", type: "fruit" },
    { name: "goat", type: "meat" },
    { name: "cherries", type: "fruit" },
];

const groupBy = (arr, key) => {
    return arr.reduce((acc, item) => {
        const groupValue = item[key];
        if (!acc[groupValue]) {
            acc[groupValue] = [];
        }
        acc[groupValue].push(item);
        return acc;
    }, {});
};

// TEST LOG:
console.log("\n--- Group By Results ---");
console.log(groupBy(inventory, 'type')); 


// ======================================================
// 7. Two Sum [Difficulty: Medium 🟡]
// Goal: Find 2 indices in an array that sum to a specific target optimally.
// ======================================================

const numbersForSum = [2, 7, 11, 15];
const sumTarget = 9;

const twoSum = (nums, target) => {
    const map = new Map(); // value -> index
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
};

// TEST LOG:
console.log("\n--- Two Sum Results ---");
console.log("Indices for target 9:", twoSum(numbersForSum, sumTarget));


// ======================================================
// 8. Sort Objects [Difficulty: Medium-Hard 🟠]
// Goal: Sort array of objects by a nested property path.
// ======================================================

const users = [
    { name: "Alice", info: { age: 25 } },
    { name: "Charlie", info: { age: 20 } },
    { name: "Bob", info: { age: 30 } }
];

const sortByKey = (arr, keyPath, ascending = true) => {
    const getProp = (obj, path) => path.split('.').reduce((o, key) => o?.[key], obj);
    
    return [...arr].sort((a, b) => {
        const valA = getProp(a, keyPath);
        const valB = getProp(b, keyPath);
        
        if (valA < valB) return ascending ? -1 : 1;
        if (valA > valB) return ascending ? 1 : -1;
        return 0;
    });
};

// TEST LOG:
console.log("\n--- Sort Objects Results ---");
console.log("Sorted by info.age:", sortByKey(users, 'info.age'));


// ======================================================
// 9. Flatten Arrays [Difficulty: Hard 🔴]
// Goal: Flatten a nested array manually using recursion.
// ======================================================

const nestedArray = [1, [2, [3, [4]]], 5];

const flatten = (arr, depth = 1) => {
    if (depth === 0) return arr;
    return arr.reduce((acc, val) => {
        if (Array.isArray(val) && depth > 0) {
            acc.push(...flatten(val, depth - 1));
        } else {
            acc.push(val);
        }
        return acc;
    }, []);
};

// TEST LOGS:
console.log("\n--- Flatten Array Results ---");
console.log("Flatten (depth 1):", flatten(nestedArray, 1));
console.log("Flatten (depth 2):", flatten(nestedArray, 2));


// ======================================================
// 10. Deep Clone [Difficulty: Hard 🔴]
// Goal: Create a perfect clone of an object recursively handling nested values.
// ======================================================

const complexObj = {
    num: 1,
    date: new Date("2026-01-01"),
    arr: [1, 2, { inner: 'text' }],
    nested: { val: 'oldValue' }
};

const deepClone = (obj, map = new WeakMap()) => {
    if (obj === null || typeof obj !== 'object') return obj;
    
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
    
    if (map.has(obj)) return map.get(obj);
    
    const clone = Array.isArray(obj) ? [] : {};
    map.set(obj, clone);
    
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = deepClone(obj[key], map);
        }
    }
    return clone;
};

// TEST LOG:
console.log("\n--- Deep Clone Results ---");
const cloned = deepClone(complexObj);
cloned.nested.val = 'newValue'; // Change clone only
console.log("Original nested.val (should stay 'oldValue'):", complexObj.nested.val);
console.log("Cloned is a true Date object?", cloned.date instanceof Date);