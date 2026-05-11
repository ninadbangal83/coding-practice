// ======================================================
// 2. Best Time to Buy and Sell Stock [Difficulty: Easy 🟢]
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

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    { p: [7, 1, 5, 3, 6, 4], expected: 5, desc: "Standard fluctuation profitable market" },
    { p: [7, 6, 4, 3, 1], expected: 0, desc: "Bear market: Constantly descending (zero profit)" },
    { p: [1, 2, 3, 4, 5], expected: 4, desc: "Bull market: Constantly ascending maximal profit" },
    { p: [5], expected: 0, desc: "Edge: Single day limit constraint" },
    { p: [], expected: 0, desc: "Edge: Null trading dataset" },
    { p: Array.from({ length: 10000 }, (_, i) => i + 1), expected: 9999, desc: "Scale: High-volume historical price flow" }
];

console.log("\n--- 🧪 Running Buy & Sell Stock Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = maxProfit(tc.p);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});
