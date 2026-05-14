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

// 4. Memoize: Dynamic Result Caching with Lexical Safety
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        
        // apply preserves "this" context for nested object methods!
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// 5. Currying: Flexible Variable Arity Execution
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...nextArgs) {
            return curried.apply(this, args.concat(nextArgs));
        };
    };
}

// 6. Once Wrapper: Singular Execution State
function once(fn) {
    let ran = false;
    let result;
    return function(...args) {
        if (!ran) {
            ran = true;
            result = fn.apply(this, args);
        }
        return result;
    };
}

// ======================================================
// 🧪 UNIFIED TEST DASHBOARD: FUNCTIONAL MODULE
// ======================================================
console.log("\n--- 🧪 Running Functional Closures Dashboard ---");
const run = (label, success) => console.log(`${success ? "✅" : "❌"} ${label}`);

try {
    // Test 1: Counter
    const counter = createCounter();
    counter.increment();
    counter.increment();
    run("createCounter", counter.getValue() === 2);

    // Test 2: Generators
    const idGen = generateInfiniteId();
    run("generateInfiniteId", idGen.next().value === "USER_1");

    // Test 3: Randomizer
    const randStr = generateRandomString(8);
    run("generateRandomString", randStr.length === 8 && typeof randStr === 'string');

    // Test 4: Memoize
    let calls = 0;
    const add = (a, b) => { calls++; return a + b; };
    const memoAdd = memoize(add);
    const r1 = memoAdd(2, 3); // calls = 1
    const r2 = memoAdd(2, 3); // retrieved from cache, calls still = 1
    run("memoize (Caching validation)", r1 === 5 && r2 === 5 && calls === 1);

    // Test 5: Curry
    const multiply = (a, b, c) => a * b * c;
    const curriedMult = curry(multiply);
    const resultCurry = curriedMult(2)(3)(4); // 24
    run("curry (Arity chaining)", resultCurry === 24);

    // Test 6: Once
    let executions = 0;
    const initialize = once(() => { executions++; return "CONFIG_LOADED"; });
    const first = initialize();
    const second = initialize();
    run("once (Execution capping)", first === "CONFIG_LOADED" && second === "CONFIG_LOADED" && executions === 1);

} catch (e) {
    console.error("Runtime error in tests:", e.message);
}
