// ===========================================================================
// 💡 LOW-LEVEL DESIGN ANALYSIS: SMART VENDING HARDWARE
// ---------------------------------------------------------------------------
// 🚀 Time Complexity: 
//    - Insert / Select / Eject: O(1) direct Map lookups and constant math.
// 💾 Space Complexity: 
//    - O(P) where P is Total Unique product types registered in machine inventory.
// 🛡️  Edge Case Handling Covered:
//    - Integer Arithmetic: Uses Paise (x100) integers preventing JS Float rounding leaks.
//    - Stock Scarcity Guard: Prevents delivery commands if counter detects 0.
//    - Abort Zero-Vector: Ensures user memory buffer explicitly wipes post-abort.
// ===========================================================================

// ─── SYSTEM ENUMERATION: MACHINE STATES ─────────────────────────────────────
const VendingStates = Object.freeze({
    IDLE: 'IDLE',
    ACCEPTING_MONEY: 'ACCEPTING_MONEY',
    DISPENSING: 'DISPENSING'
});

// ─── ENTITY: PRODUCT ─────────────────────────────────────────────────────────
class Product {
    constructor(uid, label, costPaise, count) {
        this.uid = uid;
        this.label = label;
        this.costPaise = costPaise; // Precision integer math to avoid JS float bugs
        this.count = count;
    }

    get inStock() {
        return this.count > 0;
    }

    extractOne() {
        if (!this.inStock) throw new Error(`${this.label} inventory exhausted.`);
        this.count--;
    }

    refill(qty) {
        this.count += qty;
    }
}

// ─── ENGINE: VENDING HARDWARE ───────────────────────────────────────────────
class VendingMachine {
    constructor() {
        this.currentState = VendingStates.IDLE;
        this.insertedBalance = 0;
        this.inventory = new Map(); // UID -> Product Object
    }

    // 🔐 ADMIN LAYER
    loadStock(product) {
        this.inventory.set(product.uid, product);
    }

    // 💵 USER INSERTION LAYER
    feedCurrency(paiseAmount) {
        if (paiseAmount <= 0) throw new Error("Invalid transaction amount.");
        if (this.currentState === VendingStates.DISPENSING) {
            throw new Error("Lock: Core engaged in dispensation. Wait.");
        }

        this.insertedBalance += paiseAmount;
        this.currentState = VendingStates.ACCEPTING_MONEY;
        console.log(`📥 Input detected: ₹${paiseAmount/100}. TOTAL CREDIT: ₹${this.insertedBalance/100}`);
    }

    // 🔘 USER SELECTION LAYER
    pressSelection(uid) {
        // State Pre-Condition Verification
        if (this.currentState === VendingStates.IDLE) {
            throw new Error("Operation Denied: Credit account must be established first.");
        }

        const target = this.inventory.get(uid);
        if (!target) throw new Error("Error: Identity sequence not located in database.");

        if (!target.inStock) {
            throw new Error(`Status Error: ${target.label} is temporarily out of commission.`);
        }

        if (this.insertedBalance < target.costPaise) {
            const delta = (target.costPaise - this.insertedBalance) / 100;
            throw new Error(`Deficit identified: Please supply additional ₹${delta} to proceed.`);
        }

        // INITIATE TRANSACTION CYCLE
        this.currentState = VendingStates.DISPENSING;
        this._executeFinalDelivery(target);
    }

    // 📦 FINAL DISPENSING PIPELINE
    _executeFinalDelivery(product) {
        console.log(`🔄 Vending Cycle Initiated for ${product.label}...`);
        product.extractOne();

        const changeOwed = this.insertedBalance - product.costPaise;
        
        // Flush user memory registers
        this.insertedBalance = 0;

        console.log(`🎁 SUCCESS! Enjoy your ${product.label}.`);

        if (changeOwed > 0) {
            console.log(`💳 CASH DISPENSED: ₹${changeOwed/100} successfully returned.`);
        }

        // CYCLE COMPLETE: REBOOT TO IDLE WAIT LISTENER
        this.currentState = VendingStates.IDLE;
        console.log("🛡️  SYSTEM READY.\n");
    }

