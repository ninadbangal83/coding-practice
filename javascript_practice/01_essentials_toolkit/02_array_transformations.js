// ======================================================
// MODULE 2: ARRAY TRANSFORMATIONS
// Scope: Massive manipulation, filtering, merging and finding.
// ======================================================

function findMaxDifference(arr) {
    if (arr.length < 2) return 0;
    let minVal = arr[0], maxVal = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < minVal) minVal = arr[i];
        else if (arr[i] > maxVal) maxVal = arr[i];
    }
    return maxVal - minVal;
}

const removeFalsyValues = (arr) => arr.filter(Boolean);

const removeDuplicates = (arr) => [...new Set(arr)];

function cloneArrayManual(arr) {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) newArr.push(arr[i]);
    return newArr;
}

function findLargestInMixed(arr) {
    const numbers = arr.filter(item => typeof item === 'number' && !Number.isNaN(item));
    return numbers.length > 0 ? Math.max(...numbers) : -Infinity;
}

const mergeArrays = (arr1, arr2) => [...arr1, ...arr2];

const doubleElements = (arr) => arr.map(x => x * 2);

const getFirstFive = (arr) => arr.slice(0, 5);

const mergeUnique = (arr1, arr2) => [...new Set([...arr1, ...arr2])];

const sortDescending = (arr) => [...arr].sort((a, b) => b - a);

function findIntersection(arr1, arr2) {
    const set2 = new Set(arr2);
    return [...new Set(arr1)].filter(val => set2.has(val));
}

function findLargestNested(nested) {
    const flat = nested.flat(Infinity);
    return flat.reduce((max, val) => val > max ? val : max, -Infinity);
}

const nativeFlatten = (arr) => arr.flat(Infinity);

function mergeAlternating(arr1, arr2) {
    const res = [];
    const maxLen = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < maxLen; i++) {
        if (i < arr1.length) res.push(arr1[i]);
        if (i < arr2.length) res.push(arr2[i]);
    }
    return res;
}

// APPROACH 1: Sorting Method - O(N log N) Time | Readable but slower
function findSecondLargestSorting(arr) {
    const unique = [...new Set(arr)].sort((a, b) => b - a);
    return unique.length > 1 ? unique[1] : null;
}

// APPROACH 2: Filter Method - O(N) Time | Clever but creates extra array in memory
function findSecondLargestFilter(arr) {
    const max = Math.max(...arr);
    const filtered = arr.filter(val => val !== max);
    return filtered.length > 0 ? Math.max(...filtered) : null;
}

// APPROACH 3 (WINNER): Single Pass - O(N) Time, O(1) Space | Fastest and most memory-efficient
function findSecondLargest(arr) {
    let first = -Infinity;
    let second = -Infinity;

    for (let num of arr) {
        if (num > first) {
            second = first;
            first = num;
        } else if (num > second && num !== first) {
            second = num;
        }
    }
    return second === -Infinity ? null : second;
}

// ======================================================
// 🧪 UNIFIED TEST DASHBOARD: ARRAY MODULE
// ======================================================
console.log("\n--- 🧪 Running Array Transformations Dashboard ---");
const run = (label, success) => console.log(`${success ? "✅" : "❌"} ${label}`);

run("findMaxDiff [10, 2, 30] = 28", findMaxDifference([10, 2, 30]) === 28);
run("removeFalsy", JSON.stringify(removeFalsyValues([0, 1, false, 2])) === "[1,2]");
run("removeDuplicates", JSON.stringify(removeDuplicates([1,1,2])) === "[1,2]");
run("cloneManual", JSON.stringify(cloneArrayManual([1,2])) === "[1,2]");
run("findLargestMixed (NaN safe)", findLargestInMixed([10, NaN, 50]) === 50);
run("mergeArrays", JSON.stringify(mergeArrays([1],[2])) === "[1,2]");
run("doubleElements", JSON.stringify(doubleElements([2,4])) === "[4,8]");
run("getFirstFive", JSON.stringify(getFirstFive([1,2,3,4,5,6])) === "[1,2,3,4,5]");
run("mergeUnique", JSON.stringify(mergeUnique([1,2], [2,3])) === "[1,2,3]");
run("sortDescending", JSON.stringify(sortDescending([5,2,9])) === "[9,5,2]");
run("findIntersection (Unique)", JSON.stringify(findIntersection([1,1,2], [2,3])) === "[2]");
run("findLargestNested (Memory Safe)", findLargestNested([[1,2],[8,3]]) === 8);
run("nativeFlatten", JSON.stringify(nativeFlatten([1,[2,[3]]])) === "[1,2,3]");
run("mergeAlternating", JSON.stringify(mergeAlternating(['A','B'], [1,2])) === '["A",1,"B",2]');
run("findSecondLargest", findSecondLargest([10, 20, 20, 5]) === 10);
