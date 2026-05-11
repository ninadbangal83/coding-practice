// ======================================================
// 2. Valid Palindrome [Difficulty: Easy 🟢]
// Goal: Determine if a string is a palindrome (ignore case & punctuation).
// ======================================================

const str1 = "A man, a plan, a canal: Panama";
const str2 = "race a car";

const isPalindrome = (s) => {
    let left = 0;
    let right = s.length - 1;

    const isAlphaNumeric = (c) => /[a-z0-9]/i.test(c);

    while (left < right) {
        while (left < right && !isAlphaNumeric(s[left])) left++;
        while (left < right && !isAlphaNumeric(s[right])) right--;

        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        left++;
        right--;
    }
    return true;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { s: "A man, a plan, a canal: Panama", expected: true, desc: "Classic mixed-symbol sentence" },
    { s: "race a car", expected: false, desc: "Semi-mirrored false positive" },
    { s: " ", expected: true, desc: "Edge: Single whitespace character" },
    { s: ".,", expected: true, desc: "Edge: Purely non-alphanumeric symbols" },
    { s: "ab_a", expected: true, desc: "Edge: Underscore and special separators" },
    { s: "0P", expected: false, desc: "Number-char pairing mismatch" },
    { s: "a".repeat(5000) + "b" + "a".repeat(5000), expected: true, desc: "Scale: Ultra-long mirror validation" }
];

console.log("\n--- 🧪 Running Valid Palindrome Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = isPalindrome(tc.s);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input: "${tc.s.length > 15 ? tc.s.slice(0,15)+ '...' : tc.s}"`);
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
