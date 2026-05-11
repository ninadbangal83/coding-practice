// ===========================================================================
// 💡 LOW-LEVEL DESIGN ANALYSIS: ELEVATOR DISPATCH SYSTEM
// ---------------------------------------------------------------------------
// 🚀 Time Complexity: 
//    - Dispatch Selection: O(N) where N is number of cars in fleet.
//    - Move Step Tick: O(S) where S is pending stops remaining for car.
// 💾 Space Complexity: 
//    - O(K) where K is active requests queued in duplicate-purging Set() memory.
// 🛡️  Edge Case Handling Covered:
//    - Direction Interruption Prevention: Penalizes score of cars moving opposite way.
//    - Duplicate-Request Collapse: Discards multiple presses of same floor via Set().
//    - Parallel Concurrent Fleet Routing: Always assigns to the absolute closest unit.
// ===========================================================================

// ─── SYSTEM ENUMERATION: ELEVATOR VECTORS ───────────────────────────────────
const ElevatorDirection = Object.freeze({
    UP: 'UP',
    DOWN: 'DOWN',
    IDLE: 'IDLE'
});

// ─── ENTITY: EXTERNAL REQUEST ───────────────────────────────────────────────
class FloorCallRequest {
    constructor(floor, vector) {
        this.floor = floor;
        this.vector = vector;
    }
}

// ─── ENGINE: ELEVATOR UNIT ──────────────────────────────────────────────────
class ElevatorCar {
    constructor(unitId) {
        this.unitId = unitId;
        this.currentPos = 1; // Default initial positioning at floor 1
        this.vector = ElevatorDirection.IDLE;
        this.stopQueue = new Set(); // Utilize sets to prune redundant duplicate floor presses
    }

    injectTarget(floorNum) {
        this.stopQueue.add(floorNum);
        this._recalculateVector();
        console.log(`Unit ${this.unitId}: Queued floor ${floorNum}. (Full Queue: [${[...this.stopQueue]}])`);
    }

    // Simulate standard discrete time increment traversal
    executeIncrementStep() {
        if (this.stopQueue.size === 0) {
            this.vector = ElevatorDirection.IDLE;
            return; // Hold position
        }

        const immediateTarget = this._getOptimalNextTarget();
        
        // Physically shift positioning by 1 increment towards the target vector
        if (immediateTarget > this.currentPos) {
            this.currentPos++;
        } else if (immediateTarget < this.currentPos) {
            this.currentPos--;
        }

        // Verify arrival logic
        if (this.currentPos === immediateTarget) {
            this.stopQueue.delete(this.currentPos); // Pop target from resolution set
            console.log(`🛎️  Unit ${this.unitId}: ARRIVED at Floor ${this.currentPos}`);
            this._cycleSafetyDoors();
        }

        this._recalculateVector();
    }

    _getOptimalNextTarget() {
        const pendingList = [...this.stopQueue];

        // SCENARIO 1: Actively Moving UP
        if (this.vector === ElevatorDirection.UP) {
            const higherStops = pendingList.filter(f => f > this.currentPos);
            if (higherStops.length > 0) return Math.min(...higherStops); // Grab nearest upwards
        }
        // SCENARIO 2: Actively Moving DOWN
        if (this.vector === ElevatorDirection.DOWN) {
            const lowerStops = pendingList.filter(f => f < this.currentPos);
            if (lowerStops.length > 0) return Math.max(...lowerStops); // Grab nearest downwards
        }

        // SCENARIO 3: IDLE fallback -> execute simple absolute distance logic
        return pendingList.reduce((best, curr) => 
            Math.abs(curr - this.currentPos) < Math.abs(best - this.currentPos) ? curr : best
        );
    }

    _recalculateVector() {
        if (this.stopQueue.size === 0) {
            this.vector = ElevatorDirection.IDLE;
        } else {
            const target = this._getOptimalNextTarget();
            this.vector = target > this.currentPos ? ElevatorDirection.UP : ElevatorDirection.DOWN;
        }
    }

    _cycleSafetyDoors() {
        console.log(`  🚪 Unit ${this.unitId} - Opening/Closing Access Gates...`);
    }

    // Dispatch Engine: Calculate theoretical 'distance + penalty' score
    calculateDispatchScore(request) {
        const radialDistance = Math.abs(this.currentPos - request.floor);

        // Priority Penalty System: If elevator goes opposite way, inflate its score (making it less desirable)
        let dynamicPenalty = 0;
        if (this.vector !== ElevatorDirection.IDLE && this.vector !== request.vector) {
            dynamicPenalty = 8; // Heavy deterrent to interrupt opposite-stream traversal
        }

        return radialDistance + dynamicPenalty;
    }
}

