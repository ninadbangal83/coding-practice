// ======================================================
// 5. Top K Frequent Elements [Difficulty: Medium 🟡]
// Goal: Return the 'k' most frequent elements in O(n) time.
// ======================================================

const freqNums = [1, 1, 1, 2, 2, 3];
const kLimit = 2;

// Advanced Pattern: Bucket Sort (Linear O(n))
const topKFrequentOptimal = (nums, k) => {
    const freq = new Map();
    for (const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }

    // Create frequency-index buckets array
    const buckets = Array.from({ length: nums.length + 1 }, () => []);
    for (const [num, count] of freq) {
        buckets[count].push(num);
    }

    // Traverse backwards from highest frequency bucket
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        if (buckets[i].length > 0) {
            result.push(...buckets[i]);
        }
    }
    return result.slice(0, k);
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { nums: [1, 1, 1, 2, 2, 3], k: 2, expected: [1, 2], desc: "Standard weighted distribution" },
    { nums: [1], k: 1, expected: [1], desc: "Edge: Minimal Single element limit" },
    { nums: [1, 2], k: 2, expected: [1, 2], desc: "k equals total unique elements limit" },
    { nums: [4, 4, 4, 4], k: 1, expected: [4], desc: "Uniform identical dataset constraint" },
    { nums: [-1, -1], k: 1, expected: [-1], desc: "Negative numerical frequency check" }
];

console.log("\n--- 🧪 Running Top K Frequent Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = topKFrequentOptimal(tc.nums, tc.k);
    const duration = (performance.now() - start).toFixed(4);

    // Canonical sorting required because output of ties could be implementation specific!
    const normalizedRes = [...result].sort((a,b) => a - b);
    const normalizedExp = [...tc.expected].sort((a,b) => a - b);
    
    const isPassed = JSON.stringify(normalizedRes) === JSON.stringify(normalizedExp);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input: nums=${JSON.stringify(tc.nums)}, k=${tc.k}`);
        console.log(`   Output: ${JSON.stringify(result)} | Expected: ${JSON.stringify(tc.expected)}`);
    }
});
