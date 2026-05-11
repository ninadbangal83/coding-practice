// ======================================================
// MODULE 5: FUNCTIONAL CLOSURES & GENERATORS
// Scope: State persistence, infinite streams, randomized logic.
// ======================================================

function createCounter() {
    let count = 0;
    return {
        increment: () => { count++; },
        getValue: () => count
    };
}

function* generateInfiniteId() {
    let id = 1;
    while (true) {
        yield `USER_${id++}`;
    }
}

function generateRandomString(len) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let res = '';
    for (let i = 0; i < len; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    return res;
}

// ======================================================
// 🧪 UNIFIED TEST DASHBOARD: FUNCTIONAL MODULE
// ======================================================
console.log("\n--- 🧪 Running Functional Closures Dashboard ---");

// Test 1: Counter
const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getValue() === 2 ? "✅ createCounter state isolation valid" : "❌ createCounter state failure");

// Test 2: Generators
const idGen = generateInfiniteId();
const nextVal = idGen.next().value;
console.log(nextVal === "USER_1" ? "✅ Generator yielding correctly" : "❌ Generator yielding incorrect state");

// Test 3: Randomizer
const randStr = generateRandomString(8);
console.log(randStr.length === 8 && typeof randStr === 'string' ? "✅ Random String length valid" : "❌ Randomizer failed");
