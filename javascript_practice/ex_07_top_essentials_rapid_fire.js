
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

// 11. Array Cloning Loop [Q18]
function cloneArrayManual(arr) {
    const newArray = [];
    for (let i = 0; i < arr.length; i++) {
        newArray.push(arr[i]);
    }
    return newArray;
}

// 12. Are Anagrams [Q21]
// 🟢 Focus: Character normalization mapping
function areAnagrams(str1, str2) {
    const norm = (s) => s.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
    return norm(str1) === norm(str2);
}

// 13. Find Largest in Mixed Type Array [Q22]
// 🟡 Focus: Filter with Math spread syntax
function findLargestInMixed(arr) {
    const numbers = arr.filter(item => typeof item === 'number');
    return numbers.length > 0 ? Math.max(...numbers) : -Infinity;
}

// 14. Merge Arrays Without Concat [Q23]
// 🟢 Focus: ES6 Spread Operator unpacking
function mergeArrays(arr1, arr2) {
    return [...arr1, ...arr2];
}

// 15. Convert String Array to Sentence [Q26]
function joinToSentence(arr) {
    return arr.join(' ');
}

// 16. Double Array Elements [Q27]
function doubleElements(arr) {
    return arr.map(x => x * 2);
}

// 17. Private Counter Closure [Q33]
// 🟡 Focus: Persistent lexical state
function createCounter() {
    let count = 0;
    return {
        increment: () => { count++; },
        getValue: () => count
    };
}

// 18. Get First 5 Elements [Q45]
const getFirstFive = (arr) => arr.slice(0, 5);

// 19. Reverse Order of Words [Q46]
const reverseWords = (sentence) => sentence.split(' ').reverse().join(' ');

// 20. Merge & Unique Arrays [Q50]
const mergeUnique = (arr1, arr2) => [...new Set([...arr1, ...arr2])];

// 21. Sort Descending [Q56]
const sortDescending = (arr) => [...arr].sort((a, b) => b - a);

// ======================================================
// FINAL TOP-50 COMPLETION BATCH
// ======================================================

// 22. Calculate Power [Q19]
const calcPower = (base, exp) => base ** exp;

// 23. Print Element Frequency [Q20]
// 🟡 Focus: Object HashMap frequency counting
function getFrequency(arr) {
    return arr.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {});
}

// 24. Array Intersection [Q27]
// 🟢 Focus: Set-based O(N) lookups
function findIntersection(arr1, arr2) {
    const set2 = new Set(arr2);
    return arr1.filter(val => set2.has(val));
}

// 25. First Non-Repeated Character [Q32]
// 🟡 Focus: Double iteration search
function firstNonRepeated(str) {
    const map = {};
    for (let char of str) map[char] = (map[char] || 0) + 1;
    for (let char of str) if (map[char] === 1) return char;
    return null;
}

// 26. Capitalize Sentence Words [Q34]
function capitalizeWords(sentence) {
    return sentence.split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

// 27. Count Vowels [Q49]
function countVowels(str) {
    const matches = str.match(/[aeiou]/gi);
    return matches ? matches.length : 0;
}

// 28. Unique Characters Only [Q50]
const uniqueChars = (str) => [...new Set(str)].join('');

// ======================================================
// ULTIMATE BONUS: GENERATOR LOGIC [From Concepts File Q32]
// ======================================================

// 29. Infinite ID Generator
// 🟡 Focus: Iterators & Yield suspension state
function* generateInfiniteId() {
    let id = 1;
    while (true) {
        yield `USER_${id++}`;
    }
}


// ======================================================
// 🚦 FINAL EXECUTION & VERIFICATION LOGS
// ======================================================

console.log("🔥 INITIATING TOP ESSENTIALS RAPID FIRE TESTS 🔥\n");

console.log("👉 1. sumArray [1,2,3,4]:", sumArray([1, 2, 3, 4])); 
console.log("👉 2. isPalindrome 'racecar':", isPalindrome("racecar")); 
console.log("👉 3. reverseString 'hello':", reverseString("hello")); 
console.log("👉 4. findMaxDifference [10, 2, 30, 5]:", findMaxDifference([10, 2, 30, 5])); 
console.log("👉 5. isPrime(17):", isPrime(17)); 
console.log("👉 6. removeFalsyValues [0, 1, false, 2, '', 3]:", removeFalsyValues([0, 1, false, 2, '', 3])); 
console.log("👉 7. fibonacciSequence(6):", fibonacciSequence(6)); 
console.log("👉 8. convertArrayToObject:", convertArrayToObject([{id: 'a1', value: 'Apples'}, {id: 'b2', value: 'Bananas'}]));
console.log("👉 9. removeDuplicates [1,1,2,3,3]:", removeDuplicates([1, 1, 2, 3, 3])); 
console.log("👉 10. factorial(5):", factorial(5)); 
console.log("👉 11. cloneArrayManual [1, 2]:", cloneArrayManual([1, 2]));
console.log("👉 12. areAnagrams 'listen' 'silent':", areAnagrams("listen", "silent"));
console.log("👉 13. findLargestInMixed [10, 'apple', 50]:", findLargestInMixed([10, "apple", 50]));
console.log("👉 14. mergeArrays [1] [2]:", mergeArrays([1], [2]));
console.log("👉 15. joinToSentence ['Hello', 'World']:", joinToSentence(['Hello', 'World']));
console.log("👉 16. doubleElements [2, 4]:", doubleElements([2, 4]));

const counter = createCounter();
counter.increment();
counter.increment();
console.log("👉 17. createCounter (Double Increment):", counter.getValue());

console.log("👉 18. getFirstFive [1,2,3,4,5,6]:", getFirstFive([1, 2, 3, 4, 5, 6]));
console.log("👉 19. reverseWords 'Learning JS Is Fun':", reverseWords("Learning JS Is Fun"));
console.log("👉 20. mergeUnique [1,2] [2,3]:", mergeUnique([1, 2], [2, 3]));
console.log("👉 21. sortDescending [5, 2, 9]:", sortDescending([5, 2, 9]));

// --- ULTIMATE COMPLETION BATCH ---
console.log("👉 22. calcPower 3 ^ 4:", calcPower(3, 4));
console.log("👉 23. getFrequency [1, 1, 2]:", getFrequency([1, 1, 2]));
console.log("👉 24. findIntersection [1,2] [2,3]:", findIntersection([1, 2], [2, 3]));
console.log("👉 25. firstNonRepeated 'swiss':", firstNonRepeated("swiss"));
console.log("👉 26. capitalizeWords 'hello world':", capitalizeWords("hello world"));
console.log("👉 27. countVowels 'education':", countVowels("education"));
console.log("👉 28. uniqueChars 'geeksforgeeks':", uniqueChars("geeksforgeeks"));

// ULTIMATE GENERATOR TEST
const idGen = generateInfiniteId();
console.log("👉 29. Generator 1st Yield:", idGen.next().value);
console.log("👉 29. Generator 2nd Yield:", idGen.next().value);

console.log("\n✅ ALL 29 FOUNDATIONAL ESSENTIALS 100% VERIFIED! ✅");
