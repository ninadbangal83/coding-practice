// ==========================================================================================
// 🚀 DSA PRACTICE SCRATCHPAD
// Problem: 2. Contains Duplicate
// Difficulty: Easy 🟢
// Goal: Return true if any value appears at least twice in array.
// ==========================================================================================

/**
 * 1. WRITE YOUR SOLUTION HERE
 */
const containsDuplicate = (nums) => {
    // TODO: Implement your solution here
    const set = new Set();
    for(const num of nums) {
        if(set.has(num)) return true;
        set.add(num)
    }
    return false;
};

// ==========================================================================================
// 🧪 TEST HARNESS & AUTOMATION
// ==========================================================================================

const testCases = [
    { 
        input: [[1, 2, 3, 1]], 
        expected: true, 
        desc: "Standard duplicate" 
    },
    { 
        input: [[1, 2, 3, 4]], 
        expected: false, 
        desc: "All unique numbers" 
    },
    { 
        input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], 
        expected: true, 
        desc: "Multiple occurrences" 
    },
    { 
        input: [[]], 
        expected: false, 
        desc: "Edge: Empty array boundary" 
    },
    { 
        input: [[10]], 
        expected: false, 
        desc: "Edge: Single element constraint" 
    },
    { 
        input: [[-1, -5, 10, -5]], 
        expected: true, 
        desc: "Negative integers duplicate" 
    },
    { 
        input: [Array.from({ length: 10000 }, (_, i) => i).concat([5000])], 
        expected: true, 
        desc: "Scale: Large dataset load (O(n) validation)" 
    }
];

// --- Execution & Benchmarking Engine ---
const runTests = () => {
    console.clear();
    console.log(`\n🚀 Starting DSA Test Automation: Contains Duplicate`);
    console.log("==================================================================");

    let passedCount = 0;

    testCases.forEach((tc, i) => {
        // Clone input before passing to protect original test case from mutation
        const inputCopy = JSON.parse(JSON.stringify(tc.input));

        const start = performance.now();
        const result = containsDuplicate(...inputCopy);
        const duration = (performance.now() - start).toFixed(4);

        // Advanced Deep Equality Matcher for arrays, sets, nested structures
        const isEqual = (a, b) => {
            if (a === b) return true;
            
            const stringifyNormalize = (val) => {
                if (val instanceof Set) return JSON.stringify([...val].sort());
                if (val instanceof Map) return JSON.stringify(Object.fromEntries([...val].entries()));
                if (Array.isArray(val)) return JSON.stringify(val); 
                return JSON.stringify(val);
            };
            
            return stringifyNormalize(a) === stringifyNormalize(b);
        };

        const isPassed = isEqual(result, tc.expected);
        if (isPassed) passedCount++;

        console.log(`Test #${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

        if (!isPassed) {
            console.log(`   📥 Input:    `, JSON.stringify(tc.input));
            console.log(`   📤 Output:   `, JSON.stringify(result));
            console.log(`   🎯 Expected: `, JSON.stringify(tc.expected));
            console.log("------------------------------------------------------------------");
        }
    });

    console.log("==================================================================");
    console.log(`🎉 Results Summary: ${passedCount}/${testCases.length} Passed (${((passedCount/testCases.length)*100).toFixed(0)}%)`);
    console.log("==================================================================\n");
};

// Execute automatically
runTests();
