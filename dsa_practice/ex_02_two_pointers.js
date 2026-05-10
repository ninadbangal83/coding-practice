
// ======================================================
// 1. Valid Palindrome [Difficulty: Easy 🟢]
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

// TEST LOGS:
console.log("\n--- Valid Palindrome Results ---");
console.log("Input 'A man...' ->", isPalindrome(str1)); // Expected: true
console.log("Input 'race a car' ->", isPalindrome(str2)); // Expected: false


// ======================================================
// 2. Two Sum Sorted [Difficulty: Easy-Medium 🟢🟡]
// Goal: Find indices of numbers that sum to target in a SORTED array.
// ======================================================

const sortedNums = [2, 7, 11, 15];
const targetVal = 9;

const twoSumSorted = (numbers, target) => {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];
        if (sum === target) {
            return [left + 1, right + 1]; // 1-indexed output per prompt
        } else if (sum < target) {
            left++; // Need larger sum
        } else {
            right--; // Need smaller sum
        }
    }
    return [];
};

// TEST LOG:
console.log("\n--- Two Sum Sorted Results ---");
console.log("Sorted [2,7,11,15], target 9 ->", twoSumSorted(sortedNums, targetVal));
// Expected: [1, 2]


// ======================================================
// 3. Container With Most Water [Difficulty: Medium 🟡]
// Goal: Find max area enclosed between two lines.
// ======================================================

const heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];

const maxArea = (height) => {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        const currentWidth = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, currentWidth * currentHeight);

        // Move the SHORTER side inward to potentially find larger area
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxWater;
};

// TEST LOG:
console.log("\n--- Container Most Water Results ---");
console.log("Max Area of heights array ->", maxArea(heights));
// Expected: 49


// ======================================================
// 4. 3Sum Triplet Search [Difficulty: Medium-Hard 🟠]
// Goal: Find all UNIQUE triplets summing to zero.
// ======================================================

const tripletInput = [-1, 0, 1, 2, -1, -4];

const threeSum = (nums) => {
    nums.sort((a, b) => a - b); // SORTING IS ESSENTIAL
    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        // Stop duplicates for index i
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        if (nums[i] > 0) break; // Minimal element > 0, no solutions possible

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                // Skip internal duplicates
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
};

// TEST LOG:
console.log("\n--- 3Sum Triplet Results ---");
console.log("Triplets summing to zero:", threeSum(tripletInput));
// Expected: [ [ -1, -1, 2 ], [ -1, 0, 1 ] ]


// ======================================================
// 5. Trapping Rain Water [Difficulty: Hard 🔴]
// Goal: Compute trapped rainwater amount efficiently in O(n).
// ======================================================

const elevationMap = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];

const trap = (height) => {
    let left = 0, right = height.length - 1;
    let maxL = 0, maxR = 0;
    let trapped = 0;

    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] >= maxL) {
                maxL = height[left];
            } else {
                trapped += maxL - height[left];
            }
            left++;
        } else {
            if (height[right] >= maxR) {
                maxR = height[right];
            } else {
                trapped += maxR - height[right];
            }
            right--;
        }
    }
    return trapped;
};

// TEST LOG:
console.log("\n--- Trapping Rain Water Results ---");
console.log("Trapped unit count ->", trap(elevationMap));
// Expected: 6


// ======================================================
// 6. Move Zeroes In-Place [Difficulty: Easy 🟢]
// Goal: Shift zeroes to end of array without changing relative order.
// ======================================================

const zeroInput = [0, 1, 0, 3, 12];

const moveZeroes = (nums) => {
    let writePointer = 0;
    
    // Move valid numbers to front
    for (let readPointer = 0; readPointer < nums.length; readPointer++) {
        if (nums[readPointer] !== 0) {
            // Swap values for clean in-place logic
            [nums[writePointer], nums[readPointer]] = [nums[readPointer], nums[writePointer]];
            writePointer++;
        }
    }
    return nums;
};

// TEST LOG:
console.log("\n--- Move Zeroes Results ---");
console.log("Modified array:", moveZeroes(zeroInput));
// Expected: [1, 3, 12, 0, 0]
