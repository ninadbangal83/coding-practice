// ======================================================
// MODULE 3: STRING PARSING
// Scope: Sentence structure, vowel mechanics, case management.
// ======================================================

function isPalindrome(str) {
    // Write your code here
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    return clean === clean.split('').reverse().join('');
}

function reverseString(str) {
    // Write your code here
    return [...str].reverse().join('');
}

function areAnagrams(str1, str2) {
    // Write your code here
    const norm = (str) => str.toLowerCase().replace(/[^a-z]/g, "").split('').sort().join('');
    return norm(str1) === norm(str2)

}

function joinToSentence(arr) {
    // Write your code here
    return arr.join(" ")
}

function reverseWords(sentence) {
    // Write your code here
    return sentence.trim().split(/\s+/).reverse().join(' ');
}

function firstNonRepeated(str) {
    // Write your code here
    const map ={};
    for(let char of str) {
        map[char] = (map[char] || 0) + 1
    }
    for(let char of str) {
        if(map[char] === 1) return char;
    }
    return null;
}

function capitalizeWords(sentence) {
    // Write your code here
    return sentence.split(' ').map((e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(' ');
}

function countVowels(str) {
    // Write your code here
    return str.toLowerCase().replace(/[^aeiou]/g, '').length;
}

function uniqueChars(str) {
    // Write your code here
    return [...new Set(str.split(''))].join('')
}

function camelToSnake(str) {
    // Write your code here
    return str.replace(/(?!^)[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).toLowerCase();
}

function truncateString(str, limit) {
    // Write your code here
    if(str.length <= limit) return str;
    return str.slice(0, limit) + '...'
}

// ======================================================
// 🧪 UNIFIED TEST DASHBOARD: STRING MODULE
// ======================================================
console.log("\n--- 🧪 Running String Parsing Dashboard ---");
const test = (label, val) => console.log(`${val ? "✅" : "❌"} ${label}`);

try {
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
} catch (e) {
    console.error("Runtime error in tests:", e.message);
}
