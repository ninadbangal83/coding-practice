// ======================================================
// MODULE 4: OBJECT MAPPING
// Scope: Transform arrays into lookup tables, count frequencies.
// ======================================================

function convertArrayToObject(arr) {
    return arr.reduce((acc, item) => {
        if (item && item.id !== undefined) {
            acc[item.id] = item.value;
        }
        return acc;
    }, {});
}

function getFrequency(arr) {
    // Using Object.create(null) immunizes dictionary against prototype collision bugs (e.g. "toString")
    return arr.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, Object.create(null));
}

// 3. Deep Clone: Recursive copy avoiding object references
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;

    const clone = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = deepClone(obj[key]);
        }
    }
    return clone;
}

// 4. Safe Resolver: Retrieve nested values via dot notation string
function getNestedValue(obj, path) {
    const keys = path.split('.');
    return keys.reduce((acc, key) => {
        return (acc && acc[key] !== undefined) ? acc[key] : undefined;
    }, obj);
}

// 5. Object Inversion: Swaps keys and values
function invertObject(obj) {
    const inverted = {};
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            inverted[obj[key]] = key;
        }
    }
    return inverted;
}

// ======================================================
// 🧪 UNIFIED TEST DASHBOARD: OBJECT MODULE
// ======================================================
console.log("\n--- 🧪 Running Object Mapping Dashboard ---");
const run = (label, success) => console.log(`${success ? "✅" : "❌"} ${label}`);

try {
    const res1 = convertArrayToObject([{ id: 'a1', value: 'Apple' }]);
    run("convertArrayToObject", res1['a1'] === 'Apple');

    const res2 = getFrequency(['toString', 'a', 'a']);
    run("getFrequency (Prototype-safe)", res2['toString'] === 1 && res2['a'] === 2);

    const original = { a: 1, b: { c: 2 }, d: [3, 4] };
    const cloned = deepClone(original);
    const isDeepCloned = JSON.stringify(original) === JSON.stringify(cloned) && original.b !== cloned.b && original.d !== cloned.d;
    run("deepClone", isDeepCloned);

    const user = { profile: { settings: { theme: 'dark' } } };
    run("getNestedValue", getNestedValue(user, 'profile.settings.theme') === 'dark' && getNestedValue(user, 'profile.invalid') === undefined);

    const inv = invertObject({ x: '1', y: '2' });
    run("invertObject", inv['1'] === 'x' && inv['2'] === 'y');
} catch (e) {
    console.error("Runtime error in tests:", e.message);
}
