// ======================================================
// MODULE 3: STRING PARSING
// Scope: Sentence structure, vowel mechanics, case management.
// ======================================================

function isPalindrome(str) {
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
}

const reverseString = (str) => str.split('').reverse().join('');

function areAnagrams(str1, str2) {
    const norm = (s) => s.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
    return norm(str1) === norm(str2);
}

const joinToSentence = (arr) => arr.join(' ');

const reverseWords = (sentence) => sentence.split(' ').reverse().join(' ');

function firstNonRepeated(str) {
    const map = {};
    for (let char of str) map[char] = (map[char] || 0) + 1;
    for (let char of str) if (map[char] === 1) return char;
    return null;
}

function capitalizeWords(sentence) {
    return sentence.split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

function countVowels(str) {
    const matches = str.match(/[aeiou]/gi);
    return matches ? matches.length : 0;
}

const uniqueChars = (str) => [...new Set(str)].join('');

// ======================================================
// 🧪 UNIFIED TEST DASHBOARD: STRING MODULE
// ======================================================
console.log("\n--- 🧪 Running String Parsing Dashboard ---");
const test = (label, val) => console.log(`${val ? "✅" : "❌"} ${label}`);

test("isPalindrome 'racecar'", isPalindrome("racecar") === true);
test("reverseString 'hello'", reverseString("hello") === "olleh");
test("areAnagrams 'listen'/'silent'", areAnagrams("listen", "silent") === true);
test("joinToSentence ['A','B']", joinToSentence(['A', 'B']) === "A B");
test("reverseWords 'I am'", reverseWords("I am") === "am I");
test("firstNonRepeated 'swiss'", firstNonRepeated("swiss") === 'w');
test("capitalizeWords 'hi there'", capitalizeWords("hi there") === "Hi There");
test("countVowels 'hello'", countVowels("hello") === 2);
test("uniqueChars 'geeks'", uniqueChars("geeks") === "geks");
