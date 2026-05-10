
// ======================================================
// 1. Two Sum [Difficulty: Easy ⭐⭐]
// Goal: Find indices of two numbers that add up to a specific target.
// ======================================================

const numsForSum = [2, 7, 11, 15];
const target = 9;

const twoSum = (nums, target) => {
    const map = new Map(); // value -> index
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
};

// TEST LOG:
console.log("\n--- Two Sum Results ---");
console.log("Input: [2,7,11,15], Target 9 -> Output:", twoSum(numsForSum, target));
// Expected: [0, 1]


// ======================================================
// 2. Contains Duplicate [Difficulty: Easy 🟢]
// Goal: Return true if any value appears at least twice in array.
// ======================================================

const dupInput1 = [1, 2, 3, 1];
const dupInput2 = [1, 2, 3, 4];

const containsDuplicate = (nums) => {
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    return false;
};

// TEST LOGS:
console.log("\n--- Contains Duplicate Results ---");
console.log("Input [1,2,3,1] ->", containsDuplicate(dupInput1)); // Expected: true
console.log("Input [1,2,3,4] ->", containsDuplicate(dupInput2)); // Expected: false


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

// TEST LOGS:
console.log("\n--- Valid Anagram Results ---");
console.log("anagram vs nagaram ->", isAnagram(s1, t1)); // Expected: true
console.log("rat vs car ->", isAnagram(s2, t2));         // Expected: false


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

// TEST LOG:
console.log("\n--- Group Anagrams Results ---");
console.log("Grouped Output:", groupAnagrams(strsArray));
/* Expected:
[ [ 'eat', 'tea', 'ate' ], [ 'tan', 'nat' ], [ 'bat' ] ]
*/


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

// TEST LOG:
console.log("\n--- Top K Frequent Results ---");
console.log("Input [1,1,1,2,2,3], k=2 ->", topKFrequentOptimal(freqNums, kLimit));
// Expected: [1, 2]


// ======================================================
// 6. Product Except Self [Difficulty: Medium-Hard 🟠]
// Goal: Multiply all numbers EXCEPT self WITHOUT using division!
// ======================================================

const productInput = [1, 2, 3, 4];

const productExceptSelf = (nums) => {
    const n = nums.length;
    const result = new Array(n).fill(1);

    // Left Pass: Store multiplication product of all elements on the left
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= nums[i];
    }

    // Right Pass: Multiply current result by products of all elements on the right
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    return result;
};

// TEST LOG:
console.log("\n--- Product Except Self Results ---");
console.log("Input [1,2,3,4] -> Output:", productExceptSelf(productInput));
// Expected: [24, 12, 8, 6]


// ======================================================
// 7. Longest Consecutive Sequence [Difficulty: Hard 🔴]
// Goal: Find longest consecutive elements sequence chain in O(n) time.
// ======================================================

const sequenceInput = [100, 4, 200, 1, 3, 2];

const longestConsecutive = (nums) => {
    const numSet = new Set(nums); // Direct O(1) lookup table
    let maxLen = 0;

    for (const num of numSet) {
        // Step: Only verify chains starting from base (where num-1 doesn't exist)
        if (!numSet.has(num - 1)) {
            let current = num;
            let currentLen = 1;

            // Crawl forward sequentially
            while (numSet.has(current + 1)) {
                current++;
                currentLen++;
            }
            maxLen = Math.max(maxLen, currentLen);
        }
    }
    return maxLen;
};

// TEST LOG:
console.log("\n--- Longest Consecutive Results ---");
console.log("Input [100,4,200,1,3,2] -> Max Length:", longestConsecutive(sequenceInput));
// Expected: 4 (1, 2, 3, 4)
