// ======================================================
// MODULE 4: OBJECT MAPPING
// Scope: Transform arrays into lookup tables, count frequencies.
// ======================================================

function convertArrayToObject(arr) {
    return arr.reduce((acc, item) => {
        acc[item.id] = item.value;
        return acc; 
    }, {});
}

function getFrequency(arr) {
    return arr.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {});
}

// ======================================================
// 🧪 UNIFIED TEST DASHBOARD: OBJECT MODULE
// ======================================================
console.log("\n--- 🧪 Running Object Mapping Dashboard ---");

const res1 = convertArrayToObject([{id: 'a1', value: 'Apple'}]);
console.log(res1['a1'] === 'Apple' ? "✅ convertArrayToObject success" : "❌ convertArrayToObject failed");

const res2 = getFrequency([1, 1, 2]);
console.log(res2[1] === 2 && res2[2] === 1 ? "✅ getFrequency success" : "❌ getFrequency failed");
