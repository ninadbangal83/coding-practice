
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

// ─── DRIVER EXECUTION ───────────────────────────────────────────────────────
console.log("⚡ BOOTING VENDING SYSTEM SOFTWARE ⚡");
const unit = new VendingMachine();

unit.loadStock(new Product('C1', 'Coca-Cola', 4500, 10)); // ₹45
unit.loadStock(new Product('S1', 'Baked Lay\'s', 2000, 5)); // ₹20
unit.loadStock(new Product('E1', 'Red Bull', 11000, 1));   // ₹110

unit.renderStatus();

// SCENARIO 1: Successful Purchase
unit.feedCurrency(5000); // ₹50
unit.pressSelection('C1'); // Cost ₹45 -> Change ₹5

// SCENARIO 2: Insufficient Funds -> Refund
try {
    unit.feedCurrency(500); // ₹5
    unit.pressSelection('S1'); // Needs ₹20
} catch (e) {
    console.log(`🚨 ERROR INTERRUPT: ${e.message}`);
    unit.ejectRefund();
}

// SCENARIO 3: Drain Stock Test
unit.feedCurrency(15000); // ₹150
unit.pressSelection('E1'); // Last Energy Drink Dispensed
unit.renderStatus();
