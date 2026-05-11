// ======================================================
// MODULE 3: STRING PARSING
// Scope: Sentence structure, vowel mechanics, case management.
// ======================================================

function isPalindrome(str) {
    // Write your code here
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
}

function reverseString(str) {
    // Write your code here
    return str.split("").reverse().join('')
}

function areAnagrams(str1, str2) {
    // Write your code here
    const norm = (s) => s.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
    return norm(str1) === norm(str2);
}

function joinToSentence(arr) {
    // Write your code here
    return arr.join(' ');
}

function reverseWords(sentence) {
    // Write your code here
    return sentence.split(' ').reverse().join(' ')
}

function firstNonRepeated(str) {
    // Write your code here

}

function capitalizeWords(sentence) {
    // Write your code here
}

function countVowels(str) {
    // Write your code here
    const vow = str.toLowerCase().replace(/[^aeiou]/g, '');
    return vow.length
}

function uniqueChars(str) {
    // Write your code here
    return [...new Set(str.split(''))].join('')
}

// ======================================================
// 🧪 UNIFIED TEST DASHBOARD: STRING MODULE
// ======================================================
console.log("\n--- 🧪 Running String Parsing Dashboard ---");
const run = (label, success) => console.log(`${success ? "✅" : "❌"} ${label}`);

try {
    run("isPalindrome 'racecar'", isPalindrome("racecar") === true);
    run("reverseString 'hello'", reverseString("hello") === "olleh");
    run("areAnagrams 'listen'/'silent'", areAnagrams("listen", "silent") === true);
    run("joinToSentence ['A','B']", joinToSentence(['A', 'B']) === "A B");
    run("reverseWords 'I am'", reverseWords("I am") === "am I");
    run("firstNonRepeated 'swiss'", firstNonRepeated("swiss") === 'w');
    run("capitalizeWords 'hi there'", capitalizeWords("hi there") === "Hi There");
    run("countVowels 'hello'", countVowels("hello") === 2);
    run("uniqueChars 'geeks'", uniqueChars("geeks") === "geks");
} catch (e) {
    console.error("Runtime error in tests:", e.message);
}
