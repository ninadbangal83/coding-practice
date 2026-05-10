
// ======================================================
// 1. Reverse String [Difficulty: Easy 🟢]
// Goal: Reverse the given string.
// ======================================================

const reverseString = (str) => {
    // Simplest method using built-in array operations
    return str.split('').reverse().join('');
};

// TEST LOG:
console.log("\n--- Reverse String Results ---");
console.log("Reversed:", reverseString("hello world"));
// Expected: "dlrow olleh"


// ======================================================
// 2. Longest Word [Difficulty: Easy 🟢]
// Goal: Find the longest word in a sentence.
// ======================================================

const findLongestWord = (sentence) => {
    const words = sentence.split(' ');
    return words.reduce((longest, current) => {
        return current.length > longest.length ? current : longest;
    }, "");
};

// TEST LOG:
console.log("\n--- Longest Word Results ---");
console.log("Longest:", findLongestWord("The quick brown fox jumped over the lazy dog"));
// Expected: "jumped"


// ======================================================
// 3. Character Frequency [Difficulty: Easy 🟢]
// Goal: Count frequency of each character in a string.
// ======================================================

const getCharFrequency = (str) => {
    const cleaned = str.replace(/\s+/g, '').toLowerCase(); // Standardize
    const freq = {};
    for (let char of cleaned) {
        freq[char] = (freq[char] || 0) + 1;
    }
    return freq;
};

// TEST LOG:
console.log("\n--- Character Frequency Results ---");
console.log("Frequency:", getCharFrequency("Mississippi"));
/* Expected: { m: 1, i: 4, s: 4, p: 2 } */


// ======================================================
// 4. Palindrome Check [Difficulty: Medium 🟡]
// Goal: Determine if a string is a palindrome, ignoring case/symbols.
// ======================================================

const isPalindrome = (str) => {
    // 1. Strip non-alphanumeric characters and lowercase everything
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    // 2. Compare the string to its reverse
    return cleaned === cleaned.split('').reverse().join('');
};

// TEST LOG:
console.log("\n--- Palindrome Results ---");
console.log("'Race Car':", isPalindrome("Race Car")); // Expected: true
console.log("'A man, a plan, a canal: Panama':", isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
console.log("'Hello':", isPalindrome("Hello")); // Expected: false


// ======================================================
// 5. Check Anagram [Difficulty: Medium 🟡]
// Goal: Check if two strings are anagrams of each other.
// ======================================================

const areAnagrams = (str1, str2) => {
    const clean = (s) => s.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
    return clean(str1) === clean(str2);
};

// Alternative frequency map method is also great for efficiency O(N)!

// TEST LOG:
console.log("\n--- Anagram Results ---");
console.log("'listen' & 'silent':", areAnagrams("listen", "silent")); // Expected: true
console.log("'hello' & 'world':", areAnagrams("hello", "world")); // Expected: false


// ======================================================
// 6. String Compression [Difficulty: Medium-Hard 🟠]
// Goal: Compress string by counting consecutive chars (e.g., "aabcccccaaa" -> "a2b1c5a3").
// Returns original string if compression isn't shorter.
// ======================================================

const compressString = (str) => {
    if (!str) return str;
    
    let compressed = '';
    let count = 1;
    
    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
            count++;
        } else {
            compressed += str[i] + count;
            count = 1; // Reset counter
        }
    }
    
    // Rule: only return compressed if it's actually smaller than the original
    return compressed.length < str.length ? compressed : str;
};

// TEST LOG:
console.log("\n--- Compress String Results ---");
console.log("Compressed 'aabcccccaaa':", compressString("aabcccccaaa")); 
// Expected: "a2b1c5a3"
console.log("Compressed 'abcd':", compressString("abcd")); 
// Expected: "abcd" (because a1b1c1d1 is longer than original)
