
// ======================================================
// 1. Promise Chaining [Difficulty: Easy 🟢]
// Goal: Sequential async tasks. Fetch user -> Fetch ID -> Process data.
// ======================================================

const simulateFetchUser = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id: 1, name: "Alice" }), 100);
    });
};

const simulateFetchPosts = (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(["Post 1", "Post 2"]), 100);
    });
};

// LOGIC:
const runChain = () => {
    console.log("\n--- Promise Chain Starting ---");
    simulateFetchUser()
        .then(user => {
            console.log("Chain Step 1: User fetched", user.name);
            return simulateFetchPosts(user.id); // Chain new promise
        })
        .then(posts => {
            console.log("Chain Step 2: Posts fetched", posts);
        })
        .catch(err => console.error(err));
};

// Delay test execution to avoid overlapping logic
setTimeout(runChain, 0);


// ======================================================
// 2. Async / Await Flow [Difficulty: Easy 🟢]
// Goal: Rewrite the exact same logic using Async/Await clean syntax.
// ======================================================

const runAsyncAwait = async () => {
    console.log("\n--- Async/Await Starting ---");
    try {
        const user = await simulateFetchUser();
        console.log("Async Step 1: User", user.name);
        
        const posts = await simulateFetchPosts(user.id);
        console.log("Async Step 2: Posts", posts);
    } catch (err) {
        console.error("Async Error:", err);
    }
};

setTimeout(runAsyncAwait, 300);


// ======================================================
// 3. Event Loop Quiz [Difficulty: Medium 🟡]
// Goal: Predict console.log output ordering (Microtasks vs Macrotasks).
// Run this and observe the timing order!
// ======================================================

const runEventLoopDemo = () => {
    console.log("\n--- Event Loop Sequence Starts ---");
    
    console.log("1. Current Script Step (Synchronous)");

    setTimeout(() => {
        console.log("5. MacroTask (setTimeout callback executed last)");
    }, 0);

    Promise.resolve().then(() => {
        console.log("3. MicroTask 1 (Promises are processed right after current script)");
    }).then(() => {
        console.log("4. MicroTask 2 (Chained promises execute before event loop cycles again)");
    });

    console.log("2. End of Current Script (Synchronous)");
};

setTimeout(runEventLoopDemo, 600);


// ======================================================
// 4. Promise.all Polyfill [Difficulty: Medium-Hard 🟠]
// Goal: Custom implementation returning resolved values only if ALL succeed.
// ======================================================

const myPromiseAll = (promises) => {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;
        
        if (promises.length === 0) return resolve([]);
        
        promises.forEach((promise, index) => {
            // Handle non-promise values too using Promise.resolve()
            Promise.resolve(promise).then(val => {
                results[index] = val; // Preserve array order
                completed++;
                
                if (completed === promises.length) {
                    resolve(results); // Done when all resolve
                }
            }).catch(reject); // Reject immediately if ANY fails
        });
    });
};

// TEST LOG:
const testPromiseAll = async () => {
    console.log("\n--- Promise.all Polyfill Results ---");
    const p1 = Promise.resolve(3);
    const p2 = new Promise(res => setTimeout(() => res("Delay"), 100));
    const p3 = 42; // Raw value test
    
    try {
        const data = await myPromiseAll([p1, p2, p3]);
        console.log("All Resolved Data:", data); 
        // Expected: [ 3, "Delay", 42 ]
    } catch(e) {
        console.error("Fail:", e);
    }
};

setTimeout(testPromiseAll, 1000);


// ======================================================
// 5. API Retry Logic [Difficulty: Hard 🔴]
// Goal: Create a wrapper that retries a failing async task X times before giving up.
// ======================================================

const fetchWithRetry = async (asyncFn, maxRetries = 3, delayMs = 200) => {
    let attempts = 0;
    
    while (attempts < maxRetries) {
        try {
            return await asyncFn(); // Success! exit
        } catch (error) {
            attempts++;
            console.log(`Attempt ${attempts} failed. Reason: ${error.message}`);
            
            if (attempts >= maxRetries) {
                throw new Error(`Maximum retries (${maxRetries}) reached.`);
            }
            
            // Wait before retrying next cycle
            await new Promise(res => setTimeout(res, delayMs));
        }
    }
};

// Simulate flaky API that fails 2 times before working
let counter = 0;
const flakeyAPI = async () => {
    counter++;
    if (counter < 3) {
        throw new Error("Network Timeout 503");
    }
    return "🎉 Data Fetched Successfully!";
};

// TEST LOG:
const testRetry = async () => {
    console.log("\n--- API Retry Logic Results ---");
    try {
        const result = await fetchWithRetry(flakeyAPI, 4);
        console.log("Final Outcome:", result);
    } catch (e) {
        console.error("Failed entirely:", e.message);
    }
};

setTimeout(testRetry, 1500);
