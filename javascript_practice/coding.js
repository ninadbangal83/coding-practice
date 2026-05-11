// ======================================================
// MODULE 2: ARRAY TRANSFORMATIONS
// Scope: Massive manipulation, filtering, merging and finding.
// ======================================================

function findMaxDifference(arr) {
    // Write your code here
    let min = arr[0];
    let  max = arr[0];

    arr.forEach((e, i) => {
        if(e < min) {
            min = e
        } 
        if(e> max) {
            max = e
        }

    })
    
    return max-min;
}

function removeFalsyValues(arr) {
    // Write your code here
    return arr.filter(Boolean)
}

function removeDuplicates(arr) {
    // Write your code here
    return [...new Set(arr)];
}

function cloneArrayManual(arr) {
    // Write your code here
    const newArr = [];
    for (let i=0; i<arr.length; i++) {
        newArr.push(arr[i])
    }

    return newArr;
}

function findLargestInMixed(arr) {
    // Write your code here
    const numbers = arr.filter(e => typeof e === "number");
    return numbers.length > 0 ? Math.max(...numbers) : -infinity;
}

function mergeArrays(arr1, arr2) {
    // Write your code here
    return [...arr1, ...arr2]
}

function doubleElements(arr) {
    // Write your code here
    return arr.map(e => e*2)
}

function getFirstFive(arr) {
    // Write your code here
    return arr.slice(0, 5)
}

function mergeUnique(arr1, arr2) {
    // Write your code here
    return [...new Set([...arr1, ...arr2])]
}

function sortDescending(arr) {
    // Write your code here
    return [...arr].sort((a, b) => b - a)
}

function findIntersection(arr1, arr2) {
    // Write your code here
    const set2 = new Set(arr2);
    return arr1.filter(val => set2.has(val))
}

function findLargestNested(nested) {
    // Write your code here
    const flat = nested.flat(Infinity);
    return Math.max(...flat)

}

function nativeFlatten(arr) {
    // Write your code here
    return arr.flat(Infinity)
}

function mergeAlternating(arr1, arr2) {
    // Write your code here
    const res = [];
    const maxLen = Math.max(arr1.length, arr2.length);
    for(let i=0; i< maxLen; i++) {
        if(i<arr1.length) res.push(arr1[i])
        if(i<arr2.length) res.push(arr2[i])
    }

    return res;

}

function findSecondLargest(arr) {
    // Write your code here
    const max = Math.max(...arr)
    const arr2 = arr.filter(e => e !== max)
    return Math.max(...arr2)

}

// ======================================================
// 🧪 UNIFIED TEST DASHBOARD: ARRAY MODULE
// ======================================================
console.log("\n--- 🧪 Running Array Transformations Dashboard ---");
const run = (label, success) => console.log(`${success ? "✅" : "❌"} ${label}`);

try {
    run("findMaxDiff [10, 2, 30] = 28", findMaxDifference([10, 2, 30]) === 28);
    run("removeFalsy", JSON.stringify(removeFalsyValues([0, 1, false, 2])) === "[1,2]");
    run("removeDuplicates", JSON.stringify(removeDuplicates([1,1,2])) === "[1,2]");
    run("cloneManual", JSON.stringify(cloneArrayManual([1,2])) === "[1,2]");
    run("findLargestMixed", findLargestInMixed([10, "a", 50]) === 50);
    run("mergeArrays", JSON.stringify(mergeArrays([1],[2])) === "[1,2]");
    run("doubleElements", JSON.stringify(doubleElements([2,4])) === "[4,8]");
    run("getFirstFive", JSON.stringify(getFirstFive([1,2,3,4,5,6])) === "[1,2,3,4,5]");
    run("mergeUnique", JSON.stringify(mergeUnique([1,2], [2,3])) === "[1,2,3]");
    run("sortDescending", JSON.stringify(sortDescending([5,2,9])) === "[9,5,2]");
    run("findIntersection", JSON.stringify(findIntersection([1,2], [2,3])) === "[2]");
    run("findLargestNested", findLargestNested([[1,2],[8,3]]) === 8);
    run("nativeFlatten", JSON.stringify(nativeFlatten([1,[2,[3]]])) === "[1,2,3]");
    run("mergeAlternating", JSON.stringify(mergeAlternating(['A','B'], [1,2])) === '["A",1,"B",2]');
    run("findSecondLargest", findSecondLargest([10, 20, 20, 5]) === 10);
} catch (e) {
    console.error("Runtime error in tests:", e.message);
}
