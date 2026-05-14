// ======================================================
// MODULE 1: MATH FUNDAMENTALS
// Scope: Base numeric logic and calculation algorithms.
// ======================================================

const calcPower = (base, exp) => base ** exp;

function isPrime(num) {
    if (!Number.isInteger(num) || num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

function factorialIterative(n) {
    if (!Number.isInteger(n) || n < 0) return undefined;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function factorialRecursive(n) {
    if (!Number.isInteger(n) || n < 0) return undefined;
    if (n <= 1) return 1;
    return n * factorialRecursive(n - 1);
}

function fibonacciSequence(n) {
    if (!Number.isInteger(n) || n <= 0) return [];
    if (n === 1) return [0];
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}

function fibonacciRecursive(n) {
    if (!Number.isInteger(n) || n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];
    const sequence = fibonacciRecursive(n - 1);
    sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
    return sequence;
}

function calculateAverage(arr) {
    if (!arr.length) return 0;
    return arr.reduce((s, n) => s + n, 0) / arr.length;
}

function sumArray(arr) {
    return arr.reduce((acc, current) => acc + current, 0);
}

function roundToDecimal(num, precision = 2) {
    const factor = 10 ** precision;
    return Math.round((num + Number.EPSILON) * factor) / factor;
}

function getRandomRange(min, max) {
    if (min > max) [min, max] = [max, min];
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function reverseInteger(n) {
    if (!Number.isInteger(n)) return 0;
    let reversed = 0;
    let num = Math.abs(n);
    while (num > 0) {
        reversed = (reversed * 10) + (num % 10);
        num = Math.floor(num / 10);
    }
    const LIMIT = 2 ** 31 - 1;
    if (reversed > LIMIT) return 0;
    return reversed * Math.sign(n);
}

function isPowerOfTwo(n) {
    return Number.isInteger(n) && n > 0 && (n & (n - 1)) === 0;
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
runTest("isPrime (2.5 = false)", isPrime(2.5) === false);
runTest("factorialIterative (5 = 120)", factorialIterative(5) === 120);
runTest("factorialRecursive (5 = 120)", factorialRecursive(5) === 120);
runTest("fibonacci (len 6)", JSON.stringify(fibonacciSequence(6)) === JSON.stringify([0, 1, 1, 2, 3, 5]));
runTest("fibonacciRecursive (len 6)", JSON.stringify(fibonacciRecursive(6)) === JSON.stringify([0, 1, 1, 2, 3, 5]));
runTest("calculateAverage [10, 20, 30]", calculateAverage([10, 20, 30]) === 20);
runTest("sumArray [1, 2, 3, 4]", sumArray([1, 2, 3, 4]) === 10);
runTest("roundToDecimal (0.1 + 0.2 = 0.3)", roundToDecimal(0.1 + 0.2, 1) === 0.3);
const rand = getRandomRange(10, 5);
runTest("getRandomRange (Swap safe)", rand >= 5 && rand <= 10);
runTest("reverseInteger (-123 = -321)", reverseInteger(-123) === -321);
runTest("reverseInteger (Overflow)", reverseInteger(9999999999) === 0);
runTest("isPowerOfTwo (16 = true)", isPowerOfTwo(16) === true);
runTest("isPowerOfTwo (2.5 = false)", isPowerOfTwo(2.5) === false);

