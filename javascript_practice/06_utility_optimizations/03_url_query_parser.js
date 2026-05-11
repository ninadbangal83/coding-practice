// ======================================================
// 3. URL Query Parameters Parser [Difficulty: Easy 🟢]
// Goal: Transform standard query string payloads into logical JS objects.
// ======================================================

const parseQueryParams = (url) => {
    const queryString = url.includes('?') ? url.split('?')[1] : url;
    if (!queryString) return {};
    
    const pairs = queryString.split('&');
    return pairs.reduce((acc, pair) => {
        const [key, val] = pair.split('=');
        if (key) {
            acc[decodeURIComponent(key)] = decodeURIComponent(val || '');
        }
        return acc;
    }, {});
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        input: "https://site.com?name=john&role=admin",
        expected: { name: "john", role: "admin" },
        desc: "Standard full URL parse extraction"
    },
    {
        input: "a=1&b=%20spaced%20",
        expected: { a: "1", b: " spaced " },
        desc: "URI component decoding logic validation"
    },
    {
        input: "keyNoValue&",
        expected: { keyNoValue: "" },
        desc: "Edge: Missing trailing value safety cleanup"
    }
];

console.log("\n--- 🧪 Running URL Parser Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = parseQueryParams(tc.input);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = JSON.stringify(result) === JSON.stringify(tc.expected);
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
});
