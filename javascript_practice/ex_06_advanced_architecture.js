
// ======================================================
// 1. Custom Memoize with Multi-Argument Cache [Difficulty: Medium-Hard 🟠]
// Goal: Create React-like internal caching preserving references to past inputs.
// ======================================================

function memoizeElite(fn) {
    const cache = new Map();

    return function (...args) {
        // Key optimization: stringify arguments to detect deep equality matches
        const storageKey = JSON.stringify(args);

        if (cache.has(storageKey)) {
            console.log("   💡 CACHE HIT: Returning stored result for", storageKey);
            return cache.get(storageKey);
        }

        console.log("   ⚙️ COMPUTE: Calculating fresh value for", storageKey);
        const result = fn(...args);
        cache.set(storageKey, result);
        return result;
    };
}

// TEST EXECUTION:
console.log("\n--- Elite Memoization Test ---");
const computeTotal = memoizeElite((a, b) => a + b);
computeTotal(10, 20); // COMPUTE
computeTotal(10, 20); // CACHE HIT
computeTotal(5, 5);   // COMPUTE


// ======================================================
// 2. Fetch with Automatic Retry & Backoff [Difficulty: Hard 🔴]
// Goal: Wrap unstable calls to automatically attempt self-healing on failure.
// ======================================================

async function fetchWithAutoRetry(mockFn, maxRetries = 3, delayMs = 500) {
    let lastError = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await mockFn(); // Attempt execution
        } catch (error) {
            console.log(`   ⚠️ Attempt ${attempt} Failed: ${error.message}`);
            lastError = error;
            
            // Pause execution for dynamic duration on failure to allow system cooldown
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, delayMs));
            }
        }
    }

    throw new Error(`   ❌ TERMINAL: Total failure after ${maxRetries} retries. Original error: ${lastError.message}`);
}

// TEST EXECUTION:
console.log("\n--- Auto-Retry Network Engine Test ---");
let faultCounter = 0;
const flakyApiMock = async () => {
    faultCounter++;
    if (faultCounter < 3) throw new Error("503 Service Unavailable");
    return { status: 200, data: "SuccessPayload" };
};

fetchWithAutoRetry(flakyApiMock, 3, 100)
    .then(res => console.log("   ✅ FINAL STATUS:", res))
    .catch(e => console.log(e.message));


// ======================================================
// 3. Custom Event Emitter (Pub/Sub Pattern) [Difficulty: Medium-Hard 🟠]
// Goal: Hand-craft native nodeJS event handlers to manage decoupled communications.
// ======================================================

class EventEmitterCustom {
    constructor() {
        this.topicRegistry = {}; // EventName -> Callback Set
    }

    on(eventName, listenerCallback) {
        if (!this.topicRegistry[eventName]) {
            this.topicRegistry[eventName] = new Set();
        }
        this.topicRegistry[eventName].add(listenerCallback);
        
        // Return unsubscribe functionality natively
        return () => this.off(eventName, listenerCallback);
    }

    emit(eventName, ...dataPayload) {
        const listeners = this.topicRegistry[eventName];
        if (!listeners) return;

        listeners.forEach(callback => callback(...dataPayload));
    }

    off(eventName, listenerToRemove) {
        const listeners = this.topicRegistry[eventName];
        if (listeners) {
            listeners.delete(listenerToRemove);
        }
    }
}

// TEST EXECUTION:
console.log("\n--- Custom Event Emitter Architecture Test ---");
const bus = new EventEmitterCustom();

const logUserLogin = (username) => console.log(`   🔔 NOTICE: User [${username}] has authenticated.`);
const unsub = bus.on("user_login", logUserLogin);

bus.emit("user_login", "ninad_admin"); // Fired!
unsub(); // Detach listener
bus.emit("user_login", "ninad_admin"); // Ignored (Cleanly unmounted!)


// ======================================================
// 4. Custom Promise.all Re-implementation [Difficulty: Hard 🔴]
// Goal: Pure logic handling simultaneous dynamic completion tracking.
// ======================================================

function customPromiseAll(promiseList) {
    return new Promise((resolve, reject) => {
        const results = new Array(promiseList.length);
        let completionCount = 0;

        // Guard for empty arrays
        if (promiseList.length === 0) return resolve([]);

        promiseList.forEach((promise, index) => {
            // Ensure item is promise-wrapped to handle pure values correctly
            Promise.resolve(promise)
                .then(resolvedValue => {
                    results[index] = resolvedValue; // Preserve order, don't push randomly!
                    completionCount++;

                    // Once total resolved equals original input length, deliver full payload
                    if (completionCount === promiseList.length) {
                        resolve(results);
                    }
                })
                .catch(error => {
                    // Short-circuit logic: first error KILLS whole batch
                    reject(error);
                });
        });
    });
}

// TEST EXECUTION:
console.log("\n--- Rebuilt Promise.all Execution Test ---");
const p1 = Promise.resolve("Fast Data");
const p2 = new Promise(r => setTimeout(() => r("Delayed Sync Data"), 200));
const p3 = "Instant Literal Value";

customPromiseAll([p1, p2, p3])
    .then(res => console.log("   ✅ COMBINED RESULTS ARRAY:", res))
    .catch(e => console.log("   ❌ BATCH FAIL:", e));