    // 🔙 ABORT PROTOCOL
    ejectRefund() {
        if (this.currentState === VendingStates.IDLE) return 0;
        
        const returnVal = this.insertedBalance;
        this.insertedBalance = 0;
        this.currentState = VendingStates.IDLE;

        console.log(`↩️  ABORT SIGNAL RECEIVED: Emergency refund initiated for ₹${returnVal/100}`);
        return returnVal;
    }

    // 📊 DIAGNOSTIC REPORT
    renderStatus() {
        console.log("\n========== INVENTORY LISTING ==========");
        this.inventory.forEach(p => {
            const stockStr = p.inStock ? `[Qty: ${p.count}]` : "🚩 OUT OF STOCK";
            console.log(` [${p.uid}] ${p.label} -> ₹${p.costPaise/100}   | Status: ${stockStr}`);
        });
        console.log("=======================================\n");
    }
}

// ======================================================
// 🧪 LLD TEST AUTOMATION SECTION (INVENTORY & FINANCE INTEGRITY)
// ======================================================
console.log("\n--- 🧪 Running Vending Machine System Assertion Suite ---");

function runVendingAssertions() {
    try {
        const testMachine = new VendingMachine();
        // Seed small scale stock
        const cola = new Product('P1', 'Cola', 100, 2); // Cost: 1.00, Qty: 2
        testMachine.loadStock(cola);

        // Test 1: Idle Lock Protection
        try {
             testMachine.pressSelection('P1');
             throw new Error("Allowed transaction without monetary input!");
        } catch (e) {
             if (!e.message.includes("Credit account must be established")) throw e;
             console.log("✅ TEST 1: Idle state financial lock confirmed");
        }

        // Test 2: Flow Integration (Balance Tracking)
        testMachine.feedCurrency(150);
        if (testMachine.insertedBalance !== 150) throw new Error("Monetary input register failed");
        console.log("✅ TEST 2: Precision monetary memory injection success");

        // Test 3: Successful Dispense & Inventory Deduct
        // (Capturing the console methods for silent execution to verify outputs cleanly)
        testMachine.pressSelection('P1'); // Consume 100. Left: 1
        if (cola.count !== 1) throw new Error("Inventory counter failed to decrement");
        if (testMachine.insertedBalance !== 0) throw new Error("Post-transaction buffer not cleared");
        console.log("✅ TEST 3: Automated Transaction & Stock Ledger update confirmed");

        // Test 4: Out of Stock Failure Handlers
        testMachine.feedCurrency(100);
        testMachine.pressSelection('P1'); // Cost 100. Qty: 0 now.
        
        testMachine.feedCurrency(100); // Feed more
        try {
            testMachine.pressSelection('P1');
            throw new Error("Allowed dispensation of imaginary stock!");
        } catch (e) {
            if (!e.message.includes("out of commission")) throw e;
            console.log("✅ TEST 4: Depleted Resource lock engaged");
        }

        // Test 5: Emergency Refund / Buffer Zeroing
        const refunded = testMachine.ejectRefund();
        if (refunded !== 100 || testMachine.insertedBalance !== 0) {
            throw new Error("Abort vector failed to refund entire remaining credit");
        }
        console.log("✅ TEST 5: Critical Abort Protocol & Change return successfully matched");

        console.log("\n🏆 FINAL VERDICT: VENDING HARDWARE INTEGRITY 100% AUDITED 🏆\n");

    } catch (e) {
        console.error("\n❌ VENDING MACHINE FAILURE:", e.message);
        process.exit(1);
    }
}

// Subdue noisy console prints for the automation block to maintain output hygiene
const originalLog = console.log;
console.log = () => {}; // temp silence
originalLog("\n--- 🧪 Running Vending Machine System Assertion Suite ---");

// Restore functional console.log exclusively for automated reporting
const consoleTemp = console.log;
console.log = originalLog;

runVendingAssertions();
