// ======================================================
// 3. Valid Anagram [Difficulty: Easy-Medium 🟢🟡]
// Goal: Return true if 't' contains same chars/frequencies as 's'.
// ======================================================

const s1 = "anagram", t1 = "nagaram";
const s2 = "rat", t2 = "car";

const isAnagram = (s, t) => {
    if (s.length !== t.length) return false;
    const count = new Map();

    // Count character frequency in s
    for (const char of s) {
        count.set(char, (count.get(char) || 0) + 1);
    }

    // Subtract character frequency using t
    for (const char of t) {
        if (!count.has(char)) return false;
        const newCount = count.get(char) - 1;
        if (newCount === 0) {
            count.delete(char); // Perfect match cancel
        } else {
            count.set(char, newCount);
        }
    }
    return count.size === 0;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { s: "anagram", t: "nagaram", expected: true, desc: "Standard anagram positive" },
    { s: "rat", t: "car", expected: false, desc: "Same length, different chars" },
    { s: "a", t: "ab", expected: false, desc: "Edge: Different lengths mismatch" },
    { s: "", t: "", expected: true, desc: "Edge: Dual empty strings constraint" },
    { s: "aa", t: "a", expected: false, desc: "Uneven char repetition count" },
    { s: "qwerty", t: "ytrewq", expected: true, desc: "Mirror reverse match" },
    { s: "a".repeat(5000) + "b", t: "b" + "a".repeat(5000), expected: true, desc: "Scale: Large strings performance check" }
];

console.log("\n--- 🧪 Running Valid Anagram Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = isAnagram(tc.s, tc.t);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
    
    if (!isPassed) {
        console.log(`   Input: s='${tc.s}', t='${tc.t}'`);
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
