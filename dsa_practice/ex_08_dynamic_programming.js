
// ======================================================
// 1. Climbing Stairs [Difficulty: Easy 🟢]
// Goal: Compute discrete recursive combinations using O(1) bottom-up linear DP.
// ======================================================

const climbStairs = (n) => {
    if (n <= 2) return n;

    let prevPrevious = 1; // Base step 1
    let previous = 2;     // Base step 2

    for (let i = 3; i <= n; i++) {
        const currentWays = previous + prevPrevious;
        prevPrevious = previous;
        previous = currentWays;
    }
    return previous;
};

// TEST LOG:
console.log("\n--- Climbing Stairs Results ---");
console.log("Ways to climb 5 stairs:", climbStairs(5));
// Expected: 8


// ======================================================
// 2. Coin Change (Min Coins) [Difficulty: Medium-Hard 🟠]
// Goal: Find absolute minimum combination count to reach target sum.
// ======================================================

const coinSet = [1, 3, 4];
const targetAmount = 6;

const minCoins = (coins, amount) => {
    // Initialize state table with Infinity to safeguard minimum boundary
    const dpTable = new Array(amount + 1).fill(Infinity);
    dpTable[0] = 0; // 0 cost to fulfill 0 amount

    for (let subAmt = 1; subAmt <= amount; subAmt++) {
        for (const coin of coins) {
            if (coin <= subAmt) {
                // Minimum required for remainder subAmt minus current coin
                const remainingMin = dpTable[subAmt - coin];
                if (remainingMin !== Infinity) {
                    dpTable[subAmt] = Math.min(dpTable[subAmt], 1 + remainingMin);
                }
            }
        }
    }
    return dpTable[amount] === Infinity ? -1 : dpTable[amount];
};

// TEST LOG:
console.log("\n--- Min Coin Change Results ---");
console.log("Min coins for 6 from [1,3,4]:", minCoins(coinSet, targetAmount));
// Expected: 2 (Coins used: 3 + 3)


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

// TEST LOG:
console.log("\n--- Longest Common Subsequence Results ---");
console.log("LCS of 'abcde' and 'ace':", longestCommonSubsequence(text1, text2));
// Expected: 3 ('ace')


// ======================================================
// 4. House Robber [Difficulty: Medium 🟡]
// Goal: Extract maximum sequential payoff without taking adjacent triggers.
// ======================================================

const lootHouses = [2, 7, 9, 3, 1];

const robMax = (houses) => {
    if (houses.length === 0) return 0;
    if (houses.length === 1) return houses[0];

    let prevTwoStep = 0; // Memory for N-2
    let prevOneStep = 0; // Memory for N-1

    for (const money of houses) {
        // Core DP relation: Max(Skip current, Take current + cache from 2 houses back)
        const currentBest = Math.max(prevOneStep, prevTwoStep + money);
        prevTwoStep = prevOneStep;
        prevOneStep = currentBest;
    }
    return prevOneStep;
};

// TEST LOG:
console.log("\n--- House Robber Results ---");
console.log("Max loot available from [2,7,9,3,1]:", robMax(lootHouses));
// Expected: 12 (Index 0: 2 + Index 2: 9 + Index 4: 1)
