// ======================================================
// 4. Group Anagrams [Difficulty: Medium 🟡]
// Goal: Group an array of strings together into anagram clusters.
// ======================================================

const strsArray = ["eat","tea","tan","ate","nat","bat"];

const groupAnagrams = (strs) => {
    const map = new Map(); // key(sorted str) -> [originals]

    for (const str of strs) {
        const key = str.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(str);
    }
    return Array.from(map.values());
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { strs: ["eat","tea","tan","ate","nat","bat"], expected: [["bat"],["nat","tan"],["ate","eat","tea"]], desc: "Standard multigroup" },
    { strs: [""], expected: [[""]], desc: "Edge: Single empty string" },
    { strs: ["a"], expected: [["a"]], desc: "Edge: Single character case" },
    { strs: ["", "", ""], expected: [["", "", ""]], desc: "Multiple identical empty strings" },
    { strs: [], expected: [], desc: "Edge: Fully empty input array" }
];

// Helper: Canonical normalization of groupings for strict comparison
const normalize = (groups) => {
    const sortedInner = groups.map(arr => [...arr].sort());
    return sortedInner.sort((a, b) => a.join('').localeCompare(b.join('')));
};

console.log("\n--- 🧪 Running Group Anagrams Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = groupAnagrams(tc.strs);
    const duration = (performance.now() - start).toFixed(4);

    const normRes = normalize(result);
    const normExp = normalize(tc.expected);
    
    const isPassed = JSON.stringify(normRes) === JSON.stringify(normExp);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input: ${JSON.stringify(tc.strs)}`);
        console.log(`   Output: ${JSON.stringify(result)}`);
        console.log(`   Expected: ${JSON.stringify(tc.expected)}`);
    }
});
