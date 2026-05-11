// ======================================================
// 10. Deep Clone [Difficulty: Hard 🔴]
// Goal: Create a perfect clone of an object recursively handling nested values.
// ======================================================

const deepClone = (obj, map = new WeakMap()) => {
    if (obj === null || typeof obj !== 'object') return obj;
    
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
    
    if (map.has(obj)) return map.get(obj);
    
    const clone = Array.isArray(obj) ? [] : {};
    map.set(obj, clone);
    
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = deepClone(obj[key], map);
        }
    }
    return clone;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

console.log("\n--- 🧪 Running Deep Clone Automated Tests ---");

// Test 1: Deep Mutability Isolation Check
const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);
cloned.b.c = 99; // Modify clone only

const isPassed1 = original.b.c === 2 && cloned.b.c === 99;
console.log(`Test 1: ${isPassed1 ? "✅ PASS" : "❌ FAIL"} | Mutation Isolation Verification`);

// Test 2: Special Object Instances (Date)
const hasDate = { d: new Date("2026-01-01") };
const dateCloned = deepClone(hasDate);
const isPassed2 = dateCloned.d instanceof Date && dateCloned.d !== hasDate.d && dateCloned.d.getTime() === hasDate.d.getTime();
console.log(`Test 2: ${isPassed2 ? "✅ PASS" : "❌ FAIL"} | Instance Integrity (Date objects)`);

// Test 3: Circular Reference Safety
const circular = { name: 'origin' };
circular.self = circular;
try {
    const circCloned = deepClone(circular);
    const isPassed3 = circCloned.self === circCloned && circCloned !== circular;
    console.log(`Test 3: ${isPassed3 ? "✅ PASS" : "❌ FAIL"} | Circular Reference Safe-Memory Handing`);
} catch (e) {
    console.log("Test 3: ❌ FAIL | Circular structure exploded call stack");
}
