// ======================================================
// MODULE 3: STRING PARSING
// Scope: Sentence structure, vowel mechanics, case management.
// ======================================================

function isPalindrome(str) {
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
}

const reverseString = (str) => [...str].reverse().join('');

function areAnagrams(str1, str2) {
    const norm = (s) => s.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
    return norm(str1) === norm(str2);
}

const joinToSentence = (arr) => arr.join(' ');

const reverseWords = (sentence) => sentence.trim().split(/\s+/).reverse().join(' ');

function firstNonRepeated(str) {
    const map = {};
    for (let char of str) map[char] = (map[char] || 0) + 1;
    for (let char of str) if (map[char] === 1) return char;
    return null;
}

function capitalizeWords(sentence) {
    return sentence.split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
}

// APPROACH 1: Built-in Regex Match (Shortest / Cleanest)
function countVowelsRegex(str) {
    const matches = str.match(/[aeiou]/gi);
    return matches ? matches.length : 0;
}

// APPROACH 2: Manual Iteration Loop (Interview Best Practice - memory efficient)
function countVowels(str) {
    let count = 0;
    const vowels = 'aeiouAEIOU';
    for (let char of str) {
        if (vowels.includes(char)) count++;
    }
    return count;
}

// APPROACH 3: Filter/Replace Method (Creative, useful for small subsets)
function countVowelsReplace(str) {
    return str.toLowerCase().replace(/[^aeiou]/g, '').length;
}

const uniqueChars = (str) => [...new Set(str)].join('');

function camelToSnake(str) {
    return str.replace(/(?!^)[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).toLowerCase();
}

function truncateString(str, limit) {
    if (str.length <= limit) return str;
    return str.slice(0, limit) + "...";
}


// ======================================================
// 🧪 UNIFIED TEST DASHBOARD: STRING MODULE
// ======================================================
console.log("\n--- 🧪 Running String Parsing Dashboard ---");
const test = (label, val) => console.log(`${val ? "✅" : "❌"} ${label}`);

test("isPalindrome 'racecar'", isPalindrome("racecar") === true);
test("reverseString 'pizza🍕'", reverseString("pizza🍕") === "🍕azzip");
test("areAnagrams 'listen'/'silent'", areAnagrams("listen", "silent") === true);
test("joinToSentence ['A','B']", joinToSentence(['A', 'B']) === "A B");
test("reverseWords '  I  am  '", reverseWords("  I  am  ") === "am I");
test("firstNonRepeated 'swiss'", firstNonRepeated("swiss") === 'w');
test("capitalizeWords 'hElLo there'", capitalizeWords("hElLo there") === "Hello There");
test("countVowels 'hello'", countVowels("hello") === 2);
test("uniqueChars 'geeks'", uniqueChars("geeks") === "geks");
test("camelToSnake 'CamelCase'", camelToSnake("CamelCase") === "camel_case");
test("truncateString 'Hello World' (5)", truncateString("Hello World", 5) === "Hello...");

