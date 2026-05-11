// ======================================================
// 2. Simple In-Memory Cache Class [Difficulty: Medium 🟡]
// Goal: Manage cached items with optional time-to-live (TTL) expiration logic.
// ======================================================

class MemoryCache {
    constructor() {
        this.store = new Map();
    }
    set(key, value, ttlMs = 1000) {
        const expiration = Date.now() + ttlMs;
        this.store.set(key, { value, expiration });
    }
    get(key) {
        const item = this.store.get(key);
        if (!item) return null;
        if (Date.now() > item.expiration) {
            this.store.delete(key); // Lazy clean up expired keys
            return null;
        }
        return item.value;
    }
}

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        exec: () => new Promise(resolve => {
            const cache = new MemoryCache();
            cache.set("user", "Bob", 50); // Expires in 50ms
            
            const check1 = cache.get("user") === "Bob"; // Immediate retrieval
            
            setTimeout(() => {
                const check2 = cache.get("user") === null; // Should be expired
                resolve(check1 && check2);
            }, 100);
        }),
        expected: true,
        desc: "Time-to-Live (TTL) expiry enforcement"
    }
];

async function runSuite() {
    console.log("\n--- 🧪 Running Memory Cache Async Automated Tests ---");
    for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        const start = performance.now();
        const result = await tc.exec();
        const duration = (performance.now() - start).toFixed(4);

        const isPassed = result === tc.expected;
        console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
    }
}

runSuite();
