
// ======================================================
// 1. Best Time to Buy and Sell Stock [Difficulty: Easy 🟢]
// Goal: Find max profit by tracking cheapest purchase and best upcoming sell day.
// ======================================================

const pricesInput = [7, 1, 5, 3, 6, 4];

const maxProfit = (prices) => {
    let minPrice = Infinity;
    let maxTotalProfit = 0;

    for (const price of prices) {
        if (price < minPrice) {
            minPrice = price; // Keep track of historic cheapest buy-in day
        } else {
            maxTotalProfit = Math.max(maxTotalProfit, price - minPrice);
        }
    }
    return maxTotalProfit;
};

// TEST LOG:
console.log("\n--- Buy & Sell Stock Results ---");
console.log("Prices [7,1,5,3,6,4] -> Max Profit:", maxProfit(pricesInput));
// Expected: 5 (Buy at 1, Sell at 6)


// ======================================================
// 2. Longest Substring Without Repeats [Difficulty: Medium 🟡]
// Goal: Find length of longest block with total unique characters.
// ======================================================

const stringInput1 = "abcabcbb";
const stringInput2 = "pwwkew";

const lengthOfLongestSubstring = (s) => {
    const charIndexMap = new Map(); // char -> last seen absolute position
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        // Shrink Logic: If we found duplicate, shift LEFT past its old position
        if (charIndexMap.has(char) && charIndexMap.get(char) >= left) {
            left = charIndexMap.get(char) + 1;
        }

        charIndexMap.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
};

// TEST LOGS:
console.log("\n--- Longest Substring Unique Results ---");
console.log("'abcabcbb' ->", lengthOfLongestSubstring(stringInput1)); // Expected: 3
console.log("'pwwkew' ->", lengthOfLongestSubstring(stringInput2));    // Expected: 3


// ======================================================
// 3. Max Sum Subarray (Fixed K) [Difficulty: Easy 🟢]
// Goal: Return max contiguous sum of subarray with rigid fixed size 'k'.
// ======================================================

const numsForFixedSum = [2, 1, 5, 1, 3, 2];
const windowLimit = 3;

const maxSumSubarrayOfSizeK = (nums, k) => {
    let windowSum = 0;
    let maxSum = 0;

    // Initialize very first full window
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    maxSum = windowSum;

    // Slide window along the numbers
    for (let right = k; right < nums.length; right++) {
        windowSum += nums[right];        // Intake new element from right
        windowSum -= nums[right - k];    // Drop trailing element from left
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
};

// TEST LOG:
console.log("\n--- Max Sum Subarray (Fixed) Results ---");
console.log("Input [2,1,5,1,3,2], k=3 -> Max Sum:", maxSumSubarrayOfSizeK(numsForFixedSum, windowLimit));
// Expected: 9


// ======================================================
// 4. Substring with K Distinct Chars [Difficulty: Medium 🟡]
// Goal: Find longest continuous block containing at most 'k' unique chars.
// ======================================================

const kDistinctInput = "eceba";
const distinctLimit = 2;

const longestSubstringKDistinct = (s, k) => {
    const charFrequency = new Map();
    let left = 0;
    let maxBlock = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        charFrequency.set(char, (charFrequency.get(char) || 0) + 1);

        // Violates rule? Shrink from left until uniqueness count drops
        while (charFrequency.size > k) {
            const leftChar = s[left];
            charFrequency.set(leftChar, charFrequency.get(leftChar) - 1);
            if (charFrequency.get(leftChar) === 0) {
                charFrequency.delete(leftChar);
            }
            left++;
        }
        maxBlock = Math.max(maxBlock, right - left + 1);
    }
    return maxBlock;
};

// TEST LOG:
console.log("\n--- K Distinct Characters Results ---");
console.log("'eceba', k=2 -> Longest Block Length:", longestSubstringKDistinct(kDistinctInput, distinctLimit));
// Expected: 3 ("ece")


// ======================================================
// 5. Minimum Size Subarray Sum [Difficulty: Medium 🟡]
// Goal: Find MINIMUM array width satisfying target threshold.
// ======================================================

const minSubNums = [2, 3, 1, 2, 4, 3];
const targetThreshold = 7;

const minSubArrayLen = (target, nums) => {
    let left = 0;
    let sum = 0;
    let minWidth = Infinity;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];

        // Constraint MET: Shrink actively as long as condition holds to find MIN size
        while (sum >= target) {
            minWidth = Math.min(minWidth, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }
    return minWidth === Infinity ? 0 : minWidth;
};

// TEST LOG:
console.log("\n--- Min Subarray Sum Results ---");
console.log("Sum threshold 7, input [2,3,1,2,4,3] -> Min Width:", minSubArrayLen(targetThreshold, minSubNums));
// Expected: 2 ([4,3])


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

// TEST LOG:
console.log("\n--- Permutation In String Results ---");
console.log("'ab' in 'eidbaooo' ->", checkInclusion(s1String, s2String));
// Expected: true ("ba")
