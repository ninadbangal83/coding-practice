// ======================================================
// 6. Permutation In String [Difficulty: Hard 🟠]
// Goal: Check if permutation of s1 lives anywhere inside s2.
// ======================================================

const s1String = "ab";
const s2String = "eidbaooo";

const checkInclusion = (s1, s2) => {
    if (s1.length > s2.length) return false;

    const neededMap = new Array(26).fill(0);
    const windowMap = new Array(26).fill(0);
    const baseCode = 'a'.charCodeAt(0);

    for (let i = 0; i < s1.length; i++) {
        neededMap[s1.charCodeAt(i) - baseCode]++;
    }

    for (let right = 0; right < s2.length; right++) {
        windowMap[s2.charCodeAt(right) - baseCode]++;

        // Slide current fixed window from left boundary
        if (right >= s1.length) {
            windowMap[s2.charCodeAt(right - s1.length) - baseCode]--;
        }

        // Verify matching state
        if (windowMap.every((val, idx) => val === neededMap[idx])) {
            return true;
        }
    }
    return false;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { s1: "ab", s2: "eidbaooo", expected: true, desc: "Permutation exists centrally" },
    { s1: "ab", s2: "eidboaoo", expected: false, desc: "Missing contiguous group failure" },
    { s1: "a", s2: "ab", expected: true, desc: "Edge: Single character matching" },
    { s1: "hello", s2: "ooolleoooleh", expected: false, desc: "Letters present but not grouped contiguous" },
    { s1: "abc", s2: "ab", expected: false, desc: "Edge: Target larger than source mismatch" },
    { s1: "a".repeat(500), s2: "z".repeat(2000) + "a".repeat(500), expected: true, desc: "Scale: Deep container tail inclusion" }
];

console.log("\n--- 🧪 Running Permutation In String Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = checkInclusion(tc.s1, tc.s2);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