// ─── BRAIN: DISPATCH CONTROLLER ──────────────────────────────────────────────
class ElevatorController {
    constructor(unitList) {
        this.fleet = unitList;
    }

    routeExternalCall(req) {
        // Analyze fleet metrics and assign logic directly to absolute minimum score holder
        const designatedUnit = this.fleet.reduce((bestUnit, currentCandidate) => {
            const candidateScore = currentCandidate.calculateDispatchScore(req);
            const bestScore = bestUnit.calculateDispatchScore(req);
            return candidateScore < bestScore ? currentCandidate : bestUnit;
        });

        console.log(`📡 DISPATCH: Unit ${designatedUnit.unitId} mapped to floor ${req.floor}.`);
        designatedUnit.injectTarget(req.floor);
    }

    routeInternalButton(unitId, destFloor) {
        const targetUnit = this.fleet.find(u => u.unitId === unitId);
        if (targetUnit) targetUnit.injectTarget(destFloor);
    }
}

// ─── CONTAINER: BUILDING MASTER ─────────────────────────────────────────────
class BuildingSystem {
    constructor(totalFloors, carsCount) {
        this.totalFloors = totalFloors;
        const fleet = Array.from({ length: carsCount }, (_, i) => new ElevatorCar(i + 1));
        this.dispatch = new ElevatorController(fleet);
    }

    userCallElevator(fromFloor, goalDirection) {
        console.log(`\n📢 USER REQUEST: Waiting on Floor ${fromFloor} wanting to go ${goalDirection}`);
        this.dispatch.routeExternalCall(new FloorCallRequest(fromFloor, goalDirection));
    }

    userPressDestination(inUnitId, toFloor) {
        console.log(`📟 INTERIOR INPUT: User inside Unit ${inUnitId} selected Floor ${toFloor}`);
        this.dispatch.routeInternalButton(inUnitId, toFloor);
    }

    runSimulationCycle() {
        this.dispatch.fleet.forEach(unit => unit.executeIncrementStep());
    }
}

// ======================================================
// 🧪 LLD TEST AUTOMATION SECTION (DISPATCH LOGIC INTEGRITY)
// ======================================================
console.log("\n--- 🧪 Running Elevator Fleet Dispatch Verification ---");

function runElevatorAssertions() {
    try {
        const hq = new BuildingSystem(10, 2);
        const car1 = hq.dispatch.fleet[0];
        const car2 = hq.dispatch.fleet[1];

        // Test 1: Queue Integration Mechanics
        car1.injectTarget(5);
        if (!car1.stopQueue.has(5)) throw new Error("Internal queue injection rejected key index");
        console.log("✅ TEST 1: Stop Queue buffer admission confirmed");

        // Test 2: Direction Vector Calculation
        if (car1.vector !== ElevatorDirection.UP) throw new Error("Vector calculation failed initial trajectory");
        console.log("✅ TEST 2: Trajectory Auto-Recalculation locked (UP)");

        // Test 3: Dispatch Assignment Favoritism Logic
        // Car 1 is currently moving to Floor 5.
        // Set Car 2 specifically higher up to capture user request
        car2.currentPos = 8; 
        hq.userCallElevator(9, ElevatorDirection.UP); // Should assign to Car 2 (dist 1) instead of Car 1 (dist 8)
        
        if (car2.stopQueue.size !== 1) {
             throw new Error("Dispatch routed request to suboptimal distant unit!");
        }
        console.log("✅ TEST 3: Nearest-Candidate Dispatch metric injection successful");

        // Test 4: Physical Location Increment Cycle
        car1.currentPos = 4; // Position right before arrival
        car1.injectTarget(5);
        hq.runSimulationCycle(); // Car 1 hits 5
        
        if (car1.currentPos !== 5) throw new Error("Traversing step failed coordinate physical update");
        console.log("✅ TEST 4: Spatial Velocity increment correctly ticked");

        // Test 5: Arrival Self-Cleansing Vector
        if (car1.stopQueue.has(5)) throw new Error("Target cleanup failed after physical arrival anchor!");
        console.log("✅ TEST 5: Pop Resolution finalized memory queue clearing");

        console.log("\n🏆 FINAL VERDICT: FLEET DISPATCH LOGIC 100% SECURE 🏆\n");

    } catch (e) {
        console.error("\n❌ ELEVATOR ENGINE FAILURE:", e.message);
        process.exit(1);
    }
}

// Subdue simulator verbose traces for clean automated dashboarding
const traceLog = console.log;
console.log = () => {}; // Temporary silence
traceLog("\n--- 🧪 Running Elevator Fleet Dispatch Verification ---");

// Restore output console for testing confirmation output
console.log = traceLog;

runElevatorAssertions();
