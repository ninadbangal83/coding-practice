// ======================================================
// MODULE 1: MATH FUNDAMENTALS
// Scope: Base numeric logic and calculation algorithms.
// ======================================================

const calcPower = (base, exp) => base ** exp;

function isPrime(num) {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

function fibonacciSequence(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}

function calculateAverage(arr) {
    if (!arr.length) return 0;
    return arr.reduce((s, n) => s + n, 0) / arr.length;
}

function sumArray(arr) {
    return arr.reduce((acc, current) => acc + current, 0);
}

// ======================================================
// 🧪 UNIFIED TEST DASHBOARD: MATH MODULE
// ======================================================
console.log("\n--- 🧪 Running Math Fundamentals Dashboard ---");

const runTest = (label, success) => {
    console.log(`${success ? "✅" : "❌"} ${label}`);
};

// Assertions
runTest("calcPower (3^4 = 81)", calcPower(3, 4) === 81);
runTest("isPrime (17 = true)", isPrime(17) === true);
runTest("isPrime (4 = false)", isPrime(4) === false);
runTest("factorial (5 = 120)", factorial(5) === 120);
runTest("fibonacci (len 6)", JSON.stringify(fibonacciSequence(6)) === JSON.stringify([0, 1, 1, 2, 3, 5]));
runTest("calculateAverage [10, 20, 30]", calculateAverage([10, 20, 30]) === 20);
runTest("sumArray [1, 2, 3, 4]", sumArray([1, 2, 3, 4]) === 10);
