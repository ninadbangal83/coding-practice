// ======================================================
// 4. Coin Change (Min Coins) [Difficulty: Medium-Hard 🟠]
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

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { coins: [1, 3, 4], amount: 6, expected: 2, desc: "Standard optimal set override" },
    { coins: [1, 2, 5], amount: 11, expected: 3, desc: "Large denomination optimal mix" },
    { coins: [2], amount: 3, expected: -1, desc: "Edge: Unreachable total mismatch failure" },
    { coins: [1], amount: 0, expected: 0, desc: "Edge: Zero amount target satisfied trivially" },
    { coins: [186, 419, 83, 408], amount: 6249, expected: 20, desc: "Scale: Complex asymmetric values large total" }
];

console.log("\n--- 🧪 Running Coin Change Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = minCoins(tc.coins, tc.amount);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Input amount: ${tc.amount}`);
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
