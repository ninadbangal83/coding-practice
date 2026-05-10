
// ======================================================
// 0. The Closure Principle & Currying [Difficulty: Medium 🟡]
// Goal: Retain inner scope state (Encapsulation) & handle partial execution.
// ======================================================

// Pattern A: Private Counter (Encapsulation)
const createCounter = () => {
    let count = 0; // Private variable accessible ONLY via methods below
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
};

// Pattern B: Currying Function
const curriedSum = (a) => (b) => (c) => a + b + c;

// TEST LOGS:
console.log("\n--- Closure & Currying Results ---");
const counterObj = createCounter();
counterObj.increment();
counterObj.increment();
console.log("Encapsulated Counter Value:", counterObj.getCount()); // Expected: 2
console.log("Curried sum(1)(2)(3):", curriedSum(1)(2)(3)); // Expected: 6


// ======================================================
// 1. Array.prototype.map [Difficulty: Easy 🟢]
// Goal: Implement custom map function that returns a new array.
// ======================================================

Array.prototype.myMap = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        // Passing element, index, and array context
        result.push(callback(this[i], i, this));
    }
    return result;
};

// TEST LOG:
console.log("\n--- Array.map Polyfill Results ---");
const nums = [1, 2, 3];
console.log("Mapped (x * 2):", nums.myMap(x => x * 2));
// Expected: [2, 4, 6]


// ======================================================
// 2. Array.prototype.filter [Difficulty: Easy 🟢]
// Goal: Implement custom filter that keeps elements matching a condition.
// ======================================================

Array.prototype.myFilter = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

// TEST LOG:
console.log("\n--- Array.filter Polyfill Results ---");
const evens = [1, 2, 3, 4, 5].myFilter(n => n % 2 === 0);
console.log("Filtered (Evens):", evens);
// Expected: [2, 4]


// ======================================================
// 3. Array.prototype.reduce [Difficulty: Medium 🟡]
// Goal: Implement custom reduce accumulating value down to a single output.
// ======================================================

Array.prototype.myReduce = function(callback, initialValue) {
    let accumulator = initialValue;
    let startIndex = 0;

    // If initialValue is not supplied, use the first element
    if (accumulator === undefined) {
        if (this.length === 0) throw new TypeError('Reduce of empty array with no initial value');
        accumulator = this[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
};

// TEST LOG:
console.log("\n--- Array.reduce Polyfill Results ---");
const sum = [1, 2, 3, 4].myReduce((acc, val) => acc + val, 0);
console.log("Reduced (Sum):", sum);
// Expected: 10


// ======================================================
// 4. Function.prototype.call/apply [Difficulty: Medium 🟡]
// Goal: Manually assign function scope and execute immediately.
// ======================================================

// Custom Call
Function.prototype.myCall = function(context = window || global, ...args) {
    // Generate a unique key to prevent overriding existing context props
    const fnKey = Symbol('tempFn');
    context[fnKey] = this; // Attach the function to the context
    
    const result = context[fnKey](...args); // Invoke 
    delete context[fnKey]; // Clean up
    
    return result;
};

// Custom Apply
Function.prototype.myApply = function(context = window || global, args = []) {
    const fnKey = Symbol('tempFn');
    context[fnKey] = this;
    
    const result = context[fnKey](...args); // Spread array arguments
    delete context[fnKey];
    
    return result;
};

// TEST LOG:
console.log("\n--- Call & Apply Polyfill Results ---");
function greet(city, state) { return `${this.name} from ${city}, ${state}`; }
const user = { name: "John" };

console.log("Call Output:", greet.myCall(user, "SF", "CA"));
console.log("Apply Output:", greet.myApply(user, ["NYC", "NY"]));
// Expected both to print user.name + locations.


// ======================================================
// 5. Function.prototype.bind [Difficulty: Medium-Hard 🟠]
// Goal: Return a new function that, when called, sets its "this" keyword.
// ======================================================

Function.prototype.myBind = function(context, ...boundArgs) {
    const originalFunc = this;
    
    return function(...args) {
        // Combines predefined boundArgs and newly passed arguments
        return originalFunc.apply(context, [...boundArgs, ...args]);
    };
};

// TEST LOG:
console.log("\n--- Function.bind Polyfill Results ---");
const user2 = { name: "Alice" };
function getMessage(age) { return `Hello, ${this.name}. Age ${age}.`; }

const boundGreet = getMessage.myBind(user2);
console.log("Bound Result:", boundGreet(25));
// Expected: "Hello, Alice. Age 25."


// ======================================================
// 6. Debounce [Difficulty: Hard 🔴]
// Goal: Delay executing a function until after a pause in repeated invocations.
// ======================================================

const debounce = (func, delay) => {
    let timeoutId;
    
    return function(...args) {
        // Clear current running timeout immediately when triggered again
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

// TEST LOG:
console.log("\n--- Debounce Simulation Results ---");
const fastLogger = () => console.log("[Debounce Logged] Action executed.");
const debouncedFunc = debounce(fastLogger, 100);

console.log("Firing event rapidly 3 times (should fire once)...");
debouncedFunc(); 
debouncedFunc(); 
debouncedFunc(); 
// Only the last one should execute after 100ms pass. 


// ======================================================
// 7. Throttle [Difficulty: Hard 🔴]
// Goal: Limit the execution rate of a function to once every specific interval.
// ======================================================

const throttle = (func, limit) => {
    let inThrottle = false;
    
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args); // Execute immediately
            inThrottle = true; // Lock the gate
            
            setTimeout(() => {
                inThrottle = false; // Open gate after limit milliseconds
            }, limit);
        }
    };
};

// TEST LOG:
console.log("\n--- Throttle Simulation Results ---");
let throttleCount = 0;
const throttledLog = throttle(() => throttleCount++, 100);

// Trigger quickly 5 times
throttledLog();
throttledLog();
throttledLog();

setTimeout(() => {
    console.log(`Throttled Executions in 100ms window: ${throttleCount} (Expected: 1)`);
}, 200); 
