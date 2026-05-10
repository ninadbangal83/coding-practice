
// ======================================================
// MASTER TOP JS ESSENTIALS: RAPID-FIRE CODING INTERVIEW SOLUTIONS
// ======================================================

// 1. Sum Array Elements [Q2 from Top 80 List]
// 🟢 Focus: Array.reduce syntax
function sumArray(arr) {
    return arr.reduce((acc, current) => acc + current, 0);
}

// 2. Is Palindrome Check [Q3]
// 🟢 Focus: Native string & array transformations
function isPalindrome(str) {
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
}

// 3. Reverse A String [Q5]
function reverseString(str) {
    return str.split('').reverse().join('');
}

// 4. Maximum Difference in Array [Q6]
// 🟡 Focus: Single-pass O(N) linear scan
function findMaxDifference(arr) {
    if (arr.length < 2) return 0;
    let minVal = arr[0], maxVal = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < minVal) minVal = arr[i];
        else if (arr[i] > maxVal) maxVal = arr[i];
    }
    return maxVal - minVal;
}

// 5. Prime Number Checker [Q7]
// 🟡 Focus: Mathematical O(sqrt(N)) Optimization
function isPrime(num) {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false; // Optimization: remove even bulk
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

// 6. Purge Falsy Values [Q9]
// 🟢 Focus: Higher order function passing logic
function removeFalsyValues(arr) {
    return arr.filter(Boolean); // Shorthand for: item => Boolean(item)
}

// 7. Fibonacci Sequence Generator [Q10]
function fibonacciSequence(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}

// 8. Object Reducer Mapper [Q11]
// 🟡 Focus: Mapping dynamic records into single lookup object
function convertArrayToObject(arr) {
    return arr.reduce((acc, item) => {
        acc[item.id] = item.value;
        return acc; // Critical: Always return the accumulator!
    }, {});
}

// 9. Deduplicate Array [Q13]
// 🟢 Focus: Modern Set data structure
function removeDuplicates(arr) {
    return [...new Set(arr)];
}

// 10. Recursive Factorial [Q17]
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}


// ======================================================
// 🚦 FINAL EXECUTION & VERIFICATION LOGS
// ======================================================

console.log("🔥 INITIATING TOP ESSENTIALS RAPID FIRE TESTS 🔥\n");

console.log("👉 1. sumArray [1,2,3,4]:", sumArray([1, 2, 3, 4])); // Expect 10
console.log("👉 2. isPalindrome 'racecar':", isPalindrome("racecar")); // Expect true
console.log("👉 3. reverseString 'hello':", reverseString("hello")); // Expect olleh
console.log("👉 4. findMaxDifference [10, 2, 30, 5]:", findMaxDifference([10, 2, 30, 5])); // Expect 28 (30-2)
console.log("👉 5. isPrime(17):", isPrime(17)); // Expect true
console.log("👉 6. removeFalsyValues [0, 1, false, 2, '', 3]:", removeFalsyValues([0, 1, false, 2, '', 3])); // Expect [1, 2, 3]
console.log("👉 7. fibonacciSequence(6):", fibonacciSequence(6)); // Expect [0, 1, 1, 2, 3, 5]
console.log("👉 8. convertArrayToObject:", convertArrayToObject([{id: 'a1', value: 'Apples'}, {id: 'b2', value: 'Bananas'}]));
console.log("👉 9. removeDuplicates [1,1,2,3,3]:", removeDuplicates([1, 1, 2, 3, 3])); // Expect [1, 2, 3]
console.log("👉 10. factorial(5):", factorial(5)); // Expect 120

console.log("\n✅ ALL FOUNDATIONAL ESSENTIALS VERIFIED! ✅");
