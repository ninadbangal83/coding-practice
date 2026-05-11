// ======================================================
// 3. Custom Event Emitter (Pub/Sub Pattern) [Difficulty: Medium-Hard 🟠]
// Goal: Architect internal Pub/Sub event communication bus maintaining listeners.
// ======================================================

class EventEmitterCustom {
    constructor() {
        this.topics = {};
    }
    on(eventName, callback) {
        if (!this.topics[eventName]) this.topics[eventName] = new Set();
        this.topics[eventName].add(callback);
        return () => this.off(eventName, callback); // Implicit unsubscriber
    }
    emit(eventName, ...args) {
        const sub = this.topics[eventName];
        if (!sub) return;
        sub.forEach(fn => fn(...args));
    }
    off(eventName, callback) {
        const sub = this.topics[eventName];
        if (sub) sub.delete(callback);
    }
}

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        exec: () => {
            const bus = new EventEmitterCustom();
            let count = 0;
            const unsub = bus.on("ping", () => count++);
            
            bus.emit("ping"); // +1
            bus.emit("ping"); // +1
            unsub();          // Unmount
            bus.emit("ping"); // Ignored
            
            return count;
        },
        expected: 2,
        desc: "Full Lifecycle: Mounting, Execution & Clean Unmounting"
    }
];

console.log("\n--- 🧪 Running Custom Event Emitter Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = tc.exec();
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
});
