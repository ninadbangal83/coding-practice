
// ======================================================
// 1. Memoization [Difficulty: Medium 🟡]
// Goal: Cache pure function results based on input arguments to prevent recalculation.
// ======================================================

const memoize = (func) => {
    const cache = new Map();
    
    return function(...args) {
        // Use a stringified key representing the arguments
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log("⚡ Returning from Cache for args:", args);
            return cache.get(key);
        }
        
        const result = func.apply(this, args);
        cache.set(key, result);
        return result;
    };
};

// Usage with slow addition calculation
const slowAdd = (a, b) => a + b;
const memoizedAdd = memoize(slowAdd);

console.log("\n--- Memoization Results ---");
console.log("Run 1 (calculating):", memoizedAdd(5, 10));
console.log("Run 2 (cached!):", memoizedAdd(5, 10)); // Should say returning from cache


// ======================================================
// 2. Simple In-Memory Cache Class [Difficulty: Medium 🟡]
// Goal: Manage cached items with optional time-to-live (TTL) expiration.
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
            this.store.delete(key); // Clean expired
            return null;
        }
        return item.value;
    }
}

console.log("\n--- Cache Results ---");
const cache = new MemoryCache();
cache.set("apiKey", "secret_123", 200); // Lives 200ms

console.log("Immediate get:", cache.get("apiKey")); // Exists
setTimeout(() => {
    console.log("After 300ms get (expired):", cache.get("apiKey")); // Expected: null
}, 300);


// ======================================================
// 3. URL Query Parameters Parser [Difficulty: Easy 🟢]
// Goal: Transform query string '?a=1&b=foo' to {a: '1', b: 'foo'}.
// ======================================================

const parseQueryParams = (url) => {
    const queryString = url.split('?')[1] || url; // Split domain if present
    const pairs = queryString.split('&');
    
    return pairs.reduce((acc, pair) => {
        const [key, val] = pair.split('=');
        if (key) {
            acc[decodeURIComponent(key)] = decodeURIComponent(val || '');
        }
        return acc;
    }, {});
};

console.log("\n--- Query Parser Results ---");
console.log("Parsed:", parseQueryParams("https://site.com?name=john&role=admin&active=true"));
// Expected: { name: 'john', role: 'admin', active: 'true' }


// ======================================================
// 4. Deep Compare (isEqual) [Difficulty: Hard 🔴]
// Goal: Recurse deeply to check if two object trees are conceptually equivalent.
// ======================================================

const isDeepEqual = (obj1, obj2) => {
    // Base case: same primitive ref or strictly identical
    if (obj1 === obj2) return true;

    // Check for null, undefined or non-object discrepancies
    if (typeof obj1 !== 'object' || obj1 === null || 
        typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Mismatched number of properties immediately signals failure
    if (keys1.length !== keys2.length) return false;

    // Recurse each key
    for (let key of keys1) {
        if (!keys2.includes(key) || !isDeepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
};

console.log("\n--- Deep Compare Results ---");
const objectA = { a: 1, nested: { b: [2, 3] } };
const objectB = { a: 1, nested: { b: [2, 3] } };
console.log("Deep Equal Match?", isDeepEqual(objectA, objectB)); // Expected: true
console.log("Strict Equal Ref?", objectA === objectB); // Expected: false


// ======================================================
// 5. Object Flattening (Code version) [Difficulty: Medium-Hard 🟠]
// Goal: Take nested tree structure and generate single-level path map.
// ======================================================

const flattenObj = (obj, parentKey = '', res = {}) => {
    for (let key in obj) {
        const propName = parentKey ? `${parentKey}.${key}` : key;
        
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            flattenObj(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    }
    return res;
};

console.log("\n--- Object Flattening Results ---");
const complex = { a: 1, b: { c: 2, d: { e: 3 } } };
console.log("Flattened:", flattenObj(complex));
// Expected: { a: 1, 'b.c': 2, 'b.d.e': 3 }
