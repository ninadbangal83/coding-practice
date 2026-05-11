// ======================================================
// 3. Longest Common Subsequence (LCS) [Difficulty: Medium 🟡]
// Goal: Resolve intersection subproblems in strings using 2D Matrix DP.
// ======================================================

const text1 = "abcde";
const text2 = "ace";

const longestCommonSubsequence = (s1, s2) => {
    const rows = s1.length;
    const cols = s2.length;

    // Build (M+1)x(N+1) offset grid
    const matrix = Array.from({ length: rows + 1 }, () => new Array(cols + 1).fill(0));

    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            // Character matching increases parent diagonal count by 1
            if (s1[i - 1] === s2[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1] + 1;
            } else {
                // No match: inherit optimal state from neighboring cells
                matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
            }
        }
    }
    return matrix[rows][cols];
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { s1: "abcde", s2: "ace", expected: 3, desc: "Standard discontinuous overlap" },
    { s1: "abc", s2: "abc", expected: 3, desc: "Perfect identical string match" },
    { s1: "abc", s2: "def", expected: 0, desc: "Edge: Completely disjoint character set" },
    { s1: "", s2: "abc", expected: 0, desc: "Edge: Empty left-string boundary" },
    { s1: "a".repeat(500), s2: "b".repeat(500) + "a", expected: 1, desc: "Scale: Large string deep single trailing match" }
];

console.log("\n--- 🧪 Running LCS Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = longestCommonSubsequence(tc.s1, tc.s2);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
