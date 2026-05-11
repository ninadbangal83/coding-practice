// ======================================================
// 5. Check Anagram [Difficulty: Medium 🟡]
// Goal: Check if two strings are anagrams of each other.
// ======================================================

const areAnagrams = (str1, str2) => {
    const clean = (s) => s.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
    return clean(str1) === clean(str2);
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { s1: "listen", s2: "silent", expected: true, desc: "Standard matching count" },
    { s1: "Anagram", s2: "Nag a ram", expected: true, desc: "Mixed spacing and casing" },
    { s1: "hello", s2: "world", expected: false, desc: "Disjoint character set failure" },
    { s1: "rat", s2: "car", expected: false, desc: "Same length total mismatch" },
    { s1: "aabb", s2: "ab", expected: false, desc: "Letter count subset mismatch" }
];

console.log("\n--- 🧪 Running Anagram Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = areAnagrams(tc.s1, tc.s2);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
});
